const express = require('express');
const router = express.Router();
const Topic = require('../Models/Topic');
const Problem = require('../Models/Problem');
const UserProgress = require('../Models/UserProgress');
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
    const { problemId, action } = req.body; // action: 'practiced', 'completed', 'bookmark'

    if (!problemId || !action) {
      return res.status(400).json({
        success: false,
        message: 'Problem ID and action are required'
      });
    }

    const problem = await Problem.findById(problemId);
    if (!problem) {
      return res.status(404).json({
        success: false,
        message: 'Problem not found'
      });
    }

    let progress = await UserProgress.findOne({
      userId: req.user.id,
      problemId
    });

    if (!progress) {
      progress = new UserProgress({
        userId: req.user.id,
        problemId,
        topicId: problem.topicId
      });
    }

    // Update based on action
    switch (action) {
      case 'practiced':
        progress.practiced = !progress.practiced;
        if (progress.practiced && !progress.firstCompletedAt) {
          progress.firstCompletedAt = new Date();
        }
        break;
      case 'completed':
        progress.completed = !progress.completed;
        progress.practiced = true; // If completed, it's also practiced
        if (progress.completed && !progress.firstCompletedAt) {
          progress.firstCompletedAt = new Date();
        }
        break;
      case 'bookmark':
        progress.bookmarked = !progress.bookmarked;
        break;
      default:
        return res.status(400).json({
          success: false,
          message: 'Invalid action'
        });
    }

    progress.lastAttemptAt = new Date();
    await progress.save();

    res.json({
      success: true,
      message: `Problem ${action} status updated`,
      progress: {
        practiced: progress.practiced,
        completed: progress.completed,
        bookmarked: progress.bookmarked,
        lastAttemptAt: progress.lastAttemptAt
      }
    });
  } catch (error) {
    console.error('Error updating progress:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update progress',
      error: error.message
    });
  }
});

// GET /api/dsa/progress/stats - Get user statistics
router.get('/progress/stats', authenticateJWT, async (req, res) => {
  try {
    const stats = await UserProgress.getUserStats(req.user.id);

    // Get the actual total number of problems in the system
    const totalProblemsInSystem = await Problem.countDocuments();

    // Get difficulty-wise stats
    const difficultyStats = await UserProgress.aggregate([
      { $match: { userId: req.user.id } },
      {
        $lookup: {
          from: 'problems',
          localField: 'problemId',
          foreignField: '_id',
          as: 'problem'
        }
      },
      { $unwind: '$problem' },
      {
        $group: {
          _id: '$problem.difficulty',
          total: { $sum: 1 },
          practiced: { $sum: { $cond: ['$practiced', 1, 0] } },
          completed: { $sum: { $cond: ['$completed', 1, 0] } }
        }
      }
    ]);

    const formattedDifficultyStats = { Easy: {}, Medium: {}, Hard: {} };
    difficultyStats.forEach(stat => {
      formattedDifficultyStats[stat._id] = {
        total: stat.total,
        practiced: stat.practiced,
        completed: stat.completed,
        practicePercentage: stat.total > 0 ? Math.round((stat.practiced / stat.total) * 100) : 0,
        completionPercentage: stat.total > 0 ? Math.round((stat.completed / stat.total) * 100) : 0
      };
    });

    res.json({
      success: true,
      stats: {
        ...stats,
        totalProblems: totalProblemsInSystem, // Override with actual total
        difficultyStats: formattedDifficultyStats
      }
    });
  } catch (error) {
    console.error('Error fetching user stats:', error);
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

module.exports = router;
