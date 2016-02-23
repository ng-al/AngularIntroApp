// Copyright (c) Alvin Pivowar 1015, 2016

(function() {
    "use strict";

    angular
        .module("IntroApp")
        .directive("introTopicTitle",
        ["$location", "routeService",
        function($location, routeService) {
            function update(elem) {
                var menuItem = routeService.getCurrentMenuItem();
                if (menuItem && menuItem.title)
                    elem[0].innerText = menuItem.title;
            }

            return {
                restrict: 'A',
                scope: {},
                link: function(scope, elem, attrs) {
                    scope.$watch(function() { return $location.path(); }, function(newValue, oldValue) {
                        if (newValue.toString() !== oldValue.toString()) {
                            update(elem);
                        }
                    });

                    update(elem);
                }
            };
        }]);
})();