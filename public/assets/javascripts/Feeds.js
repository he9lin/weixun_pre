(function($) {
  $(document).ready(function() {
    window.FeedView = Backbone.View.extend({
      tagName:   'li',
      className: 'feed',
      template:  _.template($("#feed_template").html()),

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
      template:  _.template($('#feeds_template').html()),
    
      initialize: function() {
        _.bindAll(this, 'render');
        this.collection.bind('reset', this.render);
        this.collection.bind('add',   this.addOne, this);
      },
      
      addOne: function(feed) {
        var method = method || "prepend";
        
        var view = new FeedView({ 
            model: feed,
            id: "feed_" + feed.cid,
          }),
          viewEle = view.render().el;
        
        $('body')[method].call(this.$("ul.feed_list"), viewEle);
        $(viewEle).hide().slideDown();
      },
    
      render: function() {
        var feedsContainer,
          collection = this.collection;
          
        $(this.el).html(this.template({})); // initial empty setup
        
        feedsContainer = this.$("ul.feed_list");
    
        this.collection.each(function(feed) {
          var view = new FeedView({ 
            model: feed,
            id: "feed_" + feed.cid,
          });
          feedsContainer.append(view.render().el);
        });
    
        return this;
      },
    });
    
    window.CommentView = Backbone.View.extend({
      tagName:   'li',
      className: 'comment',
      template:  _.template($("#comment_template").html()),

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
        this.collection.bind('add', this.addOne, this);
      },
      
      addOne: function(comment) {
        var view = new CommentView({ model: comment }),
          viewEle = view.render().el;
        this.$('form.new_comment').before(viewEle);
        $(viewEle).hide().slideDown();
      },
      
      render: function() {
        var commentsContainer = $(this.el);
        this.collection.each(function(comment) {
          var view = new CommentView({model: comment});
          commentsContainer.append(view.render().el);
        });
        commentsContainer.append(_.template($("#comment_form_template").html()));
        return this;
      },
    });
  });
  
  
  
  // Create a jquery form, that checks for blankness of inputs
  // and resets inputs after submit. And does the disable button
  // stuff like rails js
  
  $('form.new_comment').live('submit', function(e) {
    var textarea = $('textarea', this),
      content = $.trim(textarea.val());
    
    if (content == '') {
      alert('Please enter something first...');
      textarea.val('');
      e.preventDefault();
      return false;
    }
    
    var feedCid = $(this).closest('li.feed').attr('id').substring(5);
    window.feeds.getByCid(feedCid).comments.add({
      content: content,
      author: {
        name: "Davis"
      },
    });
    
    textarea.val('');

    e.preventDefault();
    return false;
  });
  
  $('form.new_feed').live('submit', function(e) {
    var textarea = $('textarea', this),
      content = $.trim(textarea.val());
    
    if (content == '') {
      alert('Please enter something first...');
      textarea.val('');
      e.preventDefault();
      return false;
    }
    
    window.feeds.add({
      content: content,
      author: {
        name: "Davis"
      },
    }, {
      at: 0
    });
    
    textarea.val('');

    e.preventDefault();
    return false;
  });
})(jQuery);