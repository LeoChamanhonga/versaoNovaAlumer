// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const menuList = document.getElementById('menuList');
if (menuToggle && menuList){
  menuToggle.addEventListener('click', () => {
    const open = menuList.toggle('open');
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
    'nav-news': 'Notícias',
    'nav-about': 'Sobre',
    'nav-contact': 'Contacto',
    'nav-quote': 'Pedir Cotação',

    // Hero Section
    'hero-title': 'Inertes & Logística',
    'hero-subtitle': 'Areia, brita, tout-venant e mais — <strong>com transporte</strong> e frota própria. Qualidade, prazos e segurança para a sua obra.',
    'hero-portfolio': 'Ver Portfólio',
    'stat-projects': 'Projetos',
    'stat-vehicles': 'Veículos',
    'stat-sla': '% SLA',

    // Services
    'services-title': 'O que fazemos',
    'services-subtitle': 'Portfólio completo para abastecimento e movimentação de inertes.',
    'service1-title': 'Fornecimento de Inertes',
    'service1-desc': 'Fornecemos materiais de construção de alta qualidade incluindo areia fina e grossa, brita de diversas granulometrias (6mm a 32mm), tout-venant, pedra rachão e cascalho. Todos os materiais passam por rigoroso controlo de qualidade com certificação e rastreio por lote, garantindo conformidade com as normas técnicas exigidas para cada tipo de obra.',
    'service2-title': 'Transporte & Logística',
    'service2-desc': 'Oferecemos soluções completas de transporte e logística com frota própria de camiões basculantes de alta capacidade (18-24m³). Realizamos planeamento detalhado de rotas, gestão de prazos de entrega e coordenação de descargas em obra. Nossa equipa especializada garante entregas pontuais e eficientes, minimizando impactos no cronograma dos projetos.',
    'service3-title': 'Aluguer de Equipamentos',
    'service3-desc': 'Disponibilizamos uma frota completa de equipamentos pesados incluindo pás carregadoras (baldes de 2.5-4m³), escavadoras hidráulicas (20-36 toneladas), bulldozers para nivelamento e compactação, e gruas para movimentação de materiais. Todos os equipamentos são operados por profissionais certificados e passam por manutenção preventiva rigorosa.',
    'service4-title': 'Gestão & Consultoria de Obras',
    'service4-desc': 'Nossa equipa técnica especializada oferece serviços de gestão completa de projetos, incluindo planeamento, supervisão, medições topográficas e relatórios técnicos detalhados. Garantimos o cumprimento de prazos, optimização de custos e controlo rigoroso da qualidade em todas as fases da obra, desde o planeamento inicial até à conclusão final.',

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
    'material-other': 'Outro',

    // News Section
    'news-title': 'Notícias & Atualizações',
    'news-subtitle': 'Fique a par das últimas novidades da Alumer e do setor da construção.',
    'news-load-more': 'Ver Mais Notícias',
    'news-read-more': 'Ler Mais'
  },
  en: {
    // Navigation
    'nav-services': 'Services',
    'nav-fleet': 'Fleet',
    'nav-portfolio': 'Portfolio',
    'nav-news': 'News',
    'nav-about': 'About',
    'nav-contact': 'Contact',
    'nav-quote': 'Get Quote',

    // Hero Section
    'hero-title': 'Aggregates & Logistics',
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
    'material-other': 'Other',

    // News Section
    'news-title': 'News & Updates',
    'news-subtitle': 'Stay up to date with the latest news from Alumer and the construction sector.',
    'news-load-more': 'Load More News',
    'news-read-more': 'Read More'
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

// ===== Hero Image Crossfade Animation =====
function initImageBlocksAnimation() {
  const imageBlocks = document.querySelectorAll('.image-block');
  if (imageBlocks.length === 0) {
    console.log('No image blocks found for animation');
    return;
  }

  let currentIndex = 0;

  function showNextImage() {
    // Remove active class from all images
    imageBlocks.forEach(block => block.classList.remove('active'));

    // Add active class to current image
    imageBlocks[currentIndex].classList.add('active');

    // Move to next image
    currentIndex = (currentIndex + 1) % imageBlocks.length;
  }

  // Show first image immediately
  showNextImage();

  // Start crossfade cycle
  setInterval(showNextImage, 4000);

  console.log('Hero crossfade animation initialized with', imageBlocks.length, 'images');
}

// Initialize image blocks animation when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initImageBlocksAnimation);
} else {
  initImageBlocksAnimation();
}

// ===== News System =====
const newsData = [
  {
    id: 1,
    title: 'Expansão da Frota Alumer',
    summary: 'Adquirimos 5 novos camiões basculantes e 3 escavadoras para melhor servir os nossos clientes.',
    content: 'A Alumer continua a crescer e investir em equipamentos de última geração. Esta expansão permitirá reduzir tempos de espera e aumentar a capacidade de entrega simultânea em múltiplos projetos.',
    date: '2025-01-15',
    category: 'Empresa',
    image: 'https://images.unsplash.com/photo-1527708670558-09d23f6c715e?q=80&w=800&auto=format&fit=crop',
    featured: true
  },
  {
    id: 2,
    title: 'Novo Contrato de Fornecimento',
    summary: 'Assinado contrato para fornecimento de inertes para projeto de infraestrutura em Maputo.',
    content: 'Projeto inclui fornecimento de 15.000m³ de materiais diversos ao longo de 8 meses, consolidando nossa posição no mercado de grandes obras.',
    date: '2025-01-10',
    category: 'Projetos',
    image: 'https://images.unsplash.com/photo-1504311169734-973f2b4d4f67?q=80&w=800&auto=format&fit=crop',
    featured: false
  },
  {
    id: 3,
    title: 'Certificação de Qualidade ISO',
    summary: 'Alumer obtém certificação ISO 9001:2015 para gestão de qualidade em fornecimento de inertes.',
    content: 'Esta certificação reforça nosso compromisso com a excelência e padronização de processos, garantindo ainda maior confiabilidade aos nossos parceiros.',
    date: '2025-01-05',
    category: 'Qualidade',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=800&auto=format&fit=crop',
    featured: false
  },
  {
    id: 4,
    title: 'Investimento em Sustentabilidade',
    summary: 'Implementação de práticas ambientais sustentáveis em todas as operações da empresa.',
    content: 'Novo programa inclui reciclagem de águas, controlo de emissões e recuperação ambiental das áreas de extração.',
    date: '2024-12-28',
    category: 'Sustentabilidade',
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=800&auto=format&fit=crop',
    featured: false
  },
  {
    id: 5,
    title: 'Parceria Estratégica Regional',
    summary: 'Nova parceria com construtoras da região para fornecimento exclusivo de materiais.',
    content: 'Acordo de exclusividade fortalece nossa presença no mercado regional e garante fornecimento estável para projetos de médio e longo prazo.',
    date: '2024-12-20',
    category: 'Parcerias',
    image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?q=80&w=800&auto=format&fit=crop',
    featured: false
  },
  {
    id: 6,
    title: 'Modernização do Laboratório',
    summary: 'Investimento em novos equipamentos de análise para controlo de qualidade dos materiais.',
    content: 'Laboratório agora conta com tecnologia de ponta para análises granulométricas, resistência e composição química, garantindo conformidade total com normas internacionais.',
    date: '2024-12-15',
    category: 'Tecnologia',
    image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=800&auto=format&fit=crop',
    featured: false
  }
];

let currentNewsPage = 0;
const newsPerPage = 3;

function formatDate(dateString) {
  const date = new Date(dateString);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return currentLanguage === 'pt' 
    ? date.toLocaleDateString('pt', options)
    : date.toLocaleDateString('en', options);
}

function createNewsCard(news) {
  const isRead = localStorage.getItem(`news-read-${news.id}`) === 'true';
  
  return `
    <article class="news-card ${news.featured ? 'featured' : ''} ${isRead ? 'read' : ''}" data-news-id="${news.id}">
      <div class="news-image">
        <img src="${news.image}" alt="${news.title}" loading="lazy">
        <div class="news-category">${news.category}</div>
        ${news.featured ? '<div class="news-badge">Destaque</div>' : ''}
      </div>
      <div class="news-content">
        <time class="news-date">${formatDate(news.date)}</time>
        <h3 class="news-title">${news.title}</h3>
        <p class="news-summary">${news.summary}</p>
        <button class="news-read-more" data-translate="news-read-more">Ler Mais</button>
      </div>
    </article>
  `;
}

function loadNews() {
  const container = document.getElementById('newsContainer');
  const loadMoreBtn = document.getElementById('loadMoreNews');
  
  if (!container) return;

  const startIndex = currentNewsPage * newsPerPage;
  const endIndex = startIndex + newsPerPage;
  const newsToShow = newsData.slice(startIndex, endIndex);

  if (currentNewsPage === 0) {
    container.innerHTML = '';
  }

  newsToShow.forEach(news => {
    container.innerHTML += createNewsCard(news);
  });

  currentNewsPage++;

  // Hide load more button if no more news
  if (endIndex >= newsData.length) {
    loadMoreBtn.style.display = 'none';
  }

  // Add click events to read more buttons
  container.querySelectorAll('.news-read-more').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const card = e.target.closest('.news-card');
      const newsId = card.getAttribute('data-news-id');
      const news = newsData.find(n => n.id == newsId);
      
      if (news) {
        showNewsModal(news);
        markAsRead(newsId);
        card.classList.add('read');
      }
    });
  });
}

