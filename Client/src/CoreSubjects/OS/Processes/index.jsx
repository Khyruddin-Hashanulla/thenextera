// Processes Topic Index
export { default as process_concept } from './process_concept';
export { default as threads } from './threads';
export { default as interprocess_communication } from './interprocess_communication';
export { default as process_synchronization } from './process_synchronization';

// Topic configuration
export const TOPIC_CONFIG = {
  name: 'Process Management',
  description: 'Process concepts, threads, inter-process communication, and synchronization',
  subtopics: [
    {
      id: 'process_concept',
      title: 'Process Concept',
      duration: '40 min',
      order: 1
    },
    {
      id: 'threads',
      title: 'Threads',
      duration: '35 min',
      order: 2
    },
    {
      id: 'interprocess_communication',
      title: 'Inter-Process Communication',
      duration: '45 min',
      order: 3
    },
    {
      id: 'process_synchronization',
      title: 'Process Synchronization',
      duration: '50 min',
      order: 4
    }
  ]
};

// Default export
export default TOPIC_CONFIG;
