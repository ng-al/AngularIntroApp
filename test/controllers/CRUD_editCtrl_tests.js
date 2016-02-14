// Copyright (c) Alvin Pivowar 2015, 2016

/*
    In the following tests, the $location and userService are both mocked.
    Note that $routeParams is also mocked, but in a very simple fashion.
 */

describe("CRUD_editCtrl tests", function() {
    var $controller;
    var $locationMock;
    var $rootScope;

    var controller;
    var userServiceMock;

    beforeEach(function() {
        module("IntroApp");
        module("IntroAppMock");
    });

    beforeEach(function() {
        inject(
        ["$controller", "$locationMock", "$rootScope", "userServiceMock",
        function(__$controller__, __$locationMock__, __$rootScope__, __userServiceMock__) {
            $controller = __$controller__;
            $locationMock = __$locationMock__;
            $rootScope = __$rootScope__;
            userServiceMock = __userServiceMock__;
        }]);
    });

    function buildController(uuid) {
        var $routeParamsMock = { uuid: uuid };

        controller = $controller("CRUD_editCtrl", {
            $location: $locationMock,
            $routeParams: $routeParamsMock,
            userService: userServiceMock
        });

        $rootScope.$apply();
    }

    it("construction test", function() {
        userServiceMock.__init();
        buildController("1");

        var user = controller.user;
        expect(angular.isObject(user)).toBeTruthy();
        expect(user.uuid).toBe("1");
        expect(user.firstName).toBe("Moe");
        expect(user.lastName).toBe("Howard");
        expect(user.email).toBe("moe.howard@stooges.com");
    });

    it("Cancel test", function() {
        userServiceMock.__init();
        buildController("1");

        expect($locationMock.path()).toBeNull();

        controller.Cancel();

        expect($locationMock.path()).toBe("/crud/List");
    });

    it("submit invalid test", function() {
        userServiceMock.__init();
        buildController("3");
        expect($locationMock.path()).toBeNull();

        controller.submit({ $valid: false});

        expect($locationMock.path()).toBeNull();
    });

    it("submit valid test", function() {
        userServiceMock.__init();
        buildController("3");
        expect($locationMock.path()).toBeNull();

        controller.user.firstName = "Shemp";
        controller.user.email = "shemp.howard@stooges.com";
        controller.submit({ $valid: true});
        $rootScope.$apply();

        var shemp = null;
        userServiceMock.getUser("3").then(function(data) {
            shemp = data.data;
        });
        $rootScope.$apply();
        expect(shemp).toEqual({ uuid: "3", firstName: "Shemp", lastName: "Howard", email: "shemp.howard@stooges.com"});

        expect($locationMock.path()).toBe("/crud/List");
    });
});