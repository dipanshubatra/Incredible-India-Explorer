/* ==========================================================================
   FESTIVAL ENGINE — Unit Tests (Vitest)
   Comprehensive test suite for the Indian Festivals & Cultural Calendar
   Explorer engine. Covers all public methods, filtering, search, analytics,
   and rendering helpers.

   Test Coverage Target: 100% statement and branch coverage.
   ========================================================================== */

import { describe, it, expect, beforeEach } from 'vitest';
import {
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
} from '../../frontend/indian-festivals-cultural-calendar/festival-engine.js';

/* ======================================================================
   MODEL CONSTRUCTION TESTS
   ====================================================================== */

describe('Festival', () => {
    it('should create a festival with all properties', () => {
        const f = new Festival('Test', 'March', 'spring', 'North India', 'Desc', ['ritual1'], ['tag1']);
        expect(f.name).toBe('Test');
        expect(f.month).toBe('March');
        expect(f.season).toBe('spring');
        expect(f.origin).toBe('North India');
        expect(f.description).toBe('Desc');
        expect(f.rituals).toEqual(['ritual1']);
        expect(f.tags).toEqual(['tag1']);
        expect(f.type).toBe('festival');
    });

    it('should default rituals and tags to empty array', () => {
        const f = new Festival('X', 'April', 'summer', 'Pan India', 'D');
        expect(f.rituals).toEqual([]);
        expect(f.tags).toEqual([]);
    });
});

describe('MonthEvent', () => {
    it('should create a month event with all properties', () => {
        const m = new MonthEvent('January', 1, 'Q1', ['Diwali'], 'Desc');
        expect(m.name).toBe('January');
        expect(m.monthIndex).toBe(1);
        expect(m.quarter).toBe('Q1');
        expect(m.festivals).toEqual(['Diwali']);
        expect(m.description).toBe('Desc');
        expect(m.type).toBe('calendar');
    });
});

describe('CulturalTradition', () => {
    it('should create a tradition with all properties', () => {
        const t = new CulturalTradition('Test', 'Hindu', 'Pan India', 'Desc', 'Sig', ['tag1']);
        expect(t.name).toBe('Test');
        expect(t.religion).toBe('Hindu');
        expect(t.origin).toBe('Pan India');
        expect(t.description).toBe('Desc');
        expect(t.significance).toBe('Sig');
        expect(t.tags).toEqual(['tag1']);
        expect(t.type).toBe('tradition');
    });

    it('should default tags to empty array', () => {
        const t = new CulturalTradition('X', 'Muslim', 'UP', 'D', 'S');
        expect(t.tags).toEqual([]);
    });
});

/* ======================================================================
   FESTIVAL ENGINE — DATA ACCESSOR TESTS
   ====================================================================== */

describe('FestivalEngine - Data Accessors', () => {
    let engine;

    beforeEach(() => { engine = new FestivalEngine(); });

    it('should return all festivals', () => {
        expect(engine.getFestivals()).toHaveLength(FESTIVALS.length);
    });

    it('should return all months', () => {
        expect(engine.getMonths()).toHaveLength(MONTHS.length);
    });

    it('should return all traditions', () => {
        expect(engine.getTraditions()).toHaveLength(TRADITIONS.length);
    });

    it('should return combined items', () => {
        expect(engine.getAllItems()).toHaveLength(FESTIVALS.length + MONTHS.length + TRADITIONS.length);
    });

    it('should return correct stats', () => {
        const stats = engine.getStats();
        expect(stats.festivals).toBe(FESTIVALS.length);
        expect(stats.months).toBe(MONTHS.length);
        expect(stats.traditions).toBe(TRADITIONS.length);
        expect(stats.states).toBeGreaterThan(0);
    });

    it('should return copies, not references', () => {
        const f1 = engine.getFestivals();
        const f2 = engine.getFestivals();
        expect(f1).not.toBe(f2);
        expect(f1).toEqual(f2);
    });
});

/* ======================================================================
   FESTIVAL ENGINE — SEARCH TESTS
   ====================================================================== */

