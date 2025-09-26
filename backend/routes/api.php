<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\{
    UserPanelController,
    DeveloperPublicController,
    DevController,
    ProductController,
    StoreController,
    UserController,
    adminController,
    AuthController,
    ApproveController,
    TicketController,
    SavedProductController,
    ProductLikesController,
    ProductImageController,
    CommentController,
    CategoryController,
    ProfessorController,
    ArticleController,
    SkillController,
    OwnerController,
};


// User
Route::post('user/checkmail', [UserController::class, 'checkEmail']);    
Route::middleware(['auth:sanctum'])->group(function () {
Route::post('/users/store',[UserController::class,'store']);
});

// User Panel
Route::middleware('auth:sanctum')->group(function (){
Route::get('/me/profile', [UserPanelController::class, 'showProfile']);
Route::get('/me/projects', [UserPanelController::class, 'myProjects']);             # Its For Phase 2 Right Now And Its Not Working Corrently
});

// Owner
Route::middleware('auth:sanctum')->post('/users/{id}/updaterole', [OwnerController::class, 'updateRole']);
Route::middleware('auth:sanctum')->delete('/users/{id}/delete', [OwnerController::class, 'destroyUser']);
Route::get('/showusers', [OwnerController::class, 'showUsers']);

// Products
Route::prefix('products')->group(function () {
    Route::get('/', [ProductController::class, 'index']);
    Route::get('/{id}',[ProductController::class, 'show']);
    Route::post('/{id}/approve',[ApproveController::class,'approve']);

    Route::middleware('auth:sanctum')->group(function (){
        Route::post('/create', [ProductController::class, 'store']);
        Route::put('/{id}/update', [ProductController::class, 'updateProduct']);
        Route::post('/{id}/like', [ProductLikesController::class, 'toggleLike']);
        Route::delete('/{id}/delete', [ProductController::class, 'deleteProduct']);
    });
});

// Developer
Route::prefix('developer')->group(function () {
    Route::get('/{id}', [UserPanelController::class, 'show']);

    Route::middleware('auth:sanctum')->group(function (){
        Route::get('/status', [DevController::class, 'status']);
        Route::get('/requests', [DevController::class, 'show']);
        Route::post('/profile', [DevController::class, 'store']);
        Route::post('/reject/{id}', [DevController::class, 'reject']);
        Route::post('/approve/{id}', [DevController::class, 'approve']);
    });
});

// Authentication
Route::prefix('auth')->group(function () {
    Route::post('login',[AuthController::class,'login']);
    Route::post('register',[AuthController::class,'register']);

    Route::middleware('auth:sanctum')->group(function (){
        Route::post('logout',[AuthController::class,'logout']);
    });
});

// Admin
Route::prefix('admin')->group(function () {
    Route::post('/login', [adminController::class, 'login']);
    Route::post('/register', [adminController::class, 'register']);

    Route::middleware('auth:sanctum')->group(function (){
        Route::get('/users', [adminController::class, 'showUsers']);
        Route::get('/profile', [adminController::class, 'profile']);
        Route::post('/ban/{id}', [adminController::class, 'banUser']);
        Route::get('/products', [adminController::class, 'showProduct']);
        Route::get('/profiles', [adminController::class, 'allProfiles']);
        Route::get('/users/{id}', [adminController::class, 'searchUser']);
        Route::post('/checkmail', [adminController::class, 'checkEmail']);
        Route::delete('/users/{id}', [adminController::class, 'destroyUser']);
        Route::put('/updateprofile', [adminController::class, 'updateProfile']);
        Route::get('/products/{id}', [adminController::class, 'searchProduct']);
        Route::post('/updaterole/{id}', [adminController::class, 'updateRole']);
    });
});

// Ticket
Route::middleware('auth:sanctum')->prefix('tickets')->group(function () {
        Route::get('/', [TicketController::class, 'index']);
        Route::get('/show', [TicketController::class, 'show']);
        Route::post('/create', [TicketController::class, 'store']);
        Route::delete('/{id}', [TicketController::class, 'destroy']);
        Route::put('/approve/{id}', [TicketController::class, 'approve']);
}); 

// Product Save
Route::middleware('auth:sanctum')->prefix('indexes')->group(function () {
    Route::get('saves', [SavedProductController::class, 'index']);
    Route::post('save', [SavedProductController::class, 'store']);
    Route::delete('delete/{id}', [SavedProductController::class, 'destroy']);
});

// Skill
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/skills', [SkillController::class, 'index']);
    Route::post('/skill/create', [SkillController::class, 'store']); 
    Route::delete('/skills/{id}', [SkillController::class, 'destroy']);
});

// Product Images
Route::get('/products/{id}/images', [ProductImageController::class, 'index']);
Route::post('/products/{id}/images', [ProductImageController::class, 'store']);
Route::delete('/product_images/{id}', [ProductImageController::class, 'destroy']);

//Comments
Route::middleware('auth:sanctum')->prefix('comments')->group(function () {
    Route::post('/create/{id}', [CommentController::class, 'store']);
    Route::get('/show/{id}', [CommentController::class, 'index']);
    Route::put('/update/{id}', [CommentController::class, 'update']);
    Route::delete('/delete/{id}', [CommentController::class, 'destroy']);
});

// Categories
Route::prefix('categories')->group(function () {
    Route::get('/show', [CategoryController::class, 'index']);
    Route::get('/show/{id}', [CategoryController::class, 'show']);

    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/create', [CategoryController::class, 'store']);
        Route::put('/update/{id}', [CategoryController::class, 'update']);
        Route::delete('/delete/{id}', [CategoryController::class, 'destroy']);
    });
});

// Professors
Route::prefix('professors')->group(function () {
    Route::get('/', [ProfessorController::class, 'index']);
    Route::get('/{id}', [ProfessorController::class, 'show']);
    Route::post('/', [ProfessorController::class, 'store']);
    Route::put('/{id}', [ProfessorController::class, 'update']);
    Route::delete('/{id}', [ProfessorController::class, 'destroy']);
});    

// Articles
Route::prefix('articles')->group(function () {
    Route::get('/show', [ArticleController::class, 'index']);
    Route::get('/show/{id}', [ArticleController::class, 'show']);

    Route::middleware('auth:sanctum')->group(function (){
        Route::post('/create', [ArticleController::class, 'store']);
        Route::put('/update/{id}', [ArticleController::class, 'update']);
        Route::delete('/delete/{id}', [ArticleController::class, 'destroy']);
    });
});

// Overall
Route::get('/store', [StoreController::class, 'index']);