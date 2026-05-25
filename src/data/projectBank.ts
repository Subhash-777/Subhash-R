// src/data/projectBank.ts
// Complete project bank with ATS data from ProjectBank_ATS_Strategy.md

export type ProjectDomain =
  | 'full-stack'
  | 'backend'
  | 'frontend'
  | 'ai-ml'
  | 'nlp'
  | 'computer-vision'
  | 'data-engineering'
  | 'robotics'
  | 'mobile'
  | 'iot'
  | 'research';

export interface ProjectBankEntry {
  id: string;
  title: string;
  stack: string;
  date: string;
  githubUrl: string;
  bullets: string[];
  atsKeywords: string[];
  priorityTier: 1 | 2 | 3;
  roleFit: string[];
  swapRecommendation: string;
  status: 'active' | 'swap';
  domain: ProjectDomain[];
}

export const PROJECT_BANK: ProjectBankEntry[] = [
  {
    id: 'focus-flow-ai',
    title: 'Focus Flow AI: Productivity Intelligence Platform',
    stack: 'Next.js, TypeScript, FastAPI, Ollama (LLaMA 3), Firebase, Docker, OAuth 2.0',
    date: 'Dec 2025 -- Jan 2026',
    githubUrl: 'https://github.com/Subhash-777',
    bullets: [
      'Architected a full-stack AI productivity platform integrating Google Calendar and Gmail APIs via OAuth 2.0; built a FastAPI backend delivering LLM-driven cognitive load inference via Ollama (LLaMA 3) at sub-300ms API response latency.',
      'Engineered a Dockerized multi-service stack (Next.js frontend, FastAPI server, LLM inference); implemented Firebase real-time sync for session and concurrent multi-user workflow management across the platform.',
    ],
    atsKeywords: [
      'Next.js', 'TypeScript', 'FastAPI', 'Docker', 'OAuth 2.0', 'REST API',
      'LLM integration', 'Ollama', 'Firebase', 'real-time sync', 'full-stack',
      'multi-service architecture', 'cognitive computing', 'LLaMA 3', 'AI-powered',
    ],
    priorityTier: 1,
    roleFit: ['Full Stack Developer', 'AI Integration Engineer', 'SWE Intern'],
    swapRecommendation: 'Keep in resume for all Full Stack, SaaS, and AI Integration roles.',
    status: 'active',
    domain: ['full-stack', 'ai-ml'],
  },
  {
    id: 'smart-city-traffic',
    title: 'Smart-City Real-Time Traffic Intelligence System',
    stack: 'Apache Kafka, Spark Streaming, Hadoop, HDFS, MongoDB, Python, scikit-learn',
    date: '2025',
    githubUrl: 'https://github.com/Subhash-777',
    bullets: [
      'Architected a distributed streaming pipeline ingesting 10,000+ IoT events/sec via Apache Kafka with Spark Streaming jobs for real-time congestion classification, reducing event-to-alert latency by 40\\% over batch baselines across a 5-tier severity model.',
      'Designed an HDFS-backed data lake with MongoDB operational storage; trained ML classifiers achieving 89\\% congestion prediction accuracy; exposed insights via a REST API layer serving live monitoring dashboards.',
    ],
    atsKeywords: [
      'Apache Kafka', 'Spark Streaming', 'Hadoop', 'HDFS', 'MongoDB',
      'distributed systems', 'real-time analytics', 'IoT', 'streaming pipeline',
      'data lake', 'scikit-learn', 'REST API', 'ML classifier', 'backend engineering',
      'event-driven architecture',
    ],
    priorityTier: 1,
    roleFit: ['Backend Engineer', 'Data Engineer', 'Distributed Systems', 'SWE Intern'],
    swapRecommendation: 'Keep in resume for all Backend, Data Engineering, and Distributed Systems roles.',
    status: 'active',
    domain: ['backend', 'data-engineering'],
  },
  {
    id: 'ecommerce-compliance',
    title: 'E-Commerce Legal Metrology Compliance Platform',
    stack: 'React (Vite), TypeScript, Node.js, Express.js, MySQL, Docker, Tesseract OCR',
    date: 'Aug -- Sep 2024',
    githubUrl: 'https://github.com/Subhash-777',
    bullets: [
      'Developed a production-grade full-stack compliance system with a React/TypeScript SPA and Node.js/Express REST API; integrated Tesseract OCR achieving 94\\% field-accuracy, validating 500+ product listings against 15+ legal metrology regulations.',
      'Implemented RBAC, PDF report export, and a normalized MySQL schema; containerized the full stack with Docker, enabling reproducible deployment and streamlined development-to-staging CI workflows.',
    ],
    atsKeywords: [
      'React.js', 'TypeScript', 'Node.js', 'Express.js', 'MySQL', 'Docker',
      'Tesseract OCR', 'REST API', 'RBAC', 'role-based access control', 'full-stack',
      'CI/CD', 'containerization', 'Vite', 'SPA', 'compliance automation', 'PDF generation',
    ],
    priorityTier: 1,
    roleFit: ['Full Stack Developer', 'Backend Engineer', 'SWE Intern'],
    swapRecommendation: 'Keep in resume for all Full Stack, Backend, and Product Engineering roles.',
    status: 'active',
    domain: ['full-stack', 'backend'],
  },
  {
    id: 'async-ride-boost',
    title: 'Async Ride Boost: Scalable Ride-Hailing Backend',
    stack: 'Node.js, Express.js, Redis, WebSockets, MongoDB, JWT Authentication, REST APIs',
    date: '2025',
    githubUrl: 'https://github.com/Subhash-777',
    bullets: [
      'Engineered a high-concurrency ride-hailing backend with Node.js/Express; implemented asynchronous job queuing via Redis for driver-rider matching logic, achieving sub-500ms dispatch latency under 200+ simultaneous WebSocket connections.',
      'Designed RESTful APIs with JWT-based authentication and role-based access control for rider, driver, and admin personas; architected MongoDB document schemas for complete trip lifecycle management with aggregation pipelines powering real-time operational dashboards.',
    ],
    atsKeywords: [
      'Node.js', 'Express.js', 'Redis', 'WebSockets', 'MongoDB', 'JWT', 'REST API',
      'RBAC', 'async processing', 'job queuing', 'real-time', 'high-concurrency',
      'backend systems', 'aggregation pipeline',
    ],
    priorityTier: 1,
    roleFit: ['Backend Engineer', 'SWE Intern', 'Distributed Systems'],
    swapRecommendation: 'Replace E-Commerce Compliance when applying to backend-heavy or systems engineering roles.',
    status: 'swap',
    domain: ['backend'],
  },
  {
    id: 'scan-scavvy',
    title: 'ScanScavvy: Cross-Platform Barcode Intelligence App',
    stack: 'React Native, Node.js, Express.js, JavaScript, REST APIs, Web Speech API (TTS)',
    date: 'Jun -- Jul 2025',
    githubUrl: 'https://github.com/Subhash-777',
    bullets: [
      'Engineered a cross-platform barcode scanning application in React Native for the Walmart Spark Hackathon; built a Node.js/Express REST API integrating product databases to serve nutritional data, expiry validation, and allergen alerts with sub-200ms response time per scan.',
      'Implemented an accessibility-first UI architecture with WCAG-compliant high-contrast components and Web Speech API text-to-speech integration; processed 1,000+ product lookups during hackathon evaluation with zero downtime.',
    ],
    atsKeywords: [
      'React Native', 'Node.js', 'Express.js', 'REST API', 'cross-platform',
      'mobile development', 'accessibility', 'WCAG', 'hackathon', 'JavaScript',
      'barcode scanning', 'text-to-speech',
    ],
    priorityTier: 2,
    roleFit: ['Full Stack Developer', 'Mobile Engineer', 'SWE Intern'],
    swapRecommendation: 'Replace E-Commerce Compliance when applying to mobile or hackathon-friendly startups.',
    status: 'swap',
    domain: ['full-stack', 'mobile'],
  },
  {
    id: 'rubik-solver-ai',
    title: 'Rubik Solver AI: Vision-Powered Cube Solver',
    stack: 'Python, OpenCV, A* Search, React, Node.js, REST APIs, 3D Visualization',
    date: '2025',
    githubUrl: 'https://github.com/Subhash-777',
    bullets: [
      'Engineered an end-to-end AI Rubik\'s cube solver using OpenCV for real-time face color detection from webcam input; implemented A* search to compute optimal solving sequences averaging 22 moves, resolving any valid cube state in under 1 second.',
      'Built a React frontend with live webcam integration and animated 3D cube visualization; designed a Node.js REST API to serve solver computations, delivering a browser-accessible full-stack experience across desktop and mobile viewports.',
    ],
    atsKeywords: [
      'OpenCV', 'computer vision', 'A* algorithm', 'graph search', 'React', 'Node.js',
      'REST API', '3D visualization', 'full-stack', 'algorithm design',
      'real-time processing', 'interactive UI',
    ],
    priorityTier: 2,
    roleFit: ['Full Stack Developer', 'SWE Intern', 'Algorithm-focused roles'],
    swapRecommendation: 'Replace E-Commerce Compliance when applying to companies that appreciate algorithmic creativity.',
    status: 'swap',
    domain: ['full-stack', 'computer-vision'],
  },
  {
    id: 'smart-ev',
    title: 'Smart EV: Electric Vehicle Analytics Platform',
    stack: 'Python, Apache Kafka, Node.js, MongoDB, REST APIs, IoT, ML (scikit-learn), Time-Series',
    date: '2025',
    githubUrl: 'https://github.com/Subhash-777',
    bullets: [
      'Developed an intelligent EV analytics platform ingesting real-time vehicle telemetry from IoT sensors via Apache Kafka; implemented ML-based battery health estimation and range prediction models achieving 4.2\\% MAPE on field-validated test data.',
      'Engineered a Node.js REST API backend for driver-facing dashboard delivery; designed a MongoDB time-series schema for vehicle telemetry storage and aggregation across 100+ simulated EV units, supporting fleet-level operational insights.',
    ],
    atsKeywords: [
      'Apache Kafka', 'IoT', 'Node.js', 'MongoDB', 'REST API', 'time-series', 'ML',
      'battery analytics', 'real-time telemetry', 'fleet management', 'Python',
      'scikit-learn', 'EV technology', 'backend engineering',
    ],
    priorityTier: 2,
    roleFit: ['Backend Engineer', 'IoT Platform Engineer', 'Data Engineer'],
    swapRecommendation: 'Swap in for Smart-City Traffic when applying to mobility, IoT, or EV-focused companies.',
    status: 'swap',
    domain: ['backend', 'iot', 'data-engineering'],
  },
  {
    id: 'meld-dmc-fusion',
    title: 'MELD-DMC Fusion: Multimodal Emotion Recognition',
    stack: 'Python, PyTorch, BERT, Transformers, MELD Dataset, Late Fusion Architecture',
    date: 'Jan 2026',
    githubUrl: 'https://github.com/Subhash-777',
    bullets: [
      'Designed a multimodal emotion classification system fusing BERT contextual embeddings with speaker-aware dialogue context from the MELD dataset; implemented a late-fusion architecture achieving a 5.3\\% weighted F1 improvement over unimodal text baselines across 7 emotion categories.',
      'Engineered a dialogue-segment tokenization pipeline for multi-turn conversation encoding; conducted ablation experiments across early, late, and hybrid fusion strategies to identify optimal architecture configurations for multi-speaker emotion recognition.',
    ],
    atsKeywords: [
      'NLP', 'BERT', 'Transformers', 'PyTorch', 'multimodal learning',
      'emotion recognition', 'dialogue systems', 'late fusion', 'natural language processing',
      'sentiment analysis', 'F1 score', 'MELD', 'deep learning', 'sequence modeling',
    ],
    priorityTier: 1,
    roleFit: ['NLP Engineer', 'ML Engineer', 'AI Research Intern'],
    swapRecommendation: 'Swap in for E-Commerce Compliance when applying to NLP, LLM, or AI research roles.',
    status: 'swap',
    domain: ['ai-ml', 'nlp'],
  },
  {
    id: 'emotion-aware-va',
    title: 'Emotion-Aware Voice Assistant',
    stack: 'Python, PyTorch, MFCC, BiLSTM, Speech Processing, NLP, FastAPI',
    date: 'Jan 2026',
    githubUrl: 'https://github.com/Subhash-777',
    bullets: [
      'Built a real-time speech-driven dialogue system integrating emotion recognition via MFCC audio feature extraction and a BiLSTM sequence model; achieved 78\\% emotion classification accuracy across 7 emotion classes on a standard speech emotion recognition benchmark.',
      'Deployed the inference pipeline as a FastAPI REST service with sub-200ms latency; designed a context-aware response generation module that adapts dialogue outputs based on predicted emotional state, packaged as a modular Python microservice.',
    ],
    atsKeywords: [
      'NLP', 'speech processing', 'MFCC', 'BiLSTM', 'PyTorch', 'FastAPI',
      'emotion recognition', 'sequence modeling', 'conversational AI', 'real-time inference',
      'REST API', 'dialogue systems', 'microservice',
    ],
    priorityTier: 1,
    roleFit: ['NLP Engineer', 'Conversational AI Intern', 'ML Engineer'],
    swapRecommendation: 'Use alongside MELD-DMC for NLP/AI-heavy resume variants.',
    status: 'swap',
    domain: ['ai-ml', 'nlp'],
  },
  {
    id: 'rgb-thermal-detection',
    title: 'RGB-Thermal Pedestrian Detection (Multispectral Fusion)',
    stack: 'Python, PyTorch, Swin Transformer, ResNet50, FPN, KAIST Dataset, Computer Vision',
    date: '2026',
    githubUrl: 'https://github.com/Subhash-777',
    bullets: [
      'Engineered a multispectral pedestrian detection pipeline on the KAIST benchmark (95,000+ annotated image pairs) using a Swin Transformer + ResNet50 dual-stream backbone with RGB-Thermal feature fusion; achieved 15.2\\% miss-rate reduction over single-modality baseline under low-light and adverse-weather conditions.',
      'Implemented Feature Pyramid Network (FPN) for multi-scale object detection; benchmarked detection performance across five illumination conditions, establishing robust localization with 87.3\\% mAP on the KAIST test set.',
    ],
    atsKeywords: [
      'computer vision', 'object detection', 'multispectral', 'feature fusion', 'PyTorch',
      'Swin Transformer', 'ResNet', 'FPN', 'pedestrian detection', 'deep learning',
      'KAIST', 'mAP', 'low-light perception', 'autonomous systems',
    ],
    priorityTier: 1,
    roleFit: ['Computer Vision Engineer', 'ML Research Intern', 'Autonomous Systems Engineer'],
    swapRecommendation: 'Replace all 3 active projects only for Computer Vision or Robotics-specific resume variants.',
    status: 'swap',
    domain: ['computer-vision', 'research'],
  },
  {
    id: 'hsi-fm-detection',
    title: 'HSI Foreign Material Detection Framework',
    stack: 'Python, PyTorch, Hyperspectral Imaging, Synthetic Augmentation, Deep Learning',
    date: '2026',
    githubUrl: 'https://github.com/Subhash-777',
    bullets: [
      'Developed a lightweight hyperspectral deep learning framework for detecting sub-millimeter foreign material contaminants; applied synthetic spectral augmentation to address class imbalance, improving model recall by 18\\% over baseline detection pipelines on industrial inspection datasets.',
      'Engineered band-selective convolutional feature extraction with spectral attention mechanisms to reduce model parameter count by 32\\%, enabling deployment on compute-constrained embedded inspection hardware.',
    ],
    atsKeywords: [
      'hyperspectral imaging', 'deep learning', 'PyTorch', 'feature extraction',
      'synthetic augmentation', 'object detection', 'computer vision',
      'embedded inference', 'model optimization', 'industrial AI', 'anomaly detection',
    ],
    priorityTier: 1,
    roleFit: ['Computer Vision Research Intern', 'ML Engineer', 'Research Engineer'],
    swapRecommendation: 'Use alongside RGB-Thermal for CV/research-focused resume variants.',
    status: 'swap',
    domain: ['computer-vision', 'research'],
  },
  {
    id: 'memory-augmented-localization',
    title: 'Memory-Augmented Robot Localization',
    stack: 'Python, PyTorch, RNN, Memory Networks, ROS, LiDAR, IMU, Sensor Fusion',
    date: '2025',
    githubUrl: 'https://github.com/Subhash-777',
    bullets: [
      'Developed a memory-augmented neural network for robot self-localization in GPS-denied environments; integrated episodic memory modules with RNN-based state estimation, improving localization accuracy by 23\\% over scan-matching baselines on indoor navigation benchmarks.',
      'Implemented a ROS-compatible localization pipeline for real-time deployment on mobile robotic platforms; designed modular sensor fusion components combining LiDAR and IMU inputs for robust state estimation under dynamic environment conditions.',
    ],
    atsKeywords: [
      'robot localization', 'ROS', 'sensor fusion', 'memory networks', 'PyTorch',
      'LiDAR', 'IMU', 'neural networks', 'autonomous systems', 'state estimation',
      'RNN', 'GPS-denied', 'robotics',
    ],
    priorityTier: 1,
    roleFit: ['Robotics Engineer', 'Autonomous Systems Intern', 'ML Researcher'],
    swapRecommendation: 'Use for Robotics/Autonomous Systems resume variants only.',
    status: 'swap',
    domain: ['robotics', 'research'],
  },
  {
    id: 'robot-fault-detection',
    title: 'Robot Fault Detection System',
    stack: 'Python, scikit-learn, PyTorch, Time-Series Analysis, Anomaly Detection, Sensor Data',
    date: '2025',
    githubUrl: 'https://github.com/Subhash-777',
    bullets: [
      'Built a predictive fault detection system for robotic actuators using multivariate time-series sensor data; trained an ensemble of Random Forest and LSTM classifiers achieving 96\\% fault detection precision and 93\\% recall, reducing false-alarm rate by 38\\% on an industrial robotics simulation dataset.',
      'Engineered a real-time anomaly detection pipeline with sliding-window feature extraction from vibration, torque, and temperature streams; implemented a threshold-adaptive alerting layer capable of identifying incipient faults 15 seconds prior to failure onset.',
    ],
    atsKeywords: [
      'anomaly detection', 'fault detection', 'time-series analysis', 'predictive maintenance',
      'ensemble learning', 'LSTM', 'scikit-learn', 'sensor fusion', 'industrial AI',
      'real-time monitoring', 'PyTorch',
    ],
    priorityTier: 1,
    roleFit: ['ML Engineer', 'Robotics ML Intern', 'Reliability Engineering'],
    swapRecommendation: 'Use for Robotics/Industrial AI resume variants.',
    status: 'swap',
    domain: ['robotics', 'ai-ml'],
  },
  {
    id: 'indian-artwork-classifier',
    title: 'Indian Artwork Classifier',
    stack: 'Python, PyTorch, ResNet50, Transfer Learning, CNN, Data Augmentation, REST API',
    date: '2025',
    githubUrl: 'https://github.com/Subhash-777',
    bullets: [
      'Developed a fine-grained image classification system identifying 12+ traditional Indian art styles using transfer learning on a ResNet50 backbone fine-tuned on a curated dataset of 5,000+ artwork images; achieved 91\\% top-1 classification accuracy after augmentation-based regularization.',
      'Deployed the model as a web inference API enabling artwork style recognition from uploaded images in under 500ms; implemented class activation mapping (CAM) for interpretability, surfacing discriminative visual features per art style.',
    ],
    atsKeywords: [
      'image classification', 'transfer learning', 'fine-tuning', 'ResNet', 'CNN',
      'PyTorch', 'data augmentation', 'model interpretability', 'REST API deployment',
      'computer vision', 'CAM',
    ],
    priorityTier: 2,
    roleFit: ['ML Engineer', 'CV Engineer', 'AI/ML Intern'],
    swapRecommendation: 'Use when applying to ML engineer roles at creative-tech, cultural-AI, or ed-tech startups.',
    status: 'swap',
    domain: ['ai-ml', 'computer-vision'],
  },
  {
    id: 'glacier-movement-prediction',
    title: 'Glacier Movement Prediction',
    stack: 'Python, PyTorch, LSTM, Remote Sensing, Sentinel-2, MODIS, Time-Series, scikit-learn',
    date: '2025',
    githubUrl: 'https://github.com/Subhash-777',
    bullets: [
      'Engineered a time-series deep learning pipeline for glacier velocity prediction using multi-temporal Sentinel-2 and MODIS satellite datasets; implemented an LSTM-based regression model capturing seasonal motion patterns with a mean absolute error of 2.1 m/year on held-out geospatial validation sets.',
      'Developed custom remote sensing preprocessing pipelines for spatial normalization and temporal sliding-window feature extraction; applied band-ratio indices and spatial resampling to produce a unified multi-source training corpus across 8 glacial regions.',
    ],
    atsKeywords: [
      'time-series prediction', 'LSTM', 'remote sensing', 'geospatial', 'Sentinel-2',
      'MODIS', 'deep learning', 'PyTorch', 'regression', 'climate AI',
      'satellite data', 'feature engineering',
    ],
    priorityTier: 3,
    roleFit: ['ML Research Intern', 'Climate Tech Engineer', 'Geospatial AI Engineer'],
    swapRecommendation: 'Use only for climate tech, geospatial AI, or research-leaning positions.',
    status: 'swap',
    domain: ['research', 'ai-ml'],
  },
];

