<script setup lang="ts">
// 导入 ButtonGroupProps 类型，用于定义组件的 props
import type { ButtonGroupProps } from "./types";
// 导入 Vue 提供的 provide、reactive 和 toRef 方法
import { provide, reactive, toRef } from "vue";
// 导入 BUTTON_GROUP_CTX_KEY 常量，用于 provide 的键名
import { BUTTON_GROUP_CTX_KEY } from "./constants";

// 定义组件的选项，设置组件名称为 "ErButtonGroup"
defineOptions({
  name: "ErButtonGroup",
});

// 定义组件的 props，使用 ButtonGroupProps 类型
const props = defineProps<ButtonGroupProps>();

// 使用 provide 方法向后代组件提供数据
provide(
  BUTTON_GROUP_CTX_KEY,
  reactive({
    // 将 props 中的 size 属性转换为响应式引用
    size: toRef(props, "size"),
    // 将 props 中的 type 属性转换为响应式引用
    type: toRef(props, "type"),
    // 将 props 中的 disabled 属性转换为响应式引用
    disabled: toRef(props, "disabled"),
  })
);
</script>

<template>
  <div class="er-button-group">
    <slot></slot>
  </div>
</template>

<style scoped>
/* 导入样式文件，scoped 表示样式仅对当前组件生效 */
@import "./style.css";
</style>