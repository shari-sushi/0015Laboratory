package sample

import (
	"fmt"

	"gorm.io/gorm"
)

func AleterMainPointer() {
	fmt.Print("------------\n")

	var user User
	fmt.Printf("user : %v\n", user)
	var a uint = 1
	fmt.Printf("a : %v\n", a)

	user2 := User{Model: gorm.Model{}}
	fmt.Printf("user2 : %v\n", user2)

	fmt.Printf("user.ID:%v", user.ID)

	fmt.Print("------------\n")
	// fmt.Print("------------\n")

	// var user User
	// fmt.Printf("user : %v\n", user)
	// var a *uint = 1
	// fmt.Printf("a : %v\n", a)

	// user2 := &User{ID: 1, name: "tanaka"}
	// fmt.Printf("user2 : %v\n", user2)
	// fmt.Printf("user2 : %v\n", user2)

	// fmt.Printf("user.ID:%v\n", user.ID)

	// fmt.Print("------------\n")
}

// type User struct {
// 	ID   *uint
// 	name string
// }

type User struct {
	gorm.Model
	name string
}
