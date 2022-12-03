/* eslint-disable newline-before-return */

// Icons
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import CodeOutlinedIcon from "@mui/icons-material/CodeOutlined";
import { SnackbarOrigin } from "@mui/material";

export const getRandomProfileUrl = (size = 256) =>
  `https://i.pravatar.cc/${size}`;
export const CRONJ_lINKED_IN = "https://in.linkedin.com/company/cronj";
export const CRONJ_GITHUB = "https://github.com/githubcronj";

export const SNACKBAR_CONFIG: {
  anchorOrigin: SnackbarOrigin;
} = {
  anchorOrigin: { vertical: "bottom", horizontal: "right" },
};

/**
 * Placeholder Function for events
 */
export const noOp = () => {
  return;
};

export const getLorem = (wordCount = 128) => {
  const words = [
    "The sky",
    "above",
    "the port",
    "was",
    "the color of television",
    "tuned",
    "to",
    "a dead channel",
    ".",
    "All",
    "this happened",
    "more or less",
    ".",
    "I",
    "had",
    "the story",
    "bit by bit",
    "from various people",
    "and",
    "as generally",
    "happens",
    "in such cases",
    "each time",
    "it",
    "was",
    "a different story",
    ".",
    "It",
    "was",
    "a pleasure",
    "to",
    "burn",
  ];
  const text: string[] = [];
  let x = wordCount;
  while (--x) text.push(words[Math.floor(Math.random() * words.length)]);
  return text.join(" ");
};

export const CITIES = [
  { label: "Delhi", value: "delhi" },
  { label: "Mumbai", value: "mumbai" },
  { label: "Banglore", value: "banglore" },
  { label: "Kolkatta", value: "kolkatta" },
];

export const CURRENT_SALARY = [
  { label: "10-20 Lakhs", value: 15 },
  { label: "20-30 Lakhs", value: 25 },
  { label: "30-40 Lakhs", value: 35 },
  { label: "40-50 Lakhs", value: 45 },
  { label: "50-60 Lakhs", value: 55 },
  { label: "60-70 Lakhs", value: 60 },
];

export const NOTICE_PERIOD = [
  { label: "15 Days", value: "15 days" },
  { label: "30 Days", value: "30 days" },
  { label: "45 Days", value: "45 days" },
  { label: "60 Days", value: "60 days" },
  { label: "More than 60 Days", value: "75 days" },
];

export const UPDATE_PROFILE_STEPS = [
  { label: "Personal Info", icon: PersonOutlineOutlinedIcon },
  { label: "Your Skills", icon: CodeOutlinedIcon },
  { label: "Your Experience", icon: WorkOutlineOutlinedIcon },
];

export const EXPERIENCES = [
  {
    id: 1,
    name: "Company Name",
    role: "UI/UX Designer",
    location: "New Delhi",
    time: "04/2013 - 06/2021",
    jd: getLorem(50),
  },
  {
    id: 2,
    name: "Company Name",
    location: "New Delhi",
    role: "Frontend Developer",
    time: "04/2013 - 06/2021",
    jd: getLorem(170),
  },
  {
    id: 3,
    name: "Company Name",
    location: "New Delhi",
    role: "Senior Frontend Developer",
    time: "04/2013 - 06/2021",
    jd: getLorem(250),
  },
];

export const EDUCATIONS = [
  {
    name: "Amity University",
    course: "Media Tech",
    location: "Delhi",
    period: "2012-2015",
  },
  {
    name: "Amity University",
    course: "Media Tech",
    location: "Delhi",
    period: "2012-2015",
  },
];

export const GRADE_TYPES = ["grade", "gpa"];
