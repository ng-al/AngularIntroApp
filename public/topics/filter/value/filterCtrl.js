// Copyright (c) Alvin Pivowar 2015, 2016

(function() {
    "use strict";

    angular
        .module("IntroApp")
        .controller("filterCtrl",
        ["$filter",
        function($filter) {
            var vm = this;
            vm.currencyFractionSize = null;
            vm.currencyResult = null;
            vm.currencySymbol = null;
            vm.currencyValue = null;

            vm.dateFormat = null;
            vm.dateResult = null;
            vm.dateValue = null;

            vm.numberFractionSize = null;
            vm.numberResult = null;
            vm.numberValue = null;

            vm.updateCurrency = updateCurrency;
            vm.updateDate = updateDate;
            vm.updateNumber = updateNumber;

            init();

            function init() {
                vm.currencyValue = 123.4567;
                vm.currencySymbol = '$';
                vm.currencyFractionSize = '2';

                updateCurrency();

                vm.dateValue = new Date();
                vm.dateFormat = "medium";

                updateDate();

                vm.numberValue = Math.PI;
                vm.numberFractionSize = '4';

                updateNumber();
            }

            function updateCurrency() {
                vm.currencyResult = $filter("currency")(vm.currencyValue, vm.currencySymbol, vm.currencyFractionSize);
            }

            function updateDate() {
                vm.dateResult = $filter("date")(vm.dateValue, vm.dateFormat);
            }

            function updateNumber() {
                vm.numberResult = $filter("number")(vm.numberValue, vm.numberFractionSize);
            }
        }]);
})();