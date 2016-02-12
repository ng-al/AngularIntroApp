// Copyright (c) Alvin Pivowar 2015, 2016

(function() {
    "use strict";

    angular
        .module("IntroApp")
        .filter("vowelUserFilter",
        [
        function() {
            return function(input, vowel) {
                var result = [];

                if (!vowel)
                    return input;

                angular.forEach(input, function(user) {
                    var fullName = user.firstName + " " + user.lastName;
                    if (fullName.toUpperCase().indexOf(vowel) !== -1) result.push(user);
                });

                return result;
            }
        }]);
})();