function showNewsModal(news) {
  // Create modal if it doesn't exist
  let modal = document.getElementById('newsModal');
  if (!modal) {
    modal = document.createElement('dialog');
    modal.id = 'newsModal';
    modal.className = 'news-modal';
    document.body.appendChild(modal);
  }

  modal.innerHTML = `
    <div class="news-modal-content">
      <button class="news-modal-close" aria-label="Fechar">×</button>
      <div class="news-modal-header">
        <img src="${news.image}" alt="${news.title}">
        <div class="news-modal-meta">
          <span class="news-category">${news.category}</span>
          <time class="news-date">${formatDate(news.date)}</time>
        </div>
      </div>
      <div class="news-modal-body">
        <h2>${news.title}</h2>
        <p class="news-lead">${news.summary}</p>
        <div class="news-content">${news.content}</div>
      </div>
    </div>
  `;

  // Show modal
  if (typeof modal.showModal === 'function') {
    modal.showModal();
  } else {
    modal.setAttribute('open', '');
  }

  // Close modal events
  const closeBtn = modal.querySelector('.news-modal-close');
  closeBtn.addEventListener('click', () => {
    modal.close ? modal.close() : modal.removeAttribute('open');
  });

  modal.addEventListener('click', (e) => {
    const rect = modal.querySelector('.news-modal-content').getBoundingClientRect();
    const inDialog = e.clientX >= rect.left && e.clientX <= rect.right && 
                    e.clientY >= rect.top && e.clientY <= rect.bottom;
    if (!inDialog) {
      modal.close ? modal.close() : modal.removeAttribute('open');
    }
  });
}

function markAsRead(newsId) {
  localStorage.setItem(`news-read-${newsId}`, 'true');
}

// Initialize news system
document.addEventListener('DOMContentLoaded', () => {
  loadNews();
  
  const loadMoreBtn = document.getElementById('loadMoreNews');
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', loadNews);
  }
});

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