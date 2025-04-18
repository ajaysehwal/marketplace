package services

import (
	"context"
	"time"

	"github.com/ajaysehwal/apihub/base/internal/models"
	"github.com/ajaysehwal/apihub/base/pkg/database"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo/options"
)


type BaseService struct {
	db *database.MongoDB
}

func NewBaseService(db *database.MongoDB) *BaseService {
	return &BaseService{db: db}
}

//
// ─── PRODUCT ────────────────────────────────────────────────────────────────
//

func (s *BaseService) CreateProduct(ctx context.Context, product *models.Product) error {
	if product.Uri == "" || product.Name == "" {
		return ErrInvalidInput
	}

	existing, err := s.GetProductByID(ctx, product.ID.Hex())
	if err != nil && err != ErrNotFound {
		return err
	}
	if existing != nil {
		return ErrDuplicateProduct
	}

	product.Status = models.DRAFT
	product.CreatedAt = time.Now()
	product.UpdatedAt = time.Now()

	if _, err := s.db.Collection("products").InsertOne(ctx, product); err != nil {
		return err
	}

	if product.Category != "" {
		return s.IncrementCategoryProductCount(ctx, product.Category)
	}

	return nil
}

func (s *BaseService) GetProductByID(ctx context.Context, id string) (*models.Product, error) {
	objID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return nil, ErrInvalidID
	}

	var product models.Product
	err = s.db.Collection("products").FindOne(ctx, bson.M{"_id": objID}).Decode(&product)
	if err != nil {
		return nil, ErrNotFound
	}
	return &product, nil
}

func (s *BaseService) GetAllProducts(ctx context.Context, filter map[string]interface{}, skip, limit int64) ([]*models.Product, error) {
	opts := options.Find().SetSkip(skip).SetLimit(limit)
	cursor, err := s.db.Collection("products").Find(ctx, filter, opts)
	if err != nil {
		return nil, err
	}
	defer cursor.Close(ctx)

	var products []*models.Product
	for cursor.Next(ctx) {
		var product models.Product
		if err := cursor.Decode(&product); err == nil {
			products = append(products, &product)
		}
	}
	return products, nil
}

func (s *BaseService) UpdateProduct(ctx context.Context, product *models.Product) error {
	product.UpdatedAt = time.Now()
	_, err := s.db.Collection("products").UpdateOne(ctx, bson.M{"_id": product.ID}, bson.M{"$set": product})
	return err
}

func (s *BaseService) DeleteProduct(ctx context.Context, id string) error {
	objID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return ErrInvalidID
	}
	_, err = s.db.Collection("products").DeleteOne(ctx, bson.M{"_id": objID})
	return err
}

//
// ─── CATEGORY ────────────────────────────────────────────────────────────────
//

func (s *BaseService) CreateCategory(ctx context.Context, category *models.Category) error {
	_, err := s.db.Collection("categories").InsertOne(ctx, category)
	return err
}

func (s *BaseService) GetAllCategories(ctx context.Context) ([]*models.Category, error) {
	cursor, err := s.db.Collection("categories").Find(ctx, bson.M{})
	if err != nil {
		return nil, err
	}
	defer cursor.Close(ctx)

	var categories []*models.Category
	for cursor.Next(ctx) {
		var category models.Category
		if err := cursor.Decode(&category); err == nil {
			categories = append(categories, &category)
		}
	}
	return categories, nil
}

func (s *BaseService) IncrementCategoryProductCount(ctx context.Context, name string) error {
	_, err := s.db.Collection("categories").UpdateOne(ctx, bson.M{"name": name}, bson.M{"$inc": bson.M{"product_count": 1}})
	return err
}

func (s *BaseService) DecrementCategoryProductCount(ctx context.Context, name string) error {
	_, err := s.db.Collection("categories").UpdateOne(ctx, bson.M{"name": name}, bson.M{"$inc": bson.M{"product_count": -1}})
	return err
}

//
// ─── ENDPOINT ────────────────────────────────────────────────────────────────
//

func (s *BaseService) CreateEndpoint(ctx context.Context, endpoint *models.Endpoint) error {
	if endpoint.Path == "" || endpoint.ServiceID.IsZero() {
		return ErrInvalidInput
	}

	if _, err := s.GetProductByID(ctx, endpoint.ServiceID.Hex()); err != nil {
		return ErrProductNotFound
	}

	existing, err := s.GetAllEndpoints(ctx, endpoint.ServiceID)
	if err != nil {
		return err
	}
	for _, e := range existing {
		if e.Path == endpoint.Path {
			return ErrDuplicateEndpoint
		}
	}

	endpoint.Status = models.DRAFT
	endpoint.CreatedAt = time.Now()
	endpoint.UpdatedAt = time.Now()

	if _, err := s.db.Collection("endpoints").InsertOne(ctx, endpoint); err != nil {
		return err
	}

	// Update product with new endpoint reference
	product, err := s.GetProductByID(ctx, endpoint.ServiceID.Hex())
	if err != nil {
		return err
	}
	product.Endpoints = append(product.Endpoints, *endpoint)
	return s.UpdateProduct(ctx, product)
}

func (s *BaseService) GetAllEndpoints(ctx context.Context, productID primitive.ObjectID) ([]*models.Endpoint, error) {
	cursor, err := s.db.Collection("endpoints").Find(ctx, bson.M{"product_id": productID})
	if err != nil {
		return nil, err
	}
	defer cursor.Close(ctx)

	var endpoints []*models.Endpoint
	for cursor.Next(ctx) {
		var endpoint models.Endpoint
		if err := cursor.Decode(&endpoint); err == nil {
			endpoints = append(endpoints, &endpoint)
		}
	}
	return endpoints, nil
}

func (s *BaseService) UpdateEndpoint(ctx context.Context, endpoint *models.Endpoint) error {
	endpoint.UpdatedAt = time.Now()
	_, err := s.db.Collection("endpoints").UpdateOne(ctx, bson.M{"_id": endpoint.ID}, bson.M{"$set": endpoint})
	return err
}

func (s *BaseService) DeleteEndpoint(ctx context.Context, id string) error {
	objID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return ErrInvalidID
	}
	_, err = s.db.Collection("endpoints").DeleteOne(ctx, bson.M{"_id": objID})
	return err
}

func (s *BaseService) GetEndpointByID(ctx context.Context, id string) (*models.Endpoint, error) {
	objID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return nil, ErrInvalidID
	}

	var endpoint models.Endpoint
	err = s.db.Collection("endpoints").FindOne(ctx, bson.M{"_id": objID}).Decode(&endpoint)
	if err != nil {
		return nil, ErrNotFound
	}
	return &endpoint, nil
}
