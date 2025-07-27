const ResumeService = require('./resumeService');

class CareerCoachService {
  /**
   * Analyze user skills and provide personalized freelance skill recommendations
   */
  static async getFreelanceSkillRecommendations(userId) {
    try {
      const resumeData = await ResumeService.extractUserResumeData(userId);
      const { skills, experience, profile } = resumeData;

      // Analyze current skill gaps and market demand
      const recommendations = this.analyzeSkillGaps(skills, experience);
      
      // Get market demand data for skills
      const marketAnalysis = this.getMarketDemandAnalysis(skills.technical);

      return {
        currentSkills: {
          technical: skills.technical,
          soft: skills.soft,
          tools: skills.tools,
          totalCount: skills.totalSkills
        },
        recommendations: recommendations.slice(0, 3), // Top 3 recommendations
        marketAnalysis,
        personalizedAdvice: this.generatePersonalizedAdvice(resumeData),
        nextSteps: this.generateNextSteps(recommendations, resumeData)
      };
    } catch (error) {
      console.error('Error generating skill recommendations:', error);
      throw error;
    }
  }

  /**
   * Suggest remote job roles based on user's learning path and skills
   */
  static async getJobRoleRecommendations(userId) {
    try {
      const resumeData = await ResumeService.extractUserResumeData(userId);
      const { skills, experience, education } = resumeData;

      // Analyze learning path and completed courses
      const learningPath = this.analyzeLearningPath(education.completedCourses);
      
      // Match skills to job roles
      const jobRoles = this.matchSkillsToJobRoles(skills, experience);

      // Get salary and demand information
      const jobMarketData = this.getJobMarketData(jobRoles);

      return {
        recommendedRoles: jobRoles.slice(0, 3), // Top 3 job roles
        learningPath: {
          dominantTrack: learningPath.track,
          skillProgression: learningPath.progression,
          recommendations: learningPath.nextCourses
        },
        marketData: jobMarketData,
        careerAdvice: this.generateCareerAdvice(resumeData, jobRoles),
        skillGaps: this.identifySkillGaps(skills, jobRoles)
      };
    } catch (error) {
      console.error('Error generating job recommendations:', error);
      throw error;
    }
  }

  /**
   * Generate interview preparation content
   */
  static async generateInterviewPrep(userId, targetRole = null) {
    try {
      const resumeData = await ResumeService.extractUserResumeData(userId);
      const { skills } = resumeData;

      // Get top 3 skills for interview focus
      const topSkills = [
        ...skills.technical.slice(0, 2),
        ...skills.soft.slice(0, 1)
      ];

      // Generate questions for each skill
      const interviewQuestions = topSkills.map(skill => 
        this.generateSkillQuestions(skill, targetRole)
      ).flat();

      // Generate behavioral questions based on experience
      const behavioralQuestions = this.generateBehavioralQuestions(resumeData);

      return {
        topSkills,
        technicalQuestions: interviewQuestions.filter(q => q.type === 'technical'),
        behavioralQuestions,
        interviewTips: this.generateInterviewTips(resumeData, targetRole),
        mockInterviewPrompts: this.generateMockInterviewPrompts(topSkills),
        preparationPlan: this.generatePreparationPlan(interviewQuestions, behavioralQuestions)
      };
    } catch (error) {
      console.error('Error generating interview prep:', error);
      throw error;
    }
  }

