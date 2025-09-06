const express = require('express');
const router = express.Router();
const Topic = require('../Models/Topic');
const Problem = require('../Models/Problem');
const UserProgress = require('../Models/UserProgress');
const Activity = require('../Models/Activity');
const { authenticateJWT } = require('../Middleware/auth');

// Middleware to check if user is admin
const requireAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== 'Admin') {
    return res.status(403).json({
      success: false,
      message: 'Admin privileges required'
    });
  }
  next();
};

// ==================== TOPIC ROUTES ====================

// GET /api/dsa/topics - Get all active topics for students
router.get('/topics', authenticateJWT, async (req, res) => {
  try {
    const topics = await Topic.find({ isActive: true })
      .populate('createdBy', 'name email')
      .sort({ order: 1, createdAt: -1 });

    // Get problem counts for each topic
    const topicsWithCounts = await Promise.all(
      topics.map(async (topic) => {
        const problemCounts = await Problem.aggregate([
          { $match: { topicId: topic._id, isActive: true } },
          {
            $group: {
              _id: '$difficulty',
              count: { $sum: 1 }
            }
          }
        ]);

        const counts = { Easy: 0, Medium: 0, Hard: 0 };
        problemCounts.forEach(item => {
          counts[item._id] = item.count;
        });

        // Get user progress for this topic
        const userProgress = await UserProgress.getTopicProgress(req.user.id, topic._id);

        return {
          id: topic._id,
          name: topic.name,
          description: topic.description,
          icon: topic.icon,
          difficulty: topic.difficulty,
          estimatedHours: topic.estimatedHours,
          totalProblems: topic.totalProblems,
          problemCounts: counts,
          userProgress,
          createdAt: topic.createdAt
        };
      })
    );

    res.json({
      success: true,
      topics: topicsWithCounts,
      count: topicsWithCounts.length
    });
  } catch (error) {
    console.error('Error fetching topics:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch topics',
      error: error.message
    });
  }
});

// GET /api/dsa/admin/topics - Get all topics for admin
router.get('/admin/topics', authenticateJWT, requireAdmin, async (req, res) => {
  try {
    const topics = await Topic.find()
      .populate('createdBy', 'name email')
      .sort({ order: 1, createdAt: -1 });

    const formattedTopics = topics.map(topic => ({
      id: topic._id,
      name: topic.name,
      description: topic.description,
      icon: topic.icon,
      difficulty: topic.difficulty,
      estimatedHours: topic.estimatedHours,
      totalProblems: topic.totalProblems,
      isActive: topic.isActive,
      order: topic.order,
      createdBy: topic.createdBy,
      createdAt: topic.createdAt,
      updatedAt: topic.updatedAt
    }));

    res.json({
      success: true,
      topics: formattedTopics,
      count: formattedTopics.length
    });
  } catch (error) {
    console.error('Error fetching admin topics:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch topics',
      error: error.message
    });
  }
});

// POST /api/dsa/admin/topics - Create new topic
router.post('/admin/topics', authenticateJWT, requireAdmin, async (req, res) => {
  try {
    const { name, description, icon, difficulty, estimatedHours, order } = req.body;

    if (!name || !description) {
      return res.status(400).json({
        success: false,
        message: 'Name and description are required'
      });
    }

    const topic = new Topic({
      name: name.trim(),
      description: description.trim(),
      icon: icon || '📚',
      difficulty: difficulty || 'Beginner',
      estimatedHours: estimatedHours || 10,
      order: order || 0,
      createdBy: req.user.id
    });

    await topic.save();
    await topic.populate('createdBy', 'name email');

    res.status(201).json({
      success: true,
      message: 'Topic created successfully',
      topic: {
        id: topic._id,
        name: topic.name,
        description: topic.description,
        icon: topic.icon,
        difficulty: topic.difficulty,
        estimatedHours: topic.estimatedHours,
        isActive: topic.isActive,
        order: topic.order,
        createdBy: topic.createdBy,
        createdAt: topic.createdAt
      }
    });
  } catch (error) {
    console.error('Error creating topic:', error);
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Topic name already exists'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Failed to create topic',
      error: error.message
    });
  }
});

