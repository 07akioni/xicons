import { describe, expect, it } from'vitest'
import { mount } from'@vue/test-utils'
import { Accessibility16Regular } from'./xicons/fluent/vue2/es'
import { AccessibleIcon } from'./xicons/fa/vue2/es'
import { AcUnitFilled } from'./xicons/material/vue2/es'
import { IosAdd } from'./xicons/ionicons4/vue2/es'
import { Accessibility } from'./xicons/ionicons5/vue2/es'
import { AB } from'./xicons/tabler/vue2/es'
import { AccountBookFilled } from'./xicons/antd/vue2/es'
import { Accessibility as AccessibilityCarbon } from'./xicons/carbon/vue2/es'

;[
  ['fluent', Accessibility16Regular],
  ['fa', AccessibleIcon],
  ['material', AcUnitFilled],
  ['ionicons4', IosAdd],
  ['ionicons5', Accessibility],
  ['tabler', AB],
  ['antd', AccountBookFilled],
  ['carbon', AccessibilityCarbon]
].forEach(([ name, icon ]) => {
  describe(name,() => {
    it('works', () => {
      expect(mount(icon).html()).toMatchSnapshot()
    })
  })
})
