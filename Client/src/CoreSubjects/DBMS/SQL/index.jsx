// SQL Topic Index - Exports all subtopics
export { default as basic_queries } from './basic_queries';
export { default as joins } from './joins';
export { default as advanced_operations } from './advanced_operations';

// SQL Topic Configuration
export const SQL_CONFIG = {
  id: 4,
  name: 'SQL Operations',
  description: 'Database queries and operations',
  subtopics: [
    {
      id: 'basic_queries',
      name: 'Basic SQL Queries',
      description: 'SELECT, INSERT, UPDATE, DELETE operations'
    },
    {
      id: 'joins',
      name: 'SQL Joins',
      description: 'INNER, LEFT, RIGHT, FULL OUTER joins'
    },
    {
      id: 'advanced_operations',
      name: 'Advanced SQL Operations',
      description: 'Subqueries, views, stored procedures, functions'
    }
  ]
};

export default SQL_CONFIG;
