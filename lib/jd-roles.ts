export interface JobRole {
  /** URL slug used by the /jd/[role] tracking redirect */
  slug: string;
  title: string;
  type: string;
  summary: string;
  /** The real job description, currently a Google Drive file */
  jdUrl: string;
}

export const JOB_ROLES: JobRole[] = [
  {
    slug: "barista",
    title: "Barista",
    type: "Full-time / Part-time",
    summary: "Pull espresso, build our drink menu and set the tone at the counter.",
    jdUrl: "https://drive.google.com/file/d/1xQJmrUbo6KU7X7fc1Zj47wtMmB42wdwk/view?usp=sharing",
  },
  {
    slug: "baker",
    title: "Baker",
    type: "Full-time",
    summary: "Early mornings on sponge, cream and lamination. Our rolls start with you.",
    jdUrl: "https://drive.google.com/file/d/1ImQmZnrEgTpvl-x7_A6f2NY4uiX43KQ2/view?usp=sharing",
  },
  {
    slug: "cook",
    title: "Cook",
    type: "Full-time",
    summary: "Run the line for brunch service and help shape the savoury menu.",
    jdUrl: "https://drive.google.com/file/d/1zs_rFdMrK2iOYhqC0fP9dj_xfXr4ZDXW/view?usp=sharing",
  },
  {
    slug: "prep-cook",
    title: "Prep Cook",
    type: "Full-time / Part-time",
    summary: "Mise en place, fillings and daily prep that keeps service moving.",
    jdUrl: "https://drive.google.com/file/d/1G-4jzxysozbsEOTcAcrM7wbGkxQX7GQP/view?usp=sharing",
  },
  {
    slug: "dishwasher-busser",
    title: "Dishwasher / Busser",
    type: "Part-time",
    summary: "Keep the room and the kitchen turning over. The backbone of the shift.",
    jdUrl: "https://drive.google.com/file/d/1un_SG5jIxXXp5mzzyp_iV2yf1G8WyuP3/view?usp=sharing",
  },
];

export function findRole(slug: string): JobRole | undefined {
  return JOB_ROLES.find((role) => role.slug === slug);
}
