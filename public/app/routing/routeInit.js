// Copyright (c) Alvin Pivowar 2015, 2016

(function() {
    "use strict";

    angular
        .module("IntroApp")
        .config(
        ["$routeProvider", "routeServiceProvider",
        function($routeProvider, routeServiceProvider) {

            // Left Nav
            routeServiceProvider.addMenuItem("Welcome", "", "/welcome", "/app/welcome.html");
            routeServiceProvider.addMenuItem("Data Binding", "Data Binding Examples", "/binding", "/topics/binding/simple/simple.html");
            routeServiceProvider.addMenuItem("User List", "User List", "list", "topics/user/list/demo.html");
            routeServiceProvider.addMenuItem("Directives", "Directives", "/directive", "/topics/directive/bizCard/bizCard.html");
            routeServiceProvider.addMenuItem("Filters", "Filters", "/filter", "/topics/filter/value/value.html");
            routeServiceProvider.addMenuItem("CRUD", "User CRUD", "/crud", "topics/user/crud/list/CRUD_list.html");
            routeServiceProvider.addMenuItem("Routing", "Routing", "/routing", "topics/routing/overview/overview.html");
            routeServiceProvider.addMenuItem("Testing", "Unit Testing", "/testing", "topics/testing/overview/overview.html");


            // Tabs

            routeServiceProvider.addTabItem("Data Binding", "Simple", "/binding/Simple", "/topics/binding/simple/simple.html");
            routeServiceProvider.addTabItem("Data Binding", "Repeat", "/binding/Repeat", "/topics/binding/repeat/repeat.html");
            routeServiceProvider.addTabItem("Data Binding", "Notes", "/binding/Notes", "/topics/binding/notes/notes.html");

            routeServiceProvider.addTabItem("User List", "Demo", "/list/Demo", "/topics/user/list/demo.html");
            routeServiceProvider.addTabItem("User List", "Template", "/list/Template", "/topics/user/list/template.html");
            routeServiceProvider.addTabItem("User List", "Controller", "/list/Controller", "/topics/user/list/controller.html");
            routeServiceProvider.addTabItem("User List", "Service", "/list/Service", "/topics/user/list/service.html");
            routeServiceProvider.addTabItem("User List", "Notes", "/list/Notes", "/topics/user/list/notes.html");

            routeServiceProvider.addTabItem("Directives", "bizCard", "/directive/bizCard", "/topics/directive/bizCard/bizCard.html");
            routeServiceProvider.addTabItem("Directives", "apSplatter", "/directive/apSplatter", "/topics/directive/apSplatter/apSplatter.html");
            routeServiceProvider.addTabItem("Directives", "Components", "/directive/Components", "/topics/directive/components/components.html");
            routeServiceProvider.addTabItem("Directives", "Validation", "/directive/Validation", "/topics/directive/validation/validation.html");

            routeServiceProvider.addTabItem("Filters", "Value", "/filter/Value", "/topics/filter/value/value.html");
            routeServiceProvider.addTabItem("Filters", "Collection", "/filter/Collection", "/topics/filter/collection/stooge.html");
            routeServiceProvider.addTabItem("Filters", "Custom", "/filter/Custom", "/topics/filter/custom/custom.html");

            routeServiceProvider.addTabItem("CRUD", "List", "/crud/List", "topics/user/crud/list/CRUD_list.html", "unused", true);
            routeServiceProvider.addTabItem("CRUD", "View", "/crud/View", "topics/user/crud/view/CRUD_view.html", "uuid", true);
            routeServiceProvider.addTabItem("CRUD", "Edit", "/crud/Edit", "topics/user/crud/edit/CRUD_edit.html", "uuid", true);
            routeServiceProvider.addTabItem("CRUD", "Delete", "/crud/Delete", "topics/user/crud/delete/CRUD_delete.html", "uuid", true);
            routeServiceProvider.addTabItem("CRUD", "Add", "/crud/Add", "topics/user/crud/add/CRUD_add.html", "unused", true);
            routeServiceProvider.addTabItem("CRUD", "Notes", "/crud/Notes", "topics/user/crud/notes/notes.html", "unused", true);

            routeServiceProvider.addTabItem("Routing", "Overview", "/routing/Overview", "/topics/routing/overview/overview.html");
            routeServiceProvider.addTabItem("Routing", "Config", "/routing/Config", "/topics/routing/config/config.html");
            routeServiceProvider.addTabItem("Routing", "View", "/routing/View", "/topics/routing/view/view.html");
            routeServiceProvider.addTabItem("Routing", "Links", "/routing/Links", "/topics/routing/links/links.html");
            routeServiceProvider.addTabItem("Routing", "Dynamic", "/routing/Dynamic", "/topics/routing/dynamic/dynamic.html");

            routeServiceProvider.addTabItem("Testing", "Overview", "/testing/Overview", "/topics/testing/overview/overview.html");
            routeServiceProvider.addTabItem("Testing", "Filters", "/testing/Filters", "/topics/testing/filters/filters.html");
            routeServiceProvider.addTabItem("Testing", "Services", "/testing/Services", "/topics/testing/services/services.html");
            routeServiceProvider.addTabItem("Testing", "Controllers", "/testing/Controllers", "/topics/testing/controllers/controllers.html");
            routeServiceProvider.addTabItem("Testing", "Directives", "/testing/Directives", "/topics/testing/directives/directives.html");
            routeServiceProvider.addTabItem("Testing", "Validators", "/testing/Validators", "/topics/testing/validators/validators.html");
            routeServiceProvider.addTabItem("Testing", "Mocking", "/testing/Mocking", "/topics/testing/mocking/mocking.html");


            // Configure the routes
            angular.forEach(routeServiceProvider.getRoutes(), function(route) {
                $routeProvider.when(route.path, { templateUrl: route.templateUrl });
            });

            // The welcome page is shown when the browser URL matches no route.
            $routeProvider.otherwise("/welcome");
        }])

        // THis run block will cause the routeService to be injected and initialized.
        .run(["routeService", function(routeService) {}]);
})();