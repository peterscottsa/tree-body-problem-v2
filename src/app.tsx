import { useState, useMemo } from 'react'
import { ScopedInput } from './scoped-input'

import './output.css'

const tree = {
    locations: {
        'aarhus-technologies': {
            name: 'Aarhus Technologies',
            parents: {
                aarhus: {},
            },
        },
        'aarhus-office-hub': {
            name: 'Aarhus Office Hub',
            parents: {
                aarhus: {},
            },
        },
        'copenhagen-towers': {
            name: 'Copenhagen Towers',
            parents: {
                copenhagen: {},
            },
        },
        'cph-blox-hub': {
            name: 'CPH Blox Hub',
            parents: {
                copenhagen: {},
            },
        },
        'paris-corp-hq': {
            name: 'Paris Corp HQ',
            parents: {
                paris: {},
            },
        },
        'startup-lab-paris': {
            name: 'Startup Lab Paris',
            parents: {
                paris: {},
            },
        },
    },
    groups: {
        denmark: {
            name: 'Denmark',
            parents: {},
        },
        aarhus: {
            name: 'Aarhus',
            parents: {
                denmark: {},
            },
        },
        copenhagen: {
            name: 'Copenhagen',
            parents: {
                denmark: {},
            },
        },
        france: {
            name: 'France',
            parents: {},
        },
        paris: {
            name: 'Paris',
            parents: {
                france: {},
            },
        },
    },
    partnerId: 'partner-1',
}

type DataItem = {
    name: string
    parents: object
}

type Data = {
    locations: {
        [key: string]: DataItem
    }
    groups: { [key: string]: DataItem }
}

/**
 * @description Converts the tree to a data structure that can be used by the ScopedInput component
 * @param tree The tree to convert
 */
function convertTreeToData(tree: Data) {
    // Create iterables from the data
    const locations = convertToIterable(tree.locations)

    const groups = convertToIterable(tree.groups)
        .filter((group) => group.parent) // Remove empty values such as Denmark and France
        .map(({ id, name, parent }) => ({
            id,
            name,
            parent,
            children: mapParentToChildren(id, locations),
        }))

    const cities = convertToIterable(tree.groups).filter(
        (group) => !group.parent,
    )

    return cities.map((city) => ({
        id: city.id,
        name: city.name,
        children: mapParentToChildren(city.id, groups),
    }))
}

type IterableDataItem = {
    id: string
    name: string
    parent: string
}

/**
 * @description Creates an iterable from an object
 * @param obj The object to convert
 */
const convertToIterable = (obj: { [key: string]: DataItem }) =>
    Object.entries(obj).map(([id, location]) => ({
        id,
        name: location.name,
        parent: Object.keys(location?.parents ?? {})[0],
    }))

/**
 * @description Maps children to a parent
 * @param parentId The parent id
 * @param children The children to map
 */
function mapParentToChildren(parentId: string, children: IterableDataItem[]) {
    return children.filter((child) => child.parent == parentId)
}

export default function App() {
    const [searchTerm, setSearchTerm] = useState<string>('')

    const initialData = useMemo(() => {
        return convertTreeToData(tree)
    }, [tree])

    return (
        <div className="p-6">
            <h2 className="text-xl mb-3">Select locations</h2>
            <ScopedInput
                initialData={initialData}
                searchTerm={searchTerm}
                onChange={setSearchTerm}
            />
        </div>
    )
}
