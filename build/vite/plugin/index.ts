import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { configCompressPlugin } from './compress';
import { configVisualizerConfig } from './visualizer';
import VitePluginCertificate from 'vite-plugin-mkcert';
import { configStyleImportPlugin } from './styleImport';
import vueSetupExtend from 'vite-plugin-vue-setup-extend';

export function createVitePlugins(viteEnv: ViteEnv, isBuild: boolean) {
  const {
    VITE_BUILD_COMPRESS,
    VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE,
  } = viteEnv;

  const vitePlugins = [
    // have to
    vue(),
    vueJsx(),
    // support name
    vueSetupExtend(),
    VitePluginCertificate({
      source: 'coding',
    }),
  ];

  // unplugin-vue-components
  vitePlugins.push(configStyleImportPlugin());

  // rollup-plugin-visualizer
  vitePlugins.push(configVisualizerConfig());

  // The following plugins only work in the production environment
  if (isBuild) {

    // rollup-plugin-gzip
    vitePlugins.push(
      configCompressPlugin(VITE_BUILD_COMPRESS, VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE),
    );
  }

  return vitePlugins;
}
