// Copyright (c) Alvin Pivowar 2015, 2016

(function() {
    "use strict";

    angular
        .module("IntroApp")
        .filter("fullName",
        [
        function() {
            return function(user) {
                var fullName = (user.firstName + " " + user.lastName).trim();
                var upperCaseFullName = fullName.toUpperCase();
                var vowels = "AEIOU";
                var i;

                fullName += ", ";
                for (i = 0; i < vowels.length; ++i) {
                    if (upperCaseFullName.indexOf(vowels[i]) !== -1)
                        fullName += vowels[i];
                }

                return fullName;
            };
        }]);
})();