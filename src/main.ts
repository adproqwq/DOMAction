import sub from "./sub";
import { pushStateProxy } from "./proxy";
import { RawUrlRule } from "./params";

var oldUrl: string = window.location.href;
var currentUrl: string;

// 替换原生的 pushState 方法
history.pushState = pushStateProxy;
// 监听自定义的 pushstate 事件
window.addEventListener('pushstate', () => {
  currentUrl = window.location.href;
  if(oldUrl !== currentUrl) check();
});

const check = () => {
  sub.rules.forEach((p) => {
    if(window.location.href.startsWith(p.originUrl)) checkIsExcluded(p.rules);
  });
};

const checkIsExcluded = (pageRules: RawUrlRule[]) => {
  var workRules: RawUrlRule[] = [];
  pageRules.forEach((r) => {
    var isNotExcluded = true;
    var path = window.location.pathname.startsWith(`/${r.path}`);
    if(!path) return;
    if(typeof r.excludeMatches !== 'undefined' && r.excludeMatches.length !== 0){
      isNotExcluded = walkExcludePagesArray(r.path, r.excludeMatches);
    }
    if(isNotExcluded) workRules.push(r);
  });
  if(workRules.length != 0) action(workRules);
};

const action = (workRules: RawUrlRule[]) => {
  workRules.forEach((p) => {
    p.pageRules.forEach((r) => {
      var matchDelay = typeof r.matchDelay === 'undefined' ? 0 : r.matchDelay;
      setTimeout(() => {
        let targetNode = document.querySelectorAll(r.rule);
        for(const i in targetNode){
          (targetNode[i] as HTMLElement).click();
        }
      }, matchDelay);
    });
  });
};

const walkExcludePagesArray = (path: string, excludePages: string[]): boolean => {
  for(const e of excludePages){
    if(window.location.pathname.startsWith(`/${path}/${e}`)) return false;
  }
  return true;
};
