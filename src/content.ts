// Everything the page says, in one place

export const PERSON = {
  name: 'Zacc Bandahala',
  fullName: 'Zcsalweemnharr E. Bandahala',
  email: 'zakurofr@gmail.com',
  phone: '+63 920 350 6666',
  phoneHref: 'tel:+639203506666',
  linkedin: 'https://www.linkedin.com/in/zcsalweemnharr-bandahala-445167309/',
  facebook: 'https://www.facebook.com/whyzzky.engkoh',
  github: 'https://github.com/Zakuro28',
  location: 'Philippines',
}

export type Project = {
  name: string
  kind: string
  url: string
  repo?: string
  image: string
  description: string
  tech: string[]
  note?: string
}

export const PROJECTS: Project[] = [
  {
    name: 'Enriched Learning Labs',
    kind: 'Client website, WordPress',
    url: 'https://enrichedlearninglabs.com',
    image: '/work/ellabs.jpg',
    description:
      'A full redesign for a preschool in Pasig City, with playful animation on every page and a shop sorted by category. Families get a portal to sign up, enroll their child, and check attendance, grades, payments and downloads. Staff get a dashboard of visitors, new families and enrollments.',
    tech: ['WordPress', 'PHP', 'JavaScript', 'CSS'],
    note: 'Client work, so the code is private.',
  },
  {
    name: 'Kit',
    kind: 'Task board',
    url: 'https://zacc-kit.vercel.app',
    repo: 'https://github.com/Zakuro28/task-board',
    image: '/work/kit.jpg',
    description:
      'A drag-and-drop board with To do, Doing and Done columns. Tasks carry labels, due dates, priority, checklists and notes, with search and filters. Built from small reusable components and saved in the browser.',
    tech: ['React', 'TypeScript', 'Tailwind CSS', 'dnd-kit'],
  },
  {
    name: 'Pitaka',
    kind: 'Expense tracker',
    url: 'https://pitaka-nine.vercel.app',
    repo: 'https://github.com/Zakuro28/expense-tracker',
    image: '/work/pitaka.jpg',
    description:
      'Tracks money in, money out and savings by day, week, month or year. Budgets, bill due dates, savings goals, a wishlist that feeds the budget, and Excel import and export. Works without an account.',
    tech: ['React', 'TypeScript', 'Tailwind CSS', 'Motion'],
  },
  {
    name: 'Skyfall',
    kind: 'Weather app',
    url: 'https://zacc-skyfall.vercel.app',
    repo: 'https://github.com/Zakuro28/weather-app',
    image: '/work/skyfall.jpg',
    description:
      'Live weather for any city, with a sky that follows the real conditions: the sun moves along its arc, nights turn dark, and heavy rain brings lightning. A live local clock switches between 12 and 24 hours.',
    tech: ['React', 'TypeScript', 'Open-Meteo API'],
  },
  {
    name: 'Zacc Websites',
    kind: 'Landing page',
    url: 'https://zacc-website.vercel.app',
    repo: 'https://github.com/Zakuro28/landing-page',
    image: '/work/zacc-websites.jpg',
    description:
      'The page for my web development service for small businesses: animated from the first load, fully responsive, with every contact link one tap away.',
    tech: ['React', 'TypeScript', 'Tailwind CSS', 'Motion'],
  },
  {
    name: 'Pager',
    kind: 'Parenting app',
    url: 'https://pager-dz8g.onrender.com',
    repo: 'https://github.com/Zakuro28/Pager',
    image: '/work/pager.jpg',
    description:
      'A web app for parents and caregivers: a private journal, milestone tracking with reminders for the child’s age, tips for each stage and a resource library.',
    tech: ['Laravel', 'PHP', 'Blade'],
    note: 'Runs on a free server, so the first visit can take up to a minute to wake up.',
  },
]

// Shown below all the projects
export const PROJECTS_EARNED = { amount: 150000, label: 'Estimated total earned by all the projects above' }

export type Job = { role: string; place: string; where: string; points: string[]; awards?: string[] }

export const JOBS: Job[] = [
  {
    role: 'Chat Support Representative',
    place: 'SupportZebra',
    awards: ['Best Trainee', 'Best Nestee'],
    where: 'Cagayan de Oro City',
    points: [
      'Handled several live chats at once, answering account, product, order and service questions while keeping response times on target.',
      'Troubleshot common issues using set procedures, and escalated complex cases to the right team.',
      'Documented every conversation and resolution in internal systems so follow-ups never started from zero.',
    ],
  },
  {
    role: 'Medical Claims Analyst',
    place: 'Med-Metrix',
    where: 'TechnoPoint, Pasig City',
    points: [
      'Reviewed and processed medical claims, validating patient, provider, billing and insurance details against guidelines.',
      'Found discrepancies and missing information in documentation, traced denied or incomplete claims, and followed up on corrections.',
      'Handled sensitive patient and billing data confidentially while meeting productivity and quality targets.',
    ],
  },
]

export const EDUCATION = {
  degree: 'Bachelor of Science in Computer Science',
  school: 'Western Mindanao State University, Zamboanga City',
  honors: ['Graduated with honors', 'Best Research Paper award'],
  earlier: 'TVL: Electrical Installation and Maintenance, senior high school track',
  proficiency: ['EIM', 'IT', 'AutoCAD'],
}

export const SKILLS: { area: string; items: string[] }[] = [
  { area: 'Building for the web', items: ['React', 'TypeScript', 'JavaScript', 'HTML & CSS', 'Tailwind CSS', 'Bootstrap', 'Vite', 'PHP', 'Laravel', 'Java', 'C++', 'REST APIs', 'Responsive design'] },
  { area: 'Data', items: ['MySQL', 'SQL & PL/SQL', 'Database design', 'ER diagrams', 'phpMyAdmin', 'SPSS', 'Excel & Google Sheets', 'Reports & summaries'] },
  { area: 'Testing & quality', items: ['Manual testing', 'Test cases & plans', 'Bug reporting', 'Regression testing', 'Cross-browser & mobile testing', 'API testing', 'Chrome DevTools', 'Playwright'] },
  { area: 'Tools & shipping', items: ['Git & GitHub', 'VS Code', 'npm', 'Vercel', 'Render', 'Draw.io', 'Microsoft Office', 'Google Workspace'] },
  { area: 'Working with people', items: ['Live chat support', 'Escalation handling', 'Clear documentation', 'Following & writing SOPs', 'Agile & Scrum', 'Code review', 'Root-cause analysis'] },
]
