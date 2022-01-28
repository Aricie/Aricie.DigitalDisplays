(function () {
    "use strict";

    angular
        .module("itemApp")
        .controller("itemController", itemController);

    itemController.$inject = ["$scope", "$window", "$log", "ngDialog", "ngProgressFactory", "itemService", "moduleProperties"];
    
    function itemController($scope, $window, $log, ngDialog, ngProgressFactory, itemService, moduleProperties) {

        $scope.progressbar = ngProgressFactory.createInstance();

        var vm = this;
        vm.Counter = [];
        vm.AddEditTitle = "";
        vm.EditIndex = -1;

        var moduleProps = JSON.parse(moduleProperties);

        vm.UserList = moduleProps.Users;
        vm.localize = moduleProps.Resources;
        vm.settings = moduleProps.Settings;
        vm.EditMode = moduleProps.IsEditable && moduleProps.EditMode;
        vm.ModuleId = parseInt(moduleProps.ModuleId);
        //vm.Item = {};

        vm.IsAdmin = moduleProps.IsAdmin;

        vm.getNumber = getNumber;
        vm.createUpdateItem = createUpdateItem;
        vm.deleteItem = deleteItem;
        vm.showAdd = showAdd;
        vm.showEdit = showEdit;
        vm.reset = resetItem;
        vm.userSelected = userSelected;
        vm.isAdminUser = isAdminUser;
        vm.sortableOptions = { stop: sortStop, disabled: !vm.EditMode };
        var jsFileLocation = $('script[src*="Aricie.DigitalDisplays/js/ng-scripts/app"]').attr('src');  // the js file path
		jsFileLocation = jsFileLocation.replace('app.js', '');   // the js folder path
		if (jsFileLocation.indexOf('?') > -1) {
			jsFileLocation = jsFileLocation.substr(0, jsFileLocation.indexOf('?'));
		}

        resetItem();
        getNumber();
 
        function getNumber() {
            //ngProgress.setColor('red');
            //ngProgress.start();
            $scope.progressbar.setColor('red');
            $scope.progressbar.start();
            itemService.getNumber()
                .then(function(response) {
                    vm.Counter = response.data;
                    $(".counter").text(vm.Counter.value);
                    $(".counter").addClass("eds_counter");
                    $scope.progressbar.complete();

                    animateCounter();
                })
                .catch(function(errData) {
                    $log.error('failure loading items', errData);
                    $scope.progressbar.complete();
                });
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

        function resetItem() {
            vm.Item = {
                ItemId: 0,
                ModuleId: vm.ModuleId,
                Title: '',
                Description: '',
                AssignedUserId: ''
            };
        };

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
    };
})();
