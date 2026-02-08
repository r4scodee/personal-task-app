<?php

namespace App\Http\Controllers;

use App\Models\Budget;
use App\Models\Folder;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BudgetController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        
        $budgets = Budget::where('user_id', $user->id)
            ->with('folder:id,name')
            ->latest()
            ->get();

        $totalIncome = $budgets->where('type', 'income')->sum('amount');
        $totalExpense = $budgets->where('type', 'expense')->sum('amount');
        $balance = $totalIncome - $totalExpense;

        return Inertia::render('Budgets/Index', [
            'budgets' => $budgets,
            'folders' => Folder::where('user_id', $user->id)->get(['id', 'name']),
            'stats' => [
                'total_income' => $totalIncome,
                'total_expense' => $totalExpense,
                'balance' => $balance
            ]
        ]);
    }

    public function store(Request $request)
    {
        $attr = $request->validate([
            'target_name' => 'required|string|max:255',
            'amount' => 'required|numeric|min:0',
            'type' => 'required|in:income,expense', 
            'folder_id' => 'nullable|exists:folders,id',
            'category' => 'nullable|string',
            'description' => 'nullable|string',
        ]);

        if (!$request->filled('description')) {
            $attr['description'] = $request->target_name;
        }

        auth()->user()->budgets()->create($attr);

        return back()->with('success', 'Catatan tabungan berhasil disimpan!');
    }

    public function update(Request $request, Budget $budget)
    {
        if ($budget->user_id !== auth()->id()) abort(403);

        $attr = $request->validate([
            'target_name' => 'required|string|max:255',
            'amount' => 'required|numeric|min:0',
            'type' => 'required|in:income,expense',
            'folder_id' => 'nullable|exists:folders,id',
            'category' => 'nullable|string',
            'description' => 'nullable|string',
        ]);

        if (!$request->filled('description')) {
            $attr['description'] = $request->target_name;
        }

        $budget->update($attr);

        return back()->with('success', 'Data tabungan berhasil diperbarui!');
    }

    public function destroy(Budget $budget)
    {
        if ($budget->user_id !== auth()->id()) abort(403);
        $budget->delete();
        return back()->with('success', 'Data tabungan berhasil dihapus!');
    }

    public function show(Budget $budget)
    {
        if ($budget->user_id !== auth()->id()) abort(403);
        return Inertia::render('Budgets/Show', [
            'budget' => $budget->load('folder')
        ]);
    }
}