// PUT /api/dsa/admin/topics/:id - Update topic
router.put('/admin/topics/:id', authenticateJWT, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, icon, difficulty, estimatedHours, order, isActive } = req.body;

    const topic = await Topic.findById(id);
    if (!topic) {
      return res.status(404).json({
        success: false,
        message: 'Topic not found'
      });
    }

    // Update fields
    if (name) topic.name = name.trim();
    if (description) topic.description = description.trim();
    if (icon) topic.icon = icon;
    if (difficulty) topic.difficulty = difficulty;
    if (estimatedHours !== undefined) topic.estimatedHours = estimatedHours;
    if (order !== undefined) topic.order = order;
    if (isActive !== undefined) topic.isActive = isActive;

    await topic.save();
    await topic.populate('createdBy', 'name email');

    res.json({
      success: true,
      message: 'Topic updated successfully',
      topic: {
        id: topic._id,
        name: topic.name,
        description: topic.description,
        icon: topic.icon,
        difficulty: topic.difficulty,
        estimatedHours: topic.estimatedHours,
        isActive: topic.isActive,
        order: topic.order,
        createdBy: topic.createdBy,
        updatedAt: topic.updatedAt
      }
    });
  } catch (error) {
    console.error('Error updating topic:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update topic',
      error: error.message
    });
  }
});

// DELETE /api/dsa/admin/topics/:id - Delete topic
router.delete('/admin/topics/:id', authenticateJWT, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    const topic = await Topic.findById(id);
    if (!topic) {
      return res.status(404).json({
        success: false,
        message: 'Topic not found'
      });
    }

    // Check if topic has problems
    const problemCount = await Problem.countDocuments({ topicId: id });
    if (problemCount > 0) {
      return res.status(400).json({
        success: false,
        message: `Cannot delete topic. It has ${problemCount} problems. Please delete all problems first.`
      });
    }

    await Topic.findByIdAndDelete(id);

    res.json({
      success: true,
      message: 'Topic deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting topic:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete topic',
      error: error.message
    });
  }
});

// PATCH /api/dsa/admin/topics/update-icons - Update all topic icons from 📚 to </>
router.patch('/admin/topics/update-icons', authenticateJWT, requireAdmin, async (req, res) => {
  try {
    const result = await Topic.updateMany(
      { icon: '📚' },
      { $set: { icon: '</>' } }
    );

    res.json({
      success: true,
      message: `Updated ${result.modifiedCount} topics with new code icon`,
      modifiedCount: result.modifiedCount
    });
  } catch (error) {
    console.error('Error updating topic icons:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating topic icons',
      error: error.message
    });
  }
});

// POST /api/dsa/admin/recalculate-counts - Recalculate topic problem counts
router.post('/admin/recalculate-counts', authenticateJWT, requireAdmin, async (req, res) => {
  try {
    console.log('Starting topic problem count recalculation...');
    const topics = await Topic.find();
    console.log(`Found ${topics.length} topics to recalculate`);
    
    for (const topic of topics) {
      const problemCount = await Problem.countDocuments({ 
        topicId: topic._id,
        isActive: true 
      });
      
      console.log(`Topic: ${topic.name}, Old: ${topic.totalProblems}, New: ${problemCount}`);
      
      await Topic.findByIdAndUpdate(topic._id, {
        totalProblems: problemCount
      });
    }

    res.json({
      success: true,
      message: 'Topic problem counts recalculated successfully',
      updatedTopics: topics.length
    });
  } catch (error) {
    console.error('Error recalculating counts:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to recalculate counts',
      error: error.message
    });
  }
});

// ==================== PROBLEM ROUTES ====================

// GET /api/dsa/topics/:topicId/problems - Get problems for a topic
router.get('/topics/:topicId/problems', authenticateJWT, async (req, res) => {
  try {
    const { topicId } = req.params;
    const { difficulty, platform, search } = req.query;

    // Build filter
    const filter = { topicId, isActive: true };
    if (difficulty) filter.difficulty = difficulty;
    if (platform) filter['practiceLink.platform'] = platform;
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }

    const problems = await Problem.find(filter)
      .populate('createdBy', 'name email')
      .sort({ order: 1, createdAt: -1 });

    // Get user progress for each problem
    const problemsWithProgress = await Promise.all(
      problems.map(async (problem) => {
        const progress = await UserProgress.findOne({
          userId: req.user.id,
          problemId: problem._id
        });

        return {
          id: problem._id,
          title: problem.title,
          description: problem.description,
          difficulty: problem.difficulty,
          solution: problem.solution,
          practiceLink: problem.practiceLink,
          hasCodeEditor: problem.hasCodeEditor,
          tags: problem.tags,
          companies: problem.companies,
          order: problem.order,
          successRate: problem.successRate,
          userProgress: progress ? {
            practiced: progress.practiced,
            completed: progress.completed,
            bookmarked: progress.bookmarked,
            totalAttempts: progress.totalAttempts,
            successfulAttempts: progress.successfulAttempts,
            lastAttemptAt: progress.lastAttemptAt
          } : null,
          createdAt: problem.createdAt
        };
      })
    );

    res.json({
      success: true,
      problems: problemsWithProgress,
      count: problemsWithProgress.length
    });
  } catch (error) {
    console.error('Error fetching problems:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch problems',
      error: error.message
    });
  }
});

