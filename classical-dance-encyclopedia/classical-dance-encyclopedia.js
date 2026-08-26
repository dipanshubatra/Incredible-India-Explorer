/**
 * Indian Classical Dance Encyclopedia — Interactive Module
 * Explores India's 8 classical dance forms recognized by the Sangeet Natak Akademi.
 * Features: search, region filtering, comparison section, animated particles, detail modals.
 */
(function () {
    'use strict';

    /* ======================================================================
       CLASSICAL DANCE DATA — 8 Recognized Forms
       ====================================================================== */
    const DANCES = [
        {
            id: 'bharatanatyam', name: 'Bharatanatyam', state: 'Tamil Nadu',
            icon: '💃', region: 'south', deity: 'Lord Shiva',
            costume: 'Silk saree (Madisar style), temple jewelry, ankle bells (salangai), jasmine flowers',
            origin: 'Ancient Tamil Nadu (2nd century BCE)', musicStyle: 'Carnatic',
            keyGuru: 'Rukmini Devi Arundale', yearRecognized: '1947',
            desc: 'India\'s oldest and most widely practiced classical dance — geometric precision, expressive abhinaya, and devotional storytelling.',
            details: 'Bharatanatyam originated in the temples of Tamil Nadu as a form of sacred dance performed by devadasis (temple dancers). The dance is characterized by fixed upper torso, bent legs, and elaborate footwork combined with expressive hand gestures (mudras) and facial expressions. Rukmini Devi Arundale revived it in the 1930s from a temple art to a concert stage form. The dance follows the Natya Shastra text and comprises alarippu, jatiswaram, shabdam, varnam, padam, and tillana items.',
            elements: ['Nritta (pure dance)', 'Nritya (expressive)', 'Natya (dramatic)'],
            mudras: ['Pataka', 'Tripataka', 'Ardhapataka', 'Kartarimukha'],
            keyFestival: 'Margazhi Festival, Chennai',
            relatedText: 'Natya Shastra by Bharata Muni'
        },
        {
            id: 'kathak', name: 'Kathak', state: 'Uttar Pradesh',
            icon: '🪷', region: 'north', deity: 'Lord Krishna',
            costume: 'Lehenga-choli or kurta-pajama, ghungroo ankle bells (up to 200)',
            origin: 'North India (medieval period)', musicStyle: 'Hindustani',
            keyGuru: 'Birju Maharaj', yearRecognized: '1955',
            desc: 'The storyteller\'s dance — spinning chakkars, rhythmic footwork, and Mughal-influenced grace from the courts of Lucknow.',
            details: 'Kathak derives its name from "katha" (story) and "kathakar" (storyteller). Originally performed in temple courtyards, it evolved dramatically under Mughal patronage, absorbing Persian aesthetics. The Lucknow gharana emphasizes grace and expression, Jaipur gharana focuses on rhythmic footwork, and Benaras gharana blends both. Birju Maharaj elevated the form with innovative compositions. The signature chakkar (spin) can reach up to 100 rotations in a performance.',
            elements: ['Tatkar (footwork)', 'Chakkars (spins)', 'Abhinaya (expression)'],
            mudras: ['Hamsasya', 'Mayura', 'Kapitha', 'Alapadma'],
            keyFestival: 'Kathak Mahotsav, Lucknow',
            relatedText: 'Kathakar tradition, court chronicles'
        },
        {
            id: 'kathakali', name: 'Kathakali', state: 'Kerala',
            icon: '🎭', region: 'south', deity: 'Lord Krishna / Vishnu',
            costume: 'Elaborate face paint (pachcha green), layered skirt, headgear, white beard',
            origin: 'Kerala (17th century)', musicStyle: 'Carnatic (Sopana)',
            keyGuru: 'Kalamandalam Gopi', yearRecognized: '1955',
            desc: 'The grand dance-drama — vivid face paint, larger-than-life characters, and night-long mythological performances.',
            details: 'Kathakali combines dance, music, and drama into an elaborate theatrical form. Performances typically depict stories from the Mahabharata, Ramayana, and Puranas. The distinctive green (pachcha) face paint represents noble heroes, while red-beard (kathi) characters are villainous. Performances begin at dusk and can last all night. Actors undergo rigorous physical training including eye exercises and unique mudras to convey complex narratives without spoken dialogue.',
            elements: ['Pachcha (green face)', 'Kathi (villain)', 'Minukku (refined)'],
            mudras: ['Same as Bharatanatyam plus 24 unique Kathakali mudras'],
            keyFestival: 'Onam Kathakali performances, Kerala',
            relatedText: 'Kerala Kalamandalam curriculum'
        },
        {
            id: 'odissi', name: 'Odissi', state: 'Odisha',
            icon: '🪈', region: 'east', deity: 'Lord Jagannath',
            costume: 'Silver jewelry, silk saree draped uniquely, elaborate headpiece (tahia)',
            origin: 'Odisha (2nd century BCE)', musicStyle: 'Odissi (mixed Carnatic-Hindustani)',
            keyGuru: 'Kelucharan Mohapatra', yearRecognized: '1964',
            desc: 'The dance of temples — sculptural body lines inspired by Konark and Jagannath temple carvings.',
            details: 'Odissi is one of the oldest surviving dance forms, with evidence in the Manchapuri cave reliefs of Udayagiri-Khandagiri (2nd century BCE). The dance is characterized by the tribhanga (three-bend) posture — unique among classical forms — where the body bends at the neck, waist, and knee. Kelucharan Mohapatra is credited with reviving and codifying modern Odissi. The dance draws heavily from the erotic sculptures of Konark Sun Temple and the devotional traditions of the Jagannath cult.',
            elements: ['Tribhanga (triple bend)', 'Chauka (square stance)', 'Abhinaya'],
            mudras: ['Pataka', 'Hamsasya', 'Chandrakala', 'Pushpaputa'],
            keyFestival: 'Konark Dance Festival',
            relatedText: 'Abhinaya Chandrika by Maheshwara Mahapatra'
        },
        {
            id: 'kuchipudi', name: 'Kuchipudi', state: 'Andhra Pradesh',
            icon: '🏏', region: 'south', deity: 'Lord Krishna',
            costume: 'Colorful silk costume, temple jewelry, ankle bells, separate male/female attire',
            origin: 'Andhra Pradesh (17th century)', musicStyle: 'Carnatic',
            keyGuru: 'Guru Lakshminarayana Shastry', yearRecognized: '1955',
            desc: 'The vivacious dance-drama — brisk movements, dramatic storytelling, and the iconic brass plate dance.',
            details: 'Kuchipudi originated in the village of Kuchipudi in Krishna district. Unlike Bharatanatyam, it was traditionally performed exclusively by men, even in female roles. The dance is more fluid and dramatic, with characters speaking dialogues. The most famous Kuchipudi item is the Tarangam — dancing on the edges of a brass plate while balancing a pot of water on the head. The form combines nritta (pure dance) with extensive nritya (expressive dance) and natya (dramatic elements).',
            elements: ['Tarangam (plate dance)', 'Bhama Kalapam', 'Dramatic dialogue'],
            mudras: ['Pataka', 'Shikhara', 'Hamsasya', 'Mushti'],
            keyFestival: 'Kuchipudi Dance Festival, Andhra Pradesh',
            relatedText: 'Bhama Kalapam by Siddhendra Yogi'
        },
        {
            id: 'manipuri', name: 'Manipuri', state: 'Manipur',
            icon: '🌕', region: 'northeast', deity: 'Lord Krishna / Radha',
            costume: 'Kumil (stiff barrel-shaped skirt), cylindrical headpiece (khoplo), dhoti for men',
            origin: 'Manipur (medieval period)', musicStyle: 'Manipuri (unique)',
            keyGuru: 'Guru Bipin Singh', yearRecognized: '1955',
            desc: 'The celestial dance — gentle, devotional Raas Leela performances depicting Radha-Krishna\'s divine love.',
            details: 'Manipuri dance is deeply connected to Vaishnavite faith and is primarily performed as Raas Leela — the cosmic dance of Krishna with the gopis. The costume is unique: women wear the stiff, barrel-shaped kumil that creates a floating, otherworldly effect. The dance has no sharp movements — everything flows like water. Guru Bipin Singh and his wife studied and codified the form. The Pung (Manipuri drum) and Kartal (cymbals) provide the distinctive rhythmic accompaniment.',
            elements: ['Raas Leela', 'Lasya (graceful)', 'Pung cholom (drum dance)'],
            mudras: ['Soft, flowing hand gestures', 'Pataka', 'Alapadma'],
            keyFestival: 'Ras Lila season (Oct-Nov)',
            relatedText: 'Gaur Lila, Sri Krishna Lila'
        },
        {
            id: 'mohiniyattam', name: 'Maharashtra\'s Mohiniyattam', state: 'Kerala',
            icon: '🦢', region: 'south', deity: 'Lord Vishnu (Mohini form)',
            costume: 'White/gold Kasavu saree, simple gold jewelry, side-swept hair with white flowers',
            origin: 'Kerala (medieval period)', musicStyle: 'Carnatic (Sopana)',
            keyGuru: 'Kalamandalam Kshemavathy', yearRecognized: '1963',
            desc: 'The enchantress\'s dance — graceful swaying movements, gentle expressions, and the distinctive Lasya style.',
            details: 'Named after Mohini, the female avatar of Lord Vishnu, Mohiniyattam is characterized by gentle, swaying movements that resemble the motion of palm trees in the breeze. The dance emphasizes lasya (feminine grace) over tandava (masculine vigor). The distinctive eye movements and facial expressions are central to storytelling. The costume — the white and gold kasavu saree — mirrors Kerala\'s traditional aesthetic. It was revived in the 19th century by Maharaja Swathi Thirunal and later codified by the Kerala Kalamandalam.',
            elements: ['Lasya (feminine grace)', 'Swaying movements', 'Eye expression'],
            mudras: ['Pataka', 'Tripataka', 'Hamsasya', 'Mukula'],
            keyFestival: 'Onam celebrations, Kerala',
            relatedText: 'Sopana Sangeetham tradition'
        },
        {
            id: 'sattriya', name: 'Sattriya', state: 'Assam',
            icon: '🙏', region: 'northeast', deity: 'Lord Krishna',
            costume: 'Dhoti and chadar for men, mekhela chador for women, simple white costumes',
            origin: 'Assam (15th century)', musicStyle: 'Borgeet (unique Assamese)',
            keyGuru: 'Maniram Dutta', yearRecognized: '2000',
            desc: 'The monastery dance — born in Vaishnavite satras, with devotional purity, martial energy, and Assamese folk rhythms.',
            details: 'Sattriya originated in the sattras (Vaishnavite monasteries) of Assam, introduced by the great reformer Sankaradeva in the 15th century. Traditionally performed only by male monks (bhokots), it was opened to women in the 20th century. The dance has two distinct parts: Paurashik (masculine — vigorous, martial) and Stri (feminine — graceful, devotional). The Borgeet songs of Sankaradeva and Madhavdeva form the musical backbone. Sattriya was recognized as a classical dance by Sangeet Natak Akademi in 2000.',
            elements: ['Paurashik (masculine)', 'Stri (feminine)', 'Apsara Nritya'],
            mudras: ['Chatura', 'Pataka', 'Shikhara', 'Hamsasya'],
            keyFestival: 'Raas Mahotsav, Majuli',
            relatedText: 'Ankia Naat by Sankaradeva'
        }
    ];

    const REGIONS = { all: 'All', south: 'South', north: 'North', east: 'East', northeast: 'Northeast' };

    let filter = 'all', query = '';

    /* ======================================================================
       INITIALIZATION
       ====================================================================== */
    function init() {
        renderFilters();
        createParticles();
        bindEvents();
        filterAndRender();
    }

    /* ======================================================================
       HERO PARTICLES
       ====================================================================== */
    function createParticles() {
        const container = document.getElementById('cd-hero-particles');
        if (!container) return;
        const colors = ['#8e44ad', '#e74c3c', '#e8a838', '#27ae60', '#2980b9'];
        for (let i = 0; i < 18; i++) {
            const p = document.createElement('div');
            p.className = 'cd-particle';
            const size = Math.random() * 5 + 2;
            p.style.width = size + 'px';
            p.style.height = size + 'px';
            p.style.left = Math.random() * 100 + '%';
            p.style.top = Math.random() * 100 + '%';
            p.style.background = colors[i % colors.length];
            p.style.animationDelay = (Math.random() * 4) + 's';
            p.style.animationDuration = (Math.random() * 3 + 3) + 's';
            container.appendChild(p);
        }
    }

    /* ======================================================================
       RENDER REGION FILTERS
       ====================================================================== */
    function renderFilters() {
        document.getElementById('cd-filters').innerHTML = Object.entries(REGIONS).map(([k, v]) =>
            `<button class="cd-fbtn${k === 'all' ? ' active' : ''}" data-region="${k}">${v}</button>`
        ).join('');
    }

    /* ======================================================================
       FILTER & RENDER
       ====================================================================== */
    function getFiltered() {
        let list = [...DANCES];
        if (filter !== 'all') list = list.filter(d => d.region === filter);
        if (query) {
            const q = query.toLowerCase();
            list = list.filter(d =>
                d.name.toLowerCase().includes(q) ||
                d.state.toLowerCase().includes(q) ||
                d.deity.toLowerCase().includes(q) ||
                d.region.toLowerCase().includes(q) ||
                d.desc.toLowerCase().includes(q) ||
                d.costume.toLowerCase().includes(q) ||
                d.keyGuru.toLowerCase().includes(q) ||
                d.yearRecognized.includes(q)
            );
        }
        return list;
    }

    function filterAndRender() {
        const filtered = getFiltered();
        const grid = document.getElementById('cd-grid');
        const empty = document.getElementById('cd-empty');

        if (filtered.length === 0) {
            grid.style.display = 'none';
            empty.style.display = 'block';
            return;
        }
        grid.style.display = '';
        empty.style.display = 'none';

        grid.innerHTML = filtered.map((d, i) => `
            <article class="cd-card" role="listitem" data-did="${d.id}" style="animation-delay:${i * 0.06}s">
                <div class="cd-card-banner"></div>
                <div class="cd-card-body">
                    <div class="cd-card-top">
                        <div class="cd-card-icon">${d.icon}</div>
                        <div>
                            <h3 class="cd-card-name">${d.name}</h3>
                            <span class="cd-card-meta">📍 ${d.state} · 🎵 ${d.musicStyle}</span>
                        </div>
                    </div>
                    <p class="cd-card-desc">${d.desc}</p>
                    <div class="cd-card-tags">
                        <span class="cd-tag">${d.region}</span>
                        <span class="cd-tag">${d.deity.split('/')[0].trim()}</span>
                        <span class="cd-tag">${d.keyGuru.split(' ').slice(-1)[0]}</span>
                    </div>
                </div>
            </article>
        `).join('');
    }

    /* ======================================================================
       MODAL
       ====================================================================== */
    function openModal(did) {
        const d = DANCES.find(x => x.id === did);
        if (!d) return;
        document.getElementById('cd-modal-body').innerHTML = `
            <div class="cd-modal-hero"></div>
            <div class="cd-modal-icon">${d.icon}</div>
            <h2 class="cd-modal-title">${d.name}</h2>
            <p class="cd-modal-info">📍 ${d.state} · 🎵 ${d.musicStyle} · 🕉️ ${d.deity}</p>
            <div class="cd-modal-detail">
                <div class="cd-modal-ditem"><p class="cd-modal-dlbl">Origin</p><p class="cd-modal-dval">${d.origin}</p></div>
                <div class="cd-modal-ditem"><p class="cd-modal-dlbl">Region</p><p class="cd-modal-dval">${d.region.charAt(0).toUpperCase() + d.region.slice(1)}</p></div>
                <div class="cd-modal-ditem"><p class="cd-modal-dlbl">Music Style</p><p class="cd-modal-dval">${d.musicStyle}</p></div>
                <div class="cd-modal-ditem"><p class="cd-modal-dlbl">Key Guru</p><p class="cd-modal-dval">${d.keyGuru}</p></div>
                <div class="cd-modal-ditem"><p class="cd-modal-dlbl">Recognized</p><p class="cd-modal-dval">${d.yearRecognized}</p></div>
                <div class="cd-modal-ditem"><p class="cd-modal-dlbl">Key Festival</p><p class="cd-modal-dval">${d.keyFestival}</p></div>
            </div>
            <div class="cd-modal-sec"><h4>Overview</h4><p>${d.desc}</p></div>
            <div class="cd-modal-sec"><h4>History & Significance</h4><p>${d.details}</p></div>
            <div class="cd-modal-sec"><h4>Key Elements</h4><ul>${d.elements.map(e => `<li>${e}</li>`).join('')}</ul></div>
            <div class="cd-modal-sec"><h4>Costume & Adornment</h4><p>${d.costume}</p></div>
            <div class="cd-modal-sec"><h4>Signature Mudras</h4>
                <div class="cd-modal-costumes">${d.mudras.map(m => `<span class="cd-modal-costume">${m}</span>`).join('')}</div>
            </div>
            <div class="cd-modal-sec"><h4>Textual Reference</h4><p>${d.relatedText}</p></div>
        `;
        const m = document.getElementById('cd-modal');
        m.classList.add('open');
        m.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        const m = document.getElementById('cd-modal');
        m.classList.remove('open');
        m.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    /* ======================================================================
       EVENT BINDING
       ====================================================================== */
    function bindEvents() {
        document.getElementById('cd-filters').addEventListener('click', e => {
            const btn = e.target.closest('.cd-fbtn');
            if (!btn) return;
            document.querySelectorAll('.cd-fbtn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            filter = btn.dataset.region;
            filterAndRender();
        });

        document.getElementById('cd-grid').addEventListener('click', e => {
            const card = e.target.closest('.cd-card');
            if (card) openModal(card.dataset.did);
        });

        document.getElementById('cd-search').addEventListener('input', e => {
            query = e.target.value;
            filterAndRender();
        });

        document.getElementById('cd-reset').addEventListener('click', () => {
            query = '';
            filter = 'all';
            document.getElementById('cd-search').value = '';
            document.querySelectorAll('.cd-fbtn').forEach(b => b.classList.remove('active'));
            document.querySelector('.cd-fbtn[data-region="all"]').classList.add('active');
            filterAndRender();
        });

        document.getElementById('cd-modal-x').addEventListener('click', closeModal);
        document.getElementById('cd-modal-bg').addEventListener('click', closeModal);
        document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
    }

    /* ======================================================================
       BOOT
       ====================================================================== */
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
    else init();
})();
