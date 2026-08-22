import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const BLOG_POSTS = [
  {
    id: 'metal-vs-gold-foil',
    title: 'Metal vs Gold Foil Business Cards',
    excerpt: 'Discover the ultimate choice for luxury visiting cards. Learn how metal and gold foil finishes leave a lasting impression.',
    image: '/product-images/Visiting Cards.jpg',
    date: 'August 24, 2026',
    readTime: '4 min read'
  },
  {
    id: 'premium-visiting-card-signs',
    title: '5 Signs of a Premium Visiting Card',
    excerpt: 'What separates a standard card from a masterpiece? Explore the tactile and visual elements of high-end business cards.',
    image: '/serviceimage/new/service.png',
    date: 'August 20, 2026',
    readTime: '3 min read'
  },
  {
    id: 'commercial-printing-trends',
    title: 'Future Trends in Commercial Packaging',
    excerpt: 'How custom product boxes and sustainable packaging are transforming the brand experience across India.',
    image: '/product-images/Custom Product Boxes.jpg',
    date: 'August 15, 2026',
    readTime: '5 min read'
  }
];

const BlogListing: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="bg-[#0a0a0a] min-h-screen pt-32 pb-24 w-full">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16 md:mb-24"
        >
          <h1 className="text-5xl md:text-7xl text-white font-normal tracking-tight mb-6" style={{ fontFamily: "'Helvetica Now Display', sans-serif" }}>
            Our <span className="text-[#FF6600]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Insights</span>
          </h1>
          <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto font-normal">
            Explore the art of luxury printing, design trends, and commercial packaging strategies from the experts at Guru Printing Press.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {BLOG_POSTS.map((post, idx) => (
            <Link to={`/blog/${post.id}`} key={post.id} className="group block">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-colors duration-300 h-full flex flex-col"
              >
                <div className="w-full h-64 overflow-hidden relative">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </div>
                <div className="p-8 flex flex-col flex-1">
                  <div className="flex items-center justify-between text-white/40 text-sm mb-4 font-normal tracking-wide">
                    <span>{post.date}</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="text-2xl text-white font-medium mb-4 leading-tight group-hover:text-[#FF6600] transition-colors" style={{ fontFamily: "'Helvetica Now Display', sans-serif" }}>
                    {post.title}
                  </h3>
                  <p className="text-white/60 text-base leading-relaxed mb-8 flex-1">
                    {post.excerpt}
                  </p>
                  <div className="inline-flex items-center gap-2 text-white text-sm font-medium tracking-widest uppercase mt-auto group-hover:text-[#FF6600] transition-colors">
                    Read More 
                    <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
};

export default BlogListing;
