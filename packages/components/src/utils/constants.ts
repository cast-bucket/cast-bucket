import { isSmallScreen } from "./platforms";

// data
export const data = {
  appCategories: [
    "Artificial Intelligence",
    "Agile",
    "Android",
    "Bsd",
    "Career",
    "Community & Inspiration",
    "Data Management",
    "Devops",
    "Flutter",
    "Functional Programming",
    "Git",
    "iOS",
    "Kubernetes",
    "Linux",
    "Programming Languages & Frameworks",
    "Security",
    "Software Engineering",
    "Software Testing",
    "Web Development"
  ]
};

// UI CONSTANTS
const CONTAINER_MARGIN = 24;
export const ui = {
  containers: {
    margin: {
      value: CONTAINER_MARGIN,
      px: `${CONTAINER_MARGIN}px`
    }
  }
};

export const RECYCLER_ITEM_SIZE = isSmallScreen ? 200 : 250;
export const RECYCLER_CONTAINER_SIZE = isSmallScreen
  ? RECYCLER_ITEM_SIZE + 10
  : RECYCLER_ITEM_SIZE + 25;
