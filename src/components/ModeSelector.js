export class ModeSelector {
    constructor(container, onModeChange) {
        this.container = container;
        this.onModeChange = onModeChange;
        this.currentMode = 'color-to-resistance';
        this.currentBandCount = 4;
    }

    init() {
        this.render();
        this.bindEvents();
    }

    render() {
        this.container.innerHTML = `
            <div class="card-glass slide-up" style="margin-bottom: 2rem;">
                <h2 style="font-size: 1.25rem; font-weight: 700; color: var(--color-text-main); margin-bottom: 1.5rem;">Calculator Mode</h2>
                
                <div class="mode-selector">
                    <button data-mode="color-to-resistance" class="mode-btn">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v6a4 4 0 004 4h4a2 2 0 002-2V5z"></path>
                        </svg>
                        <span style="font-weight: 600;">Color to Resistance</span>
                        <span style="font-size: 0.8rem; color: var(--color-text-secondary);">Read Bands</span>
                    </button>
                    
                    <button data-mode="resistance-to-color" class="mode-btn">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                        </svg>
                        <span style="font-weight: 600;">Resistance to Color</span>
                        <span style="font-size: 0.8rem; color: var(--color-text-secondary);">Find Colors</span>
                    </button>
                    
                    <button data-mode="smd-calculator" class="mode-btn">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"></path>
                        </svg>
                        <span style="font-weight: 600;">SMD Calculator</span>
                        <span style="font-size: 0.8rem; color: var(--color-text-secondary);">Surface Mount</span>
                    </button>
                </div>

                <div id="band-count-selector" style="border-top: 1px solid var(--color-border); padding-top: 1rem;">
                    <label class="control-label">Resistor Type:</label>
                    <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
                        <button data-bands="3" class="band-btn btn-secondary">3-Band</button>
                        <button data-bands="4" class="band-btn btn-secondary">4-Band</button>
                        <button data-bands="5" class="band-btn btn-secondary">5-Band</button>
                        <button data-bands="6" class="band-btn btn-secondary">6-Band</button>
                    </div>
                </div>
            </div>
            
            <style>
                .band-btn {
                    background: var(--color-bg-main);
                    border: 1px solid var(--color-border);
                    color: var(--color-text-secondary);
                    padding: 8px 16px;
                    border-radius: 4px;
                    cursor: pointer;
                    font-size: 0.9rem;
                    transition: all 0.2s;
                }
                .band-btn:hover {
                    border-color: var(--color-primary);
                    color: var(--color-text-main);
                }
                .band-btn.active {
                    background: var(--color-primary);
                    color: #000;
                    border-color: var(--color-primary);
                    font-weight: 600;
                    box-shadow: 0 0 10px rgba(0, 212, 255, 0.3);
                }
            </style>
        `;

        this.updateButtonStyles();
    }

    bindEvents() {
        // Mode buttons
        this.container.querySelectorAll('.mode-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                // Use currentTarget to ensure we get the button element, not a child
                const mode = e.currentTarget.dataset.mode;
                if (mode) {
                    this.currentMode = mode;

                    // Show/Hide band selector based on mode
                    const bandSelector = this.container.querySelector('#band-count-selector');
                    if (bandSelector) {
                        if (mode === 'smd-calculator') {
                            bandSelector.classList.add('hidden');
                        } else {
                            bandSelector.classList.remove('hidden');
                        }
                    }

                    this.updateButtonStyles();
                    this.onModeChange(this.currentMode, this.currentBandCount);
                }
            });
        });

        // Band count buttons
        this.container.querySelectorAll('.band-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const bands = parseInt(e.target.dataset.bands);
                if (bands) {
                    this.currentBandCount = bands;
                    this.updateButtonStyles();
                    this.onModeChange(this.currentMode, this.currentBandCount);
                }
            });
        });
    }

    updateButtonStyles() {
        // Update mode buttons
        this.container.querySelectorAll('.mode-btn').forEach(btn => {
            const isActive = btn.dataset.mode === this.currentMode;
            btn.classList.toggle('active', isActive);
        });

        // Update band count buttons
        this.container.querySelectorAll('.band-btn').forEach(btn => {
            const isActive = parseInt(btn.dataset.bands) === this.currentBandCount;
            btn.classList.toggle('active', isActive);
        });
    }
}