describe('FestivalEngine - Search', () => {
    let engine;

    beforeEach(() => { engine = new FestivalEngine(); });

    it('should return true for empty query', () => {
        expect(engine.matchesSearch(engine.getFestivals()[0], '')).toBe(true);
        expect(engine.matchesSearch(engine.getFestivals()[0], '   ')).toBe(true);
    });

    it('should match by name', () => {
        const f = engine.getFestivals()[0];
        expect(engine.matchesSearch(f, f.name.toLowerCase())).toBe(true);
    });

    it('should match by origin', () => {
        const f = engine.getFestivals()[0];
        expect(engine.matchesSearch(f, f.origin.toLowerCase())).toBe(true);
    });

    it('should match by tag', () => {
        const f = engine.getFestivals()[0];
        if (f.tags.length > 0) {
            expect(engine.matchesSearch(f, f.tags[0].toLowerCase())).toBe(true);
        }
    });

    it('should match multi-term queries', () => {
        const f = engine.getFestivals().find(fa => fa.name === 'Diwali');
        expect(engine.matchesSearch(f, 'diwali lights')).toBe(true);
    });

    it('should not match absent terms', () => {
        expect(engine.matchesSearch(engine.getFestivals()[0], 'zzzznonexistent')).toBe(false);
    });

    it('should searchItems across an array', () => {
        const results = engine.searchItems(engine.getFestivals(), 'diwali');
        expect(results.length).toBeGreaterThanOrEqual(1);
    });
});

/* ======================================================================
   FESTIVAL ENGINE — FILTER TESTS
   ====================================================================== */

describe('FestivalEngine - Filtering', () => {
    let engine;

    beforeEach(() => { engine = new FestivalEngine(); });

    describe('Festival season filter', () => {
        it('should return all when "all"', () => {
            expect(engine.filterFestivalsBySeason('all')).toHaveLength(FESTIVALS.length);
        });

        it('should filter spring festivals', () => {
            const spring = engine.filterFestivalsBySeason('spring');
            expect(spring.length).toBeGreaterThan(0);
        });

        it('should filter summer festivals', () => {
            const summer = engine.filterFestivalsBySeason('summer');
            expect(summer.length).toBeGreaterThan(0);
        });

        it('should filter monsoon festivals', () => {
            const monsoon = engine.filterFestivalsBySeason('monsoon');
            expect(monsoon.length).toBeGreaterThan(0);
        });

        it('should filter winter festivals', () => {
            const winter = engine.filterFestivalsBySeason('winter');
            expect(winter.length).toBeGreaterThan(0);
        });
    });

    describe('Calendar quarter filter', () => {
        it('should return all when "all"', () => {
            expect(engine.filterMonthsByQuarter('all')).toHaveLength(MONTHS.length);
        });

        it('should filter Q1 months', () => {
            const q1 = engine.filterMonthsByQuarter('Q1');
            expect(q1.length).toBe(3);
        });

        it('should filter Q2 months', () => {
            const q2 = engine.filterMonthsByQuarter('Q2');
            expect(q2.length).toBe(3);
        });

        it('should filter Q3 months', () => {
            const q3 = engine.filterMonthsByQuarter('Q3');
            expect(q3.length).toBe(3);
        });

        it('should filter Q4 months', () => {
            const q4 = engine.filterMonthsByQuarter('Q4');
            expect(q4.length).toBe(3);
        });
    });

    describe('Tradition religion filter', () => {
        it('should return all when "all"', () => {
            expect(engine.filterTraditionsByReligion('all')).toHaveLength(TRADITIONS.length);
        });

        it('should filter Hindu traditions', () => {
            const hindu = engine.filterTraditionsByReligion('Hindu');
            expect(hindu.length).toBeGreaterThan(0);
            expect(hindu.every(t => t.religion === 'Hindu')).toBe(true);
        });

        it('should filter Muslim traditions', () => {
            const muslim = engine.filterTraditionsByReligion('Muslim');
            expect(muslim.length).toBeGreaterThan(0);
        });

        it('should filter Sikh traditions', () => {
            const sikh = engine.filterTraditionsByReligion('Sikh');
            expect(sikh.length).toBeGreaterThan(0);
        });

        it('should filter Buddhist traditions', () => {
            const buddhist = engine.filterTraditionsByReligion('Buddhist');
            expect(buddhist.length).toBeGreaterThan(0);
        });
    });
});

