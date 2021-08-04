# xicons [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

[English](https://github.com/07akioni/xicons) · 中文

包含 `vicons`（vue3），`ricons`（react），`sicons`（svg）和 `v2icons`(vue2)。

整合自 [`fluentui-system-icons`](https://github.com/microsoft/fluentui-system-icons)、[`ionicons`](https://github.com/ionic-team/ionicons)、[`ant-design-icons`](https://github.com/ant-design/ant-design-icons)、[`material-design-icons`](https://github.com/google/material-design-icons)、[`Font-Awesome`](https://github.com/FortAwesome/Font-Awesome) [`tabler-icons`](https://github.com/tabler/tabler-icons) 和 [`carbon`](https://github.com/carbon-design-system/carbon/tree/main/packages/icons) 的 SVG Vue/React 组件。

同时 xicons 提供了一些图标工具组件来自定义图标的颜色和尺寸。

## 图标预览 & 查询

https://www.xicons.org

## 安装

### 安装图标组件

```bash
# 安装你需要的包
# 适用于 react
npm i -D @ricons/fluent
npm i -D @ricons/ionicons4
npm i -D @ricons/ionicons5
npm i -D @ricons/antd
npm i -D @ricons/material
npm i -D @ricons/fa # font awesome
npm i -D @ricons/tabler
npm i -D @ricons/carbon
# 适用于 vue3
npm i -D @vicons/fluent
npm i -D @vicons/ionicons4
npm i -D @vicons/ionicons5
npm i -D @vicons/antd
npm i -D @vicons/material
npm i -D @vicons/fa # font awesome
npm i -D @vicons/tabler
npm i -D @vicons/carbon
# 适用于 vue2
npm i -D @v2icons/fluent
npm i -D @v2icons/ionicons4
npm i -D @v2icons/ionicons5
npm i -D @v2icons/antd
npm i -D @v2icons/material
npm i -D @v2icons/fa # font awesome
npm i -D @v2icons/tabler
npm i -D @v2icons/carbon

# 使用 SVG
npm i -D @sicons/fluent
npm i -D @sicons/ionicons4
npm i -D @sicons/ionicons5
npm i -D @sicons/antd
npm i -D @sicons/material
npm i -D @sicons/fa # font awesome
npm i -D @sicons/tabler
npm i -D @sicons/carbon
```

### 安装图标工具组件

xicons 提供一些 Icon 组件来帮助调整内部 SVG 图标的颜色和尺寸。

```bash
npm i -D @ricons/utils  # react
npm i -D @vicons/utils  # vue3
npm i -D @v2icons/utils # vue2
```

## 使用方式

### 使用 Vue3

[vue3 例子](https://codesandbox.io/s/vicons-demo-sfzk9?file=/src/App.vue)

```html
<script>
  import { Money16Regular } from '@vicons/fluent'
  // or
  import Money16Regular from '@vicons/fluent/Money16Regular'

  // 你可以直接使用渲染为 SVG 的组件
  // 或者把它包裹在 @vicons/utils 提供的 Icon 组件中

  import { Icon } from '@vicons/utils'

  export default {
    components: {
      Icon,
      Money16Regular
    }
  }
</script>

<template>
  <Icon>
    <Money16Regular />
  </Icon>
</template>
```

#### Q & A

- (Vue3) 如何在 TypeScript 中创建一个接受图标组件作为输入的函数？

```ts
import type { Component } from 'vue'

function f(iconComponent: Component) {
  // ...
}
```

### 使用 React

[react 例子](https://codesandbox.io/s/ricons-demo-05dug?file=/src/App.tsx)

```tsx
import { Money16Regular } from '@ricons/fluent'
// or
import Money16Regular from '@ricons/fluent/Money16Regular'

// 你可以直接使用渲染为 SVG 的组件
// 或者把它包裹在 @ricons/utils 提供的 Icon 组件中
import { Icon } from '@ricons/utils'

function App() {
  return (
    <Icon>
      <Money16Regular />
    </Icon>
  )
}
```

### 使用 Vue2

[vue2 例子](https://codesandbox.io/s/v2icons-demo-xoeme?file=/src/App.vue)

```html
<script>
  import { Money16Regular } from '@v2icons/fluent'
  // or
  import Money16Regular from '@v2icons/fluent/Money16Regular'

  // 你可以直接使用渲染为 SVG 的组件
  // 或者把它包裹在 @v2icons/utils 提供的 Icon 组件中

  import { Icon } from '@v2icons/utils'

  export default {
    components: {
      Icon,
      Money16Regular
    }
  }
</script>

<template>
  <Icon>
    <Money16Regular />
  </Icon>
</template>
```

### 使用 SVG

```html
<img src="@sicons/fluent/Money16Regular.svg" />
```

## 工具组件 API

### Icon API

一个（在 `@vicons/utils`、`@ricons/utils`、`@v2icons/utils` 的）Icon 组件，可以调整内部 SVG 组件的颜色和尺寸。

| prop  | 类型               | 默认值 | 描述                   |
| ----- | ------------------ | ------ | ---------------------- |
| size  | `string \| number` | -      | 图标的尺寸             |
| color | `string`           | -      | 图标的颜色             |
| tag   | `string`           | `span` | 要渲染为何种 HTML 标签 |

使用方式：

```tsx
import { Icon } from '@ricons/utils' // react
import { Icon } from '@vicons/utils' // vue3
import { Icon } from '@v2icons/utils' // vue2

// 渲染节点
;<Icon color="green" size="48">
  <SomeIcon />
</Icon>
```

### IconConfigProvider API

IconConfigProvider 会影响所有内部 Icon 组件的 prop 默认值。

| prop  | 类型               | 默认值 | 描述                   |
| ----- | ------------------ | ------ | ---------------------- |
| size  | `string \| number` | -      | 图标的尺寸             |
| color | `string`           | -      | 图标的颜色             |
| tag   | `string`           | `span` | 要渲染为何种 HTML 标签 |

使用方式：

```tsx
import { IconConfigProvider, Icon } from '@ricons/utils'  // react
import { IconConfigProvider, Icon } from '@vicons/utils'  // vue3
import { IconConfigProvider, Icon } from '@v2icons/utils' // vue2

// 渲染节点
;<IconConfigProvider color="green" size="48">
  <App>
    <Icon>
      <SomeIcon />
    </Icon>
  <App/>
</IconConfigProvider>
```

## 常见问题

### `too many open files`

这是由于打包时程序打开的文件超出了系统限制的数量。

使用 `ulimit -n` 查看这个限制。

你只能增加这个限制或者使用路径单个引入图标：

```js
import Money16Regular from '@ricons/fluent/Money16Regular'
```

## 图标工具包

| package        | version                                                                                                        | description                     |
| -------------- | -------------------------------------------------------------------------------------------------------------- | ------------------------------- |
| @ricons/utils  | [![npm version](https://badge.fury.io/js/%40ricons%2Futils.svg)](https://badge.fury.io/js/%40ricons%2Futils)   | Util icon components for react. |
| @vicons/utils  | [![npm version](https://badge.fury.io/js/%40vicons%2Futils.svg)](https://badge.fury.io/js/%40vicons%2Futils)   | Util icon components for vue3.  |
| @v2icons/utils | [![npm version](https://badge.fury.io/js/%40v2icons%2Futils.svg)](https://badge.fury.io/js/%40v2icons%2Futils) | Util icon components for vue2.  |

## 图标包

### Vue3

| package           | version                                                                                                              |
| ----------------- | -------------------------------------------------------------------------------------------------------------------- |
| @vicons/fluent    | [![npm version](https://badge.fury.io/js/%40vicons%2Ffluent.svg)](https://badge.fury.io/js/%40vicons%2Ffluent)       |
| @vicons/ionicons4 | [![npm version](https://badge.fury.io/js/%40vicons%2Fionicons4.svg)](https://badge.fury.io/js/%40vicons%2Fionicons4) |
| @vicons/ionicons5 | [![npm version](https://badge.fury.io/js/%40vicons%2Fionicons5.svg)](https://badge.fury.io/js/%40vicons%2Fionicons5) |
| @vicons/antd      | [![npm version](https://badge.fury.io/js/%40vicons%2Fantd.svg)](https://badge.fury.io/js/%40vicons%2Fantd)           |
| @vicons/material  | [![npm version](https://badge.fury.io/js/%40vicons%2Fmaterial.svg)](https://badge.fury.io/js/%40vicons%2Fmaterial)   |
| @vicons/fa        | [![npm version](https://badge.fury.io/js/%40vicons%2Ffa.svg)](https://badge.fury.io/js/%40vicons%2Ffa)               |
| @vicons/tabler    | [![npm version](https://badge.fury.io/js/%40vicons%2Ftabler.svg)](https://badge.fury.io/js/%40vicons%2Ftabler)       |
| @vicons/carbon    | [![npm version](https://badge.fury.io/js/%40vicons%2Fcarbon.svg)](https://badge.fury.io/js/%40vicons%2Fcarbon)       |

### React

| package           | version                                                                                                              |
| ----------------- | -------------------------------------------------------------------------------------------------------------------- |
| @ricons/fluent    | [![npm version](https://badge.fury.io/js/%40ricons%2Ffluent.svg)](https://badge.fury.io/js/%40ricons%2Ffluent)       |
| @ricons/ionicons4 | [![npm version](https://badge.fury.io/js/%40ricons%2Fionicons4.svg)](https://badge.fury.io/js/%40ricons%2Fionicons4) |
| @ricons/ionicons5 | [![npm version](https://badge.fury.io/js/%40ricons%2Fionicons5.svg)](https://badge.fury.io/js/%40ricons%2Fionicons5) |
| @ricons/antd      | [![npm version](https://badge.fury.io/js/%40ricons%2Fantd.svg)](https://badge.fury.io/js/%40ricons%2Fantd)           |
| @ricons/material  | [![npm version](https://badge.fury.io/js/%40ricons%2Fmaterial.svg)](https://badge.fury.io/js/%40ricons%2Fmaterial)   |
| @ricons/fa        | [![npm version](https://badge.fury.io/js/%40ricons%2Ffa.svg)](https://badge.fury.io/js/%40ricons%2Ffa)               |
| @ricons/tabler    | [![npm version](https://badge.fury.io/js/%40ricons%2Ftabler.svg)](https://badge.fury.io/js/%40ricons%2Ftabler)       |
| @ricons/carbon    | [![npm version](https://badge.fury.io/js/%40ricons%2Fcarbon.svg)](https://badge.fury.io/js/%40ricons%2Fcarbon)       |

### Vue2

| package            | version                                                                                                                |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------- |
| @v2icons/fluent    | [![npm version](https://badge.fury.io/js/%40v2icons%2Ffluent.svg)](https://badge.fury.io/js/%40v2icons%2Ffluent)       |
| @v2icons/ionicons4 | [![npm version](https://badge.fury.io/js/%40v2icons%2Fionicons4.svg)](https://badge.fury.io/js/%40v2icons%2Fionicons4) |
| @v2icons/ionicons5 | [![npm version](https://badge.fury.io/js/%40v2icons%2Fionicons5.svg)](https://badge.fury.io/js/%40v2icons%2Fionicons5) |
| @v2icons/antd      | [![npm version](https://badge.fury.io/js/%40v2icons%2Fantd.svg)](https://badge.fury.io/js/%40v2icons%2Fantd)           |
| @v2icons/material  | [![npm version](https://badge.fury.io/js/%40v2icons%2Fmaterial.svg)](https://badge.fury.io/js/%40v2icons%2Fmaterial)   |
| @v2icons/fa        | [![npm version](https://badge.fury.io/js/%40v2icons%2Ffa.svg)](https://badge.fury.io/js/%40v2icons%2Ffa)               |
| @v2icons/tabler    | [![npm version](https://badge.fury.io/js/%40v2icons%2Ftabler.svg)](https://badge.fury.io/js/%40v2icons%2Ftabler)       |
| @v2icons/carbon    | [![npm version](https://badge.fury.io/js/%40v2icons%2Fcarbon.svg)](https://badge.fury.io/js/%40v2icons%2Fcarbon)       |

### SVG

| package           | version                                                                                                              |
| ----------------- | -------------------------------------------------------------------------------------------------------------------- |
| @sicons/fluent    | [![npm version](https://badge.fury.io/js/%40sicons%2Ffluent.svg)](https://badge.fury.io/js/%40sicons%2Ffluent)       |
| @sicons/ionicons4 | [![npm version](https://badge.fury.io/js/%40sicons%2Fionicons4.svg)](https://badge.fury.io/js/%40sicons%2Fionicons4) |
| @sicons/ionicons5 | [![npm version](https://badge.fury.io/js/%40sicons%2Fionicons5.svg)](https://badge.fury.io/js/%40sicons%2Fionicons5) |
| @sicons/antd      | [![npm version](https://badge.fury.io/js/%40sicons%2Fantd.svg)](https://badge.fury.io/js/%40sicons%2Fantd)           |
| @sicons/material  | [![npm version](https://badge.fury.io/js/%40sicons%2Fmaterial.svg)](https://badge.fury.io/js/%40sicons%2Fmaterial)   |
| @sicons/fa        | [![npm version](https://badge.fury.io/js/%40sicons%2Ffa.svg)](https://badge.fury.io/js/%40sicons%2Ffa)               |
| @sicons/tabler    | [![npm version](https://badge.fury.io/js/%40sicons%2Ftabler.svg)](https://badge.fury.io/js/%40sicons%2Ftabler)       |
| @sicons/carbon    | [![npm version](https://badge.fury.io/js/%40sicons%2Fcarbon.svg)](https://badge.fury.io/js/%40sicons%2Fcarbon)       |

## Credit

| Icon Set                                                                      | License                                                                             |
| ----------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| [`ant-design-icons`](https://github.com/ant-design/ant-design-icons)          | [MIT](https://opensource.org/licenses/MIT)                                          |
| [`fluentui-system-icons`](https://github.com/microsoft/fluentui-system-icons) | [MIT](https://opensource.org/licenses/MIT)                                          |
| [`Font-Awesome`](https://github.com/FortAwesome/Font-Awesome)                 | [CC BY 4.0 License](https://creativecommons.org/licenses/by/4.0/)                   |
| [`ionicons`](https://github.com/ionic-team/ionicons)                          | [MIT](https://opensource.org/licenses/MIT)                                          |
| [`material-design-icons`](https://github.com/google/material-design-icons)    | [Apache 2](https://github.com/google/material-design-icons/blob/master/LICENSE)     |
| [`tabler-icons`](https://github.com/tabler/tabler-icons)                      | [MIT](https://opensource.org/licenses/MIT)                                          |
| [`carbon`](https://github.com/tabler/tabler-icons)                            | [Apache 2](https://github.com/carbon-design-system/carbon/tree/main/packages/icons) |
