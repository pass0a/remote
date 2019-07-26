const Stream = require('./stream');
const img = require('@passoa/img');
const fs = require('fs');
const cp = require('child_process');

var pk;
function cutScreen() {
	// cp.execSync('screencap test.raw');
	// var buf = fs.readFileSync('test.raw');
	// var info = img.screencapInfo(buf);
	// img.encode(info.data, info.info, function(err, data) {
	// 	if (err) {
	// 		pk.push({ type: 'cutScreen', stat: false });
	// 	} else {
	// 		pk.push({ type: 'cutScreen', stat: true, buf: data });
	// 	}
	// });
	pk.push({ type: 'cutScreen', stat: true, buf: 'data' });
	console.log('cutScreen');
}
function click(msg) {
	console.log(msg.x, msg.y);
	var cmd = 'sh /system/bin/input tap ' + msg.x + ' ' + msg.y;
	console.log(cmd);
	cp.exec(cmd);
	pk.push({ type: 'click', stat: true });
}
function slide(msg) {
	var cmd = 'sh /system/bin/input swipe ' + msg.x1 + ' ' + msg.y1 + ' ' + msg.x2 + ' ' + msg.y2 + ' ' + msg.time;
	cp.exec(cmd);
	pk.push({ type: 'slide', stat: true });
}
function longClick(msg) {
	var cmd = 'sh /system/bin/input swipe ' + msg.x + ' ' + msg.y + ' ' + msg.x + ' ' + msg.y + ' ' + msg.time;
	cp.exec(cmd);
	pk.push({ type: 'long_click', stat: true });
}
function alive() {
	pk.push({ type: 'alive', stat: true });
}

function Logic() {
	console.log('DEBUG!!!!', Logic.prototype.init);
	Logic.prototype.init.call(this);
	this.on('data', function(msg) {
		console.log(msg);
		this.trigger(msg.type, msg);
	});
	this.bind = function(p) {
		pk = p;
		return p;
	};
	this.on('cutScreen', cutScreen);
	this.on('click', click);
	this.on('slide', slide);
	this.on('long_click', longClick);
	this.on('alive', alive);
	this.on('auth', function(msg) {
		pk.push({ type: 'auth', stat: true, platform: 2 });
	});
	this.on('checkEq', function() {
		pk.push({ type: 'checkEq' });
	});
}
Logic.prototype = new Stream();

module.exports = new Logic();
