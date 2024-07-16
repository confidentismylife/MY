<script setup lang="ts">
// 导入类型定义文件中的IconProps类型
import { type IconProps } from "./types";
// 导入FontAwesomeIcon组件
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
// 导入lodash-es库中的omit函数
import { omit } from "lodash-es";
// 导入vue中的computed函数
import { computed } from "vue";

// 定义组件选项
defineOptions({
  name: "ErIcon", // 设置组件名称为ErIcon
  inheritAttrs: false, // 不继承父组件的属性
});

// 定义组件的props，类型为IconProps
const props = defineProps<IconProps>();

// 使用computed函数创建一个计算属性filterProps
// 该属性会从props中移除type和color属性
const filterProps = computed(() => omit(props, ["type", "color"]));

// 使用computed函数创建一个计算属性customStyles
// 该属性会根据props中的color属性设置样式
const customStyles = computed(() => ({ color: props.color ?? void 0 }));
</script>

<template>
  <i
    class="er-icon"
    :class="{ [`er-icon--${type}`]: type }"
    :style="customStyles"
    v-bind="$attrs"
  >
    <font-awesome-icon v-bind="filterProps" />
  </i>
</template>

<style scoped>
@import "./style.css";
</style>
