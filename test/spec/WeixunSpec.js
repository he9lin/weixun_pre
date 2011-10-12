var authorData = [
  {
    "name": "Davis",
    "avatar_url": "images/panda.png"
  },
];

var feedVideoData = [
  {
    timestamp: "2011-11-18 08:37:00",
    content: "A wonderful visual life.",
    type: "video",
    author: {
      name: "Davis"
    },
  }
];

var feedData = [
  {
    timestamp: "2011-11-18 08:37:00",
    content: "A wonderful life.",
    author: {
      name: "Davis"
    },
    comments: [
      {
        timestamp: "2011-11-18 08:37:15",
        content: "Yes, it is.",
        author: {
          name: "Maggie"
        },
      },
      {
        timestamp: "2011-11-18 08:37:35",
        content: "Sure...",
        author: {
          name: "Lisa"
        },
      },
    ]
  }
];

var bookData = [
  {
    title: "Rich Dad, Poor Dad",
    subTitle: "How to get rich from the beginning",
    authorName: "Davis",
    timestamp: "2011-11-18 08:37:45",
    pages: [
      {
        url: "assets/images/pages/1.png"
      },
      {
      }
    ]
  }
];

describe("Author", function() {

  beforeEach(function() {
    this.author = new Author(authorData[0]);
  });
  
  it("creates from data", function () {
    expect(this.author.get('name')).toEqual("Davis");
  });
  
  it("displays a default avatar if it's missing", function() {
    this.author = new Author({});
    expect(this.author.get("avatar_url")).toEqual("assets/images/avatar/missing.png");
  });
  
});

//type, image_thumb_url, image_url, video_thumb_url, video_url
describe("Feed", function() {
  beforeEach(function() {
    this.feed = new Feed(feedData[0]);
  });
  
  it("creates from data", function() {
    expect(this.feed.get("timestamp")).toEqual("2011-11-18 08:37:00");
  }); 
  
  it("has an author", function() {
    expect(this.feed.author.get("name")).toEqual("Davis");
  });
  
  it("has a collection of comments", function() {
    expect(this.feed.comments.length).toEqual(2);
  });
  
  it("defaults as text type", function() {
    expect(this.feed.get("type")).toEqual("text");
  });
  
  it("has different types", function() {
    this.feed = new Feed(feedVideoData[0]);
    expect(this.feed.get("type")).toEqual("video");
  });
});

describe("Book", function() {
  beforeEach(function() {
    this.book = new Book(bookData[0]);
  });
  
  it("creates from data", function() {
    expect(this.book.get("timestamp")).toEqual("2011-11-18 08:37:45");
  });
  
  it("defaults 0 rating", function() {
    expect(this.book.get("rating")).toEqual(0);
  });
  
  it("has a collection of pages", function() {
    expect(this.book.pages.length).toEqual(2);
  });
  
  it("displays missing png for pages with no url", function() {
    expect(this.book.pages.at(0).get("url")).toEqual("assets/images/pages/1.png");
    expect(this.book.pages.at(1).get("url")).toEqual("assets/images/pages/missing.png");
  });
});

describe("BookPlayer", function() {
  beforeEach(function() {
    this.bookPlayer = new BookPlayer({book: new Book(bookData[0])}); //TODO: book
  });  

  it("starts with page at index 0", function() {
    expect(this.bookPlayer.get("currentPageIndex")).toEqual(0);
  });

  it("has a current page", function() {
    expect(this.bookPlayer.currentPage().get("url")).toEqual("assets/images/pages/1.png");
  });

  describe("while viewing", function() {
    beforeEach(function() {
      this.bookPlayer.book.pages.add({
        url: "assets/images/pages/2.png"
      });
    
      this.bookPlayer.book.pages.add({
        url: "assets/images/pages/0.png"
      }, { at: 0 });
    });
  
    it("goes to next page", function() {
      this.bookPlayer.nextPage();
      expect(this.bookPlayer.currentPage().get("url")).toEqual("assets/images/pages/1.png");
    });
  
    it("goes to previous page", function() {
      this.bookPlayer.previousPage();
      expect(this.bookPlayer.currentPage().get("url")).toEqual("assets/images/pages/0.png");
    });
  });
});

describe("BookShelfPlayer", function() {
  beforeEach(function() {
    this.bookShelfPlayer = new BookShelfPlayer();
  });
  
  describe("with no books", function() {
    it("starts with book at index 0", function() {
      expect(this.bookShelfPlayer.get("currentBookIndex")).toEqual(0);
    });
  });
  
  describe("with added books", function() {
    beforeEach(function() {
      this.bookShelfPlayer.bookShelf.add(bookData);
    });
    
    it("has a book shelf", function() {
      expect(this.bookShelfPlayer.bookShelf.models.length).toEqual(1);
    });

    it("has a current book", function() {
      expect(this.bookShelfPlayer.currentBook().get("title")).toEqual("Rich Dad, Poor Dad");
    });
    
    describe("while viewing", function() {
      it("sets current book by cid", function() {
        this.bookShelfPlayer.bookShelf.add({
          title: "Another book",
        });
        
        var newBook = this.bookShelfPlayer.bookShelf.at(1);
        this.bookShelfPlayer.setCurrentBookByCid(newBook.cid);
        expect(this.bookShelfPlayer.currentBook().get('title')).toEqual("Another book");
      })
    });
  });
});

