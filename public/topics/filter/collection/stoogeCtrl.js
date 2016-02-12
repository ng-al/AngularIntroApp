// Copyright (c) Alvin Pivowar 2015, 2016

(function() {
    "use strict";

    angular
        .module("IntroApp")
        .controller("stoogeCtrl",
        [
        function() {
            var vm = this;
            vm.exactMatch = null;
            vm.search = {};
            vm.stooges = [];

            vm.getFilterText = getFilterText;

            init();

            function getFilterText() {
                var property;

                // Remove null properties
                for (property in vm.search) {
                    if (vm.search.hasOwnProperty(property) && !vm.search[property])
                        delete vm.search[property];
                }

                return JSON.stringify(vm.search);
            }

            function init() {
                vm.stooges = [];
                vm.stooges.push(new Stooge("Moses Harry Horwitz", "Brooklyn, N.Y.", "June 19, 1897", "May 4, 1975"));
                vm.stooges.push(new Stooge("Jerome Lester Horwitz", "Brooklyn, N.Y.", "October 22, 1903", "January 18, 1952"));
                vm.stooges.push(new Stooge("Louis Feinberg", "Philadelphia, PA.", "October 5, 1902", "January 24, 1975"));
                vm.stooges.push(new Stooge("Samuel Horwitz", "Manhattan, N.Y.", "March 11, 1895", "November 22, 1955"));
                vm.stooges.push(new Stooge("Joe Besser", "St. Louis, MO.", "August 12, 1907", "March 1, 1988"));
                vm.stooges.push(new Stooge("Joseph Wardell", "Philadelphia, PA.", "July 12, 1909", "July 3, 1993"));

                vm.exactMatch = false;
            }
        }]);

    function Stooge(name, city, born, died) {
        this.born = born;
        this.city = city;
        this.died = died;
        this.name = name;
    }
})();