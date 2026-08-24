/* WILDLIFE ENGINE — Unit Tests (Vitest) */
import { describe, it, expect, beforeEach } from 'vitest';
import { NationalPark, Sanctuary, WildlifeSpecies, WildlifeEngine, PARKS, SANCTUARIES, SPECIES,
    renderParkCard, renderSanctuaryCard, renderSpeciesCard, renderStateChart, renderBiomeChart,
    renderConsChart, renderTimeline } from '../../frontend/indian-wildlife-ecotourism/wildlife-engine.js';

describe('NationalPark', () => {
    it('should create with all properties', () => { const p = new NationalPark('Test','tropical','TN','100 km2','D',['H'],['t']); expect(p.name).toBe('Test'); expect(p.type).toBe('park'); });
    it('should default highlights and tags', () => { const p = new NationalPark('X','grassland','UP','50 km2','D'); expect(p.highlights).toEqual([]); expect(p.tags).toEqual([]); });
});

describe('Sanctuary', () => {
    it('should create with all properties', () => { const s = new Sanctuary('Test','forest','TN','D',['Tiger'],['t']); expect(s.name).toBe('Test'); expect(s.type).toBe('sanctuary'); });
    it('should default', () => { const s = new Sanctuary('X','coastal','GJ','D'); expect(s.keySpecies).toEqual([]); expect(s.tags).toEqual([]); });
});

describe('WildlifeSpecies', () => {
    it('should create with all properties', () => { const s = new WildlifeSpecies('Tiger','endangered','Grassland','D','India','🐅'); expect(s.name).toBe('Tiger'); expect(s.type).toBe('species'); expect(s.emoji).toBe('🐅'); });
    it('should default emoji', () => { const s = new WildlifeSpecies('X','vulnerable','Forest','D','India'); expect(s.emoji).toBe('🦁'); });
});

describe('WildlifeEngine - Accessors', () => {
    let engine; beforeEach(() => { engine = new WildlifeEngine(); });
    it('should return all data', () => { expect(engine.getParks()).toHaveLength(PARKS.length); expect(engine.getSanctuaries()).toHaveLength(SANCTUARIES.length); expect(engine.getSpecies()).toHaveLength(SPECIES.length); });
    it('should return combined', () => { expect(engine.getAllItems()).toHaveLength(PARKS.length + SANCTUARIES.length + SPECIES.length); });
    it('should return stats', () => { const s = engine.getStats(); expect(s.parks).toBe(PARKS.length); expect(s.states).toBeGreaterThan(0); });
    it('should return copies', () => { expect(engine.getParks()).not.toBe(engine.getParks()); });
});

describe('WildlifeEngine - Search', () => {
    let engine; beforeEach(() => { engine = new WildlifeEngine(); });
    it('empty query', () => expect(engine.matchesSearch(engine.getParks()[0], '')).toBe(true));
    it('match name', () => { const p = engine.getParks()[0]; expect(engine.matchesSearch(p, p.name.toLowerCase())).toBe(true); });
    it('match state', () => { const p = engine.getParks()[0]; expect(engine.matchesSearch(p, p.state.toLowerCase())).toBe(true); });
    it('multi-term', () => { const p = engine.getParks().find(x => x.name === 'Jim Corbett'); expect(engine.matchesSearch(p, 'corbett uttarakhand')).toBe(true); });
    it('no match', () => expect(engine.matchesSearch(engine.getParks()[0], 'zzz')).toBe(false));
    it('searchItems', () => { expect(engine.searchItems(engine.getParks(), 'tiger').length).toBeGreaterThan(0); });
});

describe('WildlifeEngine - Filtering', () => {
    let engine; beforeEach(() => { engine = new WildlifeEngine(); });
    it('parks by biome', () => { expect(engine.filterParksByBiome('all')).toHaveLength(PARKS.length); const t = engine.filterParksByBiome('tropical'); expect(t.length).toBeGreaterThan(0); });
    it('sanctuaries by habitat', () => { expect(engine.filterSanctuariesByHabitat('all')).toHaveLength(SANCTUARIES.length); const f = engine.filterSanctuariesByHabitat('forest'); expect(f.length).toBeGreaterThan(0); });
    it('species by conservation', () => { expect(engine.filterSpeciesByConservation('all')).toHaveLength(SPECIES.length); const e = engine.filterSpeciesByConservation('endangered'); expect(e.length).toBeGreaterThan(0); expect(e.every(s => s.conservation === 'endangered')).toBe(true); });
});

