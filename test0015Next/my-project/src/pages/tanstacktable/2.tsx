import React, { useState } from 'react';
import Link from 'next/link';
import https from 'https';
import axios, { AxiosRequestConfig } from 'axios';

import { domain } from '@/../../env'
import type { ReceivedVtuber, ReceivedMovie, ReceivedKaraoke } from '@/types/vtuber_content';
import { YouTubePlayer } from '@/components/moviePlayer/YoutubePlayer'
import { ConvertStringToTime, ExtractVideoId } from '@/components/Conversion'
import { Layout } from '@/components/layout/Layout'
import { VtuberTable } from '@/components/table/Vtuber'
import { MovieTable } from '@/components/table/Movie'
import { KaraokeThinTable, KaraokeMinRandamTable } from '@/components/table/Karaoke'
import { ToClickTW } from '@/styles/tailwiind'
import { ContextType } from '@/types/server'
///////////////
import type { NextPage } from "next";
import styles from "@/styles/Home.module.css";
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    useReactTable,
    getSortedRowModel,
} from "@tanstack/react-table";
import { VtuberCOLUMNS2 } from "./libs/data";
import { useMemo } from "react";
import TestLink from './component';
///////////////
// const pageNum = Number(window.location.pathname.split("/").pop());
const pageNum = 2
const pageName = "test/multi/2"

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

// http://localhost:80/test/multi

export default function App({ posts, isSignin }: TopPage) {
    const vtubers = posts?.vtubers || [{} as ReceivedVtuber];


    const initialPageIndex = 0;
    const initialPageSize = 10;

    const columns = useMemo(() => VtuberCOLUMNS2, []);
    const data = useMemo(() => vtubers, []);

    const table = useReactTable({
        columns,
        data,
        initialState: {
            pagination: {
                pageIndex: initialPageIndex,
                pageSize: initialPageSize,
            },
            sorting: [{ id: "id", desc: true }],
        },
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
    });
    return (
        <Layout pageName={pageName} isSignin={isSignin}>
            <TestLink thisPageNum={pageNum} />
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
        </Layout >
    )
};
// export default TopPage;

/////////////////////////////////////////////////////////////////////////////

