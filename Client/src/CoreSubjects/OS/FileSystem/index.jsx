// FileSystem Topic Index
export { default as file_allocation } from './file_allocation';
export { default as directory_structure } from './directory_structure';

export const TOPIC_CONFIG = {
  id: 4,
  name: 'File Systems',
  description: 'File allocation and directory structures',
  subtopics: [
    { id: 'file_allocation', name: 'File Allocation Methods', component: 'file_allocation' },
    { id: 'directory_structure', name: 'Directory Structure', component: 'directory_structure' }
  ]
};

// Default export for direct topic access
export { default } from './file_allocation';
