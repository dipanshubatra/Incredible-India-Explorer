/* ==========================================================================
   FESTIVAL ENGINE — Core Business Logic
   Enterprise class-based service engine for Indian Festivals & Cultural
   Calendar Explorer. Handles data initialization, filtering, sorting,
   searching, rendering, analytics computation, and state management.

   Design Decisions:
   - Single FestivalEngine class encapsulates all state and operations
   - Pure functional helpers for data transforms
   - All DOM manipulation isolated in render methods for testability
   - Search supports multi-term fuzzy matching across all fields
   - Analytics computed on-demand from full dataset (not filtered)

   Architecture Notes:
   - Engine is exported as a named ES module export
   - UI bootstrap runs on DOMContentLoaded via initEngine()
   - Each section (festival, calendar, tradition) has independent filter state
   ========================================================================== */

/**
 * Festival — Represents an Indian festival with season, month, and origin.
 */
class Festival {
    constructor(name, month, season, origin, description, rituals, tags) {
        this.name = name;
        this.month = month;
        this.season = season;
        this.origin = origin;
        this.description = description;
        this.rituals = rituals || [];
        this.tags = tags || [];
        this.type = 'festival';
    }
}

/**
 * MonthEvent — Represents a month in the festival calendar with its festivals.
 */
class MonthEvent {
    constructor(month, monthIndex, quarter, festivals, description) {
        this.name = month;
        this.monthIndex = monthIndex;
        this.quarter = quarter;
        this.festivals = festivals;
        this.description = description;
        this.type = 'calendar';
    }
}

/**
 * CulturalTradition — Represents a cultural tradition or practice associated with festivals.
 */
class CulturalTradition {
    constructor(name, religion, origin, description, significance, tags) {
        this.name = name;
        this.religion = religion;
        this.origin = origin;
        this.description = description;
        this.significance = significance;
        this.tags = tags || [];
        this.type = 'tradition';
    }
}

/* ======================================================================
   MASTER DATASETS
   ====================================================================== */

