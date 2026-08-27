/**
 * Indian Spices Atlas — Interactive Module
 * Explores India's rich spice heritage with origins, uses, and health benefits.
 */
(function () {
    'use strict';

    /* ======================================================================
       SPICE DATA — 20 Indian Spices
       ====================================================================== */
    const SPICES = [
        {
            id: 'turmeric', name: 'Turmeric (Haldi)', icon: '🟡', region: 'South India',
            category: 'root', primaryUse: 'Cooking & Medicine',
            desc: 'The golden spice of India — anti-inflammatory powerhouse used in curries, rituals, and Ayurvedic medicine for millennia.',
            origin: 'Native to the Indian subcontinent, cultivated for 4,500+ years.',
            benefits: ['Anti-inflammatory (curcumin)', 'Antioxidant', 'Digestive aid', 'Skin healing'],
            culinaryUses: ['Curry base', 'Rice coloring', 'Pickles', 'Golden milk (haldi doodh)'],
            science: 'Curcumin, the active compound, has been studied extensively for its anti-cancer, anti-diabetic, and neuroprotective properties. Bioavailability increases 2000% when combined with black pepper (piperine).',
            season: 'Year-round harvesting', tradeHistory: 'Traded along the Spice Route since 2500 BCE'
        },
        {
            id: 'cardamom', name: 'Cardamom (Elaichi)', icon: '💚', region: 'Kerala / Northeast',
            category: 'seed', primaryUse: 'Culinary & Aromatic',
            desc: 'The Queen of Spices — intensely aromatic pods that elevate desserts, chai, and savory dishes alike.',
            origin: 'Western Ghats of Kerala; Guatemala now largest producer.',
            benefits: ['Digestive aid', 'Breath freshener', 'Blood pressure regulation', 'Detoxification'],
            culinaryUses: ['Chai masala', 'Biryani', 'Mithai (sweets)', 'Garam masala'],
            science: 'Contains 1,8-cineole (eucalyptol) which aids digestion and acts as a natural mouthwash. Black cardamom has a smoky flavor from wood-fire drying.',
            season: 'Sept-Dec harvest', tradeHistory: 'Traded to Egypt by 1500 BCE; mentioned in Vedic texts'
        },
        {
            id: 'cumin', name: 'Cumin (Jeera)', icon: '🟤', region: 'Rajasthan / Gujarat',
            category: 'seed', primaryUse: 'Culinary',
            desc: 'Earthy and warm — the backbone of Indian tempering (tadka), spice blends, and digestive remedies.',
            origin: 'Eastern Mediterranean to India; cultivated since 5,000 BCE.',
            benefits: ['Digestion boost', 'Iron-rich', 'Blood sugar control', 'Memory enhancement'],
            culinaryUses: ['Tadka (tempering)', 'Rice dishes', 'Raita', 'Cumin water (jeera paani)'],
            science: 'Thymoquinone in cumin stimulates pancreatic enzymes, improving digestion. Contains 66mg of iron per 100g — one of the highest among common spices.',
            season: 'Feb-April harvest', tradeHistory: 'Found in archaeological sites at Khufu\'s pyramid (2500 BCE)'
        },
        {
            id: 'coriander', name: 'Coriander (Dhania)', icon: '🟢', region: 'Rajasthan / Madhya Pradesh',
            category: 'seed', primaryUse: 'Culinary',
            desc: 'Citrusy and mild — both leaves (cilantro) and seeds are essential, making it India\'s most versatile herb.',
            origin: 'Native to Southern Europe and Western Asia; cultivated in India since Vedic times.',
            benefits: ['Cooling effect', 'Cholesterol reduction', 'Kidney health', 'Anti-anxiety'],
            culinaryUses: ['Curry base', 'Chutneys', 'Spice blends (sabji masala)', 'Cooling drinks'],
            science: 'Contains linalool which has sedative and anti-anxiety properties. Seeds are rich in dietary fiber and essential oils including geraniol.',
            season: 'Nov-Feb harvest', tradeHistory: 'Mentioned in Sanskrit texts dating to 1500 BCE'
        },
        {
            id: 'mustard', name: 'Mustard (Rai/Sarson)', icon: '🟠', region: 'Punjab / Rajasthan',
            category: 'seed', primaryUse: 'Culinary & Oil',
            desc: 'Pungent and bold — seeds and oil define Punjabi, Bengali, and South Indian cooking traditions.',
            origin: 'Indus Valley Civilization; one of the oldest cultivated spices.',
            benefits: ['Metabolism boost', 'Pain relief', 'Respiratory aid', 'Antimicrobial'],
            culinaryUses: ['Oil extraction', 'Pickles (achaar)', 'Tadka', 'Sarson da saag'],
            science: 'Contains sinigrin which converts to allyl isothiocyanate — the compound responsible for its pungency. Black mustard has higher oil content than yellow.',
            season: 'Oct-Dec harvest', tradeHistory: 'Archaeological evidence from Indus Valley sites (3000 BCE)'
        },
        {
            id: 'pepper', name: 'Black Pepper (Kali Mirch)', icon: '⚫', region: 'Kerala / Karnataka',
            category: 'fruit', primaryUse: 'Culinary & Medicine',
            desc: 'The King of Spices — once worth its weight in gold, it drove global exploration and shaped empires.',
            origin: 'Western Ghats of Kerala; Malabar coast was the epicenter of the spice trade.',
            benefits: ['Bioavailability enhancer', 'Digestive stimulant', 'Cold/flu relief', 'Weight management'],
            culinaryUses: ['Universal seasoning', 'Rasam', 'Kadha (remedy drink)', 'Meat marinades'],
            science: 'Piperine increases curcumin bioavailability by 2000%. Acts as a thermogenic agent, boosting metabolism by up to 8%.',
            season: 'Dec-Feb harvest', tradeHistory: 'Roman Empire imported 3,500 tonnes annually; drove Vasco da Gama\'s voyage (1498)'
        },
        {
            id: 'saffron', name: 'Saffron (Kesar)', icon: '🔴', region: 'Kashmir',
            category: 'stigma', primaryUse: 'Culinary & Medicinal',
            desc: 'The most precious spice on Earth — each crocus flower yields just three delicate crimson threads.',
            origin: 'Kashmir\'s Pampore region; also Iran, Spain. The Kashmiri variety (Mongra) is most prized.',
            benefits: ['Mood enhancer', 'Vision health', 'Skin glow', 'Memory improvement'],
            culinaryUses: ['Biryani', 'Kesar kulfi', 'Kahwa tea', 'Mughlai desserts'],
            science: 'Crocin and safranal are potent antioxidants. Studies show it rivals fluoxetine (Prozac) for mild-to-moderate depression.',
            season: 'Oct-Nov harvest (14 days)', tradeHistory: 'Traded since 300 BCE; Pampore called "Saffron Town" for 2,500 years'
        },
        {
            id: 'fenugreek', name: 'Fenugreek (Methi)', icon: '🟫', region: 'Rajasthan / Gujarat',
            category: 'seed', primaryUse: 'Culinary & Medicinal',
            desc: 'Bitter-sweet and maple-scented — leaves, seeds, and sprouts are all culinary treasures.',
            origin: 'Near East and Mediterranean; cultivated in India since ancient times.',
            benefits: ['Blood sugar control', 'Lactation support', 'Hair health', 'Appetite regulation'],
            culinaryUses: ['Methi paratha', 'Kasuri methi', 'Pickle', 'Sprouts'],
            science: 'Contains 4-hydroxyisoleucine which stimulates insulin production. Galactomannan fiber slows sugar absorption — effective for Type 2 diabetes management.',
            season: 'Oct-Feb growing season', tradeHistory: 'Found in Iraqi caves dating to 4000 BCE'
        },
        {
            id: 'cinnamon', name: 'Cinnamon (Dalchini)', icon: '🟤', region: 'Kerala / Northeast',
            category: 'bark', primaryUse: 'Culinary & Medicinal',
            desc: 'Sweet and warming — true cinnamon (Ceylon) from Sri Lanka is delicate; cassia is bolder and more common.',
            origin: 'Sri Lanka (true cinnamon); China/Indonesia (cassia). Kerala grows both varieties.',
            benefits: ['Blood sugar regulation', 'Heart health', 'Antibacterial', 'Anti-fungal'],
            culinaryUses: ['Garam masala', 'Biryani', 'Chai', 'Desserts'],
            science: 'Cinnamaldehyde reduces insulin resistance. Ceylon cinnamon (low coumarin) is safer for daily use than cassia.',
            season: 'Year-round harvest', tradeHistory: 'Traded to Egypt by 2000 BCE; once more valuable than gold'
        },
        {
            id: 'clove', name: 'Clove (Laung)', icon: '🟤', region: 'Kerala / Tamil Nadu',
            category: 'flower_bud', primaryUse: 'Culinary & Dental',
            desc: 'Intensely aromatic flower buds — the ultimate breath freshener and a key garam masala ingredient.',
            origin: 'Maluku Islands (Spice Islands); introduced to India via ancient trade routes.',
            benefits: ['Dental pain relief', 'Antiseptic', 'Digestive aid', 'Respiratory relief'],
            culinaryUses: ['Garam masala', 'Biryani', 'Meat marinades', 'Chai'],
            science: 'Eugenol (80-90% of clove oil) is a powerful local anesthetic used in dentistry. Also has anti-parasitic and anti-ulcer properties.',
            season: 'Aug-Nov harvest', tradeHistory: 'Chinese courts used clove breath guards as early as 200 BCE'
        },
        {
            id: 'ginger', name: 'Dry Ginger (Sonth/Saunth)', icon: '🟠', region: 'Kerala / Meghalaya',
            category: 'root', primaryUse: 'Culinary & Medicinal',
            desc: 'Fiery and warming — fresh or dried, ginger is India\'s most universal home remedy and cooking essential.',
            origin: 'Southeast Asia; domesticated in the Malay Archipelago, cultivated in India since Vedic times.',
            benefits: ['Nausea relief', 'Anti-inflammatory', 'Cold remedy', 'Digestive aid'],
            culinaryUses: ['Adrak chai', 'Curry pastes', 'Chutneys', 'Chyawanprash'],
            science: 'Gingerols and shogaols stimulate saliva and bile production. Clinically proven to reduce nausea by 50% in pregnancy and chemotherapy.',
            season: 'Year-round; main harvest Dec-March', tradeHistory: 'Traded to Rome by 1st century CE; mentioned in Confucian texts'
        },
        {
            id: 'asafoetida', name: 'Asafoetida (Hing)', icon: '🟡', region: 'Kashmir / Imports',
            category: 'resin', primaryUse: 'Culinary',
            desc: 'Pungent when raw, savory when cooked — the umami bomb that defines South Indian tempering.',
            origin: 'Iran and Afghanistan; the resin is extracted from Ferula plant roots.',
            benefits: ['Digestive aid', 'Anti-flatulent', 'Respiratory relief', 'Nervous system support'],
            culinaryUses: ['Dal tadka', 'Sambar', 'Rasam', 'Papad'],
            science: 'Ferulic acid and umbelliferone compounds reduce flatulence and bloating. Acts as a natural MSG — enhancing savory flavors.',
            season: 'Year-round (dried resin)', tradeHistory: 'Called "devil\'s dung" in Europe; essential in Indian kitchens since Mughal era'
        },
        {
            id: 'bay-leaf', name: 'Bay Leaf (Tej Patta)', icon: '🟢', region: 'Northeast India',
            category: 'leaf', primaryUse: 'Culinary Aromatic',
            desc: 'Subtle and tea-like — Indian bay leaf (Cinnamomum tamala) differs from European laurel bay.',
            origin: 'Himalayan foothills; the Indian variety is Cinnamomum tamala, not Laurus nobilis.',
            benefits: ['Blood sugar regulation', 'Digestive aid', 'Heart health', 'Stress relief'],
            culinaryUses: ['Biryani', 'Pulao', 'Curry bases', 'Chai masala'],
            science: 'Contains eugenol and linalool. Studies show regular consumption may reduce fasting blood glucose by 21% in Type 2 diabetes.',
            season: 'Year-round harvest', tradeHistory: 'Part of the traditional "panch phoron" and Mughlai cooking tradition'
        },
        {
            id: 'star-anise', name: 'Star Anise (Chakra Phool)', icon: '⭐', region: 'Northeast India',
            category: 'fruit', primaryUse: 'Culinary & Pharmaceutical',
            desc: 'Star-shaped wonder — licorice-flavored pods used in biryanis and as the source of antiviral Tamiflu.',
            origin: 'South China and Northeast India; Manipur and Nagaland are key Indian growing regions.',
            benefits: ['Antiviral properties', 'Digestive aid', 'Galactagogue', 'Sleep aid'],
            culinaryUses: ['Biryani', 'Garam masala', 'Pho and Asian broths', 'Chai'],
            science: 'Source of shikimic acid, the raw material for Tamiflu (oseltamivir). Contains anethole — the same compound as fennel and aniseed.',
            season: 'Sept-Nov harvest', tradeHistory: 'Native to Assam-Manipur corridor; traded along the Indo-China silk route'
        },
        {
            id: 'fennel', name: 'Fennel (Saunf)', icon: '🟢', region: 'Rajasthan / Punjab',
            category: 'seed', primaryUse: 'Culinary & Digestive',
            desc: 'Sweet and anise-flavored — the post-meal mouth freshener that doubles as a digestive medicine.',
            origin: 'Mediterranean; naturalized across the Indian subcontinent since ancient times.',
            benefits: ['Digestive aid', 'Breath freshener', 'Eye health', 'Respiratory relief'],
            culinaryUses: ['Mukhwas (mouth freshener)', 'Saunf chai', 'Pickles', 'Bengali five-spice (panch phoron)'],
            science: 'Anethole relaxes smooth muscles of the intestine, relieving colic and bloating. Also contains vitamin C and antioxidants.',
            season: 'Feb-March harvest', tradeHistory: 'Used in Indian cuisine for over 3,000 years; mentioned in Charaka Samhita'
        },
        {
            id: 'tamarind', name: 'Tamarind (Imli)', icon: '🟤', region: 'South India / Maharashtra',
            category: 'fruit_pulp', primaryUse: 'Culinary Sour Agent',
            desc: 'Tangy and sweet — the pulp that gives South Indian cuisine its signature sourness.',
            origin: 'Tropical Africa; cultivated in India since the early centuries CE.',
            benefits: ['Digestive aid', 'Rich in tartaric acid', 'Anti-inflammatory', 'Liver protective'],
            culinaryUses: ['Sambar', 'Rasam', 'Imli chutney', 'Pani puri water'],
            science: 'Tartaric acid is a powerful antioxidant. Also contains tartaric, malic, and citric acids that aid iron absorption.',
            season: 'Jan-March harvest', tradeHistory: 'Called "Indian date" by Arab traders; spread across Asia via maritime trade'
        },
        {
            id: 'ajwain', name: 'Ajwain (Carom Seeds)', icon: '🟤', region: 'Rajasthan / Gujarat',
            category: 'seed', primaryUse: 'Culinary & Medicinal',
            desc: 'Thyme-like and pungent — the secret tempering ingredient that prevents bloating and adds sharp flavor.',
            origin: 'Eastern Mediterranean to India; cultivated in Rajasthan and Gujarat for centuries.',
            benefits: ['Instant gas relief', 'Antibacterial', 'Nasal congestion relief', 'Appetite stimulant'],
            culinaryUses: ['Pakora batter', 'Paratha dough', 'Tadka', 'Papdi chaat'],
            science: 'Thymol (60-70% of oil) is the same compound found in thyme. Provides near-instant relief from bloating and indigestion.',
            season: 'March-April harvest', tradeHistory: 'Used in Ayurveda for millennia; called "yavani" in ancient texts'
        },
        {
            id: 'nutmeg', name: 'Nutmeg (Jaiphal)', icon: '🟤', region: 'Kerala',
            category: 'seed', primaryUse: 'Culinary & Medicinal',
            desc: 'Warm and nutty — used sparingly in both sweet and savory dishes, a key ingredient in Mughlai cuisine.',
            origin: 'Maluku Islands (Spice Islands); introduced to India via spice trade routes.',
            benefits: ['Sleep aid', 'Pain relief', 'Brain health', 'Digestion support'],
            culinaryUses: ['Mughlai korma', 'Garam masala', 'Desserts', 'Beverages'],
            science: 'Myristicin in large doses is psychoactive (hence "use sparingly"). In culinary amounts, it improves sleep quality and reduces anxiety.',
            season: 'Aug-Nov harvest', tradeHistory: 'Once the most valuable spice after pepper; the Dutch committed genocide to control its supply'
        },
        {
            id: 'long-pepper', name: 'Long Pepper (Pippali)', icon: '🟤', region: 'Northeast India',
            category: 'fruit', primaryUse: 'Ayurvedic Medicine',
            desc: 'Ancient and forgotten — the original "pepper" that predated black pepper in global trade.',
            origin: 'Northeast India; Piper longum vine. Predates black pepper in historical records.',
            benefits: ['Respiratory remedy', 'Bioavailability enhancer', 'Liver support', 'Immune booster'],
            culinaryUses: ['Chyawanprash', 'Ayurvedic preparations', 'Pickles', 'Tonic drinks'],
            science: 'Piperine content is higher than black pepper. Piperlongumine has shown anti-cancer properties in laboratory studies.',
            season: 'Dec-Feb harvest', tradeHistory: 'Called "pippali" in Sanskrit; was the pepper known to ancient Greeks before black pepper'
        },
        {
            id: 'nigella', name: 'Nigella Seeds (Kalonji)', icon: '⚫', region: 'Rajasthan / Bengal',
            category: 'seed', primaryUse: 'Culinary',
            desc: 'Onion-flavored and slightly bitter — the black seeds sprinkled on naan and used in panch phoron.',
            origin: 'Southern Europe to Western Asia; naturalized across India.',
            benefits: ['Blood sugar regulation', 'Liver protective', 'Anti-inflammatory', 'Digestive aid'],
            culinaryUses: ['Naan topping', 'Panch phoron', 'Pickles', 'Achari masala'],
            science: 'Thymoquinone is the primary active compound — shown to reduce tumor growth in laboratory studies. Also improves insulin sensitivity.',
            season: 'March-April harvest', tradeHistory: 'Called "black cumin" in medieval texts; found in Tutankhamun\'s tomb'
        },
        {
            id: 'curry-leaf', name: 'Curry Leaf (Kadi Patta)', icon: '🌿', region: 'South India',
            category: 'leaf', primaryUse: 'Culinary Aromatic',
            desc: 'Irreplaceable and aromatic — the fresh leaf that gives South Indian tadka its distinctive fragrance.',
            origin: 'Native to India; the name derives from Tamil "kari patta" (sauce leaf).',
            benefits: ['Cholesterol reduction', 'Hair health', 'Diabetes management', 'Digestive aid'],
            culinaryUses: ['Sambar tadka', 'Rasam', 'Curry leaf rice', 'Chutneys'],
            science: 'Contains mahanimbine — shown to reduce LDL cholesterol. Also rich in carbazole alkaloids with anti-cancer properties.',
            season: 'Year-round harvest', tradeHistory: 'Used in South Indian cooking for over 2,000 years; central to Tamil and Kannada cuisine'
        }
    ];

    const CATEGORIES = { all: 'All Spices', root: 'Root', seed: 'Seed', bark: 'Bark', fruit: 'Fruit', leaf: 'Leaf', stigma: 'Stigma', resin: 'Resin', flower_bud: 'Flower Bud', fruit_pulp: 'Fruit Pulp' };

    let catFilter = 'all', query = '';

    function init() {
        renderFilters();
        bindEvents();
        filterAndRender();
    }

    function renderFilters() {
        document.getElementById('sa-filters').innerHTML = Object.entries(CATEGORIES).map(([k, v]) =>
            `<button class="sa-fbtn${k === 'all' ? ' active' : ''}" data-cat="${k}">${v}</button>`
        ).join('');
    }

    function getFiltered() {
        let list = [...SPICES];
        if (catFilter !== 'all') list = list.filter(s => s.category === catFilter);
        if (query) {
            const q = query.toLowerCase();
            list = list.filter(s =>
                s.name.toLowerCase().includes(q) ||
                s.region.toLowerCase().includes(q) ||
                s.category.toLowerCase().includes(q) ||
                s.primaryUse.toLowerCase().includes(q) ||
                s.desc.toLowerCase().includes(q) ||
                s.benefits.some(b => b.toLowerCase().includes(q)) ||
                s.culinaryUses.some(u => u.toLowerCase().includes(q))
            );
        }
        return list;
    }

    function filterAndRender() {
        const filtered = getFiltered();
        const grid = document.getElementById('sa-grid');
        const empty = document.getElementById('sa-empty');
        if (filtered.length === 0) { grid.style.display = 'none'; empty.style.display = 'block'; return; }
        grid.style.display = ''; empty.style.display = 'none';
        grid.innerHTML = filtered.map((s, i) => `
            <article class="sa-card" role="listitem" data-sid="${s.id}" style="animation-delay:${i * 0.04}s">
                <div class="sa-card-accent"></div>
                <div class="sa-card-body">
                    <div class="sa-card-top">
                        <span class="sa-card-icon">${s.icon}</span>
                        <div><h3 class="sa-card-name">${s.name}</h3><span class="sa-card-meta">📍 ${s.region} · ${s.primaryUse}</span></div>
                    </div>
                    <p class="sa-card-desc">${s.desc}</p>
                    <div class="sa-card-tags">
                        <span class="sa-tag">${s.category}</span>
                        <span class="sa-tag benefits">${s.benefits[0]}</span>
                        <span class="sa-tag uses">${s.culinaryUses[0]}</span>
                    </div>
                </div>
            </article>
        `).join('');
    }

    function openModal(sid) {
        const s = SPICES.find(x => x.id === sid);
        if (!s) return;
        document.getElementById('sa-modal-body').innerHTML = `
            <div class="sa-modal-hero"></div>
            <div class="sa-modal-icon">${s.icon}</div>
            <h2 class="sa-modal-title">${s.name}</h2>
            <p class="sa-modal-info">📍 ${s.region} · ${s.primaryUse}</p>
            <div class="sa-modal-detail">
                <div class="sa-modal-ditem"><p class="sa-modal-dlbl">Category</p><p class="sa-modal-dval">${s.category.replace('_',' ')}</p></div>
                <div class="sa-modal-ditem"><p class="sa-modal-dlbl">Harvest</p><p class="sa-modal-dval">${s.season}</p></div>
                <div class="sa-modal-ditem"><p class="sa-modal-dlbl">Primary Use</p><p class="sa-modal-dval">${s.primaryUse}</p></div>
                <div class="sa-modal-ditem"><p class="sa-modal-dlbl">Origin</p><p class="sa-modal-dval">${s.region}</p></div>
            </div>
            <div class="sa-modal-sec"><h4>Overview</h4><p>${s.desc}</p></div>
            <div class="sa-modal-sec"><h4>Origin Story</h4><p>${s.origin}</p></div>
            <div class="sa-modal-sec"><h4>Health Benefits</h4>
                <div class="sa-modal-tags">${s.benefits.map(b => `<span class="sa-modal-chip">${b}</span>`).join('')}</div>
            </div>
            <div class="sa-modal-sec"><h4>Culinary Uses</h4>
                <div class="sa-modal-tags">${s.culinaryUses.map(u => `<span class="sa-modal-chip">${u}</span>`).join('')}</div>
            </div>
            <div class="sa-modal-sec"><h4>Science & Research</h4><p>${s.science}</p></div>
            <div class="sa-modal-sec"><h4>Trade History</h4><p>${s.tradeHistory}</p></div>
        `;
        const m = document.getElementById('sa-modal');
        m.classList.add('open'); m.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        const m = document.getElementById('sa-modal');
        m.classList.remove('open'); m.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    function bindEvents() {
        document.getElementById('sa-filters').addEventListener('click', e => {
            const btn = e.target.closest('.sa-fbtn'); if (!btn) return;
            document.querySelectorAll('.sa-fbtn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active'); catFilter = btn.dataset.cat; filterAndRender();
        });
        document.getElementById('sa-grid').addEventListener('click', e => {
            const card = e.target.closest('.sa-card'); if (card) openModal(card.dataset.sid);
        });
        document.getElementById('sa-search').addEventListener('input', e => { query = e.target.value; filterAndRender(); });
        document.getElementById('sa-reset').addEventListener('click', () => {
            query = ''; catFilter = 'all'; document.getElementById('sa-search').value = '';
            document.querySelectorAll('.sa-fbtn').forEach(b => b.classList.remove('active'));
            document.querySelector('.sa-fbtn[data-cat="all"]').classList.add('active'); filterAndRender();
        });
        document.getElementById('sa-modal-x').addEventListener('click', closeModal);
        document.getElementById('sa-modal-bg').addEventListener('click', closeModal);
        document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
