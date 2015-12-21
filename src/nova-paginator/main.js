(function() {(function (root, factory) {debugger;
  if (typeof exports === 'object') {
    module.exports = factory();
  }
  else if (typeof define === 'function' && define.amd) {
    define([], factory);
  }
  else {
    var globalAlias = 'NovaPaginator';
    var namespace = globalAlias.split('.');
    var parent = root;
    for ( var i = 0; i < namespace.length-1; i++ ) {
      if ( parent[namespace[i]] === undefined ) parent[namespace[i]] = {};
      parent = parent[namespace[i]];
    }
    parent[namespace[namespace.length-1]] = factory();
  }
}(this, function() {
  function _requireDep(name) {
    return {}[name];
  }

  var _bundleExports = undefined;NovaExports.__fixedUglify="script>";NovaExports.exports={"stylesheet":":host[default-style] a{color:#212121;text-decoration:none;display:inline-block;min-width:28px;line-height:1.7;text-align:center;box-sizing:border-box}:host[default-style] input{width:28px}:host[default-style] a:not([disabled]):hover{color:#00bcd4}:host[default-style] a[disabled]{color:rgba(0,0,0,.3);cursor:default}:host[default-style] a[hide]{display:none}:host[default-style] input[hide]{display:none}:host[default-style] span[hide]{display:none}:host[default-style] a[current]{color:#00bcd4}","template":"\r\n        <template-if if=\"{{showFirstAndLast}}\">\r\n        <a href=\"#\" disabled_=\"{{page == 0}}\" hide_=\"{{pageCount &lt;= 0}}\" data-page=\"0\">{{firstText}}</a>\r\n        </template-if>\r\n\r\n        <template-if if=\"{{showPrevAndNext}}\">\r\n        <a href=\"#\" disabled_=\"{{page &lt;= 0}}\" hide_=\"{{pageCount &lt;= 0}}\" data-page_=\"{{page - 1}}\">{{prevText}}</a>\r\n        </template-if>\r\n\r\n        <template is=\"template-repeat\" items=\"{{pageSpanArray}}\">\r\n        <a href=\"#\" disabled_=\"{{item == page}}\" current_=\"{{item == page}}\" data-page_=\"{{item}}\">{{item + 1}}</a>\r\n        </template>\r\n\r\n        <template-if if=\"{{showPrevAndNext}}\">\r\n        <a href=\"#\" disabled_=\"{{page &gt;= pageCount - 1}}\" hide_=\"{{pageCount &lt;= 0}}\" data-page_=\"{{page + 1}}\">{{nextText}}</a>\r\n        </template-if>\r\n\r\n        <template-if if=\"{{showFirstAndLast}}\">\r\n        <a href=\"#\" disabled_=\"{{page == pageCount - 1}}\" hide_=\"{{pageCount &lt;= 0}}\" data-page_=\"{{pageCount - 1}}\">{{lastText}}</a>\r\n        </template-if>\r\n\r\n        <template-if if=\"{{showJumpNumber}}\">\r\n        <input hide_=\"{{pageCount &lt;= 0 || pageCount &lt;= pageSpan}}\" type=\"tel\" placeholder=\"{{page+1}}\"><span hide_=\"{{pageCount &lt;= 0 || pageCount &lt;= pageSpan}}\">/{{pageCount}}</span> \r\n        \r\n    </template-if>"};
        Nova.Components.NovaPaginator = NovaExports({
            is: 'nova-paginator',
            props: {
                /* 配置项 */
                // 总数据条数
                totalItems: {
                    type: Number,
                    value: 0
                },

                // 每页显示多少条
                itemsPerPage: {
                    type: Number,
                    value: 10
                },

                // 当前显示第几页，从0算起
                page: {
                    type: Number,
                    value: 0
                },

                // 组多同时显示多少个页码
                pageSpan: {
                    type: Number,
                    value: 10
                },

                // 是否显示上一页和下一页
                showPrevAndNext: {
                    type: Boolean,
                    value: true
                },

                // 是否显示首页和末页
                showFirstAndLast: {
                    type: Boolean,
                    value: false
                },

                // 是否显示总条数
                showTotal: {
                    type: Boolean,
                    value: false
                },

                //是否显示输入跳转页面框
                showJumpNumber:{
                    type:Boolean,
                    value:false
                },

                firstText: {
                    type: String,
                    value: '首页'
                },

                lastText: {
                    type: String,
                    value: '末页'
                },

                prevText: {
                    type: String,
                    value: '上一页'
                },

                nextText: {
                    type: String,
                    value: '下一页'
                },

                /* 内部属性 */
                pageSpanArray: Array,
                pageCount: Number

            },
            createdHandler: function() {

                this.initPageCount();
                this.initPageSpanArray();

                this.on('_totalItemsChanged _itemsPerPageChanged', this.initPageCount);
                this.on('_pageChanged _pageSpanChanged _totalItemsChanged _itemsPerPageChanged', this.initPageSpanArray);
                this.bindEvents();
            },

            bindEvents: function() {
                var self = this;
                $(this).on('click', 'a:not([disabled]):not([current])', function() {
                    var page = $(this).attr('data-page');
                    self.page = parseInt(page);
                });
                $(this).on("keypress","input",function(evt){
                    if( evt.keyCode == 13 ) {
                        evt.preventDefault();
                        var page =  parseInt($(this).val())-1
                        page = page>self.pageCount?self.pageCount-1:page;
                        page = page<0?0:page;
                        self.page =page;
                        $(this).val("");
                    }
                });
            },

            initPageCount: function() {
                this.pageCount = Math.ceil(this.totalItems / this.itemsPerPage);
            },
            initPageSpanArray: function() {
                var radius = (this.pageSpan - 1) / 2;
                var backwardDistance = Math.ceil(radius);
                var forwardDistance = Math.floor(radius);

                var backIndex = this.page - backwardDistance;
                var forwardIndex = this.page + forwardDistance;

                if(backIndex < 0) {
                    forwardIndex -= backIndex;
                    backIndex = 0;
                }

                if(forwardIndex > this.pageCount - 1) {
                    backIndex -= (forwardIndex - (this.pageCount - 1));
                    backIndex = backIndex < 0 ? 0 : backIndex;
                    forwardIndex = this.pageCount - 1;
                }

                var spanArary = [];
                for(var i = backIndex; i <= forwardIndex; i++) {
                    spanArary.push(i);
                }

                this.pageSpanArray = spanArary;
            }
        });
    

  return _bundleExports;
}));}).call(window)