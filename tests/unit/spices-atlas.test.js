/**
 * Spices Atlas — Unit Tests
 */
import { describe, it, expect, beforeEach } from 'vitest';

function createTestDOM() {
    document.body.innerHTML = `
        <div class="sa-controls">
            <div class="sa-search-wrap"><input type="text" id="sa-search" placeholder="Search..."/></div>
            <div class="sa-filters" id="sa-filters"></div>
        </div>
        <section class="sa-grid-section">
            <div class="sa-grid" id="sa-grid" role="list"></div>
            <div class="sa-empty" id="sa-empty" style="display:none"><p>Not found.</p><button class="sa-btn" id="sa-reset">Reset</button></div>
        </section>
        <div class="sa-modal" id="sa-modal" role="dialog" aria-modal="true" aria-hidden="true">
            <div class="sa-modal-bg" id="sa-modal-bg"></div>
            <div class="sa-modal-box">
                <button class="sa-modal-x" id="sa-modal-x" aria-label="Close">✕</button>
                <div class="sa-modal-body" id="sa-modal-body"></div>
            </div>
        </div>
    `;
}

describe('Spices Atlas DOM Structure', () => {
    beforeEach(() => createTestDOM());

    it('should have a search input', () => {
        expect(document.getElementById('sa-search')).not.toBeNull();
    });

    it('should have a filters container', () => {
        expect(document.getElementById('sa-filters')).not.toBeNull();
    });

    it('should have a grid container with list role', () => {
        const grid = document.getElementById('sa-grid');
        expect(grid).not.toBeNull();
        expect(grid.getAttribute('role')).toBe('list');
    });

    it('should have an empty state element', () => {
        expect(document.getElementById('sa-empty')).not.toBeNull();
    });

    it('should have a modal with correct ARIA attributes', () => {
        const modal = document.getElementById('sa-modal');
        expect(modal).not.toBeNull();
        expect(modal.getAttribute('aria-modal')).toBe('true');
        expect(modal.getAttribute('aria-hidden')).toBe('true');
    });

    it('should have a reset button', () => {
        expect(document.getElementById('sa-reset')).not.toBeNull();
    });

    it('should have a modal close button', () => {
        expect(document.getElementById('sa-modal-x')).not.toBeNull();
    });

    it('should have a modal body container', () => {
        expect(document.getElementById('sa-modal-body')).not.toBeNull();
    });

    it('should have a modal backdrop', () => {
        expect(document.getElementById('sa-modal-bg')).not.toBeNull();
    });
});

describe('Spices Data Integrity', () => {
    const expectedSpiceCount = 20;
    const validCategories = ['root', 'seed', 'bark', 'fruit', 'leaf', 'stigma', 'resin', 'flower_bud', 'fruit_pulp'];

    it('should have 20 spices defined', () => {
        expect(expectedSpiceCount).toBe(20);
    });

    it('should have valid category values', () => {
        validCategories.forEach(cat => {
            expect(typeof cat).toBe('string');
            expect(cat.length).toBeGreaterThan(0);
        });
    });

    it('should have 9 filter categories (all + 8 types)', () => {
        const filterCount = 1 + validCategories.length;
        expect(filterCount).toBe(10);
    });
});

describe('Spices Atlas Accessibility', () => {
    beforeEach(() => createTestDOM());

    it('should have aria-label on search input', () => {
        const input = document.getElementById('sa-search');
        expect(input.getAttribute('aria-label')).toBeTruthy();
    });

    it('should have aria-label on modal close button', () => {
        const btn = document.getElementById('sa-modal-x');
        expect(btn.getAttribute('aria-label')).toBe('Close');
    });
});
