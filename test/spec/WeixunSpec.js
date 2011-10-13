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
    expect(this.author.get("avatar_url")).toEqual("assets/images/avatars/missing.png");
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
  
  it("defaults timestamp as just now", function() {
    this.feed = new Feed({});
    expect(this.feed.get("timestamp")).toEqual("Just now");
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

describe("ItemsPlayer", function() {
  beforeEach(function() {
    this.itemsPlayer = new ItemsPlayer({items: new Books()});
  });
  
  describe("with no items", function() {
    it("starts with item at index 0", function() {
      expect(this.itemsPlayer.get("currentItemIndex")).toEqual(0);
    });
  });
  
  describe("with added books", function() {
    beforeEach(function() {
      this.itemsPlayer.items.add(bookData);
    });
    
    it("has an item list", function() {
      expect(this.itemsPlayer.items.models.length).toEqual(1);
    });

    it("has a current item", function() {
      expect(this.itemsPlayer.currentItem().get("title")).toEqual("Rich Dad, Poor Dad");
    });
    
    it("sets current item by cid", function() {
      this.itemsPlayer.items.add({
        title: "Another book",
      });
      
      var newItem = this.itemsPlayer.items.at(1);
      this.itemsPlayer.setCurrentItemByCid(newItem.cid);
      expect(this.itemsPlayer.currentItem().get('title')).toEqual("Another book");
    })
  });
});

describe("Contact", function() {
  beforeEach(function() {
    this.contact = new window.Contact({
      cell: "1313131313"
    });
  });
  
  it("creates from data", function() {
    expect(this.contact.get('cell')).toEqual('1313131313');
  });
  
  it("defaults to 'A' as first alphabet of name", function() {
    expect(this.contact.get('alphabet')).toEqual('A');
  });
  
  it("defaults to missing png for avatar url", function() {
    expect(this.contact.get("avatar_url")).toEqual("assets/images/avatars/missing.png");
  });
});
