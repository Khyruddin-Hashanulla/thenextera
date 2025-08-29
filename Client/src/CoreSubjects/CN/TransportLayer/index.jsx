// CN TransportLayer Index - Exports all subtopics
export { default as tcp_protocol } from './tcp_protocol';
export { default as udp_protocol } from './udp_protocol';
export { default as congestion_control } from './congestion_control';

// TransportLayer subtopic metadata
export const TRANSPORTLAYER_SUBTOPICS = {
  tcp_protocol: {
    id: 1,
    name: 'TCP PROTOCOL',
    description: 'Transmission Control Protocol - reliable, connection-oriented transport'
  },
  udp_protocol: {
    id: 2,
    name: 'UDP PROTOCOL',
    description: 'User Datagram Protocol - fast, connectionless transport'
  },
  congestion_control: {
    id: 3,
    name: 'Congestion Control',
    description: 'TCP congestion control algorithms and mechanisms'
  }
};

// Topic configuration
export const TOPIC_CONFIG = {
  name: 'Transport Layer',
  description: 'End-to-end communication services and protocols',
  subtopics: Object.keys(TRANSPORTLAYER_SUBTOPICS)
};

// Default export
export default TOPIC_CONFIG;
