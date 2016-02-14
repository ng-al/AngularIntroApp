// Copyright (c) Alvin I Pivowar 2015, 2016

/*
    In these tests we would like the validator to use the userServiceMock.
    However, we cannot control the injection during the directive construction; $compile does not allow this.
    Instead, the beforeEach() block on line 29 substitutes the mock service for the real one.
    When the validator injects userService it will get the mock object.
 */
describe("emailUniqueValidator tests", function() {
    var template = '' +
        '<form name="form">' +
            '<input name="control" type="email" ng-model="email" email-unique="{{uuid}}" />' +
        '</form>';

    var $compile;
    var $rootScope;

    var formController;
    var formElement;
    var formScope;
    var modelController;
    var userServiceMock;

    beforeEach(function() {
        module("IntroApp");
        module("IntroAppMock");
    });

    beforeEach(function() {
        module(
        ["$injector", "$provide",
        function($injector, $provide) {
            var userServiceMockProvider = $injector.get("userServiceMockProvider");
            var userServiceMockConstructor = userServiceMockProvider.$get;
            userServiceMock = userServiceMockConstructor();
            userServiceMock.__init();

            $provide.value("userService", userServiceMock);
        }]);
    });

    beforeEach(function() {
        inject(
        ["$compile", "$rootScope",
        function(__$compile__, __$rootScope__) {
            $compile = __$compile__;
            $rootScope = __$rootScope__;
        }]);
    });

    function buildValidator(uuid, email) {
        var linkFn;

        formScope = $rootScope.$new(true);
        formScope.email = email;
        formScope.uuid = uuid;

        formElement = angular.element(template);
        linkFn = $compile(formElement);
        formElement = linkFn(formScope);
        formScope.$digest();    // Bind
        $rootScope.$apply();    // Fulfill the promises.

        formController = formScope.form;
        modelController = formController.control;
    }

    it("missing test", function() {
        buildValidator();
        expect(modelController.$valid).toBeTruthy();
    });

    it("empty test", function() {
        buildValidator("", "");
        expect(modelController.$valid).toBeTruthy();
    });

    it("no uuid, duplicate email test", function() {
        buildValidator(null, "moe.howard@stooges.com");
        expect(modelController.$valid).toBeFalsy();
    });

    it("no uuid, unique email test", function() {
        buildValidator(null, "shemp.howard@stooges.com");
        expect(modelController.$valid).toBeTruthy();
    });

    it("moe uuid with moe user", function() {
        buildValidator("1", "moe.howard@stooges.com");
        expect(modelController.$valid).toBeTruthy();
    });

    it("moe uuid with larry user", function() {
        buildValidator("1", "larry.fine@stooges.com");
        expect(modelController.$valid).toBeFalsy();
    });
});