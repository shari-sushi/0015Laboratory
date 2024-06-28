package nodbapi

import (
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/sharin-sushi/0015docker/domain"
)

func ReturnAlterTopPage(c *gin.Context) {
	var errs []error
	var allVts []domain.Vtuber
	var VtsMosWithFav []domain.TransmitMovie
	var VtsMosKasWithFav []domain.TransmitKaraoke

	allVts = []domain.Vtuber{
		{
			VtuberId:         1,
			VtuberName:       "接続確認",
			VtuberKana:       "sucsessefuly_connect",
			IntroMovieUrl:    "",
			VtuberInputterId: 1,
		},
	}

	VtsMosWithFav = []domain.TransmitMovie{
		{
			VtuberId: 1,
			MovieUrl: "www.youtube.com/watch?v=4p1pIYBU61c",
			Vtuber: domain.Vtuber{
				VtuberName:       "接続確認",
				VtuberKana:       "sucsessefuly_connect",
				IntroMovieUrl:    "",
				VtuberInputterId: 1,
			},
			Movie: domain.Movie{
				MovieTitle:      "牙アピールかわいいおいも[新人vTuber妹望おいも]",
				VtuberId:        1,
				MovieInputterId: 1,
			},
			Count: 100,
			IsFav: false,
		},
	}

	VtsMosKasWithFav = []domain.TransmitKaraoke{
		{
			VtuberId: 1,
			MovieUrl: "www.youtube.com/watch?v=4p1pIYBU61c",
			Vtuber: domain.Vtuber{
				VtuberName:       "接続確認",
				VtuberKana:       "sucsessefuly_connect",
				IntroMovieUrl:    "",
				VtuberInputterId: 1,
			},
			Movie: domain.Movie{
				MovieTitle:      "牙アピールかわいいおいも[新人vTuber妹望おいも]",
				VtuberId:        1,
				MovieInputterId: 1,
			},
			KaraokeId: 1,
			Karaoke: domain.Karaoke{
				SingStart:         "00:00:35",
				SongName:          "おいもの誕生日" + os.Getenv("MYSQL_PASSWORD"),
				KaraokeInputterId: 1,
			},
			Count: 100,
			IsFav: false,
		},
	}

	c.JSON(http.StatusOK, gin.H{
		"vtubers":                 allVts,
		"vtubers_movies":          VtsMosWithFav,
		"vtubers_movies_karaokes": VtsMosKasWithFav,
		"error":                   errs,
		"message":                 "none",
	})
	return

}
