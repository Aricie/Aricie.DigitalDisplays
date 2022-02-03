(function () {
    "use strict";

    angular
        .module("itemApp")
        .controller("itemController", itemController);

    itemController.$inject = ["$scope", "$window", "$interval", "$log", "ngDialog", "ngProgressFactory", "itemService", "moduleProperties"];
    
    function itemController($scope, $window,$interval, $log, ngDialog, ngProgressFactory, itemService, moduleProperties) {

        $scope.progressbar = ngProgressFactory.createInstance();

        var vm = this;
        vm.Counters = [];
        vm.AddEditTitle = "";
        vm.EditIndex = -1;

        var moduleProps = JSON.parse(moduleProperties);

        vm.UserList = moduleProps.Users;
        vm.localize = moduleProps.Resources;
        vm.settings = moduleProps.Settings;
        if (vm.settings["Aricie.Displays"]) {
            vm.settings["Aricie.Displays"] = JSON.parse(vm.settings["Aricie.Displays"]);
        }
        vm.EditMode = moduleProps.IsEditable && moduleProps.EditMode;
        vm.ModuleId = parseInt(moduleProps.ModuleId);
        vm.IsAdmin = moduleProps.IsAdmin;
        vm.CurrentTabUrl = moduleProps.CurrentTabUrl;
        vm.sortableOptions = { stop: sortStop, disabled: !vm.EditMode };
        var jsFileLocation = $('script[src*="Aricie.DigitalDisplays/js/ng-scripts/app"]').attr('src');  // the js file path
		jsFileLocation = jsFileLocation.replace('app.js', '');   // the js folder path
		if (jsFileLocation.indexOf('?') > -1) {
			jsFileLocation = jsFileLocation.substr(0, jsFileLocation.indexOf('?'));
		}

        //resetItem();
 
        function getDisplays() {
            //ngProgress.setColor('red');
            //ngProgress.start();
            $scope.progressbar.setColor('red');
            $scope.progressbar.start();
            //for (i = 0; i < vm.settings["Aricie.Displays"].Displays.length; i++) {
            if (vm.settings["Aricie.Displays"].DisplayMode == 0) {
                itemService.getNumbers()
                    .then(function (response) {
                        vm.Counters = response.data;
                        //for (i = 0; i < vm.settings["Aricie.Displays"].Displays.length; i++) {
                        var i = 0;
                        $(".counter").each(function () {
                            $(this).text(vm.Counters[i].value);
                            $(this).addClass("eds_counter");
                            i = i + 1;
                        });
                        $scope.progressbar.complete();

                        animateCounter();
                    })
                    .catch(function (errData) {
                        $log.error('failure loading items', errData);
                        $scope.progressbar.complete();
                    });
            }
            else if (vm.settings["Aricie.Displays"].DisplayMode == 1) {
                var deadline = new Date(Date.parse(vm.settings["Aricie.Displays"].EditDate));
                $scope.CountDown.initializeClock(deadline);
            }
            //}
        };

        function animateCounter() {
            $('.eds_counter').viewportChecker({
                offset: 100,
                classToAdd: '',
                callbackFunction: function ($el, action) {
                    var counterActivated = 'counterActivated';

                    if ($el.data(counterActivated))
                        return;

                    $el.data(counterActivated, true);

                    $el
                        .prop('Counter', 0)
                        .animate(
                            {
                                Counter: $el.text()
                            },
                            {
                                duration: 2000,
                                easing: 'swing',
                                step: function (now) {
                                    $el.text(Math.ceil(now));
                                }
                            }
                        );
                }
            });
        };

        function createUpdateItem(form) {
            vm.invalidSubmitAttempt = false;
            if (form.$invalid) {
                vm.invalidSubmitAttempt = true;
                return;
            }

            if (vm.Item.ItemId > 0) {
                itemService.updateItem(vm.Item)
                    .success(function(response) {
                        if (vm.EditIndex >= 0) {
                            vm.Items[vm.EditIndex] = vm.Item;
                        }
                    })
                    .catch(function(errData) {
                        $log.error('failure saving item', errData);
                    });
            } else {
                itemService.newItem(vm.Item)
                    .success(function (response) {
                        if (response.ItemId > 0) {
                            vm.Items.push(response);
                        }
                    })
                    .error(function (errData) {
                        $log.error('failure saving new item', errData);
                    });
            }
            ngDialog.close();
        };

        function deleteItem(item, idx) {
            if (confirm('Are you sure to delete "' + item.Title + '" ?')) {
                itemService.deleteItem(item)
                    .success(function (response) {
                        vm.Items.splice(idx, 1);
                    })
                    .error(function (errData) {
                        $log.error('failure deleting item', errData);
                    });
            }
        };

        function showAdd() {
            vm.reset();
            vm.AddEditTitle = "Add Item";
            ngDialog.open({
                template: jsFileLocation + 'Templates/itemForm.html',
                className: 'ngdialog-theme-default',
                scope: $scope
            });
        };

        function showEdit(item, idx) {
            vm.Item = angular.copy(item);
            vm.EditIndex = idx;
            vm.AddEditTitle = "Edit Item: #" + item.ItemId;
            ngDialog.open({
                template: jsFileLocation + 'Templates/itemForm.html',
                className: 'ngdialog-theme-default',
                scope: $scope
            });
        };

        //function resetItem() {
        //    vm.Item = {
        //        ItemId: 0,
        //        ModuleId: vm.ModuleId,
        //        Title: '',
        //        Description: '',
        //        AssignedUserId: ''
        //    };
        //};

        function userSelected() {
            for (var i = 0; i < vm.UserList.length; i++) {
                if (vm.UserList[i].id == vm.Item.AssignedUserId) {
                    vm.Item.AssignedUserName = vm.UserList[i].text;
                }
            }
        };

        function sortStop(e, ui) {
            var sortItems = [];
            for (var index in vm.Items) {
                if (vm.Items[index].ItemId) {
                    var sortItem = { ItemId: vm.Items[index].ItemId, Sort: index };
                    vm.Items[index].Sort = index;
                    sortItems.push(sortItem);
                }
            }       
            itemService.reorderItems(angular.toJson(sortItems))
                .catch(function(errData) {
                    $log.error('failure reordering items', errData.data);
                });
        };

        function isAdminUser() {
            itemService.isAdminUser()
                .then(function (response) {
                    return response.data;
                })
                .catch(function (errData) {
                    //$log.error('failure loading items', errData);
                    return false;
                });
        };
        $scope.CountDown = {
            months:0,
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
            getTimeRemaining: function (endtime) {
                var start = moment(new Date(endtime));
                var end = moment(new Date())
                var t = moment.duration(start.diff(end)).asMilliseconds();
                var seconds = moment.duration(start.diff(end)).seconds();
                var minutes = moment.duration(start.diff(end)).minutes() ;
                var hours = moment.duration(start.diff(end)).hours();
                var days = moment.duration(start.diff(end)).days();
                var months = moment.duration(start.diff(end)).months()
                return {
                    'total': t,
                    'months' : months,
                    'days': days,
                    'hours': hours,
                    'minutes': minutes,
                    'seconds': seconds
                };
            },

            initializeClock: function (endtime) {
                function updateClock() {
                    var t = $scope.CountDown.getTimeRemaining(endtime);
                    $scope.CountDown.months = t.months;
                    $scope.CountDown.days = t.days;
                    $scope.CountDown.hours = t.hours;
                    $scope.CountDown.minutes = t.minutes;
                    $scope.CountDown.seconds = t.seconds;

                    if (t.total <= 0) {
                        $interval.cancel(timeinterval);
                    }
                }

                updateClock();
                var timeinterval = $interval(updateClock, 1000);
            }
        }

        

        getDisplays();
    };
})();
