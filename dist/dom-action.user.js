// ==UserScript==
// @name       DOMAction
// @namespace  https://blog.adproqwq.xyz
// @version    0.1.1
// @author     Adpro
// @icon       https://vitejs.dev/logo.svg
// @match      *://*/*
// ==/UserScript==

(function () {
  'use strict';

  const sub = {
    name: "基础订阅",
    author: "Adpro",
    version: 1,
    rules: [
      {
        originUrl: "https://stackoverflow.blog",
        rules: [
          {
            path: "/[a-zA-Z0-9-]+/",
            pageRules: [
              {
                name: "cookie获取询问弹窗",
                action: "click",
                matchDelay: 2e3,
                rule: "#onetrust-reject-all-handler"
              }
            ]
          }
        ]
      },
      {
        originUrl: "https://github.com",
        rules: [
          {
            path: "",
            pageRules: [
              {
                name: "首页右侧可关闭卡片",
                action: "click",
                rule: ".js-notice * .position-absolute.p-2 .close-button.color-fg-on-emphasis"
              }
            ]
          }
        ]
      }
    ]
  };
  const handler = {
    apply: function(target, thisArg, argumentsList) {
      const result = target.apply(thisArg, argumentsList);
      const pushStateEvent = new CustomEvent("pushstate", {
        detail: {
          state: argumentsList[0],
          title: argumentsList[1],
          url: argumentsList[2]
        }
      });
      window.dispatchEvent(pushStateEvent);
      return result;
    }
  };
  const pushStateProxy = new Proxy(history.pushState, handler);
  var oldUrl = window.location.href;
  var currentUrl;
  history.pushState = pushStateProxy;
  window.addEventListener("pushstate", () => {
    currentUrl = window.location.href;
    if (oldUrl !== currentUrl)
      check();
  });
  const check = () => {
    sub.rules.forEach((p) => {
      if (window.location.href.startsWith(p.originUrl))
        checkIsExcluded(p.rules);
    });
  };
  const checkIsExcluded = (pageRules) => {
    var workRules = [];
    pageRules.forEach((r) => {
      var isNotExcluded = true;
      var path = window.location.pathname.match(r.path);
      if (path === null)
        return;
      if (typeof r.excludeMatches !== "undefined" && r.excludeMatches.length !== 0) {
        isNotExcluded = walkExcludePagesArray(path, r.excludeMatches);
      }
      if (isNotExcluded)
        workRules.push(r);
    });
    if (workRules.length != 0)
      action(workRules);
  };
  const action = (workRules) => {
    workRules.forEach((p) => {
      p.pageRules.forEach((r) => {
        var matchDelay = typeof r.matchDelay === "undefined" ? 0 : r.matchDelay;
        setTimeout(() => {
          let targetNode = document.querySelectorAll(r.rule);
          for (const i in targetNode) {
            targetNode[i].click();
          }
        }, matchDelay);
      });
    });
  };
  const walkExcludePagesArray = (path, excludePages) => {
    for (const e of excludePages) {
      if (window.location.pathname.startsWith(`/${path[0]}/${e}`))
        return false;
    }
    return true;
  };

})();