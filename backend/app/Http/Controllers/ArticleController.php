<?php

namespace App\Http\Controllers;

use App\Models\Article;
use Illuminate\Http\Request;

class ArticleController extends Controller
{
    
    public function index()
    {
        $articles = Article::with(['category', 'author'])->get();
        return response()->json($articles);
    }

   
    public function show($id)
    {
        
        $article = Article::with(['category', 'author'])->findOrFail($id);
        $article->increment('views');
        return response()->json($article);
    }

    
    public function store(Request $request)
    {
        if ($this->isAuthenticated() !== null)
        return $this->isAuthenticated();
        try{
        $request->validate([
            'title'        => 'required|string|max:255',
            'category_id'  => 'required|exists:categories,id',
            'author_id'    => 'required|exists:users,id',
            'reading_time' => 'nullable|integer',
            'tags'         => 'nullable|string',
            'image'        => 'required|image|mimes:jpg,jpeg,png|max:2048',
            'description'  => 'required|string',
        ]);

        
        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('articles', 'public');
        }

        $article = Article::create([
            'title'        => $request->title,
            'category_id'  => $request->category_id,
            'author_id'    => $request->author_id,
            'reading_time' => $request->reading_time,
            'tags'         => $request->tags,
            'image'        => $imagePath,
            'description'  => $request->description,
        ]);

        return response()->json($article, 201);

        } catch (\Exception $e) {
    return response()->json([
        'message' => 'Something went wrong',
        'error' => $e->getMessage()
    ], 500);
}
    }

   
    public function update(Request $request, $id)
    {
        if ($this->isAuthenticated() !== null)
        return $this->isAuthenticated();
        $article = Article::findOrFail($id);

        $request->validate([
            'title'        => 'sometimes|string|max:255',
            'category_id'  => 'sometimes|exists:categories,id',
            'author_id'    => 'sometimes|exists:users,id',
            'reading_time' => 'nullable|integer',
            'tags'         => 'nullable|string',
            'image'        => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
            'description'  => 'sometimes|string',
        ]);

        if ($request->hasFile('image')) {
            $article->image = $request->file('image')->store('articles', 'public');
        }

        $article->update($request->except('image'));

        return response()->json($article);
    }

    public function destroy($id)
    {
        if ($this->isAuthenticated() !== null)
        return $this->isAuthenticated();
        $article = Article::findOrFail($id);
        $article->delete();

        return response()->json(['message' => 'Article deleted successfully']);
    }

    public function isAuthenticated(){
    $user = auth()->user();

    if (!$user || !in_array($user->role, ['admin', 'supervisor'])) 
        return response()->json(['message' => 'Unauthorized: Only admin or supervisor allowed'], 403);
        return null;
    }
}