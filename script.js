// --- 1. NARZĘDZIE DO KOLOROWANIA POZIOMÓW ---
function getColorByLevel(level) {
    const lvl = parseInt(level);
    if (lvl === 1 || lvl === 2) return "#808080"; // Szary
    if (lvl === 3) return "#a335ee";             // Fioletowy
    if (lvl === 4 || lvl === 5) return "#ffb400"; // Złoty
    if (lvl >= 6) return "#ff0000";              // Czerwony
    return "white";                              // Domyślny (np. Dum-Dum)
}

// --- 2. DANE AMUNICJI (33 pozycje) ---
const ammoData = [
    { name: "9x19mm Dum-Dum", caliber: "9x19mm", penetration: 0, damage: 74 },
    { name: "9x19mm PSO", caliber: "9x19mm", penetration: 1, damage: 56 },
    { name: "9x19mm PST", caliber: "9x19mm", penetration: 2, damage: 54 },
    { name: "9x19mm AP 6.3", caliber: "9x19mm", penetration: 3, damage: 48 },
    { name: "9x19mm 7N31", caliber: "9x19mm", penetration: 4, damage: 46 },
    { name: "5.45x39mm PS", caliber: "5.45x39mm", penetration: 2, damage: 50 },
    { name: "5.45x39mm PP", caliber: "5.45x39mm", penetration: 3, damage: 46 },
    { name: "5.45x39mm BP", caliber: "5.45x39mm", penetration: 4, damage: 45 },
    { name: "5.45x39mm BS", caliber: "5.45x39mm", penetration: 5, damage: 43 },
    { name: "5.45x39mm 7N40", caliber: "5.45x39mm", penetration: 6, damage: 42 },
    { name: "5.56x45mm HP", caliber: "5.56x45mm", penetration: 0, damage: 72 },
    { name: "5.56x45mm M855", caliber: "5.56x45mm", penetration: 3, damage: 49 },
    { name: "5.56x45mm A1", caliber: "5.56x45mm", penetration: 4, damage: 46 },
    { name: "5.56x45mm M995", caliber: "5.56x45mm", penetration: 5, damage: 42 },
    { name: "7.62x39mm HP", caliber: "7.62x39mm", penetration: 0, damage: 81 },
    { name: "7.62x39mm PS", caliber: "7.62x39mm", penetration: 3, damage: 56 },
    { name: "7.62x39mm BP", caliber: "7.62x39mm", penetration: 4, damage: 54 },
    { name: "7.62x39mm AP", caliber: "7.62x39mm", penetration: 5, damage: 52 },
    { name: "7.62x51mm Unarmored", caliber: "7.62x51mm", penetration: 0, damage: 88 },
    { name: "7.62x51mm M80", caliber: "7.62x51mm", penetration: 4, damage: 81 },
    { name: "7.62x51mm M62", caliber: "7.62x51mm", penetration: 5, damage: 78 },
    { name: "7.62x51mm M61", caliber: "7.62x51mm", penetration: 6, damage: 72 },
    { name: ".45 ACP Rip", caliber: ".45 ACP", penetration: 0, damage: 78 },
    { name: ".45 ACP AP", caliber: ".45 ACP", penetration: 3, damage: 52 },
    { name: "9x39mm SP5", caliber: "9x39mm", penetration: 4, damage: 52 },
    { name: "9x39mm SP6", caliber: "9x39mm", penetration: 5, damage: 50 },
    { name: "9x39mm BP", caliber: "9x39mm", penetration: 6, damage: 48 },
    { name: ".338 Lapua UPZ", caliber: ".338", penetration: 4, damage: 105 },
    { name: ".338 Lapua AP", caliber: ".338", penetration: 6, damage: 98 },
    { name: "12x70 Buckshot (8)", caliber: "12x70", penetration: 0, damage: "22x8" },
    { name: "12x70 Type 8", caliber: "12x70", penetration: 0, damage: "25x8" },
    { name: "12x70 Flechette", caliber: "12x70", penetration: 3, damage: "15x8" },
    { name: "12x70 AP Slug", caliber: "12x70", penetration: 4, damage: 90 }
];

