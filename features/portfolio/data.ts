import { unsplashImage } from '@/lib/images';

export type PortfolioCategory =
  | 'Hair'
  | 'Nails'
  | 'Makeup'
  | 'Skincare'
  | 'Lashes';

export interface PortfolioItem {
  id: string;
  category: PortfolioCategory;
  service: string;
  technician: string;
  /** Result shown by default. */
  after: string;
  /** Revealed via the compare toggle. */
  before: string;
}

export const PORTFOLIO_CATEGORIES: PortfolioCategory[] = [
  'Hair',
  'Nails',
  'Makeup',
  'Skincare',
  'Lashes',
];

const img = (id: string) => unsplashImage(id, 800, 800);

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: '1',
    category: 'Hair',
    service: 'Balayage & Cut',
    technician: 'Sarah Johnson',
    after: img('1560869713-7d0a29430803'),
    before: img('1522337660859-02fbefca4702'),
  },
  {
    id: '2',
    category: 'Nails',
    service: 'Gel Manicure',
    technician: 'Maria Garcia',
    after: img('1604654894610-df63bc536371'),
    before: img('1519014816548-bf5fe059798b'),
  },
  {
    id: '3',
    category: 'Makeup',
    service: 'Bridal Makeup',
    technician: 'Emily Chen',
    after: img('1596462502278-27bfdc403348'),
    before: img('1512496015851-a90fb38ba796'),
  },
  {
    id: '4',
    category: 'Skincare',
    service: 'Glow Facial',
    technician: 'Jessica Williams',
    after: img('1570172619644-dfd03ed5d881'),
    before: img('1498843053639-170ff2122f35'),
  },
  {
    id: '5',
    category: 'Hair',
    service: 'Color Correction',
    technician: 'Sarah Johnson',
    after: img('1519699047748-de8e457a634e'),
    before: img('1521490683712-35a1cb235d1c'),
  },
  {
    id: '6',
    category: 'Lashes',
    service: 'Volume Lash Extensions',
    technician: 'Emily Chen',
    after: img('1583241800698-9c2e0c8a5d8e'),
    before: img('1512290923902-8a9f81dc236c'),
  },
  {
    id: '7',
    category: 'Nails',
    service: 'Nail Art Set',
    technician: 'Maria Garcia',
    after: img('1607779097040-26e80aa78e66'),
    before: img('1519014816548-bf5fe059798b'),
  },
  {
    id: '8',
    category: 'Makeup',
    service: 'Editorial Glam',
    technician: 'Emily Chen',
    after: img('1487412947147-5cebf100ffc2'),
    before: img('1512496015851-a90fb38ba796'),
  },
  {
    id: '9',
    category: 'Hair',
    service: 'Blowout & Styling',
    technician: 'Sarah Johnson',
    after: img('1595476108010-b4d1f102b1b1'),
    before: img('1522337660859-02fbefca4702'),
  },
];
