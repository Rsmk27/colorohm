export class Header {
    constructor(container) {
        this.container = container;
    }

    init() {
        this.render();
    }

    render() {
        this.container.innerHTML = `
            <header class="header card-glass slide-down" style="padding: 1rem 1.5rem; margin-bottom: 2rem; display: flex; align-items: center; justify-content: space-between;">
                <div class="logo-group">
                    <div class="logo-icon">
                        <img src="/favicon.png" alt="ColorOhm Logo" />
                    </div>
                    <div class="brand-text">
                        <h1>ColorOhm</h1>
                        <p>Precision Electronics Utility</p>
                    </div>
                </div>
                
                <div class="nav-links">
                    <a href="#" class="nav-link" onclick="event.preventDefault(); window.scrollTo({top:0, behavior:'smooth'})">Calculator</a>
                    <a href="#info-section" class="nav-link">Docs</a>
                    <a href="#info-section" class="nav-link">About</a>
                </div>
            </header>
        `;
    }
}