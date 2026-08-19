export type AchievementCategory =
  "Academic" | "Competitions" | "Research" | "Sports" | "Leadership" | "Community";

export type Achievement = {
  id: string;
  title: string;
  category: AchievementCategory;
  year: number;
  person: string;
  description: string;
  /** Optional highlight metric shown on the card. */
  metric?: string;
  featured?: boolean;
};

export const achievementCategories: AchievementCategory[] = [
  "Academic",
  "Competitions",
  "Research",
  "Sports",
  "Leadership",
  "Community",
];

export const achievements: Achievement[] = [
  {
    id: "ach-2025-board",
    title: "Board Position in Matriculation Science",
    category: "Academic",
    year: 2025,
    person: "Ayesha Siddiqui, Class X-A",
    description:
      "Secured a top Karachi Board merit position in the Science group with distinctions in Physics, Chemistry, Mathematics, and Islamic Studies.",
    metric: "94.8%",
    featured: true,
  },
  {
    id: "ach-2025-qirat",
    title: "First Place, Provincial Husn-e-Qirat Contest",
    category: "Competitions",
    year: 2025,
    person: "Hafiz Bilal Ahmed, Class IX-B",
    description:
      "Stood first out of twenty-four participating institutions in the provincial Tajweed and Qirat recitation competition.",
    metric: "1st Place",
    featured: true,
  },
  {
    id: "ach-2025-water",
    title: "Stewardship and Neighborhood Water Conservation Study",
    category: "Research",
    year: 2025,
    person: "Class IX Project Group",
    description:
      "A semester-long research project mapping clean water usage and conservation techniques, linking environmental responsibility with Islamic stewardship.",
  },
  {
    id: "ach-2024-debate",
    title: "Winners, Inter-School Islamic Ethics Debate",
    category: "Competitions",
    year: 2024,
    person: "Hamza Raza & Zainab Khan",
    description:
      "Won the championship trophy in the regional debate series discussing the application of Akhlaq and integrity in modern digital spaces.",
    metric: "Champions",
  },
  {
    id: "ach-2024-sportsmanship",
    title: "Inter-School Football Fair Play Award",
    category: "Sports",
    year: 2024,
    person: "School Football XI",
    description:
      "Honoured with the tournament's Fair Play Shield for demonstrating outstanding Islamic sportsmanship, discipline, and respect for opponents.",
    metric: "Fair Play Award",
  },
  {
    id: "ach-2024-headgirl",
    title: "Student Council Tarbiyah & Ethics Initiative",
    category: "Leadership",
    year: 2024,
    person: "Fatima Noor, Head Girl",
    description:
      "Successfully integrated a peer-mentoring circle and a mutual encouragement system (Ukhuwwah points) across all four student houses.",
  },
  {
    id: "ach-2023-hifz",
    title: "Hifz-e-Qur'an Milestone Completions",
    category: "Academic",
    year: 2023,
    person: "Five Primary & Middle Students",
    description:
      "Five students successfully completed the memorisation of the last 5 Juz of the Qur'an with proper Tajweed under our campus Hifz circle.",
    metric: "5 Students",
    featured: true,
  },
  {
    id: "ach-2023-ration",
    title: "Ramadan Sadaqah & Ration Drive",
    category: "Community",
    year: 2023,
    person: "Social Welfare Group",
    description:
      "Students raised funds and prepared 140 ration boxes containing essential food items, distributing them to families around the campus.",
    metric: "140 Families",
  },
  {
    id: "ach-2023-calligraphy",
    title: "Gold Medal in Islamic Calligraphy",
    category: "Competitions",
    year: 2023,
    person: "Maryam Tariq & Team",
    description:
      "Awarded first place in the inter-school artistic calligraphy exhibition, utilizing traditional Khattati techniques to illustrate Qur'anic verses.",
    metric: "Gold Medal",
  },
  {
    id: "ach-2022-result",
    title: "100% Board Success Rate & A-1 Grades",
    category: "Academic",
    year: 2022,
    person: "Class of 2022",
    description:
      "Every candidate successfully cleared the Karachi Board examinations, with more than half securing distinctions and A-1 grades.",
    metric: "100% Pass",
  },
  {
    id: "ach-2022-athletics",
    title: "Middle School Sports Day Record",
    category: "Sports",
    year: 2022,
    person: "Usman Ali, Class IX",
    description:
      "Established the school's record in the 200-meter dash while upholding strict athletic rules and peer respect.",
  },
  {
    id: "ach-2021-naat",
    title: "First Place, Regional Naat Khwani Competition",
    category: "Competitions",
    year: 2021,
    person: "Abdullah Shaikh, Class VII",
    description:
      "Secured the top award in the city-wide Naat Khwani competition held in celebration of the Prophet's ﷺ life.",
    metric: "1st Place",
  },
  {
    id: "ach-2021-library",
    title: "Student-Led Classical Islamic Library Project",
    category: "Leadership",
    year: 2021,
    person: "Reading Circle Prefects",
    description:
      "Catalogued, organized, and opened a library section dedicated to Seerah, classical Arabic grammar guides, and junior books.",
    metric: "1,200 Books",
  },
  {
    id: "ach-2020-tutoring",
    title: "Primary Reading & Tajweed Peer Circles",
    category: "Community",
    year: 2020,
    person: "Senior Student Volunteers",
    description:
      "Senior students volunteered as reading coaches to help junior primary students build fluency in Urdu, English, and Qur'an recitation.",
  },
];

export const achievementYears = Array.from(new Set(achievements.map((item) => item.year))).sort(
  (a, b) => b - a,
);
