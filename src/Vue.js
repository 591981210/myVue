class Vue {
    constructor(options = {}) {
        //给 vue 实力添加属性
        this.$el = options.el //id
        this.$data = options.data //data 数据
        this.$methods = options.methods //data 数据

        //将需要监控的数据传入监视器
        new Observer(this.$data)
        this.proxy(this.$data)
        this.proxy(this.$methods)
        //    如果指定了 el 参数,对 el 进行解析
        if (this.$el) {
            //负责解析模板的内容
            //需要模板和数据
            new Compiler(this.$el, this)
        }
    }
    proxy(data){
        Object.keys(data).forEach(key=>{
            console.log(key)
            Object.defineProperty(this,key,{
                enumerable:true,
                configurable:true,
                get(){
                    //调用返回该属性数据
                    return data[key]
                },
                set(newVal){
                    //this.msg  更新vm 该属性数据
                    console.log(newVal)
                    if(newVal == data[key]){
                        return
                    }

                    data[key] = newVal
                }
            })
        })
    }
}
