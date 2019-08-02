import { createServer } from 'net';
import { packStream, unpackStream } from '@passoa/pack';
import { Logic } from './logic';

let ps = new packStream();
let ups = new unpackStream();
let logic = new Logic();

let s = createServer((c) => {
	ps.on('data', (data: Buffer) => {
		console.log(data.length, data);
		c.write(data);
	});
	c.pipe(ups).pipe(logic).pipe(ps);
});
s.listen(6009);
