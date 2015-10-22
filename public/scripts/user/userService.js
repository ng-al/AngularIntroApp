/* Copyright (c) 2015 Alvin Pivowar */
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

            function deleteUser(id) {
                return $http.delete("/api/users/" + id);
            }

            function getAllUsers() {
                return $http.get("/api/users");
            }

            function getUser(criteria) {
                return $http.get("/api/users/" + criteria);
            }

            function updateUser(user) {
                return $http.put("/api/users/" + user.id, user);
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