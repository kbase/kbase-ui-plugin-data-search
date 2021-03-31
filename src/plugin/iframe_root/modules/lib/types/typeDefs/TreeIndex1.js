define([
    '../ObjectIndexBase',
    '../components/keyValueList',
], function (
    ObjectIndexBase,
    KeyValueListComponent
) {
    'use strict';

    const indexId = 'Tree';
    const indexVersion = 1;
    const kbaseTypeModule = 'KBaseTrees';
    const kbaseTypeId = 'Tree';
    const label = 'Tree';

    const detailFieldDefs = [
        {
            id: 'labels',
            label: 'Labels',
            component: KeyValueListComponent.name(),
            params: {
                col1: 'node_id',
                col2: 'label'
            }
        }, {
            id: 'type',
            label: 'Tree Type'
        }
    ];

    const searchFields = {
        default_node_labels: {
            label: 'Labels',
            type: 'string'
        }, type: {
            label: 'Tree Type',
            type: 'string'
        }, name: {
            label: 'Name',
            type: 'string'
        }
    };

    const sortFields = [
        {
            key: 'type',
            label: 'Type'
        }
    ];

    class TreeIndex1 extends ObjectIndexBase {
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
                name: [this.object.obj_name, data.tree_name].join(' - '),
                type: data.type,
                labels: data.labels,
            };
        }
    }

    return TreeIndex1;
});
