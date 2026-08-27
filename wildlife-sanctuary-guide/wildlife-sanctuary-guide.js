/**
 * Indian Wildlife Sanctuary Guide — Interactive Module
 * Searchable explorer of India's protected wildlife sanctuaries.
 */
(function () {
    'use strict';

    /* ======================================================================
       SANCTUARY DATA — 25 Major Wildlife Sanctuaries
       ====================================================================== */
    const SANCTUARIES = [
        {
            id: 'sundarbans', name: 'Sundarbans Wildlife Sanctuary', state: 'West Bengal',
            icon: '🐅', region: 'east', category: 'terrestrial', conservationStatus: 'Endangered',
            keySpecies: ['Royal Bengal Tiger', 'Saltwater Crocodile', 'Ganges River Dolphin'],
            area: '9,640 sq km', established: '1977',
            desc: 'The world\'s largest mangrove forest and UNESCO site, home to the iconic Royal Bengal Tiger that swims between islands.',
            details: 'The Sundarbans is a network of tidal waterways, mudflats, and small islands covering 10,000 sq km. The name means "Beautiful Forest" in Bengali. Approximately 400 Royal Bengal Tigers inhabit this unique ecosystem. The mangroves act as a critical buffer against cyclones for millions of coastal residents. UNESCO designated the area as a World Heritage Site in 1987.'
        },
        {
            id: 'periyar', name: 'Periyar Wildlife Sanctuary', state: 'Kerala',
            icon: '🐘', region: 'south', category: 'terrestrial', conservationStatus: 'Endangered',
            keySpecies: ['Asian Elephant', 'Nilgiri Tahr', 'Lion-tailed Macaque'],
            area: '305 sq km', established: '1982',
            desc: 'Kerala\'s premier elephant reserve with stunning Periyar Lake — boat safaris reveal herds bathing at water\'s edge.',
            details: 'Located in the Western Ghats, Periyar is one of the most well-maintained wildlife sanctuaries in India. The artificial Periyar Lake, created by a dam in 1895, is the centerpiece. Over 800 elephants roam freely. The sanctuary is also a Project Tiger reserve and supports rich biodiversity including 49 fish species, 171 bird species, and 30 reptile species.'
        },
        {
            id: 'manas', name: 'Manas Wildlife Sanctuary', state: 'Assam',
            icon: '🦏', region: 'northeast', category: 'terrestrial', conservationStatus: 'Critical',
            keySpecies: ['One-horned Rhinoceros', 'Pygmy Hog', 'Golden Langur'],
            area: '950 sq km', established: '1928',
            desc: 'A UNESCO World Heritage Site at the foothills of Bhutan — India\'s most biodiverse sanctuary with 60+ mammals.',
            details: 'Manas is famous for hosting the largest population of the endangered Golden Langur found nowhere else on Earth. The sanctuary was severely affected by insurgency in the 1990s but has made a remarkable recovery. It\'s home to 55 mammal species, 380 bird species, and 50 reptile species. The Manas River divides it into two distinct ecosystems.'
        },
        {
            id: 'kanha', name: 'Kanha National Park', state: 'Madhya Pradesh',
            icon: '🐆', region: 'central', category: 'terrestrial', conservationStatus: 'Vulnerable',
            keySpecies: ['Bengal Tiger', 'Barasingha', 'Indian Leopard'],
            area: '940 sq km', established: '1955',
            desc: 'The inspiration for Rudyard Kipling\'s Jungle Book — lush sal forests and open meadows teeming with wildlife.',
            details: 'Kanha\'s hard ground Barasingha population is the last of its kind, saved from extinction here. The park features a mix of dense sal forests and grassy meadows (maidans) that make it ideal for tiger spotting. The Bamni Dadar viewpoint offers stunning sunset views. Kanha was one of the first tiger reserves under Project Tiger in 1973.'
        },
        {
            id: 'hemis', name: 'Hemis National Park', state: 'Jammu & Kashmir',
            icon: '❄️', region: 'north', category: 'terrestrial', conservationStatus: 'Endangered',
            keySpecies: ['Snow Leopard', 'Lynx', 'Tibetan Wolf'],
            area: '600 sq km', established: '1981',
            desc: 'India\'s largest national park at 3,300m altitude — home to the elusive Snow Leopard in the Trans-Himalayas.',
            details: 'Hemis protects the cold desert ecosystem of the Changthang Plateau. The park is famous for the biennial Hemis Festival celebrating Guru Padmasambhava with masked Cham dances. It supports one of the highest densities of snow leopards globally, with approximately 12-15 individuals. The park also harbors the endangered Tibetan wolf.'
        },
        {
            id: 'bandipur', name: 'Bandipur Tiger Reserve', state: 'Karnataka',
            icon: '🐅', region: 'south', category: 'terrestrial', conservationStatus: 'Endangered',
            keySpecies: ['Bengal Tiger', 'Indian Elephant', 'Gaur'],
            area: '874 sq km', established: '1974',
            desc: 'Part of the Nilgiri Biosphere Reserve — Karnataka\'s flagship tiger reserve with excellent safari infrastructure.',
            details: 'Bandipur was one of the first9 reserves under Project Tiger. It forms a critical corridor connecting with Mudumalai and Wayanad sanctuaries, creating one of the largest protected forest areas in South India. The park has a well-maintained network of safari routes. The annual Kabini river safari offers excellent chances of spotting tigers, elephants, and gaur together.'
        },
        {
            id: 'sasan-gir', name: 'Sasan Gir Wildlife Sanctuary', state: 'Gujarat',
            icon: '🦁', region: 'west', category: 'terrestrial', conservationStatus: 'Endangered',
            keySpecies: ['Asiatic Lion', 'Leopard', 'Indian Crocodile'],
            area: '1,412 sq km', established: '1965',
            desc: 'The last refuge of the Asiatic Lion — Gujarat\'s crown jewel and one of India\'s greatest conservation success stories.',
            details: 'Gir is the only place in the world where Asiatic lions roam free alongside leopards, creating a unique predator dynamic. From fewer than 20 lions in the early 1900s, the population has grown to over 600 today. The sanctuary also supports 38 species of mammals, 300 species of birds, and 37 species of reptiles. The Devalia Safari Park offers easier sighting opportunities.'
        },
        {
            id: 'kaziranga', name: 'Kaziranga National Park', state: 'Assam',
            icon: '🦏', region: 'northeast', category: 'terrestrial', conservationStatus: 'Critical',
            keySpecies: ['One-horned Rhinoceros', 'Elephant', 'Swamp Deer'],
            area: '858 sq km', established: '1905',
            desc: 'Home to two-thirds of the world\'s One-horned Rhinoceros — a UNESCO World Heritage Site and conservation triumph.',
            details: 'Kaziranga was declared a reserve forest in 1908 and became a tiger reserve in 2006. It hosts 2,613 rhinos (2022 census), the highest density of tigers among protected areas, and over 1,000 elephants. The park\'s four ranges — Agoratoli, Kohora, Bagori, and Burapahar — each offer distinct wildlife experiences. Annual floods from the Brahmaputra renew the ecosystem but also displace animals.'
        },
        {
            id: 'valmiki', name: 'Valmiki Tiger Reserve', state: 'Bihar',
            icon: '🐅', region: 'east', category: 'terrestrial', conservationStatus: 'Endangered',
            keySpecies: ['Bengal Tiger', 'Sloth Bear', 'Indian Rhinoceros'],
            area: '899 sq km', established: '1978',
            desc: 'Bihar\'s only national park and tiger reserve — dense forests at the Nepal border with incredible bird diversity.',
            details: 'Named after the sage Valmiki, author of the Ramayana, this reserve sits at the Indo-Nepal border. It\'s home to over 300 bird species including migratory birds from the Himalayas. The Gangetic dolphin can be spotted in the Gandak River. The reserve played a crucial role in the recovery of the Indian rhinoceros population in eastern India.'
        },
        {
            id: 'rajaji', name: 'Rajaji National Park', state: 'Uttarakhand',
            icon: '🐘', region: 'north', category: 'terrestrial', conservationStatus: 'Endangered',
            keySpecies: ['Asian Elephant', 'Bengal Tiger', 'Himalayan Black Bear'],
            area: '820 sq km', established: '1983',
            desc: 'Gateway to the Himalayas — 600+ elephants in sal forests at the Shivalik foothills near Rishikesh.',
            details: 'Named after C. Rajagopalachari (last Governor-General of India), the park was formed by merging three sanctuaries. It hosts over 500 elephants — the largest herd in the Shivalik region. The Chilla range offers the best safari experience. Rajaji serves as a critical corridor between Corbett and western Uttar Pradesh, making it essential for elephant migration.'
        },
        {
            id: 'nagarhole', name: 'Nagarhole National Park', state: 'Karnataka',
            icon: '🐆', region: 'south', category: 'terrestrial', conservationStatus: 'Endangered',
            keySpecies: ['Bengal Tiger', 'Indian Elephant', 'Indian Leopard'],
            area: '643 sq km', established: '1955',
            desc: 'Meaning "Snake River" — pristine forests with one of the densest tiger and elephant populations in India.',
            details: 'Nagarhole (also known as Rajiv Gandhi National Park) features beautiful cascading waterfalls, dense forests, and pristine Kabini reservoir. It\'s part of the Nilgiri Biosphere Reserve and connects with Bandipur and Mudumalai. The park has excellent lodging facilities and offers jeep, boat, and elephant safaris. The Kabini River corridor is particularly rich in predator-prey interactions.'
        },
        {
            id: 'dachigam', name: 'Dachigam Wildlife Sanctuary', state: 'Jammu & Kashmir',
            icon: '🦌', region: 'north', category: 'terrestrial', conservationStatus: 'Endangered',
            keySpecies: ['Hangul (Kashmir Stag)', 'Himalayan Black Bear', 'Leopard'],
            area: '141 sq km', established: '1981',
            desc: 'Protects the last Hangul population in the world — Dachigam means "ten villages" relocated for this sanctuary.',
            details: 'Dachigam was originally created to ensure clean drinking water supply to Srinagar. The sanctuary now protects the critically endangered Hangul (Kashmir Stag), with fewer than 150 individuals remaining. The landscape ranges from oak-chestnut forests at lower elevations to alpine meadows at higher altitudes. The Dachigam valley is also an important corridor for wildlife movement in the region.'
        },
        {
            id: 'pench', name: 'Pench Tiger Reserve', state: 'Madhya Pradesh',
            icon: '🐅', region: 'central', category: 'terrestrial', conservationStatus: 'Endangered',
            keySpecies: ['Bengal Tiger', 'Indian Leopard', 'Indian Gaur'],
            area: '758 sq km', established: '1992',
            desc: 'Another Jungle Book inspiration — shared between MP and Maharashtra with excellent tiger sighting rates.',
            details: 'Pench gets its name from the Pench River that bisects it. The reserve is famous for the tigress collared "B2" who featured in a BBC documentary. It\'s divided into a buffer zone and core zone. The mahua trees produce flowers used in traditional liquor. The Pench River valley offers some of the best landscape photography opportunities in Indian wildlife sanctuaries.'
        },
        {
            id: 'bhadra', name: 'Bhadra Wildlife Sanctuary', state: 'Karnataka',
            icon: '🐘', region: 'south', category: 'terrestrial', conservationStatus: 'Vulnerable',
            keySpecies: ['Bengal Tiger', 'Indian Elephant', 'Malabar Pied Hornbill'],
            area: '492 sq km', established: '1951',
            desc: 'A tiger haven in the Western Ghats — dense forests with excellent elephant and hornbill populations.',
            details: 'Bhadra was declared a Project Tiger reserve in 1998 and a butterfly sanctuary in 2011. It\'s home to over 250 bird species and has an estimated 30-35 tigers. The Bhadra River and its tributaries support rich aquatic life. The sanctuary is particularly known for its night safari, one of the few in India, offering chances to spot nocturnal wildlife like civets and owls.'
        },
        {
            id: 'dudhwa', name: 'Dudhwa National Park', state: 'Uttar Pradesh',
            icon: '🦏', region: 'north', category: 'terrestrial', conservationStatus: 'Endangered',
            keySpecies: ['Swamp Deer (Barasingha)', 'Bengal Tiger', 'Indian Rhinoceros'],
            area: '614 sq km', established: '1977',
            desc: 'India\'s premier swamp deer sanctuary at the Nepal border — lush sal forests and grasslands.',
            details: 'Dudhwa was saved from destruction by the efforts of conservationist Billy Arjan Singh. It hosts the largest population of Barasingha (swamp deer) in the world. The park was reintroduced Indian rhinoceros from Assam in 1984. The Dudhwa-Katarniaghat corridor is crucial for tiger and rhino movement between India and Nepal. The Sam沙arthpur area offers the best birdwatching.'
        },
        {
            id: 'kuno', name: 'Kuno National Park', state: 'Madhya Pradesh',
            icon: '🦁', region: 'central', category: 'terrestrial', conservationStatus: 'Critical',
            keySpecies: ['African Cheetah', 'Leopard', 'Sambar Deer'],
            area: '748 sq km', established: '1981',
            desc: 'India\'s cheetah reintroduction site — where African cheetahs roam Indian grasslands for the first time in 70 years.',
            details: 'Kuno was originally created for Project Tiger but was chosen for the ambitious cheetah reintroduction project. In September 2022, 8 cheetahs from Namibia were released here, followed by 12 from South Africa in 2023. The park has a diverse landscape of grasslands, scrublands, and dry deciduous forests. The Kuno River and its tributaries support rich biodiversity.'
        },
        {
            id: 'simlipal', name: 'Simlipal National Park', state: 'Odisha',
            icon: '🐅', region: 'east', category: 'terrestrial', conservationStatus: 'Endangered',
            keySpecies: ['Bengal Tiger', 'Asian Elephant', 'Gaur'],
            area: '845 sq km', established: '1956',
            desc: 'Odisha\'s largest protected area with stunning waterfalls, tribal culture, and a thriving tiger population.',
            details: 'Simlipal (meaning "home of red silk trees") is a biosphere reserve with 1,076 plant species. The Barehipani and Joranda waterfalls within the park are spectacular. It supports a significant tribal population including the Kolha and Santhal communities. The park has97 tigers (2022 census) and is known for the Melghat landscape — a mosaic of grasslands and forests ideal for wildlife viewing.'
        },
        {
            id: 'pachmarhi', name: 'Pachmarhi Biosphere Reserve', state: 'Madhya Pradesh',
            icon: '🐆', region: 'central', category: 'terrestrial', conservationStatus: 'Endangered',
            keySpecies: ['Bengal Tiger', 'Indian Leopard', 'Gaur'],
            area: '498 sq km', established: '1999',
            desc: 'Central India\'s hill station sanctuary with prehistoric rock shelters and dense sal forests.',
            details: 'Pachmarhi is the only hill station in Madhya Pradesh, located in the Satpura Range. The biosphere reserve includes the famous prehistoric rock shelters with cave paintings dating back 10,000 years. The Satpura Tiger Reserve nearby connects with Pachmarhi, creating a large contiguous forest area. The Bee Falls, Duchess Falls, and Chauragarh Temple are popular attractions within the reserve.'
        },
        {
            id: 'wayanad', name: 'Wayanad Wildlife Sanctuary', state: 'Kerala',
            icon: '🐘', region: 'south', category: 'terrestrial', conservationStatus: 'Endangered',
            keySpecies: ['Asian Elephant', 'Bengal Tiger', 'Nilgiri Tahr'],
            area: '344 sq km', established: '1973',
            desc: 'Gateway to the Nilgiri Biosphere — misty Western Ghats forests connecting Bandipur and Mudumalai.',
            details: 'Wayanad is part of the Nilgiri Biosphere Reserve and connects with Bandipur and Mudumalai, forming one of the largest contiguous forest areas in India. The sanctuary has over 200 elephants and is known for ancientEdakkal Caves with Neolithic inscriptions. The Tholpetty range offers the best safari experience. The pampadum shola grasslands within the sanctuary are home to endangered species.'
        },
        {
            id: 'bhitarkanika', name: 'Bhitarkanika Wildlife Sanctuary', state: 'Odisha',
            icon: '🐊', region: 'east', category: 'mangrove', conservationStatus: 'Endangered',
            keySpecies: ['Saltwater Crocodile', 'Indian Python', 'Olive Ridley Turtle'],
            area: '672 sq km', established: '1975',
            desc: 'India\'s second-largest mangrove system — giant saltwater crocodiles and nesting olive ridley turtles.',
            details: 'Bhitarkanika is the second-largest mangrove ecosystem in India after the Sundarbans. It hosts one of the largest populations of saltwater crocodiles in India, with the largest recorded individual measuring over 23 feet. The Gahirmatha beach within the sanctuary is the world\'s largest nesting site for olive ridley turtles, with over 600,000 turtles arriving annually during March-April.'
        },
        {
            id: 'kabini', name: 'Kabini Wildlife Sanctuary', state: 'Karnataka',
            icon: '🐆', region: 'south', category: 'terrestrial', conservationStatus: 'Endangered',
            keySpecies: ['Bengal Tiger', 'Indian Leopard', 'Dhole'],
            area: '55 sq km', established: '1988',
            desc: 'Compact but wildlife-dense — the Kabini reservoir bank is one of India\'s best leopard sighting locations.',
            details: 'Though small in area, Kabini is legendary among wildlife photographers for its incredible predator density. The Kabini reservoir and its surrounding forests host one of the highest densities of leopards and tigers in India. The Nagarhole-Kabini corridor is a critical wildlife movement zone. The Backwater safari along the reservoir offers chances to spot wild dogs (dholes) hunting in packs.'
        },
        {
            id: 'great-nicobar', name: 'Great Nicobar Biosphere Reserve', state: 'Andaman & Nicobar',
            icon: '🐢', region: 'islands', category: 'coastal', conservationStatus: 'Critical',
            keySpecies: ['Giant Leatherback Turtle', 'Saltwater Crocodile', 'Megapode'],
            area: '885 sq km', established: '1989',
            desc: 'India\'s southernmost biosphere — pristine tropical forests and the world\'s largest hard-shelled sea turtles nesting.',
            details: 'Great Nicobar is home to the Indira Gandhi Point, India\'s southernmost point. The Galathea Bay is a critical nesting site for the giant leatherback turtle, one of the world\'s largest sea turtles. The island also hosts the endangered Nicobar long-tailed macaque and the Nicobar megapode. The tropical evergreen forests here are among the most pristine in India.'
        },
        {
            id: 'inner-line', name: 'Inner Line Sanctuary', state: 'Meghalaya',
            icon: '🦜', region: 'northeast', category: 'terrestrial', conservationStatus: 'Vulnerable',
            keySpecies: ['Clouded Leopard', 'Hoolock Gibbon', 'Red Panda'],
            area: '82 sq km', established: '1997',
            desc: 'Clouded leopard territory in Meghalaya\'s subtropical forests — the wettest sanctuary in India.',
            details: 'Located in the Jaintia Hills, Inner Line receives over 11,000mm of rainfall annually, making it one of the wettest protected areas on Earth. The subtropical broadleaf forests support the critically endangered Hoolock Gibbon — India\'s only ape. The sanctuary is also home to the elusive Clouded Leopard. The living root bridges of Cherrapunji are nearby, showcasing the symbiotic relationship between humans and nature.'
        },
        {
            id: 'ran-of-kutch', name: 'Wildlife Sanctuary of Rann of Kutch', state: 'Gujarat',
            icon: '🦌', region: 'west', category: 'grassland', conservationStatus: 'Vulnerable',
            keySpecies: ['Indian Wild Ass', 'Flamingo', 'Chinkara'],
            area: '4,954 sq km', established: '1972',
            desc: 'The last refuge of the Indian Wild Ass — vast white desert transforming into a birdwatcher\'s paradise.',
            details: 'The Rann of Kutch is one of the largest salt deserts in the world. During the monsoon, the Great Rann floods and transforms into a shallow wetland attracting millions of flamingos. The Little Rann houses the Wild Ass Wildlife Sanctuary — the last home of the Indian Wild Ass (khur). The annual Rann Utsav festival showcases local culture against the stunning white desert backdrop.'
        }
    ];

    const CATEGORIES = { all: 'All', terrestrial: 'Terrestrial', mangrove: 'Mangrove', coastal: 'Coastal', grassland: 'Grassland' };

    let state = { filter: 'all', query: '' };

    /* ======================================================================
       INITIALIZATION
       ====================================================================== */
    function init() {
        renderFilters();
        animateStats();
        bindEvents();
        filterAndRender();
    }

    /* ======================================================================
       ANIMATE HERO STATS
       ====================================================================== */
    function animateStats() {
        const uniqueStates = new Set(SANCTUARIES.map(s => s.state)).size;
        const allSpecies = new Set(SANCTUARIES.flatMap(s => s.keySpecies)).size;
        animateNum('ws-total', SANCTUARIES.length, 1200);
        animateNum('ws-states', uniqueStates, 1000);
        animateNum('ws-species', allSpecies, 800);
    }

    function animateNum(id, target, dur) {
        const el = document.getElementById(id);
        if (!el) return;
        let cur = 0;
        const step = Math.ceil(target / (dur / 16));
        const iv = setInterval(() => {
            cur = Math.min(cur + step, target);
            el.textContent = cur;
            if (cur >= target) clearInterval(iv);
        }, 16);
    }

    /* ======================================================================
       RENDER CATEGORY FILTERS
       ====================================================================== */
    function renderFilters() {
        const el = document.getElementById('ws-filters');
        el.innerHTML = Object.entries(CATEGORIES).map(([k, v]) =>
            `<button class="ws-fbtn${k === 'all' ? ' active' : ''}" data-cat="${k}">${v}</button>`
        ).join('');
    }

    /* ======================================================================
       FILTER & RENDER
       ====================================================================== */
    function getFiltered() {
        let list = [...SANCTUARIES];
        if (state.filter !== 'all') list = list.filter(s => s.category === state.filter);
        if (state.query) {
            const q = state.query.toLowerCase();
            list = list.filter(s =>
                s.name.toLowerCase().includes(q) ||
                s.state.toLowerCase().includes(q) ||
                s.region.toLowerCase().includes(q) ||
                s.keySpecies.some(sp => sp.toLowerCase().includes(q)) ||
                s.desc.toLowerCase().includes(q)
            );
        }
        return list;
    }

    function filterAndRender() {
        const filtered = getFiltered();
        const grid = document.getElementById('ws-grid');
        const empty = document.getElementById('ws-empty');
        const label = document.getElementById('ws-label');
        label.textContent = state.filter === 'all' ? `All Sanctuaries (${filtered.length})` : `${CATEGORIES[state.filter]} (${filtered.length})`;

        if (filtered.length === 0) {
            grid.style.display = 'none';
            empty.style.display = 'block';
            return;
        }
        grid.style.display = '';
        empty.style.display = 'none';

        grid.innerHTML = filtered.map((s, i) => {
            const csClass = s.conservationStatus.toLowerCase().replace(/ /g, '-');
            return `<article class="ws-card" role="listitem" data-sid="${s.id}" style="animation-delay:${i * 0.04}s">
                <div class="ws-card-top">
                    <div class="ws-card-icon">${s.icon}</div>
                    <div><h3 class="ws-card-name">${s.name}</h3><span class="ws-card-meta">📍 ${s.state} · ${s.area}</span></div>
                </div>
                <p class="ws-card-desc">${s.desc}</p>
                <div class="ws-card-tags">
                    <span class="ws-tag ${csClass}">${s.conservationStatus}</span>
                    <span class="ws-tag">${s.category}</span>
                    <span class="ws-tag">${s.keySpecies[0]}</span>
                </div>
            </article>`;
        }).join('');
    }

    /* ======================================================================
       MODAL
       ====================================================================== */
    function openModal(sid) {
        const s = SANCTUARIES.find(x => x.id === sid);
        if (!s) return;
        document.getElementById('ws-modal-body').innerHTML = `
            <div class="ws-modal-icon">${s.icon}</div>
            <h2 class="ws-modal-title">${s.name}</h2>
            <p class="ws-modal-info">📍 ${s.state} · ${s.area} · Est. ${s.established}</p>
            <div class="ws-modal-detail">
                <div class="ws-modal-ditem"><p class="ws-modal-dlbl">Status</p><p class="ws-modal-dval">${s.conservationStatus}</p></div>
                <div class="ws-modal-ditem"><p class="ws-modal-dlbl">Category</p><p class="ws-modal-dval">${s.category.charAt(0).toUpperCase() + s.category.slice(1)}</p></div>
                <div class="ws-modal-ditem"><p class="ws-modal-dlbl">Region</p><p class="ws-modal-dval">${s.region.charAt(0).toUpperCase() + s.region.slice(1)}</p></div>
                <div class="ws-modal-ditem"><p class="ws-modal-dlbl">Established</p><p class="ws-modal-dval">${s.established}</p></div>
            </div>
            <div class="ws-modal-sec"><h4>Overview</h4><p>${s.desc}</p></div>
            <div class="ws-modal-sec"><h4>Key Species</h4><ul>${s.keySpecies.map(sp => `<li>${sp}</li>`).join('')}</ul></div>
            <div class="ws-modal-sec"><h4>About</h4><p>${s.details}</p></div>
        `;
        const m = document.getElementById('ws-modal');
        m.classList.add('open');
        m.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        const m = document.getElementById('ws-modal');
        m.classList.remove('open');
        m.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    /* ======================================================================
       EVENT BINDING
       ====================================================================== */
    function bindEvents() {
        document.getElementById('ws-filters').addEventListener('click', e => {
            const btn = e.target.closest('.ws-fbtn');
            if (!btn) return;
            document.querySelectorAll('.ws-fbtn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            state.filter = btn.dataset.cat;
            filterAndRender();
        });

        document.getElementById('ws-grid').addEventListener('click', e => {
            const card = e.target.closest('.ws-card');
            if (card) openModal(card.dataset.sid);
        });

        document.getElementById('ws-search').addEventListener('input', e => {
            state.query = e.target.value;
            filterAndRender();
        });

        document.getElementById('ws-reset').addEventListener('click', () => {
            state.query = '';
            state.filter = 'all';
            document.getElementById('ws-search').value = '';
            document.querySelectorAll('.ws-fbtn').forEach(b => b.classList.remove('active'));
            document.querySelector('.ws-fbtn[data-cat="all"]').classList.add('active');
            filterAndRender();
        });

        document.getElementById('ws-modal-x').addEventListener('click', closeModal);
        document.getElementById('ws-modal-bg').addEventListener('click', closeModal);
        document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
    }

    /* ======================================================================
       BOOT
       ====================================================================== */
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
    else init();
})();
