// Copyright (c) Alvin Pivowar 2015, 2016

(function() {
    "use strict";

    angular
        .module("IntroApp")
        .controller("CRUD_viewCtrl",
        ["$location", "$routeParams", "userService",
        function($location, $routeParams, userService){
            var vm = this;
            vm.user = null;

            vm.Close = close;

            init();

            function close() {
                $location.path("/crud/List");
            }

            function init() {
                if ($routeParams.uuid) {
                    userService.getUser($routeParams.uuid).then(function (data) {
                        vm.user = data.data;
                    });
                }
            }
        }]);
})();