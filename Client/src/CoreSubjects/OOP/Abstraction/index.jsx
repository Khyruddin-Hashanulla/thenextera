// Abstraction subtopics
export { default as AbstractClasses } from './abstract_classes';
export { default as Interfaces } from './interfaces';
export { default as DataAbstraction } from './data_abstraction';

// Abstraction topic metadata
export const ABSTRACTION_SUBTOPICS = {
  abstract_classes: {
    id: 1,
    name: 'Abstract Classes',
    description: 'Classes that cannot be instantiated and contain abstract methods',
    component: 'AbstractClasses'
  },
  interfaces: {
    id: 2,
    name: 'Interfaces',
    description: 'Contracts defining method signatures',
    component: 'Interfaces'
  },
  data_abstraction: {
    id: 3,
    name: 'Data Abstraction',
    description: 'Hiding implementation details and showing essential features',
    component: 'DataAbstraction'
  }
};

// Topic configuration for modular content system
export const TOPIC_CONFIG = {
  id: 'abstraction',
  name: 'Abstraction',
  description: 'Hiding implementation details and showing essential features',
  subtopics: ABSTRACTION_SUBTOPICS
};

export default TOPIC_CONFIG;
