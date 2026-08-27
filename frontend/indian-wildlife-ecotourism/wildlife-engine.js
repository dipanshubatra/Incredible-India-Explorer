/* ==========================================================================
   WILDLIFE ENGINE — Core Business Logic for Indian Wildlife & Ecotourism
   ========================================================================== */

class NationalPark {
    constructor(name, biome, state, area, description, highlights, tags) {
        this.name = name; this.biome = biome; this.state = state; this.area = area;
        this.description = description; this.highlights = highlights || []; this.tags = tags || [];
        this.type = 'park';
    }
}

class Sanctuary {
    constructor(name, habitat, state, description, keySpecies, tags) {
        this.name = name; this.habitat = habitat; this.state = state;
        this.description = description; this.keySpecies = keySpecies || []; this.tags = tags || [];
        this.type = 'sanctuary';
    }
}

class WildlifeSpecies {
    constructor(name, conservation, habitat, description, range, emoji) {
        this.name = name; this.conservation = conservation; this.habitat = habitat;
        this.description = description; this.range = range;
        this.emoji = emoji || '🦁'; this.tags = [conservation, habitat];
        this.type = 'species';
    }
}

const PARKS = [
    new NationalPark('Jim Corbett', 'tropical', 'Uttarakhand', '1318 sq km', 'India\'s oldest national park, famous for Bengal tigers. Established in 1936 as Hailey National Park.', ['Bengal Tiger', 'Elephant', 'Bird Watching'], ['Project Tiger', 'Oldest']),
    new NationalPark('Sundarbans', 'wetland', 'West Bengal', '2585 sq km', 'The largest mangrove forest in the world and a UNESCO World Heritage Site. Home to the Royal Bengal Tiger.', ['Royal Bengal Tiger', 'Mangrove', 'UNESCO'], ['UNESCO', 'Mangrove']),
    new NationalPark('Kaziranga', 'grassland', 'Assam', '1030 sq km', 'Home to two-thirds of the world\'s one-horned rhinoceros. UNESCO World Heritage Site since 1985.', ['One-horned Rhino', 'Elephant', 'Tiger'], ['UNESCO', 'Rhino']),
    new NationalPark('Ranthambore', 'dry deciduous', 'Rajasthan', '1334 sq km', 'Famous for its royal Bengal tigers and the ancient Ranthambore Fort within the park.', ['Bengal Tiger', 'Fort', 'Leopard'], ['Project Tiger', 'Desert Edge']),
    new NationalPark('Gir', 'dry deciduous', 'Gujarat', '1412 sq km', 'The only home of the Asiatic lion in the wild. A remarkable conservation success story.', ['Asiatic Lion', 'Leopard', 'Hyena'], ['Only Lions', 'Conservation Success']),
    new NationalPark('Bandipur', 'tropical', 'Karnataka', '874 sq km', 'Part of the Nilgiri Biosphere Reserve, home to elephants, tigers, and diverse birdlife.', ['Tiger', 'Elephant', 'Gaur'], ['Nilgiri', 'Project Tiger']),
    new NationalPark('Periyar', 'tropical', 'Kerala', '305 sq km', 'A scenic wildlife sanctuary centered on the Periyar Lake, famous for elephant and tiger sightings.', ['Elephant', 'Tiger', 'Boat Safari'], ['Kerala', 'Lake']),
    new NationalPark('Kaziranga (Manas)', 'tropical', 'Assam', '500 sq km', 'A UNESCO World Heritage Site known for its rare golden langur and pygmy hog.', ['Golden Langur', 'Pygmy Hog', 'Tiger'], ['UNESCO', 'Rare Species']),
    new NationalPark('Panna', 'dry deciduous', 'Madhya Pradesh', '543 sq km', 'Known for its diamond mines and successful tiger reintroduction program.', ['Tiger', 'Gharial', 'Vulture'], ['Tiger Reintroduction']),
    new NationalPark('Hemis', 'mountain', 'Ladakh', '4400 sq km', 'India\'s largest national park, home to the rare snow leopard and the famous Hemis monastery.', ['Snow Leopard', 'Tibetan Wolf', 'Monastery'], ['Largest', 'Snow Leopard']),
];

