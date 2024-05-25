import React from 'react';
import https from 'https';
import axios, { AxiosRequestConfig } from 'axios';

// import { Layout } from '@/components/layout/Layout'
///////////////
import type { NextPage } from "next";
import styles from "@/styles/Home.module.css";
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { COLUMNS, DATA, VtuberCOLUMNS, domain } from "./libs/data";
import { useMemo } from "react";
import { ContextType } from '../types/server';
import { ReceivedKaraoke, ReceivedMovie, ReceivedVtuber } from '../types/vtuber_content';
///////////////

const pageName = "test/multi"

type TopPage = {
    posts: {
        vtubers: ReceivedVtuber[];
        vtubers_movies: ReceivedMovie[];
        vtubers_movies_karaokes: ReceivedKaraoke[];
        latest_karaokes: ReceivedKaraoke[];
    };
    isSignin: boolean;
}
// export default App;

// http://localhost:3000/tanstacktable/basic-pagenation

export default function App({ posts, isSignin }: TopPage) {
    const vtubers = posts?.vtubers || [{} as ReceivedVtuber];
    const data = vtubers

    const columns = useMemo(() => VtuberCOLUMNS, []);
    // const data = useMemo(() => vtubers, []);

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });
    return (
        // <Layout pageName={pageName} isSignin={isSignin}>
        <div className="">
            <main className=''>
                <table className='bg-slate-600'>
                    <thead className='bg-slate-700 border-b-2'>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id} >
                                {headerGroup.headers.map((header) => (
                                    <th key={header.id} colSpan={header.colSpan} className='mx-2'>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody >
                        {table.getRowModel().rows.map((row) => {
                            return (
                                <tr key={row.id} className=''>
                                    {row.getVisibleCells().map((cell) => {
                                        return (
                                            <td key={cell.id} className='px-2 border-gray-400'>
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </td>
                                        );
                                    })}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                <div style={{ margin: "5px" }}>
                    <span>Page</span>
                    <strong>
                        {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                    </strong>
                </div>
                <div>
                    <button
                        onClick={() => table.setPageIndex(0)}
                        disabled={!table.getCanPreviousPage()}
                    >
                        {"<<"}
                    </button>
                    <button
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        {"<"}
                    </button>
                    <button
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        {">"}
                    </button>
                    <button
                        onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                        disabled={!table.getCanNextPage()}
                    >
                        {">>"}
                    </button>
                </div>
                <select
                    style={{ margin: "10px" }}
                    value={table.getState().pagination.pageSize}
                    onChange={(e) => {
                        table.setPageSize(Number(e.target.value));
                    }}
                >
                    {[2, 20, 30, 40, 50].map((pageSize) => (
                        <option key={pageSize} value={pageSize}>
                            Show {pageSize}
                        </option>
                    ))}
                </select>

                <p>{table.getRowModel().rows.length} Rows</p>
            </main>
        </div>
        // </Layout >
    )
};

/////////////////////////////////////////////////////////////////////////////
export async function getServerSideProps(context: ContextType) {
    const rawCookie = context.req.headers.cookie;
    const sessionToken = rawCookie?.split(';').find((cookie: string) => cookie.trim().startsWith('auth-token='))?.split('=')[1];
    let isSignin = false
    if (sessionToken) {
        isSignin = true
    }
    console.log("pageName, sessionToken, isSigni =", pageName, sessionToken, isSignin) //アクセス数記録のため

    const httpsAgent = new https.Agent({ rejectUnauthorized: false });
    const options: AxiosRequestConfig = {
        headers: {
            cookie: `auth-token=${sessionToken}`,
        },
        withCredentials: true,
        httpsAgent: process.env.NODE_ENV === "production" ? undefined : httpsAgent
    };

    let resData = null;
    try {
        // const res = await axios.get(`${domain.backendHost}/vcontents/dummy-top-page`, options);
        const res = await axios.get(`${domain.backendHost}/vcontents/`, options);
        resData = res.data;
    } catch (error) {
        console.log("erroe in axios.get:", error);
    }
    return {
        props: {
            posts: resData,
            isSignin: isSignin,
        }
    }
}

