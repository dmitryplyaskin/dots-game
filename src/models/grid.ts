import { createStore } from 'effector'

const $columns = createStore(70)
const $rows = createStore(35)
const sizeNode = 18

export { $rows, $columns, sizeNode }
