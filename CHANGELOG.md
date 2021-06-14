## 0.9.0 (2020-06-14)

- Change icon source to [iconify](https://github.com/iconify/collections-json).

### Breaking Changes

- Icon names in `material` icon set has breaking changes. Size part in icon names has been removed due to icon source migration. To migrate your app, follow the instuctions:

```js
// Remove size part of the imported icon
import { Agriculture20Filled, Agriculture24Filled } from '...' // Old

// Change it to
import { AgricultureFilled } from '...' // New
```

## 0.8.0

- Update fluent to 1.1.128. For icon names' change please see 4b8c76f6551f9c1d7b386cb16cee2ed5a481809c.
