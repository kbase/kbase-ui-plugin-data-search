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
                // assemblyGuid: object.data.assembly_guid,
                domain: object.data.domain,
                taxonomy: utils.parseTaxonomy(object.data.taxonomy),
                scientificName: object.data.scientific_name,
                featureCount: object.data.features,
                contigCount: object.data.contigs,
                // dnaSize: object.data.dna_size,
                // source: object.data.source,
                // sourceId: object.data.source_id,
                // accession: object.data.accession
            };
        }

        var detailFields = [
            {
                id: 'id',
                label: 'KBase ID'
            },
            {
                id: 'domain',
                label: 'Domain'
            },
            {
                id: 'taxonomy',
                label: 'Taxonomy',
                component: TaxonomyComponent.name()
            },
            {
                id: 'scientificName',
                label: 'Scientific name'
            },

            // {
            //     id: 'dnaSize',
            //     label: 'DNA Size',
            //     type: 'number',
            //     format: '0,0'
            // },
            {
                id: 'featureCount',
                label:' # Features',
                type: 'number',
                format: '0,0'
            },
            {
                id: 'contigCount',
                label: '# Contigs',
                type: 'number',
                format: '0,0'
            }
            // {
            //     id: 'source',
            //     label: 'Source'
            // },
            // {
            //     id: 'sourceId',
            //     label: 'Source ID'
            // },
            // {
            //     id: 'assession',
            //     label: 'Accession'
            // }
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