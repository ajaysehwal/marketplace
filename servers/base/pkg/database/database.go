package database

import (
	"context"
	"fmt"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.mongodb.org/mongo-driver/mongo/readpref"
)

type Config struct {
	URI      string
	Database string
	Timeout  time.Duration
}

type Database struct {
	client   *mongo.Client
	database *mongo.Database
}

func NewDatabase(cfg Config) (*Database, error) {
	ctx, cancel := context.WithTimeout(context.Background(), cfg.Timeout)
	defer cancel()

	clientOptions := options.Client().ApplyURI(cfg.URI)
	client, err := mongo.Connect(ctx, clientOptions)
	if err != nil {
		return nil, fmt.Errorf("failed to connect to MongoDB: %w", err)
	}

	// Ping the database to verify connection
	if err := client.Ping(ctx, readpref.Primary()); err != nil {
		return nil, fmt.Errorf("failed to ping MongoDB: %w", err)
	}

	return &Database{
		client:   client,
		database: client.Database(cfg.Database),
	}, nil
}

func (db *Database) Collection(name string) *mongo.Collection {
	return db.database.Collection(name)
}

func (db *Database) Close(ctx context.Context) error {
	return db.client.Disconnect(ctx)
}
func (db *Database) Ping(ctx context.Context) error {
	return db.client.Ping(ctx, readpref.Primary())
}