  /**
   * Analyze skill gaps and recommend improvements
   */
  static analyzeSkillGaps(skills, experience) {
    const recommendations = [];

    // High-demand freelance skills based on market trends
    const highDemandSkills = [
      {
        skill: 'React.js',
        category: 'Frontend Development',
        demand: 'Very High',
        avgRate: '$50-80/hour',
        reason: 'Most popular frontend framework with high demand',
        difficulty: 'Intermediate',
        timeToLearn: '2-3 months',
        prerequisites: ['JavaScript', 'HTML', 'CSS']
      },
      {
        skill: 'Python',
        category: 'Backend Development',
        demand: 'Very High',
        avgRate: '$45-75/hour',
        reason: 'Versatile language for web dev, data science, and automation',
        difficulty: 'Beginner',
        timeToLearn: '1-2 months',
        prerequisites: ['Programming basics']
      },
      {
        skill: 'Node.js',
        category: 'Backend Development',
        demand: 'High',
        avgRate: '$40-70/hour',
        reason: 'JavaScript runtime for server-side development',
        difficulty: 'Intermediate',
        timeToLearn: '2-3 months',
        prerequisites: ['JavaScript', 'Express.js']
      },
      {
        skill: 'UI/UX Design',
        category: 'Design',
        demand: 'High',
        avgRate: '$35-65/hour',
        reason: 'Essential for creating user-friendly applications',
        difficulty: 'Intermediate',
        timeToLearn: '3-4 months',
        prerequisites: ['Design principles', 'Figma/Sketch']
      },
      {
        skill: 'Digital Marketing',
        category: 'Marketing',
        demand: 'High',
        avgRate: '$30-60/hour',
        reason: 'Growing demand for online marketing expertise',
        difficulty: 'Beginner',
        timeToLearn: '2-3 months',
        prerequisites: ['Basic marketing knowledge']
      },
      {
        skill: 'Data Analysis',
        category: 'Analytics',
        demand: 'Very High',
        avgRate: '$45-80/hour',
        reason: 'High demand for data-driven decision making',
        difficulty: 'Intermediate',
        timeToLearn: '3-4 months',
        prerequisites: ['Statistics', 'Excel/SQL']
      }
    ];

    // Filter recommendations based on user's current skills
    const userSkillsLower = skills.technical.map(s => s.toLowerCase());
    
    return highDemandSkills.filter(skillRec => {
      const hasPrerequisites = skillRec.prerequisites.some(prereq => 
        userSkillsLower.some(userSkill => 
          userSkill.includes(prereq.toLowerCase())
        )
      );
      const alreadyHas = userSkillsLower.some(userSkill => 
        userSkill.includes(skillRec.skill.toLowerCase())
      );
      
      return hasPrerequisites && !alreadyHas;
    }).sort((a, b) => {
      // Prioritize by demand and user's experience level
      const demandScore = { 'Very High': 3, 'High': 2, 'Medium': 1 };
      return demandScore[b.demand] - demandScore[a.demand];
    });
  }

  /**
   * Match user skills to potential job roles
   */
  static matchSkillsToJobRoles(skills, experience) {
    const jobRoles = [
      {
        title: 'Frontend Developer',
        match: this.calculateSkillMatch(skills.technical, ['JavaScript', 'React', 'HTML', 'CSS', 'Vue', 'Angular']),
        requirements: ['JavaScript', 'HTML/CSS', 'React/Vue/Angular', 'Git'],
        salaryRange: '$60,000 - $120,000',
        demandLevel: 'Very High',
        remoteOpportunities: 'Excellent',
        description: 'Build user interfaces and web applications'
      },
      {
        title: 'Backend Developer',
        match: this.calculateSkillMatch(skills.technical, ['Node.js', 'Python', 'Java', 'Express', 'Django', 'API', 'MongoDB', 'SQL']),
        requirements: ['Server-side language', 'Database knowledge', 'API development', 'Git'],
        salaryRange: '$65,000 - $130,000',
        demandLevel: 'Very High',
        remoteOpportunities: 'Excellent',
        description: 'Develop server-side logic and database systems'
      },
      {
        title: 'Full Stack Developer',
        match: this.calculateSkillMatch(skills.technical, ['JavaScript', 'React', 'Node.js', 'MongoDB', 'Express', 'HTML', 'CSS']),
        requirements: ['Frontend framework', 'Backend technology', 'Database', 'Git'],
        salaryRange: '$70,000 - $140,000',
        demandLevel: 'Very High',
        remoteOpportunities: 'Excellent',
        description: 'Work on both frontend and backend development'
      },
      {
        title: 'Data Analyst',
        match: this.calculateSkillMatch(skills.technical, ['Python', 'SQL', 'Data Science', 'Machine Learning', 'Excel']),
        requirements: ['SQL', 'Python/R', 'Statistics', 'Data visualization'],
        salaryRange: '$55,000 - $100,000',
        demandLevel: 'High',
        remoteOpportunities: 'Good',
        description: 'Analyze data to provide business insights'
      },
      {
        title: 'UI/UX Designer',
        match: this.calculateSkillMatch([...skills.technical, ...skills.tools], ['Figma', 'Sketch', 'Photoshop', 'Design', 'Prototyping']),
        requirements: ['Design tools', 'User research', 'Prototyping', 'Design principles'],
        salaryRange: '$50,000 - $110,000',
        demandLevel: 'High',
        remoteOpportunities: 'Good',
        description: 'Design user interfaces and user experiences'
      },
      {
        title: 'DevOps Engineer',
        match: this.calculateSkillMatch(skills.technical, ['Docker', 'Kubernetes', 'AWS', 'Azure', 'CI/CD', 'Git', 'Linux']),
        requirements: ['Cloud platforms', 'Containerization', 'CI/CD', 'Scripting'],
        salaryRange: '$75,000 - $150,000',
        demandLevel: 'Very High',
        remoteOpportunities: 'Excellent',
        description: 'Manage deployment and infrastructure automation'
      }
    ];

    return jobRoles
      .filter(role => role.match > 30) // Only show roles with >30% match
      .sort((a, b) => b.match - a.match);
  }

