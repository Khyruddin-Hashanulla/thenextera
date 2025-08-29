// NetworkBasics Topic Index
export { default as osi_model } from './osi_model';
export { default as tcp_ip } from './tcp_ip';
export { default as network_topologies } from './network_topologies';

export const TOPIC_CONFIG = {
  id: 1,
  name: 'Network Fundamentals',
  description: 'OSI model, TCP/IP, and network topologies',
  subtopics: [
    { id: 'osi_model', name: 'OSI Model', component: 'osi_model' },
    { id: 'tcp_ip', name: 'TCP/IP Protocol Suite', component: 'tcp_ip' },
    { id: 'network_topologies', name: 'Network Topologies', component: 'network_topologies' }
  ]
};

// Default export for direct topic access
export { default } from './osi_model';
