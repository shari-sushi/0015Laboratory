package main

import (
	"fmt"

	"github.com/sharin-sushi/0015docker/user"
)

type IListener interface {
	GetListener(user.ListenerId) *user.Listener
	// CreateListener(string) *user.Listener
	// GetVtuber(user.VtuberId) *user.Vtuber
}

// GetVtuber(user.VtuberId) *user.Vtuber をコメントアウト解除するとエラー
// cannot use db (variable of type *user.ListenerDatabase) as IListener value in argument to userGet
// : *user.ListenerDatabase does not implement IListener (missing method GetVtuber)

func main() {
	db := user.NewListenerDatabase()
	fmt.Printf("db type=%#v\n", db)
	fmt.Printf("db=%v, %t,\n", db, db)

	var id user.ListenerId = 1
	gotListener := listenerGet(db, id)
	fmt.Printf("gotListener=%v \n", gotListener)

	// var name string = "sharin"
	// newListenr := listenerCreate(db, name)
	// fmt.Printf("newListenr=%v \n", newListenr)
}

// 出力結果
// db type=&user.ListenerDatabase{}
// db=&{}, &{},
// "fetch"
// gotListener=&{1 sharin}
// "fetch"
// newListenr=&{0 sharin}

func listenerGet(u IListener, id user.ListenerId) *user.Listener {
	fmt.Print("\"fetch\"\n")
	return u.GetListener(id) //定義参照するとinterfaceに飛ぶが、実装参照すると実際に呼び出されるコードに行ける。
}

// func listenerCreate(u IListener, name string) *user.Listener {
// 	fmt.Print("\"fetch\"\n")
// 	return u.CreateListener(name)
// }
