define([
    'kb_common/props',
    '../../../utils',
    'yaml!./def.yaml'
], function (
    Props,
    utils,
    def
) {
    'use strict';

    utils.processTypeDef(def);

    function factory(params) {
        var object = params.object;

        function normalize() {
            return {
                title: object.object_name,
                function: object.data.function,
                featureType: object.data.type,
                location: object.data.location.map(function (location) {
                    var start = location[1];
                    var length = location[3];
                    var direction = location[2];
                    var end;
                    switch (direction) {
                    case '+':
                        end = start + length - 1;
                        break;
                    case '-':
                        // end = start;
                        // start = end - length;
                        end = start - length + 1;
                        break;
                    default:
                        throw new Error('Invalid direction: ' + direction);
                    }
                    return {
                        genome: location[0],
                        start: start,
                        direction: direction,
                        length: length,
                        end: end
                    };
                }),
                genome: {
                    domain: object.parent_data.domain,
                    scientificName: object.parent_data.scientific_name,
                    taxonomy: utils.parseTaxonomy(object.parent_data.taxonomy)
                }
                //     return item.trim(' ');
                // assemblyGuid: object.data.assembly_guid,
                // domain: object.data.domain,
                // featureCount: object.data.features,
                // scientificName: object.data.scientific_name,
                // taxonomy: object.data.taxonomy ? object.data.taxonomy.split(';').map(function (item) {
                //     return item.trim(' ');
                // }).filter(function (item) {
                //     return (item.trim(' ').length !== 0);
                // }) : []
            };
        }

        var detailFields = [
            {
                id: 'title',
                label: 'Title'
            },
            {
                id: 'description',
                label: 'Description1'
            },
            {
                id: 'function',
                label: 'Function'
            },
            {
                id: 'featureType',
                label: 'Feature type'
            },
            {
                id: 'location',
                label: 'Location'
            },
            {
                id: 'genome.domain',
                label: 'Domain'
            },
            {
                id: 'genome.scientificName',
                label: 'Scientific name'
            },
            {
                id: 'genome.taxonomy',
                label: 'Taxonomy'
            }
        ];

        function detail() {
            return utils.dataToDetail(normalize(object), detailFields);
        }

        var ref = utils.subObjectGuidToRef(object.guid);
        function getRef() {
            return ref;
        }

        function getDef() {
            return def;
        }

        return {
            getDef: getDef,
            getRef: getRef,
            normalize: normalize,
            detail: detail
        };
    }

    return {
        make: factory,
        def: def
    };
});