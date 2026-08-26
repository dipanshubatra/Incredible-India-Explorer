/**
 * Heritage Crafts Explorer — Interactive Module
 * Explores India's rich traditional handicrafts with search, filtering,
 * sorting, detail modals, artisan spotlights, and regional distribution.
 */

(function () {
    'use strict';

    /* ======================================================================
       CRAFT DATA — 25 Traditional Indian Handicrafts
       ====================================================================== */
    const CRAFTS = [
        {
            id: 'banarasi-silk',
            name: 'Banarasi Silk Weaving',
            state: 'Uttar Pradesh',
            category: 'textiles',
            icon: '🧶',
            shortDesc: 'Lustrous silk fabrics woven with intricate gold and silver brocade, zari, and fine silk, dating back over 2,000 years.',
            description: 'Banarasi silk is one of the finest and most celebrated textiles in India. Originating from the holy city of Varanasi, these fabrics are renowned for their opulence, intricate brocade work, and the use of real gold and silver zari threads. The art of Banarasi weaving has been passed down through generations of master weavers, with some designs taking months to complete on traditional handlooms. Each piece features elaborate patterns inspired by Mughal art — floral motifs, paisleys, and intricate jaal (net) designs.',
            materials: ['Pure Silk', 'Gold Zari', 'Silver Zari'],
            techniques: ['Handloom Weaving', 'Brocade', 'Jacquard'],
            historicalSignificance: 'Mentioned in ancient Hindu scriptures and Buddhist texts, Banarasi silk has been prized since the Gupta Empire. During the Mughal era, weavers were invited to Varanasi, infusing Persian motifs into the craft.',
            modernRelevance: 'Banarasi sarees remain essential in Indian weddings and are a symbol of luxury. The GI-tagged craft supports over 100,000 weaver families.',
            difficulty: 'Master',
            ageEstimate: '2000+ years'
        },
        {
            id: 'madhubani-painting',
            name: 'Madhubani Painting',
            state: 'Bihar',
            category: 'painting',
            icon: '🎨',
            shortDesc: 'A mesmerizing folk art form featuring vibrant colors and geometric patterns depicting mythology and nature.',
            description: 'Madhubani painting, also known as Mithila painting, originated in the Mithila region of Bihar. This captivating art form is characterized by its use of vivid natural colors, geometric patterns, and bold outlines. Traditionally created by women of the region, these paintings depict scenes from Hindu mythology, nature, and daily village life. The style is distinguished by its flat, two-dimensional appearance and the absence of empty spaces — every inch is filled with intricate patterns, fish, birds, flowers, and geometric borders.',
            materials: ['Natural Pigments', 'Rice Paste', 'Cow Dung', 'Leaf Juice'],
            techniques: ['Finger Painting', 'Twig Drawing', 'Brush Work'],
            historicalSignificance: 'Legend traces Madhubani art to the time of King Janak, who commissioned artists to paint the wedding of Sita and Ram. The art form gained international recognition in 1934 when a British colonial officer discovered it during an earthquake survey.',
            modernRelevance: 'Today, Madhubani art has transcended canvas onto textiles, stationery, and murals, providing livelihoods to thousands of women artisans.',
            difficulty: 'Intermediate',
            ageEstimate: '2500+ years'
        },
        {
            id: 'pattachitra',
            name: 'Pattachitra',
            state: 'Odisha',
            category: 'painting',
            icon: '🖼️',
            shortDesc: 'Intricate scroll paintings from Odisha depicting mythological narratives with natural pigments on treated cloth.',
            description: 'Pattachitra is a centuries-old cloth-based scroll painting tradition from Odisha, renowned for its intricate details, bold outlines, and vibrant use of natural colors. These paintings primarily depict stories from Hindu mythology, particularly the tales of Lord Jagannath, and are closely associated with the Jagannath Temple in Puri. The paintings are created on specially prepared canvas made by applying a mixture of chalk and gum made from tamarind seeds, giving the surface a smooth, leathery finish.',
            materials: ['Cotton Canvas', 'Natural Pigments', 'Gum Arabic', 'Chalk'],
            techniques: ['Scroll Painting', 'Freehand Drawing', 'Natural Color Preparation'],
            historicalSignificance: 'Pattachitra painting tradition dates back to the 12th century and is deeply intertwined with the Jagannath Temple culture. The annual Rath Yatra festival uses Pattachitra-style decorations.',
            modernRelevance: 'Adapted into saris, wall hangings, and modern art, Pattachitra maintains its traditional identity while finding new markets globally.',
            difficulty: 'Advanced',
            ageEstimate: '1000+ years'
        },
        {
            id: 'blue-pottery',
            name: 'Blue Pottery',
            state: 'Rajasthan',
            category: 'pottery',
            icon: '🏺',
            shortDesc: 'Elegant turquoise-glazed pottery using quartz and multani mitti, a Mughal-era craft of Jaipur.',
            description: 'Blue Pottery is a distinctive craft of Jaipur, Rajasthan, known for its stunning turquoise-blue glaze and Persian-inspired floral motifs. Unlike traditional pottery, Blue Pottery is not made from clay but from a special dough of quartz stone powder (quartzite), Multani mitti (Fuller\'s earth), gum, and water. The pieces are shaped, dried, glazed, and then fired at low temperatures. The cobalt oxide in the glaze produces the characteristic blue hue, while other metal oxides create green and yellow accents.',
            materials: ['Quartz Powder', 'Multani Mitti', 'Cobalt Oxide', 'Gum'],
            techniques: ['Dough Molding', 'Glazing', 'Low-Temperature Firing'],
            historicalSignificance: 'Introduced to Jaipur in the 14th century by Persian artisans along the Silk Route, this craft was patronized by the Mughal courts and later by the Rajput rulers of Jaipur.',
            modernRelevance: 'Jaipur Blue Pottery holds a GI tag and is one of the most popular souvenirs from Rajasthan, with products ranging from tiles to decorative plates.',
            difficulty: 'Intermediate',
            ageEstimate: '600+ years'
        },
        {
            id: 'chikankari',
            name: 'Chikankari Embroidery',
            state: 'Uttar Pradesh',
            category: 'textiles',
            icon: '🪡',
            shortDesc: 'Delicate white-on-white shadow work embroidery from Lucknow, a refined Mughal-era needlecraft.',
            description: 'Chikankari is a refined form of white-on-white embroidery originating from Lucknow, Uttar Pradesh. This exquisite needlecraft involves creating delicate, intricate patterns on fine muslin, cotton, or silk fabrics using white thread. The art features 36 distinct stitch types, including tepchi (running stitch), hool (eyelet), and murri (French knot). The result is an elegant, ethereal fabric that appears almost lace-like, with shadows created by the raised stitch work playing against the translucent base fabric.',
            materials: ['White Thread', 'Muslin', 'Fine Cotton', 'Silk'],
            techniques: ['Shadow Work', 'Eyelet Stitches', 'French Knots', 'Running Stitch'],
            historicalSignificance: 'Legend attributes Chikankari to Noor Jahan, wife of Mughal Emperor Jahangir, who was inspired by a carved jali screen. The craft flourished under Mughal patronage in the courts of Awadh.',
            modernRelevance: 'Chikankari is now a global fashion favorite, featured on couture runways and adapted into contemporary silhouettes while maintaining its traditional elegance.',
            difficulty: 'Advanced',
            ageEstimate: '400+ years'
        },
        {
            id: 'kondapalli-toys',
            name: 'Kondapalli Toys',
            state: 'Andhra Pradesh',
            category: 'woodwork',
            icon: '🪆',
            shortDesc: 'Hand-carved softwood toys depicting mythological characters, animals, and rural scenes from Andhra Pradesh.',
            description: 'Kondapalli toys are a traditional toy-making craft from the town of Kondapalli in Andhra Pradesh. These charming toys are hand-carved from soft Tella Poniki wood (softwood) and painted with vibrant, natural colors. The craft produces an extensive range of items including mythological figures, animals, bullock carts, village scenes, and palace sets. Each toy is carved from a single block of wood, assembled with a natural adhesive made from tamarind seed paste, and finished with eco-friendly paints.',
            materials: ['Tella Poniki Wood', 'Natural Adhesive', 'Enamel Paint', 'Lac'],
            techniques: ['Block Carving', 'Assembly', 'Natural Adhesive Binding', 'Hand Painting'],
            historicalSignificance: 'Dating back to the 3rd century CE, Kondapalli toys were originally created as children\'s play items but evolved into decorative art pieces under the patronage of Vijayanagara rulers.',
            modernRelevance: 'GI-tagged since 2017, Kondapalli toys are popular collector\'s items and are now exported worldwide, preserving a craft that once faced extinction.',
            difficulty: 'Intermediate',
            ageEstimate: '1700+ years'
        },
        {
            id: 'bidri-ware',
            name: 'Bidri Ware',
            state: 'Karnataka',
            category: 'metalwork',
            icon: '⚗️',
            shortDesc: 'Zinc alloy metalware with intricate silver inlay, a striking black-and-silver craft from Bidar.',
            description: 'Bidri Ware is a stunning metal craft from Bidar, Karnataka, featuring a distinctive matte black surface with gleaming silver inlay patterns. The craft uses an alloy of zinc and copper, which is cast into various forms — hookah bases, vases, jewelry boxes, and decorative plates. The surface is then engraved with intricate geometric, floral, or calligraphic designs, into which pure silver wire is hammered. The piece is then treated with a special soil paste from Bidar Fort (containing potassium nitrate) that turns the zinc alloy black while leaving the silver inlay bright.',
            materials: ['Zinc', 'Copper', 'Pure Silver', 'Bidar Soil'],
            techniques: ['Casting', 'Silver Inlay', 'Soil Oxidation', 'Hand Engraving'],
            historicalSignificance: 'Developed in the 14th century during the Bahamani Sultanate, Bidri Ware is said to have been created by artisan Abdul Rahman Khilji, who adapted Persian metalwork traditions.',
            modernRelevance: 'GI-tagged Bidri Ware continues to be produced in Bidar, with products ranging from traditional vessels to modern jewelry and home décor.',
            difficulty: 'Master',
            ageEstimate: '700+ years'
        },
        {
            id: 'kundan-jewelry',
            name: 'Kundan Jewelry',
            state: 'Rajasthan',
            category: 'jewelry',
            icon: '💍',
            shortDesc: 'Opulent gemstone jewelry set in gold foil, a royal Rajasthani craft synonymous with bridal elegance.',
            description: 'Kundan jewelry is one of the oldest and most exquisite forms of jewelry making in India, originating from Rajasthan. This technique involves setting uncut diamonds (polki) and precious stones in highly refined gold foil (kundan). The stones are placed into the gold framework and then pressed gently with a special tool, securing them in place without prongs or claws. The reverse side is often decorated with intricate meenakari (enamel work), creating a stunning dual-sided piece. Kundan sets include elaborate necklace sets, maang tikka, bangles, and earrings.',
            materials: ['Uncut Diamonds', 'Gold Foil', 'Precious Stones', 'Lac'],
            techniques: ['Stone Setting in Gold Foil', 'Meenakari', 'Lac Backing', 'Thermal Bonding'],
            historicalSignificance: 'Kundan jewelry dates back to the Mughal era and the royal courts of Rajasthan. It was the preferred jewelry style of queens and nobility, symbolizing supreme luxury.',
            modernRelevance: 'Kundan remains the quintessential Indian bridal jewelry, with contemporary designers creating fusion pieces that blend traditional techniques with modern aesthetics.',
            difficulty: 'Master',
            ageEstimate: '500+ years'
        },
        {
            id: 'channapatna-toys',
            name: 'Channapatna Toys',
            state: 'Karnataka',
            category: 'woodwork',
            icon: '🎡',
            shortDesc: 'Colorful lacquered wooden toys and dolls from Karnataka, crafted with non-toxic vegetable dyes.',
            description: 'Channapatna toys are a vibrant toy-making tradition from the town of Channapatna in Karnataka. These delightful wooden toys are crafted from Ivory Wood (Aale mara) and finished with a natural lacquer coating using vegetable dyes. The lathe-turned toys come in bright, cheerful colors and include spinning tops, puzzles, dolls, animals, and educational toys. The lacquering process gives them a smooth, glossy finish that is completely non-toxic and safe for children.',
            materials: ['Ivory Wood', 'Natural Lacquer', 'Vegetable Dyes', 'Gum'],
            techniques: ['Lathe Turning', 'Lacquering', 'Hand Polishing', 'Natural Dye Application'],
            historicalSignificance: 'The craft is believed to have been introduced during the reign of Tipu Sultan, who brought artisans from Persia. Over centuries, local artisans evolved the craft into its current form.',
            modernRelevance: 'GI-tagged Channapatna toys are now marketed as eco-friendly alternatives to plastic toys, gaining popularity among environmentally conscious parents worldwide.',
            difficulty: 'Intermediate',
            ageEstimate: '200+ years'
        },
        {
            id: 'phulkari',
            name: 'Phulkari Embroidery',
            state: 'Punjab',
            category: 'textiles',
            icon: '🌸',
            shortDesc: 'Vibrant floral embroidery from Punjab, traditionally created by women on handspun coarse cotton.',
            description: 'Phulkari, meaning "flower work," is a spectacular form of embroidery from Punjab that transforms plain handspun cotton (khaddar) into dazzling textile art. Using untwisted floss silk thread (pat) in vivid colors, women create dense, vibrant floral patterns that cover the entire fabric surface. The embroidery is worked from the reverse side of the fabric using a darning stitch, creating a satin-like sheen on the front. The most prized form, Bagh (garden), has embroidery so dense that the base fabric is entirely hidden.',
            materials: ['Pat Silk Thread', 'Khaddar Cotton', 'Natural Dyes'],
            techniques: ['Darning Stitch', 'Reverse Embroidery', 'Bagh Pattern', 'Sari Pattern'],
            historicalSignificance: 'Phulkari was traditionally created by women of Punjab as part of their dowry, with each piece taking months or even years. It was considered essential for a bride\'s trousseau.',
            modernRelevance: 'Now adapted into shawls, jackets, bags, and home décor, Phulkari continues to be a celebrated symbol of Punjabi cultural identity.',
            difficulty: 'Intermediate',
            ageEstimate: '500+ years'
        },
        {
            id: 'kashmiri-papier-mache',
            name: 'Kashmiri Papier-mâché',
            state: 'Jammu & Kashmir',
            category: 'paper',
            icon: '🎭',
            shortDesc: 'Exquisitely decorated papier-mâché items from Kashmir with intricate hand-painted Naqash patterns.',
            description: 'Kashmiri Papier-mâché (known locally as "Sanzashi") is a refined decorative art involving sculpting items from paper pulp and then meticulously hand-painting them with elaborate floral and geometric patterns. The process begins with soaking waste paper, molding it into desired shapes (boxes, vases, bowls, ornaments), and then applying layers of priming coats. Once dry, skilled artisans called "Naqash" paint intricate designs using fine brushes made from squirrel hair, employing a rich palette of colors with gold leaf accents.',
            materials: ['Paper Pulp', 'Glue', 'Gesso', 'Natural Colors', 'Gold Leaf'],
            techniques: ['Paper Pulp Molding', 'Gesso Priming', 'Naqashi Painting', 'Gold Leaf Application'],
            historicalSignificance: 'Introduced to Kashmir in the 14th century by the Sufi saint Mir Sayyed Ali Hamadani, who brought artisans from Persia. The craft flourished under Mughal patronage.',
            modernRelevance: 'GI-tagged Kashmiri Papier-mâché continues to be a prized art form, with products ranging from traditional to contemporary designs.',
            difficulty: 'Master',
            ageEstimate: '600+ years'
        },
        {
            id: 'stone-jali',
            name: 'Stone Jali Carving',
            state: 'Rajasthan',
            category: 'stone',
            icon: '🏰',
            shortDesc: 'Intricate latticed stone screens carved from marble and sandstone, an architectural marvel of Rajasthani craftsmen.',
            description: 'Stone Jali is an extraordinary architectural craft of Rajasthan involving the carving of intricate latticed screens from marble or sandstone. These screens feature elaborate geometric and floral patterns, allowing light and air to pass through while maintaining privacy. The craft requires extraordinary precision, as the artisan must carve through solid stone to create delicate, lace-like patterns. Each Jali screen can take months to complete, with master carvers using only hand tools passed down through generations.',
            materials: ['White Marble', 'Red Sandstone', 'Soapstone'],
            techniques: ['Hand Chiseling', 'Lattice Carving', 'Geometric Pattern Design'],
            historicalSignificance: 'Stone Jali screens are integral to Rajasthani and Mughal architecture, famously seen in the windows of the Taj Mahal, Hawa Mahal, and Red Fort. They are a hallmark of Indo-Islamic architecture.',
            modernRelevance: 'Modern architects incorporate traditional Jali patterns into contemporary buildings, and miniature Jali pieces are popular decorative items.',
            difficulty: 'Master',
            ageEstimate: '800+ years'
        },
        {
            id: 'ichikali-pottery',
            name: 'Etikoppaka Toys',
            state: 'Andhra Pradesh',
            category: 'pottery',
            icon: '🎪',
            shortDesc: 'Naturally lacquered wooden toys from Etikoppaka village using vegetable dyes and non-toxic lac.',
            description: 'Etikoppaka toys are a unique craft from a small village in Andhra Pradesh where artisans create charming wooden toys using natural lacquer and vegetable dyes. The toys are turned on a traditional lathe from "Lankidi" wood (Anchusa) and coated with lacquer made from the resin of the Lac insect. The colors are derived from seeds, roots, bark, and leaves of various plants, making the toys completely eco-friendly and non-toxic. The craft is known for its characteristic round, smooth forms and bright, cheerful palette.',
            materials: ['Anchusa Wood', 'Lac Resin', 'Vegetable Dyes', 'Seeds', 'Bark'],
            techniques: ['Lathe Turning', 'Natural Lacquering', 'Vegetable Dye Application', 'Hand Finishing'],
            historicalSignificance: 'The craft has been practiced for generations in Etikoppaka, believed to have been encouraged by local zamindars (landlords) who patronized the artisans.',
            modernRelevance: 'GI-tagged and recognized by the Geographical Indications Registry, Etikoppaka toys are promoted as sustainable alternatives to plastic toys.',
            difficulty: 'Intermediate',
            ageEstimate: '300+ years'
        },
        {
            id: 'zardozi',
            name: 'Zardozi Embroidery',
            state: 'Uttar Pradesh',
            category: 'textiles',
            icon: '✨',
            shortDesc: 'Opulent gold and silver thread embroidery on velvet and silk, a magnificent Mughal court craft.',
            description: 'Zardozi, meaning "gold sewing," is one of the most luxurious forms of embroidery in the world. This spectacular craft involves using heavy gold and silver metallic threads, along with precious stones, sequins, and beads, to create elaborate three-dimensional designs on rich fabrics like velvet, silk, and organza. The embroidery is typically executed on a wooden frame (adda) by a team of artisans, each specializing in different aspects of the work. The raised, sculptural quality of Zardozi makes it distinctive among all embroidery forms.',
            materials: ['Gold Thread', 'Silver Thread', 'Precious Stones', 'Sequins', 'Velvet'],
            techniques: ['Metallic Thread Work', '3D Embellishment', 'Stone Setting', 'Sequin Attachment'],
            historicalSignificance: 'Zardozi reached its zenith under Mughal Emperor Akbar in the 16th century, when it adorned royal garments, tent canopies, and horse trappings. The craft was patronized by the Mughal courts for centuries.',
            modernRelevance: 'Today, Zardozi is the preferred embroidery for Indian bridal wear and is used by international luxury fashion houses for haute couture collections.',
            difficulty: 'Master',
            ageEstimate: '500+ years'
        },
        {
            id: 'lac-bangles',
            name: 'Lac Bangles',
            state: 'Rajasthan',
            category: 'jewelry',
            icon: '⭕',
            shortDesc: 'Vibrant handcrafted resin bangles studded with stones and mirrors, a cherished Rajasthani tradition.',
            description: 'Lac bangles are one of the most colorful and beloved forms of traditional Indian jewelry, particularly associated with Rajasthan. These bangles are crafted from lac (lakh), a natural resin secreted by the Lac insect, which is heated and molded onto a cylindrical form. The softened lac is then adorned with stones, mirrors, beads, and glitter, creating dazzling patterns. The craft is traditionally practiced by the Manihar community and is essential to Rajasthani wedding customs, where the bride wears stacks of colorful bangles.',
            materials: ['Lac Resin', 'Glass Stones', 'Mirror Pieces', 'Gold/Silver Leaf'],
            techniques: ['Heat Molding', 'Stone Studding', 'Mirror Setting', 'Glitter Application'],
            historicalSignificance: 'Lac bangle-making has been a traditional craft for over 5,000 years, with evidence of lac bangles found in Indus Valley Civilization archaeological sites.',
            modernRelevance: 'While traditional lac bangles remain popular, modern versions include adjustable designs and fusion styles that appeal to contemporary fashion sensibilities.',
            difficulty: 'Beginner',
            ageEstimate: '5000+ years'
        },
        {
            id: 'pichwai-painting',
            name: 'Pichwai Painting',
            state: 'Rajasthan',
            category: 'painting',
            icon: '🐄',
            shortDesc: 'Devotional cloth paintings from Nathdwara depicting Lord Krishna, rich with symbolism and natural colors.',
            description: 'Pichwai is a traditional devotional art form from Nathdwara in Rajasthan, featuring elaborate cloth paintings that depict scenes from the life of Lord Krishna, particularly his childhood in Vrindavan. These paintings are created on cotton or silk using natural pigments and gold leaf, with incredible attention to detail. The compositions typically show Krishna surrounded by gopis (milkmaids), cows, peacocks, and lotus flowers in lush garden settings. Each painting is created by a team of artists over weeks or months.',
            materials: ['Cotton Cloth', 'Natural Pigments', 'Gold Leaf', 'Mineral Colors'],
            techniques: ['Freehand Painting', 'Gold Leaf Application', 'Layered Coloring', 'Fine Line Work'],
            historicalSignificance: 'Pichwai paintings originated in the 17th century at the Shrinathji Temple in Nathdwara. They serve as decorative temple backdrops and are ritually changed with seasons and festivals.',
            modernRelevance: 'Pichwai art has expanded beyond temple settings into home décor, fashion, and gallery art, with contemporary artists blending traditional and modern styles.',
            difficulty: 'Advanced',
            ageEstimate: '400+ years'
        },
        {
            id: 'walami-kashmir',
            name: 'Kashmiri Papier-mâché Boxes',
            state: 'Jammu & Kashmir',
            category: 'woodwork',
            icon: '📦',
            shortDesc: 'Hand-painted decorative boxes featuring elaborate Naqashi patterns on papier-mâché frames.',
            description: 'Kashmiri Papier-mâché boxes represent the pinnacle of decorative box-making artistry. These ornate boxes, known as "Krantam," are created through the meticulous process of layering paper pulp, followed by multiple rounds of priming, sanding, and finally, the exquisite hand-painting known as Naqashi. Each box tells a story through its intricate patterns — from Chinar leaf motifs to delicate paisley designs. The interior is often lined with velvet or silk, adding to the luxury of these handcrafted treasures.',
            materials: ['Paper Pulp', 'Gesso', 'Natural Colors', 'Gold Leaf', 'Velvet Lining'],
            techniques: ['Paper Pulp Layering', 'Multi-Stage Priming', 'Naqashi Painting', 'Velvet Lining'],
            historicalSignificance: 'The art of papier-mâché box-making in Kashmir evolved from the broader Sanzashi tradition and became a prized craft during the Mughal period, with royals commissioning elaborate pieces.',
            modernRelevance: 'Kashmiri boxes are among the most sought-after handicraft souvenirs from India, found in luxury hotels, museums, and collector\'s cabinets worldwide.',
            difficulty: 'Advanced',
            ageEstimate: '500+ years'
        },
        {
            id: 'meenakari',
            name: 'Meenakari Enamel Work',
            state: 'Rajasthan',
            category: 'metalwork',
            icon: '🌈',
            shortDesc: 'Vividly colored enamel work on metal, creating jeweled masterpieces that glow with iridescent brilliance.',
            description: 'Meenakari is the ancient art of coloring and ornamenting the surface of metals by fusing over it brilliant colors that are fused in an oven at about 800 degrees centigrade. This exquisite craft was perfected in Rajasthan, particularly in Jaipur and Udaipur. The process involves engraving designs on gold or silver, then filling the grooves with colored enamel powder made from minerals and metallic oxides. Different colors are fired at different temperatures, requiring multiple rounds of firing. The result is a breathtakingly colorful surface with jewel-like brilliance.',
            materials: ['Gold/Silver', 'Enamel Powder', 'Mineral Pigments', 'Metallic Oxides'],
            techniques: ['Metal Engraving', 'Enamel Filling', 'Multi-Temperature Firing', 'Burnishing'],
            historicalSignificance: 'Meenakari was introduced to Rajasthan by Raja Man Singh of Amber in the 16th century. It was traditionally used to adorn the reverse side of Kundan jewelry, creating pieces of extraordinary beauty.',
            modernRelevance: 'Modern Meenakari has expanded into home décor items, watches, and fashion accessories, with Jaipur remaining the global center for this craft.',
            difficulty: 'Master',
            ageEstimate: '500+ years'
        },
        {
            id: 'sujani-embroidery',
            name: 'Sujani Embroidery',
            state: 'Bihar',
            category: 'textiles',
            icon: '🧵',
            shortDesc: 'Layered quilt embroidery from Bihar using running stitches to create narrative tapestries.',
            description: 'Sujani is a traditional quilted embroidery from Bihar that transforms layered old saris and dhotis into narrative textile art. Two or more layers of fabric are placed together and stitched with simple running stitches to create patterns depicting scenes from daily life, mythology, and nature. The base fabric is typically old cloth, making Sujani one of the most sustainable textile traditions. The color palette traditionally features earth tones — reds, yellows, and browns — created with natural dyes.',
            materials: ['Old Saris/Cotton', 'Natural Dyes', 'Cotton Thread'],
            techniques: ['Running Stitch', 'Layered Quilting', 'Narrative Stitching', 'Natural Dyeing'],
            historicalSignificance: 'Sujani embroidery was traditionally practiced by women in Bihar as part of the birth celebration rituals. Quilted blankets (Godhna) were made for newborns, symbolizing protection and love.',
            modernRelevance: 'Contemporary designers have revived Sujani as an eco-friendly textile art, creating wall hangings, clothing, and home textiles that celebrate its narrative tradition.',
            difficulty: 'Beginner',
            ageEstimate: '400+ years'
        },
        {
            id: 'dokra-art',
            name: 'Dokra Metal Casting',
            state: 'West Bengal',
            category: 'metalwork',
            icon: '🗿',
            shortDesc: 'Ancient lost-wax metal casting producing primitive, expressive figurines and ornaments.',
            description: 'Dokra (or Dhokra) is an ancient non-ferrous metal casting technique using the lost-wax method (cire perdue), practiced by tribal artisans in West Bengal, Jharkhand, Odisha, and other eastern states. This remarkable 4,000-year-old technique produces distinctive, primitive-looking figurines, jewelry, and utility items characterized by their abstract forms and textured surfaces. Each piece is unique because the clay mold is broken after casting, making mass production impossible.',
            materials: ['Brass', 'Tin', 'Beeswax', 'Clay', 'Cow Dung'],
            techniques: ['Lost-Wax Casting', 'Clay Core Preparation', 'Wire Coil Application', 'Furnace Smelting'],
            historicalSignificance: 'The technique is the same used to create the famous Dancing Girl of Mohenjo-Daro (2500 BCE), making Dokra one of the oldest known metalworking techniques in human history.',
            modernRelevance: 'GI-tagged Dokra art has found a strong contemporary art market, with pieces displayed in museums worldwide and adapted into modern jewelry and home décor.',
            difficulty: 'Advanced',
            ageEstimate: '4000+ years'
        },
        {
            id: 'muga-silk',
            name: 'Muga Silk Weaving',
            state: 'Assam',
            category: 'textiles',
            icon: '🪱',
            shortDesc: 'Golden-hued wild silk exclusive to Assam, naturally lustrous and strengthening with each wash.',
            description: 'Muga silk is the world\'s only golden-hued silk, produced exclusively in Assam from the cocoons of the Antheraea assamensis silkworm. This remarkable silk is semi-wild, harvested from trees in the lush forests of Upper Assam. The golden color is natural and inherent to the fiber, requiring no dyeing. Muga silk is prized for its incredible durability — unlike other silks, it actually becomes lustrous and stronger with each wash. The fabric has a natural sheen that deepens with age, making it one of the most prized textiles in the world.',
            materials: ['Muga Silk Fiber', 'Natural Golden Pigment'],
            techniques: ['Handloom Weaving', 'Jacquard Patterns', 'Natural Dyeing', 'Eri Silk Blending'],
            historicalSignificance: 'Muga silk has been treasured since ancient times and was reserved for royalty. In Assamese tradition, Muga is considered sacred and essential for wedding ceremonies and religious festivals.',
            modernRelevance: 'GI-tagged Muga silk is gaining international attention as a luxury sustainable textile, with designers incorporating it into contemporary fashion.',
            difficulty: 'Advanced',
            ageEstimate: '2000+ years'
        },
        {
            id: 'terracotta',
            name: 'Bishnupur Terracotta',
            state: 'West Bengal',
            category: 'pottery',
            icon: '🏛️',
            shortDesc: 'Temple-architectural terracotta plaques from Bishnupur telling epic narratives in fired clay.',
            description: 'The terracotta temple art of Bishnupur in West Bengal represents one of India\'s most distinctive architectural and artistic traditions. Using locally sourced clay, artisans created elaborate relief panels depicting scenes from the Ramayana, Mahabharata, and Krishna legends, which were then fired and embedded into the walls of magnificent temples. The craft involves both architectural sculpture and individual decorative panel making, creating an extraordinary fusion of pottery and temple art.',
            materials: ['Local Clay', 'Rice Husk', 'Cow Dung'],
            techniques: ['Clay Relief Modeling', 'Firing', 'Panel Composition', 'Architectural Integration'],
            historicalSignificance: 'The terracotta temples of Bishnupur were built between the 17th and 18th centuries by the Malla kings, who were great patrons of art and music. The temples are now UNESCO tentative list sites.',
            modernRelevance: 'Bishnupur terracotta art has been adapted into decorative panels, lamps, and modern art pieces, keeping the ancient tradition alive.',
            difficulty: 'Advanced',
            ageEstimate: '400+ years'
        },
        {
            id: 'applique',
            name: 'Appliqué Work (Pipli)',
            state: 'Odisha',
            category: 'textiles',
            icon: '✂️',
            shortDesc: 'Vibrant cut-and-stitch fabric craft from Pipli creating colorful umbrellas, lanterns, and decorative items.',
            description: 'Appliqué work from Pipli in Odisha is a vibrant fabric craft where pieces of colored cloth are cut into shapes and sewn onto a base fabric to create elaborate patterns. The craft is famous for its bold, geometric designs and striking color combinations. Artisans create everything from ceremonial umbrellas (chhatra) and decorative lanterns (jhoomar) to wall hangings and bags. The technique involves cutting multiple layers of fabric simultaneously to create identical mirrored patterns, which are then stitched with precision.',
            materials: ['Cotton Fabric', 'Silk', 'Vibrant Dyes', 'Gold/Silver Trim'],
            techniques: ['Fabric Cutting', 'Mirror Stitching', 'Color Blocking', 'Geometric Pattern Making'],
            historicalSignificance: 'Appliqué work in Pipli dates back to the 12th century and was traditionally used to create decorative items for the Jagannath Temple in Puri and for the annual Rath Yatra procession.',
            modernRelevance: 'Pipli appliqué products — umbrellas, bags, lanterns — are popular souvenirs and the craft provides livelihoods to over 500 families in the Pipli cluster.',
            difficulty: 'Beginner',
            ageEstimate: '900+ years'
        },
        {
            id: 'pashmina',
            name: 'Pashmina Weaving',
            state: 'Jammu & Kashmir',
            category: 'textiles',
            icon: '🧣',
            shortDesc: 'Ultra-fine cashmere shawls handwoven from the fleece of Changthangi goats in the high Himalayas.',
            description: 'Pashmina, the "soft gold" of textiles, is the world\'s finest cashmere, hand-woven into shawls and scarves in Kashmir. The ultra-fine fiber comes from the Changthangi goats that graze at altitudes above 14,000 feet in Ladakh. Each goat produces only about 3-4 ounces of usable Pashmina fiber annually. The fiber is hand-spun using a traditional wooden spinning wheel (yinder) and then woven on traditional handlooms into shawls that are incredibly light (as thin as 150 grams for a full shawl) yet exceptionally warm.',
            materials: ['Pashmina Fiber', 'Silk Thread', 'Natural Dyes'],
            techniques: ['Hand Spinning', 'Handloom Weaving', 'Sozni Embroidery', 'Jamdani Patterns'],
            historicalSignificance: 'Pashmina shawls have been prized since the Mughal era. Napoleon is said to have gifted a Pashmina shawl to Josephine. The craft has been recognized by UNESCO as Intangible Cultural Heritage.',
            modernRelevance: 'Pure Pashmina remains one of the world\'s most luxurious textiles, with a single shawl taking 3-6 months to complete. It continues to be a symbol of Kashmiri artistry.',
            difficulty: 'Master',
            ageEstimate: '600+ years'
        }
    ];

    /* ======================================================================
       ARTISAN TRADITIONS DATA
       ====================================================================== */
    const ARTISANS = [
        {
            name: 'The Benarasi Weaver',
            tradition: 'Banarasi Silk & Brocade',
            icon: '🧶',
            desc: 'Master weavers of Varanasi who spend months creating a single Banarasi saree on traditional handlooms, preserving techniques passed down for centuries.'
        },
        {
            name: 'The Madhubani Painter',
            tradition: 'Mithila Folk Art',
            icon: '🎨',
            desc: 'Women artists of the Mithila region who transform walls, floors, and paper into vibrant narratives using natural pigments and finger techniques.'
        },
        {
            name: 'The Dokra Caster',
            tradition: 'Lost-Wax Metalwork',
            icon: '🗿',
            desc: 'Tribal artisans who keep alive a 4,000-year-old metal casting technique, creating each piece from clay molds that are broken after a single use.'
        },
        {
            name: 'The Kashmiri Naqash',
            tradition: 'Papier-mâché Art',
            icon: '🎭',
            desc: 'Skilled painters who transform simple paper pulp into exquisite decorative masterpieces using fine brushes made from squirrel hair and natural pigments.'
        }
    ];

    /* ======================================================================
       APPLICATION STATE
       ====================================================================== */
    let state = {
        crafts: [...CRAFTS],
        filteredCrafts: [...CRAFTS],
        activeCategory: 'all',
        searchQuery: '',
        sortBy: 'name-asc',
        viewMode: 'grid',
        activeStateFilter: null,
        spotlightIndex: 0
    };

    /* ======================================================================
       DOM REFERENCES
       ====================================================================== */
    const els = {};

    function cacheElements() {
        els.searchInput = document.getElementById('hc-search');
        els.searchClear = document.getElementById('hc-search-clear');
        els.grid = document.getElementById('hc-crafts-grid');
        els.emptyState = document.getElementById('hc-empty-state');
        els.resultsInfo = document.getElementById('hc-results-info');
        els.sortSelect = document.getElementById('hc-sort');
        els.modal = document.getElementById('hc-modal');
        els.modalBody = document.getElementById('hc-modal-body');
        els.modalClose = document.getElementById('hc-modal-close');
        els.modalBackdrop = document.getElementById('hc-modal-backdrop');
        els.spotlight = document.getElementById('hc-spotlight');
        els.spotlightTitle = document.getElementById('hc-spotlight-title');
        els.spotlightState = document.getElementById('hc-spotlight-state');
        els.spotlightDesc = document.getElementById('hc-spotlight-desc');
        els.spotlightMeta = document.getElementById('hc-spotlight-meta');
        els.spotlightIcon = document.getElementById('hc-spotlight-icon');
        els.spotlightExplore = document.getElementById('hc-spotlight-explore');
        els.artisanGrid = document.getElementById('hc-artisan-grid');
        els.stateChips = document.getElementById('hc-state-chips');
        els.totalCrafts = document.getElementById('hc-total-crafts');
        els.totalStates = document.getElementById('hc-total-states');
        els.totalCategories = document.getElementById('hc-total-categories');
        els.resetFilters = document.getElementById('hc-reset-filters');
        els.heroParticles = document.getElementById('hc-hero-particles');
    }

    /* ======================================================================
       INITIALIZATION
       ====================================================================== */
    function init() {
        cacheElements();
        populateHeroStats();
        createHeroParticles();
        renderSpotlight();
        renderArtisans();
        renderStateChips();
        renderCrafts();
        bindEvents();
    }

    function populateHeroStats() {
        animateNumber(els.totalCrafts, CRAFTS.length, 1200);
        animateNumber(els.totalStates, new Set(CRAFTS.map(c => c.state)).size, 1000);
        animateNumber(els.totalCategories, new Set(CRAFTS.map(c => c.category)).size, 800);
    }

    function animateNumber(el, target, duration) {
        if (!el) return;
        let start = 0;
        const step = Math.ceil(target / (duration / 16));
        const interval = setInterval(() => {
            start += step;
            if (start >= target) {
                start = target;
                clearInterval(interval);
            }
            el.textContent = start;
        }, 16);
    }

    function createHeroParticles() {
        if (!els.heroParticles) return;
        for (let i = 0; i < 20; i++) {
            const p = document.createElement('div');
            p.className = 'hc-particle';
            const size = Math.random() * 5 + 2;
            p.style.width = size + 'px';
            p.style.height = size + 'px';
            p.style.left = Math.random() * 100 + '%';
            p.style.top = Math.random() * 100 + '%';
            p.style.animationDelay = (Math.random() * 5) + 's';
            p.style.animationDuration = (Math.random() * 4 + 4) + 's';
            els.heroParticles.appendChild(p);
        }
    }

    /* ======================================================================
       FILTERING & SORTING
       ====================================================================== */
    function applyFilters() {
        let results = [...state.crafts];

        // Category filter
        if (state.activeCategory !== 'all') {
            results = results.filter(c => c.category === state.activeCategory);
        }

        // State filter
        if (state.activeStateFilter) {
            results = results.filter(c => c.state === state.activeStateFilter);
        }

        // Search
        if (state.searchQuery.trim()) {
            const q = state.searchQuery.toLowerCase();
            results = results.filter(c =>
                c.name.toLowerCase().includes(q) ||
                c.state.toLowerCase().includes(q) ||
                c.category.toLowerCase().includes(q) ||
                c.materials.some(m => m.toLowerCase().includes(q)) ||
                c.techniques.some(t => t.toLowerCase().includes(q)) ||
                c.shortDesc.toLowerCase().includes(q)
            );
        }

        // Sort
        switch (state.sortBy) {
            case 'name-asc':
                results.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'name-desc':
                results.sort((a, b) => b.name.localeCompare(a.name));
                break;
            case 'state-asc':
                results.sort((a, b) => a.state.localeCompare(b.state));
                break;
            case 'category-asc':
                results.sort((a, b) => a.category.localeCompare(b.category));
                break;
        }

        state.filteredCrafts = results;
        renderCrafts();
    }

    /* ======================================================================
       RENDERING
       ====================================================================== */
    function renderCrafts() {
        const { filteredCrafts } = state;

        // Update results info
        if (els.resultsInfo) {
            els.resultsInfo.textContent = `Showing ${filteredCrafts.length} of ${state.crafts.length} heritage crafts`;
        }

        // Show/hide empty state
        if (filteredCrafts.length === 0) {
            els.grid.style.display = 'none';
            els.emptyState.style.display = 'block';
            return;
        }

        els.grid.style.display = '';
        els.emptyState.style.display = 'none';

        // Apply view mode
        els.grid.classList.toggle('list-view', state.viewMode === 'list');

        // Render cards with staggered animation
        els.grid.innerHTML = filteredCrafts.map((craft, i) => `
            <article class="hc-craft-card" role="listitem" data-craft-id="${craft.id}" style="animation-delay: ${i * 0.05}s">
                <div class="hc-craft-card-accent"></div>
                <div class="hc-craft-card-body">
                    <div class="hc-craft-card-header">
                        <div class="hc-craft-card-icon">${craft.icon}</div>
                        <div class="hc-craft-card-title-group">
                            <h3 class="hc-craft-card-name">${craft.name}</h3>
                            <span class="hc-craft-card-state">📍 ${craft.state}</span>
                        </div>
                    </div>
                    <p class="hc-craft-card-desc">${craft.shortDesc}</p>
                    <div class="hc-craft-card-tags">
                        <span class="hc-craft-tag">${craft.category}</span>
                        <span class="hc-craft-tag">${craft.difficulty}</span>
                        <span class="hc-craft-tag">${craft.ageEstimate}</span>
                    </div>
                    <div class="hc-craft-card-footer">
                        <span class="hc-craft-card-category">${craft.category}</span>
                        <span class="hc-craft-card-arrow">→</span>
                    </div>
                </div>
            </article>
        `).join('');
    }

    function renderSpotlight() {
        if (!els.spotlight || CRAFTS.length === 0) return;

        // Rotate spotlight through featured crafts
        const featured = [
            CRAFTS.find(c => c.id === 'pashmina'),
            CRAFTS.find(c => c.id === 'dokra-art'),
            CRAFTS.find(c => c.id === 'madhubani-painting'),
            CRAFTS.find(c => c.id === 'banarasi-silk')
        ].filter(Boolean);

        const craft = featured[state.spotlightIndex % featured.length];

        els.spotlightTitle.textContent = craft.name;
        els.spotlightState.textContent = `📍 ${craft.state} · ${craft.category.charAt(0).toUpperCase() + craft.category.slice(1)}`;
        els.spotlightDesc.textContent = craft.description.substring(0, 200) + '...';
        els.spotlightIcon.textContent = craft.icon;

        els.spotlightMeta.innerHTML = craft.materials.map(m =>
            `<span class="hc-spotlight-tag">${m}</span>`
        ).join('');

        els.spotlight.style.display = 'block';

        els.spotlightExplore.onclick = () => openModal(craft);

        // Auto-rotate every 8 seconds
        setTimeout(() => {
            state.spotlightIndex++;
            renderSpotlight();
        }, 8000);
    }

    function renderArtisans() {
        if (!els.artisanGrid) return;

        els.artisanGrid.innerHTML = ARTISANS.map(a => `
            <div class="hc-artisan-card">
                <div class="hc-artisan-avatar">${a.icon}</div>
                <h3 class="hc-artisan-name">${a.name}</h3>
                <p class="hc-artisan-tradition">${a.tradition}</p>
                <p class="hc-artisan-desc">${a.desc}</p>
            </div>
        `).join('');
    }

    function renderStateChips() {
        if (!els.stateChips) return;

        const stateCount = {};
        CRAFTS.forEach(c => {
            stateCount[c.state] = (stateCount[c.state] || 0) + 1;
        });

        const sorted = Object.entries(stateCount).sort((a, b) => b[1] - a[1]);

        els.stateChips.innerHTML = sorted.map(([name, count]) => `
            <button class="hc-state-chip" data-state="${name}">
                ${name}
                <span class="hc-state-chip-count">${count}</span>
            </button>
        `).join('');
    }

    /* ======================================================================
       MODAL
       ====================================================================== */
    function openModal(craft) {
        if (!els.modal || !els.modalBody) return;

        els.modalBody.innerHTML = `
            <div class="hc-modal-icon-hero">${craft.icon}</div>
            <h2 class="hc-modal-title">${craft.name}</h2>
            <p class="hc-modal-state-label">📍 ${craft.state}</p>

            <div class="hc-modal-section">
                <h3 class="hc-modal-section-title">About</h3>
                <p class="hc-modal-text">${craft.description}</p>
            </div>

            <div class="hc-modal-section">
                <h3 class="hc-modal-section-title">Details</h3>
                <div class="hc-modal-details-grid">
                    <div class="hc-modal-detail-item">
                        <p class="hc-modal-detail-label">Category</p>
                        <p class="hc-modal-detail-value">${craft.category.charAt(0).toUpperCase() + craft.category.slice(1)}</p>
                    </div>
                    <div class="hc-modal-detail-item">
                        <p class="hc-modal-detail-label">Skill Level</p>
                        <p class="hc-modal-detail-value">${craft.difficulty}</p>
                    </div>
                    <div class="hc-modal-detail-item">
                        <p class="hc-modal-detail-label">Age of Tradition</p>
                        <p class="hc-modal-detail-value">${craft.ageEstimate}</p>
                    </div>
                    <div class="hc-modal-detail-item">
                        <p class="hc-modal-detail-label">Origin State</p>
                        <p class="hc-modal-detail-value">${craft.state}</p>
                    </div>
                </div>
            </div>

            <div class="hc-modal-section">
                <h3 class="hc-modal-section-title">Materials</h3>
                <div class="hc-modal-tags">
                    ${craft.materials.map(m => `<span class="hc-modal-tag">${m}</span>`).join('')}
                </div>
            </div>

            <div class="hc-modal-section">
                <h3 class="hc-modal-section-title">Techniques</h3>
                <div class="hc-modal-tags">
                    ${craft.techniques.map(t => `<span class="hc-modal-tag">${t}</span>`).join('')}
                </div>
            </div>

            <div class="hc-modal-section">
                <h3 class="hc-modal-section-title">Historical Significance</h3>
                <p class="hc-modal-text">${craft.historicalSignificance}</p>
            </div>

            <div class="hc-modal-section">
                <h3 class="hc-modal-section-title">Modern Relevance</h3>
                <p class="hc-modal-text">${craft.modernRelevance}</p>
            </div>
        `;

        els.modal.classList.add('open');
        els.modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        els.modalClose.focus();
    }

    function closeModal() {
        if (!els.modal) return;
        els.modal.classList.remove('open');
        els.modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    /* ======================================================================
       EVENT BINDING
       ====================================================================== */
    function bindEvents() {
        // Search
        if (els.searchInput) {
            els.searchInput.addEventListener('input', (e) => {
                state.searchQuery = e.target.value;
                els.searchClear.hidden = !state.searchQuery;
                applyFilters();
            });
        }

        if (els.searchClear) {
            els.searchClear.addEventListener('click', () => {
                state.searchQuery = '';
                els.searchInput.value = '';
                els.searchClear.hidden = true;
                applyFilters();
            });
        }

        // Category filter buttons
        document.querySelectorAll('.hc-filter-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.hc-filter-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                state.activeCategory = btn.dataset.category;
                state.activeStateFilter = null;
                applyFilters();
            });
        });

        // View mode
        document.querySelectorAll('.hc-view-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.hc-view-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                state.viewMode = btn.dataset.view;
                renderCrafts();
            });
        });

        // Sort
        if (els.sortSelect) {
            els.sortSelect.addEventListener('change', (e) => {
                state.sortBy = e.target.value;
                applyFilters();
            });
        }

        // Grid card clicks (delegated)
        if (els.grid) {
            els.grid.addEventListener('click', (e) => {
                const card = e.target.closest('.hc-craft-card');
                if (!card) return;
                const craftId = card.dataset.craftId;
                const craft = CRAFTS.find(c => c.id === craftId);
                if (craft) openModal(craft);
            });
        }

        // State chip clicks (delegated)
        if (els.stateChips) {
            els.stateChips.addEventListener('click', (e) => {
                const chip = e.target.closest('.hc-state-chip');
                if (!chip) return;
                const stateName = chip.dataset.state;
                if (state.activeStateFilter === stateName) {
                    state.activeStateFilter = null;
                    chip.style.borderColor = '';
                    chip.style.color = '';
                } else {
                    state.activeStateFilter = stateName;
                    els.stateChips.querySelectorAll('.hc-state-chip').forEach(c => {
                        c.style.borderColor = '';
                        c.style.color = '';
                    });
                    chip.style.borderColor = 'var(--hc-primary)';
                    chip.style.color = 'var(--hc-primary)';
                }
                applyFilters();
            });
        }

        // Reset filters
        if (els.resetFilters) {
            els.resetFilters.addEventListener('click', () => {
                state.searchQuery = '';
                state.activeCategory = 'all';
                state.activeStateFilter = null;
                if (els.searchInput) els.searchInput.value = '';
                if (els.searchClear) els.searchClear.hidden = true;
                document.querySelectorAll('.hc-filter-btn').forEach(b => b.classList.remove('active'));
                document.querySelector('.hc-filter-btn[data-category="all"]')?.classList.add('active');
                applyFilters();
            });
        }

        // Modal close
        if (els.modalClose) {
            els.modalClose.addEventListener('click', closeModal);
        }
        if (els.modalBackdrop) {
            els.modalBackdrop.addEventListener('click', closeModal);
        }

        // ESC key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && els.modal.classList.contains('open')) {
                closeModal();
            }
        });
    }

    /* ======================================================================
       BOOT
       ====================================================================== */
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
