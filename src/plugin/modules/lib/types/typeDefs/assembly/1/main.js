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

        function getDef() {
            return def;
        }

        function normalize() {
            return {
                name: object.data.name,
                dnaSize: object.data.dna_size,
                gcContent: object.data.gc_content,
                externalSourceId: object.data.external_source_id,
                contigCount: object.data.contigs,
            };
        }

        function detail() {
            return utils.dataToDetail(normalize(object), def.detailFields);           
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