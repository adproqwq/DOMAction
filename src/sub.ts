import { RawSubscription } from "./params";

const sub: RawSubscription = {
  name: '测试',
  author: 'Adpro',
  version: 0,
  rules: [
    {
      originUrl: 'https://github.com',
      rules: [
        {
          path: /[a-zA-Z0-9\-]+\/[a-zA-Z0-9\-]+/,
          excludeMatches: ['pulls'],
          pageRules: [
            {
              name: '点击issues',
              action: 'click',
              matchDelay: 5000,
              rule: '#issues-tab',
            },
          ],
        },
      ],
    },
  ],
};

export default sub;