export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: "Events" | "Students" | "Achievements" | "Campus";
  caption: string;
}

export const galleryCategories = ["All", "Events", "Students", "Achievements", "Campus"] as const;

export type GalleryCategory = (typeof galleryCategories)[number];

export const galleryImages: GalleryImage[] = [
  {
    id: "campus-exterior",
    src: "https://images.unsplash.com/photo-1773243906485-bd50f7bc308e?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Sirat-e-Mustaqeem campus main academic block building",
    category: "Campus",
    caption: "The main academic block and central courtyard for morning assemblies and Dhikr.",
  },
  {
    id: "classroom-learning",
    src: "https://images.unsplash.com/photo-1629273229214-d96be4552b9a?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Students engaged in Islamic learning and character development",
    category: "Students",
    caption:
      "Students learning Islamic values, good manners and character alongside their academic studies.",
  },
  {
    id: "science-lab",
    src: "https://images.pexels.com/photos/17639056/pexels-photo-17639056.jpeg",
    alt: "Secondary students performing a practical chemistry experiment in the laboratory",
    category: "Achievements",
    caption:
      "Students are encouraged to achieve strong academic results through structured learning, regular assessment and dedicated teacher support.",
  },
  {
    id: "sports-day",
    src: "https://images.unsplash.com/photo-1757143090778-311db757078d?q=80&w=1168&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Students participating in annual sports day running events",
    category: "Events",
    caption:
      "Students take part in activities focused on the importance of Ramadan, Qur’an recitation, dua, good deeds, charity and developing Islamic character.",
  },
  {
    id: "library-reading",
    src: "https://images.pexels.com/photos/10643465/pexels-photo-10643465.jpeg",
    alt: "Students reading reference books in the school library",
    category: "Students",
    caption:
      "Primary section students exploring Islamic history and science books during their library period.",
  },
  {
    id: "prize-distribution",
    src: "https://images.unsplash.com/photo-1651293478838-1f51675131c5?q=80&w=1175&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Students receiving awards on stage during annual day",
    category: "Events",
    caption:
      "A special school programme introducing students to the life, character, teachings and noble qualities of Prophet Muhammad ﷺ.",
  },
  {
    id: "islamic-education",
    src: "https://images.pexels.com/photos/38438213/pexels-photo-38438213.jpeg",
    alt: "Students learning Islamic values in a welcoming educational environment",
    category: "Campus",
    caption:
      "Islamic Education: Nurturing faith, knowledge, good character and Islamic manners alongside academic learning.",
  },
  {
    id: "robotics-exhibition",
    src: "https://images.pexels.com/photos/35105913/pexels-photo-35105913.jpeg",
    alt: "Students presenting their robotics project at the science fair",
    category: "Achievements",
    caption:
      "Students develop their understanding of Qur’anic teachings, Islamiyat, Islamic manners and values as an important part of their educational journey.",
  },
  {
    id: "classroom-reading",
    src: "https://images.pexels.com/photos/9127739/pexels-photo-9127739.jpeg",
    alt: "Teacher guiding primary section students through a reading module",
    category: "Students",
    caption: "Guided Urdu and Arabic phonics reading session in the junior block.",
  },
  {
    id: "trophy-winners",
    src: "https://images.pexels.com/photos/6565248/pexels-photo-6565248.jpeg",
    alt: "School team holding trophies from an inter-school competition",
    category: "Achievements",
    caption: "Winners of the Regional Husn-e-Qirat & Naat Competition displaying their trophies.",
  },
  {
    id: "assembly-hall",
    src: "https://plus.unsplash.com/premium_photo-1678558953737-ccba720dd3f8?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Morning assembly presentation in the school courtyard",
    category: "Events",
    caption:
      "A meaningful school event focused on Islamic manners, respect, kindness, honesty and the importance of following the Sunnah in everyday life.",
  },
  {
    id: "desks-setup",
    src: "https://images.unsplash.com/photo-1744957280831-8d30f63914b8?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Classroom setup with organized textbook piles",
    category: "Campus",
    caption:
      "Classrooms prepared for the new academic session, featuring core and Islamic studies materials.",
  },
];
