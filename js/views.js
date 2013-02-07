
var UserDetailView = Marionette.ItemView.extend({
    template: _.template("chuj")
},{
    mixin: function(){
        return _.reduceRight(arguments, function(current, mixin){
            return mixin.contribute(current);
        }, this);
    }
}).mixin(

    );

ListWidget = Generic.ListWidget.extend({
    template:"#widget-service-list",
    itemViewContainer:'ol.widget-list',
    initialize:function(){
        if(!this.collection && this.type){
            this.collection = new this.type();
        }
        this.collection.fetch();
        if(this.options.vent){
            this.on('change',function(value){
                this.options.vent.triggerMethod(this.name,value,this);
            }.bind(this))
        }
    }
});

var QuestionsWidget = Generic.ListWidget.extend({
    type: Questions,
    template: "#question-list-template",
    itemViewContainer: "tbody",
    itemView: Generic.ListWidget.prototype.itemView.extend({
        template: "#question-template",
        el: "tr"
    }),
    initialize: function(){
        this.collection = new this.type();
        this.collection.fetch();
    }
});

var TweetsLayout = Marionette.Layout.extend({
    asideView:Generic.AsideView.extend({
        widgets:[
            QuestionsWidget.extend({name:"questions"})
        ]
    }),
    el: "#tweets",
    mainView: UserDetailView,

    template: "#tweets-page",

    regions: {
        main: "[data-region='main']",
        aside: "[data-region='aside']"
    },

    initialize: function(){
        this.options.vent = this;
    },

    render: function(){
        console.log("pageview render", this.cid);
        return Marionette.Layout.prototype.render.apply(this, arguments)
    },

    onRender: function(){
        if(this.mainView){
            this.main.show(new this.mainView(this.options));
        }
        if(this.asideView){
            this.aside.show(new this.asideView(this.options));
        }
    },
    onTweets: function(x){
        console.log(x);
    }
});

$(function(){
    new TweetsLayout().render();
});
