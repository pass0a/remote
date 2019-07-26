// var cp=require("child_process");
// var fs=require("fs");
//cp.exec("sh /system/bin/input tap 50 300");
//cp.exec("sh /system/bin/input swipe 100 50 100 300 1000");
//cp.exec("screencap -p /data/pack/tmp.png");

// var buf=fs.readFileSync("/data/pack/tmp.png");
// console.log("tipyyys:",buf)

const net = require('net');
const logic = require('./logic');
const pack = require('@passoa/pack');

var s = net.createServer(function(c) {
	console.log('let it go!!!');
	c.on('error', (err) => {
		console.log('close', err);
	});
	c.on('close', (err) => {
		console.log('close', err);
	});
	var send = new net.sendStream(c);
	var recv = new net.recvStream(c);
	var pk = new pack.packStream();
	var upk = new pack.unpackStream();

	recv.pipe(upk).pipe(logic);
	logic.bind(pk).pipe(send);
	console.log('connect over');
});
s.listen(6009);
