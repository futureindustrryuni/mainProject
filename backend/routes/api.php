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



Route::get('/user', function (Request $request) {
    return $request->user();}) ->middleware('auth:sanctum');

Route::get('/user/{id}', [UserPanelController::class, 'show']);
Route::post('/users/store',[UserController::class,'store']);
Route::post('user/checkmail', [UserController::class, 'checkEmail']);    
Route::get('/store', [StoreController::class, 'index']);

Route::middleware(['auth:sanctum'])->group(function () {
Route::get('/me/profile', [UserPanelController::class, 'showProfile']);
Route::get('/me/projects', [UserPanelController::class, 'myProjects']);             # Its For Phase 2 Right Now And Its Not Working Corrently
Route::post('/developer/profile', [DevController::class, 'store']);
});

Route::prefix('products')->group(function () {
Route::post('/create', [ProductController::class, 'store']);
Route::get('/{id}',[ProductController::class, 'show']);
Route::post('/{id}/approve',[ApproveController::class,'approve']);
Route::middleware('auth:sanctum')->post('/{id}/like', [ProductLikesController::class, 'toggleLike']);
Route::get('/', [ProductController::class, 'index']);
});

#Authentication API's
Route::prefix('auth')->group(function () {
    Route::post('login',[AuthController::class,'login']);
    Route::post('register',[AuthController::class,'register']);
    Route::middleware('auth:sanctum')->post('logout',[AuthController::class,'logout']);
});

# Admin API's
Route::post('/admin/login', [adminController::class, 'login']);
Route::post('/admin/register', [adminController::class, 'register']);

Route::middleware('auth:admin')->prefix('admin')->group(function () {
    Route::get('/profile', [adminController::class, 'profile']);
    Route::put('/updateprofile', [adminController::class, 'updateProfile']);
    Route::get('/users', [adminController::class, 'showUsers']);
    Route::get('/users/{id}', [adminController::class, 'searchUser']);
    Route::delete('/users/{id}', [adminController::class, 'destroy']);
    Route::get('/products', [adminController::class, 'showProduct']);
    Route::get('/products/{id}', [adminController::class, 'searchProduct']);
    Route::post('/checkmail', [adminController::class, 'checkEmail']);
});

#Ticket API's
Route::prefix('tickets')->group(function () {
    Route::post('/create', [TicketController::class, 'store']);
    Route::get('/{id}', [TicketController::class, 'show']);
    Route::middleware('auth:admin')->get('/', [TicketController::class, 'index']);
    Route::middleware('auth:admin')->delete('/{id}', [TicketController::class, 'destroy']);
    Route::middleware('auth:admin')->put('/approve/{id}', [TicketController::class, 'approve']);
});

Route::middleware('auth:sanctum')->prefix('indexes')->group(function () {
    Route::get('saves', [SavedProductController::class, 'index']);
    Route::post('save', [SavedProductController::class, 'store']);
    Route::delete('delete/{projectId}', [SavedProductController::class, 'destroy']);
});






