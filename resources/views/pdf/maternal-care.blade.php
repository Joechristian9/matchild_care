<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Maternal Care Record - {{ $record->family_serial }}</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: Arial, sans-serif;
            font-size: 8px;
            line-height: 1.2;
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
            margin-bottom: 10px;
            padding: 5px;
            background-color: #e8f4f8;
            border: 1px solid #333;
        }
        
        .header h1 {
            font-size: 11px;
            font-weight: bold;
            margin-bottom: 3px;
        }
        
        .header h2 {
            font-size: 9px;
            font-weight: normal;
        }
        
        table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 10px;
        }
        
        table, th, td {
            border: 1px solid #333;
        }
        
        th {
            background-color: #d0e8f2;
            font-weight: bold;
            padding: 3px 2px;
            text-align: center;
            font-size: 7px;
        }
        
        td {
            padding: 3px 2px;
            vertical-align: top;
            font-size: 7px;
        }
        
        .section-header {
            background-color: #b8d9e8;
            font-weight: bold;
            text-align: center;
            padding: 4px;
            font-size: 8px;
        }
        
        .label {
            font-weight: bold;
            font-size: 6px;
        }
        
        .value {
            font-size: 7px;
        }
        
        .small-text {
            font-size: 6px;
        }
        
        .center {
            text-align: center;
        }
        
        .col-narrow {
            width: 5%;
        }
        
        .col-medium {
            width: 10%;
        }
        
        .col-wide {
            width: 15%;
        }
    </style>
