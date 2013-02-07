QuestionListView = Generic.ListView.extend({
    template:"#question-list-template",
    itemViewContainer:"tbody",
    itemViewOptions:{
        template:"#question-template"
    },
    ui:{
      currentPage:"[data-bind='currentPage']" ,
      nextPageBtn:"li.next",
      prevPageBtn:"li.previous",
      queryOptions:"[data-bind='queryOptions']"
    },
    buildSortQuery:function(field,order){
        return {sort:field,order:order||'desc'}
    },
    buildSearchQuery:function(value){
        return {q:value}
    },
    fetchPage:function(page){
        this.page = page;
        return this.collection.refetch({data:{page:page}});
    },
    hasNextPage:function(){
      return true;
    },
    onRequestFinished:function(){
      this.triggerMethod('page:changed')
    },
    onRender:function(){
      _super(QuestionListView,this,'onRender',true).apply(this,arguments);
      if(this.hasPrevPage()){
        this.ui.prevPageBtn.removeClass('disabled')
      }else{
        this.ui.prevPageBtn.addClass('disabled');
      }
      this.ui.queryOptions.text(JSON.stringify(this.collection.fetchOptions,null,'    '));
    }
}).mixin(SortMixin,SearchMixin,PaginatedMixin,LoadingMixin)

TagsWidget = Generic.ListWidget.extend({
  type:Tags,
  template:"#tags-template",
  itemViewContainer:"tbody",
  itemView:Generic.ListWidget.prototype.itemView.extend({
    template:"#tag-template",
    tagName:"tr",
    triggers:{
      'click':'toggle'
    },
    value:function(){
      return this.model.get('name');
    }
  })
}).mixin(PrefetchListMixin,WidgetMixin,MultiSelectMixin);

var PageLayout = Marionette.Layout.extend({
    el: "[data-region='page']",
    template:"#page-template",
    mainView: QuestionListView,
    asideView: Generic.AsideView.extend({
      widgets:[TagsWidget.extend({name:'tag:filter'})]
    }),
    regions: {
        main: "[data-region='main']",
        aside: "[data-region='aside']"
    },

    initialize: function(){
        this.options.vent = this;
    },

    onRender: function(){
        if(this.mainView){
            this.main.show(new this.mainView(this.options));
        }
        if(this.asideView){
            this.aside.show(new this.asideView(this.options));
        }
    },
    onTagFilter:function(selected){
      this.collection.refetch({
         data:{tagged:selected}
      });
    }
});


$(function(){
    var collection = new Questions();
    var page = new PageLayout({collection:collection});
    page.render();
    collection.fetch();
});
