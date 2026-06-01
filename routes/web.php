<?php

use App\Http\Controllers\ChildImmunizationController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\MaternalCareController;
use App\Http\Controllers\PatientController;
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
    // Optimize queries with select() to fetch only needed columns
    // Check user role and redirect accordingly
    if (auth()->user()->hasRole('patient')) {
        return redirect()->route('patient.dashboard');
    }

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
        // Optimize: Only select needed columns for recent registrations
        'recent_registrations' => \App\Models\MaternalRecord::select([
                'id', 'first_name', 'last_name', 'date_of_registration', 'age', 'age_group'
            ])
            ->orderBy('date_of_registration', 'desc')
            ->take(5)
            ->get(),
        'this_month' => \App\Models\MaternalRecord::whereMonth('date_of_registration', now()->month)
            ->whereYear('date_of_registration', now()->year)
            ->count(),
    ];

    // Optimize: Only select needed columns for records table and paginate
    $records = \App\Models\MaternalRecord::select([
            'id', 'family_serial', 'first_name', 'last_name', 'middle_initial',
            'age', 'age_group', 'date_of_registration', 'expected_date_of_delivery'
        ])
        ->orderBy('id', 'desc')  // Order by ID descending (latest first)
        ->paginate(15);

    return Inertia::render('Dashboard', [
        'stats' => $stats,
        'records' => $records
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Patient Routes
    Route::prefix('patient')->name('patient.')->group(function () {
        Route::get('/dashboard', [PatientController::class, 'dashboard'])->name('dashboard');
        Route::get('/my-records', [PatientController::class, 'myRecords'])->name('my-records');
        Route::get('/notifications', [PatientController::class, 'notifications'])->name('notifications');
    });

    // Parent Services Routes
    Route::prefix('parent')->name('parent.')->group(function () {
        Route::get('/maternal-care', [MaternalCareController::class, 'index'])->name('maternal-care');
        Route::post('/maternal-care', [MaternalCareController::class, 'store'])->name('maternal-care.store');
        Route::get('/maternal-care/{id}/edit', [MaternalCareController::class, 'edit'])->name('maternal-care.edit');
        Route::put('/maternal-care/{id}', [MaternalCareController::class, 'update'])->name('maternal-care.update');
        // Bulk PDF route
        Route::get('/maternal-care/bulk-pdf', [MaternalCareController::class, 'generateBulkPdf'])->name('maternal-care.bulk-pdf');
    });
    Route::prefix('child')->name('child.')->group(function () {
        // Child Immunization Routes
        Route::get('/immunization/bulk-pdf', [ChildImmunizationController::class, 'generateBulkPdf'])->name('immunization.bulk-pdf');
        Route::resource('/immunization', ChildImmunizationController::class);
    });

});

require __DIR__.'/auth.php';
