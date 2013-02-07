(function(Backbone){
    var Collection = Backbone.Collection;
    Backbone.Collection = Collection.extend({
        fetchOptions:{data:{}},
        defaultFetchOptions:{data:{}},
        fetch:function(options){
            options = _.defaults(options ||{},{data:{}});
            if(this.xhr&&this.xhr.state()=='pending'){
                this.xhr.abort();
            }
            this.fetchOptions = options;
            _.defaults(options.data, this.defaultFetchOptions.data);
            return this.xhr = Collection.prototype.fetch.call(this,options)
        },
        refetch:function(options){
            var options = _.extend({},options);
            options.data = _.extend({},this.fetchOptions.data,options.data);
            return this.fetch(options);
        }
    });
}(Backbone));