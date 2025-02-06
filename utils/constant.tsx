import { JSX } from 'react';
import {
  FaMusic,
  FaMountain,
  FaHeart,
  FaPalette,
  FaTshirt,
  FaBook,
  FaFilm,
  FaCamera,
  FaLaptop,
  FaUtensils,
  FaSeedling,
  FaShoppingBag,
  FaGraduationCap,
  FaUsers,
  FaLinux,
} from 'react-icons/fa';
import { GiMicrophone, GiCricketBat, GiGamepad } from 'react-icons/gi';
import {
  IoIosFitness,
  IoIosBrush,
  IoIosBaseball,
  IoIosFlask,
} from 'react-icons/io';

// Define the color palette
export const colorPalette = [
  'rgba(47, 129, 247, 0.8)',      // GitHub Blue (Primary Accent)
  'rgba(56, 139, 253, 0.8)',      // Lighter Blue
  'rgba(88, 166, 255, 0.8)',      // Bright Sky Blue
  'rgba(40, 167, 69, 0.8)',       // GitHub Green (Success)
  'rgba(34, 134, 58, 0.8)',       // Darker Green
  'rgba(255, 211, 77, 0.8)',      // GitHub Yellow (Warning)
  'rgba(245, 159, 0, 0.8)',       // Darker Yellow
  'rgba(203, 36, 49, 0.8)',       // GitHub Red (Error)
  'rgba(248, 81, 73, 0.8)',       // Bright Red
  'rgba(138, 138, 138, 0.8)',     // GitHub Gray (Neutral)
  'rgba(177, 186, 198, 0.8)',     // Light Gray
  'rgba(241, 241, 241, 0.8)',     // Off-White
  'rgba(163, 113, 247, 0.8)',     // GitHub Purple
  'rgba(131, 204, 255, 0.8)',     // Light Cyan
  'rgba(255, 123, 114, 0.8)',     // Coral Pink
  'rgba(255, 99, 71, 0.8)',       // Tomato Red
  'rgba(75, 192, 192, 0.8)',      // Medium Turquoise
  'rgba(255, 159, 64, 0.8)',      // Golden Yellow
  'rgba(102, 51, 153, 0.8)',      // Purple (Vibrant)
  'rgba(0, 123, 255, 0.8)',       // Vivid Blue
  'rgba(233, 30, 99, 0.8)',       // Hot Pink
  'rgba(33, 150, 243, 0.8)',      // Deep Sky Blue
  'rgba(255, 193, 7, 0.8)',       // Amber
  'rgba(244, 67, 54, 0.8)',       // Red (Vibrant)
  'rgba(156, 39, 176, 0.8)',      // Purple (Darker)
  'rgba(139, 195, 74, 0.8)',      // Light Green
  'rgba(255, 87, 34, 0.8)',       // Deep Orange
  'rgba(0, 188, 212, 0.8)',       // Cyan
  'rgba(76, 175, 80, 0.8)',       // Green (Light)
  'rgba(121, 85, 72, 0.8)',       // Brown
  'rgba(33, 33, 33, 0.8)',        // Dark Gray
  'rgba(255, 235, 59, 0.8)',      // Yellow (Bright)
  ];
// Hash function to map a string to a color
export const hashStringToColor = (str: string) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % colorPalette.length;
  return colorPalette[index];
};

export const groupedTags: { [key: string]: string[] } = {
  Music: ['pop', 'rock', 'classical', 'hip-hop', 'jazz' ],
  'Health & Fitness': ['mindfulness', 'gym', 'yoga', 'meditation'],
  'Creativity': ['dance', 'art', 'singing','painting', 'sketching', 'crafting', 'photography'],
  Sports: ['cricket', 'football', 'tennis','sports'],
  'Design & Fashion': ['design', 'fashion', 'make up'],
  'Writing & Literature': ['writing', 'reading', 'literature'],
  Entertainment: ['festivals', 'stand up', 'movies', 'tv shows', 'gaming'],
  'Knowledge': [
    'science',
    'history',
    'politics',
    'philosophy',
    'psychology',
    'economics',
    'business',
  ],
  'Tech': ['coding', 'linux', 'technology'],
  'Outdoor Activities': ['trekking', 'travel', 'adventure'],
  'Cooking & Food': ['cooking', 'food'],
  Gardening: ['gardening'],
  Shopping: ['shopping'],
  Social: ['friends'],
};

export const announcements = [
  {
    title: 'Express more',
    body: "Got interests you want to share? We've got your back! You can now add four of your top interests along with a fun, catchy About Me section.",
  },
  {
    title: 'Talk with songs!',
    body: 'Now, you can send songs with your hearts, adding a whole new vibe to your connections! 🎶💖 These special songs are revealed only after the match, making the moment even more exciting!',
  },
  {
    title: 'NOTE',
    body: "For your security, it's highly recommended that you generate and save your recovery codes. We do not store your passwords, so if you lose them, recovery codes are the only way to regain access. Make sure to keep them safe! 🔒",
  },
];

export function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const iconDict: { [key: string]: JSX.Element } = {
  // Music
  pop: <FaMusic />,
  rock: <FaMusic />,
  classical: <FaMusic />,
  'hip-hop': <FaMusic />,
  jazz: <FaMusic />,
  singing: <GiMicrophone />,


  // Outdoor Activities
  treking: <FaMountain />,
  travel: <FaMountain />,
  adventure: <FaMountain />,

  // Health & Fitness
  mindfulness: <FaHeart />,
  gym: <IoIosFitness />,
  yoga: <IoIosFitness />,
  meditation: <FaHeart />,

  // Arts & Crafts
  dance: <IoIosBrush />,
  art: <FaPalette />,
  painting: <FaPalette />,
  sketching: <FaPalette />,
  crafting: <FaPalette />,

  // Sports
  cricket: <GiCricketBat />,
  tennis: <IoIosBaseball />,
  sports: <IoIosBaseball />,
  

  // Design & Fashion
  design: <FaTshirt />,
  fashion: <FaTshirt />,
  'make up': <FaTshirt />,

  // Writing & Literature
  writing: <FaBook />,
  reading: <FaBook />,
  literature: <FaBook />,

  // Entertainment
  festivals: <FaFilm />,
  'stand up': <GiMicrophone />,
  movies: <FaFilm />,
  'tv shows': <FaFilm />,
  gaming: <GiGamepad />,

  // Photography
  photography: <FaCamera />,

  // Technology & Science
  coding: <FaLaptop />,
  linux: <FaLinux/>,
  technology: <FaLaptop />,
  
    // Cooking & Food
  cooking: <FaUtensils />,
  food: <FaUtensils />,

  // Gardening
  gardening: <FaSeedling />,

  // Shopping
  shopping: <FaShoppingBag />,

  // Knowledge & Learning
  science: <IoIosFlask />,
  history: <FaGraduationCap />,
  politics: <FaGraduationCap />,
  philosophy: <FaGraduationCap />,
  psychology: <FaGraduationCap />,
  economics: <FaGraduationCap />,
  business: <FaGraduationCap />,

  // Social
  friends: <FaUsers />,
};
