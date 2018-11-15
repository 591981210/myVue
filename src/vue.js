class Vue {
    constructor(options = {}){
        //给 vue 实力添加属性
        this.$el = options.el //id
        this.$data = options.data //data 数据

    //    如果指定了 el 参数,对 el 进行解析
        if (this.$el) {
            //负责解析模板的内容
            //需要模板和数据
            new Compiler(this.$el,this)
        }
    }
}