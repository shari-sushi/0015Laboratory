import { ColumnDef } from "@tanstack/react-table";

type TData = {
    col1: string;
    col2: string;
    col3: number;
};

export const DATA: TData[] = [
    {
        col1: "Hello",
        col2: "World",
        col3: 1234,
    },
    {
        col1: "react-table",
        col2: "rocks",
        col3: 5678,
    },
    {
        col1: "whatever",
        col2: "you want",
        col3: 9012,
    },
];

export const COLUMNS: ColumnDef<any>[] = [
    {
        header: "Column 1",
        accessorKey: "col1",
    },
    {
        header: "Column 2",
        accessorKey: "col2",
    },
    {
        header: "Column 3",
        accessorKey: "col3",
    },
];


type VtuberId = number;
type ReceivedVtuber = {
    VtuberId: VtuberId;
    VtuberName: string;
    VtuberKana: string;
    IntroMovieUrl: string | null;
    VtuberInputterId: string;
    Count: number;
    IsFav: boolean;
}

const types = {} as ReceivedVtuber

export const VtuberCOLUMNS: ColumnDef<any>[] = [
    {
        header: "お名前",
        accessorKey: "VtuberName",
    },
    {
        header: "kana",
        accessorKey: "VtuberKana",
    },
    {
        header: "紹介動画",
        accessorKey: "IntroMovieUrl",
    },
];