const FESTIVALS = [
    new Festival('Diwali', 'October/November', 'autumn', 'Pan India',
        'The Festival of Lights, celebrating the triumph of light over darkness and good over evil. Houses are illuminated with diyas and rangoli adorns doorsteps.', ['Diya lighting', 'Rangoli', 'Lakshmi Puja', 'Fireworks'], ['Pan India', 'Light', 'Lakshmi']),
    new Festival('Holi', 'March', 'spring', 'North India',
        'The Festival of Colors, celebrating the arrival of spring and the love of Radha and Krishna. People throw colored powders and water at each other.', ['Color throwing', 'Bonfires', 'Thandai', 'Music'], ['North India', 'Colors', 'Spring']),
    new Festival('Dussehra', 'October', 'autumn', 'Pan India',
        'Celebrating Lord Rama\'s victory over Ravana, symbolizing the triumph of good over evil. Features dramatic Ramlila performances and burning of Ravana effigies.', ['Ramlila', 'Effigy burning', 'Processions'], ['Pan India', 'Rama', 'Victory']),
    new Festival('Navratri', 'September/October', 'autumn', 'Pan India',
        'Nine nights dedicated to the worship of Goddess Durga in her nine forms. Features fasting, dance (Garba/Dandiya), and elaborate temple decorations.', ['Garba dance', 'Fasting', 'Durga Puja', 'Nine forms'], ['Pan India', 'Durga', 'Nine Nights']),
    new Festival('Eid ul-Fitr', 'Varies (Islamic calendar)', 'year-round', 'Pan India',
        'The Festival of Breaking Fast, marking the end of Ramadan. Muslims gather for Eid prayers, share feasts, and distribute Zakat to the needy.', ['Eid prayers', 'Feast', 'Zakat', 'New clothes'], ['Pan India', 'Ramadan', 'Islam']),
    new Festival('Pongal', 'January', 'winter', 'Tamil Nadu',
        'A four-day harvest festival dedicated to the Sun God. Farmers thank nature for a bountiful harvest with the ritual cooking of Pongal dish.', ['Pongal cooking', 'Kolam', 'Cattle decoration', 'Sun worship'], ['Tamil Nadu', 'Harvest', 'Sun']),
    new Festival('Baisakhi', 'April', 'spring', 'Punjab',
        'The Punjabi New Year and harvest festival. It also marks the founding of the Khalsa by Guru Gobind Singh. Features Bhangra and traditional fairs.', ['Bhangra', 'Nagar Kirtan', 'Fairs', 'Harvest'], ['Punjab', 'Harvest', 'Sikh']),
    new Festival('Onam', 'August/September', 'monsoon', 'Kerala',
        'Kerala\'s harvest festival celebrating the return of King Mahabala. Features flower carpets (Pookalam), snake boat races, and the grand Onam Sadya feast.', ['Pookalam', 'Snake boat race', 'Onam Sadya', 'Kaikottikali'], ['Kerala', 'Harvest', 'Mahabala']),
    new Festival('Ganesh Chaturthi', 'August/September', 'monsoon', 'Maharashtra',
        'A ten-day festival celebrating the birth of Lord Ganesha with elaborately crafted clay idols, music, dance, and the grand immersion procession.', ['Idol installation', 'Modak', 'Visarjan', 'Music'], ['Maharashtra', 'Ganesha', 'Clay Idols']),
    new Festival('Christmas', 'December', 'winter', 'Pan India',
        'Celebrating the birth of Jesus Christ with midnight mass, carol singing, decorated Christmas trees, and festive gatherings across Christian communities.', ['Midnight mass', 'Carol singing', 'Gifts', 'Feast'], ['Pan India', 'Jesus', 'Christianity']),
    new Festival('Lohri', 'January', 'winter', 'Punjab',
        'A winter harvest festival celebrated with bonfires, folk songs, and traditional foods like Rewri and Gajak. Marks the end of winter solstice.', ['Bonfire', 'Folk songs', 'Rewri', 'Gajak'], ['Punjab', 'Winter', 'Harvest']),
    new Festival('Bihu', 'April', 'spring', 'Assam',
        'Assam\'s most important festival celebrating the Assamese New Year and the agricultural cycle. Features traditional Bihu dance and feasts.', ['Bihu dance', 'Feasts', 'Traditional music', 'Gamosa'], ['Assam', 'New Year', 'Agriculture']),
    new Festival('Rath Yatra', 'June/July', 'monsoon', 'Odisha',
        'The Grand Chariot Festival in Puri where Lord Jagannath, Balabhadra, and Subhadra are taken on massive chariots through the streets.', ['Chariot procession', 'Temple rituals', 'Devotional singing'], ['Odisha', 'Jagannath', 'Chariot']),
    new Festival('Makar Sankranti', 'January', 'winter', 'Pan India',
        'A harvest festival marking the sun\'s transition into Capricorn. Celebrated as Pongal in Tamil Nadu, Lohri in Punjab, and Uttarayan in Gujarat.', ['Kite flying', 'Til-gul', 'Bonfires', 'River bathing'], ['Pan India', 'Harvest', 'Sun']),
    new Festival('Eid ul-Adha', 'Varies (Islamic calendar)', 'year-round', 'Pan India',
        'The Festival of Sacrifice commemorating Prophet Ibrahim\'s willingness to sacrifice his son. Families offer Qurbani and distribute meat to the poor.', ['Qurbani', 'Feast', 'Prayers', 'Charity'], ['Pan India', 'Ibrahim', 'Islam']),
    new Festival('Buddha Purnima', 'May', 'summer', 'Pan India',
        'Celebrating the birth, enlightenment, and death of Gautama Buddha. Devotees visit monasteries, meditate, and practice acts of kindness.', ['Meditation', 'Monastery visits', 'Dana', 'Processions'], ['Pan India', 'Buddha', 'Enlightenment']),
];

