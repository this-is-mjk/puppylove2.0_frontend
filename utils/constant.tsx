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
  Music: ['music', 'singing'],
  'Outdoor Activities': ['treking', 'travel', 'adventure'],
  'Health & Fitness': ['mindfulness', 'gym', 'yoga', 'meditation'],
  'Arts & Crafts': ['dance', 'art', 'painting', 'sketching', 'crafting'],
  Sports: ['cricket', 'sports'],
  'Design & Fashion': ['design', 'fashion', 'make up'],
  'Writing & Literature': ['writing', 'reading', 'literature'],
  Entertainment: ['festivals', 'stand up', 'movies', 'tv shows', 'gaming'],
  Photography: ['photography'],
  'Technology & Science': ['coding', 'science', 'technology'],
  'Cooking & Food': ['cooking', 'food'],
  Gardening: ['gardening'],
  Shopping: ['shopping'],
  'Knowledge & Learning': [
    'history',
    'politics',
    'philosophy',
    'psychology',
    'economics',
    'business',
  ],
  Social: ['friends'],
};

export const announcements = [
  {
    title: 'NOTE',
    body: "It's highly recommended that you generate your recovery codes and save them as we do not store your passwords, and once your passwords are lost you cannot recover them without recovery codes.",
  },
  {
    title: 'Talk with songs!',
    body: 'This time pclub has come up with a cute feature for you all to, now you can send songs with your hearts which can be seen after matches!',
  },
  {
    title: 'Express more',
    body: 'Want to tell people your hobbies? we got you this time, you can put in any 4 hobbies along with a catchy about section!',
  },
];

export function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const iconDict: { [key: string]: JSX.Element } = {
  // Music
  music: <FaMusic />,
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
  science: <IoIosFlask />,
  technology: <FaLaptop />,

  // Cooking & Food
  cooking: <FaUtensils />,
  food: <FaUtensils />,

  // Gardening
  gardening: <FaSeedling />,

  // Shopping
  shopping: <FaShoppingBag />,

  // Knowledge & Learning
  history: <FaGraduationCap />,
  politics: <FaGraduationCap />,
  philosophy: <FaGraduationCap />,
  psychology: <FaGraduationCap />,
  economics: <FaGraduationCap />,
  business: <FaGraduationCap />,

  // Social
  friends: <FaUsers />,
};