// GET /api/dsa/admin/problems - Get all problems for admin
router.get('/admin/problems', authenticateJWT, requireAdmin, async (req, res) => {
  try {
    const { topicId } = req.query;
    const filter = topicId ? { topicId } : {};

    const problems = await Problem.find(filter)
      .populate('topicId', 'name')
      .populate('createdBy', 'name email')
      .sort({ order: 1, createdAt: -1 });

    const formattedProblems = problems.map(problem => ({
      id: problem._id,
      title: problem.title,
      description: problem.description,
      difficulty: problem.difficulty,
      solution: problem.solution,
      practiceLink: problem.practiceLink,
      hasCodeEditor: problem.hasCodeEditor,
      codeEditorConfig: problem.codeEditorConfig,
      tags: problem.tags,
      companies: problem.companies,
      isActive: problem.isActive,
      order: problem.order,
      totalAttempts: problem.totalAttempts,
      successfulSolves: problem.successfulSolves,
      successRate: problem.successRate,
      topic: problem.topicId,
      createdBy: problem.createdBy,
      createdAt: problem.createdAt,
      updatedAt: problem.updatedAt
    }));

    res.json({
      success: true,
      problems: formattedProblems,
      count: formattedProblems.length
    });
  } catch (error) {
    console.error('Error fetching admin problems:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch problems',
      error: error.message
    });
  }
});

// POST /api/dsa/admin/problems - Create new problem
router.post('/admin/problems', authenticateJWT, requireAdmin, async (req, res) => {
  try {
    const {
      topicId,
      title,
      description,
      difficulty,
      solution,
      practiceLink,
      hasCodeEditor,
      codeEditorConfig,
      tags,
      companies,
      order
    } = req.body;

    console.log('Creating problem with data:', JSON.stringify(req.body, null, 2));

    if (!topicId || !title || !description || !difficulty) {
      return res.status(400).json({
        success: false,
        message: 'Topic ID, title, description, and difficulty are required'
      });
    }

    // Validate YouTube solution if present
    if (solution && solution.type === 'youtube') {
      if (!solution.youtubeLink || !solution.youtubeLink.trim()) {
        return res.status(400).json({
          success: false,
          message: 'YouTube link is required when solution type is YouTube'
        });
      }
      if (!solution.youtubeLink.includes('youtube.com') && !solution.youtubeLink.includes('youtu.be')) {
        return res.status(400).json({
          success: false,
          message: 'Invalid YouTube link - must contain youtube.com or youtu.be'
        });
      }
    }

    // Verify topic exists
    const topic = await Topic.findById(topicId);
    if (!topic) {
      return res.status(404).json({
        success: false,
        message: 'Topic not found'
      });
    }

    const problem = new Problem({
      topicId,
      title: title.trim(),
      description: description.trim(),
      difficulty,
      solution: solution || {},
      practiceLink,
      hasCodeEditor: hasCodeEditor || false,
      codeEditorConfig: codeEditorConfig || {},
      tags: tags || [],
      companies: companies || [],
      order: order || 0,
      createdBy: req.user.id
    });

    console.log('Problem before save:', JSON.stringify(problem.toObject(), null, 2));

    await problem.save();
    await problem.populate([
      { path: 'topicId', select: 'name' },
      { path: 'createdBy', select: 'name email' }
    ]);

    console.log('Problem created successfully');

    // Update topic's total problems count
    await Topic.findByIdAndUpdate(topicId, {
      $inc: { totalProblems: 1 }
    });

    res.status(201).json({
      success: true,
      message: 'Problem created successfully',
      problem: {
        id: problem._id,
        title: problem.title,
        description: problem.description,
        difficulty: problem.difficulty,
        solution: problem.solution,
        practiceLink: problem.practiceLink,
        hasCodeEditor: problem.hasCodeEditor,
        tags: problem.tags,
        companies: problem.companies,
        topic: problem.topicId,
        createdAt: problem.createdAt
      }
    });
  } catch (error) {
    console.error('Error creating problem:', error);
    console.error('Error stack:', error.stack);
    if (error.name === 'ValidationError') {
      console.error('Validation errors:', error.errors);
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: Object.keys(error.errors).map(key => ({
          field: key,
          message: error.errors[key].message
        }))
      });
    }
    res.status(500).json({
      success: false,
      message: 'Failed to create problem',
      error: error.message
    });
  }
});

