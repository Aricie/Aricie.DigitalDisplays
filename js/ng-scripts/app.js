(function () {
    "use strict";

   var jsFileLocation = $('script[src*="Aricie.DigitalDisplays/js/ng-scripts/app"]').attr('src');  // the js file path
    jsFileLocation = jsFileLocation.replace('app.js', '');   // the js folder path
    if (jsFileLocation.indexOf('?') > -1) {
        jsFileLocation = jsFileLocation.substr(0, jsFileLocation.indexOf('?'));
    }
    angular
        .module("itemApp", ["ngRoute", "ngDialog", "ngProgress", "ui.sortable"])
        .config(function ($routeProvider) {
            $routeProvider.
                otherwise({
                    templateUrl: jsFileLocation + "Templates/index.html",
                    controller: "itemController",
                    controllerAs: "vm"
                });
        });
        //.config(function ($routeProvider) {
        //    $routeProvider.
        //        otherwise({
        //            templateUrl: jsFileLocation + "Templates/index.html",
        //            controller: "itemController",
        //            controllerAs: "vm"
        //        });
        //});

})();