  /**
   * Calculate skill match percentage
   */
  static calculateSkillMatch(userSkills, requiredSkills) {
    if (requiredSkills.length === 0) return 0;
    
    const userSkillsLower = userSkills.map(s => s.toLowerCase());
    const matches = requiredSkills.filter(req => 
      userSkillsLower.some(userSkill => 
        userSkill.includes(req.toLowerCase()) || req.toLowerCase().includes(userSkill)
      )
    );
    
    return Math.round((matches.length / requiredSkills.length) * 100);
  }

  /**
   * Generate skill-specific interview questions
   */
  static generateSkillQuestions(skill, targetRole) {
    const questionBank = {
      'JavaScript': [
        {
          question: "Explain the difference between let, const, and var in JavaScript.",
          type: 'technical',
          difficulty: 'intermediate',
          answer: "var is function-scoped and can be redeclared, let is block-scoped and can be reassigned, const is block-scoped and cannot be reassigned.",
          tips: "Demonstrate understanding of scope and hoisting concepts."
        },
        {
          question: "What is event delegation and why is it useful?",
          type: 'technical',
          difficulty: 'intermediate',
          answer: "Event delegation uses event bubbling to handle events at a parent level rather than individual child elements, improving performance and handling dynamic content.",
          tips: "Provide a practical example of when you'd use this technique."
        }
      ],
      'React': [
        {
          question: "What are React hooks and why were they introduced?",
          type: 'technical',
          difficulty: 'intermediate',
          answer: "Hooks allow functional components to use state and lifecycle methods, making code more reusable and easier to test.",
          tips: "Mention specific hooks like useState and useEffect."
        },
        {
          question: "Explain the virtual DOM and its benefits.",
          type: 'technical',
          difficulty: 'intermediate',
          answer: "Virtual DOM is a JavaScript representation of the real DOM that React uses to optimize updates by batching changes and minimizing direct DOM manipulation.",
          tips: "Discuss performance benefits and reconciliation process."
        }
      ],
      'Python': [
        {
          question: "What are Python decorators and how do you use them?",
          type: 'technical',
          difficulty: 'advanced',
          answer: "Decorators are functions that modify or enhance other functions without changing their code, using the @decorator syntax.",
          tips: "Provide a simple example like @property or @staticmethod."
        }
      ],
      'Communication': [
        {
          question: "Describe a time when you had to explain a complex technical concept to a non-technical stakeholder.",
          type: 'behavioral',
          difficulty: 'intermediate',
          answer: "Use the STAR method: Situation, Task, Action, Result. Focus on how you simplified the explanation.",
          tips: "Emphasize your ability to adapt communication style to your audience."
        }
      ]
    };

    return questionBank[skill] || [
      {
        question: `How would you apply ${skill} in a real-world project?`,
        type: 'technical',
        difficulty: 'intermediate',
        answer: `Describe specific use cases and benefits of ${skill} in practical applications.`,
        tips: `Provide concrete examples from your experience or learning.`
      }
    ];
  }

