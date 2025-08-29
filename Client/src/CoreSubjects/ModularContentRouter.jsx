import React, { lazy, Suspense } from 'react';

// Dynamic imports for all subjects and topics
const loadSubtopic = (subject, topic, subtopic) => {
  try {
    return lazy(() => import(`./${subject}/${topic}/${subtopic}.jsx`));
  } catch (error) {
    console.error(`Failed to load subtopic: ${subject}/${topic}/${subtopic}`, error);
    return null;
  }
};

const ModularContentRouter = ({ subjectId, topicId, subtopicId }) => {
  // Map subject IDs to folder names
  const subjectMap = {
    1: 'DBMS',
    2: 'OS', 
    3: 'CN',
    4: 'OOP'
  };

  // Map topic IDs to folder names for each subject
  const topicMap = {
    DBMS: {
      1: 'DatabaseFundamentals',
      2: 'ERModel',
      3: 'RelationalModel', 
      4: 'SQL',
      5: 'Transactions'
    },
    OS: {
      1: 'Processes',
      2: 'Scheduling',
      3: 'MemoryManagement',
      4: 'FileSystem',
      5: 'Synchronization'
    },
    CN: {
      1: 'NetworkBasics',
      2: 'DataLink',
      3: 'NetworkLayer',
      4: 'TransportLayer',
      5: 'ApplicationLayer'
    },
    OOP: {
      1: 'Fundamentals',
      2: 'Inheritance',
      3: 'Polymorphism',
      4: 'Encapsulation',
      5: 'Abstraction',
      6: 'DesignPatterns'
    }
  };

  // Get folder names
  const subjectFolder = subjectMap[subjectId];
  const topicFolder = topicMap[subjectFolder]?.[topicId];

  if (!subjectFolder || !topicFolder || !subtopicId) {
    return (
      <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-6">
        <p className="text-red-400">Content not found: {subjectFolder}/{topicFolder}/{subtopicId}</p>
      </div>
    );
  }

  // Load the subtopic component
  const SubtopicComponent = loadSubtopic(subjectFolder, topicFolder, subtopicId);

  if (!SubtopicComponent) {
    return (
      <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-6">
        <p className="text-yellow-400">Subtopic component not available: {subtopicId}</p>
      </div>
    );
  }

  return (
    <Suspense 
      fallback={
        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-600 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-600 rounded w-1/2 mb-2"></div>
            <div className="h-4 bg-gray-600 rounded w-5/6"></div>
          </div>
        </div>
      }
    >
      <SubtopicComponent />
    </Suspense>
  );
};

export default ModularContentRouter;