// --- 3. DANE PANCERZY (36 przedmiotów) ---
const armorData = [
    { name: "Old Security Body Armor", klasa: 1, material: "Aramid", durability: 25, weight: "3.7 kg", ergonomics: "-", moveSpeed: "-" },
    { name: "Retro Sapper Chest Armor", klasa: 1, material: "Steel", durability: 25, weight: "6 kg", ergonomics: "-3", moveSpeed: "-1%" },
    { name: "Police Body Armor", klasa: 2, material: "Steel", durability: 40, weight: "5 kg", ergonomics: "-2", moveSpeed: "-1%" },
    { name: "Standard Body Armor", klasa: 2, material: "Aramid", durability: 35, weight: "3.2 kg", ergonomics: "-1", moveSpeed: "-1%" },
    { name: "H-LC Lightweight", klasa: 3, material: "Composite", durability: 55, weight: "4.5 kg", ergonomics: "-", moveSpeed: "-3%" },
    { name: "PCA350 Body Armor", klasa: 3, material: "Aluminum", durability: 50, weight: "6.5 kg", ergonomics: "-2", moveSpeed: "-3%" },
    { name: "KN Regulation Armor", klasa: 3, material: "Aramid", durability: 35, weight: "4 kg", ergonomics: "-1", moveSpeed: "-1%" },
    { name: "KN Assault Armor", klasa: 3, material: "Titanium", durability: 50, weight: "5 kg", ergonomics: "-3", moveSpeed: "-6%" },
    { name: "Sentinel 3 Armor", klasa: 3, material: "Ceramic", durability: 45, weight: "4.8 kg", ergonomics: "-2", moveSpeed: "-4%" },
    { name: "6B3 Body Armor", klasa: 3, material: "Titanium", durability: 55, weight: "8.2 kg", ergonomics: "-5", moveSpeed: "-8%" },
    { name: "H-V3 Lightweight", klasa: 3, material: "Polymer", durability: 40, weight: "3.8 kg", ergonomics: "-1", moveSpeed: "-2%" },
    { name: "Sentry I Armor", klasa: 3, material: "Steel", durability: 50, weight: "7.5 kg", ergonomics: "-4", moveSpeed: "-5%" },
    { name: "6B13 Body Armor", klasa: 4, material: "Composite", durability: 65, weight: "7 kg", ergonomics: "-5", moveSpeed: "-5%" },
    { name: "Indomitable Polymer", klasa: 4, material: "Polymer", durability: 60, weight: "4.5 kg", ergonomics: "-1", moveSpeed: "-2%" },
    { name: "Spartan B Armor", klasa: 4, material: "Ceramic", durability: 60, weight: "5.5 kg", ergonomics: "-2", moveSpeed: "-4%" },
    { name: "926 Lightweight", klasa: 4, material: "Composite", durability: 50, weight: "4.2 kg", ergonomics: "-1", moveSpeed: "-3%" },
    { name: "H-LC Tactical", klasa: 4, material: "Polymer", durability: 55, weight: "5.8 kg", ergonomics: "-2", moveSpeed: "-4%" },
    { name: "6B23 Body Armor", klasa: 4, material: "Steel", durability: 70, weight: "8.2 kg", ergonomics: "-6", moveSpeed: "-7%" },
    { name: "Sentinel 4 Armor", klasa: 4, material: "Ceramic", durability: 65, weight: "6.8 kg", ergonomics: "-4", moveSpeed: "-5%" },
    { name: "KN Patrol Armor", klasa: 4, material: "Titanium", durability: 55, weight: "5.2 kg", ergonomics: "-2", moveSpeed: "-4%" },
    { name: "BT6 Heavy Armor", klasa: 5, material: "Titanium", durability: 90, weight: "8.6 kg", ergonomics: "-4", moveSpeed: "-6%" },
    { name: "KN Field Commander", klasa: 5, material: "Ceramic", durability: 80, weight: "5.7 kg", ergonomics: "-2", moveSpeed: "-5%" },
    { name: "926 Composite Armor", klasa: 5, material: "Composite", durability: 70, weight: "6.5 kg", ergonomics: "-3", moveSpeed: "-4%" },
    { name: "Sentinel 5 Armor", klasa: 5, material: "Ceramic", durability: 85, weight: "7.2 kg", ergonomics: "-4", moveSpeed: "-7%" },
    { name: "IMTV Samurai", klasa: 5, material: "Polymer", durability: 75, weight: "6.1 kg", ergonomics: "-2", moveSpeed: "-3%" },
    { name: "H-LC Heavy Duty", klasa: 5, material: "Titanium", durability: 95, weight: "9.2 kg", ergonomics: "-5", moveSpeed: "-8%" },
    { name: "6B5 Armor", klasa: 5, material: "Ceramic", durability: 80, weight: "7.8 kg", ergonomics: "-4", moveSpeed: "-6%" },
    { name: "KN Defender Armor", klasa: 5, material: "Steel", durability: 100, weight: "10.5 kg", ergonomics: "-7", moveSpeed: "-9%" },
    { name: "926 Hunter Armor", klasa: 5, material: "Polymer", durability: 70, weight: "5.5 kg", ergonomics: "-1", moveSpeed: "-2%" },
    { name: "KN Composite Armor", klasa: 6, material: "Ceramic", durability: 110, weight: "6.9 kg", ergonomics: "-3", moveSpeed: "-7%" },
    { name: "BT101 Tactical", klasa: 6, material: "Polymer", durability: 85, weight: "5 kg", ergonomics: "-1", moveSpeed: "-3%" },
    { name: "6B45 Heavy Armor", klasa: 6, material: "Steel", durability: 120, weight: "12 kg", ergonomics: "-8", moveSpeed: "-10%" },
    { name: "KN Bastion Armor", klasa: 6, material: "Composite", durability: 105, weight: "8.5 kg", ergonomics: "-5", moveSpeed: "-6%" },
    { name: "Sentinel 6 Armor", klasa: 6, material: "Ceramic", durability: 115, weight: "9.8 kg", ergonomics: "-6", moveSpeed: "-8%" },
    { name: "IMTV Phalanx", klasa: 6, material: "Polymer", durability: 95, weight: "7.5 kg", ergonomics: "-3", moveSpeed: "-4%" },
    { name: "H-LC Juggernaut", klasa: 6, material: "Titanium", durability: 130, weight: "14 kg", ergonomics: "-10", moveSpeed: "-12%" }
];

