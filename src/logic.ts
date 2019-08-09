import { Duplex } from 'stream';
import { execSync } from 'child_process';
import { readFileSync, writeFileSync, writeFile } from 'fs';
import { screencapInfo, encode } from '@passoa/img';

export class Logic extends Duplex {
	constructor() {
		super({ objectMode: true });
		this.on('cutScreen', this.cutScreen);
		this.on('click', this.click);
		this.on('slide', this.slide);
		this.on('long_click', this.longClick);
		this.on('alive', this.alive);
		this.on('auth', this.auth);
		this.on('checkEq', this.checkEq);
	}
	cutScreen() {
		//execSync('adb exec-out screencap test.raw');
		console.log('cutScreen!!!');
		execSync('screencap test.raw');
		var buf = readFileSync('test.raw');
		var { info, data } = screencapInfo(buf);
		console.log('shenme:', info.width, info.height, info.bpp);
		encode(data, info, (err, data) => {
			if (err) {
				this.push({ type: 'cutScreen', stat: false });
			} else {
				writeFileSync('test.jpg', data);
				console.log(data.constructor.name, data.length, data);
				let tmp = Buffer.from(data);
				this.push({ type: 'cutScreen', stat: true, buf: tmp });
			}
		});
	}
	click(msg) {
		console.log(msg.x, msg.y);
		let cmd = 'sh /system/bin/input tap ' + msg.x + ' ' + msg.y;
		console.log(cmd);
		execSync(cmd);
		this.push({ type: 'click', stat: true });
	}
	slide(msg) {
		let cmd = 'sh /system/bin/input swipe ' + msg.x1 + ' ' + msg.y1 + ' ' + msg.x2 + ' ' + msg.y2 + ' ' + msg.time;
		execSync(cmd);
		this.push({ type: 'slide', stat: true });
	}
	longClick(msg) {
		let cmd = 'sh /system/bin/input swipe ' + msg.x + ' ' + msg.y + ' ' + msg.x + ' ' + msg.y + ' ' + msg.time;
		execSync(cmd);
		this.push({ type: 'long_click', stat: true });
	}
	alive() {
		this.push({ type: 'alive', stat: true });
	}
	auth() {
		this.push({ type: 'auth', stat: true, platform: 2 });
	}
	checkEq() {
		this.push({ type: 'checkEq' });
	}
	onEvent() {}
	_write(msg: any, encoding: string, callback: (error?: Error | null) => void) {
		console.log(msg);
		if (msg.type) {
			this.emit(msg.type, msg);
		}
		callback();
	}
	_read() {}
}
