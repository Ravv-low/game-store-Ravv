// --- AUTO-APPLY SAVED THEME BEFORE DOM LOADS ---
if (localStorage.getItem('theme') === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
}

document.addEventListener('DOMContentLoaded', () => {
    /* === THEME TOGGLE LOGIC === */
    const themeToggleBtns = document.querySelectorAll('.theme-toggle-btn');
    if (localStorage.getItem('theme') === 'light') {
        themeToggleBtns.forEach(btn => btn.innerHTML = '<i class="fa-solid fa-sun" style="color:#f59e0b;"></i>');
    }
    
    themeToggleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            let theme = document.documentElement.getAttribute('data-theme');
            if (theme === 'light') {
                document.documentElement.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
                themeToggleBtns.forEach(b => {
                    b.innerHTML = '<i class="fa-solid fa-moon"></i>';
                    b.style.transform = b.style.transform === "rotate(360deg)" ? "rotate(0deg)" : "rotate(360deg)";
                });
            } else {
                document.documentElement.setAttribute('data-theme', 'light');
                localStorage.setItem('theme', 'light');
                themeToggleBtns.forEach(b => {
                    b.innerHTML = '<i class="fa-solid fa-sun" style="color:#f59e0b;"></i>';
                    b.style.transform = b.style.transform === "rotate(-360deg)" ? "rotate(0deg)" : "rotate(-360deg)";
                });
            }
        });
    });

    /* ==============================================================================
       1. GAME DATA & DATABASE (Mock JSON)
       Digunakan untuk me-render dropdown game modes, item eceran, dan paketan.
    ============================================================================== */
    const gameData = {
    mlbb: {
        title: "Mobile Legends",
        banner: "assets/mlbb.png",
        modes: [
            {
                id: "topup", name: "Top Up Diamond & Pass",
                eceran: [],
                paket: [
                    { name: "🎟️ Weekly Diamond Pass", price: 27000 },
                    { name: "🎟️ Starlight Member (Biasa)", price: 140000 },
                    { name: "🎟️ Starlight Member (Premium)", price: 280000 },
                    { name: "💎 11 Diamonds", price: 3000 },
                    { name: "💎 28 Diamonds", price: 8000 },
                    { name: "💎 86 Diamonds", price: 23000 },
                    { name: "💎 257 Diamonds", price: 67000 },
                    { name: "💎 706 Diamonds", price: 180000 },
                    { name: "💎 1050 Diamonds", price: 260000 },
                    { name: "💎 2195 Diamonds", price: 520000 },
                    { name: "💎 3688 Diamonds (Sultan)", price: 850000 },
                    { name: "💎 6000 Diamonds (Whale)", price: 1500000 },
                    { name: "💎 12000 Diamonds (Leviathan)", price: 3000000 }
                ]
            },
            {
                id: "rank_draft", name: "Joki Rank (Epic-Mythic)",
                eceran: [
                    { name: "★ Joki Bintang Epic", price: 6000 },
                    { name: "★ Joki Bintang Legend", price: 8000 },
                    { name: "★ Joki Bintang Mythic (1-25)", price: 15000 },
                    { name: "★ Joki Bintang Honor (25-50)", price: 20000 },
                    { name: "★ Joki Bintang Glory (50-100)", price: 30000 },
                    { name: "★ Joki Bintang Immortal (100+)", price: 50000 }
                ],
                paket: [
                    { name: "📦 Paket Epic ke Legend", price: 120000 },
                    { name: "📦 Paket Legend ke Mythic", price: 150000 },
                    { name: "📦 Paket Mythic ke Glory (50 B.)", price: 700000 },
                    { name: "📦 Paket Glory ke Immortal (100 B.)", price: 1400000 }
                ]
            },
            {
                id: "classic", name: "Joki Classic / Winrate",
                eceran: [
                    { name: "1x Win Winrate (Bebas Hero)", price: 5000 },
                    { name: "1x Win Classic", price: 4000 },
                    { name: "1x Joki MCL Harian", price: 30000 }
                ],
                paket: [
                    { name: "Paket 20x Win Hero Bebas", price: 90000 },
                    { name: "Paket 50x Win Hero Bebas", price: 200000 },
                    { name: "Paket MMR: Top Supreme Hero", price: 950000 }
                ]
            }
        ]
    },
    pubg: {
        title: "PUBG Mobile",
        banner: "assets/pubg.jpg",
        modes: [
            {
                id: "topup", name: "Top Up UC & RP",
                eceran: [],
                paket: [
                    { name: "🎟️ Royale Pass (Elite)", price: 150000 },
                    { name: "🎟️ Royale Pass (Elite Plus)", price: 350000 },
                    { name: "💰 60 UC", price: 14000 },
                    { name: "💰 300 + 25 UC", price: 70000 },
                    { name: "💰 600 + 60 UC", price: 140000 },
                    { name: "💰 1500 + 300 UC", price: 350000 },
                    { name: "💰 3000 + 850 UC", price: 700000 },
                    { name: "💰 6000 + 2100 UC (Sultan)", price: 1400000 },
                    { name: "💰 12000 + 4200 UC (Whale)", price: 2800000 }
                ]
            },
            {
                id: "tpp", name: "Push Rank TPP",
                eceran: [
                    { name: "Gold (Per Tier)", price: 40000 },
                    { name: "Platinum (Per Tier)", price: 50000 },
                    { name: "Diamond (Per Tier)", price: 70000 },
                    { name: "Crown (Per Tier)", price: 100000 },
                    { name: "Ace (Per 100 Point)", price: 40000 },
                    { name: "Conqueror (Per 100 Point)", price: 80000 }
                ],
                paket: [
                    { name: "Paket Diamond -> Crown", price: 300000 },
                    { name: "Paket Crown -> Ace", price: 450000 },
                    { name: "Paket Ace -> Conqueror (All In)", price: 2100000 }
                ]
            },
            {
                id: "fpp", name: "Push Rank FPP",
                eceran: [
                    { name: "Platinum (Per Tier)", price: 50000 },
                    { name: "Diamond (Per Tier)", price: 70000 },
                    { name: "Crown (Per Tier)", price: 100000 },
                    { name: "Ace (Per 100 Point)", price: 40000 }
                ],
                paket: [
                    { name: "Paket Diamond -> Crown", price: 300000 },
                    { name: "Paket Crown -> Ace", price: 450000 }
                ]
            }
        ]
    },
    freefire: {
        title: "Free Fire",
        banner: "assets/ff.jpg",
        modes: [
            {
                id: "topup", name: "Top Up Diamonds",
                eceran: [],
                paket: [
                    { name: "🎟️ Booyah Pass", price: 80000 },
                    { name: "🎟️ Membership Mingguan", price: 28000 },
                    { name: "💎 70 Diamonds", price: 10000 },
                    { name: "💎 140 Diamonds", price: 20000 },
                    { name: "💎 355 Diamonds", price: 50000 },
                    { name: "💎 720 Diamonds", price: 100000 },
                    { name: "💎 1450 Diamonds", price: 200000 },
                    { name: "💎 3640 Diamonds (Sultan)", price: 500000 },
                    { name: "💎 7290 Diamonds (Whale)", price: 1000000 }
                ]
            },
            {
                id: "br", name: "Battle Royale (BR) Rank",
                eceran: [
                    { name: "Platinum (Per Tier)", price: 20000 },
                    { name: "Diamond (Per Tier)", price: 30000 },
                    { name: "Heroic (Per Tier)", price: 50000 },
                    { name: "Elite Heroic (Per Tier)", price: 80000 }
                ],
                paket: [
                    { name: "Paket Diamond -> Heroic", price: 100000 },
                    { name: "Paket Heroic -> Master", price: 300000 }
                ]
            },
            {
                id: "cs", name: "Clash Squad (CS) Rank",
                eceran: [
                    { name: "Platinum (Per Tier)", price: 15000 },
                    { name: "Diamond (Per Tier)", price: 25000 },
                    { name: "Heroic (Per Bintang)", price: 10000 },
                    { name: "Push KD/Headshot Base", price: 50000 }
                ],
                paket: [
                    { name: "Paket Diamond -> Heroic CS", price: 90000 }
                ]
            }
        ]
    },
    genshin: {
        title: "Genshin Impact",
        banner: "assets/genshin.jpg",
        modes: [
            {
                id: "topup", name: "Top Up Genesis Crystals",
                eceran: [],
                paket: [
                    { name: "🌙 Blessing of Welkin Moon", price: 79000 },
                    { name: "🎟️ Gnostic Hymn (Battle Pass)", price: 150000 },
                    { name: "✨ 60 Genesis Crystals", price: 16000 },
                    { name: "✨ 300 + 30 Genesis Crystals", price: 79000 },
                    { name: "✨ 980 + 110 Genesis Crystals", price: 249000 },
                    { name: "✨ 1980 + 260 Genesis Crystals", price: 479000 },
                    { name: "✨ 3280 + 600 Genesis Crystals", price: 799000 },
                    { name: "✨ 6560 + 1200 GenCrystals (Sultan)", price: 1598000 }
                ]
            },
            {
                id: "exploration", name: "Joki Eksplorasi Map",
                eceran: [
                    { name: "100% Mondstadt / Liyue", price: 100000 },
                    { name: "100% Inazuma / Sumeru", price: 150000 },
                    { name: "100% Fontaine / Natlan", price: 200000 },
                    { name: "100% Underground / Enkanomiya", price: 120000 }
                ],
                paket: [
                    { name: "Paket All Region 100%", price: 850000 }
                ]
            },
            {
                id: "maintenance", name: "Joki Farm & Spiral Abyss",
                eceran: [
                    { name: "Joki Daily Commissions (1 Bulan)", price: 100000 },
                    { name: "Farm 1000 Resource (Bunga/Kayu)", price: 50000 },
                    { name: "Habiskan Resin (Mingguan)", price: 80000 },
                    { name: "Archon / World Quest (Per Quest)", price: 40000 },
                    { name: "Spiral Abyss 36 Stars", price: 75000 }
                ],
                paket: [
                    { name: "Paket Build 1 Karakter Max", price: 250000 }
                ]
            }
        ]
    },
    roblox: {
        title: "Roblox",
        banner: "assets/roblox.jpg",
        modes: [
            {
                id: "topup", name: "Top Up Robux (Tanpa Tax)",
                eceran: [],
                paket: [
                    { name: "💵 80 Robux", price: 16000 },
                    { name: "💵 400 Robux", price: 80000 },
                    { name: "💵 800 Robux", price: 160000 },
                    { name: "💵 1700 Robux", price: 320000 },
                    { name: "💵 4500 Robux", price: 800000 },
                    { name: "💵 10000 Robux (Sultan)", price: 2000000 }
                ]
            },
            {
                id: "bloxfruits_level", name: "Blox Fruits / Simulator",
                eceran: [
                    { name: "Leveling First Sea (1-700)", price: 30000 },
                    { name: "Leveling Second Sea (700-1500)", price: 40000 },
                    { name: "Leveling Third Sea (1500-2550)", price: 50000 },
                    { name: "Unlock V4 Race (Per Race)", price: 65000 },
                    { name: "Push 1M Bounty", price: 20000 }
                ],
                paket: [
                    { name: "Paket Joki Max Level (1-2550)", price: 110000 },
                    { name: "Paket GodHuman + Max Level", price: 180000 }
                ]
            }
        ]
    }
};

    /* ==============================================================================
       2. GLOBAL UTILS
    ============================================================================== */
    function formatRP(number) {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(number);
    }
    
    // Check URL to determine Active Game
    let currentGameKey = new URLSearchParams(window.location.search).get('game') || 'mlbb';
    if (!gameData[currentGameKey]) currentGameKey = 'mlbb'; // fallback to MLBB
    let currentModeObj = gameData[currentGameKey].modes[0]; 

    /* ==============================================================================
       3. MODAL LOGIN (Untuk File index.html)
    ============================================================================== */
    const authModal = document.getElementById('authModal');
    const btnLogin = document.getElementById('btnLogin');
    const btnRegister = document.getElementById('btnRegister');
    const closeAuthModal = document.querySelector('.close-modal'); // Generic if only 1 modal

    if (authModal) {
        if(btnLogin) btnLogin.addEventListener('click', (e) => { e.preventDefault(); authModal.classList.add('active'); document.getElementById('modalTitle').textContent = 'Masuk ke Akun'; });
        if(btnRegister) btnRegister.addEventListener('click', (e) => { e.preventDefault(); authModal.classList.add('active'); document.getElementById('modalTitle').textContent = 'Daftar Akun'; });
        if(closeAuthModal) closeAuthModal.addEventListener('click', () => { authModal.classList.remove('active'); });
        window.addEventListener('click', (e) => { if (e.target === authModal) { authModal.classList.remove('active'); } });
    }

    /* ==============================================================================
       4. TESTIMONIAL SYSTEM (Untuk File index.html)
    ============================================================================== */
    const testimonialForm = document.getElementById('testimonialForm');
    
    // RENDER INTERACTIVE TESTIMONIALS (AWAN BUBBLE)
    const testiAvatar = document.getElementById('testiAvatar');
    const testiName = document.getElementById('testiName');
    const testiGame = document.getElementById('testiGame');
    const testiText = document.getElementById('testiText');
    const testiStars = document.getElementById('testiStars');
    const btnPrevTesti = document.getElementById('prevTesti');
    const btnNextTesti = document.getElementById('nextTesti');

    let savedTestimonials = JSON.parse(localStorage.getItem('dykojoki_testi_v5'));
    if (!savedTestimonials || savedTestimonials.length < 20) {
        savedTestimonials = [
            { id: 1, name: "Budi Santoso", game: "Mobile Legends", review: "Gila cepet banget prosesnya! Cuma 5 detik beli diamond lgsg masuk orderan. Best!" },
            { id: 2, name: "Reza Rahardian", game: "PUBG Mobile", review: "Joki rank Conqueror mantap, aman 100% dan dikasih bonus chicken dinner terus." },
            { id: 3, name: "Siti Aisyah", game: "Genshin Impact", review: "Beli Welkin disini termurah dan aman tanpa login aneh-aneh. Recommended!" },
            { id: 4, name: "Kevin Sanjaya", game: "Free Fire", review: "Sering beli diamond receh selalu diladenin cepet. Makasih min!" },
            { id: 5, name: "Andi Saputra", game: "Roblox", review: "Top up Robux lgsg masuk, sehari lgsg max level beli item dari hasil top up bang!" },
            { id: 6, name: "Ayu Lestari", game: "Mobile Legends", review: "Beli paket legend ke mythic cuma sehari kelar, pro player asli yg main." },
            { id: 7, name: "Denny Caknan", game: "PUBG Mobile", review: "Top UP UC amanah, anti min UC, harga pasaran terbaik pokoknya." },
            { id: 8, name: "Fajar Alfian", game: "Free Fire", review: "Joki CS Heroic GGWP, bintang naik terus gapernah minus. Recommended!" },
            { id: 9, name: "Ratna Sari", game: "Genshin Impact", review: "Joki rawat resin & Genesis Crystal harganya bersahabat banget buat anak kuliahan." },
            { id: 10, name: "Hendra Setiawan", game: "Mobile Legends", review: "Push winrate Fanny dikasih winstreak 20x. Gokil abis joki disini." }
        ];
        localStorage.setItem('dykojoki_testi_v5', JSON.stringify(savedTestimonials));
    }

    if (testiAvatar && savedTestimonials.length > 0) {
        let currentTestiIdx = 0;
        let testiInterval;

        function updateTestimonial(idx) {
            testiText.style.opacity = 0;
            testiAvatar.style.transform = "scale(0.8) rotate(-10deg)";
            testiAvatar.style.opacity = 0.5;
            
            setTimeout(() => {
                const data = savedTestimonials[idx];
                const avatarId = (data.id % 9) + 1;
                testiAvatar.src = `https://randomuser.me/api/portraits/lego/${avatarId}.jpg`;
                testiName.textContent = data.name;
                testiGame.textContent = data.game;
                testiText.textContent = `"${data.review}"`;
                testiStars.innerHTML = '<i class="fa-solid fa-star"></i>'.repeat(5);
                
                testiText.style.opacity = 1;
                testiAvatar.style.transform = "scale(1) rotate(0deg)";
                testiAvatar.style.opacity = 1;
            }, 300);
        }

        btnNextTesti.addEventListener('click', () => { currentTestiIdx = (currentTestiIdx + 1) % savedTestimonials.length; updateTestimonial(currentTestiIdx); resetInterval(); });
        btnPrevTesti.addEventListener('click', () => { currentTestiIdx = (currentTestiIdx - 1 + savedTestimonials.length) % savedTestimonials.length; updateTestimonial(currentTestiIdx); resetInterval(); });

        function resetInterval() {
            clearInterval(testiInterval);
            testiInterval = setInterval(() => {
                currentTestiIdx = (currentTestiIdx + 1) % savedTestimonials.length;
                updateTestimonial(currentTestiIdx);
            }, 7000);
        }

        testiText.style.transition = "opacity 0.3s ease";
        testiAvatar.style.transition = "transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.3s ease";
        updateTestimonial(0);
        resetInterval();
    }

    if (testimonialForm) {
        testimonialForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const newTestimonial = {
                id: Date.now(),
                name: document.getElementById('testiName').value,
                game: document.getElementById('testiGame').value,
                review: document.getElementById('testiReview').value
            };
            let st = JSON.parse(localStorage.getItem('dykojoki_testi_v5')) || [];
            st.unshift(newTestimonial);
            localStorage.setItem('dykojoki_testi_v5', JSON.stringify(st));
            
            alert('Testimoni berhasil dikirim dan akan tampil!');
            testimonialForm.reset();
            location.reload();
        });
    }

    /* ==============================================================================
       5. PAYMENT & ORDER SYSTEM (Untuk File payment.html)
    ============================================================================== */
    const pageGameTitle = document.getElementById('pageGameTitle');
    const gameBanner = document.getElementById('gameBanner');
    const dynamicPricingArea = document.getElementById('dynamicPricingArea');
    const paymentCards = document.querySelectorAll('.payment-card');
    const btnCheckout = document.getElementById('btnCheckout');
    
    // State variables
    let selectedItem = null;
    let selectedPriceBase = 0; // Base Price (e.g 5000 per star)
    let selectedIsEceran = false;
    let selectedQuantity = 1;
    let selectedPayment = null;

    if (pageGameTitle && dynamicPricingArea) {
        const game = gameData[currentGameKey];
        pageGameTitle.textContent = game.title;
        gameBanner.src = game.banner;

        // --- RENDER TABS & LOGIC ---
        function renderModes() {
            let tabsHtml = `<div class="mode-tabs">`;
            game.modes.forEach(mode => {
                tabsHtml += `<div class="mode-tab ${mode.id === currentModeObj.id ? 'active' : ''}" data-mode="${mode.id}">${mode.name}</div>`;
            });
            tabsHtml += `</div><div id="pricingContent"></div>`;
            dynamicPricingArea.innerHTML = tabsHtml;

            // Attachment Tab Actions (Switching Rank -> Classic, dll)
            document.querySelectorAll('.mode-tab').forEach(tab => {
                tab.addEventListener('click', (e) => {
                    const modeId = e.target.getAttribute('data-mode');
                    currentModeObj = game.modes.find(m => m.id === modeId);
                    
                    // Reset selected states on mode switch
                    selectedItem = null;
                    selectedPriceBase = 0;
                    selectedIsEceran = false;
                    selectedQuantity = 1;
                    document.getElementById('qtyInput').value = 1;
                    document.getElementById('qtySection').style.display = 'none';
                    updatePaymentPrices(); // Reset all to '-'
                    
                    renderModes(); // re-render DOM
                });
            });

            renderPricingContent();
        }

        // --- RENDER KOTAK GRIDS (ECERAN/PAKET) ---
        function renderPricingContent() {
            const container = document.getElementById('pricingContent');
            let contentHtml = '';

            // Render Eceran
            if (currentModeObj.eceran && currentModeObj.eceran.length > 0) {
                contentHtml += `<h3 class="section-title-small">Versi Eceran (Bisa Pilih Match/Jumlah)</h3><div class="item-grid">`;
                currentModeObj.eceran.forEach(item => {
                    contentHtml += createItemCard(item, true); // true = Eceran
                });
                contentHtml += `</div>`;
            }

            // Render Paket
            if (currentModeObj.paket && currentModeObj.paket.length > 0) {
                contentHtml += `<h3 class="section-title-small">Versi Paket / Grosir</h3><div class="item-grid">`;
                currentModeObj.paket.forEach(item => {
                    contentHtml += createItemCard(item, false); // false = Paket
                });
                contentHtml += `</div>`;
            }

            container.innerHTML = contentHtml;
            attachItemListeners();
        }

        function createItemCard(item, isEceran) {
            let priceHtml = '';
            // Make any item name that contains "Epic", "Legend" or "Classic" naturally discounted by 20%
            let isDiscountedJoki = item.name.toLowerCase().includes('epic') || item.name.toLowerCase().includes('legend') || item.name.toLowerCase().includes('classic');
            // Dikit aja: 5% promo for Top Ups above 50rb
            let isDiscountedTopup = !isDiscountedJoki && !isEceran && item.price >= 50000;
            
            if (isDiscountedJoki) {
                let originalPrice = Math.floor(item.price * 1.25); // the original price before 20% discount
                priceHtml = `
                    <div class="item-price" style="display:flex; flex-direction:column; align-items:center;">
                        <span style="text-decoration:line-through; font-size:0.75rem; color:var(--text-secondary)">${formatRP(originalPrice)}</span>
                        <span style="color:var(--secondary-color); font-weight:800; text-shadow: 0 0 5px rgba(0,240,255,0.4);">${formatRP(item.price)}</span>
                    </div>
                `;
            } else if (isDiscountedTopup) {
                let originalPrice = Math.floor(item.price * 1.05); // 5% discount
                priceHtml = `
                    <div class="item-price" style="display:flex; flex-direction:column; align-items:center;">
                        <span style="text-decoration:line-through; font-size:0.75rem; color:var(--text-secondary)">${formatRP(originalPrice)}</span>
                        <span style="color:var(--secondary-color); font-weight:800; text-shadow: 0 0 5px rgba(0,240,255,0.4);">${formatRP(item.price)}</span>
                    </div>
                `;
            } else {
                priceHtml = `<div class="item-price" style="font-weight:700;">${formatRP(item.price)}</div>`;
            }

            let badgeHtml = '';
            if (isDiscountedJoki) {
                badgeHtml = '<span style="position:absolute; top:-10px; right:-10px; background:var(--primary-color); color:#fff; font-size:0.7rem; padding: 4px 10px; border-radius:20px; font-weight:bold; box-shadow: 0 2px 8px rgba(255,42,95,0.6); z-index:3;">SAVE 20%</span>';
            } else if (isDiscountedTopup) {
                badgeHtml = '<span style="position:absolute; top:-10px; right:-10px; background:#ffae00; color:#000; font-size:0.7rem; padding: 4px 10px; border-radius:20px; font-weight:bold; box-shadow: 0 2px 8px rgba(255,174,0,0.6); z-index:3;">PROMO 5%</span>';
            }

            let iconDiamond = isDiscountedJoki ? '<i class="fa-solid fa-bolt text-warning" style="margin-right:5px;"></i>' : '<i class="fa-solid fa-gem text-info" style="margin-right:5px; color: var(--secondary-color);"></i>';
            return `
                <div class="item-card" data-price="${item.price}" data-item="${item.name}" data-is-eceran="${isEceran}" style="position:relative;">
                    ${badgeHtml}
                    <div class="item-name" style="display:flex; align-items:center; justify-content:center; text-align:center;">${iconDiamond} ${item.name}</div>
                    ${priceHtml}
                </div>
            `;
        }

        function attachItemListeners() {
            document.querySelectorAll('.item-card').forEach(card => {
                card.addEventListener('click', () => {
                    // Styling Update
                    document.querySelectorAll('.item-card').forEach(c => c.classList.remove('active'));
                    card.classList.add('active');
                    
                    // State Update
                    selectedItem = card.getAttribute('data-item');
                    selectedPriceBase = parseInt(card.getAttribute('data-price'));
                    selectedIsEceran = card.getAttribute('data-is-eceran') === 'true';
                    
                    // Show/Hide Quantity Counter
                    const qtySection = document.getElementById('qtySection');
                    if (selectedIsEceran) {
                        qtySection.style.display = 'flex';
                        selectedQuantity = parseInt(document.getElementById('qtyInput').value); // Use existing
                    } else {
                        qtySection.style.display = 'none';
                        selectedQuantity = 1;
                    }

                    // Update Price Boards
                    updatePaymentPrices();
                });
            });
        }

        renderModes();
    }

    // --- QUANTITY LOGIC FOR ECERAN ---
    const btnMinus = document.getElementById('btnMinusQty');
    const btnPlus = document.getElementById('btnPlusQty');
    const inputQty = document.getElementById('qtyInput');

    if (btnMinus && btnPlus && inputQty) {
        btnPlus.addEventListener('click', () => {
            selectedQuantity++;
            inputQty.value = selectedQuantity;
            if (selectedItem) updatePaymentPrices(); // Re-calculate
        });
        btnMinus.addEventListener('click', () => {
            if (selectedQuantity > 1) {
                selectedQuantity--;
                inputQty.value = selectedQuantity;
                if (selectedItem) updatePaymentPrices();
            }
        });
    }

    // --- PAYMENT METHOD LOGIC ---
    paymentCards.forEach(card => {
        card.addEventListener('click', () => {
            paymentCards.forEach(c => c.classList.remove('active'));
            card.classList.add('active');
            selectedPayment = card.getAttribute('data-method');
            if (typeof updateGlobalCheckoutTotal === 'function') updateGlobalCheckoutTotal();
        });
    });

    // --- PROMO CODE LOGIC ---
    const PROMO_CODES = {
        'DYKO20': { type: 'percent', value: 20, max: 50000 },
        'JOKIMURAH': { type: 'fixed', value: 10000, max: null },
        'TOPUPKILAT': { type: 'percent', value: 5, max: 15000 }
    };
    let appliedPromo = null;

    const btnApplyPromo = document.getElementById('btnApplyPromo');
    const promoCodeInput = document.getElementById('promoCodeInput');
    const promoMessage = document.getElementById('promoMessage');
    const checkoutTotalDisplay = document.getElementById('checkoutTotalDisplay');

    if (btnApplyPromo && promoCodeInput) {
        btnApplyPromo.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent accidental form submissions
            const code = promoCodeInput.value.trim().toUpperCase();
            if(!code) {
                appliedPromo = null;
                promoMessage.textContent = 'Promo dilepas.';
                promoMessage.style.color = 'var(--text-secondary)';
                updatePaymentPrices();
                return;
            }

            if(PROMO_CODES[code]) {
                appliedPromo = { code: code, ...PROMO_CODES[code] };
                promoMessage.innerHTML = `<i class="fa-solid fa-check"></i> Promo "${code}" berhasil dipasang!`;
                promoMessage.style.color = 'var(--secondary-color)';
            } else {
                appliedPromo = null;
                promoMessage.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> Kode promo salah / kadaluarsa.`;
                promoMessage.style.color = 'var(--danger)';
            }
            updatePaymentPrices();
        });
    }

    function updateGlobalCheckoutTotal() {
        if (!checkoutTotalDisplay) return;
        const activePaymentCard = document.querySelector('.payment-card.active');
        if (!activePaymentCard) {
            checkoutTotalDisplay.textContent = 'Rp 0';
            return;
        }

        const discounted = parseInt(activePaymentCard.getAttribute('data-finalprice'));
        const original = parseInt(activePaymentCard.getAttribute('data-originalprice'));
        const discountAmount = parseInt(activePaymentCard.getAttribute('data-discount'));

        if (discountAmount > 0) {
            checkoutTotalDisplay.innerHTML = `
                <span style="font-size:0.9rem; text-decoration:line-through; color:var(--text-secondary); margin-right:8px; font-weight:normal;">${formatRP(original)}</span>
                ${formatRP(discounted)}
            `;
        } else {
            checkoutTotalDisplay.textContent = formatRP(discounted);
        }
    }

    // Calculates: Final Total = (Base Price * Quantity) + Gateway Fee
    function updatePaymentPrices() {
        if (!selectedItem) {
            paymentCards.forEach(card => {
                card.querySelector('.payment-price').textContent = "Rp -";
                card.removeAttribute('data-finalprice');
                card.removeAttribute('data-originalprice');
                card.removeAttribute('data-discount');
            });
            if (typeof updateGlobalCheckoutTotal === 'function') updateGlobalCheckoutTotal();
            return;
        }

        const calculatedSubTotal = selectedPriceBase * selectedQuantity;

        paymentCards.forEach(card => {
            const priceEl = card.querySelector('.payment-price');
            let baseAndFeePrice = calculatedSubTotal;
            const method = card.getAttribute('data-method');
            
            // Simulation: E-wallet Fee (e.g. 500 flat fee)
            if (['DANA', 'GoPay', 'OVO', 'ShopeePay', 'LinkAja'].includes(method)) baseAndFeePrice += 500;
            
            // Kalkulasi Promo
            let discountAmount = 0;
            if (appliedPromo) {
                if (appliedPromo.type === 'percent') {
                    discountAmount = (baseAndFeePrice * appliedPromo.value) / 100;
                    if (appliedPromo.max && discountAmount > appliedPromo.max) {
                        discountAmount = appliedPromo.max;
                    }
                } else if (appliedPromo.type === 'fixed') {
                    discountAmount = appliedPromo.value;
                }
            }

            let discountedPrice = baseAndFeePrice - discountAmount;
            if (discountedPrice < 0) discountedPrice = 0;

            if (discountAmount > 0) {
                priceEl.innerHTML = `<span style="font-size:0.75rem; text-decoration:line-through; color:var(--text-secondary);">${formatRP(baseAndFeePrice)}</span><br>${formatRP(discountedPrice)}`;
            } else {
                priceEl.textContent = formatRP(baseAndFeePrice);
            }

            card.setAttribute('data-finalprice', discountedPrice); // store for checkout
            card.setAttribute('data-originalprice', baseAndFeePrice); 
            card.setAttribute('data-discount', discountAmount);
        });

        if (typeof updateGlobalCheckoutTotal === 'function') updateGlobalCheckoutTotal();
    }

    // --- CHECKOUT & INVOICE GENERATOR LOGIC ---
    if (btnCheckout) {
        btnCheckout.addEventListener('click', () => {
            const nickname = document.getElementById('gameNickname').value;
            const gameId = document.getElementById('gameId').value;
            const zoneId = document.getElementById('zoneId').value;
            
            const region = document.getElementById('waRegion').value;
            let rawWhatsapp = document.getElementById('whatsapp').value;
            // Bersihkan awalan angka 0 agar +62081x tidak terjadi (harus +6281)
            rawWhatsapp = rawWhatsapp.replace(/^0+/, ''); 
            const fullWhatsapp = `+${region}${rawWhatsapp}`;

            // Validations
            if (!nickname || !gameId) { alert('Tolong lengkapi form Nickname & User ID'); return; }
            if (!selectedItem) { alert('Tolong pilih layanan terlebih dahulu ditiap tab'); return; }
            if (!selectedPayment) { alert('Tolong pilih metode pembayaran'); return; }
            if (!rawWhatsapp) { alert('Tolong lengkapi No. WhatsApp Pembeli'); return; }

            // Get Final Total
            const activePaymentCard = document.querySelector('.payment-card.active');
            const finalPrice = activePaymentCard ? parseInt(activePaymentCard.getAttribute('data-finalprice')) : (selectedPriceBase * selectedQuantity);
            const originalPrice = activePaymentCard ? parseInt(activePaymentCard.getAttribute('data-originalprice')) || finalPrice : finalPrice;
            const discountAmount = activePaymentCard ? parseInt(activePaymentCard.getAttribute('data-discount')) || 0 : 0;

            // Generate Invoice Data
            const invoiceNumber = `INV-DYK-${Math.floor(Date.now() / 1000)}`;
            const orderDate = new Date().toLocaleString('id-ID');
            
            const invoiceObj = {
                invoice_id: invoiceNumber,
                date: orderDate,
                game: gameData[currentGameKey].title,
                mode: currentModeObj.name,
                nickname: nickname,
                account_id: `${gameId} ${zoneId ? '('+zoneId+')' : ''}`,
                item_name: selectedItem,
                type: selectedIsEceran ? 'ECERAN' : 'PAKET',
                qty: selectedQuantity,
                payment: selectedPayment,
                whatsapp: fullWhatsapp,
                total: finalPrice,
                status: 'Menunggu Pembayaran'
            };

            // Save Invoice to localStorage
            const savedInvoices = JSON.parse(localStorage.getItem('dykojoki_invoices')) || [];
            savedInvoices.unshift(invoiceObj);
            localStorage.setItem('dykojoki_invoices', JSON.stringify(savedInvoices));

            // Format WhatsApp Message
            const adminPhone = "6287783842481"; // Admin Dika
            let message = `*HALO ADMIN, ORDER BARU MASUK!* 🛒\n`;
            message += `==================================\n`;
            message += `*No. Invoice*: ${invoiceNumber}\n\n`;
            message += `🎮 *Game*: ${invoiceObj.game} (${invoiceObj.mode})\n`;
            message += `👤 *Nickname / Akun*: ${invoiceObj.nickname}\n`;
            message += `🆔 *User ID*: ${invoiceObj.account_id}\n\n`;
            message += `💎 *Item Pesanan*: ${invoiceObj.item_name}\n`;
            if (selectedIsEceran) {
                message += `📈 *Kuantitas Eceran*: ${invoiceObj.qty}x \n`;
            }
            message += `💳 *Jalur Bayar*: ${invoiceObj.payment}\n`;
            message += `📱 *WhatsApp*: ${invoiceObj.whatsapp}\n\n`;
            if (discountAmount > 0) {
                message += `🎉 *Promo Dipakai*: ${appliedPromo.code}\n`;
                message += `❌ *Harga Normal*: ~${formatRP(originalPrice)}~\n`;
                message += `✅ *BAYAR SETELAH DISKON*: *${formatRP(invoiceObj.total)}*\n`;
            } else {
                message += `💰 *TOTAL BAYAR*: *${formatRP(invoiceObj.total)}*\n`;
            }
            message += `==================================\n`;
            message += `*Mohon bimbingan untuk transfer bayaran sesuai invoice di atas.* 🙏`;

            // Redirect to Whatsapp with Loading State
            const encodedMessage = encodeURIComponent(message);
            const originalBtnHtml = btnCheckout.innerHTML;
            btnCheckout.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Memproses...';
            btnCheckout.style.opacity = '0.7';
            btnCheckout.style.pointerEvents = 'none';

            // Simulate server network delay
            setTimeout(() => {
                window.open(`https://wa.me/${adminPhone}?text=${encodedMessage}`, '_blank');
                
                // Restore button state after redirecting
                setTimeout(() => {
                    btnCheckout.innerHTML = originalBtnHtml;
                    btnCheckout.style.opacity = '1';
                    btnCheckout.style.pointerEvents = 'auto';
                }, 1000);
            }, 1200);
        });
    }

    /* ==============================================================================
       6. INVOICE CHECKER MODAL LOGIC (Navbar -> Cek Pesanan)
    ============================================================================== */
    const btnCekInvoice = document.getElementById('btnCekInvoice');
    const invoiceModal = document.getElementById('invoiceModal');
    const closeInvoiceModal = document.getElementById('closeInvoiceModal');
    const btnSearchInvoice = document.getElementById('btnSearchInvoice');
    const searchInvoiceId = document.getElementById('searchInvoiceId');
    const invoiceResultBox = document.getElementById('invoiceResultBox');

    if (invoiceModal) {
        if(btnCekInvoice) btnCekInvoice.addEventListener('click', (e) => { 
            e.preventDefault(); 
            invoiceModal.classList.add('active'); 
            invoiceResultBox.style.display = 'none'; // reset
            if(searchInvoiceId) searchInvoiceId.value = '';
        });
        
        if(closeInvoiceModal) closeInvoiceModal.addEventListener('click', () => { 
            invoiceModal.classList.remove('active'); 
        });

        if(btnSearchInvoice) {
            btnSearchInvoice.addEventListener('click', () => {
                const keyword = searchInvoiceId.value.trim().toUpperCase();
                if(!keyword) { alert('Masukkan nomor invoice terlebih dahulu!'); return; }

                const savedInvoices = JSON.parse(localStorage.getItem('dykojoki_invoices')) || [];
                const found = savedInvoices.find(inv => inv.invoice_id === keyword || inv.whatsapp === keyword);

                if (found) {
                    invoiceResultBox.style.display = 'block';
                    invoiceResultBox.innerHTML = `
                        <h4 style="margin-bottom:10px; border-bottom:1px solid var(--border-color); padding-bottom:5px;">${found.invoice_id}</h4>
                        <div style="font-size:0.9rem; color:var(--text-secondary); line-height: 1.6;">
                            <p><strong>Status:</strong> <span style="color:var(--primary-color)">${found.status}</span></p>
                            <p><strong>Game:</strong> ${found.game} - ${found.mode}</p>
                            <p><strong>Pesanan:</strong> ${found.item_name} ${found.type === 'ECERAN' ? `(${found.qty}x)` : ''}</p>
                            <p><strong>Data Akun:</strong> ${found.nickname} (${found.account_id})</p>
                            <p style="margin-top:10px; font-size:1.1rem; color:var(--text-primary); font-weight:bold;">Total: ${formatRP(found.total)}</p>
                        </div>
                    `;
                } else {
                    invoiceResultBox.style.display = 'block';
                    invoiceResultBox.innerHTML = `<p style="color:var(--danger); text-align:center;">Invoice tidak ditemukan di browser ini. Pastikan Anda mengetik dengan benar (Cth: INV-DYK-1234).</p>`;
                }
            });
        }
    }

    /* ==============================================================================
       7. PROMO SLIDER (index.html)
    ============================================================================== */
    const promoSlider = document.getElementById('promoSlider');
    const dots = document.querySelectorAll('.slider-dots .dot');
    let currentSlide = 0;
    
    if (promoSlider && dots.length > 0) {
        function goToSlide(index) {
            currentSlide = index;
            // Geser track ke kiri (-33.33% tiap 1 slide jika ada 3 slide)
            promoSlider.style.transform = `translateX(${-(currentSlide * (100 / dots.length))}%)`;
            dots.forEach(d => d.classList.remove('active'));
            dots[currentSlide].classList.add('active');
        }

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                goToSlide(index);
            });
        });

        // Auto slide setiap 4 detik
        setInterval(() => {
            currentSlide = (currentSlide + 1) % dots.length;
            goToSlide(currentSlide);
        }, 4000);
    }

    /* ==============================================================================
       8. SCROLL REVEAL ANIMATION (Efek Keren Ga Alay)
    ============================================================================== */
    // Pilih elemen-elemen besar (section, card list) untuk di-animasikan saat di-scroll
    const revealElements = document.querySelectorAll('.mb-4, .step-card, .payment-group');
    revealElements.forEach(el => el.classList.add('reveal')); // Pasang class transitif

    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active'); // Memicu CSS opacity 1 & transform 0
                observer.unobserve(entry.target); // Animasi cuma muncul sekali (tidak berulang-ulang menyebalkan)
            }
        });
    };

    const revealOptions = {
        threshold: 0.1, // Muncul ketika 10% elemen terlihat
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver(revealCallback, revealOptions);
    revealElements.forEach(el => revealObserver.observe(el));

    /* ==============================================================================
       9. SCI-FI / NEON AUDIO INTERACTIVITY (GEN-Z VIBES)
    ============================================================================== */
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    let audioCtx;
    
    // Initialize audio context ONLY upon first user gesture (browser policy)
    function initAudio() {
        if (!audioCtx) audioCtx = new AudioContext();
        if (audioCtx.state === 'suspended') audioCtx.resume();
    }

    function playHoverSound() {
        if (!audioCtx) return;
        const osc = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1400, audioCtx.currentTime + 0.05); // quick rising pitch
        gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.015, audioCtx.currentTime + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.05);
        osc.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.05);
    }

    function playClickSound() {
        if (!audioCtx) return;
        const osc = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        osc.type = 'square'; // harsher electronic sound
        osc.frequency.setValueAtTime(300, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(600, audioCtx.currentTime + 0.1);
        gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.05, audioCtx.currentTime + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.1);
        osc.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.1);
    }

    // Attach listeners globally to any interactive element that represents an action
    const interactables = document.querySelectorAll('a, button, .game-card, .item-card, .payment-card, .mode-tab, .faq-question');
    
    // Need a global listener to unlock audio explicitly on first touch/click
    document.body.addEventListener('pointerdown', initAudio, { once: true });
    
    interactables.forEach(el => {
        el.addEventListener('mouseenter', playHoverSound);
        el.addEventListener('click', () => { initAudio(); playClickSound(); });
    });

});
