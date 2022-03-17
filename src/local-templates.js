
const categoriesTemplate = (category_type, category_name) => { 
    return (`
        <div class="category">
            <p id="${category_type}">${category_name}</p>
        </div>`);
}

const devicesDropListTemplate = (category_type) => {
    let options_temp = '';
    let category_name = devicesData[category_type][0].category;
    devicesData[category_type].forEach((device) => {
        options_temp += 
        `
            <option value="${device.name}" id=${device.id}>${device.name}</option>
        `
    });


    return(`
        <div class="device_seletion">
            ${category_name}
            <br>
            <select class="user_device_select" id=${category_type}>${options_temp}</select>
            <br>
            <input type="number" class="device_quantity_select" id="${category_type}" min="1" max="30">
            <br>
            <button class="submit_device_select">Выбрать</button>
        </div>
    `);
};

module.exports.categoriesTemplate = categoriesTemplate;
module.exports.devicesDropListTemplate = devicesDropListTemplate;
