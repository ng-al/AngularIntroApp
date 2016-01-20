// Copyright (c) Alvin Pivowar 2015, 2016

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
                    var userUuid  = attrs.emailUnique;
                    ngModel.$asyncValidators.emailunique = function(email) {
                        return $q(function(resolve, reject) {
                            userService.getUser(email).then(
                                function(data) {
                                    var otherUser = data.data;
                                    // We found a user with the same email. This is an error if:
                                    //     (1) userId is null (we are creating a new user.
                                    //     (2) userId is not null (we are editing a user) and a different user already has that email.
                                    (userUuid && userUuid === otherUser.uuid) ? resolve() : reject();
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