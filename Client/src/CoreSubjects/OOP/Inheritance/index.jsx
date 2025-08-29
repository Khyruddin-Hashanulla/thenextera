// Inheritance subtopics
export { default as SingleInheritance } from './single_inheritance';
export { default as MultipleInheritance } from './multiple_inheritance';
export { default as MethodOverriding } from './method_overriding';

// Inheritance topic metadata
export const INHERITANCE_SUBTOPICS = {
  single_inheritance: {
    id: 1,
    name: 'Single Inheritance',
    description: 'One class inheriting from another class',
    component: 'SingleInheritance'
  },
  multiple_inheritance: {
    id: 2,
    name: 'Multiple Inheritance',
    description: 'Class inheriting from multiple parent classes',
    component: 'MultipleInheritance'
  },
  method_overriding: {
    id: 3,
    name: 'Method Overriding',
    description: 'Redefining parent class methods in child classes',
    component: 'MethodOverriding'
  }
};

export default INHERITANCE_SUBTOPICS;
