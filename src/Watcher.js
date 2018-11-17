/* 
watcher模块负责把compile模块与observe模块关联起来
*/
class Watcher {
    // vm: 当前的vue实例
    // expr: data中数据的名字
    // 一旦数据发生了改变，需要调用cb
    constructor(vm, expr, cb) {
        this.vm = vm
        this.expr = expr
        this.cb = cb

        // 需要把expr的旧值给存储起来
        this.oldValue = this.getVMValue(vm, expr)
    }

    update () {
        // 对比expr是否发生了改变，如果发生了改变，需要调用cb
        let oldValue = this.oldValue
        let newValue = this.getVMValue(this.vm, this.expr)
        if(oldValue != newValue){
            this.cb(newValue,oldValue)
        }
    }
    // 这个方法用于获取VM中的数据
    getVMValue(vm, expr) {
        // 获取到data中的数据
        let data = vm.$data
        expr.split(".").forEach(key => {
            data = data[key]
        })
        return data
    }
}

