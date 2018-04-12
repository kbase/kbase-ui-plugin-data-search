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
            id: 'scientificName',
            label: 'Scientific name'
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
            id: 'featureCount',
            label:' # Features',
            type: 'number',
            format: '0,0'
        },
        {
            id: 'cdsCount',
            label: '# CDSs',
            type: 'number',
            format: '0,0'
        },
        {
            id: 'mrnaCount',
            label: '# mRNAs',
            type: 'number',
            format: '0,0'
        },
        {
            id: 'contigCount',
            label: '# Contigs',
            type: 'number',
            format: '0,0'
        },
        {
            id: 'source',
            label: 'Source',
            type: 'string'
        },
        {
            id: 'sourceId',
            label: 'Source ID', 
            type: 'string'
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
            label: 'Lineage',
            type: 'string'
        },
        scientific_name: {
            label: 'Scientific Name',
            type: 'string'
        },
        feature_count: {
            label: 'Feature Count',
            type: 'integer'
        },
        cds_count: {
            label: 'CDS Count',
            type: 'integer'
        },
        mrna_count: {
            label: 'mRNA Count',
            type: 'integer'
        },
        // assembly_ref: {
        //     label: 'Asssembly Ref',
        //     type: 'string'
        // },
        contigs: {
            label: 'Contig Count',
            type: 'integer'
        },
        source: {
            label: 'Source',
            type: 'string'
        },
        source_id: {
            label: 'Source ID',
            type: 'string'
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

    // function keyPropsIntValue(object, prop, defaultValue) {
    //     let propsValue = object.key_props[prop];
    //     if (propsValue) {
    //         try {
    //             return parseInt(propsValue, 10);
    //         } catch (ex) {
    //             return defaultValue;
    //         }
    //     } else {
    //         return defaultValue;
    //     }
    // }
      

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
            // console.log('do we need to??', data);
            return {
                id: data.id,
                domain: data.domain,
                taxonomy: utils.parseTaxonomy(data.taxonomy),
                scientificName: data.scientific_name,
                featureCount: data.features,
                mrnaCount: data.mrnas,
                cdsCount: data.cdss,
                // featureCount: keyPropsIntValue(this.object, 'feature_count', null),
                // mrnaCount: keyPropsIntValue(this.object, 'mrna_count', null),
                // cdsCount: keyPropsIntValue(this.object, 'cds_count', null),
                contigCount: data.num_contigs,
                source: data.source,
                sourceId: data.source_id
            };
        }
    }

    return GenomeIndex1;
});