// Copyright (c) Alvin Pivowar 2015, 2016

(function(){
    "use strict";

    angular
        .module("IntroApp")
        .controller("userCRUD_deleteCtrl",
        ["$scope", "userService",
        function($scope, userService){
            var crudCtrl = $scope.$parent.vm;
            var vm = this;
            vm.user = crudCtrl.currentUser;

            vm.No = no;
            vm.Yes = yes;

            function no() {
                crudCtrl.showList(false);
            }

            function yes() {
                userService.deleteUser(vm.user.uuid).then(function(){
                    crudCtrl.showList(true);
                });
            }
        }]);
})();