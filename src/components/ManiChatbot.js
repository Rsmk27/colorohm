export class ManiChatbot {
    constructor(container, getAppContext) {
        this.container = container;
        this.getAppContext = getAppContext;
        this.isOpen = false;
        this.status = 'connecting'; // 'connecting' | 'online' | 'offline'
        this.messages = this.loadHistory();
        this.isLoading = false;
        this.backendUrl = 'https://project-mani-c0t3.onrender.com';
        
        // Welcome message if history is empty
        if (this.messages.length === 0) {
            this.messages.push({
                role: 'assistant',
                content: "Hi! I'm Mani, your ColorOhm assistant. 🧠 Ask me anything about resistor color codes (3-6 bands), SMD markings, Ohm's law, or color conversions!"
            });
            this.saveHistory();
        }

        // Create widget element and append to body
        this.widgetEl = document.createElement('div');
        this.widgetEl.className = 'mani-chat-widget';
        document.body.appendChild(this.widgetEl);
    }

    init() {
        this.render();
        this.bindEvents();
        this.checkHealth();
    }

    loadHistory() {
        try {
            const data = localStorage.getItem('colorohm_mani_chat_history');
            return data ? JSON.parse(data) : [];
        } catch (e) {
            console.error('Error loading chat history:', e);
            return [];
        }
    }

    saveHistory() {
        try {
            localStorage.setItem('colorohm_mani_chat_history', JSON.stringify(this.messages));
        } catch (e) {
            console.error('Error saving chat history:', e);
        }
    }

    clearHistory() {
        if (confirm('Are you sure you want to clear your chat history?')) {
            this.messages = [{
                role: 'assistant',
                content: "Hi! I'm Mani, your ColorOhm assistant. 🧠 Ask me anything about resistor color codes (3-6 bands), SMD markings, Ohm's law, or color conversions!"
            }];
            this.saveHistory();
            this.renderMessages();
        }
    }

    render() {
        const hasOfflineBadge = this.status === 'offline';
        const hasOnlineBadge = this.status === 'online';
        const badgeClass = hasOnlineBadge ? 'online' : (hasOfflineBadge ? 'offline' : '');

        this.widgetEl.innerHTML = `
            <!-- Chat Bubble -->
            <button id="mani-bubble" class="mani-chat-bubble" aria-label="Open chat with Mani AI" aria-expanded="false" aria-haspopup="dialog" aria-controls="mani-window">
                <span class="mani-chat-tooltip">Need help? Mani is here!</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
                <div id="mani-badge" class="mani-chat-badge ${badgeClass}"></div>
            </button>

            <!-- Chat Window -->
            <div id="mani-window" class="mani-chat-window hidden">
                <div class="mani-chat-header">
                    <div class="mani-chat-header-info">
                        <div class="mani-chat-logo">M</div>
                        <div class="mani-chat-title-group">
                            <span class="mani-chat-title">Mani AI</span>
                            <span class="mani-chat-status">
                                <span id="mani-status-dot" class="mani-chat-status-dot ${this.status === 'online' ? 'online' : (this.status === 'offline' ? 'offline' : '')}"></span>
                                <span id="mani-status-text">${this.status === 'online' ? 'Online' : (this.status === 'offline' ? 'Offline' : 'Warming up...')}</span>
                            </span>
                        </div>
                    </div>
                    <div style="display: flex; align-items: center; gap: 8px;">
                        <!-- Clear History Button -->
                        <button id="mani-clear-btn" class="mani-chat-close-btn" title="Clear chat history" aria-label="Clear chat history">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <polyline points="3 6 5 6 21 6"></polyline>
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                            </svg>
                        </button>
                        <!-- Close Window Button -->
                        <button id="mani-close-btn" class="mani-chat-close-btn" title="Close chat window" aria-label="Close chat window">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>
                    </div>
                </div>

                <!-- Messages -->
                <div id="mani-messages" class="mani-chat-messages"></div>

                <!-- Suggestions -->
                <div id="mani-suggestions" class="mani-chat-suggestions-container">
                    <div class="mani-chat-suggestions-title">Suggested Questions</div>
                    <div class="mani-chat-suggestions">
                        <button class="mani-chat-suggestion" data-q="How do I read a 4-band resistor?">Read 4-band resistor</button>
                        <button class="mani-chat-suggestion" data-q="How to decode SMD code '472'?">Decode SMD '472'</button>
                        <button class="mani-chat-suggestion" data-q="What does a Gold tolerance band mean?">Gold tolerance band</button>
                        <button class="mani-chat-suggestion" data-q="Tell me more about ColorOhm.">About ColorOhm</button>
                    </div>
                </div>

                <!-- Input Area -->
                <div class="mani-chat-input-area">
                    <input type="text" id="mani-input" class="mani-chat-input" placeholder="Type a message..." autocomplete="off">
                    <button id="mani-send" class="mani-chat-send-btn" aria-label="Send message">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                            <line x1="22" y1="2" x2="11" y2="13"></line>
                            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                        </svg>
                    </button>
                </div>
            </div>
        `;

        this.renderMessages();
    }

    bindEvents() {
        const bubble = this.widgetEl.querySelector('#mani-bubble');
        const closeBtn = this.widgetEl.querySelector('#mani-close-btn');
        const clearBtn = this.widgetEl.querySelector('#mani-clear-btn');
        const input = this.widgetEl.querySelector('#mani-input');
        const sendBtn = this.widgetEl.querySelector('#mani-send');
        const suggestions = this.widgetEl.querySelectorAll('.mani-chat-suggestion');
        const statusGroup = this.widgetEl.querySelector('.mani-chat-status');

        // Toggle chat window
        bubble.addEventListener('click', () => this.toggleWindow());
        closeBtn.addEventListener('click', () => this.toggleWindow(false));
        clearBtn.addEventListener('click', () => this.clearHistory());

        // Send message handlers
        sendBtn.addEventListener('click', () => this.handleSendMessage());
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.handleSendMessage();
            }
        });

        // Suggestions
        suggestions.forEach(btn => {
            btn.addEventListener('click', () => {
                const question = btn.getAttribute('data-q');
                if (question) {
                    this.handleSendMessage(question);
                }
            });
        });

        // Click status to retry health check if offline
        if (statusGroup) {
            statusGroup.addEventListener('click', () => {
                if (this.status === 'offline') {
                    this.checkHealth();
                }
            });
        }

        // Close chat window when clicking outside of the widget
        document.addEventListener('click', (e) => {
            if (this.isOpen && !this.widgetEl.contains(e.target)) {
                this.toggleWindow(false);
            }
        });

        // Close chat window on Escape key press
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.toggleWindow(false);
            }
        });
    }

    toggleWindow(forceState = null) {
        const windowEl = this.widgetEl.querySelector('#mani-window');
        const bubbleEl = this.widgetEl.querySelector('#mani-bubble');
        
        this.isOpen = (forceState !== null) ? forceState : !this.isOpen;

        if (bubbleEl) {
            bubbleEl.setAttribute('aria-expanded', this.isOpen ? 'true' : 'false');
        }

        if (this.isOpen) {
            windowEl.classList.remove('hidden');
            bubbleEl.classList.add('open');
            this.widgetEl.querySelector('#mani-input').focus();
            this.scrollToBottom();
        } else {
            windowEl.classList.add('hidden');
            bubbleEl.classList.remove('open');
            // Restore keyboard focus to bubble when closing for accessibility
            if (bubbleEl && document.activeElement !== document.body) {
                bubbleEl.focus();
            }
        }
    }

    async checkHealth() {
        this.updateStatus('connecting');
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 8000);
            
            const response = await fetch(this.backendUrl + '/', { signal: controller.signal });
            clearTimeout(timeoutId);
            
            if (response.ok) {
                this.updateStatus('online');
            } else {
                this.updateStatus('offline');
            }
        } catch (error) {
            console.warn('Mani backend health check failed/timed out, might be waking up:', error);
            this.updateStatus('offline');
        }
    }

    updateStatus(newStatus) {
        this.status = newStatus;
        
        const badge = this.widgetEl.querySelector('#mani-badge');
        const statusDot = this.widgetEl.querySelector('#mani-status-dot');
        const statusText = this.widgetEl.querySelector('#mani-status-text');
        const statusGroup = this.widgetEl.querySelector('.mani-chat-status');

        if (!badge || !statusDot || !statusText) return;

        // Reset classes
        badge.className = 'mani-chat-badge';
        statusDot.className = 'mani-chat-status-dot';
        if (statusGroup) {
            statusGroup.className = 'mani-chat-status';
        }

        if (newStatus === 'online') {
            badge.classList.add('online');
            statusDot.classList.add('online');
            statusText.textContent = 'Online';
        } else if (newStatus === 'offline') {
            badge.classList.add('offline');
            statusDot.classList.add('offline');
            statusText.textContent = 'Offline (Click to retry)';
            if (statusGroup) {
                statusGroup.classList.add('offline-retry');
            }
        } else {
            statusText.textContent = 'Warming up...';
        }
    }

    renderMessages() {
        const container = this.widgetEl.querySelector('#mani-messages');
        if (!container) return;

        container.innerHTML = '';
        
        this.messages.forEach(msg => {
            const row = document.createElement('div');
            row.className = `mani-chat-msg-row ${msg.role}`;
            
            const avatar = document.createElement('div');
            avatar.className = 'mani-chat-msg-avatar';
            avatar.textContent = msg.role === 'user' ? 'U' : 'M';

            const bubble = document.createElement('div');
            bubble.className = 'mani-chat-msg-bubble';
            bubble.innerHTML = this.formatMessageText(msg.content);

            row.appendChild(avatar);
            row.appendChild(bubble);
            container.appendChild(row);
        });

        this.scrollToBottom();
    }

    scrollToBottom() {
        const container = this.widgetEl.querySelector('#mani-messages');
        if (container) {
            container.scrollTop = container.scrollHeight;
        }
    }

    async handleSendMessage(customText = null) {
        if (this.isLoading) return;

        const inputEl = this.widgetEl.querySelector('#mani-input');
        const text = (customText || inputEl.value).trim();

        if (!text) return;

        // Clear input field if sent from input
        if (!customText) {
            inputEl.value = '';
        }

        // Add user message to state & render
        this.messages.push({ role: 'user', content: text });
        this.saveHistory();
        this.renderMessages();

        // Show typing indicator
        this.showTypingIndicator(true);
        
        // Restore focus to input text area
        inputEl.focus();

        try {
            const context = this.getSiteContext();
            
            // Render cold start alert timer (show alert if backend response takes > 5 seconds)
            let slowResponseTimeout = setTimeout(() => {
                this.updateTypingIndicatorText("Mani is waking up from a deep sleep (Render cold starts can take up to 50 seconds)... ☕");
            }, 5000);

            // Strip the local introductory assistant prompt from the history before sending
            const apiHistory = this.messages.slice(0, -1); 

            const response = await fetch(`${this.backendUrl}/api/chat`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    query: text,
                    siteContext: context,
                    history: apiHistory
                })
            });

            clearTimeout(slowResponseTimeout);
            this.showTypingIndicator(false);

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            
            if (data.success && data.response) {
                // If it successfully answered, update status to online
                this.updateStatus('online');
                
                this.messages.push({
                    role: 'assistant',
                    content: data.response
                });
                this.saveHistory();
                this.renderMessages();
            } else {
                throw new Error('API returned success=false or empty response');
            }

        } catch (error) {
            console.error('Chat request failed:', error);
            this.showTypingIndicator(false);
            
            // Mark status as offline
            this.updateStatus('offline');

            this.messages.push({
                role: 'assistant',
                content: "I'm having trouble connecting to the Mani Core servers right now. Please try again in a few moments."
            });
            this.saveHistory();
            this.renderMessages();
        }
    }

    showTypingIndicator(show) {
        this.isLoading = show;
        const container = this.widgetEl.querySelector('#mani-messages');
        const input = this.widgetEl.querySelector('#mani-input');
        const sendBtn = this.widgetEl.querySelector('#mani-send');
        
        if (!container) return;

        // Enable/Disable input
        input.disabled = show;
        sendBtn.disabled = show;

        // Enable/Disable suggestion chips to prevent spamming
        const suggestionChips = this.widgetEl.querySelectorAll('.mani-chat-suggestion');
        suggestionChips.forEach(chip => {
            chip.disabled = show;
        });

        if (show) {
            const row = document.createElement('div');
            row.className = 'mani-chat-msg-row assistant typing-row';
            row.id = 'mani-typing-indicator';
            
            const avatar = document.createElement('div');
            avatar.className = 'mani-chat-msg-avatar';
            avatar.textContent = 'M';

            const bubble = document.createElement('div');
            bubble.className = 'mani-chat-msg-bubble';
            bubble.innerHTML = `
                <div class="mani-chat-typing">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <div id="mani-typing-text" style="font-size: 0.75rem; color: var(--color-text-secondary); margin-top: 4px; display: none;"></div>
            `;

            row.appendChild(avatar);
            row.appendChild(bubble);
            container.appendChild(row);
            this.scrollToBottom();
        } else {
            const indicator = container.querySelector('#mani-typing-indicator');
            if (indicator) {
                indicator.remove();
            }
        }
    }

    updateTypingIndicatorText(text) {
        const textEl = this.widgetEl.querySelector('#mani-typing-text');
        if (textEl) {
            textEl.textContent = text;
            textEl.style.display = 'block';
            this.scrollToBottom();
        }
    }

    getSiteContext() {
        const appCtx = this.getAppContext ? this.getAppContext() : {};
        const mode = appCtx.currentMode || 'unknown';
        const bandCount = appCtx.currentBandCount || '4';
        const page = appCtx.currentPage || 'home';
        
        let details = `User is on the ColorOhm app. ColorOhm is a precision resistor color code calculator and electronics utility created by RSMK Technologies.`;
        details += ` The user is currently looking at the page: '${page}'.`;
        
        if (page === 'home') {
            if (mode === 'color-to-resistance') {
                details += ` They are currently using the 'Color to Resistance' calculator in ${bandCount}-band mode, converting colored bands to Ohms.`;
            } else if (mode === 'resistance-to-color') {
                details += ` They are currently using the 'Resistance to Color' calculator, converting resistance values to resistor color bands.`;
            } else if (mode === 'smd-calculator') {
                details += ` They are currently using the 'SMD Resistor Calculator' decoding/encoding surface mount device resistor codes (3-digit, 4-digit, or EIA-96).`;
            }
        } else if (page === 'docs') {
            details += ` They are browsing the resistor guide documentation and color reference charts.`;
        } else if (page === 'about') {
            details += ` They are viewing the About page detailing the mission and creator (RSMK Technologies) of ColorOhm.`;
        } else if (page === 'app') {
            details += ` They are on the Android App view.`;
        }
        
        return details;
    }

    formatMessageText(text) {
        if (!text) return '';

        // Safe HTML escaping helper
        let html = text
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');

        // 1. Code blocks: ```language\n code \n```
        html = html.replace(/```(\w*)\n([\s\S]*?)\n```/g, (match, lang, code) => {
            return `<pre><code class="language-${lang}">${code.trim()}</code></pre>`;
        });
        html = html.replace(/```([\s\S]*?)```/g, (match, code) => {
            return `<pre><code>${code.trim()}</code></pre>`;
        });

        // 2. Inline code: `code`
        html = html.replace(/`([^`]+)`/g, '<code>$1</code>');

        // 3. Bold: **text**
        html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');

        // 4. Italics: *text* or _text_
        html = html.replace(/\*([^*]+)\*/g, '<em>$1</em>');
        html = html.replace(/_([^_]+)_/g, '<em>$1</em>');

        // 5. Links: [text](url)
        html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" style="color: var(--color-primary); text-decoration: underline;">$1</a>');

        // 6. Blockquotes: > quote
        html = html.replace(/^\s*&gt;\s+(.+)$/gm, '<blockquote style="border-left: 3px solid var(--color-primary); padding-left: 12px; margin: 8px 0; color: var(--color-text-secondary);">$1</blockquote>');

        // 7. Headers: ######, #####, ####, ###, ##, #
        html = html.replace(/^\s*#{6}\s+(.+)$/gm, '<h6 style="color: var(--color-text-secondary); font-weight: 600; margin: 8px 0 4px; font-size: 0.85rem;">$1</h6>');
        html = html.replace(/^\s*#{5}\s+(.+)$/gm, '<h5 style="color: var(--color-text-secondary); font-weight: 600; margin: 10px 0 5px; font-size: 0.9rem;">$1</h5>');
        html = html.replace(/^\s*#{4}\s+(.+)$/gm, '<h4 style="color: var(--color-primary); font-weight: 600; margin: 12px 0 6px; font-size: 0.95rem;">$1</h4>');
        html = html.replace(/^\s*#{3}\s+(.+)$/gm, '<h3 style="color: var(--color-primary); font-weight: 700; margin: 14px 0 7px; font-size: 1.05rem;">$1</h3>');
        html = html.replace(/^\s*#{2}\s+(.+)$/gm, '<h2 style="color: var(--color-text-main); font-weight: 800; margin: 16px 0 8px; font-size: 1.15rem;">$1</h2>');
        html = html.replace(/^\s*#{1}\s+(.+)$/gm, '<h1 style="color: var(--color-text-main); font-weight: 800; margin: 18px 0 9px; font-size: 1.25rem;">$1</h1>');

        // 8. Ordered and Unordered Lists
        // Split by lines to parse lists step-by-step
        let lines = html.split('\n');
        let formattedLines = [];
        let inList = null; // 'ul' | 'ol' | null

        for (let line of lines) {
            let ulMatch = line.match(/^\s*[-*+]\s+(.+)$/);
            let olMatch = line.match(/^\s*(\d+)\.\s+(.+)$/);

            if (ulMatch) {
                if (inList !== 'ul') {
                    if (inList) formattedLines.push(`</${inList}>`);
                    formattedLines.push('<ul style="margin: 8px 0; padding-left: 20px; list-style-type: disc;">');
                    inList = 'ul';
                }
                formattedLines.push(`<li>${ulMatch[1]}</li>`);
            } else if (olMatch) {
                if (inList !== 'ol') {
                    if (inList) formattedLines.push(`</${inList}>`);
                    formattedLines.push('<ol style="margin: 8px 0; padding-left: 20px; list-style-type: decimal;">');
                    inList = 'ol';
                }
                formattedLines.push(`<li>${olMatch[2]}</li>`);
            } else {
                if (inList) {
                    formattedLines.push(`</${inList}>`);
                    inList = null;
                }
                
                // Wrap plain text lines in paragraphs, skipping code blocks, headings, blockquotes
                let trimmed = line.trim();
                if (trimmed === '') {
                    formattedLines.push('<br>');
                } else if (
                    trimmed.startsWith('<pre>') || 
                    trimmed.endsWith('</pre>') || 
                    trimmed.startsWith('<h') || 
                    trimmed.startsWith('<blockquote')
                ) {
                    formattedLines.push(line);
                } else {
                    formattedLines.push(`<p style="margin-bottom: 8px; line-height: 1.5;">${line}</p>`);
                }
            }
        }

        if (inList) {
            formattedLines.push(`</${inList}>`);
        }

        // Clean up redundant line breaks
        let result = formattedLines.join('')
            .replace(/<br><br>/g, '<br>')
            .replace(/<p style="margin-bottom: 8px; line-height: 1.5;"><\/p>/g, '')
            .replace(/<br><p/g, '<p')
            .replace(/<\/p><br>/g, '</p>');
            
        return result;
    }
}