const MONTHS = [
    new MonthEvent('January', 1, 'Q1', ['Pongal', 'Lohri', 'Makar Sankranti', 'Republic Day'], 'The year begins with harvest celebrations and kite festivals across India.'),
    new MonthEvent('February', 2, 'Q1', ['Basant Panchami', 'Bhishma Ashtami'], 'Preparation for spring with Saraswati worship and seasonal transitions.'),
    new MonthEvent('March', 3, 'Q1', ['Holi', 'Maha Shivaratri', 'Ugadi'], 'Spring bursts with colors during Holi and devotion during Maha Shivaratri.'),
    new MonthEvent('April', 4, 'Q2', ['Baisakhi', 'Bihu', 'Vishu', 'Ram Navami'], 'New year celebrations across different regional calendars.'),
    new MonthEvent('May', 5, 'Q2', ['Buddha Purnima', 'Akshaya Tritiya'], 'Spiritual reflection and auspicious beginnings in the summer heat.'),
    new MonthEvent('June', 6, 'Q2', ['Rath Yatra', 'Jagannath Yatra', 'Ambubachi Mela'], 'The monsoon arrives with grand chariot festivals and temple fairs.'),
    new MonthEvent('July', 7, 'Q3', ['Guru Purnima', 'Karga Til Ekadashi'], 'A month dedicated to teachers and spiritual guides across traditions.'),
    new MonthEvent('August', 8, 'Q3', ['Independence Day', 'Ganesh Chaturthi', 'Raksha Bandhan'], 'National pride meets devotional fervor with Ganesha celebrations.'),
    new MonthEvent('September', 9, 'Q3', ['Onam', 'Navratri begins', 'Pitru Paksha'], 'Kerala\'s harvest feast and the beginning of nine nights of dance.'),
    new MonthEvent('October', 10, 'Q4', ['Dussehra', 'Navratri ends', 'Karva Chauth'], 'The triumph of good over evil is celebrated with passion across India.'),
    new MonthEvent('November', 11, 'Q4', ['Diwali', 'Chhath Puja', 'Guru Nanak Jayanti'], 'The Festival of Lights illuminates every corner of India.'),
    new MonthEvent('December', 12, 'Q4', ['Christmas', 'Winter Solstice'], 'The year ends with festive celebrations and hope for the new year.'),
];

