using Aricie.DigitalDisplays.Components.Entities;
using Aricie.DigitalDisplays.Controller;
using Aricie.DNN.UI.Controls;
using System;

namespace Aricie.DigitalDisplays
{
    public partial class Settings : AriciePortalModuleBase
    {
        protected void Page_Init(object sender, EventArgs e)
        {
            //if (!Page.IsPostBack)
            //{
                this.pEditor.LocalResourceFile = this.SharedResourceFile;

                Counter nbOfItems = BusinessController.Instance.GetCounter(ModuleId);
                if (nbOfItems == null)
                {
                    nbOfItems = new Counter();
                }

                this.pEditor.DataSource = nbOfItems;
                this.pEditor.DataBind();
            //}
        }
    }
}