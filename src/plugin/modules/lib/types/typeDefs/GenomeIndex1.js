define([
    'kb_common/props',
    '../utils',
    '../indexObjectBase',
    '../components/taxonomy'
], function (
    Props,
    utils,
    IndexObjectBase,
    TaxonomyComponent
) {
    'use strict';

    const indexId = 'Genome';
    const indexVersion = 1;

    const kbaseTypeModule = 'KBaseGenomes';
    const kbaseTypeId = 'Genome';

    const label = 'Genome';
    const isViewable = true;
    const isCopyable = true; 
    const uiClass = 'dataObject';

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
            label: 'Taxonomy',
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
        {
            id: 'contigCount',
            label: '# Contigs',
            type: 'number',
            format: '0,0'
        }
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
            label: 'Taxonomy',
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
      
      

    class GenomeIndex1 extends IndexObjectBase {
        constructor(runtime, object) {
            super({
                runtime,
                object,
                indexId,
                indexVersion,
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
            return {
                id: this.object.data.id,
                domain: this.object.data.domain,
                taxonomy: utils.parseTaxonomy(this.object.data.taxonomy),
                scientificName: this.object.data.scientific_name,
                featureCount: this.object.data.features,
                contigCount: this.object.data.contigs,
            };
        }
    }

    return GenomeIndex1;
});