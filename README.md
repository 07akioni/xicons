# xicons [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Include `vicons`(vue3), `ricons`(react), `sicons`(svg) & `v2icons`(vue2).

SVG Vue/React components integrated from [`fluentui-system-icons`](https://github.com/microsoft/fluentui-system-icons) and [`ionicons`](https://github.com/ionic-team/ionicons).

## Icons
https://xicons.vercel.app/

## Install
```bash
# Install packages on your demand
# For react
npm install --save-dev @ricons/fluent
npm install --save-dev @ricons/ionicons4
npm install --save-dev @ricons/ionicons5
# For vue3
npm install --save-dev @vicons/fluent
npm install --save-dev @vicons/ionicons4
npm install --save-dev @vicons/ionicons5
# For vue2
npm install --save-dev @v2icons/fluent
npm install --save-dev @v2icons/ionicons4
npm install --save-dev @v2icons/ionicons5
# For SVG file
npm install --save-dev @sicons/fluent
npm install --save-dev @sicons/ionicons4
npm install --save-dev @sicons/ionicons5
```

## Usage
For Vue3
```ts
import {
  Money16Regular
} from '@vicons/fluent'

// use it in any form you like
// remember it is a SVG component
```

For React
```ts
import {
  Money16Regular
} from '@ricons/fluent'
```

For Vue2 (you need `vue-loader`)
```js
import {
  Money16Regular
} from '@v2icons/fluent'
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

React
|package|version|
|-|-|
|@ricons/fluent|[![npm version](https://badge.fury.io/js/%40ricons%2Ffluent.svg)](https://badge.fury.io/js/%40ricons%2Ffluent)|
|@ricons/ionicons4|[![npm version](https://badge.fury.io/js/%40ricons%2Fionicons4.svg)](https://badge.fury.io/js/%40ricons%2Fionicons4)|
|@ricons/ionicons5|[![npm version](https://badge.fury.io/js/%40ricons%2Fionicons5.svg)](https://badge.fury.io/js/%40ricons%2Fionicons5)|

Vue2
|package|version|
|-|-|
|@v2icons/fluent|[![npm version](https://badge.fury.io/js/%40v2icons%2Ffluent.svg)](https://badge.fury.io/js/%40v2icons%2Ffluent)|
|@v2icons/ionicons4|[![npm version](https://badge.fury.io/js/%40v2icons%2Fionicons4.svg)](https://badge.fury.io/js/%40v2icons%2Fionicons4)|
|@v2icons/ionicons5|[![npm version](https://badge.fury.io/js/%40v2icons%2Fionicons5.svg)](https://badge.fury.io/js/%40v2icons%2Fionicons5)|

SVG
|package|version|
|-|-|
|@sicons/fluent|[![npm version](https://badge.fury.io/js/%40sicons%2Ffluent.svg)](https://badge.fury.io/js/%40sicons%2Ffluent)|
|@sicons/ionicons4|[![npm version](https://badge.fury.io/js/%40sicons%2Fionicons4.svg)](https://badge.fury.io/js/%40sicons%2Fionicons4)|
|@sicons/ionicons5|[![npm version](https://badge.fury.io/js/%40sicons%2Fionicons5.svg)](https://badge.fury.io/js/%40sicons%2Fionicons5)|

## Credit
- [`fluentui-system-icons`](https://github.com/microsoft/fluentui-system-icons)
- [`ionicons`](https://github.com/ionic-team/ionicons)
