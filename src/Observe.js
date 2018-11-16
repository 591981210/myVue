/* 
  observer用于给data中所有的数据添加getter和setter
  方便监控每个 data 数据的变化
*/
class Observer {
    constructor(data) {
        this.data = data
        this.walk(data)
    }

    /* 核心方法 */

    /* 遍历data中所有的数据，都添加上getter和setter */
    walk(data) {
        if (!data || typeof data != "object") {
            return
        }

        Object.keys(data).forEach(key => {
            // 给data对象的key设置getter和setter
            this.defineReactive(data, key, data[key])
            // 如果data[key]是一个复杂的类型，递归的walk
            this.walk(data[key])
        })
    }

    // 定义响应式的数据（数据劫持）

    // data中的每一个数据都应该维护一个dep对象
    // dep保存了所有的订阅了该数据的订阅者
    defineReactive(obj, key, value) {
        let that = this
        Object.defineProperty(obj, key, {
            enumerable: true,
            configurable: true,
            get() {
                console.log("获取了值:" + value)
                return value
            },
            set(newValue) {
                if (value === newValue) {
                    return
                }
                value = newValue
                console.log("设置了值:" + value)
                // 如果newValue是一个对象，也应该对她进行劫持
                that.walk(newValue)
            }
        })
    }
}
