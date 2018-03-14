define([
    '../indexSubObjectBase'
], function (
    IndexSubObjectBase
) {
    'use strict';

    const indexId = 'AssemblyContig';
    const indexVersion = 1;

    const kbaseTypeModule = 'KBaseGenomeAnnotations';
    const kbaseTypeId = 'AssemblyContig';

    const label = 'Assembly Contig';
    const isViewable = true;
    const isCopyable = false; 
    const uiClass = 'subObject';

    const detailFieldDefs = [
        {
            id: 'contigId',
            label: 'Contig ID'
        },
        {
            id: 'description',
            label: 'Description'
        },        
        {
            id: 'length',
            label: 'Length',
            type: 'number',
            format: '0,0'
        }, 
        {
            id: 'gcContent',
            label: 'GC Content',
            type: 'number',
            format: '0.000%'
        },

    ];

    const searchFields = {
        contig_id: {
            label: 'Contig Id',
            type: 'string'
        },
        description: {
            label: 'Description',
            type: 'string'
        },
        gc_content: {
            label: 'GC Content',
            type: 'float'
        },
        length: {
            label: 'Length',
            type: 'integer'
        }
    };

    const sortFields = [
        {
            key: 'contig_id',
            label: 'Contig ID'
        },
        {
            key: 'gc_content',
            label: 'GC Content'
        },
        {
            key: 'length',
            label: 'Length'
        }
    ];
      

    class AssemblyContig1 extends IndexSubObjectBase {
        constructor(runtime, object) {
            super({
                runtime,
                object,
                indexId, 
                indexVersion,
                detailFieldDefs,
                searchFields,
                sortFields,
                kbaseTypeModule,
                kbaseTypeId,
                label,
                isViewable,
                isCopyable,
                uiClass
            });
        }

        objectToData() {
            let data = this.object.data;
            return {
                description: data.description,
                contigId: data.contig_id,
                length: data.value,
                gcContent: data.gc_content, 
            };
        }
    }
 
    return AssemblyContig1;
});