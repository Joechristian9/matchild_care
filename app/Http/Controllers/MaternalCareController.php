<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreMaternalCareRequest;
use App\Services\MaternalCareService;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;

class MaternalCareController extends Controller
{
    protected $maternalCareService;

    public function __construct(MaternalCareService $maternalCareService)
    {
        $this->maternalCareService = $maternalCareService;
    }

    /**
     * Display the maternal care registration form
     */
    public function index()
    {
        return Inertia::render('Parent/MaternalCare');
    }

    /**
     * Store a new maternal care record
     */
    public function store(StoreMaternalCareRequest $request)
    {
        try {
            $maternalRecord = $this->maternalCareService->createMaternalRecord(
                $request->validated(),
                auth()->id()
            );

            return redirect()
                ->route('parent.maternal-care')
                ->with('success', 'Maternal care record created successfully.');

        } catch (\Exception $e) {
            Log::error('Failed to create maternal care record', [
                'error' => $e->getMessage(),
                'user_id' => auth()->id(),
                'trace' => $e->getTraceAsString()
            ]);

            return redirect()
                ->back()
                ->withInput()
                ->withErrors(['error' => 'Failed to save maternal care record. Please try again.']);
        }
    }
}
