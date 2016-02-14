// Copyright (c) Alvin Pivowar 2015, 2016

(function() {
    "use strict";

    angular
        .module("IntroApp")
        .controller("CRUD_editCtrl",
        ["$location", "$routeParams", "userService",
        function($location, $routeParams, userService){
            var vm = this;
            vm.user = null;

            vm.Cancel = close;
            vm.submit = submit;

            init();

            function close() {
                $location.path("/crud/List");
            }

            function init(){
                if ($routeParams.uuid) {
                    userService.getUser($routeParams.uuid).then(function(data) {
                        vm.user = data.data;
                    });
                }
            }

            function submit(userForm){
                if (userForm.$valid) {
                    userService.updateUser(vm.user).then(function () {
                        close();
                    });
                }
            }
        }]);
})();