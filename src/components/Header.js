export class Header {
    constructor(container) {
        this.container = container;
    }

    init() {
        this.render();
    }

    render() {
        this.container.innerHTML = `
            <header class="glass-card sticky top-0 z-50 border-b border-slate-700/50 mb-8 slide-down bg-slate-900/80 backdrop-blur-md">
                <div class="container mx-auto px-4 py-4">
                    <div class="flex items-center justify-between">
                        <!-- Logo and Title -->
                        <div class="flex items-center space-x-4">
                            <div class="flex items-center space-x-3">
                                <!-- Logo Placeholder - Circular with Resistor Icon -->
                                <div class="logo-container relative">
                                    <div class="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-700 rounded-full flex items-center justify-center shadow-lg shadow-primary-500/30 glow-effect">
                                        <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                                        </svg>
                                    </div>
                                    <!-- Pulse Ring Animation -->
                                    <div class="absolute inset-0 rounded-full bg-primary-500/20 animate-ping"></div>
                                </div>
                                <div>
                                    <h1 class="text-2xl md:text-3xl font-bold font-display bg-gradient-to-r from-primary-400 to-primary-200 bg-clip-text text-transparent">
                                        ColorOhm
                                    </h1>
                                    <p class="text-sm text-slate-400 font-medium">Professional Resistor Calculator</p>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Right Side Controls -->
                        <div class="flex items-center space-x-4">
                            <!-- Keyboard Shortcuts Info (Hidden on mobile) -->
                            <div class="hidden lg:flex items-center space-x-2 text-sm text-slate-400 bg-slate-800/50 px-4 py-2 rounded-lg backdrop-blur-sm border border-slate-700/50">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"></path>
                                </svg>
                                <span class="font-medium">Shortcuts:</span>
                                <span class="hidden xl:inline font-mono text-xs ml-1">Ctrl+1 • Ctrl+2 • Ctrl+3</span>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        `;
    }
}