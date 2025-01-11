/**
 * @openapi
 * /:
 *   get:
 *     tags:
 *       - Home
 *     description: Home page!
 *     summary: Home page
 *     responses:
 *       200:
 *         description: Returns welcome.
 * 
 * /api/v1/register:
 *   post:
 *     tags:
 *       - User
 *     description: User registration endpoint.
 *     summary: Create a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: johndoe
 *                 default: johndoe
 *               email:
 *                 type: string
 *                 example: john@example.com
 *                 default: john@example.com
 *               password:
 *                 type: integer
 *                 example: sTr0nGPa$sWorD
 *                 default: sTr0nGPa$sWorD
 *               isAdmin:
 *                 type: boolean
 *                 example: false
 *     responses:
 *       201:
 *         description: Created
 *       400:
 *         description: Forbidden
 *       401:
 *         description: Un-Authorized
 * 
 * 
 * /api/v1/user/{userId}/delete:
 *  delete:
 *    tags:
 *      - User
 *    summary: Delete user
 *    description: Delete a user
 *    parameters:
 *       - name: page
 *         in: path
 *         schema:
 *           type: string
 *           default: 67720be19d7eae12d57483a0

 *    response:
 *      200:
 *        description: Returns a deleted user
 * 
 * 
 * /api/v1/users:
 *  get:
 *    tags:
 *      - User

 *    summary: Show all users
 *    description: List Users
 *    responses:
 *      200:
 *        description: Array of user objects
 * /api/v1/login:
 *   post:
 *     tags:
 *       - Authentication 
 *     description: Registeration page!
 *     summary: Log a user in and returns a user object.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: john@example.com
 *                 default: john@example.com
 *               password:
 *                 type: string
 *                 example: sTr0nGPa$sWorD
 *                 default: sTr0nGPa$sWorD
 *     responses:
 *       200:
 *         description: Logged in successful.
 *       403:
 *         description: Authentication failed. Check your email and password.
 *       400:
 *         description: Account with email does not exist.
 *       500:
 *         description: Internal server error.
 * 
 * /api/v1/logout:
 *   post:
 *     tags:
 *       - Authentication 
 *     description: Logout
 *     summary: De-authenticated an authenticated user
 *     responses:
 *       200:
 *         description: Returns none logs out a user out
 * 
 * /api/v1/{userId}/update:
 *   put:
 *     tags:
 *       - Authentication 
 *     description: Update user information
 *     summary: Update user information
 *     parameters:
 *       - name: userId
 *         in: path
 *         description: ID of the user to update
 *         required: true
 *         schema:
 *           type: string
 *           default: 67720be19d7eae12d57483a0
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               username:
 *                 type: string
 *               isAdmin:
 *                 type: boolean

 *     responses:
 *       200:
 *         description: Returns none logs out a user out
 * 
 * /api/v1/{userId}/password/change:
 *   post:
 *     tags:
 *       - Authentication 
 *     description: Update password. User needs to know their old password and email for this to work.
 *     summary: Change user password
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               oldPassword:
 *                 type: string
 *               password:
 *                 type: string
 *               confirmPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Returns password changed succesfully returns updated user object
 * 
 * /api/v1/posts:
 *   get:
 *     tags: 
 *       - Post 
 *     description: Post
 *     summary: An array of post objects
 *     parameters:
 *       - name: page
 *         in: query
 *         schema:
 *           type: number
 *           default: 1
 *       - name: limit
 *         in: query
 *         schema:
 *           type: number
 *           default: 10
 *       - name: featured
 *         in: query
 *         schema:
 *           type: boolean
 *           default: true
 * 
 *       - name: published
 *         in: query
 *         schema:
 *           type: boolean
 *           default: true
 *        
 *     responses:
 *       200:
 *         description: Returns a list of object
 *         links:
 *           getPostById:
 *             operationId: getPostById
 *             parameters:
 *               postId: '$response.body#/0/postId'
 *       500: 
 *         description: Server error
 * 
 * /api/v1/posts/author/{username}:
 *   get:
 *     tags:
 *       - Post
 *     description: Post by an author
 *     summary: List of post by an author
 *     parameters:
 *       - name: username
 *         in: path
 *         description: author username
 *         required: true
 *         schema:
 *           type: string
 *           default: tomms
 *     responses:
 *       200:
 *         description: List of post by username
 *       405:
 *         description: Missing username
 *       404:
 *         description: Username not found or does not exist
 *       500:
 *         description: Internal server error
 * 
 * /api/v1/posts/{postId}:
 *   get:
 *     tags:
 *       - Post
 *     description: Post object
 *     summary: get a single Post object
 *     operationId: getPostById
 *     parameters:
 *       - name: postId
 *         in: path
 *         description: ID to get post detail
 *         required: true
 *         schema:
 *           type: string
 *           default: 67728d70291df29b025ae72e
 *       - name: page
 *         in: query
 *         description: Pagination for comment in relation to post
 *         schema:
 *           type: number
 *           default: 1
 *       - name: limit
 *         in: query
 *         description: Limit comments in relation to post
 *         schema:
 *           type: number
 *           default: 10
 * 
 *     responses:
 *       200:
 *         description: Post object
 *       403:
 *         description: Missing PostId
 *       404:
 *         description: Post object no found
 *       500:
 *         description: Internal server error
 * 
 * /api/v1/posts/create:
 *   post:
 *     tags: 
 *       - Post 
 *     description: Post 
 *     security:
 *       - BearerAuth: [sessionToken]
 *     summary: Create a post object
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: new post
 *                 default: new post
 *               slug:
 *                 type: string
 *                 example: new-post
 *                 default: new-post
 *                 description: only lowercase alphanumerals are allowed. Must not start or end with a hyphen.
 *               category:
 *                 type: string
 *                 example: 677434a5172853d38d34fcde
 *                 default: 677434a5172853d38d34fcde
 *               content:
 *                 type: string
 *                 example: Test content test content 123
 *                 default: Test content test content 123
 *               image:
 *                 type: string
 *                 example:
 *               published:
 *                 type: boolean
 *                 example: false
 *                 default: false
 *               featured: 
 *                 type: boolean
 *                 example: false
 *                 default: false     
 * 
 *     responses:
 *       201:
 *         description: Post created.
 *       400:
 *         description: Bad request.
 *       401:
 *         description: Un-Authorized. authentication required.
 * 
 *
 * /api/v1/posts/{postId}/update:
 *   put:
 *     tags: 
 *       - Post 
 *     description: Post
 *     summary: Update post
 *     parameters:
 *       - name: postId
 *         in: path
 *         description: ID of the post to update
 *         required: true
 *         schema:
 *           type: string | number
 *           example: 67735ecfd860b983eb762c8e
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: new post
 *                 default: new post
 *               slug:
 *                 type: string
 *                 example: new-post
 *                 default: new-post
 *               category:
 *                 type: string
 *                 example: 677434a5172853d38d34fcde
 *                 default: 677434a5172853d38d34fcde
 *               content:
 *                 type: string
 *                 example: Test content test content 123
 *                 default: Test content test content 123
 *               image:
 *                 type: string
 *                 example:
 *               published:
 *                 type: boolean
 *                 example: false
 *                 default: false
 *               featured: 
 *                 type: boolean
 *                 example: false
 *                 default: false
 *     responses:
 *       200:
 *         description: Updates a post
 * 
 * /api/v1/posts/{postId}/delete:
 *   delete:
 *     tags:
 *       - Post
 *     description: Post
 *     summary: Delete post
 *     parameters:
 *       - name: postId
 *         in: path
 *         description: ID of the user to update
 *         required: true
 *         schema:
 *           type: string
 *           example: 67735ecfd860b983eb762c8e
 *           default: 67735ecfd860b983eb762c8e
 *     responses:
 *       200:
 *         description: Returns none logs out a user out
 * 
 * 
 * /api/v1/categories:
 *   get:
 *     tags:
 *       - Category
 *     description: List categories
 *     summary: Catergory list
 *     responses:
 *       200:
 *         description: Return all categories
 * 
 * /api/v1/category/{categoryId}:
 *  get:
 *    tags:
 *       - Category
 *    description: Get a single category
 *    summary: Update category
 *    parameters:
 *       - name: categoryId
 *         in: path
 *         description: Category ID
 *         required: true
 *         schema:
 *           type: string | number
 *           example: 677434a5172853d38d34fcde
 *           default: 677434a5172853d38d34fcde
 *    responses:
 *      200:
 *        description: Returns a category object
 * 
 * /api/v1/category/create:
 *   post:
 *     tags:
 *       - Category
 *     description: Create a category
 *     summary: Create a category endpoint
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: new post
 *                 default: new post
 *               slug:
 *                 type: string
 *                 example: new-post
 *                 default: new-post
 *     responses:
 *       200:
 *         description: Create a category
 * 
 * 
 * /api/v1/category/{categoryId}/update:
 *  put:
 *    tags:
 *       - Category
 *    description: Update a category
 *    parameters:
 *       - name: categoryId
 *         in: path
 *         description: Category ID
 *         required: true
 *         schema:
 *           type: string | number
 *           example: 677434a5172853d38d34fcde
 *           default: 677434a5172853d38d34fcde
 *    summary: Update category endpoint
 *    requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: new post
 *                 default: new post
 *               slug:
 *                 type: string
 *                 example: new-post
 *                 default: new-post
 *    responses:
 *      200:
 *        description: Returns a category object
 * 
 * 
 * /api/v1/category/{categoryId}/delete:
 *  delete:
 *    tags:
 *      - Category
 *    description: Delete a category
 *    summary: Delete category endpoint
 *    parameters:
 *       - name: categoryId
 *         in: path
 *         description: Category ID
 *         required: true
 *         schema:
 *           type: string | number
 *           example: 677434a5172853d38d34fcde
 *           default: 677434a5172853d38d34fcde
 *    responses:
 *      200:
 *        description: Returns a success message
 * 
 * 
 * /api/v1/comments:
 *  get:
 *    tags:
 *      - Comment
 *    description: List comments objects
 *    summary: List comment objects
 *    parameters:
 *       - name: page
 *         in: query
 *         description: Pagination for comment in relation to post
 *         schema:
 *           type: number
 *           default: 1
 *       - name: limit
 *         in: query
 *         description: Limit comments in relation to post
 *         schema:
 *           type: number
 *           default: 10
 *    responses:
 *      200:
 *        description: List comments
 * 
 * /api/v1/comment/create:
 *  post:
 *    tags:
 *     - Comment
 *    description: Return comment object
 *    summary: Create a comment object
 *    requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 example: comment
 *                 default: comment
 *               post:
 *                 type: string
 *                 default: 67735ecfd860b983eb762c8e
 *                 example: 67735ecfd860b983eb762c8e

 *    responses:
 *      200:
 *        description: Create a comment
 * 
 * /api/v1/comment/{commentId}/update:
 *  put:
 *    tags:
 *     - Comment
 *    description: Update comment
 *    summary: Update's a comment
 *    parameters:
 *       - name: commentId
 *         in: path
 *         description: Comment ID
 *         required: true
 *         schema:
 *           type: string
 *           example: 6774dedcbf29d8c40412d3ac
 *           default: 6774dedcbf29d8c40412d3ac
 *    requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 example: comment
 *                 default: comment
 *    responses:
 *      200:
 *        description: Return comment object
 * 
 * /api/v1/comment/{commentId}/delete:
 *  delete:
 *    tags:
 *     - Comment
 *    parameters:
 *       - name: categoryId
 *         in: path
 *         description: Comment ID
 *         required: true
 *         schema:
 *           type: string
 *           example: 6774dedcbf29d8c40412d3ac
 *           default: 6774dedcbf29d8c40412d3ac
 *    description: Delete's comment object
 *    summary: Delete's a comment object
 *    responses:
 *      200:
 *        description: Comment deleted successfully
 *      400:
 *        description: User not authorized
 *      403:
 *        description: Forbidden
 *      404:
 *        description: Comment does not exist
 *      500:
 *        description: Internal server error
 * 
 * /api/v1/like:
 *  post:
 *    tags:
 *     - Like
 *    description: Likes a comment or post
 *    summary: 
 *      Like a comment or a post
 *      (itemType) takes lowecase string representation of the item. example - post, comment
 *      (itemId) takes objectId for related object example - PostId can look like this 6774dedcbf29d8c40412d3ac
 *    requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               itemId:
 *                 type: string
 *                 example: 6774dedcbf29d8c40412d3ac
 *                 default: 6774dedcbf29d8c40412d3ac
 *               itemType:                   
 *                 type: string
 *                 example: post
 *                 default: post
 *    responses:
 *      200:
 *        description: Liked object
 *      400:
 *        description: Unlible to create like object.
 *      500:
 *        description: Internal server error.
 * 
 * /api/v1/unlike:
 *  delete:
 *    tags:
 *     - Like
 *    description: Delete a like
 *    summary: Unlikes an object
 *    requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               itemId:
 *                 description: Like object id
 *                 type: string
 *                 example: 6774dedcbf29d8c40412d3ac
 *                 default: 6774dedcbf29d8c40412d3ac
 *    responses:
 *      200:
 *        description: Unliked object
 *      400:
 *        description: Missing LikeId
 *      500:
 *        description: Internal server error
 *    
 */

