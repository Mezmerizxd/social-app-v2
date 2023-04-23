using System.Net.Http.Headers;

namespace dusha
{
    internal class Request
    {
        public static string? Send(string url, bool useAuth)
        {
            try
            {
                if (useAuth && Authentication.authorization != null)
                {
                    using (var client = new HttpClient())
                    {
                        client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue(Authentication.authorization);
                        string request = client.PostAsync(url, null).Result.Content.ReadAsStringAsync().Result;
                        return request;
                    }
                }
                else
                {
                    Console.WriteLine("TODO");
                    return null;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
                return null;
            }
        }
    }

    class RequestResponse { }
}
