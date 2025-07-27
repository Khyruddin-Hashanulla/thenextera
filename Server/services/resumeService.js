const User = require('../Models/User');
const Course = require('../Models/Course');
const Gig = require('../Models/Gig');
const Submission = require('../Models/Submission');
const Certificate = require('../Models/Certificate');

class ResumeService {
  /**
   * Extract comprehensive resume data for a user
   */
  static async extractUserResumeData(userId) {
    try {
      // Get user profile data
      const user = await User.findById(userId).select('-password -emailVerificationOTP -resetPasswordToken');
      
      if (!user) {
        throw new Error('User not found');
      }

      // Get completed courses with progress
      const enrolledCourses = await Course.find({
        studentsEnrolled: userId
      }).populate('creatorId', 'name');

      // Filter completed courses (progress >= 90%)
      const completedCourses = enrolledCourses.filter(course => {
        const userProgress = course.studentProgress?.find(
          p => p.userId.toString() === userId.toString()
        );
        return userProgress && userProgress.progress >= 90;
      });

      // Get certificates
      const certificates = await Certificate.find({ student: userId })
        .populate('course', 'title description')
        .sort({ issuedAt: -1 });

      // Get gig/freelance work
      const completedGigs = await Gig.find({
        assignedTo: userId,
        status: 'closed'
      });

      // Get successful submissions
      const submissions = await Submission.find({
        user: userId,
        status: 'approved'
      }).populate('gig', 'title description payout');

      // Extract skills from courses and gigs
      const skills = this.extractSkills(completedCourses, completedGigs, submissions);

      // Calculate experience metrics
      const experience = this.calculateExperience(completedCourses, completedGigs, submissions);

      return {
        profile: {
          name: user.name,
          email: user.email,
          profilePic: user.profilePic,
          role: user.role,
          joinDate: user.createdAt
        },
        education: {
          completedCourses: completedCourses.map(course => ({
            id: course._id,
            title: course.title,
            description: course.description,
            instructor: course.creatorId?.name,
            completionDate: this.getCompletionDate(course, userId),
            skills: this.extractCourseSkills(course),
            certificateId: certificates.find(cert => 
              cert.course._id.toString() === course._id.toString()
            )?.certificateId
          })),
          certificates: certificates.map(cert => ({
            id: cert._id,
            courseTitle: cert.course.title,
            certificateId: cert.certificateId,
            issuedAt: cert.issuedAt,
            downloadLink: cert.downloadLink
          }))
        },
        experience: {
          freelanceProjects: submissions.map(submission => ({
            id: submission._id,
            title: submission.gig.title,
            description: submission.gig.description,
            payout: submission.gig.payout,
            completedAt: submission.submittedAt,
            status: submission.status,
            feedback: submission.feedback,
            skills: this.extractGigSkills(submission.gig)
          })),
          totalProjects: submissions.length,
          totalEarnings: submissions.reduce((sum, sub) => sum + (sub.gig.payout || 0), 0),
          averageRating: this.calculateAverageRating(submissions)
        },
        skills: {
          technical: skills.technical,
          soft: skills.soft,
          tools: skills.tools,
          totalSkills: skills.technical.length + skills.soft.length + skills.tools.length
        },
        metrics: experience,
        summary: this.generateSummary(user, completedCourses, submissions, skills)
      };
    } catch (error) {
      console.error('Error extracting resume data:', error);
      throw error;
    }
  }

  /**
   * Extract skills from courses and gigs
   */
  static extractSkills(courses, gigs, submissions) {
    const technical = new Set();
    const soft = new Set();
    const tools = new Set();

    // Extract from course titles and descriptions
    courses.forEach(course => {
      const courseSkills = this.extractCourseSkills(course);
      courseSkills.technical.forEach(skill => technical.add(skill));
      courseSkills.soft.forEach(skill => soft.add(skill));
      courseSkills.tools.forEach(skill => tools.add(skill));
    });

    // Extract from gig work
    [...gigs, ...submissions.map(s => s.gig)].forEach(gig => {
      const gigSkills = this.extractGigSkills(gig);
      gigSkills.technical.forEach(skill => technical.add(skill));
      gigSkills.soft.forEach(skill => soft.add(skill));
      gigSkills.tools.forEach(skill => tools.add(skill));
    });

    return {
      technical: Array.from(technical),
      soft: Array.from(soft),
      tools: Array.from(tools)
    };
  }

