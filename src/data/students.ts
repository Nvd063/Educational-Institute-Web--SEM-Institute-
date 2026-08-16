export type StudentActivity = {
  title: string;
  body: string;
  meta: string;
};

export const learningExperience = [
  {
    title: "Assembly, Recitation & Morning Dhikr",
    body: "The day begins in the courtyard with congregation, Qur'anic recitation, and a brief morning Dhikr. The early periods are dedicated to foundational sciences, core mathematics, and languages.",
  },
  {
    title: "Tafakkur & Practical Observation",
    body: "Science and technology periods emphasize hands-on work. Students observe natural phenomena, recording observations in their practical journals as a reflection of Allah's design.",
  },
  {
    title: "Collaborative Circles (Ukhuwwah)",
    body: "Project groups rotate student roles (recorder, checker, presenter) to develop cooperative skills, empathy, and leadership in line with Islamic teamwork.",
  },
  {
    title: "Weekly Reflection (Muhasabah)",
    body: "Every Friday, students spend the final period reflecting on their academic progress, personal conduct (Akhlaq), and targets for the next week, keeping a weekly journal.",
  },
];

export const academicActivities: StudentActivity[] = [
  {
    title: "Tajweed & Qirat Circles",
    body: "Interactive small-group sessions focused on correct pronunciation (Makharij), rules of Tajweed, and beautiful recitation of the Qur'an.",
    meta: "Daily",
  },
  {
    title: "Seerah Research Projects",
    body: "Students investigate and present chapters from the life of the Prophet ﷺ, discovering practical lessons for modern character development.",
    meta: "Once a term",
  },
  {
    title: "Calligraphy & Islamic Arts",
    body: "Calligraphy workshops teaching traditional Arabic scripts (Naskh/Thuluth) along with moral poster designs that decorate our corridors.",
    meta: "Weekly",
  },
  {
    title: "Husn-e-Bayan Competitions",
    body: "Spoken declamations and debates in both Urdu and English, evaluating students on ethical argumentation and speaking etiquettes.",
    meta: "Seasonal",
  },
  {
    title: "Primary Reading Mentorship",
    body: "Senior students spend weekly sessions guiding younger buddies in reading fluency, cultivating patience (Sabr) and Ukhuwwah.",
    meta: "Weekly",
  },
  {
    title: "Tarbiyah Clinics",
    body: "Interactive discussions exploring Islamic manners (Adab), digital ethics, peer responsibilities, and civic duties.",
    meta: "Fortnightly",
  },
];

export const extracurricular: StudentActivity[] = [
  {
    title: "Qirat & Naat Society",
    body: "Rehearsal and practice circles preparing students for local, provincial, and national competitions.",
    meta: "Society",
  },
  {
    title: "Sportsmanship Clubs",
    body: "Cricket and football tournaments prioritizing team discipline, physical health, and respectful, fair-play ethics.",
    meta: "Sports",
  },
  {
    title: "Arabic Language Circle",
    body: "Conversational Arabic practices and vocabulary development to build closer connection to Qur'anic literature.",
    meta: "Language",
  },
  {
    title: "Science & Creation Club",
    body: "Exploring biology and technology through interactive experiments, exploring the relationship between science and faith.",
    meta: "Club",
  },
  {
    title: "House System (Tarbiyah Table)",
    body: "Four school houses compete on a balanced scale measuring academic effort, prayer consistency, uniform, and help to peers.",
    meta: "Student Body",
  },
  {
    title: "Social Welfare & Sadaqah Group",
    body: "Student-run initiatives organizing neighborhood cleaning, seasonal clothing distribution, and annual Ramadan ration packaging.",
    meta: "Service",
  },
];

export const developmentSkills = [
  {
    title: "Manners & Character (Adab & Akhlaq)",
    body: "Nurturing respect for teachers, kindness to peers, honesty in work, and speech clarity.",
  },
  {
    title: "Trusteeship (Amanah)",
    body: "Taking genuine responsibility for duties, peer safety, and school environment as trust custodians.",
  },
  {
    title: "Empathy & Ukhuwwah",
    body: "Developing mutual care through shared tasks, tutoring junior students, and collaborative house activities.",
  },
  {
    title: "Critical Thinking (Tafakkur)",
    body: "Learning to reflect on complex problems, scientific proofs, and texts with logic and faith.",
  },
  {
    title: "Confidence & Articulation",
    body: "Acquiring robust presentation skills through regular assembly talks, debate participation, and project days.",
  },
  {
    title: "Ethical Readiness",
    body: "Preparing senior students for future career streams with a strong core of professional and personal ethics.",
  },
];

