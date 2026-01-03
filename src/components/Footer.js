export class Footer {
    constructor(container) {
        this.container = container;
    }

    init() {
        this.render();
    }

    render() {
        this.container.innerHTML = `
            <footer style="margin-top: 4rem; border-top: 1px solid var(--color-border); background: linear-gradient(to bottom, transparent, rgba(0,0,0,0.5)); padding: 3rem 0;">
                <div style="max-width: 1200px; margin: 0 auto; padding: 0 1.5rem;">
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 2rem;">
                        <div style="display: flex; flex-direction: column; gap: 1rem;">
                            <div style="display: flex; align-items: center; gap: 0.75rem;">
                                <div style="width: 40px; height: 40px; border-radius: 50%; background: rgba(0, 212, 255, 0.1); display: flex; align-items: center; justify-content: center; overflow: hidden; border: 1px solid rgba(0, 212, 255, 0.2);">
                                    <img src="/favicon.png" alt="ColorOhm Logo" style="width: 100%; height: 100%; object-fit: cover;" />
                                </div>
                                <h3 style="font-size: 1.25rem; font-weight: 700; color: var(--color-text-main);">ColorOhm</h3>
                            </div>
                            <p style="font-size: 0.9rem; color: var(--color-text-secondary); line-height: 1.6;">
                                Professional resistor color code calculator for electronics enthusiasts, 
                                students, and engineers. Supporting 3, 4, 5, and 6-band resistors plus SMD codes.
                            </p>
                        </div>
                        
                        <div>
                            <h4 style="font-weight: 600; color: var(--color-text-main); margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem;">
                                <svg style="width: 20px; height: 20px; color: var(--color-primary);" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path>
                                    <path fill-rule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                                </svg>
                                Features
                            </h4>
                            <ul style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 0.75rem; font-size: 0.9rem; color: var(--color-text-secondary);">
                                <li style="display: flex; align-items: flex-start; gap: 0.5rem;">
                                    <svg style="width: 16px; height: 16px; color: var(--color-primary); flex-shrink: 0; margin-top: 3px;" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                                    </svg>
                                    Color code to resistance conversion
                                </li>
                                <li style="display: flex; align-items: flex-start; gap: 0.5rem;">
                                    <svg style="width: 16px; height: 16px; color: var(--color-primary); flex-shrink: 0; margin-top: 3px;" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                                    </svg>
                                    Resistance to color code prediction
                                </li>
                                <li style="display: flex; align-items: flex-start; gap: 0.5rem;">
                                    <svg style="width: 16px; height: 16px; color: var(--color-primary); flex-shrink: 0; margin-top: 3px;" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                                    </svg>
                                    SMD resistor code calculator
                                </li>
                                <li style="display: flex; align-items: flex-start; gap: 0.5rem;">
                                    <svg style="width: 16px; height: 16px; color: var(--color-primary); flex-shrink: 0; margin-top: 3px;" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                                    </svg>
                                    3, 4, 5, and 6-band support
                                </li>
                            </ul>
                        </div>
                        
                        <div>
                            <h4 style="font-weight: 600; color: var(--color-text-main); margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem;">
                                <svg style="width: 20px; height: 20px; color: var(--color-primary);" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path>
                                </svg>
                                About
                            </h4>
                            <p style="font-size: 0.9rem; color: var(--color-text-secondary); margin-bottom: 1rem; line-height: 1.6;">
                                Created by RSMK to provide accurate and easy-to-use resistor calculations 
                                for the electronics community.
                            </p>
                            <div style="display: flex; flex-direction: column; gap: 0.75rem;">
                                <a href="https://rsmk.me" target="_blank" rel="noopener noreferrer" 
                                   style="display: inline-block; transition: all 0.2s;">
                                    <img src="/rsmk_logo.png" alt="RSMK Logo" style="height: 40px; width: auto;" />
                                </a>
                                <p style="font-size: 0.85rem; color: var(--color-text-muted);">
                                    &copy; 2025 RSMK. All rights reserved.
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    <div style="border-top: 1px solid rgba(255,255,255,0.05); margin-top: 3rem; padding-top: 1.5rem; text-align: center;">
                        <p style="font-size: 0.85rem; color: var(--color-text-muted); display: flex; align-items: center; justify-content: center; gap: 0.5rem;">
                            <svg style="width: 16px; height: 16px; color: var(--color-primary);" fill="currentColor" viewBox="0 0 20 20">
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