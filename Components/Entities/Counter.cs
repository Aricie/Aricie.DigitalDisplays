using Aricie.DNN.ComponentModel;
using Aricie.DNN.Settings;
using Aricie.DNN.UI.Attributes;
using Aricie.DNN.UI.WebControls;
using Aricie.Services;
using DotNetNuke.Common;
using System.ComponentModel;
using System.Xml.Serialization;

namespace Aricie.DigitalDisplays.Components.Entities
{
    public class Counter
    {
        [Browsable(false)]
        public int value { get; set; } = 0;

        public bool showPlus { get; set; } = false;
        public bool approximativeValue { get; set; } = false;

        public string label { get; set; }
        public string icon { get; set; }

        [ReadOnly(true)]
        public string table { get; set; } = "DossierSubventionPratiquant";
        public string condition { get; set; }


        [ActionButton(IconName.FloppyO, IconOptions.Normal, Features = ActionButtonFeatures.CloseSection | ActionButtonFeatures.CloseListItem)]
        public virtual void Save(AriciePropertyEditorControl pe)
        {
            DoSave(pe);
            pe.Page.Response.Redirect(Globals.NavigateURL());
        }

        public bool DoSave(AriciePropertyEditorControl pe)
        {
            bool stopSaving = false;

            //var key = E2CSettings.Instance.GetSmartFileKey(this.PortalId, this.UserId);
            //UserInfo currentUser = UserController.Instance.GetUser(this.PortalId, this.UserId);
            var currentPe = pe;
            currentPe.ItemChanged = true;

            var currentCounter = (Counter)currentPe.DataSource;
            //if (!string.IsNullOrEmpty(currentCounter.Current.Current.Salarie.Entreprise.Principal?.Presentation?.Name))
            //{
            //XmlSerializer xmls = new XmlSerializer(typeof(Counter));
            //SettingsController.UpdateSettings(SettingsScope.ModuleSettings, pe.ParentModule.ModuleId, key, xmls.Serialize(currentCounter));
            SettingsController.UpdateSettings(SettingsScope.ModuleSettings, pe.ParentModule.ModuleId, Aricie.DigitalDisplays.Controller.BusinessController.CounterKey, ReflectionHelper.Serialize(currentCounter).OuterXml);
            //}

            return true;
        }
    }
}