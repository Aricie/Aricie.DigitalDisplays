using System.Web.UI;
using DotNetNuke.Entities.Modules;
using DotNetNuke.Services.Tokens;
using DotNetNuke.UI.Modules;
using System.Collections.Generic;
using Aricie.DigitalDisplays.Components.Entities;
using Aricie.DNN.Settings;
using System.Collections;
using Aricie.Services;

namespace Aricie.DigitalDisplays.Controller
{
    /// ----------------------------------------------------------------------------- 
    /// <summary> 
    /// The Businesscontroller class for Angularmodule
    /// </summary> 
    /// ----------------------------------------------------------------------------- 
    //[DNNtc.BusinessControllerClass()]
    public class BusinessController : ICustomTokenProvider
    {
        public const string CounterKey = "Aricie.Displays";

        private static BusinessController _instance;

        public static BusinessController Instance
        {
            get
            {
                if (_instance == null)
                {
                    _instance = new BusinessController();
                }
                return _instance;
            }
        }
        
        public IDictionary<string, IPropertyAccess> GetTokens(Page page, ModuleInstanceContext moduleContext)
        {
            var tokens = new Dictionary<string, IPropertyAccess>();
            tokens["moduleproperties"] = new ModulePropertiesPropertyAccess(moduleContext);
            return tokens;
        }


        public Counter GetQuantity(int moduleID)
        {
            var db = new PetaPoco.Database("SiteSqlServer");

            Counter result = GetCounter(moduleID);

            if (result != null)
            {
                long count = db.ExecuteScalar<long>($"select Count(*) from {result.table}");
                result.value = (int)count;
            }

            return result;
        }

        public Counter GetCounter(int moduleID)
        {
            Hashtable settings = null;
            if (!string.IsNullOrEmpty(SettingsController.FetchFromModuleSettings(SettingsScope.ModuleSettings, moduleID, CounterKey, ref settings)))
            {
                Counter result = ReflectionHelper.Deserialize<Counter>(SettingsController.FetchFromModuleSettings(SettingsScope.ModuleSettings, moduleID, CounterKey, ref settings));
                return result;
            }
            return null;
        }
    }
}