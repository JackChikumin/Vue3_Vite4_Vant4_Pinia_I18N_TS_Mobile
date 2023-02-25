/**
 *  Introduces component library styles on demand.
 * https://github.com/anncwb/vite-plugin-style-import
 */
 import Components from 'unplugin-vue-components/vite';
 import { VantResolver } from 'unplugin-vue-components/resolvers';

export function configStyleImportPlugin() {
  // if (!isBuild) {
  //   return [];
  // }
  return Components({
    resolvers: [VantResolver()],
  });
}
