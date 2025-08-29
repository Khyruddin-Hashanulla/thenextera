// CN Subject Index - Exports all topics
export { default as NetworkBasics } from './NetworkBasics';
export { default as DataLink } from './DataLink';
export { default as NetworkLayer } from './NetworkLayer';
export { default as TransportLayer } from './TransportLayer';
export { default as ApplicationLayer } from './ApplicationLayer';

// CN Topic metadata
export const CN_TOPICS = {
  NetworkBasics: {
    id: 1,
    name: 'Network Fundamentals',
    description: 'OSI model, TCP/IP, and network topologies',
    subtopics: ['osi_model', 'tcp_ip', 'network_topologies']
  },
  DataLink: {
    id: 2,
    name: 'Data Link Layer',
    description: 'Error detection, correction, and flow control',
    subtopics: ['error_detection', 'flow_control', 'mac_protocols']
  },
  NetworkLayer: {
    id: 3,
    name: 'Network Layer',
    description: 'Routing algorithms and IP protocols',
    subtopics: ['routing_algorithms', 'ip_addressing', 'network_protocols', 'ip_protocol', 'subnetting']
  },
  TransportLayer: {
    id: 4,
    name: 'Transport Layer',
    description: 'TCP, UDP, and congestion control',
    subtopics: ['tcp_protocol', 'udp_protocol', 'congestion_control']
  },
  ApplicationLayer: {
    id: 5,
    name: 'Application Layer',
    description: 'HTTPS, DNS, and application protocols',
    subtopics: ['https_protocol', 'dns_system', 'email_protocol']
  }
};

// Default export
export default CN_TOPICS;
