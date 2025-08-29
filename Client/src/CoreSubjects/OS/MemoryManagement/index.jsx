// MemoryManagement Topic Index
export { default as paging } from './paging';
export { default as segmentation } from './segmentation';
export { default as virtual_memory } from './virtual_memory';

export const TOPIC_CONFIG = {
  id: 3,
  name: 'Memory Management',
  description: 'Paging, segmentation, and virtual memory',
  subtopics: [
    { id: 'paging', name: 'Paging', component: 'paging' },
    { id: 'segmentation', name: 'Segmentation', component: 'segmentation' },
    { id: 'virtual_memory', name: 'Virtual Memory', component: 'virtual_memory' }
  ]
};

// Default export for direct topic access
export { default } from './paging';
