/**
 * SHOPEE AFFILIATE LANDING PAGE - JavaScript
 * 
 * This file contains the single configuration object and all rendering logic.
 * To customize the page, edit ONLY the CONFIG object below.
 * No HTML changes required.
 */

// ============================================
// CONFIGURATION OBJECT
// Edit this section to customize your page
// ============================================
const CONFIG = {
    /**
     * Page Settings
     * Controls header, hero section, and meta information
     */
    page: {
        title: "Promo Spesial Hari Ini",       // Header title
        subtitle: "Diskon hingga 90% + Gratis Ongkir",  // Header subtitle
        showHeader: true,                          // Show/hide header
        showHero: true,                            // Show/hide hero banner
        heroImage: "https://i.imgur.com/ye0B0xb.jpeg", // Hero banner URL
        heroAlt: "Promo Banner",                   // Hero image alt text
        heroLink: ""                               // Optional: make hero clickable (leave empty to disable)
    },

    /**
     * Layout Settings
     * Controls the product grid appearance
     */
    layout: {
        mobileColumns: 2,      // Columns on mobile (default: 2)
        desktopColumns: 4,     // Columns on desktop (default: 4)
        gap: 12                // Gap between cards in pixels
    },

    /**
     * Products Array
     * Add, remove, or reorder products here
     * Each product must have: id, image, affiliate_url
     * Title is optional
     */
    products: [
        {
            id: 1,
            title: "Jaket putih stylish, nyaman dipakai ✨",
            image: "https://i.imgur.com/etzHlUw.jpeg",
            affiliate_url: "https://s.shopee.co.id/806qtKhJBA"
        },
        {
            id: 2,
            title: "Sepatu hitam glossy, manis dipakai 💖",
            image: "https://i.imgur.com/t7sVDmx.jpeg",
            affiliate_url: "https://s.shopee.co.id/7VAaIY6NWv"
        },
        {
            id: 3,
            title: "Tas hitam elegan, muat banyak 🖤",
            image: "https://i.imgur.com/N0WFEOa.jpeg",
            affiliate_url: "https://s.shopee.co.id/50TFKDmxgO"
        },
        {
            id: 4,
            title: "Jam tangan silver elegan, classy ⌚✨",
            image: "https://i.imgur.com/gNhqv3b.jpeg",
            affiliate_url: "https://s.shopee.co.id/6VI377c2CK"
        },
        {
            id: 5,
            title: "Atasan coklat elegan, jatuh cantik 🤎",
            image: "https://i.imgur.com/chsPoMv.jpeg",
            affiliate_url: "https://s.shopee.co.id/4LDYXLgTXV"
        },
        {
            id: 6,
            title: "Celana coklat high waist, sleek 🤎",
            image: "https://i.imgur.com/2zgCUDc.jpeg",
            affiliate_url: "https://s.shopee.co.id/4LDYXLgTXV"
        }
    ]
};

// ============================================
// APPLICATION LOGIC (Do not edit below)
// ============================================

/**
 * Main Application Class
 * Handles all rendering and interaction logic
 */
class AffiliateApp {
    constructor(config) {
        this.config = config;
        this.init();
    }

