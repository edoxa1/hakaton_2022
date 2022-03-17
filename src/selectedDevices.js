// selected devices

var userSelectedDevices = {
    processors: [],
    videocards: [],
    power_units:[],
    hard_drives:[],
    rams:       [],
};

const addToSelection = (device, quantity) => {
    userSelectedDevices[device.type].push({
        device:device,
        quantity:quantity   
    });
    console.log(userSelectedDevices);
};

module.exports.addToSelection = addToSelection;
module.exports.userSelectedDevices = userSelectedDevices;
    