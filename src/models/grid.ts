import { createStore, combine, createEvent } from 'effector'

const $columns = createStore(10)
const $rows = createStore(10)
const sizeNode = 18

const changeGridItem = createEvent<string>()
const $grid = combine({ col: $columns, row: $rows }, ({ col, row }) =>
	Array.from({ length: row }).map((_, rowIndex) =>
		Array.from({ length: col }).map((_, colIndex) => ({
			id: `${rowIndex}-${colIndex}`,
			active: false,
			player: null,
		}))
	)
)

changeGridItem.watch(console.log)

$grid.on(changeGridItem, (state, id) => {
	const arr = Array.from(state)
	const [row, col] = id.split('-')
	arr[row][col] = {
		id,
		active: true,
	}
	return arr
})

export { $rows, $columns, sizeNode, changeGridItem, $grid }