// --- 4. DANE HEŁMÓW (39 przedmiotów) ---
const helmetData = [
    { name: "Ssh68 Helmet", klasa: 1, material: "Steel", durability: 30, weight: "3.5 kg", ergonomics: "-2", moveSpeed: "-1%" },
    { name: "Standard Police", klasa: 2, material: "Steel", durability: 25, weight: "1.2 kg", ergonomics: "-1", moveSpeed: "0%" },
    { name: "Industrial Helmet", klasa: 2, material: "Polymer", durability: 20, weight: "0.9 kg", ergonomics: "0", moveSpeed: "0%" },
    { name: "SH40 Helmet", klasa: 2, material: "Steel", durability: 35, weight: "1.5 kg", ergonomics: "-2", moveSpeed: "-1%" },
    { name: "Type 2 Helmet", klasa: 2, material: "Polymer", durability: 22, weight: "0.8 kg", ergonomics: "0", moveSpeed: "0%" },
    { name: "PASGT Helmet", klasa: 3, material: "Aramid", durability: 40, weight: "1.4 kg", ergonomics: "-2", moveSpeed: "-1%" },
    { name: "KSS Tactical", klasa: 3, material: "Composite", durability: 35, weight: "1.1 kg", ergonomics: "-1", moveSpeed: "0%" },
    { name: "6B7 Helmet", klasa: 3, material: "Aramid", durability: 45, weight: "1.6 kg", ergonomics: "-2", moveSpeed: "-1%" },
    { name: "H-V2 Helmet", klasa: 3, material: "Polymer", durability: 30, weight: "1 kg", ergonomics: "0", moveSpeed: "0%" },
    { name: "Sentry II Helmet", klasa: 3, material: "Steel", durability: 40, weight: "2.2 kg", ergonomics: "-3", moveSpeed: "-1%" },
    { name: "LWH Helmet", klasa: 3, material: "Aramid", durability: 42, weight: "1.5 kg", ergonomics: "-2", moveSpeed: "-1%" },
    { name: "PS5 Helmet", klasa: 3, material: "Composite", durability: 38, weight: "1.2 kg", ergonomics: "-1", moveSpeed: "0%" },
    { name: "Indomitable Polymer", klasa: 4, material: "Polymer", durability: 45, weight: "1.3 kg", ergonomics: "-2", moveSpeed: "-1%" },
    { name: "6B13 Helmet", klasa: 4, material: "Composite", durability: 50, weight: "2.1 kg", ergonomics: "-3", moveSpeed: "-2%" },
    { name: "926 Lightweight", klasa: 4, material: "Composite", durability: 45, weight: "1.2 kg", ergonomics: "-1", moveSpeed: "0%" },
    { name: "Fast Bulletproof", klasa: 4, material: "Aramid", durability: 50, weight: "1.5 kg", ergonomics: "-2", moveSpeed: "-1%" },
    { name: "MICH 2000", klasa: 4, material: "Aramid", durability: 55, weight: "1.6 kg", ergonomics: "-2", moveSpeed: "-1%" },
    { name: "Tactical B Helmet", klasa: 4, material: "Polymer", durability: 48, weight: "1.4 kg", ergonomics: "-1", moveSpeed: "-1%" },
    { name: "Sentinel 4 Helmet", klasa: 4, material: "Ceramic", durability: 52, weight: "1.8 kg", ergonomics: "-3", moveSpeed: "-2%" },
    { name: "Kask-M", klasa: 4, material: "Steel", durability: 55, weight: "2.8 kg", ergonomics: "-4", moveSpeed: "-2%" },
    { name: "ST-44", klasa: 4, material: "Titanium", durability: 50, weight: "2.0 kg", ergonomics: "-3", moveSpeed: "-1%" },
    { name: "DK-7", klasa: 4, material: "Polymer", durability: 45, weight: "1.1 kg", ergonomics: "-1", moveSpeed: "0%" },
    { name: "ZSh-1", klasa: 4, material: "Aluminum", durability: 48, weight: "1.7 kg", ergonomics: "-3", moveSpeed: "-2%" },
    { name: "BT6 Heavy Helmet", klasa: 5, material: "Titanium", durability: 60, weight: "2.5 kg", ergonomics: "-4", moveSpeed: "-3%" },
    { name: "KN Field Commander", klasa: 5, material: "Ceramic", durability: 55, weight: "1.8 kg", ergonomics: "-2", moveSpeed: "-2%" },
    { name: "Sentinel 5 Helmet", klasa: 5, material: "Ceramic", durability: 60, weight: "2.2 kg", ergonomics: "-3", moveSpeed: "-3%" },
    { name: "H-LC Heavy Helmet", klasa: 5, material: "Titanium", durability: 65, weight: "2.8 kg", ergonomics: "-5", moveSpeed: "-4%" },
    { name: "926 Hunter Helmet", klasa: 5, material: "Polymer", durability: 58, weight: "1.6 kg", ergonomics: "-2", moveSpeed: "-2%" },
    { name: "KN Defender Helmet", klasa: 5, material: "Steel", durability: 70, weight: "3.5 kg", ergonomics: "-6", moveSpeed: "-5%" },
    { name: "Viking-5", klasa: 5, material: "Titanium", durability: 62, weight: "2.9 kg", ergonomics: "-5", moveSpeed: "-3%" },
    { name: "Altyn Helmet", klasa: 5, material: "Titanium", durability: 75, weight: "4.2 kg", ergonomics: "-8", moveSpeed: "-5%" },
    { name: "KN Composite Helmet", klasa: 6, material: "Ceramic", durability: 70, weight: "2.2 kg", ergonomics: "-3", moveSpeed: "-4%" },
    { name: "BT101 Tactical", klasa: 6, material: "Polymer", durability: 65, weight: "1.9 kg", ergonomics: "-2", moveSpeed: "-2%" },
    { name: "6B47 Heavy Helmet", klasa: 6, material: "Steel", durability: 80, weight: "4.5 kg", ergonomics: "-6", moveSpeed: "-5%" },
    { name: "Bastion Helmet", klasa: 6, material: "Composite", durability: 75, weight: "2.4 kg", ergonomics: "-4", moveSpeed: "-3%" },
    { name: "Sentinel 6 Helmet", klasa: 6, material: "Ceramic", durability: 85, weight: "2.6 kg", ergonomics: "-5", moveSpeed: "-4%" },
    { name: "Phalanx Helmet", klasa: 6, material: "Polymer", durability: 72, weight: "2.1 kg", ergonomics: "-3", moveSpeed: "-3%" },
    { name: "Juggernaut Visor", klasa: 6, material: "Titanium", durability: 90, weight: "5.2 kg", ergonomics: "-8", moveSpeed: "-6%" },
    { name: "Mask-1", klasa: 6, material: "Steel", durability: 85, weight: "4.8 kg", ergonomics: "-9", moveSpeed: "-6%" }
];

