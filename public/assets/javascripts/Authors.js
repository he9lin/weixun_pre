(function($) {
  $(document).ready(function() {
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