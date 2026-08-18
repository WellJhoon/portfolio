export interface Project {
  id: string;
  title: string;
  category: "frontend" | "backend" | "qa" | "fullstack";
  description: string;
  highlights: string[];
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  location: string;
  period: string;
  isCurrent: boolean;
  sector: string;
  description: string[];
  technologies: string[];
}

export interface SkillCategory {
  category: string;
  items: { name: string; level?: string }[];
}

export interface EducationItem {
  institution: string;
  degree: string;
  period: string;
  details?: string;
}

export interface CertificationItem {
  title: string;
  issuer: string;
  year: string;
}

export interface PortfolioContent {
  nav: {
    about: string;
    experience: string;
    skills: string;
    projects: string;
    gameMode: string;
    education: string;
    contact: string;
  };
  personal: {
    name: string;
    tagline: string;
    title: string;
    roles: string[];
    status: string;
    email: string;
    phone: string;
    location: string;
    github: string;
    linkedin: string;
    aboutMe: string;
    rightNow: string;
  };
  hero: {
    headingPart1: string;
    headingPart2: string;
    viewProjects: string;
    viewExperience: string;
    downloadCv: string;
    gameMode: string;
    copyEmail: string;
    copied: string;
  };
  marquee: string[];
  experiencesTitle: string;
  experiences: ExperienceItem[];
  skillsTitle: string;
  skillCategories: SkillCategory[];
  projectsTitle: string;
  projectFilters: { key: string; label: string }[];
  projects: Project[];
  game: {
    title: string;
    subtitle: string;
    description: string;
    playRandom: string;
    downloadDirect: string;
    downloadBypass: string;
    retry: string;
    nextLevel: string;
    gameOver: string;
    stageClear: string;
    controlsText: string;
    coinsLabel: string;
    levelLabel: string;
  };
  educationTitle: string;
  academicTitle: string;
  certificationsTitle: string;
  verifiedLabel: string;
  certifiedBadge: string;
  education: EducationItem[];
  certifications: CertificationItem[];
  contact: {
    subtitle: string;
    heading: string;
    description: string;
    statusText: string;
  };
  footer: {
    roleTitle: string;
    backToTop: string;
  };
}

