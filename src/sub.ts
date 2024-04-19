import { RawSubscription } from "./params";

const sub: RawSubscription = {
  name: '基础订阅',
  author: 'Adpro',
  version: 1,
  rules: [
    {
      originUrl: 'https://stackoverflow.blog',
      rules: [
        {
          path: '/[a-zA-Z0-9\-]+/',
          pageRules: [
            {
              name: 'cookie获取询问弹窗',
              action: 'click',
              matchDelay: 2000,
              rule: '#onetrust-reject-all-handler',
            },
          ],
        },
      ],
    },
    {
      originUrl: 'https://github.com',
      rules: [
        {
          path: '',
          pageRules: [
            {
              name: '首页右侧可关闭卡片',
              action: 'click',
              matchDelay: 2000,
              rule: '.js-notice * .position-absolute.p-2 .close-button.color-fg-on-emphasis',
            },
          ],
        },
      ],
    },
  ],
};

export default sub;