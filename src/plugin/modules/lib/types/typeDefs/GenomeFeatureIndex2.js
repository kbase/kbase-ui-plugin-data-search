define([
    '../SubObjectIndexBase',
    '../utils',
    '../components/taxonomy',
    '../components/location',
    '../components/aliases',
    '../components/stringArray'
], function (
    SubObjectIndexBase,
    utils,
    TaxonomyComponent,
    LocationComponent,
    AliasesComponent,
    StringArrayComponent
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
        stop: {
            label: 'Stop',
            type: 'integer'
        },
        feature_type: {
            label: 'Feature Type',
            type: 'string'
        },
        ontology_terms: {
            label: 'Ontology Terms',
            type: 'string'
        },
        genome_domain: {
            label: 'Genome Domain',
            type: 'string'
        },
        genome_taxonomy: {
            label: 'Genome Taxonomy',
            type: 'string'
        },
        genome_scientific_name: {
            label: 'Genome Scientific Name',
            type: 'string'
        }
    };

    const sortFields = [
        {
            key: 'id',
            label: 'ID'
        },
        {
            key: 'function',
            label: 'Function'
        }
    ];

    function parseAliases(aliases) {
        if (!aliases) {
            return [];
        }

        return aliases.map(function (alias) {
            return {
                type: alias[0],
                alias: alias[1]
            };
        });
    }

    class GenomeFeature2 extends SubObjectIndexBase {
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

    return GenomeFeature2;
});
