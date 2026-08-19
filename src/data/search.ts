export interface SearchItem {
  title: string;
  description: string;
  url: string;
  keywords: string[];
  category: string;
}

export const searchDataset: SearchItem[] = [
  {
    title: "Admissions",
    description:
      "Learn about the Tarbiyah and academic enrollment guidelines, age criteria, and simple steps to apply.",
    url: "/admissions",
    keywords: [
      "admission",
      "apply",
      "register",
      "class",
      "form",
      "age limit",
      "criteria",
      "fees",
      "tarbiyah",
      "enrolment",
    ],
    category: "Information",
  },
  {
    title: "Evaluations & Results",
    description: "Search student results and board performance by roll number.",
    url: "/results",
    keywords: [
      "result",
      "exam",
      "board",
      "matric",
      "marks",
      "position",
      "evaluation",
      "pass",
      "report card",
    ],
    category: "Academics",
  },
  {
    title: "Syllabus & Tarbiyah Curriculum",
    description:
      "Subject outlines, Tajweed, Qur'an reading, Arabic, and core sciences from Play Group to Matriculation.",
    url: "/syllabus",
    keywords: [
      "syllabus",
      "curriculum",
      "course",
      "subject",
      "study",
      "class",
      "matric",
      "primary",
      "quran",
      "tajweed",
      "arabic",
      "seerah",
    ],
    category: "Academics",
  },
  {
    title: "Class Calendar & Prayer Schedule",
    description:
      "Daily timings, prayer schedule, vacation details, and parent-teacher meeting calendar.",
    url: "/schedule",
    keywords: [
      "schedule",
      "timing",
      "calendar",
      "timetable",
      "holiday",
      "prayer",
      "namaz",
      "vacation",
      "hours",
    ],
    category: "Academics",
  },
  {
    title: "School Policies",
    description:
      "Ethical code of conduct, dress code guidelines, and campus safeguarding policies.",
    url: "/policies",
    keywords: [
      "policy",
      "rules",
      "uniform",
      "conduct",
      "discipline",
      "fees",
      "adab",
      "ethics",
      "attendance",
    ],
    category: "Information",
  },
  {
    title: "Campus Gallery",
    description:
      "Photographs of learning, Qirat assemblies, scientific practicals, and library facilities.",
    url: "/gallery",
    keywords: [
      "gallery",
      "photo",
      "image",
      "picture",
      "campus",
      "event",
      "qirat",
      "calligraphy",
      "lab",
    ],
    category: "Media",
  },
  {
    title: "Contact Us",
    description:
      "Find office hours, campus map directions, official email, and WhatsApp connection details.",
    url: "/contact",
    keywords: ["contact", "phone", "email", "address", "map", "whatsapp", "location", "office"],
    category: "Support",
  },
  {
    title: "Mission & Vision",
    description:
      "Our Tarbiyah objectives, spiritual goals, and core Islamic values (Ilm, Adab, Amanah).",
    url: "/mission-vision",
    keywords: [
      "mission",
      "vision",
      "values",
      "goals",
      "aims",
      "ethics",
      "character",
      "tarbiyah",
      "akhlaq",
    ],
    category: "About",
  },
  {
    title: "Honours & Achievements",
    description: "Provincial Qirat trophies, Board ranks, and Sadaqah community service records.",
    url: "/achievements",
    keywords: [
      "achievement",
      "award",
      "trophy",
      "success",
      "winner",
      "position",
      "quran",
      "qirat",
      "matric",
    ],
    category: "About",
  },
  {
    title: "About Our School",
    description:
      "Our history since 2009, founding principle of beneficial knowledge, and campus leadership.",
    url: "/about",
    keywords: ["about", "history", "founder", "leadership", "tarbiyah", "school", "board"],
    category: "About",
  },
];
