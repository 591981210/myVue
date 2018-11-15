/*
  专门负责解析模板内容
*/
class Compiler {
    constructor(el, vm) {
        //有可能传入 dom 对象,
        this.el = typeof el === "string" ? document.querySelector(el) : el
        // vm: new的vue实例
        this.vm = vm


        if (this.el) {
            //1. 把el中所有的子节点都放入到内存中， fragment节点片段在不回流,在内存里操作
            let fragment = this.node2fragment(this.el)
            console.log(fragment);
            //2. 在内存中编译fragment
            this.compile(fragment)
            //3. 把fragment一次性的添加到页面
        }
    }


    /* 核心方法 */
    node2fragment(node) {
        let fragment = document.createDocumentFragment()
        // 把el中所有的子节点挨个添加到文档碎片中
        let childNodes = node.childNodes
        console.log(node);
        console.dir(childNodes)

        //将childNodes伪数组转成真数组
        this.toArray(childNodes).forEach(node => {
            // 把所有的子节点都添加到frament中
            fragment.appendChild(node)
        })
        return fragment
    }


    /**
     * 编译文档碎片（内存中）
     * @param {*} fragment
     */
    compile(fragment) {
        let childNodes = fragment.childNodes
        this.toArray(childNodes).forEach(node => {
            // 编译子节点

            if (this.isElementNode(node)) {
                // 如果是元素， 需要解析指令
            }

            if (this.isTextNode(node)) {
                // 如果是文本节点， 需要解析插值表达式
            }

            // 如果当前节点还有子节点，需要递归的解析
            if (node.childNodes && node.childNodes.length > 0) {
                this.compile(node)
            }
        })
    }

    /* 工具方法 伪数组转成真数组*/
    toArray(likeArray) {
        return [].slice.call(likeArray)
    }

    isElementNode(node) {
        //nodeType: 节点的类型  1：元素节点  3：文本节点
        return node.nodeType === 1
    }
    isTextNode(node) {
        return node.nodeType === 3
    }
}