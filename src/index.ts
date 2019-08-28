import { createServer } from 'net';
import { packStream, unpackStream } from '@passoa/pack';
import { Logic } from './logic';

let s = createServer((c) => {
	// ps.on('data', (data: Buffer) => {
	// 	console.log(data.length, data);
	// 	c.write(data);
	// });
	console.log('connected!!!??');
	let ps = new packStream();
	let ups = new unpackStream();
	let logic = new Logic();

	c.pipe(ups).pipe(logic).pipe(ps).pipe(c);
	c.on('error', (code, msg) => {
		console.log('info:', code, msg);
	});
});
s.listen(6009);
console.log('passoa success');
