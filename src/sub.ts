import { RawSubscription } from "./params";

const sub: RawSubscription = {
  name: '基础订阅',
  author: 'Adpro',
  version: 0,
  rules: [
    {
      originUrl: 'https://stackoverflow.blog',
      rules: [
        {
          path: /[a-zA-Z0-9\-]+/,
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
  ],
};

export default sub;