    /**
     * Initialize the application
     */
    init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.render());
        } else {
            this.render();
        }
    }

    /**
     * Main render function
     */
    render() {
        this.applyLayoutConfig();
        this.renderHeader();
        this.renderHero();
        this.renderProducts();
        this.setupLazyLoading();
    }

    /**
     * Apply layout configuration to CSS custom properties
     */
    applyLayoutConfig() {
        const root = document.documentElement;
        const { layout } = this.config;

        root.style.setProperty('--mobile-columns', layout.mobileColumns);
        root.style.setProperty('--desktop-columns', layout.desktopColumns);
        root.style.setProperty('--grid-gap', `${layout.gap}px`);
    }

    /**
     * Render the header section
     */
    renderHeader() {
        const header = document.getElementById('header');
        const { page } = this.config;

        if (!page.showHeader) {
            header.hidden = true;
            return;
        }

        header.innerHTML = `
            <h1 class="header__title">${this.escapeHtml(page.title)}</h1>
            ${page.subtitle ? `<p class="header__subtitle">${this.escapeHtml(page.subtitle)}</p>` : ''}
        `;
    }

    /**
     * Render the hero section
     */
    renderHero() {
        const hero = document.getElementById('hero');
        const { page } = this.config;

        if (!page.showHero || !page.heroImage) {
            hero.hidden = true;
            return;
        }

        const heroContent = `
            <img 
                src="${this.escapeHtml(page.heroImage)}" 
                alt="${this.escapeHtml(page.heroAlt || 'Banner')}"
                class="hero__image"
                loading="eager"
                fetchpriority="high"
            >
        `;

        // Wrap in link if heroLink is provided
        if (page.heroLink) {
            hero.innerHTML = `
                <a href="${this.escapeHtml(page.heroLink)}" 
                   target="_blank" 
                   rel="noopener noreferrer">
                    ${heroContent}
                </a>
            `;
        } else {
            hero.innerHTML = heroContent;
        }
    }

    /**
     * Render all product cards
     */
    renderProducts() {
        const grid = document.getElementById('product-grid');
        const { products } = this.config;

        if (!products || products.length === 0) {
            grid.innerHTML = '<p style="text-align:center;padding:40px;">Tidak ada produk</p>';
            return;
        }

        grid.innerHTML = products.map(product => this.createProductCard(product)).join('');

        // Add click handlers
        this.setupClickHandlers();
    }

    /**
     * Create a single product card HTML
     */
    createProductCard(product) {
        const hasTitle = product.title && product.title.trim() !== '';

        return `
            <a href="${this.escapeHtml(product.affiliate_url)}" 
               class="product-card" 
               data-product-id="${product.id}"
               target="_blank"
               rel="noopener noreferrer sponsored"
               aria-label="${hasTitle ? this.escapeHtml(product.title) : 'Product ' + product.id}">
                <div class="product-card__image-wrapper">
                    <img 
                        class="product-card__image skeleton"
                        data-src="${this.escapeHtml(product.image)}"
                        alt="${hasTitle ? this.escapeHtml(product.title) : ''}"
                        loading="lazy"
                    >
                </div>
                ${hasTitle ? `
                    <div class="product-card__content">
                        <h2 class="product-card__title">${this.escapeHtml(product.title)}</h2>
                    </div>
                ` : ''}
            </a>
        `;
    }

    /**
     * Setup click event handlers for tracking (optional)
     */
    setupClickHandlers() {
        const cards = document.querySelectorAll('.product-card');

        cards.forEach(card => {
            card.addEventListener('click', (e) => {
                const productId = card.dataset.productId;

                // Optional: Add analytics tracking here
                // Example: gtag('event', 'click', { product_id: productId });

                // Log for debugging (remove in production)
                console.log(`Product clicked: ${productId}`);
            });
        });
    }

    /**
     * Setup lazy loading for product images
     * Uses Intersection Observer for performance
     */
    setupLazyLoading() {
        const images = document.querySelectorAll('.product-card__image[data-src]');

        // Check for Intersection Observer support
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries, obs) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        this.loadImage(img);
                        obs.unobserve(img);
                    }
                });
            }, {
                rootMargin: '100px 0px', // Load images 100px before they enter viewport
                threshold: 0.01
            });

            images.forEach(img => observer.observe(img));
        } else {
            // Fallback: load all images immediately
            images.forEach(img => this.loadImage(img));
        }
    }

    /**
     * Load a single image
     */
    loadImage(img) {
        const src = img.dataset.src;
        if (!src) return;

        // Create new image to preload
        const newImg = new Image();
        newImg.onload = () => {
            img.src = src;
            img.classList.remove('skeleton');
            img.classList.add('loaded');
            img.removeAttribute('data-src');
        };
        newImg.onerror = () => {
            // Fallback placeholder on error
            img.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect fill="%23f0f0f0" width="100" height="100"/><text x="50%" y="50%" text-anchor="middle" fill="%23999" font-size="12">No Image</text></svg>';
            img.classList.remove('skeleton');
            img.classList.add('loaded');
        };
        newImg.src = src;
    }

    /**
     * Escape HTML to prevent XSS
     */
    escapeHtml(str) {
        if (!str) return '';
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }
}

// ============================================
// INITIALIZE APPLICATION
// ============================================
const app = new AffiliateApp(CONFIG);

// ============================================
// UTILITY: Performance Monitoring (Optional)
// ============================================
if (window.performance) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const timing = performance.timing;
            const loadTime = timing.loadEventEnd - timing.navigationStart;
            console.log(`Page load time: ${loadTime}ms`);

            // Warn if load time exceeds target
            if (loadTime > 2000) {
                console.warn('⚠️ Page load time exceeds 2 second target');
            }
        }, 0);
    });
}
