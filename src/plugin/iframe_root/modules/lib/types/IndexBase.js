define([], function () {
    'use strict';

    function getIcon(arg) {
        // var icon = types.getItem(['types', arg.type.module, arg.type.name, 'icon']) || defaultIcon,
        //     classes = icon.classes.map(function (x) {
        //         return x;
        //     });
        const defaultIcon = {
            type: 'fontAwesome',
            classes: ['fa-file-o']
        };
        var icon = defaultIcon,
            classes = icon.classes.map(function (x) {
                return x;
            });
        switch (icon.type) {
        case 'kbase':
            classes.push('icon');
            if (arg.size) {
                switch (arg.size) {
                case 'small':
                    classes.push('icon-sm');
                    break;
                case 'medium':
                    classes.push('icon-md');
                    break;
                case 'large':
                    classes.push('icon-lg');
                    break;
                }
            }
            break;
        case 'fontAwesome':
            classes.push('fa');
            break;
        }
        if (classes) {
            return {
                classes: classes,
                type: icon.type,
                color: icon.color || getColor(arg.type),
                html: '<span class="' + classes.join(' ') + '"></span>'
            };
        }
    }

    function getColor(type) {
        var code = 0,
            i,
            colors = [
                '#F44336',
                '#E91E63',
                '#9C27B0',
                '#3F51B5',
                '#2196F3',
                '#673AB7',
                '#FFC107',
                '#0277BD',
                '#00BCD4',
                '#009688',
                '#4CAF50',
                '#33691E',
                '#2E7D32',
                '#AEEA00',
                '#03A9F4',
                '#FF9800',
                '#FF5722',
                '#795548',
                '#006064',
                '#607D8B'
            ],
            color;

        for (i = 0; i < type.name.length; i += 1) {
            code += type.name.charCodeAt(i);
        }
        color = colors[code % colors.length];
        return color;
    }

    const baseSearchFields = {
        obj_name: {
            label: 'Object Name',
            type: 'string'
        },
        shared_users: {
            label: 'Shared Users',
            type: 'string'
        },
        creator: {
            label: 'Creator',
            type: 'string'
        },
        tags: {
            label: 'Tags',
            type: 'string'
        },
        obj_type_module: {
            label: 'Object Type Module',
            type: 'string'
        },
        obj_type_name: {
            label: 'Object Type Name',
            type: 'string'
        }
    };

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
            this.searchFields = Object.assign({}, baseSearchFields, params.searchFields);

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
            const data = this.getData();
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

        // getRef() {
        //     if (this.objectRef) {
        //         return this.objectRef;
        //     }
        //     let m = this.object.guid.match(/^WS:(\d+)\/(\d+)\/(\d+)$/);
        //     let objectRef = m.slice(1, 4).join('/');
        //     this.objectRef =  {
        //         workspaceId: parseInt(m[1]),
        //         objectId: parseInt(m[2]),
        //         version: parseInt(m[3]),
        //         ref: objectRef,

        //         dataviewId: objectRef
        //     };
        //     return this.objectRef;
        // }

        getIcon() {
            // TODO: get this working, yuck!
            return getIcon({
                type: {
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
            const field = this.searchFields[fieldId];
            if (!field) {
                return;
            }
            return field.label;
        }
    }

    return IndexObjectBase;
});
