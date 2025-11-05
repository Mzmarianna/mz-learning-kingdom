#!/bin/bash

# Clash Royale LMS Setup Script
# Run this in VS Code terminal: bash setup-clash-royale-lms.sh
# It creates the project structure, files, and initializes a Git repo.
# Prerequisites: Node.js, Git installed. After setup, run `npm install` in the project dir.

set -e  # Exit on any error

PROJECT_NAME="clash-royale-lms"
echo "Launching $PROJECT_NAME... Hold onto your elixir!"

declare -r SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
declare -r WORKSPACE_ROOT="${SCRIPT_DIR%/scripts}"

cd "$WORKSPACE_ROOT"

# Create project root
rm -rf "$PROJECT_NAME"  # Remove if exists
mkdir -p "$PROJECT_NAME"
cd "$PROJECT_NAME"

# Create directories
mkdir -p src/lib src/providers src/data app/dashboard app/arena/{[week]} app/battle/{[week]}/{{subject}} app/profile public/images functions scripts

# Note: For dynamic dirs like app/arena/[week], we create a placeholder; rename in VS Code as needed.
# Similarly for [subject] – create 'english' as example.

# package.json
cat << 'EOF' > package.json
{
  "name": "clash-royale-lms",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "14.0.0",
    "react": "^18",
    "react-dom": "^18",
    "firebase": "^10.0.0",
    "@tanstack/react-query": "^4.0.0",
    "lucide-react": "^0.0.0",
    "@sendgrid/mail": "^7.7.0"
  },
  "devDependencies": {
    "@types/node": "^20",
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "autoprefixer": "^10.0.0",
    "eslint": "^8",
    "eslint-config-next": "14.0.0",
    "postcss": "^8",
    "tailwindcss": "^3.3.0",
    "typescript": "^5"
  }
}
EOF

# tailwind.config.js
cat << 'EOF' > tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        royaleGreen: '#00ff41',
        elixirRed: '#ff4500',
      },
      animation: {
        'deploy': 'deploy 0.5s ease-in-out',
      },
    },
  },
  plugins: [],
}
EOF

# next.config.js
cat << 'EOF' > next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = nextConfig
EOF

# src/lib/firebase.ts
cat << 'EOF' > src/lib/firebase.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-app-id"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
EOF

# src/providers/QueryProvider.tsx
cat << 'EOF' > src/providers/QueryProvider.tsx
'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export function QueryProvider({ children }: { children: React.ReactNode }) {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
EOF

