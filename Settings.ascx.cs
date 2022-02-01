using Aricie.DigitalDisplays.Components.Entities;
using Aricie.DigitalDisplays.Components.Settings;
using Aricie.DigitalDisplays.Controller;
using Aricie.DNN.UI.Controls;
using System;

namespace Aricie.DigitalDisplays
{
    public partial class Settings : AriciePortalModuleBase
    {
        public ADSettings AdSettings
        {
            get
            {
                ADSettings settings = BusinessController.Instance.GetSettings(ModuleId);
                if (settings == null)
                {
                    settings = new ADSettings();
                }
                return settings;
            }
        }

        protected void Page_Init(object sender, EventArgs e)
        {
            this.pEditor.LocalResourceFile = this.SharedResourceFile;

            this.pEditor.SetSessionDataSource(new Lazy<ADSettings>(() => AdSettings));
            this.pEditor.DataBind();
        }
    }
}