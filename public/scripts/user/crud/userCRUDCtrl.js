// Copyright (c) Alvin Pivowar 2015, 2016

(function(){
    "use strict";

    var Mode = {
        CREATE: 1,
        DELETE: 2,
        LIST: 3,
        UPDATE: 4,
        VIEW: 5
    };
    
    angular
        .module("IntroApp")
        .controller("userCRUDCtrl",
        ["userService",
        function(userService){
            var vm = this;
            vm.currentMode = null;
            vm.currentUser = null;
            vm.Mode = Mode;
            vm.users = [];

            vm.showCreate = showCreate;
            vm.showDelete = showDelete;
            vm.showEdit = showEdit;
            vm.showList = showList;
            vm.showView = showView;

            init();

            function init() {
                showList(true);
            }

            function refreshUserData() {
                userService.getAllUsers().then(function(data){
                    vm.users = data.data.sort(function(a, b){
                        return (a.lastName === b.lastName)
                            ? a.firstName > b.firstName
                            : a.lastName > b.lastName;
                    });
                });
            }

            function showCreate() {
                vm.currentMode = Mode.CREATE;
                vm.currentUser = {};
            }

            function showDelete(uuid) {
                userService.getUser(uuid).then(function(data)
                {
                    vm.currentMode = Mode.DELETE;
                    vm.currentUser = data.data;
                }, function() {
                    showList(true);
                });
            }

            function showEdit(uuid) {
                userService.getUser(uuid).then(function(data)
                {
                    vm.currentMode = Mode.UPDATE;
                    vm.currentUser = data.data;
                }, function() {
                    showList(true);
                });
            }

            function showList(isDataRefresh) {
                if (isDataRefresh)
                    refreshUserData();

                vm.currentMode = Mode.LIST;
                vm.currentUser = null;
            }

            function showView(uuid) {
                userService.getUser(uuid).then(function(data)
                {
                    vm.currentMode = Mode.VIEW;
                    vm.currentUser = data.data;
                }, function() {
                    showList(true);
                });
            }
        }]);
})();