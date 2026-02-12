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

        $totalFolders = $user->folders()->count();

        $folderIds = $user->folders()->pluck('id');

        $totalTasks = Task::whereIn('folder_id', $folderIds)->count();
        $completedTasks = Task::whereIn('folder_id', $folderIds)
            ->where('is_completed', true)
            ->count();

        $totalIncome = $user->budgets()->where('type', 'income')->sum('amount');
        $totalExpense = $user->budgets()->where('type', 'expense')->sum('amount');

        $recentFolders = $user->folders()
            ->withCount('tasks')
            ->latest()
            ->take(3)
            ->get();

        $topHabit = $user->habits()
            ->orderBy('streak', 'desc')
            ->first();

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
                'total_income'  => (float) $totalIncome,
                'total_expense' => (float) $totalExpense,
                'balance'       => (float) ($totalIncome - $totalExpense)
            ],
            'recent_folders' => $recentFolders,
            'top_habit'      => $topHabit,
            'next_event'     => $nextEvent,
        ]);
    }
}