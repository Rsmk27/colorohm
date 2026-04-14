export class AndroidApp {
    constructor(container) {
        this.container = container;
    }

    init() {
        this.render();
    }

    render() {
        this.container.innerHTML = `
            <div class="android-app-container fade-in" style="max-width: 900px; margin: 0 auto;">
                <div class="card-glass slide-up" style="padding: 2.5rem 2rem;">
                    <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1.5rem; flex-wrap: wrap;">
                        <div style="width: 64px; height: 64px; border-radius: 16px; background: linear-gradient(135deg, var(--color-primary), #0077B6); display: flex; align-items: center; justify-content: center; box-shadow: 0 0 20px var(--color-primary-glow);">
                            <img src="/favicon.png" alt="ColorOhm App Icon" style="width: 100%; height: 100%; object-fit: cover; border-radius: 16px;" />
                        </div>
                        <div>
                            <h2 style="font-size: 2rem; font-weight: 800; color: var(--color-text-main); line-height: 1.1;">ColorOhm Android App</h2>
                            <p style="color: var(--color-primary); margin-top: 0.35rem;">Take resistor calculations with you, anywhere.</p>
                        </div>
                    </div>

                    <p style="color: var(--color-text-secondary); line-height: 1.75; margin-bottom: 2rem; font-size: 1.02rem;">
                        The ColorOhm Android app delivers the same fast and accurate calculator experience as the website,
                        optimized for mobile usage. Decode resistor color bands, reverse-calculate resistance values, and
                        work with SMD resistor codes directly on your phone.
                    </p>

                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1rem; margin-bottom: 2rem;">
                        <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 10px; padding: 1rem;">
                            <h3 style="font-size: 1rem; color: var(--color-text-main); margin-bottom: 0.45rem;">Same Core Features</h3>
                            <p style="font-size: 0.9rem; color: var(--color-text-muted);">All major calculator modes from the website are available in the app.</p>
                        </div>
                        <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 10px; padding: 1rem;">
                            <h3 style="font-size: 1rem; color: var(--color-text-main); margin-bottom: 0.45rem;">Built for Mobile</h3>
                            <p style="font-size: 0.9rem; color: var(--color-text-muted);">Quick access and touch-friendly controls for electronics work on the go.</p>
                        </div>
                        <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 10px; padding: 1rem;">
                            <h3 style="font-size: 1rem; color: var(--color-text-main); margin-bottom: 0.45rem;">Offline Friendly</h3>
                            <p style="font-size: 0.9rem; color: var(--color-text-muted);">Use it in your workshop or lab without needing a constant internet connection.</p>
                        </div>
                    </div>

                    <div style="display: flex; flex-wrap: wrap; gap: 0.75rem; align-items: center;">
                        <a
                            href="https://github.com/Rsmk27/colorohm-reactapp/releases/download/v1.2.0/ColourOhm-v1.2.0.apk"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="apk-download-btn"
                        >
                            Download APK (v1.2.0)
                        </a>
                        <span style="font-size: 0.88rem; color: var(--color-text-muted);">Direct download from GitHub Releases</span>
                    </div>
                </div>
            </div>
        `;
    }
}
