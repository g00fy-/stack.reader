var Question = Backbone.Model.extend();

var Questions = Backbone.Collection.extend({
  defaultFetchOptions:{data:{
    key:'fwE8g9qWooFLhb4TH7Otfg(('
  }},
  model: Question,
  url: 'http://api.stackexchange.com/2.1/questions?site=stackoverflow&callback=?',
  parse: function (response) {
    this.meta = response;
    return response.items;
  },
  fetch:function(options){
    if(((options||{}).data || {}).q){
        this.url='http://api.stackexchange.com/2.1/search/advanced/?site=stackoverflow&callback=?'
    }
    return _super(Questions,this,'fetch').apply(this,arguments);
  }
});

var Tag = Backbone.Model.extend();

var Tags = Backbone.Collection.extend({
  fetchOptions:{data:{
    key:'fwE8g9qWooFLhb4TH7Otfg(('
  }},
  model:Tag,
  url:'http://api.stackexchange.com/2.1/tags?site=stackoverflow&callback=?',
  parse: function (response) {
    this.meta = response;
    return response.items;
  }
}) ;