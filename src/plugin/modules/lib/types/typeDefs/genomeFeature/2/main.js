define([
    'kb_common/props',
    '../../../utils',
    '../../../components/taxonomy',
    '../../../components/location',
    '../../../components/aliases',
    '../../../components/stringArray',
    'yaml!./def.yaml'
], function (
    Props,
    utils,
    TaxonomyComponent,
    LocationComponent,
    AliasesComponent,
    StringArrayComponent,
    def
) {
    'use strict';

    utils.processTypeDef(def);

    function parseAliases(aliases) {
        if (!aliases) {
            return [];
        }

        return aliases.map(function (alias) {
            return {
                type: alias[0],
                alias: alias[1]
            };
        });
    }
    
    function factory(params) {
        var object = params.object;

        function normalize() {
            var proteinLength;
            var proteinTranslation = object.data.protein_translation;
            if (proteinTranslation) {
                proteinLength = proteinTranslation.length;
            }
            var normalized = {
                id: object.data.id,
                featureType: object.data.type,
                aliases: parseAliases(object.data.aliases),
                // function: object.data.functions[0],
                functions: object.data.functions,
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
                domain: object.parent_data.domain,
                scientificName: object.parent_data.scientific_name,
                taxonomy: utils.parseTaxonomy(object.parent_data.taxonomy),
                proteinTranslation: proteinTranslation,
                proteinLength: proteinLength
            };
            return normalized;
        }

        var detailFields = [
            {
                id: 'id',
                label: 'Id'
            },
            {
                id: 'featureType',
                label: 'Type'
            }, 
            {
                id: 'aliases',
                label: 'Aliases',
                component: AliasesComponent.name()
            },
            {
                id: 'location',
                label: 'Location',
                component: LocationComponent.name()
            },
            {
                id: 'domain',
                label: 'Domain'
            },
            {
                id: 'scientificName',
                label: 'Scientific name'
            },
            {
                id: 'taxonomy',
                label: 'Taxonomy',
                component: TaxonomyComponent.name()
            },
            // {
            //     id: 'function',
            //     label: 'Function'
            // },
            {
                id: 'functions',
                label: 'Functions',
                component: StringArrayComponent.name()
            },
            {
                id: 'proteinTranslation',
                label: 'Protein Translation'                
            },
            {
                id: 'proteinLength',
                label: 'Protein Length',
                unit: 'aa',
                type: 'number',
                format: '0,0'
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