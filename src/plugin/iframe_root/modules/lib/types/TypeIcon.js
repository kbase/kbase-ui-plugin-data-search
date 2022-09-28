define([
    'json!./icons.json',

    'bootstrap'
], (
    iconConfig
) => {
    class TypeIcon {

        constructor({typeName, size}) {
            this.typeName = typeName;
            this.size = size;
            this.objectTypeConfig = this.fixIconConfig();
        }

        fixIconConfig() {
            const objectTypes = new Set(Object.keys(iconConfig.data).concat(Object.keys(iconConfig.color_mapping)));
            objectTypes.delete('DEFAULT');

            return Array.from(objectTypes.keys()).reduce((objectTypeConfig, typeName) => {
                const typeConfig = {};
                if (typeName in iconConfig.data) {
                    typeConfig.classNames = iconConfig.data[typeName][0].split(/\s+/);
                } else {
                    typeConfig.classNames = iconConfig.data.DEFAULT[0].split(/\s+/);
                }
                if (typeName in iconConfig.color_mapping) {
                    typeConfig.color = iconConfig.color_mapping[typeName];
                } else {
                    console.warn('Type without color assigned, defaulting', typeName);
                    typeConfig.color = this.getColor(typeName);
                }
                if (typeConfig.classNames.some((className) => { return className.includes('fa-'); })) {
                    typeConfig.type = 'fontAwesome';
                } else {
                    typeConfig.type = 'kbase';
                }
                objectTypeConfig[typeName] = typeConfig;
                return objectTypeConfig;
            }, {});
        }

        getDefaultIcon(typeName) {
            return {
                type: 'fontAwesome',
                classNames: ['fa-file-o'],
                color: this.getColor(typeName)
            };
        }

        getIcon() {
            const iconConfig = this.objectTypeConfig[this.typeName];
            if (!iconConfig) {
                console.warn(`No icon defined for type ${this.typeName}, defaulting`);
                return this.getDefaultIcon(this.typeName);
            }
            const classNames = iconConfig.classNames.slice();
            switch (iconConfig.type) {
            case 'kbase':
                classNames.push('icon');
                if (this.size) {
                    switch (this.size) {
                    case 'small':
                        classNames.push('icon-sm');
                        break;
                    case 'medium':
                        classNames.push('icon-md');
                        break;
                    case 'large':
                        classNames.push('icon-lg');
                        break;
                    }
                }
                break;
            case 'fontAwesome':
                classNames.push('fa');
                break;
            }

            return {
                classNames,
                type: iconConfig.type,
                color: iconConfig.color,
                html: `<span class="${classNames.join(' ')}"></span>`
            };
        }

        getColor(typeName) {
            let code = 0;
            const colors = iconConfig.colors;

            for (let i = 0; i < typeName.length; i += 1) {
                code += typeName.charCodeAt(i);
            }
            return colors[code % colors.length];
        }
    }

    return TypeIcon;
});