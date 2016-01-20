/* Copyright (c) 2015 Alvin Pivowar, All rights reserved */
(function() {
    "use script";

    angular
        .module("apSplatter", [])
        .directive("required",
        ["$compile", "$document",
        function ($compile, $document) {
            var leftTemplate = '<span style="{{outerStyle}}"><span class="{{innerClass}}">*&nbsp;</span></span>';
            var rightTemplate = '<span style="{{outerStyle}}"><span class="{{innerClass}}">&nbsp;*</span></span>';

            function addSplatToDom(privateScope, labelElement, isRightJustified) {
                var linkFn;
                var splatElement;
                var template;

                template = isRightJustified ? rightTemplate : leftTemplate;
                linkFn = $compile(template);
                splatElement = linkFn(privateScope);

                if (isRightJustified)
                    angular.element(labelElement).append(splatElement);
                else 
                    angular.element(labelElement).prepend(splatElement);
            }

            function compareDomPosition(labelElement, controlElement) {
                var controlIndex;
                var labelIndex;
                var regexp;

                regexp = new RegExp("for=['\"]" + controlElement.id + "['\"]");
                labelIndex = $document[0].documentElement.innerHTML.search(regexp);

                regexp = new RegExp("id=['\"]" + controlElement.id + "['\"]");
                controlIndex = $document[0].documentElement.innerHTML.search(regexp);

                return labelIndex - controlIndex;
            };

            function hasRequiredValidationFailed(formCtrl, controlName) {
                var i;

                if (formCtrl && formCtrl.$error && formCtrl.$error.required) {
                    for (i = 0; i < formCtrl.$error.required.length; ++i) {
                        if (formCtrl.$error.required[i].$name === controlName)
                            return true;
                    }
                }

                return false;
            };

            function updateSplat(privateScope, isInvalid) {
                privateScope.$applyAsync(function () {
                    privateScope.innerClass = isInvalid ? "text-danger" : "";
                    privateScope.outerStyle = isInvalid ? "color:red" : "";
                });
            }

            return {
                restrict: "A",
                require: ["^?form", "?ngModel"],
                link: function (scope, elem, attrs, controllers) {
                    var formCtrl = controllers[0];
                    var ngModelCtrl = controllers[1];
                    var rootScope = scope.$root || scope;

                    var isRightJustified;
                    var labelElement;
                    var privateScope;
                    var query;

                    // If the control does not have an id, then there cannot be a label that has a for="id".
                    // Thus, there is no label to splat.
                    if (!attrs.id)
                        return;

                    // Find the associated label.
                    query = $document[0].querySelectorAll("[for=" + attrs.id + "]");
                    labelElement = (query && query.length > 0) ? query[0] : null;
                    if (!labelElement)
                        return;

                    // Determine if (within the DOM) the label is to the left or right (checkbox?) of the control.
                    // This will determine whether the splat is at the beginning or end of the label.
                    isRightJustified = (compareDomPosition(labelElement, elem[0]) <= 0);

                    // Since the current element may have other directives (custom validation),
                    // do not interfere with any other directive's "isolated" scope.
                    // Create a truly private scope for binding.
                    privateScope = rootScope.$new(true);
                    addSplatToDom(privateScope, labelElement, isRightJustified);
                    updateSplat(privateScope, false);

                    // Watch ngModelController for changes in control validity.
                    if (ngModelCtrl) {
                        scope.$watch(function() { return ngModelCtrl.$invalid; }, function(newValue) {
                            if (angular.isUndefined(newValue))
                                return;

                            // If the control is in a form, don't change the splat; wait for the form to submit (below).
                            if (formCtrl && !formCtrl.$submitted)
                                return;

                            updateSplat(privateScope, newValue);
                        });
                    }

                    // Watch formController for submission.
                    if (formCtrl && attrs.name) {
                        scope.$watch(function() { return formCtrl.$submitted }, function(newValue) {
                            if (newValue && hasRequiredValidationFailed(formCtrl, attrs.name))
                                updateSplat(privateScope, true);
                        });
                    }
                }
            };
        }]);
})();