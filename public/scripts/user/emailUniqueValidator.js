/* Copyright (c) 2015 Alvin Pivowar */
(function(){
    "use strict";

    angular
        .module("IntroApp")
        .directive("emailUnique",
        ["$q", "userService",
        function($q, userService) {
            return {
                require : "ngModel",
                link : function(scope, element, attrs, ngModel) {
                    var userId = attrs.emailUnique;
                    ngModel.$asyncValidators.emailunique = function(email) {
                        return $q(function(resolve, reject) {
                            userService.getUser(email).then(
                                function(data) {
                                    var otherUser = data.data;
                                    // We found a user with the same email. This is an error if:
                                    //     (1) userId is null (we are creating a new user.
                                    //     (2) userId is not null (we are editing a user) and a different user already has that email.
                                    (userId && userId === otherUser.id) ? resolve() : reject();
                                },
                                function() {
                                    // Couldn't find any other user with the given email. The new value is unique.
                                    resolve();
                                }
                            );
                        })
                    };
                }
            }
        }])
})();