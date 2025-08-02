export class Footer {
    constructor(container) {
        this.container = container;
    }

    init() {
        this.render();
    }

    render() {
        this.container.innerHTML = `
            <footer class="bg-white border-t border-gray-200 mt-16">
                <div class="container mx-auto px-4 py-8">
                    <div class="grid md:grid-cols-3 gap-8">
                        <div>
                            <div class="flex items-center space-x-3 mb-4">
                                <div class="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
                                    <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                                    </svg>
                                </div>
                                <h3 class="text-lg font-bold text-gray-800">ColorOhm</h3>
                            </div>
                            <p class="text-gray-600 text-sm">
                                Professional resistor color code calculator for electronics enthusiasts, 
                                students, and engineers. Supporting 3, 4, 5, and 6-band resistors plus SMD codes.
                            </p>
                        </div>
                        
                        <div>
                            <h4 class="font-semibold text-gray-800 mb-4">Features</h4>
                            <ul class="space-y-2 text-sm text-gray-600">
                                <li>• Color code to resistance conversion</li>
                                <li>• Resistance to color code prediction</li>
                                <li>• SMD resistor code calculator</li>
                                <li>• 3, 4, 5, and 6-band support</li>
                                <li>• Interactive visual resistor display</li>
                                <li>• Mobile-responsive design</li>
                            </ul>
                        </div>
                        
                        <div>
                            <h4 class="font-semibold text-gray-800 mb-4">About</h4>
                            <p class="text-sm text-gray-600 mb-4">
                                Created by RSMK to provide accurate and easy-to-use resistor calculations 
                                for the electronics community.
                            </p>
                            <div class="space-y-2">
                                <p class="text-sm text-gray-500">
                                    Contact: <a href="mailto:srinivasmanikantarajapantula@gmail.com" 
                                              class="text-primary-600 hover:text-primary-700 hover:underline">
                                        srinivasmanikantarajapantula@gmail.com
                                    </a>
                                </p>
                                <p class="text-sm text-gray-500">
                                    &copy; 2025 RSMK. All rights reserved.
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="border-t border-gray-200 mt-8 pt-6 text-center">
                        <p class="text-sm text-gray-500">
                            Built with modern web technologies for optimal performance and accessibility.
                        </p>
                    </div>
                </div>
            </footer>
        `;
    }
}