import { createStore, combine, createEvent } from 'effector'

const $columns = createStore(70)
const $rows = createStore(35)
const sizeNode = 18

const changeGridItem = createEvent<{ id: string; player: string }>()
const $grid = combine({ col: $columns, row: $rows }, ({ col, row }) =>
	Array.from({ length: row }).map((_, rowIndex) =>
		Array.from({ length: col }).map((_, colIndex) => ({
			id: `${rowIndex}-${colIndex}`,
			active: false,
			player: null,
		}))
	)
)

$grid.on(changeGridItem, (state, { id, player }) => {
	const arr = Array.from(state)
	const [row, col] = id.split('-')
	arr[row][col] = {
		id,
		player,
		active: true,
	}
	return arr
})

// $grid.watch(console.log)

export { $rows, $columns, sizeNode, changeGridItem, $grid }
