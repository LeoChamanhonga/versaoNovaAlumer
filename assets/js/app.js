// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const menuList = document.getElementById('menuList');
if (menuToggle && menuList){
  menuToggle.addEventListener('click', () => {
    const open = menuList.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(open));
  });
  menuList.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    menuList.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  }));
}

// Smooth scroll (internal links)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e){
    const id = this.getAttribute('href').slice(1);
    const target = document.getElementById(id);
    if(target){
      e.preventDefault();
      target.scrollIntoView({behavior:'smooth', block:'start'});
      history.pushState(null, '', '#'+id);
    }
  });
});

// IntersectionObserver for reveal animations
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Counter animation
const counters = document.querySelectorAll('[data-counter]');
const countersObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseInt(el.getAttribute('data-counter'), 10);
      let cur = 0;
      const step = Math.max(1, Math.floor(target / 80));
      const timer = setInterval(() => {
        cur += step;
        if (cur >= target){ cur = target; clearInterval(timer); }
        el.textContent = cur.toString();
      }, 16);
      countersObserver.unobserve(el);
    }
  });
}, {threshold:0.4});
counters.forEach(el => countersObserver.observe(el));

// Portfolio Carousel
const galleryTrack = document.querySelector('.gallery-track');
const galleryItems = document.querySelectorAll('.gallery-item');
const prevBtn = document.querySelector('.gallery-nav.prev');
const nextBtn = document.querySelector('.gallery-nav.next');
const galleryDots = document.querySelectorAll('.gallery-dot');

if (galleryTrack && galleryItems.length > 0) {
  let currentIndex = 0;
  const itemsToShow = Math.min(3, galleryItems.length);
  const maxIndex = Math.max(0, galleryItems.length - itemsToShow);

  function updateCarousel() {
    const itemWidth = 300 + 16; // item width + gap
    const translateX = -currentIndex * itemWidth;
    galleryTrack.style.transform = `translateX(${translateX}px)`;

    // Update navigation buttons
    if (prevBtn) prevBtn.disabled = currentIndex === 0;
    if (nextBtn) nextBtn.disabled = currentIndex >= maxIndex;

    // Update dots
    galleryDots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentIndex);
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (currentIndex > 0) {
        currentIndex--;
        updateCarousel();
      }
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (currentIndex < maxIndex) {
        currentIndex++;
        updateCarousel();
      }
    });
  }

  // Dot navigation
  galleryDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      if (index <= maxIndex) {
        currentIndex = index;
        updateCarousel();
      }
    });
  });

  // Initialize carousel
  updateCarousel();

  // Auto-play (optional)
  setInterval(() => {
    if (currentIndex >= maxIndex) {
      currentIndex = 0;
    } else {
      currentIndex++;
    }
    updateCarousel();
  }, 4000);
}

// Lightbox for gallery
const lightbox = document.getElementById('lightbox');
if (lightbox){
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCap = document.getElementById('lightboxCap');
  document.querySelectorAll('.gallery-item').forEach(a => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      const href = a.getAttribute('href');
      const cap = a.getAttribute('data-caption') || '';
      lightboxImg.src = href;
      lightboxImg.alt = cap;
      lightboxCap.textContent = cap;
      if (typeof lightbox.showModal === 'function') lightbox.showModal();
      else lightbox.setAttribute('open', '');
    });
  });
  lightbox.querySelector('.lightbox-close').addEventListener('click', () => {
    lightbox.close ? lightbox.close() : lightbox.removeAttribute('open');
  });
  lightbox.addEventListener('click', (e) => {
    const rect = lightbox.querySelector('figure').getBoundingClientRect();
    const inDialog = e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom;
    if (!inDialog) lightbox.close ? lightbox.close() : lightbox.removeAttribute('open');
  });
}

