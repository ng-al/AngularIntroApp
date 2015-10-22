/* Copyright (c) 2015 Alvin Pivowar */
(function(){
    "use strict";

    angular
        .module("IntroApp")
        .config(
        ['$routeProvider',
        function($routeProvider) {
            $routeProvider
                .when("/home", {templateUrl: "templates/home.html"})
                .when("/list", {templateUrl: "templates/userList.html"})
                .when("/crud", {templateUrl: "templates/crud/userCRUD.html"})
                .when("/cards", {templateUrl: "templates/userCards.html"})
                .when("/route", {templateUrl: "templates/route.html"})
                .otherwise({redirectTo: "/home"});
        }]);
})();