// Copyright (c) Alvin Pivowar 2015, 2016

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