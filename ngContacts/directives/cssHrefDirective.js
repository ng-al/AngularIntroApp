(function() {
    "use strict";

    angular
        .module("ContactApp")
        .directive("cssHref",
        ["navService",
        function(navService) {
            function link(scope, elem, attrs) {
                var uri = scope.cssHref || navService.getCssUri();
                elem.attr("href", uri);

                scope.$watch(
                    function() { return navService.getCssUri() },
                    function (newValue) {
                        if (newValue)
                            elem.attr("href", newValue);
                    }
                );
            }

            return {
                restrict: 'A',
                scope: {
                    cssHref: '@'
                },
                link: link
            }
        }]);
})();