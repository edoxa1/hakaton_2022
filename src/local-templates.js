
const categoriesTemplate = (category_type, category_name, category_icon) => { 
    return (`
        <button class="category col btn btn-light" id="${category_type}">
            <img width="50" height="50" src="${category_icon}" id="${category_type}">
            <p id="${category_type}">${category_name}</p>
        </button>`);
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
            <select class="user_device_select form-control" id=${category_type}>${options_temp}</select>
            <input type="number" class="device_quantity_select form-control-sm-2" id="${category_type}" value="1" min="1" max="30">
            <br>
            <br>
            <button class="submit_device_select btn btn-primary">Выбрать</button>
        </div>
    `);
};

const selectedDevicesTemplate = (device, quantity) => {
    return(`
        <tr>
            <td>${device.category}</td>
            <td>${quantity}</td>
            <td>${device.name}</td>
            <td>${quantity * device.consumption}</td>
            <td>${quantity * device.revenue}</td>
        </tr>
    `);
}

const currenciesTemplate = () => {
    let temp = '';
    Object.keys(currencies).forEach((key) => {
        temp += `<option value="${key}">${key}</option>`
    });
    return (`
        <select name="currency" id="currency_exchange">
            ${temp}
        </select>
    `);
}

const specsCalculatorTemplate = () => {
    let data = selectedDevices.userSelectedDevices;
    let consumption = 0;
    let revenue = 0;
    Object.keys(data).forEach((key) => {
        data[key].forEach((unit) => {
            consumption += unit.device.consumption * unit.quantity;
            revenue += unit.device.revenue * unit.quantity;
        });
    });

    return(`
        Общий расход: ${consumption} [тг / кВт * час]
        <br>
        Общий доход: ${revenue} [$]
    `);
}

module.exports.categoriesTemplate = categoriesTemplate;
module.exports.devicesDropListTemplate = devicesDropListTemplate;
module.exports.selectedDevicesTemplate = selectedDevicesTemplate;
module.exports.currenciesTemplate = currenciesTemplate;
module.exports.specsCalculatorTemplate = specsCalculatorTemplate;
