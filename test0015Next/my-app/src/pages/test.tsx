// import React from 'react';
// import YouTube from 'react-youtube';


// // 期待通り動くけど、型エラーがうっとうしいのでコメントアウトした
// // 引用元：tjallingt/react-youtube#187

// class YouTubePlayer extends React.Component {
//     constructor(props) {
//         super(props);

//         this.state = {
//             player: null
//         }
//     }

//     onReady = (event) => {
//         // access to player in all event handlers via event.target
//         this.setState({
//             player: event.target
//         })
//         event.target.playVideo();
//     }

//     changeTime = (seconds) => {
//         console.log('seeking to: ' + seconds)
//         this.state.player.seekTo(seconds)
//         this.state.player.playVideo();
//     }

//     render() {
//         const opts = {
//             width: '560',
//             height: '315',
//         };

//         return (
//             <div>
//                 <YouTube
//                     videoId='I7IdS-PbEgI'
//                     opts={opts}
//                     onReady={this.onReady}
//                 />
//                 <button onClick={() => this.changeTime(60)}>Change Time</button>
//             </div>
//         );
//     }
// }

// export default YouTubePlayer;