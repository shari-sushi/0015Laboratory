package test_ci

import (
	"testing"
)

func Test_funReturnMes(t *testing.T) {
	tests := map[string]struct {
		want      string
		expectErr bool
	}{
		"成功": {want: "起動確認", expectErr: false},
	}
	for name, tt := range tests {
		t.Run(name, func(t *testing.T) {
			if got := funReturnMes(); got != tt.want {
				t.Errorf("funReturnMes() = %v, want %v", got, tt.want)
			}
		})
	}
}

func Test_funcRetunTwoTimes(t *testing.T) {
	cases := map[string]struct {
		i         int
		want      int
		expectErr bool
	}{
		"成功": {1, 2, false},
		"失敗": {1, 1, true},
	}
	for testName, tt := range cases {
		t.Run(testName, func(t *testing.T) {
			if tt.expectErr == true {
				if got := funcRetunTwoTimes(tt.i); got == tt.want {
					t.Errorf("funcRetunTwoTimes() = %v, want %v", got, tt.want)
				}
			} else {
				if got := funcRetunTwoTimes(tt.i); got != tt.want {
					t.Errorf("funcRetunTwoTimes() = %v, not want %v", got, tt.want)
				}
			}
		})
	}
}

//////////////////////////////////////
// これをciで実行する
////////////////////////////////
