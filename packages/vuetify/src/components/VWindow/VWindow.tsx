// Composables
import { makeGroupProps, useGroup } from '@/composables/group'
import { makeTagProps } from '@/composables/tag'

// Directives
// import { TouchDirectiveBinding } from '@/directives/touch'

// Styles
import './VWindow.sass'

// Utilities
import { defineComponent, PropType /* withDirectives */ } from 'vue'
import { makeProps } from '@/util'
import { TouchHandlers } from 'vuetify/types'

const VWindowSymbol = Symbol.for('vuetify:v-window')

export default defineComponent({
  name: 'VWindow',

  props: makeProps({
    continuous: Boolean,
    nextIcon: {
      type: [Boolean, String],
      default: '$next',
    },
    prevIcon: {
      type: [Boolean, String],
      default: '$prev',
    },
    reverse: Boolean,
    showArrows: Boolean,
    showArrowsOnHover: Boolean,
    touch: Object as PropType<TouchHandlers>,
    touchless: Boolean,
    value: {
      required: false,
    },
    vertical: Boolean,

    ...makeGroupProps({
      mandatory: true,
      selectedClass: 'v-window-item--active',
    }),
    ...makeTagProps(),
  }),

  emits: ['change'],

  setup (props, ctx) {
    const { next, prev } = useGroup(props, VWindowSymbol) // I'm not sure if this inject key arg is correct.

    return () => (
      <props.tag class="v-window">
        { ctx.slots.default?.({
          next,
          prev,
        }) }
      </props.tag>
    )
  },
})
