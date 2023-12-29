// import React, { useContext, useEffect, useState, createContext } from "react"
// import Link from "next/link"
// import ReactPlayer from 'react-player/youtube';

// // https://qiita.com/ta2roo/items/44f546a55a4e5ef0710b
// export default function Home() {
//     const [start, setStart] = useState(120);
//     const [url, setUrl] = useState("https://youtu.be/2T4kKYAJrAM?t=886");

//     const cliclhandler = (url: string, start: number) => {
//         setStart(start);
//         setUrl(url)
//     }

//     return (
//         <>
//             <Link href="/">Home</Link>
//             <h1>react-player/youtube 7</h1>
//             <div className="App">
//                 <Player start={start} url={url} />
//                 <p>{start} seconds</p>
//                 <button onClick={() => cliclhandler("https://www.youtube.com/watch?v=k_uDlZN6ypk", 1)}>k_uDlZN6ypk, 0sec</button>
//                 <button onClick={() => cliclhandler("https://www.youtube.com/watch?v=k_uDlZN6ypk", 300)}>k_uDlZN6ypk, 5min</button><br />
//                 <button onClick={() => cliclhandler("https://www.youtube.com/watch?v=DREoOy4Q0LU", 1)}>DREoOy4Q0LU, 0sec</button>
//                 <button onClick={() => cliclhandler("https://www.youtube.com/watch?v=DREoOy4Q0LU", 300)}>DREoOy4Q0LU, 5min</button><br />
//                 <br />
//                 startで設定しても、上書きされる（明確な視聴履歴がある場合のみ）
//             </div>
//         </>
//     );
// }

// export class VideoQiitaPage extends Component<Props, State> {

//     player: ReactPlayer | undefined;

//     ref = (player: ReactPlayer) => {
//         this.player = player;
//         this.movePosition();
//     }

//     movePosition(position: number) {
//         let aaa: any = { type: 'seconds' };
//         if (this.player) {
//             this.player.seekTo(position);
//         }
//     }

//     render() {
//         return (
//             // <React.Fragment>
//             <ReactPlayer
//                 ref={this.ref}
//                 url={'http://xn--hhro09bn9j8uh.com/movie/94neco/neco02_720.mp4'}
//                 controls
//             />

