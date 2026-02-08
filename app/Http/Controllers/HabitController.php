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

        $today = Carbon::today();
        $yesterday = Carbon::yesterday();
        $lastCompleted = $habit->last_completed_at ? Carbon::parse($habit->last_completed_at) : null;

        if ($lastCompleted && $lastCompleted->isToday()) {
            return back()->with('error', 'Hari ini sudah beres, bro!');
        }

        if ($lastCompleted && $lastCompleted->isSameDay($yesterday)) {
            $habit->streak += 1;
        } else {
            $habit->streak = 1;
        }

        $habit->last_completed_at = $today;
        $habit->save();

        return back()->with('success', 'Mantap! Streak lanjut!');
    }

    public function destroy(Habit $habit)
    {
        if ($habit->user_id !== auth()->id()) abort(403);
        $habit->delete();
        return back();
    }
}