import {
    flexRender,
    getCoreRowModel,
    useReactTable,
    getPaginationRowModel,
    getSortedRowModel,
    Column as tanstackColumn,
    Table,
    getFilteredRowModel,

} from '@tanstack/react-table'

type User = {
    firstName: string
    age: number
}
const data: User[] = [
    {
        firstName: '太郎',
        age: 42,
    },
    {
        firstName: '花子',
        age: 30,
    },
    {
        firstName: '太郎',
        age: 42,
    },
    {
        firstName: '花子',
        age: 5,
    },
    {
        firstName: '太郎',
        age: 4,
    },
    {
        firstName: '妹望',
        age: 3,
    },
    {
        firstName: '太',
        age: 2,
    },
    {
        firstName: '花',
        age: 1,
    },

]

// const columns: ColumnDef = [
const columns = [
    {
        accessorKey: 'firstName',
        header: '名',
    },
    {
        accessorKey: 'age',
        header: '年齢',
    },
]

const Filter = ({ column, table, }: { column: tanstackColumn<any, any>, table: Table<any> }) => {
    const firstValue = table
        .getPreFilteredRowModel()
        .flatRows[0]?.getValue(column.id)

    // number型であれば、下限、上限の設定に、そうでなければ入力サーチのみに
    return typeof firstValue === 'number' ? (
        <div>
            <input
                // Null合体演算子 https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing
                // ??の左側がnullかundifinedなら右側を、そうでなければそのまま左側を返す  
                type="number"
                value={((column.getFilterValue() as any)?.[0] ?? '') as string}
                onChange={e =>
                    column.setFilterValue((old: any) => [e.target.value, old?.[1]])
                }
                placeholder={`Min`}
            />
            <input
                type="number"
                value={((column.getFilterValue() as any)?.[1] ?? '') as string}
                onChange={e =>
                    column.setFilterValue((old: any) => [old?.[0], e.target.value])
                }
                placeholder={`Max`}
            />
        </div>
    ) : (
        <input
            type="text"
            value={(column.getFilterValue() ?? '') as string}
            onChange={e => column.setFilterValue(e.target.value)}
            placeholder={`Search...`}
        />
    )
}

const FilterTable = () => {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
    })
    return (
        <>
            <table>
                <thead>
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => {
                                return (
                                    <th key={header.id} colSpan={header.colSpan}>
                                        {header.isPlaceholder ? null : (
                                            <>
                                                <div
                                                    {...{
                                                        className: header.column.getCanSort()
                                                            ? 'cursor-pointer select-none'
                                                            : '',
                                                        onClick: header.column.getToggleSortingHandler(),
                                                    }}
                                                >
                                                    {flexRender(
                                                        header.column.columnDef.header,
                                                        header.getContext()
                                                    )}

                                                </div>
                                                {header.column.getCanFilter() ? (
                                                    <div>
                                                        <Filter column={header.column} table={table} />
                                                    </div>
                                                ) : null}
                                            </>
                                        )}
                                    </th>
                                )
                            })}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map(row => (
                        <tr key={row.id}>
                            {row.getVisibleCells().map(cell => (
                                <td key={cell.id}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )

}
export default FilterTable