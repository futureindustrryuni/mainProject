<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Skill;

class SkillController extends Controller
{
    public function store(Request $request)
    {
    $validated = $request->validate([
            'skill' => 'required|string|max:255',
            'percentage' => 'required|integer|min:0|max:100',
        ]);

    $user = auth()->user();
    if (!$user) {
        return response()->json(['message' => 'User not authenticated'], 401);
    }

    $skill = $user->skills()->create($validated);

    return response()->json([
            'message' => 'Skill added successfully',
            'data' => $skill
        ]);
    }

    public function index()
    {
        $user = auth()->user();
        if (!$user) {
            return response()->json(['message' => 'User not authenticated'], 401);
        }

        return response()->json([
            'message' => 'All Skills Information',
            'skills' => $user->skills
        ]);
    }

    public function destroy($id)
    {
        $user = auth()->user();
        if (!$user) {
            return response()->json(['message' => 'User not authenticated'], 401);
        }

        $skill = $user->skills()->findOrFail($id);
        $skill->delete();
        return response()->json(['message' => 'Skill deleted successfully']);
    }
}
