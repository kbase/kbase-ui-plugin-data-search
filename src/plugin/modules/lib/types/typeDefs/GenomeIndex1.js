define([
    'kb_common/props',
    '../utils',
    '../ObjectIndexBase',
    '../components/taxonomy'
], function (
    Props,
    utils,
    ObjectIndexBase,
    TaxonomyComponent
) {
    'use strict';

    const indexId = 'Genome';
    const indexVersion = 1;

    const kbaseTypeModule = 'KBaseGenomes';
    const kbaseTypeId = 'Genome';

    const label = 'Genome';

    const detailFieldDefs = [
        {
            id: 'id',
            label: 'KBase ID'
        },
        {
            id: 'domain',
            label: 'Domain'
        },
        {
            id: 'taxonomy',
            label: 'Lineage',
            component: TaxonomyComponent.name()
        },
        {
            id: 'scientificName',
            label: 'Scientific name'
        },
        {
            id: 'featureCount',
            label:' # Features',
            type: 'number',
            format: '0,0'
        },
        // seems to never be present

        // {
        //     id: 'contigCount',
        //     label: '# Contigs',
        //     type: 'number',
        //     format: '0,0'
        // }
    ];

    const searchFields = {
        id: {
            label: 'ID',
            type: 'string'
        },
        domain: {
            label: 'Domain',
            type: 'string'
        },
        taxonomy: {
            label: 'Lineage',
            type: 'string'
        },
        scientific_name: {
            label: 'Scientific Name',
            type: 'string'
        },
        features: {
            label: 'Feature Count',
            type: 'integer'
        },
        assembly_ref: {
            label: 'Asssembly Ref',
            type: 'string'
        },
        contigs: {
            label: 'Contig Count',
            type: 'integer'
        }
    };

    const sortFields = [
        {
            key: 'id',
            label: 'ID'
        },
        {
            key: 'domain',
            label: 'Domain'
        },
        {
            key: 'scientific_name',
            label: 'Scientific name'
        }
    ];
      
      

    class GenomeIndex1 extends ObjectIndexBase {
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
            let contigCount;
            if (this.object.key_props.contigs) {
                try {
                    contigCount = parseInt(this.object.key_props.contigs, 10);
                } catch (ex) {
                    contigCount = null;
                }
            } else {
                contigCount = null;
            }
            // console.log('CONTIG?', this.object.key_props.contigs, this.object);
            return {
                id: data.id,
                domain: data.domain,
                taxonomy: utils.parseTaxonomy(data.taxonomy),
                scientificName: data.scientific_name,
                featureCount: data.features,
                contigCount: contigCount,
            };
        }
    }

    return GenomeIndex1;
});