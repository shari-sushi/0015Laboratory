import React, { useContext, useEffect, useState, createContext } from "react"
import Link from "next/link"
import { TestuseContect } from "@/component/useContextCom.tsx"

// 参考（React公式の和訳）
// https://ja.react.dev/reference/react/useContext#updating-data-passed-via-context

const value = {
    name: "imomochi",

    // ただの定数なので、当然無理　
    // const [state, setstate] = useState("a")
}

export const ValueContext = createContext(value)

export default function TestuseContext() {
    const name = "おいも"
    const [state, setstate] = useState(name)

    const StateContext = createContext("oimo")
    return (
        <>
            <Link href="/">Home</Link>
            <StateContext.Provider value={state}>
                <ValueContext.Provider value={value}>
                    <br />
                    <br />
                    <TestuseContect />
                </ValueContext.Provider>
            </StateContext.Provider>
            <br />-------------<br />
            <Parent />
        </>
    )
}
//////////////////////////////////
// 参考　別ファイルの子、孫から親のstateを操作する
// https://qiita.com/Rascal823/items/0f53ffbb410505b707f8
import { Child } from "@/component/useContextCom.tsx"
export const CountContext = React.createContext({} as {
    count: number
    setCount: React.Dispatch<React.SetStateAction<number>>
})

export const NameContext = React.createContext({} as {
    name: string
    setName: React.Dispatch<React.SetStateAction<string>>
})

// 2つセットで渡したい
export const PairContext = React.createContext({} as {
    pairName: string
    setPairName: React.Dispatch<React.SetStateAction<string>>
    pairCount: number
    setPairCount: React.Dispatch<React.SetStateAction<number>>
})

const Parent: React.FC = () => {
    const primaryName = "おいも"
    const [name, setName] = useState(primaryName)

    const [count, setCount] = useState(0)

    // ２つセットで渡したい
    const primarySetName = "おいも"
    const [pairName, setPairName] = useState(primaryName)

    const [pairCount, setPairCount] = useState(0)

    return (
        //孫コンポーネントを含む子コンポーネントをuseContextで定めた変数で囲む。
        //valueでcountとsetCountをオブジェクトで渡している点に注意
        <>
            <PairContext.Provider value={{ pairName, setPairName, pairCount, setPairCount }}>
                <NameContext.Provider value={{ name, setName }}>
                    <CountContext.Provider value={{ count, setCount }}>
                        <Child /><br />
                        1. {name}は{count}歳
                    </CountContext.Provider >
                </NameContext.Provider>
                <br />
                2. 本当は{pairName}は{pairCount}歳
            </PairContext.Provider>
        </>
    )
}





////////////// memo //////////////

// アロー関数も無理っぽい
// const value = () => {
//     const a = 1
// }


// 公式のコピペ　nullだとエラーなるじゃん
// function App() {
//     const [theme, setTheme] = useState('dark');
//     const [currentUser, setCurrentUser] = useState({ name: 'Taylor' });

//     const ThemeContext = createContext('light');
//     const AuthContext = createContext(null);

//     return (
//         <ThemeContext.Provider value={theme}>
//             {/* <AuthContext.Provider value={currentUser}> */}
//             {/* <Page /> */}
//             {/* </AuthContext.Provider> */}
//         </ThemeContext.Provider>
//     );
// }