import { flexRender, getCoreRowModel, useReactTable, createColumnHelper, } from '@tanstack/react-table';
import { useEffect, useState } from 'react';

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

function App() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const getPosts = async () => {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/posts'
      );
      const data = await response.json();
      setPosts(data);
    };

    getPosts();
  }, []);

  ////////////////////////////////////////////
  // headerを指定しな場合はaccessorKeyがタイトルになる
  // headerには関数やhtml文も使用できる
  // cellプロパティで文字のカスタマイズができる
  // const columns = [
  //   {
  //     accessorKey: 'userId',
  //     // header: 'User ID',
  //     header: () => 'User ID',
  //   },
  //   {
  //     accessorKey: 'Id',
  //     // header: 'ID',
  //     header: () => <span>ID</span>,
  //   },
  //   {
  //     accessorKey: 'title',
  //     // header: 'Title',
  //     cell: (props: any) => props.getValue().toUpperCase(), //このままではpropsがany型
  //   },
  //   {
  //     accessorKey: 'body',
  //     // header: 'Body',
  //   },
  // ];
  ////////////////////////////////////////////

  ////////////////////////////////////////////
  // const columnHelper = createColumnHelper<Post>();
  // const columns = [
  //   //  accessorFn 関数を利用して2 つの列をまとめられる。
  //   columnHelper.accessor((row) => `${row.userId} ${row.id}`, {
  //     id: 'WID',
  //   }),
  //   // createColumnHelper 関数で型の指定を行っているので props の型を設定できる
  //   // 　これによりtoUpperCaseを(propsをany型にすることなく)使用できる
  //   // 　(この例ではカラムデータを全て大文字にした)
  //   // なお、number型(今回のではid)はエラーになる
  //   columnHelper.accessor('title', {
  //     header: 'Title',
  //     cell: (props) => props.getValue().toUpperCase(),
  //   }),
  //   columnHelper.accessor('body', {
  //     header: () => 'Body',
  //   }),
  // ];


  ////////////////////////////////////////////
  const isFavNow: boolean[] = Array(posts.length).fill(false);


  const columnHelper = createColumnHelper<Post>();
  const columns = [
    columnHelper.accessor((row) => `${row.userId} ${row.id}`, {
      id: 'WID',
    }),
    columnHelper.accessor('title', {
      header: 'Title',
      cell: (props) => props.getValue().toUpperCase(),
    }),
    columnHelper.accessor('body', {
      header: () => 'Body',
    }),
    // columnHelper.display({
    //   id: 'update',
    //   header: '更新',
    //   cell: (props) => (
    //     <button onClick={() => update(props.row.original.id)}>
    //       更新
    //     </button>
    //   ),
    // }),
    // columnHelper.display({
    //   id: 'delete',
    //   header: () => '削除',
    //   cell: (props) => (
    //     <button onClick={() => delete (props.row.original.id)}>
    //       削除
    //     </button>
    //   ),
  ]

  const table = useReactTable({
    data: posts,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    // <div style={{ margin: '2em' }}>
    <div>
      <h1>Posts List</h1>
      <table>
        <thead>
          {/*  getHeaderGroup メソッドはテーブルのヘッダー情報、getRowModel メソッドはテーブルの Row 情報(行)を戻す。 */}
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {/* headers プロパティには header オブジェクトが配列で含まれる */}
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {/* スライス指定で行指定できる */}
          {table.getRowModel().rows.slice(0, 5).map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {/* getRowModelメソッドで取得したデータは行数情報も持っている */}
      <p>Rows Number: {table.getRowModel().rows.length}</p>
    </div>
  );
}

export default App;