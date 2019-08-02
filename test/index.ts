import { connect, Socket } from 'net';
import { packStream, unpackStream } from '@passoa/pack';
import { writeFileSync } from 'fs';

export interface ConnectOpts {
	port: number;
	ip: string;
}

class Remote {
	private ps = new packStream();
	private ups = new unpackStream();
	private tm: any;
	private cli: Socket;
	async connectDev(opt: ConnectOpts) {
		return new Promise((resolve, reject) => {
			this.cli = connect(6009, '127.0.0.1', () => {
				// console.log('connected!!!!');
				// this.cli.on('data', (data) => {
				// 	console.log('data', data.length);
				// });
				this.cli.pipe(this.ups);
				this.ps.pipe(this.cli);
				resolve();
			});
		});
	}
	disconnectDev() {
		if (this.cli) {
			this.cli.end();
			this.cli = null;
		}
	}
	async sendCmd(cmd: any, timeout?: number) {
		if (timeout == undefined) {
			timeout = 3000;
		}

		return new Promise((resolve, reject) => {
			this.ups.on('data', function(data) {
				if (cmd.type == data.type) {
					console.log('what the fuck', this.tm);
					if (data.stat && data.buf) {
						if (data.buf.byteLength) {
							console.log('!!!!!!!!!!', cmd.filepath);
							writeFileSync(cmd.filepath, data.buf);
						}
					}
					if (this.tm) {
						clearTimeout(this.tm);
						this.tm = null;
					}
					resolve({ ret: 1, data: data.data != undefined ? data.data : data.stat });
				}
			});
			switch (cmd.type) {
				case 'click':
					this.ps.write({ type: cmd.type, x: cmd.x, y: cmd.y, time: cmd.time });
					break;
				case 'slide':
					this.ps.write({ type: cmd.type, x1: cmd.x1, y1: cmd.y1, x2: cmd.x2, y2: cmd.y2, time: cmd.time });
					break;
				case 'cutScreen':
					this.ps.write({ type: cmd.type });
					break;
				case 'alive':
					this.ps.write({ type: cmd.type });
					break;
			}
			console.log('sendcmd!!!');
			this.tm = setTimeout(() => {
				console.log('Timeout!!!!');
				resolve({ ret: 0 });
			}, timeout);
		});
	}
}
async function main() {
	let r = new Remote();
	await r.connectDev({ port: 6009, ip: '127.0.0.1' });
	await r.sendCmd({ type: 'cutScreen', filepath: 'test.jpg' });
	r.disconnectDev();
}
main();