describe('WildlifeEngine - Sorting', () => {
    let engine; beforeEach(() => { engine = new WildlifeEngine(); });
    it('sort asc', () => { const s = engine.sortItems(engine.getParks(), 'name-asc'); expect(s).toHaveLength(PARKS.length); });
    it('sort desc', () => { const s = engine.sortItems(engine.getParks(), 'name-desc'); expect(s).toHaveLength(PARKS.length); });
    it('sort origin', () => { const s = engine.sortItems(engine.getParks(), 'origin'); expect(s).toHaveLength(PARKS.length); });
    it('default', () => { const s = engine.sortItems(engine.getParks(), 'x'); expect(s).toHaveLength(PARKS.length); });
});

describe('WildlifeEngine - Pipelines', () => {
    let engine; beforeEach(() => { engine = new WildlifeEngine(); });
    it('all defaults', () => { expect(engine.getFilteredParks()).toHaveLength(PARKS.length); expect(engine.getFilteredSanctuaries()).toHaveLength(SANCTUARIES.length); expect(engine.getFilteredSpecies()).toHaveLength(SPECIES.length); });
    it('search narrows', () => { engine.setSearchQuery('tiger'); expect(engine.getFilteredParks().length).toBeLessThan(PARKS.length); });
    it('filter narrows', () => { engine.setSpeciesConservationFilter('endangered'); expect(engine.getFilteredSpecies().length).toBeLessThan(SPECIES.length); });
});

describe('WildlifeEngine - Analytics', () => {
    let engine; beforeEach(() => { engine = new WildlifeEngine(); });
    it('state dist', () => { const d = engine.getStateDistribution(); expect(d.length).toBeGreaterThan(0); expect(d.length).toBeLessThanOrEqual(8); });
    it('biome dist', () => { const d = engine.getBiomeDistribution(); expect(d.length).toBeGreaterThan(0); });
    it('conservation', () => { const d = engine.getConservationBreakdown(); expect(d.length).toBeGreaterThan(0); });
    it('timeline', () => { expect(engine.getTimeline().length).toBeGreaterThan(0); });
});

describe('WildlifeEngine - State', () => {
    let engine; beforeEach(() => { engine = new WildlifeEngine(); });
    it('set and reset', () => { engine.setSearchQuery('x'); engine.setParkBiomeFilter('tropical'); engine.setSanctuaryHabitatFilter('forest');
        engine.setSpeciesConservationFilter('endangered'); engine.setSortBy('name-desc'); engine.setCategoryFilter('park');
        engine.resetFilters(); expect(engine.state.searchQuery).toBe(''); expect(engine.state.parkBiomeFilter).toBe('all'); });
});

describe('WildlifeEngine - Helpers', () => {
    let engine; beforeEach(() => { engine = new WildlifeEngine(); });
    it('badge', () => { expect(engine.getBadgeClass('tropical')).toBe('badge-tropical'); expect(engine.getBadgeClass('x')).toBe('badge-tropical'); });
    it('chart color', () => { expect(engine.getChartColor(0)).toBe('green'); expect(engine.getChartColor(4)).toBe('green'); });
    it('biome dot', () => { expect(engine.getBiomeDotColor('tropical')).toBe('#4ade80'); expect(engine.getBiomeDotColor('x')).toBe('#94a3b8'); });
    it('cons dot', () => { expect(engine.getConsDotColor('endangered')).toBe('#fb7185'); expect(engine.getConsDotColor('x')).toBe('#94a3b8'); });
});

describe('Render', () => {
    const p = new NationalPark('Test','tropical','TN','100 km2','D',['H'],['t']);
    const s = new Sanctuary('Test','forest','TN','D',['Tiger'],['t']);
    const sp = new WildlifeSpecies('Tiger','endangered','Forest','D','India','🐅');
    it('park', () => { const h = renderParkCard(p); expect(h).toContain('Test'); expect(h).toContain('tropical'); });
    it('sanctuary', () => { const h = renderSanctuaryCard(s); expect(h).toContain('Test'); expect(h).toContain('forest'); });
    it('species', () => { const h = renderSpeciesCard(sp); expect(h).toContain('Tiger'); expect(h).toContain('endangered'); });
    it('state chart', () => { expect(renderStateChart([{state:'TN',count:3},{state:'UP',count:2}])).toContain('TN'); });
    it('biome chart', () => { expect(renderBiomeChart([{biome:'tropical',count:5}])).toContain('Tropical'); });
    it('cons chart', () => { expect(renderConsChart([{status:'endangered',count:3}])).toContain('Endangered'); });
    it('timeline', () => { expect(renderTimeline([{year:'1972',text:'Test'}])).toContain('1972'); });
});

describe('Config', () => {
    it('custom data', () => { const e = new WildlifeEngine({ parks: [new NationalPark('X','tropical','TN','100','D')], sanctuaries: [new Sanctuary('X','forest','TN','D')], species: [new WildlifeSpecies('X','endangered','Forest','D','India')] });
        expect(e.getParks()).toHaveLength(1); expect(e.getSanctuaries()).toHaveLength(1); expect(e.getSpecies()).toHaveLength(1); });
});
