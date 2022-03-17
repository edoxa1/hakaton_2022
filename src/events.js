const selectCategory = (category_type) => {
    let devices_droplist = document.querySelector('.devices_droplist');
    devices_droplist.innerHTML =  template.devicesDropListTemplate(category_type.target.id);
    document.querySelector('.submit_device_select').addEventListener('click', confirmDeviceSelection);
};

const confirmDeviceSelection = () => {
    let selection = document.querySelector('.user_device_select');
    let quantity = document.querySelector('.device_quantity_select');
    let device = devicesData[selection.id][selection.selectedIndex];
    console.log(device);
    userSelectedDevices.addToSelection(device);

}


