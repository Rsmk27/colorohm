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
            <div class="bg-white rounded-2xl shadow-lg p-6">
                <h2 class="text-xl font-semibold text-gray-800 mb-6">Calculator Mode</h2>
                
                <div class="space-y-4">
                    <!-- Main Mode Selection -->
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <button 
                            data-mode="color-to-resistance" 
                            class="mode-btn active flex flex-col items-center p-4 rounded-xl border-2 transition-all duration-200 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                        >
                            <svg class="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v6a4 4 0 004 4h4a2 2 0 002-2V5z"></path>
                            </svg>
                            <span class="font-medium">Color to Resistance</span>
                            <span class="text-sm text-gray-500 mt-1">Read resistor bands</span>
                        </button>
                        
                        <button 
                            data-mode="resistance-to-color" 
                            class="mode-btn flex flex-col items-center p-4 rounded-xl border-2 transition-all duration-200 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                        >
                            <svg class="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                            </svg>
                            <span class="font-medium">Resistance to Color</span>
                            <span class="text-sm text-gray-500 mt-1">Find color bands</span>
                        </button>
                        
                        <button 
                            data-mode="smd-calculator" 
                            class="mode-btn flex flex-col items-center p-4 rounded-xl border-2 transition-all duration-200 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                        >
                            <svg class="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"></path>
                            </svg>
                            <span class="font-medium">SMD Calculator</span>
                            <span class="text-sm text-gray-500 mt-1">Surface mount codes</span>
                        </button>
                    </div>
                    
                    <!-- Band Count Selection (for through-hole resistors) -->
                    <div id="band-count-selector" class="border-t pt-4">
                        <label class="block text-sm font-medium text-gray-700 mb-3">Resistor Type:</label>
                        <div class="flex flex-wrap gap-2">
                            <button data-bands="3" class="band-btn px-4 py-2 rounded-lg border transition-all duration-200 hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500">
                                3-Band
                            </button>
                            <button data-bands="4" class="band-btn active px-4 py-2 rounded-lg border transition-all duration-200 hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500">
                                4-Band
                            </button>
                            <button data-bands="5" class="band-btn px-4 py-2 rounded-lg border transition-all duration-200 hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500">
                                5-Band
                            </button>
                            <button data-bands="6" class="band-btn px-4 py-2 rounded-lg border transition-all duration-200 hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500">
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
                btn.classList.add('bg-primary-50', 'border-primary-500', 'text-primary-700');
                btn.classList.remove('border-gray-200', 'text-gray-600');
            } else {
                btn.classList.remove('bg-primary-50', 'border-primary-500', 'text-primary-700');
                btn.classList.add('border-gray-200', 'text-gray-600');
            }
        });

        // Update band count buttons
        this.container.querySelectorAll('.band-btn').forEach(btn => {
            const isActive = parseInt(btn.dataset.bands) === this.currentBandCount;
            btn.classList.toggle('active', isActive);
            
            if (isActive) {
                btn.classList.add('bg-primary-500', 'text-white', 'border-primary-500');
                btn.classList.remove('bg-white', 'text-gray-700', 'border-gray-300');
            } else {
                btn.classList.remove('bg-primary-500', 'text-white', 'border-primary-500');
                btn.classList.add('bg-white', 'text-gray-700', 'border-gray-300');
            }
        });
    }
}