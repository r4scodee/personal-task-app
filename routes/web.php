<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\FolderController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\NoteController;
use App\Http\Controllers\BudgetController;
use App\Http\Controllers\HabitController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\DashboardController;

// WELCOME PAGE
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// Route Middleware
Route::middleware(['auth', 'verified'])->group(function () {
    
    // DASHBOARD
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    // MODUL FOLDER & TUGAS
    Route::get('/folders', [FolderController::class, 'index'])->name('folders.index');
    Route::post('/folders', [FolderController::class, 'store'])->name('folders.store');
    Route::get('/folders/{folder}', [FolderController::class, 'show'])->name('folders.show');
    Route::patch('/folders/{folder}', [FolderController::class, 'update'])->name('folders.update');
    Route::delete('/folders/{folder}', [FolderController::class, 'destroy'])->name('folders.destroy');

    Route::post('/tasks', [TaskController::class, 'store'])->name('tasks.store');
    Route::patch('/tasks/{task}', [TaskController::class, 'update'])->name('tasks.update'); 
    Route::delete('/tasks/{task}', [TaskController::class, 'destroy'])->name('tasks.destroy');
    
    // MODUL CATATAN (Notes)
    Route::get('/notes', [NoteController::class, 'index'])->name('notes.index');
    Route::get('/notes/{note}', [NoteController::class, 'show'])->name('notes.show');
    Route::post('/notes', [NoteController::class, 'store'])->name('notes.store');
    Route::post('/notes/update/{note}', [NoteController::class, 'update'])->name('notes.update');
    Route::delete('/notes/{note}', [NoteController::class, 'destroy'])->name('notes.destroy');

    // MODUL Tabungan (Budgets)
    Route::get('/budgets', [BudgetController::class, 'index'])->name('budgets.index');
    Route::get('/budgets/{budget}', [BudgetController::class, 'show'])->name('budgets.show');
    Route::post('/budgets', [BudgetController::class, 'store'])->name('budgets.store');
    Route::patch('/budgets/update/{budget}', [BudgetController::class, 'update'])->name('budgets.update');
    Route::delete('/budgets/{budget}', [BudgetController::class, 'destroy'])->name('budgets.destroy');

    // MODUL KEBIASAAN (Habits)
    Route::get('/habits', [HabitController::class, 'index'])->name('habits.index');
    Route::post('/habits/store', [HabitController::class, 'store'])->name('habits.store');
    Route::post('/habits/{habit}/complete', [HabitController::class, 'complete'])->name('habits.complete');
    Route::delete('/habits/{habit}', [HabitController::class, 'destroy'])->name('habits.destroy');      

    // MODUL JADWAL (Events)
    Route::get('/events', [EventController::class, 'index'])->name('events.index');
    Route::post('/events/store', [EventController::class, 'store'])->name('events.store');
    Route::post('/events/update/{event}', [EventController::class, 'update'])->name('events.update');
    Route::post('/events/delete/{event}', [EventController::class, 'destroy'])->name('events.destroy');
});

// MODUL PROFILE
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::post('/profile/photo/destroy', [ProfileController::class, 'destroyPhoto'])->name('profile.photo.destroy');
});

require __DIR__.'/auth.php';