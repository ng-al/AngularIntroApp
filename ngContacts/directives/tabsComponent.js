(function() {
    "use strict";

    var template = '' +
            '<div>' +
                '<div class="tabBar">' +
                    '<span class="tab" ng-class="{active: tab.isActive}" ng-repeat="tab in vm.tabs" ng-click="vm.selectTab(tab)">' +
                        '<span>{{tab.tabText}}</span>' +
                    '</span>' +
                '</div>' +
                '<div class="tabContent" ng-include="vm.getTemplateUri()"></div>' +
            '</div>';


    var controller =
    ["$scope", "navService",
    function($scope, navService) {
        var vm = this;
        vm.tabs = [];

        vm.getTemplateUri = getTemplateUri;
        vm.selectTab = selectTab;


        init();


        function buildTabs(sections) {
            vm.tabs = [];
            angular.forEach(sections, function(section) {
                if (section.tabText)
                    vm.tabs.push(section);
            });
        }

        function getTemplateUri() {
            var defaultTab;
            var i;
            var tab;

            for (i = 0; i < vm.tabs.length; ++i) {
                tab = vm.tabs[i];

                if (tab.isActive)
                    return tab.templateUri;

                if (tab.isDefault)
                    defaultTab = tab;
            }

            defaultTab.isActive = true;
            return defaultTab.templateUri;
        }

        function init() {
            buildTabs(navService.getSections());

            $scope.$watch(function() {
                return navService.getCurrentSection();
            }, function(newValue) {
                if (newValue) {
                    angular.forEach(vm.tabs, function (tab) {
                        tab.isActive = (tab.id === newValue.id);
                    });
                }
            });

        }

        function selectTab(tab) {
            navService.route(tab.id);
        }
    }];



    angular
        .module("ContactApp")
        .directive("tabs",
        [
        function() {
            return {
                restrict: "EA",
                scope: false,
                controller: controller,
                controllerAs: "vm",
                template: template,
                replace: true
            }
        }]);
})();