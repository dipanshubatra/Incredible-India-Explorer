/**
 * Indian Festival Calendar — Interactive Module
 * Month-by-month exploration of India's major festivals.
 * Features: search, month filtering, detail modals, accessibility.
 */
(function () {
    'use strict';

    /* ======================================================================
       MONTHS
       ====================================================================== */
    const MONTHS = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    /* ======================================================================
       FESTIVAL DATA — 25 Major Indian Festivals
       ====================================================================== */
    const FESTIVALS = [
        {
            id: 'makar-sankranti',
            name: 'Makar Sankranti',
            month: 'January',
            emoji: '☀️',
            region: 'Pan-India',
            religion: 'Hindu',
            date: 'Jan 14',
            desc: 'Harvest festival marking the sun\'s transition into Capricorn. Celebrated with kite flying, sesame sweets, and holy river dips.',
            details: 'Known as Pongal in Tamil Nadu, Lohri in Punjab, and Uttarayan in Gujarat. The festival celebrates the end of winter solstice and the beginning of longer days. People prepare til-gul (sesame-jaggery sweets) and exchange them saying "Til-gul ghya, god god bola" (Accept this sweet and speak sweetly). The Uttarayan kite festival in Ahmedabad sees millions of kites fill the sky, with rooftop competitions lasting all day.',
            timings: 'Sunrise to Sunset',
            food: 'Til-gul ladoo, chikki, puran poli'
        },
        {
            id: 'republic-day',
            name: 'Republic Day',
            month: 'January',
            emoji: '🇮🇳',
            region: 'Pan-India',
            religion: 'National',
            date: 'Jan 26',
            desc: 'National celebration of India\'s constitution with a spectacular military parade at Rajpath, New Delhi.',
            details: 'The grand parade showcases India\'s military might, cultural diversity, and technological achievements. Tableaux from every state and union territory participate, each presenting unique cultural heritage. The Beating Retreat ceremony on Jan 29 marks the formal end of Republic Day celebrations. Students from schools across India march in the parade.',
            timings: 'Morning parade begins 9:30 AM',
            food: 'Special community feasts and picnics'
        },
        {
            id: 'vasant-panchami',
            name: 'Vasant Panchami',
            month: 'February',
            emoji: '💛',
            region: 'North India',
            religion: 'Hindu',
            date: 'Feb/March (variable)',
            desc: 'Spring festival honoring Saraswati, goddess of learning. Yellow color symbolizes energy and new beginnings.',
            details: 'Students place their books before Saraswati\'s idol seeking blessings for academic success. In Punjab, it merges with Basant kite festival. Schools and colleges organize special prayers. The festival marks the preparation for spring and the arrival of Holi weeks later. People wear yellow clothes and prepare saffron rice. Saraswati temples see thousands of devotees.',
            timings: 'Early morning Saraswati Puja',
            food: 'Saffron rice, kesari halwa, yellow-colored sweets'
        },
        {
            id: 'maha-shivaratri',
            name: 'Maha Shivaratri',
            month: 'February',
            emoji: '🔱',
            region: 'Pan-India',
            religion: 'Hindu',
            date: 'Feb/March (variable)',
            desc: 'The "Great Night of Shiva" — devotees fast, chant, and offer water to Shiva lingams through the night.',
            details: 'Believed to be the night Lord Shiva performed the Tandava cosmic dance. In Varanasi, millions gather at the Kashi Vishwanath temple. In Kerala, the famous Attukal Pongala sees millions of women cooking offerings. The night-long worship includes reading the Shiva Purana and offering bel leaves. Temple bells ring through the night.',
            timings: 'Night-long (4 Praharas)',
            food: 'Fasting foods — fruits, milk, vrat ka khana'
        },
        {
            id: 'holi',
            name: 'Holi',
            month: 'March',
            emoji: '🎨',
            region: 'Pan-India',
            religion: 'Hindu',
            date: 'March (variable)',
            desc: 'The festival of colors — throwing gulal, dancing, bonfires of Holika, and celebrating the triumph of good.',
            details: 'Celebrated a day after Holika Dahan (bonfire). In Mathura-Vrindavan, the week-long celebrations include Lathmar Holi where women playfully beat men with sticks. In Bengal, it\'s celebrated as Dol Jatra with images of Radha-Krishna. The night before, communities gather for Holika Dahan bonfires symbolizing the burning of evil. Thandai (spiced milk) is the traditional drink.',
            timings: 'Morning to Afternoon (main day)',
            food: 'Gujiya, thandai, malpua, dahi vada'
        },
        {
            id: 'ugadi',
            name: 'Ugadi / Gudi Padwa',
            month: 'March',
            emoji: '🥭',
            region: 'South & West India',
            religion: 'Hindu',
            date: 'March/April (variable)',
            desc: 'New Year festival in Karnataka, Andhra, Maharashtra — neem-jaggery tasting symbolizes life\'s bittersweet nature.',
            details: 'The Hindu New Year according to the lunisolar calendar. In Karnataka, Ugadi Pachadi (neem-jaggery chutney) represents six flavors of life — sweet, sour, salty, bitter, pungent, astringent. In Maharashtra, Gudi Padwa features raising of the Gudi (decorative pole with garlands). In Kashmir, it\'s celebrated as Navreh with rice on silver plates. People read their annual horoscope (Panchanga Sravanam).',
            timings: 'Morning rituals',
            food: 'Ugadi pachadi, obbattu, shrikhand'
        },
        {
            id: 'ram-navami',
            name: 'Ram Navami',
            month: 'April',
            emoji: '🏹',
            region: 'Pan-India',
            religion: 'Hindu',
            date: 'April (variable)',
            desc: 'Birthday of Lord Ram — bhajans, recitations of Ramayana, and processions at Ayodhya.',
            details: 'Marks the birth of Lord Rama, the seventh avatar of Vishnu. Ayodhya\'s celebrations center around the Ram Janmabhoomi temple with elaborate decorations. In South India, temples host elaborate wedding ceremonies of Rama and Sita (Kalyanotsavam). Temples distribute panjiri (prasad) and organize community feasts. Ramayana recitations continue for nine days leading up to the festival.',
            timings: 'Madhyahna (noon — exact birth time)',
            food: 'Panjiri, chana, puri, kheer'
        },
        {
            id: 'baisakhi',
            name: 'Baisakhi',
            month: 'April',
            emoji: '🌾',
            region: 'Punjab',
            religion: 'Sikh',
            date: 'April 13-14',
            desc: 'Sikh New Year and harvest festival — Nagar Kirtan processions, bhangra, and gurudwara prayers.',
            details: 'Celebrates the formation of the Khalsa by Guru Gobind Singh in 1699. In Punjab, fields are alive with golden mustard crops. The day begins with early morning gurudwara visits, followed by Nagar Kirtan processions led by the Panj Pyare (Five Beloved Ones). Bhangra and Giddha folk dances fill the streets. Langars (community kitchens) serve free meals to all.',
            timings: 'Early morning to evening',
            food: 'Kadhi pakora, chole bhature, jalebi'
        },
        {
            id: 'eid-ul-fitr',
            name: 'Eid-ul-Fitr',
            month: 'April',
            emoji: '🌙',
            region: 'Pan-India',
            religion: 'Islam',
            date: 'April/May (variable)',
            desc: 'End of Ramadan fasting — prayers at mosques, feasts, new clothes, and sharing Zakat with the poor.',
            details: 'Marks the end of the holy month of Ramadan. The day begins with Eid prayers at eidgahs and mosques. Women prepare sevaiyan (vermicelli), biryani, and special sweets. Children receive Eidi (gifts/money). Communities organize Eid Milan parties. In Lucknow, the Chhota Imambara hosts grand celebrations. In Kerala, Thalayoli Parambu temple grounds host large gatherings.',
            timings: 'Early morning Eid prayers',
            food: 'Sheer khurma, sewaiyan, biryani, kebabs'
        },
        {
            id: 'akh-tirujeev',
            name: 'Akshaya Tritiya',
            month: 'May',
            emoji: '🪙',
            region: 'Pan-India',
            religion: 'Hindu/Jain',
            date: 'May (variable)',
            desc: 'Auspicious day for new beginnings — buying gold, starting businesses, and charity.',
            details: 'Believed to bring good fortune and success. In Jain tradition, it marks the anniversary of Lord Adinath\'s ending his first ascetic fast. In Odisha, people prepare Tanka (enduring rice cakes). Gold shops record their highest sales of the year. Many families begin new construction or business ventures. Temples hold special pujas and communities organize charity drives.',
            timings: 'All day considered auspicious',
            food: 'Sweets, temple prasad, community feasts'
        },
        {
            id: 'rath-yatra',
            name: 'Rath Yatra',
            month: 'June',
            emoji: '🛞',
            region: 'Odisha',
            religion: 'Hindu',
            date: 'June/July (variable)',
            desc: 'The grand chariot festival of Lord Jagannath in Puri — three massive wooden chariots pulled by thousands.',
            details: 'The three chariots — Nandighosa (Jagannath), Taladhwaja (Balabhadra), and Darpadalana (Subhadra) — are pulled from the main temple to Gundicha Temple. Over a million devotees participate. The chariots are built fresh each year from neem wood. The festival includes Mausima temple stop where offerings of podapitha are made. Nine days later, the Bahuda Yatra returns the deities.',
            timings: 'Morning procession',
            food: 'Podapitha, mahaprasad, kheer'
        },
        {
            id: 'teej',
            name: 'Teej',
            month: 'July',
            emoji: '🐅',
            region: 'North India',
            religion: 'Hindu',
            date: 'July/August (variable)',
            desc: 'Monsoon festival of marital bliss — women dress in green, apply mehndi, and fast for husbands.',
            details: 'Celebrates the reunion of Shiva and Parvati. In Rajasthan, the Harishankar Temple fair in Bubni sees thousands of swings. Women wear green saris and apply elaborate mehndi. In Haryana, it\'s a state holiday. The Haryali Teej features decorated swings in gardens and nurseries. Women sing traditional Teej songs while swinging on decorated jhoolas.',
            timings: 'Pre-dawn to evening',
            food: 'Ghevar, dal moth, kheer'
        },
        {
            id: 'raksha-bandhan',
            name: 'Raksha Bandhan',
            month: 'August',
            emoji: '🎀',
            region: 'Pan-India',
            religion: 'Hindu',
            date: 'Aug (variable)',
            desc: 'Celebrating the sibling bond — sisters tie sacred threads on brothers\' wrists, brothers vow protection.',
            details: 'The sacred thread (rakhi) symbolizes the sister\'s love and prayers for her brother\'s well-being, while the brother pledges to protect her. Markets overflow with decorative rakhis weeks before the festival. In some regions, it\'s celebrated as Narali Purnima (coconut offering to the sea) by fishing communities. Families gather for elaborate meals and exchange gifts.',
            timings: 'Afternoon (Shubh Muhurat)',
            food: 'Sweets, burfi, rasgulla, family feast'
        },
        {
            id: 'onam',
            name: 'Onam',
            month: 'August',
            emoji: '🌾',
            region: 'Kerala',
            religion: 'Hindu',
            date: 'Aug/Sept (variable)',
            desc: 'Kerala\'s harvest festival — Pookalam flower carpets, snake boat races, and the Onam Sadya feast.',
            details: 'Ten-day festival celebrating King Mahabali\'s legendary return. Pookalam (floral carpet) designs grow more elaborate each day. Onam Sadhya features 26+ dishes served on banana leaves — avial, sambar, olan, payasam. Vallam Kali (snake boat races) in Alleppey are thrilling. Pulikali (tiger dance) in Thrissur features men painted as tigers dancing through streets.',
            timings: 'Ten days, main day Atham',
            food: 'Onam Sadya — 26+ dishes on banana leaf'
        },
        {
            id: 'ganesh-chaturthi',
            name: 'Ganesh Chaturthi',
            month: 'September',
            emoji: '🐘',
            region: 'Pan-India (esp. Maharashtra)',
            religion: 'Hindu',
            date: 'Aug/Sept (variable)',
            desc: 'Birth of Lord Ganesha — elaborate pandals, modak offerings, and grand immersion processions.',
            details: 'Ten-day festival celebrating Ganesha\'s birth. Lalbaugcha Raja in Mumbai draws millions of devotees. Families install Ganesha idols at home and offer modak (sweet dumplings — his favorite). Visarjan (immersion) processions feature music, dance, and chants of "Ganpati Bappa Morya!" The festival promotes community bonding and artistic expression through elaborate pandal decorations.',
            timings: 'Morning Prana Pratishtha',
            food: 'Modak, karanji, puran poli, ladu'
        },
        {
            id: 'durga-puja',
            name: 'Durga Puja',
            month: 'October',
            emoji: '🪷',
            region: 'East India',
            religion: 'Hindu',
            date: 'Sept/Oct (variable)',
            desc: 'Goddess Durga\'s triumph over Mahishasur — pandal-hopping, cultural programs, sindoor khela.',
            details: 'The grandest festival of Bengal. Thousands of artistically crafted pandals house Durga idols. Cultural programs, art exhibitions, and food stalls transform neighborhoods into festive zones. Sindoor Khela on Vijaya Dashami features married women applying vermillion to Goddess Durga and then to each other. The immersion ceremony (Bijoya Dashami) sees emotional processions to rivers.',
            timings: 'Five days starting Mahalaya',
            food: 'Luchi-alur dom, payesh, sandesh, rasgulla'
        },
        {
            id: 'navratri',
            name: 'Navratri & Dussehra',
            month: 'October',
            emoji: '💃',
            region: 'Pan-India',
            religion: 'Hindu',
            date: 'Sept/Oct (variable)',
            desc: 'Nine nights of dance (Garba/Dandiya) honoring Devi, culminating in Ravana\'s defeat on Dussehra.',
            details: 'In Gujarat, millions perform Garba and Dandiya Raas in traditional attire across dance floors. In Kolkata, it merges with Durga Puja celebrations. In Mysuru, the Dasara procession features the Golden Howdah and caparisoned elephants. In Delhi, the Ram Lila culminates in burning Ravana effigies at the Ramleela grounds. Each of the nine nights honors a different form of Goddess Durga.',
            timings: 'Nine consecutive nights',
            food: 'Fasting foods (North), festive meals (South)'
        },
        {
            id: 'diwali',
            name: 'Diwali',
            month: 'November',
            emoji: '🪔',
            region: 'Pan-India',
            religion: 'Hindu/Sikh/Jain',
            date: 'Oct/Nov (variable)',
            desc: 'Festival of lights — diyas, rangoli, fireworks, Lakshmi Puja, and celebrating good over evil.',
            details: 'Five-day celebration: Dhanteras (gold buying), Naraka Chaturdashi (early morning oil bath), Lakshmi Puja (main day with millions of diyas lit), Govardhan Puja (mountain of food offering), Bhai Dooj (sibling bond). In Ayodhya, the Ram Darbar ceremony celebrates Ram\'s return. In Kolkata, it\'s Kali Puja. Sikhs celebrate Bandi Chhor Divas on the same day.',
            timings: 'Five days, Lakshmi Puja at dusk',
            food: 'Samosa, ladoo, chakli, karanji'
        },
        {
            id: 'guru-nanak',
            name: 'Guru Nanak Jayanti',
            month: 'November',
            emoji: '🙏',
            region: 'Pan-India',
            religion: 'Sikh',
            date: 'Nov (variable)',
            desc: 'Birth of Guru Nanak — Prabhat Pheris, Gurbani Kirtan, and langars feeding thousands.',
            details: 'The holiest Sikh festival. Celebrations begin two days before with Akhand Path (48-hour continuous reading of Guru Granth Sahib). On the day, Nagar Sankirtan processions with the Guru Granth Sahib pass through streets. Langars serve free meals to all visitors regardless of faith. The Harmandir Sahib (Golden Temple) in Amritsar hosts the grandest celebration with special illuminations.',
            timings: 'Pre-dawn to late night',
            food: 'Langar — dal, roti, kheer, sabzi'
        },
        {
            id: 'christmas',
            name: 'Christmas',
            month: 'December',
            emoji: '🎄',
            region: 'Pan-India',
            religion: 'Christian',
            date: 'Dec 25',
            desc: 'Celebration of Christ\'s birth — midnight masses, decorated churches, and gift-giving.',
            details: 'In Goa, churches are adorned with stars and lights, and Christmas cake (bolinhas) is baked. In Mumbai, Bandra\'s Mount Mary Church draws thousands. In Meghalaya, Shillong hosts the Christmas Carnival with music and food. In Kerala, churches hold midnight masses with elaborate nativity scenes. Christmas cake (plum cake) is a beloved tradition across communities.',
            timings: 'Midnight Mass to evening',
            food: 'Christmas cake, plum cake, appam-stew'
        },
        {
            id: 'pongal',
            name: 'Pongal',
            month: 'January',
            emoji: '🍚',
            region: 'Tamil Nadu',
            religion: 'Hindu',
            date: 'Jan 14-17',
            desc: 'Four-day Tamil harvest festival — boiling rice, cattle decoration, and thanksgiving to nature.',
            details: 'Day 1: Bhogi Pongal (cleaning, old things burnt). Day 2: Surya Pongal (cooking rice in new pots facing the sun — the rice must overflow symbolizing abundance). Day 3: Mattu Pongal (cattle worship, decorated horns, garlands). Day 4: Kaanum Pongal (family outings, sister-brother bonding). Kolam (rangoli) patterns made of rice flour adorn doorsteps throughout the festival.',
            timings: 'Four consecutive days',
            food: 'Ven pongal, sakkarai pongal, payasam'
        },
        {
            id: 'krishna-janmashtami',
            name: 'Krishna Janmashtami',
            month: 'August',
            emoji: '🦚',
            region: 'Pan-India',
            religion: 'Hindu',
            date: 'Aug/Sept (variable)',
            desc: 'Birth of Lord Krishna — midnight celebrations, Dahi Handi pyramids, and Raas Leela dance dramas.',
            details: 'Celebrated at midnight when Krishna is believed to have been born. In Mumbai, massive Dahi Handi events feature human pyramids breaking the curd pot. In Mathura-Vrindavan, the entire city celebrates with Raas Leela dance dramas. In Manipur, it\'s celebrated asKrishna Janma with classical Raslila. Temples organize all-night bhajan sessions and children dress as Krishna and Radha.',
            timings: 'Midnight (exact birth time)',
            food: 'Makhan-mishri, kheer, chappan bhog'
        },
        {
            id: 'uthradam',
            name: 'Uthradam (Onam Day 9)',
            month: 'September',
            emoji: '🍌',
            region: 'Kerala',
            religion: 'Hindu',
            date: 'Sept (variable)',
            desc: 'The eve of Thiruvonam — families prepare the grand Sadya feast and welcome King Mahabali.',
            details: 'The penultimate day of Onam when preparations reach their peak. Families clean and decorate their homes, banana leaves are readied for the Sadya, and women cook elaborate dishes. In many households, the eldest family member symbolically welcomes Mahabali. Kathakali performances and traditional music fill the evening. The entire state buzzes with anticipation for the grand Thiruvonam celebrations the next day.',
            timings: 'All day preparation',
            food: 'Preparation of Sadya dishes'
        },
        {
            id: 'kahoga',
            name: 'Kahoga / Loosong',
            month: 'November',
            emoji: '🎊',
            region: 'Sikkim',
            religion: 'Buddhist',
            date: 'Nov/Dec (variable)',
            desc: 'Sikkimese New Year — community feasts, masked dances, and cleaning rituals to welcome prosperity.',
            details: 'The Sikkimese New Year marks the end of the harvest season. Families thoroughly clean their homes and perform rituals to drive away negative energy. Monasteries host masked Cham dances performed by monks in elaborate costumes. Community feasts feature traditional dishes like gundruk and kinema. The festival strengthens community bonds and honors Buddhist traditions in the Himalayan state.',
            timings: 'Full day celebrations',
            food: 'Gundruk, kinema, thukpa, momos'
        }
    ];

    /* ======================================================================
       APPLICATION STATE
       ====================================================================== */
    let activeMonth = 'all';
    let searchQuery = '';

    /* ======================================================================
       INITIALIZATION
       ====================================================================== */
    function init() {
        renderMonthNav();
        bindEvents();
        filterAndRender();
    }

    /* ======================================================================
       RENDER MONTH NAVIGATION
       ====================================================================== */
    function renderMonthNav() {
        const nav = document.getElementById('fc-month-nav');
        nav.innerHTML = `<button class="fc-month-btn active" data-month="all">All</button>` +
            MONTHS.map(m => `<button class="fc-month-btn" data-month="${m}">${m.slice(0, 3)}</button>`).join('');
    }

    /* ======================================================================
       FILTER LOGIC
       ====================================================================== */
    function getFiltered() {
        let list = [...FESTIVALS];

        // Filter by month
        if (activeMonth !== 'all') {
            list = list.filter(f => f.month === activeMonth);
        }

        // Filter by search query
        if (searchQuery) {
            const q = searchQuery.toLowerCase();
            list = list.filter(f =>
                f.name.toLowerCase().includes(q) ||
                f.month.toLowerCase().includes(q) ||
                f.region.toLowerCase().includes(q) ||
                f.religion.toLowerCase().includes(q) ||
                f.desc.toLowerCase().includes(q) ||
                f.food.toLowerCase().includes(q)
            );
        }

        return list;
    }

    /* ======================================================================
       RENDER CRAFTS GRID
       ====================================================================== */
    function filterAndRender() {
        const filtered = getFiltered();
        const grid = document.getElementById('fc-grid');
        const empty = document.getElementById('fc-empty');
        const label = document.getElementById('fc-month-label');

        label.textContent = activeMonth === 'all'
            ? `All Festivals (${filtered.length})`
            : `${activeMonth} Festivals (${filtered.length})`;

        if (filtered.length === 0) {
            grid.style.display = 'none';
            empty.style.display = 'block';
            return;
        }

        grid.style.display = '';
        empty.style.display = 'none';

        grid.innerHTML = filtered.map((f, i) => `
            <article class="fc-card" role="listitem" data-fid="${f.id}" style="animation-delay:${i * 0.04}s">
                <div class="fc-card-top">
                    <span class="fc-card-emoji">${f.emoji}</span>
                    <div>
                        <h3 class="fc-card-name">${f.name}</h3>
                        <span class="fc-card-meta">${f.date} · ${f.region}</span>
                    </div>
                </div>
                <p class="fc-card-desc">${f.desc}</p>
                <div class="fc-card-tags">
                    <span class="fc-tag">${f.religion}</span>
                    <span class="fc-tag">${f.month}</span>
                    <span class="fc-tag">${f.timings}</span>
                </div>
            </article>
        `).join('');
    }

    /* ======================================================================
       MODAL
       ====================================================================== */
    function openModal(fid) {
        const f = FESTIVALS.find(x => x.id === fid);
        if (!f) return;

        const body = document.getElementById('fc-modal-body');
        body.innerHTML = `
            <div class="fc-modal-emoji">${f.emoji}</div>
            <h2 class="fc-modal-title">${f.name}</h2>
            <p class="fc-modal-info">${f.date} · ${f.region} · ${f.religion}</p>
            <div class="fc-modal-detail">
                <div class="fc-modal-ditem">
                    <p class="fc-modal-dlbl">Month</p>
                    <p class="fc-modal-dval">${f.month}</p>
                </div>
                <div class="fc-modal-ditem">
                    <p class="fc-modal-dlbl">Region</p>
                    <p class="fc-modal-dval">${f.region}</p>
                </div>
                <div class="fc-modal-ditem">
                    <p class="fc-modal-dlbl">Tradition</p>
                    <p class="fc-modal-dval">${f.religion}</p>
                </div>
                <div class="fc-modal-ditem">
                    <p class="fc-modal-dlbl">Timings</p>
                    <p class="fc-modal-dval">${f.timings}</p>
                </div>
            </div>
            <div class="fc-modal-sec">
                <h4>Overview</h4>
                <p>${f.desc}</p>
            </div>
            <div class="fc-modal-sec">
                <h4>Significance & Traditions</h4>
                <p>${f.details}</p>
            </div>
            <div class="fc-modal-sec">
                <h4>Traditional Food</h4>
                <p>${f.food}</p>
            </div>
        `;

        const modal = document.getElementById('fc-modal');
        modal.classList.add('open');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        const m = document.getElementById('fc-modal');
        m.classList.remove('open');
        m.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    /* ======================================================================
       EVENT BINDING
       ====================================================================== */
    function bindEvents() {
        // Month filter
        document.getElementById('fc-month-nav').addEventListener('click', function (e) {
            const btn = e.target.closest('.fc-month-btn');
            if (!btn) return;
            document.querySelectorAll('.fc-month-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            activeMonth = btn.dataset.month;
            filterAndRender();
        });

        // Card click (delegated)
        document.getElementById('fc-grid').addEventListener('click', function (e) {
            const card = e.target.closest('.fc-card');
            if (card) openModal(card.dataset.fid);
        });

        // Search input
        document.getElementById('fc-search').addEventListener('input', function (e) {
            searchQuery = e.target.value;
            filterAndRender();
        });

        // Reset filters
        document.getElementById('fc-reset').addEventListener('click', function () {
            searchQuery = '';
            activeMonth = 'all';
            document.getElementById('fc-search').value = '';
            document.querySelectorAll('.fc-month-btn').forEach(b => b.classList.remove('active'));
            document.querySelector('.fc-month-btn[data-month="all"]').classList.add('active');
            filterAndRender();
        });

        // Modal close
        document.getElementById('fc-modal-x').addEventListener('click', closeModal);
        document.getElementById('fc-modal-bg').addEventListener('click', closeModal);
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') closeModal();
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
