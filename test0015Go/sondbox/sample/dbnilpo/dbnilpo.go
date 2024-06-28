package dbnilpo

import (
	"fmt"
	"os"

	"github.com/sharin-sushi/0015docker/sample/dbnilpo/domain"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

func Main() {
	db := dbInit()

	// getDatabases(db)
	getTables(db)
	// getATableAllRows(db)

	var user domain.Listener
	user.Email = "email"
	err := db.First(&user).Error
	if err != nil {
		fmt.Printf("err:%v\n", err)
	}
	fmt.Printf("user:%v\n", user)

}

func getATableAllRows(db *gorm.DB) {
	rows, err := db.Raw("select * from listeners").Rows()
	if err != nil {
		fmt.Printf("err:%v\n", err)
	}
	defer rows.Close()

	fmt.Printf("result of \"show tables\" is \n")
	for rows.Next() {
		var table string
		if err := rows.Scan(&table); err != nil {
			panic(err.Error())
		}
		fmt.Printf("%v\n", table)
	}
	fmt.Printf("That's all\n")
}

func getDatabases(db *gorm.DB) {
	rows, err := db.Raw("SHOW DATABASES").Rows()
	if err != nil {
		fmt.Printf("show databases get err: %v\n", err)
	}
	defer rows.Close()

	fmt.Printf("result of \"show databases\" is \n")
	for rows.Next() {
		var database string
		if err := rows.Scan(&database); err != nil {
			panic(err.Error())
		}
		fmt.Printf("%v\n", database)
	}
	fmt.Printf("That's all\n")
}

func getTables(db *gorm.DB) {
	rows, err := db.Raw("SHOW TABLES").Rows()
	if err != nil {
		fmt.Printf("show tables get err: %v\n", err)
	}
	defer rows.Close()

	fmt.Printf("result of \"show tables\" is \n")
	for rows.Next() {
		var table string
		if err := rows.Scan(&table); err != nil {
			panic(err.Error())
		}
		fmt.Printf("%v\n", table)
	}
	fmt.Printf("That's all\n")

}

func dbInit() *gorm.DB {
	user := os.Getenv("MYSQL_USER")
	pw := os.Getenv("MYSQL_PASSWORD")
	db_name, dbUrL, path := "", "", ""
	port := "3306"

	isDockerCompose := os.Getenv("IS_DOCKER_COMPOSE")
	goEnv := os.Getenv("GO_ENV")

	if goEnv == "" && isDockerCompose == "" {
		//クラウド環境
		dbUrL = os.Getenv("RDS_END_PIONT")
		db_name = os.Getenv("AWS_DATABASE")
	} else if (goEnv == "" && isDockerCompose == "true") || (goEnv == "development" && isDockerCompose == "") {
		// ローカルのdocker上(compose使用) or  VSCodeで起動
		dbUrL = "localhost"
		db_name = os.Getenv("MYSQL_DATABASE")
	}

	path = fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?charset=utf8mb4&parseTime=true", user, pw, dbUrL, port, db_name)

	fmt.Printf("path=%v \n", path)

	gormDB, err := gorm.Open(mysql.Open(path), &gorm.Config{})
	if err != nil {
		fmt.Printf("Failed to connect to database: %v\n", err)
		os.Exit(1)
	}
	gormDB = gormDB.Debug()

	return gormDB
}
