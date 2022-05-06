const Handlebars = require('handlebars');

module.exports = {
    sum: (a, b) => a + b,
    sortable: (field, sort) => {
        const filed_name = field === sort.column ? sort.type : 'default';

        const icons = {
            default: 'oi oi-elevator',
            asc: 'oi oi-sort-ascending',
            desc: 'oi oi-sort-descending',
        };

        const types = {
            default: 'desc',
            asc: 'desc',
            desc: 'asc',
        };

        const type = types[filed_name];
        const icon = icons[filed_name];
        const href = Handlebars.escapeExpression(
            `?_sort&column=${field}&type=${type}`,
        );

        const output = `<a href="${href}">
                <span class="${icon}"></span>
                </a>`;
        return new Handlebars.SafeString(output);
    },
};
