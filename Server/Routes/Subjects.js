const express = require('express');
const router = express.Router();
const Subject = require('../Models/Subject');
const { authenticateJWT } = require('../Middleware/auth');

// Middleware to check if user is admin (JWT-based)
const requireJWTAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== 'Admin') {
    return res.status(403).json({
      success: false,
      message: 'Admin privileges required'
    });
  }
  next();
};

// GET /api/subjects - Get all active subjects (public for authenticated users)
router.get('/', authenticateJWT, async (req, res) => {
  try {
    const subjects = await Subject.find({ isActive: true })
      .populate('createdBy', 'name email')
      .sort({ createdAt: -1 });

    const formattedSubjects = subjects.map(subject => ({
      id: subject._id,
      name: subject.name,
      icon: subject.icon,
      progress: subject.progress,
      description: subject.description,
      createdBy: subject.createdBy,
      createdAt: subject.createdAt,
      updatedAt: subject.updatedAt
    }));

    res.json({
      success: true,
      subjects: formattedSubjects,
      count: formattedSubjects.length
    });
  } catch (error) {
    console.error('Error fetching subjects:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch subjects',
      error: error.message
    });
  }
});

// GET /api/subjects/admin - Get all subjects for admin (including inactive)
router.get('/admin', authenticateJWT, requireJWTAdmin, async (req, res) => {
  try {
    const subjects = await Subject.find({})
      .populate('createdBy', 'name email')
      .sort({ createdAt: -1 });

    const formattedSubjects = subjects.map(subject => ({
      id: subject._id,
      name: subject.name,
      icon: subject.icon,
      progress: subject.progress,
      description: subject.description,
      isActive: subject.isActive,
      createdBy: subject.createdBy,
      createdAt: subject.createdAt,
      updatedAt: subject.updatedAt
    }));

    res.json({
      success: true,
      subjects: formattedSubjects,
      count: formattedSubjects.length
    });
  } catch (error) {
    console.error('Error fetching subjects for admin:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch subjects',
      error: error.message
    });
  }
});

// GET /api/subjects/:id - Get single subject
router.get('/:id', authenticateJWT, async (req, res) => {
  try {
    const subject = await Subject.findById(req.params.id)
      .populate('createdBy', 'name email');

    if (!subject) {
      return res.status(404).json({
        success: false,
        message: 'Subject not found'
      });
    }

    // Non-admin users can only see active subjects
    if (!subject.isActive && req.user.role !== 'Admin') {
      return res.status(404).json({
        success: false,
        message: 'Subject not found'
      });
    }

    res.json({
      success: true,
      subject: {
        id: subject._id,
        name: subject.name,
        icon: subject.icon,
        progress: subject.progress,
        description: subject.description,
        isActive: subject.isActive,
        createdBy: subject.createdBy,
        createdAt: subject.createdAt,
        updatedAt: subject.updatedAt
      }
    });
  } catch (error) {
    console.error('Error fetching subject:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch subject',
      error: error.message
    });
  }
});

// POST /api/subjects - Create new subject (admin only)
router.post('/', authenticateJWT, requireJWTAdmin, async (req, res) => {
  try {
    const { name, icon, progress, description } = req.body;

    // Validation
    if (!name || !icon) {
      return res.status(400).json({
        success: false,
        message: 'Name and icon are required'
      });
    }

    // Check if subject with same name already exists
    const existingSubject = await Subject.findOne({ 
      name: { $regex: new RegExp(`^${name}$`, 'i') } 
    });

    if (existingSubject) {
      return res.status(400).json({
        success: false,
        message: 'Subject with this name already exists'
      });
    }

    const subject = new Subject({
      name: name.trim(),
      icon: icon.trim(),
      progress: progress || 0,
      description: description?.trim(),
      createdBy: req.user.id || req.user._id
    });

    await subject.save();
    await subject.populate('createdBy', 'name email');

    res.status(201).json({
      success: true,
      message: 'Subject created successfully',
      subject: {
        id: subject._id,
        name: subject.name,
        icon: subject.icon,
        progress: subject.progress,
        description: subject.description,
        isActive: subject.isActive,
        createdBy: subject.createdBy,
        createdAt: subject.createdAt,
        updatedAt: subject.updatedAt
      }
    });
  } catch (error) {
    console.error('Error creating subject:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create subject',
      error: error.message
    });
  }
});

// PUT /api/subjects/:id - Update subject (admin only)
router.put('/:id', authenticateJWT, requireJWTAdmin, async (req, res) => {
  try {
    const { name, icon, progress, description, isActive } = req.body;

    const subject = await Subject.findById(req.params.id);
    if (!subject) {
      return res.status(404).json({
        success: false,
        message: 'Subject not found'
      });
    }

    // Check if updating name to an existing name
    if (name && name !== subject.name) {
      const existingSubject = await Subject.findOne({ 
        name: { $regex: new RegExp(`^${name}$`, 'i') },
        _id: { $ne: req.params.id }
      });

      if (existingSubject) {
        return res.status(400).json({
          success: false,
          message: 'Subject with this name already exists'
        });
      }
    }

    // Update fields
    if (name) subject.name = name.trim();
    if (icon) subject.icon = icon.trim();
    if (progress !== undefined) subject.progress = progress;
    if (description !== undefined) subject.description = description?.trim();
    if (isActive !== undefined) subject.isActive = isActive;

    await subject.save();
    await subject.populate('createdBy', 'name email');

    res.json({
      success: true,
      message: 'Subject updated successfully',
      subject: {
        id: subject._id,
        name: subject.name,
        icon: subject.icon,
        progress: subject.progress,
        description: subject.description,
        isActive: subject.isActive,
        createdBy: subject.createdBy,
        createdAt: subject.createdAt,
        updatedAt: subject.updatedAt
      }
    });
  } catch (error) {
    console.error('Error updating subject:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update subject',
      error: error.message
    });
  }
});

// DELETE /api/subjects/:id - Delete subject (admin only)
router.delete('/:id', authenticateJWT, requireJWTAdmin, async (req, res) => {
  try {
    const subject = await Subject.findById(req.params.id);
    if (!subject) {
      return res.status(404).json({
        success: false,
        message: 'Subject not found'
      });
    }

    await Subject.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Subject deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting subject:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete subject',
      error: error.message
    });
  }
});

// PATCH /api/subjects/:id/toggle - Toggle subject active status (admin only)
router.patch('/:id/toggle', authenticateJWT, requireJWTAdmin, async (req, res) => {
  try {
    const subject = await Subject.findById(req.params.id);
    if (!subject) {
      return res.status(404).json({
        success: false,
        message: 'Subject not found'
      });
    }

    subject.isActive = !subject.isActive;
    await subject.save();
    await subject.populate('createdBy', 'name email');

    res.json({
      success: true,
      message: `Subject ${subject.isActive ? 'activated' : 'deactivated'} successfully`,
      subject: {
        id: subject._id,
        name: subject.name,
        icon: subject.icon,
        progress: subject.progress,
        description: subject.description,
        isActive: subject.isActive,
        createdBy: subject.createdBy,
        createdAt: subject.createdAt,
        updatedAt: subject.updatedAt
      }
    });
  } catch (error) {
    console.error('Error toggling subject status:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to toggle subject status',
      error: error.message
    });
  }
});

module.exports = router;