  /**
   * Extract skills from course content
   */
  static extractCourseSkills(course) {
    const technical = [];
    const soft = [];
    const tools = [];

    const text = `${course.title} ${course.description}`.toLowerCase();

    // Technical skills patterns
    const technicalPatterns = [
      'javascript', 'python', 'react', 'node.js', 'html', 'css', 'mongodb', 
      'sql', 'java', 'c++', 'php', 'angular', 'vue', 'express', 'django',
      'machine learning', 'ai', 'data science', 'blockchain', 'cloud computing',
      'aws', 'azure', 'docker', 'kubernetes', 'git', 'api', 'rest', 'graphql',
      'typescript', 'sass', 'bootstrap', 'tailwind', 'firebase', 'mysql',
      'postgresql', 'redis', 'elasticsearch', 'microservices', 'devops'
    ];

    // Soft skills patterns
    const softPatterns = [
      'leadership', 'communication', 'teamwork', 'problem solving', 
      'project management', 'time management', 'critical thinking',
      'creativity', 'adaptability', 'collaboration', 'presentation',
      'negotiation', 'mentoring', 'coaching', 'planning', 'organization'
    ];

    // Tools patterns
    const toolPatterns = [
      'photoshop', 'illustrator', 'figma', 'sketch', 'canva', 'premiere',
      'after effects', 'blender', 'unity', 'unreal', 'jira', 'trello',
      'slack', 'zoom', 'teams', 'notion', 'confluence', 'github', 'gitlab',
      'bitbucket', 'jenkins', 'travis', 'circleci', 'postman', 'insomnia'
    ];

    technicalPatterns.forEach(pattern => {
      if (text.includes(pattern)) technical.push(this.capitalizeSkill(pattern));
    });

    softPatterns.forEach(pattern => {
      if (text.includes(pattern)) soft.push(this.capitalizeSkill(pattern));
    });

    toolPatterns.forEach(pattern => {
      if (text.includes(pattern)) tools.push(this.capitalizeSkill(pattern));
    });

    return { technical, soft, tools };
  }

  /**
   * Extract skills from gig content
   */
  static extractGigSkills(gig) {
    // Similar to extractCourseSkills but for gig content
    return this.extractCourseSkills(gig); // Reuse the same logic
  }

  /**
   * Calculate experience metrics
   */
  static calculateExperience(courses, gigs, submissions) {
    const now = new Date();
    const oneMonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    const threeMonthsAgo = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);

    return {
      totalCourses: courses.length,
      totalGigs: submissions.length,
      recentActivity: {
        coursesLastMonth: courses.filter(c => 
          this.getCompletionDate(c) > oneMonthAgo
        ).length,
        gigsLastMonth: submissions.filter(s => 
          new Date(s.submittedAt) > oneMonthAgo
        ).length
      },
      learningStreak: this.calculateLearningStreak(courses, submissions),
      experienceLevel: this.determineExperienceLevel(courses.length, submissions.length)
    };
  }

  /**
   * Generate professional summary
   */
  static generateSummary(user, courses, submissions, skills) {
    const totalSkills = skills.technical.length + skills.soft.length + skills.tools.length;
    const experience = submissions.length > 0 ? 'experienced' : 'aspiring';
    const primarySkills = skills.technical.slice(0, 3).join(', ');

    return `${experience.charAt(0).toUpperCase() + experience.slice(1)} ${user.role.toLowerCase()} with expertise in ${primarySkills}. Completed ${courses.length} courses and ${submissions.length} freelance projects. Proficient in ${totalSkills} technical and soft skills, with a strong foundation in modern development practices and continuous learning.`;
  }

  /**
   * Helper methods
   */
  static getCompletionDate(course, userId) {
    const progress = course.studentProgress?.find(
      p => p.userId.toString() === userId?.toString()
    );
    return progress?.updatedAt || course.updatedAt;
  }

  static capitalizeSkill(skill) {
    return skill.split(' ').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  }

  static calculateAverageRating(submissions) {
    // Placeholder - would need rating system in submissions
    return submissions.length > 0 ? 4.5 : 0;
  }

  static calculateLearningStreak(courses, submissions) {
    // Calculate consecutive days of learning activity
    // Placeholder implementation
    return Math.min(courses.length + submissions.length, 30);
  }

  static determineExperienceLevel(courseCount, gigCount) {
    const total = courseCount + gigCount;
    if (total >= 20) return 'Expert';
    if (total >= 10) return 'Intermediate';
    if (total >= 5) return 'Beginner';
    return 'Entry Level';
  }
}

module.exports = ResumeService;