const SANCTUARIES = [
    new Sanctuary('Bhadra', 'forest', 'Karnataka', 'A dense forest sanctuary famous for its tiger population and stunning Western Ghats biodiversity.', ['Tiger', 'Elephant', 'Gaur'], ['Western Ghats', 'Tiger']),
    new Sanctuary('Bhitarkanika', 'coastal', 'Odisha', 'India\'s second-largest mangrove ecosystem, home to saltwater crocodiles and olive ridley turtles.', ['Saltwater Crocodile', 'Olive Ridley', 'Mangrove'], ['Mangrove', 'Crocodile']),
    new Sanctuary('Chilika Lake', 'riverine', 'Odisha', 'Asia\'s largest brackish water lagoon, hosting over 160 species of migratory birds in winter.', ['Migratory Birds', 'Irrawaddy Dolphin', 'Flamingos'], ['Bird Sanctuary', 'Lake']),
    new Sanctuary('Pong Dam', 'wetland', 'Himachal Pradesh', 'A reservoir on the Beas River attracting thousands of migratory birds including bar-headed geese.', ['Bar-headed Goose', 'Migratory Birds', 'Fish'], ['Migratory', 'Himachal']),
    new Sanctuary('Dachigam', 'forest', 'Jammu & Kashmir', 'The last refuge of the endangered Hangul (Kashmiri stag) in the Dachigam hills.', ['Hangul', 'Musk Deer', 'Leopard'], ['Hangul', 'Kashmir']),
    new Sanctuary('Namdapha', 'forest', 'Arunachal Pradesh', 'One of the most biodiversity-rich areas in India, home to four big cat species.', ['Tiger', 'Leopard', 'Snow Leopard'], ['Four Big Cats', 'NE India']),
    new Sanctuary('Rolla', 'grassland', 'Karnataka', 'A grassland and scrub jungle sanctuary famous for Indian gaur and blackbuck populations.', ['Indian Gaur', 'Blackbuck', 'Elephant'], ['Grassland', 'Gaur']),
    new Sanctuary('Nal Sarovar', 'wetland', 'Gujarat', 'India\'s largest lake bird sanctuary, hosting over 200 species of migratory birds.', ['Flamingos', 'Pelicans', 'Storks'], ['Bird Sanctuary', 'Flamingos']),
];

const SPECIES = [
    new WildlifeSpecies('Bengal Tiger', 'endangered', 'Tropical/Grassland', 'India\'s national animal and an apex predator. Project Tiger has helped stabilize populations across reserves.', 'Central India, Sundarbans, Western Ghats', '🐅'),
    new WildlifeSpecies('Asiatic Lion', 'endangered', 'Dry Deciduous', 'The last surviving population of lions outside Africa, found exclusively in Gujarat\'s Gir Forest.', 'Gir Forest, Gujarat', '🦁'),
    new WildlifeSpecies('One-horned Rhinoceros', 'endangered', 'Grassland', 'A conservation triumph — from fewer than 200 to over 3,000 individuals in Kaziranga.', 'Kaziranga, Assam', '🦏'),
    new WildlifeSpecies('Snow Leopard', 'vulnerable', 'Mountain', 'The elusive ghost of the mountains, adapted to extreme cold in the Himalayan highlands.', 'Ladakh, Himachal Pradesh, Uttarakhand', '🐆'),
    new WildlifeSpecies('Asian Elephant', 'endangered', 'Tropical', 'India holds 60% of the world\'s wild elephant population, a keystone species for forest ecosystems.', 'Karnataka, Kerala, Assam', '🐘'),
    new WildlifeSpecies('Indian Peafowl', 'least-concern', 'Mixed', 'India\'s national bird, found across the subcontinent in forests, farmlands, and even urban areas.', 'Pan India', '🦚'),
    new WildlifeSpecies('Gharial', 'endangered', 'Riverine', 'A critically endangered fish-eating crocodile with a distinctive long, thin snout. Found only in Indian rivers.', 'Chambal, Girwa', '🐊'),
    new WildlifeSpecies('Indian Pangolin', 'endangered', 'Forest', 'The world\'s most trafficked mammal, covered in protective keratin scales. Nocturnal insectivore.', 'Central & South India', '🦔'),
    new WildlifeSpecies('Red Panda', 'endangered', 'Mountain', 'A arboreal mammal found in the eastern Himalayas, consuming mainly bamboo.', 'Sikkim, Arunachal Pradesh', '🐾'),
    new WildlifeSpecies('Blackbuck', 'least-concern', 'Grassland', 'India\'s fastest animal, known for its spiraling horns and dramatic leaping displays.', 'Rajasthan, Gujarat', '🦌'),
];

