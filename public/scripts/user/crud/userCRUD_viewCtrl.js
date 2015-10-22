/* Copyright (c) 2015 Alvin Pivowar */
(function(){
    "use strict";

    angular
        .module("IntroApp")
        .controller("userCRUD_viewCtrl",
        ["$scope",
        function($scope){
            var crudCtrl = $scope.$parent.vm;
            var vm = this;
            vm.user = crudCtrl.currentUser;

            vm.Close = close;

            function close() {
                crudCtrl.showList(false);
            }
        }]);
})();