<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Target Client List for Child Immunization</title>
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
            background-color: #d0e8f2;
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
        
        .rotate {
            writing-mode: vertical-rl;
            text-orientation: mixed;
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

    <!-- PAGE 1: Basic Information -->
    <div class="page">
        <div class="header">
            <h1>TARGET CLIENT LIST FOR CHILD IMMUNIZATION - 1 (Page {{ $pageNumber }} of {{ $totalPages }})</h1>
        </div>
        
        <table>
            <thead>
                <tr>
                    <th rowspan="2" style="width: 3%;">No.</th>
                    <th rowspan="2" style="width: 8%;">Date of<br>Registration<br>(mm/dd/yy)</th>
                    <th rowspan="2" style="width: 6%;">Family<br>Serial<br>No.</th>
                    <th rowspan="2" style="width: 15%;">Full Name<br>(LastName, FullName, MI)</th>
                    <th rowspan="2" style="width: 4%;">Sex<br>M - Male<br>F - Female</th>
                    <th rowspan="2" style="width: 8%;">Date of Birth<br>(mm/dd/yy)</th>
                    <th rowspan="2" style="width: 15%;">Complete Name of Mother<br>(LastName, FullName, MI)</th>
                    <th rowspan="2" style="width: 20%;">Complete Address</th>
                    <th colspan="2" style="width: 21%;">Children protected at birth (CPAb)<br>from neonatal tetanus<br>(Place a check)</th>
                </tr>
                <tr>
                    <th class="small-text" style="width: 10%;">Received at least<br>2 doses of Tetanus<br>containing vaccine at<br>least 1 month prior to<br>delivery</th>
                    <th class="small-text" style="width: 11%;">TT2 Plus (TT2+) or<br>FIC (TT1 or 0-<br>TT0 (Td5 (plus))<br>the mother anytime<br>prior to delivery</th>
                </tr>
            </thead>
            <tbody>
                @foreach($pageRecords as $index => $child)
                @php
                    $globalIndex = ($pageIndex * 50) + $index + 1;
                    $mother = $child->maternalRecord;
                    $motherImmunization = $mother ? $mother->immunizationRecord : null;
                    
                    // Check if mother received at least 2 doses
                    $receivedTwoDoses = false;
                    if ($motherImmunization) {
                        $doses = collect([
                            $motherImmunization->td1_tt1,
                            $motherImmunization->td2_tt2,
                            $motherImmunization->td3_tt3,
                            $motherImmunization->td4_tt4,
                            $motherImmunization->td5_tt5
                        ])->filter()->count();
                        $receivedTwoDoses = $doses >= 2;
                    }
                    
                    // Check if mother is fully immunized
                    $fullyImmunized = $motherImmunization && $motherImmunization->fully_immunized_status === 'Y';
                @endphp
                <tr>
                    <td class="center">{{ $globalIndex }}</td>
                    <td class="center">{{ $mother && $mother->date_of_registration ? date('m/d/y', strtotime($mother->date_of_registration)) : '' }}</td>
                    <td class="center">{{ $child->family_serial }}</td>
                    <td>{{ $child->last_name }}, {{ $child->first_name }} {{ $child->middle_initial }}</td>
                    <td class="center">{{ $child->sex }}</td>
                    <td class="center">{{ $child->date_of_birth ? date('m/d/y', strtotime($child->date_of_birth)) : '' }}</td>
                    <td>{{ $mother ? $mother->last_name . ', ' . $mother->first_name . ' ' . $mother->middle_initial : '' }}</td>
                    <td>{{ $child->address }}</td>
                    <td class="center">{{ $receivedTwoDoses ? '✓' : '' }}</td>
                    <td class="center">{{ $fullyImmunized ? '✓' : '' }}</td>
                </tr>
                @endforeach
            </tbody>
        </table>
    </div>

    <!-- PAGE 2: Immunization Schedule -->
    <div class="page">
        <div class="header">
            <h1>TARGET CLIENT LIST FOR CHILD IMMUNIZATION - 2 (Page {{ $pageNumber }} of {{ $totalPages }})</h1>
        </div>
        
        <table>
            <thead>
                <tr>
                    <th colspan="4" style="width: 16%;"></th>
                    <th colspan="21" style="width: 84%;">Immunization<br>(mm/dd/yy)</th>
                </tr>
                <tr>
                    <th rowspan="3" style="width: 3%;">No.</th>
                    <th rowspan="3" style="width: 5%;">BCG<br>(within<br>0-28<br>days)</th>
                    <th rowspan="3" style="width: 5%;">BCG<br>(29 days<br>to 1<br>year old)</th>
                    <th rowspan="3" style="width: 5%;">Hepa B<br>(within<br>24 hours<br>after birth)</th>
                    <th colspan="3" style="width: 9%;">DPT-HiB-HepB</th>
                    <th colspan="3" style="width: 9%;">OPV</th>
                    <th colspan="3" style="width: 9%;">IPV</th>
                    <th colspan="3" style="width: 9%;">PCV</th>
                    <th colspan="3" style="width: 9%;">MMR</th>
                    <th colspan="2" style="width: 12%;">FIC<br>(0-12 mos)</th>
                    <th colspan="2" style="width: 12%;">CIC<br>(13-23 mos)</th>
                    <th rowspan="3" style="width: 10%;">Remarks/Action Taken</th>
                </tr>
                <tr>
                    <th>1st dose<br>1½ mos</th>
                    <th>2nd dose<br>2½ mos</th>
                    <th>3rd dose<br>3½ mos</th>
                    <th>1st dose<br>1½ mos</th>
                    <th>2nd dose<br>2½ mos</th>
                    <th>3rd dose<br>3½ mos</th>
                    <th>1st dose<br>3½ mos</th>
                    <th>2nd dose<br>9 mos</th>
                    <th></th>
                    <th>1st dose<br>1½ mos</th>
                    <th>2nd dose<br>2½ mos</th>
                    <th>3rd dose<br>3½ mos</th>
                    <th>1st dose<br>9 mos</th>
                    <th>2nd dose<br>12 mos</th>
                    <th></th>
                    <th>1 dose BCG<br>1 dose HepB<br>3 doses DPT<br>3 doses OPV<br>2 doses MMR</th>
                    <th>1 dose BCG<br>1 dose HepB<br>3 doses DPT<br>3 doses OPV<br>2 doses MMR</th>
                    <th>1 dose BCG<br>1 dose HepB<br>3 doses DPT<br>3 doses OPV<br>2 doses MMR</th>
                    <th>1 dose BCG<br>1 dose HepB<br>3 doses DPT<br>3 doses OPV<br>2 doses MMR</th>
                </tr>
                <tr>
                    <th class="small-text">mm/dd/yy</th>
                    <th class="small-text">mm/dd/yy</th>
                    <th class="small-text">mm/dd/yy</th>
                    <th class="small-text">mm/dd/yy</th>
                    <th class="small-text">mm/dd/yy</th>
                    <th class="small-text">mm/dd/yy</th>
                    <th class="small-text">mm/dd/yy</th>
                    <th class="small-text">mm/dd/yy</th>
                    <th class="small-text"></th>
                    <th class="small-text">mm/dd/yy</th>
                    <th class="small-text">mm/dd/yy</th>
                    <th class="small-text">mm/dd/yy</th>
                    <th class="small-text">mm/dd/yy</th>
                    <th class="small-text">mm/dd/yy</th>
                    <th class="small-text"></th>
                    <th class="small-text">Y/N</th>
                    <th class="small-text">Y/N</th>
                    <th class="small-text">Y/N</th>
                    <th class="small-text">Y/N</th>
                </tr>
            </thead>
            <tbody>
                @foreach($pageRecords as $index => $child)
                @php
                    $globalIndex = ($pageIndex * 50) + $index + 1;
                    $immunization = $child->childImmunizationRecord;
                    
                    // Calculate age in months at birth
                    $birthDate = $child->date_of_birth;
                    $ageInDays = $birthDate ? now()->diffInDays($birthDate) : 0;
                    
                    // Determine BCG column (within 28 days or 29 days to 1 year)
                    $bcgWithin28Days = '';
                    $bcg29DaysTo1Year = '';
                    if ($immunization && $immunization->bcg) {
                        $bcgDate = $immunization->bcg;
                        $daysOldAtBcg = $birthDate->diffInDays($bcgDate);
                        if ($daysOldAtBcg <= 28) {
                            $bcgWithin28Days = date('m/d/y', strtotime($bcgDate));
                        } else {
                            $bcg29DaysTo1Year = date('m/d/y', strtotime($bcgDate));
                        }
                    }
                @endphp
                <tr>
                    <td class="center">{{ $globalIndex }}</td>
                    <td class="center small-text">{{ $bcgWithin28Days }}</td>
                    <td class="center small-text">{{ $bcg29DaysTo1Year }}</td>
                    <td class="center small-text">{{ $immunization && $immunization->hepatitis_b ? date('m/d/y', strtotime($immunization->hepatitis_b)) : '' }}</td>
                    <td class="center small-text">{{ $immunization && $immunization->pentavalent_1 ? date('m/d/y', strtotime($immunization->pentavalent_1)) : '' }}</td>
                    <td class="center small-text">{{ $immunization && $immunization->pentavalent_2 ? date('m/d/y', strtotime($immunization->pentavalent_2)) : '' }}</td>
                    <td class="center small-text">{{ $immunization && $immunization->pentavalent_3 ? date('m/d/y', strtotime($immunization->pentavalent_3)) : '' }}</td>
                    <td class="center small-text">{{ $immunization && $immunization->opv_1 ? date('m/d/y', strtotime($immunization->opv_1)) : '' }}</td>
                    <td class="center small-text">{{ $immunization && $immunization->opv_2 ? date('m/d/y', strtotime($immunization->opv_2)) : '' }}</td>
                    <td class="center small-text">{{ $immunization && $immunization->opv_3 ? date('m/d/y', strtotime($immunization->opv_3)) : '' }}</td>
                    <td class="center small-text">{{ $immunization && $immunization->ipv_1 ? date('m/d/y', strtotime($immunization->ipv_1)) : '' }}</td>
                    <td class="center small-text">{{ $immunization && $immunization->ipv_2 ? date('m/d/y', strtotime($immunization->ipv_2)) : '' }}</td>
                    <td class="center small-text"></td>
                    <td class="center small-text">{{ $immunization && $immunization->pcv_1 ? date('m/d/y', strtotime($immunization->pcv_1)) : '' }}</td>
                    <td class="center small-text">{{ $immunization && $immunization->pcv_2 ? date('m/d/y', strtotime($immunization->pcv_2)) : '' }}</td>
                    <td class="center small-text">{{ $immunization && $immunization->pcv_3 ? date('m/d/y', strtotime($immunization->pcv_3)) : '' }}</td>
                    <td class="center small-text">{{ $immunization && $immunization->mmr_1 ? date('m/d/y', strtotime($immunization->mmr_1)) : '' }}</td>
                    <td class="center small-text">{{ $immunization && $immunization->mmr_2 ? date('m/d/y', strtotime($immunization->mmr_2)) : '' }}</td>
                    <td class="center small-text"></td>
                    <td class="center">{{ $immunization && $immunization->fully_immunized_child === 'Y' ? 'Y' : 'N' }}</td>
                    <td class="center"></td>
                    <td class="center"></td>
                    <td class="center"></td>
                    <td class="center small-text"></td>
                </tr>
                @endforeach
            </tbody>
        </table>
    </div>

    @endforeach

</body>
</html>
