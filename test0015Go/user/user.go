package user

// Listener
type ListenerId int
type Listener struct {
	Id   ListenerId
	Name string
}

type ListenerDatabase struct{}

func NewListenerDatabase() *ListenerDatabase {
	var db ListenerDatabase
	return &db
}

func (d *ListenerDatabase) GetListener(id ListenerId) *Listener {
	user := new(Listener)
	user.Id = id
	switch i := id; i {
	case 0:
		user.Name = "guest"
	case 1:
		user.Name = "sharin"
	default:
		user.Name = ""
	}
	return user
}

func (d *ListenerDatabase) CreateListener(name string) *Listener {
	user := new(Listener)
	user.Name = name
	return user
}

// func (d *ListenerDatabase) CreateListener(data interface{}) {}

// Vtuber
type VtuberId int
type Vtuber struct {
	Id   VtuberId
	Name string
}

type VtuberDatabase struct{}

func NewVtuberDatabase() *VtuberDatabase {
	var db VtuberDatabase
	return &db
}

func (d *VtuberDatabase) GetVtuber(id VtuberId) *Vtuber {
	user := new(Vtuber)
	user.Id = id
	return user
}
