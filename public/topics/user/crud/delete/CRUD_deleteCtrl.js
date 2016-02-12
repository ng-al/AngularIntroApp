// Copyright (c) Alvin Pivowar 2015, 2016

(function() {
    "use strict";

    angular
        .module("IntroApp")
        .controller("CRUD_deleteCtrl",
        ["$location", "$routeParams", "userService",
        function($location, $routeParams, userService){
            var vm = this;
            vm.user = null;

            vm.No = close;
            vm.Yes = deleteUser;

            init();

            function close() {
                $location.path("crud/List");
            }

            function deleteUser() {
                userService.deleteUser(vm.user.uuid).then(function(){
                    close();
                });
            }

            function init() {
                if ($routeParams.uuid) {
                    userService.getUser($routeParams.uuid).then(function(data) {
                        vm.user = data.data;
                    });
                }
            }
        }]);
})();