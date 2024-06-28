package sample

import (
	"bytes"
	"crypto/aes"
	"crypto/cipher"
	"encoding/hex"
	"fmt"
	"os"

	"github.com/joho/godotenv"
)

// test0015Go\sample\ctypt_aes_qiita.goの内容を
// 自分のポートフォリオ用に調整したもの

// ポートフォリオ実装想定でコーディングしたやつ
var aesKey []byte
var aesIv []byte

func init() {
	// aesKey = []byte("645E739A7F9F162725C1533DC2C5E827")             // 公開するサービスでは.envから取得
	// aesIv, _ = hex.DecodeString("a541fef20f750b79eb6dff9bbb823367") // 同上
	_ = godotenv.Load("../.env")
	aesKey = []byte(os.Getenv("AES_KEY"))
	aesIv, _ = hex.DecodeString(os.Getenv("AES_IV"))

	// fmt.Printf("aesKey = %v, \naesIv =%v \n", aesKey, aesIv)
}

/////////////// 呼び出し場所想定////////////s///////////////////
func AlterMainCrypt() {
	plain := "susi.imo.niku@gmail.com" //平文：ユーザーに入力してもらう
	fmt.Printf("plain:%v\n", plain)
	var errs []error

	// AES化、ただしviを固定している(AESとは言えないかもしれない)
	// 用途：jsonで受けたメールアドレスを暗号化してdbへ保存
	encryptedEmail, err := EncryptByAES(plain)
	if err != nil {
		errs = append(errs, err)
	}
	fmt.Printf("encryptedEmail = %v\n", encryptedEmail)

	// AESから復号化
	// 用途：DBからIdでpasswordとmailを取得し、それぞれの正当性を比較する？
	decryptedEmail, err := DecryptFromAES(encryptedEmail)
	if err != nil {
		errs = append(errs, err)
	}
	fmt.Printf("decryptedEmail: %v\n", decryptedEmail)

	fmt.Print("errs:", errs)
}

func EncryptByAES(plain string) (encrypted string, err error) {
	bytePlain := []byte(plain)
	fmt.Printf("bytePlain:%v\n", bytePlain)

	block, err := aes.NewCipher(aesKey)
	if err != nil {
		return "err of encrypt to aes:", err
	}
	padded := pkcs7Pad(bytePlain)
	byteEncrypted := make([]byte, len(padded)) //初期化みたいなもの
	// fmt.Printf("byteEncrypted= %v\n", byteEncrypted) //[0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0]

	cbcEncrypter := cipher.NewCBCEncrypter(block, aesIv)
	cbcEncrypter.CryptBlocks(byteEncrypted, padded)
	// fmt.Printf("byteEncrypted= %v\n", byteEncrypted)        // [147 97 197 223 25 106 174 242 251 98 27 102 193 134 87 183]
	convertedHexString := hex.EncodeToString(byteEncrypted) // 9361c5df196aaef2fb621b66c18657b7

	// fmt.Printf("stringConvertedHex= %v\n", convertedHexString)
	byteDecoded, _ := hex.DecodeString(convertedHexString) // [147 97 197 223 25 106 174 242 251 98 27 102 193 134 87 183]
	fmt.Printf("byteDecoded= %v\n", byteDecoded)
	// stringConverted := string(byteEncrypted)         //�a��j���b��W�
	// base64EncodedStr := base64.StdEncoding.EncodeToString(stringConverted)
	// fmt.Println("Base64 encoded string:", base64EncodedStr)
	// decodedByteData, _ := base64.StdEncoding.DecodeString(stringConvertedHex) // [247 126 181 115 151 95 215 222 154 105 231 246 125 190 182 213 190 186 115 95 58 231 182 251]

	encrypted = convertedHexString
	return encrypted, nil
}

func pkcs7Pad(data []byte) []byte {
	length := aes.BlockSize - (len(data) % aes.BlockSize)
	trailing := bytes.Repeat([]byte{byte(length)}, length)
	return append(data, trailing...)
}

func DecryptFromAES(encryptedEmail string) (string, error) {
	byteDecoded, _ := hex.DecodeString(encryptedEmail)
	block, err := aes.NewCipher(aesKey)
	if err != nil {
		return "", err
	}
	decrypted := make([]byte, len(byteDecoded))
	cbcDecrypter := cipher.NewCBCDecrypter(block, aesIv)
	cbcDecrypter.CryptBlocks(decrypted, byteDecoded)

	email := string(pkcs7Unpad(decrypted))
	return email, nil
}

func pkcs7Unpad(data []byte) []byte {
	fmt.Print("----pkcs7Unpad----\n")
	dataLength := len(data)
	fmt.Printf("data= %v\n", data)
	padLength := int(data[dataLength-1])
	fmt.Printf("dataLength = %v\npadLength = %v\n", dataLength, padLength)
	fmt.Printf("data[:dataLength-padLength] =%v\n", data[:dataLength-padLength])
	return data[:dataLength-padLength]
}

///////////////////////////

// func main() {
// 	byteData := []byte{147, 97, 197, 223, 25, 106, 174, 242, 251, 98, 27, 102, 193, 134, 87, 183}

// 	// []byte を文字列に変換
// 	strData := string(byteData)
// 	fmt.Println("String representation:", strData)

// 	// 文字列を []byte に変換
// 	convertedByteData := []byte(strData)
// 	fmt.Println("Converted back to []byte:", convertedByteData)

// 	// もし base64 エンコードされた文字列に変換したい場合
// 	base64EncodedStr := base64.StdEncoding.EncodeToString(byteData)
// 	fmt.Println("Base64 encoded string:", base64EncodedStr)

// 	// base64 エンコードされた文字列を []byte にデコード
// 	decodedByteData, err := base64.StdEncoding.DecodeString(base64EncodedStr)
// 	if err != nil {
// 		fmt.Println("Error decoding base64:", err)
// 		return
// 	}
// 	fmt.Println("Decoded from base64:", decodedByteData)
// }

// 結果
// String representation: �a��j���b��W�
// Converted back to []byte: [147 97 197 223 25 106 174 242 251 98 27 102 193 134 87 183]
// Base64 encoded string: k2HF3xlqrvL7YhtmwYZXtw==
// Decoded from base64: [147 97 197 223 25 106 174 242 251 98 27 102 193 134 87 183]
