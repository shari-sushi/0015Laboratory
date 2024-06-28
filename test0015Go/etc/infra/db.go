package infra

import (
	// "database/sql"

	"fmt"
	"log"
	"os"

	"github.com/joho/godotenv"
	"github.com/sharin-sushi/0015docker/domain"

	// "gorm.io/driver/mysql"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

// var DbGo *sql.DB
var Db *gorm.DB

type Handler struct {
	DB *gorm.DB
}

func GetDB() *gorm.DB {
	return Db
}

func init() {
	err := godotenv.Load("../.env")
	if err == nil {
		checkFile := os.Getenv("GO_ENV")
		fmt.Printf("got .env file is %v \n", checkFile)
	} else {
		fmt.Print("godotenvによる.envファイル取得失敗。dockercompose.yamlから取得 \n")
		// log.Fatal("Error loading go/.env file")
		// }
	}
}

func initDb() {
	user := os.Getenv("MYSQL_USER")
	pw := os.Getenv("MYSQL_PASSWORD")
	db_name := os.Getenv("MYSQL_DATABASE")
	// db_name := "migration_test" //migrationテスト用
	// port := "v_kara_db" //docker用
	var port string
	checkFile := os.Getenv("GO_ENV")
	if checkFile == "development" {
		port = "localhost:3306" //docker不使用用
	} else if checkFile == "" {
		port = "v_kara_db" //docker不使用用
	} else {
		log.Fatal("GO_ENVに想定外の値が入力されています。")

	}
	path := fmt.Sprintf("%s:%s@tcp(%s)/%s?charset=utf8&parseTime=true", user, pw, port, db_name)
	fmt.Printf("path=%v \n", path)
	var err error
	Db, err = gorm.Open(mysql.Open(path), &gorm.Config{})
	Db = Db.Debug()
	if err != nil {
		panic("failed to connect database")
	}

	migration()

	// fmt.Printf("err=%s\n", err)
	// defer D.Close()
}

func migration() {
	Db.Set("gorm:table_options", "ENGINE=InnoDB").AutoMigrate(
		// User
		domain.Listener{},
		// // Like Relatoin
		// domain.FavoritePost{}, domain.Follow{},
		// // Vtuber Contents
		// domain.KaraokeList{}, domain.Movie{},
	)
}