/* ======================================================================
   FESTIVAL ENGINE — SORTING TESTS
   ====================================================================== */

describe('FestivalEngine - Sorting', () => {
    let engine;

    beforeEach(() => { engine = new FestivalEngine(); });

    it('should sort by name ascending', () => {
        const sorted = engine.sortItems(engine.getFestivals(), 'name-asc');
        for (let i = 1; i < sorted.length; i++) {
            expect(sorted[i].name.localeCompare(sorted[i - 1].name)).toBeGreaterThanOrEqual(0);
        }
    });

    it('should sort by name descending', () => {
        const sorted = engine.sortItems(engine.getFestivals(), 'name-desc');
        for (let i = 1; i < sorted.length; i++) {
            expect(sorted[i].name.localeCompare(sorted[i - 1].name)).toBeLessThanOrEqual(0);
        }
    });

    it('should sort by month', () => {
        const sorted = engine.sortItems(engine.getMonths(), 'month');
        for (let i = 1; i < sorted.length; i++) {
            expect(sorted[i].monthIndex).toBeGreaterThanOrEqual(sorted[i - 1].monthIndex);
        }
    });

    it('should sort by origin', () => {
        const sorted = engine.sortItems(engine.getFestivals(), 'origin');
        expect(sorted).toHaveLength(FESTIVALS.length);
    });

    it('should use default sort for unknown key', () => {
        const sorted = engine.sortItems(engine.getFestivals(), 'unknown');
        expect(sorted).toHaveLength(FESTIVALS.length);
    });
});

/* ======================================================================
   FESTIVAL ENGINE — COMBINED FILTER PIPELINE TESTS
   ====================================================================== */

describe('FestivalEngine - Combined Pipeline', () => {
    let engine;

    beforeEach(() => { engine = new FestivalEngine(); });

    it('should get filtered festivals with default state', () => {
        expect(engine.getFilteredFestivals()).toHaveLength(FESTIVALS.length);
    });

    it('should get filtered months with default state', () => {
        expect(engine.getFilteredMonths()).toHaveLength(MONTHS.length);
    });

    it('should get filtered traditions with default state', () => {
        expect(engine.getFilteredTraditions()).toHaveLength(TRADITIONS.length);
    });

    it('should narrow results when search is set', () => {
        engine.setSearchQuery('Diwali');
        expect(engine.getFilteredFestivals().length).toBeGreaterThanOrEqual(1);
        expect(engine.getFilteredFestivals().length).toBeLessThan(FESTIVALS.length);
    });

    it('should narrow results when season filter is set', () => {
        engine.setFestivalSeasonFilter('spring');
        const filtered = engine.getFilteredFestivals();
        expect(filtered.length).toBeLessThan(FESTIVALS.length);
    });
});

/* ======================================================================
   FESTIVAL ENGINE — ANALYTICS TESTS
   ====================================================================== */

describe('FestivalEngine - Analytics', () => {
    let engine;

    beforeEach(() => { engine = new FestivalEngine(); });

    it('should compute seasonal distribution', () => {
        const dist = engine.getSeasonalDistribution();
        expect(dist.length).toBeGreaterThan(0);
        expect(dist[0].count).toBeGreaterThanOrEqual(dist[1]?.count || 0);
    });

    it('should compute monthly festival count', () => {
        const dist = engine.getMonthlyFestivalCount();
        expect(dist.length).toBeGreaterThan(0);
        expect(dist.length).toBeLessThanOrEqual(12);
    });

    it('should compute religious breakdown', () => {
        const dist = engine.getReligiousBreakdown();
        expect(dist.length).toBeGreaterThan(0);
        expect(dist.every(d => d.count > 0)).toBe(true);
    });

    it('should compute timeline', () => {
        const timeline = engine.getTimeline();
        expect(timeline.length).toBeGreaterThan(0);
        expect(timeline[0]).toHaveProperty('year');
        expect(timeline[0]).toHaveProperty('text');
    });
});

