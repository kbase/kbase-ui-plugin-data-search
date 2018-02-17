define([
    'numeral',
    '../../../utils',
    'yaml!./def.yaml',
], function (
    numeral,
    utils ,
    def
) {
    'use strict';

    utils.processTypeDef(def);

    function factory(params) {
        var object = params.object;

        function normalize() {
            object['assemblyContig'] = {
                title: null || object.object_name,
                description: object.data.description,
                contigId: object.data.contig_id,
                length: {
                    value: object.data.length,
                    formatted: utils.padRight(numeral(object.data.contigs).format('0,0'), 4)
                },
                gcContent: {
                    value: object.data.gc_content,
                    formatted: utils.padRight(numeral(100 * object.data.gc_content).format('0.000'))
                }
            };
        }

        function getDef() {
            return def;
        }

        var ref = utils.subObjectGuidToRef(object.guid);

        function getRef() {
            return ref;
        }

        function detail() {
            return utils.dataToDetail(normalize(object), detailFields);
        }

        return {
            getDef: getDef,
            getRef: getRef(),
            normalize: normalize,
            detail: detail
        };
    }

    return {
        make: factory,
        def: def
    };
});