// src/app/api/ai-search/route.ts
// Gemini Flash-Lite API route for SubhashOS AI search

import { NextRequest, NextResponse } from 'next/server';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-3.1-flash-lite';

const SYSTEM_PROMPT = `You are SubhashOS Assistant embedded inside Subhash R's portfolio website.
Answer only using the provided portfolio context.
Be concise, accurate, developer-friendly, and slightly witty.
If the question is outside Subhash R's portfolio, say you only answer portfolio-related questions.
Prefer first-person voice when describing Subhash, but do not invent facts.
Keep answers under 120 words.`;

// Build context statically to avoid importing client-side data modules
const PORTFOLIO_CONTEXT = `
ABOUT: Subhash R is an AI & Machine Learning student. AI Engineer | DevOps Enthusiast | Linux User. Located in Chennai, Tamil Nadu, India. Status: Open to Opportunities. Email: subhashravichandran7432@gmail.com. Languages: English, Tamil.

EDUCATION: B.Tech in Computer Science and Engineering (AI) at Amrita Vishwa Vidyapeetham, Chennai. 2023-2027. GPA: 7.43/10. Ongoing.

SKILLS: Languages: Python, C++, JavaScript, TypeScript, Java, SQL, Linux. DevOps: Docker, Kubernetes, AWS, Git, Shell. Web: FastAPI, React, Next.js, PostgreSQL, MongoDB, Node.js. AI/ML: System Design, RAG, LangChain, LLM, OpenAI, PyTorch, TensorFlow. Data: Apache Kafka, Apache Spark, Hadoop, MySQL.

KEY PROJECTS: Focus Flow AI (Next.js, FastAPI, Ollama), Smart-City Traffic Intelligence (Kafka, Spark, Hadoop), E-Commerce Legal Metrology Compliance (React, Node.js, Docker), RGB-Thermal Pedestrian Detection (PyTorch, Swin Transformer), MELD-DMC Fusion (PyTorch, BERT), Emotion-Aware Voice Assistant (MFCC, BiLSTM, FastAPI), HSI Foreign Material Detection (PyTorch, Hyperspectral), Async Ride Boost (Node.js, Redis, WebSockets).

RESEARCH: "GAM Oversampling and GMM Based Resampling Algorithm" at IEEE InC4 2025. "QR Code Encryption Using LU Decomposition and PCA" at IConSCEPT 2024 — Best Research Paper Award. IEEE Member ID: 100981642.

ACHIEVEMENTS: 2nd Place at Coders of the Black Pearl (2024), Best Research Paper Award at IConSCEPT 2024.

CONTACT: Email subhashravichandran7432@gmail.com, Phone +91 9962187680. GitHub: github.com/Subhash-777. LinkedIn: linkedin.com/in/subhash-r-b21137393.
`;

// Simple rate limiter
const requestCounts = new Map<string, { count: number; resetTime: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = requestCounts.get(ip);

  if (!entry || now > entry.resetTime) {
    requestCounts.set(ip, { count: 1, resetTime: now + 60000 });
    return false;
  }

  if (entry.count >= 10) return true;
  entry.count++;
  return false;
}

export async function POST(request: NextRequest) {
  try {
    // Check API key
    if (!GEMINI_API_KEY) {
      return NextResponse.json({
        answer: "I'm Subhash R — an AI Engineer and DevOps enthusiast based in Chennai, India. I'm currently pursuing B.Tech CSE (AI) at Amrita Vishwa Vidyapeetham. I build intelligent systems using Python, PyTorch, and modern web stacks. Check out my projects and research pages for more!",
        suggestions: ['View Projects', 'Read Research', 'Open Resume'],
        sources: ['local-fallback'],
      });
    }

    // Parse body
    const body = await request.json();
    const query = (body.query || '').trim().slice(0, 200);

    if (!query) {
      return NextResponse.json({
        answer: 'Please ask a question about Subhash or his portfolio.',
        suggestions: ['Who is Subhash?', 'What projects has he built?', 'How to contact him?'],
      });
    }

    // Rate limit
    const ip = request.headers.get('x-forwarded-for') || 'anonymous';
    if (isRateLimited(ip)) {
      return NextResponse.json({
        answer: "Hold on! You're asking too many questions too quickly. Try again in a minute.",
        suggestions: [],
      });
    }

    // Call Gemini API via SDK
    const { GoogleGenAI } = await import('@google/genai');
    const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

    const response = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents: [
        {
          role: 'user',
          parts: [
            { text: `${SYSTEM_PROMPT}\n\nPORTFOLIO CONTEXT:\n${PORTFOLIO_CONTEXT}\n\nUSER QUESTION: ${query}` },
          ],
        },
      ],
    });

    const answer = response.text || 'I couldn\'t generate an answer right now. Try a simpler question!';

    // Generate contextual suggestions
    const suggestions = generateSuggestions(query);

    return NextResponse.json({
      answer,
      suggestions,
      sources: ['portfolio-data'],
    });
  } catch (error) {
    console.error('AI Search error:', error);
    return NextResponse.json({
      answer: 'SubhashOS Assistant encountered an error. Try searching locally instead!',
      suggestions: ['Who is Subhash?', 'What are his skills?'],
      error: true,
    });
  }
}

function generateSuggestions(query: string): string[] {
  const lower = query.toLowerCase();
  if (lower.includes('project')) return ['What stack does he use?', 'Is he available for work?'];
  if (lower.includes('skill') || lower.includes('stack')) return ['What projects has he built?', 'Where did he study?'];
  if (lower.includes('contact') || lower.includes('hire')) return ['What are his skills?', 'View his resume'];
  if (lower.includes('research') || lower.includes('paper')) return ['What projects has he built?', 'What are his achievements?'];
  return ['What projects should I see?', 'How to contact him?'];
}
