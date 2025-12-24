
import { Product, ServiceItem, Testimonial, WhyChooseUsCard } from './types';

export const PRODUCTS: Product[] = [
  // Calendars & Diaries
  {
    id: 'student-diaries',
    name: 'Student Diaries',
    category: 'Calendars & Diaries',
    description: 'Customized school diaries with academic calendars, rule pages, and student info sections.',
    features: ['Hardbound / Spiral', 'Custom Cover Design', 'Internal Branding Pages'],
    imageUrl: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'wall-calendars',
    name: 'Wall Calendars',
    category: 'Calendars & Diaries',
    description: 'Large-format high-quality wall calendars available in multi-sheet or single-sheet formats.',
    features: ['Gloss/Matte Lamination', 'Wire-O Binding', 'Premium 170-300 GSM Paper'],
    imageUrl: 'https://images.unsplash.com/photo-1506784919141-10bc28236d97?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'table-calendars',
    name: 'Table Calendars',
    category: 'Calendars & Diaries',
    description: 'Compact desktop calendars with sturdy stands, perfect for corporate gifting.',
    features: ['Tent Stand Support', 'UV Coated Sheets', 'Custom Monthly Imagery'],
    imageUrl: 'https://images.unsplash.com/photo-1586281380117-5a60ae2050cc?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'diaries-planners',
    name: 'Diaries / Planners',
    category: 'Calendars & Diaries',
    description: 'Executive leatherette or hardcase planners with daily/weekly scheduling layouts.',
    features: ['Foiling/Embossing', 'Magnetic Closure', 'Quality Maplitho Paper'],
    imageUrl: 'https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&q=80&w=800'
  },

  // Business Stationery
  {
    id: 'v-cards',
    name: 'Visiting Cards',
    category: 'Business Stationery',
    description: 'Premium quality business cards that make a lasting first impression.',
    features: ['Velvet / Silk Finish', 'Raised Spot UV', 'Rounded Corners'],
    imageUrl: 'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'letterheads',
    name: 'Letterheads',
    category: 'Business Stationery',
    description: 'Professional letterheads designed to represent your brand identity officially.',
    features: ['Executive Bond Paper', 'Standard A4 Size', 'Laser/Inkjet Compatible'],
    imageUrl: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'envelopes',
    name: 'Envelopes',
    category: 'Business Stationery',
    description: 'Branded envelopes in all standard sizes from 9.5x4.5 to A4 L-folders.',
    features: ['Self-Seal Strip', 'Window / Plain', 'Custom Color Matching'],
    imageUrl: 'https://images.unsplash.com/photo-1595079676339-1534802ad6cf?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'file-folders',
    name: 'File Folders',
    category: 'Business Stationery',
    description: 'Durable corporate folders for document organization and presentation.',
    features: ['Die-Cut Pockets', 'Gloss Lamination', 'Card Slot Inclusion'],
    imageUrl: 'https://images.unsplash.com/photo-1586075010620-2d5218955bf7?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'notepads',
    name: 'Notepads',
    category: 'Business Stationery',
    description: 'Customized desk pads for internal notes or client takeaways.',
    features: ['Glued/Spiral Top', 'Branded Footers', '50/100 Sheet Pads'],
    imageUrl: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'id-cards',
    name: 'ID Cards',
    category: 'Business Stationery',
    description: 'PVC employee or student ID cards with high-definition thermal printing.',
    features: ['Dual-Sided Printing', 'Lanyard Compatible', 'RFID/Chip Options'],
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'certificates',
    name: 'Certificates',
    category: 'Business Stationery',
    description: 'High-quality achievement awards with security patterns and holographic foils.',
    features: ['Textured Cardstock', 'Gold/Silver Foiling', 'Variable Data Printing'],
    imageUrl: 'https://images.unsplash.com/photo-1589330694653-ded6df03f754?auto=format&fit=crop&q=80&w=800'
  },

  // Institutional Essentials
  {
    id: 'school-notebooks',
    name: 'School Notebooks',
    category: 'Institutional Essentials',
    description: 'Mass-produced student notebooks with brand-specific cover art.',
    features: ['Sturdy Center Stitch', 'White Paper 60 GSM+', 'Glossy Board Covers'],
    imageUrl: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'medical-file-folder',
    name: 'Medical File Folder',
    category: 'Institutional Essentials',
    description: 'Specialized patient folders with multiple partitions for clinical records.',
    features: ['Laminated Durability', 'Prescription Slots', 'Internal Clip Systems'],
    imageUrl: 'https://images.unsplash.com/photo-1584432810601-6c7f27d2362b?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'passbooks',
    name: 'Passbooks',
    category: 'Institutional Essentials',
    description: 'Financial record books for banks, NGOs, and microfinance institutions.',
    features: ['Hardbound Covers', 'Security Threading', 'Numbered Pages'],
    imageUrl: 'https://images.unsplash.com/photo-1518458028785-8fbcd101deb9?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'library-cards',
    name: 'Library Cards',
    category: 'Institutional Essentials',
    description: 'Borrower cards with barcode integration and tracking sections.',
    features: ['Barcode Ready', 'Signature Strip', 'Durable Cardstock'],
    imageUrl: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'gate-pass',
    name: 'Gate Pass / Parking Pass',
    category: 'Institutional Essentials',
    description: 'Secure entry and exit pads for industrial or residential management.',
    features: ['Sequential Numbering', 'Counterfoil Attachments', 'Quick-Tear Perforation'],
    imageUrl: 'https://images.unsplash.com/photo-1517420980554-3e91d848123d?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'event-tickets',
    name: 'Event Tickets',
    category: 'Institutional Essentials',
    description: 'Concert, workshop, or seminar tickets with security features.',
    features: ['Hologram Stickers', 'Perforated Stubs', 'Serialized Entry'],
    imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800'
  },

  // Books, Pads & Registers
  {
    id: 'receipt-books',
    name: 'Receipt Books',
    category: 'Books, Pads & Registers',
    description: 'Duplicate or triplicate billing books with high-quality carbonless paper.',
    features: ['NCR (No Carbon Required)', 'Perforated Sheets', 'Numbered Series'],
    imageUrl: 'https://images.unsplash.com/photo-1554224155-1696413575b3?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'bill-invoice-books',
    name: 'Bill / Invoice Books',
    category: 'Books, Pads & Registers',
    description: 'Official VAT/GST compliant invoice books for business transactions.',
    features: ['Triplicate Options', 'Brand Logo Header', 'Secure Binding'],
    imageUrl: 'https://images.unsplash.com/photo-1586486855514-8c633cc6fd38?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'quotation-pads',
    name: 'Quotation / Estimate Pads',
    category: 'Books, Pads & Registers',
    description: 'Professional pads for generating on-the-spot client quotes.',
    features: ['Standard A4/A5 Sizes', 'Color Coded Copies', 'Binding / Gluing'],
    imageUrl: 'https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'challan-books',
    name: 'Challan Books',
    category: 'Books, Pads & Registers',
    description: 'Inventory delivery and transport challans for logistics management.',
    features: ['Industrial Grade NCR', 'Multiple Copy Sets', 'Bold Numbering'],
    imageUrl: 'https://images.unsplash.com/photo-1566131444458-96359f972b9a?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'registers',
    name: 'Registers',
    category: 'Books, Pads & Registers',
    description: 'Heavy-duty attendance, visitor, or stock registers for long-term use.',
    features: ['Hardbound Cloth Cover', 'Faint-Line Rule', 'High GSM Durability'],
    imageUrl: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'prescription-pads',
    name: 'Prescription Pads',
    category: 'Books, Pads & Registers',
    description: 'Doctor-specific pads with clinical branding and medical symbols.',
    features: ['Executive Bond Paper', 'Tear-Off Efficiency', 'Standard A5 Format'],
    imageUrl: 'https://images.unsplash.com/photo-1584432810601-6c7f27d2362b?auto=format&fit=crop&q=80&w=800'
  },

  // Marketing & Promotional Prints
  {
    id: 'pamphlets-flyers',
    name: 'Pamphlets / Flyers',
    category: 'Marketing & Promotional Prints',
    description: 'Mass distribution leaflets for widespread marketing reach.',
    features: ['Vibrant Offset Color', 'Art Paper / Maplitho', 'Bulk Run Efficiency'],
    imageUrl: 'https://images.unsplash.com/photo-1560067174-c5a3a8f37060?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'brochures-catalogs',
    name: 'Brochures / Catalogs',
    category: 'Marketing & Promotional Prints',
    description: 'Detailed multi-fold brochures and product catalogs for deep-dive info.',
    features: ['Bi-fold / Tri-fold', 'Stapled / Glued Binding', 'Premium Coating'],
    imageUrl: 'https://images.unsplash.com/photo-1586075010620-2d5218955bf7?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'posters',
    name: 'Posters',
    category: 'Marketing & Promotional Prints',
    description: 'Eye-catching wall posters for announcements and events.',
    features: ['A3 / A2 / A1 Sizes', 'Weather Resistant Coating', 'High Resolution Detail'],
    imageUrl: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'danglers',
    name: 'Danglers',
    category: 'Marketing & Promotional Prints',
    description: 'Ceiling-hung marketing tools to draw attention in retail spaces.',
    features: ['Die-Cut Shapes', 'Double Sided Printing', 'Eyelet Included'],
    imageUrl: 'https://images.unsplash.com/photo-1607083206968-13611e3d76db?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'leaflets',
    name: 'Leaflets',
    category: 'Marketing & Promotional Prints',
    description: 'Small, informative handouts for quick service or product summaries.',
    features: ['Double Sided Offset', 'Textured Paper Choice', 'Custom Folding'],
    imageUrl: 'https://images.unsplash.com/photo-1595079676339-1534802ad6cf?auto=format&fit=crop&q=80&w=800'
  },

  // Large Format & Display
  {
    id: 'banners-flex',
    name: 'Banners/Flex',
    category: 'Large Format & Display',
    description: 'Durable outdoor flex banners for long-distance visibility.',
    features: ['UV Resistant Inks', 'Iron Eyelets', 'Standard / Star Flex'],
    imageUrl: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'flex-with-frame',
    name: 'Flex with Frame',
    category: 'Large Format & Display',
    description: 'Rigid outdoor displays with reinforced metal frames.',
    features: ['Heavy Duty MS Frame', 'Tension-Stretched Flex', 'Weather Proofing'],
    imageUrl: 'https://images.unsplash.com/photo-1517420980554-3e91d848123d?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'vinyl-sunboard',
    name: 'Vinyl & Sunboard',
    category: 'Large Format & Display',
    description: 'High-definition vinyl printing pasted on rigid sunboard for sleek displays.',
    features: ['3mm / 5mm Board', 'Eco-Solvent Print', 'Smooth Matte Finish'],
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'one-way-vision',
    name: 'One Way Vision',
    category: 'Large Format & Display',
    description: 'Perforated window film that allows visibility from inside but shows graphics outside.',
    features: ['Micro-Perforation', 'Sun Protection', 'Glass Compatible'],
    imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'canopy',
    name: 'Canopy',
    category: 'Large Format & Display',
    description: 'Portable promotional tents for outdoor marketing activations.',
    features: ['Foldable Aluminum Frame', 'Branded Roof & Walls', 'Carry Bag Included'],
    imageUrl: 'https://images.unsplash.com/photo-1566131444458-96359f972b9a?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'standees',
    name: 'Standees (Roll-up / X-Stand)',
    category: 'Large Format & Display',
    description: 'Lightweight portable displays for exhibitions and lobby branding.',
    features: ['High-Quality Star Flex', 'Aluminum Roll-up Base', 'Instant Assembly'],
    imageUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800'
  },

  // Labels, Stickers & Tags
  {
    id: 'stickers',
    name: 'Stickers',
    category: 'Labels, Stickers & Tags',
    description: 'Self-adhesive graphics for multipurpose branding and decoration.',
    features: ['Die-Cut Sizing', 'Gloss / Transparent', 'Strong Adhesion'],
    imageUrl: 'https://images.unsplash.com/photo-1589330694653-ded6df03f754?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'labels',
    name: 'Labels',
    category: 'Labels, Stickers & Tags',
    description: 'Product labels for FMCG, electronics, or industrial items.',
    features: ['Water Resistant', 'Barcode Ready', 'Roll or Sheet Form'],
    imageUrl: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'medicine-labels',
    name: 'Medicine Labels',
    category: 'Labels, Stickers & Tags',
    description: 'Secure and clear labels for pharmaceutical bottles and packaging.',
    features: ['Non-Toxic Inks', 'Cold Resistance', 'Fine Print Clarity'],
    imageUrl: 'https://images.unsplash.com/photo-1584017947486-62e0d18bc355?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'file-tags',
    name: 'File Tags',
    category: 'Labels, Stickers & Tags',
    description: 'Identificaton tags for corporate and government filing systems.',
    features: ['Cardboard Reinforced', 'Eyelet Reinforcement', 'Standard 1-2" Widths'],
    imageUrl: 'https://images.unsplash.com/photo-1586075010620-2d5218955bf7?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'product-tags',
    name: 'Product / Event Tags',
    category: 'Labels, Stickers & Tags',
    description: 'Price tags or event badges with premium feel and punch holes.',
    features: ['Heavy Cardstock', 'UV Coating', 'Thread / Loop Support'],
    imageUrl: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&q=80&w=800'
  },

  // Forms & Official Documents
  {
    id: 'admission-forms',
    name: 'Admission Forms',
    category: 'Forms & Official Documents',
    description: 'Detailed school or college enrollment forms with tracking ID sections.',
    features: ['Perforated Receipt', 'Standard A3/A4 Folding', 'Fine Writing Paper'],
    imageUrl: 'https://images.unsplash.com/photo-1586486855514-8c633cc6fd38?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'account-opening-forms',
    name: 'Account Opening Forms',
    category: 'Forms & Official Documents',
    description: 'Multi-page banking and financial institution onboarding forms.',
    features: ['NCR Sheets Available', 'Booklet Style', 'Confidential Patterning'],
    imageUrl: 'https://images.unsplash.com/photo-1554224155-1696413575b3?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'loan-application-forms',
    name: 'Loan Application Forms',
    category: 'Forms & Official Documents',
    description: 'Official application documents for microfinance and lending groups.',
    features: ['Checklist Pages', 'Declaration Sections', 'Durable Binding'],
    imageUrl: 'https://images.unsplash.com/photo-1554224155-1696413575b3?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'kyc-forms',
    name: 'KYC / Consent Forms',
    category: 'Forms & Official Documents',
    description: 'Standardized forms for identity verification and user consent.',
    features: ['Photo Space Box', 'Clear Legal Text', 'Single Page Efficient'],
    imageUrl: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'opd-ipd-forms',
    name: 'OPD / IPD Forms',
    category: 'Forms & Official Documents',
    description: 'Medical intake and patient management forms for hospitals.',
    features: ['Case File History', 'Clinical Graphing', 'Duplicate Record'],
    imageUrl: 'https://images.unsplash.com/photo-1584432810601-6c7f27d2362b?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'nomination-forms',
    name: 'Nomination / Declaration Forms',
    category: 'Forms & Official Documents',
    description: 'Official legal declaration forms for corporate or organizational use.',
    features: ['Stamp Compatible', 'Witness Sections', 'Clean Typography'],
    imageUrl: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=800'
  },

  // Packaging & Carry Solutions
  {
    id: 'printed-carry-bags',
    name: 'Custom Printed Carry Bags',
    category: 'Packaging & Carry Solutions',
    description: 'Branded paper or eco-friendly bags for retail and exhibitions.',
    features: ['Rope Handles', 'Vibrant Graphics', 'Gloss / Matte Foil'],
    imageUrl: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'packaging-boxes',
    name: 'Packaging Boxes',
    category: 'Packaging & Carry Solutions',
    description: 'Customized corrugated or rigid boxes for products and gifting.',
    features: ['Product Specific Fit', 'Internal Cushioning', 'Spot UV Logos'],
    imageUrl: 'https://images.unsplash.com/photo-1607083206968-13611e3d76db?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'med-doc-envelopes',
    name: 'Medicine / Document Envelopes',
    category: 'Packaging & Carry Solutions',
    description: 'Secure envelopes specifically designed for small pharmaceutical items or thin files.',
    features: ['Tamper Proof Seal', 'Industrial GSM Paper', 'Branded Exterior'],
    imageUrl: 'https://images.unsplash.com/photo-1595079676339-1534802ad6cf?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'stationery-bags',
    name: 'Stationery Bags',
    category: 'Packaging & Carry Solutions',
    description: 'Small branded pouches for pens, pencils, and other stationery sets.',
    features: ['Translucent / Opaque', 'Zip Lock Options', 'Student Friendly'],
    imageUrl: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?auto=format&fit=crop&q=80&w=800'
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
  { id: '1', name: 'Rahul Sharma', company: 'Indus Tech', designation: 'Marketing Head', content: 'GPP has been our reliable partner for over 2 years. Their attention to detail is unmatched.' },
  { id: '2', name: 'Anita Verma', company: 'Global Solutions', designation: 'CEO', content: 'The quality of the visiting cards and letterheads exceeded our expectations. Highly recommended!' },
  { id: '3', name: 'Vikram Singh', company: 'Style Mart', designation: 'Founder', content: 'Fast delivery and excellent customer support. They really understand our brand identity.' },
  { id: '4', name: 'Sanjay Gupta', company: 'Build-It Co', designation: 'Operations Manager', content: 'Professional and efficient. The offset printing quality is the best we have found in Patna.' },
  { id: '5', name: 'Priya Raj', company: 'Artisans Hub', designation: 'Creative Director', content: 'Their multi-color printing is sharp and vibrant. Truly brings our designs to life.' }
];

export const SERVICES: ServiceItem[] = [
  {
    id: 'offset',
    title: 'Offset Printing',
    subtitle: 'High-Volume Precision.',
    description: 'Engineered for consistency at scale. From routine production runs to large-format volumes, our offset infrastructure delivers sharp, uniform results.',
    options: ['Multicolor', 'Double Color', 'Single Color'],
    images: {
      'Heidelberg': 'https://images.unsplash.com/photo-1517420980554-3e91d848123d?auto=format&fit=crop&q=80&w=1000',
      'Manroland': 'https://images.unsplash.com/photo-1598501479159-408f652d536a?auto=format&fit=crop&q=80&w=1000',
      'Dominant': 'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&q=80&w=1000',
      'Ryobi': 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=1000'
    },
    brands: ['Heidelberg', 'Manroland', 'Dominant', 'Ryobi']
  },
  {
    id: 'digital',
    title: 'Digital Printing',
    subtitle: 'Instant & Accurate.',
    description: 'Perfect for small batches and personalized prints. Our digital solutions offer quick turnaround without compromising on color fidelity.',
    options: ['Multicolor', 'Quick Print'],
    images: {
      'Konica Minolta Accurio': 'https://images.unsplash.com/photo-1562654501-a0ccc0af3fb1?auto=format&fit=crop&q=80&w=1000',
      'Xerox': 'https://images.unsplash.com/photo-1572044162444-ad60f128bde2?auto=format&fit=crop&q=80&w=1000'
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
      'Allwin Konica 1024i': 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=1000',
      'Allwin C8-1024I Pro': 'https://images.unsplash.com/photo-1517420980554-3e91d848123d?auto=format&fit=crop&q=80&w=1000',
      'MIMAGE M18S': 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1000'
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
      '4-Color Manual Screen': 'https://images.unsplash.com/photo-1607083206968-13611e3d76db?auto=format&fit=crop&q=80&w=1000',
      '1-Color Manual Screen': 'https://images.unsplash.com/photo-1589939705384-5185138a04b9?auto=format&fit=crop&q=80&w=1000'
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
      'Illustrator': 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=1000',
      'Photoshop': 'https://images.unsplash.com/photo-1562654501-a0ccc0af3fb1?auto=format&fit=crop&q=80&w=1000',
      'Coreldraw': 'https://images.unsplash.com/photo-1586075010620-2d5218955bf7?auto=format&fit=crop&q=80&w=1000'
    },
    brands: ['Illustrator', 'Photoshop', 'Coreldraw']
  }
];
