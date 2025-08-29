// CN ApplicationLayer Index - Exports all subtopics
export { default as HTTPS_PROTOCOL } from './https_protocol';
export { default as DNS_SYSTEM } from './dns_system';
export { default as EMAIL_PROTOCOL } from './email_protocol';

// ApplicationLayer subtopic metadata
export const APPLICATIONLAYER_SUBTOPICS = {
  HTTPS_PROTOCOL: {
    id: 1,
    name: 'HTTPS Protocol',
    description: 'Secure HTTP protocol with SSL/TLS encryption'
  },
  DNS_SYSTEM: {
    id: 2,
    name: 'DNS System',
    description: 'Domain Name System for name resolution'
  },
  EMAIL_PROTOCOL: {
    id: 3,
    name: 'Email Protocol',
    description: 'SMTP, POP3, IMAP protocols for email communication'
  }
};

// Topic configuration
export const TOPIC_CONFIG = {
  name: 'Application Layer',
  description: 'Network services and protocols for end-user applications',
  subtopics: Object.keys(APPLICATIONLAYER_SUBTOPICS)
};

// Default export
export default TOPIC_CONFIG;
