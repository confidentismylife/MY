<script setup lang="ts">
// 导入 Vue 相关的函数和类型
import { ref, computed, inject } from "vue";
import type { ButtonProps, ButtonEmits, ButtonInstance } from "./types";
import { BUTTON_GROUP_CTX_KEY } from "./constants";
import { throttle } from "lodash-es";
import ErIcon from "../Icon/Icon.vue";

// 定义组件的名称
defineOptions({
  name: "ErButton",
});

// 定义组件的 props，并设置默认值
const props = withDefaults(defineProps<ButtonProps>(), {
  tag: "button", // 默认标签为 button
  nativeType: "button", // 默认原生类型为 button
  useThrottle: true, // 默认使用节流
  throttleDuration: 500, // 默认节流时间为 500ms
});

// 定义组件的 emits
const emits = defineEmits<ButtonEmits>();

// 定义组件的 slots
const slots = defineSlots();

// 注入按钮组上下文，如果没有则使用 undefined
const buttonGroupCtx = inject(BUTTON_GROUP_CTX_KEY, void 0);

// 创建一个 ref 用于引用按钮元素
const _ref = ref<HTMLButtonElement>();

// 计算属性，获取按钮的大小
const size = computed(() => buttonGroupCtx?.size ?? props.size ?? "");

// 计算属性，获取按钮的类型
const type = computed(() => buttonGroupCtx?.type ?? props.type ?? "");

// 计算属性，判断按钮是否禁用
const disabled = computed(
  () => props.disabled || buttonGroupCtx?.disabled || false
);

// 计算属性，设置图标的样式
const iconStyle = computed(() => ({
  marginRight: slots.default ? "6px" : "0px",
}));

// 处理按钮点击事件
const handleBtnClick = (e: MouseEvent) => {
  emits("click", e);
};

// 使用节流函数处理按钮点击事件
const handlBtneCLickThrottle = throttle(handleBtnClick, props.throttleDuration);

// 暴露组件的属性和方法
defineExpose<ButtonInstance>({
  ref: _ref,
  disabled,
  size,
  type,
});
</script>

<template>
  <component
    :is="tag"
    ref="_ref"
    class="er-button"
    :class="{
      [`er-button--${type}`]: type,
      [`er-button--${size}`]: size,
      'is-plain': plain,
      'is-round': round,
      'is-circle': circle,
      'is-disabled': disabled,
      'is-loading': loading,
    }"
    :disabled="disabled || loading ? true : void 0"
    :type="tag === 'button' ? nativeType : void 0"
    :autofocus="autofocus"
    @click="
      (e: MouseEvent) =>
        useThrottle ? handlBtneCLickThrottle(e) : handleBtnClick(e)
    "
  >
    <template v-if="loading">
      <slot name="loading">
        <er-icon
          class="loading-icon"
          :icon="loadingIcon ?? 'spinner'"
          :style="iconStyle"
          size="1x"
          spin
        />
      </slot>
    </template>
    <er-icon
      :icon="icon"
      size="1x"
      :style="iconStyle"
      v-if="icon && !loading"
    />

    <slot></slot>
  </component>
</template>

<style scoped>
@import "./style.css";
</style>