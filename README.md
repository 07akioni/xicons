# xicons [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Include `vicons`(vue3), `ricons`(react), `sicons`(svg) & `v2icons`(vue2).

SVG Vue/React components integrated from [`fluentui-system-icons`](https://github.com/microsoft/fluentui-system-icons), [`ionicons`](https://github.com/ionic-team/ionicons), [`ant-design-icons`](https://github.com/ant-design/ant-design-icons), [`material-design-icons`](https://github.com/google/material-design-icons) and [`Font-Awesome`](https://github.com/FortAwesome/Font-Awesome).

## Icons
https://xicons.vercel.app/

## Installation
```bash
# Install packages on your demand
# For react
npm install --save-dev @ricons/fluent
npm install --save-dev @ricons/ionicons4
npm install --save-dev @ricons/ionicons5
npm install --save-dev @ricons/antd
npm install --save-dev @ricons/material
npm install --save-dev @ricons/fa # font awesome
# For vue3
npm install --save-dev @vicons/fluent
npm install --save-dev @vicons/ionicons4
npm install --save-dev @vicons/ionicons5
npm install --save-dev @vicons/antd
npm install --save-dev @vicons/material
npm install --save-dev @vicons/fa # font awesome
# For vue2
npm install --save-dev @v2icons/fluent
npm install --save-dev @v2icons/ionicons4
npm install --save-dev @v2icons/ionicons5
npm install --save-dev @v2icons/antd
npm install --save-dev @v2icons/material
npm install --save-dev @v2icons/fa # font awesome
# For SVG file
npm install --save-dev @sicons/fluent
npm install --save-dev @sicons/ionicons4
npm install --save-dev @sicons/ionicons5
npm install --save-dev @sicons/antd
npm install --save-dev @sicons/material
npm install --save-dev @sicons/fa # font awesome
```

## Usage
For Vue3
```ts
import {
  Money16Regular
} from '@vicons/fluent'
// or
import Money16Regular from '@vicons/fluent/Money16Regular'

// use it in any form you like
// remember it is a SVG component
```

For React
```ts
import {
  Money16Regular
} from '@ricons/fluent'
// or
import Money16Regular from '@ricons/fluent/Money16Regular'
```

For Vue2 (you need `vue-loader`, the source is not compiled)
```js
import {
  Money16Regular
} from '@v2icons/fluent'
// or
import Money16Regular from '@v2icons/fluent/Money16Regular.vue'
```

For SVG
```html
<img src="@sicons/fluent/Money16Regular.svg" />
```

## Packages

Vue3
|package|version|
|-|-|
|@vicons/fluent|[![npm version](https://badge.fury.io/js/%40vicons%2Ffluent.svg)](https://badge.fury.io/js/%40vicons%2Ffluent)|
|@vicons/ionicons4|[![npm version](https://badge.fury.io/js/%40vicons%2Fionicons4.svg)](https://badge.fury.io/js/%40vicons%2Fionicons4)|
|@vicons/ionicons5|[![npm version](https://badge.fury.io/js/%40vicons%2Fionicons5.svg)](https://badge.fury.io/js/%40vicons%2Fionicons5)|
|@vicons/antd|[![npm version](https://badge.fury.io/js/%40vicons%2Fantd.svg)](https://badge.fury.io/js/%40vicons%2Fantd)|
|@vicons/material|[![npm version](https://badge.fury.io/js/%40vicons%2Fmaterial.svg)](https://badge.fury.io/js/%40vicons%2Fmaterial)|
|@vicons/fa|[![npm version](https://badge.fury.io/js/%40vicons%2Ffa.svg)](https://badge.fury.io/js/%40vicons%2Ffa)|

React
|package|version|
|-|-|
|@ricons/fluent|[![npm version](https://badge.fury.io/js/%40ricons%2Ffluent.svg)](https://badge.fury.io/js/%40ricons%2Ffluent)|
|@ricons/ionicons4|[![npm version](https://badge.fury.io/js/%40ricons%2Fionicons4.svg)](https://badge.fury.io/js/%40ricons%2Fionicons4)|
|@ricons/ionicons5|[![npm version](https://badge.fury.io/js/%40ricons%2Fionicons5.svg)](https://badge.fury.io/js/%40ricons%2Fionicons5)|
|@ricons/antd|[![npm version](https://badge.fury.io/js/%40ricons%2Fantd.svg)](https://badge.fury.io/js/%40ricons%2Fantd)|
|@ricons/material|[![npm version](https://badge.fury.io/js/%40ricons%2Fmaterial.svg)](https://badge.fury.io/js/%40ricons%2Fmaterial)|
|@ricons/fa|[![npm version](https://badge.fury.io/js/%40ricons%2Ffa.svg)](https://badge.fury.io/js/%40ricons%2Ffa)|

Vue2
|package|version|
|-|-|
|@v2icons/fluent|[![npm version](https://badge.fury.io/js/%40v2icons%2Ffluent.svg)](https://badge.fury.io/js/%40v2icons%2Ffluent)|
|@v2icons/ionicons4|[![npm version](https://badge.fury.io/js/%40v2icons%2Fionicons4.svg)](https://badge.fury.io/js/%40v2icons%2Fionicons4)|
|@v2icons/ionicons5|[![npm version](https://badge.fury.io/js/%40v2icons%2Fionicons5.svg)](https://badge.fury.io/js/%40v2icons%2Fionicons5)|
|@v2icons/antd|[![npm version](https://badge.fury.io/js/%40v2icons%2Fantd.svg)](https://badge.fury.io/js/%40v2icons%2Fantd)|
|@v2icons/material|[![npm version](https://badge.fury.io/js/%40v2icons%2Fmaterial.svg)](https://badge.fury.io/js/%40v2icons%2Fmaterial)|
|@v2icons/fa|[![npm version](https://badge.fury.io/js/%40v2icons%2Ffa.svg)](https://badge.fury.io/js/%40v2icons%2Ffa)|

SVG
|package|version|
|-|-|
|@sicons/fluent|[![npm version](https://badge.fury.io/js/%40sicons%2Ffluent.svg)](https://badge.fury.io/js/%40sicons%2Ffluent)|
|@sicons/ionicons4|[![npm version](https://badge.fury.io/js/%40sicons%2Fionicons4.svg)](https://badge.fury.io/js/%40sicons%2Fionicons4)|
|@sicons/ionicons5|[![npm version](https://badge.fury.io/js/%40sicons%2Fionicons5.svg)](https://badge.fury.io/js/%40sicons%2Fionicons5)|
|@sicons/antd|[![npm version](https://badge.fury.io/js/%40sicons%2Fantd.svg)](https://badge.fury.io/js/%40sicons%2Fantd)|
|@sicons/material|[![npm version](https://badge.fury.io/js/%40sicons%2Fmaterial.svg)](https://badge.fury.io/js/%40sicons%2Fmaterial)|
|@sicons/fa|[![npm version](https://badge.fury.io/js/%40sicons%2Ffa.svg)](https://badge.fury.io/js/%40sicons%2Ffa)|

## Credit
|Icon Set|License|
|-|-|
|[`ant-design-icons`](https://github.com/ant-design/ant-design-icons)|[MIT](https://opensource.org/licenses/MIT)|
|[`fluentui-system-icons`](https://github.com/microsoft/fluentui-system-icons)|[MIT](https://opensource.org/licenses/MIT)|
|[`Font-Awesome`](https://github.com/FortAwesome/Font-Awesome)|[CC BY 4.0 License](https://creativecommons.org/licenses/by/4.0/)|
|[`ionicons`](https://github.com/ionic-team/ionicons)|[MIT](https://opensource.org/licenses/MIT)|
|[`material-design-icons`](https://github.com/google/material-design-icons)|[Apache 2](https://github.com/google/material-design-icons/blob/master/LICENSE)|
