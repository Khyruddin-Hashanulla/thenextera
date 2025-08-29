import React from 'react';
import { SUBJECTS } from './index';

// Import all subject topic configurations
import { DBMS_TOPICS } from './DBMS';
import { OS_TOPICS } from './OS';
import { CN_TOPICS } from './CN';
import { OOP_TOPICS } from './OOP';

class ContentManager {
  constructor() {
    this.subjects = SUBJECTS;
    this.topics = {
      DBMS: DBMS_TOPICS,
      OS: OS_TOPICS,
      CN: CN_TOPICS,
      OOP: OOP_TOPICS
    };
  }

  // Get subject by ID
  getSubject(subjectId) {
    const subjectKey = Object.keys(this.subjects).find(
      key => this.subjects[key].id === parseInt(subjectId)
    );
    return subjectKey ? { key: subjectKey, ...this.subjects[subjectKey] } : null;
  }

  // Get topic by subject and topic ID
  getTopic(subjectKey, topicId) {
    const topics = this.topics[subjectKey];
    if (!topics) return null;

    const topicKey = Object.keys(topics).find(
      key => topics[key].id === parseInt(topicId)
    );
    return topicKey ? { key: topicKey, ...topics[topicKey] } : null;
  }

  // Get all topics for a subject
  getSubjectTopics(subjectKey) {
    return this.topics[subjectKey] || {};
  }

  // Get subtopic info
  getSubtopic(subjectKey, topicKey, subtopicId) {
    const topic = this.topics[subjectKey]?.[topicKey];
    if (!topic) return null;

    const subtopic = topic.subtopics.find(sub => 
      typeof sub === 'string' ? sub === subtopicId : sub.id === subtopicId
    );
    
    return subtopic ? {
      id: typeof subtopic === 'string' ? subtopic : subtopic.id,
      title: typeof subtopic === 'string' ? this.formatTitle(subtopic) : subtopic.title,
      ...subtopic
    } : null;
  }

  // Format subtopic ID to readable title
  formatTitle(subtopicId) {
    // Special handling for acronyms
    const acronymMap = {
      'fcfs': 'FCFS',
      'sjf': 'SJF',
      'FCFS': 'FCFS',
      'SJF': 'SJF'
    };
    
    if (acronymMap[subtopicId]) {
      return acronymMap[subtopicId];
    }
    
    return subtopicId
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  // Get navigation data for a topic
  getTopicNavigation(subjectId, topicId) {
    const subject = this.getSubject(subjectId);
    if (!subject) return null;

    const topic = this.getTopic(subject.key, topicId);
    if (!topic) return null;

    const allTopics = Object.values(this.getSubjectTopics(subject.key));
    const currentIndex = allTopics.findIndex(t => t.id === parseInt(topicId));

    return {
      subject,
      topic,
      currentIndex,
      totalTopics: allTopics.length,
      previousTopic: currentIndex > 0 ? allTopics[currentIndex - 1] : null,
      nextTopic: currentIndex < allTopics.length - 1 ? allTopics[currentIndex + 1] : null,
      allTopics
    };
  }

  // Get breadcrumb navigation
  getBreadcrumbs(subjectId, topicId, subtopicId) {
    const subject = this.getSubject(subjectId);
    if (!subject) return [];

    const breadcrumbs = [
      { title: 'Core Subjects', path: '/core-subject' },
      { title: subject.name, path: `/subject/${subjectId}` }
    ];

    if (topicId) {
      const topic = this.getTopic(subject.key, topicId);
      if (topic) {
        breadcrumbs.push({
          title: topic.name,
          path: `/subject/${subjectId}/topic/${topicId}`
        });

        if (subtopicId) {
          const subtopic = this.getSubtopic(subject.key, topic.key, subtopicId);
          if (subtopic) {
            breadcrumbs.push({
              title: subtopic.title,
              path: `/subject/${subjectId}/topic/${topicId}/subtopic/${subtopicId}`
            });
          }
        }
      }
    }

    return breadcrumbs;
  }

  // Validate content path
  isValidPath(subjectId, topicId, subtopicId) {
    const subject = this.getSubject(subjectId);
    if (!subject) return false;

    if (topicId) {
      const topic = this.getTopic(subject.key, topicId);
      if (!topic) return false;

      if (subtopicId) {
        const subtopic = this.getSubtopic(subject.key, topic.key, subtopicId);
        return !!subtopic;
      }
    }

    return true;
  }
}

// Export singleton instance
export default new ContentManager();
