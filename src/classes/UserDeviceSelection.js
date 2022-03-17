class UserDeviceSelection {
    constructor () {
        this.deviceSelections = {
            processors: [],
            videocards: [],
            power_units:[],
            hard_drives:[],
            rams:       [],
        };
    }

    addToSelection = (device) => {
        this.deviceSelections[device.type].push(device);
        console.log(this.deviceSelections);
    }
}

module.exports = UserDeviceSelection;
