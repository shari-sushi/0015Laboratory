package sample

import (
	"fmt"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	// "github.com/sharin-sushi/0015docker/infra"
)

// 下部にinit関数が2つ

type ListenerId int
type VtuberId int

type Vtuber struct {
	VtuberId         VtuberId   `gorm:"primaryKey;type:int(11)"`          //`json:"vtuber_id"`
	VtuberName       string     `gorm:"type:varchar(50);not null;unique"` //`json:"vtuver_name"`
	VtuberKana       string     `gorm:"type:varchar(50);unique"`          //`json:"vtuber_kana"`
	IntroMovieUrl    string     `gorm:"type:varchar(100)"`                //`json:"vtuber_intro_movie_url"`
	VtuberInputterId ListenerId `gorm:"type:int(11);not null"`            //`json:"vtuber_inputter_id"`
}

type Movie2 struct {
	MovieUrl        string     `gorm:"primaryKey;type:varchar(100)"` //`json:"movie_url"`
	MovieTitle      string     `gorm:"type:varchar(200);not null"`   //`json:"movie_title"`
	VtuberId        VtuberId   `gorm:"type:int(11);not null"`        //`json:"vtuber_id"`
	MovieInputterId ListenerId `gorm:"type:int(11);not null"`        //`json:"movie_inputter_id"` /new
}
type VtuberMovie struct {
	Vtuber
	Movie2
}
type VtuberSliceMovie struct {
	Vtuber
	Movie []Movie2
}

func AlterMainType(c *gin.Context) {
	data, _ := GetVtubersMovies()

	fmt.Printf("data=%v", data)

	c.JSON(http.StatusBadRequest, gin.H{
		"data": data,
	})
}

// localhost:80/type/vt-slise
func GetVtubersMovies() ([]VtuberSliceMovie, error) {
	var Mos []Movie2
	// var VtsMos []VtuberMovie
	var VtsSlMos []VtuberSliceMovie
	selectQ := "vtuber_id, vtuber_name,  movie_url, movie_title"
	joinsQ := "LEFT JOIN vtubers USING(vtuber_id)"
	err := db.Model(Mos).Select(selectQ).Joins(joinsQ).Scan(&VtsSlMos).Error
	if err != nil {
		return nil, err
	}
	return VtsSlMos, nil
}

// 結果 //

/////// コード
// selectQ := "vtuber_id, vtuber_name,  movie_url, movie_title"
// joinsQ := "LEFT JOIN vtubers USING(vtuber_id)"
// err := db.Model(Mos).Select(selectQ).Joins(joinsQ).Scan(&VtsSlMos).Error
///////ログ
//  invalid field found for struct github.~~~/sample.VtuberMovie's field Movie: define a valid foreign key for relations or implement the Valuer/Scanner interface
//    SELECT vtuber_id, vtuber_name,  movie_url, movie_title FROM
//    `movie2` LEFT JOIN vtubers USING(vtuber_id)
// Postmanで受け取ったjsonデータ
// {  "data": null}

//////コード
// selectQ := "vtuber_id, vtuber_name,  movie_url, movie_title"
// joinsQ := "LEFT JOIN vtubers USING(vtuber_id)"
// err := db.Model(Mos).Select(selectQ).Joins(joinsQ).Scan(&VtsMos).Error
//////ログ
// SELECT vtuber_id, vtuber_name,  movie_url, movie_title FROM `movie2` LEFT JOIN vtubers USING(vtuber_id)
// data=[{{1 妹望おいも   0} {url1  0 0}} {{1 妹望おいも   0} {url2  0 0}}]
//////Postmanにて受け取ったjsonデータ
//   {
//     "data": [
//        {"VtuberName": "妹望おいも", "VtuberKana": "", "IntroMovieUrl": "", "VtuberInputterId": 0, "MovieUrl": "url1", "MovieTitle": "",　"MovieInputterId": 0},
//        {"VtuberName": "妹望おいも", "VtuberKana": "", "IntroMovieUrl": "", "VtuberInputterId": 0, "MovieUrl": "url2", "MovieTitle": "", "MovieInputterId": 0 }
//     ]
//   }

///////////////データ準備////////////////
func preparedata() {
	var vt1 = Vtuber{
		VtuberName:       "妹望おいも",
		VtuberKana:       "imomochi_oimo",
		VtuberInputterId: 1,
	}
	db.Create(&vt1)

	var mo1 = Movie2{
		MovieUrl: "url1",
		VtuberId: 1,
	}
	var mo2 = Movie2{
		MovieUrl: "url2",
		VtuberId: 1,
	}

	db.Create(&mo1)
	db.Create(&mo2)
}

// 実際のクエリ
// INSERT INTO `vtubers` (`vtuber_name`,`vtuber_kana`,`intro_movie_url`,`vtuber_inputter_id`) VALUES ('妹望おいも','imomochi_oimo','','1')
// INSERT INTO `movie2` (`movie_url`,`movie_title`,`vtuber_id`,`movie_inputter_id`) VALUES ('url1','','1','0')
// NSERT INTO `movie2` (`movie_url`,`movie_title`,`vtuber_id`,`movie_inputter_id`) VALUES ('url2','','1','0')

// コマンドプロンプトでデータ確認

// mysql> select * from vtubers;
// +-----------+-----------------+---------------+-----------------+--------------------+
// | vtuber_id | vtuber_name     | vtuber_kana   | intro_movie_url | vtuber_inputter_id |
// +-----------+-----------------+---------------+-----------------+--------------------+
// |         1 | 妹望おいも      | imomochi_oimo |                 |                  1 |
// +-----------+-----------------+---------------+-----------------+--------------------+

// mysql> select * from movie2;
// +-----------+-------------+-----------+-------------------+
// | movie_url | movie_title | vtuber_id | movie_inputter_id |
// +-----------+-------------+-----------+-------------------+
// | url1      |             |         1 |                 0 |
// | url2      |             |         1 |                 0 |
// +-----------+-------------+-----------+-------------------+

/////////////////////////////

// DB接続
var db *gorm.DB

func init() {
	godotenv.Load("../.env")
}

// CREATE DATABASE test;
// GRANT ARLL ON *.* TO 'user' WITH GRANT OPTIOM;
func init() {
	user := os.Getenv("MYSQL_USER")
	pw := os.Getenv("MYSQL_PASSWORD")
	// db_name := os.Getenv("MYSQL_DATABASE")
	db_name := "test"
	port := "localhost:3306"

	path := fmt.Sprintf("%s:%s@tcp(%s)/%s?charset=utf8mb4&parseTime=true", user, pw, port, db_name)
	fmt.Printf("path=%v \n", path)
	var err error
	db, err = gorm.Open(mysql.Open(path), &gorm.Config{})
	db = db.Debug()
	if err != nil {
		panic("failed to connect database")
	}

	migration()
	requestLogger()

	// preparedata() // 取得する用のデータ準備　初回のみ実施する

}

func migration() {
	fmt.Print("migratoin開始")
	db.Set("gorm:table_options", "ENGINE=InnoDB").AutoMigrate(
		// User
		// Listener{},
		// Like Relatoin
		// Favorite{}, Follow{},
		// Vtuber Contents
		// Karaoke{},
		Movie2{}, Vtuber{},
		// OriginalSong{},
	)
}

func requestLogger() gin.HandlerFunc {
	return func(c *gin.Context) {
		fmt.Printf("Method: %s, Path: %s, Header: %v\n, , Body: %v\n", c.Request.Method, c.Request.URL.Path, c.Request.Header, c.Request.Body)
		c.Next()
	}
}
