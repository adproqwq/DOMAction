import sub from "./sub";
import NxUrlWatcher from '@jswork/next-url-watcher';

const URLWatcher = new NxUrlWatcher({
  immediate: true,
});
URLWatcher.watch((old: string, current: string) => {
  if(old !== current) action();
});

const action = () => {
  sub.rules.forEach((p) => {
    if(window.location.href.startsWith(p.originUrl)){
      p.rules.forEach((r) => {
        var isNotExclude = true;
        var path = window.location.pathname.match(r.path);
        if(typeof r.excludeMatches !== 'undefined' && r.excludeMatches.length !== 0){
          isNotExclude = r.excludeMatches?.every((e) => {
            if(!path) return;
            return !window.location.href.startsWith(`${p.originUrl}/${path[0]}/${e}`);
          });
        }
        if(isNotExclude && window.location.href.startsWith(`${p.originUrl}/${path![0]}`)){
          r.pageRules.forEach((s) => {
            let matchDelay: number;
            typeof s.matchDelay === 'undefined' ? matchDelay = 0 : matchDelay = s.matchDelay;
            setTimeout(() => {
              document.querySelectorAll(s.rule).forEach((n) => {
                (n as HTMLElement).click();
              });
            }, matchDelay);
          });
        }
      });
    }
  });
};
