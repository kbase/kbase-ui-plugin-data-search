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
            id: 'scientificName',
            label: 'Scientific Name',
        },
        {
            id: 'insertSize',
            label: 'Insert Size',
            type: 'number',
            format: '0,0'
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
            id: 'quality',
            label:'Quality',
            type: 'number',
            format: '0.000'
        },
        {
            id: 'phredType',
            label: 'Phred Type'
        },
        {
            id: 'files',
            label: 'Files'
        },
        {
            id: 'gcContent',
            label: 'GC Content',
            type: 'number',
            format: '0.000'
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
        files: {
            label: 'Files',
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
        insert_size: {
            label: 'Mean Insert Size',
            type: 'integer'
        },
        quality: {
            label: 'Quality',
            type: 'float'
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
                scientificName: data.scientific_name,
                gcContent: data.gc_content,
                meanInsertSize: data.insert_size_mean,
                phredType: data.phred_type,
                meanQuality: data.qual_mean,
                readCount: data.read_count,
                meanReadLength: data.read_length_mean,
                sequencingTechnology: data.sequencing_tech
            };
        }
    }

    return PairedEndLibraryIndex1;
});