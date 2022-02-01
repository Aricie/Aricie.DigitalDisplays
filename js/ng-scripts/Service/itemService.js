(function () {
    "use strict";

    angular
        .module("itemApp")
        .factory("itemService", itemService);

    itemService.$inject = ["$http", "serviceRoot"];
    
    function itemService($http, serviceRoot) {

        var urlBase = serviceRoot + "item/";
        //urlBase = '/DesktopModules/Aricie.DigitalDisplays/API/item/';
        var service = {};
        service.getNumbers = getNumbers;
        service.updateItem = updateItem;
        service.newItem = newItem;
        service.deleteItem = deleteItem;
        service.reorderItems = reorderItems;
        service.isAdminUser = isAdminUser;

        function getNumbers() {
            return $http.get(urlBase + "Number");
        };
        
        function updateItem(item) {
            return $http.post(urlBase + "edit",item);
        }

        function newItem(item) {
            return $http.post(urlBase + "new", item );
        }
        
        function deleteItem(item) {
            return $http.post(urlBase + "delete", item );
        }
        function reorderItems(sortItems) {
            return $http.post(urlBase + "reorder", sortItems );
        }

        function isAdminUser() {
            return $http.get('/DesktopModules/Geosport.FormulaireSubventionPratiquant/Api/Liste/UserIsAdmin');
        }

        return service;
   }
})();