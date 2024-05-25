package main

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/sharin-sushi/0015docker/sample"
	"github.com/sharin-sushi/0015docker/sample/dbnilpo"
	"github.com/sharin-sushi/0015docker/sample/nodbapi"
	"github.com/sharin-sushi/0015docker/sample/sort"
)

// "github.com/sharin-sushi/0015docker/sample" // 消えないようにメモ

func main() {
	// callDBnilpo()
	// callEncrypt()
	// callEncrypt()
	// callVKara()
	callSort()
}

func callSort() {
	sort.CallForMain()
}

func callVKara() {
	// pointer.go
	// for x, y := range のテスト
	r := gin.Default()

	r.Use(cors.New(cors.Config{
		AllowOrigins: []string{
			"http://localhost", "https://localhost",
			"http://v-karaoke.com",
		},
		AllowMethods:     []string{"POST", "GET", "PUT", "DELETE"},
		AllowHeaders:     []string{"Origin", "Content-Length", "Content-Type", "Cookie"},
		AllowCredentials: true,
	}))

	// rangeTest := r.Group("/range")
	// {
	// 	rangeTest.GET("/1", sample.Test1)
	// 	rangeTest.GET("/2", sample.Test2)
	// 	rangeTest.GET("/2a", sample.Test2a)
	// 	rangeTest.GET("/3", sample.Test3)
	// }
	ver := r.Group("/v1")
	{
		vcontents := ver.Group("/vcontents")
		{
			vcontents.GET("/", nodbapi.ReturnAlterTopPage)
		}
	}

	// type_json.go
	// typeTest := r.Group("/type")
	// {
	// 	typeTest.GET("/vt-slise", sample.AlterMainType)
	// }
	r.Run("localhost:8080")

}

func callEncrypt() {
	// crypt.go AES化
	// sample.AlterMainCrypt2() //元記事ほぼそのままのもの
	sample.AlterMainCrypt() //自分用に改変したもの

	// pointer.go
	// このままだとニルポエラーでpanicして落ちる
	// sample.AleterMainPointer()
}

func callDBnilpo() {
	dbnilpo.Main()

}
