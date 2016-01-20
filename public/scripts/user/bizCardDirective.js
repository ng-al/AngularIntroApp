// Copyright (c) Alvin Pivowar 2015, 2016

(function(){
    "use strict";

    angular
        .module("IntroApp")
        .directive("bizCard",
        [
        function() {
            return {
                scope: {
                    bizCard: '='
                },
                template:
                    '<div class="biz-card">' +
                        '<img src="/images/angular.ico">' +
                        '<span>{{bizCard | fullName}}</span>' +
                        '<a href="mailto:{{bizCard.email}}">{{bizCard.email}}</a>' +
                        '<code>{{bizCard.uuid}}</code>' +
                    '</div>'
            };
        }]);
})();