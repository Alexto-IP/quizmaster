export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  questions: Question[];
  color: string;
  gradient: string;
  image: string;
}

export const quizzes: Quiz[] = [
  {
    id: 'general-knowledge',
    title: 'General Knowledge',
    description: 'Test your knowledge across various topics!',
    category: 'Mixed',
    difficulty: 'Medium',
    color: '#FF6B6B',
    gradient: 'from-pink-500 to-rose-500',
    image: 'https://images.unsplash.com/photo-1661353047947-ff735c58c683?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cml2aWElMjBnYW1lJTIwcXVlc3Rpb25zfGVufDF8fHx8MTc3NTUwMTkyMnww&ixlib=rb-4.1.0&q=80&w=1080',
    questions: [
      {
        id: 1,
        question: 'What is the capital of France?',
        options: ['London', 'Berlin', 'Paris', 'Madrid'],
        correctAnswer: 2,
      },
      {
        id: 2,
        question: 'Which planet is known as the Red Planet?',
        options: ['Venus', 'Mars', 'Jupiter', 'Saturn'],
        correctAnswer: 1,
      },
      {
        id: 3,
        question: 'Who painted the Mona Lisa?',
        options: ['Vincent van Gogh', 'Pablo Picasso', 'Leonardo da Vinci', 'Michelangelo'],
        correctAnswer: 2,
      },
      {
        id: 4,
        question: 'What is the largest ocean on Earth?',
        options: ['Atlantic Ocean', 'Indian Ocean', 'Arctic Ocean', 'Pacific Ocean'],
        correctAnswer: 3,
      },
      {
        id: 5,
        question: 'In what year did World War II end?',
        options: ['1943', '1944', '1945', '1946'],
        correctAnswer: 2,
      },
    ],
  },
  {
    id: 'science-tech',
    title: 'Science & Technology',
    description: 'Explore the wonders of science and modern tech!',
    category: 'Science',
    difficulty: 'Hard',
    color: '#4ECDC4',
    gradient: 'from-cyan-500 to-blue-500',
    image: 'https://images.unsplash.com/photo-1773236376078-c51cba503832?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2llbmNlJTIwdGVjaG5vbG9neSUyMG1vZGVybnxlbnwxfHx8fDE3NzU1MDE5MjR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    questions: [
      {
        id: 1,
        question: 'What is the speed of light in vacuum?',
        options: ['299,792 km/s', '199,792 km/s', '399,792 km/s', '99,792 km/s'],
        correctAnswer: 0,
      },
      {
        id: 2,
        question: 'What does DNA stand for?',
        options: [
          'Deoxyribonucleic Acid',
          'Dinitrogen Acid',
          'Dynamic Nuclear Acid',
          'Dextrose Nucleic Acid',
        ],
        correctAnswer: 0,
      },
      {
        id: 3,
        question: 'Who is known as the father of modern physics?',
        options: ['Isaac Newton', 'Albert Einstein', 'Niels Bohr', 'Stephen Hawking'],
        correctAnswer: 1,
      },
      {
        id: 4,
        question: 'What is the smallest unit of life?',
        options: ['Atom', 'Molecule', 'Cell', 'Organ'],
        correctAnswer: 2,
      },
      {
        id: 5,
        question: 'Which programming language was developed by James Gosling?',
        options: ['Python', 'JavaScript', 'Java', 'C++'],
        correctAnswer: 2,
      },
    ],
  },
  {
    id: 'geography',
    title: 'World Geography',
    description: 'Travel the world from your screen!',
    category: 'Geography',
    difficulty: 'Medium',
    color: '#95E1D3',
    gradient: 'from-emerald-500 to-teal-500',
    image: 'https://images.unsplash.com/photo-1685850749074-9cf8023d7e8d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b3JsZCUyMHRyYXZlbCUyMGRlc3RpbmF0aW9ufGVufDF8fHx8MTc3NTUwMTkyNXww&ixlib=rb-4.1.0&q=80&w=1080',
    questions: [
      {
        id: 1,
        question: 'What is the longest river in the world?',
        options: ['Amazon River', 'Nile River', 'Yangtze River', 'Mississippi River'],
        correctAnswer: 1,
      },
      {
        id: 2,
        question: 'Which country has the most natural lakes?',
        options: ['United States', 'Russia', 'Canada', 'Brazil'],
        correctAnswer: 2,
      },
      {
        id: 3,
        question: 'What is the smallest country in the world?',
        options: ['Monaco', 'Vatican City', 'San Marino', 'Liechtenstein'],
        correctAnswer: 1,
      },
      {
        id: 4,
        question: 'Mount Everest is located in which mountain range?',
        options: ['Andes', 'Alps', 'Himalayas', 'Rockies'],
        correctAnswer: 2,
      },
      {
        id: 5,
        question: 'Which desert is the largest in the world?',
        options: ['Sahara Desert', 'Arabian Desert', 'Gobi Desert', 'Antarctic Desert'],
        correctAnswer: 3,
      },
    ],
  },
  {
    id: 'pop-culture',
    title: 'Pop Culture',
    description: 'How well do you know movies, music, and trends?',
    category: 'Entertainment',
    difficulty: 'Easy',
    color: '#FFE66D',
    gradient: 'from-yellow-500 to-orange-500',
    image: 'https://images.unsplash.com/photo-1639493115941-a70fcef4f715?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGNvbG9yZnVsJTIwZ3JhZGllbnQlMjBiYWNrZ3JvdW5kfGVufDF8fHx8MTc3NTQ2NjkyMHww&ixlib=rb-4.1.0&q=80&w=1080',
    questions: [
      {
        id: 1,
        question: 'Which movie won the Oscar for Best Picture in 2020?',
        options: ['1917', 'Joker', 'Parasite', 'Once Upon a Time in Hollywood'],
        correctAnswer: 2,
      },
      {
        id: 2,
        question: 'Who is known as the "King of Pop"?',
        options: ['Elvis Presley', 'Michael Jackson', 'Prince', 'Freddie Mercury'],
        correctAnswer: 1,
      },
      {
        id: 3,
        question: 'What is the highest-grossing film of all time?',
        options: ['Avatar', 'Avengers: Endgame', 'Titanic', 'Star Wars: The Force Awakens'],
        correctAnswer: 0,
      },
      {
        id: 4,
        question: 'Which streaming service created "Stranger Things"?',
        options: ['Hulu', 'Amazon Prime', 'Netflix', 'Disney+'],
        correctAnswer: 2,
      },
      {
        id: 5,
        question: 'Who painted the ceiling of the Sistine Chapel?',
        options: ['Leonardo da Vinci', 'Raphael', 'Michelangelo', 'Donatello'],
        correctAnswer: 2,
      },
    ],
  },
  {
    id: 'sports',
    title: 'Sports Trivia',
    description: 'Are you a true sports fanatic?',
    category: 'Sports',
    difficulty: 'Medium',
    color: '#A78BFA',
    gradient: 'from-purple-500 to-indigo-500',
    image: 'https://images.unsplash.com/photo-1661353047947-ff735c58c683?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cml2aWElMjBnYW1lJTIwcXVlc3Rpb25zfGVufDF8fHx8MTc3NTUwMTkyMnww&ixlib=rb-4.1.0&q=80&w=1080',
    questions: [
      {
        id: 1,
        question: 'How many players are on a soccer team on the field?',
        options: ['9', '10', '11', '12'],
        correctAnswer: 2,
      },
      {
        id: 2,
        question: 'In which sport would you perform a slam dunk?',
        options: ['Volleyball', 'Basketball', 'Tennis', 'Baseball'],
        correctAnswer: 1,
      },
      {
        id: 3,
        question: 'How many Grand Slam tournaments are there in tennis?',
        options: ['3', '4', '5', '6'],
        correctAnswer: 1,
      },
      {
        id: 4,
        question: 'What is the diameter of a basketball hoop in inches?',
        options: ['16 inches', '18 inches', '20 inches', '22 inches'],
        correctAnswer: 1,
      },
      {
        id: 5,
        question: 'Which country has won the most FIFA World Cups?',
        options: ['Germany', 'Argentina', 'Brazil', 'Italy'],
        correctAnswer: 2,
      },
    ],
  },
  {
    id: 'history',
    title: 'History Challenge',
    description: 'Journey through time and test your historical knowledge!',
    category: 'History',
    difficulty: 'Hard',
    color: '#F87171',
    gradient: 'from-red-500 to-pink-500',
    image: 'https://images.unsplash.com/photo-1773236376078-c51cba503832?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2llbmNlJTIwdGVjaG5vbG9neSUyMG1vZGVybnxlbnwxfHx8fDE3NzU1MDE5MjR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    questions: [
      {
        id: 1,
        question: 'Who was the first President of the United States?',
        options: ['Thomas Jefferson', 'George Washington', 'John Adams', 'Benjamin Franklin'],
        correctAnswer: 1,
      },
      {
        id: 2,
        question: 'In which year did the Berlin Wall fall?',
        options: ['1987', '1988', '1989', '1990'],
        correctAnswer: 2,
      },
      {
        id: 3,
        question: 'What ancient wonder was located in Alexandria?',
        options: [
          'Hanging Gardens',
          'Colossus of Rhodes',
          'Lighthouse of Alexandria',
          'Temple of Artemis',
        ],
        correctAnswer: 2,
      },
      {
        id: 4,
        question: 'Who wrote "The Communist Manifesto"?',
        options: [
          'Vladimir Lenin',
          'Joseph Stalin',
          'Karl Marx and Friedrich Engels',
          'Leon Trotsky',
        ],
        correctAnswer: 2,
      },
      {
        id: 5,
        question: 'What year did the Titanic sink?',
        options: ['1910', '1911', '1912', '1913'],
        correctAnswer: 2,
      },
    ],
  },
];
