define([
    'bluebird',
    'require',
    './types/typeDefs/DefaultObjectIndex',
    'yaml!./types/typeIndex.yml'
], function (
    Promise,
    localRequire,
    DefaultObjectIndex,
    typeIndex
) {
    'use strict';

    function prequire(modules) {
        return Promise.all(modules.map(function (module) {
            return new Promise(function (resolve, reject) {
                localRequire([module], function (Module) {
                    resolve(Module);
                }, function (err) {
                    reject(err);
                });
            });
        }));
    }

    function factory(params) {
        var runtime = params.runtime;
        var objectTypes; 
        var objectTypeMap;

        function loadTypes() {
            return Promise.all(typeIndex.map(function (type) {
                var modulePath =[
                    './types/typeDefs', 
                    type.module
                ].join('/');
                return prequire([modulePath])
                    .spread(function (module) {
                        return {
                            type: type,
                            moduleClass: module
                        };
                    });
            }))
                .then(function (types) {
                    var objectTypeMap = {};
                    types.forEach(function (type) { 
                        objectTypeMap[type.type.id + '.' + type.type.version] = type;
                    });
                    return {
                        types: types,
                        typeMap: objectTypeMap
                    };
                });
        }

        function getType(key) {
            return objectTypeMap[key];
        }

        function getTypeForObject(object) {
            let objectType = object.type.toLowerCase();
            let objectTypeVersion = object.type_ver;
            let objectTypeId = [objectType, objectTypeVersion].join('.');
            let type = objectTypeMap[objectTypeId];

            if (!type) {
                // Use the default type class
                return new DefaultObjectIndex({runtime, object});
            }

            // return type.module.make({object: searchObject});
            // return a new instance of this index class.
            return new type.moduleClass({runtime, object});
        }

        function getLookup() {
            return objectTypes.map(function (objectType) {
                return {
                    id: objectType.id,
                    label: objectType.label
                };
            });
        }

        function start() {
            return loadTypes()
                .then(function (result) {
                    objectTypes = result.types;
                    objectTypeMap = result.typeMap;
                });
        }

        return {
            start: start,
            types: objectTypes,
            typesMap: objectTypeMap,
            getTypeForObject: getTypeForObject,
            getType: getType,
            getLookup: getLookup,
            // getIcon: getIcon
        };
    }

    return {
        make: factory
    };
});