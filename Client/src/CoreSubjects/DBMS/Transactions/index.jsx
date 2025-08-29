// Transactions Topic Index - Exports all transaction-related subtopics and metadata
import AcidPropertiesSubtopic from './acid_properties';
import ConcurrencyControlSubtopic from './concurrency_control';
import RecoveryTechniquesSubtopic from './recovery_techniques';

export const subtopics = {
  acid_properties: {
    id: 'acid_properties',
    title: 'ACID Properties',
    component: AcidPropertiesSubtopic,
    description: 'Atomicity, Consistency, Isolation, and Durability in transactions'
  },
  concurrency_control: {
    id: 'concurrency_control',
    title: 'Concurrency Control',
    component: ConcurrencyControlSubtopic,
    description: 'Managing concurrent transactions and preventing conflicts'
  },
  recovery_techniques: {
    id: 'recovery_techniques',
    title: 'Recovery Techniques',
    component: RecoveryTechniquesSubtopic,
    description: 'Database recovery methods and failure handling'
  }
};

export const topicConfig = {
  id: 'Transactions',
  title: 'Database Transactions',
  description: 'Master transaction processing, concurrency control, and recovery',
  subtopicOrder: ['acid_properties', 'concurrency_control', 'recovery_techniques']
};

export default {
  subtopics,
  topicConfig
};
