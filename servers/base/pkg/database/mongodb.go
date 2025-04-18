package database

import (
	"context"
	"time"

	"github.com/ajaysehwal/apihub/base/internal/config"
	"github.com/ajaysehwal/apihub/base/pkg/errors"
	"github.com/ajaysehwal/apihub/base/pkg/logger"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.uber.org/zap"
)

type MongoDB struct {
	client   *mongo.Client
	database *mongo.Database
}

func NewMongoDB(cfg *config.MongoDBConfig) (*MongoDB, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	clientOptions := options.Client().ApplyURI(cfg.URI)
	client, err := mongo.Connect(ctx, clientOptions)
	if err != nil {
		return nil, errors.NewDatabaseError(err)
	}

	// Ping the database
	if err := client.Ping(ctx, nil); err != nil {
		return nil, errors.NewDatabaseError(err)
	}

	logger.Info("Connected to MongoDB",
		zap.String("uri", cfg.URI),
		zap.String("database", cfg.Database),
	)

	return &MongoDB{
		client:   client,
		database: client.Database(cfg.Database),
	}, nil
}

func (m *MongoDB) Collection(name string) *mongo.Collection {
	return m.database.Collection(name)
}

func (m *MongoDB) Close() error {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	if err := m.client.Disconnect(ctx); err != nil {
		return errors.NewDatabaseError(err)
	}

	logger.Info("Disconnected from MongoDB")
	return nil
}

// Common database operations
func (m *MongoDB) InsertOne(ctx context.Context, collection string, document interface{}) (*mongo.InsertOneResult, error) {
	result, err := m.Collection(collection).InsertOne(ctx, document)
	if err != nil {
		return nil, errors.NewDatabaseError(err)
	}
	return result, nil
}

func (m *MongoDB) FindOne(ctx context.Context, collection string, filter interface{}, result interface{}) error {
	err := m.Collection(collection).FindOne(ctx, filter).Decode(result)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			return errors.ErrNotFound
		}
		return errors.NewDatabaseError(err)
	}
	return nil
}

func (m *MongoDB) Find(ctx context.Context, collection string, filter interface{}, opts *options.FindOptions) (*mongo.Cursor, error) {
	cursor, err := m.Collection(collection).Find(ctx, filter, opts)
	if err != nil {
		return nil, errors.NewDatabaseError(err)
	}
	return cursor, nil
}

func (m *MongoDB) UpdateOne(ctx context.Context, collection string, filter interface{}, update interface{}) (*mongo.UpdateResult, error) {
	result, err := m.Collection(collection).UpdateOne(ctx, filter, update)
	if err != nil {
		return nil, errors.NewDatabaseError(err)
	}
	return result, nil
}

func (m *MongoDB) DeleteOne(ctx context.Context, collection string, filter interface{}) (*mongo.DeleteResult, error) {
	result, err := m.Collection(collection).DeleteOne(ctx, filter)
	if err != nil {
		return nil, errors.NewDatabaseError(err)
	}
	return result, nil
}
