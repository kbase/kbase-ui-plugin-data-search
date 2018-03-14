define([
    '../indexSubObjectBase',
    '../utils',
    '../components/taxonomy',
    '../components/location',
    '../components/aliases',
    '../components/stringArray'
], function (
    IndexSubObjectBase,
    utils,
    TaxonomyComponent,
    LocationComponent,
    AliasesComponent,
    StringArrayComponent
) {
    'use strict';

    const kbaseTypeModule = 'KBaseGenomes';
    const kbaseTypeId = 'GenomeFeature';

    const label = 'Genome Feature';
    const isViewable = true;
    const isCopyable = false; 
    const uiClass = 'subObject';

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
            id: 'location',
            label: 'Location',
            component: LocationComponent.name()
        },
        {
            id: 'domain',
            label: 'Domain'
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
            id: 'functions',
            label: 'Functions',
            component: StringArrayComponent.name()
        },
        {
            id: 'proteinTranslation',
            label: 'Protein Translation'                
        },
        {
            id: 'proteinLength',
            label: 'Protein Length',
            unit: 'aa',
            type: 'number',
            format: '0,0'
        }
    ];

    const searchFields =  {
        id: {
            label: 'ID',
            type: 'string'
        },
        functions : {
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
        },
        {
            key: 'start',
            label: 'Start'
        }
    ];

    function parseAliases(aliases) {
        if (!aliases) {
            return [];
        }

        return aliases.map(function (alias) {
            return {
                type: 'n/a',
                alias: alias
            };
        });
    }

    class GenomeFeature2 extends IndexSubObjectBase {
        constructor(runtime, object) {
            super({
                runtime,
                object,
                detailFieldDefs,
                searchFields, 
                sortFields,
                kbaseTypeModule,
                kbaseTypeId,
                label,
                isViewable,
                isCopyable,
                uiClass
            });
        }

        objectToData() {
            var data = this.object.data;
            var proteinLength;
            var proteinTranslation = data.protein_translation;
            if (proteinTranslation) {
                proteinLength = proteinTranslation.length;
            }

            var location = data.location.map(function (location) {
                var start = location[1];
                var length = location[3];
                var direction = location[2];
                var end;
                switch (direction) {
                case '+':
                    end = start + length - 1;
                    break;
                case '-':
                    end = start - length + 1;
                    break;
                default:
                    throw new Error('Invalid direction: ' + direction);
                }
                return {
                    genome: location[0],
                    start: start,
                    direction: direction,
                    length: length,
                    end: end
                };
            });

            return {
                featureType: data.type,
                id: data.id,
                aliases: parseAliases(data.aliases),
                functions: data.functions,
                location: location,
                proteinTranslation: proteinTranslation,
                proteinLength: proteinLength, 
                domain: this.object.parent_data.domain,
                scientificName: this.object.parent_data.scientific_name,
                taxonomy: utils.parseTaxonomy(this.object.parent_data.taxonomy)
            };
        }
    }

    return GenomeFeature2;
});