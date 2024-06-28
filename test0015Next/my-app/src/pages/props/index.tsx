import { useState } from "react"

export default function props() {
    const [isTrue, setIsTrue] = useState<boolean>(false)

    return (
        <>
            <Child isTrue={isTrue} setIsTrue={setIsTrue} />
        </>
    )
}


type ChildProps = {
    isTrue: boolean,
    setIsTrue: (isTrue: boolean) => void
}

const Child = ({ isTrue, setIsTrue }: ChildProps) => {

    return (
        <button onClick={() => setIsTrue(!isTrue)}>
            {isTrue ? "true" : "false"}
        </button>
    )
}