# src/data/curriculum.json (Truncated example - expand with full data)
cat << 'EOF' > src/data/curriculum.json
[
  {
    "Week": "1",
    "Quarter": "Q1",
    "Theme": "Building Blocks",
    "English": "U1 Themes Chars; Q: Chars change?; Proj: Comic/Pod/Journal; B: The Outsiders",
    "Math": "U1 Seq Slope; Q: Traffic?; Proj: City/Art/Quilt; B: The Number Devil",
    "Science": "U1 Atoms; Q: Sustain?; Proj: Comic/Model/Poster; B: The Disappearing Spoon",
    "Social Studies": "U1 Orig Scar; Q: Redesign?; Proj: Conv/App/Skit; B: Chains",
    "Tools": "Khan, Quizlet, Legends, Prodigy",
    "SAT Tie-In": "Diagnostic",
    "Goals": "Intro Mastery",
    "Resource Links": "English: https://www.khanacademy.org/ela/9th-grade-reading-and-vocabulary | Outsiders Excerpt: https://www.btboces.org/Downloads/The%20Outsiders%20Novel%20by%20SE%20Hinton.pdf | Math: https://www.khanacademy.org/math/algebra | Number Devil Ch: http://smijaj.weebly.com/numberdevil.html | Science: https://www.khanacademy.org/science/highschool-physics | Dis Spoon Excerpt: http://mrparsonchem.weebly.com/uploads/4/2/3/9/42399863/the_disappearing_spoon_-sam_keene.pdf | SS: https://www.khanacademy.org/humanities/us-history | Chains Excerpt: https://www.readinggroupguides.com/reviews/chains/excerpt | Tools: Quizlet https://quizlet.com/ | Legends https://www.legendsoflearning.com/ | Prodigy https://www.prodigygame.com/main-en"
  },
  {
    "Week": "2",
    "Quarter": "Q1",
    "Theme": "Building Blocks",
    "English": "U1 Themes Chars; Q: Chars change?; Proj: Comic/Pod/Journal; B: The Outsiders",
    "Math": "U1 Seq Slope; Q: Traffic?; Proj: City/Art/Quilt; B: The Number Devil",
    "Science": "U1 Atoms; Q: Sustain?; Proj: Comic/Model/Poster; B: The Disappearing Spoon",
    "Social Studies": "U1 Orig Scar; Q: Redesign?; Proj: Conv/App/Skit; B: Chains",
    "Tools": "Khan, Quizlet, Legends, Prodigy",
    "SAT Tie-In": "Diagnostic",
    "Goals": "Intro Mastery",
    "Resource Links": "English: https://www.khanacademy.org/ela/9th-grade-reading-and-vocabulary | Outsiders Excerpt: https://www.btboces.org/Downloads/The%20Outsiders%20Novel%20by%20SE%20Hinton.pdf | Math: https://www.khanacademy.org/math/algebra | Number Devil Ch: http://smijaj.weebly.com/numberdevil.html | Science: https://www.khanacademy.org/science/highschool-physics | Dis Spoon Excerpt: http://mrparsonchem.weebly.com/uploads/4/2/3/9/42399863/the_disappearing_spoon-sam_keene.pdf | SS: https://www.khanacademy.org/humanities/us-history | Chains Excerpt: https://www.readinggroupguides.com/reviews/chains/excerpt | Tools: Quizlet https://quizlet.com/ | Legends https://www.legendsoflearning.com/ | Prodigy https://www.prodigygame.com/main-en"
  },
  {
    "Week": "3",
    "Quarter": "Q1",
    "Theme": "Building Blocks",
    "English": "U1 Themes Chars; Q: Chars change?; Proj: Comic/Pod/Journal; B: The Outsiders",
    "Math": "U1 Seq Slope; Q: Traffic?; Proj: City/Art/Quilt; B: The Number Devil",
    "Science": "U1 Atoms; Q: Sustain?; Proj: Comic/Model/Poster; B: The Disappearing Spoon",
    "Social Studies": "U1 Orig Scar; Q: Redesign?; Proj: Conv/App/Skit; B: Chains",
    "Tools": "Khan, Quizlet, Legends, Prodigy",
    "SAT Tie-In": "Diagnostic",
    "Goals": "Intro Mastery",
    "Resource Links": "English: https://www.khanacademy.org/ela/9th-grade-reading-and-vocabulary | Outsiders Excerpt: https://www.btboces.org/Downloads/The%20Outsiders%20Novel%20by%20SE%20Hinton.pdf | Math: https://www.khanacademy.org/math/algebra | Number Devil Ch: http://smijaj.weebly.com/numberdevil.html | Science: https://www.khanacademy.org/science/highschool-physics | Dis Spoon Excerpt: http://mrparsonchem.weebly.com/uploads/4/2/3/9/42399863/the_disappearing_spoon-_sam_keene.pdf | SS: https://www.khanacademy.org/humanities/us-history | Chains Excerpt: https://www.readinggroupguides.com/reviews/chains/excerpt | Tools: Quizlet https://quizlet.com/ | Legends https://www.legendsoflearning.com/ | Prodigy https://www.prodigygame.com/main-en"
  },
  {
    "Week": "4",
    "Quarter": "Q1",
    "Theme": "Argument Action",
    "English": "U2 Claims Evid; Q: Ban phones?; Proj: Op-ed/Debate/Infog; B: Fahrenheit 451",
    "Math": "U2 Eq Sys; Q: Concert budget?; Proj: Sim/Escape/Game; B: CK-12 Algebra",
    "Science": "U2 React; Q: Eco-react?; Proj: Volcano/Rate/Lab Vid; B: The Elements",
    "Social Studies": "U2 CW Trade; Q: Trade wars?; Proj: Debate/Map/Scrap; B: Henry's Freedom Box",
    "Tools": "Khan, Quizlet, Legends, Prodigy",
    "SAT Tie-In": "Reading/Math",
    "Goals": "Application",
    "Resource Links": "English: https://www.khanacademy.org/ela/9th-grade-reading-and-vocabulary | Fahrenheit Excerpt: https://www.gutenberg.org/files/51230/51230-h/51230-h.htm | Math: https://www.khanacademy.org/math/algebra | CK-12: https://www.ck12.org/book/ck-12-algebra-concepts-and-connections/ | Science: https://www.khanacademy.org/science/highschool-physics | Elements Book: https://www.theodoregray.com/periodictable/ | SS: https://www.khanacademy.org/humanities/us-history | Henry's Box: https://www.readinggroupguides.com/reviews/henrys-freedom-box/excerpt | Tools: Quizlet https://quizlet.com/ | Legends https://www.legendsoflearning.com/ | Prodigy https://www.prodigygame.com/main-en"
  },
  {
    "Week": "5",
    "Quarter": "Q1",
    "Theme": "Argument Action",
    "English": "U2 Claims Evid; Q: Ban phones?; Proj: Op-ed/Debate/Infog; B: Fahrenheit 451",
    "Math": "U2 Eq Sys; Q: Concert budget?; Proj: Sim/Escape/Game; B: CK-12 Algebra",
    "Science": "U2 React; Q: Eco-react?; Proj: Volcano/Rate/Lab Vid; B: The Elements",
    "Social Studies": "U2 CW Trade; Q: Trade wars?; Proj: Debate/Map/Scrap; B: Henry's Freedom Box",
    "Tools": "Khan, Quizlet, Legends, Prodigy",
    "SAT Tie-In": "Reading/Math",
    "Goals": "Application",
    "Resource Links": "English: https://www.khanacademy.org/ela/9th-grade-reading-and-vocabulary | Fahrenheit Excerpt: https://www.gutenberg.org/files/51230/51230-h/51230-h.htm | Math: https://www.khanacademy.org/math/algebra | CK-12: https://www.ck12.org/book/ck-12-algebra-concepts-and-connections/ | Science: https://www.khanacademy.org/science/highschool-physics | Elements Book: https://www.theodoregray.com/periodictable/ | SS: https://www.khanacademy.org/humanities/us-history | Henry's Box: https://www.readinggroupguides.com/reviews/henrys-freedom-box/excerpt | Tools: Quizlet https://quizlet.com/ | Legends https://www.legendsoflearning.com/ | Prodigy https://www.prodigygame.com/main-en"
  }
  {
    "Week": "6",
    "Quarter": "Q1",
    "Theme": "Argument Action",
    "English": "U2 Claims Evid; Q: Ban phones?; Proj: Op-ed/Debate/Infog; B: Fahrenheit 451",
    "Math": "U2 Eq Sys; Q: Concert budget?; Proj: Sim/Escape/Game; B: CK-12 Algebra",
    "Science": "U2 React; Q: Eco-react?; Proj: Volcano/Rate/Lab Vid; B: The Elements",
    "Social Studies": "U2 CW Trade; Q: Trade wars?; Proj: Debate/Map/Scrap; B: Henry's Freedom Box",
    "Tools": "Khan, Quizlet, Legends, Prodigy",
    "SAT Tie-In": "Reading/Math",
    "Goals": "Application",
    "Resource Links": "English: https://www.khanacademy.org/ela/9th-grade-reading-and-vocabulary | Fahrenheit Excerpt: https://www.gutenberg.org/files/51230/51230-h/51230-h.htm | Math: https://www.khanacademy.org/math/algebra | CK-12: https://www.ck12.org/book/ck-12-algebra-concepts-and-connections/ | Science: https://www.khanacademy.org/science/highschool-physics | Elements Book: https://www.theodoregray.com/periodictable/ | SS: https://www.khanacademy.org/humanities/us-history | Henry's Box: https://www.readinggroupguides.com/reviews/henrys-freedom-box/excerpt | Tools: Quizlet https://quizlet.com/ | Legends https://www.legendsoflearning.com/ | Prodigy https://www.prodigygame.com/main-en"
  },
  {
    "Week": "7",
    "Quarter": "Q1",
    "Theme": "Informative Texts",
    "English": "U3 Ideas Sum; Q: Media shape?; Proj: Pod/Timeline/Bias; B: Lord of the Flies",
    "Math": "U3 Rad; Q: Garden opt?; Proj: Puzzle/3D/Rap; B: Math Curse",
    "Science": "U3 Newton; Q: Safer car?; Proj: Egg Drop/Anim/Graph; B: Rosie Revere Engineer",
    "Social Studies": "U3 Gild Mark; Q: Inventor inn?; Proj: Reform/Game/Diary; B: Animal Farm",
    "Tools": "Khan, Quizlet, Legends, Prodigy",
    "SAT Tie-In": "Reading/Math",
    "Goals": "Application",
    "Resource Links": "English: https://www.khanacademy.org/ela/9th-grade-reading-and-vocabulary | Lord Excerpt: https://www.sparknotes.com/lit/flies/section1/ | Math: https://www.khanacademy.org/math/algebra | Math Curse: https://www.jonscieszka.com/books/math-curse/ | Science: https://www.khanacademy.org/science/highschool-physics | Rosie Book: https://andrea-beaty.com/books/rosie-revere-engineer/ | SS: https://www.khanacademy.org/humanities/us-history | Animal Farm Excerpt: https://www.george-orwell.org/animal_farm/0.html | Tools: Quizlet https://quizlet.com/ | Legends https://www.legendsoflearning.com/ | Prodigy https://www.prodigygame.com/main-en"
  },
  {
    "Week": "8",
    "Quarter": "Q1",
    "Theme": "Informative Texts",
    "English": "U3 Ideas Sum; Q: Media shape?; Proj: Pod/Timeline/Bias; B: Lord of the Flies",
    "Math": "U3 Rad; Q: Garden opt?; Proj: Puzzle/3D/Rap; B: Math Curse",
    "Science": "U3 Newton; Q: Safer car?; Proj: Egg Drop/Anim/Graph; B: Rosie Revere Engineer",
    "Social Studies": "U3 Gild Mark; Q: Inventor inn?; Proj: Reform/Game/Diary; B: Animal Farm",
    "Tools": "Khan, Quizlet, Legends, Prodigy",
    "SAT Tie-In": "Reading/Math",
    "Goals": "Application",
    "Resource Links": "English: https://www.khanacademy.org/ela/9th-grade-reading-and-vocabulary | Lord Excerpt: https://www.sparknotes.com/lit/flies/section1/ | Math: https://www.khanacademy.org/math/algebra | Math Curse: https://www.jonscieszka.com/books/math-curse/ | Science: https://www.khanacademy.org/science/highschool-physics | Rosie Book: https://andrea-beaty.com/books/rosie-revere-engineer/ | SS: https://www.khanacademy.org/humanities/us-history | Animal Farm Excerpt: https://www.george-orwell.org/animal_farm/0.html | Tools: Quizlet https://quizlet.com/ | Legends https://www.legendsoflearning.com/ | Prodigy https://www.prodigygame.com/main-en"
  },
  {
    "Week": "9",
    "Quarter": "Q1",
    "Theme": "Informative Texts",
    "English": "U3 Ideas Sum; Q: Media shape?; Proj: Pod/Timeline/Bias; B: Lord of the Flies",
    "Math": "U3 Rad; Q: Garden opt?; Proj: Puzzle/3D/Rap; B: Math Curse",
    "Science": "U3 Newton; Q: Safer car?; Proj: Egg Drop/Anim/Graph; B: Rosie Revere Engineer",
    "Social Studies": "U3 Gild Mark; Q: Inventor inn?; Proj: Reform/Game/Diary; B: Animal Farm",
    "Tools": "Khan, Quizlet, Legends, Prodigy",
    "SAT Tie-In": "Reading/Math",
    "Goals": "Application",
    "Resource Links": "English: https://www.khanacademy.org/ela/9th-grade-reading-and-vocabulary | Lord Excerpt: https://www.sparknotes.com/lit/flies/section1/ | Math: https://www.khanacademy.org/math/algebra | Math Curse: https://www.jonscieszka.com/books/math-curse/ | Science: https://www.khanacademy.org/science/highschool-physics | Rosie Book: https://andrea-beaty.com/books/rosie-revere-engineer/ | SS: https://www.khanacademy.org/humanities/us-history | Animal Farm Excerpt: https://www.george-orwell.org/animal_farm/0.html | Tools: Quizlet https://quizlet.com/ | Legends https://www.legendsoflearning.com/ | Prodigy https://www.prodigygame.com/main-en"
  },
  {
    "Week": "10",
    "Quarter": "Q2",
    "Theme": "Figurative POV",
    "English": "U4 Fig POV; Q: Missing voices?; Proj: Slam/Mood/Remix; B: Romeo and Juliet",
    "Math": "U4 Quad; Q: Projectile?; Proj: Sim/Bridge/Story; B: CK-12 Quadratics",
    "Science": "U4 Energy; Q: Renewables?; Proj: Oven/Diagram/Audit; B: Energy Island",
    "Social Studies": "U4 Wars Cold; Q: Alliances?; Proj: Prop Vid/Timeline/Model; B: The Cold War History",
    "Tools": "Khan, Quizlet, Legends, Prodigy",
    "SAT Tie-In": "Essay",
    "Goals": "Synthesis",
    "Resource Links": "English: https://www.khanacademy.org/ela/9th-grade-reading-and-vocabulary | Romeo Excerpt: https://www.folger.edu/explore/shakespeares-works/romeo-and-juliet/read/ | Math: https://www.khanacademy.org/math/algebra | CK-12 Quad: https://www.ck12.org/book/ck-12-geometry-concepts/ | Science: https://www.khanacademy.org/science/highschool-physics | Energy Island: https://www.penguinrandomhouse.com/books/298515/energy-island-by-alan-drummond/ | SS: https://www.khanacademy.org/humanities/us-history | Cold War Excerpt: https://www.johngaddis.com/books/the-cold-war | Tools: Quizlet https://quizlet.com/ | Legends https://www.legendsoflearning.com/ | Prodigy https://www.prodigygame.com/main-en"
  },
  {
    "Week": "11",
    "Quarter": "Q2",
    "Theme": "Figurative POV",
    "English": "U4 Fig POV; Q: Missing voices?; Proj: Slam/Mood/Remix; B: Romeo and Juliet",
    "Math": "U4 Quad; Q: Projectile?; Proj: Sim/Bridge/Story; B: CK-12 Quadratics",
    "Science": "U4 Energy; Q: Renewables?; Proj: Oven/Diagram/Audit; B: Energy Island",
    "Social Studies": "U4 Wars Cold; Q: Alliances?; Proj: Prop Vid/Timeline/Model; B: The Cold War History",
    "Tools": "Khan, Quizlet, Legends, Prodigy",
    "SAT Tie-In": "Essay",
    "Goals": "Synthesis",
    "Resource Links": "English: https://www.khanacademy.org/ela/9th-grade-reading-and-vocabulary | Romeo Excerpt: https://www.folger.edu/explore/shakespeares-works/romeo-and-juliet/read/ | Math: https://www.khanacademy.org/math/algebra | CK-12 Quad: https://www.ck12.org/book/ck-12-geometry-concepts/ | Science: https://www.khanacademy.org/science/highschool-physics | Energy Island: https://www.penguinrandomhouse.com/books/298515/energy-island-by-alan-drummond/ | SS: https://www.khanacademy.org/humanities/us-history | Cold War Excerpt: https://www.johngaddis.com/books/the-cold-war | Tools: Quizlet https://quizlet.com/ | Legends https://www.legendsoflearning.com/ | Prodigy https://www.prodigygame.com/main-en"
  },
  {
    "Week": "12",
    "Quarter": "Q2",
    "Theme": "Figurative POV",
    "English": "U4 Fig POV; Q: Missing voices?; Proj: Slam/Mood/Remix; B: Romeo and Juliet",
    "Math": "U4 Quad; Q: Projectile?; Proj: Sim/Bridge/Story; B: CK-12 Quadratics",
    "Science": "U4 Energy; Q: Renewables?; Proj: Oven/Diagram/Audit; B: Energy Island",
    "Social Studies": "U4 Wars Cold; Q: Alliances?; Proj: Prop Vid/Timeline/Model; B: The Cold War History",
    "Tools": "Khan, Quizlet, Legends, Prodigy",
    "SAT Tie-In": "Essay",
    "Goals": "Synthesis",
    "Resource Links": "English: https://www.khanacademy.org/ela/9th-grade-reading-and-vocabulary | Romeo Excerpt: https://www.folger.edu/explore/shakespeares-works/romeo-and-juliet/read/ | Math: https://www.khanacademy.org/math/algebra | CK-12 Quad: https://www.ck12.org/book/ck-12-geometry-concepts/ | Science: https://www.khanacademy.org/science/highschool-physics | Energy Island: https://www.penguinrandomhouse.com/books/298515/energy-island-by-alan-drummond/ | SS: https://www.khanacademy.org/humanities/us-history | Cold War Excerpt: https://www.johngaddis.com/books/the-cold-war | Tools: Quizlet https://quizlet.com/ | Legends https://www.legendsoflearning.com/ | Prodigy https://www.prodigygame.com/main-en"
  },
  {
    "Week": "13",
    "Quarter": "Q2",
    "Theme": "Arguments Texts",
    "English": "U5 Args Texts; Q: Climate act?; Proj: TED/Talk/Brief; B: The Catcher in the Rye",
    "Math": "U5 Exp; Q: Pop trends?; Proj: Dash/Timeline/Forecast; B: The Lorax",
    "Science": "U5 Waves; Q: Comm device?; Proj: Wave/Demo/Blueprint; B: The Boy Who Harnessed the Wind",
    "Social Studies": "U5 Rights Eq; Q: Fair pol?; Proj: Bio/Game/Infog; B: March Trilogy",
    "Tools": "Khan, Quizlet, Legends, Prodigy",
    "SAT Tie-In": "Essay",
    "Goals": "Synthesis",
    "Resource Links": "English: https://www.khanacademy.org/ela/9th-grade-reading-and-vocabulary | Catcher Excerpt: https://www.sparknotes.com/lit/catcher/section1/ | Math: https://www.khanacademy.org/math/algebra | Lorax: https://www.seussville.com/books/the-lorax/ | Science: https://www.khanacademy.org/science/highschool-physics | Boy Wind: https://www.williamkamkwamba.com/book/the-boy-who-harnessed-the-wind/ | SS: https://www.khanacademy.org/humanities/us-history | March: https://toppshelfcomix.com/march | Tools: Quizlet https://quizlet.com/ | Legends https://www.legendsoflearning.com/ | Prodigy https://www.prodigygame.com/main-en"
  },
  {
    "Week": "14",
    "Quarter": "Q2",
    "Theme": "Arguments Texts",
    "English": "U5 Args Texts; Q: Climate act?; Proj: TED/Talk/Brief; B: The Catcher in the Rye",
    "Math": "U5 Exp; Q: Pop trends?; Proj: Dash/Timeline/Forecast; B: The Lorax",
    "Science": "U5 Waves; Q: Comm device?; Proj: Wave/Demo/Blueprint; B: The Boy Who Harnessed the Wind",
    "Social Studies": "U5 Rights Eq; Q: Fair pol?; Proj: Bio/Game/Infog; B: March Trilogy",
    "Tools": "Khan, Quizlet, Legends, Prodigy",
    "SAT Tie-In": "Essay",
    "Goals": "Synthesis",
    "Resource Links": "English: https://www.khanacademy.org/ela/9th-grade-reading-and-vocabulary | Catcher Excerpt: https://www.sparknotes.com/lit/catcher/section1/ | Math: https://www.khanacademy.org/math/algebra | Lorax: https://www.seussville.com/books/the-lorax/ | Science: https://www.khanacademy.org/science/highschool-physics | Boy Wind: https://www.williamkamkwamba.com/book/the-boy-who-harnessed-the-wind/ | SS: https://www.khanacademy.org/humanities/us-history | March: https://toppshelfcomix.com/march | Tools: Quizlet https://quizlet.com/ | Legends https://www.legendsoflearning.com/ | Prodigy https://www.prodigygame.com/main-en"
  },
  {
    "Week": "15",
    "Quarter": "Q2",
    "Theme": "Arguments Texts",
    "English": "U5 Args Texts; Q: Climate act?; Proj: TED/Talk/Brief; B: The Catcher in the Rye",
    "Math": "U5 Exp; Q: Pop trends?; Proj: Dash/Timeline/Forecast; B: The Lorax",
    "Science": "U5 Waves; Q: Comm device?; Proj: Wave/Demo/Blueprint; B: The Boy Who Harnessed the Wind",
    "Social Studies": "U5 Rights Eq; Q: Fair pol?; Proj: Bio/Game/Infog; B: March Trilogy",
    "Tools": "Khan, Quizlet, Legends, Prodigy",
    "SAT Tie-In": "Essay",
    "Goals": "Synthesis",
    "Resource Links": "English: https://www.khanacademy.org/ela/9th-grade-reading-and-vocabulary | Catcher Excerpt: https://www.sparknotes.com/lit/catcher/section1/ | Math: https://www.khanacademy.org/math/algebra | Lorax: https://www.seussville.com/books/the-lorax/ | Science: https://www.khanacademy.org/science/highschool-physics | Boy Wind: https://www.williamkamkwamba.com/book/the-boy-who-harnessed-the-wind/ | SS: https://www.khanacademy.org/humanities/us-history | March: https://toppshelfcomix.com/march | Tools: Quizlet https://quizlet.com/ | Legends https://www.legendsoflearning.com/ | Prodigy https://www.prodigygame.com/main-en"
  },
  {
    "Week": "16",
    "Quarter": "Q2",
    "Theme": "Essay Cycle",
    "English": "U6 Essay; Q: Rewrite speech?; Proj: Port/Zine/Game; B: To Kill a Mockingbird",
    "Math": "U6 Data; Q: Social trends?; Proj: Infog/Survey/Pod; B: Freakonomics Excerpts",
    "Science": "U6 Systems; Q: Disaster?; Proj: Sim/Exp/Proposal; B: myPBLWorks Water",
    "Social Studies": "U6 Mod Sust; Q: Tomorrow econ?; Proj: Pod/Plan/Forecast; B: A People's History",
    "Tools": "Khan, Quizlet, Legends, Prodigy",
    "SAT Tie-In": "Essay",
    "Goals": "Synthesis",
    "Resource Links": "English: https://www.khanacademy.org/ela/9th-grade-reading-and-vocabulary | Mockingbird Excerpt: https://www.sparknotes.com/lit/mocking/section1/ | Math: https://www.khanacademy.org/math/algebra | Freakonomics: https://freakonomics.com/books/freakonomics/ | Science: https://www.khanacademy.org/science/highschool-physics | myPBL: https://mypblwork.org/project/water-quality | SS: https://www.khanacademy.org/humanities/us-history | People's History: https://www.historyisaweapon.com/defcon1/zinnapeop26.html | Tools: Quizlet https://quizlet.com/ | Legends https://www.legendsoflearning.com/ | Prodigy https://www.prodigygame.com/main-en"
  },
  {
    "Week": "17",
    "Quarter": "Q2",
    "Theme": "Essay Cycle",
    "English": "U6 Essay; Q: Rewrite speech?; Proj: Port/Zine/Game; B: To Kill a Mockingbird",
    "Math": "U6 Data; Q: Social trends?; Proj: Infog/Survey/Pod; B: Freakonomics Excerpts",
    "Science": "U6 Systems; Q: Disaster?; Proj: Sim/Exp/Proposal; B: myPBLWorks Water",
    "Social Studies": "U6 Mod Sust; Q: Tomorrow econ?; Proj: Pod/Plan/Forecast; B: A People's History",
    "Tools": "Khan, Quizlet, Legends, Prodigy",
    "SAT Tie-In": "Essay",
    "Goals": "Synthesis",
    "Resource Links": "English: https://www.khanacademy.org/ela/9th-grade-reading-and-vocabulary | Mockingbird Excerpt: https://www.sparknotes.com/lit/mocking/section1/ | Math: https://www.khanacademy.org/math/algebra | Freakonomics: https://freakonomics.com/books/freakonomics/ | Science: https://www.khanacademy.org/science/highschool-physics | myPBL: https://mypblwork.org/project/water-quality | SS: https://www.khanacademy.org/humanities/us-history | People's History: https://www.historyisaweapon.com/defcon1/zinnapeop26.html | Tools: Quizlet https://quizlet.com/ | Legends https://www.legendsoflearning.com/ | Prodigy https://www.prodigygame.com/main-en"
  },
  {
    "Week": "18",
    "Quarter": "Q2",
    "Theme": "Essay Cycle",
    "English": "U6 Essay; Q: Rewrite speech?; Proj: Port/Zine/Game; B: To Kill a Mockingbird",
    "Math": "U6 Data; Q: Social trends?; Proj: Infog/Survey/Pod; B: Freakonomics Excerpts",
    "Science": "U6 Systems; Q: Disaster?; Proj: Sim/Exp/Proposal; B: myPBLWorks Water",
    "Social Studies": "U6 Mod Sust; Q: Tomorrow econ?; Proj: Pod/Plan/Forecast; B: A People's History",
    "Tools": "Khan, Quizlet, Legends, Prodigy",
    "SAT Tie-In": "Essay",
    "Goals": "Synthesis",
    "Resource Links": "English: https://www.khanacademy.org/ela/9th-grade-reading-and-vocabulary | Mockingbird Excerpt: https://www.sparknotes.com/lit/mocking/section1/ | Math: https://www.khanacademy.org/math/algebra | Freakonomics: https://freakonomics.com/books/freakonomics/ | Science: https://www.khanacademy.org/science/highschool-physics | myPBL: https://mypblwork.org/project/water-quality | SS: https://www.khanacademy.org/humanities/us-history | People's History: https://www.historyisaweapon.com/defcon1/zinnapeop26.html | Tools: Quizlet https://quizlet.com/ | Legends https://www.legendsoflearning.com/ | Prodigy https://www.prodigygame.com/main-en"
  },
  {
    "Week": "19",
    "Quarter": "Q3",
    "Theme": "Poetry Perspective",
    "English": "U7 Integrated; Q: US docs?; Proj: Mashup; B: The Odyssey",
    "Math": "U7 Advanced; Q: Climate eq?; Proj: Mashup; B: Desmos Portfolio",
    "Science": "U7 Exp Ethics; Q: Equity exp?; Proj: Debate; B: PBS Ethics",
    "Social Studies": "U7 Lessons; Q: Econ hist?; Proj: Compare; B: iCivics Lib",
    "Tools": "Khan, Quizlet, Legends, Prodigy",
    "SAT Tie-In": "Practice",
    "Goals": "Capstone",
    "Resource Links": "English: https://www.khanacademy.org/ela/9th-grade-reading-and-vocabulary | Odyssey Excerpt: https://www.sparknotes.com/lit/odyssey/section1/ | Math: https://www.khanacademy.org/math/algebra | Desmos: https://teacher.desmos.com/ | Science: https://www.khanacademy.org/science/highschool-physics | PBS: https://www.pbs.org/education | SS: https://www.khanacademy.org/humanities/us-history | iCivics: https://www.icivics.org/ | Tools: Quizlet https://quizlet.com/ | Legends https://www.legendsoflearning.com/ | Prodigy https://www.prodigygame.com/main-en"
  },
  {
    "Week": "20",
    "Quarter": "Q3",
    "Theme": "Poetry Perspective",
    "English": "U7 Integrated; Q: US docs?; Proj: Mashup; B: The Odyssey",
    "Math": "U7 Advanced; Q: Climate eq?; Proj: Mashup; B: Desmos Portfolio",
    "Science": "U7 Exp Ethics; Q: Equity exp?; Proj: Debate; B: PBS Ethics",
    "Social Studies": "U7 Lessons; Q: Econ hist?; Proj: Compare; B: iCivics Lib",
    "Tools": "Khan, Quizlet, Legends, Prodigy",
    "SAT Tie-In": "Practice",
    "Goals": "Capstone",
    "Resource Links": "English: https://www.khanacademy.org/ela/9th-grade-reading-and-vocabulary | Odyssey Excerpt: https://www.sparknotes.com/lit/odyssey/section1/ | Math: https://www.khanacademy.org/math/algebra | Desmos: https://teacher.desmos.com/ | Science: https://www.khanacademy.org/science/highschool-physics | PBS: https://www.pbs.org/education | SS: https://www.khanacademy.org/humanities/us-history | iCivics: https://www.icivics.org/ | Tools: Quizlet https://quizlet.com/ | Legends https://www.legendsoflearning.com/ | Prodigy https://www.prodigygame.com/main-en"
  },
  {
    "Week": "21",
    "Quarter": "Q3",
    "Theme": "Poetry Perspective",
    "English": "U7 Integrated; Q: US docs?; Proj: Mashup; B: The Odyssey",
    "Math": "U7 Advanced; Q: Climate eq?; Proj: Mashup; B: Desmos Portfolio",
    "Science": "U7 Exp Ethics; Q: Equity exp?; Proj: Debate; B: PBS Ethics",
    "Social Studies": "U7 Lessons; Q: Econ hist?; Proj: Compare; B: iCivics Lib",
    "Tools": "Khan, Quizlet, Legends, Prodigy",
    "SAT Tie-In": "Practice",
    "Goals": "Capstone",
    "Resource Links": "English: https://www.khanacademy.org/ela/9th-grade-reading-and-vocabulary | Odyssey Excerpt: https://www.sparknotes.com/lit/odyssey/section1/ | Math: https://www.khanacademy.org/math/algebra | Desmos: https://teacher.desmos.com/ | Science: https://www.khanacademy.org/science/highschool-physics | PBS: https://www.pbs.org/education | SS: https://www.khanacademy.org/humanities/us-history | iCivics: https://www.icivics.org/ | Tools: Quizlet https://quizlet.com/ | Legends https://www.legendsoflearning.com/ | Prodigy https://www.prodigygame.com/main-en"
  },
  {
    "Week": "22",
    "Quarter": "Q3",
    "Theme": "Nonfiction Debates",
    "English": "U8 Lit Mag; Q: Classics echo?; Proj: Mag/Debate/Anth; B: Beowulf",
    "Math": "U8 Test Mast; Q: Justice?; Proj: Equity/SAT/Defense; B: Atlanta PS Tools",
    "Science": "U8 Eco Cap; Q: Sustain?; Proj: Proto/Lab/Game; B: RCBOE Guide",
    "Social Studies": "U8 US 2050; Q: Future?; Proj: Forecast/Debate/Port; B: ABC GSE Book",
    "Tools": "Khan, Quizlet, Legends, Prodigy",
    "SAT Tie-In": "Practice",
    "Goals": "Capstone",
    "Resource Links": "English: https://www.khanacademy.org/ela/9th-grade-reading-and-vocabulary | Beowulf Excerpt: https://www.poetryfoundation.org/poems/50114/beowulf-old-english-version | Math: https://www.khanacademy.org/math/algebra | Atlanta Tools: https://www.atlantapublicschools.us/Page/1 | Science: https://www.khanacademy.org/science/highschool-physics | RCBOE: https://www.rcboe.org/ | SS: https://www.khanacademy.org/humanities/us-history | ABC GSE: https://www.amazon.com/Georgia-EOC-Success-Strategies-Study/dp/160971991X | Tools: Quizlet https://quizlet.com/ | Legends https://www.legendsoflearning.com/ | Prodigy https://www.prodigygame.com/main-en"
  },
  {
    "Week": "23",
    "Quarter": "Q3",
    "Theme": "Nonfiction Debates",
    "English": "U8 Lit Mag; Q: Classics echo?; Proj: Mag/Debate/Anth; B: Beowulf",
    "Math": "U8 Test Mast; Q: Justice?; Proj: Equity/SAT/Defense; B: Atlanta PS Tools",
    "Science": "U8 Eco Cap; Q: Sustain?; Proj: Proto/Lab/Game; B: RCBOE Guide",
    "Social Studies": "U8 US 2050; Q: Future?; Proj: Forecast/Debate/Port; B: ABC GSE Book",
    "Tools": "Khan, Quizlet, Legends, Prodigy",
    "SAT Tie-In": "Practice",
    "Goals": "Capstone",
    "Resource Links": "English: https://www.khanacademy.org/ela/9th-grade-reading-and-vocabulary | Beowulf Excerpt: https://www.poetryfoundation.org/poems/50114/beowulf-old-english-version | Math: https://www.khanacademy.org/math/algebra | Atlanta Tools: https://www.atlantapublicschools.us/Page/1 | Science: https://www.khanacademy.org/science/highschool-physics | RCBOE: https://www.rcboe.org/ | SS: https://www.khanacademy.org/humanities/us-history | ABC GSE: https://www.amazon.com/Georgia-EOC-Success-Strategies-Study/dp/160971991X | Tools: Quizlet https://quizlet.com/ | Legends https://www.legendsoflearning.com/ | Prodigy https://www.prodigygame.com/main-en"
  },
  {
    "Week": "24",
    "Quarter": "Q3",
    "Theme": "Nonfiction Debates",
    "English": "U8 Lit Mag; Q: Classics echo?; Proj: Mag/Debate/Anth; B: Beowulf",
    "Math": "U8 Test Mast; Q: Justice?; Proj: Equity/SAT/Defense; B: Atlanta PS Tools",
    "Science": "U8 Eco Cap; Q: Sustain?; Proj: Proto/Lab/Game; B: RCBOE Guide",
    "Social Studies": "U8 US 2050; Q: Future?; Proj: Forecast/Debate/Port; B: ABC GSE Book",
    "Tools": "Khan, Quizlet, Legends, Prodigy",
    "SAT Tie-In": "Practice",
    "Goals": "Capstone",
    "Resource Links": "English: https://www.khanacademy.org/ela/9th-grade-reading-and-vocabulary | Beowulf Excerpt: https://www.poetryfoundation.org/poems/50114/beowulf-old-english-version | Math: https://www.khanacademy.org/math/algebra | Atlanta Tools: https://www.atlantapublicschools.us/Page/1 | Science: https://www.khanacademy.org/science/highschool-physics | RCBOE: https://www.rcboe.org/ | SS: https://www.khanacademy.org/humanities/us-history | ABC GSE: https://www.amazon.com/Georgia-EOC-Success-Strategies-Study/dp/160971991X | Tools: Quizlet https://quizlet.com/ | Legends https://www.legendsoflearning.com/ | Prodigy https://www.prodigygame.com/main-en"
  }
]
EOF

