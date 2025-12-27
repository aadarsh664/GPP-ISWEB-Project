
import { Product, ServiceItem, Testimonial, WhyChooseUsCard } from './types';

export const PRODUCTS: Product[] = [
  // Notebooks, Diaries & Calendars
  {
    id: 'student-diary',
    name: 'Student Diary',
    category: 'Notebooks, Diaries & Calendars',
    description: 'Customized school diaries with academic calendars and student info sections.',
    features: ['Hardbound / Spiral', 'Custom Cover Design', 'Internal Branding Pages'],
    imageUrl: '/product-images/Student Diary.jpg'
  },
  {
    id: 'student-notebook',
    name: 'Student Notebook',
    category: 'Notebooks, Diaries & Calendars',
    description: 'High-quality notebooks for students with durable binding and smooth paper.',
    features: ['Soft/Hard Cover', 'Index Page', 'Premium Paper Quality'],
    imageUrl: '/product-images/Student Notebook.jpg'
  },
  {
    id: 'personalised-diaries-planners',
    name: 'Personalised Diaries / Planners',
    category: 'Notebooks, Diaries & Calendars',
    description: 'Executive diaries and planners customized with names and corporate branding.',
    features: ['Leatherette Cover', 'Yearly Planner', 'Custom Name Embossing'],
    imageUrl: '/product-images/Personalised Diaries - Planners.jpg'
  },
  {
    id: 'personalised-notebooks',
    name: 'Personalised Notebooks',
    category: 'Notebooks, Diaries & Calendars',
    description: 'Custom printed notebooks perfect for corporate gifting and personal use.',
    features: ['Full Color Cover', 'Custom Watermark', 'Elastic Band Closure'],
    imageUrl: '/product-images/Personalised Notebooks.jpg'
  },
  {
    id: 'spiral-notepads',
    name: 'Spiral Notepads',
    category: 'Notebooks, Diaries & Calendars',
    description: 'Handy spiral-bound notepads for quick notes and meetings.',
    features: ['Wire-O Binding', 'Perforated Sheets', 'Pocket Size Options'],
    imageUrl: '/product-images/Spiral Notepads.jpg'
  },
  {
    id: 'wall-calendars',
    name: 'Wall Calendars',
    category: 'Notebooks, Diaries & Calendars',
    description: 'Large format wall calendars to keep your brand visible all year round.',
    features: ['Top Wiro Binding', 'Metal Rod Hanging', 'Gloss/Matte Finish'],
    imageUrl: '/product-images/Wall Calendars.jpg'
  },
  {
    id: 'table-calendars',
    name: 'Table Calendars',
    category: 'Notebooks, Diaries & Calendars',
    description: 'Compact desk calendars with sturdy stands, ideal for office desks.',
    features: ['Tent Card Stand', 'Month-wise Sheets', 'Custom Branding Space'],
    imageUrl: '/product-images/Table Calendars.jpg'
  },
  {
    id: 'calendars-cards',
    name: 'Calendars Cards',
    category: 'Notebooks, Diaries & Calendars',
    description: 'Pocket-sized calendar cards for wallets and quick reference.',
    features: ['Laminated Card', 'Rounded Corners', 'Double Sided Print'],
    imageUrl: '/product-images/Calendars Cards.jpg'
  },

  // Office Supplies
  {
    id: 'visiting-cards',
    name: 'Visiting Cards',
    category: 'Office Supplies',
    description: 'Premium business cards that leave a lasting impression.',
    features: ['Matte/Gloss Lamination', 'Spot UV Options', 'Thick Cardstock'],
    imageUrl: '/product-images/Visiting Cards.jpg'
  },
  {
    id: 'certificates',
    name: 'Certificates',
    category: 'Office Supplies',
    description: 'Professional certificates for awards, recognition, and achievements.',
    features: ['Gold/Silver Foil', 'Textured Paper', 'Security Borders'],
    imageUrl: '/product-images/Certificates.jpg'
  },
  {
    id: 'folder-files',
    name: 'Folder & Files',
    category: 'Office Supplies',
    description: 'Custom branded folders for organizing documents and presentations.',
    features: ['Pocket with Card Slot', 'Laminated Finish', 'Spine Printing'],
    imageUrl: '/product-images/Folder & Files.jpg'
  },
  {
    id: 'bulk-id-cards-lanyards',
    name: 'Bulk ID Cards / Lanyards',
    category: 'Office Supplies',
    description: 'Complete ID card solutions with printed lanyards for organizations.',
    features: ['PVC Cards', 'Satin Lanyards', 'Holder & Clip'],
    imageUrl: '/product-images/Bulk ID Cards - Lanyards.jpg'
  },
  {
    id: 'letterheads-pads',
    name: 'Letterheads / Pads',
    category: 'Office Supplies',
    description: 'Official letterheads and writing pads for corporate communication.',
    features: ['Bond Paper', 'Watermark Options', 'Pad Binding'],
    imageUrl: '/product-images/Letterheads - Pads.jpg'
  },
  {
    id: 'envelopes',
    name: 'Envelopes',
    category: 'Office Supplies',
    description: 'Custom printed envelopes in various sizes for official mail.',
    features: ['Window/Non-Window', 'Peel & Seal', 'Security Tint'],
    imageUrl: '/product-images/Envelopes.jpg'
  },
  {
    id: 'invitations-wedding-cards',
    name: 'Invitations / Wedding Cards',
    category: 'Office Supplies',
    description: 'Elegant invitation cards for weddings, events, and inaugurations.',
    features: ['Fancy Papers', 'Laser Cutting', 'Embossing'],
    imageUrl: '/product-images/Invitations - Wedding Cards.jpg'
  },
  {
    id: 'stamp',
    name: 'Stamp',
    category: 'Office Supplies',
    description: 'Custom rubber and self-inking stamps for official authorization.',
    features: ['Self-Inking', 'Date Stamps', 'Logo Integration'],
    imageUrl: '/product-images/Stamp.jpg'
  },

  // Pads & Books
  {
    id: 'books',
    name: 'Books',
    category: 'Pads & Books',
    description: 'Softcover and hardcover book printing for publishers and authors.',
    features: ['Perfect Binding', 'Section Sewing', 'Crisp Text Print'],
    imageUrl: '/product-images/Books.jpg'
  },
  {
    id: 'registers',
    name: 'Registers',
    category: 'Pads & Books',
    description: 'Durable registers for maintaining manual records and ledgers.',
    features: ['Hardbound', 'Ledger Paper', 'Numbered Pages'],
    imageUrl: '/product-images/Registers.jpg'
  },
  {
    id: 'bill-invoice-books',
    name: 'Bill / Invoice Books',
    category: 'Pads & Books',
    description: 'Customized bill books with carbonless copies for business transactions.',
    features: ['NCR Paper', 'Serial Numbering', 'Perforated'],
    imageUrl: '/product-images/Bill - Invoice Books.jpg'
  },
  {
    id: 'cash-memo',
    name: 'Cash Memo',
    category: 'Pads & Books',
    description: 'Compact cash memos for quick retail billing.',
    features: ['Duplicate/Triplicate', 'Pocket Size', 'Custom Layout'],
    imageUrl: '/product-images/Cash Memo.jpg'
  },
  {
    id: 'quotation-estimate-pads',
    name: 'Quotation / Estimate Pads',
    category: 'Pads & Books',
    description: 'Professional pads for providing cost estimates to clients.',
    features: ['Branded Header', 'Carbon Copy', 'Binding Options'],
    imageUrl: '/product-images/Quotation - Estimate Pads.jpg'
  },
  {
    id: 'cash-vouchers',
    name: 'Cash Vouchers',
    category: 'Pads & Books',
    description: 'Payment and receipt vouchers for accounting records.',
    features: ['Cheque Book Size', 'Counterfoil', 'Security Background'],
    imageUrl: '/product-images/Cash Vouchers.jpg'
  },
  {
    id: 'challan-books',
    name: 'Challan Books',
    category: 'Pads & Books',
    description: 'Delivery challan books for logistics and material movement.',
    features: ['Rugged Binding', 'Color Coded Copies', 'Legal Format'],
    imageUrl: '/product-images/Challan Books.jpg'
  },
  {
    id: 'prescription-pads',
    name: 'Prescription Pads',
    category: 'Pads & Books',
    description: 'Doctor prescription pads with clinic branding.',
    features: ['Doctor Logo', 'Standard Formats', 'Glued Top'],
    imageUrl: '/product-images/Prescription Pads.jpg'
  },

  // Marketing Prints
  {
    id: 'pamphlets-flyers',
    name: 'Pamphlets / Flyers',
    category: 'Marketing Prints',
    description: 'Cost-effective flyers for mass distribution and advertising.',
    features: ['Gloss/Matte Paper', 'Vibrant Colors', 'A4/A5 Sizes'],
    imageUrl: '/product-images/Pamphlets - Flyers.jpg'
  },
  {
    id: 'booklets',
    name: 'Booklets',
    category: 'Marketing Prints',
    description: 'Multi-page booklets for product manuals or company profiles.',
    features: ['Center Staple', 'Cover Lamination', 'High-Res Images'],
    imageUrl: '/product-images/Booklets.jpg'
  },
  {
    id: 'prospectus-visual-book',
    name: 'Prospectus & Visual Book',
    category: 'Marketing Prints',
    description: 'Premium prospectuses and visual books for educational institutions and corporate profiles.',
    features: ['Gloss/Matte Finish', 'Perfect Binding', 'High-Resolution Print'],
    imageUrl: '/product-images/Prospectus - Visual Book.jpg'
  },
  {
    id: 'brochures',
    name: 'Brochures',
    category: 'Marketing Prints',
    description: 'Folded brochures to showcase your products and services in detail.',
    features: ['Bi-Fold / Tri-Fold', 'Creasing', 'Premium Cardstock'],
    imageUrl: '/product-images/Brochures.jpg'
  },
  {
    id: 'posters',
    name: 'Posters',
    category: 'Marketing Prints',
    description: 'Eye-catching posters for events, announcements, and promotions.',
    features: ['Large Format', 'Wall Mounting', 'High Visibility'],
    imageUrl: '/product-images/Posters.jpg'
  },
  {
    id: 'danglers',
    name: 'Danglers',
    category: 'Marketing Prints',
    description: 'Hanging danglers for retail store promotions and visibility.',
    features: ['Die-Cut Shapes', 'Double Sided', 'String Attached'],
    imageUrl: '/product-images/Danglers.jpg'
  },
  {
    id: 'leaflets',
    name: 'Leaflets',
    category: 'Marketing Prints',
    description: 'Single sheet leaflets for quick information dissemination.',
    features: ['Lightweight Paper', 'Bulk Printing', 'Clear Typography'],
    imageUrl: '/product-images/Leaflets.jpg'
  },
  {
    id: 'tabletop-standees',
    name: 'Tabletop Standees',
    category: 'Marketing Prints',
    description: 'Miniature standees for reception desks and restaurant tables.',
    features: ['Rigid Board', 'Self Standing', 'Compact Size'],
    imageUrl: '/product-images/Tabletop Standees.jpg'
  },

  // Promotional Prints
  {
    id: 'canopy',
    name: 'Canopy',
    category: 'Promotional Prints',
    description: 'Branded tents for outdoor marketing campaigns and stalls.',
    features: ['Portable', 'All-Weather Flex', 'Easy Assembly'],
    imageUrl: '/product-images/Canopy.jpg'
  },
  {
    id: 'banner-flex',
    name: 'Banner / Flex',
    category: 'Promotional Prints',
    description: 'Large outdoor banners for maximum brand exposure.',
    features: ['Star Flex', 'Eyelets for Hanging', 'UV Resistant'],
    imageUrl: '/product-images/Banner - Flex.jpg'
  },
  {
    id: 'flex-with-frame',
    name: 'Flex with Frame',
    category: 'Promotional Prints',
    description: 'Flex banners mounted on sturdy metal frames for permanent signage.',
    features: ['MS Frame', 'Tension Mounting', 'Long Lasting'],
    imageUrl: '/product-images/Flex with Frame.jpg'
  },
  {
    id: 'vinyl-sticker-sunboard',
    name: 'Vinyl Sticker / Sunboard',
    category: 'Promotional Prints',
    description: 'Vinyl prints mounted on sunboard for rigid indoor/outdoor displays.',
    features: ['3mm/5mm Sunboard', 'Matte/Gloss Vinyl', 'Smooth Finish'],
    imageUrl: '/product-images/Vinyl Sticker - Sunboard.jpg'
  },
  {
    id: 'led-displays',
    name: 'LED Displays',
    category: 'Promotional Prints',
    description: 'Illuminated LED boards for high-impact night visibility.',
    features: ['Acrylic Letters', 'LED Modules', '3D Effect'],
    imageUrl: '/product-images/LED Displays.jpg'
  },
  {
    id: 'standees',
    name: 'Standees (Roll-up / X-Stand)',
    category: 'Promotional Prints',
    description: 'Portable roll-up standees for conferences and exhibitions.',
    features: ['Retractable Base', 'Carry Case', 'High Quality Print'],
    imageUrl: '/product-images/Standees (Roll-up - X-Stand).jpg'
  },
  {
    id: 'one-way-vision',
    name: 'One Way Vision',
    category: 'Promotional Prints',
    description: 'Glass film that allows visibility from inside but branding from outside.',
    features: ['Perforated Film', 'Window Branding', 'Privacy'],
    imageUrl: '/product-images/One Way Vision.jpg'
  },
  {
    id: 'acrylic-signs',
    name: 'Acrylic Signs',
    category: 'Promotional Prints',
    description: 'Premium acrylic signage for offices and reception areas.',
    features: ['Laser Cut', 'Glass-like Finish', 'Stud Mounting'],
    imageUrl: '/product-images/Acrylic Signs.jpg'
  },

  // Labels, Stickers & Packaging
  {
    id: 'custom-labels',
    name: 'Custom Labels',
    category: 'Labels, Stickers & Packaging',
    description: 'Branded labels for product packaging and bottles.',
    features: ['Roll/Sheet Form', 'Waterproof Options', 'Custom Shapes'],
    imageUrl: '/product-images/Custom Labels.jpg'
  },
  {
    id: 'custom-stickers',
    name: 'Custom Stickers',
    category: 'Labels, Stickers & Packaging',
    description: 'Versatile stickers for branding, sealing, and decoration.',
    features: ['Paper/Vinyl', 'Easy Peel', 'Strong Adhesion'],
    imageUrl: '/product-images/Custom Stickers.jpg'
  },
  {
    id: 'die-cut-stickers-labels',
    name: 'Die Cut Stickers & Labels',
    category: 'Labels, Stickers & Packaging',
    description: 'Stickers cut to the exact shape of your design or logo.',
    features: ['Precision Cutting', 'Unique Shapes', 'Premium Look'],
    imageUrl: '/product-images/Die Cut Stickers & Labels.jpg'
  },
  {
    id: 'corrugated-boxes',
    name: 'Corrugated Boxes',
    category: 'Labels, Stickers & Packaging',
    description: 'Sturdy packaging boxes for shipping and product protection.',
    features: ['3/5/7 Ply', 'Custom Print', 'Size Customization'],
    imageUrl: '/product-images/Corrugated Boxes.jpg'
  },
  {
    id: 'printed-paper-carry-bags',
    name: 'Printed Paper Carry Bags',
    category: 'Labels, Stickers & Packaging',
    description: 'Eco-friendly paper bags with your brand logo.',
    features: ['Kraft/Art Paper', 'Rope Handles', 'Reinforced Bottom'],
    imageUrl: '/product-images/Printed Paper Carry Bags.jpg'
  },
  {
    id: 'wrapping-papers',
    name: 'Wrapping Papers',
    category: 'Labels, Stickers & Packaging',
    description: 'Custom printed tissue or wrapping paper for premium unboxing.',
    features: ['Thin GSM Paper', 'Pattern Print', 'Branded Experience'],
    imageUrl: '/product-images/Wrapping Papers.jpg'
  },
  {
    id: 'custom-product-boxes',
    name: 'Custom Product Boxes',
    category: 'Labels, Stickers & Packaging',
    description: 'Tailor-made boxes for cosmetics, electronics, and retail products.',
    features: ['Mono Carton', 'Met-PET Options', 'Embossing/Foiling'],
    imageUrl: '/product-images/Custom Product Boxes.jpg'
  },
  {
    id: 'tags',
    name: 'Tags',
    category: 'Labels, Stickers & Packaging',
    description: 'Hang tags for clothing and merchandise.',
    features: ['Punch Hole', 'String Options', 'Thick Board'],
    imageUrl: '/product-images/Tags.jpg'
  }
];

