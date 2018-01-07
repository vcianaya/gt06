var gps = require("gps-tracking");
var contador = 0;
var options = {
    'debug': false, //We don't want to debug info automatically. We are going to log everything manually so you can check what happens everywhere
    'port': 5000,
    'device_adapter': "GT06"
}

var server = gps.server(options, function (device, connection) {

    device.on("connected", function (data) {

        console.log("Soy un nuevo dispositivo conectado");
        return data;

    });

    device.on("login_request", function (device_id, msg_parts) {

        console.log('¡Oye! Quiero comenzar a transmitir mi posición. Por favor Acéptame. Me llamo ' + device_id);

        this.login_authorized(true);

        console.log("Ok, " + device_id + ", eres aceptado!");

    });


    device.on("ping", function (data) {
        //this = device
        // console.log(data);
        contador = contador+1;
        
        console.log("Estoy aquí: " + data.latitude + ", " + data.longitude + " (" + this.getUID() + ")"+"    NRO MESNAJE:  "+contador);
        //Look what informations the device sends to you (maybe velocity, gas level, etc)
        //console.log(data);
        return data;

    });

    device.on("alarm", function (alarm_code, alarm_data, msg_data) {
        console.log("¡Ayuda! Algo sucedió: " + alarm_code + " (" + alarm_data.msg + ")");
    });

    //Also, you can listen on the native connection object
    connection.on('data', function (data) {
        //echo raw data package
        //console.log(data.toString()); 
    })

});