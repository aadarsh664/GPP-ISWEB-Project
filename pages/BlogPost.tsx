import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import blogData from '../src/data/blogPosts.json';
import { marked } from 'marked';

const BLOG_POSTS = blogData.posts.reduce((acc, post) => {
  acc[post.id] = post;
  return acc;
}, {} as Record<string, any>);

const BlogPost: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const post = id ? BLOG_POSTS[id] : null;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!post) {
    return (
      <div className="bg-[#0a0a0a] min-h-screen flex items-center justify-center text-white">
        <div className="text-center">
          <h1 className="text-4xl mb-4" style={{ fontFamily: "'Helvetica Now Display', sans-serif" }}>Post Not Found</h1>
          <button onClick={() => navigate('/blog')} className="text-[#FF6600] hover:underline">Return to Blog</button>
        </div>
      </div>
    );
  }

  return (
    <main className="bg-[#0a0a0a] min-h-screen pt-32 pb-24 w-full">
      <article className="container mx-auto px-6 md:px-12 max-w-4xl">
        {/* Back Button */}
        <Link to="/blog" className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors mb-12">
          <ArrowLeft size={20} />
          <span className="text-sm uppercase tracking-widest font-medium">Back to Insights</span>
        </Link>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-12"
        >
          <div className="flex items-center gap-4 text-white/40 text-sm mb-6 font-normal tracking-wide">
            <span>{post.date}</span>
            <span className="w-1 h-1 bg-white/20 rounded-full"></span>
            <span>{post.readTime}</span>
          </div>
          <h1 className="text-4xl md:text-6xl text-white font-normal tracking-tight mb-8 leading-[1.1]" style={{ fontFamily: "'Helvetica Now Display', sans-serif" }}>
            {post.title}
          </h1>
          <div className="flex items-center gap-4">
            <img src="/favicon/Logo.svg" alt="GPP Logo" className="w-12 h-12 object-contain" />
            <div>
              <p className="text-white text-sm font-medium">{post.author}</p>
              <p className="text-white/40 text-xs">Printing Experts</p>
            </div>
          </div>
        </motion.div>

        {/* Featured Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full h-[40vh] md:h-[60vh] rounded-2xl overflow-hidden mb-16"
        >
          <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="prose prose-lg prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: marked.parse(post.content.replace(/^[ ]+/gm, '')) as string }}
        />
        
        {/* Footer actions */}
        <div className="mt-24 pt-12 border-t border-white/10 flex justify-between items-center">
          <p className="text-white/40 text-sm">Thanks for reading.</p>
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-white hover:text-[#FF6600] transition-colors text-sm uppercase tracking-widest font-medium">
            Back to Top
          </button>
        </div>
      </article>
    </main>
  );
};

export default BlogPost;
