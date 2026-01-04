export class About {
    constructor(container) {
        this.container = container;
    }

    init() {
        this.render();
    }

    render() {
        this.container.innerHTML = `
            <div class="about-container fade-in" style="max-width: 800px; margin: 0 auto;">
                <div class="card-glass slide-up" style="text-align: center; padding: 3rem 2rem;">
                    
                    <div style="width: 100px; height: 100px; margin: 0 auto 2rem; border-radius: 50%; background: linear-gradient(135deg, var(--color-primary), #0077B6); display: flex; align-items: center; justify-content: center; box-shadow: 0 0 30px var(--color-primary-glow);">
                        <img src="/favicon.png" alt="ColorOhm Logo" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;" />
                    </div>

                    <h1 style="font-size: 2.5rem; font-weight: 800; margin-bottom: 1rem; background: linear-gradient(to right, #fff, var(--color-text-secondary)); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">ColorOhm</h1>
                    
                    <p style="font-size: 1.1rem; color: var(--color-primary); margin-bottom: 2rem; font-weight: 500;">Precision Electronics Utility</p>
                    
                    <p style="color: var(--color-text-secondary); line-height: 1.8; margin-bottom: 3rem; font-size: 1.05rem;">
                        ColorOhm is a professional-grade tool designed for electronics enthusiasts, students, and engineers. 
                        Our mission is to simplify the process of identifying resistor values and codes, making your workflow 
                        faster and more accurate. Whether you're decoding a vintage 3-band resistor or calculating 
                        values for modern SMD components, ColorOhm provides the precision you need.
                    </p>

                    <div class="features-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5rem; text-align: left; margin-bottom: 4rem;">
                        <div style="padding: 1.5rem; background: rgba(255,255,255,0.03); border-radius: 12px; border: 1px solid rgba(255,255,255,0.05);">
                            <div style="color: var(--color-primary); margin-bottom: 0.75rem;">
                                <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                            </div>
                            <h3 style="color: var(--color-text-main); font-weight: 600; margin-bottom: 0.5rem;">Fast & Reactive</h3>
                            <p style="font-size: 0.9rem; color: var(--color-text-muted);">Instant calculations as you select bands, with zero lag.</p>
                        </div>
                        <div style="padding: 1.5rem; background: rgba(255,255,255,0.03); border-radius: 12px; border: 1px solid rgba(255,255,255,0.05);">
                            <div style="color: var(--color-primary); margin-bottom: 0.75rem;">
                                <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
                            </div>
                            <h3 style="color: var(--color-text-main); font-weight: 600; margin-bottom: 0.5rem;">Mobile First</h3>
                            <p style="font-size: 0.9rem; color: var(--color-text-muted);">Fully responsive design that works perfectly on any device.</p>
                        </div>
                        <div style="padding: 1.5rem; background: rgba(255,255,255,0.03); border-radius: 12px; border: 1px solid rgba(255,255,255,0.05);">
                            <div style="color: var(--color-primary); margin-bottom: 0.75rem;">
                                <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            </div>
                            <h3 style="color: var(--color-text-main); font-weight: 600; margin-bottom: 0.5rem;">High Precision</h3>
                            <p style="font-size: 0.9rem; color: var(--color-text-muted);">Validated algorithms ensuring 100% accurate results.</p>
                        </div>
                    </div>

                    <div class="creator-section" style="border-top: 1px solid rgba(255,255,255,0.1); padding-top: 2rem;">
                        <p style="color: var(--color-text-muted); font-size: 0.9rem; margin-bottom: 1rem;">From the creator</p>
                        <a href="https://rsmk.me" target="_blank" rel="noopener noreferrer" style="display: inline-block; transition: transform 0.2s;">
                           <img src="/rsmk_logo.png" alt="RSMK Logo" style="height: 50px; opacity: 0.8;" /> 
                        </a>
                        <p style="font-size: 0.85rem; color: var(--color-text-muted); margin-top: 1rem;">
                            © 2025 RSMK Technologies
                        </p>
                    </div>

                </div>
            </div>
        `;
    }
}
