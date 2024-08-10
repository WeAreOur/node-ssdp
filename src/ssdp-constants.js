/**
 * SSDP MESSAGE TYPES
 */

/** Message sent by a device to announce its presence and services */
export const SSDP_ALIVE = 'ssdp:alive';
/** Message sent by a device to indicate it's going offline */
export const SSDP_BYE = 'ssdp:byebye';
/** Message used in discovery requests to search for all available services */
export const SSDP_ALL = 'ssdp:all';
/** Message used to initiate a discovery request for services */
export const SSDP_DISCOVER = 'ssdp:discover';

/**
 * SSDP ACTION TYPES
 */

/** Action of advertising a device's presence on the network */
export const ADVERTISE_ALIVE = 'advertise-alive';
/** Action of advertising a device's departure from the network */
export const ADVERTISE_BYE = 'advertise-bye';
/** Action related to sending notifications about service availability or changes */
export const NOTIFY = 'notify';

/**
 * SSDP METHODS
 */

/** Multicast search request for available services */
export const M_SEARCH = 'm-search';

/**
 * DEFAULTS
 */

/** Default IP to be used when searching devices */
export const SSDP_DEFAULT_IP = '239.255.255.250';
/** Default PORT to be used when searching devices */
export const SSDP_DEFAULT_PORT = 1900;
