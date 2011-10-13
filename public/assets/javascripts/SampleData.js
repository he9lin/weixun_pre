window.SampleAuthors = {
  A: {
    name: "刘麟麟",
    avatar_url: "assets/images/avatars/tou8_2.png"
  },
  B: {
    name: '陈拉',
    avatar_url: 'assets/images/avatars/tou1_2.png'
  },
  C: {
    name: '袁衣衣',
    avatar_url: 'assets/images/avatars/tou4_2.png'
  },
  D: {
    name: '刘崇杰',
    avatar_url: 'assets/images/avatars/tou5_2.png'    
  },
  E: {
    name: '陈赫赫',
    avatar_url: 'assets/images/avatars/tou6_2.png'    
  },
};

window.SampleData = {
  videos: [
    {
      title: "耶鲁公开课",
      cover_thumb_url: "assets/images/avatars/missing.png",
      author_name: "Shit",
      summary: "Shittty"
    },
    {
      title: "麻省理工公开课",
      cover_thumb_url: "assets/images/avatars/missing.png",
      author_name: "Shit",
      summary: "Shittty"
    },
    {
      title: "麻省理工公开课2",
      cover_thumb_url: "assets/images/avatars/missing.png",
      author_name: "Shit",
      summary: "Shittty"
    },
    {
      title: "麻省理工公开课3",
      cover_thumb_url: "assets/images/avatars/missing.png",
      author_name: "Shit",
      summary: "Shittty"
    },
  ],
  contacts: [
    {
      name: '陈拉',
      title: '影视明星',
      alphabet: 'C',
      cell: '13250523197',
      email: 'chenla@stars.com',
      avatar_url: 'assets/images/avatars/tou1_2.png'
    },
    {
      name: '袁衣衣',
      title: '美国得力奢侈品公司成都地区总监',
      alphabet: 'Y',
      cell: '18519840624',
      email: 'yuanyiyi@deli.com',
      avatar_url: 'assets/images/avatars/tou4_2.png'
    },
    {
      name: '刘崇杰',
      title: '特邀记者',
      alphabet: 'L',
      cell: '13898972288',
      email: 'liuchongjie@media.com',
      avatar_url: 'assets/images/avatars/tou5_2.png'
    },
    {
      name: '陈赫赫',
      title: '四川大学影视学院',
      alphabet: 'C',
      cell: '18967653565',
      email: 'chenhh@sichuan.com',
      avatar_url: 'assets/images/avatars/tou6_2.png'
    },
    {
      name: '刘麟麟',
      title: 'Heyook设计部设计师',
      alphabet: 'L',
      cell: '18923256532',
      email: 'liuqilin@dreamworks.com',
      avatar_url: 'assets/images/avatars/tou8_2.png'
    }
  ],
  feeds: [
    {
      timestamp: "2011-11-18 08:37:00",
      content: "A wonderful life.",
      author: window.SampleAuthors.A,
      type: "photo",
      photo_thumb_url: "assets/images/feeds/feed_photo_1s.png",
      photo_url: "assets/images/feeds/feed_photo_1.png",
      comments: [
        {
          timestamp: "2011-11-18 08:37:15",
          content: "Yes, it is.",
          author: window.SampleAuthors.B,
        },
        {
          timestamp: "2011-11-18 08:37:35",
          content: "Sure...",
          author: window.SampleAuthors.C,
        },
      ]
    }, 
    {
      timestamp: "2011-11-18 08:37:00",
      content: "A wonderful life.",
      author: {
        name: "Davis",
        avatar_url: "assets/images/avatars/missing.png"
      },
      comments: [
        {
          timestamp: "2011-11-18 08:37:15",
          content: "Yes, it is.",
          author: {
            name: "Maggie",
            avatar_url: "assets/images/avatars/missing.png"
          },
        },
        {
          timestamp: "2011-11-18 08:37:35",
          content: "Sure...",
          author: {
            name: "Lisa",
            avatar_url: "assets/images/avatars/missing.png"
          },
        },
      ]
    },
  ],
  authors: [
    window.SampleAuthors.A,
    window.SampleAuthors.B,
    window.SampleAuthors.C,
    window.SampleAuthors.D,
    window.SampleAuthors.E,
  ],
  books: [
    {
      title: "Rich Dad, Poor Dad",
      sub_title: "How to get rich from the beginning",
      summary: "The book is largely based on Kiyosaki's upbringing and education in Hawaii. The book highlights the different attitudes to money, work and life of two men, and how they in turn influenced key decisions in Kiyosaki's life.",
      author_name: "Davis",
      timestamp: "2011-11-18 08:37:45",
      cover_thumb_url: "assets/images/books/rdpd_thumb.png",
      cover_url: "assets/images/books/rdpd.png",
      pages: [
        {
          url: "assets/images/pages/1.png"
        },
        {
          url: "assets/images/pages/2.png"
        }
      ]
    },
    {
      title: "Rich Dad, Poor Dad 2",
      sub_title: "How to get rich from the beginning",
      summary: "The book is largely based on Kiyosaki's upbringing and education in Hawaii. The book highlights the different attitudes to money, work and life of two men, and how they in turn influenced key decisions in Kiyosaki's life.",
      author_name: "Davis",
      timestamp: "2011-11-18 08:37:45",
      cover_thumb_url: "assets/images/books/rdpd_thumb.png",
      cover_url: "assets/images/books/rdpd.png",
      pages: [
        {
          url: "assets/images/pages/1.png"
        },
        {
          url: "assets/images/pages/2.png"
        }
      ]
    },
  ]
}