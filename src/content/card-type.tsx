export type CardGameContentType = {
  image: {
    logo: string;
    'card-bg': string;
    'landing-bg': string;
  };
  title: string;
  count: number;
};

export const CARD_GAME_CONTENT = {
  pokemon: {
    image: {
      logo: '/cloud/pokemon/logo.png',
      'card-bg': '/cloud/pokemon/card-bg.png',
      'landing-bg': '/cloud/pokemon/landing-bg.jpeg',
    },
    title: 'Pokemon',
    count: 1100,
  },
  // 'one-piece': {
  //   image: {
  //     logo: '/cloud/one-piece/logo.png',
  //     'card-bg': '/cloud/one-piece/card-bg.png',
  //   },
  //   title: 'One Piece',
  //   count: 200,
  // },
  vanguard: {
    image: {
      logo: '/cloud/vg/logo.png',
      'card-bg': '/cloud/vg/card-bg.png',
      'landing-bg': '/cloud/vg/landing-bg.jpeg',
    },
    title: 'Cardfight!! Vanguard',
    count: 110,
  },
  nba: {
    image: {
      logo: '/cloud/nba/logo1.png',
      'card-bg': '/cloud/nba/card-bg.png',
      'landing-bg': '/cloud/pokemon/landing-bg.jpeg',
    },
    title: 'NBA',
    count: 110,
  },
} satisfies Record<string, CardGameContentType>;

export type GameType = keyof typeof CARD_GAME_CONTENT;
