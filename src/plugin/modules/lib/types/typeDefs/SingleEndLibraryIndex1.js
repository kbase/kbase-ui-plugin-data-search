define([
    '../ObjectIndexBase'
], function (
    ObjectIndexBase
) {
    'use strict';

    const indexId = 'PairedEndLibrary';
    const indexVersion = 1;

    const kbaseTypeModule = 'KBaseAssembly';
    const kbaseTypeId = 'SingleEndLibrary';

    const label = 'Single End Library';

    const detailFieldDefs = [
        {
            id: 'meanInsertSize',
            label: 'Mean Insert Size',
            type: 'number',
            format: '0,0.00'
        },
        {
            id: 'readCount',
            label: 'Read Length',
            type: 'number',
            format: '0,0'
        },
        {
            id: 'meanReadLength',
            label: 'Mean Read Length',
            type: 'number',
            format: '0,0.00'
        },
        {
            id: 'meanQuality',
            label:'Mean Quality',
            type: 'number',
            format: '0.000'
        },
        {
            id: 'phredType',
            label: 'Phred Type'
        },
        {
            id: 'gcContent',
            label: 'GC Content',
            type: 'number',
            format: '%0.00'
        },
        {
            id: 'sequencingTechnology',
            label: 'Sequencing Technology'
        }
    ];

    const searchFields = {
        technology: {
            label: 'Sequencing Technology',
            type: 'string'
        },
        file: {
            label: 'File',
            type: 'string'
        },
        phred_type: {
            label: 'Phred Type',
            type: 'string'
        },
        read_count: {
            label: 'Read Count',
            type: 'integer'
        },
        read_length: {
            label: 'Mean Read Length',
            type: 'integer'
        },
        quality: {
            label: 'float',
            type: 'Quality'
        },
        gc_content: {
            label: 'GC Content',
            type: 'float'
        }
    };
        
    const sortFields = [
        {
            key: 'technology',
            label: 'Sequencing Technology'
        },
        {
            key: 'read_count',
            label: 'Read Count'
        },
        {
            key: 'read_length',
            label: 'Mean Read Length'
        }
    ];

    class SingleEndLibraryIndex1 extends ObjectIndexBase {
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
                sequencingTechnology: data.sequencing_tech,
                phredType: data.phred_type,
                readCount: data.read_count,
                meanReadLength: data.read_length_mean,
                meanInsertSize: data.insert_size_mean,
                meanQuality: data.qual_mean,
                gcContent: data.gc_content
            };
        }
    }

    return SingleEndLibraryIndex1;
});