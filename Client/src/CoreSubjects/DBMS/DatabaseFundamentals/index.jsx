// DatabaseFundamentals Topic Index
export { default as introduction } from './introduction';
export { default as architecture } from './architecture';
export { default as data_models } from './data_models';

export const TOPIC_CONFIG = {
  id: 1,
  name: 'Database Fundamentals',
  description: 'Introduction, architecture, and data models',
  subtopics: [
    { id: 'introduction', name: 'Introduction to DBMS', component: 'introduction' },
    { id: 'architecture', name: 'Database Architecture', component: 'architecture' },
    { id: 'data_models', name: 'Data Models', component: 'data_models' }
  ]
};

// Default export for direct topic access
export { default } from './introduction';
