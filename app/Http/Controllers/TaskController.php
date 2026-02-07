<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    // Simpan Task Baru
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'folder_id' => 'required|exists:folders,id',
        ]);

        Task::create([
            'title' => $request->title,
            'folder_id' => $request->folder_id,
        ]);

        return back();
    }

    public function update(Request $request, Task $task)
    {
        if ($request->has('title')) {
            $request->validate([
                'title' => 'required|string|max:255',
            ]);
            $task->update(['title' => $request->title]);
        } 
        else {
            $task->update([
                'is_completed' => !$task->is_completed
            ]);
        }

        return back();
    }

    // Hapus Task
    public function destroy(Task $task)
    {
        $task->delete();
        return back();
    }
}