// RelationalModel Topic Index
export { default as keys } from './keys';
export { default as functional_dependencies } from './functional_dependencies';
export { default as normalization } from './normalization';

export const TOPIC_CONFIG = {
  id: 3,
  name: 'Relational Model',
  description: 'Keys, dependencies, and normalization',
  subtopics: [
    { id: 'keys', name: 'Keys & Constraints', component: 'keys' },
    { id: 'functional_dependencies', name: 'Functional Dependencies', component: 'functional_dependencies' },
    { id: 'normalization', name: 'Normalization', component: 'normalization' }
  ]
};

// Default export for direct topic access
export { default } from './keys';
