define([
    'kb_common/props',
    './utils',
    './components/taxonomy'
], function (
    Props,
    utils,
    TaxonomyComponent
) {
    'use strict';

    function normalize(object) {
        return {
            id: object.data.id,
            assemblyGuid: object.data.assembly_guid,
            domain: object.data.domain,
            featureCount: object.data.features,
            scientificName: object.data.scientific_name,
            taxonomy: utils.parseTaxonomy(object.data.taxonomy),
            dnaSize: object.data.dna_size,
            source: object.data.source,
            sourceId: object.data.source_id,
            accession: object.data.accession
        };
    }

    var detailFields = [
        {
            id: 'scientificName',
            label: 'Scientific name'
        },
        {
            id: 'domain',
            label: 'Domain'
        },
        {
            id: 'taxonomy',
            label: 'Taxonomy',
            component: TaxonomyComponent.name()
        },
        {
            id: 'id',
            label: 'KBase ID'
        },

        {
            id: 'dnaSize',
            label: 'DNA Size',
            type: 'number',
            format: '0,0'
        },
        {
            id: 'featureCount',
            label:' # Features',
            type: 'number',
            format: '0,0'
        },
        {
            id: 'source',
            label: 'Source'
        },
        {
            id: 'sourceId',
            label: 'Source ID'
        },
        {
            id: 'assession',
            label: 'Accession'
        }
    ];

    function detail(object) {
        var data = Props.make({data: normalize(object)});
        return detailFields.map(function (field) {
            return {
                id: field.id,
                label: field.label,
                value: data.getItem(field.id),
                type: field.type,
                format: field.format,
                component: field.component
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