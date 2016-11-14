(function(){
    function Tips(){
        this.searchName = '',
		this.friPop = null;
		this.loadingstatus = 0;//1:可以加载,2:正在加载中，3：已经是最后一页了
		this.curpage = 1;
		this.recsize = 0;
		this.listarr = [];
        this.maxNum = 10000;
        this.minNum = 0;
        this.callback = function(){};
        this.arrFri = [];
        this.init();
    }
    Tips.prototype = {
        initEvents:function()
        {
        },
    }
})();
