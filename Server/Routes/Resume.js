const express = require('express');
const router = express.Router();
const { authenticateJWT } = require('../Middleware/auth');
const ResumeService = require('../services/resumeService');
const CareerCoachService = require('../services/careerCoachService');
const PDFGeneratorService = require('../services/pdfGeneratorService');

// Get user resume data
router.get('/data', authenticateJWT, async (req, res) => {
  try {
    const userId = req.user.userId || req.user.id;
    const resumeData = await ResumeService.extractUserResumeData(userId);
    
    res.json({
      success: true,
      data: resumeData
    });
  } catch (error) {
    console.error('Error fetching resume data:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch resume data',
      message: error.message
    });
  }
});

// Generate PDF resume
router.get('/pdf', authenticateJWT, async (req, res) => {
  try {
    // Check if PDF generation is available
    if (!PDFGeneratorService.checkPuppeteerAvailability()) {
      return res.status(503).json({
        success: false,
        message: 'PDF generation is temporarily unavailable. Please try again later or contact support.',
        error: 'Puppeteer dependency not available'
      });
    }

    const userId = req.user.userId || req.user.id;
    const template = req.query.template || 'modern';
    
    const pdfBuffer = await PDFGeneratorService.generateResumePDF(userId, template);
    
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="resume.pdf"');
    res.setHeader('Content-Length', pdfBuffer.length);
    
    res.send(pdfBuffer);
  } catch (error) {
    console.error('Error generating PDF:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to generate PDF resume',
      message: error.message
    });
  }
});

// Get freelance skill recommendations
router.get('/career-coach/skills', authenticateJWT, async (req, res) => {
  try {
    const userId = req.user.userId || req.user.id;
    const recommendations = await CareerCoachService.getFreelanceSkillRecommendations(userId);
    
    res.json({
      success: true,
      data: recommendations
    });
  } catch (error) {
    console.error('Error getting skill recommendations:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get skill recommendations',
      message: error.message
    });
  }
});

// Get job role recommendations
router.get('/career-coach/jobs', authenticateJWT, async (req, res) => {
  try {
    const userId = req.user.userId || req.user.id;
    const recommendations = await CareerCoachService.getJobRoleRecommendations(userId);
    
    res.json({
      success: true,
      data: recommendations
    });
  } catch (error) {
    console.error('Error getting job recommendations:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get job recommendations',
      message: error.message
    });
  }
});

// Get interview preparation content
router.get('/career-coach/interview', authenticateJWT, async (req, res) => {
  try {
    const userId = req.user.userId || req.user.id;
    const targetRole = req.query.role;
    
    const interviewPrep = await CareerCoachService.generateInterviewPrep(userId, targetRole);
    
    res.json({
      success: true,
      data: interviewPrep
    });
  } catch (error) {
    console.error('Error generating interview prep:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to generate interview preparation',
      message: error.message
    });
  }
});

// Mock interview chat endpoint
router.post('/career-coach/mock-interview', authenticateJWT, async (req, res) => {
  try {
    const { message, skill, context } = req.body;
    
    // Simple mock interview response generator
    const responses = {
      'JavaScript': [
        "Great! Can you explain how closures work in JavaScript?",
        "Tell me about the event loop and how it handles asynchronous operations.",
        "How would you optimize the performance of a JavaScript application?"
      ],
      'React': [
        "Excellent! How do you handle state management in large React applications?",
        "Can you explain the component lifecycle and when you'd use each method?",
        "How would you implement error boundaries in React?"
      ],
      'Python': [
        "Good! Can you explain the difference between lists and tuples in Python?",
        "How would you handle memory management in a Python application?",
        "Tell me about decorators and when you'd use them."
      ]
    };
    
    const skillResponses = responses[skill] || [
      "That's interesting! Can you elaborate on that concept?",
      "How would you apply that knowledge in a real-world scenario?",
      "What challenges have you faced with this technology?"
    ];
    
    const randomResponse = skillResponses[Math.floor(Math.random() * skillResponses.length)];
    
    res.json({
      success: true,
      data: {
        response: randomResponse,
        tips: `Remember to provide specific examples and explain your thought process.`,
        nextQuestion: "Would you like to continue with more technical questions or move to behavioral questions?"
      }
    });
  } catch (error) {
    console.error('Error in mock interview:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to process mock interview',
      message: error.message
    });
  }
});

module.exports = router;
