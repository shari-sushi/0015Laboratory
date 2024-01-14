import { useContext } from "react"
import { ValueContext } from "@/pages/usecontext"


export const TestuseContect = () => {
    const value = useContext(ValueContext)
    // const state = useContext(StateContext)

    const a = "aaa"
    return (
        <>
            子コンポーネント：{value.name}
            {/* {state.} */}
            <br />
            <TestComponent />
        </>
    )
}

const TestComponent = () => {
    const value = useContext(ValueContext)
    // const state = useContext(StateContext)
    return (
        <>
            孫コンポーネント：{value.name}
        </>

    )
}


//////////////////////////////////
// 参考
// https://qiita.com/Rascal823/items/0f53ffbb410505b707f8

// import { CountContext, NameContext, PairContext } from "@/pages/usecontext"
import { GrandChild } from "./GrandChild"

export const Child: React.FC = () => {
    return (
        <>
            <GrandChild />
        </>
    )
}
