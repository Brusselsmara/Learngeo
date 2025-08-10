import brFlag from '@/assets/flags/br.png';
import jpFlag from '@/assets/flags/jp.png';
import deFlag from '@/assets/flags/de.png';
import inFlag from '@/assets/flags/in.png';
import caFlag from '@/assets/flags/ca.png';
import auFlag from '@/assets/flags/au.png';
import frFlag from '@/assets/flags/fr.png';
import keFlag from '@/assets/flags/ke.png';

export type Difficulty = 'easy' | 'medium' | 'hard';

export interface Question {
  id: string;
  prompt: string;
  options: string[];
  correctIndex: number;
  fact: string;
  difficulty: Difficulty;
  imageSrc?: string;
  imageAlt?: string;
}

export const QUESTIONS: Question[] = [
  // Easy: Countries & capitals
  {
    id: 'e1',
    prompt: 'What is the capital of Brazil?',
    options: ['Rio de Janeiro', 'São Paulo', 'Brasília', 'Salvador'],
    correctIndex: 2,
    fact: "Brazil’s capital is Brasília, inaugurated in 1960 to promote development in the interior.",
    difficulty: 'easy',
  },
  {
    id: 'e2',
    prompt: 'What is the capital of Canada?',
    options: ['Toronto', 'Vancouver', 'Ottawa', 'Montreal'],
    correctIndex: 2,
    fact: 'Ottawa sits on the Ottawa River and is home to Canada’s Parliament Hill.',
    difficulty: 'easy',
  },
  {
    id: 'e3',
    prompt: 'What is the capital of Germany?',
    options: ['Munich', 'Hamburg', 'Berlin', 'Frankfurt'],
    correctIndex: 2,
    fact: 'Berlin, once divided by a wall, is now a major European cultural and tech hub.',
    difficulty: 'easy',
  },
  {
    id: 'e4',
    prompt: 'What is the capital of India?',
    options: ['Mumbai', 'New Delhi', 'Kolkata', 'Bengaluru'],
    correctIndex: 1,
    fact: 'New Delhi was designed by British architects Edwin Lutyens and Herbert Baker.',
    difficulty: 'easy',
  },
  {
    id: 'e5',
    prompt: 'What is the capital of Australia?',
    options: ['Sydney', 'Melbourne', 'Perth', 'Canberra'],
    correctIndex: 3,
    fact: 'Canberra was chosen as a compromise between Sydney and Melbourne in 1908.',
    difficulty: 'easy',
  },

  // Medium: Flags & landmarks
  {
    id: 'm1',
    prompt: 'Which country has this flag?',
    options: ['Japan', 'South Korea', 'China', 'Vietnam'],
    correctIndex: 0,
    fact: 'Japan’s flag, the Hinomaru, features a red circle symbolizing the sun.',
    difficulty: 'medium',
    imageSrc: jpFlag,
    imageAlt: 'Flag of Japan',
  },
  {
    id: 'm2',
    prompt: 'Which country has this flag?',
    options: ['Portugal', 'Spain', 'Brazil', 'Mexico'],
    correctIndex: 2,
    fact: 'Brazil’s flag features a starry globe with the motto “Ordem e Progresso.”',
    difficulty: 'medium',
    imageSrc: brFlag,
    imageAlt: 'Flag of Brazil',
  },
  {
    id: 'm3',
    prompt: 'Which country has this flag?',
    options: ['Germany', 'Belgium', 'Austria', 'Netherlands'],
    correctIndex: 0,
    fact: 'Germany’s flag uses horizontal black, red, and gold stripes, symbolizing unity and freedom.',
    difficulty: 'medium',
    imageSrc: deFlag,
    imageAlt: 'Flag of Germany',
  },
  {
    id: 'm4',
    prompt: 'The Eiffel Tower is located in which city?',
    options: ['Rome', 'Paris', 'Madrid', 'Vienna'],
    correctIndex: 1,
    fact: 'The Eiffel Tower was built for the 1889 World’s Fair and was once the tallest structure on Earth.',
    difficulty: 'medium',
  },
  {
    id: 'm5',
    prompt: 'The Great Barrier Reef lies off the coast of which country?',
    options: ['South Africa', 'Australia', 'Indonesia', 'New Zealand'],
    correctIndex: 1,
    fact: 'The Great Barrier Reef is the world’s largest coral reef system, visible from space.',
    difficulty: 'medium',
    imageSrc: auFlag,
    imageAlt: 'Flag of Australia',
  },
  {
    id: 'm6',
    prompt: 'Which country has this flag?',
    options: ['France', 'Italy', 'Netherlands', 'Luxembourg'],
    correctIndex: 0,
    fact: 'France’s tricolor flag of blue, white, and red dates back to the French Revolution.',
    difficulty: 'medium',
    imageSrc: frFlag,
    imageAlt: 'Flag of France',
  },

  // Hard: Map-based location style
  {
    id: 'h1',
    prompt: 'Which country is an island nation in East Asia known as the “Land of the Rising Sun”?',
    options: ['Philippines', 'Japan', 'Taiwan', 'Indonesia'],
    correctIndex: 1,
    fact: 'Japan consists of four main islands—Honshu, Hokkaido, Kyushu, and Shikoku—and many smaller ones.',
    difficulty: 'hard',
    imageSrc: jpFlag,
    imageAlt: 'Flag hint for Japan',
  },
  {
    id: 'h2',
    prompt: 'Which country forms a boot-shaped peninsula extending into the Mediterranean Sea?',
    options: ['Greece', 'Italy', 'Turkey', 'Croatia'],
    correctIndex: 1,
    fact: 'Italy’s distinctive shape is easily spotted on maps; its capital is Rome.',
    difficulty: 'hard',
  },
  {
    id: 'h3',
    prompt: 'Which country lies to the east of China across the Sea of Japan?',
    options: ['South Korea', 'Japan', 'Russia', 'Mongolia'],
    correctIndex: 1,
    fact: 'Japan’s main islands arc along the Pacific “Ring of Fire,” leading to frequent seismic activity.',
    difficulty: 'hard',
  },
  {
    id: 'h4',
    prompt: 'Which country is landlocked between Spain and France in the Pyrenees?',
    options: ['Liechtenstein', 'Andorra', 'Monaco', 'San Marino'],
    correctIndex: 1,
    fact: 'Andorra is a microstate known for ski resorts and duty-free shopping.',
    difficulty: 'hard',
  },
  {
    id: 'h5',
    prompt: 'Which African country lies along the equator and is famous for the Maasai Mara reserve?',
    options: ['Kenya', 'Ghana', 'Ethiopia', 'Tanzania'],
    correctIndex: 0,
    fact: 'Kenya’s Great Rift Valley and savannas host diverse wildlife, including the “Big Five.”',
    difficulty: 'hard',
    imageSrc: keFlag,
    imageAlt: 'Flag hint for Kenya',
  },
  {
    id: 'h6',
    prompt: 'Which country’s capital, Ottawa, lies in the province of Ontario near Quebec?',
    options: ['United States', 'Canada', 'Iceland', 'Norway'],
    correctIndex: 1,
    fact: 'Canada spans six time zones and is the world’s second-largest country by area.',
    difficulty: 'hard',
    imageSrc: caFlag,
    imageAlt: 'Flag hint for Canada',
  },
];

export const QUESTIONS_PER_GAME = 10;