const TIMELINE = [
    { year: '1936', text: 'Jim Corbett (then Hailey) becomes India\'s first national park.' },
    { year: '1972', text: 'Wildlife Protection Act enacted; Project Tiger launched.' },
    { year: '1973', text: 'Project Tiger establishes 9 tiger reserves across India.' },
    { year: '1985', text: 'Kaziranga and Sundarbans designated as UNESCO World Heritage Sites.' },
    { year: '1992', text: 'Indian Wildlife Protection Act amended for stricter enforcement.' },
    { year: '2006', text: 'Tiger Census reveals 1,411 tigers — a historic low point.' },
    { year: '2010', text: 'National Tiger Conservation Authority strengthens anti-poaching efforts.' },
    { year: '2022', text: 'India reports 3,167 tigers — a remarkable conservation recovery.' },
];

class WildlifeEngine {
    constructor(config = {}) {
        this.parks = config.parks || PARKS;
        this.sanctuaries = config.sanctuaries || SANCTUARIES;
        this.species = config.species || SPECIES;
        this.state = { searchQuery: '', categoryFilter: 'all', parkBiomeFilter: 'all',
            sanctuaryHabitatFilter: 'all', speciesConservationFilter: 'all', sortBy: 'name-asc' };
    }

    getParks() { return [...this.parks]; }
    getSanctuaries() { return [...this.sanctuaries]; }
    getSpecies() { return [...this.species]; }
    getAllItems() { return [...this.parks, ...this.sanctuaries, ...this.species]; }

    getStats() {
        const states = new Set();
        this.parks.forEach(p => states.add(p.state));
        this.sanctuaries.forEach(s => states.add(s.state));
        return { parks: this.parks.length, sanctuaries: this.sanctuaries.length,
            species: this.species.length, states: states.size };
    }

    matchesSearch(item, query) {
        if (!query || query.trim() === '') return true;
        const terms = query.toLowerCase().trim().split(/\s+/);
        const text = [item.name, item.description, item.state || '', item.habitat || '',
            item.biome || '', item.range || '', item.conservation || '', item.area || '',
            ...(item.highlights || []), ...(item.keySpecies || []),
            ...(item.tags || [])].join(' ').toLowerCase();
        return terms.every(term => text.includes(term));
    }

    searchItems(items, query) { return items.filter(item => this.matchesSearch(item, query)); }

    filterParksByBiome(biome) { return biome === 'all' ? this.parks : this.parks.filter(p => p.biome === biome || (biome === 'tropical' && p.biome === 'dry deciduous')); }
    filterSanctuariesByHabitat(habitat) { return habitat === 'all' ? this.sanctuaries : this.sanctuaries.filter(s => s.habitat === habitat); }
    filterSpeciesByConservation(c) { return c === 'all' ? this.species : this.species.filter(s => s.conservation === c); }

