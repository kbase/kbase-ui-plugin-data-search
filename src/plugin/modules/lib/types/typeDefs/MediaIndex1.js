define([
    '../indexObjectBase'
], function (
    IndexObjectBase
) {
    'use strict';

    const kbaseTypeModule = 'KBaseGenomeAnnotations';
    const kbaseTypeId = 'Assembly';

    const label = 'Media';
    const isViewable = true;
    const isCopyable = true; 
    const uiClass = 'dataObject';

    const detailFieldDefs = [
        {
            id: 'id',
            label: 'ID'
        },
        {
            id: 'name',
            label: 'Name'
        },
        {
            id: 'externalSourceId',
            label: 'External Source ID'
        },
        {
            id: 'type',
            label: 'Type'
        },
        {
            id: 'modelCompounds',
            label: 'Model Compounds',
            type: 'number',
            format: '0,0'
        },
        {
            id: 'isDefined',
            label: 'Defined',
            type: 'boolean',
            format: 'Yes:No'
        },
        {
            id: 'isMinimal',
            label: 'Minimal',
            type: 'boolean',
            format: 'Yes:No'
        },
        {
            id: 'isAerobic',
            label: 'Aerobic',
            type: 'boolean',
            format: 'Yes:No'
        }
    ];

    const searchFields = {
        id: {
            label: 'ID',
            type: 'string'
        },
        name: {
            label: 'Name',
            type: 'string'
        },
        external_source_id: {
            label: 'External Source',
            type: 'string'
        },
        type: {
            label: 'Type',
            type: 'string'
        },
        modelcompounds: {
            label: 'Model Compounds',
            type: 'integer'
        },
        isDefined: {
            label: 'Defined',
            type: 'boolean'
        },
        isMinimal: {
            label: 'Minimal',
            type: 'boolean'
        },
        isAerobic: {
            label: 'Aerobic',
            type: 'boolean'
        }
    };

    const sortFields = [];

    class MediaIndex1 extends IndexObjectBase {
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
            var data = this.object.data;
            return {
                id: data.id,
                name: data.name,
                externalSourceId: data.external_source_id,
                type: data.type,
                modelCompounds: data.modelcompounds,
                isDefined: data.isDefined,
                isMinimal: data.isMinimal,
                isAerobic: data.isAerobic
            };
        }
    }
 
    return MediaIndex1;
});