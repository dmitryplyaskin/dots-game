import { h, spec, list } from 'forest'
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
		({ key }) => {
			h('div', () => {
				spec({
					style: {
						borderTop: key.map(x => (x > 0 && '1px solid grey') || ''),
						width: '100%',
						height: `${sizeNode}px`,
						display: 'flex',
					},
				})
				list(
					$columns.map(length =>
						Array.from({ length: length + 1 }, (_, i) => i)
					),
					({ key }) => {
						h('div', () => {
							spec({
								style: {
									borderLeft: key.map(x => (x > 0 && '1px solid grey') || ''),
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
	list($grid, ({ key: rowIndex, store: $row }) => {
		list($row, ({ key: columnIndex, store: $item }) => {
			const click = createEvent<MouseEvent>()
			sample({
				source: $item,
				clock: click,
				fn: s => s.id,
				target: changeGridItem,
			})
			h('div', () => {
				spec({
					attr: { class: 'play-item' },
					style: {
						width: `${sizeNode}px`,
						height: `${sizeNode}px`,
						top: rowIndex.map(x => `${sizeNode * x + sizeNode / 2}px`),
						left: columnIndex.map(x => `${sizeNode * x + sizeNode / 2}px`),
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
