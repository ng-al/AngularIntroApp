(function() {
    "use strict";

    var template = '' +
            '<aside role="alert" ng-if="isIdMissing">' +
                '<strong>Contact ID Missing</strong>' +
                '<p>' +
                    'You have navigated here via the tab control. ' +
                    'Please return to the contact list page and press a button to the right of a contact.' +
                '</p>' +
            '</aside>';


    angular
        .module("ContactApp")
        .directive("requiresContactId",
        ["navService",
        function(navService) {
            function link(scope, elem, attrs) {
                var routeParameters = navService.getRoutingParams();
                scope.isIdMissing = !routeParameters.contactId;
            }

            return {
                restrict: "EA",
                scope: {},
                link: link,
                template: template,
                replace: true
            }
        }]);
})()