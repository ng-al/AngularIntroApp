// Copyright (c) Alvin Pivowar 2015, 2016

(function() {
    "use strict";

    var _items = [];

    angular
        .module("IntroApp")
        .controller("routeCtrl",
        ["$scope", "$location",
        function($scope, $location) {
            var vm = this;
            vm.items = [];
            vm.tabs = [];

            vm.getSectionTitle = getSectionTitle;
            vm.goToWelcome = goToWelcome;
            vm.onNavClick = onNavClick;
            vm.onTabClick = onTabClick;
            vm.isNavSelected = isNavSelected;
            vm.isTabSelected = isTabSelected;

            init();

            function buildTabs(item, tabText) {
                var i;
                var tabText;

                vm.tabs = item.tabs;

                if (!tabText && vm.tabs) {
                    tabText = vm.tabs[0];

                    for (i = 0; i < vm.tabs.length; ++i) {
                        if (isTabSelected(vm.tabs[i])) {
                            tabText = vm.tabs[i];
                            break;
                        }
                    }
                }

                return tabText;
            }

            function getSelectedNavItem() {
                var i;

                for (i = 0; i < _items.length; ++i) {
                    if ($location.path().indexOf(_items[i].path) !== -1)
                        return _items[i];
                }

                return _items[0];
            }

            function getSectionTitle() {
                var i;

                for (i = 0; i < _items.length; ++i) {
                    if (isNavSelected(_items[i])) {
                        return _items[i].title;
                    }
                }

                return "Whoops!";
            }

            function goToWelcome() {
                $location.path("/welcome");
            }

            function init() {
                _items = [];
                _items.push(new RouteItem("Welcome", "", "welcome"));
                _items.push(new RouteItem("Data Binding", "Data Binding Examples", "binding", ["Simple", "Repeat", "Notes"]));
                _items.push(new RouteItem("User List", "User List", "list", ["Demo", "Template", "Controller", "Service", "Notes"]));
                _items.push(new RouteItem("Directives", "Directives", "directive", ["bizCard", "apSplatter", "Components", "Validation"]));
                _items.push(new RouteItem("Filters", "Filters", "filter", ["Value", "Collection", "Custom"]));
                _items.push(new RouteItem("CRUD", "User CRUD", "crud", ["List", "View", "Edit", "Delete", "Add", "Notes"]));
                _items.push(new RouteItem("Routing", "Routing", "routing", ["Overview", "Config", "View", "Links", "Dynamic"]));
                _items.push(new RouteItem("Testing", "Unit Testing", "testing", ["Overview", "Filters", "Services", "Controllers", "Directives", "Validators", "Mocking"]));

                vm.items = _items;
                reWritePath();

                $scope.$watch(function() { return $location.path(); }, function(newValue, oldValue) {
                    if (newValue.toString() !== oldValue.toString()) {
                        reWritePath();
                    }
                });
            }

            function isNavSelected(item) {
                return ($location.path().indexOf(item.path) !== -1);
            }

            function isTabSelected(tabText) {
                var i;
                var item;

                item = getSelectedNavItem();
                if (!item.tabs)
                    return false;

                for (i = 0; i < item.tabs.length; ++i) {
                    if (vm.tabs[i] === tabText && $location.path().indexOf(tabText) !== -1)
                        return true;
                }

                return false;
            }

            function onNavClick(item) {
                var tabText = buildTabs(item);
                reWritePath(item, tabText);
            }

            function onTabClick(tabText) {
                var item = getSelectedNavItem();
                reWritePath(item, tabText);
            }

            function reWritePath(item, tabText) {
                var parts;

                item = item || getSelectedNavItem();
                tabText = buildTabs(item, tabText);

                var path = "/" + item.path + (tabText ? "/" + tabText : "");

                // Add uuid parameter to path for CRUD section
                if ($location.path().indexOf("crud") !== -1) {
                    parts = $location.path().split('/');
                    if (parts.length === 4) {
                        path += "/" + parts[3];
                    }
                }

                // Clear out uuid parameter from $location (for navigating outside of CRUD).
                if ($location.$$search.uuid) {
                    delete $location.$$search.uuid;
                    $location.$$compose();
                }

                $location.path(path);
            }
        }]);

    function RouteItem(text, title, path, tabs) {
        this.path = path;
        this.tabs = tabs;
        this.text = text;
        this.title = title;
    }

})();