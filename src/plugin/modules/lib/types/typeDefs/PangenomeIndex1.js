define([
    '../objectIndexBase'
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
        }, {
            id: 'type',
            label: 'Pangenome Type'
        },  {
            id: 'genomeCount',
            label: 'Genome Count',
            type: 'number',
            format: '0,0'
        }, {
            id: 'orthologCount',
            label: 'Ortholog Count', 
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
            label: 'Genomes',
            type: 'integer'
        },  
        orhtologs: {
            label: 'Orthologs',
            type: 'integer'
        }
    };
    
    const sortFields = [
        {
            key: 'name',
            label: 'Name Name'
        },
        {
            key: 'type',
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
            let data = this.object.data;
            return {
                name: data.name,
                type: data.type,
                genomeCount: data.genome_refs,
                orthologCount: data.orthologs 
            };
        }
    }
 
    return TaxonIndex1;
});