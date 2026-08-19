export const site = {
  name: "Sirat-e-Mustaqeem Educational System",
  shortName: "Sirat-e-Mustaqeem",
  tagline: "Nurturing Faith, Knowledge, and Character",
  established: 2009,
  phone: "+92 42 3456 7890",
  email: "info@sirat-e-mustaqeem.edu.pk",
  address: "Mall Road Campus, Green Town, Lahore, Punjab 54000",
  officeHours: "Monday – Saturday, 8:00 AM – 2:30 PM",
  whatsapp: "+92 300 1234567",
  whatsappMessage:
    "Assalam-o-Alaikum, I am inquiring about admissions and Tarbiyah programs at Sirat-e-Mustaqeem Educational System.",
  mapEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3402.0480447820455!2d74.3373688!3d31.5497165!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391903f5f5f5f5f5%3A0x0!2sGreen%20Town%2C%20Lahore!5e0!3m2!1sen!2spk!4v1710000000000!5m2!1sen!2spk",
};

export type NavItem = {
  label: string;
  to: string;
};

export const primaryNavigation: NavItem[] = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Admissions", to: "/admissions" },
  { label: "Tarbiyah & Academics", to: "/syllabus" },
  { label: "Evaluations", to: "/results" },
  { label: "Gallery", to: "/gallery" },
  { label: "Contact", to: "/contact" },
];

export type NavGroup = {
  label: string;
  items: (NavItem & { description: string })[];
};

/** Top-level links that are always shown as direct links. */
export const navLinks: NavItem[] = [
  { label: "Home", to: "/" },
  { label: "Admissions", to: "/admissions" },
  { label: "Contact", to: "/contact" },
];

/** Grouped desktop dropdown navigation. */
export const navGroups: NavGroup[] = [
  {
    label: "About Us",
    items: [
      {
        label: "Our School",
        to: "/about",
        description: "Our foundation, campus, and spiritual leadership",
      },
      {
        label: "Mission & Vision",
        to: "/mission-vision",
        description: "The Islamic principles guiding our educational path",
      },
    ],
  },
  {
    label: "Tarbiyah",
    items: [
      {
        label: "Syllabus",
        to: "/syllabus",
        description: "Qur'an, Islamic Studies, and Core Academic curriculum",
      },
      {
        label: "Calendar & Schedule",
        to: "/schedule",
        description: "Daily schedules, prayer times, and academic events",
      },
      {
        label: "Evaluations",
        to: "/results",
        description: "Assessment outcomes and academic progress",
      },
    ],
  },
  {
    label: "Students",
    items: [
      {
        label: "Student Life",
        to: "/students",
        description: "Manners (Adab), student clubs, and community service",
      },
      {
        label: "Honours & Achievements",
        to: "/achievements",
        description: "Excellence in Qur'an memorisation, academics, and service",
      },
    ],
  },
  {
    label: "Resources",
    items: [
      {
        label: "Campus Gallery",
        to: "/gallery",
        description: "Classrooms, Qirat circles, and learning environments",
      },
      {
        label: "School Policies",
        to: "/policies",
        description: "Ethical conduct, uniform, and safety guidelines",
      },
    ],
  },
];

export const footerNavigation: { title: string; items: NavItem[] }[] = [
  {
    title: "Institution",
    items: [
      { label: "About Our School", to: "/about" },
      { label: "Mission & Vision", to: "/syllabus#mission-vision" },
      { label: "Honours & Achievements", to: "/syllabus#achievements" },
      { label: "School Policies", to: "/syllabus#policies" },
    ],
  },
  {
    title: "Tarbiyah & Academics",
    items: [
      { label: "Curriculum Syllabus", to: "/syllabus#syllabus" },
      { label: "Daily Schedule", to: "/syllabus#schedule" },
      { label: "Evaluations & Results", to: "/syllabus#results" },
      { label: "Student Life", to: "/syllabus#students" },
    ],
  },
  {
    title: "Connect",
    items: [
      { label: "Admissions", to: "/admissions" },
      { label: "Campus Gallery", to: "/gallery" },
      { label: "Contact Us", to: "/contact" },
    ],
  },
];

