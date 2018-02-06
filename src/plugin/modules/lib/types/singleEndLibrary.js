define([
    'numeral',
    'kb_common/props',
    './common'
], function (
    numeral,
    Props,
    common
) {
    'use strict';

    function normalize(object) {
        object['singleEndLibrary'] = {
            title: object.data.scientific_name || object.object_name,
            description: 'description here...',
            gcContent: {
                value: object.data.gc_content,
                formatted: numeral(100 * object.data.gc_content).format('0.000')
            },
            // meanInsertSize: {
            //     value: object.data.insert_size_mean,
            //     formatted: padRight(numeral(object.data.insert_size_mean).format('0,0'), 4)
            // },
            phredType: object.data.phred_type,
            meanQuality: {
                value: object.data.qual_mean,
                formatted: numeral(object.data.qual_mean).format('0.000')
            },
            readCount: {
                value: object.data.read_count,
                formatted: common.padRight(numeral(object.data.read_count).format('0,0'), 4)
            },
            meanReadLength: {
                value: object.data.read_length_mean,
                formatted: common.padRight(numeral(object.data.read_length_mean).format('0,0'), 4)
            },
            sequencingTechnology: object.data.sequencing_tech
        };
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

    var detailFields = [
        {
            id: 'read_length',
            label: 'Read Length'
        },
        {
            id: 'quality',
            label:'Quality'
        },
        {
            id: 'phred_type',
            label: 'Phred Type'
        },
        {
            id: 'files',
            label: 'Files'
        },
        {
            id: 'gc_content',
            label: 'GC Content'
        },
        {
            id: 'read_count',
            label: 'Read Count'
        },
        {
            id: 'technology',
            label: 'Technology'
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

    return {
        normalize: normalize,
        guidToReference: guidToReference,
        detail: detail
    };
});