define([
    '../ObjectIndexBase'
], function (
    ObjectIndexBase
) {
    'use strict';

    const indexId = 'PairedEndLibrary';
    const indexVersion = 1;

    const kbaseTypeModule = 'KBaseAssembly';
    const kbaseTypeId = 'PairedEndLibrary';

    const label = 'Paired End Library';

    const detailFieldDefs = [
        {
            id: 'sequencingTechnology',
            label: 'Sequencing Technology'
        },
        {
            id: 'readCount',
            label: 'Read Length',
            type: 'number',
            format: '0,0'
        },
        {
            id: 'interleaved',
            label: 'Interleaved?',
            type: 'boolean',
            format: ['Yes', 'No']
        },
        {
            id: 'singleGenome',
            label: 'Single Genome?',
            type: 'boolean',
            format: ['Yes', 'No']
        },
        {
            id: 'provenanceServices',
            label: 'Provenance Services',
            type: 'string'
        },
        {
            id: 'phredType',
            label: 'Phred Type'
        },
        {
            id: 'meanQuality',
            label:'Mean Quality',
            type: 'number',
            format: '0.000'
        },
        {
            id: 'gcContent',
            label: 'GC Content',
            type: 'number',
            format: '0.000'
        },
        {
            id: 'meanQualityScore',
            label: 'Mean Quality Score',
            type: 'number',
            format: '0.000'
        },
        {
            id: 'meanReadLength',
            label: 'Mean Read Length',
            type: 'number',
            format: '0,0.00'
        }
    ];

    const searchFields = {
        sequencing_tech: {
            label: 'Sequencing Technology',
            type: 'string'
        }
    };

    const sortFields = [
        {
            key: 'technology',
            label: 'Sequencing Technology'
        },
        {
            key: 'provenance_services',
            label: 'Provenance Services'
        }
    ];

    class PairedEndLibraryIndex1 extends ObjectIndexBase {
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
            var data = this.object.data;
            return {
                sequencingTechnology: data.sequencing_tech,
                readCount: data.size,
                interleaved: data.interleaved,
                singleGenome: data.single_genome,
                provenanceServices: data.provenance_services || '',
                phredType: data.phred_type,
                meanQuality: data.mean_quality_score,
                gcContent: data.gc_content,
                meanQualityScore: data.mean_quality_score,
                meanReadLength: data.mean_read_length
            };
        }
    }

    return PairedEndLibraryIndex1;
});