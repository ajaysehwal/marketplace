package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Status string

const (
	DRAFT     Status = "DRAFT"
	PUBLISHED Status = "PUBLISHED"
)

type ServiceType string

const (
	FREE     ServiceType = "FREE"
	FREEMIUM ServiceType = "FREEMIUM"
	PAID     ServiceType = "PAID"
)
type Publisher struct {
	ID         string `json:"id"`
	Email      string `json:"email"`
	Username   string `json:"username"`
	IsVerified bool   `json:"is_verified"`
}
	
type Endpoint struct {
	ID          primitive.ObjectID `json:"id" bson:"_id,omitempty"`
	Name        string             `json:"name" bson:"name"`
	Version     string             `json:"version" bson:"version"`
	Description string             `json:"description" bson:"description"`
	Methods     []Method           `json:"methods" bson:"methods"`
	Path        string             `json:"path" bson:"path"`
	UpstreamID  primitive.ObjectID `json:"upstream_id" bson:"upstream_id"`
	ServiceID   primitive.ObjectID `json:"service_id" bson:"service_id"`
	Host        string             `json:"host" bson:"host"`
	Status      Status             `json:"status" bson:"status"`
	Labels      []string           `json:"labels" bson:"labels"`
	CreatedAt   time.Time          `json:"created_at" bson:"created_at"`
	UpdatedAt   time.Time          `json:"updated_at" bson:"updated_at"`
}

type Product struct {
	ID          primitive.ObjectID `json:"id" bson:"_id,omitempty"`
	Uri         string             `json:"uri" bson:"uri"`
	Publisher   Publisher          `json:"publisher" bson:"publisher"`
	Name        string             `json:"name" bson:"name"`
	Description string             `json:"description" bson:"description"`
	Tags        []string           `json:"tags" bson:"tags"`
	Endpoints   []Endpoint         `json:"endpoints" bson:"endpoints"`
	UpstreamId  string             `json:"upstream_id" bson:"upstream_id"`
	Category    string             `json:"category" bson:"category"`
	Rating      int                `json:"rating" bson:"rating"`
	Status      Status             `json:"status" bson:"status"`
	ServiceType ServiceType        `json:"service_type" bson:"service_type"`
	UsersCount  int                `json:"users_count" bson:"users_count"`
	CreatedAt   time.Time          `json:"created_at" bson:"created_at"`
	UpdatedAt   time.Time          `json:"updated_at" bson:"updated_at"`
}
