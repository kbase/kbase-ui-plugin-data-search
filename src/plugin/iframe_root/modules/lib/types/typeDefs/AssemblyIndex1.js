define([
    '../ObjectIndexBase'
], function (
    ObjectIndexBase
) {
    'use strict';

    const indexId = 'Assembly';
    const indexVersion = 1;
    const kbaseTypeModule = 'KBaseGenomeAnnotations';
    const kbaseTypeId = 'Assembly';
    const label = 'Assembly';

    const detailFieldDefs = [
        {
            id: 'name',
            label: 'Name'
        },
        {
            id: 'meanContigLength',
            label: 'Mean Contig Length',
            type: 'number',
            format: '0,0'
        },
        {
            id: 'percentCompleteContigs',
            label: 'Percent Complete Contigs',
            type: 'number',
            format: '0.00%'
        },
        {
            id: 'percentCircleContigs',
            label: 'Percent Circle Contigs',
            type: 'number',
            format: '0.00%'
        },
        {
            id: 'assemblyId',
            label: 'Assembly ID'
        },
        {
            id: 'gcContent',
            label: 'GC Content',
            type: 'number',
            format: '0.000%'
        },
        {
            id: 'dnaSize',
            label: 'DNA Size',
            type: 'number',
            format: '0,0'
        },
        {
            id: 'contigCount',
            label: '# Contigs',
            type: 'number',
            format: '0,0'
        },
        {
            id: 'taxonRef',
            label: 'Taxon Reference'
        },
        {
            id: 'externalSource',
            label: 'External Source'
        },
        {
            id: 'externalOriginationDate',
            label: 'External Origination Date'
        },
        {
            id: 'externalSourceId',
            label: 'External Source ID'
        }
    ];

    const searchFields = {
        name: {
            label: 'Name',
            type: 'string'
        }
    };

    const sortFields = [
        {
            key: 'name',
            label: 'Name'
        },
        {
            key: 'dna_size',
            label: 'DNA Size'
        },
        {
            key: 'gc_content',
            label: 'GC Content'
        }
    ];


    class AssemblyIndex1 extends ObjectIndexBase {
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
                name: data.assembly_name,
                meanContigLength: data.mean_contig_length,
                percentCompleteContigs: data.percent_complete_contigs,
                percentCircleContigs: data.percent_circle_contigs,
                assemblyId: data.assembly_id,
                gcContent: data.gc_content,
                dnaSize: data.size,
                contigCount: data.num_contigs,
                taxonRef: data.taxon_ref,
                externalOriginationDate: data.external_origination_date,
                externalSourceId: data.external_source_id,
                externalSource: data.external_source
            };
        }
    }

    return AssemblyIndex1;
});