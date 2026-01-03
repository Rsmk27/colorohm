export class Footer {
    constructor(container) {
        this.container = container;
    }

    init() {
        this.render();
    }

    render() {
        this.container.innerHTML = `
            <footer class="glass-card mt-16 border-t border-slate-700/50 bg-slate-900/80 backdrop-blur-md">
                <div class="container mx-auto px-4 py-8">
                    <div class="grid md:grid-cols-3 gap-8">
                        <div class="space-y-4">
                            <div class="flex items-center space-x-3">
                                <div class="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-full flex items-center justify-center glow-effect shadow-lg shadow-primary-500/20 overflow-hidden">
                                    <img src="/favicon.png" alt="ColorOhm Logo" class="w-full h-full object-cover" />
                                </div>
                                <h3 class="text-xl font-bold font-display bg-gradient-to-r from-primary-400 to-primary-200 bg-clip-text text-transparent">ColorOhm</h3>
                            </div>
                            <p class="text-slate-400 text-sm leading-relaxed">
                                Professional resistor color code calculator for electronics enthusiasts, 
                                students, and engineers. Supporting 3, 4, 5, and 6-band resistors plus SMD codes.
                            </p>
                        </div>
                        
                        <div>
                            <h4 class="font-semibold text-slate-200 mb-4 flex items-center gap-2">
                                <svg class="w-5 h-5 text-primary-500" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path>
                                    <path fill-rule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                                </svg>
                                Features
                            </h4>
                            <ul class="space-y-2.5 text-sm text-slate-400">
                                <li class="flex items-start gap-2">
                                    <svg class="w-4 h-4 text-accent-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                                    </svg>
                                    Color code to resistance conversion
                                </li>
                                <li class="flex items-start gap-2">
                                    <svg class="w-4 h-4 text-accent-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                                    </svg>
                                    Resistance to color code prediction
                                </li>
                                <li class="flex items-start gap-2">
                                    <svg class="w-4 h-4 text-accent-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                                    </svg>
                                    SMD resistor code calculator
                                </li>
                                <li class="flex items-start gap-2">
                                    <svg class="w-4 h-4 text-accent-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                                    </svg>
                                    3, 4, 5, and 6-band support
                                </li>
                                <li class="flex items-start gap-2">
                                    <svg class="w-4 h-4 text-accent-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                                    </svg>
                                    Interactive visual resistor display
                                </li>
                                <li class="flex items-start gap-2">
                                    <svg class="w-4 h-4 text-accent-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                                    </svg>
                                    Mobile-responsive design
                                </li>
                            </ul>
                        </div>
                        
                        <div>
                            <h4 class="font-semibold text-slate-200 mb-4 flex items-center gap-2">
                                <svg class="w-5 h-5 text-primary-500" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path>
                                </svg>
                                About
                            </h4>
                            <p class="text-sm text-slate-400 mb-4 leading-relaxed">
                                Created by RSMK to provide accurate and easy-to-use resistor calculations 
                                for the electronics community.
                            </p>
                            <div class="space-y-3">
                                <a href="https://rsmk.me" target="_blank" rel="noopener noreferrer" 
                                   class="inline-block transition-transform hover:scale-110">
                                    <img src="/rsmk_logo.png" alt="RSMK Logo" class="h-10 w-auto" />
                                </a>
                                <p class="text-sm text-slate-500">
                                    &copy; 2025 RSMK. All rights reserved.
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="border-t border-slate-800 mt-8 pt-6 text-center">
                        <p class="text-sm text-slate-500 flex items-center justify-center gap-2">
                            <svg class="w-4 h-4 text-accent-400" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                            </svg>
                            Built with modern web technologies for optimal performance and accessibility.
                        </p>
                    </div>
                </div>
            </footer>
        `;
    }
}