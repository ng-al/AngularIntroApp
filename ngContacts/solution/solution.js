(function() {
    angular
        .module("ContactApp")
        .run(
        ["navService",
        function(navService) {
            navService.setCssUri("solution/solution.css");

            var sections = navService.getSections();
            sections[0].tabText = "Intro";
            sections[1].tabText = "List";

            sections[2].tabText = "Create";
            sections[2].templateUri = "solution/createContact.html";

            sections[3].tabText = "Update";
            sections[3].templateUri = "solution/updateContact.html";

            sections[4].tabText = "Delete";
            sections[4].templateUri = "solution/deleteContact.html";
        }]);

    angular
        .module("ContactApp")
        .factory("contactService",
        ["$q", "MockRepository",
        function($q, MockRepository) {
            var _repo = new MockRepository();

            function createContact(contact) {
                return $q(function(accept, reject) {
                    accept({ data: _repo.create(contact) });
                });
            }

            function deleteContact(id) {
                return $q(function(accept, reject) {
                    if (_repo.delete(id))
                        accept();
                    else
                        reject();
                });
            }

            function getContact(id) {
                return $q(function(accept, reject) {
                    accept({ data: _repo.getById(id) });
                });
            }

            function getContacts() {
                return $q(function(accept, reject) {
                    accept({ data: _repo.getAll() });
                });
            }

            function updateContact(contact) {
                return $q(function(accept, reject) {
                    accept({ data: _repo.update(contact) });
                });
            }


            return {
                createContact: createContact,
                deleteContact: deleteContact,
                getContacts: getContacts,
                getContact: getContact,
                updateContact: updateContact
            }
        }]);

    angular
        .module("ContactApp")
        .controller("contactCrudCtrl",
        ["contactService", "navService",
        function(contactService, navService) {
            var vm = this;
            vm.contact = {};
            vm.contacts = [];
            vm.deleteId = null;
            vm.isCreate = null;

            vm.cancel = cancel;
            vm.delete = deleteFn;
            vm.isDeleteButtonDisabled = isDeleteButtonDisabled;
            vm.submit = submit;

            init();


            function cancel() {
                navService.route("list");
            }

            function deleteFn() {
                var id = vm.contact.$id || parseInt(vm.deleteId);
                contactService.deleteContact(id).then(function() {
                    navService.route("list");
                });
            }

            function init() {
                var routeParameters = navService.getRoutingParams();
                vm.isCreate = navService.getCurrentSection().id === "create";

                if (!vm.isCreate && routeParameters.contactId) {
                    contactService.getContact(routeParameters.contactId).then(function(response) {
                        vm.contact = response.data;
                    });
                }

                contactService.getContacts().then(function(response) {
                    vm.contacts = response.data;
                });
            }

            function isDeleteButtonDisabled() {
                return !(vm.contact.$id || vm.deleteId);
            }

            function submit(isValid, contact) {
                if (!isValid)
                    return;

                if (vm.isCreate) {
                    contactService.createContact(contact).then(function () {
                        navService.route("list");
                    });
                } else  if (contact.$id) {
                    contactService.updateContact(contact).then(function () {
                        navService.route("list");
                    });
                }
            }
        }]);
})();