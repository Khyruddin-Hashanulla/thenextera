// CN DataLink Index - Exports all subtopics
export { default as error_detection } from './error_detection';
export { default as flow_control } from './flow_control';
export { default as mac_protocols } from './mac_protocols';

// DataLink subtopic metadata
export const DATALINK_SUBTOPICS = {
  error_detection: {
    id: 1,
    name: 'Error Detection & Correction',
    description: 'Parity bits, checksums, CRC, and Hamming codes'
  },
  flow_control: {
    id: 2,
    name: 'Flow Control',
    description: 'Stop-and-wait, sliding window protocols'
  },
  mac_protocols: {
    id: 3,
    name: 'MAC Protocols',
    description: 'CSMA/CD, CSMA/CA, and token-based protocols'
  }
};

// Topic configuration
export const TOPIC_CONFIG = {
  name: 'Data Link Layer',
  description: 'Data link layer protocols and mechanisms',
  subtopics: Object.keys(DATALINK_SUBTOPICS)
};

// Default export
export default TOPIC_CONFIG;
