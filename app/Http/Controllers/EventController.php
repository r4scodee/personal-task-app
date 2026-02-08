<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EventController extends Controller
{
    public function index()
    {
        return Inertia::render('Events/Index', [
            'events' => auth()->user()->events()->orderBy('start_date', 'asc')->get()
        ]);
    }

    public function store(Request $request)
    {
        $attr = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'start_date' => 'required|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'color' => 'required|string',
        ]);

        auth()->user()->events()->create($attr);

        return back()->with('success', 'Agenda berhasil dijadwalkan!');
    }

    public function update(Request $request, Event $event)
    {
        if ($event->user_id !== auth()->id()) abort(403);

        $attr = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'start_date' => 'required|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'color' => 'required|string',
        ]);

        $event->update($attr);
        return back();
    }

    public function destroy(Event $event)
    {
        if ($event->user_id !== auth()->id()) abort(403);
        $event->delete();
        return back();
    }
}