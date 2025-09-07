import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEOHead = ({ 
  title = "NextEra - Learn Programming, Build Projects, Earn Certificates",
  description = "Master programming with NextEra's comprehensive courses in Full Stack Development, React, Node.js, DSA, DBMS, and more. Get certified, build real projects, and advance your tech career.",
  keywords = "programming courses, coding bootcamp, full stack development, React, Node.js, JavaScript, Python, DSA, DBMS, online learning, tech education, coding certification",
  image = "https://thenextera.in/og-image.jpg",
  url = "https://thenextera.in",
  type = "website",
  author = "NextEra Education Platform",
  publishedTime,
  modifiedTime,
  section,
  tags = []
}) => {
  const fullTitle = title.includes('NextEra') ? title : `${title} | NextEra`;
  const fullUrl = url.startsWith('http') ? url : `https://thenextera.in${url}`;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={fullUrl} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="NextEra" />
      <meta property="og:locale" content="en_US" />
      
      {/* Article specific tags */}
      {type === 'article' && (
        <>
          {publishedTime && <meta property="article:published_time" content={publishedTime} />}
          {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
          {author && <meta property="article:author" content={author} />}
          {section && <meta property="article:section" content={section} />}
          {tags.map((tag, index) => (
            <meta key={index} property="article:tag" content={tag} />
          ))}
        </>
      )}
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={fullUrl} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
      <meta property="twitter:creator" content="@NextEraEdu" />
      
      {/* Additional SEO Meta Tags */}
      <meta name="theme-color" content="#0ea5e9" />
      <meta name="msapplication-TileColor" content="#0ea5e9" />
    </Helmet>
  );
};

export default SEOHead;
