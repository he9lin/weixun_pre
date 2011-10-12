(function($) {
  $(document).ready(function() {
    
    window.BookView = window.ModelBaseView.extend({
      tagName:   'li',
      className: 'book',
      template:  _.template($("#book_template").html()),
    });
    
    window.BookFullView = Backbone.View.extend({
      tagName:   'article',
      className: 'book',
      template:  _.template($("#book_full_template").html()),
      
      events: {
        'click nav button#prev_page': 'previousPage',
        'click nav button#next_page': 'nextPage'
      },
      
      initialize: function() {
        _.bindAll(this, 
          'render',
          'updatePage');
          
        var player = this.player = new BookPlayer({book: this.model});
        this.player.bind('change:currentPageIndex', this.updatePage);
      },
      
      render: function() {
        $(this.el).html(this.template(this.model.toJSON()));
        this.updatePage();
        return this;
      },
      
      previousPage: function() {
        this.player.previousPage();
      },

      nextPage: function() {
        this.player.nextPage();
      },
      
      updatePage: function() {
        this.$('#page_container img').attr({src: this.player.currentPage().get('url')});
      },
    });
    
    window.BookShelfView = Backbone.View.extend({
      tagName: 'ul',
      className: 'books',
      
      events: {
        'click li.book': 'openBook'
      },
      
      openBook: function(e) {
        var cid = $(e.target).closest('li.book').attr('id').substring(5);
        this.player.setCurrentItemByCid(cid);
      },
      
      initialize: function() {
        _.bindAll(this, 
          'render',
          'updateBook');
          
        var player = this.player = new ItemsPlayer({items: new Books()});
        this.collection.each(function(book) {
          player.items.add(book);
        });
        this.player.bind('change:currentItemIndex', this.updateBook);
      },
      
      updateBook: function() {
        var view = new BookFullView({model: this.player.currentItem()});
        $('#main').html(view.render().el);
      },
      
      render: function() {
        var container = $(this.el);
        this.player.items.each(function(book) {
          var view = new BookView({
            model: book,
            id: "book_" + book.cid,
          });
          container.append(view.render().el);
        });
        return this;
      },
    });

  });
})(jQuery);