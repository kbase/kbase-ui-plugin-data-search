define([
    '../indexObjectBase'
], function (
    IndexObjectBase
) {
    'use strict';

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
        }
    ];

    const searchFields = {
        title:  {
            disableSort: true,
            label: 'Title',
            type: 'string'
        },
        source: {
            label: 'Source',
            type: 'string'
        },
        code_output: {
            label: 'Code Output',
            type: 'string'
        },
        app_output: {
            label: 'App Output',
            type: 'string'
        },
        app_info: {
            label: 'App Info',
            type: 'string'
        },
        app_input: {
            label: 'App Input',
            type: 'string'
        },
        job_ids: {
            label: 'Job Ids',
            type: 'string'
        },
        creator: {
            label: 'Creator',
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
      

    class NarrativeIndex1 extends IndexObjectBase {
        constructor(runtime, object) {
            super({
                runtime,
                object,
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
            return {
                title: this.object.key_props.title
            };
        }
    }
 
    return NarrativeIndex1;
});