  /**
   * Generate behavioral interview questions
   */
  static generateBehavioralQuestions(resumeData) {
    const questions = [
      {
        question: "Tell me about a challenging project you worked on and how you overcame obstacles.",
        category: 'Problem Solving',
        tips: "Use the STAR method and focus on your problem-solving process."
      },
      {
        question: "Describe a time when you had to learn a new technology quickly.",
        category: 'Adaptability',
        tips: "Highlight your learning approach and how you applied the new knowledge."
      },
      {
        question: "How do you prioritize tasks when working on multiple projects?",
        category: 'Time Management',
        tips: "Discuss specific tools or methods you use for organization."
      },
      {
        question: "Tell me about a time you collaborated with a team to achieve a goal.",
        category: 'Teamwork',
        tips: "Emphasize your role in the team and communication skills."
      }
    ];

    // Add experience-specific questions
    if (resumeData.experience.totalProjects > 0) {
      questions.push({
        question: "Describe your experience working with clients on freelance projects.",
        category: 'Client Management',
        tips: "Focus on communication, expectation management, and delivering results."
      });
    }

    return questions;
  }

  /**
   * Helper methods for generating advice and analysis
   */
  static generatePersonalizedAdvice(resumeData) {
    const { skills, experience, metrics } = resumeData;
    
    let advice = [];
    
    if (skills.totalSkills < 5) {
      advice.push("Focus on building a stronger foundation with 2-3 core technical skills before expanding.");
    }
    
    if (experience.totalProjects === 0) {
      advice.push("Consider taking on small freelance projects to build your portfolio and gain practical experience.");
    }
    
    if (metrics.experienceLevel === 'Entry Level') {
      advice.push("Complete more courses and practice projects to advance to the next level.");
    }

    return advice.length > 0 ? advice : ["You're on a great learning path! Keep building your skills and gaining experience."];
  }

  static generateNextSteps(recommendations, resumeData) {
    return recommendations.slice(0, 3).map((rec, index) => ({
      step: index + 1,
      action: `Learn ${rec.skill}`,
      timeframe: rec.timeToLearn,
      priority: index === 0 ? 'High' : index === 1 ? 'Medium' : 'Low',
      resources: [
        'Take relevant courses on NextEra platform',
        'Practice with hands-on projects',
        'Join online communities and forums'
      ]
    }));
  }

  static analyzeLearningPath(completedCourses) {
    // Analyze course patterns to determine learning track
    const tracks = {
      'Frontend': ['JavaScript', 'React', 'HTML', 'CSS', 'Vue', 'Angular'],
      'Backend': ['Node.js', 'Python', 'Java', 'Express', 'Django', 'API'],
      'Data Science': ['Python', 'Machine Learning', 'Data Analysis', 'SQL'],
      'Design': ['UI', 'UX', 'Figma', 'Design', 'Photoshop']
    };

    let trackScores = {};
    Object.keys(tracks).forEach(track => {
      trackScores[track] = 0;
      tracks[track].forEach(skill => {
        completedCourses.forEach(course => {
          if (course.title.toLowerCase().includes(skill.toLowerCase())) {
            trackScores[track]++;
          }
        });
      });
    });

    const dominantTrack = Object.keys(trackScores).reduce((a, b) => 
      trackScores[a] > trackScores[b] ? a : b
    );

    return {
      track: dominantTrack,
      progression: trackScores,
      nextCourses: this.suggestNextCourses(dominantTrack, completedCourses)
    };
  }

