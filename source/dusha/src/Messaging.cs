using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Spectre.Console;

namespace dusha
{
  internal class Messaging
  {
    public static void Start()
    {
      AnsiConsole.MarkupLine("[yellow]Starting Messaging...[/]");
    }

    public static ReturnGetMessageGroup? GetMessageGroup(string userId)
    {
      var json = new StringContent(JsonConvert.SerializeObject(new { userId = userId }), System.Text.Encoding.UTF8, "application/json");
      var resp = Request.Send($"{Request.DOMAIN}/api/v1/messaging/get-message-group", true, json);
      if (resp == null)
        return null;
      ReturnGetMessageGroup? serverResponse = JObject.Parse(resp).ToObject<ReturnGetMessageGroup>();
      if (serverResponse == null)
        return null;

      return serverResponse;
    }

    public static void DeleteMessage(string messageId, string messageGroupId)
    {
      var json = new StringContent(JsonConvert.SerializeObject(new { messageId = messageId, messageGroupId = messageGroupId }), System.Text.Encoding.UTF8, "application/json");
      Request.Send($"{Request.DOMAIN}/api/v1/messaging/delete-message", true, json);
      return;
    }

    public static void EditMessage(string messageId, string messageGroupId, string message)
    {
      var json = new StringContent(JsonConvert.SerializeObject(new { messageId = messageId, messageGroupId = messageGroupId, message = message }), System.Text.Encoding.UTF8, "application/json");
      Request.Send($"{Request.DOMAIN}/api/v1/messaging/edit-message", true, json);
      return;
    }
  }

  class Message
  {
    public int? id;
    public string? messageId;
    public string? message;
    public string? avatar;
    public string? username;
    public string? userId;
    public DateTime? createdAt;
    public string? groupId;
  }

  class ReturnGetMessageGroup
  {
    public string? messageGroupId;
    public Message[]? messages;
  }
}