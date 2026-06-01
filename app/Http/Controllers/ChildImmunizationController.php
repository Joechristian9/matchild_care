<?php

namespace App\Http\Controllers;

use App\Models\Child;
use App\Models\MaternalRecord;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Barryvdh\DomPDF\Facade\Pdf;


class ChildImmunizationController extends Controller
{
    private function formatDate($date): ?string
    {
        if (!$date) {
            return null;
        }

        return \Carbon\Carbon::parse($date)->format('Y-m-d');
    }
    /**
     * Display a listing of the resource.
     * Optimized: Only select needed columns and use eager loading
     */
    public function index(Request $request)
    {
        $query = Child::select([
                'id',
                'maternal_record_id',
                'family_serial',
                'first_name',
                'last_name',
                'sex',
                'date_of_birth',
                'address',
            ])
            ->with([
                'maternalRecord:id,first_name,last_name,middle_initial,family_serial,address',
                'childImmunizationRecord:id,child_id,fic,cic',
            ]);

        // Search functionality
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('first_name', 'like', "%{$search}%")
                    ->orWhere('last_name', 'like', "%{$search}%")
                    ->orWhere('family_serial', 'like', "%{$search}%")
                    ->orWhereHas('maternalRecord', function ($q) use ($search) {
                        $q->where('first_name', 'like', "%{$search}%")
                            ->orWhere('last_name', 'like', "%{$search}%");
                    });
            });
        }

        // Filter by sex
        if ($request->filled('sex') && $request->sex !== 'all') {
            $query->where('sex', $request->sex);
        }

        // Filter by immunization status
        if ($request->filled('status') && $request->status !== 'all') {
            switch ($request->status) {
                case 'fic_cic':
                    $query->whereHas('childImmunizationRecord', function ($q) {
                        $q->where('fic', true)->where('cic', true);
                    });
                    break;
                case 'fic':
                    $query->whereHas('childImmunizationRecord', function ($q) {
                        $q->where('fic', true)->where('cic', false);
                    });
                    break;
                case 'cic':
                    $query->whereHas('childImmunizationRecord', function ($q) {
                        $q->where('fic', false)->where('cic', true);
                    });
                    break;
                case 'incomplete':
                    $query->whereHas('childImmunizationRecord', function ($q) {
                        $q->where('fic', false)->where('cic', false);
                    });
                    break;
                case 'no_record':
                    $query->doesntHave('childImmunizationRecord');
                    break;
            }
        }

        $records = $query->latest()
            ->paginate(10)
            ->withQueryString()
            ->through(function ($child) {
                $immunization = $child->childImmunizationRecord;

                return [
                    'id' => $child->id,

                    'child_name' => trim("{$child->last_name}, {$child->first_name}"),
                    'sex' => $child->sex,
                    'date_of_birth' => optional($child->date_of_birth)->format('Y-m-d'),

                    'mother_name' => $child->maternalRecord?->full_name,
                    'family_serial' => $child->family_serial ?: $child->maternalRecord?->family_serial,
                    'address' => $child->address ?: $child->maternalRecord?->address,

                    'fic' => (bool) ($immunization?->fic ?? false),
                    'cic' => (bool) ($immunization?->cic ?? false),

                    'immunization_status' => match (true) {
                        !$immunization => 'No Record',
                        $immunization->fic && $immunization->cic => 'FIC / CIC',
                        $immunization->fic => 'FIC',
                        $immunization->cic => 'CIC',
                        default => 'Incomplete',
                    },

                    'has_record' => (bool) $immunization,
                ];
            });

        return Inertia::render('Child/Index', [
            'records' => $records,
            'filters' => $request->only(['search', 'sex', 'status']),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $records = MaternalRecord::query()
            ->orderBy('last_name')
            ->get()
            ->map(fn ($record) => [
                'id' => $record->id,
                'date_of_registration' => optional($record->date_of_registration)->format('Y-m-d'),
                'family_serial' => $record->family_serial,
                'mother_name' => $record->full_name,
                'address' => $record->address,
                'label' => "{$record->family_serial} - {$record->full_name}",
            ]);

        $children = Child::with(['maternalRecord', 'childImmunizationRecord'])
            ->latest()
            ->get()
            ->map(function ($child) {
                $immunization = $child->childImmunizationRecord;

                return [
                    'id' => $child->id,
                    'label' => trim("{$child->last_name}, {$child->first_name}"),

                    'maternal_record_id' => $child->maternal_record_id,
                    'date_of_registration' => optional($child->date_of_registration)->format('Y-m-d'),
                    'family_serial' => $child->family_serial,
                    'last_name' => $child->last_name,
                    'first_name' => $child->first_name,
                    'middle_initial' => $child->middle_initial,
                    'sex' => $child->sex,
                    'date_of_birth' => optional($child->date_of_birth)->format('Y-m-d'),
                    'address' => $child->address,

                    'mother_name' => $child->maternalRecord?->full_name,

                    'immunization' => $immunization ? [
                    'bcg_0_28_days' => $immunization->bcg_0_28_days?->format('Y-m-d'),
                    'bcg_29_days_to_1_year' => $immunization->bcg_29_days_to_1_year?->format('Y-m-d'),

                    'hepa_b_within_24_hours' => $immunization->hepa_b_within_24_hours?->format('Y-m-d'),
                    'hepa_b_more_than_24_hours' => $immunization->hepa_b_more_than_24_hours?->format('Y-m-d'),

                    'pentavalent_1' => $immunization->pentavalent_1?->format('Y-m-d'),
                    'pentavalent_2' => $immunization->pentavalent_2?->format('Y-m-d'),
                    'pentavalent_3' => $immunization->pentavalent_3?->format('Y-m-d'),

                    'opv_1' => $immunization->opv_1?->format('Y-m-d'),
                    'opv_2' => $immunization->opv_2?->format('Y-m-d'),
                    'opv_3' => $immunization->opv_3?->format('Y-m-d'),

                    'ipv_1' => $immunization->ipv_1?->format('Y-m-d'),
                    'ipv_2' => $immunization->ipv_2?->format('Y-m-d'),

                    'pcv_1' => $immunization->pcv_1?->format('Y-m-d'),
                    'pcv_2' => $immunization->pcv_2?->format('Y-m-d'),
                    'pcv_3' => $immunization->pcv_3?->format('Y-m-d'),

                    'mmr_1' => $immunization->mmr_1?->format('Y-m-d'),
                    'mmr_2' => $immunization->mmr_2?->format('Y-m-d'),

                    'protected_at_birth_tt2' => (bool) $immunization->protected_at_birth_tt2,
                    'protected_at_birth_tt3_tt5' => (bool) $immunization->protected_at_birth_tt3_tt5,

                    'fic' => (bool) $immunization->fic,
                    'cic' => (bool) $immunization->cic,

                    'remarks_action_taken' => $immunization->remarks_action_taken,
                ] : [],
                ];
            });

        return Inertia::render('Child/Create', [
            'records' => $records,
            'children' => $children,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'mode' => ['required', 'in:existing,new'],

            'child_id' => ['nullable', 'required_if:mode,existing', 'exists:children,id'],
            'maternal_record_id' => ['nullable', 'required_if:mode,new', 'exists:maternal_records,id'],

            'child_last_name' => ['nullable', 'required_if:mode,new', 'string', 'max:100'],
            'child_first_name' => ['nullable', 'required_if:mode,new', 'string', 'max:100'],
            'child_middle_initial' => ['nullable', 'string', 'max:2'],
            'child_sex' => ['nullable', 'required_if:mode,new', 'in:M,F'],
            'child_date_of_birth' => ['nullable', 'required_if:mode,new', 'date'],

            'immunization' => ['nullable', 'array'],

            'immunization.protected_at_birth_tt2' => ['nullable', 'boolean'],
            'immunization.protected_at_birth_tt3_tt5' => ['nullable', 'boolean'],

            'immunization.bcg_0_28_days' => ['nullable', 'date'],
            'immunization.bcg_29_days_to_1_year' => ['nullable', 'date'],

            'immunization.hepa_b_within_24_hours' => ['nullable', 'date'],
            'immunization.hepa_b_more_than_24_hours' => ['nullable', 'date'],

            'immunization.pentavalent_1' => ['nullable', 'date'],
            'immunization.pentavalent_2' => ['nullable', 'date'],
            'immunization.pentavalent_3' => ['nullable', 'date'],

            'immunization.opv_1' => ['nullable', 'date'],
            'immunization.opv_2' => ['nullable', 'date'],
            'immunization.opv_3' => ['nullable', 'date'],

            'immunization.ipv_1' => ['nullable', 'date'],
            'immunization.ipv_2' => ['nullable', 'date'],

            'immunization.pcv_1' => ['nullable', 'date'],
            'immunization.pcv_2' => ['nullable', 'date'],
            'immunization.pcv_3' => ['nullable', 'date'],

            'immunization.mmr_1' => ['nullable', 'date'],
            'immunization.mmr_2' => ['nullable', 'date'],

            'immunization.fic' => ['nullable', 'boolean'],
            'immunization.cic' => ['nullable', 'boolean'],

            'immunization.remarks_action_taken' => ['nullable', 'string'],
        ]);

        try {
            DB::transaction(function () use ($validated) {
                if ($validated['mode'] === 'existing') {
                    $child = Child::findOrFail($validated['child_id']);
                } else {
                    $maternal = MaternalRecord::findOrFail($validated['maternal_record_id']);

                    $child = Child::create([
                        'maternal_record_id' => $maternal->id,
                        'date_of_registration' => now()->toDateString(),
                        'family_serial' => $maternal->family_serial,
                        'last_name' => $validated['child_last_name'],
                        'first_name' => $validated['child_first_name'],
                        'middle_initial' => $validated['child_middle_initial'] ?? null,
                        'sex' => $validated['child_sex'],
                        'date_of_birth' => $validated['child_date_of_birth'],
                        'address' => $maternal->address,
                    ]);
                }

                $immunizationData = collect($validated['immunization'] ?? [])
                    ->only([
                        'protected_at_birth_tt2',
                        'protected_at_birth_tt3_tt5',
                        'bcg_0_28_days',
                        'bcg_29_days_to_1_year',
                        'hepa_b_within_24_hours',
                        'hepa_b_more_than_24_hours',
                        'pentavalent_1',
                        'pentavalent_2',
                        'pentavalent_3',
                        'opv_1',
                        'opv_2',
                        'opv_3',
                        'ipv_1',
                        'ipv_2',
                        'pcv_1',
                        'pcv_2',
                        'pcv_3',
                        'mmr_1',
                        'mmr_2',
                        'fic',
                        'cic',
                        'remarks_action_taken',
                    ])
                    ->toArray();

                $immunizationData['protected_at_birth_tt2'] =
                    filter_var($immunizationData['protected_at_birth_tt2'] ?? false, FILTER_VALIDATE_BOOLEAN);

                $immunizationData['protected_at_birth_tt3_tt5'] =
                    filter_var($immunizationData['protected_at_birth_tt3_tt5'] ?? false, FILTER_VALIDATE_BOOLEAN);

                $immunizationData['fic'] =
                    filter_var($immunizationData['fic'] ?? false, FILTER_VALIDATE_BOOLEAN);

                $immunizationData['cic'] =
                    filter_var($immunizationData['cic'] ?? false, FILTER_VALIDATE_BOOLEAN);

                $child->childImmunizationRecord()->updateOrCreate(
                    ['child_id' => $child->id],
                    $immunizationData
                );
            });
            return back()->with([
                'success' => 'Child immunization record saved successfully.',
                'toast_key' => uniqid(),
            ]);
        } catch (\Throwable $e) {
            Log::error('Child Immunization Store Error', [
                'message' => $e->getMessage(),
                'line' => $e->getLine(),
                'file' => $e->getFile(),
            ]);

            return back()->with([
                'error' => 'Something went wrong while saving the child immunization record.',
                'toast_key' => uniqid(),
            ]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    /**
     * Generate bulk PDF for all child immunization records
     */
    public function generateBulkPdf()
    {
        try {
            $records = Child::with([
                'maternalRecord',
                'maternalRecord.immunizationRecord',
                'childImmunizationRecord'
            ])
            ->orderBy('date_of_birth', 'desc')
            ->get();

            $pdf = Pdf::loadView('pdf.child-immunization-bulk', compact('records'))
                ->setPaper('legal', 'landscape')
                ->setOptions([
                    'isHtml5ParserEnabled' => true,
                    'isRemoteEnabled' => true,
                    'defaultFont' => 'sans-serif'
                ]);

            $filename = 'Child_Immunization_Target_List_' . date('Y-m-d') . '.pdf';
            return $pdf->download($filename);

        } catch (\Exception $e) {
            Log::error('Failed to generate child immunization bulk PDF', [
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
}
