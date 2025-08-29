// OS Subject Index - Exports all topics
export { default as Processes } from './Processes';
export { default as Scheduling } from './Scheduling';
export { default as MemoryManagement } from './MemoryManagement';
export { default as FileSystem } from './FileSystem';
export { default as Synchronization } from './Synchronization';

// OS Topic metadata
export const OS_TOPICS = {
  Processes: {
    id: 1,
    name: 'Process Management',
    description: 'Process concepts, threads, and IPC',
    subtopics: ['process_concept', 'threads', 'interprocess_communication']
  },
  Scheduling: {
    id: 2,
    name: 'CPU Scheduling',
    description: 'Scheduling algorithms and policies',
    subtopics: ['fcfs', 'sjf', 'round_robin', 'priority_scheduling']
  },
  MemoryManagement: {
    id: 3,
    name: 'Memory Management',
    description: 'Paging, segmentation, and virtual memory',
    subtopics: ['paging', 'segmentation', 'virtual_memory']
  },
  FileSystem: {
    id: 4,
    name: 'File Systems',
    description: 'File allocation and directory structures',
    subtopics: ['file_allocation', 'directory_structure']
  },
  Synchronization: {
    id: 5,
    name: 'Process Synchronization',
    description: 'Semaphores, monitors, and deadlocks',
    subtopics: ['semaphores', 'monitors', 'deadlocks']
  }
};

// Default export
export default OS_TOPICS;
