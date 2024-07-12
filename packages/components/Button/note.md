# 按钮组件需求文档

## 概述
按钮是用户界面中常见的交互组件，用于触发各种操作和功能。本需求文档描述了按钮组件的基本样式、功能和 API。

## 基本用法

### 2.1 按钮类型
- **基础按钮**：使用 `type` 属性定义按钮类型，可选 `primary`、`success`、`warning`、`danger`、`info`。
- **朴素按钮**：使用 `plain` 属性定义为朴素按钮。
- **圆角按钮**：使用 `round` 属性定义为圆角按钮。
- **圆形按钮**：使用 `circle` 属性定义为圆形按钮。

### 2.2 禁用状态
使用 `disabled` 属性定义按钮是否禁用。

### 2.3 图标按钮
使用 `icon` 属性定义按钮图标。

### 2.4 按钮组
使用 `<er-button-group>` 组件对多个按钮进行分组。

### 2.5 加载状态
使用 `loading` 属性定义按钮是否处于加载状态。可通过 `loading` 插槽或 `loadingIcon` 属性自定义加载图标。

### 2.6 按钮尺寸
使用 `size` 属性定义按钮尺寸，可选 `large`、`default`、`small`。

### 2.7 自定义标签
使用 `tag` 属性自定义按钮元素的标签名称。

### 2.8 节流模式
使用 `useThrottle` 属性定义按钮是否使用节流模式。

## API

### 3.1 Button Props
- `size`：按钮尺寸
- `type`：按钮类型
- `plain`：是否为朴素按钮
- `round`：是否为圆角按钮
- `circle`：是否为圆形按钮
- `loading`：是否为加载状态
- `loading-icon`：自定义加载图标
- `disabled`：是否禁用
- `icon`：按钮图标
- `autofocus`：是否自动聚焦
- `native-type`：原生 `type` 属性
- `tag`：自定义元素标签
- `use-throttle`：是否使用节流模式
- `throttle-duration`：节流模式下的节流时间间隔

### 3.2 Button Events
- `click`：按钮点击事件

### 3.3 Button Slots
- `default`：按钮内容
- `loading`：自定义加载图标

### 3.4 Button Expose
- `ref`：按钮 HTML 元素
- `size`：按钮尺寸
- `type`：按钮类型
- `disabled`：按钮禁用状态

### 3.5 ButtonGroup Props
- `size`：按钮组尺寸
- `type`：按钮组类型
- `disabled`：按钮组是否禁用

### 3.6 ButtonGroup Slots
- `default`：按钮组内部按钮