/* ======================================================================
   FESTIVAL ENGINE — STATE MANAGEMENT TESTS
   ====================================================================== */

describe('FestivalEngine - State Management', () => {
    let engine;

    beforeEach(() => { engine = new FestivalEngine(); });

    it('should update search query', () => {
        engine.setSearchQuery('test');
        expect(engine.state.searchQuery).toBe('test');
    });

    it('should update category filter', () => {
        engine.setCategoryFilter('festival');
        expect(engine.state.categoryFilter).toBe('festival');
    });

    it('should update festival season filter', () => {
        engine.setFestivalSeasonFilter('spring');
        expect(engine.state.festivalSeasonFilter).toBe('spring');
    });

    it('should update calendar quarter filter', () => {
        engine.setCalendarQuarterFilter('Q1');
        expect(engine.state.calendarQuarterFilter).toBe('Q1');
    });

    it('should update tradition religion filter', () => {
        engine.setTraditionReligionFilter('Hindu');
        expect(engine.state.traditionReligionFilter).toBe('Hindu');
    });

    it('should update sort by', () => {
        engine.setSortBy('name-desc');
        expect(engine.state.sortBy).toBe('name-desc');
    });

    it('should reset all filters', () => {
        engine.setSearchQuery('test');
        engine.setFestivalSeasonFilter('spring');
        engine.setCalendarQuarterFilter('Q1');
        engine.setTraditionReligionFilter('Hindu');
        engine.resetFilters();
        expect(engine.state.searchQuery).toBe('');
        expect(engine.state.festivalSeasonFilter).toBe('all');
        expect(engine.state.calendarQuarterFilter).toBe('all');
        expect(engine.state.traditionReligionFilter).toBe('all');
        expect(engine.state.sortBy).toBe('name-asc');
    });
});

/* ======================================================================
   FESTIVAL ENGINE — HELPER METHOD TESTS
   ====================================================================== */

describe('FestivalEngine - Helper Methods', () => {
    let engine;

    beforeEach(() => { engine = new FestivalEngine(); });

    it('should return correct badge class for season', () => {
        expect(engine.getBadgeClass('spring')).toBe('badge-spring');
        expect(engine.getBadgeClass('summer')).toBe('badge-summer');
        expect(engine.getBadgeClass('monsoon')).toBe('badge-monsoon');
        expect(engine.getBadgeClass('winter')).toBe('badge-winter');
        expect(engine.getBadgeClass('year-round')).toBe('badge-year-round');
        expect(engine.getBadgeClass('autumn')).toBe('badge-winter');
    });

    it('should return correct badge class for religion', () => {
        expect(engine.getBadgeClass('hindu')).toBe('badge-hindu');
        expect(engine.getBadgeClass('muslim')).toBe('badge-muslim');
        expect(engine.getBadgeClass('sikh')).toBe('badge-sikh');
        expect(engine.getBadgeClass('christian')).toBe('badge-christian');
        expect(engine.getBadgeClass('buddhist')).toBe('badge-buddhist');
    });

    it('should return default badge class for unknown value', () => {
        expect(engine.getBadgeClass('unknown')).toBe('badge-hindu');
    });

    it('should return correct chart colors', () => {
        expect(engine.getChartColor(0)).toBe('saffron');
        expect(engine.getChartColor(1)).toBe('green');
        expect(engine.getChartColor(2)).toBe('gold');
        expect(engine.getChartColor(3)).toBe('blue');
        expect(engine.getChartColor(4)).toBe('saffron');
    });

    it('should return correct season dot colors', () => {
        expect(engine.getSeasonDotColor('spring')).toBe('#fb923c');
        expect(engine.getSeasonDotColor('summer')).toBe('#facc15');
        expect(engine.getSeasonDotColor('autumn')).toBe('#a78bfa');
        expect(engine.getSeasonDotColor('winter')).toBe('#38bdf8');
        expect(engine.getSeasonDotColor('year-round')).toBe('#4ade80');
        expect(engine.getSeasonDotColor('unknown')).toBe('#94a3b8');
    });

    it('should return correct religion dot colors', () => {
        expect(engine.getReligionDotColor('Hindu')).toBe('#ff9933');
        expect(engine.getReligionDotColor('Muslim')).toBe('#4ade80');
        expect(engine.getReligionDotColor('Sikh')).toBe('#fb923c');
        expect(engine.getReligionDotColor('Christian')).toBe('#38bdf8');
        expect(engine.getReligionDotColor('Buddhist')).toBe('#facc15');
        expect(engine.getReligionDotColor('unknown')).toBe('#94a3b8');
    });
});

