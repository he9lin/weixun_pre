(function($) {
  window.Page = Backbone.Model.extend({
    defaults: {
      url: "assets/images/pages/missing.png"
    }
  });
  
  window.Pages = Backbone.Collection.extend({ model: Page });
  
  window.Book = Backbone.Model.extend({
    defaults: {
      rating: 0
    },
    
    initialize: function(options) {
      this.pages = new Pages(options.pages);
    },
  });
  
  window.Books = Backbone.Collection.extend({ model: Book });
  
  window.BookPlayer = Backbone.Model.extend({
    defaults: {
      currentPageIndex: 0,
    },
    
    initialize: function(options) {
      this.book = options.book;
    },

    currentPage: function() {
      return this.book.pages.at(this.get('currentPageIndex'));
    },

    previousPage: function() {
      var currentPageIndex = this.get('currentPageIndex');
      if (currentPageIndex > 0) {
        this.set({'currentPageIndex': currentPageIndex - 1});
      }
    },

    nextPage: function() {
      var currentPageIndex = this.get('currentPageIndex');
      if (currentPageIndex < this.book.pages.length - 1) {
        this.set({'currentPageIndex': currentPageIndex + 1});
      }
    },
  });
  
  window.BookShelfPlayer = Backbone.Model.extend({
    defaults: {
      currentBookIndex: 0,
    },
    
    initialize: function() {
      this.bookShelf = new Books();
    },
    
    currentBook: function() {
      return this.bookShelf.at(this.get('currentBookIndex'));
    },
    
    setCurrentBookByCid: function(cid) {
      var book = this.bookShelf.getByCid(cid);
      var bookIndex = this.bookShelf.indexOf(book);
      this.set({'currentBookIndex': bookIndex});
    },
  });

  window.Comment  = Backbone.Model.extend({});
  
  window.Comments = Backbone.Collection.extend({
    model: Comment
  });

  window.Author = Backbone.Model.extend({
    defaults: {
      avatar_url: "assets/images/avatar/missing.png"
    }
  });
  
  window.Feed = Backbone.Model.extend({
    defaults: {
      type: "text"
    },
    
    initialize: function(options) {
      this.author   = new Author(options.author);
      this.comments = new Comments(options.comments);
    },
  });
  
  window.Feeds = Backbone.Collection.extend({
    model: Feed,
    // localStorage: new Store("feeds"),
  });
  
  window.Authors = Backbone.Collection.extend({
    model: Author
  });
  
  $(document).ready(function() {
    
    // Generic model base view
    window.ModelBaseView = Backbone.View.extend({
      initialize: function() {
        _.bindAll(this, 'render');
      },

      render: function() {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
      },
    });
    
    window.AuthorView = window.ModelBaseView.extend({
      tagName:   'li',
      className: 'author',
      template:  _.template($("#author_template").html()),
    });
    
    window.AuthorsView = Backbone.View.extend({
      tagName: 'ul',
      className: 'authors',
      
      initialize: function() {
        _.bindAll(this, 'render');
      },
      
      render: function() {
        var container = $(this.el);
        this.collection.each(function(author) {
          var view = new AuthorView({model: author});
          container.append(view.render().el);
        });
        return this;
      },
    });
  });
  
})(jQuery);
