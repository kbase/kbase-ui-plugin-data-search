define([
    '../ObjectIndexBase',
    '../components/taxonomy',
    '../utils'

], function (
    ObjectIndexBase,
    TaxonomyComponent,
    utils
) {
    'use strict';

    const indexId = 'FBAModel';
    const indexVersion = 1;

    const kbaseTypeModule = 'KBaseFBA';
    const kbaseTypeId = 'FBAModel';

    const label = 'FBA Model';

    const detailFieldDefs = [
        {
            id: 'id',
            label: 'ID'
        },
        {
            id: 'name',
            label: 'Name'
        },
        {
            id: 'source',
            label: 'Source'
        },
        {
            id: 'type',
            label: 'Type'
        },
        {
            id: 'modelCompartments',
            label: 'Model Compartments',
            type: 'number',
            format: '0,0'
        },
        {
            id: 'modelCompounds',
            label: 'Model Compounds',
            type: 'number',
            format: '0,0'
        },
        {
            id: 'modelReactions',
            label: 'Model Reactions',
            type: 'number',
            format: '0,0'
        },
        // {
        //     id: 'genomeGuid',
        //     label: 'Genome GUID'
        // },
        {
            id: 'genomeRef',
            label: 'Genome Reference'
        },
        {
            id: 'scientificName',
            label: 'Scientific name'
        },
        {
            id: 'taxonomy',
            label: 'Taxonomy',
            component: TaxonomyComponent.name()
        },
        {
            id: 'genomeName',
            label: 'Genome Name'
        }
    ];

    const searchFields = {
        id: {
            label: 'ID',
            type: 'string'
        },
        name: {
            label: 'Name',
            type: 'string'
        },
        source: {
            label: 'Source',
            type: 'string'
        },
        type: {
            label: 'Type',
            type: 'string'
        },
        modelcompartments: {
            label: 'Model Compartments',
            type: 'integer'
        },
        modelcompounds: {
            label: 'Model Compounds',
            type: 'integer'
        },
        modelreactions: {
            label: 'Model Reactions',
            type: 'integer'
        },
        genome_ref: {
            label: 'Genome Ref',
            type: 'string'
        },
        scientific_name: {
            label: 'Scientific Name',
            type: 'string'
        },
        taxonomy: {
            label: 'Taxonomy',
            type: 'string'
        },
        genome_name: {
            label: 'Genome',
            type: 'string'
        }
    };

    const sortFields = [];


    class FBAModelIndex1 extends ObjectIndexBase {
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
            var data = this.object.data;
            return {
                id: data.kbase_id,
                name: this.object.obj_name,
                source: data.source,
                type: data.type,
                modelCompartments: data.modelcompartments,
                modelCompounds: data.modelcompounds,
                modelReactions: data.modelreactions,
                // genomeGuid: object.data.genome_guid,
                genomeRef: data.genome_ref,
                scientificName: data.scientific_name,
                taxonomy: utils.parseTaxonomy(data.taxonomy),
                genomeName: data.genome_name
            };
        }
    }

    return FBAModelIndex1;
});
