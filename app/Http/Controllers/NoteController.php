<?php

namespace App\Http\Controllers;

use App\Models\Note;
use Illuminate\Http\Request;

class NoteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return inertia('Notes/Index', [
            'notes' => auth()->user()->notes()->latest()->get()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $attr = $request->validate([
            'title' => 'required|max:255',
            'content' => 'nullable',
        ]);

        auth()->user()->notes()->create($attr);

        return back()->with('success', 'Catatan berhasil dibuat!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Note $note)
    {
        if ($note->user_id !== auth()->id()) {
            abort(403);
        }

        return inertia('Notes/Show', [
            'note' => $note
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Note $note)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Note $note)
    {
        $attr = $request->validate([
            'title' => 'required|max:255',
            'content' => 'nullable',
        ]);

        $note->update($attr);

        return back()->with('success', 'Catatan diperbarui!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Note $note)
    {
        $note->delete();
        return redirect()->route('notes.index')->with('success', 'Catatan dihapus.');
    }
}
