// Copyright (c) Alvin Pivowar 2015, 2016

// Note that for the button component, the template and controller are not used.
// They are declared so that this file can be used as a starter for other components.

(function() {
    "use strict";

    var template = '';

    var css = '' +
        '<style id="button-style" type="text/css">' +
            '.button-style {' +
                'background-color: white;' +
                'border: none;' +
                'display: inline-block;' +
                'font-size: larger;' +
                'padding: 4px 8px;' +
                'text-align: center;' +
                'text-decoration: none;' +
            '}' +

            '.button-style:focus, .button-style:active, .button-style:focus:active {' +
                'outline: none;' +
            '}' +

            '.button-flat {' +
                'border: 1px solid black;' +
                'transition-duration: .4s;' +
            '}' +

            '.button-flat:hover {' +
                'background-color: lightgrey;' +
            '}' +

            '.button-raised {' +
                'box-shadow: 0 8px 16px 0 rgba(0, 0, 0, .2), 0 6px 20px 0 rgba(0, 0, 0, .2);' +
            '}' +

            '.button-raised:active {' +
                'box-shadow: 0 8px 8px 0 rgba(0, 0, 0, .2), 0 6px 10px 0 rgba(0, 0, 0, .2);' +
                'transform: translateY(4px);' +
            '}' +

            '.button-round, .button-round:hover:active {' +
                'border: 1px solid black;' +
                'border-radius: 100%;' +
                'box-shadow: none;' +
                'font-size: .8em;' +
                'height: 60px;' +
                'transition-duration: .1s;' +
                'width: 60px;' +
            '}' +

            '.button-round:hover {' +
                'box-shadow: 0 8px 16px 0 rgba(0, 0, 0, .2), 0 6px 20px 0 rgba(0, 0, 0, .2);' +
                'font-weight: bold;' +
            '}' +

            '.disabled {' +
                'cursor: not-allowed;' +
                'opacity: .6;' +
            '}' +

            '.disabled:hover {' +
                'background-color: white !important;' +
            '}' +

        '</style>';

    var controller =
        [
        function() {
            // bindToController will attach attribute values to vm object.
            var vm = this;

            init();

            function init() {

            }
        }];

    angular
        .module("IntroApp")
        .directive("buttonStyle",
        ["$document",
        function($document) {

            function link(scope, elem, attrs) {
                var valid = (elem[0].nodeName === "BUTTON" ||
                    (elem[0].nodeName === "INPUT" && elem[0].attributes["type"].value === "button") ||
                    (elem[0].nodeName === "INPUT" && elem[0].attributes["type"].value === "submit"));

                if (!valid)
                    throw new Error("button-style must be used on a button");

                elem.addClass("button");
                elem.addClass("button-style");
                elem.addClass("button-" + attrs["buttonStyle"]);

                if (attrs["disabled"])
                    elem.addClass("disabled");

                // Dynamically add stylesheet
                if (!$document[0].getElementById("button-style"))
                    $document.find("head").append(css);
            }


            return {
                restrict: 'A',

                // This declaration is required, and should remain empty.
                scope: {

                },

                // Insert binding properties in this object.
                bindToController: {

                },

                controller: controller,
                controllerAs: "vm",
                link: link,
                //template: template,
                //replace: true
            }
        }]);
})();