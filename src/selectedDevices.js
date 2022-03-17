// selected devices

var selectedDevices = {
    processors: [],
    videocards: [],
    power_units:[],
    hard_drives:[],
    rams:       [],
};

const addToSelection = (device, quantity) => {
    selectedDevices[device.type].push({
        device:device,
        quantity:quantity   
    });
    console.log(selectedDevices);
};

module.exports.addToSelection = addToSelection;
    