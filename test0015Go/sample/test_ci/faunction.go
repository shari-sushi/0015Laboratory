package test_ci

import (
	"fmt"
)

func funReturnMes() string {
	message := "起動確認"
	fmt.Print(message)
	return message
}

func funcRetunTwoTimes(i int) int {
	fmt.Printf("x:%v", i)
	return i * 2
}

func Parent() {
	mes := funReturnMes()
	x := 1
	twoTimesInt := funcRetunTwoTimes(x)
	fmt.Println("result", mes, twoTimesInt)
}
