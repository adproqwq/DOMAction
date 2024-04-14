// 创建一个代理处理程序
const handler = {
  apply: function(target: any, thisArg: any, argumentsList: any){
    // 调用原生的 pushState 方法
    const result = target.apply(thisArg, argumentsList);

    // 创建并触发自定义事件
    const pushStateEvent = new CustomEvent('pushstate', {
      detail: {
        state: argumentsList[0],
        title: argumentsList[1],
        url: argumentsList[2],
      }
    });
    window.dispatchEvent(pushStateEvent);
    return result;
  }
};

// 使用 Proxy 包装原生的 pushState 方法
export const pushStateProxy = new Proxy(history.pushState, handler);
