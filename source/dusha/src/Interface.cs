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
          .Title($"[blue]HOME | {Profile.profile?.username}[/]")
          .PageSize(10)
          .MoreChoicesText("[grey](Move up and down to reveal more options)[/]")
          .AddChoices(new[] {
                    "Friends", "Add Friend", "Friend Requests", "Settings", "Exit"
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
        case "Exit":
          Environment.Exit(0);
          break;
        default:
          break;
      }

      Profile.Update();

      return;
    }

    public static void Friends()
    {
      Profile.Update();

      if (Profile.profile?.friends != null && Profile.profile.friends.Length > 0)
      {
        var selectionPrompt = new SelectionPrompt<string>();
        selectionPrompt.Title($"[blue]Select a friend to chat with.[/]");
        for (int i = 0; i < Profile.profile.friends.Length; i++)
        {
          selectionPrompt.AddChoice(Profile.profile.friends[i].username);
        }
        selectionPrompt.AddChoice("Back");
        var username = AnsiConsole.Prompt(selectionPrompt);

        switch (username)
        {
          case "Back":
            break;

          default:
            BasicProfile? friend = Profile.GetProfileByUsername(username);
            if (friend == null)
              break;

            Chat(friend);
            break;
        }
      }

      return;
    }

    public static void Chat(BasicProfile friend)
    {
      if (friend == null || friend.userId == null)
        return;

      // Get messages from messaging group
      var messages = Messaging.GetMessageGroup(friend.userId);
      if (messages == null)
        return;

      while (true)
      {
        Console.Clear();

        // Display messages
        if (messages.messages != null && messages.messages.Length > 0)
        {
          for (int i = 0; i < messages.messages.Length; i++)
          {
            if (messages.messages[i].message != null && messages.messages[i].username != null)
            {
              if (messages.messages[i].username == Profile.profile?.username)
              {
                AnsiConsole.MarkupLine($"[green]{messages.messages[i].username}[/]: {messages.messages[i].message}");
              }
              else
              {
                AnsiConsole.MarkupLine($"[red]{messages.messages[i].username}[/]: {messages.messages[i].message}");
              }
            }
          }
        }

        // Send messages
        var message = AnsiConsole.Ask<string>("[blue]Message (exit: e_qt):[/]");
        if (message == "e_qt")
          break;
      }
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
      Profile.Update();

      var selectionPrompt = new SelectionPrompt<string>();
      selectionPrompt.Title($"[blue]FRIEND REQUESTS[/]");
      selectionPrompt.AddChoice($"Received");
      selectionPrompt.AddChoice($"Sent");
      selectionPrompt.AddChoice("Back");
      var action = AnsiConsole.Prompt(selectionPrompt);

      switch (action)
      {
        case "Received":
          if (Profile.profile?.friendRequestsReceived != null && Profile.profile.friendRequestsReceived.Length > 0)
          {
            var receivedSelectionPrompt = new SelectionPrompt<string>();
            receivedSelectionPrompt.Title($"[blue]FRIEND REQUESTS RECEIVED[/]");
            for (int i = 0; i < Profile.profile.friendRequestsReceived.Length; i++)
            {
              receivedSelectionPrompt.AddChoice(Profile.profile.friendRequestsReceived[i].username);
            }
            receivedSelectionPrompt.AddChoice("Back");
            var receivedAction = AnsiConsole.Prompt(receivedSelectionPrompt);

            if (receivedAction == "Back")
              break;
            else
            {
              BasicProfile? profile = Profile.GetProfileByUsername(receivedAction);
              if (profile == null || profile.userId == null)
                break;

              var options = AnsiConsole.Prompt(
                new SelectionPrompt<string>()
                    .Title($"[blue]Accept or Decline request from {receivedAction}[/]")
                    .PageSize(10)
                    .MoreChoicesText("[grey](Move up and down to reveal more options)[/]")
                    .AddChoices(new[] {
                                "Accept", "Decline", "Back"
                    }));
              if (options == "Accept")
              {
                ServerResponse? response = Profile.HandleFriendRequest(profile.userId, "accept");
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
                  AnsiConsole.MarkupLine($"[green]Friedn request accepted.[/]");
                  Thread.Sleep(1500);
                  break;
                }
              }
              else if (options == "Decline")
              {
                ServerResponse? response = Profile.HandleFriendRequest(profile.userId, "decline");
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
                  AnsiConsole.MarkupLine($"[green]Friedn request declined.[/]");
                  Thread.Sleep(1500);
                  break;
                }
              }
              else if (options == "Back")
              {
                break;
              }
              break;
            }
          }
          else
          {
            AnsiConsole.MarkupLine($"[grey]No friend requests received.[/]");
            Thread.Sleep(1500);
          }
          break;
        case "Sent":
          if (Profile.profile?.friendRequestsSent != null && Profile.profile.friendRequestsSent.Length > 0)
          {
            var sentSelectionPrompt = new SelectionPrompt<string>();
            sentSelectionPrompt.Title($"[blue]FRIEND REQUESTS SENT[/]");
            for (int i = 0; i < Profile.profile.friendRequestsSent.Length; i++)
            {
              sentSelectionPrompt.AddChoice(Profile.profile.friendRequestsSent[i].username);
            }
            sentSelectionPrompt.AddChoice("Back");
            var sentAction = AnsiConsole.Prompt(sentSelectionPrompt);

            if (sentAction == "Back")
              break;
            else
            {
              BasicProfile? profile = Profile.GetProfileByUsername(sentAction);
              if (profile == null || profile.userId == null)
                break;

              var options = AnsiConsole.Prompt(
                new SelectionPrompt<string>()
                    .Title($"[blue]Decline request to {sentAction}[/]")
                    .PageSize(10)
                    .MoreChoicesText("[grey](Move up and down to reveal more options)[/]")
                    .AddChoices(new[] {
                                "Decline", "Back"
                    }));

              if (options == "Decline")
              {
                ServerResponse? response = Profile.HandleFriendRequest(profile.userId, "decline");
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
                  AnsiConsole.MarkupLine($"[green]Friedn request declined.[/]");
                  Thread.Sleep(1500);
                  break;
                }
              }
              else if (options == "Back")
              {
                break;
              }
              break;
            }
          }
          else
          {
            AnsiConsole.MarkupLine($"[grey]No friend requests sent.[/]");
            Thread.Sleep(1500);
          }
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
      Profile.Update();

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
          var username = AnsiConsole.Ask<string>("[blue]Username:[/]");

          ServerResponse? response = Profile.ChangeUsername(username);
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
            AnsiConsole.MarkupLine($"[green]Username changed.[/]");
            Thread.Sleep(1500);
            break;
          }
          break;
        case "Change Avatar":
          var avatar = AnsiConsole.Ask<string>("[blue]Avatar Url:[/]");
          ServerResponse? response2 = Profile.ChangeAvatar(avatar);
          if (response2 == null)
            break;
          if (response2.success == false && response2.error != null)
          {
            AnsiConsole.MarkupLine($"[red]Error: {response2.error}[/]");
            Thread.Sleep(2000);
            break;
          }
          if (response2.success == true)
          {
            AnsiConsole.MarkupLine($"[green]Avatar changed.[/]");
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
  }
}