// ===== Translation System =====
const translations = {
  pt: {
    // Navigation
    'nav-services': 'Serviços',
    'nav-fleet': 'Frota',
    'nav-portfolio': 'Portfólio',
    'nav-about': 'Sobre',
    'nav-contact': 'Contacto',
    'nav-quote': 'Pedir Cotação',

    // Hero Section
    'hero-title': 'Aluguer de Inertes & Logística de Entrega',
    'hero-subtitle': 'Areia, brita, tout-venant e mais — <strong>com transporte</strong> e frota própria. Qualidade, prazos e segurança para a sua obra.',
    'hero-portfolio': 'Ver Portfólio',
    'stat-projects': 'Projetos',
    'stat-vehicles': 'Veículos',
    'stat-sla': '% SLA',

    // Services
    'services-title': 'O que fazemos',
    'services-subtitle': 'Portfólio completo para abastecimento e movimentação de inertes.',
    'service1-title': 'Fornecimento de Inertes',
    'service1-desc': 'Areia, brita, tout-venant e cascalho com controlo de qualidade e rastreio por lote.',
    'service2-title': 'Transporte & Entrega',
    'service2-desc': 'Planeamento de rotas e descarga em obra com camiões basculantes e gruas.',
    'service3-title': 'Aluguer de Equipamentos',
    'service3-desc': 'Pás carregadoras, escavadoras e bulldozers com operadores certificados.',
    'service4-title': 'Gestão de Obras',
    'service4-desc': 'Equipa técnica, medições e relatórios para garantir prazos e custos.',

    // Fleet
    'fleet-title': 'Frota & Equipamentos',
    'fleet-subtitle': 'Manutenção preventiva, telemetria e operadores treinados.',

    // Contact
    'contact-title': 'Contacto & Orçamentos',
    'contact-subtitle': 'Preencha o formulário e retornamos com uma cotação personalizada.',
    'form-name': 'Nome',
    'form-email': 'E-mail',
    'form-phone': 'Telefone/WhatsApp',
    'form-material': 'Material',
    'form-quantity': 'Quantidade (m³)',
    'form-location': 'Local de Entrega',
    'form-details': 'Detalhes adicionais',
    'form-submit': 'Enviar pedido',
    'form-name-placeholder': 'O seu nome',
    'form-email-placeholder': 'nome@empresa.com',
    'form-phone-placeholder': '+258 ...',
    'form-location-placeholder': 'Bairro/Obra, Cidade',
    'form-details-placeholder': 'Datas, restrições de acesso, etc.',
    'form-select': 'Selecione...',
    'material-sand': 'Areia',
    'material-gravel': 'Brita 19mm',
    'material-allcoming': 'Tout-venant',
    'material-stone': 'Cascalho',
    'material-other': 'Outro'
  },
  en: {
    // Navigation
    'nav-services': 'Services',
    'nav-fleet': 'Fleet',
    'nav-portfolio': 'Portfolio',
    'nav-about': 'About',
    'nav-contact': 'Contact',
    'nav-quote': 'Get Quote',

    // Hero Section
    'hero-title': 'Aggregates Rental & Delivery Logistics',
    'hero-subtitle': 'Sand, gravel, all-in aggregate and more — <strong>with transport</strong> and own fleet. Quality, deadlines and safety for your construction site.',
    'hero-portfolio': 'View Portfolio',
    'stat-projects': 'Projects',
    'stat-vehicles': 'Vehicles',
    'stat-sla': '% SLA',

    // Services
    'services-title': 'What we do',
    'services-subtitle': 'Complete portfolio for aggregates supply and movement.',
    'service1-title': 'Aggregates Supply',
    'service1-desc': 'Sand, gravel, all-in aggregate and crushed stone with quality control and batch tracking.',
    'service2-title': 'Transport & Delivery',
    'service2-desc': 'Route planning and on-site discharge with dump trucks and cranes.',
    'service3-title': 'Equipment Rental',
    'service3-desc': 'Wheel loaders, excavators and bulldozers with certified operators.',
    'service4-title': 'Construction Management',
    'service4-desc': 'Technical team, measurements and reports to ensure deadlines and costs.',

    // Fleet
    'fleet-title': 'Fleet & Equipment',
    'fleet-subtitle': 'Preventive maintenance, telemetry and trained operators.',

    // Contact
    'contact-title': 'Contact & Quotes',
    'contact-subtitle': 'Fill out the form and we will return with a personalized quote.',
    'form-name': 'Name',
    'form-email': 'Email',
    'form-phone': 'Phone/WhatsApp',
    'form-material': 'Material',
    'form-quantity': 'Quantity (m³)',
    'form-location': 'Delivery Location',
    'form-details': 'Additional Details',
    'form-submit': 'Send Request',
    'form-name-placeholder': 'Your name',
    'form-email-placeholder': 'name@company.com',
    'form-phone-placeholder': '+258 ...',
    'form-location-placeholder': 'District/Site, City',
    'form-details-placeholder': 'Dates, access restrictions, etc.',
    'form-select': 'Select...',
    'material-sand': 'Sand',
    'material-gravel': 'Gravel 19mm',
    'material-allcoming': 'All-in aggregate',
    'material-stone': 'Crushed stone',
    'material-other': 'Other'
  }
};

