// Polymorphism subtopics
export { default as MethodOverloading } from './method_overloading';
export { default as MethodOverriding } from './method_overriding';
export { default as DynamicBinding } from './dynamic_binding';

// Polymorphism topic metadata
export const POLYMORPHISM_SUBTOPICS = {
  method_overloading: {
    id: 1,
    name: 'Method Overloading',
    description: 'Multiple methods with same name but different parameters',
    component: 'MethodOverloading'
  },
  method_overriding: {
    id: 2,
    name: 'Method Overriding',
    description: 'Redefining parent class methods in child classes',
    component: 'MethodOverriding'
  },
  dynamic_binding: {
    id: 3,
    name: 'Dynamic Binding',
    description: 'Runtime method resolution and virtual functions',
    component: 'DynamicBinding'
  }
};

export default POLYMORPHISM_SUBTOPICS;
