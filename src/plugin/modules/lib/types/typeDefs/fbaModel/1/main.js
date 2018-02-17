define([
    'kb_common/props',
    '../../../utils',
    '../../../components/taxonomy',
    'yaml!./def.yaml'
], function (
    Props,
    utils,
    TaxonomyComponent,
    def
) {
    'use strict';

    utils.processTypeDef(def);

    function factory(params) {
        var object = params.object;

        function normalize() {
            return {
                id: object.data.id,
                name: object.data.name,
                source: object.data.source,
                type: object.data.type,
                modelCompartments: object.data.modelcompartments,
                modelCompounds: object.data.modelcompounds,
                modelReactions: object.data.modelreactions,
                // genomeGuid: object.data.genome_guid,
                genomeRef: object.data.genome_ref,
                scientificName: object.key_props.scientific_name,
                taxonomy: utils.parseTaxonomy(object.key_props.taxonomy),
                genomeName: object.key_props.genome_name
            };
        }

        var detailFields = [
            {
                id: 'id',
                label: 'ID'
            },
            {
                id: 'name',
                label: 'Name'
            },
            {
                id: 'source',
                label: 'Source'
            },
            {
                id: 'type',
                label: 'Type'
            },
            {
                id: 'modelCompartments',
                label: 'Model Compartments',
                type: 'number',
                format: '0,0'
            },
            {
                id: 'modelCompounds',
                label: 'Model Compounds',
                type: 'number',
                format: '0,0'
            },
            {
                id: 'modelReactions',
                label: 'Model Reactions',
                type: 'number',
                format: '0,0'
            },
            // {
            //     id: 'genomeGuid',
            //     label: 'Genome GUID'
            // },
            {
                id: 'genomeRef',
                label: 'Genome Reference'
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
            {
                id: 'genomeName',
                label: 'Genome Name'
            }
        ];

        function detail() {
            return utils.dataToDetail(normalize(object), detailFields);
        }

        function getDef() {
            return def;
        }

        var ref = utils.objectGuidToRef(object.guid);
        function getRef() {
            return ref;
        }

        return {
            getRef: getRef,
            getDef: getDef,
            normalize: normalize,
            detail: detail
        };
    }

    return {
        make: factory,
        def: def
    };
});