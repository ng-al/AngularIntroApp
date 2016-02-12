// Copyright (c) Alvin Pivowar 2015, 2016

(function() {
    "use strict";

    angular
        .module("IntroApp")
        .directive("properUri",
        [
        function() {
            return {
                require : "ngModel",
                link : function(scope, element, attrs, ngModel) {
                    ngModel.$validators.uri = function(uri) {
                        if (! uri || uri.length === 0)
                            return false;

                        if (uri[0] !== '/')
                            return false;

                        if (uri.indexOf('#') !== -1)
                            return false;

                        return true;
                    };
                }
            }
        }])
})();