// OS Synchronization Index - Exports all subtopics
export { default as process_synchronization } from '../Processes/process_synchronization';
export { default as deadlocks } from './deadlocks';
export { default as semaphores } from './semaphores';
export { default as monitors } from './monitors';

// Synchronization subtopic metadata
export const SYNCHRONIZATION_SUBTOPICS = {
  process_synchronization: {
    id: 1,
    name: 'Process Synchronization',
    description: 'Critical sections, race conditions, and synchronization mechanisms'
  },
  deadlocks: {
    id: 2,
    name: 'Deadlocks',
    description: 'Deadlock detection, prevention, and avoidance strategies'
  },
  semaphores: {
    id: 3,
    name: 'Semaphores',
    description: 'Binary and counting semaphores for process coordination'
  },
  monitors: {
    id: 4,
    name: 'Monitors',
    description: 'High-level synchronization constructs with condition variables'
  }
};

// Topic configuration
export const TOPIC_CONFIG = {
  name: 'Synchronization',
  description: 'Process synchronization and coordination mechanisms',
  subtopics: Object.keys(SYNCHRONIZATION_SUBTOPICS)
};

// Default export
export default TOPIC_CONFIG;
