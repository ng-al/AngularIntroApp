// Copyright (c) Alvin Pivowar 2015, 2016

(function() {
    "use strict";

    angular
        .module("IntroAppMock")
        .factory("userServiceMock",
        ["$rootScope", "$q",
        function($rootScope, $q) {
            var _users = [];

            function createUser(user) {
                return $q(function(accept, reject) {
                    var scope = $rootScope.$new(true);
                    user.uuid = scope.$id;

                    _users.push(user);
                    accept({ data: user });
                });
            }

            function deleteUser(uuid) {
                return $q(function(accept, reject) {
                    var i;

                    for (i = 0; i < _users.length; ++i) {
                        if (_users[i].uuid === uuid) {
                            _users.splice(i, 1);
                            accept({ data: true });
                            return;
                        }
                    }

                    reject();
                });
            }

            function getAllUsers() {
                return $q(function(accept, reject) {
                    accept({ data: _users });
                });
            }

            function getUser(criteria) {
                return $q(function(accept, reject) {
                    var i;

                    for (i = 0; i < _users.length; ++i) {
                        if (_users[i].uuid === criteria || _users[i].email === criteria) {
                            accept({ data: _users[i] });
                            return;
                        }
                    }

                    reject();
                });
            }

            function updateUser(user) {
                return $q(function(accept, reject) {
                    var i;

                    for (i = 0; i < _users.length; ++i) {
                        if (_users[i].uuid === user.uuid) {
                            _users[i].firstName = user.firstName;
                            _users[i].lastName = user.lastName;
                            _users[i].email = user.email;
                            accept({ data: _users[i] });
                            return;
                        }
                    }

                    reject();
                });
            }

            // Mock Helper Functions

            function __clear() {
                _users = [];
            }

            function __getUsersCount() {
                return _users.length;
            }

            function __hasUser(uuid) {
                var i;

                for (i = 0; i < _users.length; ++i) {
                    if (_users.uuid === uuid)
                        return true;
                }

                return false;
            }

            function __init() {
                __clear();

                _users.push({ uuid: "1", firstName: "Moe", lastName: "Howard", email: "moe.howard@stooges.com"});
                _users.push({ uuid: "2", firstName: "Larry", lastName: "Fine", email: "larry.fine@stooges.com"});
                _users.push({ uuid: "3", firstName: "Curly", lastName: "Howard", email: "curly.howard@stooges.com"});
            }

            return {
                createUser: createUser,
                deleteUser: deleteUser,
                getAllUsers: getAllUsers,
                getUser: getUser,
                updateUser: updateUser,

                __clear: __clear,
                __getUsersCount: __getUsersCount,
                __hasUser: __hasUser,
                __init: __init
            };
        }]);
})();