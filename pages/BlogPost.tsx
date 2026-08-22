import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

const BLOG_POSTS: Record<string, any> = {
  'metal-vs-gold-foil': {
    title: 'Metal vs Gold Foil Business Cards',
    content: `
      <p class="mb-6 text-white/70 text-lg leading-relaxed">When it comes to leaving a lasting impression, standard paper simply doesn't cut it anymore. High-end businesses and executives are increasingly turning to luxury materials to communicate their brand's value. The two most popular choices in this ultra-premium tier are metal business cards and gold foil finishes.</p>
      
      <h2 class="text-3xl text-white font-medium mb-4 mt-12" style="font-family: 'Helvetica Now Display', sans-serif;">The Heavyweight Impact of Metal Cards</h2>
      <p class="mb-6 text-white/70 text-lg leading-relaxed">A metal business card is impossible to ignore. The sheer weight and cold, sleek feel immediately command attention. These cards are typically crafted from stainless steel, brass, or copper, and can be anodized in various colors like matte black or brushed silver.</p>
      <p class="mb-6 text-white/70 text-lg leading-relaxed">The manufacturing process involves chemical etching and laser engraving, allowing for intricate cut-through patterns and precise detailing that paper simply cannot support. They are incredibly durable and practically indestructible, ensuring your contact information is never accidentally crumpled or thrown away.</p>
      
      <h2 class="text-3xl text-white font-medium mb-4 mt-12" style="font-family: 'Helvetica Now Display', sans-serif;">The Classic Elegance of Gold Foil</h2>
      <p class="mb-6 text-white/70 text-lg leading-relaxed">If metal cards are bold and modern, gold foil represents timeless elegance. Foil stamping uses heat and pressure to apply a metallic foil to premium cardstock. When paired with high-gsm textured paper (like a 600gsm cotton stock) or a soft-touch matte lamination, the result is breathtaking.</p>
      <p class="mb-6 text-white/70 text-lg leading-relaxed">Gold foil catches the light beautifully, adding a dynamic visual element to your card. It works exceptionally well for highlighting logos, names, or key design elements. While gold is the classic choice, foil stamping is also available in silver, rose gold, holographic, and even gloss black.</p>
      
      <h2 class="text-3xl text-white font-medium mb-4 mt-12" style="font-family: 'Helvetica Now Display', sans-serif;">Which Should You Choose?</h2>
      <ul class="list-disc pl-6 mb-6 text-white/70 text-lg leading-relaxed space-y-2">
        <li><strong>Choose Metal if:</strong> You want to be unforgettable, you are in a high-ticket industry (like real estate, luxury autos, or elite consulting), and you want a modern, assertive edge.</li>
        <li><strong>Choose Gold Foil if:</strong> You value classic elegance, want a tactile experience that combines the warmth of paper with the flash of metal, or need to order in very large quantities (foil is generally more cost-effective at scale than metal).</li>
      </ul>
      <p class="mb-6 text-white/70 text-lg leading-relaxed">At Guru Printing Press, we specialize in both. Whether you envision a laser-cut matte black metal card or a triple-thick cotton card with deep gold foil debossing, our in-house experts can bring it to life.</p>
    `,
    image: '/product-images/Visiting Cards.jpg',
    date: 'August 24, 2026',
    readTime: '4 min read',
    author: 'Team GPP'
  },
  'premium-visiting-card-signs': {
    title: '5 Signs of a Premium Visiting Card',
    content: `
      <p class="mb-6 text-white/70 text-lg leading-relaxed">Your business card is often the first physical touchpoint a potential client has with your brand. A flimsy, poorly printed card can subtly undermine your credibility, while a premium card instantly establishes trust and authority. But what exactly makes a visiting card "premium"?</p>
      
      <h2 class="text-3xl text-white font-medium mb-4 mt-12" style="font-family: 'Helvetica Now Display', sans-serif;">1. Unmistakable Thickness (GSM)</h2>
      <p class="mb-6 text-white/70 text-lg leading-relaxed">The most immediate indicator of quality is weight. Standard cards sit around 300gsm (grams per square meter). Premium cards start at 400gsm and can go up to 800gsm or even 1000gsm through duplexing or triplexing (gluing multiple layers of paper together). When someone takes a 600gsm card from your hand, they immediately feel the difference.</p>
      
      <h2 class="text-3xl text-white font-medium mb-4 mt-12" style="font-family: 'Helvetica Now Display', sans-serif;">2. Tactile Finishes</h2>
      <p class="mb-6 text-white/70 text-lg leading-relaxed">A premium card appeals to touch as much as sight. Specialized finishes elevate the experience:</p>
      <ul class="list-disc pl-6 mb-6 text-white/70 text-lg leading-relaxed space-y-2">
        <li><strong>Soft-Touch Lamination:</strong> Gives the card a smooth, velvety feel.</li>
        <li><strong>Spot UV:</strong> Adds a raised, glossy texture to specific elements like logos.</li>
        <li><strong>Embossing/Debossing:</strong> Physically raises or depresses areas of the card for a 3D effect.</li>
      </ul>
      
      <h2 class="text-3xl text-white font-medium mb-4 mt-12" style="font-family: 'Helvetica Now Display', sans-serif;">3. Precision Edge Painting</h2>
      <p class="mb-6 text-white/70 text-lg leading-relaxed">Edge painting or edge foiling is a hallmark of ultra-luxury cards. Because premium cards are very thick, the edges are visible. Painting these edges with a brand color or applying metallic foil adds a stunning, unexpected detail.</p>
      
      <h2 class="text-3xl text-white font-medium mb-4 mt-12" style="font-family: 'Helvetica Now Display', sans-serif;">4. Specialty Materials</h2>
      <p class="mb-6 text-white/70 text-lg leading-relaxed">Moving beyond standard coated paper sets you apart. High-end cards often utilize uncoated textured cotton paper, frosted plastic, wood veneer, or even carbon fiber and metal.</p>
      
      <h2 class="text-3xl text-white font-medium mb-4 mt-12" style="font-family: 'Helvetica Now Display', sans-serif;">5. Minimalist, Expert Typography</h2>
      <p class="mb-6 text-white/70 text-lg leading-relaxed">Finally, design is crucial. Premium cards avoid clutter. They use negative space effectively and feature expertly kerned, high-quality typography. The design doesn't shout; it whispers confidence.</p>
      
      <p class="mt-12 text-white/70 text-lg leading-relaxed">Ready to upgrade your first impression? Explore our luxury visiting card options at Guru Printing Press today.</p>
    `,
    image: '/serviceimage/new/service.png',
    date: 'August 20, 2026',
    readTime: '3 min read',
    author: 'Team GPP'
  },
  'commercial-printing-trends': {
    title: 'Future Trends in Commercial Packaging',
    content: `
      <p class="mb-6 text-white/70 text-lg leading-relaxed">Packaging is no longer just about protecting a product; it is the ultimate marketing tool and a critical component of the customer experience. As brands compete for attention on shelves and in unboxing videos, commercial packaging is evolving rapidly.</p>
      <p class="mb-6 text-white/70 text-lg leading-relaxed">One major trend is the shift towards sustainable, eco-friendly materials without sacrificing luxury appeal. We are seeing a rise in high-quality recycled kraft papers, soy-based inks, and innovative structural designs that minimize waste.</p>
      <p class="mb-6 text-white/70 text-lg leading-relaxed">Another trend is smart packaging. The integration of QR codes and NFC tags allows brands to connect physical boxes to digital experiences, offering everything from authentication to exclusive content.</p>
    `,
    image: '/product-images/Custom Product Boxes.jpg',
    date: 'August 15, 2026',
    readTime: '5 min read',
    author: 'Team GPP'
  }
};

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
          dangerouslySetInnerHTML={{ __html: post.content }}
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
