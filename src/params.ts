export interface RawSubscription {
  /**
   * 订阅名
   */
  name: string;

  /**
   * 订阅作者
   */
  author: string;

  /**
   * 订阅描述
   */
  description?: string;

  /**
   * 订阅版本
   */
  version: number;

  /**
   * 订阅规则
   */
  rules: RawUrl[];
};

export interface RawUrl {
  /**
   * 源域名
   * 
   * @example https://www.example.com
   * 
   * @example https://example.com
   * 
   * @example https://test.example.com
   * 
   * 上方的三个例子指向的是三个不同的网页，规则不能写到一起
   * 
   * 注意：末尾不能有`/`
   */
  originUrl: string;

  /**
   * 域名下的规则
   */
  rules: RawUrlRule[];
};

export interface RawUrlRule {
  /**
   * 源域名下的子页名
   * 
   * @example path: 'example'
   * 
   * 以https://example.com举例
   * 
   * 上方例子指向的是：https://example.com/example/*
   * 
   * 为空则表示匹配源域名下所有子页面
   * 
   * 支持正则表达式，正则表达式应用/包裹
   * 
   * @example /abc/
   * 
   * 正则表达式可以是string类型，也可以是RegExp类型
   * 
   * 即：'/abc/'与/abc/等效
   */
  path: string | RegExp;

  /**
   * 在该子页面下不匹配的子页面
   * 
   * 例：
   * 
   * originUrl: 'https://example.com'
   * 
   * path: 'example'
   * 
   * excludeMatches: ['test']
   * 
   * 即是：
   * 
   * 在https://example.com/example/* 中规则生效，
   * 
   * 但是在https://example.com/example/test/* 中不生效
   */
  excludeMatches?: string[];

  /**
   * 每个子页面的规则
   */
  pageRules: RawPageRule[];
};

export interface RawPageRule {
  /**
   * 规则名
   */
  name: string;
  
  /**
   * 具体操作
   * 
   * 目前仅支持：
   * 
   * @param 'click'
   */
  action: string;

  /**
   * CSS选择器
   * 
   * 选择要选择的DOM节点
   */
  rule: string;

  /**
   * 延迟匹配
   * 
   * 单位：毫秒(ms)
   */
  matchDelay?: number;
};