    sortItems(items, sortBy = this.state.sortBy) {
        const sorted = [...items];
        switch (sortBy) {
            case 'name-asc': return sorted.sort((a, b) => a.name.localeCompare(b.name));
            case 'name-desc': return sorted.sort((a, b) => b.name.localeCompare(a.name));
            case 'origin': return sorted.sort((a, b) => (a.state || a.habitat || '').localeCompare(b.state || b.habitat || ''));
            default: return sorted;
        }
    }

    getFilteredParks() { return this.sortItems(this.searchItems(this.filterParksByBiome(this.state.parkBiomeFilter), this.state.searchQuery)); }
    getFilteredSanctuaries() { return this.sortItems(this.searchItems(this.filterSanctuariesByHabitat(this.state.sanctuaryHabitatFilter), this.state.searchQuery)); }
    getFilteredSpecies() { return this.sortItems(this.searchItems(this.filterSpeciesByConservation(this.state.speciesConservationFilter), this.state.searchQuery)); }

    getStateDistribution() {
        const counts = {};
        this.parks.forEach(p => { counts[p.state] = (counts[p.state] || 0) + 1; });
        this.sanctuaries.forEach(s => { counts[s.state] = (counts[s.state] || 0) + 1; });
        return Object.entries(counts).map(([state, count]) => ({ state, count }))
            .sort((a, b) => b.count - a.count).slice(0, 8);
    }

    getBiomeDistribution() {
        const counts = {};
        this.parks.forEach(p => { counts[p.biome] = (counts[p.biome] || 0) + 1; });
        return Object.entries(counts).map(([biome, count]) => ({ biome, count })).sort((a, b) => b.count - a.count);
    }

    getConservationBreakdown() {
        const counts = {};
        this.species.forEach(s => { counts[s.conservation] = (counts[s.conservation] || 0) + 1; });
        return Object.entries(counts).map(([status, count]) => ({ status, count })).sort((a, b) => b.count - a.count);
    }

    getTimeline() { return TIMELINE; }

    setSearchQuery(q) { this.state.searchQuery = q; }
    setCategoryFilter(f) { this.state.categoryFilter = f; }
    setParkBiomeFilter(b) { this.state.parkBiomeFilter = b; }
    setSanctuaryHabitatFilter(h) { this.state.sanctuaryHabitatFilter = h; }
    setSpeciesConservationFilter(c) { this.state.speciesConservationFilter = c; }
    setSortBy(s) { this.state.sortBy = s; }
    resetFilters() { this.state = { searchQuery: '', categoryFilter: 'all', parkBiomeFilter: 'all',
        sanctuaryHabitatFilter: 'all', speciesConservationFilter: 'all', sortBy: 'name-asc' }; }

    getBadgeClass(v) {
        return { tropical:'badge-tropical',grassland:'badge-grassland',mountain:'badge-mountain',
            wetland:'badge-wetland',desert:'badge-desert','dry deciduous':'badge-tropical',
            forest:'badge-forest',coastal:'badge-coastal',riverine:'badge-riverine',
            endangered:'badge-endangered',vulnerable:'badge-vulnerable','least-concern':'badge-least-concern' }[v] || 'badge-tropical';
    }

    getChartColor(i) { return ['green','gold','saffron','blue'][i % 4]; }
    getBiomeDotColor(b) { return { tropical:'#4ade80',grassland:'#facc15',mountain:'#38bdf8',wetland:'#a78bfa',desert:'#fb923c','dry deciduous':'#4ade80' }[b] || '#94a3b8'; }
    getConsDotColor(c) { return { endangered:'#fb7185',vulnerable:'#facc15','least-concern':'#4ade80' }[c] || '#94a3b8'; }
}

