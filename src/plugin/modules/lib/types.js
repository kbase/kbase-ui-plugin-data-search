define([
    'bluebird',
    'require',
    'yaml!./types/typeIndex.yml'
    // './types/narrative',
    // './types/genome',
    // './types/genomeFeature',
    // './types/assembly',
    // './types/assemblyContig',
    // './types/pairedEndLibrary',
    // './types/singleEndLibrary'
], function (
    Promise,
    localRequire,
    typeIndex
    // narrative,
    // genome,
    // genomeFeature,
    // assembly,
    // assemblyContig,
    // pairedEndLibrary,
    // singleEndLibrary
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
                    type.module,
                    String(type.version),
                    'main'
                ].join('/');
                return prequire([modulePath])
                    .spread(function (module) {
                        return {
                            type: type,
                            module: module
                        };
                    });
            }))
                .then(function (types) {
                    var objectTypeMap = {};
                    types.forEach(function (type) { 
                        objectTypeMap[type.type.id] = type;
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

        function getTypeForObject(searchObject) {
            var type = objectTypeMap[searchObject.object_props.type.toLowerCase()];

            if (!type) {
                console.error('Object type not found!!!', searchObject, objectTypeMap);
                throw new Error('Object type not found!!: ' + searchObject.object_props.type);
            }

            return type.module.make({object: searchObject});
        }

        function getLookup() {
            return objectTypes.map(function (objectType) {
                return {
                    id: objectType.id,
                    label: objectType.label
                };
            });
        }

        function getIcon(type) {
            var icon = runtime.service('type').getIcon({
                type:  {
                    module: type.getDef().kbaseTypeModule,
                    name: type.getDef().kbaseTypeId,
                    version: {
                        major: null,
                        minor: null
                    }
                }
            });
            return icon;
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
            getIcon: getIcon
        };
    }

    return {
        make: factory
    };
});