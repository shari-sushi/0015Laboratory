package sample

import (
	"bytes"
	"crypto/aes"
	"crypto/cipher"
	"crypto/rand"
	"encoding/hex"
	"fmt"
)

// ポートフォリオ実装想定でコーディングしたやつ
var aesKey []byte
var aesIv []byte

func init() {
	aesKey = []byte("645E739A7F9F162725C1533DC2C5E827")             // ポートフォリオでは.envから取得
	aesIv, _ = hex.DecodeString("a541fef20f750b79eb6dff9bbb823367") // 同上
	// fmt.Printf("aesKey = %v, \naesIv =%v \n", aesKey, aesIv)
}

////////////////////////////////////////////////////////////////
/////////////// 呼び出し場所想定///////////////////////////////
func AlterMainCrypt() {
	plain := "shari@gmail.com" //平文：ユーザーに入力してもらう
	var errs []error

	//////////////////////////////////////
	encryptedEmail, err := EncryptEmail(plain)
	if err != nil {
		errs = append(errs, err)
	}
	fmt.Printf("encryptedEmail = %v\n", encryptedEmail)

	/////////////////////////////////////
	// DBからIdでpasswordとmailを取得し、それぞれの正当性を比較する？
	decryptedEmail, err := Decrypt(encryptedEmail)
	if err != nil {
		errs = append(errs, err)
	}
	fmt.Printf("decryptedEmail: %v\n", decryptedEmail)

	fmt.Print("errs:", errs)
}

func EncryptEmail(plain string) (encrypted string, err error) {
	bytePlain := []byte(plain)

	block, err := aes.NewCipher(aesKey)
	if err != nil {
		return "", err
	}
	padded := pkcs7Pad(bytePlain)
	byteEncrypted := make([]byte, len(padded))
	cbcEncrypter := cipher.NewCBCEncrypter(block, aesIv)
	cbcEncrypter.CryptBlocks(byteEncrypted, padded)
	encrypted = hex.EncodeToString(byteEncrypted)
	return encrypted, nil
}

func pkcs7Pad(data []byte) []byte {
	length := aes.BlockSize - (len(data) % aes.BlockSize)
	trailing := bytes.Repeat([]byte{byte(length)}, length)
	return append(data, trailing...)
}

func Decrypt(encryptedEmail string) (string, error) {
	byteData := []byte(encryptedEmail)
	block, err := aes.NewCipher(aesKey)
	if err != nil {
		return "", err
	}
	decrypted := make([]byte, len(byteData))
	cbcDecrypter := cipher.NewCBCDecrypter(block, aesIv)
	cbcDecrypter.CryptBlocks(decrypted, byteData)

	email := string(pkcs7Unpad(decrypted))
	return email, nil
}

func pkcs7Unpad(data []byte) []byte {
	fmt.Print("----pkcs7Unpad----\n")
	dataLength := len(data)
	fmt.Printf("data= %v\n", data)
	padLength := int(data[dataLength-1])
	fmt.Printf("dataLength = %v\npadLength = %v\n", dataLength, padLength)
	fmt.Printf("data[:dataLength-padLength] =%v ", data[:dataLength-padLength])
	return data[:dataLength-padLength]
}

///////////////////以上/////////////////////

////////////////////////////////////////////////////////////////////////////////////////
// ivは固定長32文字生成される
// varcher(32)用意するとちょうど良いらしい

// mysql> create table text_sizes (var31 varchar(31),var32 varchar(32),var64 varchar(64));
// Query OK, 0 rows affected (0.05 sec)
// mysql> insert into text_sizes (var31) values("d47b92e643d9ae8a27587401d9930164");
// ERROR 1406 (22001): Data too long for column 'var31' at row 1
// mysql> insert into text_sizes (var32) values("d47b92e643d9ae8a27587401d9930164");
// Query OK, 1 row affected (0.01 sec)

