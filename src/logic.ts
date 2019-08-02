import { Duplex } from 'stream';
import { execSync } from 'child_process';
import { readFileSync } from 'fs';

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
		console.log('cutScreen');
		// execSync('adb shell screencap /data/local/tmp/test.raw');
		// execSync('adb pull /data/local/tmp/test.raw ./');

		//var data = readFileSync('test.raw');
		this.push({ type: 'cutScreen', stat: true, buf: 'haha' });
		console.log('cutScreen');
		// var info = screencapInfo(buf);
		// encode(info.data, info.info, function(err, data) {
		// 	if (err) {
		// 		this.push({ type: 'cutScreen', stat: false });
		// 	} else {
		// 		this.push({ type: 'cutScreen', stat: true, buf: data });
		// 	}
		// });
	}
	click() {}
	slide() {}
	longClick() {}
	alive() {}
	auth() {}
	checkEq() {}
	onEvent() {}
	_write(msg: any, encoding: string, callback: (error?: Error | null) => void) {
		if (msg.type) {
			this.emit(msg.type, msg);
		}
		callback();
		console.log('_write');
	}
	_read() {
		console.log('_read!!!');
	}
}
