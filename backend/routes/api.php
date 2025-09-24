<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserPanelController;
use App\Http\Controllers\DeveloperPublicController;
use App\Http\Controllers\DevController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\StoreController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\adminController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ApproveController;
use App\Http\Controllers\TicketController;
use App\Http\Controllers\SavedProductController;
use App\Http\Controllers\ProductLikesController;
use App\Http\Controllers\ProductImageController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProfessorController;
use App\Http\Controllers\ArticleController;
use App\Http\Controllers\SkillController;
use App\Http\Controllers\OwnerController;


Route::get('/user', function (Request $request) {
    return $request->user();}) ->middleware('auth:sanctum');


Route::post('user/checkmail', [UserController::class, 'checkEmail']);    
Route::get('/store', [StoreController::class, 'index']);

Route::middleware(['auth:sanctum'])->group(function () {
Route::post('/users/store',[UserController::class,'store']);

Route::get('/me/profile', [UserPanelController::class, 'showProfile']);
Route::get('/me/projects', [UserPanelController::class, 'myProjects']);             # Its For Phase 2 Right Now And Its Not Working Corrently
Route::post('/developers/{id}/approve', [AdminDeveloperController::class, 'approve']);
});

Route::prefix('products')->group(function () {
Route::middleware('auth:sanctum')->post('/create', [ProductController::class, 'store']);
Route::get('/{id}',[ProductController::class, 'show']);
Route::post('/{id}/approve',[ApproveController::class,'approve']);
Route::middleware('auth:sanctum')->post('/{id}/like', [ProductLikesController::class, 'toggleLike']);
Route::middleware('auth:sanctum')->put('/{id}/update', [ProductController::class, 'updateProduct']);
Route::middleware('auth:sanctum')->delete('/{id}/delete', [ProductController::class, 'deleteProduct']);
Route::get('/', [ProductController::class, 'index']);
});

#Developer API's
Route::middleware('auth:sanctum')->post('/developer/profile', [DevController::class, 'store']);
Route::middleware('auth:sanctum')->get('/developer/status', [DevController::class, 'status']);
Route::middleware('auth:sanctum')->post('/developer/approve/{id}', [DevController::class, 'approve']);
Route::middleware('auth:admin')->post('/developer/reject/{id}', [DevController::class, 'reject']);
Route::middleware('auth:sanctum')->get('/developer/requests', [DevController::class, 'show']);
Route::get('/developer/{id}', [UserPanelController::class, 'show']);


#Authentication API's
Route::prefix('auth')->group(function () {
    Route::post('login',[AuthController::class,'login']);
    Route::post('register',[AuthController::class,'register']);
    Route::middleware('auth:sanctum')->post('logout',[AuthController::class,'logout']);
});

# Admin API's
Route::post('/admin/login', [adminController::class, 'login']);
Route::post('/admin/register', [adminController::class, 'register']);

Route::middleware('auth:sanctum')->prefix('admin')->group(function () {
    Route::get('/profile', [adminController::class, 'profile']);
    Route::get('/profiles', [adminController::class, 'allProfiles']);
    Route::put('/updateprofile', [adminController::class, 'updateProfile']);
    Route::get('/users', [adminController::class, 'showUsers']);
    Route::get('/users/{id}', [adminController::class, 'searchUser']);
    Route::delete('/users/{id}', [adminController::class, 'destroyUser']);
    Route::get('/products', [adminController::class, 'showProduct']);
    Route::get('/products/{id}', [adminController::class, 'searchProduct']);
    Route::post('/checkmail', [adminController::class, 'checkEmail']);
});

#Ticket API's
Route::prefix('tickets')->group(function () {
    Route::middleware('auth:sanctum')->get('/show', [TicketController::class, 'show']);
    Route::middleware('auth:sanctum')->post('/create', [TicketController::class, 'store']);
    Route::middleware('auth:sanctum')->get('/', [TicketController::class, 'index']);
    Route::middleware('auth:sanctum')->delete('/{id}', [TicketController::class, 'destroy']);
    Route::middleware('auth:sanctum')->put('/approve/{id}', [TicketController::class, 'approve']);
});

Route::middleware('auth:sanctum')->prefix('indexes')->group(function () {
    Route::get('saves', [SavedProductController::class, 'index']);
    Route::post('save', [SavedProductController::class, 'store']);
    Route::delete('delete/{projectId}', [SavedProductController::class, 'destroy']);
});

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/skills', [SkillController::class, 'index']);
    Route::post('/skill/create', [SkillController::class, 'store']); 
    Route::delete('/skills/{id}', [SkillController::class, 'destroy']);
});


//Products
Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/{id}', [ProductController::class, 'show']);
Route::post('/products', [ProductController::class, 'store']);
Route::put('/products/{id}', [ProductController::class, 'update']);
Route::delete('/products/{id}', [ProductController::class, 'destroy']);
Route::post('/products/{id}/approve', [ProductController::class, 'approve']);
Route::get('/store', [StoreController::class, 'index']);


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
Route::middleware('auth:sanctum')->prefix('categories')->group(function () {
Route::get('/show', [CategoryController::class, 'index']);
Route::get('/show/{id}', [CategoryController::class, 'show']);
Route::post('/create', [CategoryController::class, 'store']);
Route::put('/update/{id}', [CategoryController::class, 'update']);
Route::delete('/delete/{id}', [CategoryController::class, 'destroy']);
});

// Professors
Route::get('/professors', [ProfessorController::class, 'index']);
Route::get('/professors/{id}', [ProfessorController::class, 'show']);
Route::post('/professors', [ProfessorController::class, 'store']);
Route::put('/professors/{id}', [ProfessorController::class, 'update']);
Route::delete('/professors/{id}', [ProfessorController::class, 'destroy']);

// Articles
Route::get('/articles', [ArticleController::class, 'index']);
Route::get('/articles/{id}', [ArticleController::class, 'show']);
Route::post('/articles', [ArticleController::class, 'store']);
Route::put('/articles/{id}', [ArticleController::class, 'update']);
Route::delete('/articles/{id}', [ArticleController::class, 'destroy']);

//Owner
Route::get('/showusers', [OwnerController::class, 'showUsers']);
Route::middleware('auth:sanctum')->post('/users/{id}/updaterole', [OwnerController::class, 'updateRole']);
Route::middleware('auth:sanctum')->delete('/users/{id}/delete', [OwnerController::class, 'destroyUser']);

