// Global CoreSubjects Index - Exports all subjects
export { default as DBMS } from './DBMS';
export { default as OS } from './OS';
export { default as CN } from './CN';
export { default as OOP } from './OOP';

// Subject metadata for routing and navigation
export const SUBJECTS = {
  DBMS: {
    id: 1,
    name: 'Database Management Systems',
    path: '/subject/1',
    description: 'Comprehensive database fundamentals, design, and implementation'
  },
  OS: {
    id: 2,
    name: 'Operating Systems',
    path: '/subject/2',
    description: 'System software, process management, and resource allocation'
  },
  CN: {
    id: 3,
    name: 'Computer Networks',
    path: '/subject/3',
    description: 'Network protocols, communication, and distributed systems'
  },
  OOP: {
    id: 4,
    name: 'Object-Oriented Programming',
    path: '/subject/4',
    description: 'Programming paradigms, design patterns, and software architecture'
  }
};
