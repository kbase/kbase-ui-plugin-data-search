define([
    'kb_common/props',
    '../../../utils',
    'yaml!./def.yaml'
], function (
    Props,
    utils,
    def
) {
    'use strict';

    utils.processTypeDef(def);

    function factory(params) {
        var object = params.object;

        function normalize() {
            return {
                id: object.data.id,
                name: object.data.name,
                externalSourceId: object.data.external_source_id,
                type: object.data.type,
                modelCompounds: object.data.modelcompounds,
                isDefined: object.data.isDefined,
                isMinimal: object.data.isMinimal,
                isAerobic: object.data.isAerobic
            };
        }

        var detailFields = [
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

        function detail() {
            return utils.dataToDetail(normalize(object), detailFields);
        }

        function getDef() {
            return def;
        }

        var ref = utils.objectGuidToRef(object.guid);
        function getRef() {
            return ref;
        }

        return {
            getRef: getRef,
            getDef: getDef,
            normalize: normalize,
            detail: detail
        };
    }

    return {
        make: factory,
        def: def
    };
});