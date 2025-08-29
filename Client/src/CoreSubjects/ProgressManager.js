// Progress Manager for tracking completion status across DBMS modules
class ProgressManager {
  constructor() {
    this.storageKey = 'dbms_progress';
    this.progress = this.loadProgress();
  }

  // Load progress from localStorage
  loadProgress() {
    try {
      const saved = localStorage.getItem(this.storageKey);
      return saved ? JSON.parse(saved) : {};
    } catch (error) {
      console.error('Error loading progress:', error);
      return {};
    }
  }

  // Save progress to localStorage
  saveProgress() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.progress));
    } catch (error) {
      console.error('Error saving progress:', error);
    }
  }

  // Get completion status for a specific subtopic
  getSubtopicCompletion(subjectId, topicId, subtopicId) {
    const key = `${subjectId}_${topicId}_${subtopicId}`;
    return this.progress[key] || false;
  }

  // Mark subtopic as completed
  markSubtopicComplete(subjectId, topicId, subtopicId) {
    const key = `${subjectId}_${topicId}_${subtopicId}`;
    this.progress[key] = true;
    this.saveProgress();
    
    // Dispatch custom event for UI updates
    window.dispatchEvent(new CustomEvent('progressUpdated', {
      detail: { subjectId, topicId, subtopicId, completed: true }
    }));
  }

  // Get completion statistics for a subject
  getSubjectProgress(subjectId, topics) {
    let totalSubtopics = 0;
    let completedSubtopics = 0;

    Object.entries(topics).forEach(([topicKey, topic]) => {
      topic.subtopics.forEach(subtopic => {
        totalSubtopics++;
        const subtopicId = typeof subtopic === 'string' ? subtopic : subtopic.id;
        if (this.getSubtopicCompletion(subjectId, topic.id, subtopicId)) {
          completedSubtopics++;
        }
      });
    });

    return {
      total: totalSubtopics,
      completed: completedSubtopics,
      percentage: totalSubtopics > 0 ? Math.round((completedSubtopics / totalSubtopics) * 100) : 0
    };
  }

  // Get completion statistics for a specific topic
  getTopicProgress(subjectId, topicId, subtopics) {
    let totalSubtopics = subtopics.length;
    let completedSubtopics = 0;

    subtopics.forEach(subtopic => {
      const subtopicId = typeof subtopic === 'string' ? subtopic : subtopic.id;
      if (this.getSubtopicCompletion(subjectId, topicId, subtopicId)) {
        completedSubtopics++;
      }
    });

    return {
      total: totalSubtopics,
      completed: completedSubtopics,
      percentage: totalSubtopics > 0 ? Math.round((completedSubtopics / totalSubtopics) * 100) : 0
    };
  }

  // Reset progress for a subject (for testing/admin purposes)
  resetSubjectProgress(subjectId) {
    Object.keys(this.progress).forEach(key => {
      if (key.startsWith(`${subjectId}_`)) {
        delete this.progress[key];
      }
    });
    this.saveProgress();
    
    window.dispatchEvent(new CustomEvent('progressReset', {
      detail: { subjectId }
    }));
  }

  // Get all progress data (for debugging/admin)
  getAllProgress() {
    return { ...this.progress };
  }

  // Get progress for a specific key (used by Navbar)
  getProgress(key) {
    return this.progress[key] || 0;
  }
}

// Export singleton instance
export default new ProgressManager();
