# xicons [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

English · [中文](https://github.com/07akioni/xicons/blob/main/README.zh-CN.md)

Include `vicons`(vue3), `ricons`(react), `sicons`(svg) & `v2icons`(vue2).

SVG Vue/React components integrated from [`fluentui-system-icons`](https://github.com/microsoft/fluentui-system-icons), [`ionicons`](https://github.com/ionic-team/ionicons), [`ant-design-icons`](https://github.com/ant-design/ant-design-icons), [`material-design-icons`](https://github.com/google/material-design-icons), [`Font-Awesome`](https://github.com/FortAwesome/Font-Awesome) and [`tabler-icons`](https://github.com/tabler/tabler-icons).

Util icon component for customizing color & size is also provided.

## Icons Preview & Search

https://www.xicons.org

## Installation

### Icons Installation

```bash
# Install packages on your demand
# For react
npm i -D @ricons/fluent
npm i -D @ricons/ionicons4
npm i -D @ricons/ionicons5
npm i -D @ricons/antd
npm i -D @ricons/material
npm i -D @ricons/fa # font awesome
npm i -D @ricons/tabler
# For vue3
npm i -D @vicons/fluent
npm i -D @vicons/ionicons4
npm i -D @vicons/ionicons5
npm i -D @vicons/antd
npm i -D @vicons/material
npm i -D @vicons/fa # font awesome
npm i -D @vicons/tabler
# For vue2
npm i -D @v2icons/fluent
npm i -D @v2icons/ionicons4
npm i -D @v2icons/ionicons5
npm i -D @v2icons/antd
npm i -D @v2icons/material
npm i -D @v2icons/fa # font awesome
npm i -D @v2icons/tabler
# For SVG file
npm i -D @sicons/fluent
npm i -D @sicons/ionicons4
npm i -D @sicons/ionicons5
npm i -D @sicons/antd
npm i -D @sicons/material
npm i -D @sicons/fa # font awesome
npm i -D @sicons/tabler
```

### Icon Utils Installation

Icon utils provide a icon wrapper component for customizing color & size of the inner SVG icon.

```bash
npm i -D @ricons/utils  # react
npm i -D @vicons/utils  # vue3
npm i -D @v2icons/utils # vue2
```

## Usage

### For Vue3

[vue3 demo](https://codesandbox.io/s/vicons-demo-sfzk9?file=/src/App.vue)

```html
<script>
  import { Money16Regular } from '@vicons/fluent'
  // or
  import Money16Regular from '@vicons/fluent/Money16Regular'

  // You can directly use the SVG component
  // or wrap it in an Icon component from @vicons/utils

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

- (Vue3) How to create a function that accepts an icon component as input in TypeScript?

```ts
import type { Component } from 'vue'

function f(iconComponent: Component) {
  // ...
}
```

### For React

[react demo](https://codesandbox.io/s/ricons-demo-05dug?file=/src/App.tsx)

```tsx
import { Money16Regular } from '@ricons/fluent'
// or
import Money16Regular from '@ricons/fluent/Money16Regular'

// You can directly use the SVG component
// or wrap it in an Icon component from @ricons/utils
import { Icon } from '@ricons/utils'

function App() {
  return (
    <Icon>
      <Money16Regular />
    </Icon>
  )
}
```

### For Vue2

[vue2 demo](https://codesandbox.io/s/v2icons-demo-xoeme?file=/src/App.vue)

```html
<script>
  import { Money16Regular } from '@v2icons/fluent'
  // or
  import Money16Regular from '@v2icons/fluent/Money16Regular'

  // You can directly use the SVG component
  // or wrap it in an Icon component from @v2icons/utils

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

### For SVG

```html
<img src="@sicons/fluent/Money16Regular.svg" />
```

## Utils API

### Icon API

An icon component (in `@vicons/utils`, `@ricons/utils`, `@v2icons/utils`) is provided for customizing color & size of the inner SVG icon.

| prop  | type               | default | description            |
| ----- | ------------------ | ------- | ---------------------- |
| size  | `string \| number` | -       | Size of the icon.      |
| color | `string`           | -       | Color of the icon.     |
| tag   | `string`           | `span`  | Tag to be rendered as. |

For example:

```tsx
import { Icon } from '@ricons/utils' // react
import { Icon } from '@vicons/utils' // vue3
import { Icon } from '@v2icons/utils' // vue2

// render it
;<Icon color="green" size="48">
  <SomeIcon />
</Icon>
```

### IconConfigProvider API

IconConfigProvider will affect all the descendant Icons' default prop value.

| prop  | type               | default | description            |
| ----- | ------------------ | ------- | ---------------------- |
| size  | `string \| number` | -       | Size of the icon.      |
| color | `string`           | -       | Color of the icon.     |
| tag   | `string`           | `span`  | Tag to be rendered as. |

For example:

```tsx
import { IconConfigProvider, Icon } from '@ricons/utils'  // react
import { IconConfigProvider, Icon } from '@vicons/utils'  // vue3
import { IconConfigProvider, Icon } from '@v2icons/utils' // vue2

// render it
;<IconConfigProvider color="green" size="48">
  <App>
    <Icon>
      <SomeIcon />
    </Icon>
  <App/>
</IconConfigProvider>
```

## Icon Utils Packages

| package        | version                                                                                                        | description                     |
| -------------- | -------------------------------------------------------------------------------------------------------------- | ------------------------------- |
| @ricons/utils  | [![npm version](https://badge.fury.io/js/%40ricons%2Futils.svg)](https://badge.fury.io/js/%40ricons%2Futils)   | Util icon components for react. |
| @vicons/utils  | [![npm version](https://badge.fury.io/js/%40vicons%2Futils.svg)](https://badge.fury.io/js/%40vicons%2Futils)   | Util icon components for vue3.  |
| @v2icons/utils | [![npm version](https://badge.fury.io/js/%40v2icons%2Futils.svg)](https://badge.fury.io/js/%40v2icons%2Futils) | Util icon components for vue2.  |

## Icon Packages

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

## Credit

| Icon Set                                                                      | License                                                                         |
| ----------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| [`ant-design-icons`](https://github.com/ant-design/ant-design-icons)          | [MIT](https://opensource.org/licenses/MIT)                                      |
| [`fluentui-system-icons`](https://github.com/microsoft/fluentui-system-icons) | [MIT](https://opensource.org/licenses/MIT)                                      |
| [`Font-Awesome`](https://github.com/FortAwesome/Font-Awesome)                 | [CC BY 4.0 License](https://creativecommons.org/licenses/by/4.0/)               |
| [`ionicons`](https://github.com/ionic-team/ionicons)                          | [MIT](https://opensource.org/licenses/MIT)                                      |
| [`material-design-icons`](https://github.com/google/material-design-icons)    | [Apache 2](https://github.com/google/material-design-icons/blob/master/LICENSE) |
| [`tabler-icons`](https://github.com/tabler/tabler-icons)                      | [MIT](https://opensource.org/licenses/MIT)                                      |
