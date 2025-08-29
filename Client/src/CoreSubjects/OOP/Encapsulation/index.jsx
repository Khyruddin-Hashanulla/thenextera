// Encapsulation subtopics
export { default as DataHiding } from './data_hiding';
export { default as AccessModifiers } from './access_modifiers';
export { default as GettersSetters } from './getters_setters';

// Encapsulation topic metadata
export const ENCAPSULATION_SUBTOPICS = {
  data_hiding: {
    id: 1,
    name: 'Data Hiding',
    description: 'Protecting internal data from external access',
    component: 'DataHiding'
  },
  access_modifiers: {
    id: 2,
    name: 'Access Modifiers',
    description: 'Public, private, and protected access levels',
    component: 'AccessModifiers'
  },
  getters_setters: {
    id: 3,
    name: 'Getters & Setters',
    description: 'Controlled access to object properties',
    component: 'GettersSetters'
  }
};

export default ENCAPSULATION_SUBTOPICS;
