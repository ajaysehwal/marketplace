package models

type Category int

const (
	Finance Category = iota
	Weather
	Advertising
	Business
	BusinessSoftware
	Commerce
	Communication
	Cryptography
	Cybersecurity
	Data
	Devices
	Ecommerce
	Health
	Email
	Energy
	Entertainment
	Education
	Food
	Events
	Gaming
	Jobs
	Location
	Logistics
	Mapping
	Media
	Monitoring
	Movies
	Music
	Other
	Science
	SMS
	Social
	Tools
	Translation
	Travel
	Video
	VisualRecognition
	News
	Sports
	AI
)

// labels maps Category to human-readable strings
var categoryLabels = [...]string{
	"Finance",
	"Weather",
	"Advertising",
	"Business",
	"Business Software",
	"Commerce",
	"Communication",
	"Cryptography",
	"Cybersecurity",
	"Data",
	"Devices",
	"Ecommerce",
	"Health",
	"Email",
	"Energy",
	"Entertainment",
	"Education",
	"Food",
	"Events",
	"Gaming",
	"Jobs",
	"Location",
	"Logistics",
	"Mapping",
	"Media",
	"Monitoring",
	"Movies",
	"Music",
	"Other",
	"Science",
	"SMS",
	"Social",
	"Tools",
	"Translation",
	"Travel",
	"Video",
	"Visual Recognition",
	"News",
	"Sports",
	"AI",
}

// String returns the label for a given Category
func (c Category) String() string {
	if int(c) < 0 || int(c) >= len(categoryLabels) {
		return "Unknown"
	}
	return categoryLabels[c]
}

func AllCategories() map[int]string {
	result := make(map[int]string)
	for i, label := range categoryLabels {
		result[i] = label
	}
	return result
}



type Categories struct {
	Name string `json:"name" bson:"name"`
	Label string `json:"label" bson:"label"`
	ServiceCount int `json:"service_count" bson:"service_count"`
}


