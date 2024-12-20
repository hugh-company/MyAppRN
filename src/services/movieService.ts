import {movieInterface} from '@types';

export const movies = [
  {
    id: 1,
    name: 'The Shawshank Redemption',
    year: 1994,
    rating: 9.2,
    category: 1,
    duration: '2h 22min',
    genres: ['Drama'],
    likes: 1,
    views: 100000,
    image:
      'https://vcdn1-giaitri.vnecdn.net/2022/03/31/shawshank-redemption-137394414-7901-5918-1648713782.jpg?w=680&h=0&q=100&dpr=1&fit=crop&s=NHDalOvuyN33Ug53_kOC2Q',
  },
  {
    id: 2,
    name: 'The Godfather',
    year: 1972,
    rating: 9.1,
    category: 1,
    duration: '2h 55min',
    likes: 123131,
    genres: ['Crime', 'Drama'],
    views: 1,
    image:
      'https://www.hoasen.edu.vn/wp-content/uploads/2021/11/29a-the-godfather-1972.jpg',
  },
  {
    id: 3,
    name: 'The Dark Knight',
    year: 2008,
    rating: 9.0,
    category: 1,
    duration: '2h 32min',
    genres: ['Action', 'Crime', 'Drama'],
    likes: 1002,
    views: 2,
    image:
      'https://play-lh.googleusercontent.com/qhfncXOqccJ5Y_IBPaRy0O79QZQDl7L5FyKQAsLFICt8c9-2Vfmqd2bniAPESto0ZmSLTOzjl-o1F_jgb2Nr',
  },
  {
    id: 4,
    name: 'Kimetsu no Yaiba Anime (2018)',
    description:
      'Kimetsu no Yaiba Anime (2018) - The setting is Taisho era Japan. Tanjiro is a kindhearted ',
    image:
      'https://cdn.popsww.com/blog/sites/2/2022/01/thanh-guom-diet-quy-review.jpg',
    totalEpisodes: 24,
    currentEpisode: 15,
  },
  {
    id: 5,
    name: 'Attack on Titan',
    image:
      'https://kenh14cdn.com/203336854389633024/2022/1/12/photo-1-16419835990032047201468.jpeg',
    description:
      'Humans fight against giant humanoid creatures known as Titans.',
    views: 12000000,
    likes: 950000,
    episodes: [
      {
        id: 1,
        title: 'To You, in 2000 Years',
        duration: '24m',
        releaseDate: '2013-04-06',
      },
      {id: 2, title: 'That Day', duration: '24m', releaseDate: '2013-04-13'},
    ],
    totalEpisodes: 87,
    currentEpisode: 87,
  },
  {
    id: 6,
    name: 'Jujutsu Kaisen',
    image:
      'https://wibu.com.vn/wp-content/uploads/2024/09/jujutsu-kaisen-rotated.jpg',
    description:
      'Yuji Itadori joins a secret organization to battle curses and uncover secrets.',
    views: 10000000,
    likes: 850000,
    episodes: [
      {
        id: 1,
        title: 'Ryomen Sukuna',
        duration: '24m',
        releaseDate: '2020-10-03',
      },
      {id: 2, title: 'For Myself', duration: '24m', releaseDate: '2020-10-10'},
    ],
    totalEpisodes: 24,
    currentEpisode: 24,
  },
  {
    id: 7,
    name: 'Spy x Family',
    image: 'https://static.zenmarket.jp/images/blog/d1imrav4.xf5',
    description:
      'A spy, an assassin, and a telepath form an unlikely family for a secret mission.',
    views: 8000000,
    likes: 700000,
    episodes: [
      {
        id: 1,
        title: 'Operation Strix',
        duration: '25m',
        releaseDate: '2022-04-09',
      },
      {
        id: 2,
        title: 'Secure a Wife',
        duration: '25m',
        releaseDate: '2022-04-16',
      },
    ],
    totalEpisodes: 25,
    currentEpisode: 25,
  },
  {
    id: 8,
    name: 'One Piece',
    image:
      'https://cdn.tuoitre.vn/zoom/700_390/471584752817336320/2024/10/15/one-piece-egg-head-arc-anime-key-art-1728982505821164134226.jpg',
    description:
      'Monkey D. Luffy and his crew sail to find the legendary One Piece treasure.',
    views: 20000000,
    likes: 1500000,
    episodes: [
      {
        id: 1,
        title: "I'm Luffy! The Man Who's Gonna Be King of the Pirates!",
        duration: '22m',
        releaseDate: '1999-10-20',
      },
      {
        id: 2,
        title: 'Enter the Great Swordsman! Pirate Hunter Roronoa Zoro!',
        duration: '22m',
        releaseDate: '1999-10-27',
      },
    ],
    totalEpisodes: 1070,
    currentEpisode: 1070,
  },
];
export const categoryMovies = [
  {
    id: 1,
    name: 'Tất cả',
  },
  {
    id: 2,
    name: 'Phim lẻ',
  },
  {
    id: 3,
    name: 'Phim bộ',
  },
  {
    id: 4,
    name: 'Phim chiếu rạp',
  },
  {
    id: 5,
    name: 'Phim hoạt hình',
  },
  {
    id: 6,
    name: 'Phim hành động',
  },
  {
    id: 7,
    name: 'Phim kinh dị',
  },
  {
    id: 8,
    name: 'Phim tình cảm',
  },
  {
    id: 9,
    name: 'Phim hài hước',
  },
  {
    id: 10,
    name: 'Phim viễn tưởng',
  },
  {
    id: 11,
    name: 'Phim tâm lý',
  },
  {
    id: 12,
    name: 'Phim hồi hộp',
  },
  {
    id: 13,
    name: 'Phim gia đình',
  },
  {
    id: 14,
    name: 'Phim thần thoại',
  },
  {
    id: 15,
    name: 'Phim cổ trang',
  },
  {
    id: 16,
    name: 'Phim chiến tranh',
  },
  {
    id: 17,
    name: 'Phim thể thao',
  },
  {
    id: 18,
    name: 'Phim âm nhạc',
  },
  {
    id: 19,
    name: 'Phim tài liệu',
  },
  {
    id: 20,
    name: 'Phim chính kịch',
  },
  {
    id: 21,
    name: 'Phim lịch sử',
  },
  {
    id: 22,
    name: 'Phim tội phạm',
  },
  {
    id: 23,
    name: 'Phim trinh thám',
  },
  {
    id: 24,
    name: 'Phim phiêu lưu',
  },
];

