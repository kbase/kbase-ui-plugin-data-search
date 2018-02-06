define([], function () {
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
    return {
        parseTaxonomy: parseTaxonomy
    };
});