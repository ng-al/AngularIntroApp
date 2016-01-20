// Copyright (c) Alvin Pivowar 2015, 2016

(function(){
    "use strict";

    angular
        .module("IntroApp")
        .controller("userCRUD_formCtrl",
        ["$scope", "userService",
        function($scope, userService){
            var crudCtrl = $scope.$parent.vm;
            var vm = this;
            vm.isCreate = null;
            vm.title = null;
            vm.user = {};

            vm.Cancel = cancel;
            vm.submit = submit;

            init();

            function cancel(){
                crudCtrl.showList(false);
            };

            function init(){
                angular.extend(vm.user, crudCtrl.currentUser);
                vm.isCreate = !vm.user.uuid;
                vm.title = vm.isCreate ? "Create New User" : "Edit User";
            }

            function submit(isValid, user){
                if (isValid){
                    if (vm.isCreate){
                        userService.createUser(user).then(function(){
                            crudCtrl.showList(true);
                        });
                    } else {
                        userService.updateUser(user).then(function(){
                            crudCtrl.showList(true);
                        });
                    }
                }
            }
        }]);
})();