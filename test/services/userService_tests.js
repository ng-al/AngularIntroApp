// Copyright (c) Alvin Pivowar 2015, 2016

describe("userService tests", function() {
    var $httpBackend;
    var userService;

    beforeEach(function() {
        module("IntroApp");
    });

    beforeEach(function() {
        inject(
        ["$httpBackend", "userService",
        function(__$httpBackend__, __userService__) {
            $httpBackend = __$httpBackend__;
            userService = __userService__;
        }]);
    });

    it("createUser test", function() {
        $httpBackend
            .expectPOST("/api/users")
            .respond({
                uuid: 101,
                firstName: "Moe",
                lastName: "Howard"
            });

        var result = null;

        userService.createUser({}).then(function(data) {
            result = data.data;
        });

        $httpBackend.flush();

        expect(result).not.toBeNull();
        expect(result.uuid).toBe(101);
        expect(result.firstName).toBe("Moe");
        expect(result.lastName).toBe("Howard");
    });

    it("deleteUSer test", function() {
        $httpBackend
            .expectDELETE("/api/users/102")
            .respond({});

        var result = false;

        userService.deleteUser(102).then(function(data) {
            result = true;
        });

        $httpBackend.flush();

        expect(result).toBeTruthy();
    });

    it("getAllUsers test", function() {
        $httpBackend
            .expectGET("/api/users")
            .respond([ "Moe", "Larry", "Curly", "Shemp" ]);

        var result = null;

        userService.getAllUsers().then(function(data) {
            result = data.data;
        });

        $httpBackend.flush();

        expect(result).not.toBeNull();
        expect(angular.isArray(result)).toBeTruthy();
        expect(result.length).toBe(4);

        expect(result[0]).toBe("Moe");
        expect(result[1]).toBe("Larry");
        expect(result[2]).toBe("Curly");
        expect(result[3]).toBe("Shemp");
    });

    it("getUser test", function() {
        $httpBackend
            .expectGET("/api/users/103")
            .respond({
                uuid: 103,
                firstName: "Curly",
                lastName: "Howard"
            });

        var result = null;

        userService.getUser(103).then(function(data) {
            result = data.data;
        });

        $httpBackend.flush();

        expect(result).not.toBeNull();
        expect(result.firstName).toBe("Curly");
        expect(result.lastName).toBe("Howard");
    });

    it("updateUser test", function() {
        $httpBackend
            .expectPUT("/api/users/104")
            .respond({
                uuid: 104,
                firstName: "Shemp was updated",
                lastName: "Howard"
            });

        var result = null;

        userService.updateUser({ uuid: 104 }).then(function(data) {
            result = data.data;
        });

        $httpBackend.flush();

        expect(result).not.toBeNull();
        expect(result.firstName).toBe("Shemp was updated");
        expect(result.lastName).toBe("Howard");
    });
});