export const WHY_CHOOSE_US: WhyChooseUsCard[] = [
  {
    id: '1',
    title: 'Error-Free Production',
    icon: 'shield-check',
    content: 'We review and fix file errors before printing. We save your money by preventing mistakes.'
  },
  {
    id: '2',
    title: 'Priority Support',
    icon: 'clock',
    content: "Business doesn't wait. We push our limits to deliver your urgent requirements on time."
  },
  {
    id: '3',
    title: 'Honest Pricing',
    icon: 'tag',
    content: 'What we quote is what you pay. No hidden costs, no last-minute surprises.'
  },
  {
    id: '4',
    title: 'Long-Term Relationship Mindset',
    icon: 'heart',
    content: 'We view every project as a partnership. Your growth is our growth, and we are committed to being your reliable print-backend for years to come, ensuring consistency in every batch.'
  },
  {
    id: '5',
    title: 'One Point of Contact',
    icon: 'user-check',
    content: 'Streamline your operations with a dedicated liaison who manages your entire project lifecycle, ensuring clarity and accountability from start to finish.'
  },
  {
    id: '6',
    title: 'Reliable Delivery',
    icon: 'truck',
    content: 'Timing is non-negotiable in business. Our robust logistics network ensures that your premium print assets reach their destination safely and exactly when promised.'
  },
  {
    id: '7',
    title: 'Standardized Quality',
    icon: 'target',
    content: 'Consistency is our hallmark. We employ rigorous quality controls to ensure that every reorder matches the high standards of the first, regardless of volume.'
  },
  {
    id: '8',
    title: 'Direct Account Manager',
    icon: 'users',
    content: 'No call centers. You get a dedicated manager who understands your brand’s history and specific needs. No explaining things twice.'
  },
  {
    id: '9',
    title: 'Strict Confidentiality',
    icon: 'lock',
    content: 'Your data is safe with us. From exam papers to corporate reports, we guarantee 100% privacy and secure handling of sensitive documents.'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  { id: '1', name: 'Rahul Sharma', company: 'Indus Tech', designation: 'Marketing Head', content: 'GPP has been our reliable partner for over 2 years. Their attention to detail is unmatched.', avatarUrl: '/testimonials/avatar-1.jpg' },
  { id: '2', name: 'Anita Verma', company: 'Global Solutions', designation: 'CEO', content: 'The quality of the visiting cards and letterheads exceeded our expectations. Highly recommended!', avatarUrl: '/testimonials/avatar-2.jpg' },
  { id: '3', name: 'Vikram Singh', company: 'Style Mart', designation: 'Founder', content: 'Fast delivery and excellent customer support. They really understand our brand identity.', avatarUrl: '/testimonials/avatar-3.jpg' },
  { id: '4', name: 'Sanjay Gupta', company: 'Build-It Co', designation: 'Operations Manager', content: 'Professional and efficient. The offset printing quality is the best we have found in Patna.', avatarUrl: '/testimonials/avatar-4.jpg' },
  { id: '5', name: 'Priya Raj', company: 'Artisans Hub', designation: 'Creative Director', content: 'Their multi-color printing is sharp and vibrant. Truly brings our designs to life.', avatarUrl: '/testimonials/avatar-5.jpg' },
  { id: '6', name: 'Rajesh Kumar', company: 'Apex Logistics', designation: 'Supply Chain Head', content: "GPP's challan books and registers are of superior quality. Their printing is crisp and the binding is durable, which is essential for our daily operations. A truly professional service.", avatarUrl: '/testimonials/avatar-6.jpg' },
  { id: '7', name: 'Meera Desai', company: 'Bright Future Academy', designation: 'Principal', content: "We've been sourcing our student diaries and notebooks from Guru Printing Press for years. The quality is consistently high, and they always accommodate our custom design requirements flawlessly.", avatarUrl: '/testimonials/avatar-7.jpg' },
  { id: '8', name: 'Arjun Mehta', company: 'Zenith Pharma', designation: 'Procurement Manager', content: 'The precision required for pharmaceutical labels is immense, and GPP delivers every single time. Their adherence to our specifications and quality control is commendable.', avatarUrl: '/testimonials/avatar-8.jpg' },
  { id: '9', name: 'Sunita Reddy', company: 'Heritage Hotels', designation: 'General Manager', content: 'From menu cards to promotional standees, GPP has been our go-to partner. Their prints have a premium feel that aligns perfectly with our brand image. The team is professional and always meets deadlines.', avatarUrl: '/testimonials/avatar-9.jpg' },
  { id: '10', name: 'Karan Kapoor', company: 'FinEdge Capital', designation: 'Director', content: 'We entrusted GPP with our confidential financial reports and account opening forms. Their commitment to privacy and error-free production is why we continue to work with them.', avatarUrl: '/testimonials/avatar-10.jpg' },
  { id: '11', name: 'Fatima Khan', company: 'Elite Events', designation: 'Founder', content: 'The quality of their wedding and invitation cards is simply exquisite. The paper quality, the foiling, the finishing—everything is top-notch. They understand the importance of making a grand statement.', avatarUrl: '/testimonials/avatar-11.jpg' },
  { id: '12', name: 'David Roy', company: 'Innovate Labs', designation: 'R&D Head', content: "Their technical booklet and manual printing is precise. Clear diagrams and durable binding are crucial for us, and GPP has consistently met our high standards.", avatarUrl: '/testimonials/avatar-12.jpg' },
  { id: '13', name: 'Neha Singh', company: 'City Hospital', designation: 'Admin Head', content: 'Guru Printing Press handles all our prescription pads and patient files. Their reliability and the quality of their materials give us one less thing to worry about in a high-pressure environment.', avatarUrl: '/testimonials/avatar-13.jpg' },
  { id: '14', name: 'Alok Nath', company: 'Bihar State Co-op', designation: 'Secretary', content: 'For our annual reports and passbooks, we need a printer who is both reliable and understands official documentation standards. GPP has proven to be that partner.', avatarUrl: '/testimonials/avatar-14.jpg' },
  { id: '15', name: 'Ishan Trivedi', company: 'Constructex Infra', designation: 'Project Manager', content: "The large format banners and flex-with-frame signages are robust and weather-resistant. GPP's installation team is also very professional. Highly satisfied with their end-to-end service.", avatarUrl: '/testimonials/avatar-15.jpg' },
  { id: '16', name: 'Pooja Agarwal', company: 'RealValue Realtors', designation: 'Sales Director', content: 'Their brochures and flyers are a key part of our marketing. The colors are vibrant, and the paper quality is excellent, which helps us make a strong impression on potential clients.', avatarUrl: '/testimonials/avatar-16.jpg' },
  { id: '17', name: 'Sameer Joshi', company: 'Patna University', designation: 'Examination Controller', content: 'Confidentiality and accuracy are paramount for printing examination materials. GPP has handled our requirements with the utmost professionalism and security. We trust them completely.', avatarUrl: '/testimonials/avatar-17.jpg' },
  { id: '18', name: 'Anjali Menon', company: 'Krafted Jewels', designation: 'Brand Manager', content: "The custom product boxes and tags they created for us are exceptional. The print quality and structural integrity enhance our product's perceived value. A critical partner for our packaging needs.", avatarUrl: '/testimonials/avatar-18.jpg' },
  { id: '19', name: 'Rohan Verma', company: "Techie's Cafe", designation: 'Owner', content: "Got our menu cards and tabletop standees from GPP. The team was super helpful with the design, and the final product looks amazing! Our customers love the new menus.", avatarUrl: '/testimonials/avatar-19.jpg' },
  { id: '20', name: 'Sneha Patil', company: 'The Startup Hub', designation: 'Community Manager', content: 'We needed a bunch of promotional stuff—standees, canopy, ID cards—for our annual event, and GPP delivered everything on a tight deadline. They made the whole process so easy. Big thanks to the team!', avatarUrl: '/testimonials/avatar-20.jpg' },
  { id: '21', name: 'Aditya Rao', company: 'Digital Nomads Inc.', designation: 'HR Lead', content: 'The personalized notebooks and diaries for our new hires were a huge hit! Great quality and a really nice touch for our onboarding kits. The GPP team was a pleasure to work with.', avatarUrl: '/testimonials/avatar-21.jpg' },
  { id: '22', name: 'Preeti Jha', company: 'We-Plan-It', designation: 'Event Coordinator', content: "The invitation cards for our corporate gala were stunning. GPP's team suggested some great paper and finish options that we hadn't even thought of. They really know their stuff!", avatarUrl: '/testimonials/avatar-22.jpg' },
  { id: '23', name: 'Vivek Anand', company: 'FreshBites', designation: 'Marketing Lead', content: 'Our new packaging labels and wrapping paper look fantastic. The print is sharp, and the colors pop. The GPP team helped us get the branding just right. Awesome job!', avatarUrl: '/testimonials/avatar-23.jpg' },
  { id: '24', name: 'Divya Sharma', company: 'CodeCrafters', designation: 'Office Manager', content: 'We get all our office stationery—letterheads, envelopes, notepads—from GPP. The quality is always consistent, and reordering is a breeze. They make my job so much easier!', avatarUrl: '/testimonials/avatar-24.jpg' },
  { id: '25', name: 'Amit Singh', company: 'GearUp Motors', designation: 'Showroom Manager', content: "The brochures and posters for our new car launch were top-notch. The print quality really did justice to the vehicle's photos. The team at GPP is professional and very cooperative.", avatarUrl: '/testimonials/avatar-25.jpg' }
];

export const SERVICES: ServiceItem[] = [
  {
    id: 'offset',
    title: 'Offset Printing',
    subtitle: 'High-Volume Precision.',
    description: 'Engineered for consistency at scale. From routine production runs to large-format volumes, our offset infrastructure delivers sharp, uniform results.',
    options: ['Multicolor', 'Double Color', 'Single Color'],
    images: {
      'Heidelberg': '/serviceimage/service01/heidelberg.png',
      'Manroland': '/serviceimage/service01/manroland.png',
      'Dominant': '/serviceimage/service01/dominant.png',
      'Ryobi': '/serviceimage/service01/ryobi.png'
    },
    brands: ['Heidelberg', 'Manroland', 'Dominant', 'Ryobi']
  },
  {
    id: 'digital',
    title: 'Digital Printing',
    subtitle: 'Instant & Accurate.',
    description: 'Perfect for small batches and personalized prints. Our digital solutions offer quick turnaround without compromising on color fidelity.',
    options: ['Multicolor', 'Single Color', 'Quick Print'],
    images: {
      'Konica Minolta Accurio': '/serviceimage/service02/konica-minolta-accurio.png',
      'Xerox': '/serviceimage/service02/xerox.png'
    },
    brands: ['Konica Minolta Accurio', 'Xerox']
  },
  {
    id: 'flex-vinyl',
    title: 'Flex & Vinyl Printing',
    subtitle: 'Large Scale Visibility.',
    description: 'Capture attention from afar with our high-impact large format solutions. Whether it\'s durable outdoor signage or sleek indoor vinyl, we ensure your brand looms large with vibrant colors.',
    options: ['Multicolor', 'Flex', 'Eco-Vinyl', 'Sunboard', 'One Way Vision'],
    images: {
      'Allwin Konica 1024i': '/serviceimage/service03/allwin-konica-1024i.png',
      'Allwin C8-1024I Pro': '/serviceimage/service03/allwin-C8-1024i-pro.png',
      'MIMAGE M18S': '/serviceimage/service03/MIMAGE-M18S.png'
    },
    brands: ['Allwin Konica 1024i', 'Allwin C8-1024I Pro', 'MIMAGE M18S']
  },
  {
    id: 'screen',
    title: 'Screen Printing',
    subtitle: 'The Artisan\'s Touch.',
    description: 'For textures and depth that other methods can\'t reach. Our screen printing service provides rich, opaque ink coverage on a variety of substrates, perfect for specialized corporate gifts.',
    options: ['Single Color', 'Double Color', 'Tri Color', 'Four Color'],
    images: {
      '4-Color Manual Screen': '/serviceimage/service04/4-color-manual-screen.png',
      '1-Color Manual Screen': '/serviceimage/service04/1-color-manual-screen.png'
    },
    brands: ['4-Color Manual Screen', '1-Color Manual Screen']
  },
  {
    id: 'designing',
    title: 'Designing',
    subtitle: 'From Concept to Canvas.',
    description: 'A great print starts with a great file. Our design studio bridges the gap between your vision and technical print requirements, ensuring every curve and color is optimized for production.',
    options: ['Brand Design', 'Visual Design', 'Print Design'],
    images: {
      'Illustrator': '/serviceimage/service05/illustrator.png',
      'Photoshop': '/serviceimage/service05/photoshop.png',
      'Coreldraw': '/serviceimage/service05/coreldraw.png',
      'Web Design': '/serviceimage/service05/webdesign.png'
    },
    brands: ['Illustrator', 'Photoshop', 'Coreldraw', 'Web Design']
  }
];