// PUT /api/dsa/admin/problems/:id - Update problem
router.put('/admin/problems/:id', authenticateJWT, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    console.log('Updating problem with ID:', id);
    console.log('Update data received:', JSON.stringify(updateData, null, 2));

    // Validate YouTube solution if present
    if (updateData.solution && updateData.solution.type === 'youtube') {
      if (!updateData.solution.youtubeLink || !updateData.solution.youtubeLink.trim()) {
        return res.status(400).json({
          success: false,
          message: 'YouTube link is required when solution type is YouTube'
        });
      }
      if (!updateData.solution.youtubeLink.includes('youtube.com') && !updateData.solution.youtubeLink.includes('youtu.be')) {
        return res.status(400).json({
          success: false,
          message: 'Invalid YouTube link - must contain youtube.com or youtu.be'
        });
      }
    }

    const problem = await Problem.findById(id);
    if (!problem) {
      return res.status(404).json({
        success: false,
        message: 'Problem not found'
      });
    }

    // Handle practiceLink specially - only update if both platform and url are provided
    if (updateData.practiceLink) {
      if (updateData.practiceLink.url && updateData.practiceLink.url.trim()) {
        // Only update practiceLink if URL is provided
        problem.practiceLink = {
          platform: updateData.practiceLink.platform || 'Other',
          url: updateData.practiceLink.url.trim(),
          problemId: updateData.practiceLink.problemId || undefined
        };
      } else {
        // If no URL provided, remove practiceLink entirely
        problem.practiceLink = undefined;
      }
      delete updateData.practiceLink; // Remove from updateData to avoid double processing
    }

    // Update other fields
    Object.keys(updateData).forEach(key => {
      if (updateData[key] !== undefined && key !== '_id' && key !== 'createdBy' && key !== 'practiceLink') {
        problem[key] = updateData[key];
      }
    });

    console.log('Problem before save:', JSON.stringify(problem.toObject(), null, 2));

    await problem.save();
    await problem.populate([
      { path: 'topicId', select: 'name' },
      { path: 'createdBy', select: 'name email' }
    ]);

    console.log('Problem updated successfully');

    res.json({
      success: true,
      message: 'Problem updated successfully',
      problem: {
        id: problem._id,
        title: problem.title,
        description: problem.description,
        difficulty: problem.difficulty,
        solution: problem.solution,
        practiceLink: problem.practiceLink,
        hasCodeEditor: problem.hasCodeEditor,
        tags: problem.tags,
        companies: problem.companies,
        topic: problem.topicId,
        updatedAt: problem.updatedAt
      }
    });
  } catch (error) {
    console.error('Error updating problem:', error);
    console.error('Error stack:', error.stack);
    if (error.name === 'ValidationError') {
      console.error('Validation errors:', error.errors);
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: Object.keys(error.errors).map(key => ({
          field: key,
          message: error.errors[key].message
        }))
      });
    }
    res.status(500).json({
      success: false,
      message: 'Failed to update problem',
      error: error.message
    });
  }
});

// DELETE /api/dsa/admin/problems/:id - Delete problem
router.delete('/admin/problems/:id', authenticateJWT, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    
    const problem = await Problem.findById(id);
    if (!problem) {
      return res.status(404).json({
        success: false,
        message: 'Problem not found'
      });
    }

    const topicId = problem.topicId;
    await Problem.findByIdAndDelete(id);

    // Update topic's total problems count
    await Topic.findByIdAndUpdate(topicId, {
      $inc: { totalProblems: -1 }
    });

    res.json({
      success: true,
      message: 'Problem deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting problem:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete problem',
      error: error.message
    });
  }
});

// ==================== USER PROGRESS ROUTES ====================

