<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreMaternalCareRequest;
use App\Services\MaternalCareService;
use App\Models\MaternalRecord;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;
use Barryvdh\DomPDF\Facade\Pdf;

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

    /**
     * Generate PDF for a specific maternal care record
     */
    public function generatePdf($id)
    {
        try {
            // Fetch the maternal record with all relationships
            $record = MaternalRecord::with([
                'prenatalVisits',
                'nutritionalAssessment',
                'immunizationRecord',
                'prenatalSupplementations',
                'micronutrientSupplementations',
                'highRiskSupplementations',
                'laboratoryScreening',
                'pregnancyOutcome',
                'deliveryInformation',
                'postnatalCare',
                'postpartumSupplementations'
            ])->findOrFail($id);

            // Load the PDF view with data
            $pdf = Pdf::loadView('pdf.maternal-care', compact('record'))
                ->setPaper('legal', 'landscape')
                ->setOptions([
                    'isHtml5ParserEnabled' => true,
                    'isRemoteEnabled' => true,
                    'defaultFont' => 'sans-serif'
                ]);

            // Generate filename
            $filename = 'Maternal_Care_Record_' . $record->family_serial . '_' . date('Y-m-d') . '.pdf';

            // Return the PDF for download
            return $pdf->download($filename);

        } catch (\Exception $e) {
            Log::error('Failed to generate PDF', [
                'error' => $e->getMessage(),
                'record_id' => $id,
                'trace' => $e->getTraceAsString()
            ]);

            return redirect()
                ->back()
                ->withErrors(['error' => 'Failed to generate PDF. Please try again.']);
        }
    }

    /**
     * Generate bulk PDF for multiple maternal care records (50 per page)
     */
    public function generateBulkPdf()
    {
        try {
            // Get all records, ordered by date
            $records = MaternalRecord::with([
                'prenatalVisits',
                'nutritionalAssessment',
                'immunizationRecord',
                'prenatalSupplementations',
                'micronutrientSupplementations',
                'highRiskSupplementations',
                'laboratoryScreening',
                'pregnancyOutcome',
                'deliveryInformation',
                'postnatalCare',
                'postpartumSupplementations'
            ])
            ->orderBy('date_of_registration', 'desc')
            ->get();

            // Generate single PDF with all records (50 per page)
            $pdf = Pdf::loadView('pdf.maternal-care-bulk', compact('records'))
                ->setPaper('legal', 'landscape')
                ->setOptions([
                    'isHtml5ParserEnabled' => true,
                    'isRemoteEnabled' => true,
                    'defaultFont' => 'sans-serif'
                ]);

            $filename = 'ANC_Target_Client_List_' . date('Y-m-d') . '.pdf';
            return $pdf->download($filename);

        } catch (\Exception $e) {
            Log::error('Failed to generate bulk PDF', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            return redirect()
                ->back()
                ->withErrors(['error' => 'Failed to generate bulk PDF. Please try again.']);
        }
    }
}