/* Renderers */
function renderParkCard(p) { const b = engine.getBadgeClass(p.biome); const h = p.highlights.map(x => `<span class="card-tag">✨ ${x}</span>`).join(''); const t = p.tags.map(x => `<span class="card-tag">${x}</span>`).join('');
    return `<article class="wl-card" role="listitem" tabindex="0" aria-label="${p.name}"><div class="card-header"><h3 class="card-title">🦁 ${p.name}</h3><span class="card-badge ${b}">${p.biome}</span></div><p class="card-description">${p.description}</p><div class="card-tags"><span class="card-tag">📍 ${p.state}</span><span class="card-tag">📐 ${p.area}</span>${h}${t}</div></article>`; }

function renderSanctuaryCard(s) { const b = engine.getBadgeClass(s.habitat); const sp = s.keySpecies.map(x => `<span class="card-tag">🐾 ${x}</span>`).join(''); const t = s.tags.map(x => `<span class="card-tag">${x}</span>`).join('');
    return `<article class="wl-card" role="listitem" tabindex="0" aria-label="${s.name}"><div class="card-header"><h3 class="card-title">🦌 ${s.name}</h3><span class="card-badge ${b}">${s.habitat}</span></div><p class="card-description">${s.description}</p><div class="card-tags"><span class="card-tag">📍 ${s.state}</span>${sp}${t}</div></article>`; }

function renderSpeciesCard(sp) { const b = engine.getBadgeClass(sp.conservation);
    return `<article class="sp-card" role="listitem" tabindex="0" aria-label="${sp.name}"><div class="sp-avatar">${sp.emoji}</div><div class="sp-info"><h3 class="sp-name">${sp.name}</h3><p class="sp-meta"><span class="card-badge ${b}">${sp.conservation}</span> &nbsp; 🌍 ${sp.habitat} &nbsp; 📍 ${sp.range}</p><p class="sp-desc">${sp.description}</p></div></article>`; }

function renderStateChart(d) { const mx = Math.max(...d.map(x=>x.count)); return d.map((i,idx) => `<div class="chart-bar-row"><span class="chart-bar-label">${i.state}</span><div class="chart-bar-track"><div class="chart-bar-fill ${engine.getChartColor(idx)}" style="width:${(i.count/mx*100).toFixed(0)}%"></div></div><span class="chart-bar-value">${i.count}</span></div>`).join(''); }
function renderBiomeChart(d) { return d.map(i => `<div class="biome-row"><span class="biome-dot" style="background:${engine.getBiomeDotColor(i.biome)}"></span><span class="biome-name">${i.biome.charAt(0).toUpperCase()+i.biome.slice(1)}</span><span class="biome-count">${i.count}</span></div>`).join(''); }
function renderConsChart(d) { return d.map(i => `<div class="cons-row"><span class="cons-dot" style="background:${engine.getConsDotColor(i.status)}"></span><span class="cons-name">${i.status.split('-').map(w=>w.charAt(0).toUpperCase()+w.slice(1)).join(' ')}</span><span class="cons-count">${i.count}</span></div>`).join(''); }
function renderTimeline(d) { return d.map(i => `<div class="timeline-entry"><span class="timeline-dot"></span><div class="timeline-info"><span class="timeline-year">${i.year}</span><p class="timeline-text">${i.text}</p></div></div>`).join(''); }

