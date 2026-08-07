## 0.14.0 (2026-08-07)

- Upgrade `fa` icon source from Font Awesome 5 to Font Awesome 6 (1609 → 2058 icons, +449).
- Refresh `tabler` icons to latest upstream (1518 → 6184 icons).
- Other iconify sources (`material`, `antd`, `fluent`, `carbon`, `ionicons5`) refreshed alongside the `@iconify/json` upgrade.

### Breaking Changes

Font Awesome 6 renamed / removed several icons. If your app imports any of the following, migrate to the new names:

| FA5 (old) | FA6 (new) |
| --- | --- |
| Home | House |
| InfoCircle | CircleInfo |
| ExclamationTriangle | TriangleExclamation |
| Archive | BoxArchive |
| CodeBranch | CodeFork (CodeBranch still available) |
| Tools | ScrewdriverWrench / Hammer |
| ThLarge | TableCellsLarge |
| Edit | PenToSquare |
| Search | MagnifyingGlass |
| SortAmountDown | ArrowDownWideShort |
| MapMarkedAlt | MapLocationDot |
| Hdd | HardDrive |
| Smile | FaceSmile |
| TachometerAlt | GaugeHigh |
| ProjectDiagram | DiagramProject |
| CalendarAlt | CalendarDays |

`Undo` is removed in FA6, use `RotateLeft` instead.

## 0.9.0 (2020-06-15)

- Add [carbon](https://github.com/carbon-design-system/carbon/tree/main/packages/icons) icons.

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
