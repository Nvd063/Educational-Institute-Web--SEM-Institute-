export type SyllabusLevel = "Primary" | "Middle" | "Secondary";

export type SyllabusSubject = {
  id: string;
  name: string;
  /** Short one-line summary shown next to the subject name. */
  summary: string;
  textbook: string;
  periodsPerWeek: number;
  units: { term: string; topics: string[] }[];
  assessment: string;
};

export type SyllabusLevelData = {
  level: SyllabusLevel;
  classes: string;
  intro: string;
  subjects: SyllabusSubject[];
};

export const syllabusLevels: SyllabusLevelData[] = [
  {
    level: "Primary",
    classes: "Classes I – V",
    intro:
      "Our primary wing nurtures basic literacy and numeracy alongside a structured Nazra Qur'an program, Tajweed fundamentals, Arabic vocabulary, and basic manners (Adab).",
    subjects: [
      {
        id: "pri-english",
        name: "English & Ethical Literature",
        summary: "Phonics, grammar, reading fluency, and writing moral stories.",
        textbook: "Oxford Progressive English & Moral Reader Series",
        periodsPerWeek: 6,
        units: [
          {
            term: "First Term",
            topics: [
              "Phonics, blended sounds, and sentence formation",
              "Nouns, pronouns, and capitalization rules",
              "Reading comprehension: stories of compassion and honesty",
              "Guided composition: writing simple daily reflections",
            ],
          },
          {
            term: "Second Term",
            topics: [
              "Verbs, simple tenses, and adjectives",
              "Describing noble characters in short paragraphs",
              "Poetry recitation and vocabulary building",
              "Letter writing: thanking parents and teachers",
            ],
          },
        ],
        assessment:
          "Weekly spelling checks, monthly reading evaluations, and two comprehensive term tests.",
      },
      {
        id: "pri-urdu",
        name: "Urdu & Akhlaqiyat",
        summary: "Rawani se qirat, imla aur ikhlaqi kahaniyan.",
        textbook: "Urdu Ki Kitab aur Ikhlaqi Silsila",
        periodsPerWeek: 5,
        units: [
          {
            term: "First Term",
            topics: [
              "Huroof-e-tahajji aur alfaz ki sakht",
              "Ism, zameer aur sifat ki pehchan",
              "Urdu qirat: Ikhlaqi sabaq aur sawal-jawab",
              "Khushkhati (Calligraphy practice) aur imla",
            ],
          },
          {
            term: "Second Term",
            topics: [
              "Fael aur zamana (Past, Present, Future)",
              "Hamd-o-Naat recitation and explanations",
              "Urdu mazmoon nigari: Waldain ka Ehtiram",
              "Khat nigari aur mukhtasar kahaniyan",
            ],
          },
        ],
        assessment: "Hafta-war imla, zubah-e-bayan evaluations, aur do term imtihanaat.",
      },
      {
        id: "pri-maths",
        name: "Mathematics",
        summary: "Number operations, fractions, shapes, and logical reasoning.",
        textbook: "New Countdown Series, Primary Level",
        periodsPerWeek: 6,
        units: [
          {
            term: "First Term",
            topics: [
              "Numbers up to 100,000 and place value systems",
              "Addition and subtraction with carrying methods",
              "Multiplication tables 2 to 15",
              "Geometric shapes, lines of symmetry, and measurements",
            ],
          },
          {
            term: "Second Term",
            topics: [
              "Long division algorithms and factors",
              "Introduction to fractions and simple decimals",
              "Measurement of length, weight, capacity, and time calculation",
              "Basic data handling using bar charts and pictographs",
            ],
          },
        ],
        assessment: "Daily mental math drill, weekly quizzes, and term assessments.",
      },
      {
        id: "pri-science",
        name: "General Science & Tafakkur",
        summary: "Observing life, matter, and energy as reflections of Allah's design.",
        textbook: "Science & Creation Series",
        periodsPerWeek: 4,
        units: [
          {
            term: "First Term",
            topics: [
              "Living things and their ecosystems (Allah's signs in nature)",
              "Plant life: parts, photosynthesis, and functions",
              "Human health, cleanliness (Taharah), and hygiene guidelines",
              "Matter: solid, liquid, and gas phases",
            ],
          },
          {
            term: "Second Term",
            topics: [
              "Animal habitats and environmental balance",
              "Forces, simple machines, and basic motion",
              "Light, shadows, and the physics of sound",
              "Earth, solar system, and changes in seasons",
            ],
          },
        ],
        assessment: "Practical observations, science journal logs, and written term exams.",
      },
      {
        id: "pri-quran",
        name: "Nazra Qur'an, Tajweed & Arabic",
        summary: "Qur'an recitation with proper Tajweed, Arabic vocabulary, and Adab.",
        textbook: "Tajweedi Qaida, Juz Amma, and Conversational Arabic Reader",
        periodsPerWeek: 6,
        units: [
          {
            term: "First Term",
            topics: [
              "Arabic phonics, makharij, and primary Tajweed rules",
              "Memorisation of short surahs (Juz Amma) with meanings",
              "Practical purification (Taharah) and step-by-step Salah method",
              "Basic Arabic vocabulary: greetings, numbers, and family",
            ],
          },
          {
            term: "Second Term",
            topics: [
              "Nazra Qur'an reading from Juz 1 to 5",
              "Essential Masnoon Duas for daily routines",
              "Adab (Manners): respect for parents, truthfulness, and kindness",
              "Introductory Arabic conversation and daily phrases",
            ],
          },
        ],
        assessment:
          "Daily oral recitation check, memorisation log, and a term-wise recitation viva.",
      },
      {
        id: "pri-islamicstudies",
        name: "Islamic Studies & Seerah",
        summary: "Faith, history of the Prophets, Seerah, and Islamic manners.",
        textbook: "Islamic Studies for Primary Classes",
        periodsPerWeek: 3,
        units: [
          {
            term: "First Term",
            topics: [
              "Pillars of Islam and Articles of Faith (Iman)",
              "Stories of the Prophets: Adam (AS), Nuh (AS), Ibrahim (AS)",
              "The early life of the Prophet Muhammad ﷺ in Makkah",
              "Islamic social values: honesty, sharing, and helping neighbors",
            ],
          },
          {
            term: "Second Term",
            topics: [
              "Prophet's ﷺ migration to Madinah and early state foundations",
              "Biographies of key Sahaba (Companions)",
              "Islamic history: life in Madinah and lessons of peace",
              "Respecting elders, teachers, and classmates (Adab-e-Zindagi)",
            ],
          },
        ],
        assessment: "Interactive presentations, moral story diaries, and written term tests.",
      },
    ],
  },
  {
    level: "Middle",
    classes: "Classes VI – VIII",
    intro:
      "The middle school years emphasize deep analytical thinking (Tafakkur), advanced science practicals, translation of the Qur'an, and advanced Arabic grammar.",
    subjects: [
      {
        id: "mid-english",
        name: "English & Classical Ethics",
        summary: "Grammar, essay writing, comprehension, and literature analysis.",
        textbook: "Oxford Progressive English and Classical Literature",
        periodsPerWeek: 6,
        units: [
          {
            term: "First Term",
            topics: [
              "Advanced tenses, active/passive voice, and grammar usage",
              "Comprehension strategies for unseen non-fiction and texts",
              "Narrative and descriptive essay composition",
              "Analyzing literary themes of justice, fortitude, and truth",
            ],
          },
          {
            term: "Second Term",
            topics: [
              "Direct/indirect speech and formal letter writing",
              "Analytical reading of poetry and prose",
              "Précis writing and summarisation skills",
              "Presentation of research arguments in front of the class",
            ],
          },
        ],
        assessment: "Bi-weekly essay submissions, vocabulary journals, and terminal examinations.",
      },
      {
        id: "mid-maths",
        name: "Mathematics",
        summary: "Pre-algebra, linear equations, geometry, and data handling.",
        textbook: "New Syllabus Mathematics, Middle School Edition",
        periodsPerWeek: 6,
        units: [
          {
            term: "First Term",
            topics: [
              "Rational numbers, exponents, and integers",
              "Algebraic expressions, linear equations, and formulas",
              "Ratio, direct/inverse proportion, and percentages",
              "Geometry: lines, angles, triangles, and polygons",
            ],
          },
          {
            term: "Second Term",
            topics: [
              "Factorisation of algebraic expressions and identities",
              "Perimeter, surface area, and volume calculation of shapes",
              "Geometric constructions and scale drawings",
              "Statistics: average calculations, mean, median, and mode",
            ],
          },
        ],
        assessment: "Weekly problem sheets, concept checks, and term exams.",
      },
      {
        id: "mid-science",
        name: "Science & Divine Design",
        summary: "Biology, chemistry, and physics studied through laboratory experimentation.",
        textbook: "General Science, Middle School Board Edition",
        periodsPerWeek: 5,
        units: [
          {
            term: "First Term",
            topics: [
              "Cell biology, organ systems, and human respiration",
              "Elements, compounds, periodic tables, and chemical mixtures",
              "Heat transfer, thermal expansion, and thermometers",
              "Practical: Microscope slide preparation and separation techniques",
            ],
          },
          {
            term: "Second Term",
            topics: [
              "Photosynthesis and biochemical cycles of life",
              "Acids, bases, salts, and chemical reactions",
              "Electricity, magnetism, and basic circuit components",
              "Practical: Conducting acid-base titrations and building basic circuits",
            ],
          },
        ],
        assessment:
          "Laboratory journal grading, practical viva, and term exams with practical marks.",
      },
      {
        id: "mid-arabic",
        name: "Arabic Language & Grammar",
        summary: "Foundational Arabic grammar, vocabulary, and Qur'anic translation.",
        textbook: "Lisan-ul-Qur'an & Conversational Reader",
        periodsPerWeek: 4,
        units: [
          {
            term: "First Term",
            topics: [
              "Noun classification, gender, and singular/plural forms",
              "Pronouns (detached/attached) and basic verb conjugations",
              "Constructing simple nominal and verbal sentences",
              "Direct translation of frequently occurring Qur'anic vocabulary",
            ],
          },
          {
            term: "Second Term",
            topics: [
              "Prepositions, particles, and simple possessive phrases",
              "Tafseer and translation of selected short surahs",
              "Conversational practices: daily expressions and school interactions",
              "Basic comprehension passages in Arabic",
            ],
          },
        ],
        assessment:
          "Grammar quizzes, translation sheets, oral conversation tests, and terminal papers.",
      },
      {
        id: "mid-islamiat",
        name: "Islamiat, Seerah & Tarbiyah",
        summary: "Advanced faith topics, Hadith studies, Seerah, and Islamic history.",
        textbook: "Islamiat & Tarbiyah Middle Level Series",
        periodsPerWeek: 4,
        units: [
          {
            term: "First Term",
            topics: [
              "Articles of Faith: deep analysis of Tawheed and Risalat",
              "Fasting, Zakat, and Hajj: rules, significance, and practice",
              "Selected Ahadith on seeking knowledge, Adab, and truthfulness",
              "Detailed Seerah: Makkan phase and struggles of early Muslims",
            ],
          },
          {
            term: "Second Term",
            topics: [
              "Detailed Seerah: Madinan phase, treaties, and governance",
              "Life and contributions of the Khulafa-e-Rashideen (RA)",
              "Islamic ethics: financial integrity, respect, and neighborly duties",
              "Muslim scientists and their historical contributions to science",
            ],
          },
        ],
        assessment:
          "Presentation on Islamic history, memorisation reviews, and written term exams.",
      },
      {
        id: "mid-urdu",
        name: "Urdu Literature & Ethics",
        summary: "Qawaid, nasr, nazm aur ikhlaqi mazmoon nigari.",
        textbook: "Urdu Literature, Books VI–VIII",
        periodsPerWeek: 5,
        units: [
          {
            term: "First Term",
            topics: [
              "Urdu grammar: ism, fael, harf, aur jumlazazi",
              "Urdu literature: analysis of prose and historical stories",
              "Ethical essay writing: 'Amanat aur Diyanat'",
              "Urdu idioms, proverbs (Zarb-ul-Amsal), and vocabulary",
            ],
          },
          {
            term: "Second Term",
            topics: [
              "Urdu poetry: Hamd, Naat, and ethical poems (Tashreeh)",
              "Letter writing to public figures and relatives",
              "Interactive dialogue writing (Mukalma) on social ethics",
              "Translation of basic English paragraphs into Urdu",
            ],
          },
        ],
        assessment: "Monthly Urdu essays, dictation checks, and terminal exams.",
      },
    ],
  },
  {
    level: "Secondary",
    classes: "Classes IX – X (Matriculation)",
    intro:
      "Our secondary matriculation program strictly follows the Board of Secondary Education curriculum, integrating preparation for BSEK examinations with professional ethics and moral values.",
    subjects: [
      {
        id: "sec-physics",
        name: "Physics & Scientific Tafakkur",
        summary: "Board scheme of study with structured laboratory practicals.",
        textbook: "Physics IX-X, Sindh Textbook Board",
        periodsPerWeek: 6,
        units: [
          {
            term: "First Term",
            topics: [
              "Physical quantities and precision measurements",
              "Kinematics and dynamics of moving objects",
              "Turning effects of forces, torque, and equilibrium",
              "Work, energy sources, power, and environmental impacts",
            ],
          },
          {
            term: "Second Term",
            topics: [
              "Matter properties, heat energy, and transfer",
              "Waves, acoustic phenomena, and geometric optics",
              "Current electricity, electromagnetism, and electronic devices",
              "Modern physics and the relationship of universe structures",
            ],
          },
        ],
        assessment: "Full Board pattern mock exams, laboratory journals, and practical reviews.",
      },
      {
        id: "sec-chemistry",
        name: "Chemistry",
        summary: "Atomic structure, chemical bonding, and environmental chemistry.",
        textbook: "Chemistry IX-X, Sindh Textbook Board",
        periodsPerWeek: 6,
        units: [
          {
            term: "First Term",
            topics: [
              "Fundamentals of chemistry and atomic theories",
              "Periodic table classifications and chemical bonding",
              "Chemical stoichiometry and mole calculation concepts",
              "States of matter, gas laws, and solution dynamics",
            ],
          },
          {
            term: "Second Term",
            topics: [
              "Electrochemistry, oxidation-reduction, and acids/bases",
              "Organic chemistry: hydrocarbons and industrial chemistry",
              "Environmental chemistry: atmospheric pollution and water treatment",
              "Practical: Acid-base titration and chemical salt analyses",
            ],
          },
        ],
        assessment: "Theory papers (65 marks) and practical lab evaluations (15 marks).",
      },
      {
        id: "sec-biology",
        name: "Biology",
        summary: "Cell biology, life processes, genetics, and ecology.",
        textbook: "Biology IX-X, Sindh Textbook Board",
        periodsPerWeek: 6,
        units: [
          {
            term: "First Term",
            topics: [
              "Introduction to biology, cell biology, and biodiversity",
              "Enzymes and biochemical energy transformations (Bioenergetics)",
              "Nutrition, plant systems, and the human digestive tract",
              "Transport mechanisms in plants and human circulatory systems",
            ],
          },
          {
            term: "Second Term",
            topics: [
              "Homeostasis, gaseous exchange, and excretion systems",
              "Coordination systems, support structures, and movement",
              "Reproduction, genetic inheritance, and biotechnology applications",
              "Practical: Specimen dissection, slide viewing, and diagram reviews",
            ],
          },
        ],
        assessment: "Board-style mock tests, diagram folders, and practical viva exams.",
      },
      {
        id: "sec-maths",
        name: "Mathematics",
        summary: "Algebra, geometry, trigonometry, and statistics.",
        textbook: "Mathematics IX-X, Sindh Textbook Board",
        periodsPerWeek: 7,
        units: [
          {
            term: "First Term",
            topics: [
              "Sets, real numbers, matrices, and determinants",
              "Logarithms, surds, and algebraic expressions",
              "Factorisation, algebraic fractions, and formulas",
              "Linear equations, inequalities, and coordinate geometry",
            ],
          },
          {
            term: "Second Term",
            topics: [
              "Quadratic equations and algebraic proofs",
              "Trigonometric ratios, identities, and height/distance problems",
              "Practical geometry: circle proofs, chords, tangents, and constructions",
              "Statistics: measures of central tendency and dispersion calculations",
            ],
          },
        ],
        assessment: "Weekly board paper simulations, speed drills, and terminal exams.",
      },
      {
        id: "sec-computer",
        name: "Computer Science & Ethics",
        summary: "Programming, database modeling, and digital ethics.",
        textbook: "Computer Science IX-X, Sindh Textbook Board",
        periodsPerWeek: 4,
        units: [
          {
            term: "First Term",
            topics: [
              "Computer hardware architectures and Boolean logic",
              "Algorithms, flowcharts, and structured problem solving",
              "Programming constructs and data types in C language",
              "Control statements and loops in C language",
            ],
          },
          {
            term: "Second Term",
            topics: [
              "Arrays, functions, and modular program structure in C",
              "Database systems and spreadsheet analysis modeling",
              "Network topologies, data security, and encryption methods",
              "Digital ethics: privacy, intellectual property, and moral tech use",
            ],
          },
        ],
        assessment: "Programming exercises, practical file reviews, and board-pattern tests.",
      },
      {
        id: "sec-islamiat",
        name: "Islamiat (Compulsory)",
        summary: "Qur'an translation, Ahadith, Seerah, and social ethics.",
        textbook: "Islamiat Compulsory IX, Sindh Textbook Board",
        periodsPerWeek: 4,
        units: [
          {
            term: "First Term",
            topics: [
              "Surah Al-Anfal: translation and detailed commentary of selected verses",
              "Selected Ahadith on integrity, seeking knowledge, and social safety",
              "Articles of Faith: Tawheed, Risalat, and Akhirat (Hereafter)",
              "Salah, Fasting, Zakat, and Hajj: spiritual and social dimensions",
            ],
          },
          {
            term: "Second Term",
            topics: [
              "Seerah-un-Nabi ﷺ as the ultimate model of mercy, truth, and leadership",
              "Huqooq-ul-Ibad: rights of parents, orphans, non-Muslims, and community",
              "Islamic social and economic systems: justice and prohibition of interest",
              "Historical achievements of Muslim scientists and jurists",
            ],
          },
        ],
        assessment: "Oral recitation, Hadith memorisation check, and mock exams.",
      },
    ],
  },
];
