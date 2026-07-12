<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreMaternalCareRequest;
use App\Services\MaternalCareService;
use App\Models\MaternalRecord;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\Request;
use Barryvdh\DomPDF\Facade\Pdf;

class MaternalCareController extends Controller
{
    protected $maternalCareService;

    public function __construct(MaternalCareService $maternalCareService)
    {
        $this->maternalCareService = $maternalCareService;
    }

    /**
     * Display the maternal care records list
     */
    public function index(Request $request)
    {
        $query = MaternalRecord::select([
            'id', 'family_serial', 'first_name', 'last_name', 'middle_initial',
            'age', 'age_group', 'date_of_registration', 'expected_date_of_delivery',
        ]);

        // Search
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('last_name', 'like', "%{$search}%")
                  ->orWhere('first_name', 'like', "%{$search}%")
                  ->orWhere('family_serial', 'like', "%{$search}%")
                  ->orWhere('age', 'like', "%{$search}%");
            });
        }

        // Age group filter
        if ($request->filled('age_group') && $request->age_group !== 'all') {
            $query->where('age_group', $request->age_group);
        }

        $records = $query->orderBy('id', 'desc')->paginate(15)->withQueryString();

        return Inertia::render('Parent/MaternalCare', [
            'records'  => $records,
            'filters'  => $request->only(['search', 'age_group']),
        ]);
    }

    /**
     * Display the standalone registration form (Basic Information step)
     */
    public function register()
    {
        return Inertia::render('Parent/MaternalCareRegister');
    }

    /**
     * Show the form for editing the specified maternal care record
     */
    public function edit($id)
    {
        $maternalRecord = MaternalRecord::with([
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

        // Helper function to format dates
        $formatDate = function($date) {
            if (!$date) return null;
            if (is_string($date)) return $date;
            return $date->format('Y-m-d');
        };

        // Transform the data to match the form structure
        $formData = [
            'id' => $maternalRecord->id,
            'date_of_registration' => $formatDate($maternalRecord->date_of_registration),
            'family_serial' => $maternalRecord->family_serial,
            'last_name' => $maternalRecord->last_name,
            'first_name' => $maternalRecord->first_name,
            'middle_initial' => $maternalRecord->middle_initial,
            'address' => $maternalRecord->address,
            'age' => $maternalRecord->age,
            'age_group' => $maternalRecord->age_group,
            
            // Vital signs
            'vital_signs' => [
                'blood_pressure_systolic' => $maternalRecord->blood_pressure_systolic,
                'blood_pressure_diastolic' => $maternalRecord->blood_pressure_diastolic,
                'heart_rate' => $maternalRecord->heart_rate,
                'temperature' => $maternalRecord->temperature,
                'respiratory_rate' => $maternalRecord->respiratory_rate,
                'weight' => $maternalRecord->weight,
                'height' => $maternalRecord->height,
                'bmi' => $maternalRecord->bmi,
                'fetal_heart_tone' => $maternalRecord->fetal_heart_tone,
                'fundal_height' => $maternalRecord->fundal_height,
                'others' => $maternalRecord->vital_signs_others,
            ],
            
            'last_menstrual_period' => $formatDate($maternalRecord->last_menstrual_period),
            'gravida' => $maternalRecord->gravida,
            'parity' => $maternalRecord->parity,
            'expected_date_of_delivery' => $formatDate($maternalRecord->expected_date_of_delivery),

            // Prenatal visits - format for the form component
            'visits' => $maternalRecord->prenatalVisits->pluck('visit_date', 'visit_number')->mapWithKeys(function($date, $visitNumber) use ($formatDate) {
                return ["visit_$visitNumber" => $formatDate($date)];
            })->toArray(),
            
            // Completed visits array
            'completedVisits' => $maternalRecord->prenatalVisits->where('is_completed', true)->pluck('visit_number')->toArray(),
        ];
        
        // Add vital signs for each prenatal visit
        foreach ($maternalRecord->prenatalVisits as $visit) {
            $formData["visit_{$visit->visit_number}_vital_signs"] = [
                'weight' => $visit->weight,
                'height' => $visit->height,
                'blood_pressure_systolic' => $visit->blood_pressure_systolic,
                'blood_pressure_diastolic' => $visit->blood_pressure_diastolic,
                'temperature' => $visit->temperature,
                'heart_rate' => $visit->heart_rate,
                'respiratory_rate' => $visit->respiratory_rate,
                'fetal_heart_tone' => $visit->fetal_heart_tone,
                'fundal_height' => $visit->fundal_height,
                'others' => $visit->others,
            ];
        }
        
        $formData += [
            // Nutritional assessment
            'nutritional_assessment' => $maternalRecord->nutritionalAssessment ? [
                'height' => $maternalRecord->nutritionalAssessment->height,
                'bmi_1st_trimester' => $maternalRecord->nutritionalAssessment->bmi_1st_trimester,
                'weight_1st_trimester' => $maternalRecord->nutritionalAssessment->weight_1st_trimester,
                'weight_2nd_trimester' => $maternalRecord->nutritionalAssessment->weight_2nd_trimester,
                'weight_3rd_trimester' => $maternalRecord->nutritionalAssessment->weight_3rd_trimester,
                'remarks' => $maternalRecord->nutritionalAssessment->remarks,
            ] : null,

            // Immunization record
            'immunization_record' => $maternalRecord->immunizationRecord ? [
                'td1_tt1' => $formatDate($maternalRecord->immunizationRecord->td1_tt1),
                'td2_tt2' => $formatDate($maternalRecord->immunizationRecord->td2_tt2),
                'td3_tt3' => $formatDate($maternalRecord->immunizationRecord->td3_tt3),
                'td4_tt4' => $formatDate($maternalRecord->immunizationRecord->td4_tt4),
                'td5_tt5' => $formatDate($maternalRecord->immunizationRecord->td5_tt5),
                'fully_immunized_status' => $maternalRecord->immunizationRecord->fully_immunized_status,
                'deworming_date' => $formatDate($maternalRecord->immunizationRecord->deworming_date),
            ] : null,

            // Prenatal supplementations
            'prenatal_supplementations' => $maternalRecord->prenatalSupplementations->map(function($supp) use ($formatDate) {
                return [
                    'visit_number' => $supp->visit_number,
                    'supplementation_date' => $formatDate($supp->supplementation_date),
                    'tablets_given' => $supp->tablets_given,
                    'is_completed' => $supp->is_completed,
                    'vital_signs' => [
                        'weight' => $supp->weight,
                        'height' => $supp->height,
                        'blood_pressure_systolic' => $supp->blood_pressure_systolic,
                        'blood_pressure_diastolic' => $supp->blood_pressure_diastolic,
                        'temperature' => $supp->temperature,
                        'heart_rate' => $supp->heart_rate,
                        'respiratory_rate' => $supp->respiratory_rate,
                        'fetal_heart_tone' => $supp->fetal_heart_tone,
                        'fundal_height' => $supp->fundal_height,
                        'others' => $supp->others,
                    ],
                ];
            })->toArray(),

            // Micronutrient supplementations
            'micronutrient_supplementations' => $maternalRecord->micronutrientSupplementations->map(function($supp) use ($formatDate) {
                return [
                    'visit_number' => $supp->visit_number,
                    'supplementation_date' => $formatDate($supp->supplementation_date),
                    'tablets_given' => $supp->tablets_given,
                    'completed_mms_supplementation' => $supp->completed_mms_supplementation,
                ];
            })->toArray(),

            // High risk supplementations
            'high_risk_supplementations' => $maternalRecord->highRiskSupplementations->map(function($supp) use ($formatDate) {
                return [
                    'visit_number' => $supp->visit_number,
                    'supplementation_date' => $formatDate($supp->supplementation_date),
                    'tablets_given' => $supp->tablets_given,
                    'completed_calcium_supplementation' => $supp->completed_calcium_supplementation,
                ];
            })->toArray(),

            // Laboratory screening
            'laboratory_screening' => $maternalRecord->laboratoryScreening ? [
                'completed_hepatitis_b' => $maternalRecord->laboratoryScreening->completed_hepatitis_b,
                'hepatitis_b_date' => $formatDate($maternalRecord->laboratoryScreening->hepatitis_b_date),
                'hepatitis_b_result' => $maternalRecord->laboratoryScreening->hepatitis_b_result,
                'completed_cbc_hgb_hct' => $maternalRecord->laboratoryScreening->completed_cbc_hgb_hct,
                'cbc_hgb_hct_date' => $formatDate($maternalRecord->laboratoryScreening->cbc_hgb_hct_date),
                'cbc_hgb_hct_result' => $maternalRecord->laboratoryScreening->cbc_hgb_hct_result,
                'completed_gestational_diabetes' => $maternalRecord->laboratoryScreening->completed_gestational_diabetes,
                'gestational_diabetes_date' => $formatDate($maternalRecord->laboratoryScreening->gestational_diabetes_date),
                'gestational_diabetes_result' => $maternalRecord->laboratoryScreening->gestational_diabetes_result,
                'completed_syphilis' => $maternalRecord->laboratoryScreening->completed_syphilis,
                'syphilis_date' => $formatDate($maternalRecord->laboratoryScreening->syphilis_date),
                'syphilis_result' => $maternalRecord->laboratoryScreening->syphilis_result,
                'completed_hiv' => $maternalRecord->laboratoryScreening->completed_hiv,
                'hiv_date' => $formatDate($maternalRecord->laboratoryScreening->hiv_date),
                'hiv_result' => $maternalRecord->laboratoryScreening->hiv_result,
            ] : null,

            // Pregnancy outcome
            'pregnancy_outcome' => $maternalRecord->pregnancyOutcome ? [
                'outcome_type' => $maternalRecord->pregnancyOutcome->outcome_type,
                'date_terminated' => $formatDate($maternalRecord->pregnancyOutcome->date_terminated),
                'remarks_action_taken' => $maternalRecord->pregnancyOutcome->remarks_action_taken,
            ] : null,

            // Delivery information
            'delivery_information' => $maternalRecord->deliveryInformation ? [
                'delivery_type' => $maternalRecord->deliveryInformation->delivery_type,
                'birth_weight' => $maternalRecord->deliveryInformation->birth_weight,
                'weight_category' => $maternalRecord->deliveryInformation->weight_category,
                'health_facility_type' => $maternalRecord->deliveryInformation->health_facility_type,
                'health_facility_capable' => $maternalRecord->deliveryInformation->health_facility_capable,
                'non_health_facility' => $maternalRecord->deliveryInformation->non_health_facility,
                'birth_attendant' => $maternalRecord->deliveryInformation->birth_attendant,
                'delivery_date' => $formatDate($maternalRecord->deliveryInformation->delivery_date),
                'delivery_time' => $maternalRecord->deliveryInformation->delivery_time,
            ] : null,

            // Postnatal care
            'postnatal_care' => $maternalRecord->postnatalCare ? [
                'contact_1' => $formatDate($maternalRecord->postnatalCare->contact_1),
                'contact_2' => $formatDate($maternalRecord->postnatalCare->contact_2),
                'contact_3' => $formatDate($maternalRecord->postnatalCare->contact_3),
                'contact_4' => $formatDate($maternalRecord->postnatalCare->contact_4),
                'completed_4pnc' => $maternalRecord->postnatalCare->completed_4pnc,
            ] : null,

            // Postpartum supplementations
            'postpartum_supplementations' => $maternalRecord->postpartumSupplementations->map(function($supp) use ($formatDate) {
                return [
                    'visit_number' => $supp->visit_number,
                    'visit_date' => $formatDate($supp->visit_date),
                    'tablets_given' => $supp->tablets_given,
                    'completed_ifa' => $supp->completed_ifa,
                ];
            })->toArray(),
        ];

        return Inertia::render('Parent/MaternalCareEdit', [
            'record' => $formData,
            'isEdit' => true,
        ]);
    }

    /**
     * Update the specified maternal care record
     */
    public function update(StoreMaternalCareRequest $request, $id)
    {
        try {
            Log::info('Maternal care update submitted', [
                'record_id' => $id,
                'user_id' => auth()->id(),
            ]);

            $maternalRecord = $this->maternalCareService->updateMaternalRecord(
                $id,
                $request->validated(),
                auth()->id()
            );

            Log::info('Maternal care record updated successfully', [
                'record_id' => $maternalRecord->id,
                'family_serial' => $maternalRecord->family_serial,
            ]);

            return redirect()
                ->route('dashboard')
                ->with('success', 'Maternal care record updated successfully.');

        } catch (\Exception $e) {
            Log::error('Failed to update maternal care record', [
                'record_id' => $id,
                'error' => $e->getMessage(),
                'user_id' => auth()->id(),
                'trace' => $e->getTraceAsString()
            ]);

            return redirect()
                ->back()
                ->withInput()
                ->withErrors(['error' => 'Failed to update maternal care record. Please try again.']);
        }
    }

    /**
     * Get the next family serial number
     */
    /**
     * Store a new maternal care record
     */
    public function store(StoreMaternalCareRequest $request)
    {
        try {
            // Log the incoming data for debugging
            Log::info('Maternal care form submitted', [
                'user_id' => auth()->id(),
                'data_keys' => array_keys($request->validated()),
                'family_serial' => $request->input('family_serial'),
            ]);

            $maternalRecord = $this->maternalCareService->createMaternalRecord(
                $request->validated(),
                auth()->id()
            );

            Log::info('Maternal care record created successfully', [
                'record_id' => $maternalRecord->id,
                'family_serial' => $maternalRecord->family_serial,
            ]);

            return redirect()
                ->route('parent.maternal-care.register')
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
     * Generate bulk PDF for multiple maternal care records (50 per page)
     */
    public function generateBulkPdf()
    {
        try {
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
                'line' => $e->getLine(),
                'file' => $e->getFile(),
                'trace' => $e->getTraceAsString()
            ]);

            // Return JSON error for debugging
            return response()->json([
                'error' => 'Failed to generate PDF',
                'message' => $e->getMessage(),
                'line' => $e->getLine(),
                'file' => basename($e->getFile())
            ], 500);
        }
    }
    
    /**
     * Update or create a prenatal visit with vital signs
     */
    public function updatePrenatalVisit(Request $request, $recordId, $visitNumber)
    {
        try {
            Log::info('updatePrenatalVisit called', [
                'record_id' => $recordId,
                'visit_number' => $visitNumber,
                'request_data' => $request->all()
            ]);
            
            $validated = $request->validate([
                'visit_date' => 'nullable|date',
                'vital_signs' => 'nullable|array',
                'vital_signs.weight' => 'nullable|numeric|min:0|max:300',
                'vital_signs.height' => 'nullable|numeric|min:0|max:250',
                'vital_signs.blood_pressure_systolic' => 'nullable|integer|min:0|max:300',
                'vital_signs.blood_pressure_diastolic' => 'nullable|integer|min:0|max:200',
                'vital_signs.temperature' => 'nullable|numeric|min:30|max:45',
                'vital_signs.heart_rate' => 'nullable|integer|min:0|max:250',
                'vital_signs.respiratory_rate' => 'nullable|integer|min:0|max:100',
                'vital_signs.fetal_heart_tone' => 'nullable|integer|min:0|max:200',
                'vital_signs.fundal_height' => 'nullable|numeric|min:0|max:50',
                'vital_signs.others' => 'nullable|string',
                'is_completed' => 'nullable|boolean',
            ]);
            
            Log::info('Validated data', ['validated' => $validated]);

            $maternalRecord = MaternalRecord::findOrFail($recordId);

            $visit = $this->maternalCareService->updateOrCreatePrenatalVisit(
                $maternalRecord,
                $visitNumber,
                [
                    'visit_date' => $request->input('visit_date'),
                    'vital_signs' => $request->input('vital_signs', []),
                    'is_completed' => $request->input('is_completed', false),
                ]
            );
            
            Log::info('Visit saved', ['visit' => $visit->toArray()]);

            return response()->json([
                'success' => true,
                'message' => 'Prenatal visit updated successfully',
                'visit' => $visit
            ]);

        } catch (\Illuminate\Validation\ValidationException $e) {
            Log::error('Validation failed', ['errors' => $e->errors()]);
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            Log::error('Failed to update prenatal visit', [
                'record_id' => $recordId,
                'visit_number' => $visitNumber,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }
    
    /**
     * Update or create a prenatal supplementation visit with vital signs
     */
    public function updateSupplementationVisit(Request $request, $recordId, $visitNumber)
    {
        try {
            $request->validate([
                'visit_date' => 'nullable|date',
                'tablets' => 'nullable|integer|min:0',
                'vital_signs' => 'nullable|array',
                'vital_signs.weight' => 'nullable|numeric|min:0|max:300',
                'vital_signs.height' => 'nullable|numeric|min:0|max:250',
                'vital_signs.blood_pressure_systolic' => 'nullable|integer|min:0|max:300',
                'vital_signs.blood_pressure_diastolic' => 'nullable|integer|min:0|max:200',
                'vital_signs.temperature' => 'nullable|numeric|min:30|max:45',
                'vital_signs.heart_rate' => 'nullable|integer|min:0|max:250',
                'vital_signs.respiratory_rate' => 'nullable|integer|min:0|max:100',
                'vital_signs.fetal_heart_tone' => 'nullable|integer|min:0|max:200',
                'vital_signs.fundal_height' => 'nullable|numeric|min:0|max:50',
                'vital_signs.others' => 'nullable|string',
                'is_completed' => 'nullable|boolean',
            ]);

            $maternalRecord = MaternalRecord::findOrFail($recordId);

            $supplementation = $this->maternalCareService->updateOrCreateSupplementationVisit(
                $maternalRecord,
                $visitNumber,
                [
                    'visit_date' => $request->input('visit_date'),
                    'tablets' => $request->input('tablets'),
                    'vital_signs' => $request->input('vital_signs', []),
                    'is_completed' => $request->input('is_completed', false),
                ]
            );

            return response()->json([
                'success' => true,
                'message' => 'Supplementation visit updated successfully',
                'supplementation' => $supplementation
            ]);

        } catch (\Exception $e) {
            Log::error('Failed to update supplementation visit', [
                'record_id' => $recordId,
                'visit_number' => $visitNumber,
                'error' => $e->getMessage(),
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Failed to update supplementation visit'
            ], 500);
        }
    }
}
