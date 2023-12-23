import React, { useContext, useEffect, useState, createContext } from "react"
import Link from "next/link"

export default function Home() {

    return (
        <>
            <br />
            <Link href="/usecontext">useContext</Link><br />
            <Link href="/tutorial/react-table">tanstacl table チュート</Link><br />
            <Link href="/youtube">react-youtube</Link><br />
        </>
    )
}