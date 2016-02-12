// Copyright (c) Alvin Pivowar 2015, 2016

(function() {
    "use strict";

    angular
        .module("IntroApp")
        .controller("dynamicCtrl",
        ["$location",
        function($location) {
            var vm = this;
            vm.newPath = null;

            vm.submit = submit;

            function submit(isValid, newPath) {
                if (isValid && confirm("Call $location.path(\"" + newPath + "\")"))
                    $location.path(newPath);
            }
        }]);
})();