const TRADITIONS = [
    new CulturalTradition('Rangoli Art', 'Hindu', 'Pan India',
        'An ancient art form where colorful patterns are created on floors using rice flour, colored powder, and flower petals to welcome deities and guests.', 'Symbolizes prosperity and hospitality'),
    new CulturalTradition('Kolam Drawing', 'Hindu', 'Tamil Nadu',
        'A traditional floor art using rice flour to create geometric patterns at the entrance of homes, believed to bring good luck and feed birds.', 'Daily practice and festival ritual'),
    new CulturalTradition('Garba Dance', 'Hindu', 'Gujarat',
        'A circular dance performed during Navratri honoring Goddess Amba. Dancers move in concentric circles with rhythmic clapping and traditional attire.', 'Devotion through movement'),
    new CulturalTradition('Dandiya Raas', 'Hindu', 'Gujarat',
        'A lively dance performed with decorated sticks (dandiyas) during Navratri, representing the fight between Goddess Durga and Mahishasura.', 'Mythological reenactment'),
    new CulturalTradition('Mehendi Ceremony', 'Hindu/Muslim', 'North India',
        'An intricate henna application ritual before weddings and festivals. The depth of mehendi color is believed to signify the strength of love.', 'Pre-wedding celebration'),
    new CulturalTradition('Aarti Ritual', 'Hindu', 'Pan India',
        'A devotional ceremony of light offered to deities using a flame on a plate, accompanied by chanting and ringing of bells.', 'Daily worship and festival centerpiece'),
    new CulturalTradition('Ifter Feast', 'Muslim', 'Pan India',
        'The breaking of the Ramadan fast at sunset with dates, water, and a communal meal. Communities gather to share food and prayers.', 'Community bonding and charity'),
    new CulturalTradition('Langar Tradition', 'Sikh', 'Pan India',
        'The Sikh community kitchen (langar) at Gurdwaras serves free vegetarian meals to all visitors regardless of caste, creed, or background.', 'Equality and service'),
    new CulturalTradition('Pookalam', 'Hindu', 'Kerala',
        'Elaborate floral carpet designs created on the ground during Onam. Families compete to create the most beautiful and intricate patterns.', 'Welcome King Mahabala'),
    new CulturalTradition('Durga Puja', 'Hindu', 'Bengal',
        'A ten-day festival celebrating Goddess Durga\'s victory over Mahishasura. Features elaborate pandal decorations, cultural programs, and immersion.', 'Triumph of good over evil'),
    new CulturalTradition('Christmas Carol', 'Christian', 'Pan India',
        'Groups of carolers go door-to-door singing hymns and Christmas songs, sharing the message of peace and joy during the Christmas season.', 'Spreading goodwill'),
    new CulturalTradition('Vesak Meditation', 'Buddhist', 'Pan India',
        'On Buddha Purnima, devotees meditate at monasteries and practice mindfulness, reflecting on the Four Noble Truths and the Eightfold Path.', 'Spiritual reflection'),
    new CulturalTradition('Navagraha Worship', 'Hindu', 'Pan India',
        'Worship of the nine celestial bodies (planets) believed to influence human destiny. Performed during eclipses and specific festival days.', 'Astrological harmony'),
    new CulturalTradition('Bihu Dance', 'Hindu', 'Assam',
        'A traditional folk dance performed during Bihu festivals featuring graceful hand movements, swaying hips, and rhythmic steps celebrating nature.', 'Agricultural celebration'),
];

/* ======================================================================
   FESTIVAL ENGINE CLASS
   ====================================================================== */

class FestivalEngine {
    constructor(config = {}) {
        this.festivals = config.festivals || FESTIVALS;
        this.months = config.months || MONTHS;
        this.traditions = config.traditions || TRADITIONS;

        this.state = {
            searchQuery: '',
            categoryFilter: 'all',
            festivalSeasonFilter: 'all',
            calendarQuarterFilter: 'all',
            traditionReligionFilter: 'all',
            sortBy: 'name-asc',
        };
    }

    /* --- Data Accessors --- */

    getFestivals() { return [...this.festivals]; }
    getMonths() { return [...this.months]; }
    getTraditions() { return [...this.traditions]; }

    getAllItems() {
        return [...this.festivals, ...this.months, ...this.traditions];
    }

    getStats() {
        const states = new Set();
        this.festivals.forEach(f => states.add(f.origin));
        this.traditions.forEach(t => states.add(t.origin));
        return {
            festivals: this.festivals.length,
            months: this.months.length,
            traditions: this.traditions.length,
            states: states.size,
        };
    }

    /* --- Search --- */

    matchesSearch(item, query) {
        if (!query || query.trim() === '') return true;
        const terms = query.toLowerCase().trim().split(/\s+/);
        const searchableText = [
            item.name,
            item.description,
            item.origin || '',
            item.religion || '',
            item.season || '',
            item.significance || '',
            item.month || '',
            item.quarter || '',
            ...(item.rituals || []),
            ...(item.tags || []),
            ...(item.festivals || []),
        ].join(' ').toLowerCase();
        return terms.every(term => searchableText.includes(term));
    }

    searchItems(items, query) {
        return items.filter(item => this.matchesSearch(item, query));
    }

    /* --- Filtering --- */

