export class Header {
    constructor(container, onNavigate) {
        this.container = container;
        this.onNavigate = onNavigate || (() => { });
    }

    init() {
        this.render();
        this.bindEvents();
    }

    render() {
        this.container.innerHTML = `
            <header class="header card-glass slide-down" style="padding: 1rem 1.5rem; margin-bottom: 2rem; display: flex; align-items: center; justify-content: space-between;">
                <div class="logo-group" style="cursor: pointer;" data-page="home">
                    <div class="logo-icon">
                        <img src="/favicon.png" alt="ColorOhm Logo" />
                    </div>
                    <div class="brand-text">
                        <h1>ColorOhm</h1>
                        <p>Precision Electronics Utility</p>
                    </div>
                </div>
                
                <div class="nav-links">
                    <a href="#" data-page="home" class="nav-link active">Calculator</a>
                    <a href="#" data-page="docs" class="nav-link">Docs</a>
                    <a href="#" data-page="about" class="nav-link">About</a>
                </div>
            </header>
        `;
    }

    bindEvents() {
        const links = this.container.querySelectorAll('[data-page]');
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const page = link.getAttribute('data-page');

                // Update active state
                this.container.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                if (link.classList.contains('nav-link')) {
                    link.classList.add('active');
                } else {
                    // If clicked on logo, set Calculator as active
                    const homeLink = this.container.querySelector('.nav-link[data-page="home"]');
                    if (homeLink) homeLink.classList.add('active');
                }

                this.onNavigate(page);
            });
        });
    }
}