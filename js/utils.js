(function(Backbone){
    var Collection = Backbone.Collection;
    Backbone.Collection = Collection.extend({
        fetchOptions:{},
        fetch:function(options){
            if(this.xhr&&this.xhr.state()=='pending'){
                this.xhr.abort();
            }
            this.fetchOptions=options||{};
            return this.xhr = Collection.prototype.fetch.apply(this,arguments)
        },
        refetch:function(options){
            var options = _.extend({},options);
            options.data = _.extend({},this.fetchOptions.data,options.data);
            return this.fetch(options);
        }
    });
}(Backbone));