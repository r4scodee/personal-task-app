<?php

namespace App\Http\Controllers;

use App\Models\Habit;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Inertia\Inertia;

class HabitController extends Controller
{
    public function index()
    {
        return Inertia::render('Habits/Index', [
            'habits' => auth()->user()->habits()->latest()->get()
        ]);
    }

    public function store(Request $request)
    {
        $attr = $request->validate([
            'name' => 'required|string|max:255',
            'icon' => 'nullable|string',
        ]);

        auth()->user()->habits()->create($attr);

        return back()->with('success', 'Habit baru ditambahkan!');
    }

    public function complete(Habit $habit)
    {
        if ($habit->user_id !== auth()->id()) abort(403);

        $today = now()->startOfDay();
        $lastCompleted = $habit->last_completed_at ? \Carbon\Carbon::parse($habit->last_completed_at)->startOfDay() : null;

        if ($lastCompleted && $lastCompleted->equalTo($today)) {
            return back()->with('error', 'Hari ini sudah beres!');
        }

        $yesterday = now()->subDay()->startOfDay();
        if ($lastCompleted && $lastCompleted->equalTo($yesterday)) {
            $habit->streak += 1;
        } else {
            $habit->streak = 1;
        }

        $habit->last_completed_at = now();
        $habit->save();

        return back();
    }

    public function destroy(Habit $habit)
    {
        if ($habit->user_id !== auth()->id()) abort(403);
        $habit->delete();
        return back();
    }
}