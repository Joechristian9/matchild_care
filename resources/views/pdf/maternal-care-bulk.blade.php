<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>ANC Target Client List for Maternal Care and Services</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: Arial, sans-serif;
            font-size: 7px;
            line-height: 1.1;
        }
        
        .page {
            width: 100%;
            page-break-after: always;
        }
        
        .page:last-child {
            page-break-after: auto;
        }
        
        .header {
            text-align: center;
            margin-bottom: 8px;
            padding: 4px;
            background-color: #e8f4f8;
            border: 1px solid #333;
        }
        
        .header h1 {
            font-size: 10px;
            font-weight: bold;
            margin-bottom: 2px;
        }
        
        table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 8px;
        }
        
        table, th, td {
            border: 1px solid #333;
        }
        
        th {
            background-color: #d0e8f2;
            font-weight: bold;
            padding: 2px 1px;
            text-align: center;
            font-size: 6px;
        }
        
        td {
            padding: 2px 1px;
            vertical-align: top;
            font-size: 6px;
        }
        
        .center {
            text-align: center;
        }
        
        .small-text {
            font-size: 5px;
        }
    </style>
</head>
<body>

    @php
        // Split records into chunks of 50 for pagination
        $recordChunks = $records->chunk(50);
        $totalPages = $recordChunks->count();
    @endphp

    @foreach($recordChunks as $pageIndex => $pageRecords)
    @php
        $pageNumber = $pageIndex + 1;
    @endphp

    <!-- PAGE 1: Basic Information and Prenatal Visits -->
    <div class="page">
        <div class="header">
            <h1>8 - ANC TARGET CLIENT LIST FOR MATERNAL CARE AND SERVICES - 1 (Page {{ $pageNumber }} of {{ $totalPages }})</h1>
        </div>
        
        <table>
            <thead>
                <tr>
                    <th rowspan="3" style="width: 3%;">No.</th>
                    <th rowspan="3" style="width: 6%;">Date of<br>Registration<br>(mm/dd/yy)</th>
                    <th rowspan="3" style="width: 5%;">Family<br>Serial<br>No.</th>
                    <th rowspan="3" style="width: 12%;">Full Name<br>(Lastname, Fullname, MI)</th>
                    <th rowspan="3" style="width: 12%;">Complete Address</th>
                    <th rowspan="3" style="width: 3%;">Age<br>(years)</th>
                    <th rowspan="3" style="width: 4%;">Age<br>Group</th>
                    <th colspan="2" rowspan="2" style="width: 8%;">Last Menstrual<br>Period</th>
                    <th rowspan="3" style="width: 6%;">Expected<br>Date of<br>Delivery<br>(EDD)</th>
                    <th colspan="8" style="width: 32%;">Date of Prenatal Check-ups (8ANC) (mm/dd/yy)</th>
                    <th rowspan="3" style="width: 4%;">G/P</th>
                </tr>
                <tr>
                    <th colspan="2">1st Tri</th>
                    <th colspan="2">2nd Tri</th>
                    <th colspan="4">3rd Trimester</th>
                </tr>
                <tr>
                    <th class="small-text">LMP</th>
                    <th class="small-text">G.P</th>
                    <th class="small-text">V1</th>
                    <th class="small-text">V2</th>
                    <th class="small-text">V3</th>
                    <th class="small-text">V4</th>
                    <th class="small-text">V5</th>
                    <th class="small-text">V6</th>
                    <th class="small-text">V7</th>
                    <th class="small-text">V8</th>
                </tr>
            </thead>
            <tbody>
                @foreach($pageRecords as $index => $record)
                @php
                    $globalIndex = ($pageIndex * 50) + $index + 1;
                @endphp
                <tr>
                    <td class="center">{{ $globalIndex }}</td>
                    <td class="center">{{ $record->date_of_registration ? date('m/d/y', strtotime($record->date_of_registration)) : '' }}</td>
                    <td class="center">{{ $record->family_serial }}</td>
                    <td>{{ $record->last_name }}, {{ $record->first_name }} {{ $record->middle_initial }}</td>
                    <td>{{ Str::limit($record->address, 40) }}</td>
                    <td class="center">{{ $record->age }}</td>
                    <td class="center">{{ $record->age_group }}</td>
                    <td class="center">{{ $record->last_menstrual_period ? date('m/d/y', strtotime($record->last_menstrual_period)) : '' }}</td>
                    <td class="center">{{ $record->gravida }}/{{ $record->parity }}</td>
                    <td class="center">{{ $record->expected_date_of_delivery ? date('m/d/y', strtotime($record->expected_date_of_delivery)) : '' }}</td>
                    @php
                        $visits = $record->prenatalVisits->sortBy('visit_number');
                    @endphp
                    @for($i = 1; $i <= 8; $i++)
                        @php
                            $visit = $visits->firstWhere('visit_number', $i);
                        @endphp
                        <td class="center">{{ $visit && $visit->visit_date ? date('m/d/y', strtotime($visit->visit_date)) : '' }}</td>
                    @endfor
                    <td class="center">{{ $record->gravida }}/{{ $record->parity }}</td>
                </tr>
                @endforeach
            </tbody>
        </table>
    </div>

    <!-- PAGE 2: Nutritional Assessment, Immunization, and Prenatal Supplementation -->
    <div class="page">
        <div class="header">
            <h1>8 - ANC TARGET CLIENT LIST FOR MATERNAL CARE AND SERVICES - 2 (Page {{ $pageNumber }} of {{ $totalPages }})</h1>
        </div>
        
        <table>
            <thead>
                <tr>
                    <th rowspan="3" style="width: 3%;">No.</th>
                    <th colspan="3">Nutritional Assessment</th>
                    <th colspan="8">Immunization Status</th>
                    <th colspan="13">Prenatal Supplementation - IFA</th>
                </tr>
                <tr>
                    <th rowspan="2">Ht<br>(cm)</th>
                    <th rowspan="2">BMI<br>1st</th>
                    <th rowspan="2">Rmk</th>
                    <th colspan="5">Td/TT Dates</th>
                    <th rowspan="2">FIM</th>
                    <th rowspan="2">Deworm</th>
                    <th colspan="2">V1</th>
                    <th colspan="2">V2</th>
                    <th colspan="2">V3</th>
                    <th colspan="2">V4</th>
                    <th colspan="2">V5</th>
                    <th colspan="2">V6</th>
                    <th rowspan="2">Cmp</th>
                </tr>
                <tr>
                    <th class="small-text">1</th>
                    <th class="small-text">2</th>
                    <th class="small-text">3</th>
                    <th class="small-text">4</th>
                    <th class="small-text">5</th>
                    <th class="small-text">d</th>
                    <th class="small-text">t</th>
                    <th class="small-text">d</th>
                    <th class="small-text">t</th>
                    <th class="small-text">d</th>
                    <th class="small-text">t</th>
                    <th class="small-text">d</th>
                    <th class="small-text">t</th>
                    <th class="small-text">d</th>
                    <th class="small-text">t</th>
                    <th class="small-text">d</th>
                    <th class="small-text">t</th>
                </tr>
            </thead>
            <tbody>
                @foreach($pageRecords as $index => $record)
                @php
                    $globalIndex = ($pageIndex * 50) + $index + 1;
                    $nutrition = $record->nutritionalAssessment;
                    $immunization = $record->immunizationRecord;
                    $prenatalSupp = $record->prenatalSupplementations->sortBy('visit_number');
                @endphp
                <tr>
                    <td class="center">{{ $globalIndex }}</td>
                    <td class="center">{{ $nutrition ? $nutrition->height : '' }}</td>
                    <td class="center">{{ $nutrition ? $nutrition->bmi_1st_trimester : '' }}</td>
                    <td class="center">{{ $nutrition ? $nutrition->remarks : '' }}</td>
                    <td class="center small-text">{{ $immunization && $immunization->td1_tt1 ? date('m/d', strtotime($immunization->td1_tt1)) : '' }}</td>
                    <td class="center small-text">{{ $immunization && $immunization->td2_tt2 ? date('m/d', strtotime($immunization->td2_tt2)) : '' }}</td>
                    <td class="center small-text">{{ $immunization && $immunization->td3_tt3 ? date('m/d', strtotime($immunization->td3_tt3)) : '' }}</td>
                    <td class="center small-text">{{ $immunization && $immunization->td4_tt4 ? date('m/d', strtotime($immunization->td4_tt4)) : '' }}</td>
                    <td class="center small-text">{{ $immunization && $immunization->td5_tt5 ? date('m/d', strtotime($immunization->td5_tt5)) : '' }}</td>
                    <td class="center">{{ $immunization ? $immunization->fully_immunized_status : '' }}</td>
                    <td class="center small-text">{{ $immunization && $immunization->deworming_date ? date('m/d', strtotime($immunization->deworming_date)) : '' }}</td>
                    @for($i = 1; $i <= 6; $i++)
                        @php
                            $supp = $prenatalSupp->firstWhere('visit_number', $i);
                        @endphp
                        <td class="center small-text">{{ $supp && $supp->supplementation_date ? date('m/d', strtotime($supp->supplementation_date)) : '' }}</td>
                        <td class="center">{{ $supp ? $supp->tablets_given : '' }}</td>
                    @endfor
                    <td class="center">{{ $prenatalSupp->count() >= 6 ? 'Y' : 'N' }}</td>
                </tr>
                @endforeach
            </tbody>
        </table>
    </div>

    <!-- PAGE 3: MMS, Calcium, and Laboratory Screenings -->
    <div class="page">
        <div class="header">
            <h1>8 - ANC TARGET CLIENT LIST FOR MATERNAL CARE AND SERVICES - 3 (Page {{ $pageNumber }} of {{ $totalPages }})</h1>
        </div>
        
        <table>
            <thead>
                <tr>
                    <th rowspan="3" style="width: 3%;">No.</th>
                    <th colspan="7">MMS Supplementation</th>
                    <th colspan="4">Calcium (High Risk)</th>
                    <th colspan="6">Laboratory Screenings</th>
                    <th colspan="3">Pregnancy Outcome</th>
                </tr>
                <tr>
                    <th>V1</th>
                    <th>V2</th>
                    <th>V3</th>
                    <th>V4</th>
                    <th>V5</th>
                    <th>V6</th>
                    <th rowspan="2">Cmp</th>
                    <th>V1</th>
                    <th>V2</th>
                    <th>V3</th>
                    <th rowspan="2">Cmp</th>
                    <th colspan="2">Hep B</th>
                    <th colspan="2">CBC</th>
                    <th colspan="2">GDM</th>
                    <th rowspan="2">Rmk</th>
                    <th rowspan="2">Date<br>Term</th>
                    <th rowspan="2">Type</th>
                </tr>
                <tr>
                    <th class="small-text">d/t</th>
                    <th class="small-text">d/t</th>
                    <th class="small-text">d/t</th>
                    <th class="small-text">d/t</th>
                    <th class="small-text">d/t</th>
                    <th class="small-text">d/t</th>
                    <th class="small-text">d/t</th>
                    <th class="small-text">d/t</th>
                    <th class="small-text">d/t</th>
                    <th class="small-text">d</th>
                    <th class="small-text">r</th>
                    <th class="small-text">d</th>
                    <th class="small-text">r</th>
                    <th class="small-text">d</th>
                    <th class="small-text">r</th>
                </tr>
            </thead>
            <tbody>
                @foreach($pageRecords as $index => $record)
                @php
                    $globalIndex = ($pageIndex * 50) + $index + 1;
                    $mms = $record->micronutrientSupplementations->sortBy('visit_number');
                    $calcium = $record->highRiskSupplementations->sortBy('visit_number');
                    $lab = $record->laboratoryScreening;
                    $outcome = $record->pregnancyOutcome;
                @endphp
                <tr>
                    <td class="center">{{ $globalIndex }}</td>
                    @for($i = 1; $i <= 6; $i++)
                        @php
                            $mmsVisit = $mms->firstWhere('visit_number', $i);
                        @endphp
                        <td class="center small-text">
                            @if($mmsVisit)
                                {{ $mmsVisit->supplementation_date ? date('m/d', strtotime($mmsVisit->supplementation_date)) : '' }}/{{ $mmsVisit->tablets_given }}
                            @endif
                        </td>
                    @endfor
                    <td class="center">{{ $mms->where('completed_mms_supplementation', true)->count() > 0 ? 'Y' : 'N' }}</td>
                    @for($i = 1; $i <= 3; $i++)
                        @php
                            $calciumVisit = $calcium->firstWhere('visit_number', $i);
                        @endphp
                        <td class="center small-text">
                            @if($calciumVisit)
                                {{ $calciumVisit->supplementation_date ? date('m/d', strtotime($calciumVisit->supplementation_date)) : '' }}/{{ $calciumVisit->tablets_given }}
                            @endif
                        </td>
                    @endfor
                    <td class="center">{{ $calcium->where('completed_calcium_supplementation', true)->count() > 0 ? 'Y' : 'N' }}</td>
                    <td class="center small-text">{{ $lab && $lab->hepatitis_b_date ? date('m/d', strtotime($lab->hepatitis_b_date)) : '' }}</td>
                    <td class="center small-text">{{ $lab ? Str::limit($lab->hepatitis_b_result, 8) : '' }}</td>
                    <td class="center small-text">{{ $lab && $lab->cbc_hgb_hct_date ? date('m/d', strtotime($lab->cbc_hgb_hct_date)) : '' }}</td>
                    <td class="center small-text">{{ $lab ? Str::limit($lab->cbc_hgb_hct_result, 8) : '' }}</td>
                    <td class="center small-text">{{ $lab && $lab->gestational_diabetes_date ? date('m/d', strtotime($lab->gestational_diabetes_date)) : '' }}</td>
                    <td class="center small-text">{{ $lab ? Str::limit($lab->gestational_diabetes_result, 8) : '' }}</td>
                    <td class="center small-text">{{ $outcome ? Str::limit($outcome->remarks_action_taken, 10) : '' }}</td>
                    <td class="center small-text">{{ $outcome && $outcome->date_terminated ? date('m/d/y', strtotime($outcome->date_terminated)) : '' }}</td>
                    <td class="center">{{ $outcome ? $outcome->outcome_type : '' }}</td>
                </tr>
                @endforeach
            </tbody>
        </table>
    </div>

    <!-- PAGE 4: Delivery and Postnatal Care -->
    <div class="page">
        <div class="header">
            <h1>8 - ANC TARGET CLIENT LIST FOR MATERNAL CARE AND SERVICES - 4 (Page {{ $pageNumber }} of {{ $totalPages }})</h1>
        </div>
        
        <table>
            <thead>
                <tr>
                    <th rowspan="3" style="width: 3%;">No.</th>
                    <th colspan="2" rowspan="2">Delivery</th>
                    <th colspan="2" rowspan="2">Birth<br>Weight</th>
                    <th colspan="4">Place of Delivery</th>
                    <th rowspan="2">Birth<br>Attend</th>
                    <th colspan="2" rowspan="2">Delivery<br>Date/Time</th>
                    <th colspan="5">Postnatal Care (4PNC)</th>
                    <th colspan="4">Postpartum IFA</th>
                    <th rowspan="2">Rmk</th>
                </tr>
                <tr>
                    <th colspan="2">Health Facility</th>
                    <th colspan="2">Non-HF</th>
                    <th>C1</th>
                    <th>C2</th>
                    <th>C3</th>
                    <th>C4</th>
                    <th>Cmp</th>
                    <th>V1</th>
                    <th>V2</th>
                    <th>V3</th>
                    <th>Cmp</th>
                </tr>
                <tr>
                    <th class="small-text">Type</th>
                    <th class="small-text">Wt(g)</th>
                    <th class="small-text">Cat</th>
                    <th class="small-text">Type</th>
                    <th class="small-text">Cap</th>
                    <th class="small-text">Type</th>
                    <th class="small-text">Loc</th>
                    <th class="small-text">Date</th>
                    <th class="small-text">Time</th>
                    <th class="small-text">24h</th>
                    <th class="small-text">D3</th>
                    <th class="small-text">7-14d</th>
                    <th class="small-text">6wk</th>
                    <th class="small-text">Y/N</th>
                    <th class="small-text">d/t</th>
                    <th class="small-text">d/t</th>
                    <th class="small-text">d/t</th>
                    <th class="small-text">Y/N</th>
                </tr>
            </thead>
            <tbody>
                @foreach($pageRecords as $index => $record)
                @php
                    $globalIndex = ($pageIndex * 50) + $index + 1;
                    $delivery = $record->deliveryInformation;
                    $postnatal = $record->postnatalCare;
                    $postpartum = $record->postpartumSupplementations->sortBy('visit_number');
                @endphp
                <tr>
                    <td class="center">{{ $globalIndex }}</td>
                    <td class="center">{{ $delivery ? $delivery->delivery_type : '' }}</td>
                    <td class="center">{{ $delivery ? $delivery->birth_weight : '' }}</td>
                    <td class="center">{{ $delivery ? $delivery->weight_category : '' }}</td>
                    <td class="center small-text">{{ $delivery ? Str::limit($delivery->health_facility_type, 8) : '' }}</td>
                    <td class="center small-text">{{ $delivery ? Str::limit($delivery->health_facility_capable, 6) : '' }}</td>
                    <td class="center small-text">{{ $delivery ? Str::limit($delivery->non_health_facility, 6) : '' }}</td>
                    <td class="center">{{ $delivery ? $delivery->birth_attendant : '' }}</td>
                    <td class="center small-text">{{ $delivery && $delivery->delivery_date ? date('m/d/y', strtotime($delivery->delivery_date)) : '' }}</td>
                    <td class="center small-text">{{ $delivery && $delivery->delivery_time ? date('H:i', strtotime($delivery->delivery_time)) : '' }}</td>
                    <td class="center small-text">{{ $postnatal && $postnatal->contact_1 ? date('m/d', strtotime($postnatal->contact_1)) : '' }}</td>
                    <td class="center small-text">{{ $postnatal && $postnatal->contact_2 ? date('m/d', strtotime($postnatal->contact_2)) : '' }}</td>
                    <td class="center small-text">{{ $postnatal && $postnatal->contact_3 ? date('m/d', strtotime($postnatal->contact_3)) : '' }}</td>
                    <td class="center small-text">{{ $postnatal && $postnatal->contact_4 ? date('m/d', strtotime($postnatal->contact_4)) : '' }}</td>
                    <td class="center">{{ $postnatal && $postnatal->completed_4pnc ? 'Y' : 'N' }}</td>
                    @for($i = 1; $i <= 3; $i++)
                        @php
                            $ppVisit = $postpartum->firstWhere('visit_number', $i);
                        @endphp
                        <td class="center small-text">
                            @if($ppVisit)
                                {{ $ppVisit->visit_date ? date('m/d', strtotime($ppVisit->visit_date)) : '' }}/{{ $ppVisit->tablets_given }}
                            @endif
                        </td>
                    @endfor
                    <td class="center">{{ $postpartum->where('completed_ifa', true)->count() > 0 ? 'Y' : 'N' }}</td>
                    <td class="center small-text"></td>
                </tr>
                @endforeach
            </tbody>
        </table>
    </div>

    @endforeach

</body>
</html>
