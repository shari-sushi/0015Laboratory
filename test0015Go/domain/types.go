package domain

//// User
type ListenerId int
type Listener struct {
	ListenerId   ListenerId `gorm:"type:int(11);primaryKey"`
	ListenerName string     `gorm:"type:varchar(50);not null"`
}

// VMK
type VtuberId int
type Movie struct {
	MovieUrl        string      `gorm:"primaryKey;type:varchar(100)"` //`json:"movie_url"`
	MovieTitle      *string     `gorm:"type:varchar(200);not null"`   //`json:"movie_title"`
	VtuberId        *VtuberId   `gorm:"type:int(11);not null"`        //`json:"vtuber_id"`
	MovieInputterId *ListenerId `gorm:"type:int(11);not null"`        //`json:"movie_inputter_id"` /new
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

// Email        string         `gorm:"type:varchar(255);unique;not null"`
// Password     string         `gorm:"type:varchar(100);not null"`
// CreatedAt    time.Time      `gorm:"type:datetime;default:current_timestamp"`
// UpdatedAt    sql.NullTime   `gorm:"type:datetime"`
// DeletedAt    gorm.DeletedAt `gorm:"type:datetime;index:deleted_index"`

// type KaraokeListId int
// type KaraokeList struct {
// 	MovieUrl              string        `gorm:"primaryKey;type:varchar(100)"` //`json:"movie_url"`
// 	KaraokeListId         KaraokeListId `gorm:"primaryKey;type:int(11)"`      //`json:"id"`
// 	SingStart             *string       `gorm:"type:time(0)"`                 //`json:"sing_start"`
// 	SongName              string        `gorm:"type:varchar(100)"`            //`json:"song_name"`
// 	KaraokeListInputterId *ListenerId   `gorm:"type:int(11)"`                 //`json:"inputter_id"`
// }

// type Follow struct {
// 	Id               int `gorm:"primaryKey;type:int(11)"`
// 	FollowListener   int `gorm:"not null;type:int(11);uniqueIndex:follow_followed;not null"`
// 	FollowedVtuber   int `gorm:"type:int(11);uniqueIndex:follow_followed"`
// 	FollowedListener int `gorm:"type:int(11);uniqueIndex:follow_followed"`
// }