// POST /api/dsa/progress/mark - Mark problem as practiced/completed
router.post('/progress/mark', authenticateJWT, async (req, res) => {
  try {
    const { problemId, action } = req.body;
    const userId = req.user.id;

    // Find or create progress record
    let progress = await UserProgress.findOne({ userId, problemId });
    if (!progress) {
      progress = new UserProgress({ 
        userId, 
        problemId, 
        status: 'not_started', 
        isBookmarked: false,
        practiced: false,
        completed: false,
        bookmarked: false
      });
    }

    // Handle different actions
    switch (action) {
      case 'practiced':
        if (progress.status === 'not_started') {
          progress.status = 'practiced';
          progress.practiced = true;
          progress.lastAttemptedAt = new Date();
        }
        break;
        
      case 'completed':
        const wasCompleted = progress.status === 'completed' || progress.completed;
        if (wasCompleted) {
          // Toggle back to practiced or not_started
          progress.status = progress.practiced ? 'practiced' : 'not_started';
          progress.completed = false;
          progress.completedAt = null;
        } else {
          // Mark as completed
          progress.status = 'completed';
          progress.completed = true;
          progress.practiced = true;
          progress.completedAt = new Date();
          progress.lastAttemptedAt = new Date();
          
          // Log activity for completion
          await logProblemActivity(userId, problemId);
        }
        break;
        
      case 'bookmark':
        progress.isBookmarked = !progress.isBookmarked;
        progress.bookmarked = progress.isBookmarked; // Sync legacy field
        break;
        
      default:
        return res.status(400).json({ 
          success: false, 
          message: 'Invalid action' 
        });
    }

    await progress.save();

    // Return progress data in format expected by frontend
    const responseProgress = {
      completed: progress.completed,
      practiced: progress.practiced,
      bookmarked: progress.bookmarked,
      isBookmarked: progress.isBookmarked,
      status: progress.status,
      completedAt: progress.completedAt,
      lastAttemptAt: progress.lastAttemptAt
    };

    res.json({ 
      success: true, 
      message: `Problem ${action} successfully`, 
      progress: responseProgress 
    });
  } catch (error) {
    console.error('Error marking progress:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to mark progress', 
      error: error.message 
    });
  }
});

// GET /api/dsa/progress/stats - Get user statistics
router.get('/progress/stats', authenticateJWT, async (req, res) => {
  try {
    console.log('🔍 Fetching DSA stats for user:', req.user.id);
    
    // Convert user ID to ObjectId for MongoDB queries
    const mongoose = require('mongoose');
    const userObjectId = new mongoose.Types.ObjectId(req.user.id);
    
    const stats = await UserProgress.getUserStats(userObjectId);
    console.log('📊 Basic user stats:', stats);

    // Get the actual total number of problems in the system
    const totalProblemsInSystem = await Problem.countDocuments({ isActive: true });
    console.log('📊 Total problems in system:', totalProblemsInSystem);

    // Get difficulty-wise stats
    const allProblemsByDifficulty = await Problem.aggregate([
      { $match: { isActive: true } },
      {
        $group: {
          _id: '$difficulty',
          totalProblems: { $sum: 1 }
        }
      }
    ]);

    console.log('📊 All problems by difficulty:', allProblemsByDifficulty);

    // Then get user progress by difficulty
    const userProgressByDifficulty = await UserProgress.aggregate([
      { $match: { userId: userObjectId } },
      {
        $lookup: {
          from: 'problems',
          localField: 'problemId',
          foreignField: '_id',
          as: 'problem'
        }
      },
      { $unwind: '$problem' },
      { $match: { 'problem.isActive': true } }, // Only count active problems
      {
        $group: {
          _id: '$problem.difficulty',
          practiced: { $sum: { $cond: [{ $or: ['$practiced', { $eq: ['$status', 'practiced'] }, { $eq: ['$status', 'completed'] }] }, 1, 0] } },
          completed: { $sum: { $cond: [{ $or: ['$completed', { $eq: ['$status', 'completed'] }] }, 1, 0] } }
        }
      }
    ]);

    console.log('📊 User progress by difficulty:', userProgressByDifficulty);

    // Combine the data
    const formattedDifficultyStats = { 
      Easy: { total: 0, practiced: 0, completed: 0 }, 
      Medium: { total: 0, practiced: 0, completed: 0 }, 
      Hard: { total: 0, practiced: 0, completed: 0 } 
    };
    
    // Set total problems for each difficulty
    allProblemsByDifficulty.forEach(stat => {
      if (formattedDifficultyStats[stat._id]) {
        formattedDifficultyStats[stat._id].total = stat.totalProblems;
      }
    });
    
    // Set user progress for each difficulty
    userProgressByDifficulty.forEach(stat => {
      if (formattedDifficultyStats[stat._id]) {
        formattedDifficultyStats[stat._id].practiced = stat.practiced;
        formattedDifficultyStats[stat._id].completed = stat.completed;
        formattedDifficultyStats[stat._id].practicePercentage = formattedDifficultyStats[stat._id].total > 0 ? 
          Math.round((stat.practiced / formattedDifficultyStats[stat._id].total) * 100) : 0;
        formattedDifficultyStats[stat._id].completionPercentage = formattedDifficultyStats[stat._id].total > 0 ? 
          Math.round((stat.completed / formattedDifficultyStats[stat._id].total) * 100) : 0;
      }
    });

    console.log('📊 Final formatted difficulty stats:', formattedDifficultyStats);

    // Calculate streaks
    let currentStreak = 0;
    let maxStreak = 0;
    
    try {
      const Activity = require('../Models/Activity');
      const today = new Date();
      
      // Get activities sorted by date descending
      const activities = await Activity.find({
        userId: userObjectId,
        problemsSolved: { $gt: 0 }
      }).sort({ date: -1 });
      
      // Create a Set for faster lookup
      const activityDates = new Set(activities.map(a => a.date));
      
      let tempStreak = 0;
      let currentStreakFound = false;
      
      // Calculate streaks by going backwards from today
      const todayStr = today.toISOString().split('T')[0];
      let checkDate = new Date(today);
      
      for (let i = 0; i < 365; i++) {
        const dateStr = checkDate.toISOString().split('T')[0];
        const hasActivity = activityDates.has(dateStr);
        
        if (hasActivity) {
          tempStreak++;
          
          // For current streak: only count if we haven't broken the streak yet
          if (!currentStreakFound) {
            currentStreak++;
          }
          
          // Update max streak
          maxStreak = Math.max(maxStreak, tempStreak);
        } else {
          // No activity on this date
          if (dateStr === todayStr) {
            // If no activity today, current streak might still continue from yesterday
            // Don't break the streak yet, just continue to check yesterday
          } else {
            // This breaks the current streak if we're still calculating it
            if (!currentStreakFound) {
              currentStreakFound = true;
            }
            // Reset temp streak for max calculation
            tempStreak = 0;
          }
        }
        
        // Move to previous day
        checkDate.setDate(checkDate.getDate() - 1);
      }
    } catch (streakError) {
      console.error('Error calculating streaks:', streakError);
    }

    const finalStats = {
      totalProblems: totalProblemsInSystem,
      completedProblems: stats.completedProblems || 0,
      practicedProblems: stats.practicedProblems || 0,
      bookmarkedProblems: stats.bookmarkedProblems || 0,
      currentStreak,
      maxStreak,
      difficultyStats: formattedDifficultyStats
    };

    console.log('📊 Final stats being returned:', finalStats);

    res.json({
      success: true,
      stats: finalStats
    });
  } catch (error) {
    console.error('❌ Error fetching user stats:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch statistics',
      error: error.message
    });
  }
});

