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

export const portfolioData = {
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
    location: "Santo Domingo, República Dominicana (Remoto)",
    github: "https://github.com/WellJhoon",
    linkedin: "https://www.linkedin.com/in/jhon-medina-well",
    aboutMe:
      "Ingeniero de Software Senior especializado en el diseño e implementación de sistemas transaccionales, arquitecturas web escalables y plataformas empresariales para los sectores Fintech, Salud y Gubernamental. Dominio de microservicios en Java y .NET, interfaces modulares en Angular 18+ y Next.js, con enfoque estricto en seguridad bancaria (PCI-DSS), alta disponibilidad y automatización de calidad con Cypress.",
    rightNow:
      "Desarrollando servicios backend en Java y reportería fiscal con JasperReports para el Ministerio de Hacienda, y arquitectando módulos de pago con testing E2E automatizado para CardNET Dominicana."
  },
  marquee: [
    "ANGULAR 18+",
    "C# / .NET CORE",
    "JAVA ENTERPRISE",
    "NEXT.JS",
    "CYPRESS E2E",
    "TYPESCRIPT",
    "CLEAN ARCHITECTURE",
    "SQL SERVER",
    "MONGODB",
    "AZURE PIPELINES",
    "PRISMA ORM",
    "SPRING BOOT",
    "TAILWIND CSS",
    "DOCKER",
    "RESTFUL APIS"
  ],
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
        "Gestión de flujos de trabajo ágiles en Jira y control de versiones e integración con GitLab."
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
        "Optimización de experiencia de usuario (UX) y tiempos de carga bajo normativas y estándares de seguridad bancaria.",
        "Mitigación de vulnerabilidades de código mediante análisis estático con Checkmarx y SonarQube integrados en pipelines de Azure DevOps."
      ],
      technologies: ["Angular 18", "TypeScript", "Cypress", "SCSS / Tailwind", "Azure Pipelines", "SonarQube", "Checkmarx", "RxJS"]
    },
    {
      id: "arium",
      company: "ARIUM HEALTH",
      role: "Software Developer",
      location: "Remoto",
      period: "Abril 2024 – Julio 2025",
      isCurrent: false,
      sector: "HealthTech / Gestión Hospitalaria",
      description: [
        "Resolución de incidencias críticas en entornos de producción para plataformas de gestión médica y hospitalaria.",
        "Mantenimiento evolutivo de aplicaciones frontend en AngularJS y servicios backend en Node.js / Express.",
        "Optimización de consultas y esquemas de base de datos en MongoDB, disminuyendo la latencia en operaciones concurrentes.",
        "Diagnóstico técnico y análisis de causa raíz en coordinación directa con usuarios finales y soporte."
      ],
      technologies: ["AngularJS", "Node.js", "Express", "MongoDB", "Mongoose", "JavaScript", "REST APIs"]
    },
    {
      id: "bhd",
      company: "BANCO BHD",
      role: "Software & Automation Intern",
      location: "Presencial",
      period: "Julio 2023 – Septiembre 2023",
      isCurrent: false,
      sector: "Sector Bancario",
      description: [
        "Automatización de flujos de trabajo internos y optimización de procesos operativos mediante la plataforma Pega CRM.",
        "Análisis y especificación de requerimientos funcionales y técnicos dentro del marco de cumplimiento regulatorio bancario."
      ],
      technologies: ["Pega CRM", "BPM / Flujos de Trabajo", "SQL", "Análisis de Requerimientos"]
    }
  ] as ExperienceItem[],
  projects: [
    {
      id: "clean-architecture-net",
      title: "Clean Architecture Enterprise Web API",
      category: "backend",
      description:
        "Solución backend modular construida con C# y .NET siguiendo los principios de Clean Architecture y Domain-Driven Design (DDD) con separación estricta de capas.",
      highlights: [
        "División desacoplada: Domain, Application, Infrastructure y Presentation.",
        "Implementación del patrón Repository y Unit of Work.",
        "Autenticación segura con JWT, validaciones con FluentValidation y documentación OpenAPI / Swagger."
      ],
      technologies: ["C#", ".NET Core", "Entity Framework Core", "SQL Server", "JWT", "Clean Architecture"],
      githubUrl: "https://github.com/WellJhoon/CleanWebApi"
    },
    {
      id: "zenify-platform",
      title: "Zenify – Modern SaaS Application",
      category: "fullstack",
      description:
        "Plataforma web Full Stack construida con Next.js App Router, componentes de servidor React, gestión de estado y persistencia híbrida.",
      highlights: [
        "Arquitectura moderna con Server Actions y React 19.",
        "Autenticación con NextAuth y adaptadores en Redis (Upstash) y Prisma ORM.",
        "Diseño UI accesible construido con Radix UI, Tailwind CSS y componentes modulares."
      ],
      technologies: ["Next.js", "React", "TypeScript", "Prisma", "Redis", "Tailwind CSS", "NextAuth"],
      githubUrl: "https://github.com/WellJhoon/Zenify"
    },
    {
      id: "hexagonal-api",
      title: "Hexagonal Architecture REST API",
      category: "backend",
      description:
        "API REST en Node.js y TypeScript estructurada bajo el patrón de Arquitectura Hexagonal (Puertos y Adaptadores) para alta testeabilidad y desacoplamiento.",
      highlights: [
        "Aislamiento total de las reglas de negocio respecto al framework HTTP.",
        "Suites de pruebas automatizadas con Jest y Supertest.",
        "Integración de Conventional Commits y Commitlint."
      ],
      technologies: ["TypeScript", "Node.js", "Express", "Jest", "Supertest", "Commitlint"],
      githubUrl: "https://github.com/WellJhoon/hexagonal-arquitecture"
    },
    {
      id: "qa-cypress-suite",
      title: "Payment & Transacting E2E Testing Suite",
      category: "qa",
      description:
        "Framework de pruebas automatizadas End-to-End con Cypress enfocado en la validación de flujos de pago, pasarelas y portales transaccionales.",
      highlights: [
        "Estrategias avanzadas de intercepción HTTP (cy.intercept) para simulación de respuestas bancarias.",
        "Pruebas determinísticas e independientes mediante fixtures y data factories.",
        "Integración directa con pipelines de CI/CD para control de regresiones."
      ],
      technologies: ["Cypress", "TypeScript", "JavaScript", "CI/CD", "E2E Testing", "Network Mocking"],
      githubUrl: "https://github.com/WellJhoon/qa-technical-test"
    },
    {
      id: "data-crawlers",
      title: "Financial Data Crawler & Normalization Services",
      category: "backend",
      description:
        "Microservicios de automatización y extracción de datos regulatorios (tasas del Banco Central y DGII) con pipelines de validación.",
      highlights: [
        "Extracción automatizada y estructuración de datos económicos.",
        "Pipeline de calidad con Pytest y linter de alto rendimiento Ruff.",
        "Estandarización de endpoints para consumo interno."
      ],
      technologies: ["Python", "Pytest", "Ruff", "Web Scraping", "Data Normalization", "Pipelines"]
    },
    {
      id: "ecommerce-platform",
      title: "Ecommerce & POS Management System",
      category: "frontend",
      description:
        "Sistema de punto de venta y catálogo interactivo de productos con gestión de inventario, carrito de compras y paneles administrativos.",
      highlights: [
        "Arquitectura de componentes reactivos en Angular con RxJS y Reactive Forms.",
        "Consumo de APIs RESTful con manejo centralizado de errores e interceptores HTTP.",
        "Diseño responsivo con Tailwind CSS y feedback visual en tiempo real."
      ],
      technologies: ["Angular", "TypeScript", "RxJS", "Tailwind CSS", "REST APIs"],
      githubUrl: "https://github.com/WellJhoon/front-pos"
    }
  ] as Project[],
  skillCategories: [
    {
      category: "Lenguajes de Programación",
      items: [
        { name: "TypeScript" },
        { name: "JavaScript (ES6+)" },
        { name: "C# (.NET Core)" },
        { name: "Java" },
        { name: "Go (Golang)" },
        { name: "Python" },
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
  ] as SkillCategory[],
  education: [
    {
      institution: "Instituto Tecnológico de las Américas (ITLA)",
      degree: "Técnico Superior en Desarrollo de Software",
      period: "2020 – 2023",
      details: "Formación integral en algoritmos, estructuras de datos, desarrollo web y bases de datos relacionales/no relacionales."
    }
  ] as EducationItem[],
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
  ] as CertificationItem[]
};