let currentLanguage = 'pt';

function translatePage(lang) {
  if (!translations[lang]) {
    console.warn(`Translation for language '${lang}' not found`);
    return;
  }

  currentLanguage = lang;

  // Translate elements with data-translate attribute
  const elements = document.querySelectorAll('[data-translate]');
  elements.forEach(el => {
    const key = el.getAttribute('data-translate');
    if (translations[lang][key]) {
      el.innerHTML = translations[lang][key];
    } else {
      console.warn(`Translation key '${key}' not found for language '${lang}'`);
    }
  });

  // Handle placeholders
  const placeholderElements = document.querySelectorAll('[data-translate-placeholder]');
  placeholderElements.forEach(el => {
    const key = el.getAttribute('data-translate-placeholder');
    if (translations[lang][key]) {
      el.placeholder = translations[lang][key];
    }
  });

  // Update language button
  const currentLangEl = document.getElementById('currentLang');
  if (currentLangEl) {
    currentLangEl.textContent = lang.toUpperCase();
  }

  // Update document language attribute
  document.documentElement.lang = lang;

  // Save language preference
  localStorage.setItem('preferred-language', lang);
}

// Language toggle functionality
const langToggle = document.getElementById('langToggle');
if (langToggle) {
  langToggle.addEventListener('click', () => {
    const newLang = currentLanguage === 'pt' ? 'en' : 'pt';
    translatePage(newLang);
  });
}

// Initialize translation system
function initTranslations() {
  // Load saved language or default to Portuguese
  const savedLang = localStorage.getItem('preferred-language') || 'pt';
  currentLanguage = savedLang;

  // Update language button display
  const currentLangEl = document.getElementById('currentLang');
  if (currentLangEl) {
    currentLangEl.textContent = savedLang.toUpperCase();
  }

  // Apply translations if not Portuguese
  if (savedLang !== 'pt') {
    translatePage(savedLang);
  }
}

// Load saved language or default to Portuguese
document.addEventListener('DOMContentLoaded', initTranslations);

// ===== Theme Toggle (Dark/Light Mode) =====
let currentTheme = 'light';

function toggleTheme() {
  currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', currentTheme);

  // Update theme icon
  const themeIcon = document.getElementById('themeIcon');
  if (themeIcon) {
    themeIcon.textContent = currentTheme === 'light' ? '☀️' : '🌙';
  }

  // Save theme preference
  localStorage.setItem('preferred-theme', currentTheme);
}

// Theme toggle functionality
const themeToggle = document.getElementById('themeToggle');
if (themeToggle) {
  themeToggle.addEventListener('click', toggleTheme);
}

