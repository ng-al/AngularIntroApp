// Copyright (c) Alvin Pivowar 2015, 2016

/*
    These tests use the userServiceMock as the source of the data.
 */
describe("vowelUserFilter tests", function() {
    var filter;
    var users;
    var userServiceMock;

    beforeEach(function() {
        module("IntroApp");
        module("IntroAppMock");
    });

    beforeEach(function() {
        inject(
        ["$filter", "$rootScope", "userServiceMock",
        function($filter, $rootScope, __userServiceMock__) {
            filter = $filter("vowelUserFilter");
            userServiceMock = __userServiceMock__;

            userServiceMock.__init();
            userServiceMock.getAllUsers().then(function(data) {
                users = data.data
            });
            $rootScope.$apply();
        }]);
    });

    function contains(collection, text) {
        for (var i = 0; i < collection.length; ++i) {
            if (collection[i].firstName === text || collection[i].lastName === text)
                return true;
        }

        return false;
    }

    it("missing parameters test", function() {
        var result = filter();
        expect(result).toBeUndefined();
    });

    it("missing vowel test", function() {
        var result = filter(users);
        expect(result.length).toBe(3);
    });

    it("null vowel test", function() {
        var result = filter(users, null);
        expect(result.length).toBe(3);
    });

    it("empty vowel test", function() {
        var result = filter(users, "");
        expect(result.length).toBe(3);
    });

    it("letter A test", function() {
        var result = filter(users, 'A');
        expect(result.length).toBe(3);
    });

    it("letter E test", function() {
        var result = filter(users, 'E');
        expect(result.length).toBe(2);
        expect(contains(result, "Moe")).toBeTruthy();
        expect(contains(result, "Fine")).toBeTruthy();
    });

    it("letter I test", function() {
        var result = filter(users, 'I');
        expect(result.length).toBe(1);
        expect(contains(result, "Fine")).toBeTruthy();
    });

    it("letter O test", function() {
        var result = filter(users, 'O');
        expect(result.length).toBe(2);
        expect(contains(result, "Moe")).toBeTruthy();
        expect(contains(result, "Howard")).toBeTruthy();
    });

    it("letter U test", function() {
        var result = filter(users, 'U');
        expect(result.length).toBe(1);
        expect(contains(result, "Curly")).toBeTruthy();
    });
});