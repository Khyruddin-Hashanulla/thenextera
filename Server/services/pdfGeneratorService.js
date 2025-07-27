const ResumeService = require('./resumeService');

// Try to import Puppeteer with graceful fallback
let puppeteer;
try {
  puppeteer = require('puppeteer');
} catch (error) {
  console.warn('⚠️ Puppeteer not available. PDF generation will be disabled.');
  puppeteer = null;
}

class PDFGeneratorService {
  static async generateResumePDF(userId, template = 'modern') {
    if (!puppeteer) {
      throw new Error('PDF generation is not available. Puppeteer dependency is missing.');
    }

    try {
      // Extract user resume data
      const resumeData = await ResumeService.extractUserResumeData(userId);
      
      // Generate HTML content
      const html = this.generateResumeHTML(resumeData, template);
      
      // Launch Puppeteer browser
      const browser = await puppeteer.launch({
        headless: true,
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          '--disable-accelerated-2d-canvas',
          '--no-first-run',
          '--no-zygote',
          '--single-process',
          '--disable-gpu'
        ]
      });
      
      const page = await browser.newPage();
      
      // Set content and generate PDF
      await page.setContent(html, { waitUntil: 'networkidle0' });
      
      const pdf = await page.pdf({
        format: 'A4',
        printBackground: true,
        margin: {
          top: '0.5in',
          right: '0.5in',
          bottom: '0.5in',
          left: '0.5in'
        }
      });
      
      await browser.close();
      
      return pdf;
    } catch (error) {
      console.error('PDF generation error:', error);
      throw new Error('Failed to generate PDF resume');
    }
  }

  static generateResumeHTML(resumeData, template = 'modern') {
    const { profile, summary, skills, education, experience } = resumeData;
    
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${profile.name} - Resume</title>
        <style>
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }
            
            body {
                font-family: 'Arial', sans-serif;
                line-height: 1.6;
                color: #333;
                background: white;
            }
            
            .container {
                max-width: 800px;
                margin: 0 auto;
                padding: 20px;
            }
            
            .header {
                text-align: center;
                margin-bottom: 30px;
                border-bottom: 2px solid #0891b2;
                padding-bottom: 20px;
            }
            
            .name {
                font-size: 2.5em;
                font-weight: bold;
                color: #0891b2;
                margin-bottom: 10px;
            }
            
            .contact-info {
                font-size: 1.1em;
                color: #666;
            }
            
            .section {
                margin-bottom: 25px;
            }
            
            .section-title {
                font-size: 1.4em;
                font-weight: bold;
                color: #0891b2;
                border-bottom: 1px solid #0891b2;
                padding-bottom: 5px;
                margin-bottom: 15px;
            }
            
            .summary {
                font-size: 1.1em;
                text-align: justify;
                line-height: 1.7;
            }
            
            .skills-grid {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                gap: 20px;
            }
            
            .skill-category {
                background: #f8f9fa;
                padding: 15px;
                border-radius: 8px;
                border-left: 4px solid #0891b2;
            }
            
            .skill-category h4 {
                color: #0891b2;
                margin-bottom: 8px;
                font-size: 1.1em;
            }
            
            .skill-list {
                display: flex;
                flex-wrap: wrap;
                gap: 5px;
            }
            
            .skill-tag {
                background: #0891b2;
                color: white;
                padding: 3px 8px;
                border-radius: 12px;
                font-size: 0.85em;
            }
            
            .education-item, .experience-item {
                margin-bottom: 20px;
                padding: 15px;
                background: #f8f9fa;
                border-radius: 8px;
                border-left: 4px solid #0891b2;
            }
            
            .item-header {
                display: flex;
                justify-content: space-between;
                align-items: start;
                margin-bottom: 8px;
            }
            
            .item-title {
                font-weight: bold;
                font-size: 1.1em;
                color: #333;
            }
            
            .item-subtitle {
                color: #666;
                font-style: italic;
            }
            
            .item-date {
                color: #0891b2;
                font-weight: bold;
                font-size: 0.9em;
            }
            
            .item-description {
                margin-top: 8px;
                text-align: justify;
            }
            
            .metrics {
                display: grid;
                grid-template-columns: repeat(4, 1fr);
                gap: 15px;
                margin: 20px 0;
            }
            
            .metric {
                text-align: center;
                padding: 10px;
                background: #f8f9fa;
                border-radius: 8px;
                border: 1px solid #e9ecef;
            }
            
            .metric-value {
                font-size: 1.5em;
                font-weight: bold;
                color: #0891b2;
            }
            
            .metric-label {
                font-size: 0.9em;
                color: #666;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <!-- Header -->
            <div class="header">
                <div class="name">${profile.name}</div>
                <div class="contact-info">
                    ${profile.email} | NextEra Learning Platform
                </div>
            </div>
            
            <!-- Professional Summary -->
            <div class="section">
                <div class="section-title">Professional Summary</div>
                <div class="summary">${summary}</div>
            </div>
            
            <!-- Key Metrics -->
            <div class="section">
                <div class="section-title">Key Achievements</div>
                <div class="metrics">
                    <div class="metric">
                        <div class="metric-value">${experience.totalProjects}</div>
                        <div class="metric-label">Projects Completed</div>
                    </div>
                    <div class="metric">
                        <div class="metric-value">${experience.learningStreak}</div>
                        <div class="metric-label">Learning Streak (days)</div>
                    </div>
                    <div class="metric">
                        <div class="metric-value">${experience.experienceLevel}</div>
                        <div class="metric-label">Experience Level</div>
                    </div>
                    <div class="metric">
                        <div class="metric-value">$${experience.totalEarnings}</div>
                        <div class="metric-label">Total Earnings</div>
                    </div>
                </div>
            </div>
            
            <!-- Skills -->
            <div class="section">
                <div class="section-title">Technical Skills</div>
                <div class="skills-grid">
                    <div class="skill-category">
                        <h4>Technical Skills (${skills.technical.length})</h4>
                        <div class="skill-list">
                            ${skills.technical.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                        </div>
                    </div>
                    <div class="skill-category">
                        <h4>Tools & Technologies (${skills.tools.length})</h4>
                        <div class="skill-list">
                            ${skills.tools.map(tool => `<span class="skill-tag">${tool}</span>`).join('')}
                        </div>
                    </div>
                    <div class="skill-category">
                        <h4>Soft Skills (${skills.soft.length})</h4>
                        <div class="skill-list">
                            ${skills.soft.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Education & Certifications -->
            <div class="section">
                <div class="section-title">Education & Certifications</div>
                ${education.completedCourses.map(course => `
                    <div class="education-item">
                        <div class="item-header">
                            <div>
                                <div class="item-title">${course.title}</div>
                                <div class="item-subtitle">Progress: ${course.progress}% | Instructor: ${course.instructor}</div>
                            </div>
                            <div class="item-date">${new Date(course.enrolledAt).toLocaleDateString()}</div>
                        </div>
                        <div class="item-description">${course.description || 'Comprehensive course covering modern development practices and industry standards.'}</div>
                    </div>
                `).join('')}
                
                ${education.certificates.map(cert => `
                    <div class="education-item">
                        <div class="item-header">
                            <div>
                                <div class="item-title">Certificate: ${cert.courseTitle}</div>
                                <div class="item-subtitle">NextEra Learning Platform</div>
                            </div>
                            <div class="item-date">${new Date(cert.issuedAt).toLocaleDateString()}</div>
                        </div>
                    </div>
                `).join('')}
            </div>
            
            <!-- Freelance Experience -->
            <div class="section">
                <div class="section-title">Freelance Experience</div>
                ${experience.freelanceProjects.map(project => `
                    <div class="experience-item">
                        <div class="item-header">
                            <div>
                                <div class="item-title">${project.title}</div>
                                <div class="item-subtitle">Freelance Project | Status: ${project.status}</div>
                            </div>
                            <div class="item-date">$${project.payout}</div>
                        </div>
                        <div class="item-description">${project.description}</div>
                    </div>
                `).join('')}
            </div>
        </div>
    </body>
    </html>
    `;
  }

  static checkPuppeteerAvailability() {
    return puppeteer !== null;
  }
}

module.exports = PDFGeneratorService;
