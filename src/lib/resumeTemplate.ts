// src/lib/resumeTemplate.ts
// Full Resume.tex as a template string with {{PLACEHOLDER}} slots
// Reference: Resume.tex (Sourabh Bajaj style, one page, ATS-optimised)

export const RESUME_TEMPLATE = `%-------------------------
% Resume in Sourabh Bajaj style (one page, ATS-optimised)
% Adapted for Subhash R
%-------------------------

\\documentclass[letterpaper,10.5pt]{article}

\\usepackage{latexsym}
\\usepackage[empty]{fullpage}
\\usepackage{titlesec}
\\usepackage{marvosym}
\\usepackage[usenames,dvipsnames]{color}
\\usepackage{verbatim}
\\usepackage{enumitem}
\\usepackage[hidelinks]{hyperref}
\\usepackage{fancyhdr}
\\usepackage[english]{babel}
\\usepackage{tabularx}
\\usepackage{fontawesome5}
\\usepackage{geometry}

\\geometry{top=0.45in, bottom=0.45in, left=0.50in, right=0.50in}

\\pagestyle{fancy}
\\fancyhf{}
\\fancyfoot{}
\\renewcommand{\\headrulewidth}{0pt}
\\renewcommand{\\footrulewidth}{0pt}

\\urlstyle{same}
\\raggedbottom
\\raggedright
\\setlength{\\tabcolsep}{0in}

% Sections formatting — small caps + rule, matching screenshot
\\titleformat{\\section}{
  \\vspace{-5pt}\\scshape\\raggedright\\large
}{}{0em}{}[\\color{black}\\titlerule \\vspace{-4pt}]

% ---- Custom commands ------------------------------------------------

\\newcommand{\\resumeItem}[1]{
  \\item\\small{#1 \\vspace{-2pt}}
}

\\newcommand{\\resumeSubheading}[4]{
  \\vspace{-2pt}\\item
    \\begin{tabular*}{\\textwidth}[t]{l@{\\extracolsep{\\fill}}r}
      \\textbf{#1} & #2 \\\\
      \\textit{\\small#3} & \\textit{\\small #4} \\\\
    \\end{tabular*}\\vspace{-6pt}
}

\\newcommand{\\resumeProjectHeading}[2]{
  \\vspace{-2pt}\\item
    \\begin{tabular*}{\\textwidth}[t]{l@{\\extracolsep{\\fill}}r}
      \\small#1 & \\textit{\\small #2} \\\\
    \\end{tabular*}\\vspace{-6pt}
}

\\newcommand{\\resumeSubItem}[2]{\\resumeItem{\\textbf{#1:} #2}\\vspace{-3pt}}

\\newcommand{\\resumeSubHeadingListStart}{\\begin{itemize}[leftmargin=0.10in, label={}]}
\\newcommand{\\resumeSubHeadingListEnd}{\\end{itemize}}
\\newcommand{\\resumeItemListStart}{\\begin{itemize}[leftmargin=0.15in]\\vspace{-1pt}}
\\newcommand{\\resumeItemListEnd}{\\end{itemize}\\vspace{-4pt}}

% ---- Document -------------------------------------------------------
\\begin{document}

% ====== HEADER ======================================================
\\begin{tabular*}{\\textwidth}{l@{\\extracolsep{\\fill}}r}
  \\textbf{\\Large Subhash R} & Email : \\href{mailto:subhashravichandran7432@gmail.com}{subhashravichandran7432@gmail.com} \\\\
  \\href{https://subhash-777.github.io/}{subhash-777.github.io}
  \\quad \\href{https://github.com/Subhash-777}{github.com/Subhash-777} &
  Mobile : +91 9962187680 \\\\
  \\href{https://www.linkedin.com/in/subhash-r-b21137393/}{linkedin.com/in/subhash-r}
  \\quad \\href{https://leetcode.com/Subhash-777/}{leetcode.com/Subhash-777} &
  Chennai, Tamil Nadu, India \\\\
\\end{tabular*}
\\vspace{-2pt}

% ── ONE-LINE TITLE ──────────────────────────────────────────────────
\\begin{center}
  \\small\\textit{{{ROLE_TITLE_LINE}}}
\\end{center}
\\vspace{-10pt}

% ====== EDUCATION ===================================================
\\section{Education}
\\resumeSubHeadingListStart
  \\resumeSubheading
    {Amrita Vishwa Vidyapeetham}{Chennai, India}
    {B.Tech in Computer Science and Engineering (AI) \\quad GPA: 7.43\\,/\\,10}{Aug. 2023 -- May 2027}
  \\resumeItemListStart
    \\resumeItem{Relevant Coursework: Data Structures \\& Algorithms, DBMS, Operating Systems, Computer Networks, Machine Learning}
  \\resumeItemListEnd
\\resumeSubHeadingListEnd

% ====== TECHNICAL SKILLS ============================================
\\section{Technical Skills}
\\resumeSubHeadingListStart
  \\item\\small{
    \\textbf{Languages:} Python, JavaScript, TypeScript, Java, SQL, C++ \\\\
    \\textbf{Frontend:} React.js, Next.js, React Native, Vite, Tailwind CSS, Responsive UI Design \\\\
    \\textbf{Backend:} Node.js, Express.js, FastAPI, REST APIs, WebSockets, JWT Authentication, OAuth 2.0 \\\\
    \\textbf{Databases:} PostgreSQL, MongoDB, MySQL, Redis \\\\
    \\textbf{DevOps \\& Cloud:} Docker, Git, GitHub Actions, CI/CD, AWS (S3, EC2), Linux \\\\
    \\textbf{Data \\& Streaming:} Apache Kafka, Apache Spark, Hadoop, HDFS, Real-Time Analytics \\\\
    \\textbf{AI \\& LLM:} Ollama, LangChain, OpenAI API, OCR, Prompt Engineering
  }
\\resumeSubHeadingListEnd

% ====== PROJECTS ====================================================
\\section{Projects}
\\resumeSubHeadingListStart

{{PROJECTS_CONTENT}}

\\resumeSubHeadingListEnd

% ====== PUBLICATIONS ================================================
\\section{Publications \\textnormal{\\small(C = Conference)}}
\\vspace{2pt}
\\small{
\\begin{itemize}[leftmargin=0.18in, itemsep=1pt]
  \\item[\\textbf{[C.1]}]
    Subhash R. (2024). \\textbf{QR Code Encryption Using LU Decomposition and PCA.}
    \\textit{IConSCEPT 2024}, IEEE. \\textbf{Best Research Paper Award.}
    \\href{https://doi.org/10.1109/IConSCEPT61884.2024.10627798}{DOI: 10.1109/IConSCEPT61884.2024.10627798}

  \\item[\\textbf{[C.2]}]
    Subhash R. (2025). \\textbf{GAM Oversampling and GMM-Based Resampling for Imbalanced Credit Data Classification.}
    \\textit{IEEE InC 2025.}
    \\href{https://doi.org/10.1109/InC465408.2025.11256257}{DOI: 10.1109/InC465408.2025.11256257}
\\end{itemize}
}
\\vspace{-4pt}

% ====== ACHIEVEMENTS ================================================
\\section{Achievements}

\\resumeSubHeadingListStart

  \\resumeProjectHeading
    {\\textbf{Best Research Paper Award} $|$ \\emph{IConSCEPT 2024, IEEE International Conference, NIT-PY, India}}{2024}
    \\resumeItemListStart
      \\resumeItem{Recognized for original cryptographic research among 200+ submitted papers across IEEE signal processing tracks.}
    \\resumeItemListEnd

  \\resumeProjectHeading
    {\\textbf{2nd Place — Coders of the Black Pearl} $|$ \\emph{Neuroinx Club (Karur Vysya Bank), Amrita Vishwa Vidyapeetham}}{2024}
    \\resumeItemListStart
      \\resumeItem{Secured 2nd place among 80+ participants demonstrating algorithmic problem-solving under competitive time constraints.}
    \\resumeItemListEnd

  \\resumeProjectHeading
    {\\textbf{Top 4 Finalist — Shaastra Robosoccer} $|$ \\emph{Shaastra 2025, IIT Madras}}{Jan 2025}
    \\resumeItemListStart
      \\resumeItem{Placed among the top 4 of 100+ national university teams; built autonomous navigation and real-time object-tracking systems.}
    \\resumeItemListEnd

\\resumeSubHeadingListEnd

% ====== CERTIFICATIONS & MEMBERSHIPS ================================
\\section{Certifications \\& Memberships}
\\resumeSubHeadingListStart
\\item\\small{
\\textbf{ML, Data Science \\& AI Engineering with Python} --- Udemy  \\hfill
\\textbf{TensorFlow Deep Learning Bootcamp} --- Udemy  \\\\

\\textbf{Machine Learning Certification} --- Corizo (Jul 2024) \\hfill
\\textbf{Other Certifications} --- \\href{https://drive.google.com/drive/folders/1bT21k_daffiNjxOZ8LUu7qmINlcJuSgU?usp=drive_link}{View Credentials} \\\\

\\textbf{IEEE Member}, ID: 100981642 (Jan 2025 -- Present)
}
\\resumeSubHeadingListEnd

\\end{document}
`;
