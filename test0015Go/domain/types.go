package domain

//// User
type ListenerId int
type Listener struct {
	ListenerId   ListenerId `gorm:"type:int(11);primaryKey"`
	ListenerName string     `gorm:"type:varchar(50);not null"`
}

// VMK
type Movie struct {
	MovieUrl        string     `gorm:"primaryKey;type:varchar(100)"` //`json:"movie_url"`
	MovieTitle      string     `gorm:"type:varchar(200);not null"`   //`json:"movie_title"`
	VtuberId        VtuberId   `gorm:"type:int(11);not null"`        //`json:"vtuber_id"`
	MovieInputterId ListenerId `gorm:"type:int(11);not null"`        //`json:"movie_inputter_id"` /new
}

// like_reration
type FavoritePost struct {
	Id         int        `gorm:"primaryKey;type:int(11)"`
	ListenerId ListenerId `gorm:"type:int(11);uniqueIndex:favorite;not null"`
	Movie_url  string     `gorm:"type:varchar(100);uniqueIndex:favorite"`
	// KaraokeId  int        `gorm:"type:int(11);uniqueIndex:favorite;default:0"`
}

// type FavoriteCountForUser struct {
// 	ListenrId ListenerId

// 	// Karaoke   int
// }
type FavoriteCountForContent struct {
	Id       int
	MovieUrl string
	// Karaoke   int
	Count int `gorm:"type:int(11);default:0"`
}

type VtuberId int
type Vtuber struct {
	VtuberId         VtuberId   `gorm:"primaryKey;type:int(11)"`          //`json:"vtuber_id"`
	VtuberName       string     `gorm:"type:varchar(50);not null;unique"` //`json:"vtuver_name"`
	VtuberKana       string     `gorm:"type:varchar(50);unique"`          //`json:"vtuber_kana"`
	IntroMovieUrl    string     `gorm:"type:varchar(100)"`                //`json:"vtuber_intro_movie_url"`
	VtuberInputterId ListenerId `gorm:"type:int(11);not null"`            //`json:"vtuber_inputter_id"`
}

type TransmitMovie struct {
	VtuberId
	MovieUrl string
	Vtuber
	Movie
	Count int
	IsFav bool
}

type KaraokeId int
type Karaoke struct {
	KaraokeId         KaraokeId  `gorm:"primaryKey;type:int(11);"`                          //`json:"id"`
	MovieUrl          string     `gorm:"type:varchar(100);uniqueIndex:karaoke_uq:not null"` //`json:"movie_url"`
	SingStart         string     `gorm:"type:time(0);uniqueIndex:karaoke_uq"`               //`json:"sing_start"`
	SongName          string     `gorm:"type:varchar(100)"`                                 //`json:"song_name"`
	KaraokeInputterId ListenerId `gorm:"type:int(11)"`                                      //`json:"inputter_id"`
}

type TransmitKaraoke struct {
	VtuberId
	Vtuber
	MovieUrl string
	Movie
	KaraokeId
	Karaoke
	Count int
	IsFav bool
}