// GET /api/dsa/progress/bookmarks - Get bookmarked problems
router.get('/progress/bookmarks', authenticateJWT, async (req, res) => {
  try {
    const bookmarks = await UserProgress.find({
      userId: req.user.id,
      bookmarked: true
    })
    .populate({
      path: 'problemId',
      select: 'title description difficulty practiceLink tags',
      populate: {
        path: 'topicId',
        select: 'name icon'
      }
    })
    .sort({ updatedAt: -1 });

    const formattedBookmarks = bookmarks.map(bookmark => ({
      id: bookmark._id,
      problem: bookmark.problemId,
      practiced: bookmark.practiced,
      completed: bookmark.completed,
      lastAttemptAt: bookmark.lastAttemptAt,
      bookmarkedAt: bookmark.updatedAt
    }));

    res.json({
      success: true,
      bookmarks: formattedBookmarks,
      count: formattedBookmarks.length
    });
  } catch (error) {
    console.error('Error fetching bookmarks:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch bookmarks',
      error: error.message
    });
  }
});

// Save user's code attempt
router.post('/progress/save-code', authenticateJWT, async (req, res) => {
  try {
    const { problemId, code, language } = req.body;
    const userId = req.user._id;

    if (!problemId || !code || !language) {
      return res.status(400).json({
        success: false,
        message: 'Problem ID, code, and language are required'
      });
    }

    // Find or create user progress
    let progress = await UserProgress.findOne({ userId, problemId });

    if (!progress) {
      const problem = await Problem.findById(problemId);
      if (!problem) {
        return res.status(404).json({
          success: false,
          message: 'Problem not found'
        });
      }

      progress = new UserProgress({
        userId,
        problemId,
        topicId: problem.topicId
      });
    }

    // Update code attempt
    progress.lastAttemptCode = {
      code,
      language,
      timestamp: new Date()
    };

    // Add to attempts history
    progress.attempts.push({
      code,
      language,
      timestamp: new Date(),
      type: 'code_save'
    });

    await progress.save();

    res.json({
      success: true,
      message: 'Code saved successfully',
      data: progress
    });

  } catch (error) {
    console.error('Save code error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to save code'
    });
  }
});

