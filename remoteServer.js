var Gpio = require("onoff").Gpio
var fs = require("fs"); 
var nt = require("net");
var funs = new Gpio(4,"out")

var srv=nt.createServer();
srv.on("connection",Connection);

srv.listen(8080,function(){
	console.log("remote control server")
});

function Connection(connection){
	var d = Date();
	console.log(d);
connection.on('data',onData);
connection.on('close',onClose);
connection.on('error',onError);
	function onData(data){
		console.log("--------");
		vv=data.toString();
		if (vv=="ON\n"){
			connection.end("on");	
			funs.writeSync(1);
			console.log("on");		
		}else{
			if (vv=="OFF\n"){
				connection.end("off");	
				funs.writeSync(0);
				console.log("off");
			}
		}
		
	}
	function onClose(){
		var d = Date();
		console.log(d);
	}
	function onError(data){
		console.log(data);
	}



}