    filterFestivalsBySeason(season) {
        if (season === 'all') return this.festivals;
        return this.festivals.filter(f => f.season === season || f.season === 'autumn');
    }

    filterMonthsByQuarter(quarter) {
        if (quarter === 'all') return this.months;
        return this.months.filter(m => m.quarter === quarter);
    }

    filterTraditionsByReligion(religion) {
        if (religion === 'all') return this.traditions;
        return this.traditions.filter(t => t.religion === religion);
    }

    /* --- Sorting --- */

    sortItems(items, sortBy = this.state.sortBy) {
        const sorted = [...items];
        switch (sortBy) {
            case 'name-asc':
                return sorted.sort((a, b) => a.name.localeCompare(b.name));
            case 'name-desc':
                return sorted.sort((a, b) => b.name.localeCompare(a.name));
            case 'month':
                return sorted.sort((a, b) => (a.monthIndex || 0) - (b.monthIndex || 0));
            case 'origin':
                return sorted.sort((a, b) => (a.origin || a.religion || '').localeCompare(b.origin || b.religion || ''));
            default:
                return sorted;
        }
    }

    /* --- Combined Pipelines --- */

    getFilteredFestivals() {
        let items = this.filterFestivalsBySeason(this.state.festivalSeasonFilter);
        items = this.searchItems(items, this.state.searchQuery);
        return this.sortItems(items);
    }

    getFilteredMonths() {
        let items = this.filterMonthsByQuarter(this.state.calendarQuarterFilter);
        items = this.searchItems(items, this.state.searchQuery);
        return this.sortItems(items);
    }

    getFilteredTraditions() {
        let items = this.filterTraditionsByReligion(this.state.traditionReligionFilter);
        items = this.searchItems(items, this.state.searchQuery);
        return this.sortItems(items);
    }

    /* --- Analytics --- */

    getSeasonalDistribution() {
        const counts = { spring: 0, summer: 0, autumn: 0, winter: 0, 'year-round': 0 };
        this.festivals.forEach(f => {
            if (counts[f.season] !== undefined) counts[f.season]++;
            else counts['year-round']++;
        });
        return Object.entries(counts)
            .map(([season, count]) => ({ season, count }))
            .sort((a, b) => b.count - a.count);
    }

