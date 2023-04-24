using Newtonsoft.Json;
using Spectre.Console;
using System.Net.NetworkInformation;

namespace dusha.src
{
    class Program
    {
        public static string? socketUrl = null;

        static void Main()
        {
            Console.Clear();

            AnsiConsole.MarkupLine("[blue]Starting...[/]");
            Thread.Sleep(1000);

            AnsiConsole.Status().AutoRefresh(true).Spinner(Spinner.Known.Star).SpinnerStyle(Style.Parse("green"))
            .Start("Initializing...", ctx => 
            {
                ctx.Status("[yellow]Checking if server is online...[/]");
                Thread.Sleep(1500);
                // Check if server is online
                if (IsServerOnline() == false)
                {
                    AnsiConsole.MarkupLine("[red]Failed to connect to Social App V2 Servers.[/]");
                }
                else
                {
                    AnsiConsole.MarkupLine("[green]Server is online.[/]");
                }

                ctx.Status("[yellow]Getting socket details...[/]");
                Thread.Sleep(1500);
                // Get socket details
                var socket = GetSocketDetails();
                if (socket == null)
                {
                    AnsiConsole.MarkupLine("[red]Failed to get socket details.[/]");
                }
                else
                {
                    socketUrl = socket;
                    AnsiConsole.MarkupLine("[green]Found socket details.[/]");
                }
            });

            AnsiConsole.MarkupLine("[yellow]Starting authentication...[/]");
            Thread.Sleep(1500);
            // Start authentication
            Authentication.Start();
            if (Authentication.authorization != null)
            {
                AnsiConsole.MarkupLine("[green]Successfully authenticated.[/]");
            }

            // // Start profile
            Profile.Start();

            Console.Clear();

            if (Profile.profile?.friends != null && Profile.profile?.friends.Length > 0)
            {
                var selectionPrompt = new SelectionPrompt<string>();
                selectionPrompt.Title($"[blue]You are logged in as [/][green]{Profile.profile.username}[/][blue], select a friend to chat with.[/]");
                for (int i = 0; i < Profile.profile.friends.Length; i++)
                {
                    selectionPrompt.AddChoice(Profile.profile.friends[i].username);
                }
                var username = AnsiConsole.Prompt(selectionPrompt);

                Console.WriteLine("Selected: " + username);
            }

            return;
        }

        public static bool IsServerOnline()
        {
            try
            {
                Ping ping = new Ping();
                PingReply reply = ping.Send("mezmerizxd.net");
                return reply.Status == IPStatus.Success;
            }
            catch
            {
                return false;
            }
        }

        public static string? GetSocketDetails()
        {
            try
            {
                using (var client = new HttpClient())
                {
                    var response = client.PostAsync("http://mezmerizxd.net/api/v1/get-socket-details", null).Result.Content.ReadAsStringAsync().Result;
                    if (response == null)
                    {
                        return null;
                    }
                    dynamic? json = JsonConvert.DeserializeObject(response);
                    if (json == null)
                    {
                        return null;
                    }
                    if (json["socketUrl"] == null)
                    {
                        return null;
                    }
                    return json["socketUrl"];
                }
            }
            catch (Exception)
            {
                return null;
            }
        }
    }
}