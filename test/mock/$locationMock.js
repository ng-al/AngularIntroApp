// Copyright (c) Alvin Pivowar 2015, 2016

(function() {
    "use strict";

    angular
        .module("IntroAppMock")
        .factory("$locationMock", function() {
            var _path = null;

            function path(setter) {
                if (setter)
                    _path = setter;
                return _path;
            }

            return {
                path: path
            }
        });
})();