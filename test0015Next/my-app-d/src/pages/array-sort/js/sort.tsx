import React from "react"
import Link from "next/link"
import { ReactPlayerYoutube } from "@/component/ReactPlayer"

export default function Home() {
    const array0 = ["a", "b", "あ", "い", "AB", "A", "AB", "AC", "0", "1", "2", "", "愛", "阿部"]
    const array1 = array0
    const array2 = array0
    const array3 = array0
    const array4 = array0
    const array5 = array0
    const array6 = array0
    const array7 = array0

    return (
        <>
            <Link href="/">Home</Link>
            <h1 className="bg-gray-700">jsのsortメソッド挙動</h1>
            {"------------------------------------------------------------------------------------------------------"}
            <div>
                元配列[{array0.map((a) => (<span>{a}, </span>))}]←空 = ""も入ってる<br />
                ※相互に影響しないように、配列は別々で用意した。
            </div>
            {"------------------------------------------------------------------------------------------------------"}
            <br />
            <div>
                .sort() <br />
                <u>
                    結果：{array1.sort().map((a) => <span>{a}{", "}</span>)}
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
                {`array2.sort(function (a, b) { `}<br />
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
                    {array2.sort(function (a, b) {
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
                {`array3.sort(function (a, b) { `}<br />
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
                    {array3.sort(function (a, b) {
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
                {`array4.sort(function (a, b) { `}<br />
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
                    {array4.sort(function (a, b) {
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
                {`array5.sort(function (a, b) { `}<br />
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
                    {array5.sort(function (a, b) {
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
                {`array6.sort(function (a, b) { `}<br />
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
                    {array6.sort(function (a, b) {
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