import ve from '../src/arm/virtual_event';
let cls = 0;
let inst = setInterval(() => {
	if (cls > 10) clearInterval(inst);
	if (cls % 2) {
		ve.tap(0x25, 0x27);
	} else {
		ve.tap(0x9b, 0xa0);
	}
	cls++;
}, 1000);
