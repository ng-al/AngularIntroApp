// Copyright (c) Alvin Pivowar 2015, 2016

(function() {
    "use strict";

    angular
        .module("IntroApp")
        .controller("CRUD_addCtrl",
        ["$location", "userService",
        function($location, userService) {
            var vm = this;
            vm.user = {};

            vm.Cancel = close;
            vm.submit = submit;

            init();

            function close() {
                $location.path("/crud/List");
            }

            function init(){
            }

            function submit(isValid, user){
                if (isValid){
                    userService.createUser(user).then(function(){
                        close();
                    });
                }
            }
        }]);
})();