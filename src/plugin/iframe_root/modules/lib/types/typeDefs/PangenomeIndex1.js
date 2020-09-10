define([
    '../ObjectIndexBase'
], function (
    ObjectIndexBase
) {
    'use strict';

    const indexId = 'Pangenome';
    const indexVersion = 1;
    const kbaseTypeModule = 'KBaseGenomes';
    const kbaseTypeId = 'Pangenome';
    const label = 'Pangenome';

    const detailFieldDefs = [
        {
            id: 'name',
            label: 'Name'
        },
        {
            id: 'type',
            label: 'Pangenome Type'
        },
        {
            id: 'genomeCount',
            label: 'Genome Count',
            type: 'number',
            format: '0,0'
        }
    ];

    const searchFields = {
        name: {
            label: 'Name',
            type: 'string'
        },
        type: {
            label: 'Pangenome Type',
            type: 'string'
        },
        genomes: {
            label: 'GenomeRefs',
            type: 'string'
        }
    };

    const sortFields = [
        {
            key: 'pangenome_name',
            label: 'Name Name'
        },
        {
            key: 'pangenome_type',
            label: 'Pangenome Type'
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
            const data = this.object.data;
            return {
                name: data.pangenome_name,
                type: data.pangenome_type,
                genomeCount: data.genome_upas.length
            };
        }
    }

    return TaxonIndex1;
});