export enum EventType {
	EV_SYN,
	EV_KEY,
	EV_REL,
	EV_ABS,
	EV_MSC,
	EV_SW,
	EV_LED,
	EV_SND,
	EV_REP,
	EV_FF,
	EV_PWR,
	EV_FF_STATUS
}
export enum EventSYN {
	SYN_REPORT,
	SYN_CONFIG,
	SYN_MT_REPORT,
	SYN_DROPPED
}
export enum EventABS {
	ABS_X,
	ABS_Y,
	ABS_PRESSURE = 0x18,
	ABS_MT_PRESSURE = 0x14a
}
export enum EventKey {
	BTN_TOUCH
}
