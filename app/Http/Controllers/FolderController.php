<?php

namespace App\Http\Controllers;

use App\Models\Folder;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect; 

class FolderController extends Controller
{
    public function index()
    {
        $folders = Folder::where('user_id', auth()->id())
            ->withCount('tasks')
            ->get();

        return Inertia::render('Folders/Index', [
            'folders' => $folders
        ]);
    }

    public function show(Folder $folder)
    {
        // Keamanan: Pastikan user cuma bisa buka folder miliknya sendiri
        if ($folder->user_id !== auth()->id()) {
            abort(403);
        }

        return Inertia::render('Folders/Show', [
            'folder' => $folder->load('tasks') // Load tugas-tugas di dalamnya
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        // Simpan data
        $request->user()->folders()->create([
            'name' => $request->name,
            'color' => '#4f46e5', 
        ]);

        return Redirect::route('folders.index')->with('message', 'Folder created successfully!');
    }

    public function update(Request $request, Folder $folder)
    {
        $request->validate(['name' => 'required|string|max:255']);
        $folder->update(['name' => $request->name]);
        return back();
    }

    public function destroy(Folder $folder)
    {
        if ($folder->user_id !== auth()->id()) {
            abort(403);
        }

        $folder->delete();

        return back()->with('message', 'Folder deleted successfully');
    }
}