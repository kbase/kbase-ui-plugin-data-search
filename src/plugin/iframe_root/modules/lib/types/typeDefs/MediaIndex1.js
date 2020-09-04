define([
    '../ObjectIndexBase'
], function (
    ObjectIndexBase
) {
    'use strict';

    const indexId = 'Media';
    const indexVersion = 1;

    const kbaseTypeModule = 'KBaseGenomeAnnotations';
    const kbaseTypeId = 'Assembly';

    const label = 'Media';

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

    class MediaIndex1 extends ObjectIndexBase {
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
                id: data.kbase_id,
                name: this.object.obj_name,
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