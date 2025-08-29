// OOP Fundamentals Topic Index
export { default as classes_objects } from './classes_objects';
export { default as constructors } from './constructors';
export { default as access_modifiers } from './access_modifiers';

// Topic configuration
export const TOPIC_CONFIG = {
  name: 'OOP Fundamentals',
  description: 'Basic object-oriented programming concepts',
  subtopics: [
    {
      id: 'classes_objects',
      title: 'Classes and Objects',
      duration: '40 min',
      order: 1
    },
    {
      id: 'constructors',
      title: 'Constructors and Destructors',
      duration: '30 min',
      order: 2
    },
    {
      id: 'access_modifiers',
      title: 'Access Modifiers',
      duration: '25 min',
      order: 3
    }
  ]
};

// Default export
export default TOPIC_CONFIG;
