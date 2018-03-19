define([
    '../ObjectIndexBase',
    '../utils',
    '../components/stringArray',
    '../components/taxonomy'
], function (
    ObjectIndexBase,
    utils,
    StringArrayComponent,
    TaxonomyComponent
) {
    'use strict';

    const indexId = 'Taxon';
    const indexVersion = 1;
    const kbaseTypeModule = 'KBaseGenomeAnnotations';
    const kbaseTypeId = 'Taxon';
    const label = 'Taxon';

    const detailFieldDefs = [
        {
            id: 'scientificName',
            label: 'Scientific Name'
        }, {
            id: 'scientificLineage',
            label: 'Lineage',
            component: TaxonomyComponent.name()
        },  {
            id: 'domain',
            label: 'Domain'
        }, {
            id: 'aliases',
            label: 'Aliases',
            component: StringArrayComponent.name()
        }
    ];

    const searchFields = {
        scientific_name: {
            label: 'Scientific Name',
            type: 'string'
        },
        scientific_lineage: {
            label: 'Scientific Lineage',
            type: 'string'
        }, domain: {
            label: 'Domain',
            type: 'string'
        },  aliases: {
            label: 'Aliases',
            type: 'string'
        }
    };
    
    const sortFields = [
        {
            key: 'scientific_name',
            label: 'Scientific Name'
        },
        {
            key: 'domain',
            label: 'Domain'
        }
    ];

    class TaxonIndex1 extends ObjectIndexBase {
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
            let data = this.object.data;
            return {
                scientificName: data.scientific_name,
                scientificLineage: utils.parseTaxonomy(data.scientific_lineage),
                domain: data.domain,
                aliases: data.aliases
            };
        }
    }
 
    return TaxonIndex1;
});