// Initialize theme on page load
function initTheme() {
  // Load saved theme or default to light
  const savedTheme = localStorage.getItem('preferred-theme') || 'light';
  currentTheme = savedTheme;

  // Apply theme
  document.documentElement.setAttribute('data-theme', currentTheme);

  // Update theme icon
  const themeIcon = document.getElementById('themeIcon');
  if (themeIcon) {
    themeIcon.textContent = currentTheme === 'light' ? '☀️' : '🌙';
  }
}

// Initialize theme on page load
document.addEventListener('DOMContentLoaded', initTheme);

// ===== Hero Image Blocks Animation =====
function initImageBlocksAnimation() {
  const imageBlocks = document.querySelectorAll('.image-block');
  if (imageBlocks.length < 4) {
    console.log('Need at least 4 image blocks for animation');
    return;
  }

  const positions = ['pos-1', 'pos-2', 'pos-3', 'pos-4', 'pos-hidden'];
  let currentIndex = 0;
  const visibleCount = 4; // Show 4 images at a time

  function updatePositions() {
    imageBlocks.forEach((block, index) => {
      // Remove all position classes
      positions.forEach(pos => block.classList.remove(pos));
      
      // Calculate position for this block
      const relativeIndex = (index - currentIndex + imageBlocks.length) % imageBlocks.length;
      
      if (relativeIndex < visibleCount) {
        // Visible positions
        block.classList.add(positions[relativeIndex]);
      } else {
        // Hidden position
        block.classList.add('pos-hidden');
      }
    });
  }

  function cycleImages() {
    currentIndex = (currentIndex + 1) % imageBlocks.length;
    updatePositions();
  }

  // Initialize first display
  updatePositions();
  
  // Add initial animation delay for smoother start
  setTimeout(() => {
    // Start the animation cycle
    setInterval(cycleImages, 2500);
  }, 1000);
  
  console.log('Image blocks animation initialized with', imageBlocks.length, 'images');
}

// Initialize image blocks animation when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initImageBlocksAnimation);
} else {
  initImageBlocksAnimation();
}