/* ======================================================================
   RENDER FUNCTION TESTS
   ====================================================================== */

describe('Render Functions', () => {
    const sampleFestival = new Festival('TestFest', 'March', 'spring', 'North', 'Desc', ['ritual1'], ['tag1']);
    const sampleMonth = new MonthEvent('January', 1, 'Q1', ['Diwali', 'Pongal'], 'Desc');
    const sampleTradition = new CulturalTradition('TestTrad', 'Hindu', 'Pan India', 'Desc', 'Sig', ['tag1']);

    it('renderFestivalCard should return HTML with festival name', () => {
        const html = renderFestivalCard(sampleFestival);
        expect(html).toContain('TestFest');
        expect(html).toContain('spring');
        expect(html).toContain('ritual1');
    });

    it('renderMonthCard should return HTML with month name', () => {
        const html = renderMonthCard(sampleMonth);
        expect(html).toContain('January');
        expect(html).toContain('2 festivals');
        expect(html).toContain('Diwali');
    });

    it('renderTraditionCard should return HTML with tradition name', () => {
        const html = renderTraditionCard(sampleTradition);
        expect(html).toContain('TestTrad');
        expect(html).toContain('Hindu');
        expect(html).toContain('Sig');
    });

    it('renderSeasonChart should return rows HTML', () => {
        const data = [{ season: 'spring', count: 3 }, { season: 'winter', count: 2 }];
        const html = renderSeasonChart(data);
        expect(html).toContain('Spring');
        expect(html).toContain('Winter');
    });

    it('renderMonthChart should return bar chart HTML', () => {
        const data = [{ month: 'October', count: 4 }, { month: 'November', count: 3 }];
        const html = renderMonthChart(data);
        expect(html).toContain('October');
        expect(html).toContain('chart-bar-fill');
    });

    it('renderReligiousChart should return rows HTML', () => {
        const data = [{ religion: 'Hindu', count: 8 }, { religion: 'Muslim', count: 3 }];
        const html = renderReligiousChart(data);
        expect(html).toContain('Hindu');
        expect(html).toContain('Muslim');
    });

    it('renderTimeline should return timeline entries HTML', () => {
        const data = [{ year: '1920s', text: 'Test event.' }];
        const html = renderTimeline(data);
        expect(html).toContain('1920s');
        expect(html).toContain('Test event.');
    });
});

/* ======================================================================
   CONFIG OVERRIDE TESTS
   ====================================================================== */

describe('FestivalEngine - Config Overrides', () => {
    it('should accept custom datasets via config', () => {
        const customFestivals = [new Festival('Custom', 'March', 'spring', 'TN', 'D')];
        const customMonths = [new MonthEvent('January', 1, 'Q1', ['F1'], 'D')];
        const customTraditions = [new CulturalTradition('Custom', 'Hindu', 'TN', 'D', 'S')];
        const eng = new FestivalEngine({
            festivals: customFestivals,
            months: customMonths,
            traditions: customTraditions,
        });
        expect(eng.getFestivals()).toHaveLength(1);
        expect(eng.getMonths()).toHaveLength(1);
        expect(eng.getTraditions()).toHaveLength(1);
        expect(eng.getStats().festivals).toBe(1);
    });
});