# app/layout.tsx
cat << 'EOF' > app/layout.tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { QueryProvider } from '@/providers/QueryProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Clash Royale Kingdom of Knowledge',
  description: 'Gamified LMS with Royale flair',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="service-worker" src="/sw.js" />
      </head>
      <body className={inter.className}>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  )
}
EOF

# app/globals.css
cat << 'EOF' > app/globals.css
@tailwind base;
@tailwind components;
@tailwind utilities;

@keyframes deploy {
  0% { transform: scale(0); }
  100% { transform: scale(1); }
}
EOF

# app/page.tsx
cat << 'EOF' > app/page.tsx
'use client';
import { useState } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();

  const handleAuth = async () => {
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      router.push('/dashboard');
    } catch (error) { 
      console.error(error); 
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 to-red-900 text-white flex items-center justify-center">
      <div className="text-center p-8 bg-black/30 rounded-lg">
        <h1 className="text-4xl font-bold mb-4">Welcome to Clash Royale Kingdom!</h1>
        <p className="mb-6">Build your knowledge empire. Start with a quick quiz to join the clan.</p>
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="mb-2 p-2 rounded w-full" />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="mb-4 p-2 rounded w-full" />
        <button onClick={handleAuth} className="bg-emerald-500 px-6 py-2 rounded mb-4"> {isLogin ? 'Enter Kingdom' : 'Join Clan'}</button>
        <button onClick={() => setIsLogin(!isLogin)} className="text-sm underline">Switch to {isLogin ? 'Sign Up' : 'Login'}</button>
      </div>
    </div>
  );
}
EOF

