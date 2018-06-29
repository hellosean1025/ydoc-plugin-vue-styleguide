const styleguidist = require ('vue-styleguidist');
const path = require ('path');
const fs = require('fs');
const shell = require('shelljs')
const configFilepath = path.resolve(__dirname, 'styleguide.js');

function runBuild (inst) {
  return new Promise ((resolve, reject) => {
    inst.build ((err, config) => {
      if (err) {
        console.log (err);
        reject (err);
      } else {
        console.log ('Style guide published to', config.styleguideDir);
        resolve (true);
      }
    });
  });
}

module.exports = {
  init: async function () {
    const dist = this.config.dist;
    const root = process.cwd ();
    const componentsPath = path.resolve (dist, 'components');

    if(!this.options || !this.options.components){
      throw new Error('必须在 ydoc-plugin-vue-styleguide 插件配置里配置 "components"');
    }

    const webpackConfig = this.options.webpackConfigPath;
    webpackConfig.context = root;

    const config = {
      components: this.options.components,
      styleguideDir: componentsPath,
      webpackConfig,
    }

    const inst = styleguidist (config);
    const indexFile = 'index.html'
    if (process.env.NODE_ENV === 'production') {
      await runBuild (inst);
      let content = require ('fs').readFileSync (
        path.resolve (componentsPath, indexFile),
        'utf8'
      );
      content = content.match (/<body>([\s\S]+?)<\/body>/i);
      require ('fs').writeFileSync (
        path.resolve (componentsPath, indexFile),
        content[1]
      );
    } else {
      require ('fs').writeFileSync (
        path.resolve (componentsPath, indexFile),
        `<iframe src="${'http://localhost:6060/'}" style="border:none" width="100%" height="100%" ></iframe>`
      );
    }
  }
};
