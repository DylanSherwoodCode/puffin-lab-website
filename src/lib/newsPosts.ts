export type NewsPost = {
  id: string; // unique, any short name
  title: string;
  date: string; // "YYYY-MM-DD"
  images?: string[]; // path under /public, e.g. "/images/news/my-post.jpg"
  content: string[]; // one string per paragraph
  link?: { label: string; href: string };
};

export const NewsPosts: NewsPost[] = [
  {
    id: "example-1-post",
    title: "Example post: what we're working on",
    date: "2026-10-31",
    content: [
      "This is the first paragraph of the post. Each string in this list becomes its own paragraph.",
      "This is the second paragraph. Add as many as you need.",
    ],
    images:["/images/news/halloween_group_000.jpg",
            "/images/news/halloween_group_001.jpg",
            "/images/news/halloween_group_002.jpg",
            "/images/news/halloween_group_003.jpg",
            "/images/news/halloween_group_004.jpg",
            "/images/news/halloween_group_005.jpg",
            "/images/news/halloween_group_007.jpg"]
  },
    
  {
    id: "phd-recruiting",
    title: "Recruiting PhD students for Fall 2026",
    date: "2025-09-01",
    content: [
      "We are looking for motivated PhD students interested in HCI and computing education research."],
    link: { label: "Learn more", href: "/get-involved" },
  },

  {
    id: "aied-2025",
    date: "2025-06-15",
    title: "Paper accepted to AIED 2025",
    content: [
      "Our work on learner and instructor needs in AI-supported programming learning tools will appear at AIED 2025."],
    link: { label: "View publication", href: "https://www.zihanwu.com" },
  },

  {
    id: "lab-launch",
    date: "2025-01-15",
    title: "Puffin Lab launches at University of Maine",
    content: [
      "The lab opens at SCIS, focusing on participation, understanding, feedback, and interaction for novices."],
  },
];


// Dates are stored as "YYYY-MM-DD". Format in UTC so they don't show
// a day early for visitors in US time zones.
export function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
