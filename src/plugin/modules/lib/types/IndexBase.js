define([], function () {
    'use strict'; 

    class IndexObjectBase {
        constructor(params) {
            // from params
            this.params = params;
            this.runtime = params.runtime;
            this.object = params.object;

            this.indexId = params.indexId;
            this.indexVersion = params.indexVersion;

            this.detailFieldDefs = params.detailFieldDefs;

            this.kbaseTypeModule = params.kbaseTypeModule;
            this.kbaseTypeId = params.kbaseTypeId;

            // The rest of what is passed in params remains available
            // via this.params.
            // TODO: bring them all into the object directly.
            this.searchFields = params.searchFields;
            
            // this.label = params.label;
            // this.isViewable = params.isViewable;
            // this.isCopyable = params.isCopyable;
            // this.uiClass = params.uiClass;

            // computed on the fly
            this.detailFields = null;
            this.objectRef = null;

            this.data = null;
        }

        getData() {
            if (this.data) {
                return this.data;
            }
            this.data = this.objectToData();
            return this.data;
        }

        detail() {
            if (this.detailFields) {
                return this.detailFields;
            }
            // Creates an ordered list of detail fields, ready for 
            // display.
            this.detailFields = [];
            let data = this.getData();
            this.detailFieldDefs.forEach((field) => {
                this.detailFields.push({
                    id: field.id,
                    label: field.label,
                    value: data[field.id],
                    type: field.type,
                    format: field.format,
                    component: field.component,
                    missing: field.missing,
                    default: field.default,
                    params: field.params
                });
            });
            return this.detailFields;
        }

        getRef() {
            if (this.objectRef) {
                return this.objectRef;
            }
            let m = this.object.guid.match(/^WS:(\d+)\/(\d+)\/(\d+)$/);
            let objectRef = m.slice(1, 4).join('/');
            this.objectRef =  {
                workspaceId: parseInt(m[1]),
                objectId: parseInt(m[2]),
                version: parseInt(m[3]),
                ref: objectRef,
                dataviewId: objectRef
            };
            return this.objectRef;
        }

        getIcon() {
            return this.runtime.service('type').getIcon({
                type:  {
                    module: this.kbaseTypeModule,
                    name: this.kbaseTypeId,
                    version: {
                        major: null,
                        minor: null
                    }
                }
            });
        }

        isViewable() {
            return this.params.isViewable;
        }

        isCopyable() {
            return this.params.isCopyable;
        }

        getUIClass() {
            return this.params.uiClass;
        }

        getLabel() {
            return this.params.label;
        }

        getSearchFieldLabel(fieldId) {
            // Handle universal fields which are not included
            // in the index object definition (searchFields);
            switch (fieldId) {
            case 'object_name':
                return 'Object Name';
            }
            let field = this.searchFields[fieldId];
            if (!field) {
                return;
            }
            return field.label;
        }

    }

    return IndexObjectBase;
});