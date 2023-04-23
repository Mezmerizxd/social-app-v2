using System.Text;
using Newtonsoft.Json;
using Spectre.Console;

namespace dusha
{
    public class Login
    {
        public string? email;
        public string? password;
    }

    public class SignUp
    {
        public string? email;
        public string? username;
        public string? password;
    }

    internal class Authentication
    {
        public static string? authorization = null;

        public static void Start()
        {
            Console.WriteLine("Starting Authentication...");

            if (authorization != null)
            {
                Console.WriteLine("Found token, validating...");
                if (ValidateToken(authorization) == false)
                {
                    Console.WriteLine("Failed to validate.");
                }
                else
                {
                    Console.WriteLine("Successfully validated token.");
                    return;
                }
            }

            Thread.Sleep(1500);
            Console.Clear();

            var method = AnsiConsole.Prompt(
                new SelectionPrompt<string>()
                    .Title("Choose an Authentication method.")
                    .PageSize(10)
                    .MoreChoicesText("[grey](Move up and down to reveal more options)[/]")
                    .AddChoices(new[] {
                        "Login", "Sign Up"
                    }));

            if (method == "Login")
            {
                var success = LoginForm();
                if (success == false)
                {
                    Reset();
                }
            }
            else if (method == "Sign Up")
            {
                var success = SignUpForm();
                if (success == false)
                {
                    Reset();
                }
            }
            else { return; }

            Thread.Sleep(1500);
            Console.Clear();
        }

        public static void Reset()
        {
            authorization = null;
            var retry = AnsiConsole.Prompt(
                new SelectionPrompt<string>()
                    .Title("Failed to authenticate, would you like to retry?")
                    .PageSize(10)
                    .MoreChoicesText("[grey](Move up and down to reveal more options)[/]")
                    .AddChoices(new[] {
                        "Yes", "No"
                    }));
            if (retry == "No")
            {
                Environment.Exit(0);
            }
            else
            {
                Start();
            }
        }

        private static bool LoginForm()
        {
            var email = AnsiConsole.Ask<string>("[green]Email[/]:");
            var password = AnsiConsole.Prompt(
                new TextPrompt<string>("[green]Password[/]:")
                    .PromptStyle("grey")
                    .Secret());

            var login = new Login
            {
                email = email,
                password = password
            };

            if (ValidateUserInput(login.email, true) == false)
            {
                Console.WriteLine("Email is invalid");
                Thread.Sleep(1500);
                Console.Clear();
                return false;
            }
            if (ValidateUserInput(login.password, false) == false)
            {
                Console.WriteLine("Password is invalid");
                Thread.Sleep(1500);
                Console.Clear();
                return false;
            }

            try
            {
                using (var client = new HttpClient())
                {
                    var json = JsonConvert.SerializeObject(login);
                    var content = new StringContent(json, Encoding.UTF8, "application/json");
                    var request = client.PostAsync("http://mezmerizxd.net/api/v1/account/login", content).Result.Content.ReadAsStringAsync().Result;
                    if (request == null)
                    {
                        return false;
                    }
                    dynamic? response = JsonConvert.DeserializeObject(request);
                    if (response == null)
                    {
                        return false;
                    }

                    if (response["success"] != false)
                    {
                        authorization = response["authorization"];
                    }
                    else
                    {
                        Console.WriteLine(response["error"]);
                        Thread.Sleep(1500);
                        Console.Clear();
                        return false;
                    }
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return false;
            }

            Console.WriteLine("Successfully logged in.");
            return true;
        }

        private static bool SignUpForm()
        {
            var email = AnsiConsole.Ask<string>("[green]Email[/]:");
            var username = AnsiConsole.Ask<string>("[green]Username[/]:");
            var password = AnsiConsole.Prompt(
                new TextPrompt<string>("[green]Password[/]:")
                    .PromptStyle("grey")
                    .Secret());

            var signup = new SignUp
            {
                email = email,
                username = username,
                password = password
            };

            if (ValidateUserInput(signup.email, true) == false)
            {
                Console.WriteLine("Email is invalid");
                Thread.Sleep(1500);
                Console.Clear();
                return false;
            }
            if (ValidateUserInput(signup.username, false) == false)
            {
                Console.WriteLine("Username is invalid");
                Thread.Sleep(1500);
                Console.Clear();
                return false;
            }
            if (ValidateUserInput(signup.password, false) == false)
            {
                Console.WriteLine("Password is invalid");
                Thread.Sleep(1500);
                Console.Clear();
                return false;
            }

            try
            {
                using (var client = new HttpClient())
                {
                    var json = JsonConvert.SerializeObject(signup);
                    var content = new StringContent(json, Encoding.UTF8, "application/json");
                    var request = client.PostAsync("http://mezmerizxd.net/api/v1/account/signup", content).Result.Content.ReadAsStringAsync().Result;
                    if (request == null)
                    {
                        return false;
                    }
                    dynamic? response = JsonConvert.DeserializeObject(request);
                    if (response == null)
                    {
                        return false;
                    }
                    if (response["success"] != false)
                    {
                        authorization = response["authorization"];
                    }
                    else
                    {
                        Console.WriteLine(response["error"]);
                        Thread.Sleep(1500);
                        Console.Clear();
                        return false;
                    }
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return false;
            }

            Console.WriteLine("Successfully signed up.");
            return true;
        }

        private static bool ValidateToken(string token)
        {
            if (token == null)
            {
                return false;
            }
            return false;
        }

        private static bool ValidateUserInput(string input, bool email)
        {
            if (input == null || input == "")
            {
                return false;
            }

            if (email)
            {
                // Check if input contains **@*.com
                var trimmedEmail = input.Trim();
                if (trimmedEmail.EndsWith("."))
                {
                    return false;
                }
                try
                {
                    var emailAddr = new System.Net.Mail.MailAddress(input);
                    return emailAddr.Address == trimmedEmail;
                }
                catch
                {
                    return false;
                }
            }

            return true;
        }


    }
}
