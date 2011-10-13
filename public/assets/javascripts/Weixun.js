(function($) {
  window.Contact = Backbone.Model.extend({
    defaults: {
      alphabet: "A",
      avatar_url: "assets/images/avatars/missing.png",
    }
  });  
  
  window.Contacts = Backbone.Collection.extend({ model: Contact });
  
  window.Video = Backbone.Model.extend({});  
  window.Videos = Backbone.Collection.extend({ model: Contact });
  
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
  
  window.ItemsPlayer = Backbone.Model.extend({
    defaults: {
      currentItemIndex: 0,
    },
    
    initialize: function(options) {
      this.items = options.items;
    },
    
    currentItem: function() {
      return this.items.at(this.get('currentItemIndex'));
    },
    
    setCurrentItemByCid: function(cid) {
      var item = this.items.getByCid(cid);
      var itemIndex = this.items.indexOf(item);
      this.set({'currentItemIndex': itemIndex});
    },
  });
  
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

  window.Comment  = Backbone.Model.extend({});
  
  window.Comments = Backbone.Collection.extend({
    model: Comment
  });

  window.Author = Backbone.Model.extend({
    defaults: {
      avatar_url: "assets/images/avatars/missing.png"
    }
  });
  
  window.Feed = Backbone.Model.extend({
    defaults: {
      type: "text",
      timestamp: "Just now",
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
  });
  
})(jQuery);
