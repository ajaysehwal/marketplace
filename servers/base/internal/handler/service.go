package handler

import (
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/ajaysehwal/apihub/base/internal/models"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func (h *Handler) CreateProduct(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()

	var product models.Product
	if err := json.NewDecoder(r.Body).Decode(&product); err != nil {
		Error(w, http.StatusBadRequest, err, "Invalid request body")
		return
	}

	if err := h.services.Base.CreateProduct(ctx, &product); err != nil {
		Error(w, http.StatusInternalServerError, err, "Failed to create product")
		return
	}
	JSON(w, http.StatusCreated, product, "Product created successfully")
}

func (h *Handler) ListProducts(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	page := r.URL.Query().Get("page")
	pageSize := r.URL.Query().Get("pageSize")
	pageInt, err := strconv.ParseInt(page, 10, 64)
	category := r.URL.Query().Get("category")
	isVerified := r.URL.Query().Get("isVerified")
	tag := r.URL.Query().Get("tag")
	rating := r.URL.Query().Get("rating")
	serviceType := r.URL.Query().Get("servicetype")
	name := r.URL.Query().Get("name")
	if err != nil {
		Error(w, http.StatusBadRequest, err, "Invalid page")
		return
	}
	pageSizeInt, err := strconv.ParseInt(pageSize, 10, 64)
	if err != nil {
		Error(w, http.StatusBadRequest, err, "Invalid page size")
		return
	}

	filters := map[string]interface{}{
		"category":    category,
		"status":      "active",
		"isverified":  isVerified,
		"tag":         tag,
		"rating":      rating,
		"servicetype": serviceType,
		"name":        name,
	}

	services, err := h.services.Base.GetAllProducts(ctx, filters, pageInt, pageSizeInt)
	if err != nil {
		Error(w, http.StatusInternalServerError, err, "Failed to list services")
		return
	}
	JSON(w, http.StatusOK, services, "Services retrieved successfully")
}

func (h *Handler) GetProduct(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	id := r.URL.Query().Get("id")
	objectID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		Error(w, http.StatusBadRequest, err, "Invalid service ID format")
		return
	}

	product, err := h.services.Base.GetProductByID(ctx, objectID.Hex())
	if err != nil {
		Error(w, http.StatusInternalServerError, err, "Failed to get product")
		return
	}
	JSON(w, http.StatusOK, product, "Product retrieved successfully")
}

func (h *Handler) UpdateProduct(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	id := r.URL.Query().Get("id")
	objectID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		Error(w, http.StatusBadRequest, err, "Invalid product ID format")
		return
	}

	var product models.Product
	if err := json.NewDecoder(r.Body).Decode(&product); err != nil {
		Error(w, http.StatusBadRequest, err, "Invalid request body")
		return
	}
	product.ID = objectID
	if err := h.services.Base.UpdateProduct(ctx, &product); err != nil {
		Error(w, http.StatusInternalServerError, err, "Failed to update product")
		return
	}
	JSON(w, http.StatusOK, product, "Product updated successfully")
}

func (h *Handler) DeleteProduct(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	id := r.URL.Query().Get("id")
	objectID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		Error(w, http.StatusBadRequest, err, "Invalid product ID format")
		return
	}

	if err := h.services.Base.DeleteProduct(ctx, objectID.Hex()); err != nil {
		Error(w, http.StatusInternalServerError, err, "Failed to delete product")
		return
	}
	JSON(w, http.StatusOK, nil, "Product deleted successfully")
}