// ===== 3D Equipamentos (Three.js) =====
(function(){
  const mount = document.getElementById('threeRoot');
  if (!mount) {
    console.warn('3D container not found');
    return;
  }

  // Wait for Three.js to load
  function init3D() {
    if (typeof THREE === "undefined") {
      console.warn('Three.js not loaded');
      setTimeout(init3D, 100);
      return;
    }

  // Basic sizes and scene
  const scale = 0.5; // 1m = 0.5 world units
  const scene = new THREE.Scene();
  scene.background = null;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha:true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(mount.clientWidth, mount.clientHeight);
  mount.appendChild(renderer.domElement);

  const camera = new THREE.PerspectiveCamera(50, mount.clientWidth/mount.clientHeight, 0.1, 1000);
  camera.position.set(12, 10, 16);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.target.set(6, 1.5, 0);

  // Lights
  const hemi = new THREE.HemisphereLight(0xffffff, 0x444444, 0.9);
  hemi.position.set(0, 20, 0);
  scene.add(hemi);
  const dir = new THREE.DirectionalLight(0xffffff, 0.8);
  dir.position.set(10, 12, 6);
  scene.add(dir);

  // Ground grid (1m)
  const grid = new THREE.GridHelper(60, 60, 0x3240a8, 0x1e2745);
  grid.position.y = 0;
  scene.add(grid);

  // Equipment data (approximate dimensions in meters)
  const equipment = [
    // path: URL para o GLTF/GLB. Se não existir, o sistema usa a caixa dimensional.
    { id:'truck', name:'Camião Basculante', dims:{L:7.5, W:2.5, H:3.4}, color:'#e31b23', pos:[0,0,0], note:'Capacidade 18–24m³', path:'assets/models/truck.glb' },
    { id:'loader', name:'Pá Carregadora',   dims:{L:6.6, W:2.4, H:3.1}, color:'#2a2f85', pos:[10,0,0], note:'Baldes 2.5–4m³', path:'assets/models/loader.glb' },
    { id:'excavator', name:'Escavadora',    dims:{L:9.0, W:3.0, H:3.2}, color:'#e37419', pos:[20,0,0], note:'Classe 20–36t', path:'assets/models/excavator.glb' }
  ];

  const group = new THREE.Group();
  scene.add(group);


  // Try to load GLTF model; if fails, fall back to box
  function createEquipment(item, onReady){
    if (typeof GLTFLoader !== 'undefined' && item.path){
      const loader = new GLTFLoader();
      loader.load(item.path, (gltf) => {
        const root = gltf.scene;
        root.traverse(n => {
          if (n.isMesh) { n.castShadow = true; n.receiveShadow = true; }
        });
        // Attempt to fit to target dimensions by scaling uniformly based on length (X)
        const box = new THREE.Box3().setFromObject(root);
        const size = box.getSize(new THREE.Vector3());
        const desired = item.dims.L * scale;
        const s = desired > 0 && size.x > 0 ? (desired / size.x) : 1;
        root.scale.setScalar(s);
        // Position on ground
        const box2 = new THREE.Box3().setFromObject(root);
        const center = box2.getCenter(new THREE.Vector3());
        const height = box2.getSize(new THREE.Vector3()).y;
        root.position.sub(center);
        root.position.y += height/2;
        root.position.x += (item.pos[0]||0)*scale;
        // Add label
        const label = makeTextSprite(item.name);
        label.position.set(0, height/2 + 0.6, 0);
        root.add(label);
        root.userData = { item, isModel:true };
        onReady(root);
      }, undefined, (err) => {
        console.warn('Falha ao carregar modelo', item.path, err);
        onReady(createEquipmentBox(item));
      });
    } else {
      onReady(createEquipmentBox(item));
    }
  }

  // Utility: create box with edges and axis-sized "dimension bars"
  function createEquipmentBox(item){
    const {L,W,H} = item.dims;
    const geom = new THREE.BoxGeometry(L*scale, H*scale, W*scale);
    const mat = new THREE.MeshStandardMaterial({ color: item.color, roughness:0.6, metalness:0.1, opacity:0.85, transparent:true });
    const mesh = new THREE.Mesh(geom, mat);
    mesh.position.set(item.pos[0]*scale, (H*scale)/2, item.pos[2]?item.pos[2]*scale:0);
    mesh.userData = { item };

    // Edges
    const edges = new THREE.EdgesGeometry(geom);
    const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0xffffff, opacity:0.6, transparent:true }));
    mesh.add(line);

    // Dimension bars (L in red, W in blue)
    const dimGroup = new THREE.Group();
    const Llen = L*scale, Wlen = W*scale, Hlen = H*scale;
    const Lgeo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(-Llen/2, -Hlen/2 - 0.1, Wlen/2+0.1),
      new THREE.Vector3( Llen/2, -Hlen/2 - 0.1, Wlen/2+0.1)
    ]);
    const Wgeo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(Llen/2+0.1, -Hlen/2 - 0.1, -Wlen/2),
      new THREE.Vector3(Llen/2+0.1, -Hlen/2 - 0.1,  Wlen/2)
    ]);
    const Hgeo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(-Llen/2-0.1, -Hlen/2, -Wlen/2-0.1),
      new THREE.Vector3(-Llen/2-0.1,  Hlen/2, -Wlen/2-0.1)
    ]);
    const Lline = new THREE.Line(Lgeo, new THREE.LineBasicMaterial({ color: 0xe31b23 }));
    const Wline = new THREE.Line(Wgeo, new THREE.LineBasicMaterial({ color: 0x2a2f85 }));
    const Hline = new THREE.Line(Hgeo, new THREE.LineBasicMaterial({ color: 0xaaaaaa }));
    dimGroup.add(Lline, Wline, Hline);
    mesh.add(dimGroup);

    // Name label (sprite)
    const label = makeTextSprite(item.name);
    label.position.set(0, Hlen/2 + 0.6, 0);
    mesh.add(label);

    return mesh;
  }

  // Create a sprite from text
  function makeTextSprite(message){
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const fontSize = 64;
    canvas.width = 1024; canvas.height = 256;
    ctx.font = `bold ${fontSize}px sans-serif`;
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.shadowColor = 'rgba(0,0,0,.6)';
    ctx.shadowBlur = 8;
    ctx.fillText(message, canvas.width/2, canvas.height/2);
    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    const material = new THREE.SpriteMaterial({ map: texture, transparent: true });
    const sprite = new THREE.Sprite(material);
    sprite.scale.set(5, 1.25, 1);
    return sprite;
  }

  const meshes = [];
  equipment.forEach(item => {
    createEquipment(item, (m) => {
      group.add(m);
      meshes.push(m);
    });
  });

  // Raycaster for hover/click
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  let hovered = null;
  let selected = null;

  function onPointerMove(e){
    const rect = renderer.domElement.getBoundingClientRect();
    pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
  }
  function onClick(){
    if (!hovered) return;
    selected = hovered;
    showDetails(selected.userData.item);
    focusOn(selected);
  }
  mount.addEventListener('pointermove', onPointerMove);
  mount.addEventListener('click', onClick);

  // Info panel
  const titleEl = document.getElementById('equipTitle');
  const dimL = document.getElementById('dimL');
  const dimW = document.getElementById('dimW');
  const dimH = document.getElementById('dimH');
  const notes = document.getElementById('equipNotes');
  const resetBtn = document.getElementById('resetView');
  resetBtn.addEventListener('click', () => {
    selected = null;
    controls.target.set(6, 1.5, 0);
    camera.position.set(12, 10, 16);
  });

  function showDetails(item){
    titleEl.textContent = item.name;
    dimL.textContent = item.dims.L.toFixed(2);
    dimW.textContent = item.dims.W.toFixed(2);
    dimH.textContent = item.dims.H.toFixed(2);
    notes.textContent = item.note || '';
  }

  // Focus camera on selected mesh
  function focusOn(obj){
    const box = new THREE.Box3().setFromObject(obj);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    controls.target.copy(center);

    const maxDim = Math.max(size.x, size.y, size.z);
    const dist = maxDim * 2.2;
    const dir = new THREE.Vector3(1, 0.8, 1).normalize();
    const targetPos = center.clone().add(dir.multiplyScalar(dist));
    // Simple tween
    const start = camera.position.clone();
    const startTime = performance.now();
    const duration = 450;
    function animateCam(){
      const t = Math.min(1, (performance.now()-startTime)/duration);
      camera.position.lerpVectors(start, targetPos, t);
      if (t < 1) requestAnimationFrame(animateCam);
    }
    animateCam();
  }

  // Resize
  function onResize(){
    const w = mount.clientWidth, h = mount.clientHeight;
    camera.aspect = w/h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  }
  window.addEventListener('resize', onResize);

  // Render loop
  function render(){
    // Hover detection
    raycaster.setFromCamera(pointer, camera);
    const intersects = raycaster.intersectObjects(meshes, true);
    const hit = intersects.length ? intersects[0].object : null;
    let root = null;
    if (hit){
      let cur = hit;
      while (cur && !cur.userData.item && cur.parent) cur = cur.parent;
      root = (cur && cur.userData && cur.userData.item) ? cur : null;
    }
    const newHovered = root && (root.userData.item ? root : root.parent);
    if (hovered !== newHovered){
      if (hovered){
        hovered.material.opacity = 0.85;
        hovered.scale.set(1,1,1);
      }
      hovered = newHovered && newHovered.userData ? newHovered : null;
      if (hovered){
        hovered.material.opacity = 1.0;
        hovered.scale.set(1.02,1.02,1.02);
      }
    }

    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(render);
  }
  onResize();
    render();
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init3D);
  } else {
    init3D();
  }
})();