export const ROLE_COMBINATIONS: Record<string, [string, string, string]> = {
  'Full Stack Developer':           ['focus-flow-ai', 'ecommerce-compliance', 'async-ride-boost'],
  'Full Stack (Current Live)':      ['focus-flow-ai', 'smart-city-traffic', 'ecommerce-compliance'],
  'Backend Engineer':               ['smart-city-traffic', 'async-ride-boost', 'ecommerce-compliance'],
  'Frontend Engineer':              ['focus-flow-ai', 'ecommerce-compliance', 'rubik-solver-ai'],
  'Data Engineer':                  ['smart-city-traffic', 'smart-ev', 'focus-flow-ai'],
  'AI/ML Engineer':                 ['meld-dmc-fusion', 'emotion-aware-va', 'smart-city-traffic'],
  'NLP / LLM Engineer':             ['meld-dmc-fusion', 'emotion-aware-va', 'focus-flow-ai'],
  'Computer Vision Engineer':       ['rgb-thermal-detection', 'hsi-fm-detection', 'indian-artwork-classifier'],
  'Robotics / Autonomous Systems':  ['rgb-thermal-detection', 'memory-augmented-localization', 'robot-fault-detection'],
  'Research Internship':            ['rgb-thermal-detection', 'meld-dmc-fusion', 'glacier-movement-prediction'],
  'Mobile / Cross-Platform':        ['focus-flow-ai', 'scan-scavvy', 'ecommerce-compliance'],
  'IoT / EV / Mobility Tech':       ['smart-city-traffic', 'smart-ev', 'focus-flow-ai'],
  'SaaS / Product Startup':         ['focus-flow-ai', 'ecommerce-compliance', 'async-ride-boost'],
};

