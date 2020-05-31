import { createStore, combine, createEvent } from 'effector'

const $columns = createStore(100)
const $rows = createStore(100)
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

changeGridItem.watch(() => console.count('click'))

$grid.on(changeGridItem, (state, { id, player }) => {
	const newArr = [...state]
	const [row, col] = id.split('-')
	newArr[row] = newArr[row].map(y =>
		y.id === id ? { ...y, player, active: true } : y
	)

	return newArr
})

export { $rows, $columns, sizeNode, changeGridItem, $grid }
