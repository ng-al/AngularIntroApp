// Copyright (c) Alvin Pivowar 2015, 2016

describe("bizCardDirective tests", function() {
    var template = '<div biz-card="user"></div>';

    var $compile;
    var $rootScope;

    var element;
    var scope;


    beforeEach(function() {
        module("IntroApp");
    });

    beforeEach(function() {
        inject(
        ["$compile", "$rootScope",
        function(__$compile__, __$rootScope__) {
            $compile = __$compile__;
            $rootScope = __$rootScope__;
        }]);
    });

    function buildDirective(user) {
        var linkFn;

        scope = $rootScope.$new(true);
        scope.user = user;

        element = angular.element(template);
        linkFn = $compile(element);
        element = linkFn(scope);

        scope.$digest();
    }

    it("construction test", function() {
        buildDirective({
            uuid: "",
            firstName: "",
            lastName: "",
            email: ""
        });

        var divNode = element[0];
        expect(divNode.nodeName).toBe("DIV");
        expect(divNode.children.length).toBe(4);

        var imgNode = divNode.children[0];
        expect(imgNode.nodeName).toBe("IMG");

        var spanNode = divNode.children[1];
        expect(spanNode.nodeName).toBe("SPAN");

        var anchorNode = divNode.children[2];
        expect(anchorNode.nodeName).toBe("A");

        var codeNode = divNode.children[3];
        expect(codeNode.nodeName).toBe("CODE");
    });

    it("img test", function() {
        buildDirective({
            uuid: "",
            firstName: "",
            lastName: "",
            email: ""
        });

        var divNode = element[0];
        var imgNode = divNode.children[0];
        var attributes = imgNode.attributes;

        var srcAttribute = attributes[0];
        expect(srcAttribute.name).toBe("src");
        expect(srcAttribute.value).toBe("/images/angular.ico");
    });

    it("span test", function() {
        buildDirective({
            uuid: "",
            firstName: "Moe",
            lastName: "Howard",
            email: ""
        });

        var divNode = element[0];
        var spanNode = divNode.children[1];

        expect(spanNode.innerText).toBe("Moe Howard, AEO");
    });

    it("anchor test", function() {
        buildDirective({
            uuid: "",
            firstName: "",
            lastName: "",
            email: "moe.howard@stooges.com"
        });

        var divNode = element[0];
        var anchorNode = divNode.children[2];
        var attributes = anchorNode.attributes;

        var hrefAttribute = attributes[0];
        expect(hrefAttribute.name).toBe("href");
        expect(hrefAttribute.value).toBe("mailto:moe.howard@stooges.com");

        expect(anchorNode.innerText).toBe("moe.howard@stooges.com");
    });

    it("code test", function() {
        var uuid = "3.1415926535897932384626433832795028841971693993751";

        buildDirective({
            uuid: uuid,
            firstName: "",
            lastName: "",
            email: ""
        });

        var divNode = element[0];
        var codeNode = divNode.children[3];

        expect(codeNode.innerText).toBe(uuid);
    });
});