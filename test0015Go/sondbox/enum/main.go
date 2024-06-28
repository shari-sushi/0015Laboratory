package main

// https://zenn.dev/jy8752/scraps/7271589ceb37ad
// https://zenn.dev/kyoh86/articles/qiita-18b8bfc6ffe045aaf380

import "fmt"

func main() {
	// a() //Rat Raaaaaa
	b() //
}

type Zodiac string

const (
	Rat   = Zodiac("Rat")
	Ox    = Zodiac("Ox")
	Tiger = Zodiac("Tiger")
	Ra    = Zodiac("Ra")
)

// func a() {
// 	one := Zodiac("Rat")
// 	two := Zodiac("Raaaaaa")

// 	fmt.Println(one,two)
// }

func b() {
	one := Zodiac("Rat")
	two := Zodiac("Raaaaaa")
	fmt.Println(one, two) //Rat Raaaaaa

	one = "one"
	two = "two"
	fmt.Println(one, two) //one two
}
