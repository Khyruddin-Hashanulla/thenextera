// DBMS Subject Index - Exports all topics
export { default as DatabaseFundamentals } from './DatabaseFundamentals';
export { default as ERModel } from './ERModel';
export { default as RelationalModel } from './RelationalModel';
export { default as SQL } from './SQL';
export { default as Transactions } from './Transactions';

// DBMS Topic metadata
export const DBMS_TOPICS = {
  DatabaseFundamentals: {
    id: 1,
    name: 'Database Fundamentals',
    description: 'Introduction, architecture, and data models',
    subtopics: ['introduction', 'architecture', 'data_models']
  },
  ERModel: {
    id: 2,
    name: 'ER Model & Design',
    description: 'Entity-Relationship modeling and database design',
    subtopics: ['entities', 'relationships', 'er_diagrams']
  },
  RelationalModel: {
    id: 3,
    name: 'Relational Model',
    description: 'Keys, dependencies, and normalization',
    subtopics: ['keys', 'functional_dependencies', 'normalization']
  },
  SQL: {
    id: 4,
    name: 'SQL Operations',
    description: 'Database queries and operations',
    subtopics: ['basic_queries', 'joins', 'advanced_operations']
  },
  Transactions: {
    id: 5,
    name: 'Transactions & Concurrency',
    description: 'ACID properties, concurrency control, and recovery',
    subtopics: ['acid_properties', 'concurrency_control', 'recovery_techniques']
  }
};

// Default export
export default DBMS_TOPICS;