function renderAll() {
    const parks = engine.getFilteredParks(), sanctuaries = engine.getFilteredSanctuaries(), species = engine.getFilteredSpecies();
    const pg = document.getElementById('park-grid'), pe = document.getElementById('park-empty');
    const sg = document.getElementById('sanctuary-grid'), se = document.getElementById('sanctuary-empty');
    const spg = document.getElementById('species-grid'), spe = document.getElementById('species-empty');
    if (pg) { pg.innerHTML = parks.map(renderParkCard).join(''); if (pe) pe.hidden = parks.length > 0; }
    if (sg) { sg.innerHTML = sanctuaries.map(renderSanctuaryCard).join(''); if (se) se.hidden = sanctuaries.length > 0; }
    if (spg) { spg.innerHTML = species.map(renderSpeciesCard).join(''); if (spe) spe.hidden = species.length > 0; }
    const stats = engine.getStats();
    const sp = document.getElementById('stat-parks'), ss = document.getElementById('stat-sanctuaries');
    const spp = document.getElementById('stat-species'), st = document.getElementById('stat-states');
    if (sp) sp.textContent = stats.parks; if (ss) ss.textContent = stats.sanctuaries;
    if (spp) spp.textContent = stats.species; if (st) st.textContent = stats.states;
    const sc = document.getElementById('state-chart'), bc = document.getElementById('biome-chart');
    const cc = document.getElementById('conservation-chart'), tl = document.getElementById('timeline-chart');
    if (sc) sc.innerHTML = renderStateChart(engine.getStateDistribution());
    if (bc) bc.innerHTML = renderBiomeChart(engine.getBiomeDistribution());
    if (cc) cc.innerHTML = renderConsChart(engine.getConservationBreakdown());
    if (tl) tl.innerHTML = renderTimeline(engine.getTimeline());
}

function wireEventHandlers() {
    const si = document.getElementById('global-search');
    if (si) si.addEventListener('input', e => { engine.setSearchQuery(e.target.value); renderAll(); });
    document.querySelectorAll('.filter-btn[data-filter]').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn[data-filter]').forEach(b => { b.classList.remove('active'); b.setAttribute('aria-pressed', 'false'); });
            btn.classList.add('active'); btn.setAttribute('aria-pressed', 'true'); engine.setCategoryFilter(btn.dataset.filter);
            const f = btn.dataset.filter;
            document.getElementById('parks').style.display = (f === 'all' || f === 'park') ? '' : 'none';
            document.getElementById('sanctuaries').style.display = (f === 'all' || f === 'sanctuary') ? '' : 'none';
            document.getElementById('species').style.display = (f === 'all' || f === 'species') ? '' : 'none';
        });
    });
    const ss = document.getElementById('sort-select');
    if (ss) ss.addEventListener('change', e => { engine.setSortBy(e.target.value); renderAll(); });
    document.querySelectorAll('.sub-filter[data-biome]').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.sub-filter[data-biome]').forEach(b => { b.classList.remove('active'); b.setAttribute('aria-pressed', 'false'); });
            btn.classList.add('active'); btn.setAttribute('aria-pressed', 'true'); engine.setParkBiomeFilter(btn.dataset.biome); renderAll();
        });
    });
    document.querySelectorAll('.sub-filter[data-habitat]').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.sub-filter[data-habitat]').forEach(b => { b.classList.remove('active'); b.setAttribute('aria-pressed', 'false'); });
            btn.classList.add('active'); btn.setAttribute('aria-pressed', 'true'); engine.setSanctuaryHabitatFilter(btn.dataset.habitat); renderAll();
        });
    });
    document.querySelectorAll('.sub-filter[data-conservation]').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.sub-filter[data-conservation]').forEach(b => { b.classList.remove('active'); b.setAttribute('aria-pressed', 'false'); });
            btn.classList.add('active'); btn.setAttribute('aria-pressed', 'true'); engine.setSpeciesConservationFilter(btn.dataset.conservation); renderAll();
        });
    });
    const mt = document.getElementById('menu-toggle'), nm = document.getElementById('nav-menu');
    if (mt && nm) mt.addEventListener('click', () => nm.classList.toggle('open'));
    window.addEventListener('scroll', () => { const nb = document.getElementById('navbar'); if (nb) nb.classList.toggle('scrolled', window.scrollY > 50); });
}

const engine = new WildlifeEngine();
function initEngine() { wireEventHandlers(); renderAll(); }
if (typeof document !== 'undefined') { if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initEngine); else initEngine(); }

export { NationalPark, Sanctuary, WildlifeSpecies, WildlifeEngine, PARKS, SANCTUARIES, SPECIES, TIMELINE,
    renderParkCard, renderSanctuaryCard, renderSpeciesCard, renderStateChart, renderBiomeChart,
    renderConsChart, renderTimeline, engine };
