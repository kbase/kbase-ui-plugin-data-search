define([
    'numeral',
    'kb_common/props',
    '../../../utils',
    'yaml!./def.yaml'
], function (
    numeral,
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
                sequencingTechnology: object.data.sequencing_tech,
                phredType: object.data.phred_type,
                readCount: object.data.read_count,
                meanReadLength: object.data.read_length_mean,
                meanInsertSize: object.data.insert_size_mean,
                meanQuality: object.data.qual_mean,
                gcContent: object.data.gc_content,
                objectName: object.object_name
            };
        }

        var detailFields = [
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
            getDef: getDef,
            getRef: getRef,
            normalize: normalize,
            detail: detail
        };
    }

    return {
        make: factory,
        def: def
    };
});