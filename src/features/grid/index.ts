import { h, spec, list } from 'effector-dom'
import {
	$columns,
	$rows,
	sizeNode,
	$grid,
	changeGridItem,
} from '../../models/grid'
import './style.sass'
import { sample, createEvent } from 'effector'

export const grid = () => {
	h('div', () => {
		spec({
			attr: {
				class: 'grid',
			},
			style: {
				height: $rows.map(x => `${(x + 1) * sizeNode}px`),
				width: $columns.map(x => `${(x + 1) * sizeNode}px`),
			},
		})
		h('div', createRowsAndColumns)
		h('div', createPlayItems)
	})
}

const createRowsAndColumns = () => {
	list(
		$rows.map(length => Array.from({ length: length + 1 }, (_, i) => i)),
		({ index }) => {
			h('div', () => {
				spec({
					style: {
						borderTop: index > 0 && '1px solid grey',
						width: '100%',
						height: `${sizeNode}px`,
						display: 'flex',
					},
				})
				list(
					$columns.map(length =>
						Array.from({ length: length + 1 }, (_, i) => i)
					),
					({ index }) => {
						h('div', () => {
							spec({
								style: {
									borderLeft: index > 0 && '1px solid grey',
									height: '100%',
									width: `${sizeNode}px`,
								},
							})
						})
					}
				)
			})
		}
	)
}

const createPlayItems = () => {
	list($grid, ({ index: rowIndex, store }) => {
		list(store, ({ index: columnIndex, store: $item }) => {
			h('div', () => {
				const click = createEvent()
				sample({
					source: $item,
					clock: click,
					target: changeGridItem,
				})

				spec({
					attr: { class: 'play-item' },
					style: {
						width: `${sizeNode}px`,
						height: `${sizeNode}px`,
						top: `${sizeNode * rowIndex + sizeNode / 2}px`,
						left: `${sizeNode * columnIndex + sizeNode / 2}px`,
					},
					handler: {
						click,
					},
				})
				h('div', () => {
					spec({
						visible: $item.map(x => x.active),
						attr: { class: 'play-item__selected' },
					})
				})
			})
		})
	})
}
