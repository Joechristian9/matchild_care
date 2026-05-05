<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\MaternalCareController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    $stats = [
        'total_records' => \App\Models\MaternalRecord::count(),
        'active_pregnancies' => \App\Models\MaternalRecord::whereNull('deleted_at')
            ->whereDoesntHave('pregnancyOutcome')
            ->count(),
        'completed_4pnc' => \App\Models\PostnatalCare::where('completed_4pnc', true)->count(),
        'pending_visits' => \App\Models\MaternalRecord::whereNull('deleted_at')
            ->whereHas('prenatalVisits', function($query) {
                $query->whereNull('visit_date');
            })
            ->count(),
        'recent_registrations' => \App\Models\MaternalRecord::latest()
            ->take(5)
            ->get(['id', 'first_name', 'last_name', 'date_of_registration', 'age', 'age_group']),
        'this_month' => \App\Models\MaternalRecord::whereMonth('date_of_registration', now()->month)
            ->whereYear('date_of_registration', now()->year)
            ->count(),
    ];
    
    return Inertia::render('Dashboard', ['stats' => $stats]);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    
    // Parent Services Routes
    Route::prefix('parent')->name('parent.')->group(function () {
        Route::get('/maternal-care', [MaternalCareController::class, 'index'])->name('maternal-care');
        Route::post('/maternal-care', [MaternalCareController::class, 'store'])->name('maternal-care.store');
    });
});

require __DIR__.'/auth.php';
