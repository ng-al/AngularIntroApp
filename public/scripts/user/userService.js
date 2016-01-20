// Copyright (c) Alvin Pivowar 2015, 2016

(function(){
    "use strict";

    angular
        .module("IntroApp")
        .factory("userService",
        ["$http",
        function($http) {
            function createUser(user) {
                return $http.post("/api/users", user);
            }

            function deleteUser(uuid) {
                return $http.delete("/api/users/" + uuid);
            }

            function getAllUsers() {
                return $http.get("/api/users");
            }

            function getUser(criteria) {
                return $http.get("/api/users/" + criteria);
            }

            function updateUser(user) {
                return $http.put("/api/users/" + user.uuid, user);
            }

            return {
                createUser: createUser,
                deleteUser: deleteUser,
                getAllUsers: getAllUsers,
                getUser: getUser,
                updateUser: updateUser
            };
        }]);
})();