    getMonthlyFestivalCount() {
        const counts = {};
        this.months.forEach(m => { counts[m.name] = m.festivals.length; });
        return Object.entries(counts)
            .map(([month, count]) => ({ month, count }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 12);
    }

    getReligiousBreakdown() {
        const counts = {};
        this.traditions.forEach(t => {
            const key = t.religion.split('/')[0];
            counts[key] = (counts[key] || 0) + 1;
        });
        return Object.entries(counts)
            .map(([religion, count]) => ({ religion, count }))
            .sort((a, b) => b.count - a.count);
    }

    getTimeline() {
        return [
            { year: '3000 BCE', text: 'Earliest harvest festivals documented in Indus Valley texts.' },
            { year: '1500 BCE', text: 'Rigveda mentions seasonal rituals and fire ceremonies.' },
            { year: '300 CE', text: 'Diwali and Holi rituals codified in Puranic literature.' },
            { year: '700 CE', text: 'Navratri and Durga Puja traditions formalized in Bengal.' },
            { year: '1200s', text: 'Sikh festivals emerge with the founding of the Khalsa.' },
            { year: '1600s', text: 'Christmas and Eid become major pan-Indian celebrations.' },
            { year: '1947', text: 'Republic Day and Independence Day added to the national calendar.' },
            { year: '2000s', text: 'Indian festivals gain global recognition and multicultural participation.' },
        ];
    }

    /* --- State Management --- */

    setSearchQuery(query) { this.state.searchQuery = query; }
    setCategoryFilter(filter) { this.state.categoryFilter = filter; }
    setFestivalSeasonFilter(season) { this.state.festivalSeasonFilter = season; }
    setCalendarQuarterFilter(quarter) { this.state.calendarQuarterFilter = quarter; }
    setTraditionReligionFilter(religion) { this.state.traditionReligionFilter = religion; }
    setSortBy(sortBy) { this.state.sortBy = sortBy; }

    resetFilters() {
        this.state = {
            searchQuery: '', categoryFilter: 'all',
            festivalSeasonFilter: 'all', calendarQuarterFilter: 'all',
            traditionReligionFilter: 'all', sortBy: 'name-asc',
        };
    }

    /* --- Helpers --- */

    getBadgeClass(value) {
        const map = {
            spring: 'badge-spring', summer: 'badge-summer',
            monsoon: 'badge-monsoon', winter: 'badge-winter',
            'year-round': 'badge-year-round', autumn: 'badge-winter',
            hindu: 'badge-hindu', muslim: 'badge-muslim',
            sikh: 'badge-sikh', christian: 'badge-christian',
            buddhist: 'badge-buddhist', jain: 'badge-jain',
        };
        return map[value] || 'badge-hindu';
    }

    getChartColor(index) {
        const colors = ['saffron', 'green', 'gold', 'blue'];
        return colors[index % colors.length];
    }

    getSeasonDotColor(season) {
        const map = { spring: '#fb923c', summer: '#facc15', autumn: '#a78bfa', winter: '#38bdf8', 'year-round': '#4ade80' };
        return map[season] || '#94a3b8';
    }

    getReligionDotColor(religion) {
        const map = { Hindu: '#ff9933', Muslim: '#4ade80', Sikh: '#fb923c', Christian: '#38bdf8', Buddhist: '#facc15', Jain: '#a855f7' };
        return map[religion] || '#94a3b8';
    }
}

/* ======================================================================
   DOM RENDERING FUNCTIONS
   ====================================================================== */

function renderFestivalCard(festival) {
    const badgeClass = engine.getBadgeClass(festival.season);
    const tagsHTML = festival.tags.map(t => `<span class="card-tag">${t}</span>`).join('');
    const ritualsHTML = festival.rituals.map(r => `<span class="card-tag">✨ ${r}</span>`).join('');
    return `
        <article class="fest-card" role="listitem" tabindex="0"
                 aria-label="${festival.name} — ${festival.season} festival">
            <div class="card-header">
                <h3 class="card-title">🎉 ${festival.name}</h3>
                <span class="card-badge ${badgeClass}">${festival.season}</span>
            </div>
            <p class="card-description">${festival.description}</p>
            <div class="card-tags">
                <span class="card-tag">📅 ${festival.month}</span>
                <span class="card-tag">📍 ${festival.origin}</span>
                ${ritualsHTML}
                ${tagsHTML}
            </div>
        </article>`;
}

function renderMonthCard(month) {
    const badgeClass = 'badge-saffron';
    const festivalsHTML = month.festivals.map(f => `<div class="month-fest-item">🎉 ${f}</div>`).join('');
    return `
        <article class="month-card" role="listitem" tabindex="0"
                 aria-label="${month.name} — ${month.festivals.length} festivals">
            <div class="month-header">
                <h3 class="month-name">📅 ${month.name}</h3>
                <span class="month-count">${month.festivals.length} festivals</span>
            </div>
            <p class="card-description">${month.description}</p>
            <div class="month-festivals">
                ${festivalsHTML}
            </div>
        </article>`;
}

function renderTraditionCard(tradition) {
    const badgeClass = engine.getBadgeClass(tradition.religion.toLowerCase());
    const tagsHTML = tradition.tags.map(t => `<span class="card-tag">${t}</span>`).join('');
    return `
        <article class="tradition-card" role="listitem" tabindex="0"
                 aria-label="${tradition.name} — ${tradition.religion} tradition">
            <div class="tradition-header">
                <h3 class="tradition-name">🏮 ${tradition.name}</h3>
                <span class="card-badge ${badgeClass}">${tradition.religion}</span>
            </div>
            <p class="tradition-meta">📍 ${tradition.origin} &nbsp; ⭐ ${tradition.significance}</p>
            <p class="tradition-desc">${tradition.description}</p>
            <div class="card-tags">
                <span class="card-tag">📍 ${tradition.origin}</span>
                ${tagsHTML}
            </div>
        </article>`;
}

function renderSeasonChart(data) {
    return data.map(item => `
        <div class="season-row">
            <span class="season-dot" style="background: ${engine.getSeasonDotColor(item.season)}"></span>
            <span class="season-name">${item.season.charAt(0).toUpperCase() + item.season.slice(1)}</span>
            <span class="season-count">${item.count}</span>
        </div>`).join('');
}

function renderMonthChart(data) {
    const maxCount = Math.max(...data.map(d => d.count));
    return data.map((item, i) => {
        const pct = (item.count / maxCount * 100).toFixed(0);
        const colorClass = engine.getChartColor(i);
        return `
            <div class="chart-bar-row">
                <span class="chart-bar-label">${item.month}</span>
                <div class="chart-bar-track">
                    <div class="chart-bar-fill ${colorClass}" style="width: ${pct}%"></div>
                </div>
                <span class="chart-bar-value">${item.count}</span>
            </div>`;
    }).join('');
}

function renderReligiousChart(data) {
    return data.map(item => `
        <div class="religious-row">
            <span class="religious-dot" style="background: ${engine.getReligionDotColor(item.religion)}"></span>
            <span class="religious-name">${item.religion}</span>
            <span class="religious-count">${item.count}</span>
        </div>`).join('');
}

function renderTimeline(data) {
    return data.map(item => `
        <div class="timeline-entry">
            <span class="timeline-dot"></span>
            <div class="timeline-info">
                <span class="timeline-year">${item.year}</span>
                <p class="timeline-text">${item.text}</p>
            </div>
        </div>`).join('');
}

/* ======================================================================
   UI RENDER ORCHESTRATOR
   ====================================================================== */

function renderAll() {
    const festivals = engine.getFilteredFestivals();
    const festivalGrid = document.getElementById('festival-grid');
    const festivalEmpty = document.getElementById('festival-empty');
    if (festivalGrid) {
        festivalGrid.innerHTML = festivals.map(renderFestivalCard).join('');
        if (festivalEmpty) festivalEmpty.hidden = festivals.length > 0;
    }

    const months = engine.getFilteredMonths();
    const calendarGrid = document.getElementById('calendar-grid');
    const calendarEmpty = document.getElementById('calendar-empty');
    if (calendarGrid) {
        calendarGrid.innerHTML = months.map(renderMonthCard).join('');
        if (calendarEmpty) calendarEmpty.hidden = months.length > 0;
    }

    const traditions = engine.getFilteredTraditions();
    const traditionGrid = document.getElementById('tradition-grid');
    const traditionEmpty = document.getElementById('tradition-empty');
    if (traditionGrid) {
        traditionGrid.innerHTML = traditions.map(renderTraditionCard).join('');
        if (traditionEmpty) traditionEmpty.hidden = traditions.length > 0;
    }

    const stats = engine.getStats();
    const statFestivals = document.getElementById('stat-festivals');
    const statMonths = document.getElementById('stat-months');
    const statTraditions = document.getElementById('stat-traditions');
    const statStates = document.getElementById('stat-states');
    if (statFestivals) statFestivals.textContent = stats.festivals;
    if (statMonths) statMonths.textContent = stats.months;
    if (statTraditions) statTraditions.textContent = stats.traditions;
    if (statStates) statStates.textContent = stats.states;

    const seasonChart = document.getElementById('season-chart');
    const monthChart = document.getElementById('month-chart');
    const religiousChart = document.getElementById('religious-chart');
    const timelineChart = document.getElementById('timeline-chart');
    if (seasonChart) seasonChart.innerHTML = renderSeasonChart(engine.getSeasonalDistribution());
    if (monthChart) monthChart.innerHTML = renderMonthChart(engine.getMonthlyFestivalCount());
    if (religiousChart) religiousChart.innerHTML = renderReligiousChart(engine.getReligiousBreakdown());
    if (timelineChart) timelineChart.innerHTML = renderTimeline(engine.getTimeline());
}

/* ======================================================================
   EVENT HANDLER WIRING
   ====================================================================== */

function wireEventHandlers() {
    const searchInput = document.getElementById('global-search');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            engine.setSearchQuery(e.target.value);
            renderAll();
        });
    }

    document.querySelectorAll('.filter-btn[data-filter]').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn[data-filter]').forEach(b => {
                b.classList.remove('active');
                b.setAttribute('aria-pressed', 'false');
            });
            btn.classList.add('active');
            btn.setAttribute('aria-pressed', 'true');
            engine.setCategoryFilter(btn.dataset.filter);
            const filter = btn.dataset.filter;
            document.getElementById('festivals').style.display = (filter === 'all' || filter === 'festival') ? '' : 'none';
            document.getElementById('calendar').style.display = (filter === 'all' || filter === 'calendar') ? '' : 'none';
            document.getElementById('traditions').style.display = (filter === 'all' || filter === 'tradition') ? '' : 'none';
        });
    });

    const sortSelect = document.getElementById('sort-select');
    if (sortSelect) {
        sortSelect.addEventListener('change', (e) => {
            engine.setSortBy(e.target.value);
            renderAll();
        });
    }

    document.querySelectorAll('.sub-filter[data-season]').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.sub-filter[data-season]').forEach(b => {
                b.classList.remove('active'); b.setAttribute('aria-pressed', 'false');
            });
            btn.classList.add('active'); btn.setAttribute('aria-pressed', 'true');
            engine.setFestivalSeasonFilter(btn.dataset.season);
            renderAll();
        });
    });

    document.querySelectorAll('.sub-filter[data-quarter]').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.sub-filter[data-quarter]').forEach(b => {
                b.classList.remove('active'); b.setAttribute('aria-pressed', 'false');
            });
            btn.classList.add('active'); btn.setAttribute('aria-pressed', 'true');
            engine.setCalendarQuarterFilter(btn.dataset.quarter);
            renderAll();
        });
    });

    document.querySelectorAll('.sub-filter[data-origin]').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.sub-filter[data-origin]').forEach(b => {
                b.classList.remove('active'); b.setAttribute('aria-pressed', 'false');
            });
            btn.classList.add('active'); btn.setAttribute('aria-pressed', 'true');
            engine.setTraditionReligionFilter(btn.dataset.origin);
            renderAll();
        });
    });

    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => navMenu.classList.toggle('open'));
    }

    window.addEventListener('scroll', () => {
        const navbar = document.getElementById('navbar');
        if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 50);
    });
}

/* ======================================================================
   ENGINE INSTANCE & INITIALIZATION
   ====================================================================== */

const engine = new FestivalEngine();

function initEngine() {
    wireEventHandlers();
    renderAll();
}

if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initEngine);
    } else {
        initEngine();
    }
}

/* ======================================================================
   MODULE EXPORTS (for Vitest unit testing)
   ====================================================================== */

export {
    Festival,
    MonthEvent,
    CulturalTradition,
    FestivalEngine,
    FESTIVALS,
    MONTHS,
    TRADITIONS,
    renderFestivalCard,
    renderMonthCard,
    renderTraditionCard,
    renderSeasonChart,
    renderMonthChart,
    renderReligiousChart,
    renderTimeline,
    engine,
};
/* ==========================================================================
   END OF FESTIVAL ENGINE
   ========================================================================== */
