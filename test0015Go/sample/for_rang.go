package sample

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

// MySQLでテーブル作成する
type Movie struct {
	Id         int
	MovieTitle string
	Url        string
}

type Like struct {
	UserId  int
	MovieId int
}

// MySQLでテーブル作成しない
type LikeCount struct {
	MovieId int
	Count   int
} // SQL上で取得

var movies = []Movie{
	{1, "imo", ":8080"}, {2, "me", ":3000"}, {3, "chumu", ":80"},
}

var likeCnts = []LikeCount{
	{1, 10}, {3, 100},
	// {1, 10}, {2, 0}, {3, 100},
}

// 結果 panic
func Test1(c *gin.Context) {
	var movieWithLikeCnts []MovieWithLikeCnt

	for i, movie := range movies {
		like := likeCnts[i]
		movieWithLikeCnt := MovieWithLikeCnt{
			Movie:   movie,
			LikeCnt: like.Count,
		}
		movieWithLikeCnts = append(movieWithLikeCnts, movieWithLikeCnt)
	}
	fmt.Printf("%v\n", movieWithLikeCnts)
	c.JSON(http.StatusOK, gin.H{
		"movie": movieWithLikeCnts,
	})
	return
}

//  結果
// {"message":[
// {"Movie":{"Id":1,"MovieTitle":"imo"},"LikeCnt":10},
// {"Movie":{"Id":2,"MovieTitle":"me"},"LikeCnt":0},
// {"Movie":{"Id":3,"MovieTitle":"chumu"},"LikeCnt":100}
// ]}
// →{item.Movie.MovieTitle} ネストした分だけ.を増やせば解決
// {item.LikeCnt}

type MovieWithLikeCnt struct {
	Movie   Movie
	LikeCnt int
}

func Test2(c *gin.Context) {
	var transmitData []MovieWithLikeCnt

	// {1, "imo", ":8080"}, {2, "me", ":3000"}, {3, "chumu", ":80"},
	// {1, 10}, {3, 100},
	for _, movie := range movies {
		likeCnt := returnLikeCntEachMovieId(movie.Id, likeCnts)
		movieWithLikeCnt := MovieWithLikeCnt{
			Movie:   movie,
			LikeCnt: likeCnt.Count,
		}
		transmitData = append(transmitData, movieWithLikeCnt)
	}
	fmt.Println(transmitData)
	c.JSON(http.StatusOK, gin.H{
		"movie": transmitData,
	})
	return
}

// 結果
// {"message":[
// {"Id":1,"MovieTitle":"imo","LikeCnt":10},
// {"Id":2,"MovieTitle":"me","LikeCnt":0},
// {"Id":3,"MovieTitle":"chumu","LikeCnt":100}
// ]}
type MovieWithLikeCnt2 struct {
	Id         int
	MovieTitle string
	LikeCnt    int
}

func Test3(c *gin.Context) {
	var transmitData []MovieWithLikeCnt2

	for _, movie := range movies {
		like := returnLikeCntEachMovieId(movie.Id, likeCnts)
		movieWithLikeCnt := MovieWithLikeCnt2{
			Id:         movie.Id,
			MovieTitle: movie.MovieTitle,
			LikeCnt:    like.Count,
		}
		transmitData = append(transmitData, movieWithLikeCnt)
	}
	fmt.Println("toTransmitData", transmitData)

	c.JSON(http.StatusOK, gin.H{
		"movie": transmitData,
	})
	return
}

// 	個別に渡される　movieId = 1, 2, 3
// スライスとして全て渡される []likeCnts = {1, 10}, {3, 100},
func returnLikeCntEachMovieId(movieId int, likeCnts []LikeCount) LikeCount {
	for _, likeCnt := range likeCnts {
		if likeCnt.MovieId == movieId {
			return likeCnt
		}
	}
	return LikeCount{MovieId: movieId, Count: 0}
}

// Test2の処理目視用
func Test2a(c *gin.Context) {
	// transmitData を作成
	var transmitData []MovieWithLikeCnt

	// 	{1, "imo"}, {2, "me"}, {3, "chumu"},
	// {1, 10}, {3, 100},
	for _, movie := range movies {
		likeCnt := returnLikeCntEachMovieId(movie.Id, likeCnts)
		movieWithLikeCnt := MovieWithLikeCnt{
			Movie:   movie,
			LikeCnt: likeCnt.Count,
		}
		fmt.Println("------------------------")
		fmt.Println("toTransmitData: ", transmitData)
		fmt.Println("movieWithLikeCnt: ", movieWithLikeCnt)
		transmitData = append(transmitData, movieWithLikeCnt)
	}
	fmt.Println("---")
	fmt.Println("toTransmitData", transmitData)
	c.JSON(http.StatusOK, gin.H{
		"movie": transmitData,
	})
	return
}
