/* Copyright (c) 2015 Alvin Pivowar */
(function(){
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