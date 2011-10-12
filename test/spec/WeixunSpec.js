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
