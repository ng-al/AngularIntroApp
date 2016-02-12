// Copyright (c) Alvin Pivowar 2015, 2016

(function() {
    "use strict";

    angular
        .module("IntroApp")
        .config(
        ['$routeProvider',
        function($routeProvider) {
            $routeProvider
                .when("/welcome", {templateUrl: "/app/welcome.html"})

                .when("/binding/Simple", {templateUrl: "/topics/binding/simple/simple.html"})
                .when("/binding/Repeat", {templateUrl: "/topics/binding/repeat/repeat.html"})
                .when("/binding/Notes", {templateUrl: "/topics/binding/notes/notes.html"})

                .when("/directive", {templateUrl: "/topics/directive/bizCard/biz-card.html"})
                .when("/directive/bizCard", {templateUrl: "/topics/directive/bizCard/bizCard.html"})
                .when("/directive/apSplatter", {templateUrl: "/topics/directive/apSplatter/apSplatter.html"})
                .when("/directive/Components", {templateUrl: "/topics/directive/components/components.html"})
                .when("/directive/Validation", {templateUrl: "/topics/directive/validation/validation.html"})

                .when("/filter", {templateUrl: "/topics/filter/value/value.html"})
                .when("/filter/Value", {templateUrl: "/topics/filter/value/value.html"})
                .when("/filter/Collection", {templateUrl: "/topics/filter/collection/stooge.html"})
                .when("/filter/Custom", {templateUrl: "/topics/filter/custom/custom.html"})

                .when("/list", {templateUrl: "topics/user/list/demo.html"})
                .when("/list/Demo", {templateUrl: "topics/user/list/demo.html"})
                .when("/list/Template", {templateUrl: "topics/user/list/template.html"})
                .when("/list/Controller", {templateUrl: "topics/user/list/controller.html"})
                .when("/list/Service", {templateUrl: "topics/user/list/service.html"})
                .when("/list/Notes", {templateUrl: "topics/user/list/notes.html"})

                .when("/crud", {templateUrl: "topics/user/crud/list/CRUD_list.html"})
                .when("/crud/List/:unused", {templateUrl: "topics/user/crud/list/CRUD_list.html"})
                .when("/crud/List", {templateUrl: "topics/user/crud/list/CRUD_list.html"})
                .when("/crud/View/:uuid", {templateUrl: "topics/user/crud/view/CRUD_view.html"})
                .when("/crud/View", {templateUrl: "topics/user/crud/view/CRUD_view.html"})
                .when("/crud/Edit/:uuid", {templateUrl: "topics/user/crud/edit/CRUD_edit.html"})
                .when("/crud/Edit", {templateUrl: "topics/user/crud/edit/CRUD_edit.html"})
                .when("/crud/Delete/:uuid", {templateUrl: "topics/user/crud/delete/CRUD_delete.html"})
                .when("/crud/Delete", {templateUrl: "topics/user/crud/delete/CRUD_delete.html"})
                .when("/crud/Add/:unused", {templateUrl: "topics/user/crud/add/CRUD_add.html"})
                .when("/crud/Add", {templateUrl: "topics/user/crud/add/CRUD_add.html"})
                .when("/crud/Notes/:unused", {templateUrl: "topics/user/crud/notes/notes.html"})
                .when("/crud/Notes", {templateUrl: "topics/user/crud/notes/notes.html"})

                .when("/routing", {templateUrl: "topics/routing/overview/overview.html"})
                .when("/routing/Overview", {templateUrl: "topics/routing/overview/overview.html"})
                .when("/routing/Config", {templateUrl: "topics/routing/config/config.html"})
                .when("/routing/View", {templateUrl: "topics/routing/view/view.html"})
                .when("/routing/Links", {templateUrl: "topics/routing/links/links.html"})
                .when("/routing/Dynamic", {templateUrl: "topics/routing/dynamic/dynamic.html"})

                .otherwise({redirectTo: "/welcome"});
        }]);
})();