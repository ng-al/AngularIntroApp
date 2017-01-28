(function() {
    "use strict";

    var _repo =  null;

    // An map where the property names are the set of legal names in the items
    // and the value (true or false) indicates whether that property is required.
    var _schema;

    angular
        .module("ContactApp")
        .factory("MockRepository",
        ["$rootScope",
        function($rootScope) {

            function checkSchema(item) {
                if (!angular.isObject(item))
                    throw new Error("newItem is null or non-object");

                var propertyName;
                var result = {};

                if (item.$id)
                    result.$id = item.$id;

                for (propertyName in _schema) {
                    if (_schema.hasOwnProperty(propertyName)) {
                        if (_schema[propertyName] && !item.hasOwnProperty(propertyName))
                            throw new Error("item does not contain required property: " + propertyName);

                        if (item.hasOwnProperty(propertyName))
                            result[propertyName] = item[propertyName];
                    }
                }

                return result;
            }

            // Scopes in AngularJS use a monotonically increasing integer as the ID.
            function generateId() {
                var id;
                var scope;

                scope = $rootScope.$new(true);
                id = scope.$id;
                scope.$destroy();

                return id;
            }

            function MockRepository(schema) {
                if (schema) {
                    _schema = schema;
                    _repo = [];
                    return;
                }

                if (!_repo)
                    throw new Error("The repository has not been initialized.");
            }

            MockRepository.prototype = {
                create: function(newItem) {
                    var i;
                    var item;

                    item = checkSchema(newItem);
                    item.$id = item.$id || generateId();

                    for (i = 0; i < _repo.length; ++i) {
                        if (_repo[i].$id === item.$id)
                            return item;
                    }

                    _repo.push(item);
                    return item;
                },

                delete: function(id) {
                    for (var i = 0; i < _repo.length; ++i) {
                        if (_repo[i].$id === id) {
                            _repo.splice(i, 1);
                            return true;
                        }
                    }

                    return false;
                },

                getAll: function() {
                    return _repo;
                },

                getById: function(id) {
                    for (var i = 0; i < _repo.length; ++i) {
                        if (_repo[i].$id === id)
                            return _repo[i];
                    }

                    return null;
                },

                update: function(updatedItem) {
                    var i;
                    var item;

                    item = checkSchema(updatedItem);
                    if (!item.$id)
                        throw new Error("Cannot update; updatedItem is not in repository,");

                    for (i = 0; i < _repo.length; ++i) {
                        if (_repo[i].$id === item.$id) {
                            _repo.splice(i, 1);
                            _repo.push(item);
                            return item;
                        }
                    }

                    throw new Error("Cannot update; updatedItem is not in repository,");
                }
            };

            return MockRepository;
        }])
})();