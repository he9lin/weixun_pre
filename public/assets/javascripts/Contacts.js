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
    
    window.ContactSectionView = Backbone.View.extend({
      tagName:   'div',
      className: 'contact_section',
      template:  _.template($("#contact_section_template").html()),
      
      events: {
        'click h3.alphabet a': 'toggleContactSection'
      },
      
      initialize: function() {
        _.bindAll(this, 'render', 'toggleContactSection');
      },
      
      toggleContactSection: function(e) {
        this.$('ul.contact_section_list').toggle();
        this.$('h3.alphabet a').toggle();
      },
      
      render: function() {
        $(this.el).html(this.template({alphabet: this.model.section}));
        
        var container = this.$('ul');
        
        $.each(this.model.contacts, function(index, contact) {
          var view = new ContactView({
            model: contact,
            id: "contact_" + contact.cid,
          });
          container.append(view.render().el);
        });
        
        return this;
      },
    });
    
    window.ContactsView = Backbone.View.extend({
      tagName: 'section',
      className: 'contacts_book',
      
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
        $('#secondary section.contact_details').html(view.render().el);
      },
      
      render: function() {
        var container = $(this.el),
          sorted = this.player.items.sortBy(function(item) { return item.get('alphabet'); }),
          grouped = _.groupBy(sorted, function(item) { return item.get('alphabet'); });
          
        $.each(grouped, function(section, contacts) {
          var view = new ContactSectionView({model: {section: section, contacts: contacts}});
          container.append(view.render().el);
        });
        
        return this;
      },
    });

  });
})(jQuery);
