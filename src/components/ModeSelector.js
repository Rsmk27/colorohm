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
            <div class="glass-card p-6 slide-up border border-slate-700/50 bg-slate-900/80 backdrop-blur-md">
                <h2 class="text-xl font-bold text-slate-200 mb-6 font-display">Calculator Mode</h2>
                
                <div class="space-y-4">
                    <!-- Main Mode Selection -->
                    <div class="grid grid-cols-3 gap-2 md:gap-4">
                        <button 
                            data-mode="color-to-resistance" 
                            class="mode-btn active group relative flex flex-col items-center p-2 md:p-5 rounded-xl border transition-all duration-300 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary-500 overflow-hidden"
                        >
                            <div class="absolute inset-0 bg-gradient-to-br from-primary-500/0 to-primary-500/0 group-hover:from-primary-500/10 group-hover:to-primary-600/10 transition-all duration-300"></div>
                            <svg class="w-6 h-6 md:w-10 md:h-10 mb-2 md:mb-3 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v6a4 4 0 004 4h4a2 2 0 002-2V5z"></path>
                            </svg>
                            <span class="font-semibold text-xs md:text-base text-center relative z-10 leading-tight">Color to Resistance</span>
                            <span class="text-sm text-slate-400 mt-1 relative z-10 hidden md:block">Read resistor bands</span>
                        </button>
                        
                        <button 
                            data-mode="resistance-to-color" 
                            class="mode-btn group relative flex flex-col items-center p-2 md:p-5 rounded-xl border transition-all duration-300 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary-500 overflow-hidden"
                        >
                            <div class="absolute inset-0 bg-gradient-to-br from-primary-500/0 to-primary-500/0 group-hover:from-primary-500/10 group-hover:to-primary-600/10 transition-all duration-300"></div>
                            <svg class="w-6 h-6 md:w-10 md:h-10 mb-2 md:mb-3 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                            </svg>
                            <span class="font-semibold text-xs md:text-base text-center relative z-10 leading-tight">Resistance to Color</span>
                            <span class="text-sm text-slate-400 mt-1 relative z-10 hidden md:block">Find color bands</span>
                        </button>
                        
                        <button 
                            data-mode="smd-calculator" 
                            class="mode-btn group relative flex flex-col items-center p-2 md:p-5 rounded-xl border transition-all duration-300 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary-500 overflow-hidden"
                        >
                            <div class="absolute inset-0 bg-gradient-to-br from-primary-500/0 to-primary-500/0 group-hover:from-primary-500/10 group-hover:to-primary-600/10 transition-all duration-300"></div>
                            <svg class="w-6 h-6 md:w-10 md:h-10 mb-2 md:mb-3 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"></path>
                            </svg>
                            <span class="font-semibold text-xs md:text-base text-center relative z-10 leading-tight">SMD Calculator</span>
                            <span class="text-sm text-slate-400 mt-1 relative z-10 hidden md:block">Surface mount codes</span>
                        </button>
                    </div>
                    
                    <!-- Band Count Selection (for through-hole resistors) -->
                    <div id="band-count-selector" class="border-t border-slate-700/50 pt-4">
                        <label class="block text-sm font-semibold text-slate-300 mb-3">Resistor Type:</label>
                        <div class="flex flex-wrap gap-3">
                            <button data-bands="3" class="band-btn btn-primary px-5 py-2.5 rounded-lg font-semibold text-sm transition-all duration-300">
                                3-Band
                            </button>
                            <button data-bands="4" class="band-btn active btn-primary px-5 py-2.5 rounded-lg font-semibold text-sm transition-all duration-300">
                                4-Band
                            </button>
                            <button data-bands="5" class="band-btn btn-primary px-5 py-2.5 rounded-lg font-semibold text-sm transition-all duration-300">
                                5-Band
                            </button>
                            <button data-bands="6" class="band-btn btn-primary px-5 py-2.5 rounded-lg font-semibold text-sm transition-all duration-300">
                                6-Band
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        this.updateButtonStyles();
    }

    bindEvents() {
        // Mode selection
        this.container.querySelectorAll('.mode-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const mode = e.currentTarget.dataset.mode;
                this.setMode(mode);
            });
        });

        // Band count selection
        this.container.querySelectorAll('.band-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const bandCount = parseInt(e.currentTarget.dataset.bands);
                this.setBandCount(bandCount);
            });
        });
    }

    setMode(mode) {
        this.currentMode = mode;
        this.updateButtonStyles();

        // Show/hide band count selector based on mode
        const bandCountSelector = this.container.querySelector('#band-count-selector');
        if (mode === 'smd-calculator') {
            bandCountSelector.style.display = 'none';
        } else {
            bandCountSelector.style.display = 'block';
        }

        this.onModeChange(mode, this.currentBandCount);
    }

    setBandCount(bandCount) {
        this.currentBandCount = bandCount;
        this.updateButtonStyles();
        this.onModeChange(this.currentMode, bandCount);
    }

    updateButtonStyles() {
        // Update mode buttons
        this.container.querySelectorAll('.mode-btn').forEach(btn => {
            const isActive = btn.dataset.mode === this.currentMode;
            btn.classList.toggle('active', isActive);

            if (isActive) {
                btn.classList.add('bg-slate-800', 'border-primary-500', 'text-primary-400', 'shadow-lg', 'shadow-primary-500/10');
                btn.classList.remove('border-slate-700', 'text-slate-400', 'hover:border-slate-600');
            } else {
                btn.classList.remove('bg-slate-800', 'border-primary-500', 'text-primary-400', 'shadow-lg', 'shadow-primary-500/10');
                btn.classList.add('border-slate-700', 'text-slate-400', 'hover:border-slate-600');
            }
        });

        // Update band count buttons
        this.container.querySelectorAll('.band-btn').forEach(btn => {
            const isActive = parseInt(btn.dataset.bands) === this.currentBandCount;
            btn.classList.toggle('active', isActive);

            if (isActive) {
                btn.classList.add('bg-gradient-to-r', 'from-primary-500', 'to-primary-600', 'text-white', 'shadow-lg', 'shadow-primary-500/20');
                btn.classList.remove('bg-slate-800', 'text-slate-300', 'border', 'border-slate-700');
            } else {
                btn.classList.remove('bg-gradient-to-r', 'from-primary-500', 'to-primary-600', 'text-white', 'shadow-lg', 'shadow-primary-500/20');
                btn.classList.add('bg-slate-800', 'text-slate-300', 'border', 'border-slate-700', 'hover:bg-slate-700');
            }
        });
    }
}