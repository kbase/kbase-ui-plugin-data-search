define([
    './IndexBase',
    './components/stringArray',
    './components/keyValueList'
], function (
    IndexBase,
    StringArrayComponent,
    KeyValueListComponent
) {
    'use strict';
  
    
    // Assume nothing is sortable.
    const sortFields = [       
    ];

    function isAtomic(value) {
        switch (typeof value) {
        case 'undefined':
        case 'string':
        case 'number':                   
        case 'boolean':
            return true;
        default: 
            if (value === null) {
                return true;
            }
            return false;
        }
    }

    // Generate a generic detail field display spec.
    function generateDetailFields(object) {        
        return Object.keys(object.data).map((key) => {
            let value = object.data[key];
            switch (typeof value) {
            case 'string':
            case 'number':
                return {
                    id: key,
                    label: key
                };
            case 'boolean':
                return {
                    id: key,
                    label: key,
                    type: 'boolean',
                };
            case 'object':
                if (value instanceof Array) {
                    // assume a simple array of strings
                    return {
                        id: key,
                        label: key,
                        component: StringArrayComponent.name()
                    };
                } else if (value === null) {
                    return {
                        id: key,
                        label: key
                    };
                } else {
                    // maybe a simple map?
                    if (Object.keys(value).some((key) => {
                        let prop = value[key];
                        if (typeof prop === 'object' && prop !== null) {
                            return true;
                        }
                    })) {
                        return false;
                    }

                    return {
                        id: key,
                        label: key,
                        component: KeyValueListComponent.name()
                    };
                }
            }
            return null;
        }).filter((field) => {
            return field ? true : false;
        });
    }

    function generateSearchFields(object) {
        return Object.keys(object.key_props).reduce((searchFields, key) => {
            // currently all key_props are returned as strings; we use the type
            // to indicate the actual type indexed. This is necessary for implementing
            // per-key search, which is not utilized in this module, other than for
            // internal implementation.
            // TODO: perhaps we can just remove the type then.
            let fieldType = 'string';
            searchFields[key] = {
                label: key,
                type: fieldType
            };

            return searchFields;
        }, {});
    }


    class DefaultObjectIndexBase extends IndexBase {
        constructor(params) {
            
            let indexId = params.object.type.toLowerCase();
            let indexVersion = params.object.type_ver;
            // TODO: search api needs to return this
            let kbaseTypeModule = null;
            let kbaseTypeId = null;
            // the index id can suffice here - but it it is not "exactly" human-readable
            let label = indexId;

            let detailFieldDefs = generateDetailFields(params.object);

            let searchFields = generateSearchFields(params.object);

            super({
                runtime: params.runtime,
                object: params.object,
                indexId,
                indexVersion,
                detailFieldDefs,
                searchFields,
                sortFields,
                kbaseTypeModule,
                kbaseTypeId,
                label
            });
        }

        /*
        Transforms the search result object into a form suitable (and known) to the 
        rest of the module.
        In the case of an object from an unkown index, we sinply return the entire
        // 
        */
        objectToData() {
            // we need to convert some fields

            // a top level property which is an array is inspected to ensure it is
            // just atomic values ... an object must be a "map" - key->atomic

            let data = Object.keys(this.object.data).reduce((data, key) => {
                let value = this.object.data[key];
                if (isAtomic(value)) {
                    data[key] = value;
                } else {
                    if (typeof value === 'object') {
                        if (value instanceof Array) {
                            // assume a simple array of strings, if not, ignore
                            if (!value.some((element) => {
                                if (!isAtomic(element)) {
                                    return true;
                                }
                            })) {
                                data[key] = value;
                            }                            
                        } else {
                            // maybe a simple map? If not, ignore.
                            if (!Object.keys(value).some((key) => {
                                let prop = value[key];
                                if (!isAtomic(prop)) {
                                    return true;
                                }
                            })) {
                                data[key] = Object.keys(value).map((key) => {
                                    return {
                                        key: key,
                                        value: value[key]
                                    };
                                });
                            }                                                    
                        }
                    }
                }
                return data;
            }, {});
            return data;
        }

        getIcon() {
            var classes = ['fa', 'fa-question-circle-o'];
            return {
                classes: classes,
                type: 'fontAwesome',
                color: 'red',
                html: '<span class="' + classes.join(' ') + '"></span>'
            };
        }
    }
 
    return DefaultObjectIndexBase;
});