export const favoriteMovies = [
  {
    name: 'Hành động',
    data: [
      {
        id: 1,
        name: 'The Shawshank Redemption',
        year: 1994,
        rating: 9.2,
        category: 1,
        duration: '2h 22min',
        genres: ['Drama'],
        likes: 1,
        views: 100000,
        image:
          'https://vcdn1-giaitri.vnecdn.net/2022/03/31/shawshank-redemption-137394414-7901-5918-1648713782.jpg?w=680&h=0&q=100&dpr=1&fit=crop&s=NHDalOvuyN33Ug53_kOC2Q',
      },
      {
        id: 1,
        name: 'One Piece',
        image:
          'https://cdn.tuoitre.vn/zoom/700_390/471584752817336320/2024/10/15/one-piece-egg-head-arc-anime-key-art-1728982505821164134226.jpg',
        year: 1994,
        rating: 9.2,
        category: 1,
        duration: '2h 22min',
        genres: ['Drama'],
        likes: 1,
        views: 100000,
      },
      {
        id: 2,
        name: 'The Godfather',
        year: 1972,
        rating: 9.1,
        category: 1,
        duration: '2h 55min',
        likes: 123131,
        genres: ['Crime', 'Drama'],
        views: 1,
        image:
          'https://www.hoasen.edu.vn/wp-content/uploads/2021/11/29a-the-godfather-1972.jpg',
      },
      {
        id: 3,
        name: 'The Dark Knight',
        year: 2008,
        rating: 9.0,
        category: 1,
        duration: '2h 32min',
        genres: ['Action', 'Crime', 'Drama'],
        likes: 1002,
        views: 2,
        image:
          'https://play-lh.googleusercontent.com/qhfncXOqccJ5Y_IBPaRy0O79QZQDl7L5FyKQAsLFICt8c9-2Vfmqd2bniAPESto0ZmSLTOzjl-o1F_jgb2Nr',
      },
    ],
  },
  {
    name: 'Phưu lưu',
    data: [
      {
        id: 1,
        name: 'The Shawshank Redemption',
        year: 1994,
        rating: 9.2,
        category: 1,
        duration: '2h 22min',
        genres: ['Drama'],
        likes: 1,
        views: 100000,
        image:
          'https://vcdn1-giaitri.vnecdn.net/2022/03/31/shawshank-redemption-137394414-7901-5918-1648713782.jpg?w=680&h=0&q=100&dpr=1&fit=crop&s=NHDalOvuyN33Ug53_kOC2Q',
      },
      {
        id: 2,
        name: 'The Godfather',
        year: 1972,
        rating: 9.1,
        category: 1,
        duration: '2h 55min',
        likes: 123131,
        genres: ['Crime', 'Drama'],
        views: 1,
        image:
          'https://www.hoasen.edu.vn/wp-content/uploads/2021/11/29a-the-godfather-1972.jpg',
      },
      {
        id: 3,
        name: 'The Dark Knight',
        year: 2008,
        rating: 9.0,
        category: 1,
        duration: '2h 32min',
        genres: ['Action', 'Crime', 'Drama'],
        likes: 1002,
        views: 2,
        image:
          'https://play-lh.googleusercontent.com/qhfncXOqccJ5Y_IBPaRy0O79QZQDl7L5FyKQAsLFICt8c9-2Vfmqd2bniAPESto0ZmSLTOzjl-o1F_jgb2Nr',
      },
    ],
  },
];

