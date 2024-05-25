import { useContext } from "react"

//////////////////////////////////
// 参考
// https://qiita.com/Rascal823/items/0f53ffbb410505b707f8

import { CountContext, NameContext, PairContext } from "@/pages/usecontext"


export const GrandChild: React.FC = () => {
    // 親要素で指定した変数を受け取る
    const { count, setCount } = useContext(CountContext)
    const { name, setName } = useContext(NameContext)

    // セットで受け取りたい 
    const { pairName, setPairName } = useContext(PairContext)
    const { pairCount } = useContext(PairContext)
    const { setPairCount } = useContext(PairContext)
    // ↑好きな分け方で受け取れる↓
    // const { pairCount, setPairCount } = useContext(PairContext)
    // const { pairName, setPairName, pairCount, setPairCount } = useContext(PairContext)

    return (
        //孫で親要素のuseStateがそのまま使える！
        // しかも子では何も記述していない
        <>
            1. <button onClick={() => setName("oimo")}>oimoに変更</button>
            <button onClick={() => setName("おいも")}>おいもに変更</button>
            <br />
            1. <button onClick={() => setCount(count + 1)}>+</button>
            <button onClick={() => setCount(count - 1)}>-</button>
            <br />
            2. <button onClick={() => setPairName("妹望")}>苗字を明かす</button>
            <button onClick={() => setPairName("??")}>苗字を隠す</button>
            <button onClick={() => setPairCount(21)}>年齢を明かす</button>
            <br />
            <a href="#" onClick={(e) => {
                e.preventDefault();
                setPairName("妹望");
                setPairCount(21);
                // console.log("start:", start)
            }}>同時にセットしたいし、ボタンじゃなくてリンクが良い</a>
        </>
    )
}