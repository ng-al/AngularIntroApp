// Copyright (c) Alvin Pivowar 2015, 2016

(function() {
    "use strict";

    angular
        .module("IntroApp")
        .controller("CRUD_listCtrl",
        ["$location", "userService",
        function($location, userService){
            var vm = this;
            vm.users = [];

            vm.addUser = addUser;
            vm.editUser = editUser;
            vm.deleteUser = deleteUser;
            vm.viewUser = viewUser;

            init();

            function addUser() {
                $location.path("/crud/Add");
            }

            function deleteUser(uuid) {
                $location.path("/crud/Delete/" + uuid);
            }

            function editUser(uuid) {
                $location.path("/crud/Edit/" + uuid);
            }

            function init() {
                userService.getAllUsers().then(function(data){
                    vm.users = data.data.sort(function(a, b){
                        return (a.lastName === b.lastName)
                            ? a.firstName > b.firstName
                            : a.lastName > b.lastName;
                    });
                });
            }

            function viewUser(uuid) {
                $location.path("/crud/View/" + uuid);
            }
        }]);
})();