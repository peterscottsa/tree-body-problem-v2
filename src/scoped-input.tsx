import React from 'react'

import {
    Tree,
    RowRendererProps,
    NodeRendererProps,
    NodeApi,
} from 'react-arborist'

/**
 * @description Gets the ids of each child element if present
 * @param node
 */
function getChildrenIds(node: NodeApi) {
    if (!node.children) {
        return []
    }

    return node.children.flatMap((child: NodeApi) => {
        const subIds = child.children
            ? child.children.map((subChild) => subChild.id)
            : []
        return [child.id, ...subIds]
    })
}

function filterChildNodes(node: NodeApi, selectedNodes: string[]) {
    const itemsToRemove = getChildrenIds(node)
    return selectedNodes.filter(
        (item) => !itemsToRemove.includes(item) && item !== node.id,
    )
}

function Row<T>({ attrs, innerRef, children }: RowRendererProps<T>) {
    return (
        <div {...attrs} ref={innerRef}>
            {children}
        </div>
    )
}

interface NodeData {
    name: string
}

function Node<T extends NodeData>({ node, style, tree }: NodeRendererProps<T>) {
    return (
        <div style={style} className="flex gap-2 rounded hover:bg-gray-100">
            <input
                className="accent-green-400"
                id={node.id}
                type="checkbox"
                checked={node.isSelected}
                onChange={(event) => {
                    event.stopPropagation()
                    const selectedIds = Array.from(tree.selectedIds)

                    if (node.isLeaf) {
                        if (node.isSelected) {
                            return node.deselect()
                        }

                        return node.selectMulti()
                    }

                    if (node.isSelected) {
                        return tree.setSelection({
                            ids: filterChildNodes(node, selectedIds),
                            anchor: null,
                            mostRecent: null,
                        })
                    }

                    return tree.setSelection({
                        ids: [...getChildrenIds(node), node.id, ...selectedIds],
                        anchor: null,
                        mostRecent: null,
                    })
                }}
            />
            <label htmlFor={node.id}>{node.data.name}</label>
        </div>
    )
}

interface Props {
    initialData: readonly NodeData[] | undefined
    searchTerm: string
    onChange: (value: string) => void
}

export const ScopedInput = (props: Props) => {
    return (
        <div>
            <input
                className="py-1 px-2 rounded border-2 border-gray-300 appearance-none mb-3"
                type="text"
                placeholder="Search the tree"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    props.onChange(e.target.value)
                }
            />

            <Tree
                disableDrag={true}
                initialData={props.initialData}
                searchTerm={props.searchTerm}
                renderRow={Row}
            >
                {Node}
            </Tree>
        </div>
    )
}
