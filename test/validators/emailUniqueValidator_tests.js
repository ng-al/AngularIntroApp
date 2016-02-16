// Copyright (c) Alvin I Pivowar 2015, 2016

/*
    In these tests we would like the validator to use the userServiceMock.
    However, we cannot control the injection during the directive construction; $compile does not allow this.
    Instead, the beforeEach() block on line 61 substitutes the mock service for the real one.
    When the validator injects userService it will get the mock object.

    Note also, that I have created four explicit beforeEach() groups that correspond to phases in the AngularJS
    execution pipeline:

        Module Group
            - Each dependent(to the test) module is declared
            - You do not have to declare modules that are injected by declared modules:
              For example, AngularIntro injects apSplatter

        Config Group
            - Corresponds to the AngularJS module().config([]) block.
            - Must appear after the module declarations and BEFORE any services are injected.
              Once services are injected, the configuration phase is over and providers can no longer be used.

        Inject Group
            - Inject and save a reference to any service(s) that the tests require.
            - Note, that instead of injecting all of the services in one spot, which is more readable (in my opinion),
              you CAN inject into a spec:
                it("name", inject
                ["serviceName",
                function(serviceName) {
                }]);

        Run Group
            - Corresponds to the AngularJS module().run([]) block.
            - Placeholder for test setup code, common to all tests.

    Helper Functions
        If setup code is common to all tests, but is paramaterized then it cannot appear in a beforeEach()
        group; rather it must be relegated to a "helper" function.  See buildValidator(), below.
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

    // The "module" group
    beforeEach(function() {
        module("IntroApp");
        module("IntroAppMock");
    });

    // The "config" group
    beforeEach(function() {
        module(
        ["$injector", "$provide",
        function($injector, $provide) {
            var userServiceMockProvider = $injector.get("userServiceMockProvider");
            var userServiceMockFactoryFn = userServiceMockProvider.$get;
            $provide.factory("userService", userServiceMockFactoryFn);
        }]);
    });

    // The "inject" group
    beforeEach(function() {
        // Note that we inject "userService" but get the mock.  See previous group.
        inject(
        ["$compile", "$rootScope", "userService",
        function(__$compile__, __$rootScope__, __userServiceMock__) {
            $compile = __$compile__;
            $rootScope = __$rootScope__;
            userServiceMock = __userServiceMock__;
        }]);
    });

    // The "run" group
    beforeEach(function() {
        userServiceMock.__init();
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