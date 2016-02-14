// Copyright (c) Alvin Pivowar 2015, 2016

/*
    The following tests are using the real userService.
    $httpBackend is used to resolve the calls (within the service) to $http.

    The $location service that the controller uses is mocked.
 */

describe("CRUD_addCtrl tests", function() {
    var $httpBackend;
    var $locationMock;

    var controller;

    beforeEach(function() {
        module("IntroApp");
        module("IntroAppMock");
    });

    beforeEach(function() {
        inject(
        ["$controller", "$httpBackend", "$locationMock", "userService",
        function($controller, __$httpBackend__, __$locationMock__, userService) {
            $httpBackend = __$httpBackend__;
            $locationMock = __$locationMock__;

            controller = $controller("CRUD_addCtrl", {
                $location: $locationMock,   // inject the mocked $location
                userService: userService    // inject the real userService
            });
        }]);
    });

    it("constructor test", function() {
        expect(angular.isObject(controller.user)).toBeTruthy();
        expect(controller.user).toEqual({});

        expect(angular.isFunction(controller.Cancel)).toBeTruthy();
        expect(angular.isFunction(controller.submit)).toBeTruthy();
    });

    it("Cancel test", function() {
        expect($locationMock.path()).toBeNull();

        controller.Cancel();

        expect($locationMock.path()).toBe("/crud/List");
    });

    // If the controller ignores the invalid parameter, this test will fail with an $http error since
    // there is no $httpBackend.expectPOST().
    it("submit invalid test", function() {
        expect($locationMock.path()).toBeNull();

        controller.submit(false, {});

        // Since the controller should not call the service, there should be no pending $http request.
        expect(function() {
            $httpBackend.flush();
        }).toThrow();

        expect($locationMock.path()).toBeNull();
    });

    it("submit valid test", function() {
        expect($locationMock.path()).toBeNull();

        $httpBackend
            .expectPOST("/api/users")
            .respond({});

        controller.submit(true, {});
        $httpBackend.flush();

        expect($locationMock.path()).toBe("/crud/List");
    });
});