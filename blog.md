### **Database Model**

#### **Users Table**  
Stores user details and authentication information.  
- `id` (Primary Key, Auto-increment)
- `username` (Unique, String, 150)
- `email` (Unique, String, 255)
- `password` (Hashed, String, 255)
- `first_name` (String, 100, Optional)
- `last_name` (String, 100, Optional)
- `profile_image` (String/FilePath, Optional)
- `bio` (Text, Optional)
- `is_admin` (Boolean, Default: False)
- `created_at` (DateTime, Default: NOW)
- `updated_at` (DateTime)

---

#### **Blog Posts Table**  
Stores details of each blog post.  
- `id` (Primary Key, Auto-increment)
- `title` (String, 255)
- `slug` (Unique, String, 255)
- `content` (Text)
- `image` (String/FilePath, Optional)
- `author_id` (Foreign Key to `Users.id`)
- `published` (Boolean, Default: False)
- `published_at` (DateTime, Nullable)
- `created_at` (DateTime, Default: NOW)
- `updated_at` (DateTime)

---

#### **Categories Table**  
Stores blog categories for classification.  
- `id` (Primary Key, Auto-increment)
- `name` (String, 100, Unique)
- `slug` (Unique, String, 100)
- `created_at` (DateTime, Default: NOW)

---

#### **Post Categories Table**  
Handles the many-to-many relationship between posts and categories.  
- `id` (Primary Key, Auto-increment)
- `post_id` (Foreign Key to `Blog Posts.id`)
- `category_id` (Foreign Key to `Categories.id`)

---

#### **Comments Table**  
Stores comments on blog posts.  
- `id` (Primary Key, Auto-increment)
- `post_id` (Foreign Key to `Blog Posts.id`)
- `author_id` (Foreign Key to `Users.id`)
- `content` (Text)
- `created_at` (DateTime, Default: NOW)

---

#### **Likes Table**  
Stores likes on blog posts by users.  
- `id` (Primary Key, Auto-increment)
- `post_id` (Foreign Key to `Blog Posts.id`)
- `user_id` (Foreign Key to `Users.id`)
- `created_at` (DateTime, Default: NOW)

---

### **Required Pages**

#### **Authentication Pages**
1. **Sign Up Page**  
   - Form for user registration.
   - Fields: `username`, `email`, `password`, `confirm password`.

2. **Login Page**  
   - Form for user login.  
   - Fields: `email`/`username`, `password`.

3. **Logout Endpoint**  
   - Ends the user session.

4. **Forgot Password Page**  
   - Form for resetting a password.
   - Fields: `email`.

5. **Profile Page**  
   - Displays user information.
   - Allows editing details and uploading a profile picture.

---

#### **Blog Pages**
1. **Home Page**  
   - Lists all published blog posts with pagination.
   - Includes search functionality and category filters.

2. **Single Post Page**  
   - Displays a single blog post with title, content, and author information.
   - Includes comments section and like button.

3. **Create/Edit Post Page**  
   - Form for creating or editing a blog post.
   - Fields: `title`, `content`, `image`, `categories`, `published`.

4. **Category Page**  
   - Displays all posts within a specific category.

5. **Author Page**  
   - Displays all posts by a specific author.

---

#### **Admin Pages**
1. **Admin Dashboard**  
   - Overview of blog metrics (e.g., total posts, users, comments).  
2. **Manage Users**  
   - CRUD operations for user accounts.
3. **Manage Posts**  
   - CRUD operations for blog posts.
4. **Manage Categories**  
   - CRUD operations for categories.

---

Let me know if you need detailed SQL scripts, API endpoints, or further enhancements.
