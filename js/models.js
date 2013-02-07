var Question = Backbone.Model.extend();

var Questions = Backbone.Collection.extend({
    fetchOptions:{data: {}},
    model: Question,
    url: 'http://api.stackexchange.com/2.1/questions?site=stackoverflow&callback=?',
    parse: function (response) {
        this.meta = response;
        return response.items;
    }
});