/////////////////////////////////最初に試したやつ///////////////////////////////////
// https://qiita.com/p5750/items/d06a3f95c7a453efbb74
func AlterMainCrypt2() {
	// text := "shari0123456789abcdefghijklnmopqrstuvwxyz.0123456789abcdefghijklnmopqrstuvwxyz@gmail.com" //暗号化したい文字列
	text := "shari@gmail.com" //平文：ユーザーに入力してもらう

	plain := []byte(text)
	keyString := "645E739A7F9F162725C1533DC2C5E827" //ここがあれかー
	key, _ := hex.DecodeString(keyString)           //16進数対応？の[]byteに変換してるっぽい
	iv, encrypted, _ := Encrypt2(plain, key)        //[]byte型の(1), (2) を引数にとり、[]byte型のiv, 暗号化文, errを返す
	// iv, _, _ := Encrypt(plain, key) //[]byte型の(1), (2) を引数にとり、[]byte型のiv, 暗号化文, errを返す
	// ivはランダム生成となるため毎回保管必要。個別公開鍵みたいなイメージか...
	decrypted, _ := Decrypt2(encrypted, key, iv)

	// fmt.Println("Input    :", text)
	// fmt.Println("Key:", keyString)
	// fmt.Println("IV string:", hex.EncodeToString(iv)) //stringに変換
	// fmt.Println("IV:", iv)                            //stringに変換

	// fmt.Println("Encrypted:", base64.StdEncoding.EncodeToString(encrypted))
	fmt.Printf("Decrypted: %s\n", decrypted)
}

// 実行結果
// Input    : shari0123456789abcdefghijklnmopqrstuvwxyz.0123456789abcdefghijklnmopqrstuvwxyz@gmail.com
// Key: 645E739A7F9F162725C1533DC2C5E827
// IV: 4c3986ec6a398e9ca9d0e7dc13eef858
// Encrypted: EeA6uaxBmEM1aAOfiphTCIthb3BD2HmITMB1gyCyNxR+Cb5HKpqDWQL29KNl2dQVVtAjm7WSGpOlCn0EwdbSK6YAvcq7fu6YEjHDx+WbvFQzXAHaaaZyNrHoPbC2qUJI
// Decrypted: shari0123456789abcdefghijklnmopqrstuvwxyz.0123456789abcdefghijklnmopqrstuvwxyz@gmail.com

// //email
func GenerateIV2() ([]byte, error) {
	iv := make([]byte, aes.BlockSize)
	if _, err := rand.Read(iv); err != nil {
		return nil, err
	}
	return iv, nil
}

func Pkcs7Pad2(data []byte) []byte {
	length := aes.BlockSize - (len(data) % aes.BlockSize) //割り算が先
	trailing := bytes.Repeat([]byte{byte(length)}, length)
	return append(data, trailing...)
}
func Encrypt2(data []byte, key []byte) (iv []byte, encrypted []byte, err error) {
	iv, err = GenerateIV2()
	if err != nil {
		return nil, nil, err
	}
	block, err := aes.NewCipher(key)
	if err != nil {
		return nil, nil, err
	}
	padded := Pkcs7Pad2(data)
	encrypted = make([]byte, len(padded))
	cbcEncrypter := cipher.NewCBCEncrypter(block, iv)
	cbcEncrypter.CryptBlocks(encrypted, padded)
	return iv, encrypted, nil
}

func Decrypt2(data []byte, key []byte, iv []byte) ([]byte, error) {
	fmt.Printf("data= %v\n", data)
	block, err := aes.NewCipher(key)
	fmt.Printf("block= %v\n", block)
	if err != nil {
		return nil, err
	}
	decrypted := make([]byte, len(data))
	fmt.Printf("decrypted= %v\n", decrypted)
	cbcDecrypter := cipher.NewCBCDecrypter(block, iv)
	fmt.Printf("cbcDecrypter= %v\n", cbcDecrypter)
	cbcDecrypter.CryptBlocks(decrypted, data)
	fmt.Printf("cbcDecrypter= %v\n", cbcDecrypter)
	returnValue := Pkcs7Unpad2(decrypted)
	return returnValue, nil
}

func Pkcs7Unpad2(data []byte) []byte {
	fmt.Print("----Pkcs7Unpad----\n")
	fmt.Printf("data= %v\n", data)
	dataLength := len(data)
	padLength := int(data[dataLength-1])
	fmt.Printf("dataLength = %v\npadLength = %v\n", dataLength, padLength)
	fmt.Printf("data[:dataLength-padLength] =%v\n", data[:dataLength-padLength])
	return data[:dataLength-padLength] //固定値っぽい
}
