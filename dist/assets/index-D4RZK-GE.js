(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))o(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&o(s)}).observe(document,{childList:!0,subtree:!0});function t(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(i){if(i.ep)return;i.ep=!0;const r=t(i);fetch(i.href,r)}})();class f{constructor(e,t){this.container=e,this.onNavigate=t||(()=>{})}init(){this.render(),this.bindEvents()}render(){this.container.innerHTML=`
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
                    <a href="#" data-page="app" class="nav-link">App</a>
                    <a href="#" data-page="docs" class="nav-link">Docs</a>
                    <a href="#" data-page="about" class="nav-link">About</a>
                </div>
            </header>
        `}bindEvents(){this.container.querySelectorAll("[data-page]").forEach(t=>{t.addEventListener("click",o=>{o.preventDefault();const i=t.getAttribute("data-page");if(this.container.querySelectorAll(".nav-link").forEach(r=>r.classList.remove("active")),t.classList.contains("nav-link"))t.classList.add("active");else{const r=this.container.querySelector('.nav-link[data-page="home"]');r&&r.classList.add("active")}this.onNavigate(i)})})}}class y{constructor(e,t){this.container=e,this.onModeChange=t,this.currentMode="color-to-resistance",this.currentBandCount=4}init(){this.render(),this.bindEvents()}render(){this.container.innerHTML=`
            <div class="card-glass slide-up" style="margin-bottom: 2rem;">
                <h2 style="font-size: 1.25rem; font-weight: 700; color: var(--color-text-main); margin-bottom: 1.5rem;">Calculator Mode</h2>
                
                <div class="mode-selector">
                    <button data-mode="color-to-resistance" class="mode-btn">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v6a4 4 0 004 4h4a2 2 0 002-2V5z"></path>
                        </svg>
                        <span style="font-weight: 600;">Color to Resistance</span>
                        <span style="font-size: 0.8rem; color: var(--color-text-secondary);">Read Bands</span>
                    </button>
                    
                    <button data-mode="resistance-to-color" class="mode-btn">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                        </svg>
                        <span style="font-weight: 600;">Resistance to Color</span>
                        <span style="font-size: 0.8rem; color: var(--color-text-secondary);">Find Colors</span>
                    </button>
                    
                    <button data-mode="smd-calculator" class="mode-btn">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"></path>
                        </svg>
                        <span style="font-weight: 600;">SMD Calculator</span>
                        <span style="font-size: 0.8rem; color: var(--color-text-secondary);">Surface Mount</span>
                    </button>
                </div>

                <div id="band-count-selector" style="border-top: 1px solid var(--color-border); padding-top: 1rem;">
                    <label class="control-label">Resistor Type:</label>
                    <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
                        <button data-bands="3" class="band-btn btn-secondary">3-Band</button>
                        <button data-bands="4" class="band-btn btn-secondary">4-Band</button>
                        <button data-bands="5" class="band-btn btn-secondary">5-Band</button>
                        <button data-bands="6" class="band-btn btn-secondary">6-Band</button>
                    </div>
                </div>
            </div>
            
            <style>
                .band-btn {
                    background: var(--color-bg-main);
                    border: 1px solid var(--color-border);
                    color: var(--color-text-secondary);
                    padding: 8px 16px;
                    border-radius: 4px;
                    cursor: pointer;
                    font-size: 0.9rem;
                    transition: all 0.2s;
                }
                .band-btn:hover {
                    border-color: var(--color-primary);
                    color: var(--color-text-main);
                }
                .band-btn.active {
                    background: var(--color-primary);
                    color: #000;
                    border-color: var(--color-primary);
                    font-weight: 600;
                    box-shadow: 0 0 10px rgba(0, 212, 255, 0.3);
                }
            </style>
        `,this.updateButtonStyles()}bindEvents(){this.container.querySelectorAll(".mode-btn").forEach(e=>{e.addEventListener("click",t=>{const o=t.currentTarget.dataset.mode;if(o){this.currentMode=o;const i=this.container.querySelector("#band-count-selector");i&&(o==="smd-calculator"?i.classList.add("hidden"):i.classList.remove("hidden")),this.updateButtonStyles(),this.onModeChange(this.currentMode,this.currentBandCount)}})}),this.container.querySelectorAll(".band-btn").forEach(e=>{e.addEventListener("click",t=>{const o=parseInt(t.target.dataset.bands);o&&(this.currentBandCount=o,this.updateButtonStyles(),this.onModeChange(this.currentMode,this.currentBandCount))})})}updateButtonStyles(){this.container.querySelectorAll(".mode-btn").forEach(e=>{const t=e.dataset.mode===this.currentMode;e.classList.toggle("active",t)}),this.container.querySelectorAll(".band-btn").forEach(e=>{const t=parseInt(e.dataset.bands)===this.currentBandCount;e.classList.toggle("active",t)})}}class b{constructor(e,t){this.container=e,this.calculator=t,this.mode="color-to-resistance",this.bandCount=4,this.currentColors=["black","black","black","brown","brown"],this.animationTimeout=null}init(){this.render()}setMode(e,t){this.mode=e,this.bandCount=t,this.render()}render(){const e=this.mode==="smd-calculator";this.container.innerHTML=`
            <div class="card-glass scale-in">
                <h3 style="font-size: 1.1rem; font-weight: 600; color: var(--color-text-main); margin-bottom: 1.5rem; text-align: center;">
                    ${e?"SMD Resistor":`${this.bandCount}-Band Resistor`}
                </h3>
                
                <div style="display: flex; justify-content: center; align-items: center; margin-bottom: 1.5rem; padding: 1rem; background: rgba(0,0,0,0.2); border-radius: 12px; border: 1px solid var(--color-border); box-shadow: inset 0 2px 4px rgba(0,0,0,0.1);">
                    ${e?this.renderSMDResistor():this.renderThroughHoleResistor()}
                </div>
                
                <div id="resistance-result" style="text-align: center; margin-bottom: 1rem;">
                    <p style="font-size: 0.85rem; font-weight: 500; color: var(--color-text-secondary); margin-bottom: 0.5rem;">Calculated Value</p>
                    <p style="font-size: 2rem; font-weight: 700; background: linear-gradient(to right, var(--color-primary), #a5f3fc); -webkit-background-clip: text; -webkit-text-fill-color: transparent;" id="result-value">0 Ω ± 5%</p>
                    <p style="font-size: 0.85rem; color: var(--color-text-muted); margin-top: 0.5rem;" id="result-details">Select values to calculate</p>
                </div>

                <!-- Copy Button -->
                <div style="display: flex; justify-content: center; margin-bottom: 1.5rem;">
                    <button id="copy-value-btn" style="display: flex; align-items: center; gap: 0.5rem; background: transparent; border: 1px solid var(--color-border); color: var(--color-text-secondary); padding: 0.5rem 1rem; border-radius: 6px; cursor: pointer; transition: all 0.2s; font-size: 0.9rem;">
                        <svg style="width: 18px; height: 18px;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                        </svg>
                        <span>Copy Value</span>
                    </button>
                </div>
                
                ${this.renderAdditionalInfo()}
            </div>
        `,this.bindCopyButton()}renderThroughHoleResistor(){const r=this.calculateBandSpacing();return`
            <div class="resistor-container" style="width: 100%; max-width: 400px;">
                <svg viewBox="0 0 ${200+40*2} 80" style="width: 100%; height: auto; display: block; filter: drop-shadow(0 4px 6px rgba(0,0,0,0.3));">
                    <!-- Left lead -->
                    <rect x="0" y="${60/2-1.5}" width="40" height="3" 
                          fill="url(#leadGradient)" rx="1.5"/>
                    
                    <!-- Right lead -->
                    <rect x="240" y="${60/2-1.5}" width="40" height="3" 
                          fill="url(#leadGradient)" rx="1.5"/>
                    
                    <!-- Resistor body -->
                    <rect x="40" y="10" width="200" height="60" 
                          fill="url(#bodyGradient)" rx="8" stroke="#854d0e" stroke-width="1"/>
                    
                    <!-- Resistor bands -->
                    ${this.renderBands(40,200,60,12,r)}
                    
                    <!-- Gradients -->
                    <defs>
                        <linearGradient id="leadGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" style="stop-color:#94a3b8"/>
                            <stop offset="50%" style="stop-color:#64748b"/>
                            <stop offset="100%" style="stop-color:#94a3b8"/>
                        </linearGradient>
                        <linearGradient id="bodyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" style="stop-color:#f7d794"/>
                            <stop offset="20%" style="stop-color:#d4b472"/>
                            <stop offset="80%" style="stop-color:#d4b472"/>
                            <stop offset="100%" style="stop-color:#f7d794"/>
                        </linearGradient>
                    </defs>
                </svg>
            </div>
        `}renderSMDResistor(){return`
            <div style="background: linear-gradient(135deg, #1e293b, #0f172a); border-radius: 8px; padding: 1.5rem; text-align: center; min-width: 140px; min-height: 70px; display: flex; align-items: center; justify-content: center; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1); border: 1px solid var(--color-border);">
                <span id="smd-code" style="color: var(--color-text-main); font-family: var(--font-mono); font-size: 1.5rem; font-weight: 700; letter-spacing: 0.1em;">000</span>
            </div>
        `}renderBands(e,t,o,i,r){let s="";const l=e+20;for(let a=0;a<this.bandCount;a++){const n=this.bandCount===4&&a===3||this.bandCount===5&&a===4||this.bandCount===6&&a===5,c=this.bandCount===6&&a===5;let d;n?d=e+t-30:c?d=e+t-15:d=l+a*r;const p=this.currentColors[a]||"black",m=this.calculator.getColorValue(p);s+=`
                <rect x="${d}" y="15" width="${i}" height="${o-10}" 
                      fill="${m}" stroke="rgba(0,0,0,0.3)" stroke-width="1" rx="2"
                      class="resistor-band" data-band="${a}"/>
            `}return s}calculateBandSpacing(){return 120/Math.max(this.bandCount-1,1)}updateFromCalculation(e){e&&(e.colors&&(this.currentColors=e.colors),this.updateResult(e),this.mode!=="smd-calculator"?this.updateBandColors():this.updateSMDCode(e.smdCode||"000"),this.animateUpdate())}updateBandColors(){this.container.querySelectorAll(".resistor-band").forEach((t,o)=>{if(o<this.currentColors.length){const i=this.currentColors[o],r=this.calculator.getColorValue(i);t.setAttribute("fill",r)}})}updateSMDCode(e){const t=this.container.querySelector("#smd-code");t&&(t.textContent=e)}updateResult(e){const t=this.container.querySelector("#result-value"),o=this.container.querySelector("#result-details");t&&(t.textContent=e.formattedValue||"0 Ω"),o&&(o.textContent=e.details||"Calculation complete")}animateUpdate(){this.animationTimeout&&clearTimeout(this.animationTimeout);const e=this.container.querySelector("#resistance-result");e.classList.add("pulse-subtle"),this.animationTimeout=setTimeout(()=>{e.classList.remove("pulse-subtle")},1e3)}renderAdditionalInfo(){return this.mode==="smd-calculator"?`
                <div style="background: rgba(255,255,255,0.03); border: 1px solid var(--color-border); border-radius: 8px; padding: 1rem;">
                    <p style="font-size: 0.85rem; color: var(--color-text-secondary); line-height: 1.5;">
                        <strong style="color: var(--color-text-main);">SMD Codes:</strong> 3-digit codes where first two digits are significant figures 
                        and the third is the multiplier (number of zeros).
                    </p>
                </div>
            `:`
            <div style="display: flex; flex-direction: column; gap: 0.75rem; padding: 1rem; background: rgba(255,255,255,0.03); border-radius: 8px; border: 1px solid var(--color-border);">
                <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85rem;">
                    <span style="color: var(--color-text-muted); display: flex; align-items: center; gap: 0.5rem;">
                        <svg style="width: 14px; height: 14px;" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"></path>
                        </svg>
                        Precision:
                    </span>
                    <span style="font-weight: 600; color: var(--color-text-main);">${this.bandCount>=5?"High (3 digits)":"Standard (2 digits)"}</span>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85rem;">
                    <span style="color: var(--color-text-muted); display: flex; align-items: center; gap: 0.5rem;">
                        <svg style="width: 14px; height: 14px;" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                        </svg>
                        Tolerance:
                    </span>
                    <span style="font-weight: 600; color: var(--color-text-main);">±5% (typical)</span>
                </div>
                ${this.bandCount===6?`
                <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85rem;">
                    <span style="color: var(--color-text-muted); display: flex; align-items: center; gap: 0.5rem;">
                        <svg style="width: 14px; height: 14px;" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clip-rule="evenodd"></path>
                        </svg>
                        Temp. Coefficient:
                    </span>
                    <span style="font-weight: 600; color: var(--color-text-main);">Included</span>
                </div>
                `:""}
            </div>
        `}bindCopyButton(){const e=document.getElementById("copy-value-btn");e&&e.addEventListener("click",()=>this.copyValue())}copyValue(){const e=this.container.querySelector("#result-value");if(e){const t=e.textContent;navigator.clipboard.writeText(t).then(()=>{const o=document.getElementById("copy-value-btn"),i=o.innerHTML,r=o.getAttribute("style");o.style.borderColor="var(--color-primary)",o.style.color="var(--color-primary)",o.innerHTML=`
                    <svg style="width: 18px; height: 18px;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>Copied!</span>
                `,setTimeout(()=>{o.setAttribute("style",r),o.innerHTML=i},2e3)})}}handleResize(){this.render()}}class x{constructor(e,t,o){this.container=e,this.calculator=t,this.onUpdate=o,this.bandCount=4,this.selectedColors={}}init(){this.render(),this.bindEvents(),this.calculate()}setBandCount(e){this.bandCount=e,this.render(),this.bindEvents(),this.calculate()}render(){this.container.innerHTML=`
            <div class="card-glass slide-up">
                <h3 style="font-size: 1.1rem; font-weight: 600; color: var(--color-text-main); margin-bottom: 1.5rem; display: flex; align-items: center; gap: 0.75rem;">
                    <span style="display: flex; align-items: center; justify-content: center; width: 32px; height: 32px; background: rgba(0, 212, 255, 0.1); border-radius: 8px; color: var(--color-primary);">
                        <svg class="w-5 h-5" style="width: 20px; height: 20px;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v6a4 4 0 004 4h4a2 2 0 002-2V5z"></path>
                        </svg>
                    </span>
                    Color Code to Resistance
                </h3>
                
                <div style="display: flex; flex-direction: column; gap: 1.5rem;">
                    ${this.renderBandSelectors()}
                    
                    <div style="padding-top: 1rem; border-top: 1px solid var(--color-border);">
                        <button id="calculate-btn" class="btn-primary">
                            <span style="display: flex; align-items: center; justify-content: center; gap: 0.5rem;">
                                <svg style="width: 20px; height: 20px;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                                </svg>
                                Calculate Resistance
                            </span>
                        </button>
                    </div>
                    
                    <div id="calculation-steps" class="hidden" style="background: rgba(0,0,0,0.2); border: 1px solid var(--color-border); border-radius: 8px; padding: 1rem;">
                        <h4 style="font-weight: 600; color: var(--color-text-main); margin-bottom: 0.75rem; display: flex; align-items: center; gap: 0.5rem;">
                            <svg style="width: 16px; height: 16px; color: var(--color-primary);" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path>
                                <path fill-rule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clip-rule="evenodd"></path>
                            </svg>
                            Calculation Steps
                        </h4>
                        <div id="steps-content" style="font-family: var(--font-mono); font-size: 0.85rem; color: var(--color-text-secondary); display: flex; flex-direction: column; gap: 0.5rem;"></div>
                    </div>
                </div>
            </div>
        `}renderBandSelectors(){return this.getBandConfiguration().map((t,o)=>`
            <div class="control-group">
                <label class="control-label" style="display: flex; align-items: center; gap: 0.5rem;">
                    <span style="width: 20px; height: 20px; background: var(--color-bg-main); border: 1px solid var(--color-border); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.7rem;">${o+1}</span>
                    ${t.label}
                    ${t.required?'<span style="color: #ef4444;">*</span>':""}
                </label>
                <div style="position: relative;">
                    <select 
                        id="band-${o}" 
                        class="select-input"
                        ${t.required?"required":""}
                    >
                        ${this.renderColorOptions(t.type,o)}
                    </select>
                </div>
                <p style="font-size: 0.75rem; color: var(--color-text-muted); margin-top: 4px; display: flex; align-items: center; gap: 4px;">
                    <svg style="width: 10px; height: 10px;" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path>
                    </svg>
                    ${t.description}
                </p>
            </div>
        `).join("")}getBandConfiguration(){const e={3:[{label:"First Digit",type:"digit",required:!0,description:"First significant digit (1-9)"},{label:"Second Digit",type:"digit",required:!0,description:"Second significant digit (0-9)"},{label:"Multiplier",type:"multiplier",required:!0,description:"Number of zeros to add"}],4:[{label:"First Digit",type:"digit",required:!0,description:"First significant digit (1-9)"},{label:"Second Digit",type:"digit",required:!0,description:"Second significant digit (0-9)"},{label:"Multiplier",type:"multiplier",required:!0,description:"Number of zeros to add"},{label:"Tolerance",type:"tolerance",required:!0,description:"Precision of the resistor value"}],5:[{label:"First Digit",type:"digit",required:!0,description:"First significant digit (1-9)"},{label:"Second Digit",type:"digit",required:!0,description:"Second significant digit (0-9)"},{label:"Third Digit",type:"digit",required:!0,description:"Third significant digit (0-9)"},{label:"Multiplier",type:"multiplier",required:!0,description:"Number of zeros to add"},{label:"Tolerance",type:"tolerance",required:!0,description:"Precision of the resistor value"}],6:[{label:"First Digit",type:"digit",required:!0,description:"First significant digit (1-9)"},{label:"Second Digit",type:"digit",required:!0,description:"Second significant digit (0-9)"},{label:"Third Digit",type:"digit",required:!0,description:"Third significant digit (0-9)"},{label:"Multiplier",type:"multiplier",required:!0,description:"Number of zeros to add"},{label:"Tolerance",type:"tolerance",required:!0,description:"Precision of the resistor value"},{label:"Temperature Coefficient",type:"tempco",required:!1,description:"Temperature stability (optional)"}]};return e[this.bandCount]||e[4]}renderColorOptions(e,t){const o=this.calculator.getColorsForType(e);let i="";return e==="tempco"?i+='<option value="">Not specified</option>':i+='<option value="">Select color...</option>',o.forEach(r=>{const l=this.calculator.getColorData(r)[e],a=this.selectedColors[t]===r?"selected":"";let n=r.charAt(0).toUpperCase()+r.slice(1);e==="digit"?n+=` (${l})`:e==="multiplier"?n+=` (×${this.formatMultiplier(l)})`:e==="tolerance"?n+=` (±${l}%)`:e==="tempco"&&(n+=` (${l} ppm/°C)`),i+=`<option value="${r}" ${a} data-color="${this.calculator.getColorValue(r)}">${n}</option>`}),i}formatMultiplier(e){return e>=1e9?`${e/1e9}G`:e>=1e6?`${e/1e6}M`:e>=1e3?`${e/1e3}k`:(e<1,e.toString())}bindEvents(){for(let t=0;t<this.bandCount;t++){const o=this.container.querySelector(`#band-${t}`);o&&o.addEventListener("change",i=>{this.selectedColors[t]=i.target.value,this.calculate()})}const e=this.container.querySelector("#calculate-btn");e&&e.addEventListener("click",()=>{this.calculate(),this.showCalculationSteps()})}calculate(){const e=[];let t=!0;for(let i=0;i<this.bandCount;i++){const r=this.container.querySelector(`#band-${i}`);r&&r.value?e[i]=r.value:(i<this.bandCount-1||this.bandCount!==6)&&(t=!1)}if(!t){this.onUpdate({formattedValue:"0 Ω",details:"Select all required colors",colors:["black","black","black","brown"]});return}const o=this.calculator.calculateFromColors(e,this.bandCount);this.onUpdate({formattedValue:o.formattedValue,details:o.details,colors:e,calculation:o})}showCalculationSteps(){const e=this.container.querySelector("#calculation-steps"),t=this.container.querySelector("#steps-content");if(!e||!t)return;const o=[];for(let r=0;r<this.bandCount;r++){const s=this.container.querySelector(`#band-${r}`);s&&s.value&&(o[r]=s.value)}const i=this.calculator.getCalculationSteps(o,this.bandCount);t.innerHTML=i.map(r=>`
            <div style="display: flex; justify-content: space-between; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 0.5rem; margin-bottom: 0.5rem; last:border-bottom: 0;">
                <span style="color: var(--color-text-secondary);">${r.description}</span>
                <span style="font-family: var(--font-mono); color: var(--color-primary);">${r.value}</span>
            </div>
        `).join(""),e.classList.remove("hidden"),e.classList.add("slide-up")}}class w{constructor(e,t,o){this.container=e,this.calculator=t,this.onUpdate=o,this.preferredBandCount=4}init(){this.render(),this.bindEvents()}render(){this.container.innerHTML=`
            <div class="card-glass slide-up">
                <h3 style="font-size: 1.1rem; font-weight: 600; color: var(--color-text-main); margin-bottom: 1.5rem; display: flex; align-items: center; gap: 0.75rem;">
                    <span style="display: flex; align-items: center; justify-content: center; width: 32px; height: 32px; background: rgba(0, 212, 255, 0.1); border-radius: 8px; color: var(--color-primary);">
                        <svg style="width: 20px; height: 20px;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                        </svg>
                    </span>
                    Resistance to Color Code
                </h3>
                
                <div style="display: flex; flex-direction: column; gap: 1.5rem;">
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5rem;">
                        <div class="control-group">
                            <label class="control-label">
                                Resistance Value <span style="color: #ef4444;">*</span>
                            </label>
                            <input 
                                type="number" 
                                id="resistance-input" 
                                class="select-input" 
                                placeholder="e.g., 4.7, 100, 10000"
                                step="any"
                                min="0"
                            >
                            <p style="font-size: 0.75rem; color: var(--color-text-muted); margin-top: 4px;">Enter the resistance value</p>
                        </div>
                        
                        <div class="control-group">
                            <label class="control-label">Unit</label>
                            <div style="position: relative;">
                                <select id="unit-select" class="select-input">
                                    <option value="1">Ohms (Ω)</option>
                                    <option value="1000">Kiloohms (kΩ)</option>
                                    <option value="1000000">Megaohms (MΩ)</option>
                                    <option value="1000000000">Gigaohms (GΩ)</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    
                    <div class="control-group">
                        <label class="control-label">Preferred Tolerance</label>
                        <div style="position: relative;">
                            <select id="tolerance-select" class="select-input">
                                <option value="20">±20% (No band)</option>
                                <option value="10">±10% (Silver)</option>
                                <option value="5" selected>±5% (Gold)</option>
                                <option value="2">±2% (Red)</option>
                                <option value="1">±1% (Brown)</option>
                                <option value="0.5">±0.5% (Green)</option>
                                <option value="0.25">±0.25% (Blue)</option>
                                <option value="0.1">±0.1% (Violet)</option>
                                <option value="0.05">±0.05% (Grey)</option>
                            </select>
                        </div>
                    </div>
                    
                    <div class="control-group">
                        <label class="control-label">Preferred Band Count</label>
                        <div style="display: flex; gap: 0.75rem;">
                            <button data-bands="4" class="band-preference-btn active" style="flex: 1; padding: 0.625rem 1rem; border-radius: 4px; border: 1px solid var(--color-border); background: var(--color-bg-main); color: var(--color-text-secondary); cursor: pointer; transition: all 0.2s;">4-Band</button>
                            <button data-bands="5" class="band-preference-btn" style="flex: 1; padding: 0.625rem 1rem; border-radius: 4px; border: 1px solid var(--color-border); background: var(--color-bg-main); color: var(--color-text-secondary); cursor: pointer; transition: all 0.2s;">5-Band</button>
                        </div>
                        <style>
                            .band-preference-btn:hover {
                                border-color: var(--color-primary);
                                color: var(--color-text-main);
                            }
                            .band-preference-btn.active {
                                background: var(--color-primary);
                                color: #000;
                                border-color: var(--color-primary);
                                font-weight: 600;
                            }
                        </style>
                    </div>
                    
                    <div style="padding-top: 1rem; border-top: 1px solid var(--color-border);">
                        <button id="predict-btn" class="btn-primary">
                            Find Color Code
                        </button>
                    </div>
                    
                    <div id="prediction-results" class="hidden" style="display: flex; flex-direction: column; gap: 1rem;">
                        <div style="background: rgba(0, 255, 0, 0.05); border: 1px solid rgba(0, 255, 0, 0.2); border-radius: 8px; padding: 1rem;">
                            <h4 style="font-weight: 600; color: #4ade80; margin-bottom: 0.75rem; display: flex; align-items: center; gap: 0.5rem;">
                                <svg style="width: 20px; height: 20px;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                                Recommended Color Code:
                            </h4>
                            <div id="primary-result"></div>
                        </div>
                        
                        <div id="alternative-results" class="hidden" style="background: rgba(255, 255, 255, 0.03); border: 1px solid var(--color-border); border-radius: 8px; padding: 1rem;">
                            <h4 style="font-weight: 600; color: var(--color-primary); margin-bottom: 0.75rem; display: flex; align-items: center; gap: 0.5rem;">
                                <svg style="width: 20px; height: 20px;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                                </svg>
                                Alternative Options:
                            </h4>
                            <div id="alternatives-content" style="display: flex; flex-direction: column; gap: 0.5rem;"></div>
                        </div>
                        
                        <div id="accuracy-warning" class="hidden" style="background: rgba(234, 179, 8, 0.1); border: 1px solid rgba(234, 179, 8, 0.3); border-radius: 8px; padding: 1rem;">
                            <h4 style="font-weight: 600; color: #facc15; margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.5rem;">
                                <svg style="width: 20px; height: 20px;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                                </svg>
                                Accuracy Note:
                            </h4>
                            <p id="warning-content" style="font-size: 0.9rem; color: #fef08a; opacity: 0.9;"></p>
                        </div>
                    </div>
                </div>
            </div>
        `,this.updateBandPreferenceButtons()}bindEvents(){const e=this.container.querySelector("#resistance-input"),t=this.container.querySelector("#unit-select"),o=this.container.querySelector("#tolerance-select"),i=this.container.querySelector("#predict-btn");[e,t,o].forEach(r=>{r.addEventListener("input",()=>this.calculate()),r.addEventListener("change",()=>this.calculate())}),this.container.querySelectorAll(".band-preference-btn").forEach(r=>{r.addEventListener("click",s=>{this.preferredBandCount=parseInt(s.target.dataset.bands),this.updateBandPreferenceButtons(),this.calculate()})}),i.addEventListener("click",()=>{this.calculate(),this.showDetailedResults()}),e.addEventListener("keypress",r=>{r.key==="Enter"&&(this.calculate(),this.showDetailedResults())})}calculate(){const e=this.container.querySelector("#resistance-input"),t=this.container.querySelector("#unit-select"),o=this.container.querySelector("#tolerance-select"),i=parseFloat(e.value),r=parseFloat(t.value),s=parseFloat(o.value);if(isNaN(i)||i<=0){this.hideResults(),this.onUpdate({formattedValue:"0 Ω",details:"Enter valid resistance",colors:["black","black","black","brown"]});return}const l=i*r;try{const a=this.calculator.predictColors(l,s,this.preferredBandCount);a.success?(this.showBasicResult(a),this.onUpdate({formattedValue:a.formattedValue,details:`${a.bandCount}-band resistor code`,colors:a.colors,calculation:a})):(this.showError(a.error),this.onUpdate({formattedValue:"Error",details:a.error,colors:["black","black","black","brown"]}))}catch(a){console.error(a),this.showError("Calculation error")}}updateBandPreferenceButtons(){this.container.querySelectorAll(".band-preference-btn").forEach(e=>{const t=parseInt(e.dataset.bands)===this.preferredBandCount;e.classList.toggle("active",t)})}showBasicResult(e){const t=this.container.querySelector("#prediction-results"),o=this.container.querySelector("#primary-result");t&&o&&(o.innerHTML=`
                <div style="display: flex; align-items: center; gap: 1rem;">
                    <div style="display: flex; gap: 4px; padding: 0.5rem; background: rgba(0,0,0,0.3); border-radius: 6px; border: 1px solid var(--color-border);">
                        ${e.colors.map(i=>`
                            <div style="width: 20px; height: 32px; border-radius: 4px; border: 1px solid rgba(255,255,255,0.1); background-color: ${this.calculator.getColorValue(i)};" 
                                 title="${i}"></div>
                        `).join("")}
                    </div>
                    <div>
                        <p style="font-weight: 700; color: var(--color-text-main); font-size: 1.1rem;">${e.formattedValue}</p>
                        <p style="font-size: 0.85rem; color: var(--color-text-secondary);">${e.bandCount}-band resistor</p>
                    </div>
                </div>
            `,t.classList.remove("hidden"),t.classList.add("slide-up"))}showDetailedResults(){const e=this.container.querySelector("#resistance-input"),t=this.container.querySelector("#unit-select"),o=this.container.querySelector("#tolerance-select"),i=parseFloat(e.value),r=parseFloat(t.value),s=parseFloat(o.value);if(isNaN(i)||i<=0)return;const l=i*r,a=this.calculator.findAllPossibleColors(l,s);this.showAlternatives(a),this.showAccuracyWarning(a,l)}showAlternatives(e){const t=this.container.querySelector("#alternative-results"),o=this.container.querySelector("#alternatives-content");if(!t||!o||e.length<=1){t==null||t.classList.add("hidden");return}const i=e.slice(1,4);o.innerHTML=i.map(r=>`
            <div style="display: flex; align-items: center; justify-content: space-between; padding: 0.75rem; background: rgba(255,255,255,0.03); border-radius: 6px; border: 1px solid var(--color-border); transition: all 0.2s;">
                <div style="display: flex; align-items: center; gap: 0.75rem;">
                    <div style="display: flex; gap: 2px;">
                        ${r.colors.map(s=>`
                            <div style="width: 12px; height: 16px; border-radius: 2px; border: 1px solid rgba(255,255,255,0.1); background-color: ${this.calculator.getColorValue(s)};" 
                                 title="${s}"></div>
                        `).join("")}
                    </div>
                    <div>
                        <p style="font-size: 0.9rem; font-weight: 500; color: var(--color-text-main);">${r.formattedValue}</p>
                        <p style="font-size: 0.75rem; color: var(--color-text-muted);">${r.bandCount}-band</p>
                    </div>
                </div>
                <div style="text-align: right;">
                    <p style="font-size: 0.75rem; color: var(--color-text-muted);">Accuracy: <span style="color: var(--color-primary);">${r.accuracy}%</span></p>
                </div>
            </div>
        `).join(""),t.classList.remove("hidden")}showAccuracyWarning(e,t){const o=this.container.querySelector("#accuracy-warning"),i=this.container.querySelector("#warning-content");if(!o||!i||!e.length){o==null||o.classList.add("hidden");return}const r=e[0],s=Math.abs(r.calculatedValue-t)/t*100;s>1?(i.textContent=`The closest standard resistor value differs by ${s.toFixed(2)}% from your target value. Consider using a precision resistor or adjusting your circuit design.`,o.classList.remove("hidden")):o.classList.add("hidden")}showError(e){const t=this.container.querySelector("#prediction-results"),o=this.container.querySelector("#primary-result");t&&o&&(o.innerHTML=`
                <div style="color: #f87171; background: rgba(248, 113, 113, 0.1); padding: 0.75rem; border-radius: 6px; border: 1px solid rgba(248, 113, 113, 0.2);">
                    <p style="font-weight: 600; display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.25rem;">
                        <svg style="width: 20px; height: 20px;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        Cannot determine color code
                    </p>
                    <p style="font-size: 0.9rem; opacity: 0.9;">${e||"This value cannot be represented with standard resistor colors."}</p>
                </div>
            `,t.classList.remove("hidden"))}hideResults(){const e=this.container.querySelector("#prediction-results");e==null||e.classList.add("hidden")}}class C{constructor(e,t,o){this.container=e,this.calculator=t,this.onUpdate=o,this.codeType="3-digit",this.currentMode="code-to-resistance"}init(){this.render(),this.bindEvents()}render(){this.container.innerHTML=`
            <div class="card-glass slide-up">
                <h3 style="font-size: 1.1rem; font-weight: 600; color: var(--color-text-main); margin-bottom: 1.5rem; display: flex; align-items: center; gap: 0.75rem;">
                    <span style="display: flex; align-items: center; justify-content: center; width: 32px; height: 32px; background: rgba(0, 212, 255, 0.1); border-radius: 8px; color: var(--color-primary);">
                        <svg style="width: 20px; height: 20px;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"></path>
                        </svg>
                    </span>
                    SMD Resistor Calculator
                </h3>
                
                <div style="display: flex; flex-direction: column; gap: 1.5rem;">
                    <!-- Mode Selection -->
                    <div>
                        <label class="control-label" style="margin-bottom: 0.75rem;">Calculation Mode</label>
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                            <button id="code-to-resistance" class="mode-btn active" style="padding: 1rem; border-radius: 8px; border: 1px solid var(--color-border); background: var(--color-bg-card); cursor: pointer; transition: all 0.2s; display: flex; flex-direction: column; align-items: center; text-align: center;">
                                <div style="font-size: 1rem; font-weight: 600; margin-bottom: 0.25rem; color: var(--color-text-main);">Code → Resistance</div>
                                <div style="font-size: 0.8rem; color: var(--color-text-secondary);">Decode SMD markings</div>
                            </button>
                            <button id="resistance-to-code" class="mode-btn" style="padding: 1rem; border-radius: 8px; border: 1px solid var(--color-border); background: var(--color-bg-card); cursor: pointer; transition: all 0.2s; display: flex; flex-direction: column; align-items: center; text-align: center;">
                                <div style="font-size: 1rem; font-weight: 600; margin-bottom: 0.25rem; color: var(--color-text-main);">Resistance → Code</div>
                                <div style="font-size: 0.8rem; color: var(--color-text-secondary);">Find SMD marking</div>
                            </button>
                        </div>
                    </div>

                    <!-- Code Type Selection -->
                    <div>
                        <label class="control-label">SMD Code Type</label>
                        <div style="position: relative;">
                            <select id="code-type-select" class="select-input">
                                <option value="3-digit">3-Digit Code (e.g., 472)</option>
                                <option value="4-digit">4-Digit Code (e.g., 4702)</option>
                                <option value="eia-96">EIA-96 Code (e.g., 01A)</option>
                            </select>
                        </div>
                    </div>

                    <!-- Code to Resistance Section -->
                    <div id="code-to-resistance-section" style="display: flex; flex-direction: column; gap: 1rem;">
                        <div>
                            <label class="control-label">
                                SMD Code <span style="color: #ef4444;">*</span>
                            </label>
                            <input 
                                type="text" 
                                id="smd-code-input" 
                                class="select-input" 
                                style="font-family: var(--font-mono); text-align: center; font-size: 1.25rem; letter-spacing: 0.1em; text-transform: uppercase;"
                                placeholder="e.g., 472, 4702, 01A"
                                maxlength="4"
                            >
                            <p id="code-help-text" style="font-size: 0.75rem; color: var(--color-text-muted); margin-top: 4px;">Enter the code printed on the SMD resistor</p>
                        </div>
                    </div>

                    <!-- Resistance to Code Section -->
                    <div id="resistance-to-code-section" class="hidden" style="display: flex; flex-direction: column; gap: 1rem;">
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                            <div>
                                <label class="control-label">
                                    Resistance Value <span style="color: #ef4444;">*</span>
                                </label>
                                <input 
                                    type="number" 
                                    id="smd-resistance-input" 
                                    class="select-input" 
                                    placeholder="e.g., 4.7"
                                    step="any"
                                    min="0"
                                >
                            </div>
                            
                            <div>
                                <label class="control-label">Unit</label>
                                <div style="position: relative;">
                                    <select id="smd-unit-select" class="select-input">
                                        <option value="1">Ohms (Ω)</option>
                                        <option value="1000">Kiloohms (kΩ)</option>
                                        <option value="1000000">Megaohms (MΩ)</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Calculate Button -->
                    <div style="padding-top: 1rem; border-top: 1px solid var(--color-border);">
                        <button id="smd-calculate-btn" class="btn-primary">
                            Calculate
                        </button>
                    </div>

                    <!-- Results Section -->
                    <div id="smd-results" class="hidden slide-up" style="background: rgba(0,0,0,0.2); border: 1px solid var(--color-border); border-radius: 8px; padding: 1rem;">
                        <div id="smd-result-content"></div>
                    </div>

                    <!-- SMD Code Reference -->
                    <div style="background: rgba(255,255,255,0.03); border: 1px solid var(--color-border); border-radius: 8px; padding: 1rem;">
                        <h4 style="font-weight: 600; color: var(--color-text-main); margin-bottom: 0.75rem; display: flex; align-items: center; gap: 0.5rem;">
                            <svg style="width: 16px; height: 16px; color: var(--color-primary);" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                            SMD Code Reference
                        </h4>
                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 1rem; font-size: 0.85rem;">
                            <div style="padding: 0.75rem; background: rgba(0,0,0,0.2); border-radius: 6px; border: 1px solid var(--color-border);">
                                <h5 style="color: var(--color-primary); font-weight: 500; margin-bottom: 0.5rem;">3-Digit Codes</h5>
                                <p style="color: var(--color-text-secondary); font-size: 0.75rem;">First two digits are significant figures, third digit is multiplier.</p>
                                <p style="color: var(--color-text-muted); font-size: 0.75rem; margin-top: 0.5rem; font-family: var(--font-mono);">Ex: 472 = 4.7kΩ</p>
                            </div>
                            <div style="padding: 0.75rem; background: rgba(0,0,0,0.2); border-radius: 6px; border: 1px solid var(--color-border);">
                                <h5 style="color: var(--color-primary); font-weight: 500; margin-bottom: 0.5rem;">4-Digit Codes</h5>
                                <p style="color: var(--color-text-secondary); font-size: 0.75rem;">First three digits are significant figures, fourth digit is multiplier.</p>
                                <p style="color: var(--color-text-muted); font-size: 0.75rem; margin-top: 0.5rem; font-family: var(--font-mono);">Ex: 4702 = 47kΩ</p>
                            </div>
                            <div style="padding: 0.75rem; background: rgba(0,0,0,0.2); border-radius: 6px; border: 1px solid var(--color-border);">
                                <h5 style="color: var(--color-primary); font-weight: 500; margin-bottom: 0.5rem;">EIA-96 Codes</h5>
                                <p style="color: var(--color-text-secondary); font-size: 0.75rem;">Two digits + letter code for high precision (1%).</p>
                                <p style="color: var(--color-text-muted); font-size: 0.75rem; margin-top: 0.5rem; font-family: var(--font-mono);">Ex: 01A = 100Ω</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `,this.updateButtonStyles()}bindEvents(){const e=this.container.querySelector("#code-to-resistance"),t=this.container.querySelector("#resistance-to-code");e.addEventListener("click",()=>this.setMode("code-to-resistance")),t.addEventListener("click",()=>this.setMode("resistance-to-code")),this.container.querySelector("#code-type-select").addEventListener("change",a=>{this.codeType=a.target.value,this.updateCodeHelp(),this.calculate()});const i=this.container.querySelector("#smd-code-input"),r=this.container.querySelector("#smd-resistance-input"),s=this.container.querySelector("#smd-unit-select");i.addEventListener("input",()=>this.calculate()),r.addEventListener("input",()=>this.calculate()),s.addEventListener("change",()=>this.calculate()),this.container.querySelector("#smd-calculate-btn").addEventListener("click",()=>this.calculate()),i.addEventListener("keypress",a=>{a.key==="Enter"&&this.calculate()}),r.addEventListener("keypress",a=>{a.key==="Enter"&&this.calculate()})}setMode(e){const t=this.container.querySelector("#code-to-resistance-section"),o=this.container.querySelector("#resistance-to-code-section");e==="code-to-resistance"?(t.classList.remove("hidden"),o.classList.add("hidden")):(o.classList.remove("hidden"),t.classList.add("hidden")),this.currentMode=e,this.updateButtonStyles(),this.calculate()}updateButtonStyles(){const e=this.container.querySelector("#code-to-resistance"),t=this.container.querySelector("#resistance-to-code");[e,t].forEach(o=>{const i=o.id===this.currentMode;o.classList.toggle("active",i),i?(o.style.borderColor="var(--color-primary)",o.style.boxShadow="0 0 10px rgba(0, 212, 255, 0.2)",o.querySelector("div:first-child").style.color="#fff"):(o.style.borderColor="var(--color-border)",o.style.boxShadow="none",o.querySelector("div:first-child").style.color="var(--color-text-main)")})}updateCodeHelp(){const e=this.container.querySelector("#code-help-text"),t=this.container.querySelector("#smd-code-input"),o={"3-digit":"Enter 3-digit code (e.g., 472 for 4.7kΩ)","4-digit":"Enter 4-digit code (e.g., 4702 for 47kΩ)","eia-96":"Enter EIA-96 code (e.g., 01A for 100Ω)"},i={"3-digit":"472","4-digit":"4702","eia-96":"01A"};e&&t&&(e.textContent=o[this.codeType],t.placeholder=i[this.codeType],t.maxLength=this.codeType==="eia-96"?3:this.codeType==="4-digit"?4:3)}calculate(){this.currentMode==="code-to-resistance"?this.calculateFromCode():this.calculateFromResistance()}calculateFromCode(){const t=this.container.querySelector("#smd-code-input").value.trim().toUpperCase();if(!t){this.hideResults(),this.onUpdate({formattedValue:"0 Ω",details:"Enter SMD code",smdCode:"000"});return}const o=this.calculator.decodeSMD(t,this.codeType);o.success?(this.showResult({title:"Decoded Resistance",content:`
                    <div style="text-align: center;">
                        <p style="font-size: 2rem; font-weight: 700; color: #fff; margin-bottom: 0.5rem; letter-spacing: -0.02em;">${o.formattedValue}</p>
                        <p style="font-size: 0.85rem; color: var(--color-text-secondary); margin-bottom: 1rem;">${o.details}</p>
                        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.5rem; font-size: 0.75rem; border-top: 1px solid var(--color-border); padding-top: 0.75rem;">
                            <div>
                                <span style="display: block; color: var(--color-text-muted); text-transform: uppercase; font-size: 0.65rem; letter-spacing: 0.05em;">Code</span>
                                <span style="font-family: var(--font-mono); color: var(--color-text-main);">${t}</span>
                            </div>
                            <div>
                                <span style="display: block; color: var(--color-text-muted); text-transform: uppercase; font-size: 0.65rem; letter-spacing: 0.05em;">Type</span>
                                <span style="color: var(--color-text-main);">${this.codeType}</span>
                            </div>
                            <div>
                                <span style="display: block; color: var(--color-text-muted); text-transform: uppercase; font-size: 0.65rem; letter-spacing: 0.05em;">Calc</span>
                                <span style="font-family: var(--font-mono); color: var(--color-text-main);">${o.calculation}</span>
                            </div>
                        </div>
                    </div>
                `}),this.onUpdate({formattedValue:o.formattedValue,details:o.details,smdCode:t})):(this.showResult({title:"Error",content:`
                    <div style="display: flex; align-items: center; gap: 0.75rem; color: #f87171; background: rgba(248, 113, 113, 0.1); padding: 0.75rem; border-radius: 6px; border: 1px solid rgba(248, 113, 113, 0.2);">
                        <svg style="width: 20px; height: 20px; flex-shrink: 0;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <p style="font-size: 0.9rem; font-weight: 500;">${o.error}</p>
                    </div>
                `}),this.onUpdate({formattedValue:"Invalid",details:o.error,smdCode:t}))}calculateFromResistance(){const e=this.container.querySelector("#smd-resistance-input"),t=this.container.querySelector("#smd-unit-select"),o=parseFloat(e.value),i=parseFloat(t.value);if(isNaN(o)||o<=0){this.hideResults(),this.onUpdate({formattedValue:"0 Ω",details:"Enter resistance value",smdCode:"000"});return}const r=o*i,s=this.calculator.encodeSMD(r,this.codeType);s.success?(this.showResult({title:"SMD Code",content:`
                    <div style="text-align: center;">
                        <div style="display: inline-block; background: #0f172a; color: #fff; padding: 0.75rem 2rem; border-radius: 6px; font-family: var(--font-mono); font-size: 1.5rem; font-weight: 700; margin-bottom: 0.75rem; border: 1px solid var(--color-border); box-shadow: inset 0 2px 4px rgba(0,0,0,0.3);">
                            ${s.code}
                        </div>
                        <p style="font-size: 0.85rem; color: var(--color-text-secondary); margin-bottom: 1rem;">${s.details}</p>
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; font-size: 0.75rem; border-top: 1px solid var(--color-border); padding-top: 0.75rem;">
                            <div>
                                <span style="display: block; color: var(--color-text-muted); text-transform: uppercase; font-size: 0.65rem; letter-spacing: 0.05em;">Input</span>
                                <span style="font-family: var(--font-mono); color: var(--color-text-main);">${this.calculator.formatResistance(r)}</span>
                            </div>
                            <div>
                                <span style="display: block; color: var(--color-text-muted); text-transform: uppercase; font-size: 0.65rem; letter-spacing: 0.05em;">Actual</span>
                                <span style="font-family: var(--font-mono); color: var(--color-text-main);">${s.formattedValue}</span>
                            </div>
                        </div>
                    </div>
                `}),this.onUpdate({formattedValue:s.formattedValue,details:s.details,smdCode:s.code})):(this.showResult({title:"Error",content:`
                    <div style="display: flex; align-items: center; gap: 0.75rem; color: #f87171; background: rgba(248, 113, 113, 0.1); padding: 0.75rem; border-radius: 6px; border: 1px solid rgba(248, 113, 113, 0.2);">
                        <svg style="width: 20px; height: 20px; flex-shrink: 0;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <p style="font-size: 0.9rem; font-weight: 500;">${s.error}</p>
                    </div>
                `}),this.onUpdate({formattedValue:"Invalid",details:s.error,smdCode:"000"}))}showResult(e){const t=this.container.querySelector("#smd-results"),o=this.container.querySelector("#smd-result-content");t&&o&&(o.innerHTML=`
                <h5 style="font-weight: 600; color: var(--color-text-main); margin-bottom: 0.75rem; display: flex; align-items: center; gap: 0.5rem;">
                    <svg style="width: 16px; height: 16px; color: var(--color-primary);" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    ${e.title}
                </h5>
                ${e.content}
            `,t.classList.remove("hidden"),t.classList.add("slide-up"))}hideResults(){const e=this.container.querySelector("#smd-results");e==null||e.classList.add("hidden")}}class k{constructor(e){this.container=e}init(){this.render()}render(){this.container.innerHTML=`
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
        `}}class M{constructor(e){this.container=e}init(){this.render()}render(){this.container.innerHTML=`
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
        `}renderColorRows(){return[{name:"Black",hex:"#000000",digit:"0",mult:"1Ω",tol:"-"},{name:"Brown",hex:"#8B4513",digit:"1",mult:"10Ω",tol:"±1%"},{name:"Red",hex:"#FF0000",digit:"2",mult:"100Ω",tol:"±2%"},{name:"Orange",hex:"#FFA500",digit:"3",mult:"1kΩ",tol:"-"},{name:"Yellow",hex:"#FFFF00",digit:"4",mult:"10kΩ",tol:"-"},{name:"Green",hex:"#008000",digit:"5",mult:"100kΩ",tol:"±0.5%"},{name:"Blue",hex:"#0000FF",digit:"6",mult:"1MΩ",tol:"±0.25%"},{name:"Violet",hex:"#8A2BE2",digit:"7",mult:"10MΩ",tol:"±0.1%"},{name:"Grey",hex:"#808080",digit:"8",mult:"-",tol:"±0.05%"},{name:"White",hex:"#FFFFFF",digit:"9",mult:"-",tol:"-"},{name:"Gold",hex:"#FFD700",digit:"-",mult:"0.1Ω",tol:"±5%"},{name:"Silver",hex:"#C0C0C0",digit:"-",mult:"0.01Ω",tol:"±10%"}].map(t=>`
            <tr style="border-bottom: 1px solid rgba(255,255,255,0.03);">
                <td style="padding: 0.75rem 1rem;">
                    <div style="display: flex; align-items: center; gap: 0.5rem;">
                        <div style="width: 16px; height: 16px; border-radius: 3px; background-color: ${t.hex}; border: 1px solid rgba(255,255,255,0.1);"></div>
                        <span style="color: var(--color-text-main); font-size: 0.9rem;">${t.name}</span>
                    </div>
                </td>
                <td style="padding: 0.75rem 1rem; color: var(--color-text-muted); font-family: var(--font-mono);">${t.digit}</td>
                <td style="padding: 0.75rem 1rem; color: var(--color-text-muted); font-family: var(--font-mono);">${t.mult}</td>
                <td style="padding: 0.75rem 1rem; color: var(--color-text-muted); font-family: var(--font-mono);">${t.tol}</td>
            </tr>
        `).join("")}}class S{constructor(e){this.container=e}init(){this.render()}render(){this.container.innerHTML=`
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
        `}}class z{constructor(e){this.container=e}init(){this.render()}render(){this.container.innerHTML=`
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
                            href="https://github.com/Rsmk27/colorohm-reactapp/releases/download/v1.0.0/ColorOhm-v1.0.0.apk"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="apk-download-btn"
                        >
                            Download APK (v1.0.0)
                        </a>
                        <span style="font-size: 0.88rem; color: var(--color-text-muted);">Direct download from GitHub Releases</span>
                    </div>
                </div>
            </div>
        `}}class B{constructor(e,t){this.container=e,this.calculator=t,this.currentMode="color-to-resistance",this.currentBandCount=4,this.components={}}init(){this.render(),this.bindEvents(),this.updateDisplay()}render(){this.container.innerHTML=`
            <div class="app-container">
                <div id="header" class="header-section"></div>
                
                <main class="main-content">
                    <!-- Home/Calculator View -->
                    <div id="home-view" class="view-section">
                        <div id="mode-selector" class="mode-selector-section"></div>
                        
                        <div class="calculator-grid">
                            <div class="calculator-panel">
                                <div id="calculator-container" class="calculator-stack">
                                    <div id="color-to-resistance" class="calculator-section"></div>
                                    <div id="resistance-to-color" class="calculator-section hidden"></div>
                                    <div id="smd-calculator" class="calculator-section hidden"></div>
                                </div>
                            </div>
                            
                            <div class="display-panel">
                                <div id="resistor-display" class="resistor-display-wrapper"></div>
                            </div>
                        </div>
                    </div>

                    <!-- Docs View -->
                    <div id="docs-view" class="view-section hidden"></div>

                    <!-- About View -->
                    <div id="about-view" class="view-section hidden"></div>

                    <!-- Android App View -->
                    <div id="app-view" class="view-section hidden"></div>
                </main>
                
                <div id="footer" class="footer-section"></div>
            </div>
        `,this.initializeComponents()}initializeComponents(){this.components.header=new f(document.getElementById("header"),this.handleNavigation.bind(this)),this.components.modeSelector=new y(document.getElementById("mode-selector"),this.handleModeChange.bind(this)),this.components.resistorDisplay=new b(document.getElementById("resistor-display"),this.calculator),this.components.colorToResistance=new x(document.getElementById("color-to-resistance"),this.calculator,this.handleCalculationUpdate.bind(this)),this.components.resistanceToColor=new w(document.getElementById("resistance-to-color"),this.calculator,this.handleCalculationUpdate.bind(this)),this.components.smdCalculator=new C(document.getElementById("smd-calculator"),this.calculator,this.handleCalculationUpdate.bind(this)),this.components.footer=new k(document.getElementById("footer")),this.components.docs=new M(document.getElementById("docs-view")),this.components.about=new S(document.getElementById("about-view")),this.components.androidApp=new z(document.getElementById("app-view")),Object.values(this.components).forEach(e=>{e.init&&e.init()})}handleModeChange(e,t=null){this.currentMode=e,t&&(this.currentBandCount=t),document.querySelectorAll(".calculator-section").forEach(i=>{i.classList.add("hidden")});const o=document.getElementById(e);o&&(o.classList.remove("hidden"),o.classList.add("fade-in")),this.components.resistorDisplay&&this.components.resistorDisplay.setMode(e,this.currentBandCount),this.components.colorToResistance&&typeof this.components.colorToResistance.setBandCount=="function"&&this.components.colorToResistance.setBandCount(this.currentBandCount),this.updateDisplay()}handleCalculationUpdate(e){this.components.resistorDisplay.updateFromCalculation(e);const t=document.getElementById("resistor-display");t.classList.add("pulse-subtle"),setTimeout(()=>{t.classList.remove("pulse-subtle")},300)}updateDisplay(){const t={"color-to-resistance":"colorToResistance","resistance-to-color":"resistanceToColor","smd-calculator":"smdCalculator"}[this.currentMode],o=this.components[t];o&&o.calculate&&o.calculate()}bindEvents(){let e;window.addEventListener("resize",()=>{clearTimeout(e),e=setTimeout(()=>{this.handleResize()},250)}),document.addEventListener("keydown",t=>{if(t.ctrlKey||t.metaKey)switch(t.key){case"1":t.preventDefault(),this.handleModeChange("color-to-resistance");break;case"2":t.preventDefault(),this.handleModeChange("resistance-to-color");break;case"3":t.preventDefault(),this.handleModeChange("smd-calculator");break}})}handleResize(){Object.values(this.components).forEach(e=>{e.handleResize&&e.handleResize()})}handleNavigation(e){["home-view","docs-view","about-view","app-view"].forEach(i=>{const r=document.getElementById(i);r&&r.classList.add("hidden")});const t=`${e}-view`,o=document.getElementById(t);o&&(o.classList.remove("hidden"),o.classList.remove("fade-in"),o.offsetWidth,o.classList.add("fade-in"))}}class E{constructor(){this.colorCodes={black:{digit:0,multiplier:1,tolerance:null,tempco:250,color:"#000000"},brown:{digit:1,multiplier:10,tolerance:1,tempco:100,color:"#8B4513"},red:{digit:2,multiplier:100,tolerance:2,tempco:50,color:"#FF0000"},orange:{digit:3,multiplier:1e3,tolerance:null,tempco:15,color:"#FFA500"},yellow:{digit:4,multiplier:1e4,tolerance:null,tempco:25,color:"#FFFF00"},green:{digit:5,multiplier:1e5,tolerance:.5,tempco:20,color:"#008000"},blue:{digit:6,multiplier:1e6,tolerance:.25,tempco:10,color:"#0000FF"},violet:{digit:7,multiplier:1e7,tolerance:.1,tempco:5,color:"#8A2BE2"},grey:{digit:8,multiplier:1e8,tolerance:.05,tempco:1,color:"#808080"},white:{digit:9,multiplier:1e9,tolerance:null,tempco:null,color:"#FFFFFF"},gold:{digit:null,multiplier:.1,tolerance:5,tempco:null,color:"#FFD700"},silver:{digit:null,multiplier:.01,tolerance:10,tempco:null,color:"#C0C0C0"},none:{digit:null,multiplier:null,tolerance:20,tempco:null,color:"#F5F5F5"}},this.eia96Values={"01":100,"02":102,"03":105,"04":107,"05":110,"06":113,"07":115,"08":118,"09":121,10:124,11:127,12:130,13:133,14:137,15:140,16:143,17:147,18:150,19:154,20:158,21:162,22:165,23:169,24:174,25:178,26:182,27:187,28:191,29:196,30:200,31:205,32:210,33:215,34:221,35:226,36:232,37:237,38:243,39:249,40:255,41:261,42:267,43:274,44:280,45:287,46:294,47:301,48:309,49:316,50:324,51:332,52:340,53:348,54:357,55:365,56:374,57:383,58:392,59:402,60:412,61:422,62:432,63:442,64:453,65:464,66:475,67:487,68:499,69:511,70:523,71:536,72:549,73:562,74:576,75:590,76:604,77:619,78:634,79:649,80:665,81:681,82:698,83:715,84:732,85:750,86:768,87:787,88:806,89:825,90:845,91:866,92:887,93:909,94:931,95:953,96:976},this.eia96Multipliers={Z:.001,Y:.01,X:.1,A:1,B:10,C:100,D:1e3,E:1e4,F:1e5,G:1e6,H:1e7},this.standardValues={E12:[1,1.2,1.5,1.8,2.2,2.7,3.3,3.9,4.7,5.6,6.8,8.2],E24:[1,1.1,1.2,1.3,1.5,1.6,1.8,2,2.2,2.4,2.7,3,3.3,3.6,3.9,4.3,4.7,5.1,5.6,6.2,6.8,7.5,8.2,9.1],E96:[1,1.02,1.05,1.07,1.1,1.13,1.15,1.18,1.21,1.24,1.27,1.3,1.33,1.37,1.4,1.43,1.47,1.5,1.54,1.58,1.62,1.65,1.69,1.74,1.78,1.82,1.87,1.91,1.96,2,2.05,2.1,2.15,2.21,2.26,2.32,2.37,2.43,2.49,2.55,2.61,2.67,2.74,2.8,2.87,2.94,3.01,3.09,3.16,3.24,3.32,3.4,3.48,3.57,3.65,3.74,3.83,3.92,4.02,4.12,4.22,4.32,4.42,4.53,4.64,4.75,4.87,4.99,5.11,5.23,5.36,5.49,5.62,5.76,5.9,6.04,6.19,6.34,6.49,6.65,6.81,6.98,7.15,7.32,7.5,7.68,7.87,8.06,8.25,8.45,8.66,8.87,9.09,9.31,9.53,9.76]}}getColorData(e){return this.colorCodes[e]||this.colorCodes.black}getColorValue(e){return this.getColorData(e).color}getColorsForType(e){return Object.keys(this.colorCodes).filter(t=>this.colorCodes[t][e]!==null&&this.colorCodes[t][e]!==void 0)}calculateFromColors(e,t){try{let o="",i=1,r=20,s=null;const l=t>=5?3:2;for(let p=0;p<l;p++)if(e[p]&&this.colorCodes[e[p]]){const m=this.colorCodes[e[p]].digit;m!==null&&(o+=m.toString())}const a=e[l];a&&this.colorCodes[a]&&(i=this.colorCodes[a].multiplier||1);const n=e[l+1];if(n&&this.colorCodes[n]&&(r=this.colorCodes[n].tolerance||20),t===6){const p=e[5];p&&this.colorCodes[p]&&(s=this.colorCodes[p].tempco)}const c=parseInt(o)||0,d=c*i;return{value:d,formattedValue:this.formatResistance(d)+` ±${r}%`,details:`${t}-band resistor${s?` (${s} ppm/°C)`:""}`,tolerance:r,tempco:s,calculation:`${c} × ${i} = ${d}Ω`}}catch{return{value:0,formattedValue:"Error",details:"Invalid color combination",tolerance:20,tempco:null,calculation:"Error in calculation"}}}getCalculationSteps(e,t){var c;const o=[],i=t>=5?3:2;let r="";for(let d=0;d<i;d++)if(e[d]&&this.colorCodes[e[d]]){const p=this.colorCodes[e[d]].digit;p!==null&&(r+=p.toString(),o.push({description:`Band ${d+1} (${e[d]})`,value:p.toString()}))}const s=e[i];if(s&&this.colorCodes[s]){const d=this.colorCodes[s].multiplier||1;o.push({description:`Multiplier (${s})`,value:`×${d}`})}const l=parseInt(r)||0,a=((c=this.colorCodes[s])==null?void 0:c.multiplier)||1,n=l*a;return o.push({description:"Final Result",value:this.formatResistance(n)}),o}predictColors(e,t,o=4){try{const i=this.findAllPossibleColors(e,t);if(i.length===0)return{success:!1,error:"Cannot represent this value with standard resistor colors"};const r=i.filter(l=>l.bandCount===o);return{success:!0,...r.length>0?r[0]:i[0]}}catch(i){return{success:!1,error:"Error in calculation: "+i.message}}}findAllPossibleColors(e,t){const o=[],i=Object.keys(this.colorCodes).filter(r=>this.colorCodes[r].multiplier!==null).map(r=>({color:r,value:this.colorCodes[r].multiplier})).sort((r,s)=>s.value-r.value);for(const r of[4,5]){const s=r===5?3:2;for(const l of i){const a=e/l.value;if(a>=Math.pow(10,s-1)&&a<Math.pow(10,s)){const n=Math.round(a),c=n.toString().padStart(s,"0"),d=[];let p=!0;for(let m=0;m<s;m++){const h=parseInt(c[m]),g=Object.keys(this.colorCodes).find(v=>this.colorCodes[v].digit===h);if(!g){p=!1;break}d.push(g)}if(p){d.push(l.color);const m=this.findBestToleranceColor(t);d.push(m);const h=n*l.value,g=100-Math.abs(h-e)/e*100;o.push({colors:d,bandCount:r,calculatedValue:h,formattedValue:this.formatResistance(h)+` ±${t}%`,details:`${r}-band resistor`,accuracy:g.toFixed(2)})}}}}return o.sort((r,s)=>parseFloat(s.accuracy)-parseFloat(r.accuracy))}findBestToleranceColor(e){const t=Object.keys(this.colorCodes).filter(r=>this.colorCodes[r].tolerance!==null);let o="brown",i=1/0;for(const r of t){const s=this.colorCodes[r].tolerance,l=Math.abs(s-e);l<i&&(i=l,o=r)}return o}decodeSMD(e,t){try{switch(t){case"3-digit":return this.decode3DigitSMD(e);case"4-digit":return this.decode4DigitSMD(e);case"eia-96":return this.decodeEIA96SMD(e);default:return{success:!1,error:"Unknown code type"}}}catch{return{success:!1,error:"Invalid SMD code format"}}}decode3DigitSMD(e){if(!/^\d{3}$/.test(e))return{success:!1,error:"Invalid 3-digit code format"};const t=parseInt(e.substring(0,2)),o=parseInt(e.substring(2,3)),i=Math.pow(10,o),r=t*i;return{success:!0,value:r,formattedValue:this.formatResistance(r),details:"3-digit SMD code",calculation:`${t} × 10^${o} = ${r}Ω`}}decode4DigitSMD(e){if(!/^\d{4}$/.test(e))return{success:!1,error:"Invalid 4-digit code format"};const t=parseInt(e.substring(0,3)),o=parseInt(e.substring(3,4)),i=Math.pow(10,o),r=t*i;return{success:!0,value:r,formattedValue:this.formatResistance(r),details:"4-digit SMD code (high precision)",calculation:`${t} × 10^${o} = ${r}Ω`}}decodeEIA96SMD(e){if(!/^\d{2}[A-Z]$/.test(e))return{success:!1,error:"Invalid EIA-96 code format (should be like 01A)"};const t=e.substring(0,2),o=e.substring(2,3);if(!this.eia96Values[t])return{success:!1,error:"Invalid EIA-96 value code"};if(!this.eia96Multipliers[o])return{success:!1,error:"Invalid EIA-96 multiplier code"};const i=this.eia96Values[t],r=this.eia96Multipliers[o],s=i*r;return{success:!0,value:s,formattedValue:this.formatResistance(s)+" ±1%",details:"EIA-96 SMD code (1% tolerance)",calculation:`${i} × ${r} = ${s}Ω`}}encodeSMD(e,t){try{switch(t){case"3-digit":return this.encode3DigitSMD(e);case"4-digit":return this.encode4DigitSMD(e);case"eia-96":return this.encodeEIA96SMD(e);default:return{success:!1,error:"Unknown code type"}}}catch{return{success:!1,error:"Cannot encode this resistance value"}}}encode3DigitSMD(e){let t=null,o=1/0;for(let r=0;r<=9;r++){const s=Math.pow(10,r),l=e/s;if(l>=10&&l<100){const a=Math.round(l),n=a*s,c=Math.abs(n-e);c<o&&(o=c,t={code:a.toString()+r.toString(),calculatedValue:n,multiplierPower:r})}}if(!t)return{success:!1,error:"Value cannot be represented with 3-digit SMD code"};const i=100-o/e*100;return{success:!0,code:t.code,value:t.calculatedValue,formattedValue:this.formatResistance(t.calculatedValue),details:"3-digit SMD code",accuracy:i.toFixed(2)}}encode4DigitSMD(e){let t=null,o=1/0;for(let r=0;r<=9;r++){const s=Math.pow(10,r),l=e/s;if(l>=100&&l<1e3){const a=Math.round(l),n=a*s,c=Math.abs(n-e);c<o&&(o=c,t={code:a.toString()+r.toString(),calculatedValue:n,multiplierPower:r})}}if(!t)return{success:!1,error:"Value cannot be represented with 4-digit SMD code"};const i=100-o/e*100;return{success:!0,code:t.code,value:t.calculatedValue,formattedValue:this.formatResistance(t.calculatedValue),details:"4-digit SMD code (high precision)",accuracy:i.toFixed(2)}}encodeEIA96SMD(e){let t=null,o=1/0;for(const[r,s]of Object.entries(this.eia96Values))for(const[l,a]of Object.entries(this.eia96Multipliers)){const n=s*a,c=Math.abs(n-e);c<o&&(o=c,t={code:r+l,calculatedValue:n,baseValue:s,multiplier:a})}if(!t)return{success:!1,error:"Value cannot be represented with EIA-96 code"};const i=100-o/e*100;return{success:!0,code:t.code,value:t.calculatedValue,formattedValue:this.formatResistance(t.calculatedValue)+" ±1%",details:"EIA-96 SMD code (1% tolerance)",accuracy:i.toFixed(2)}}formatResistance(e){return e>=1e9?`${(e/1e9).toFixed(2)} GΩ`:e>=1e6?`${(e/1e6).toFixed(2)} MΩ`:e>=1e3?`${(e/1e3).toFixed(2)} kΩ`:e>=1?`${e.toFixed(2)} Ω`:`${(e*1e3).toFixed(2)} mΩ`}}document.addEventListener("DOMContentLoaded",()=>{const u=document.getElementById("app"),e=new E;new B(u,e).init(),window.addEventListener("error",o=>{console.error("Global error:",o.error)}),"performance"in window&&window.addEventListener("load",()=>{setTimeout(()=>{const o=performance.getEntriesByType("navigation")[0];console.log("Page load time:",o.loadEventEnd-o.loadEventStart,"ms")},0)})});