# app/dashboard/page.tsx (Simplified - add full logic as needed)
cat << 'EOF' > app/dashboard/page.tsx
'use client';
import Link from 'next/link';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-emerald-900 p-4 text-white">
      <h1 className="text-3xl font-bold mb-4">Kingdom Dashboard</h1>
      <Link href="/arena/1" className="bg-red-500 px-4 py-2 rounded">Enter Arena 1</Link>
    </div>
  );
}
EOF

# Placeholder for app/arena/[week]/page.tsx
cat << 'EOF' > app/arena/[week]/page.tsx
export default function Arena({ params }: { params: { week: string } }) {
  return <div>Arena {params.week} - Deploy troops here!</div>;
}
EOF

# Placeholder for app/battle/[week]/[subject]/page.tsx
mkdir -p app/battle/[week]/english  # Example subject
cat << 'EOF' > app/battle/[week]/english/page.tsx
export default function Battle({ params }: { params: { week: string } }) {
  return <div>Battle in {params.week} - English Quiz!</div>;
}
EOF

# app/profile/page.tsx
cat << 'EOF' > app/profile/page.tsx
export default function Profile() {
  return (
    <div className="min-h-screen bg-emerald-900 p-4 text-white">
      <h1>Profile</h1>
      <p>Your badges and clans go here.</p>
    </div>
  );
}
EOF

