define([
    '../IndexBase'
], function (
    IndexBase
) {
    'use strict';

    const indexId = 'Narrative';
    const indexVersion = 1;

    const kbaseTypeModule = 'KBaseNarrative';
    const kbaseTypeId = 'Narrative';

    const label = 'Narrative';
    const isViewable = false;
    const isCopyable = false;
    const uiClass = 'narrative';

    const detailFieldDefs = [
        {
            id: 'title',
            label: 'Title'
        },
        {
            id: 'author',
            label: 'Author'
        },
        {
            id: 'object_count',
            label: 'Total Objects'
        },
        {
            id: 'cell_count',
            label: 'Total Cells'
        }
    ];

    const searchFields = {
        narrative_title:  {
            disableSort: true,
            label: 'Title',
            type: 'string'
        },
        owner: {
            label: 'Owner',
            type: 'string'
        },
        // creator: {
        //     label: 'Creator',
        //     type: 'string'
        // },
        'data_objects.name': {
            label: 'Data Object Name',
            type: 'string'
        },
        'data_objects.obj_type': {
            label: 'Data Object Type',
            type: 'string'
        },
        'cells.desc': {
            label: 'Markdown Cells',
            type: 'string'
        }
    };

    const sortFields = [
        {
            key: 'title',
            label: 'Title'
        },
        {
            key: 'created',
            label: 'Created (fake)'
        },
        {
            key: 'updated',
            label: 'Updated (fake)'
        },
        {
            label: 'Owner (fake)',
            value: 'owner'
        },
        {
            label: 'Creator',
            value: 'creator'
        }
    ];

    class NarrativeIndex1 extends IndexBase {
        constructor(params) {
            super(Object.assign({}, params, {
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
            }));
        }

        objectToData() {
            const data = this.object.data;
            return {
                title: data.narrative_title,
                author: this.object.creator,
                owner: data.owner,
                object_count: data.data_objects.length,
                cell_count: data.total_cells
            };
        }

        getRef() {
            if (this.objectRef) {
                return this.objectRef;
            }
            var m = this.object.guid.match(/^WS:(\d+)\/(\d+)\/(\d+)$/);
            var objectRef = m.slice(1, 4).join('/');
            this.objectRef =  {
                workspaceId: parseInt(m[1]),
                objectId: parseInt(m[2]),
                version: parseInt(m[3]),
                objectRef: objectRef,
                dataviewId: objectRef
            };
            return this.objectRef;
        }
    }

    return NarrativeIndex1;
});