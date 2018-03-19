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
                col1: 'type',
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
            label: 'Type',
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
            let data = this.object.data;
            var labels = Object.keys(data.default_node_labels).map(function (key) {
                return {
                    key: key,
                    value: data.default_node_labels[key]
                };
            });
            return {
                labels: labels,
                type: data.type
            };
        }
    }
 
    return TreeIndex1;
});