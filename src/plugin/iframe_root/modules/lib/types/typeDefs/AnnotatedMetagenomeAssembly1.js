define([
    'kb_common/props',
    '../utils',
    '../ObjectIndexBase'
], function (
    Props,
    utils,
    ObjectIndexBase
) {
    'use strict';

    const indexId = 'AnnotatedMetagenomeAssembly';
    const indexVersion = 1;

    const kbaseTypeModule = 'KBaseMetagenomes';
    const kbaseTypeId = 'AnnotatedMetagenomeAssembly';

    const label = 'AnnotatedMetagenomeAssembly';

    const detailFieldDefs = [

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
            id: 'meanContigLength',
            label:'Mean Contig Length',
            type: 'number',
            format: '0,0.0'
        },
        {
            id: 'gcContent',
            label: 'GC Content',
            type: 'number',
            format: '0.000'
        },


        {
            id: 'featureCount',
            label:' # Features',
            type: 'number',
            format: '0,0'
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
        },
        publication_titles: {
            label: 'Publications',
            type: 'string'
        },
        publication_authors: {
            label: 'Publication Authors',
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

        getTitle() {
            return this.object.data.scientific_name ||
                   this.object.object_name;
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
                externalOriginationFileName: data.original_source_file_name,
                cdsCount: data.cds_count,
                featureCount: data.feature_count,
                mrnaCount: data.mrna_count,
                nonCodingFeatureCount: data.non_coding_feature_count,
                assemblyRef: data.assembly_ref,
                source: data.source,
                sourceId: data.source_id,
                warnings: data.warnings,
                // publicationTitles: data.publication_titles,
                // publicationAuthors: data.publication_authors
            };
        }
    }

    return GenomeIndex1;
});