let currentType = 'ammo';

// --- 5. LOGIKA WYŚWIETLANIA ---
function displayData(data, type) {
    const tableBody = document.getElementById('tableBody');
    if (!tableBody) return;
    tableBody.innerHTML = '';
    currentType = type;

    let lastCaliber = "";

    data.forEach(item => {
        // Separator kalibru dla amunicji
        if (type === 'ammo' && item.caliber !== lastCaliber) {
            const separator = document.createElement('tr');
            separator.style.background = "#222";
            separator.style.fontWeight = "bold";
            separator.style.color = "#ff6600";
            separator.innerHTML = `<td colspan="7" style="text-align: center; font-size: 0.75rem; letter-spacing: 3px; border-bottom: 1px solid #ff6600; padding: 15px 0;">--- ${item.caliber.toUpperCase()} ---</td>`;
            tableBody.appendChild(separator);
            lastCaliber = item.caliber;
        }

        const row = document.createElement('tr');
        
        if (type === 'ammo') {
            const penColor = getColorByLevel(item.penetration);
            row.innerHTML = `
                <td>${item.name}</td>
                <td>${item.caliber}</td>
                <td style="color: ${penColor}; font-weight: bold;">${item.penetration}</td>
                <td>${item.damage}</td>
                <td>-</td><td>-</td><td>-</td>`;
        } else {
            const classColor = getColorByLevel(item.klasa);
            row.innerHTML = `
                <td>${item.name}</td>
                <td style="color: ${classColor}; font-weight: bold;">Klasa ${item.klasa}</td>
                <td>${item.material}</td>
                <td>${item.durability}</td>
                <td>${item.weight}</td>
                <td>${item.ergonomics}</td>
                <td>${item.moveSpeed}</td>`;
        }
        tableBody.appendChild(row);
    });
}

