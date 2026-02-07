<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Models\Folder;
use App\Models\Task;
use Inertia\Inertia;
use App\Http\Controllers\FolderController;
use App\Http\Controllers\TaskController;

// Route Folder Controller
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/folders', [FolderController::class, 'index'])->name('folders.index');
    Route::post('/folders', [FolderController::class, 'store'])->name('folders.store');
    Route::get('/folders/{folder}', [FolderController::class, 'show'])->name('folders.show');
    Route::patch('/folders/{folder}', [FolderController::class, 'update'])->name('folders.update');
    Route::delete('/folders/{folder}', [FolderController::class, 'destroy'])->name('folders.destroy');

    Route::post('/tasks', [TaskController::class, 'store'])->name('tasks.store');
    Route::patch('/tasks/{task}', [TaskController::class, 'update'])->name('tasks.update'); 
    Route::delete('/tasks/{task}', [TaskController::class, 'destroy'])->name('tasks.destroy');
    // Tambahkan route crud lainnya nanti di sini
});

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    $userId = auth()->id();
    
    return Inertia::render('Dashboard', [
        'stats' => [
            'total_folders' => Folder::where('user_id', $userId)->count(),
            'total_tasks'   => Task::whereHas('folder', fn($q) => $q->where('user_id', $userId))->count(),
            'completed'     => Task::whereHas('folder', fn($q) => $q->where('user_id', $userId))->where('is_completed', true)->count(),
        ],
        'recent_folders' => Folder::where('user_id', $userId)->latest()->take(3)->withCount('tasks')->get(),
    ]);
    
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
