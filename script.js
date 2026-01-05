const ammoData = [
  
  
    // Kaliber 9x19mm
    { name: "9x19mm Dum-Dum", caliber: "9x19", penetration: 0, damage: 74 },
   { name: "9x19mm PSO", caliber: "9x19", penetration: 1, damage: 54 },
   { name: "9x19mm Pst", caliber: "9x19", penetration: 2, damage: 50 },
    { name: "9x19mm AP6.3", caliber: "9x19", penetration: 3, damage: 45 },
    { name: "9x19mm 7N31", caliber: "9x19", penetration: 4, damage: 40 },

    // Kaliber 5.56x45mm
    { name: "5.56x45mm HP", caliber: "5.56x45", penetration: 1, damage: 69 },
    { name: "5.56x45mm M193", caliber: "5.56x45", penetration: 1, damage: 52},
    { name: "5.56x45mm FMJ", caliber: "5.56x45", penetration: 2, damage: 53 },
    { name: "5.56x45mm M855", caliber: "5.56x45", penetration: 3, damage: 51 },
    { name: "5.56x45mm M855A1", caliber: "5.56x45", penetration: 4, damage: 49 },
    { name: "5.56x45mm M995", caliber: "5.56x45", penetration: 5, damage: 42 },

    // Kaliber 7.62x51mm
    { name: "7.62x51mm UN", caliber: "7.62x51", penetration: 1, damage: 79 },
    { name: "7.62x51mm BPZ", caliber: "7.62x51", penetration: 3, damage: 71 },
    { name: "7.62x51mm M80", caliber: "7.62x51", penetration: 4, damage: 65 },
    { name: "7.62x51mm M62", caliber: "7.62x51", penetration: 5, damage: 59 },
    { name: "7.62x51mm M61", caliber: "7.62x51", penetration: 6, damage: 70 }
   
];

const armorData = [
    { name: "6B45 Heavy Armor", caliber: "Klasa 6", penetration: "Heavy", damage: "90 Durability" },
    { name: "Indomitable Armor", caliber: "Klasa 5", penetration: "Medium", damage: "85 Durability" },
    { name: "KN Assault", caliber: "Klasa 4", penetration: "Light", damage: "70 Durability" }
];

const tableBody = document.getElementById('ammoData');
const searchInput = document.getElementById('search');

function displayAmmo(data) {
    tableBody.innerHTML = "";
    let lastCaliber = "";

    data.forEach(item => {
        if (item.caliber !== lastCaliber) {
            let groupRow = `<tr class="caliber-group">
                <td colspan="4">KALIBER: ${item.caliber}</td>
            </tr>`;
            tableBody.innerHTML += groupRow;
            lastCaliber = item.caliber;
        }

        let penClass = "pen-" + item.penetration;

        let row = `<tr>
            <td>${item.name}</td>
            <td>${item.caliber}</td>
            <td class="pen-val ${penClass}">${item.penetration}</td>
            <td>${item.damage}</td>
        </tr>`;
        tableBody.innerHTML += row;
    });
}

searchInput.addEventListener('input', (e) => {
    const text = e.target.value.toLowerCase();
    const filtered = ammoData.filter(ammo => 
        ammo.name.toLowerCase().includes(text) || 
        ammo.caliber.toLowerCase().includes(text)
    );
    displayAmmo(filtered);
});

displayAmmo(ammoData);
function toggleMenu() {
    const menu = document.getElementById("sideMenu");
    const overlay = document.getElementById("overlay");
    
    if (menu.style.width === "250px") {
        menu.style.width = "0";
        overlay.style.display = "none";
    } else {
        menu.style.width = "250px";
        overlay.style.display = "block";
    }
}

// Funkcja, która narazie tylko zamyka menu (możesz ją rozbudować)
function showSection(section) {
    toggleMenu();
    alert("Wybrano sekcję: " + section + ". Możesz tu dodać nową tabelę!");
}
function showSection(type) {
    const title = document.querySelector('h1');
    const headerKlasa = document.querySelector('thead th:nth-child(3)'); // Łapie trzecią kolumnę
    
    if (type === 'ammo') {
        title.innerHTML = "ARENA BREAKOUT <span>AMMO</span>";
        headerKlasa.innerText = "Penetracja"; // Dla amunicji zostaje Penetracja
        displayAmmo(ammoData);
    } 
    else if (type === 'armor') {
        title.innerHTML = "ARENA BREAKOUT <span>ARMOR</span>";
        headerKlasa.innerText = "Klasa"; // Dla zbroi zmienia się na Klasa
        displayAmmo(armorData);
    }
    
    if (typeof toggleMenu === "function") toggleMenu();
}

function toggleMusic() {
    const music = document.getElementById("bgMusic");
    const btn = document.getElementById("musicBtn");

    if (music.paused) {
        music.play();
        btn.innerText = "⏸️ PAUZA";
        btn.style.boxShadow = "0 0 20px #ff6600"; // Efekt świecenia gdy gra
    } else {
        music.pause();
        btn.innerText = "🎵 GRAJ MUZYKĘ";
        btn.style.boxShadow = "none";
    }
}