// --- 6. OBSŁUGA INTERFEJSU ---
function showSection(type) {
    const title = document.getElementById('mainTitle');
    if (type === 'ammo') {
        title.innerHTML = "ARENA BREAKOUT <span>AMMO</span>";
        displayData(ammoData, 'ammo');
    } else if (type === 'armor') {
        title.innerHTML = "ARENA BREAKOUT <span>ARMOR</span>";
        displayData(armorData, 'armor');
    } else if (type === 'helmets') {
        title.innerHTML = "ARENA BREAKOUT <span>HELMETS</span>";
        displayData(helmetData, 'helmets');
    }
    document.getElementById('search').value = '';
    toggleMenu();
}

function toggleMenu() {
    const menu = document.getElementById("sideMenu");
    const overlay = document.getElementById("overlay");
    const isOpen = menu.style.width === "250px";
    menu.style.width = isOpen ? "0" : "250px";
    overlay.style.display = isOpen ? "none" : "block";
}

document.getElementById('search').addEventListener('input', (e) => {
    const text = e.target.value.toLowerCase();
    let dataToFilter;
    if (currentType === 'ammo') dataToFilter = ammoData;
    else if (currentType === 'armor') dataToFilter = armorData;
    else dataToFilter = helmetData;

    const filtered = dataToFilter.filter(item => item.name.toLowerCase().includes(text));
    displayData(filtered, currentType);
});

function toggleMusic() {
    const music = document.getElementById("bgMusic");
    const btn = document.getElementById("musicBtn");
    if (music.paused) {
        music.play();
        btn.innerText = "⏸️ PAUZA";
    } else {
        music.pause();
        btn.innerText = "🎵 GRAJ MUZYKĘ";
    }
}

window.onload = () => displayData(ammoData, 'ammo');
// Funkcja otwierająca zdjęcie
function openImage(element) {
    const modal = document.getElementById("imageModal");
    const fullImg = document.getElementById("fullImage");
    const captionText = document.getElementById("caption");
    
    modal.style.display = "block";
    fullImg.src = element.src; // Pobiera źródło klikniętego zdjęcia
    captionText.innerHTML = element.alt; // Pobiera opis z atrybutu alt
}

// Funkcja zamykająca okno
function closeImage() {
    document.getElementById("imageModal").style.display = "none";
}
