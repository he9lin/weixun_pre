(function($) {

  window.Comment  = Backbone.Model.extend({});
  window.Comments = Backbone.Collection.extend({
    model: Comment
  });

  window.Author = Backbone.Model.extend({
    defaults: {
      "avatar_url": "assets/images/avatar/missing.png"
    }
  });
  
  window.Feed = Backbone.Model.extend({
    initialize: function(options) {
      this.author = new Author(options.author);
      this.comments = new Comments(options.comments);
    },
  });
  
  window.Feeds = Backbone.Collection.extend({
    model: Feed,
    url: "/feeds"
  });
  
  window.feeds = new Feeds();
  
  $(document).ready(function() {
    window.FeedView = Backbone.View.extend({
      tagName:   'li',
      className: 'feed',
      template:  _.template($("#feed-template").html()),

      initialize: function() {
        _.bindAll(this, 'render');
      },

      render: function() {
        $(this.el).html(this.template(this.model.toJSON()));
        var commentsView = new CommentsView({collection: this.model.comments});
        $(this.el).append(commentsView.render().el);
        return this;
      },
    });
    
    window.FeedsView = Backbone.View.extend({
      tagName:   'section',
      className: 'feeds',
      template:  _.template($('#feeds-template').html()),
    
      initialize: function() {
        _.bindAll(this, 'render');
        this.collection.bind('reset', this.render);
      },
    
      render: function() {
        var feedsContainer,
          collection = this.collection;
          
        $(this.el).html(this.template({})); // initial empty setup
        
        feedsContainer = this.$("ul");
    
        this.collection.each(function(feed) {
          var view = new FeedView({ model: feed });
          feedsContainer.append(view.render().el);
        });
    
        return this;
      },
    });
    
    window.CommentView = Backbone.View.extend({
      tagName:   'li',
      className: 'comment',
      template:  _.template($("#comment-template").html()),

      initialize: function() {
        _.bindAll(this, 'render');
      },

      render: function() {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
      },
    });
    
    window.CommentsView = Backbone.View.extend({
      tagName:   'ul',
      className: 'comments',
      
      initialize: function() {
        _.bindAll(this, 'render');
      },
      
      render: function() {
        var commentsContainer = $(this.el);
        this.collection.each(function(comment) {
          var view = new CommentView({model: comment});
          commentsContainer.append(view.render().el);
        });
        return this;
      },
    });
  });
  
})(jQuery);
