using System.Net;
using DotNetNuke.Web.Api;
using System.Web.Http;
using System.Net.Http;
using Aricie.DigitalDisplays.Controller;
using Aricie.DigitalDisplays.Components.Entities;
using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace Aricie.DigitalDisplays.WebApi
{
    [SupportedModules("Aricie.DigitalDisplays")]
    public class ItemController : DnnApiController
    {

        [HttpGet]
        [ActionName("Number")]
        [AllowAnonymous]
        public HttpResponseMessage GetNumbers()
        {
            ObservableCollection<Counter> counters = BusinessController.Instance.GetQuantities(ActiveModule.ModuleID);
            return Request.CreateResponse(HttpStatusCode.OK, counters);
        }

        ///// <summary>
        ///// API that creates a new item in the item list
        ///// </summary>
        //[HttpPost]  
        //[ValidateAntiForgeryToken]
        //[ActionName("new")] // /API/item/new
        //[DnnModuleAuthorize(AccessLevel = SecurityAccessLevel.Edit)]
        //public HttpResponseMessage AddItem(ItemInfo item)
        //{
        //    try
        //    {
        //        item.CreatedByUserId = UserInfo.UserID;
        //        item.CreatedOnDate = DateTime.Now;
        //        item.LastModifiedByUserId = UserInfo.UserID;
        //        item.LastModifiedOnDate = DateTime.Now;
        //        AppController.Instance.NewItem(item);
        //        return Request.CreateResponse(HttpStatusCode.OK, item);
        //    }
        //    catch (Exception ex)
        //    {
        //        return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
        //    }
        //}

        ///// <summary>
        ///// API that deletes an item from the item list
        ///// </summary>
        ///// <returns></returns>
        //[HttpPost]  
        //[ValidateAntiForgeryToken]
        //[ActionName("delete")] // /API/item/delete
        //[DnnModuleAuthorize(AccessLevel = SecurityAccessLevel.Edit)]
        //public HttpResponseMessage DeleteItem(ItemInfo item)
        //{
        //    try
        //    {
        //        AppController.Instance.DeleteItem(item.ItemId);
        //        return Request.CreateResponse(HttpStatusCode.OK, true.ToString());
        //    }
        //    catch (Exception ex)
        //    {
        //        return Request.CreateResponse(HttpStatusCode.NotFound, ex.Message);
        //    }
        //}

        ///// <summary>
        ///// API that creates a new item in the item list
        ///// </summary>
        //[HttpPost] 
        //[ValidateAntiForgeryToken]
        //[ActionName("edit")]  // /API/item/edit
        //[DnnModuleAuthorize(AccessLevel = SecurityAccessLevel.Edit)]
        //public HttpResponseMessage UpdateItem(ItemInfo item)
        //{
        //    try
        //    {
        //        item.LastModifiedByUserId = UserInfo.UserID;
        //        item.LastModifiedOnDate = DateTime.Now;
        //        AppController.Instance.UpdateItem(item);
        //        return Request.CreateResponse(HttpStatusCode.OK, true.ToString());
        //    }
        //    catch (Exception ex)
        //    {
        //        return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
        //    }
        //}

        ///// <summary>
        ///// API that returns an item list
        ///// </summary>
        //[HttpPost, HttpGet]
        //[ValidateAntiForgeryToken]
        //[ActionName("list")]  // /API/item/list
        //[DnnModuleAuthorize(AccessLevel = SecurityAccessLevel.View)]
        //public HttpResponseMessage GetModuleItems()
        //{
        //    try
        //    {
        //        var itemList = AppController.Instance.GetItems(ActiveModule.ModuleID);
        //        return Request.CreateResponse(HttpStatusCode.OK, itemList.ToList());
        //    }
        //    catch (Exception ex)
        //    {
        //        return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
        //    }
        //}

        ///// <summary>
        ///// API that returns a single item
        ///// </summary>
        //[HttpGet]  
        //[ValidateAntiForgeryToken]
        //[ActionName("byid")]  // /API/item/byid
        //[DnnModuleAuthorize(AccessLevel = SecurityAccessLevel.View)]
        //public HttpResponseMessage GetItem(int itemId)
        //{
        //    try
        //    {
        //        var item = AppController.Instance.GetItem(itemId);
        //        return Request.CreateResponse(HttpStatusCode.OK, item);
        //    }
        //    catch (Exception ex)
        //    {
        //        return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
        //    }
        //}

        ///// <summary>
        ///// API that reorders an item list
        ///// </summary>
        //[HttpPost, HttpGet] 
        //[ValidateAntiForgeryToken]
        //[ActionName("reorder")]  // /API/item/reorder
        //[DnnModuleAuthorize(AccessLevel = SecurityAccessLevel.Edit)]
        //public HttpResponseMessage ReorderItems(List<ItemInfo> sortedItems)
        //{
        //    try
        //    {
        //        foreach (var item in sortedItems)
        //        {
        //            AppController.Instance.SetItemOrder(item.ItemId, item.Sort);
        //        }
        //        return Request.CreateResponse(HttpStatusCode.OK);
        //    }
        //    catch (Exception ex)
        //    {
        //        return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
        //    }
        //}
    }
}