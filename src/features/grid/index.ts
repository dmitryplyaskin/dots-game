import { h, spec, list } from 'effector-dom'
import { $columns, $rows, sizeNode } from '../../models/grid'
import './style.sass'

export const grid = () => {
	h('div', () => {
		spec({
			attr: {
				class: 'grid',
			},
			style: {
				width: $columns.map(x => `${x * sizeNode}px`),
				height: $rows.map(x => `${x * sizeNode}px`),
			},
		})
		rows()
	})
}

const rows = () => {
	list(
		$rows.map(length => Array.from({ length }, (_, i) => i)),
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
				columns()
			})
		}
	)
}

const columns = () => {
	list(
		$columns.map(length => Array.from({ length }, (_, i) => i)),
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
}
