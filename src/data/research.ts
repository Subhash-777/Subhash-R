// src/data/research.ts
export interface ResearchPaper {
  id: string;
  title: string;
  authors: string[];
  conference: string;
  conferenceFull: string;
  location: string;
  dates: string;
  doi: string;
  doiUrl: string;
  dateAddedIEEE?: string;
  abstract: string;
  keywords: string[];
  award?: string;
  certificateUrl?: string;
  pdfUrl?: string;
  year: number | string;
}

export const PAPERS: ResearchPaper[] = [
  {
    id: 'gam-gmm',
    title: 'GAM Oversampling and GMM Based Resampling Algorithm for Classification of Imbalanced Sensitive Credit Data Sets',
    authors: ['M Rithani', 'R Subhash', 'R S SyamDev'],
    conference: 'IEEE InC4 2025',
    conferenceFull: 'IEEE International Conference on Contemporary Computing and Communications (InC4)',
    location: 'Bangalore, India',
    dates: '14–15 March 2025',
    doi: '10.1109/InC465408.2025.11256257',
    doiUrl: 'https://doi.org/10.1109/InC465408.2025.11256257',
    dateAddedIEEE: '01 December 2025',
    year: 2025,
    abstract: `Class imbalance remains a significant challenge in many datasets, whereby one class has considerably fewer samples than another, making it difficult to analyze and conduct research based on that dataset. It deals with resampling methodologies, especially oversampling and undersampling techniques, which are used to even out the class labels for imbalanced datasets.

In particular, we introduce a new hybrid resampling technique based on Generative Adversarial Model Oversampling (GAMO) and Gaussian Mixture Model (GMM)-based grouping. The hybrid method is tested against standard approaches like SMOTE. Improves representativeness and robustness of numerical datasets for deep learning.

This method gives not just higher accuracy in resampling data but also accounts for the protection of sensitive data, leaving vulnerabilities that are usually found in conventional methods.

In this work, we demonstrate experimentally that our GAMOGMM hybrid approach can improve the representativeness and robustness of numerical datasets, which in turn strengthens the performance of deep learning models in impactful applications.`,
    keywords: ['Class Imbalance', 'GAN', 'GMM', 'SMOTE', 'Oversampling', 'Credit Data', 'Deep Learning'],
    pdfUrl: 'https://ieeexplore.ieee.org/document/11256257',
  },
  {
    id: 'qr-encryption',
    title: 'QR Code Encryption Using LU Decomposition and PCA',
    authors: ['Subhash R', 'Sushma Chowdary', 'Sanjiev A', 'Rohit Mugalya A R', 'Lakshmi Jayanth Reddy', 'Reena Rao'],
    conference: 'IConSCEPT 2024',
    conferenceFull: 'International Conference on Signal Processing, Computation, Electronics, Power and Telecommunication',
    location: 'Karaikal, India',
    dates: '04–05 July 2024',
    doi: '10.1109/IConSCEPT61884.2024.10627798',
    doiUrl: 'https://doi.org/10.1109/IConSCEPT61884.2024.10627798',
    year: 2024,
    award: 'Best Research Paper Award',
    certificateUrl: 'https://drive.google.com/file/d/1-OPmGrFhEf9vmgMvNTZY_WNVtH7FTZ0w/view?usp=sharing',
    abstract: `This paper presents a novel approach to QR code security using LU Decomposition and Principal Component Analysis (PCA) for encryption and secure data embedding. The proposed method leverages the mathematical properties of LU decomposition to create a robust encryption scheme that maintains the visual integrity of QR codes while ensuring data confidentiality.

The approach combines LU decomposition for matrix-based encryption with PCA for dimensionality reduction and feature extraction, creating a multi-layered security mechanism. The encrypted QR codes remain scannable while containing securely encoded information.

Experimental results demonstrate high encryption strength with minimal visual degradation, making this approach suitable for secure document verification, authentication systems, and sensitive data transmission in IoT environments.`,
    keywords: ['QR Code', 'LU Decomposition', 'PCA', 'Encryption', 'Security', 'Signal Processing'],
    pdfUrl: 'https://ieeexplore.ieee.org/document/10627798',
  },
];
