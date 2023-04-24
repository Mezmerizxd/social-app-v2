using Newtonsoft.Json.Linq;
using Spectre.Console;

namespace dusha
{
    internal class Profile
    {
        public static FullProfile? profile = null;

        public static void Start()
        {
             AnsiConsole.MarkupLine("[yellow]Starting Profile...[/]");

            // Set profile
            FullProfile? fullProfile = GetProfile();
            if (fullProfile == null)
            {
                AnsiConsole.MarkupLine("[red]Failed to get profile.[/]");
            }
            else
            {
                profile = fullProfile;
                AnsiConsole.MarkupLine("[green]Successfully got profile.[/]");
            }
        }

        public static BasicProfile[]? GetFriends()
        {
            try
            {
                var json = Request.Send("http://mezmerizxd.net/api/v1/profile/friends", true);
                if (json == null)
                    return null;
                Friends? friendsJson = JObject.Parse(json).ToObject<Friends?>();
                if (friendsJson == null)
                    return null;
                return friendsJson.friends;
            }
            catch (Exception ex)
            {
                AnsiConsole.MarkupLine("[red]Failed to get friends.[/]", ex.Message);
                return null;
            }
        }

        public static FriendRequests? GetFriendRequests()
        {
            try
            {
                var json = Request.Send("http://mezmerizxd.net/api/v1/profile/friend-requests", true);
                if (json == null)
                    return null;
                FriendRequests? friendRequests = JObject.Parse(json).ToObject<FriendRequests>();
                if (friendRequests == null)
                    return null;

                return friendRequests;
            }
            catch (Exception ex)
            {
                AnsiConsole.MarkupLine("[red]Failed to get friend requests.[/]", ex.Message);
                return null;
            }
        }

        public static void HandleFriendRequest(string userId, string action)
        {
            try
            {

            }
            catch (Exception ex)
            {
                AnsiConsole.MarkupLine("[red]Failed to handle friend request.[/]", ex.Message);
                return;
            }
        }

        public static void AddFriend(string username)
        {
            try
            {

            }
            catch (Exception ex)
            {
                AnsiConsole.MarkupLine("[red]Failed to add friend.[/]", ex.Message);
                return;
            }
        }

        public static FullProfile? GetProfile()
        {
            try
            {
                var json = Request.Send("http://mezmerizxd.net/api/v1/profile", true);
                if (json == null)
                    return null;
                FullProfile? fullProfile = JObject.Parse(json).ToObject<FullProfile>();
                if (fullProfile == null)
                    return null;
                return fullProfile;
            }
            catch (Exception ex)
            {
                AnsiConsole.MarkupLine("[red]Failed to get profile.[/]", ex.Message);
                return null;
            }
        }

        public static void ChangeUsername(string username)
        {
            try
            {

            }
            catch (Exception ex)
            {
                AnsiConsole.MarkupLine("[red]Failed to change username.[/]", ex.Message);
                return;
            }
        }

        public static void ChangeAvatar(string avatar)
        {
            try
            {

            }
            catch (Exception ex)
            {
                AnsiConsole.MarkupLine("[red]Failed to change avatar.[/]", ex.Message);
                return;
            }
        }
    }

    class FullProfile
    {
        public string? userId;
        public string? username;
        public string? email;
        public string? avatar;
        public BasicProfile[]? friends;
        public BasicProfile[]? friendRequestsReceived;
        public BasicProfile[]? friendRequestsSent;
    }

    class BasicProfile
    {
        public string? userId;
        public string? username;
        public string? avatar;
    }

    class Friends
    {
        public BasicProfile[]? friends;
    }

    class FriendRequests
    {
        public BasicProfile[]? sent;
        public BasicProfile[]? received;
    }
}
