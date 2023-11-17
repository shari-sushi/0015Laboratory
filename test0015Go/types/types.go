package types

type User struct {
	Id              int     `gorm:"primaryKey;type:int(11);auto_increment"`
	Name            string  `gorm:"type:varchar(50);not null;unique"`
	Kana            *string `gorm:"type:varchar(50);unique"`
	IntroMovieUrl   *string `gorm:"type:varchar(100)"`
	VtuberInputerId *int    `gorm:"type:int(11);not null"`
}
