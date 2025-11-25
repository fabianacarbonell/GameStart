# Backend Updates for B2C + C2C Marketplace

## Summary of Changes

The backend has been updated to support both B2C (Business-to-Consumer) and C2C (Consumer-to-Consumer) marketplace functionality.

## Database Model Changes

### Product Model (`products/models.py`)
Added the following fields:
- `seller` (ForeignKey to User) - Links products to the user who listed them (nullable for admin-created products)
- `condition` (CharField) - Condition of the product (NEW, LIKE_NEW, GOOD, FAIR)
- `created_at` (DateTimeField) - Timestamp when product was created
- `updated_at` (DateTimeField) - Timestamp when product was last updated

## API Endpoints

### Products API (`/api/products/`)

#### List & Create Products
- **GET** `/api/products/` - List all products (public)
  - Supports filtering by: `platforms`, `category`, `condition`, `seller`
  - Supports search by: `name`, `description`
  - Supports ordering by: `price`, `created_at`, `name`
  
- **POST** `/api/products/` - Create a new product listing (authenticated users only)
  - Automatically sets the `seller` to the authenticated user
  - Supports image uploads via `uploaded_images` field

#### Product Details
- **GET** `/api/products/<id>/` - Get product details (public)
- **PUT/PATCH** `/api/products/<id>/` - Update product (owner or admin only)
- **DELETE** `/api/products/<id>/` - Delete product (owner or admin only)

#### User Listings
- **GET** `/api/products/my-listings/` - Get all products listed by the authenticated user

#### Categories
- **GET** `/api/products/categories/` - List all categories
- **GET** `/api/products/categories/<id>/products/` - Get products in a specific category

### Authentication API (`/api/auth/`)
- **POST** `/api/auth/register/` - Register a new user
- **POST** `/api/auth/login/` - Login and receive JWT tokens
- **POST** `/api/auth/token/refresh/` - Refresh access token
- **GET** `/api/auth/profile/` - Get/update authenticated user profile

## Permissions

### Product Creation
- Any authenticated user can create product listings
- The `seller` field is automatically set to the authenticated user

### Product Management
- Users can only edit/delete their own products
- Admin users can edit/delete any product
- Public users can view all products

## Serializer Updates

### ProductSerializer
- Added `seller_username` (read-only) - Shows the username of the seller
- Added `uploaded_images` (write-only) - Accepts list of images during creation
- `seller` field is read-only and set automatically

## Settings Updates

### Installed Apps
- Added `django_filters` for advanced filtering

### REST Framework Configuration
- Added `DjangoFilterBackend` as default filter backend
- JWT authentication enabled
- Default permission: `IsAuthenticatedOrReadOnly`

## Example API Usage

### Create a Product Listing
```bash
POST /api/products/
Authorization: Bearer <access_token>
Content-Type: multipart/form-data

{
  "name": "Far Cry 5",
  "slug": "far-cry-5",
  "description": "Open world action game",
  "price": "29.99",
  "platforms": "PC",
  "condition": "LIKE_NEW",
  "category": 1,
  "stock_quantity": 1,
  "uploaded_images": [<file1>, <file2>]
}
```

### Filter Products
```bash
GET /api/products/?platforms=PC&condition=NEW&ordering=-price
```

### Search Products
```bash
GET /api/products/?search=cyberpunk
```

### Get User's Listings
```bash
GET /api/products/my-listings/
Authorization: Bearer <access_token>
```

## Migration Commands Run
```bash
python3 manage.py makemigrations products
python3 manage.py migrate products
```

## Next Steps for Full MVP

1. **Stripe Integration** - Add payment processing for orders
2. **Image Storage** - Configure AWS S3 for production image storage
3. **Reviews** - Enable users to review products/sellers
4. **Messaging** - Add seller-buyer communication
5. **Admin Dashboard** - Create admin interface for managing listings
