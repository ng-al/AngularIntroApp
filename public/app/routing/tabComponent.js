// Copyright (c) Alvin Pivowar 2015, 2016

(function() {
    "use strict";

    var template = '' +
        '<div class="tabs">' +
            '<ul>' +
                '<li ng-class="{selected: tab.isSelected}" ng-repeat="tab in vm.tabs" ng-click="tab.onClick()">' +
                    '{{ tab.text }}' +
                '</li>' +
            '</ul>' +
        '</div>';


    var controller =
    ["$location", "$scope", "routeService",
    function($location, $scope, routeService) {
        var vm = this;
        vm.tabs = [];

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
            routeService.onTabClick(this.text);
        }

        function update() {
            var tabs = routeService.getTabItems();
            angular.forEach(tabs, function(tab) {
                tab.isSelected = routeService.isTabSelected(tab.text);
                tab.onClick = onClick;
            });

            vm.tabs = tabs;
        }
    }];


    angular
        .module("IntroApp")
        .directive("introTabs",
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