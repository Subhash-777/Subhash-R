// src/lib/atsScorer.ts
import { ProjectBankEntry } from '@/data/projectBank';

// ATS keyword lists per role category
// Reference: ProjectBank_ATS_Strategy.md Part C
const ROLE_KEYWORDS: Record<string, string[]> = {
  'Full Stack Developer': [
    'REST API', 'Node.js', 'React.js', 'Next.js', 'TypeScript', 'Docker',
    'PostgreSQL', 'MongoDB', 'FastAPI', 'OAuth 2.0', 'full-stack',
    'microservices', 'CI/CD', 'WebSockets', 'JWT', 'Express.js', 'Vite',
    'Tailwind CSS', 'Firebase', 'Redis', 'RBAC', 'containerization',
    'REST API deployment', 'SPA', 'real-time sync', 'multi-service architecture',
  ],
  'Full Stack (Current Live)': [
    'REST API', 'Node.js', 'React.js', 'Next.js', 'TypeScript', 'Docker',
    'PostgreSQL', 'MongoDB', 'FastAPI', 'OAuth 2.0', 'full-stack',
    'microservices', 'CI/CD', 'WebSockets', 'JWT', 'Express.js', 'Vite',
    'Tailwind CSS', 'Firebase', 'Redis', 'RBAC', 'containerization',
  ],
  'Backend Engineer': [
    'Node.js', 'Express.js', 'REST API', 'WebSockets', 'Redis', 'MongoDB',
    'Docker', 'JWT', 'RBAC', 'high-concurrency', 'async processing',
    'Apache Kafka', 'distributed systems', 'PostgreSQL', 'MySQL', 'FastAPI',
    'event-driven architecture', 'streaming pipeline', 'backend systems',
    'job queuing', 'aggregation pipeline', 'real-time',
  ],
  'Frontend Engineer': [
    'Next.js', 'React.js', 'Vite', 'TypeScript', 'SSR', 'SSG',
    'code splitting', 'lazy loading', 'component architecture', 'state management',
    'responsive design', 'mobile-first', 'Tailwind CSS', 'accessibility',
    'interactive UI', '3D visualization', 'SPA', 'full-stack',
  ],
  'Data Engineer': [
    'Apache Kafka', 'Apache Spark', 'Hadoop', 'HDFS', 'stream processing',
    'ETL pipeline', 'data lake', 'distributed systems', 'MongoDB', 'Python',
    'scikit-learn', 'REST API', 'real-time analytics', 'event-driven architecture',
    'time-series', 'IoT', 'Node.js', 'batch processing',
  ],
  'AI/ML Engineer': [
    'NLP', 'BERT', 'Transformers', 'PyTorch', 'multimodal learning',
    'emotion recognition', 'deep learning', 'sequence modeling', 'F1 score',
    'FastAPI', 'REST API', 'real-time inference', 'dialogue systems',
    'speech processing', 'MFCC', 'BiLSTM', 'sentiment analysis',
    'Apache Kafka', 'ML classifier', 'scikit-learn',
  ],
  'NLP / LLM Engineer': [
    'NLP', 'BERT', 'Transformers', 'PyTorch', 'LLM integration', 'Ollama',
    'natural language processing', 'sentiment analysis', 'dialogue systems',
    'emotion recognition', 'conversational AI', 'sequence modeling',
    'multimodal learning', 'late fusion', 'MELD', 'speech processing',
    'FastAPI', 'real-time inference', 'microservice',
  ],
  'Computer Vision Engineer': [
    'computer vision', 'object detection', 'multispectral', 'feature fusion',
    'PyTorch', 'Swin Transformer', 'ResNet', 'FPN', 'pedestrian detection',
    'deep learning', 'mAP', 'hyperspectral imaging', 'feature extraction',
    'synthetic augmentation', 'image classification', 'transfer learning',
    'CNN', 'data augmentation', 'CAM', 'model interpretability',
  ],
  'Robotics / Autonomous Systems': [
    'robot localization', 'ROS', 'sensor fusion', 'memory networks', 'PyTorch',
    'LiDAR', 'IMU', 'neural networks', 'autonomous systems', 'state estimation',
    'RNN', 'anomaly detection', 'fault detection', 'time-series analysis',
    'predictive maintenance', 'computer vision', 'object detection', 'deep learning',
  ],
  'Research Internship': [
    'PyTorch', 'deep learning', 'computer vision', 'NLP', 'BERT',
    'Transformers', 'multimodal learning', 'feature fusion', 'object detection',
    'time-series prediction', 'LSTM', 'remote sensing', 'geospatial',
    'F1 score', 'mAP', 'ablation', 'sequence modeling',
  ],
  'Mobile / Cross-Platform': [
    'React Native', 'React.js', 'Next.js', 'TypeScript', 'Node.js',
    'Express.js', 'REST API', 'cross-platform', 'mobile development',
    'accessibility', 'WCAG', 'JavaScript', 'full-stack', 'Docker',
    'Firebase', 'OAuth 2.0',
  ],
  'IoT / EV / Mobility Tech': [
    'Apache Kafka', 'IoT', 'Node.js', 'MongoDB', 'REST API', 'time-series',
    'ML', 'real-time telemetry', 'fleet management', 'Python', 'scikit-learn',
    'distributed systems', 'streaming pipeline', 'data lake', 'HDFS',
    'Spark Streaming', 'event-driven architecture',
  ],
  'SaaS / Product Startup': [
    'Next.js', 'TypeScript', 'FastAPI', 'Docker', 'OAuth 2.0', 'REST API',
    'Firebase', 'full-stack', 'Node.js', 'Express.js', 'Redis', 'MongoDB',
    'JWT', 'RBAC', 'WebSockets', 'CI/CD', 'containerization', 'SPA',
  ],
  'General / Cold Apply': [
    'REST API', 'Node.js', 'React.js', 'Next.js', 'TypeScript', 'Docker',
    'MongoDB', 'FastAPI', 'full-stack', 'CI/CD', 'Python', 'deep learning',
    'PyTorch', 'distributed systems', 'backend systems',
  ],
};

export function calculateATSScore(
  selectedProjects: ProjectBankEntry[],
  role: string
): {
  score: number;
  matched: string[];
  missing: string[];
  label: 'Excellent Match' | 'Good Match' | 'Consider Swapping';
} {
  const keywords = ROLE_KEYWORDS[role] ?? ROLE_KEYWORDS['General / Cold Apply'] ?? [];
  if (keywords.length === 0) return { score: 0, matched: [], missing: [], label: 'Consider Swapping' };

  const allProjectKeywords = new Set(
    selectedProjects.flatMap(p => p.atsKeywords.map(k => k.toLowerCase()))
  );

  const matched = keywords.filter(k => allProjectKeywords.has(k.toLowerCase()));
  const missing = keywords.filter(k => !allProjectKeywords.has(k.toLowerCase())).slice(0, 5);
  const score = Math.round((matched.length / keywords.length) * 100);

  const label =
    score >= 90 ? 'Excellent Match' :
    score >= 75 ? 'Good Match' :
    'Consider Swapping';

  return { score, matched, missing, label };
}
