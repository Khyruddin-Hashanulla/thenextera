// CN NetworkLayer Index - Exports all subtopics
export { default as routing_algorithms } from './routing_algorithms';
export { default as ip_addressing } from './ip_addressing';
export { default as network_protocols } from './network_protocols';
export { default as ip_protocol } from './ip_protocol';
export { default as subnetting } from './subnetting';

// NetworkLayer subtopic metadata
export const NETWORKLAYER_SUBTOPICS = {
  routing_algorithms: {
    id: 1,
    name: 'Routing Algorithms',
    description: 'Distance vector, link state, and path vector routing'
  },
  ip_addressing: {
    id: 2,
    name: 'IP Addressing',
    description: 'IPv4, IPv6, subnetting, and CIDR'
  },
  network_protocols: {
    id: 3,
    name: 'Network Protocols',
    description: 'ICMP, ARP, DHCP, and NAT protocols'
  },
  ip_protocol: {
    id: 4,
    name: 'IP Protocol',
    description: 'Internet Protocol structure, header format, and routing'
  },
  subnetting: {
    id: 5,
    name: 'Subnetting',
    description: 'Network subdivision, subnet masks, and CIDR notation'
  }
};

// Topic configuration
export const TOPIC_CONFIG = {
  name: 'Network Layer',
  description: 'Network layer routing and addressing protocols',
  subtopics: Object.keys(NETWORKLAYER_SUBTOPICS)
};

// Default export
export default TOPIC_CONFIG;
