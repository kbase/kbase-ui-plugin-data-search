define([
    'kb_common/props',
    '../../../utils',
    '../../../components/taxonomy',
    '../../../components/featureCounts',
    '../../../components/stringArray',
    'yaml!./def.yaml'
], function (
    Props,
    utils,
    TaxonomyComponent,
    FeatureCountsComponent,
    StringArrayComponent,
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
                notes: object.data.notes,
                source: object.data.source,
                featureCount: object.data.features,
                contigCount: object.data.contigs,
                cdsCount: object.data.cdss,
                mrnaCount: object.data.mrnas,
                nonCodingFeatureCount: object.data.non_coding_features,
                warnings: object.data.warnings,
                featureCounts: object.data.feature_counts,
                genomeTiers: object.data.genome_tiers
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
            {
                id: 'notes',
                label: 'Notes'
            },
            {
                id: 'source',
                label: 'Source'
            },
            {
                id: 'featureCount',
                label:' # Features',
                type: 'number',
                format: '0,0'
            },
            {
                id: 'cdsCount',
                label: '# CDSs',
                type: 'number',
                format: '0,0'
            },
            {
                id: 'mrnaCount',
                label: '# MRNAs',
                type: 'number',
                format: '0,0'
            },
            {
                id: 'nonCodingFeatureCount',
                label: '# Non Coding Features',
                type: 'number',
                format: '0,0'
            },
            {
                id: 'warnings',
                label: 'Warnings',
                component: StringArrayComponent.name()
            },
            {
                id: 'featureCounts',
                label: 'Feature Counts',
                component: FeatureCountsComponent.name()
            },
            {
                id: 'genomeTiers',
                label: 'Genome Tiers',
                component: StringArrayComponent.name()
            },
            {
                id: 'suspect',
                label: 'Suspect',
                type: 'boolean',
                // default: false,
                missing: 'n/a'
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