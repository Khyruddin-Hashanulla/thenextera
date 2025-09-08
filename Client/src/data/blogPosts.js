// Blog Posts Data Structure
// Easy to manage - just add new blog objects to this array

export const blogPosts = [
  {
    id: 1,
    slug: "why-i-built-nextera",
    title: "Why I Built NextEra – A Learning & Project-Building Platform by Khyruddin",
    metaDescription: "NextEra by Khyruddin is a platform for students and developers to learn coding, master DSA, explore core subjects, and build real-world projects.",
    keywords: ["NextEra", "Khyruddin Hashanulla", "learning platform", "coding", "DSA", "computer science", "projects", "education"],
    author: "Khyruddin Hashanulla",
    publishDate: "2025-09-08",
    readTime: "5 min read",
    category: "Platform",
    tags: ["Education", "Technology", "Learning", "Projects"],
    featuredImage: null, // Set to null until you add the actual image
    excerpt: "When I started my journey in Computer Science and Engineering, I realized that many students learn concepts but struggle to apply them in real-world projects. That's why I created NextEra — a platform where learners can Learn. Build. and Earn.",
    content: `
## Introduction

When I started my journey in Computer Science and Engineering, I realized that many students learn concepts but struggle to apply them in real-world projects. That's why I created NextEra — a platform where learners can **Learn. Build.** and **Earn**.

## What is NextEra?

NextEra is a modern platform that focuses on:

- **Core Subjects** – Get strong fundamentals in CSE.
- **DSA (Data Structures & Algorithms)** – Practice structured problem-solving.
- **Projects** – Build real-world projects step by step.
- **Mentorship & Career** – Learn how to showcase projects, build portfolios, and earn opportunities.

## Why the Name "NextEra"?

The name **NextEra** stands for a new era of learning — where knowledge is not limited to textbooks but applied in real life. It's about preparing students for the next level in their careers.

## Who is Behind NextEra?

I am **Khyruddin Hashanulla**, a Computer Science and Engineering student passionate about building projects, teaching, and helping others succeed in tech. NextEra is my initiative to guide learners in a structured, practical way.

## What Makes NextEra Different?

Unlike typical platforms, NextEra is:

**Hands-on** – You don't just learn, you build.  
**Step-by-step** – Structured learning paths.  
**Project-focused** – Real-world applications of coding.  
**Community-driven** – Learn together, grow together.

## My Vision for NextEra

My goal is to make NextEra one of the most trusted platforms for students who want to become industry-ready. I want every learner to:

- Master coding.
- Build strong projects.
- Earn opportunities.

## Conclusion

NextEra is not just a website — it's a mission to bridge the gap between learning and earning.  
I invite you to join this journey and be part of the **NextEra** of learning.

---

*Ready to start your learning journey? [Explore NextEra Courses](/courses) and begin building your future today!*
    `,
    isPublished: true,
    isFeatured: true
  }
  // Add more blog posts here in the future
  // Example structure for future posts:
  /*
  {
    id: 2,
    slug: "mastering-dsa-complete-guide",
    title: "Mastering Data Structures & Algorithms: A Complete Guide",
    metaDescription: "Complete guide to mastering DSA with NextEra's structured approach...",
    keywords: ["DSA", "algorithms", "data structures", "coding interview"],
    author: "Khyruddin Hashanulla",
    publishDate: "2024-12-15",
    readTime: "8 min read",
    category: "Education",
    tags: ["DSA", "Programming", "Interview Prep"],
    featuredImage: "/images/blog/dsa-guide.jpg",
    excerpt: "Master data structures and algorithms with our comprehensive guide...",
    content: `Your blog content here...`,
    isPublished: true,
    isFeatured: false
  }
  */
];

// Helper functions for blog management
export const getBlogPostBySlug = (slug) => {
  return blogPosts.find(post => post.slug === slug && post.isPublished);
};

export const getAllPublishedPosts = () => {
  return blogPosts.filter(post => post.isPublished).sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate));
};

export const getFeaturedPosts = () => {
  return blogPosts.filter(post => post.isPublished && post.isFeatured);
};

export const getPostsByCategory = (category) => {
  return blogPosts.filter(post => post.isPublished && post.category === category);
};

export const getRelatedPosts = (currentSlug, limit = 3) => {
  const currentPost = getBlogPostBySlug(currentSlug);
  if (!currentPost) return [];
  
  return blogPosts
    .filter(post => 
      post.isPublished && 
      post.slug !== currentSlug && 
      (post.category === currentPost.category || 
       post.tags.some(tag => currentPost.tags.includes(tag)))
    )
    .slice(0, limit);
};
