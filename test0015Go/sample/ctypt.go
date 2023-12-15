package sample

// https://qiita.com/p5750/items/d06a3f95c7a453efbb74

import (
	"bytes"
	"crypto/aes"
	"crypto/cipher"
	"crypto/rand"
	"encoding/base64"
	"encoding/hex"
	"fmt"
)

func AlterMainCrypt() {
	text := "shari0123456789abcdefghijklnmopqrstuvwxyz.0123456789abcdefghijklnmopqrstuvwxyz@gmail.com" //暗号化したい文字列

	plain := []byte(text)
	keyString := "645E739A7F9F162725C1533DC2C5E827" //ここがあれかー
	key, _ := hex.DecodeString(keyString)
	iv, encrypted, _ := Encrypt(plain, key)
	decrypted, _ := Decrypt(encrypted, key, iv)

	fmt.Println("Input    :", text)
	fmt.Println("Key:", keyString)
	fmt.Println("IV:", hex.EncodeToString(iv))
	fmt.Println("Encrypted:", base64.StdEncoding.EncodeToString(encrypted))
	fmt.Printf("Decrypted: %s\n", decrypted)
}

//// 実行結果
// Input    : shari0123456789abcdefghijklnmopqrstuvwxyz.0123456789abcdefghijklnmopqrstuvwxyz@gmail.com
// Key: 645E739A7F9F162725C1533DC2C5E827
// IV: 4c3986ec6a398e9ca9d0e7dc13eef858
// Encrypted: EeA6uaxBmEM1aAOfiphTCIthb3BD2HmITMB1gyCyNxR+Cb5HKpqDWQL29KNl2dQVVtAjm7WSGpOlCn0EwdbSK6YAvcq7fu6YEjHDx+WbvFQzXAHaaaZyNrHoPbC2qUJI
// Decrypted: shari0123456789abcdefghijklnmopqrstuvwxyz.0123456789abcdefghijklnmopqrstuvwxyz@gmail.com

//email
func GenerateIV() ([]byte, error) {
	iv := make([]byte, aes.BlockSize)
	if _, err := rand.Read(iv); err != nil {
		return nil, err
	}
	return iv, nil
}

func Pkcs7Pad(data []byte) []byte {
	length := aes.BlockSize - (len(data) % aes.BlockSize)
	trailing := bytes.Repeat([]byte{byte(length)}, length)
	return append(data, trailing...)
}
func Encrypt(data []byte, key []byte) (iv []byte, encrypted []byte, err error) {
	iv, err = GenerateIV()
	if err != nil {
		return nil, nil, err
	}
	block, err := aes.NewCipher(key)
	if err != nil {
		return nil, nil, err
	}
	padded := Pkcs7Pad(data)
	encrypted = make([]byte, len(padded))
	cbcEncrypter := cipher.NewCBCEncrypter(block, iv)
	cbcEncrypter.CryptBlocks(encrypted, padded)
	return iv, encrypted, nil
}

func Pkcs7Unpad(data []byte) []byte {
	dataLength := len(data)
	padLength := int(data[dataLength-1])
	return data[:dataLength-padLength]
}

func Decrypt(data []byte, key []byte, iv []byte) ([]byte, error) {
	block, err := aes.NewCipher(key)
	if err != nil {
		return nil, err
	}
	decrypted := make([]byte, len(data))
	cbcDecrypter := cipher.NewCBCDecrypter(block, iv)
	cbcDecrypter.CryptBlocks(decrypted, data)
	return Pkcs7Unpad(decrypted), nil
}
