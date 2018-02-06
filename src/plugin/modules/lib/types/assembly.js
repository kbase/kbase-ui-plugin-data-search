define([
    'kb_common/props'
], function (
    Props
) {
    'use strict';

    function normalize(object) {
        return {
            title: object.data.scientific_name || object.object_name,
            description: 'description here...',
            contigCount: object.data.contigs,
            dnaSize: object.data.dna_size,
            gcContent: object.data.gc_content,
            // contigCount: {
            //     value: object.data.contigs,
            //     formatted: common.padRight(numeral(object.data.contigs).format('0,0'), 2)
            // },
            // dnaSize: {
            //     value: object.data.dna_size,
            //     formatted: common.padRight(numeral(object.data.dna_size).format('0,0'), 2)
            // },
            externalSourceId: object.data.external_source_id,
            // gcContent: {
            //     value: object.data.gc_content,
            //     formatted: numeral(100 * object.data.gc_content).format('0.0')
            // },
            name: object.data.name
        };
    }
    var detailFields = [
        {
            id: 'title',
            label: 'Title'
        },
        {
            id: 'description',
            label: 'Description1'
        },
        {
            id: 'contigCount',
            label:' # Contigs'
        },
        {
            id: 'dnaSize',
            label: 'DNA Size'
        },
        {
            id: 'gcContent',
            label: 'GC Content'
        },
        {
            id: 'externalSourceId',
            label: 'External source id'
        }
    ];

    function detail(object) {
        var data = Props.make({data: normalize(object)});
        return detailFields.map(function (field) {
            return {
                id: field.id,
                label: field.label,
                value: data.getItem(field.id)
            };
        });
    }

    function guidToReference(guid) {
        var m = guid.match(/^WS:(\d+)\/(\d+)\/(\d+)$/);
        var objectRef = m.slice(1, 4).join('/');
        return {
            workspaceId: parseInt(m[1]),
            objectId: parseInt(m[2]),
            version: parseInt(m[3]),
            ref: objectRef,
            dataviewId: objectRef
        };
    }

    return {
        normalize: normalize,
        detail: detail,
        guidToReference: guidToReference
    };
});