// Copyright (c) Alvin Pivowar 2015, 2016

(function() {
    "use strict";

    angular
        .module("IntroApp")
        .controller("listUserCtrl",
        ["userService",
        function(userService) {
            var vm = this;
            vm.users = [];

            init();

            function init() {
                userService.getAllUsers().then(function(data) {
                    vm.users = data.data;
                });
            }
        }]);
})();