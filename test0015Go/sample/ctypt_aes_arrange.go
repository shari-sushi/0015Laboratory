package sample

import (
	"bytes"
	"crypto/aes"
	"crypto/cipher"
	"encoding/hex"
	"fmt"
)

// test0015Go\sample\ctypt_aes_qiita.goの内容を
// 自分のポートフォリオ用に調整したもの

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

	// AES化、ただしviを固定している(AESとは言えないかもしれない)
	// 用途：jsonで受けたメールアドレスを暗号化してdbへ保存
	encryptedEmail, err := EncryptEmail(plain)
	if err != nil {
		errs = append(errs, err)
	}
	fmt.Printf("encryptedEmail = %v\n", encryptedEmail)

	// AESから復号化
	// 用途：DBからIdでpasswordとmailを取得し、それぞれの正当性を比較する？
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