# public/manifest.json
cat << 'EOF' > public/manifest.json
{
  "name": "Clash Royale Kingdom of Knowledge",
  "short_name": "Royale LMS",
  "icons": [{"src": "/images/icon-192.png", "sizes": "192x192", "type": "image/png"}],
  "start_url": "/",
  "display": "standalone",
  "theme_color": "#00ff00",
  "background_color": "#000000"
}
EOF

# public/sw.js
cat << 'EOF' > public/sw.js
self.addEventListener('install', e => e.waitUntil(caches.open('royale-lms').then(cache => cache.addAll(['/']))));
self.addEventListener('fetch', e => e.respondWith(caches.match(e.request).then(res => res || fetch(e.request))));
EOF

# functions/package.json
cat << 'EOF' > functions/package.json
{
  "name": "functions",
  "scripts": {
    "build": "tsc",
    "serve": "npm run build && firebase emulators:start --only functions",
    "shell": "npm run build && firebase functions:shell",
    "start": "npm run shell",
    "deploy": "firebase deploy --only functions",
    "logs": "firebase functions:log"
  },
  "engines": {
    "node": "18"
  },
  "main": "lib/index.js",
  "dependencies": {
    "firebase-admin": "^12.0.0",
    "firebase-functions": "^5.0.0",
    "@sendgrid/mail": "^7.7.0"
  },
  "devDependencies": {
    "typescript": "^5.0.0"
  },
  "private": true
}
EOF

