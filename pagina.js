document.addEventListener('DOMContentLoaded', () => {
  const petalsOuterGroup = document.getElementById('petalsOuterGroup');
  const petalsMidGroup = document.getElementById('petalsMidGroup');
  const petalsInnerGroup = document.getElementById('petalsInnerGroup');
  const seedsGroup = document.getElementById('seedsGroup');
  const particlesContainer = document.getElementById('particles-container');
  const bokehContainer = document.getElementById('bokeh-container');
  const gardenContainer = document.getElementById('gardenContainer');
  const musicBtn = document.getElementById('musicBtn');

  // Helper para trazado de pétalos
  function createPetalPath(length, width) {
    return `M 0,0 C -${width},-${length*0.3} -${width*0.85},-${length*0.82} 0,-${length} C ${width*0.85},-${length*0.82} ${width},-${length*0.3} 0,0 Z`;
  }

  // 1. Capa Exterior de Pétalos
  const numOuter = 24;
  for (let i = 0; i < numOuter; i++) {
    const angle = (360 / numOuter) * i;
    const petal = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    petal.setAttribute('d', createPetalPath(175, 34));
    petal.setAttribute('class', 'petal');
    petal.style.setProperty('--angle', `${angle}deg`);
    petal.style.animationDelay = `${1.0 + (i * 0.03)}s`;
    petalsOuterGroup.appendChild(petal);
  }

  // 2. Capa Intermedia de Pétalos
  const numMid = 22;
  for (let i = 0; i < numMid; i++) {
    const angle = (360 / numMid) * i + (360 / numMid / 2);
    const petal = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    petal.setAttribute('d', createPetalPath(155, 30));
    petal.setAttribute('class', 'petal petal-mid');
    petal.style.setProperty('--angle', `${angle}deg`);
    petal.style.animationDelay = `${1.3 + (i * 0.03)}s`;
    petalsMidGroup.appendChild(petal);
  }

  // 3. Capa Interior de Pétalos
  const numInner = 20;
  for (let i = 0; i < numInner; i++) {
    const angle = (360 / numInner) * i + (360 / numInner / 4);
    const petal = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    petal.setAttribute('d', createPetalPath(130, 26));
    petal.setAttribute('class', 'petal petal-inner');
    petal.style.setProperty('--angle', `${angle}deg`);
    petal.style.animationDelay = `${1.6 + (i * 0.03)}s`;
    petalsInnerGroup.appendChild(petal);
  }

  // 4. Semillas del Girasol Central
  const numSeeds = 160;
  const goldenAngle = 137.5 * (Math.PI / 180);
  for (let i = 0; i < numSeeds; i++) {
    const r = 6.6 * Math.sqrt(i);
    const theta = i * goldenAngle;
    const x = r * Math.cos(theta);
    const y = r * Math.sin(theta);

    const seed = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    seed.setAttribute('cx', x);
    seed.setAttribute('cy', y);
    seed.setAttribute('r', 2.0 + (i * 0.008));
    seed.setAttribute('class', 'seed');
    seedsGroup.appendChild(seed);
  }

  // 5. Crear la Pradera Adaptativa con Briznas de Césped
  const isMobile = window.innerWidth <= 600;
  let positions = [];
  if (isMobile) {
    positions = [3, 8, 14, 21, 28, 35, 42, 58, 65, 72, 79, 86, 92, 97];
  } else {
    const totalPcFlowers = 38;
    for (let i = 0; i < totalPcFlowers; i++) {
      positions.push(1 + (i * (98 / (totalPcFlowers - 1))));
    }
  }

  positions.forEach((leftPos) => {
    const flower = document.createElement('div');
    flower.className = 'garden-flower';
    
    const baseHeight = isMobile ? 100 : 120;
    const height = Math.random() * 60 + baseHeight; 
    const scale = (Math.random() * 0.35 + 0.65).toFixed(2);
    
    flower.style.left = `${leftPos}%`;
    flower.style.height = `${height}px`;
    flower.style.animationDuration = `${3 + Math.random() * 2.5}s`;
    flower.style.animationDelay = `${Math.random() * 2}s`;

    flower.innerHTML = `
      <svg viewBox="0 0 60 140" style="width: ${45 * scale}px; height: ${height}px;">
        <!-- Briznas de pasto en la base de la flor -->
        <path d="M15,140 Q10,120 5,115 M20,140 Q25,120 30,110 M40,140 Q45,125 52,118" stroke="#516d2b" stroke-width="2.5" fill="none"/>
        
        <!-- Tallo -->
        <path d="M30,140 Q${25 + Math.random()*10},70 30,30" stroke="#68823b" stroke-width="4" fill="none"/>
        <path d="M30,85 Q10,70 18,55 Q30,70 30,85" fill="#68823b"/>
        <path d="M30,75 Q50,60 42,45 Q30,60 30,75" fill="#68823b"/>
        
        <!-- Flor -->
        <g transform="translate(30, 30)">
          ${Array.from({length: 12}).map((_, i) => `
            <ellipse cx="0" cy="-14" rx="4" ry="11" fill="#fbd634" transform="rotate(${i * 30})" />
          `).join('')}
          <circle cx="0" cy="0" r="8" fill="#8d4a1b"/>
          <circle cx="0" cy="0" r="4" fill="#4a2205"/>
        </g>
      </svg>
    `;

    gardenContainer.appendChild(flower);
  });

  // 6. Luces Bokeh
  for (let i = 0; i < 25; i++) {
    const bokeh = document.createElement('div');
    bokeh.className = 'bokeh';
    const size = Math.random() * 45 + 22;
    bokeh.style.width = `${size}px`;
    bokeh.style.height = `${size}px`;
    bokeh.style.left = `${Math.random() * 100}%`;
    bokeh.style.animationDelay = `${Math.random() * 8}s`;
    bokeh.style.animationDuration = `${6 + Math.random() * 6}s`;
    bokehContainer.appendChild(bokeh);
  }

  // 7. Pétalos Flotantes
  for (let i = 0; i < 35; i++) {
    const petal = document.createElement('div');
    petal.className = 'falling-petal';
    const width = Math.random() * 14 + 8;
    const height = width * 1.6;
    petal.style.width = `${width}px`;
    petal.style.height = `${height}px`;
    petal.style.left = `${Math.random() * 100}%`;
    petal.style.animationDelay = `${Math.random() * 10}s`;
    petal.style.animationDuration = `${7 + Math.random() * 7}s`;
    particlesContainer.appendChild(petal);
  }

  // 8. Música MP3
  const audio = new Audio('Musica.mp3'); 
  audio.loop = true;

  let isPlaying = false;

  musicBtn.addEventListener('click', () => {
    if (!isPlaying) {
      audio.play().then(() => {
        isPlaying = true;
        musicBtn.style.background = 'rgba(255, 230, 150, 0.9)';
      }).catch(err => {
        console.error("Error al reproducir audio:", err);
      });
    } else {
      audio.pause();
      isPlaying = false;
      musicBtn.style.background = 'rgba(255, 255, 255, 0.75)';
    }
  });
});