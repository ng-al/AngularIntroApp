// Copyright (c) Alvin I Pivowar 2015, 2016

describe("properUriValidator tests", function() {
    var template = '' +
        '<form name="form">' +
            '<input name="control" type="text" ng-model="uri" proper-uri />' +
        '</form>';

    var formController;
    var formElement;
    var formScope;
    var modelController;

    beforeEach(function() {
        module("IntroApp");
    });

    beforeEach(function() {
        inject(
        ["$compile", "$rootScope",
        function($compile, $rootScope) {
            var linkFn;

            formScope = $rootScope.$new(true);
            formScope.uri = null;

            formElement = angular.element(template);
            linkFn = $compile(formElement);
            formElement = linkFn(formScope);

            formController = formScope.form;
            modelController = formController.control;
        }]);
    });

    it("missing test", function() {
        modelController.$setViewValue(null);
        formScope.$digest();
        expect(modelController.$valid).toBeFalsy();
    });

    it("empty test", function() {
        modelController.$setViewValue("");
        formScope.$digest();
        expect(modelController.$valid).toBeFalsy();
    });

    it("no leading slash test", function() {
        modelController.$setViewValue("bad/uri");
        formScope.$digest();
        expect(modelController.$valid).toBeFalsy();
    });

    it("contains hash test", function() {
        modelController.$setViewValue("/bad/#/uri");
        formScope.$digest();
        expect(modelController.$valid).toBeFalsy();
    });

    it("pass test", function() {
        modelController.$setViewValue("/proper/uri");
        formScope.$digest();
        expect(modelController.$valid).toBeTruthy();
    });
});