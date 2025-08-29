// Scheduling Topic Index
export { default as fcfs } from './fcfs';
export { default as sjf } from './sjf';
export { default as round_robin } from './round_robin';
export { default as priority_scheduling } from './priority_scheduling';

export const TOPIC_CONFIG = {
  id: 2,
  name: 'CPU Scheduling',
  description: 'Scheduling algorithms and policies',
  subtopics: [
    { id: 'fcfs', name: 'FCFS (First Come First Serve)', component: 'fcfs' },
    { id: 'sjf', name: 'SJF (Shortest Job First)', component: 'sjf' },
    { id: 'round_robin', name: 'Round Robin', component: 'round_robin' },
    { id: 'priority_scheduling', name: 'Priority Scheduling', component: 'priority_scheduling' }
  ]
};

// Default export for direct topic access
export { default } from './fcfs';
