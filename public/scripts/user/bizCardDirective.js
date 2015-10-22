/* Copyright (c) 2015 Alvin Pivowar */
(function(){
    "user strict";

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
                        '<code>{{bizCard.id}}</code>' +
                    '</div>'
            };
        }]);
})();