// GET /api/dsa/progress/activity - Get user activity data for the last year
router.get('/progress/activity', authenticateJWT, async (req, res) => {
  try {
    const userId = req.user.id;
    const today = new Date();
    const oneYearAgo = new Date(today);
    oneYearAgo.setDate(oneYearAgo.getDate() - 365);

    // Get user progress data for the last year
    const progressData = await UserProgress.find({
      userId,
      lastAttemptAt: { $gte: oneYearAgo }
    }).select('lastAttemptAt firstCompletedAt completed practiced');

    // Create activity map by date
    const activityMap = new Map();

    // Initialize all dates in the last year with 0 activity
    for (let i = 0; i < 365; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      activityMap.set(dateStr, { count: 0, level: 0 });
    }

    // Count activities by date
    progressData.forEach(progress => {
      if (progress.lastAttemptAt) {
        const dateStr = progress.lastAttemptAt.toISOString().split('T')[0];
        if (activityMap.has(dateStr)) {
          const current = activityMap.get(dateStr);
          current.count += 1;
          // Determine activity level based on count
          if (current.count >= 4) current.level = 4;
          else if (current.count >= 3) current.level = 3;
          else if (current.count >= 2) current.level = 2;
          else if (current.count >= 1) current.level = 1;
          activityMap.set(dateStr, current);
        }
      }
    });

    // Convert map to array format expected by frontend
    const activityArray = [];
    for (let i = 364; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      const activity = activityMap.get(dateStr) || { count: 0, level: 0 };

      activityArray.push({
        date: dateStr,
        count: activity.count,
        level: activity.level
      });
    }

    res.json({
      success: true,
      activity: activityArray,
      totalDays: activityArray.length
    });
  } catch (error) {
    console.error('Error fetching activity data:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch activity data',
      error: error.message
    });
  }
});

// Get leaderboard data
router.get('/leaderboard', authenticateJWT, async (req, res) => {
  try {
    const { timeframe = 'all', category = 'problems' } = req.query;

    // Build date filter for timeframe
    let dateFilter = {};
    const now = new Date();

    if (timeframe === 'week') {
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      dateFilter = { updatedAt: { $gte: weekAgo } };
    } else if (timeframe === 'month') {
      const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      dateFilter = { updatedAt: { $gte: monthAgo } };
    }

    // Aggregate user progress data
    const pipeline = [
      { $match: dateFilter },
      {
        $group: {
          _id: '$userId',
          totalCompleted: { $sum: { $cond: ['$completed', 1, 0] } },
          totalPracticed: { $sum: { $cond: ['$practiced', 1, 0] } },
          currentStreak: { $max: '$statistics.currentStreak' },
          hardCompleted: {
            $sum: {
              $cond: [
                { $and: ['$completed', { $eq: ['$difficulty', 'Hard'] }] },
                1,
                0
              ]
            }
          }
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'user'
        }
      },
      { $unwind: '$user' },
      {
        $project: {
          userId: '$_id',
          name: '$user.name',
          email: '$user.email',
          totalCompleted: 1,
          totalPracticed: 1,
          currentStreak: { $ifNull: ['$currentStreak', 0] },
          hardCompleted: 1
        }
      }
    ];

    // Sort based on category
    let sortField = {};
    switch (category) {
      case 'streak':
        sortField = { currentStreak: -1, totalCompleted: -1 };
        break;
      case 'difficulty':
        sortField = { hardCompleted: -1, totalCompleted: -1 };
        break;
      default:
        sortField = { totalCompleted: -1, totalPracticed: -1 };
    }

    pipeline.push({ $sort: sortField });
    pipeline.push({ $limit: 50 }); // Top 50 users

    const leaderboard = await UserProgress.aggregate(pipeline);

    res.json({
      success: true,
      data: leaderboard
    });

  } catch (error) {
    console.error('Leaderboard error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch leaderboard'
    });
  }
});

