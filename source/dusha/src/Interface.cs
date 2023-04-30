using Spectre.Console;

namespace dusha
{
  internal class Interface
  {
    public static void Start()
    {
      AnsiConsole.MarkupLine("[yellow]Starting Interface...[/]");

      while (Authentication.authorization != null)
      {
        Console.Clear();



        Home();
      }
    }

    public static void Home()
    {
      var action = AnsiConsole.Prompt(
      new SelectionPrompt<string>()
          .Title("[blue]HOME[/]")
          .PageSize(10)
          .MoreChoicesText("[grey](Move up and down to reveal more options)[/]")
          .AddChoices(new[] {
                    "Friends", "Add Friend", "Friend Requests", "Settings", "Logout"
          }));
      switch (action)
      {
        case "Friends":
          Friends();
          break;
        case "Add Friend":
          AddFriend();
          break;
        case "Friend Requests":
          FriendRequests();
          break;
        case "Settings":
          Settings();
          break;
        case "Logout":
          break;
        default:
          break;
      }

      return;
    }

    public static void Friends()
    {
      if (Profile.profile?.friends != null && Profile.profile?.friends?.Length > 0)
      {
        var selectionPrompt = new SelectionPrompt<string>();
        selectionPrompt.Title($"[blue]Select a friend to chat with.[/]");
        for (int i = 0; i < Profile.profile?.friends?.Length; i++)
        {
          // selectionPrompt.AddChoice(Profile.profile.friends[i].username);
        }
        selectionPrompt.AddChoice("Back");
        var username = AnsiConsole.Prompt(selectionPrompt);

        Console.WriteLine("Selected: " + username);

        switch (username)
        {
          case "Back":
            break;

          default:
            break;
        }
      }

      return;
    }

    public static void AddFriend()
    {
      var action = AnsiConsole.Prompt(
          new SelectionPrompt<string>()
              .Title("[blue]SETTINGS[/]")
              .PageSize(10)
              .MoreChoicesText("[grey](Move up and down to reveal more options)[/]")
              .AddChoices(new[] {
                        "Enter Username", "Back"
              }));

      switch (action)
      {
        case "Enter Username":
          var username = AnsiConsole.Ask<string>("[blue]Username:[/]");

          ServerResponse? response = Profile.AddFriend(username);
          if (response == null)
            break;
          if (response.success == false && response.error != null)
          {
            AnsiConsole.MarkupLine($"[red]Error: {response.error}[/]");
            Thread.Sleep(2000);
            break;
          }
          if (response.success == true)
          {
            AnsiConsole.MarkupLine($"[green]Friedn request sent.[/]");
            Thread.Sleep(1500);
            break;
          }
          break;
        case "Back":
          break;

        default:
          break;
      }

      return;
    }

    public static void FriendRequests()
    {
      var selectionPrompt = new SelectionPrompt<string>();
      selectionPrompt.Title($"[blue]FRIEND REQUESTS[/]");
      selectionPrompt.AddChoice($"Received");
      selectionPrompt.AddChoice($"Sent");
      selectionPrompt.AddChoice("Back");
      var action = AnsiConsole.Prompt(selectionPrompt);

      switch (action)
      {
        case "Received":
          break;
        case "Sent":
          break;
        case "Back":
          break;

        default:
          break;
      }

      return;
    }

    public static void Settings()
    {
      var action = AnsiConsole.Prompt(
          new SelectionPrompt<string>()
              .Title("[blue]SETTINGS[/]")
              .PageSize(10)
              .MoreChoicesText("[grey](Move up and down to reveal more options)[/]")
              .AddChoices(new[] {
                        "Change Username", "Change Avatar", "Back"
              }));

      switch (action)
      {
        case "Change Username":

          break;
        case "Change Avatar":
          break;
        case "Back":
          break;

        default:
          break;
      }

      return;
    }
  }
}