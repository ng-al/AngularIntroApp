// Copyright (c) Alvin Pivowar 2015, 2016

(function() {
    "use strict";

    var template = '' +
        '<div class="left-nav">' +
            '<ul>' +
                '<li ng-repeat="item in vm.menuItems">' +
                    '<a ng-class="{ selected: item.isSelected }" ng-click="item.onClick()">' +
                        '{{ item.text }}' +
                    '</a>' +
                '</li>' +
            '</ul>' +
        '</div>';


    var controller =
    ["$location", "$scope", "routeService",
    function($location, $scope, routeService) {
        var vm = this;
        vm.menuItems = [];

        init();

        function init() {
            $scope.$watch(function() { return $location.path(); }, function(newValue, oldValue) {
                if (newValue.toString() !== oldValue.toString()) {
                    update();
                }
            });

            update();
        }

        function onClick() {
            routeService.onMenuClick(this.text);
        }

        function update() {
            var menuItems = routeService.getMenuItems();
            angular.forEach(menuItems, function(item) {
                item.isSelected = routeService.isMenuItemSelected(item.text);
                item.onClick = onClick;
            });

            vm.menuItems = menuItems;
        }
    }];


    angular
        .module("IntroApp")
        .directive("introLeftNav",
        [
        function() {
            return {
                restrict: "EA",
                scope: {},
                controller: controller,
                controllerAs: "vm",
                template: template,
                replace: true
            };
        }]);
})();