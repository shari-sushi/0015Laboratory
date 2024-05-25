import Link from "next/link"

// https://dev.classmethod.jp/articles/introduce-tanstack-table/
const titles = ["index", "pege-nation", "", "sort", "a-column-filter", "global-filter", "Filtering-puls"]



export default function TestLink({ thisPageNum }: { thisPageNum: number }) {
    return (
        <div>
            {titles?.map((item: string, index: number) => {
                const isThisPage = thisPageNum === index
                const isIndexPage = index === 0
                return (
                    <Link href={`/test/multi/${isIndexPage ? "" : index}`}
                        className={`
                            float-left 
                            ${isThisPage ? "bg-green-200" : "bg-[#FFF6E4]"}
                            text-[#000000] font-extrabold px-4 min-w-5 rounded-full `}
                    >
                        {index}:{item}
                    </Link>
                )
            })}
        </div>
    )
}

// type PageProps = {
//     [key: number]: string;
// }

// const pages: PageProps[] = [
//     { 0: "目次" },
//     { 1: "" }
// ]

// type PageProps = {
//     Num: number;
//     Title: string;
// }

// const pages: PageProps[] = titles.map((title, index) => ({
//     Num: index,
//     Title: title,
// }));
