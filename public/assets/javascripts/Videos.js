(function($) {
  $(document).ready(function() {
    
    window.VideoView = window.ModelBaseView.extend({
      tagName:   'li',
      className: 'video',
      template:  _.template($("#video_template").html()),
    });
    
    window.VideoFullView = window.ModelBaseView.extend({
      tagName:   'article',
      className: 'video',
      template:  _.template($("#video_full_template").html()),
    });
    
    window.VideoShelfView = Backbone.View.extend({
      tagName: 'ul',
      className: 'videos',
      
      events: {
        'click li.video': 'playVideo'
      },
      
      playVideo: function(e) {
        var cid = $(e.target).closest('li.video').attr('id').substring(6);
        this.player.setCurrentItemByCid(cid);
      },
      
      initialize: function() {
        _.bindAll(this, 
          'render',
          'updateVideo');
          
        var player = this.player = new ItemsPlayer({items: new Videos()});
        this.collection.each(function(item) {
          player.items.add(item);
        });
        this.player.bind('change:currentItemIndex', this.updateVideo);
      },
      
      updateVideo: function() {
        var view = new VideoFullView({model: this.player.currentItem()});
        $('#secondary').html(view.render().el);
        
        // $('#main #video_container')....
      },
      
      render: function() {
        var container = $(this.el);
        this.player.items.each(function(video) {
          var view = new VideoView({
            model: video,
            id: "video_" + video.cid,
          });
          container.append(view.render().el);
        });
        return this;
      },
    });
  });
})(jQuery);