export const ROLE_FILENAMES: Record<string, string> = {
  'Full Stack Developer':           'SubhashR_FullStack_SWE_2026.pdf',
  'Full Stack (Current Live)':      'SubhashR_FullStack_SWE_2026.pdf',
  'Backend Engineer':               'SubhashR_Backend_Engineer_2026.pdf',
  'Frontend Engineer':              'SubhashR_Frontend_Engineer_2026.pdf',
  'AI/ML Engineer':                 'SubhashR_ML_Engineer_2026.pdf',
  'NLP / LLM Engineer':             'SubhashR_NLP_Engineer_2026.pdf',
  'Computer Vision Engineer':       'SubhashR_CV_Engineer_2026.pdf',
  'Robotics / Autonomous Systems':  'SubhashR_Robotics_Engineer_2026.pdf',
  'Research Internship':            'SubhashR_Research_Intern_2026.pdf',
  'Data Engineer':                  'SubhashR_DataEngineer_2026.pdf',
  'Mobile / Cross-Platform':        'SubhashR_Mobile_Engineer_2026.pdf',
  'IoT / EV / Mobility Tech':       'SubhashR_IoT_Engineer_2026.pdf',
  'SaaS / Product Startup':         'SubhashR_SaaS_SWE_2026.pdf',
  'General / Cold Apply':           'SubhashR_Software_Engineer_2026.pdf',
};

