(function() {
    "use strict";

    angular.module("ContactApp", []);

    // Initialize Routing
    angular
        .module("ContactApp")
        .run(
        ["navService",
        function(navService) {
            var sections = [];
            sections.push(new navService.Section("intro", "views/intro.html", "App Introduction"));
            sections.push(new navService.Section("list", "views/contactList.html", "Contact List"));
            sections.push(new navService.Section("create", "views/createContact.html", "Create Contact"));
            sections.push(new navService.Section("update", "views/updateContact.html", "Update Contact"));
            sections.push(new navService.Section("delete", "views/deleteContact.html", "Delete Contact"));

            sections[0].isDefault = true;
            navService.setSections(sections);
            navService.route("intro");
        }]);

    // Initialize Repository
    angular
        .module("ContactApp")
        .run(
        ["MockRepository",
        function(MockRepository) {
            var repo;
            var schema;

            schema = {
                firstName: true,
                lastName: true,
                email: true,
                phone: false
            };

            repo = new MockRepository(schema);
            repo.create({ firstName: "Moe", lastName: "Howard", email: "moe.howard@stooges.com"});
            repo.create({ firstName: "Larry", lastName: "Fine", email: "larry.fine@stooges.com"});
            repo.create({ firstName: "Curly", lastName: "Howard", email: "curly.howard@stooges.com"});
            repo.create({ firstName: "Shemp", lastName: "Howard", email: "shemp.howard@stooges.com"});
            repo.create({ firstName: "Joe", lastName: "Besser", email: "joe.besser@stooges.com"});
            repo.create({ firstName: "Curly", lastName: "Joe", email: "curly.joe@stooges.com"});
        }]);
})();