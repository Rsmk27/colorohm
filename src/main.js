import { App } from './components/App.js';
import { ResistorCalculator } from './utils/ResistorCalculator.js';

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    const appContainer = document.getElementById('app');
    const calculator = new ResistorCalculator();
    const app = new App(appContainer, calculator);
    
    // Initialize the app
    app.init();
    
    // Add global error handling
    window.addEventListener('error', (event) => {
        console.error('Global error:', event.error);
        // Could add error reporting here
    });
    
    // Add performance monitoring
    if ('performance' in window) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                const perfData = performance.getEntriesByType('navigation')[0];
                console.log('Page load time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
            }, 0);
        });
    }
});