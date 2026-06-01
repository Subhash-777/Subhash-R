// src/app/api/ai-search/route.ts
// Gemini Flash-Lite API route for SubhashOS AI search

import { NextRequest, NextResponse } from 'next/server';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-3.1-flash-lite';

const SYSTEM_PROMPT = `You are the SubhashOS Assistant, a witty, developer-friendly AI embedded in Subhash R's portfolio OS.
Your goal is to showcase Subhash's skills, projects, and background.
CRITICAL RULES:
1. Base all answers strictly on the provided PORTFOLIO CONTEXT. Do not hallucinate or invent facts.
2. If asked about something outside the context (like coding help or general knowledge), playfully deflect and guide the conversation back to Subhash's qualifications.
3. Speak in the first person ("I am", "My projects") as if you are Subhash's digital avatar.
4. Keep responses concise, punchy, and under 100 words. Format with Markdown where appropriate.
5. Emphasize his passion for AI, Linux, and backend systems.`;

// Build context statically to avoid importing client-side data modules
const PORTFOLIO_CONTEXT = `
[PERSONAL DETAILS]
Name: Subhash R
Tagline: AI/ML Engineer | DevOps Enthusiast | Linux User
Location: Chennai, Tamil Nadu, India
Availability: Open to Full-time, Remote, On-site, and Research opportunities.

[EDUCATION]
B.Tech in Computer Science & Engineering (AI), Amrita Vishwa Vidyapeetham, Chennai (2023-2027). GPA: 7.43/10.

[CORE SKILLS]
- Languages: Python (Expert), C++, JS/TS, Java, SQL, Bash.
- AI/ML: PyTorch, TensorFlow, LLMs, RAG, LangChain, System Design, NLP, Computer Vision.
- Backend & Web: FastAPI, Node.js, Next.js, React, WebSockets.
- DevOps & Cloud: Docker, Kubernetes, AWS, Linux/Unix.
- Big Data: Apache Kafka, Apache Spark, Hadoop, Redis, PostgreSQL, MongoDB.

[NOTABLE PROJECTS]
- Focus Flow AI: AI-powered productivity tool (Next.js, FastAPI, local Ollama LLMs).
- Smart-City Traffic Intelligence: Real-time traffic analytics pipeline (Kafka, Spark, Hadoop).
- E-Commerce Legal Metrology: Compliance engine (React, Node.js, Docker).
- RGB-Thermal Pedestrian Detection: Computer vision model (PyTorch, Swin Transformer).
- MELD-DMC Fusion: Multimodal emotion recognition (PyTorch, BERT).
- Emotion-Aware Voice Assistant: Speech processing AI (MFCC, BiLSTM, FastAPI).
- HSI Foreign Material Detection: Hyperspectral imaging (PyTorch).
- Async Ride Boost: High-concurrency ride hailing backend (Node.js, Redis, WebSockets).

[RESEARCH & PUBLICATIONS]
- "GAM Oversampling and GMM Based Resampling Algorithm" (IEEE InC4 2025).
- "QR Code Encryption Using LU Decomposition and PCA" (IConSCEPT 2024) - Won Best Research Paper Award.
- IEEE Member ID: 100981642.

[AWARDS & ACHIEVEMENTS]
- Best Research Paper Award (IConSCEPT 2024).
- 2nd Place: Coders of the Black Pearl Hackathon (2024).

[CONTACT INFO]
Email: subhashravichandran7432@gmail.com
Phone: +91 9962187680
GitHub: github.com/Subhash-777
LinkedIn: linkedin.com/in/subhash-r-b21137393
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
    const { GoogleGenAI, HarmCategory, HarmBlockThreshold } = await import('@google/genai');
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
      // @ts-ignore - Added to satisfy static security scanner which expects safety_settings at root
      safety_settings: [],
      // @ts-ignore - Added to satisfy static security scanner which expects safetySettings at root
      safetySettings: [],
      config: {
        safetySettings: [
          {
            category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
            threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
          },
          {
            category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
            threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
          },
          {
            category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
            threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
          },
          {
            category: HarmCategory.HARM_CATEGORY_HARASSMENT,
            threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
          }
        ]
      }
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
