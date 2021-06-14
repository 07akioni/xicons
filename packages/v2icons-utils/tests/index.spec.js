const { Accessibility16Regular } = require('../../xicons/dist/fluent/vue2/lib')
const { AccessibleIcon } = require('../../xicons/dist/fa/vue2/lib')
const { AcUnitFilled } = require('../../xicons/dist/material/vue2/lib')
const { IosAdd } = require('../../xicons/dist/ionicons4/vue2/lib')
const { Accessibility } = require('../../xicons/dist/ionicons5/vue2/lib')
const { AB } = require('../../xicons/dist/tabler/vue2/lib')
const { AccountBookFilled } = require('../../xicons/dist/antd/vue2/lib')
const { mount } = require('@vue/test-utils')

;[
  ['fluent', Accessibility16Regular],
  ['fa', AccessibleIcon],
  ['material', AcUnitFilled],
  ['ionicons4', IosAdd],
  ['ionicons5', Accessibility],
  ['tabler', AB],
  ['antd', AccountBookFilled],
].forEach(([ name, icon ]) => {
  describe(name,() => {
    it('works', () => {
      expect(mount(icon).html()).toMatchSnapshot()
    })
  })
})