export const moviesAnimates: movieInterface[] = [
  {
    id: 1,
    name: 'Kimetsu no Yaiba Anime (2018)',
    description:
      'Kimetsu no Yaiba Anime (2018) - The setting is Taisho era Japan. Tanjiro is a kindhearted ',
    image:
      'https://cdn.popsww.com/blog/sites/2/2022/01/thanh-guom-diet-quy-review.jpg',
    totalEpisodes: 24,
    currentEpisode: 15,
  },
  {
    id: 2,
    name: 'Attack on Titan',
    image:
      'https://kenh14cdn.com/203336854389633024/2022/1/12/photo-1-16419835990032047201468.jpeg',
    description:
      'Humans fight against giant humanoid creatures known as Titans.',
    views: 12000000,
    likes: 950000,
    episodes: [
      {
        id: 1,
        title: 'To You, in 2000 Years',
        duration: '24m',
        releaseDate: '2013-04-06',
      },
      {id: 2, title: 'That Day', duration: '24m', releaseDate: '2013-04-13'},
    ],
    totalEpisodes: 87,
    currentEpisode: 87,
  },
  {
    id: 4,
    name: 'Jujutsu Kaisen',
    image:
      'https://wibu.com.vn/wp-content/uploads/2024/09/jujutsu-kaisen-rotated.jpg',
    description:
      'Yuji Itadori joins a secret organization to battle curses and uncover secrets.',
    views: 10000000,
    likes: 850000,
    episodes: [
      {
        id: 1,
        title: 'Ryomen Sukuna',
        duration: '24m',
        releaseDate: '2020-10-03',
      },
      {id: 2, title: 'For Myself', duration: '24m', releaseDate: '2020-10-10'},
    ],
    totalEpisodes: 24,
    currentEpisode: 24,
  },
  {
    id: 5,
    name: 'Spy x Family',
    image: 'https://static.zenmarket.jp/images/blog/d1imrav4.xf5',
    description:
      'A spy, an assassin, and a telepath form an unlikely family for a secret mission.',
    views: 8000000,
    likes: 700000,
    episodes: [
      {
        id: 1,
        title: 'Operation Strix',
        duration: '25m',
        releaseDate: '2022-04-09',
      },
      {
        id: 2,
        title: 'Secure a Wife',
        duration: '25m',
        releaseDate: '2022-04-16',
      },
    ],
    totalEpisodes: 25,
    currentEpisode: 25,
  },
  {
    id: 6,
    name: 'One Piece',
    image:
      'https://cdn.tuoitre.vn/zoom/700_390/471584752817336320/2024/10/15/one-piece-egg-head-arc-anime-key-art-1728982505821164134226.jpg',
    description:
      'Monkey D. Luffy and his crew sail to find the legendary One Piece treasure.',
    views: 20000000,
    likes: 1500000,
    episodes: [
      {
        id: 1,
        title: "I'm Luffy! The Man Who's Gonna Be King of the Pirates!",
        duration: '22m',
        releaseDate: '1999-10-20',
      },
      {
        id: 2,
        title: 'Enter the Great Swordsman! Pirate Hunter Roronoa Zoro!',
        duration: '22m',
        releaseDate: '1999-10-27',
      },
    ],
    totalEpisodes: 1070,
    currentEpisode: 1070,
  },
];
export const getMoviesApi = () => {
  return movies;
};

export const getCategoryMoviesApi = () => {
  return categoryMovies;
};
