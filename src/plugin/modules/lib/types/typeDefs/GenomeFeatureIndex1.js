define([
    '../SubObjectIndexBase',
    '../utils',
    '../components/taxonomy',
    '../components/location',
    '../components/aliases',
    '../components/stringArray',
    '../components/proteinTranslation'
], function (
    SubObjectIndexBase,
    utils,
    TaxonomyComponent,
    LocationComponent,
    AliasesComponent,
    StringArrayComponent
    // ProteinTranslationComponent
) {
    'use strict';

    const indexId = 'GenomeFeature';
    const indexVersion = 1;

    const kbaseTypeModule = 'KBaseGenomes';
    const kbaseTypeId = 'GenomeFeature';

    const label = 'Genome Feature';

    const detailFieldDefs = [
        {
            id: 'id',
            label: 'Id'
        },
        {
            id: 'featureType',
            label: 'Type'
        },
        {
            id: 'aliases',
            label: 'Aliases',
            component: AliasesComponent.name()
        },
        {
            id: 'functions',
            label: 'Functions',
            component: StringArrayComponent.name()
        },
        {
            id: 'scientificName',
            label: 'Scientific Name'
        }
    ];

    const searchFields =  {
        id: {
            label: 'ID',
            type: 'string'
        },
        functions: {
            label: 'Functions',
            type: 'string'
        },
        aliases: {
            label: 'Aliases',
            type: 'string',
            comment: 'list of string'
        },
        contig_id: {
            label: 'Contig ID',
            type: 'string'
        },
        start: {
            label: 'Start',
            type: 'integer'
        },
        strand: {
            label: 'Strand',
            type: 'string'
        },
        feature_type: {
            label: 'Feature Type',
            type: 'string'
        },
        genome_scientific_name: {
            label: 'Genome Scientific Name',
            type: 'string'
        }
    };

    const sortFields = [
        {
            isObjectName: false,
            isTimestamp: false,
            key: 'id',
            label: 'ID'
        },
        {
            isObjectName: false,
            isTimestamp: false,
            key: 'functions',
            label: 'Functions'
        }
    ];


    function parseAliases(aliases) {
        if (!aliases) {
            return [];
        }
        return aliases.map(function (alias) {
            return {
                type: null,
                alias: alias
            };
        });
    }

    class GenomeFeature1 extends SubObjectIndexBase {
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
                featureType: data.feature_type,
                id: data.id,
                aliases: parseAliases(data.aliases),
                functions: data.functions,
                scientificName: data.genome_scientific_name,
            };
        }
    }

    return GenomeFeature1;
});
