<template>
  <Popup v-model:show="showPickerView" teleport=".Provider" position="bottom" @close="ClosePicker">
    <!-- 主题色 -->
    <Cell v-for="(item, index) in APP_PRESET_COLOR_LIST" :key="index" @click="setThemeColor(item)">
      <template #title>
        <div :style="{ width: '100px', height: '25px', background: item.value }"></div>
      </template>
      <template #right-icon>
        <Icon v-if="getThemeColor === item.value" :color="item.value" name="success" :size="25" />
      </template>
    </Cell>
    <!-- 主题模式 -->
    <Cell :title="t('sys.darkMode.mode')">
      <template #right-icon>
        <Switch v-model="DarkMode" @change="ChangeDarkMode" size="25" />
      </template>
    </Cell>
    <!-- 网站灰色模式，用于可能悼念的日期开启 -->
    <Cell :title="t('common.grayMode')">
      <template #right-icon>
        <Switch v-model="grayMode" @change="ChangeGrayMode" size="25" />
      </template>
    </Cell>
    <!-- 色弱模式 -->
    <Cell :title="t('common.colorWeak')">
      <template #right-icon>
        <Switch v-model="colorWeak" @change="ChangeColorWeak" size="25" />
      </template>
    </Cell>
  </Popup>
</template>

<script lang="ts" setup>
  import { ThemeEnum } from '/@/enums/appEnum';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { Popup, Cell, Icon, Switch } from 'vant';
  import { ref, computed, onBeforeMount } from 'vue';
  import type { ColorType } from '/@/settings/projectSetting';
  import { getThemeVars } from '/@/logics/theme/getThemeVars';
  import { APP_PRESET_COLOR_LIST } from '/@/settings/projectSetting';
  import { useSystemStoreWithOut } from '/@/stores/modules/SystemConfig';

  // store
  const systemStore = useSystemStoreWithOut();

  // i18n
  const { t } = useI18n();

  // 主题模式
  const DarkMode = ref<boolean>(false);

  // 网站灰色模式
  const grayMode = computed(() => {
    return systemStore.getGrayMode;
  });

  // 色弱模式
  const colorWeak = computed(() => {
    return systemStore.getColorWeak;
  });

  const props = defineProps({
    // 是否显示picker
    showPicker: {
      type: Boolean,
      default: false,
      required: true
    },
  });

  const showPickerView = computed(() => {
    return props.showPicker;
  })

  const emit = defineEmits(['handlePicker']);

  // 当前主题
  const getThemeColor = computed(() => {
    return systemStore.getThemeColor;
  });

  // 切换主题色
  const setThemeColor = (Color: ColorType): void => {
    systemStore.setThemeColor(Color.value);
    // 获取主题变量
    const themeVars = getThemeVars(Color.value);
    // 修改主题变量配置
    systemStore.setThemeVars(themeVars);
    ClosePicker();
  };

  // 修改主题模式
  const ChangeDarkMode = (): void => {
    systemStore.setDarkMode(DarkMode.value ? ThemeEnum.DARK : ThemeEnum.LIGHT);
    ClosePicker();
  };

  // 修改灰色模式
  const ChangeGrayMode = (): void => {
    systemStore.setGrayMode(!grayMode.value);
    ClosePicker();
  };

  // 色弱模式
  const ChangeColorWeak = (): void => {
    systemStore.setColorWeak(!colorWeak.value);
    ClosePicker();
  };

  // 回调函数
  const ClosePicker = (): void => {
    // 关闭Picker
    emit('handlePicker', false);
  };

  onBeforeMount((): void => {
    DarkMode.value = systemStore.getDarkMode === ThemeEnum.DARK;

  });
</script>

<style lang="less" scoped></style>
