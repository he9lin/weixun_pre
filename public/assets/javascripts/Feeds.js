(function($) {
  $(document).ready(function() {
    window.FeedView = Backbone.View.extend({
      tagName:   'li',
      className: 'feed',
      template:  _.template($("#feed_template").html()),
      
      events: {
        'click a.comments_toggler': 'toggleComments',
        'click img.feed_photo': 'togglePhoto'
      },

      initialize: function() {
        _.bindAll(this, 'render', 'toggleComments', 'togglePhoto');
      },
      
      togglePhoto: function() {
        this.$('img.feed_photo').toggle();
      },
      
      toggleComments: function() {
        this.$('ul.comments').toggle();
        this.$('a.comments_toggler').toggle();

        if (this.$('form.new_comment').is(':visible')) {
          this.$('form.new_comment textarea').focus();
        }
      },

      render: function() {
        $(this.el).html(this.template(this.model.toJSON())).addClass(this.model.get('type'));
        var commentsView = new CommentsView({collection: this.model.comments});
        $(this.el).append(commentsView.render().el);
        this.$('ul.comments').hide();
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
        $(viewEle).hide().fadeIn();
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
        this.$('form.new_comment').after(viewEle);
        $(viewEle).hide().fadeIn();
      },
      
      render: function() {
        var commentsContainer = $(this.el);
        commentsContainer.append(_.template($("#comment_form_template").html()));
        this.collection.each(function(comment) {
          var view = new CommentView({model: comment});
          commentsContainer.append(view.render().el);
        });
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
      author: window.SampleAuthors.A,
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
      author: window.SampleAuthors.A,
    }, {
      at: 0
    });
    
    textarea.val('');

    e.preventDefault();
    return false;
  });
})(jQuery);
