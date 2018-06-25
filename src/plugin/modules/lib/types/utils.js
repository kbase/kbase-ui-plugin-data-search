define([
    'kb_common/html',
    'kb_common/props'
], function (
    html,
    Props
) {
    'use strict';

    var t = html.tag,
        span = t('span');

    /*
        padRight pads the string to the right in order to have size
        characters after the decimal place. If no decimal place, imagine.
    */
    function padRight(s, size) {
        // how many spaces now.
        var dotPos = s.lastIndexOf('.');
        var len;
        if (dotPos >= 0) {
            len = size - (s.length - dotPos);
            if (len <= 0) {
                return s;
            }
        } else {
            len = size;
        }
        var i;
        var pad = '';
        for (i = 0; i < len; i += 1) {
            pad += span({
                style: {
                    visibility: 'hidden'
                }
            }, '0');
        }
        return s + pad;
    }

    function parseTaxonomy(value) {
        var sep;
        if (!value) {
            return [];
        }
        if (value.indexOf(';') >= 0) {
            sep = ';';
        } else if (value.indexOf(',') >= 0) {
            sep = ',';
        } else {
            return [value];
        }
        return value.split(sep).map(function (item) {
            return item.trim(' ');
        }).filter(function (item) {
            return (item.trim(' ').length !== 0);
        });
    }

    function processTypeDef(def) {
        def.searchKeysMap = {};
        def.searchKeys.forEach(function (searchKey) {
            def.searchKeysMap[searchKey.key] = searchKey;
        });

        def.sortFieldsMap = {};
        if (!def.sortFields) {
            def.sortFields = [];
        }
        def.sortFields.forEach(function (sortField) {
            def.sortFieldsMap[sortField.key] = sortField;
        });
        return def;
    }

    function dataToDetail(data, detailFields) {
        var props = Props.make({data: data});
        return detailFields.map(function (field) {
            return {
                id: field.id,
                label: field.label,
                value: props.getItem(field.id),
                type: field.type,
                format: field.format,
                component: field.component,
                missing: field.missing,
                default: field.default
            };
        });
    }

    function parseBoolean(data, defaultValue) {
        if (typeof data === 'undefined') {
            return defaultValue;
        }
        if (data === 1) {
            return true;
        } else {
            return false;
        }
    }

    return {
        padRight: padRight,
        parseTaxonomy: parseTaxonomy,
        processTypeDef: processTypeDef,
        dataToDetail: dataToDetail,
        parseBoolean: parseBoolean
    };
});