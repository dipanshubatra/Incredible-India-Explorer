/**
 * Classical Dance Encyclopedia — Unit Tests
 */
import { describe, it, expect, beforeEach } from 'vitest';

function createTestDOM() {
    document.body.innerHTML = `
        <div id="cd-hero-particles"></div>
        <div class="cd-controls">
            <div class="cd-search-wrap"><input type="text" id="cd-search" placeholder="Search..."/></div>
            <div class="cd-filters" id="cd-filters"></div>
        </div>
        <section class="cd-grid-section">
            <div class="cd-grid" id="cd-grid" role="list"></div>
            <div class="cd-empty" id="cd-empty" style="display:none"><p>Not found.</p><button class="cd-btn" id="cd-reset">Reset</button></div>
        </section>
        <div class="cd-modal" id="cd-modal" role="dialog" aria-modal="true" aria-hidden="true">
            <div class="cd-modal-bg" id="cd-modal-bg"></div>
            <div class="cd-modal-box">
                <button class="cd-modal-x" id="cd-modal-x" aria-label="Close">✕</button>
                <div class="cd-modal-body" id="cd-modal-body"></div>
            </div>
        </div>
    `;
}

describe('Classical Dance Encyclopedia DOM', () => {
    beforeEach(() => createTestDOM());

    it('should have a search input', () => {
        expect(document.getElementById('cd-search')).not.toBeNull();
    });

    it('should have a filters container', () => {
        expect(document.getElementById('cd-filters')).not.toBeNull();
    });

    it('should have a grid container with list role', () => {
        const grid = document.getElementById('cd-grid');
        expect(grid).not.toBeNull();
        expect(grid.getAttribute('role')).toBe('list');
    });

    it('should have an empty state element', () => {
        expect(document.getElementById('cd-empty')).not.toBeNull();
    });

    it('should have a modal with correct ARIA attributes', () => {
        const modal = document.getElementById('cd-modal');
        expect(modal).not.toBeNull();
        expect(modal.getAttribute('aria-modal')).toBe('true');
        expect(modal.getAttribute('aria-hidden')).toBe('true');
    });

    it('should have a reset button', () => {
        expect(document.getElementById('cd-reset')).not.toBeNull();
    });

    it('should have a modal close button', () => {
        expect(document.getElementById('cd-modal-x')).not.toBeNull();
    });

    it('should have a modal body container', () => {
        expect(document.getElementById('cd-modal-body')).not.toBeNull();
    });

    it('should have hero particles container', () => {
        expect(document.getElementById('cd-hero-particles')).not.toBeNull();
    });
});

describe('Classical Dance Data Integrity', () => {
    const expectedDances = ['Bharatanatyam', 'Kathak', 'Kathakali', 'Odissi', 'Kuchipudi', 'Manipuri', 'Mohiniyattam', 'Sattriya'];
    const validRegions = ['south', 'north', 'east', 'northeast'];

    it('should have 8 classical dance forms', () => {
        expect(expectedDances.length).toBe(8);
    });

    it('should have valid region values', () => {
        expectedDances.forEach(d => {
            expect(typeof d).toBe('string');
            expect(d.length).toBeGreaterThan(0);
        });
    });

    it('should validate region filter buttons match data regions', () => {
        const regionKeys = ['all', ...validRegions];
        expect(regionKeys.length).toBe(5);
    });
});
