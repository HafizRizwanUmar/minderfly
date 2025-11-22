// Article data structure
export const articlesData = [
    {
        id: 1,
        slug: 'modern-web-development-trends-2024',
        title: 'Modern Web Development Trends in 2024',
        excerpt: 'Explore the latest trends shaping the future of web development, from AI integration to progressive web apps.',
        content: `
# Modern Web Development Trends in 2024

The web development landscape continues to evolve at a rapid pace. In 2024, we're seeing several key trends that are reshaping how we build and deploy web applications.

## AI-Powered Development

Artificial Intelligence is no longer just a buzzword—it's becoming an integral part of the development workflow. From AI-assisted coding to intelligent testing frameworks, developers are leveraging machine learning to write better code faster.

## Performance First

With Core Web Vitals becoming increasingly important for SEO, performance optimization has moved from nice-to-have to essential. Modern frameworks are built with performance in mind from the ground up.

## The Rise of Edge Computing

Edge computing is changing how we think about server-side rendering and data processing, bringing computation closer to users for faster response times.

## Conclusion

Staying ahead of these trends isn't just about using the latest tools—it's about understanding the problems they solve and applying them thoughtfully to create better user experiences.
        `,
        author: 'Hafiz Rizwan Umar',
        date: '2024-11-20',
        readTime: '5 min read',
        category: 'Web Development',
        image: '/article-images/web-dev-trends.jpg',
        tags: ['Web Development', 'AI', 'Performance', 'Trends']
    },
    {
        id: 2,
        slug: 'mastering-react-performance-optimization',
        title: 'Mastering React Performance Optimization',
        excerpt: 'Learn advanced techniques to optimize your React applications for better performance and user experience.',
        content: `
# Mastering React Performance Optimization

React applications can become sluggish if not optimized properly. This guide covers essential techniques to keep your app running smoothly.

## Understanding React Rendering

Before optimizing, it's crucial to understand how React renders components and when re-renders occur.

## Key Optimization Techniques

1. **Memoization** - Use React.memo, useMemo, and useCallback wisely
2. **Code Splitting** - Break your bundle into smaller chunks
3. **Lazy Loading** - Load components only when needed
4. **Virtual Lists** - Render only visible items in long lists

## Measuring Performance

Use React DevTools Profiler to identify bottlenecks and measure the impact of your optimizations.
        `,
        author: 'Hafiz Rizwan Umar',
        date: '2024-11-18',
        readTime: '8 min read',
        category: 'React',
        image: '/article-images/react-performance.jpg',
        tags: ['React', 'Performance', 'Optimization', 'JavaScript']
    },
    {
        id: 3,
        slug: 'ui-ux-design-principles-for-developers',
        title: 'UI/UX Design Principles for Developers',
        excerpt: 'Essential design principles every developer should know to create beautiful and functional user interfaces.',
        content: `
# UI/UX Design Principles for Developers

Great design isn't just for designers. As developers, understanding fundamental design principles can dramatically improve the quality of our work.

## The Foundation: User-Centered Design

Always start with the user's needs. What problem are you solving? How will users interact with your interface?

## Key Principles

### Visual Hierarchy
Guide users' attention to the most important elements first.

### Consistency
Maintain consistent patterns throughout your application for better usability.

### Accessibility
Design for all users, including those with disabilities.

### Feedback
Provide clear feedback for user actions.

## Practical Application

These principles aren't theoretical—they directly impact user satisfaction and business metrics.
        `,
        author: 'Ammara Lohani',
        date: '2024-11-15',
        readTime: '6 min read',
        category: 'Design',
        image: '/article-images/ui-ux-principles.jpg',
        tags: ['UI/UX', 'Design', 'Frontend', 'Accessibility']
    },
    {
        id: 4,
        slug: 'building-scalable-nodejs-applications',
        title: 'Building Scalable Node.js Applications',
        excerpt: 'Best practices and architectural patterns for building Node.js applications that scale.',
        content: `
# Building Scalable Node.js Applications

Scalability is a critical consideration when building Node.js applications. This guide covers proven patterns and practices.

## Architecture Patterns

### Microservices
Break your application into smaller, independent services.

### Event-Driven Architecture
Use events to decouple components and improve scalability.

## Database Optimization

- Use connection pooling
- Implement caching strategies
- Choose the right database for your use case

## Monitoring and Logging

Implement comprehensive monitoring to catch issues before they impact users.
        `,
        author: 'Hafiz Rizwan Umar',
        date: '2024-11-12',
        readTime: '10 min read',
        category: 'Backend',
        image: '/article-images/nodejs-scalable.jpg',
        tags: ['Node.js', 'Backend', 'Scalability', 'Architecture']
    },
    {
        id: 5,
        slug: 'css-grid-vs-flexbox-when-to-use-which',
        title: 'CSS Grid vs Flexbox: When to Use Which',
        excerpt: 'A comprehensive comparison of CSS Grid and Flexbox to help you choose the right layout method.',
        content: `
# CSS Grid vs Flexbox: When to Use Which

Both CSS Grid and Flexbox are powerful layout tools, but knowing when to use each can save you time and headaches.

## Flexbox: One-Dimensional Layouts

Flexbox excels at distributing items along a single axis—either horizontally or vertically.

### Best Use Cases
- Navigation bars
- Card layouts in a row
- Centering content
- Spacing items evenly

## CSS Grid: Two-Dimensional Layouts

Grid is designed for complex layouts that span both rows and columns.

###Best Use Cases
- Page layouts
- Magazine-style designs
- Complex card grids
- Any layout with both rows and columns

## Can You Use Both?

Absolutely! Grid and Flexbox work great together. Use Grid for the overall layout and Flexbox for component internals.
        `,
        author: 'Ammara Lohani',
        date: '2024-11-10',
        readTime: '7 min read',
        category: 'CSS',
        image: '/article-images/grid-vs-flexbox.jpg',
        tags: ['CSS', 'Flexbox', 'Grid', 'Frontend']
    }
];

// Helper function to get article by slug
export const getArticleBySlug = (slug) => {
    return articlesData.find(article => article.slug === slug);
};

// Helper function to get related articles
export const getRelatedArticles = (currentSlug, limit = 3) => {
    return articlesData
        .filter(article => article.slug !== currentSlug)
        .slice(0, limit);
};
