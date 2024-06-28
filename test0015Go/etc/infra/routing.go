package infra

import (
	"github.com/gin-gonic/gin"
)

func Routing(r *gin.Engine) {
	initDb()

	//topページ
	// r.GET("/", ReadAllVtubersAndMovies)
}
