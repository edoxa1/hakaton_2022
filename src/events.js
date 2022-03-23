

let lastButton;
const selectCategory = (category_type) => {
    if(category_type.target.type === 'submit'){
        if(lastButton)
            lastButton.disabled = false;
        category_type.target.disabled = true;
        lastButton = category_type.target;
    } else {
        console.log(category_type.target.parentElement);
        if(lastButton)
            lastButton.disabled = false;
        category_type.target.parentElement.disabled = true;
        lastButton = category_type.target.parentElement;
    }
    
    let devices_droplist = document.querySelector('.devices_droplist');
    devices_droplist.innerHTML = template.devicesDropListTemplate(category_type.target.id);
    document.querySelector('.submit_device_select').addEventListener('click', confirmDeviceSelection);
};

const confirmDeviceSelection = () => {
    let selection = document.querySelector('.user_device_select');
    let quantity = document.querySelector('.device_quantity_select').value;
    let currency = document.querySelector('#currency_exchange').value;
    let device = devicesData[selection.id][selection.selectedIndex];
    selectedDevices.addToSelection(device, quantity);
    console.log("!@3", selectedDevices.userSelectedDevices);
    let tableBody = document.querySelector('.selected_devices_table_body');
    tableBody.innerHTML += template.selectedDevicesTemplate(device, quantity);
    document.querySelector('.center_box').style.visibility = 'visible';
}

const updateCurrency = () => {
    let currency = document.querySelector('#currency_exchange').value;
    document.querySelector('#selected_exchange_currency').innerHTML = `
        Статистика отностиельно ${currency}
    `;
    document.querySelector('#currency_value').innerHTML = `
        <div id="currency_value">1 USD = ${currencies[currency]} ${currency}</div>
    `;
}

const calculateSpecs = () => {
    let table = document.querySelector('.calculated_statistics_body');
    let currency = document.querySelector('#currency_exchange').value;
    table.innerHTML = template.specsCalculatorTemplate(currency);
}

const refreshEverything = () => {
    selectedDevices.refreshDevices();

    let tableBody = document.querySelector('.selected_devices_table_body');
    tableBody.innerHTML = '';
    document.querySelector('.center_box').style.visibility = 'hidden';
}

module.exports.selectCategory = selectCategory;
module.exports.confirmDeviceSelection = confirmDeviceSelection;
module.exports.calculateSpecs = calculateSpecs;
module.exports.updateCurrency = updateCurrency;
module.exports.refreshEverything = refreshEverything;
