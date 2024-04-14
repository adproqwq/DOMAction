import sub from '../src/sub';
import json5 from 'json5';
import fs from 'node:fs/promises';

const generateSubFile = async () => {
  await fs.writeFile(`${process.cwd()}/sub/sub.json5`, json5.stringify(sub));
};

generateSubFile();