# functions/index.js (Placeholder for crons)
cat << 'EOF' > functions/index.js
const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

// Add your daily/weekly functions here
exports.hello = functions.https.onRequest((req, res) => {
  res.send('Hello from Functions!');
});
EOF

# scripts/import.js
cat << 'EOF' > scripts/import.js
const { collection, addDoc } = require('firebase/firestore');
const { initializeApp } = require('firebase/app');
const curriculum = require('../src/data/curriculum.json');
// Init app with your config
// const app = initializeApp(/* your config */);
// const db = getFirestore(app);

// (async () => {
//   for (const week of curriculum) {
//     await addDoc(collection(db, 'curriculum'), { ...week, weekNum: parseInt(week.Week) });
//   }
//   console.log('Curriculum imported!');
// })();
console.log('Import script ready - uncomment and configure Firebase.');
EOF

# tsconfig.json (Auto-generated by Next.js, but add for TS)
cat << 'EOF' > tsconfig.json
{
  "compilerOptions": {
    "lib": ["dom", "dom.iterable", "es6"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
EOF

# .gitignore
cat << 'EOF' > .gitignore
node_modules
.next
out
build
.DS_Store
*.local
.env*.local
EOF

# Initialize Git repo
git init
git add .
git commit -m "Initial commit: Clash Royale LMS MVP setup"

echo "Setup complete! Your project is in ./$PROJECT_NAME"
echo "Next steps:"
echo "1. cd $PROJECT_NAME"
echo "2. npm install"
echo "3. Update Firebase config in src/lib/firebase.ts"
echo "4. npm run dev  # Start dev server"
echo "5. git remote add origin <your-repo-url> && git push -u origin main  # Push to your repo"
echo "6. For functions: cd functions && npm install && firebase deploy --only functions"
echo "Expand curriculum.json with full weeks. Clash on!"
