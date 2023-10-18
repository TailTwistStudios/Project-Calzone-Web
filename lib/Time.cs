namespace Project_Calzone_Web.lib
{
    public static class Time
    {
        public static long now = DateTimeOffset.UtcNow.ToUnixTimeSeconds();
    }
}
