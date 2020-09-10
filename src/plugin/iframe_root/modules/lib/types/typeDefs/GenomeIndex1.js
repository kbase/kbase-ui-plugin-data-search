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
            id: 'size',
            label:'DNA Size (bp)',
            type: 'number',
            format: '0,0'
        },
        {
            id: 'contigCount',
            label:' # Contigs',
            type: 'number',
            format: '0,0'
        },
        {
            id: 'genomeType',
            label: 'Genome Type',
            type: 'string'
        },
        {
            id: 'gcContent',
            label: 'GC Content',
            type: 'number',
            format: '0.000'
        },
        {
            id: 'taxonomy',
            label: 'Lineage',
            component: TaxonomyComponent.name()
        },

        {
            id: 'meanContigLength',
            label:'Mean Contig Length',
            type: 'number',
            format: '0,0.0'
        },

        {
            id: 'cdsCount',
            label: '# CDSs',
            type: 'number',
            format: '0,0'
        },
        {
            id: 'featureCount',
            label:' # Features',
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
            id: 'assemblyRef',
            label: 'Assembly Reference',
            type: 'string'
        },
        {
            id: 'warnings',
            label: 'Warnings',
            component: StringArrayComponent.name()
        },

        {
            id: 'externalOriginationDate',
            label: 'External Origination Date',
            type: 'string'
        },
        {
            id: 'externalOriginationFileName',
            label: 'External Origination File Name',
            type: 'string'
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
        scientific_name: {
            label: 'Scientific Name',
            type: 'string'
        },
        genome_type: {
            label: 'Genome Type',
            type: 'string'
        },
        taxonomy: {
            label: 'Taxonomy',
            type: 'string'
        },
        assembly_ref: {
            label: 'Assembly Reference',
            type: 'string'
        },
        source: {
            label: 'Source',
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


    class GenomeIndex1 extends ObjectIndexBase {
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
            const data = this.object.data;
            return {
                id: data.genome_id,
                scientificName: data.scientific_name,
                size: data.size,
                contigCount: data.num_contigs,
                genomeType: data.genome_type,
                gcContent: data.gc_content,
                taxonomy: utils.parseTaxonomy(data.taxonomy),
                meanContigLength: data.mean_contig_length,
                externalOriginationDate: data.external_origination_date,
                originalSourceFileName: data.original_source_file_name,
                cdsCount: data.cds_count,
                featureCount: data.feature_count,
                mrnaCount: data.mrna_count,
                nonCodingFeatureCount: data.non_coding_feature_count,
                assemblyRef: data.assembly_ref,
                sourceId: data.source_id,
                warnings: data.warnings,
                publicationTitles: data.publication_titles,
                publicationAuthors: data.publication_authors
            };
        }
    }

    return GenomeIndex1;
});