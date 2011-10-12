(function($) {
  $(document).ready(function() {
    
    window.ContactView = window.ModelBaseView.extend({
      tagName:   'li',
      className: 'contact',
      template:  _.template($("#contact_template").html()),
    });
    
    window.ContactFullView = window.ModelBaseView.extend({
      tagName:   'article',
      className: 'contact',
      template:  _.template($("#contact_full_template").html()),
    });
    
    window.ContactsView = Backbone.View.extend({
      tagName: 'section',
      className: 'contacts-book',
      
      events: {
        'click li.contact': 'showContact'
      },
      
      showContact: function(e) {
        var cid = $(e.target).closest('li.contact').attr('id').substring(8);
        this.player.setCurrentItemByCid(cid);
      },
      
      initialize: function() {
        _.bindAll(this, 
          'render',
          'updateContact');
          
        var player = this.player = new ItemsPlayer({items: new Contacts()});
        this.collection.each(function(book) {
          player.items.add(book);
        });
        this.player.bind('change:currentItemIndex', this.updateContact);
      },
      
      updateContact: function() {
        var view = new ContactFullView({model: this.player.currentItem()});
        $('#secondary').html(view.render().el);
      },
      
      render: function() {
        var container = $(this.el),
          sorted = this.player.items.sortBy(function(item) { return item.get('alphabet'); }),
          grouped = _.groupBy(sorted, function(item) { return item.get('alphabet'); });
          
        $.each(grouped, function(section, contacts) {
          var header = $('<h3>').text(section),
            sectionContainer = $('<ul>');
            
          container.append(header);
          container.append(sectionContainer);
          
          $.each(contacts, function(index, contact) {
            var view = new ContactView({
              model: contact,
              id: "contact_" + contact.cid,
            });
            sectionContainer.append(view.render().el);
          });
        });
        return this;
      },
    });

  });
})(jQuery);