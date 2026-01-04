export class Docs {
    constructor(container) {
        this.container = container;
    }

    init() {
        this.render();
    }

    render() {
        this.container.innerHTML = `
            <div class="docs-container fade-in">
                <div class="card-glass slide-up">
                    <div class="section-header mb-4">
                        <h2 class="text-xl font-bold">Documentation & Guide</h2>
                        <p style="color: var(--color-text-secondary); margin-top: 0.5rem;">Everything you need to know about resistor color codes and this calculator.</p>
                    </div>
                    
                    <div class="docs-content">
                        <div class="doc-section" style="margin-bottom: 3rem;">
                            <h3 style="font-size: 1.25rem; color: var(--color-primary); margin-bottom: 1rem; border-bottom: 1px solid var(--color-border); padding-bottom: 0.5rem;">How Resistor Color Codes Work</h3>
                            <p style="color: var(--color-text-secondary); line-height: 1.6; margin-bottom: 1.5rem;">
                                Resistor color codes use colored bands to indicate the resistance value, multiplier, and tolerance of a resistor. 
                                Each color corresponds to a specific number, allowing you to determine the component's specifications without needing a multimeter.
                            </p>
                            
                            <div class="band-types-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem;">
                                <div class="band-type-card" style="background: rgba(255,255,255,0.03); padding: 1.25rem; border-radius: 8px; border: 1px solid rgba(255,255,255,0.05);">
                                    <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.75rem;">
                                        <div style="background: var(--color-primary); width: 28px; height: 28px; border-radius: 6px; display: flex; align-items: center; justify-content: center; color: black; font-weight: bold;">3</div>
                                        <h4 style="color: var(--color-text-main); font-weight: 600;">3-Band Resistors</h4>
                                    </div>
                                    <p style="font-size: 0.9rem; color: var(--color-text-muted);">
                                        The simplest type. Bands 1 & 2 represents digits, Band 3 is the multiplier. No tolerance band implies ±20%.
                                    </p>
                                </div>

                                <div class="band-type-card" style="background: rgba(255,255,255,0.03); padding: 1.25rem; border-radius: 8px; border: 1px solid rgba(255,255,255,0.05);">
                                    <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.75rem;">
                                        <div style="background: #4ade80; width: 28px; height: 28px; border-radius: 6px; display: flex; align-items: center; justify-content: center; color: black; font-weight: bold;">4</div>
                                        <h4 style="color: var(--color-text-main); font-weight: 600;">4-Band Resistors</h4>
                                    </div>
                                    <p style="font-size: 0.9rem; color: var(--color-text-muted);">
                                        Most common type. Bands 1 & 2 are digits, Band 3 is multiplier, and Band 4 is tolerance.
                                    </p>
                                </div>

                                <div class="band-type-card" style="background: rgba(255,255,255,0.03); padding: 1.25rem; border-radius: 8px; border: 1px solid rgba(255,255,255,0.05);">
                                    <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.75rem;">
                                        <div style="background: #a855f7; width: 28px; height: 28px; border-radius: 6px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">5</div>
                                        <h4 style="color: var(--color-text-main); font-weight: 600;">5-Band Resistors</h4>
                                    </div>
                                    <p style="font-size: 0.9rem; color: var(--color-text-muted);">
                                        High precision. Bands 1, 2, & 3 are digits, Band 4 is multiplier, Band 5 is tolerance.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div class="doc-section" style="margin-bottom: 3rem;">
                             <h3 style="font-size: 1.25rem; color: var(--color-primary); margin-bottom: 1rem; border-bottom: 1px solid var(--color-border); padding-bottom: 0.5rem;">Color Reference Chart</h3>
                             <div class="color-reference-wrapper" style="overflow-x: auto;">
                                <table style="width: 100%; border-collapse: collapse; min-width: 600px;">
                                    <thead>
                                        <tr style="border-bottom: 1px solid var(--color-border);">
                                            <th style="text-align: left; padding: 1rem; color: var(--color-text-secondary);">Color</th>
                                            <th style="text-align: left; padding: 1rem; color: var(--color-text-secondary);">Digit</th>
                                            <th style="text-align: left; padding: 1rem; color: var(--color-text-secondary);">Multiplier</th>
                                            <th style="text-align: left; padding: 1rem; color: var(--color-text-secondary);">Tolerance</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        ${this.renderColorRows()}
                                    </tbody>
                                </table>
                             </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    renderColorRows() {
        const colors = [
            { name: 'Black', hex: '#000000', digit: '0', mult: '1Ω', tol: '-' },
            { name: 'Brown', hex: '#8B4513', digit: '1', mult: '10Ω', tol: '±1%' },
            { name: 'Red', hex: '#FF0000', digit: '2', mult: '100Ω', tol: '±2%' },
            { name: 'Orange', hex: '#FFA500', digit: '3', mult: '1kΩ', tol: '-' },
            { name: 'Yellow', hex: '#FFFF00', digit: '4', mult: '10kΩ', tol: '-' },
            { name: 'Green', hex: '#008000', digit: '5', mult: '100kΩ', tol: '±0.5%' },
            { name: 'Blue', hex: '#0000FF', digit: '6', mult: '1MΩ', tol: '±0.25%' },
            { name: 'Violet', hex: '#8A2BE2', digit: '7', mult: '10MΩ', tol: '±0.1%' },
            { name: 'Grey', hex: '#808080', digit: '8', mult: '-', tol: '±0.05%' },
            { name: 'White', hex: '#FFFFFF', digit: '9', mult: '-', tol: '-' },
            { name: 'Gold', hex: '#FFD700', digit: '-', mult: '0.1Ω', tol: '±5%' },
            { name: 'Silver', hex: '#C0C0C0', digit: '-', mult: '0.01Ω', tol: '±10%' },
        ];

        return colors.map(c => `
            <tr style="border-bottom: 1px solid rgba(255,255,255,0.03);">
                <td style="padding: 0.75rem 1rem;">
                    <div style="display: flex; align-items: center; gap: 0.5rem;">
                        <div style="width: 16px; height: 16px; border-radius: 3px; background-color: ${c.hex}; border: 1px solid rgba(255,255,255,0.1);"></div>
                        <span style="color: var(--color-text-main); font-size: 0.9rem;">${c.name}</span>
                    </div>
                </td>
                <td style="padding: 0.75rem 1rem; color: var(--color-text-muted); font-family: var(--font-mono);">${c.digit}</td>
                <td style="padding: 0.75rem 1rem; color: var(--color-text-muted); font-family: var(--font-mono);">${c.mult}</td>
                <td style="padding: 0.75rem 1rem; color: var(--color-text-muted); font-family: var(--font-mono);">${c.tol}</td>
            </tr>
        `).join('');
    }
}