export const ROLE_TITLES: Record<string, string> = {
  'Full Stack Developer':           'Full Stack Developer · Backend Systems · AI Integration · Published IEEE Researcher',
  'Full Stack (Current Live)':      'Full Stack Developer · Backend Systems · AI Integration · Published IEEE Researcher',
  'Backend Engineer':               'Backend Engineer · Distributed Systems · Real-Time Analytics · Published IEEE Researcher',
  'Frontend Engineer':              'Frontend Engineer · React.js · Next.js · Full Stack Capable · Published IEEE Researcher',
  'Data Engineer':                  'Data Engineer · Apache Kafka · Spark · Distributed Pipelines · Published IEEE Researcher',
  'AI/ML Engineer':                 'AI/ML Engineer · NLP · Multimodal Learning · Deep Learning · Published IEEE Researcher',
  'NLP / LLM Engineer':             'NLP Engineer · LLM Integration · Conversational AI · Published IEEE Researcher',
  'Computer Vision Engineer':       'Computer Vision Engineer · Deep Learning · Multispectral Fusion · Published IEEE Researcher',
  'Robotics / Autonomous Systems':  'Robotics Engineer · Autonomous Systems · Sensor Fusion · Published IEEE Researcher',
  'Research Internship':            'ML Research Engineer · Computer Vision · NLP · 2× IEEE Publications',
  'Mobile / Cross-Platform':        'Full Stack Developer · React Native · Mobile-First · Published IEEE Researcher',
  'IoT / EV / Mobility Tech':       'Backend Engineer · IoT · Real-Time Telemetry · Published IEEE Researcher',
  'SaaS / Product Startup':         'Full Stack Developer · SaaS Architecture · AI Integration · Published IEEE Researcher',
  'General / Cold Apply':           'Software Engineer · Full Stack · AI Integration · Published IEEE Researcher',
};

export const DOMAIN_LABELS: Record<ProjectDomain, string> = {
  'full-stack': 'Full Stack',
  'backend': 'Backend',
  'frontend': 'Frontend',
  'ai-ml': 'AI/ML',
  'nlp': 'NLP',
  'computer-vision': 'Computer Vision',
  'data-engineering': 'Data Engineering',
  'robotics': 'Robotics',
  'mobile': 'Mobile',
  'iot': 'IoT',
  'research': 'Research',
};
