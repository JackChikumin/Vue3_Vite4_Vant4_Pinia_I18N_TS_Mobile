
<template>
  <ConfigProvider class="Provider" :theme="DarkMode" :theme-vars="themeVars">
    <RouterView v-slot="{ Component }">
      <KeepAlive>
        <Component :is="Component" v-if="$route.meta.keepAlive" />
      </KeepAlive>
      <Component :is="Component" v-if="!$route.meta.keepAlive" />
    </RouterView>
  </ConfigProvider>
</template>

<script setup lang="ts">
  import VConsole from 'vconsole';
  import { ConfigProvider } from 'vant';
  import { RouterView, useRoute } from 'vue-router';
  import { computed, onBeforeMount, watch } from 'vue';
  import { useSystemStoreWithOut } from '/@/stores/modules/SystemConfig';
  import { MonitoringTheme, WatchSystemTheme } from '/@/utils/DarkThemeUtils';

  const systemStore = useSystemStoreWithOut();

  const router = useRoute();

  // 主题模式
  const DarkMode = computed(() => {
    return systemStore.getDarkMode;
  });

  // 主题变量
  const themeVars = computed(() => {
    return systemStore.getThemeVars;
  });

  // 是否显示Vconsole
  const isShowConsole = (): void => {
    if (import.meta.env.DEV) {
      new VConsole({ theme: DarkMode.value });
    }
  };

  // 深度监听路由改变
  watch(
    () => router.path,
    (): void => {
      MonitoringTheme(true);
    },
    {
      deep: true
    }
  );

  onBeforeMount((): void => {
    MonitoringTheme(true);
    WatchSystemTheme();
    isShowConsole();
  });
</script>
