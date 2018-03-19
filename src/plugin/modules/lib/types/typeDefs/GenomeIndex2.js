define([
    'kb_common/props',
    '../utils',
    '../objectIndexBase',
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
            id: 'domain',
            label: 'Domain'
        },
        {
            id: 'scientificName',
            label: 'Scientific name'
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
            return {
                id: this.object.data.id,
                // assemblyGuid: object.data.assembly_guid,
                domain: this.object.data.domain,
                taxonomy: utils.parseTaxonomy(this.object.data.taxonomy),
                scientificName: this.object.data.scientific_name,
                notes: this.object.data.notes,
                source: this.object.data.source,
                featureCount: this.object.data.features,
                contigCount: this.object.data.contigs,
                cdsCount: this.object.data.cdss,
                mrnaCount: this.object.data.mrnas,
                nonCodingFeatureCount: this.object.data.non_coding_features,
                warnings: this.object.data.warnings,
                featureCounts: this.object.data.feature_counts,
                genomeTiers: this.object.data.genome_tiers
            };
        }
    }

    return GenomeIndex2;
});