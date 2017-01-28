(function() {
    "use strict";

    // This example controller directly consumes the MockRepository.
    // Do NOT do this in the other controllers;
    // those controllers should access the service using a promise-based service.
    // (Internally, the service will use the MockRepository.)

    angular
        .module("ContactApp")
        .controller("contactListCtrl",
        ["MockRepository", "navService",
        function(MockRepository, navService) {
            var vm = this;
            vm.contacts = [];

            vm.createContact = createContact;
            vm.deleteContact = deleteContact;
            vm.updateContact = updateContact;


            init();


            function createContact() {
                navService.route("create");
            }

            function deleteContact(contact) {
                navService.route("delete", { contactId: contact.$id });
            }

            function updateContact(contact) {
                navService.route("update", { contactId: contact.$id });
            }

            function init() {
                var repo = new MockRepository();
                vm.contacts = repo.getAll();
            }
        }]);
})();