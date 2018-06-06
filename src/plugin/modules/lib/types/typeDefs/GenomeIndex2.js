define([
    'kb_common/props',
    '../utils',
    '../ObjectIndexBase',
    '../components/taxonomy',
    '../components/featureCounts',
    '../components/stringArray'
], function (
    Props,
    utils,
    ObjectIndexBase,
    TaxonomyComponent,
    FeatureCountsComponent,
    StringArrayComponent
) {
    'use strict';

    const indexId = 'Genome';
    const indexVersion = 2;

    const kbaseTypeModule = 'KBaseGenomes';
    const kbaseTypeId = 'Genome';

    const label = 'Genome';

    const detailFieldDefs = [
        {
            id: 'id',
            label: 'KBase ID'
        },
        {
            id: 'scientificName',
            label: 'Scientific name'
        },
        {
            id: 'domain',
            label: 'Domain'
        },
        {
            id: 'taxonomy',
            label: 'Lineage',
            component: TaxonomyComponent.name()
        },
        {
            id: 'notes',
            label: 'Notes'
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
            id: 'warnings',
            label: 'Warnings',
            component: StringArrayComponent.name()
        },
        {
            id: 'suspect',
            label: 'Suspect',
            type: 'boolean',
            // default: false,
            missing: 'n/a'
        },
        {
            id: 'source',
            label: 'Source',
            type: 'string'
        },
        {
            id: 'sourceId',
            label: 'Source ID', 
            type: 'string'
        }
    ];

    const searchFields = {
        id: {
            label: 'ID',
            type: 'string'
        },
        domain: {
            label: 'Domain',
            type: 'string'
        },
        taxonomy: {
            label: 'Taxonomy',
            type: 'string'
        },
        scientific_name: {
            label: 'Scientific Name',
            type: 'string'
        },
        notes: {
            label: 'Notes',
            type: 'string'
        },
        source: {
            label: 'Source',
            type: 'string'
        },
        source_id: {
            label: 'Source ID',
            type: 'string'
        },
        features: {
            label: 'Feature Count',
            type: 'integer'
        },
        cdss: {
            label: 'CDS Count',
            type: 'integer'
        },
        mrnas: {
            label: 'MRNA Count',
            type: 'integer'
        },
        non_coding_features: {
            label: 'Non Coding Features',
            type: 'integer'
        },
        warnings: {
            label: 'Warnings',
            type: 'string'
        },
        feature_counts: {
            label: 'Feature Counts',
            type: 'string'
        },
        genome_tiers: {
            label: 'Genome Tiers',
            type: 'string'
        },
        suspect: {
            label: 'Suspect',
            type: 'boolean'
        },
        assembl_ref: {
            label: 'Asssembly Ref',
            type: 'string'
        }
    };
    const sortFields = [
        {
            key: 'id',
            label: 'ID'
        },
        {
            key: 'domain',
            label: 'Domain'
        },
        {
            key: 'scientific_name',
            label: 'Scientific name'
        }
    ];
      

    class GenomeIndex2 extends ObjectIndexBase {
        constructor(params) {
            super(Object.assign({}, params, {
                indexId, 
                indexVersion,
                detailFieldDefs,
                searchFields,
                sortFields,
                kbaseTypeModule,
                kbaseTypeId,
                label
            }));
        }

        objectToData() {
            let data = this.object.data;
            return {
                id: data.id,
                domain: data.domain,
                taxonomy: utils.parseTaxonomy(data.taxonomy),
                scientificName: data.scientific_name,
                notes: data.notes,
                featureCount: data.features,
                contigCount: data.contigs,
                cdsCount: data.cdss,
                mrnaCount: data.mrnas,
                nonCodingFeatureCount: data.non_coding_features,
                warnings: data.warnings,
                suspect: utils.parseBoolean(data.suspect),
                featureCounts: data.feature_counts,
                genomeTiers: data.genome_tiers,
                source: data.source,
                sourceId: data.source_id
            };
        }
    }

    return GenomeIndex2;
});