import { execSync, spawnSync } from 'child_process';
import { EventABS, EventType, EventSYN, EventKey } from './event_define';
import events from './events';
class virtualEvent {
	taps = events.getTap();
	path = '/dev/input/event0';
	constructor() {}
	private replay(path: string, cb: (iter: number[]) => void) {
		for (const iterator of this.taps) {
			cb(iterator);
		}
	}
	bind(path: string) {
		this.path = path;
	}
	tap(x: number, y: number) {
		this.replay('/dev/input/event0', (iterator: number[]) => {
			if (iterator[0] == EventType.EV_ABS) {
				if (iterator[1] == EventABS.ABS_X) {
					iterator[2] = x;
				}
				if (iterator[1] == EventABS.ABS_Y) {
					iterator[2] = y;
				}
			}
			console.log(`${__dirname}/sendevent ${this.path} ${iterator[0]} ${iterator[1]} ${iterator[2]}`);
			spawnSync(`${__dirname}/sendevent ${this.path}`, [ `${iterator[0]}`, `${iterator[1]}`, `${iterator[2]}` ]);
		});
	}
	swipe() {}
}
export default new virtualEvent();