export const portfolioContent: { es: PortfolioContent; en: PortfolioContent } = {
  es: {
    nav: {
      about: "Sobre Mí",
      experience: "Experiencia",
      skills: "Habilidades",
      projects: "Proyectos",
      gameMode: "Arcade",
      education: "Certificados",
      contact: "Contacto"
    },
    personal: {
      name: "Jhon Medina",
      tagline: "jhon_medina",
      title: "Senior Full Stack Software Engineer",
      roles: [
        "Senior Full Stack Engineer",
        "Frontend Architect (Angular 18+ / Next.js)",
        "Java & .NET Enterprise Backend",
        "QA Automation Lead (Cypress E2E)",
        "Agentic AI & Clean Architecture"
      ],
      status: "Disponible para proyectos críticos y empresariales",
      email: "jhon437699@gmail.com",
      phone: "829-396-4502",
      location: "Santo Domingo, República Dominicana (Remoto)",
      github: "https://github.com/WellJhoon",
      linkedin: "https://www.linkedin.com/in/jhon-medina-well",
      aboutMe:
        "Ingeniero de Software Senior especializado en el diseño e implementación de sistemas transaccionales, arquitecturas web escalables y plataformas de misión crítica para los sectores Fintech, Salud y Gubernamental. Dominio de microservicios empresariales en Java y .NET, interfaces modulares en Angular 18+ y React/Next.js, con enfoque estricto en seguridad bancaria (PCI-DSS), alta disponibilidad y automatización de pruebas con Cypress.",
      rightNow:
        "Desarrollando servicios backend en Java y reportería fiscal con JasperReports para el Ministerio de Hacienda, y arquitectando módulos de pago con testing E2E automatizado para CardNET Dominicana."
    },
    hero: {
      headingPart1: "JHON",
      headingPart2: "MEDINA",
      viewProjects: "Ver Proyectos",
      viewExperience: "Ver Experiencia",
      downloadCv: "Descargar CV",
      gameMode: "Game Mode",
      copyEmail: "Copiar Email",
      copied: "Copiado"
    },
    marquee: [
      "ANGULAR 18+",
      "JAVA SPRING BOOT",
      ".NET CORE WEB API",
      "NEXT.JS 16",
      "CYPRESS E2E",
      "TYPESCRIPT",
      "PCI-DSS COMPLIANCE",
      "JASPERREPORTS",
      "CLEAN ARCHITECTURE",
      "SQL SERVER",
      "MONGODB",
      "AZURE DEVOPS",
      "GITLAB CI/CD",
      "MULTI-AGENT AI"
    ],
    experiencesTitle: "EXPERIENCIA_LABORAL",
    experiences: [
      {
        id: "hacienda",
        company: "Ministerio de Hacienda y Economía",
        role: "Software Developer (Java / Backend)",
        location: "Remoto",
        period: "Agosto 2026 – Presente",
        isCurrent: true,
        sector: "Sector Público / Gubernamental",
        description: [
          "Diseño y desarrollo de servicios backend empresariales y módulos transaccionales utilizando Java y bases de datos relacionales.",
          "Generación y automatización de reportes fiscales y financieros complejos con JasperReports / Jasper.",
          "Implementación de lógica de negocio, validaciones y servicios para la gestión de procesos económicos y tributarios.",
          "Gestión de flujos de trabajo ágiles en Jira y control de versiones e integración continua en GitLab."
        ],
        technologies: ["Java", "Spring Boot", "JasperReports", "SQL Server / PostgreSQL", "REST APIs", "GitLab", "Jira"]
      },
      {
        id: "cardnet",
        company: "CARDNET DOMINICANA",
        role: "Frontend Developer / Software Engineer",
        location: "Remoto",
        period: "Septiembre 2025 – Presente",
        isCurrent: true,
        sector: "Medios de Pago / Fintech",
        description: [
          "Desarrollo e integración de interfaces modulares y paneles transaccionales en Angular 18+ y TypeScript para plataformas de procesamiento de pagos.",
          "Reducción del 30% en regresión de errores mediante suites de pruebas automatizadas End-to-End con Cypress, implementando mocking de red (cy.intercept) y fixtures.",
          "Optimización de experiencia de usuario (UX) y tiempos de carga bajo normativas y estándares de seguridad bancaria PCI-DSS v4.",
          "Mitigación de vulnerabilidades de código mediante análisis estático con Checkmarx y SonarQube integrados en pipelines de Azure DevOps."
        ],
        technologies: ["Angular 18", "TypeScript", "Cypress", "SCSS / Tailwind", "Azure Pipelines", "SonarQube", "Checkmarx", "RxJS", "PCI-DSS"]
      },
      {
        id: "arium",
        company: "ARIUM HEALTH",
        role: "Software Developer",
        location: "Remoto",
        period: "Abril 2024 – Julio 2025",
        isCurrent: false,
        sector: "Salud Digital / HealthTech",
        description: [
          "Mantenimiento, refactorización y extensión de módulos clínicos e historias médicas utilizando AngularJS, Node.js y Express.",
          "Diseño de esquemas y optimización de consultas en MongoDB (Mongoose) para transacciones de alta concurrencia.",
          "Consumo y creación de endpoints RESTful seguros para la sincronización de expedientes médicos electrónicos."
        ],
        technologies: ["AngularJS", "Node.js", "Express", "MongoDB", "Mongoose", "REST APIs", "Git"]
      },
      {
        id: "bhd",
        company: "BANCO BHD",
        role: "Automation / CRM Intern",
        location: "Santo Domingo, DN (Presencial)",
        period: "Julio 2023 – Septiembre 2023",
        isCurrent: false,
        sector: "Banca Múltiple / Financiero",
        description: [
          "Colaboración en la parametrización, automatización de flujos y soporte a la plataforma Pega CRM empresarial.",
          "Participación en ceremonias ágiles Scrum para la entrega de historias de usuario y validación de reglas de negocio bancarias."
        ],
        technologies: ["Pega CRM", "SQL", "Scrum", "Automation", "BPM"]
      }
    ],
    skillsTitle: "STACK_TÉCNICO_&_HERRAMIENTAS",
    skillCategories: [
      {
        category: "Lenguajes de Programación",
        items: [
          { name: "TypeScript" },
          { name: "JavaScript (ES6+)" },
          { name: "C# (.NET)" },
          { name: "Java" },
          { name: "Python" },
          { name: "Go" },
          { name: "HTML5 / CSS3" },
          { name: "SQL" }
        ]
      },
      {
        category: "Frontend & UI",
        items: [
          { name: "Angular 18+" },
          { name: "React" },
          { name: "Next.js (App Router)" },
          { name: "Vue.js" },
          { name: "Astro" },
          { name: "RxJS" },
          { name: "Tailwind CSS" },
          { name: "Radix UI / shadcn" },
          { name: "Material UI" },
          { name: "SCSS / CSS3" }
        ]
      },
      {
        category: "Backend & Arquitectura",
        items: [
          { name: "ASP.NET Core Web API" },
          { name: "Node.js" },
          { name: "Express.js" },
          { name: "Spring Boot" },
          { name: "JasperReports" },
          { name: "Clean Architecture" },
          { name: "Arquitectura Hexagonal" },
          { name: "Domain-Driven Design (DDD)" },
          { name: "RESTful APIs" },
          { name: "JWT / NextAuth" }
        ]
      },
      {
        category: "Bases de Datos & Persistencia",
        items: [
          { name: "SQL Server" },
          { name: "MongoDB (Mongoose)" },
          { name: "PostgreSQL" },
          { name: "MySQL" },
          { name: "Entity Framework Core" },
          { name: "Prisma ORM" },
          { name: "Redis" }
        ]
      },
      {
        category: "Testing, QA & DevOps",
        items: [
          { name: "Cypress (E2E)" },
          { name: "Jest" },
          { name: "React Testing Library" },
          { name: "Supertest" },
          { name: "Jasmine & Karma" },
          { name: "Azure DevOps Pipelines" },
          { name: "GitLab / GitHub" },
          { name: "Jira / Scrum" },
          { name: "SonarQube & Checkmarx" },
          { name: "Docker" }
        ]
      }
    ],
    projectsTitle: "PROYECTOS_DESTACADOS",
    projectFilters: [
      { key: "all", label: "Todos los Proyectos" },
      { key: "backend", label: "Backend & Arquitectura" },
      { key: "frontend", label: "Frontend & Fullstack" },
      { key: "qa", label: "QA & Cypress E2E" }
    ],
    projects: [
      {
        id: "ecommerce-net-clean",
        title: "Clean Architecture E-Commerce API",
        category: "backend",
        description:
          "API RESTful empresarial para comercio electrónico estructurada bajo principios de Clean Architecture y Domain-Driven Design (DDD). Manejo desacoplado de capas de Dominio, Aplicación, Infraestructura y Presentación.",
        highlights: [
          "Patrón CQRS con MediatR y validaciones con FluentValidation",
          "Persistencia con Entity Framework Core sobre SQL Server con migraciones automáticas",
          "Autenticación y autorización basada en JSON Web Tokens (JWT) y Refresh Tokens",
          "Manejo global de excepciones y respuestas estandarizadas con Result Pattern"
        ],
        technologies: ["C#", ".NET Core", "Clean Architecture", "EF Core", "SQL Server", "JWT", "MediatR"],
        githubUrl: "https://github.com/WellJhoon"
      },
      {
        id: "angular-fintech-portal",
        title: "Fintech Merchant Portal (Angular 18+)",
        category: "frontend",
        description:
          "Portal administrativo para liquidación de pagos y visualización de transacciones financieras en tiempo real con Angular 18 Standalone Components y Signals.",
        highlights: [
          "Arquitectura reactiva con RxJS y Angular Signals para gestión de estado granular",
          "Diseño modular con carga perezosa (Lazy Loading) y guards de autenticación basados en roles",
          "Tablas de datos virtuales y exportación de reportes transaccionales",
          "Integración de gráficos analíticos interactivos y filtros dinámicos"
        ],
        technologies: ["Angular 18", "TypeScript", "RxJS", "Tailwind CSS", "Chart.js", "Signals"],
        githubUrl: "https://github.com/WellJhoon"
      },
      {
        id: "cypress-e2e-suite",
        title: "Cypress E2E Payment Gateway Test Automation Suite",
        category: "qa",
        description:
          "Framework de pruebas automatizadas End-to-End diseñado para validar flujos críticos de pago con tarjeta, reembolsos y liquidaciones bajo normativas PCI-DSS.",
        highlights: [
          "Estrategia de interceptación de red (cy.intercept) para mocking determinista de APIs",
          "Patrón Page Object Model (POM) con comandos personalizados reutilizables",
          "Validaciones visuales, pruebas de accesibilidad y aserciones de integración",
          "Generación automatizada de reportes HTML con captura de evidencia en fallos"
        ],
        technologies: ["Cypress", "TypeScript", "E2E Testing", "CI/CD", "Mochawesome", "JavaScript"],
        githubUrl: "https://github.com/WellJhoon"
      },
      {
        id: "agentic-ai-orchestrator",
        title: "Agentic AI Multi-Agent Workflow Engine",
        category: "backend",
        description:
          "Sistema de orquestación multi-agente para procesamiento y análisis automatizado de datos estructurados y generación de código mediante modelos LLM.",
        highlights: [
          "Arquitectura event-driven con agentes autónomos especializados",
          "Gestión de memoria persistente y recuperación de contexto",
          "Integración con APIs de Anthropic y OpenAI con validación estricta de esquemas",
          "Métricas de evaluación y optimización de latencia de respuestas"
        ],
        technologies: ["TypeScript", "Node.js", "Anthropic Claude API", "Event-Driven", "Redis"],
        githubUrl: "https://github.com/WellJhoon"
      },
      {
        id: "fullstack-crm-nextjs",
        title: "Next.js 16 Enterprise Management Platform",
        category: "fullstack",
        description:
          "Plataforma completa de gestión empresarial construida con Next.js 16 App Router, React 19 Server Components y Prisma ORM.",
        highlights: [
          "Server Actions para mutaciones seguras y optimistas sin APIs intermedias",
          "Control de acceso basado en roles (RBAC) con sesiones seguras",
          "Persistencia relacional optimizada con PostgreSQL y Prisma",
          "Tema dinámico (Dark/Light mode) con variables CSS nativas"
        ],
        technologies: ["Next.js 16", "React 19", "TypeScript", "PostgreSQL", "Prisma", "Tailwind CSS"],
        githubUrl: "https://github.com/WellJhoon"
      },
      {
        id: "node-express-microservices",
        title: "Microservices Healthcare Integration Bus",
        category: "backend",
        description:
          "Bus de servicios distribuido para la sincronización de historias clínicas y citas médicas con Node.js, Express y bases de datos NoSQL.",
        highlights: [
          "Arquitectura desacoplada con validación de payloads mediante Zod/Joi",
          "Base de datos MongoDB optimizada con índices compuestos y agregaciones complejas",
          "Pruebas de integración con Supertest y Jest con cobertura superior al 85%",
          "Documentación interactiva de endpoints con OpenAPI / Swagger"
        ],
        technologies: ["Node.js", "Express", "MongoDB", "Mongoose", "Jest", "Supertest", "Swagger"],
        githubUrl: "https://github.com/WellJhoon"
      }
    ],
    game: {
      title: "SUPER JHON PLATFORMER",
      subtitle: "Fedora Zsh Arcade Terminal",
      description: "Niveles aleatorios: Corre, esquiva bugs y llega a la meta para desbloquear y descargar el CV oficial.",
      playRandom: "JUGAR NIVEL ALEATORIO",
      downloadDirect: "Descargar CV Directo",
      downloadBypass: "Descargar sin jugar",
      retry: "Reintentar (Nivel Nuevo)",
      nextLevel: "Siguiente nivel aleatorio",
      gameOver: "GAME OVER",
      stageClear: "STAGE CLEAR!",
      controlsText: "Controles: [A / D] o [Flechas] para correr · [ESPACIO / W] para saltar",
      coinsLabel: "TECH COINS",
      levelLabel: "Nivel"
    },
    educationTitle: "EDUCACIÓN_&_CERTIFICACIONES",
    academicTitle: "FORMACIÓN ACADÉMICA",
    certificationsTitle: "CERTIFICACIONES PROFESIONALES & ESTÁNDARES",
    verifiedLabel: "Verificadas",
    certifiedBadge: "Certified",
    education: [
      {
        institution: "Instituto Tecnológico de las Américas (ITLA)",
        degree: "Técnico Superior en Desarrollo de Software",
        period: "2020 – 2023",
        details: "Formación integral en algoritmos, estructuras de datos, desarrollo web y bases de datos relacionales/no relacionales."
      }
    ],
    certifications: [
      {
        title: "PCI-DSS v4 Security Standards",
        issuer: "CardNET / Compliance",
        year: "2025"
      },
      {
        title: "Developing Multi-Agent Systems & Agentic AI",
        issuer: "Pluralsight",
        year: "2026"
      },
      {
        title: "Claude Code in Action",
        issuer: "Anthropic",
        year: "2026"
      },
      {
        title: "Rest API (Intermediate)",
        issuer: "HackerRank",
        year: "2025"
      },
      {
        title: "JavaScript (Intermediate)",
        issuer: "HackerRank",
        year: "2025"
      },
      {
        title: "Angular (Cero a Experto)",
        issuer: "Udemy",
        year: "2023"
      },
      {
        title: "Secure Coding & Clean Practices",
        issuer: "CardNET / Corporate",
        year: "2025"
      },
      {
        title: "IT Essentials",
        issuer: "Cisco Networking Academy",
        year: "2021"
      }
    ],
    contact: {
      subtitle: "> INICIALIZAR_CONEXIÓN",
      heading: "¿Tienes un proyecto o consulta técnica?",
      description: "Disponible para colaborar en arquitecturas frontend escalables, desarrollo backend empresarial y consultoría en automatización de pruebas QA.",
      statusText: "Disponible para proyectos de alto impacto"
    },
    footer: {
      roleTitle: "Senior Full Stack Software Engineer",
      backToTop: "Arriba"
    }
  },
  en: {
    nav: {
      about: "About",
      experience: "Experience",
      skills: "Skills",
      projects: "Projects",
      gameMode: "Arcade",
      education: "Certifications",
      contact: "Contact"
    },
    personal: {
      name: "Jhon Medina",
      tagline: "jhon_medina",
      title: "Senior Full Stack Software Engineer",
      roles: [
        "Senior Full Stack Engineer",
        "Frontend Architect (Angular 18+ / Next.js)",
        "Java & .NET Enterprise Backend",
        "QA Automation Lead (Cypress E2E)",
        "Agentic AI & Clean Architecture"
      ],
      status: "Available for mission-critical & enterprise projects",
      email: "jhon437699@gmail.com",
      phone: "829-396-4502",
      location: "Santo Domingo, Dominican Republic (Remote)",
      github: "https://github.com/WellJhoon",
      linkedin: "https://www.linkedin.com/in/jhon-medina-well",
      aboutMe:
        "Senior Software Engineer specialized in designing and building distributed transactional systems, scalable web architectures, and mission-critical platforms across Fintech, Healthcare, and Government sectors. Extensive expertise in Java and .NET enterprise microservices, modular frontend architectures in Angular 18+ and React/Next.js, with strict adherence to banking security standards (PCI-DSS), high availability, and Cypress E2E quality automation.",
      rightNow:
        "Developing Java backend microservices and complex financial reporting with JasperReports for the Ministry of Finance, while architecting modular payment platforms with Cypress automated E2E testing for CardNET Dominicana."
    },
    hero: {
      headingPart1: "JHON",
      headingPart2: "MEDINA",
      viewProjects: "View Projects",
      viewExperience: "View Experience",
      downloadCv: "Download CV",
      gameMode: "Game Mode",
      copyEmail: "Copy Email",
      copied: "Copied"
    },
    marquee: [
      "ANGULAR 18+",
      "JAVA SPRING BOOT",
      ".NET CORE WEB API",
      "NEXT.JS 16",
      "CYPRESS E2E",
      "TYPESCRIPT",
      "PCI-DSS COMPLIANCE",
      "JASPERREPORTS",
      "CLEAN ARCHITECTURE",
      "SQL SERVER",
      "MONGODB",
      "AZURE DEVOPS",
      "GITLAB CI/CD",
      "MULTI-AGENT AI"
    ],
    experiencesTitle: "WORK_EXPERIENCE",
    experiences: [
      {
        id: "hacienda",
        company: "Ministry of Finance and Economy",
        role: "Software Developer (Java / Backend)",
        location: "Remote",
        period: "August 2026 – Present",
        isCurrent: true,
        sector: "Public / Government Sector",
        description: [
          "Designing and implementing enterprise backend microservices and transactional modules utilizing Java and relational databases.",
          "Automating complex financial and fiscal reporting workflows with JasperReports / Jasper.",
          "Engineering core business logic, validations, and high-throughput services for governmental fiscal operations.",
          "Leading Agile sprint deliveries with Jira and streamlining continuous integration pipelines on GitLab."
        ],
        technologies: ["Java", "Spring Boot", "JasperReports", "SQL Server / PostgreSQL", "REST APIs", "GitLab", "Jira"]
      },
      {
        id: "cardnet",
        company: "CARDNET DOMINICANA",
        role: "Frontend Developer / Software Engineer",
        location: "Remote",
        period: "September 2025 – Present",
        isCurrent: true,
        sector: "Payment Processing / Fintech",
        description: [
          "Architecting modular interfaces and transactional merchant dashboards in Angular 18+ and TypeScript for high-volume payment processing.",
          "Reduced bug regressions by 30% through robust automated End-to-End test suites using Cypress, network mocking (cy.intercept), and fixtures.",
          "Optimized user experience (UX) and sub-second load times under strict PCI-DSS v4 banking security and compliance standards.",
          "Eliminated code vulnerabilities via automated static application security testing (SAST) with Checkmarx and SonarQube in Azure DevOps pipelines."
        ],
        technologies: ["Angular 18", "TypeScript", "Cypress", "SCSS / Tailwind", "Azure Pipelines", "SonarQube", "Checkmarx", "RxJS", "PCI-DSS"]
      },
      {
        id: "arium",
        company: "ARIUM HEALTH",
        role: "Software Developer",
        location: "Remote",
        period: "April 2024 – July 2025",
        isCurrent: false,
        sector: "Digital Health / HealthTech",
        description: [
          "Maintained, refactored, and expanded electronic health records (EHR) modules using AngularJS, Node.js, and Express.",
          "Designed database schemas and query optimizations in MongoDB (Mongoose) for high-concurrency medical records.",
          "Built and integrated secure RESTful endpoints for real-time patient data synchronization across hospitals."
        ],
        technologies: ["AngularJS", "Node.js", "Express", "MongoDB", "Mongoose", "REST APIs", "Git"]
      },
      {
        id: "bhd",
        company: "BANCO BHD",
        role: "Automation / CRM Intern",
        location: "Santo Domingo, DR (On-site)",
        period: "July 2023 – September 2023",
        isCurrent: false,
        sector: "Multiple Banking / Financial Services",
        description: [
          "Collaborated in workflow automation, business rules parameterization, and technical support for enterprise Pega CRM platform.",
          "Participated in Agile Scrum ceremonies for user story delivery and validation of core banking transaction rules."
        ],
        technologies: ["Pega CRM", "SQL", "Scrum", "Automation", "BPM"]
      }
    ],
    skillsTitle: "TECHNICAL_STACK_&_TOOLS",
    skillCategories: [
      {
        category: "Programming Languages",
        items: [
          { name: "TypeScript" },
          { name: "JavaScript (ES6+)" },
          { name: "C# (.NET)" },
          { name: "Java" },
          { name: "Python" },
          { name: "Go" },
          { name: "HTML5 / CSS3" },
          { name: "SQL" }
        ]
      },
      {
        category: "Frontend & UI",
        items: [
          { name: "Angular 18+" },
          { name: "React" },
          { name: "Next.js (App Router)" },
          { name: "Vue.js" },
          { name: "Astro" },
          { name: "RxJS" },
          { name: "Tailwind CSS" },
          { name: "Radix UI / shadcn" },
          { name: "Material UI" },
          { name: "SCSS / CSS3" }
        ]
      },
      {
        category: "Backend & Architecture",
        items: [
          { name: "ASP.NET Core Web API" },
          { name: "Node.js" },
          { name: "Express.js" },
          { name: "Spring Boot" },
          { name: "JasperReports" },
          { name: "Clean Architecture" },
          { name: "Hexagonal Architecture" },
          { name: "Domain-Driven Design (DDD)" },
          { name: "RESTful APIs" },
          { name: "JWT / NextAuth" }
        ]
      },
      {
        category: "Databases & Persistence",
        items: [
          { name: "SQL Server" },
          { name: "MongoDB (Mongoose)" },
          { name: "PostgreSQL" },
          { name: "MySQL" },
          { name: "Entity Framework Core" },
          { name: "Prisma ORM" },
          { name: "Redis" }
        ]
      },
      {
        category: "Testing, QA & DevOps",
        items: [
          { name: "Cypress (E2E)" },
          { name: "Jest" },
          { name: "React Testing Library" },
          { name: "Supertest" },
          { name: "Jasmine & Karma" },
          { name: "Azure DevOps Pipelines" },
          { name: "GitLab / GitHub" },
          { name: "Jira / Scrum" },
          { name: "SonarQube & Checkmarx" },
          { name: "Docker" }
        ]
      }
    ],
    projectsTitle: "FEATURED_PROJECTS",
    projectFilters: [
      { key: "all", label: "All Projects" },
      { key: "backend", label: "Backend & Arch" },
      { key: "frontend", label: "Frontend & Fullstack" },
      { key: "qa", label: "QA & Cypress E2E" }
    ],
    projects: [
      {
        id: "ecommerce-net-clean",
        title: "Clean Architecture E-Commerce API",
        category: "backend",
        description:
          "Enterprise RESTful API for digital commerce structured under Clean Architecture and Domain-Driven Design (DDD) principles. Full separation of Domain, Application, Infrastructure, and Presentation layers.",
        highlights: [
          "CQRS pattern with MediatR and business validation with FluentValidation",
          "Persistence layer with Entity Framework Core over SQL Server with automated migrations",
          "Role-based authentication & authorization using JWT and secure Refresh Tokens",
          "Global exception handling pipeline and standardized Result Pattern responses"
        ],
        technologies: ["C#", ".NET Core", "Clean Architecture", "EF Core", "SQL Server", "JWT", "MediatR"],
        githubUrl: "https://github.com/WellJhoon"
      },
      {
        id: "angular-fintech-portal",
        title: "Fintech Merchant Portal (Angular 18+)",
        category: "frontend",
        description:
          "Administrative portal for payment settlement and real-time financial transaction monitoring built with Angular 18 Standalone Components and Signals.",
        highlights: [
          "Reactive state management with RxJS and Angular Signals for fine-grained reactivity",
          "Lazy-loaded modular architecture with role-based authentication route guards",
          "Virtual scrolling data tables and automated fiscal transaction report exports",
          "Integrated interactive analytical dashboards and dynamic parametric filtering"
        ],
        technologies: ["Angular 18", "TypeScript", "RxJS", "Tailwind CSS", "Chart.js", "Signals"],
        githubUrl: "https://github.com/WellJhoon"
      },
      {
        id: "cypress-e2e-suite",
        title: "Cypress E2E Payment Gateway Test Automation Suite",
        category: "qa",
        description:
          "End-to-End automated testing framework designed to validate critical payment flows, refunds, and batch settlements under PCI-DSS standards.",
        highlights: [
          "Deterministic network interception strategy (cy.intercept) for resilient API mocking",
          "Page Object Model (POM) architecture with modular reusable custom commands",
          "Visual regression testing, accessibility audits, and integration assertion suites",
          "Automated HTML test report generation with screenshot capture on step failures"
        ],
        technologies: ["Cypress", "TypeScript", "E2E Testing", "CI/CD", "Mochawesome", "JavaScript"],
        githubUrl: "https://github.com/WellJhoon"
      },
      {
        id: "agentic-ai-orchestrator",
        title: "Agentic AI Multi-Agent Workflow Engine",
        category: "backend",
        description:
          "Multi-agent orchestration platform for autonomous data processing, structured extraction, and code generation using state-of-the-art LLMs.",
        highlights: [
          "Event-driven architecture with specialized autonomous agent roles",
          "Persistent long-term memory management and contextual vector retrieval",
          "Integration with Anthropic Claude and OpenAI APIs with strict schema validation",
          "Comprehensive latency profiling and agent reasoning optimization pipelines"
        ],
        technologies: ["TypeScript", "Node.js", "Anthropic Claude API", "Event-Driven", "Redis"],
        githubUrl: "https://github.com/WellJhoon"
      },
      {
        id: "fullstack-crm-nextjs",
        title: "Next.js 16 Enterprise Management Platform",
        category: "fullstack",
        description:
          "Full-stack enterprise application built with Next.js 16 App Router, React 19 Server Components, and Prisma ORM.",
        highlights: [
          "Server Actions for secure, optimistic mutations without boilerplate API routes",
          "Role-based access control (RBAC) with secure session handling",
          "Relational data persistence with PostgreSQL and Prisma migrations",
          "Dynamic dual theme engine (Dark/Light mode) powered by CSS variables"
        ],
        technologies: ["Next.js 16", "React 19", "TypeScript", "PostgreSQL", "Prisma", "Tailwind CSS"],
        githubUrl: "https://github.com/WellJhoon"
      },
      {
        id: "node-express-microservices",
        title: "Microservices Healthcare Integration Bus",
        category: "backend",
        description:
          "Distributed enterprise service bus for EHR synchronization and appointment scheduling with Node.js, Express, and NoSQL databases.",
        highlights: [
          "Decoupled microservice architecture with payload validation via Zod/Joi",
          "Optimized MongoDB database with compound indexing and aggregation pipelines",
          "Integration test suites with Supertest and Jest achieving over 85% code coverage",
          "Interactive API documentation and schema specification via OpenAPI / Swagger"
        ],
        technologies: ["Node.js", "Express", "MongoDB", "Mongoose", "Jest", "Supertest", "Swagger"],
        githubUrl: "https://github.com/WellJhoon"
      }
    ],
    game: {
      title: "SUPER JHON PLATFORMER",
      subtitle: "Fedora Zsh Arcade Terminal",
      description: "Randomized levels: Run, jump over bugs, and reach the goal flag to unlock and download the official CV.",
      playRandom: "PLAY RANDOM STAGE",
      downloadDirect: "Download CV Direct",
      downloadBypass: "Download without playing",
      retry: "Retry (New Stage)",
      nextLevel: "Next Random Stage",
      gameOver: "GAME OVER",
      stageClear: "STAGE CLEAR!",
      controlsText: "Controls: [A / D] or [Arrows] to run · [SPACE / W] to jump",
      coinsLabel: "TECH COINS",
      levelLabel: "Stage"
    },
    educationTitle: "EDUCATION_&_CERTIFICATIONS",
    academicTitle: "ACADEMIC BACKGROUND",
    certificationsTitle: "PROFESSIONAL CERTIFICATIONS & STANDARDS",
    verifiedLabel: "Verified",
    certifiedBadge: "Certified",
    education: [
      {
        institution: "Instituto Tecnológico de las Américas (ITLA)",
        degree: "Associate Degree in Software Development",
        period: "2020 – 2023",
        details: "Comprehensive education in algorithms, data structures, full-stack web engineering, and relational/NoSQL databases."
      }
    ],
    certifications: [
      {
        title: "PCI-DSS v4 Security Standards",
        issuer: "CardNET / Compliance",
        year: "2025"
      },
      {
        title: "Developing Multi-Agent Systems & Agentic AI",
        issuer: "Pluralsight",
        year: "2026"
      },
      {
        title: "Claude Code in Action",
        issuer: "Anthropic",
        year: "2026"
      },
      {
        title: "Rest API (Intermediate)",
        issuer: "HackerRank",
        year: "2025"
      },
      {
        title: "JavaScript (Intermediate)",
        issuer: "HackerRank",
        year: "2025"
      },
      {
        title: "Angular (Zero to Mastery)",
        issuer: "Udemy",
        year: "2023"
      },
      {
        title: "Secure Coding & Clean Practices",
        issuer: "CardNET / Corporate",
        year: "2025"
      },
      {
        title: "IT Essentials",
        issuer: "Cisco Networking Academy",
        year: "2021"
      }
    ],
    contact: {
      subtitle: "> INITIALIZE_CONNECTION",
      heading: "Have a project or technical inquiry?",
      description: "Available for scalable frontend architectures, enterprise backend development, and QA test automation consulting.",
      statusText: "Available for high-impact projects"
    },
    footer: {
      roleTitle: "Senior Full Stack Software Engineer",
      backToTop: "Top"
    }
  }
};

export const portfolioData = portfolioContent.es;
