
const categoriesTemplate = (category_type, category_name) => { 
    return (`
        <div class="category">
            <p id="${category_type}">${category_name}</p>
        </div>`);
}

const devicesDropListTemplate = (device_type) => {
    return(`

    `);
};

module.exports.categoriesTemplate = categoriesTemplate;