  static suggestNextCourses(track, completedCourses) {
    const suggestions = {
      'Frontend': ['Advanced React', 'TypeScript', 'Next.js', 'State Management'],
      'Backend': ['Microservices', 'Database Design', 'API Security', 'Cloud Deployment'],
      'Data Science': ['Deep Learning', 'Data Visualization', 'Big Data', 'Statistics'],
      'Design': ['Advanced Prototyping', 'Design Systems', 'User Research', 'Accessibility']
    };

    return suggestions[track] || ['Full Stack Development', 'Project Management', 'Soft Skills'];
  }

  static getMarketDemandAnalysis(skills) {
    return {
      trending: ['React', 'Python', 'Cloud Computing', 'AI/ML'],
      highDemand: ['JavaScript', 'Node.js', 'AWS', 'Docker'],
      emerging: ['Blockchain', 'IoT', 'AR/VR', 'Quantum Computing'],
      userStrengths: skills.slice(0, 3)
    };
  }

  static getJobMarketData(jobRoles) {
    return {
      totalOpenings: '50,000+',
      remotePercentage: '75%',
      averageSalary: '$85,000',
      topCompanies: ['Google', 'Microsoft', 'Amazon', 'Meta', 'Netflix'],
      growthRate: '15% annually'
    };
  }

  static generateCareerAdvice(resumeData, jobRoles) {
    const topRole = jobRoles[0];
    return [
      `Based on your skills, ${topRole?.title} is your best match with ${topRole?.match}% compatibility.`,
      `Focus on building expertise in ${topRole?.requirements.slice(0, 2).join(' and ')} to improve your chances.`,
      `Remote opportunities in this field are ${topRole?.remoteOpportunities.toLowerCase()}.`,
      `Consider building a portfolio showcasing projects that demonstrate these skills.`
    ];
  }

  static identifySkillGaps(skills, jobRoles) {
    const topRole = jobRoles[0];
    if (!topRole) return [];

    const userSkillsLower = skills.technical.map(s => s.toLowerCase());
    const missingSkills = topRole.requirements.filter(req => 
      !userSkillsLower.some(userSkill => 
        userSkill.includes(req.toLowerCase())
      )
    );

    return missingSkills.map(skill => ({
      skill,
      importance: 'High',
      timeToLearn: '2-3 months',
      resources: ['Online courses', 'Practice projects', 'Documentation']
    }));
  }

  static generateInterviewTips(resumeData, targetRole) {
    return [
      "Research the company and role thoroughly before the interview",
      "Prepare specific examples from your projects and coursework",
      "Practice explaining technical concepts in simple terms",
      "Prepare questions about the team, technology stack, and growth opportunities",
      "Review your resume and be ready to discuss any listed skills or projects"
    ];
  }

  static generateMockInterviewPrompts(topSkills) {
    return topSkills.map(skill => ({
      skill,
      prompt: `You're interviewing for a ${skill} developer position. I'll ask you technical and behavioral questions. Respond as if you're in a real interview.`,
      sampleQuestions: [
        `Tell me about your experience with ${skill}`,
        `How would you solve a performance issue in a ${skill} application?`,
        `What's your favorite feature of ${skill} and why?`
      ]
    }));
  }

  static generatePreparationPlan(technicalQuestions, behavioralQuestions) {
    return {
      week1: {
        focus: 'Technical Preparation',
        tasks: [
          'Review core concepts for your top 3 skills',
          'Practice coding problems and technical questions',
          'Prepare project examples and code samples'
        ]
      },
      week2: {
        focus: 'Behavioral Preparation',
        tasks: [
          'Prepare STAR method responses for common questions',
          'Practice explaining technical concepts to non-technical audiences',
          'Research target companies and roles'
        ]
      },
      interview_day: {
        focus: 'Final Preparation',
        tasks: [
          'Review your resume and portfolio',
          'Prepare thoughtful questions for the interviewer',
          'Test your technology setup for remote interviews'
        ]
      }
    };
  }
}

module.exports = CareerCoachService;
