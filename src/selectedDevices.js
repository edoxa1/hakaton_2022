// selected devices

let userSelectedDevices = {
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
    console.log("add: ", userSelectedDevices);
};

const refreshDevices = () => {
    Object.keys(userSelectedDevices).forEach((key) => {
        userSelectedDevices[key] = [];
    });
}

module.exports.addToSelection = addToSelection;
module.exports.userSelectedDevices = userSelectedDevices;
module.exports.refreshDevices = refreshDevices;    
