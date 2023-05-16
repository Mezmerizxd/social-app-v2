using System.Net.Http.Headers;

namespace dusha
{
  internal class Request
  {
    public static string DOMAIN = "http://sav2.zvyezda.com";

    public static string? Send(string url, bool useAuth, HttpContent? content)
    {
      try
      {
        if (useAuth && Authentication.authorization != null)
        {
          using (var client = new HttpClient())
          {
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue(Authentication.authorization);
            string request = client.PostAsync(url, content).Result.Content.ReadAsStringAsync().Result;
            return request;
          }
        }
        else
        {
          using (var client = new HttpClient())
          {
            string request = client.PostAsync(url, content).Result.Content.ReadAsStringAsync().Result;
            return request;
          }
        }
      }
      catch (Exception ex)
      {
        Console.WriteLine(ex.ToString());
        return null;
      }
    }
  }

  class ServerResponse
  {
    public bool? success;
    public string? error;
  }
}
