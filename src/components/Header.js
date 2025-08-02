export class Header {
    constructor(container) {
        this.container = container;
    }

    init() {
        this.render();
    }

    render() {
        this.container.innerHTML = `
            <header class="bg-white shadow-sm border-b border-gray-200">
                <div class="container mx-auto px-4 py-6">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center space-x-4">
                            <div class="flex items-center space-x-3">
                                <div class="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
                                    <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                                    </svg>
                                </div>
                                <div>
                                    <h1 class="text-2xl font-bold text-gray-800">ColorOhm</h1>
                                    <p class="text-sm text-gray-600">Professional Resistor Calculator</p>
                                </div>
                            </div>
                        </div>
                        
                        <div class="hidden md:flex items-center space-x-6">
                            <div class="text-sm text-gray-600">
                                <span class="font-medium">Keyboard Shortcuts:</span>
                                <span class="ml-2">Ctrl+1 (Color→Resistance) • Ctrl+2 (Resistance→Color) • Ctrl+3 (SMD)</span>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        `;
    }
}