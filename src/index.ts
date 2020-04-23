import { using } from 'effector-dom'
import { grid } from './features/grid'

using(document.body, () => {
	grid()
})
