<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Folder;
use App\Models\Task;
use App\Models\Budget;
use App\Models\Habit;
use App\Models\Event;

class DashboardController extends Controller
{
    public function index()
    {
        $user = auth()->user();

        // 1. Statistik Tugas & Folder
        $totalFolders = $user->folders()->count();
        $totalTasks = $user->tasks()->count();
        $completedTasks = $user->tasks()->where('is_completed', true)->count();

        // 2. Statistik Budget (Income vs Expense)
        $budgets = $user->budgets;
        $totalIncome = $budgets->where('type', 'income')->sum('amount');
        $totalExpense = $budgets->where('type', 'expense')->sum('amount');

        // 3. Data List Terkini
        $recentFolders = $user->folders()
            ->withCount('tasks')
            ->latest()
            ->take(3)
            ->get();

        // 4. Habit dengan Streak Tertinggi
        $topHabit = $user->habits()
            ->orderBy('streak', 'desc')
            ->first();

        // 5. Agenda Terdekat (Event)
        $nextEvent = $user->events()
            ->where('start_date', '>=', now())
            ->orderBy('start_date', 'asc')
            ->first();

        return Inertia::render('Dashboard', [
            'stats' => [
                'total_folders' => $totalFolders,
                'total_tasks'   => $totalTasks,
                'completed'     => $completedTasks,
            ],
            'budget_stats' => [
                'total_income'  => $totalIncome,
                'total_expense' => $totalExpense,
                'balance'       => $totalIncome - $totalExpense
            ],
            'recent_folders' => $recentFolders,
            'top_habit'      => $topHabit,
            'next_event'     => $nextEvent,
        ]);
    }
}