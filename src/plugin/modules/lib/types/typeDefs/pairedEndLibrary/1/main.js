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
                scientificName: object.data.scientific_name,
                gcContent: object.data.gc_content,
                meanInsertSize: object.data.insert_size_mean,
                phredType: object.data.phred_type,
                meanQuality: object.data.qual_mean,
                readCount: object.data.read_count,
                meanReadLength: object.data.read_length_mean,
                sequencingTechnology: object.data.sequencing_tech
            };
        }

        var detailFields = [
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