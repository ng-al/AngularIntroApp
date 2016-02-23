// Copyright (c) Alvin Pivowar 2015, 2016

(function() {
    "use strict";

    var $location;

    function MenuItem(text, title, path, templateUrl) {
        this.path = path;
        this.tabs = null;
        this.templateUrl = templateUrl;
        this.text = text;
        this.title = title;
    }

    function Route(path, templateUrl) {
        this.path = path;
        this.templateUrl = templateUrl;
    }

    function TabItem(text, path, templateUrl, param, isParamOptional) {
        this.isParamOptional = param && !!isParamOptional;
        this.path = path;
        this.param = param;
        this.templateUrl = templateUrl;
        this.text = text;
    }

    angular
        .module("IntroApp")
        .provider("routeService",
        [
        function() {

            // Private properties and functions (common to provider and service)

            var _menuItems = [];

            function _findMenuItem(menuText) {
                var i;

                for (i = 0; i < _menuItems.length; ++i) {
                    if (_menuItems[i].text === menuText)
                        return _menuItems[i];
                }

                throw new Error("Menu \"" + menuText + "\" not found");
            }


            // Config-time Provider

            var provider = this;

            provider.addMenuItem = function(text, title, path, templateUrl) {
                _menuItems.push(new MenuItem(text, title, path, templateUrl));
            };

            provider.addTabItem = function(menuText, text, path, templateUrl, param, isParamOptional) {
                var menuItem = _findMenuItem(menuText);

                if (!menuItem.tabs)
                    menuItem.tabs = [];

                menuItem.tabs.push(new TabItem(text, path, templateUrl, param, isParamOptional));
            };

            provider.getRoutes = function() {
                var routes = [];

                angular.forEach(_menuItems, function(menuItem) {
                    if (menuItem.templateUrl)
                        routes.push(new Route(menuItem.path, menuItem.templateUrl));

                    if (menuItem.tabs && menuItem.tabs.length > 0) {
                        angular.forEach(menuItem.tabs, function(tabItem) {
                            var path = tabItem.param ? tabItem.path + "/:" + tabItem.param : tabItem.path;
                            routes.push(new Route(path, tabItem.templateUrl));

                            if (tabItem.isParamOptional)
                                routes.push(new Route(tabItem.path, tabItem.templateUrl));
                        });
                    }
                });

                return routes;
            };


            // Run-time Factory

            var _serviceGetCurrentMenuItem = function() {
                var i;

                for (i = 0; i < _menuItems.length; ++i) {
                    if ($location.path().indexOf(_menuItems[i].path) !== -1)
                        return _menuItems[i];
                }

                return null;
            };

            var _serviceGetMenuItems = function() {
                return _menuItems;
            };

            var _serviceGetTabItems = function() {
                var menuItem = _serviceGetCurrentMenuItem();
                return (menuItem && menuItem.tabs && menuItem.tabs.length > 0) ? menuItem.tabs : null;
            };

            var _serviceIsMenuItemSelected = function(menuText) {
                var menuItem = _findMenuItem(menuText);
                return ($location.path().indexOf(menuItem.path) !== -1);
            };

            var _serviceIsTabSelected = function(tabText) {
                var i;

                var menuItem = _serviceGetCurrentMenuItem();
                if (menuItem && menuItem.tabs && menuItem.tabs.length > 0) {
                    for (i = 0; i < menuItem.tabs.length; ++i) {
                        if ($location.path().indexOf(menuItem.tabs[i].path) !== -1)
                            return (menuItem.tabs[i].text === tabText);
                    }

                    // If we could not find a matching tab, assume that the first tab should be selected.
                    // Rewrite the URL to include the default tab.
                    if (menuItem.tabs[0].text === tabText) {
                        $location.path(menuItem.tabs[0].path);
                        return true;
                    }
                }

                return false;
            };

            var _serviceOnMenuClick = function(menuText) {
                var menuItem = _findMenuItem(menuText);
                $location.path(menuItem.path);
            };

            var _serviceOnTabClick = function(tabText) {
                var i;
                var menuItem;

                menuItem = _serviceGetCurrentMenuItem();
                if (menuItem && menuItem.tabs && menuItem.tabs.length > 0) {
                    for (i = 0; i < menuItem.tabs.length; ++i) {
                        if (menuItem.tabs[i].text === tabText) {
                            $location.path(menuItem.tabs[i].path);
                            return;
                        }
                    }
                }
            };


            this.$get =
            ["$location",
            function(__$location__) {
                $location = __$location__;

                return {
                    getCurrentMenuItem: _serviceGetCurrentMenuItem,
                    getMenuItems: _serviceGetMenuItems,
                    getTabItems: _serviceGetTabItems,
                    isMenuItemSelected: _serviceIsMenuItemSelected,
                    isTabSelected: _serviceIsTabSelected,
                    onMenuClick: _serviceOnMenuClick,
                    onTabClick: _serviceOnTabClick
                };
            }];
        }]);
})();