export interface NavLink {
  label: string;
  href: string;
}

export const navLinks: NavLink[] = [
  { label: 'Explorer', href: '/explorer' },
  { label: 'Categories', href: '/categories' },
  { label: 'Complexity', href: '/complexities' },
  { label: 'Bookmarks', href: '/bookmarks' },
  { label: 'Progress', href: '/progress' },
  { label: 'About', href: '/about' },
];
