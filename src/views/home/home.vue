<template>
  <NavBar />
  <Swipe :autoplay="3000" lazy-render>
    <SwipeItem v-for="(item, index) in images" :key="index">
      <VanImage :src="item" block />
    </SwipeItem>
  </Swipe>
  <Button type="primary" text="更改主题" @click="showPicker = !showPicker" />
  <TabBar />
  <Suspended />
  <ThemePicker :showPicker="showPicker" @handlePicker="ClosePicker" />
</template>

<script lang="ts" setup>
  import { ref, reactive } from 'vue';
  import { Swipe, SwipeItem, Button, Image as VanImage } from 'vant';
  import { TabBar, NavBar, Suspended, ThemePicker } from '/@/components';

  // 是否显示主题切换组件
  const showPicker = ref<boolean>(false);

  const images = reactive([
    'https://fastly.jsdelivr.net/npm/@vant/assets/apple-1.jpeg',
    'https://fastly.jsdelivr.net/npm/@vant/assets/apple-2.jpeg'
  ]);

  // 关闭回调
  const ClosePicker = (): void => {
    showPicker.value = false;
  };
</script>

<style lang="less" scoped>
  .van-swipe-item {
    color: #fff;
    font-size: 20px;
    text-align: center;
    background-color: #39a9ed;
  }
</style>