</head>
<body>

    <!-- PAGE 1: Basic Information and Prenatal Visits -->
    <div class="page">
        <div class="header">
            <h1>8 - ANC TARGET CLIENT LIST FOR MATERNAL CARE AND SERVICES - 1</h1>
        </div>
        
        <table>
            <thead>
                <tr>
                    <th rowspan="3" class="col-narrow">No.</th>
                    <th rowspan="3" class="col-medium">Date of<br>Registration<br>(mm/dd/yy)</th>
                    <th rowspan="3" class="col-narrow">Family Serial<br>No.</th>
                    <th rowspan="3" class="col-wide">Full Name<br>(Lastname, Fullname, MI)</th>
                    <th rowspan="3" class="col-wide">Complete Address</th>
                    <th rowspan="3" class="col-narrow">Age<br>(in years)</th>
                    <th rowspan="3" class="col-narrow">Age Group<br>A - 10-14 y.o<br>B - 15-19 y.o<br>C - 20-49 y.o</th>
                    <th colspan="2" rowspan="2">Last Menstrual<br>Period & LMP</th>
                    <th rowspan="3" class="col-medium">Expected Date of<br>Delivery<br>(EDD)<br>(mm/dd/yy)</th>
                    <th colspan="8">Date of Prenatal Check-ups (8ANC)<br>(mm/dd/yy)</th>
                    <th rowspan="3">Gravida<br>Parity<br>(G/P)</th>
                </tr>
                <tr>
                    <th colspan="2">1st Trimester</th>
                    <th colspan="2">2nd Trimester</th>
                    <th colspan="4">3rd Trimester</th>
                </tr>
                <tr>
                    <th class="small-text">LMP</th>
                    <th class="small-text">G.P</th>
                    <th class="small-text">Recommended Timing:<br>Visit 1(8-12): 8-13 weeks<br>Visit 2(14-26): 14-26 weeks<br>Visit 3(28-32): 28-32 weeks<br>Visit 4(36): 36 weeks<br>Visit 5(38): 38 weeks<br>Visit 6(39): 39 weeks<br>Visit 7(40): 40 weeks<br>Visit 8: 37-40 weeks</th>
                    <th>Visit 1</th>
                    <th>Visit 2</th>
                    <th>Visit 3</th>
                    <th>Visit 4</th>
                    <th>Visit 5</th>
                    <th>Visit 6</th>
                    <th>Visit 7</th>
                    <th>Visit 8</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td class="center">1</td>
                    <td class="center">{{ $record->date_of_registration ? date('m/d/Y', strtotime($record->date_of_registration)) : '' }}</td>
                    <td class="center">{{ $record->family_serial }}</td>
                    <td>{{ $record->last_name }}, {{ $record->first_name }} {{ $record->middle_initial }}</td>
                    <td>{{ $record->address }}</td>
                    <td class="center">{{ $record->age }}</td>
                    <td class="center">{{ $record->age_group }}</td>
                    <td class="center">{{ $record->last_menstrual_period ? date('m/d/Y', strtotime($record->last_menstrual_period)) : '' }}</td>
                    <td class="center">{{ $record->gravida }}/{{ $record->parity }}</td>
                    <td class="center">{{ $record->expected_date_of_delivery ? date('m/d/Y', strtotime($record->expected_date_of_delivery)) : '' }}</td>
                    @php
                        $visits = $record->prenatalVisits->first();
                    @endphp
                    <td class="center">{{ $visits && $visits->visit_1 ? date('m/d/Y', strtotime($visits->visit_1)) : '' }}</td>
                    <td class="center">{{ $visits && $visits->visit_2 ? date('m/d/Y', strtotime($visits->visit_2)) : '' }}</td>
                    <td class="center">{{ $visits && $visits->visit_3 ? date('m/d/Y', strtotime($visits->visit_3)) : '' }}</td>
                    <td class="center">{{ $visits && $visits->visit_4 ? date('m/d/Y', strtotime($visits->visit_4)) : '' }}</td>
                    <td class="center">{{ $visits && $visits->visit_5 ? date('m/d/Y', strtotime($visits->visit_5)) : '' }}</td>
                    <td class="center">{{ $visits && $visits->visit_6 ? date('m/d/Y', strtotime($visits->visit_6)) : '' }}</td>
                    <td class="center">{{ $visits && $visits->visit_7 ? date('m/d/Y', strtotime($visits->visit_7)) : '' }}</td>
                    <td class="center">{{ $visits && $visits->visit_8 ? date('m/d/Y', strtotime($visits->visit_8)) : '' }}</td>
                    <td class="center">{{ $record->gravida }}/{{ $record->parity }}</td>
                </tr>
            </tbody>
        </table>
    </div>

    <!-- PAGE 2: Nutritional Assessment, Immunization, and Prenatal Supplementation -->
    <div class="page">
        <div class="header">
            <h1>8 - ANC TARGET CLIENT LIST FOR MATERNAL CARE AND SERVICES - 2</h1>
        </div>
        
        <table>
            <thead>
                <tr>
                    <th colspan="3" class="section-header">Nutritional Assessment<br>(Write the BMI for 1st<br>Trimester (1st visit))</th>
                    <th colspan="8" class="section-header">Immunization Status</th>
                    <th colspan="13" class="section-header">Prenatal Supplementation</th>
                </tr>
                <tr>
                    <th rowspan="2">Ht. in<br>cm &<br>kg/m2</th>
                    <th rowspan="2">Wt. in<br>18.5-22.9<br>x23.0<br>kg/m2</th>
                    <th rowspan="2">Remarks:<br>N - Normal<br>A - Trans Out<br>before<br>receiving<br>8 ANC</th>
                    <th colspan="5">Date Tetanus Diptheria (Td) - containing vaccine given<br>(mm/dd/yy)</th>
                    <th rowspan="2">Fully<br>Immunized<br>Mother<br>(FIM) Status</th>
                    <th rowspan="2">Received<br>one dose<br>Deworming<br>Tablet?</th>
                    <th colspan="13">Iron Folic Acid (IFA) Supplementation</th>
                </tr>
                <tr>
                    <th>Td1/<br>TT1</th>
                    <th>Td2/<br>TT2</th>
                    <th>Td3/<br>TT3</th>
                    <th>Td4/<br>TT4</th>
                    <th>Td5/<br>TT5</th>
                    <th colspan="2">1st visit<br>(mm/dd/yy)</th>
                    <th colspan="2">2nd visit<br>(mm/dd/yy)</th>
                    <th colspan="2">3rd visit<br>(mm/dd/yy)</th>
                    <th colspan="2">4th visit<br>(mm/dd/yy)</th>
                    <th colspan="2">5th visit<br>(mm/dd/yy)</th>
                    <th colspan="2">6th visit<br>(mm/dd/yy)</th>
                    <th>d: Date<br>t: Yes<br>0: No</th>
                </tr>
            </thead>
            <tbody>
                @php
                    $nutrition = $record->nutritionalAssessment;
                    $immunization = $record->immunizationRecord;
                    $prenatalSupp = $record->prenatalSupplementations;
                @endphp
                <tr>
                    <td class="center">{{ $nutrition ? $nutrition->height : '' }}</td>
                    <td class="center">{{ $nutrition ? $nutrition->bmi_1st : '' }}</td>
                    <td class="center">{{ $nutrition ? $nutrition->remarks : '' }}</td>
                    <td class="center">{{ $immunization && $immunization->td1_tt1 ? date('m/d/Y', strtotime($immunization->td1_tt1)) : '' }}</td>
                    <td class="center">{{ $immunization && $immunization->td2_tt2 ? date('m/d/Y', strtotime($immunization->td2_tt2)) : '' }}</td>
                    <td class="center">{{ $immunization && $immunization->td3_tt3 ? date('m/d/Y', strtotime($immunization->td3_tt3)) : '' }}</td>
                    <td class="center">{{ $immunization && $immunization->td4_tt4 ? date('m/d/Y', strtotime($immunization->td4_tt4)) : '' }}</td>
                    <td class="center">{{ $immunization && $immunization->td5_tt5 ? date('m/d/Y', strtotime($immunization->td5_tt5)) : '' }}</td>
                    <td class="center">{{ $immunization ? $immunization->fully_immunized : '' }}</td>
                    <td class="center">{{ $immunization && $immunization->received_deworming ? date('m/d/Y', strtotime($immunization->received_deworming)) : '' }}</td>
                    @foreach($prenatalSupp as $index => $supp)
                        <td class="center">{{ $supp->date ? date('m/d/Y', strtotime($supp->date)) : '' }}</td>
                        <td class="center">{{ $supp->tablets_given }}</td>
                    @endforeach
                    @for($i = count($prenatalSupp); $i < 6; $i++)
                        <td></td>
                        <td></td>
                    @endfor
                    <td class="center">{{ $prenatalSupp->count() > 0 ? 'Y' : 'N' }}</td>
                </tr>
            </tbody>
        </table>
    </div>

    <!-- PAGE 3: MMS, Calcium, and Laboratory Screenings -->
    <div class="page">
        <div class="header">
            <h1>8 - ANC TARGET CLIENT LIST FOR MATERNAL CARE AND SERVICES - 3</h1>
        </div>
        
        <table>
            <thead>
                <tr>
                    <th colspan="8" class="section-header">Prenatal Supplementation</th>
                    <th colspan="9" class="section-header">Laboratory Screenings</th>
                    <th colspan="3" class="section-header">Pregnancy<br>Outcome</th>
                </tr>
                <tr>
                    <th colspan="7">Multiple Micronutrient Supplementation (MMS)</th>
                    <th rowspan="2">Completed<br>IFA supple-<br>mentation?<br>1 - Yes<br>0 - No</th>
                    <th colspan="3">FOR HIGH RISK PREGNANT<br>WOMEN ONLY<br>Calcium Carbonate (CC)<br>Supplementation</th>
                    <th rowspan="2">Completed<br>CC supple-<br>mentation?<br>1 - Yes<br>0 - No</th>
                    <th colspan="2">Hepatitis B</th>
                    <th colspan="2">CBC/Hgb/Hct Count</th>
                    <th colspan="2">Gestational Diabetes Mellitus</th>
                    <th rowspan="2">Remarks/<br>Action<br>Taken</th>
                    <th rowspan="2">Date<br>Terminated<br>(mm/dd/yy)</th>
                    <th rowspan="2">Preg<br>Outcome<br>FT - Full<br>PT - Pre<br>AB - Abo<br>Ectopic</th>
                </tr>
                <tr>
                    <th>1st visit<br>(1st tri)</th>
                    <th>2nd visit<br>(2nd tri)</th>
                    <th>3rd visit<br>(2nd tri)</th>
                    <th>4th visit<br>(3rd tri)</th>
                    <th>5th visit<br>(3rd tri)</th>
                    <th>6th visit<br>(3rd tri)</th>
                    <th>Completed<br>MMS<br>(mm/dd/yy)</th>
                    <th>2nd visit<br>(2nd tri)</th>
                    <th>3rd visit<br>(2nd tri)</th>
                    <th>4th visit<br>(3rd tri)</th>
                    <th>Date<br>Screened<br>(mm/dd/yy)</th>
                    <th>Result</th>
                    <th>Date<br>Screened<br>(mm/dd/yy)</th>
                    <th>Result</th>
                    <th>Date<br>Screened<br>(mm/dd/yy)</th>
                    <th>Result</th>
                </tr>
            </thead>
            <tbody>
                @php
                    $mms = $record->micronutrientSupplementation;
                    $calcium = $record->highRiskSupplementation;
                    $lab = $record->laboratoryScreening;
                    $outcome = $record->pregnancyOutcome;
                @endphp
                <tr>
                    @if($mms)
                        @foreach(json_decode($mms->visits, true) ?? [] as $index => $visit)
                            <td class="center">{{ isset($visit['date']) ? date('m/d/Y', strtotime($visit['date'])) : '' }}<br>{{ $visit['tablets'] ?? '' }}</td>
                        @endforeach
                        @for($i = count(json_decode($mms->visits, true) ?? []); $i < 6; $i++)
                            <td></td>
                        @endfor
                        <td class="center">{{ $mms->completed ? 'Y' : 'N' }}</td>
                    @else
                        <td></td><td></td><td></td><td></td><td></td><td></td><td></td>
                    @endif
                    
                    @if($calcium)
                        @foreach(json_decode($calcium->visits, true) ?? [] as $index => $visit)
                            <td class="center">{{ isset($visit['date']) ? date('m/d/Y', strtotime($visit['date'])) : '' }}<br>{{ $visit['tablets'] ?? '' }}</td>
                        @endforeach
                        @for($i = count(json_decode($calcium->visits, true) ?? []); $i < 3; $i++)
                            <td></td>
                        @endfor
                        <td class="center">{{ $calcium->completed ? 'Y' : 'N' }}</td>
                    @else
                        <td></td><td></td><td></td><td></td>
                    @endif
                    
                    @if($lab)
                        <td class="center">{{ $lab->hepatitis_b_date ? date('m/d/Y', strtotime($lab->hepatitis_b_date)) : '' }}</td>
                        <td class="center">{{ $lab->hepatitis_b_result }}</td>
                        <td class="center">{{ $lab->cbc_hgb_hct_date ? date('m/d/Y', strtotime($lab->cbc_hgb_hct_date)) : '' }}</td>
                        <td class="center">{{ $lab->cbc_hgb_hct_result }}</td>
                        <td class="center">{{ $lab->gestational_diabetes_date ? date('m/d/Y', strtotime($lab->gestational_diabetes_date)) : '' }}</td>
                        <td class="center">{{ $lab->gestational_diabetes_result }}</td>
                    @else
                        <td></td><td></td><td></td><td></td><td></td><td></td>
                    @endif
                    
                    @if($outcome)
                        <td class="center">{{ $outcome->remarks }}</td>
                        <td class="center">{{ $outcome->date_terminated ? date('m/d/Y', strtotime($outcome->date_terminated)) : '' }}</td>
                        <td class="center">{{ $outcome->outcome_type }}</td>
                    @else
                        <td></td><td></td><td></td>
                    @endif
                </tr>
            </tbody>
        </table>
    </div>

    <!-- PAGE 4: Delivery and Postnatal Care -->
    <div class="page">
        <div class="header">
            <h1>8 - ANC TARGET CLIENT LIST FOR MATERNAL CARE AND SERVICES - 4</h1>
        </div>
        
        <table>
            <thead>
                <tr>
                    <th colspan="2" rowspan="2" class="section-header">Delivery<br>Type</th>
                    <th colspan="2" rowspan="2" class="section-header">Birth<br>Weight</th>
                    <th colspan="6" class="section-header">Place of Delivery</th>
                    <th rowspan="2">Birth<br>Attendant</th>
                    <th colspan="2" rowspan="2">Date and Time of<br>Delivery</th>
                    <th colspan="5" class="section-header">Date of Postnatal Care (4PNC)<br>(mm/dd/yy)</th>
                    <th colspan="6" class="section-header">Postpartum Supplementation</th>
                    <th colspan="3" rowspan="2" class="section-header">Remarks:<br>A - Trans In<br>B - Trans Out<br>before<br>completing<br>4PNC</th>
                </tr>
                <tr>
                    <th colspan="4">Health Facility</th>
                    <th colspan="2">Non-Health<br>Facility</th>
                    <th rowspan="1">Contact 1 -<br>within 24<br>hours<br>after<br>delivery</th>
                    <th rowspan="1">Contact 2 -<br>on day 3<br>after<br>delivery</th>
                    <th rowspan="1">Contact 3 -<br>between<br>7-10 days<br>after birth</th>
                    <th rowspan="1">Contact 4 -<br>6 weeks<br>after birth</th>
                    <th rowspan="1">Completed<br>4PNC?<br>1 - Yes<br>0 - No</th>
                    <th colspan="5">Iron with Folic Acid (IFA)<br>Supplementation</th>
                    <th rowspan="1">Completed<br>IFA supplem-<br>entation?<br>1 - Yes<br>0 - No</th>
                </tr>
                <tr>
                    <th>CS - Cesar-<br>ean<br>Section<br>VD - Vaginal<br>Delivery<br>CVCD -<br>Combined<br>Vaginal<br>Cesarean<br>Delivery</th>
                    <th>Weight<br>(in<br>grams)</th>
                    <th>A -<br>Normal<br>Low<br>C -<br>Unknown</th>
                    <th>BHS,<br>RHU/LHU,<br>BEmONC<br>CEmONC</th>
                    <th>Facility<br>Type</th>
                    <th>BEmONC<br>or<br>CEmONC<br>capable?</th>
                    <th>Non-Health<br>Facility<br>(Home,<br>Others -<br>DOH licensed<br>ambulance</th>
                    <th>MD - Doctor<br>RN - Nurse<br>MW - Midwife<br>O - Others<br>Pr-Society<br>Attendant</th>
                    <th>Date<br>(mm/dd/yy)</th>
                    <th>Time</th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th colspan="3">1st Visit 2nd Visit 3rd Visit</th>
                    <th>Completed<br>IFA supplem-<br>entation?<br>1 - Yes<br>0 - No</th>
                    <th>If Yes, date<br>completed<br>(mm/dd/yy)</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                @php
                    $delivery = $record->deliveryInformation;
                    $postnatal = $record->postnatalCare;
                    $postpartum = $record->postpartumSupplementations->first();
                @endphp
                <tr>
                    @if($delivery)
                        <td class="center">{{ $delivery->delivery_type }}</td>
                        <td class="center">{{ $delivery->birth_weight }}</td>
                        <td class="center">{{ $delivery->weight_category }}</td>
                        <td class="center">{{ $delivery->health_facility_type }}</td>
                        <td class="center">{{ $delivery->facility_type }}</td>
                        <td class="center">{{ $delivery->facility_capable }}</td>
                        <td class="center">{{ $delivery->non_health_facility }}</td>
                        <td class="center">{{ $delivery->birth_attendant }}</td>
                        <td class="center">{{ $delivery->delivery_date ? date('m/d/Y', strtotime($delivery->delivery_date)) : '' }}</td>
                        <td class="center">{{ $delivery->delivery_time }}</td>
                    @else
                        <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
                    @endif
                    
                    @if($postnatal)
                        <td class="center">{{ $postnatal->contact_1 ? date('m/d/Y', strtotime($postnatal->contact_1)) : '' }}</td>
                        <td class="center">{{ $postnatal->contact_2 ? date('m/d/Y', strtotime($postnatal->contact_2)) : '' }}</td>
                        <td class="center">{{ $postnatal->contact_3 ? date('m/d/Y', strtotime($postnatal->contact_3)) : '' }}</td>
                        <td class="center">{{ $postnatal->contact_4 ? date('m/d/Y', strtotime($postnatal->contact_4)) : '' }}</td>
                        <td class="center">{{ $postnatal->completed_4pnc ? 'Y' : 'N' }}</td>
                    @else
                        <td></td><td></td><td></td><td></td><td></td>
                    @endif
                    
                    @if($postpartum)
                        @foreach(json_decode($postpartum->visits, true) ?? [] as $visit)
                            <td class="center">{{ isset($visit['date']) ? date('m/d/Y', strtotime($visit['date'])) : '' }}<br>{{ $visit['tablets'] ?? '' }}</td>
                        @endforeach
                        @for($i = count(json_decode($postpartum->visits, true) ?? []); $i < 3; $i++)
                            <td></td>
                        @endfor
                        <td class="center">{{ $postpartum->completed_ifa ? 'Y' : 'N' }}</td>
                        <td class="center">{{ $postpartum->date_completed_1st ? date('m/d/Y', strtotime($postpartum->date_completed_1st)) : '' }}</td>
                        <td class="center">{{ $postpartum->remarks }}</td>
                    @else
                        <td></td><td></td><td></td><td></td><td></td><td></td>
                    @endif
                </tr>
            </tbody>
        </table>
    </div>

</body>
</html>
