// ERModel Topic Index
export { default as entities } from './entities';
export { default as relationships } from './relationships';
export { default as er_diagrams } from './er_diagrams';

export const TOPIC_CONFIG = {
  id: 2,
  name: 'ER Model & Design',
  description: 'Entity-Relationship modeling and database design',
  subtopics: [
    { id: 'entities', name: 'Entity Sets', component: 'entities' },
    { id: 'relationships', name: 'Relationships', component: 'relationships' },
    { id: 'er_diagrams', name: 'ER Diagrams', component: 'er_diagrams' }
  ]
};

// Default export for direct topic access
export { default } from './entities';