// describe("Playlist", function() {
//   
//   beforeEach(function() {
//       this.playlist = new Playlist();
//       this.playlist.add(albumData[0]);
//   });
//   
//   it("has models", function () {
//       expect(this.playlist.models.length).toEqual(1);
//   });
//   
//   it("identifies first album as first", function() {
//       expect(this.playlist.isFirstAlbum(0)).toBeTruthy();
//   });
// 
//   it("rejects non-first album as first", function() {
//       expect(this.playlist.isFirstAlbum(1)).toBeFalsy();
//   });
// 
//   it("identifies last album as last", function() {
//       this.playlist.add(albumData[1]); // Extra album as the last
//       expect(this.playlist.isLastAlbum(1)).toBeTruthy();
//   });
// 
//   it("rejects non-last album as last", function() {
//       this.playlist.add(albumData[1]); // Extra album as the last
//       expect(this.playlist.isLastAlbum(0)).toBeFalsy();
//   });
//     
// });
// 
// describe("Player", function () {
// 
//     describe("with no items", function () {
// 
//         beforeEach(function () {
//             this.player = new Player();
//         });
// 
//         it("starts with album 0", function () {
//             expect(this.player.get('currentAlbumIndex')).toEqual(0);
//         });
// 
//         it("starts with track 0", function () {
//             expect(this.player.get('currentTrackIndex')).toEqual(0);
//         });
// 
//     });
// 
//     describe("with added album", function () {
// 
//         beforeEach(function () {
//             this.player = new Player();
//             this.player.playlist.add(albumData[0]);
//         });
// 
//         it("is in 'stop' state", function () {
//             expect(this.player.get('state')).toEqual('stop');
//         });
//         
//         it("is stopped", function() {
//             expect(this.player.isStopped()).toBeTruthy();
//         });
// 
//         describe("while playing", function () {
// 
//             beforeEach(function () {
//                 this.player.play();
//             });
// 
//             it("sets to 'play' state", function () {
//                 expect(this.player.get('state')).toEqual('play');
//             });
// 
//             it("is playing", function() {
//                 expect(this.player.isPlaying()).toBeTruthy();
//             });
// 
//             it("has a current album", function () {
//                 expect(this.player.currentAlbum().get('title'))
//                     .toEqual('Album A');
//             });
// 
//             it("has a current track URL", function () {
//                 expect(this.player.currentTrackUrl())
//                     .toEqual("/music/Album A Track A.mp3");
//             });
// 
//             it("pauses", function() {
//                 this.player.pause();
//                 expect(this.player.get('state')).toEqual('pause');
//             });
// 
//             describe("next track", function () {
// 
//                 beforeEach(function() {
//                     // Add extra album to test 'next'
//                     this.player.playlist.add(albumData[1]);
//                 });
// 
//                 it("increments within an album", function () {
//                     this.player.nextTrack();
// 
//                     expect(this.player.get('currentAlbumIndex')).toEqual(0);
//                     expect(this.player.get('currentTrackIndex')).toEqual(1);
//                 });
// 
//                 it("goes to the next album", function () {
//                     this.player.set({'currentTrackIndex': 1}); // Last track
//                     this.player.nextTrack();
//                     
//                     expect(this.player.get('currentAlbumIndex')).toEqual(1);
//                     expect(this.player.get('currentTrackIndex')).toEqual(0);
//                 });
// 
//                 it("wraps around to the first album if at end", function () {
//                     this.player.set({'currentAlbumIndex': 1}); // Last album
//                     this.player.set({'currentTrackIndex': 1}); // Last track
//                     this.player.nextTrack();
//                     
//                     expect(this.player.get('currentAlbumIndex')).toEqual(0);
//                     expect(this.player.get('currentTrackIndex')).toEqual(0);
//                 });
// 
//             });
// 
//             describe("previous track", function () {
// 
//                 beforeEach(function() {
//                     // Add extra album to test 'prev'
//                     this.player.playlist.add(albumData[1]);
//                 });
// 
//                 it("goes to the previous track in an album", function () {
//                     this.player.set({'currentTrackIndex': 1});
//                     this.player.prevTrack();
//                     
//                     expect(this.player.get('currentAlbumIndex')).toEqual(0);
//                     expect(this.player.get('currentTrackIndex')).toEqual(0);
//                 });
//             
//                 it("goes to the last track of previous album", function() {
//                     this.player.set({'currentAlbumIndex': 1});
//                     this.player.set({'currentTrackIndex': 0});
//                     this.player.prevTrack();
//                     
//                     expect(this.player.get('currentAlbumIndex')).toEqual(0);
//                     expect(this.player.get('currentTrackIndex')).toEqual(1);
//                 });
//                 
//                 it("wraps around if at the very beginning", function() {
//                     this.player.set({'currentAlbumIndex': 0});
//                     this.player.set({'currentTrackIndex': 0});
//                     this.player.prevTrack();
//                     
//                     expect(this.player.get('currentAlbumIndex')).toEqual(1);
//                     expect(this.player.get('currentTrackIndex')).toEqual(1);
//                 });
//             
//             });
// 
//         });
// 
//     });
// 
// });
