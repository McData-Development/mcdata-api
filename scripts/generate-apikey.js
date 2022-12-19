const { parse } = require('dotenv');
const { v4: uuid } = require('uuid');
const { promises: fs, closeSync } = require('node:fs');

const MAGENTA = '\x1b[35m';
const RESET = '\x1b[0m';
const GREEN = '\x1b[32m';

const runScript = async () => {
  try {
    console.info(`Script | Initializing ${MAGENTA}.env${RESET} file...`);
    const dotFile = await fs.readFile('.env', { encoding: 'utf-8' });
    const config = parse(dotFile);

    config['API_KEY'] = uuid();
    await writeConfig('.env', config);

    console.info(`Script | New API key is ${GREEN}generated${RESET}!`);
  } catch (e) {
    if (e.code === 'ENOENT') {
      console.log(`Script | Initializing ${MAGENTA}.env.example${RESET} file.`);
      const dotFile = await fs.readFile('.env.example', { encoding: 'utf-8' });
      const config = parse(dotFile);

      console.info(`Script | Creating new ${MAGENTA}.env${RESET} file...`);
      closeSync(await fs.open('.env', 'w'));
      await writeConfig('.env', config);
      console.info(`Script | New API key is ${GREEN}generated${RESET}!`);
    } else {
      console.error(e);
    }
  }
};

const writeConfig = async (path, config) => {
  try {
    let configString = [];
    for (const key in config) {
      const splitKey = key.split('_');
      const placement = configString.find(val => val.key === splitKey[0]);
      if (placement) {
        placement.items = [...placement.items, `${key}=${config[key]}`];
      } else {
        configString = [...configString, { key: splitKey[0], items: [`${key}=${config[key]}`] }];
      }
    }

    await fs.writeFile(path, configString.map(val => val.items.join('\n')).join('\n\n'));
  } catch (e) {
    console.error(e);
  }
};

runScript();
