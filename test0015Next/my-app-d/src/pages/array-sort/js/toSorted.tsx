import React from "react"
import Link from "next/link"
import { ReactPlayerYoutube } from "@/component/ReactPlayer"

export default function Home() {
    const array = ["a", "b", "あ", "い", "AB", "A", "AB", "AC", "0", "1", "2", "", "愛", "阿部"]

    return (
        <>
            <Link href="/">Home</Link>
            <h1 className="bg-gray-700">jsのtoSortedメソッド挙動</h1>
            {"------------------------------------------------------------------------------------------------------"}
            <div>
                元配列[{array.map((a) => (<span>{a}, </span>))}]←空 = ""も入ってる
            </div>
            {"------------------------------------------------------------------------------------------------------"}
            <br />
            <div>
                .toSorted() <br />
                <u>
                    結果：{array.toSorted().map((a) => <span>{a}{", "}</span>)}
                </u>
            </div>
            <div>
                <br />
                ""が先頭に来てる。
            </div>
            {"------------------------------------------------------------------------------------------------------"}
            <div>
                {"a > b で 1"}
            </div><br />
            <div>
                {`.toSortedarray.toSorted(function (a, b) { `}<br />
                {`if (a && b) { `}<br />
                {`if (a > b) {
                            return 1
                        } else {
                            return -1
                        }
                    }
                return 0 
                })`}
                <br />
                <u >
                    結果：
                    {array.toSorted(function (a, b) {
                        if (a && b) {
                            if (a > b) {
                                return 1
                            } else {
                                return -1
                            }
                        }
                        return 0
                    }).map((a) => <span>{a}{", "}</span>)}
                </u >
            </div>
            <br />
            <div>
                {`.toSortedarray.toSorted(function (a, b) { `}<br />
                {`if (a && b) { `}<br />
                {`if (a.charCodeAt(0) > b.charCodeAt(0)) {
                            return 1
                        } else {
                            return -1
                        }
                    }
                return 0 
                })`} <br />
                <u >
                    結果：
                    {array.toSorted(function (a, b) {
                        if (a && b) {
                            if (a.charCodeAt(0) > b.charCodeAt(0)) {
                                return 1
                            } else {
                                return -1
                            }
                        }
                        return 0
                    }).map((a) => <span>{a}{", "}</span>)}
                </u >
            </div>
            <br />

            {"------------------------------------------------------------------------------------------------------"}
            <div>
                {"a > b で -1"}
            </div><br />
            <div>
                {`.toSortedarray.toSorted(function (a, b) { `}<br />
                {`if (a && b) { `}<br />
                {`if (a > b) {
                            return -1
                        } else {
                            return 1
                        }
                    }
                return 0 
                })`}
                <br />
                <u >
                    結果：
                    {array.toSorted(function (a, b) {
                        if (a && b) {
                            if (a > b) {
                                return -1
                            } else {
                                return 1
                            }
                        }
                        return 0
                    }).map((a) => <span>{a}{", "}</span>)}
                </u>
            </div>
            <br />
            <div>
                {`.toSortedarray.toSorted(function (a, b) { `}<br />
                {`if (a && b) { `}<br />
                {`if (a.charCodeAt(0) > b.charCodeAt(0)) {
                            return -1
                        } else {
                            return 1
                        }
                    }
                return 0 
                })`}
                <u><br />
                    結果：
                    {array.toSorted(function (a, b) {
                        if (a && b) {
                            if (a.charCodeAt(0) > b.charCodeAt(0)) {
                                return -1
                            } else {
                                return 1
                            }
                        }
                        return 0
                    }).map((a) => <span>{a}{", "}</span>)}
                </u >
            </div>
            <div>
                {`.toSortedarray.toSorted(function (a, b) { `}<br />
                {`if (a && b) { `}<br />
                {`if (a.charCodeAt(0) > b.charCodeAt(0)) {
                            return -1
                        } else {
                            return 1
                        }
                    }
                return -1
                })`}
                <u><br />
                    結果：
                    {array.toSorted(function (a, b) {
                        if (a && b) {
                            if (a.charCodeAt(0) > b.charCodeAt(0)) {
                                return -1
                            } else {
                                return 1
                            }
                        }
                        return -1
                    }).map((a) => <span>{a}{", "}</span>)}
                </u >
            </div>
            <div>
            </div>
            {"------------------------------------------------------------------------------------------------------"}
            <div>
                <li>
                    .charCodeAt(0)だと0文字目しか見てないよねって思ったけどやっぱそうっぽい。<br />
                    {"　　"}(これでソートできるって記事あった)
                </li>
                <li>
                    ""の位置は、最後の戻り値依存
                </li>
            </div>
            <br /><br /><br /><br /><br />

            <div className="pt-10 mt-10" >
                これはおまけの宝鐘マリン動画
                <ReactPlayerYoutube url={"https://www.youtube.com/watch?v=wBjhxyFU3EY"} start={60} />
            </div>
            <div>
            </div>
        </>
    )
}