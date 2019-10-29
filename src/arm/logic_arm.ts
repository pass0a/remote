import { Duplex } from 'stream';
import * as img from '@passoa/img';
import { FrameBuffer } from '@passoa/fb';
import { tmp as touch } from '@passoa/touch';

export class Logic extends Duplex {
	fb = new FrameBuffer('/dev/fb0');
	info: any;
	buf: Buffer;
	constructor() {
		super({ objectMode: true });
		this.on('cutScreen', this.cutScreen);
		this.on('click', this.click);
		this.on('slide', this.slide);
		this.on('alive', this.alive);
		this.on('auth', this.auth);
		touch.setDevice('/dev/input/event0');
		this.info = this.fb.info();
		this.buf = Buffer.alloc(this.info.size);
	}
	cutScreen() {
		console.log('cutScreen');
		this.fb.read(this.buf);
		img.encode(this.buf, this.info, (err, data) => {
			console.log('!!!!!===!!!!=', err);
			if (err) {
				this.push({ type: 'cutScreen', stat: false });
			} else {
				this.push({ type: 'cutScreen', stat: true, buf: data });
			}
		});
	}
	click(msg: any) {
		console.log('=========', msg.x);
		touch.click(msg.x, msg.y);
		this.push({ act: 'click', stat: true });
	}
	slide(msg: any) {}
	alive() {
		this.push({ type: 'alive', stat: true });
	}
	auth() {
		this.push({ type: 'auth', stat: true, platform: 2 });
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
