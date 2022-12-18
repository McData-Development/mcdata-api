const { parse } = require('dotenv');
const { v4: uuid } = require('uuid');
const { readFileSync, writeFileSync, closeSync, openSync } = require('node:fs');

const MAGENTA = '\x1b[35m';
const RESET = '\x1b[0m';
const GREEN = '\x1b[32m';

const runScript = () => {
  try {
    const dotFile = readFileSync('.env', { encoding: 'utf-8' });
    console.info(`Script | Initializing ${MAGENTA}.env${RESET} file...`);
    const config = parse(dotFile);

    config['API_KEY'] = uuid();
    writeConfig('.env', config);

    console.info(`Script | New API key is ${GREEN}generated${RESET}!`);
  } catch (e) {
    switch (e.code) {
      case 'ENOENT': {
        const dotFile = readFileSync('.env.example', { encoding: 'utf-8' });
        console.info(`Script | Initializing ${MAGENTA}.env.example${RESET} file.`);
        const config = parse(dotFile);
        
        console.info(`Script | Creating new ${MAGENTA}.env${RESET} file...`);
        closeSync(openSync('.env', 'w'));
        writeConfig('.env', config);
        console.info(`Script | New API key is ${GREEN}generated${RESET}!`);
        break;
      }
    }
  }
};

const writeConfig = (path, config) => {
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

    writeFileSync(path, configString.map(val => val.items.join('\n')).join('\n\n'));
  } catch (e) {
    console.error(e);
  }
};

runScript();
