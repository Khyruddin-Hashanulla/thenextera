// OOP Subject Index - Exports all topics
export { default as Fundamentals } from './Fundamentals';
export { default as Inheritance } from './Inheritance';
export { default as Polymorphism } from './Polymorphism';
export { default as Encapsulation } from './Encapsulation';
export { default as Abstraction } from './Abstraction';
export { default as DesignPatterns } from './DesignPatterns';

// OOP Topic metadata
export const OOP_TOPICS = {
  Fundamentals: {
    id: 1,
    name: 'OOP Fundamentals',
    description: 'Classes, objects, and basic OOP concepts',
    subtopics: ['classes_objects', 'constructors', 'access_modifiers']
  },
  Inheritance: {
    id: 2,
    name: 'Inheritance',
    description: 'Single and multiple inheritance concepts',
    subtopics: ['single_inheritance', 'multiple_inheritance', 'method_overriding']
  },
  Polymorphism: {
    id: 3,
    name: 'Polymorphism',
    description: 'Method overloading and overriding',
    subtopics: ['method_overloading', 'method_overriding', 'dynamic_binding']
  },
  Encapsulation: {
    id: 4,
    name: 'Encapsulation',
    description: 'Data hiding and access control',
    subtopics: ['data_hiding', 'access_modifiers', 'getters_setters']
  },
  Abstraction: {
    id: 5,
    name: 'Abstraction',
    description: 'Hiding implementation details and showing essential features',
    subtopics: ['abstract_classes', 'interfaces', 'data_abstraction']
  },
  DesignPatterns: {
    id: 6,
    name: 'Design Patterns',
    description: 'Common OOP design patterns',
    subtopics: ['singleton', 'factory', 'observer']
  }
};

// Default export
export default OOP_TOPICS;
