import { useEffect, useState } from "react"
import { useRouter } from "next/router";
import Link from 'next/link';
import https from 'https';

export default function Home({ data2, data3 }: any) {
  console.log("data2", data2)
  console.log("data3", data3)
  // {"Movie": {"Id": 1, "MovieTitle": "imo"}, "LikeCnt": 10}
  return (
    <main>
      <div>
        data2: <br />
        message:  <pre>{JSON.stringify(data2.message[0], null, 2)}</pre>
        出力方法<br />
        {"   {item.Movie.MovieId}"}<br />
        {"    {item.Movie.MovieTitle}"} <br />
        {"    {item.LikeCnt}"}<br />

        結果
        {data2.message.map((item: any) => (
          <div key={item.Id}>
            <li>
              {item.Movie.MovieId}
              {item.Movie.MovieTitle} {/*ネストした分だけ.を増やせば解決 */}
              {item.LikeCnt}
            </li>
          </div>
        ))}
      </div><br /><br />
      <div>
        data3:    <br />      message:<pre>{JSON.stringify(data3.message[0], null, 2)}</pre>
        出力方法<br />
        {" {item.MovieId}"}<br />
        {"  {item.MovieTitle}"}<br />
        {"   {item.LikeCnt}"}<br />
        出力結果<br />
        {data3.message.map((item: any) => (
          <div key={item.Id}>
            <li>
              {item.MovieId}
              {item.MovieTitle} {/*ネストした分だけ.を増やせば解決 */}
              {item.LikeCnt}
            </li>
          </div>
        ))}
      </div>
    </main >
  )
}
// // 10
// 0
// 100
export async function getServerSideProps() {
  // const res1 = await fetch(`http://localhost:8080/1`);
  const res2 = await fetch(`http://localhost:8080/2`);
  const res3 = await fetch(`http://localhost:8080/3`);

  console.log("res21\n", res2, "res3\n", res3)
  // const data1 = await res1.json()
  const data2 = await res2.json()
  const data3 = await res3.json()
  console.log("data2\n", data2)
  console.log("data3\n", data3)
  return {
    // props1: data1,
    props: { data2: data2, data3: data3 }
  }
}