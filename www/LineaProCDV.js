var argscheck = require('cordova/argscheck'),
    channel = require('cordova/channel'),
    utils = require('cordova/utils'),
    exec = require('cordova/exec'),
    cordova = require('cordova');

 function LineaProCDV() {
    this.results = [];

    this.connCallback = null;
    this.errorCallback = null;
    this.cancelCallback = null;
    this.cardDataCallback = null;
    this.barcodeCallback = null;

    this.btDiscoveryCompleteCallback = null;
    this.btConnectedCallback = null;
    this.btDisconnectedCallback = null;


}

LineaProCDV.prototype.initDT = function(connectionCallback, cardCallback, barcCallback, cancelCallback, errorCallback, btDiscCallback, btConnCallback, btDisconnCallback) {
    this.results = [];

    this.connCallback = connectionCallback;
    this.cardDataCallback = cardCallback;
    this.barcodeCallback = barcCallback;

    this.btDiscoveryCompleteCallback = btDiscCallback;
    this.btConnectedCallback = btConnCallback;
    this.btDisconnectedCallback = btDisconnCallback;

    exec(null, errorCallback, "LineaProCDV", "initDT", []);
    //alert("LineaProCDV");
};

LineaProCDV.prototype.barcodeStart = function() {
    exec(null, null, "LineaProCDV", "startBarcode", []);
};

LineaProCDV.prototype.barcodeStop = function() {
    exec(null, null, "LineaProCDV", "stopBarcode", []);
};

LineaProCDV.prototype.connectionChanged = function(state) {
    this.connCallback(state);
};

LineaProCDV.prototype.onMagneticCardData = function(track1, track2, track3) {
    this.cardDataCallback(track1 + track2 + track3);
    //this.barcodeStart();
};

LineaProCDV.prototype.discoverDevices = function(status) {
    exec(null, null, "LineaProCDV", "discoverDevices", []);
}

LineaProCDV.prototype.setPassThroughSync = function() {
    exec(null, null, "LineaProCDV", "setPassThroughSync", []);
}

LineaProCDV.prototype.unsetPassThroughSync = function() {
    exec(null, null, "LineaProCDV", "unsetPassThroughSync", []);
}

LineaProCDV.prototype.onBarcodeData = function(rawCodesArr, scanId, dob, state, city, expires, gender, height, weight, hair, eye, firstName, lastName) {
    var data = {
               rawCodesArr: rawCodesArr,
               scanId: scanId,
               dob: dob,
               state: state,
               city: city,
               expires: expires,
               gender: gender,
               height: height,
               weight: weight,
               hair: hair,
               eye: eye,
               firstName: firstName,
               lastName: lastName
               };
    this.barcodeCallback(data);
};

LineaProCDV.prototype.onBluetoothDeviceConnected = function(address) {
  this.btConnectedCallback(address);
}

LineaProCDV.prototype.onBluetoothDeviceDisconnected = function(address) {
  this.btDisconnectedCallback(address);
}

LineaProCDV.prototype.onBluetoothDiscoverComplete = function(success, devices, error) {
  this.btDiscoveryCompleteCallback(success, devices, error);
}

module.exports = new LineaProCDV();