export const studentEvents = [
  {
    name: "Annual Seerah & Science Exhibition",
    when: "February",
    body: "Students present scientific models alongside historical maps of the Prophet's ﷺ life and scientific contributions of classical scholars.",
  },
  {
    name: "Islamic Arts & Calligraphy Day",
    when: "End of Term 1",
    body: "Exhibition displaying student calligraphy, paintings, and creative designs to visiting parents.",
  },
  {
    name: "Inter-House Sportsmanship Week",
    when: "December",
    body: "A week of active cricket, football, and athletic events emphasizing health, fair play, and house unity.",
  },
  {
    name: "Husn-e-Bayan Debating Festival",
    when: "October",
    body: "Urdu and English declamations, spelling contests, and a quiz competition covering general and Islamic history.",
  },
  {
    name: "Rabi-ul-Awwal Seerah Program",
    when: "Rabi-ul-Awwal",
    body: "Qirat, Naat recitations, and ethical speeches organized entirely by the student body.",
  },
  {
    name: "Annual Prize & Tarbiyah Awards",
    when: "April",
    body: "Awarding academic position holders alongside honors for exemplary character, Quranic recitation, and attendance.",
  },
];

export type TimelineMilestone = {
  id: string;
  stage: string;
  title: string;
  summary: string;
  detail: string;
  outcomes: string[];
};

export const studentJourney: TimelineMilestone[] = [
  {
    id: "orientation",
    stage: "Week 1",
    title: "Welcome and Orientation to Adab",
    summary: "Campus tour, house allocation, and introduction to assembly and prayer routines.",
    detail:
      "New students spend their first week understanding the academic calendar, the assembly protocols, and behavioral values. Each student is placed in one of our four houses and paired with a senior mentor.",
    outcomes: ["House allocation", "Senior mentor pairing", "Introduction to daily prayers & Adab"],
  },
  {
    id: "first-project",
    stage: "Term 1",
    title: "Character & Seerah Project",
    summary: "A group project exploring a specific ethical virtue from the life of the Prophet ﷺ.",
    detail:
      "Students complete a collaborative presentation tracing a core character trait (e.g. honesty, kindness) from the Seerah. Marks are awarded for research, cooperative work, and presentation clarity.",
    outcomes: [
      "Empathy-based team roles",
      "Written Seerah portfolio",
      "First assembly presentation",
    ],
  },
  {
    id: "competition",
    stage: "Year 1–2",
    title: "Qirat & Naat Competitions",
    summary: "Entering in public Qirat, Naat, or debating events to build confidence.",
    detail:
      "Students prepare for inter-house or inter-school platforms through weekly society sessions, receiving personalized coaching in Tajweed, vocal training, or speech delivery.",
    outcomes: ["Coached preparation", "Confidence in public presentation", "Spiritual expression"],
  },
  {
    id: "workshop",
    stage: "Middle Section",
    title: "Ethical Leadership & Digital Literacy",
    summary: "Workshops on internet safety, coding, and the ethics of digital citizenship.",
    detail:
      "Held fortnightly, these practical sessions teach critical digital skills—including software programming and document formatting—while discussing rules of moral responsibility online.",
    outcomes: ["Digital design portfolio", "Coding basics", "Digital ethics certificate"],
  },
  {
    id: "career",
    stage: "Class IX–X",
    title: "Matriculation Prep & Career Ethics",
    summary:
      "Board exam strategy combined with seminars on ethical professions and college routes.",
    detail:
      "Students meet counseling mentors to map science/general choices. Returning alumni share intermediate college experiences, and interactive mock interviews prepare students for admission requirements.",
    outcomes: [
      "Subject selection counseling",
      "Alumni career talks",
      "Ethical professional guidelines",
    ],
  },
  {
    id: "graduation",
    stage: "Matriculation",
    title: "Graduation & Commission",
    summary: "Board examinations, final results ceremony, and induction into the alumni network.",
    detail:
      "The journey concludes with the Karachi Board Matric examinations. The final result assembly celebrates academic high-achievers and student characters. Graduates join the registry to guide future generations.",
    outcomes: [
      "Board examination certification",
      "Tarbiyah and academic honors",
      "Alumni registry entry",
    ],
  },
];