// POST /api/dsa/activity/log - Log user activity
router.post('/activity/log', authenticateJWT, async (req, res) => {
  try {
    const { type, data } = req.body;

    if (!type || !data) {
      return res.status(400).json({
        success: false,
        message: 'Activity type and data are required'
      });
    }

    const activity = new Activity({
      userId: req.user.id,
      type,
      data
    });

    await activity.save();

    res.json({
      success: true,
      message: 'Activity logged successfully'
    });
  } catch (error) {
    console.error('Error logging activity:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to log activity',
      error: error.message
    });
  }
});

// GET /api/dsa/activity/history - Get user activity history
router.get('/activity/history', authenticateJWT, async (req, res) => {
  try {
    const activities = await Activity.find({ userId: req.user.id })
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      activities
    });
  } catch (error) {
    console.error('Error fetching activity history:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch activity history',
      error: error.message
    });
  }
});

// ==================== ACTIVITY TRACKING ROUTES ====================

// Helper function to log activity when problem is solved
const logProblemActivity = async (userId, problemId) => {
  try {
    const today = new Date().toISOString().split('T')[0];
    
    // Find or create today's activity record
    let activity = await Activity.findOne({ userId, date: today });
    
    if (!activity) {
      activity = new Activity({
        userId,
        date: today,
        problemsSolved: 0,
        problemIds: []
      });
    }
    
    // Add problem if not already solved today
    if (!activity.problemIds.includes(problemId)) {
      activity.problemIds.push(problemId);
      activity.problemsSolved = activity.problemIds.length;
      await activity.save();
    }
    
    return activity;
  } catch (error) {
    console.error('Error logging problem activity:', error);
  }
};

// GET /api/dsa/progress/activity - Get user's activity data for the grid
router.get('/progress/activity', authenticateJWT, async (req, res) => {
  try {
    const userId = req.user.id;
    const today = new Date();
    const oneYearAgo = new Date(today);
    oneYearAgo.setDate(oneYearAgo.getDate() - 364);
    
    // Get all activity records for the past year
    const activities = await Activity.find({
      userId,
      date: {
        $gte: oneYearAgo.toISOString().split('T')[0],
        $lte: today.toISOString().split('T')[0]
      }
    }).sort({ date: 1 });
    
    // Create activity map for quick lookup
    const activityMap = {};
    activities.forEach(activity => {
      activityMap[activity.date] = {
        date: activity.date,
        count: activity.problemsSolved,
        level: activity.level
      };
    });
    
    // Generate complete 365-day activity array
    const activityArray = [];
    for (let i = 364; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      
      activityArray.push(activityMap[dateStr] || {
        date: dateStr,
        count: 0,
        level: 0
      });
    }
    
    res.json({
      success: true,
      activity: activityArray
    });
  } catch (error) {
    console.error('Error fetching activity data:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch activity data',
      error: error.message
    });
  }
});

// GET /api/dsa/progress/streaks - Get current and max streaks
router.get('/progress/streaks', authenticateJWT, async (req, res) => {
  try {
    const userId = req.user.id;
    const today = new Date();
    
    // Get activities sorted by date descending
    const activities = await Activity.find({
      userId,
      problemsSolved: { $gt: 0 }
    }).sort({ date: -1 });
    
    // Create a Set for faster lookup
    const activityDates = new Set(activities.map(a => a.date));
    
    let currentStreak = 0;
    let maxStreak = 0;
    let tempStreak = 0;
    let currentStreakFound = false;
    
    // Calculate streaks by going backwards from today
    const todayStr = today.toISOString().split('T')[0];
    let checkDate = new Date(today);
    
    for (let i = 0; i < 365; i++) {
      const dateStr = checkDate.toISOString().split('T')[0];
      const hasActivity = activityDates.has(dateStr);
      
      if (hasActivity) {
        tempStreak++;
        
        // For current streak: only count if we haven't broken the streak yet
        if (!currentStreakFound) {
          currentStreak++;
        }
        
        // Update max streak
        maxStreak = Math.max(maxStreak, tempStreak);
      } else {
        // No activity on this date
        if (dateStr === todayStr) {
          // If no activity today, current streak might still continue from yesterday
          // Don't break the streak yet, just continue to check yesterday
        } else {
          // This breaks the current streak if we're still calculating it
          if (!currentStreakFound) {
            currentStreakFound = true;
          }
          // Reset temp streak for max calculation
          tempStreak = 0;
        }
      }
      
      // Move to previous day
      checkDate.setDate(checkDate.getDate() - 1);
    }
    
    res.json({
      success: true,
      currentStreak,
      maxStreak
    });
  } catch (error) {
    console.error('Error calculating streaks:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to calculate streaks',
      error: error.message
    });
  }
});

module.exports = router;