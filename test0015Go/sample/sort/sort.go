package sort

import "fmt"

// https://zenn.dev/satumahayato010/articles/58fb473c40d9af

// https://keisan.casio.jp/exec/system/1425449868 で生成
// 1~1000から50個、重複有り
var slice = []int{774, 741, 332, 705, 538, 950, 92, 59, 504, 384, 712, 555, 422, 301, 218, 892, 185, 325, 570, 442, 150, 486, 417, 530, 227, 624, 218, 501, 278, 877, 674, 605, 753, 775, 34, 52, 436, 730, 625, 368, 978, 669, 843, 225, 118, 767, 965, 257, 462, 254}

// var slice = []int{1, 2, 570}

func CallForMain() {
	// callLinearSerch()
	// callBubbleSort()
	// callSelectionSort()
}

/////////////////////////
func callLinearSerch() {
	// 570を探して何番目にあるか返す
	want := 570
	result := linearSerch(slice, want)
	fmt.Printf("result=%v", result)
}

func linearSerch(s []int, want int) int {
	length := len(s)
	for i := 0; i < length; i++ {
		if s[i] == want {
			return i
		}
	}

	return -1
}

/////////////////////////
func BinarySerach() {

}

/////////////////////////
func callBubbleSort() {
	result := bubbleSort(slice)
	fmt.Printf("result=%v", result)
}

func bubbleSort(s []int) []int {
	length := len(s)
	for i := 0; i < length; i++ {
		for j := 0; j < length-1-i; j++ { //iの大きさだけスライスの右側は並べ替え終わってる
			if s[j] > s[j+1] {
				s[j], s[j+1] = s[j+1], s[j]
			}
		}
	}
	return s
}

/////////////////////////
func callSelectionSort() {
	result := SelectionSort(slice)
	fmt.Printf("result=%v", result)
}

func SelectionSort(s []int) []int {
	length := len(s)
	for i := 0; i < length; i++ {
		minIdx := i
		for j := i + 1; j < length; j++ {
			if s[minIdx] > s[j] {
				minIdx = j
			}
		}
		s[i], s[minIdx] = s[minIdx], s[i]
	}

	return s
}

// 最初から１つとりだす（２回目は２番目を取り出す）
// となりと次のと比べる
// 　　持ってるものより小さければ取り換える
// 　　持ってるものと同じならそのまま
// 　　　　全部終わったら、取り出した場所にしまう。

/////////////////////////
func LisertionSort() {

}

/////////////////////////
func ShellSort() {

}

/////////////////////////
func QuickSort() {

}

/////////////////////////
func MergeSort() {

}
