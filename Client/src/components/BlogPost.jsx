import React, { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Navbar from './Navbar';
import Footer from './Footer';
import { getBlogPostBySlug, getRelatedPosts } from '../data/blogPosts';
import ReactMarkdown from 'react-markdown';

const BlogPost = () => {
  const { slug } = useParams();
  const post = getBlogPostBySlug(slug);
  const relatedPosts = getRelatedPosts(slug, 3);

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, [slug]);

  // If post not found, redirect to blog index
  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.metaDescription,
    "author": {
      "@type": "Person",
      "name": post.author,
      "url": "https://khyruddin-hashanulla.github.io/MY-PORTFOLIO/"
    },
    "publisher": {
      "@type": "Organization",
      "name": "NextEra",
      "logo": {
        "@type": "ImageObject",
        "url": "https://thenextera.in/logo.png"
      }
    },
    "datePublished": post.publishDate,
    "dateModified": post.publishDate,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://thenextera.in/blog/${post.slug}`
    },
    "image": post.featuredImage ? `https://thenextera.in${post.featuredImage}` : "https://thenextera.in/logo.png",
    "keywords": post.keywords.join(", "),
    "articleSection": post.category,
    "wordCount": post.content.split(' ').length
  };

  return (
    <>
      <Helmet>
        {/* Primary Meta Tags */}
        <title>{post.title} | NextEra Blog</title>
        <meta name="title" content={`${post.title} | NextEra Blog`} />
        <meta name="description" content={post.metaDescription} />
        <meta name="keywords" content={post.keywords.join(', ')} />
        <meta name="author" content={post.author} />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://thenextera.in/blog/${post.slug}`} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.metaDescription} />
        <meta property="og:image" content={post.featuredImage ? `https://thenextera.in${post.featuredImage}` : "https://thenextera.in/logo.png"} />
        <meta property="og:site_name" content="NextEra" />
        <meta property="article:author" content={post.author} />
        <meta property="article:published_time" content={post.publishDate} />
        <meta property="article:section" content={post.category} />
        {post.tags.map((tag, index) => (
          <meta key={index} property="article:tag" content={tag} />
        ))}

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={`https://thenextera.in/blog/${post.slug}`} />
        <meta property="twitter:title" content={post.title} />
        <meta property="twitter:description" content={post.metaDescription} />
        <meta property="twitter:image" content={post.featuredImage ? `https://thenextera.in${post.featuredImage}` : "https://thenextera.in/logo.png"} />
        <meta property="twitter:creator" content="@khyruddinkh" />

        {/* Canonical URL */}
        <link rel="canonical" href={`https://thenextera.in/blog/${post.slug}`} />

        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <div className="min-h-screen bg-gray-900 flex flex-col relative overflow-hidden">
        {/* Enhanced animated background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-32 -right-32 w-64 h-64 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-gradient-to-br from-cyan-500/15 to-blue-600/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }}></div>
          <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "4s" }}></div>

          <div className="absolute top-20 left-20 w-2 h-2 bg-cyan-400/30 rounded-full animate-bounce"></div>
          <div className="absolute top-40 right-32 w-1.5 h-1.5 bg-cyan-400/30 rounded-full animate-bounce" style={{ animationDelay: "1s" }}></div>
          <div className="absolute bottom-32 left-1/3 w-1 h-1 bg-cyan-400/30 rounded-full animate-bounce" style={{ animationDelay: "2s" }}></div>
        </div>
        
        <Navbar />
        
        <div className="flex-grow container mx-auto px-4 py-4 pt-32 pb-8 relative z-10">
          {/* Breadcrumb */}
          <div className="max-w-4xl mx-auto px-4 py-4">
            <nav className="flex text-sm text-gray-400">
              <Link to="/" className="hover:text-purple-400 transition-colors">Home</Link>
              <span className="mx-2">/</span>
              <Link to="/blog" className="hover:text-purple-400 transition-colors">Blog</Link>
              <span className="mx-2">/</span>
              <span className="text-gray-300">{post.title}</span>
            </nav>
          </div>

          {/* Article Header */}
          <article className="max-w-4xl mx-auto px-4 py-8">
            <header className="mb-12">
              {/* Category Badge */}
              <div className="mb-6">
                <span className="inline-block px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-full text-purple-300 text-sm font-medium">
                  {post.category}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                {post.title}
              </h1>

              {/* Meta Information */}
              <div className="flex flex-wrap items-center gap-6 text-gray-400 mb-8">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                    {post.author.charAt(0)}
                  </div>
                  <div>
                    <p className="text-white font-medium">{post.author}</p>
                    <p className="text-sm text-gray-400">Author & Founder</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                    </svg>
                    {new Date(post.publishDate).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </span>
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                    {post.readTime}
                  </span>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                {post.tags.map((tag, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 bg-slate-800/50 border border-slate-700/50 rounded-lg text-slate-300 text-sm hover:bg-slate-700/50 transition-colors"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Featured Image */}
              {post.featuredImage && (
                <div className="mb-12 rounded-2xl overflow-hidden">
                  <img 
                    src={post.featuredImage} 
                    alt={post.title}
                    className="w-full h-64 md:h-96 object-cover"
                  />
                </div>
              )}
            </header>

            {/* Article Content */}
            <div className="prose prose-lg prose-invert max-w-none">
              <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 md:p-12">
                <ReactMarkdown 
                  className="text-gray-300 leading-relaxed"
                  components={{
                    h2: ({children}) => <h2 className="text-3xl font-bold text-white mt-12 mb-6 first:mt-0">{children}</h2>,
                    h3: ({children}) => <h3 className="text-2xl font-bold text-white mt-10 mb-4">{children}</h3>,
                    p: ({children}) => <p className="text-gray-300 mb-6 leading-relaxed text-lg">{children}</p>,
                    ul: ({children}) => <ul className="list-disc list-inside mb-6 space-y-2 text-gray-300">{children}</ul>,
                    li: ({children}) => <li className="text-gray-300 leading-relaxed">{children}</li>,
                    strong: ({children}) => <strong className="text-white font-semibold">{children}</strong>,
                    a: ({href, children}) => (
                      <Link 
                        to={href} 
                        className="text-purple-400 hover:text-purple-300 underline transition-colors"
                      >
                        {children}
                      </Link>
                    ),
                    hr: () => <hr className="border-slate-600 my-12" />,
                    em: ({children}) => <em className="text-purple-300 italic">{children}</em>
                  }}
                >
                  {post.content}
                </ReactMarkdown>
              </div>
            </div>

            {/* Author Bio */}
            <div className="mt-16 p-8 bg-gradient-to-r from-slate-800/40 to-purple-900/20 border border-slate-700/50 rounded-2xl backdrop-blur-sm">
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                  {post.author.charAt(0)}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">About {post.author}</h3>
                  <p className="text-gray-300 leading-relaxed mb-4">
                    Computer Science and Engineering student passionate about building projects, teaching, and helping others succeed in tech. 
                    Founder of NextEra - bridging the gap between learning and earning.
                  </p>
                  <div className="flex gap-4">
                    <a 
                      href="https://khyruddin-hashanulla.github.io/MY-PORTFOLIO/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-purple-400 hover:text-purple-300 transition-colors text-sm font-medium"
                    >
                      Portfolio →
                    </a>
                    <a 
                      href="https://www.linkedin.com/in/khyruddin-hashanulla" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-purple-400 hover:text-purple-300 transition-colors text-sm font-medium"
                    >
                      LinkedIn →
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <div className="mt-16">
                <h3 className="text-2xl font-bold text-white mb-8">Related Articles</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {relatedPosts.map((relatedPost) => (
                    <Link 
                      key={relatedPost.id}
                      to={`/blog/${relatedPost.slug}`}
                      className="group block p-6 bg-slate-800/30 border border-slate-700/50 rounded-xl hover:bg-slate-700/30 transition-all duration-300 backdrop-blur-sm"
                    >
                      <div className="mb-3">
                        <span className="text-xs text-purple-400 font-medium">{relatedPost.category}</span>
                      </div>
                      <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-purple-300 transition-colors line-clamp-2">
                        {relatedPost.title}
                      </h4>
                      <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                        {relatedPost.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{relatedPost.readTime}</span>
                        <span>{new Date(relatedPost.publishDate).toLocaleDateString()}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Call to Action */}
            <div className="mt-16 text-center p-8 bg-gradient-to-r from-purple-900/30 to-pink-900/30 border border-purple-500/30 rounded-2xl backdrop-blur-sm">
              <h3 className="text-2xl font-bold text-white mb-4">Ready to Start Learning?</h3>
              <p className="text-gray-300 mb-6">Join thousands of students building their future with NextEra</p>
              <Link 
                to="/courses"
                className="inline-block px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105"
              >
                Explore Courses
              </Link>
            </div>
          </article>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default BlogPost;
