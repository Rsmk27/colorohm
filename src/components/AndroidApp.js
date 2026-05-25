export class AndroidApp {
    constructor(container) {
        this.container = container;
    }

    init() {
        this.render();
    }

    render() {
        this.container.innerHTML = `
            <style>
                .version-card {
                    background: rgba(255, 255, 255, 0.03);
                    border: 1px solid rgba(255, 255, 255, 0.06);
                    border-radius: 16px;
                    padding: 1.75rem;
                    margin-bottom: 2rem;
                    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
                }
                .version-card:hover {
                    background: rgba(255, 255, 255, 0.05);
                    border-color: rgba(255, 255, 255, 0.12);
                    transform: translateY(-4px);
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
                }
                .version-header {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    margin-bottom: 1.25rem;
                    padding-bottom: 1.25rem;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
                }
                .version-title {
                    font-size: 1.35rem;
                    font-weight: 800;
                    color: var(--color-text-main, #ffffff);
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                }
                .version-title .badge {
                    font-size: 0.75rem;
                    background: rgba(37, 99, 235, 0.15);
                    color: var(--color-primary, #2563eb);
                    padding: 0.3rem 0.8rem;
                    border-radius: 20px;
                    font-weight: 700;
                    letter-spacing: 0.5px;
                    text-transform: uppercase;
                    border: 1px solid rgba(37, 99, 235, 0.3);
                }
                .version-date {
                    font-size: 0.9rem;
                    color: var(--color-text-muted, #a0a0a0);
                    font-weight: 500;
                }
                .feature-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
                    gap: 1.75rem;
                }
                .feature-group h4 {
                    font-size: 1rem;
                    color: var(--color-primary, #2563eb);
                    margin-bottom: 1rem;
                    font-weight: 700;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }
                .feature-list {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                }
                .feature-list li {
                    position: relative;
                    padding-left: 1.5rem;
                    margin-bottom: 0.75rem;
                    font-size: 0.95rem;
                    color: var(--color-text-secondary, #d1d1d1);
                    line-height: 1.5;
                }
                .feature-list li::before {
                    content: "▹";
                    position: absolute;
                    left: 0;
                    color: var(--color-primary, #2563eb);
                    font-weight: bold;
                    font-size: 1.1rem;
                }
                .emoji-list li::before {
                    content: "";
                }
                .emoji-list li {
                    padding-left: 0;
                    display: flex;
                    gap: 0.5rem;
                    align-items: flex-start;
                }
                .emoji-list li .emoji {
                    flex-shrink: 0;
                    font-size: 1.1rem;
                }
                .app-hero-container {
                    display: flex;
                    flex-direction: column;
                    gap: 1.5rem;
                }
                @media (min-width: 768px) {
                    .app-hero-container {
                        flex-direction: row;
                        align-items: center;
                        justify-content: space-between;
                    }
                    .app-hero-content {
                        flex: 1;
                        padding-right: 2rem;
                    }
                }
            </style>
            
            <div class="android-app-container fade-in" style="max-width: 950px; margin: 0 auto; padding-bottom: 4rem;">
                
                <!-- Hero Section -->
                <div class="card-glass slide-up" style="padding: 3rem 2.5rem; margin-bottom: 3rem; position: relative; overflow: hidden;">
                    <!-- Decorative Background element -->
                    <div style="position: absolute; top: -50px; right: -50px; width: 200px; height: 200px; background: var(--color-primary, #2563eb); filter: blur(100px); opacity: 0.15; border-radius: 50%; pointer-events: none;"></div>
                    
                    <div class="app-hero-container">
                        <div class="app-hero-content">
                            <div style="display: flex; align-items: center; gap: 1.25rem; margin-bottom: 1.5rem;">
                                <div style="width: 88px; height: 88px; border-radius: 22px; background: linear-gradient(135deg, var(--color-primary, #2563eb), #0077B6); display: flex; align-items: center; justify-content: center; box-shadow: 0 8px 32px var(--color-primary-glow, rgba(37, 99, 235, 0.4)); flex-shrink: 0; position: relative;">
                                    <div style="position: absolute; inset: 0; border-radius: inherit; border: 1px solid rgba(255,255,255,0.2);"></div>
                                    <img src="/favicon.png" alt="ColorOhm App Icon" style="width: 100%; height: 100%; object-fit: cover; border-radius: 20px;" />
                                </div>
                                <div>
                                    <h2 style="font-size: 2.75rem; font-weight: 800; color: var(--color-text-main, #ffffff); line-height: 1.1; margin: 0; letter-spacing: -0.5px;">ColorOhm App</h2>
                                    <p style="color: var(--color-primary, #2563eb); margin-top: 0.5rem; font-size: 1.15rem; font-weight: 600;">Your electronics toolkit, reimagined for mobile.</p>
                                </div>
                            </div>

                            <p style="color: var(--color-text-secondary, #d1d1d1); line-height: 1.7; margin-bottom: 2rem; font-size: 1.1rem; max-width: 600px;">
                                The ColorOhm Android app delivers a premium, fast, and highly accurate calculator experience. 
                                Decode color bands, reverse-calculate resistance, and parse SMD codes instantly—even offline in the lab.
                            </p>

                            <div style="display: flex; flex-wrap: wrap; gap: 1.25rem; align-items: center; background: rgba(0,0,0,0.25); padding: 1.5rem; border-radius: 16px; border: 1px solid rgba(255,255,255,0.06); backdrop-filter: blur(10px);">
                                <a
                                    href="https://github.com/Rsmk27/colorohm-reactapp/releases/download/v1.2.1/ColorOhm.v1.2.1.apk"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    class="apk-download-btn"
                                    style="padding: 0.85rem 1.75rem; background: linear-gradient(135deg, var(--color-primary, #2563eb), #0077b6); color: #fff; font-weight: 700; font-size: 1.05rem; border-radius: 10px; text-decoration: none; display: inline-flex; align-items: center; gap: 0.5rem; transition: transform 0.2s, box-shadow 0.2s; box-shadow: 0 6px 20px rgba(37, 99, 235, 0.35); text-shadow: 0 1px 2px rgba(0,0,0,0.2);"
                                >
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                                    Download APK v1.2.1
                                </a>
                                <div style="display: flex; flex-direction: column; gap: 0.25rem;">
                                    <span style="font-size: 0.95rem; color: var(--color-text-main, #fff); font-weight: 600;">Available via GitHub Releases</span>
                                    <span style="font-size: 0.85rem; color: var(--color-text-muted, #a0a0a0);">Android 6.0+ • Ad-Free • Open Source</span>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Visual representation / Phone Mockup Abstract -->
                        <div style="width: 200px; height: 350px; border-radius: 24px; background: rgba(0,0,0,0.4); border: 4px solid #333; position: relative; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.4); display: none; margin-left: auto;">
                            <!-- Top notch -->
                            <div style="position: absolute; top: 0; left: 50%; transform: translateX(-50%); width: 80px; height: 20px; background: #333; border-bottom-left-radius: 10px; border-bottom-right-radius: 10px;"></div>
                            
                            <div style="padding: 30px 10px 10px 10px; height: 100%; display: flex; flex-direction: column; gap: 10px;">
                                <div style="height: 40px; border-radius: 8px; background: rgba(255,255,255,0.05);"></div>
                                <div style="height: 120px; border-radius: 12px; background: linear-gradient(to bottom, rgba(0,180,216,0.1), rgba(0,180,216,0)); border: 1px solid rgba(0,180,216,0.3); display: flex; align-items: center; justify-content: center;">
                                    <!-- abstract resistor -->
                                    <div style="width: 80%; height: 30px; background: #222; position: relative; border-radius: 4px;">
                                        <div style="position: absolute; left: 20%; width: 10%; height: 100%; background: #e74c3c;"></div>
                                        <div style="position: absolute; left: 40%; width: 10%; height: 100%; background: #9b59b6;"></div>
                                        <div style="position: absolute; left: 60%; width: 10%; height: 100%; background: #f1c40f;"></div>
                                        <div style="position: absolute; left: 80%; width: 10%; height: 100%; background: #d4af37;"></div>
                                    </div>
                                </div>
                                <div style="flex: 1; border-radius: 12px; background: rgba(255,255,255,0.03);"></div>
                                <!-- bottom nav tabs -->
                                <div style="height: 40px; display: flex; justify-content: space-around; align-items: center; padding: 0 10px; border-top: 1px solid rgba(255,255,255,0.05);">
                                    <div style="width: 20px; height: 20px; border-radius: 50%; background: var(--color-primary, #2563eb);"></div>
                                    <div style="width: 20px; height: 20px; border-radius: 4px; background: rgba(255,255,255,0.2);"></div>
                                    <div style="width: 20px; height: 20px; border-radius: 4px; background: rgba(255,255,255,0.2);"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="slide-up" style="animation-delay: 0.15s;">
                    <h3 style="font-size: 1.75rem; color: var(--color-text-main, #ffffff); margin-bottom: 2rem; border-left: 5px solid var(--color-primary, #2563eb); padding-left: 1.25rem; font-weight: 800; letter-spacing: -0.5px;">Changelog & Updates</h3>

                    <!-- v1.2.1 -->
                    <div class="version-card">
                        <div class="version-header">
                            <div class="version-title">v1.2.1 <span class="badge">Latest</span></div>
                            <div class="version-date">The Fun & Fluidity Update</div>
                        </div>
                        <div class="feature-grid">
                            <div class="feature-group">
                                <h4>✨ Easter Eggs & Secrets</h4>
                                <ul class="feature-list emoji-list">
                                    <li><span class="emoji">💀</span> Decode 0Ω → "That's just a wire bro"</li>
                                    <li><span class="emoji">🌌</span> Decode 42Ω → "The answer to everything"</li>
                                    <li><span class="emoji">😏</span> Decode 69Ω → "Nice."</li>
                                    <li><span class="emoji">👻</span> Decode 999MΩ → "Basically open circuit"</li>
                                    <li><span class="emoji">👆</span> Tap the logo 7 times → Hidden screen unlocked</li>
                                    <li><span class="emoji">📳</span> Shake device → Random E24 value of the day</li>
                                </ul>
                            </div>
                            <div class="feature-group">
                                <h4>🎞️ Advanced Animations</h4>
                                <ul class="feature-list">
                                    <li><strong>Sequential Reveal:</strong> Color bands slide in one by one when decoding.</li>
                                    <li><strong>Spring Physics:</strong> SMD result cards now utilize natural spring dynamics.</li>
                                    <li><strong>Particle Burst:</strong> Star burst effect triggered when favoriting items.</li>
                                    <li><strong>Fluid Navigation:</strong> Tab switches now use fade + scale transitions.</li>
                                    <li><strong>Staggered Lists:</strong> History items flow seamlessly onto the screen.</li>
                                    <li>App launch logo features a subtle pulsing effect.</li>
                                </ul>
                            </div>
                            <div class="feature-group" style="grid-column: 1 / -1; margin-top: 0.5rem; padding-top: 1.5rem; border-top: 1px dashed rgba(255,255,255,0.1);">
                                <h4 style="margin-bottom: 0.75rem; font-size: 0.9rem; color: var(--color-text-muted, #a0a0a0);">Under the Hood</h4>
                                <ul class="feature-list" style="display: flex; flex-wrap: wrap; gap: 1.5rem;">
                                    <li style="margin: 0; padding-left: 1.25rem;">Integrated <code>react-native-reanimated</code></li>
                                    <li style="margin: 0; padding-left: 1.25rem;">Added <code>expo-sensors</code> for shake detection</li>
                                    <li style="margin: 0; padding-left: 1.25rem;"><code>versionCode</code> bumped to 4</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <!-- v1.2.0 -->
                    <div class="version-card">
                        <div class="version-header">
                            <div class="version-title">v1.2.0</div>
                            <div class="version-date">The Feature Expansion</div>
                        </div>
                        <div class="feature-grid" style="grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));">
                            <div class="feature-group">
                                <h4>📱 New Screens</h4>
                                <ul class="feature-list">
                                    <li><strong>SMD Decoder:</strong> Decode 3-digit, 4-digit, and EIA-96 R-notation codes instantly.</li>
                                    <li><strong>Reverse Lookup:</strong> Enter any resistance value and get the color bands back (4 & 5 bands).</li>
                                    <li><strong>History tracking:</strong> View your last 20 decoded values, grouped automatically.</li>
                                    <li><strong>Favorites module:</strong> Star any result, add custom labels, and quickly reopen.</li>
                                </ul>
                            </div>
                            <div class="feature-group">
                                <h4>💎 UX Polish</h4>
                                <ul class="feature-list">
                                    <li>Deeply integrated haptic feedback across decoding, errors, and navigation.</li>
                                    <li>Share any calculated result universally as an image or text snippet.</li>
                                    <li>Introduced persistent bottom tab navigation spanning all 5 main app modules.</li>
                                </ul>
                            </div>
                            <div class="feature-group">
                                <h4>🚀 Performance</h4>
                                <ul class="feature-list">
                                    <li>Dramatically reduced APK footprint via ABI splits architecture.</li>
                                    <li>Swapped to the Hermes engine for lightning-fast application launches.</li>
                                    <li>Implemented ProGuard minification for highly optimized production builds.</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <!-- v1.0.0 -->
                    <div class="version-card">
                        <div class="version-header">
                            <div class="version-title" style="color: var(--color-text-muted, #a0a0a0);">v1.0.0 🎉</div>
                            <div class="version-date">Initial Release</div>
                        </div>
                        <p style="color: var(--color-text-secondary, #d1d1d1); font-size: 1rem; margin-bottom: 1.25rem; line-height: 1.6;">
                            The foundational release of ColorOhm — bringing the highly popular web calculator to Android as a dedicated, dark-themed native experience.
                        </p>
                        <div class="feature-group">
                            <ul class="feature-list" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 0.5rem 1rem;">
                                <li><strong>Decode Mode:</strong> Accurate band-to-value conversion.</li>
                                <li><strong>Encode Mode:</strong> Value-to-band reverse calculation.</li>
                                <li>Built-in comprehensive reference chart.</li>
                                <li>Interactive animated resistor component.</li>
                                <li>Foundational haptic response framework.</li>
                            </ul>
                        </div>
                    </div>

                </div>
            </div>
        `;
    }
}
