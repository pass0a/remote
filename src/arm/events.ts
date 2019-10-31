import { EventSYN, EventType, EventKey, EventABS } from './event_define';
class config {
	tap = [
		[ EventType.EV_ABS, EventABS.ABS_X, 0 ],
		[ EventType.EV_ABS, EventABS.ABS_Y, 0 ],
		[ EventType.EV_ABS, EventABS.ABS_PRESSURE, 1 ],
		[ EventType.EV_KEY, EventKey.BTN_TOUCH, 1 ],
		[ EventType.EV_SYN, EventSYN.SYN_MT_REPORT, 0 ],
		[ EventType.EV_SYN, EventSYN.SYN_REPORT, 0 ],
		[ EventType.EV_KEY, EventKey.BTN_TOUCH, 0 ],
		[ EventType.EV_ABS, EventABS.ABS_PRESSURE, 0 ],
		[ EventType.EV_SYN, EventSYN.SYN_MT_REPORT, 0 ],
		[ EventType.EV_SYN, EventSYN.SYN_REPORT, 0 ]
	];
	getTap() {
		return this.tap;
	}
}
export default new config();
