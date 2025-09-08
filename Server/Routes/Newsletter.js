const express = require('express');
const router = express.Router();
const Newsletter = require('../Models/Newsletter');
const nodemailer = require('nodemailer');

// Email transporter setup with better error handling
const createTransporter = () => {
  try {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.warn('Email credentials not configured. Email features will be disabled.');
      return null;
    }
    
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });
  } catch (error) {
    console.error('Failed to create email transporter:', error);
    return null;
  }
};

// Subscribe to newsletter
router.post('/subscribe', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email is required' 
      });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please enter a valid email address' 
      });
    }

    // Check if email already exists
    const existingSubscriber = await Newsletter.findOne({ email });
    
    if (existingSubscriber) {
      if (existingSubscriber.isActive) {
        return res.status(400).json({ 
          success: false, 
          message: 'Email is already subscribed to our newsletter' 
        });
      } else {
        // Reactivate subscription
        existingSubscriber.isActive = true;
        existingSubscriber.subscribedAt = new Date();
        await existingSubscriber.save();
        
        return res.status(200).json({ 
          success: true, 
          message: 'Successfully resubscribed to newsletter!' 
        });
      }
    }

    // Create new subscriber
    const subscriber = new Newsletter({ email });
    await subscriber.save();

    // Try to send welcome email (optional - don't fail if email service is down)
    const transporter = createTransporter();
    if (transporter) {
      try {
        const welcomeEmailHtml = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8fafc;">
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 28px;">Welcome to NextEra Blog!</h1>
              <p style="color: #e2e8f0; margin: 10px 0 0 0; font-size: 16px;">Thank you for subscribing to our newsletter</p>
            </div>
            
            <div style="background: white; padding: 30px; border-radius: 10px; margin-top: 20px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
              <h2 style="color: #2d3748; margin-top: 0;">What to expect:</h2>
              <ul style="color: #4a5568; line-height: 1.6;">
                <li>🚀 Latest tutorials and coding insights</li>
                <li>💡 Tips for learning and building projects</li>
                <li>📚 New blog posts and educational content</li>
                <li>🎯 Career advice and industry trends</li>
              </ul>
              
              <p style="color: #4a5568; line-height: 1.6;">
                We're excited to have you join our community of learners and builders. 
                Stay tuned for valuable content that will help accelerate your coding journey!
              </p>
              
              <div style="text-align: center; margin-top: 30px;">
                <a href="${process.env.CLIENT_URL || 'http://localhost:3000'}/blog" 
                   style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: bold;">
                  Read Our Latest Posts
                </a>
              </div>
            </div>
            
            <div style="text-align: center; margin-top: 20px; color: #718096; font-size: 14px;">
              <p>You can unsubscribe at any time by clicking 
                <a href="${process.env.CLIENT_URL || 'http://localhost:3000'}/unsubscribe?token=${subscriber.unsubscribeToken}" 
                   style="color: #667eea;">here</a>
              </p>
            </div>
          </div>
        `;

        await transporter.sendMail({
          from: `"NextEra Blog" <${process.env.EMAIL_USER}>`,
          to: email,
          subject: '🎉 Welcome to NextEra Blog Newsletter!',
          html: welcomeEmailHtml
        });
      } catch (emailError) {
        console.error('Failed to send welcome email:', emailError);
        // Don't fail the subscription if email fails
      }
    }

    res.status(201).json({ 
      success: true, 
      message: 'Successfully subscribed! Thank you for joining our newsletter.' 
    });

  } catch (error) {
    console.error('Newsletter subscription error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to subscribe. Please try again later.' 
    });
  }
});

// Unsubscribe from newsletter
router.get('/unsubscribe/:token', async (req, res) => {
  try {
    const { token } = req.params;
    
    const subscriber = await Newsletter.findOne({ unsubscribeToken: token });
    
    if (!subscriber) {
      return res.status(404).json({ 
        success: false, 
        message: 'Invalid unsubscribe link' 
      });
    }

    subscriber.isActive = false;
    await subscriber.save();

    res.status(200).json({ 
      success: true, 
      message: 'Successfully unsubscribed from newsletter' 
    });

  } catch (error) {
    console.error('Unsubscribe error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to unsubscribe. Please try again later.' 
    });
  }
});

// Get subscriber count
router.get('/stats', async (req, res) => {
  try {
    const totalSubscribers = await Newsletter.countDocuments({ isActive: true });
    const totalAllTime = await Newsletter.countDocuments();
    
    res.status(200).json({ 
      success: true, 
      data: {
        activeSubscribers: totalSubscribers,
        totalAllTime: totalAllTime
      }
    });

  } catch (error) {
    console.error('Newsletter stats error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to get newsletter stats' 
    });
  }
});

// Test endpoint
router.get('/test', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Newsletter API is working!',
    timestamp: new Date().toISOString()
  });
});

module.exports = router;
