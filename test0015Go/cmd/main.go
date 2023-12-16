package main

import "github.com/sharin-sushi/0015docker/sample"

func main() {
	// 暗号化関係のhtmlしたやつ
	// r := gin.Default()
	// r.GET("/1", test1)
	// r.GET("/2", test2)
	// r.GET("/2a", test2a)
	// r.GET("/3", test3)
	// r.Run("localhost:8080")

	// crypt.go AES化

	// sample.AlterMainCrypt2() //元記事ほぼそのままのもの
	// fmt.Print("-------------------------------\n 以下自分用")
	sample.AlterMainCrypt() //自分用に改変したもの
}
