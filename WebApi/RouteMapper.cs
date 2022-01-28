using DotNetNuke.Web.Api;

namespace Aricie.DigitalDisplays.WebApi
{
    /// <summary>
    /// Class Routemapper.
    /// </summary>
    public class Routemapper : IServiceRouteMapper
    {
        /// <summary>
        /// Registers the routes.
        /// </summary>
        /// <param name="routeManager">The route manager.</param>
        public void RegisterRoutes(IMapRoute routeManager)
        {
            routeManager.MapHttpRoute("Aricie.DigitalDisplays", "default", "{controller}/{action}",
                    new[] { "Aricie.DigitalDisplays.WebApi" });
        }
    }
}