(function() {
    "use strict";

    angular
        .module("ContactApp")
        .factory("navService",
        [
        function() {
            var _cssUri = "contact.css";
            var _currentSection = null;
            var _routingParams = {};
            var _sections = [];

            function getCurrentSection() {
                return _currentSection;
            }

            function getRoutingParams() {
                return _routingParams;
            }

            function getCssUri() {
                return _cssUri;
            }

            function getSections() {
                return _sections;
            }

            function route(id, routingParams) {
                var newSection = null;

                angular.forEach(_sections, function(section) {
                    section.isActive = (section.id === id);
                    if (section.isActive)
                        newSection = section;
                });

                if (newSection) {
                    _currentSection = newSection;
                    _routingParams = routingParams || {};
                }
            }

            function setCssUri(uri) {
                _cssUri = uri;
            }

            function setSections(sections) {
                _sections = sections;
            }


            return {
                Section: Section,

                getCssUri: getCssUri,
                getCurrentSection: getCurrentSection,
                getRoutingParams: getRoutingParams,
                getSections: getSections,
                route: route,
                setCssUri: setCssUri,
                setSections: setSections
            }
        }]);


    function Section(id, templateUri, tabText) {
        this.id = id;
        this.isActive = false;
        this.isDefault = false;
        this.templateUri = templateUri;
        this.tabText = tabText;
    }
})();