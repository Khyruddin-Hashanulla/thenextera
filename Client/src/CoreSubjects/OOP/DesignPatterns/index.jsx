// Design Patterns subtopics
export { default as Singleton } from './singleton';
export { default as Factory } from './factory';
export { default as Observer } from './observer';

// Design Patterns topic metadata
export const DESIGN_PATTERNS_SUBTOPICS = {
  singleton: {
    id: 1,
    name: 'Singleton Pattern',
    description: 'Ensures only one instance of a class exists',
    component: 'Singleton'
  },
  factory: {
    id: 2,
    name: 'Factory Pattern',
    description: 'Creates objects without specifying exact classes',
    component: 'Factory'
  },
  observer: {
    id: 3,
    name: 'Observer Pattern',
    description: 'Defines one-to-many dependency between objects',
    component: 'Observer'
  }
};

export default DESIGN_PATTERNS_SUBTOPICS;
