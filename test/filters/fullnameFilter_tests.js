// Copyright (c) Alvin Pivowar 2015, 2016

describe("fullNameFilter tests", function() {
    var filter;

    beforeEach(function() {
        module("IntroApp");
    });

    beforeEach(function() {
        inject(
        ["$filter",
        function($filter) {
            filter = $filter("fullName");
        }]);
    });

    it("filter test", function() {
        var user = {
          firstName: "Moe",
          lastName: "Howard"
        };

        var result = filter(user);
        expect(result).toBe("Moe Howard, AEO");
    });

    it("null test", function() {
        expect(function() {
            filter(null);
        }).toThrow();
    });

    it("empty test", function() {
        var user = {
            firstName: "",
            lastName: ""
        };

        var result = filter(user);
        expect(result).toBe(", ");
    });

    it("no vowel test", function() {
        var user = {
            firstName: "Rhythm",
            lastName: ""
        };

        var result = filter(user);
        expect(result).toBe("Rhythm, ");
    });
});