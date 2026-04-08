# Complete Example: Estimating Assistant -- Estimate Review

> Demonstrates the plugin reviewing an incomplete estimate for a 10,000 SF office tenant buildout.
> Output includes: completeness check, missing items flagged, full CSI breakdown, and value engineering options.

---

## USER INPUT

```
Can you review this estimate for a 10,000 SF office buildout? I think we're
missing some items. Budget target is $65/SF ($650,000). This is a Class A
office building, 3rd floor, existing shell with dropped ceiling grid in place.

Scope: Open office with 12 private offices, 2 conference rooms, break room,
server room, reception area, and 2 ADA restrooms (connecting to existing risers).

Here's what we have so far:

ESTIMATE - 10,000 SF Office Buildout
Lump sum contract, competitive bid

Demolition:             $8,000
Framing (metal studs):  $45,000
Drywall:                $62,000
Doors and hardware:     $28,000
Painting:               $18,000
Flooring (LVT + carpet): $42,000
Ceiling tile:           $15,000
Electrical:             $85,000
Plumbing:               $35,000
HVAC:                   $55,000
Fire sprinkler:         $12,000
Fire alarm:             $8,000

Subtotal:               $413,000
GC overhead:            $41,300 (10%)
GC profit:              $22,715 (5%)
Contingency:            $23,851 (5%)

TOTAL:                  $500,866

This seems low. What are we missing?
```

---

## PLUGIN OUTPUT

### Completeness Analysis

```
============================================================================
              ESTIMATE REVIEW -- COMPLETENESS CHECK
============================================================================

Project:     10,000 SF Class A Office Buildout, 3rd Floor
Building:    Existing shell, dropped ceiling grid in place
Program:     12 private offices, 2 conf rooms, break room, server room,
             reception, 2 ADA restrooms
Contract:    Lump sum, competitive bid
Budget:      $650,000 ($65.00/SF)
Estimate:    $500,866 ($50.09/SF)
Gap:         $149,134 UNDER BUDGET -- estimate is INCOMPLETE

============================================================================
ITEMS INCLUDED -- BENCHMARK VERIFICATION
============================================================================

| Item | Amount | $/SF | Benchmark Range | Assessment |
|------|--------|------|-----------------|------------|
| Demolition | $8,000 | $0.80 | $3.00-8.00/SF (selective TI demo) | LOW -- likely underscoped |
| Metal stud framing | $45,000 | $4.50 | $4.00-9.00/SF | OK at low end |
| Drywall | $62,000 | $6.20 | $6.00-14.00/SF | OK -- verify finish level |
| Doors & hardware | $28,000 | -- | $1,500-3,000/opening x ~17 | OK for standard; verify glass doors |
| Painting | $18,000 | $1.80 | $1.50-3.00/SF | BORDERLINE -- verify scope includes primer + 2 coats all surfaces |
| Flooring (LVT + carpet) | $42,000 | $4.20 | $4.00-10.00/SF blended | OK at low end |
| Ceiling tile | $15,000 | $1.50 | $3.00-8.00/SF | LOW if full replacement; OK if only infill |
| Electrical | $85,000 | $8.50 | $12.00-25.00/SF for office TI | LOW -- likely missing server room power and data |
| Plumbing | $35,000 | $3.50 | $3.50-7.00/SF (with restrooms) | OK at low end |
| HVAC | $55,000 | $5.50 | $5.00-12.00/SF (mods to existing) | OK -- verify server room supplemental |
| Fire sprinkler | $12,000 | $1.20 | $1.50-3.00/SF (head relocation) | SLIGHTLY LOW |
| Fire alarm | $8,000 | $0.80 | $1.50-4.00/SF (addressable mods) | LOW -- verify device count |

============================================================================
ITEMS MISSING -- MUST ADD
============================================================================

The following items are required for this project but are NOT in the estimate:

CRITICAL (cannot build without these):

| # | Item | CSI Section | Estimated Cost | Why It's Needed |
|---|------|-------------|----------------|-----------------|
| 1 | General Conditions | 01 00 00 | $38,000-52,000 | Superintendent, PM, temp facilities, permits, cleanup -- not the same as "GC overhead" in your markup |
| 2 | Permit fees | 01 41 00 | $3,500-8,000 | Building permit required; plan review fees; varies by jurisdiction (typically 0.5-1.5% of construction cost) |
| 3 | Toilet partitions | 10 21 00 | $4,200-7,200 | 4 stalls total (2 per restroom, 1 ADA each); floor-mounted overhead-braced SSSP |
| 4 | Toilet accessories | 10 28 00 | $2,400-4,800 | Grab bars, dispensers (soap, towel, TP, seat cover), mirrors, hooks, waste receptacles -- per ADA |
| 5 | Firestopping | 07 84 00 | $3,500-6,500 | Every rated wall penetration (conduit, pipe, duct through rated partitions). Code-required. |
| 6 | Data cabling | 27 15 00 | $16,000-28,000 | Cat6A drops to workstations and offices; fiber to server room; WAPs; patch panels. Often the MOST forgotten TI item. |
| 7 | Cleaning | 01 74 00 | $1,500-3,500 | Rough clean during construction + professional final clean before occupancy |

HIGH PRIORITY (scope gap if omitted):

| # | Item | CSI Section | Estimated Cost | Why It's Needed |
|---|------|-------------|----------------|-----------------|
| 8 | Millwork -- reception desk | 06 40 00 | $8,000-22,000 | Class A reception requires a built desk; ranges from laminate to custom wood |
| 9 | Casework -- break room cabinets | 06 41 00 | $8,000-15,000 | Upper and lower cabinets, break room layout |
| 10 | Countertops | 12 36 00 | $4,500-9,000 | Break room counters (laminate or solid surface); restroom vanity tops (solid surface) |
| 11 | Sound insulation | 07 21 00 | $4,000-8,500 | Batt insulation in walls at offices, conference rooms, server room for acoustic privacy (STC 45+ typical for Class A) |
| 12 | Glass/glazing | 08 80 00 | $6,500-16,000 | Conference room sidelites/relites, reception feature glass, borrowed light windows at offices |
| 13 | ADA signage | 10 14 00 | $2,800-5,500 | Room identification signs with tactile/braille per ADA; suite entry signage; wayfinding |
| 14 | Restroom tile | 09 30 00 | $6,500-14,000 | Floor tile + wet-wall tile in both restrooms; waterproof membrane at wet areas |
| 15 | Server room cooling | 23 80 00 | $5,500-14,000 | Supplemental split system or CRAC unit; server rooms generate significant heat load |
| 16 | BAS / controls | 25 50 00 | $5,000-12,000 | DDC integration for new HVAC zones; server room temp monitoring/alarm |
| 17 | Access control | 28 13 00 | $5,500-13,000 | Card reader at suite entry + server room; electric strike/mag lock; controller |

MEDIUM PRIORITY (expected in Class A TI):

| # | Item | CSI Section | Estimated Cost | Why It's Needed |
|---|------|-------------|----------------|-----------------|
| 18 | Window treatments | 12 20 00 | $3,500-9,000 | Roller shades at exterior windows; manual or motorized |
| 19 | Security cameras | 28 23 00 | $3,500-9,000 | IP cameras at reception, corridors, server room |
| 20 | Appliances | 11 31 00 | $2,500-6,000 | Break room: refrigerator, microwave, dishwasher, coffee station |

ESTIMATED TOTAL MISSING ITEMS: $145,400 -- $263,000
MIDPOINT:                       ~$204,000

============================================================================
NOTE ON "GC OVERHEAD" VS "GENERAL CONDITIONS"
============================================================================

Your estimate shows "GC overhead: 10%" as a markup on the subtotal. This is
the contractor's HOME OFFICE overhead (corporate rent, accounting, exec
salaries, etc.) and profit allocation.

GENERAL CONDITIONS (Division 01) is a SEPARATE line item that covers the
field costs of running the project: superintendent salary, project manager,
temporary power, portable toilets, dumpsters, field office, safety, permit
fees, final cleaning, etc. These are DIRECT COSTS, not markup.

Most TI project estimates should have BOTH:
- Division 01 General Conditions: $38,000-52,000 (built up from actual items)
- GC Overhead & Profit: 10-15% markup on hard costs

Your estimate is currently missing the Division 01 general conditions entirely.

============================================================================
REVISED COMPLETE ESTIMATE -- CSI BREAKDOWN
============================================================================

| CSI Div | Description | Low | High | Notes |
|---------|-------------|-----|------|-------|
| 01 00 00 | General Conditions | $38,000 | $52,000 | 8-week duration: super, PM, temp, permits, cleaning |
| 02 41 00 | Selective Demolition | $15,000 | $22,000 | Existing walls, ceiling mods, floor prep, haul-off |
| 05 41 00 | Metal Stud Framing | $45,000 | $52,000 | As estimated + verify blocking for casework/TV mounts |
| 06 40 00 | Millwork & Casework | $18,000 | $37,000 | Reception desk + break room cabinets + server room shelving |
| 07 21 00 | Sound Insulation | $4,000 | $8,500 | R-11 batt in office, conf room, server room walls |
| 07 84 00 | Firestopping | $3,500 | $6,500 | All rated wall penetrations (MEP through rated walls) |
| 08 11 00 | Doors, Frames, Hardware | $28,000 | $40,000 | HM frames, wood doors, hardware; glass doors at conf rooms |
| 08 80 00 | Glazing & Sidelites | $6,500 | $16,000 | Conference room sidelites, reception glass feature |
| 09 21 00 | Gypsum Board | $62,000 | $70,000 | As estimated; verify Level 4 vs 5; shaft wall at server room |
| 09 30 00 | Tile | $6,500 | $14,000 | Restroom floor and wet-wall tile + waterproofing |
| 09 51 00 | Acoustical Ceilings | $15,000 | $24,000 | Tile replacement + new grid segments + cloud at reception |
| 09 65 00 | Flooring | $42,000 | $50,000 | LVT at corridors/break room + carpet tile at offices/open |
| 09 91 00 | Painting | $22,000 | $30,000 | Primer + 2 coats all new walls; accent walls; ceiling touch-up |
| 10 14 00 | Signage | $2,800 | $5,500 | ADA room signs, suite ID, wayfinding |
| 10 21 00 | Toilet Partitions | $4,200 | $7,200 | 4 stalls, SSSP, floor-mount OH-braced, 1 ADA per RR |
| 10 28 00 | Toilet Accessories | $2,400 | $4,800 | Full accessory package per ADA |
| 11 31 00 | Appliances | $2,500 | $6,000 | Break room appliance package |
| 12 20 00 | Window Treatments | $3,500 | $9,000 | Roller shades, manual, standard fabric |
| 12 36 00 | Countertops | $4,500 | $9,000 | Solid surface at RRs, laminate at break room |
| 21 13 00 | Fire Sprinkler | $14,000 | $20,000 | Head relocation + additions for new partition layout |
| 22 00 00 | Plumbing | $35,000 | $45,000 | 2 ADA restrooms + break room sink + water heater |
| 23 00 00 | HVAC | $58,000 | $72,000 | Duct mods, new zones, VAV boxes, diffusers |
| 23 80 00 | Server Room Cooling | $5,500 | $14,000 | Dedicated split system or CRAC unit |
| 25 50 00 | BAS Controls | $5,000 | $12,000 | New zone integration, server room monitoring |
| 26 00 00 | Electrical | $90,000 | $115,000 | Power, lighting, devices; server room dedicated circuits |
| 27 15 00 | Data/Low-Voltage | $16,000 | $28,000 | Cat6A, fiber, WAPs, patch panels |
| 28 13 00 | Access Control | $5,500 | $13,000 | Card readers, controllers, wiring, programming |
| 28 23 00 | Security Cameras | $3,500 | $9,000 | IP cameras, NVR, cabling |
| 28 31 00 | Fire Alarm | $10,000 | $16,000 | Addressable devices, notification, programming |
| 01 74 00 | Cleaning | $1,500 | $3,500 | Progressive rough clean + final professional clean |
|---------|-------------|-----|------|-------|
| | **HARD COST SUBTOTAL** | **$613,900** | **$806,000** | |
| | GC Home Office OH (10%) | $61,390 | $80,600 | |
| | GC Profit (5%) | $33,765 | $44,330 | |
| | Contingency (5% at CD level, 10% at DD) | $35,453 | $93,093 | |
| | **ESTIMATED TOTAL** | **$744,508** | **$1,024,023** | |
| | **$/SF** | **$74.45** | **$102.40** | |

MIDPOINT ESTIMATE: ~$884,000 ($88.40/SF)

============================================================================
BUDGET RECONCILIATION
============================================================================

Budget target:           $650,000  ($65.00/SF)
Original estimate:       $500,866  ($50.09/SF)  INCOMPLETE
Revised estimate (low):  $744,508  ($74.45/SF)
Revised estimate (mid):  $884,266  ($88.43/SF)
Revised estimate (high): $1,024,023 ($102.40/SF)

FINDING: The $65/SF budget target is BELOW market for this scope in a Class A
building. Typical Class A office TI with private offices, conference rooms,
restrooms, and server room: $75-100/SF in competitive bid markets.

Options to close the gap:
1. Reduce scope (fewer offices, simpler finishes)
2. Apply value engineering (see below)
3. Increase budget to realistic level ($75-85/SF)
4. Negotiate landlord TI allowance increase

============================================================================
VALUE ENGINEERING OPTIONS
============================================================================

| # | VE Item | Savings | Impact | Rec. |
|---|---------|---------|--------|------|
| 1 | Laminate reception desk vs custom millwork | $8,000-15,000 | Reduced visual impact at entry | YES if budget-driven |
| 2 | Solid walls at conference rooms (eliminate glass sidelites) | $5,000-12,000 | Loss of transparency and daylight | CONSIDER |
| 3 | All carpet tile (eliminate LVT at corridors) | $4,000-8,000 | Lower durability at high-traffic | YES -- use commercial-grade |
| 4 | Reduce data drops: 1 per workstation + WiFi | $5,000-10,000 | WiFi-dependent for 2nd connection | VERIFY with IT |
| 5 | Plastic laminate countertops everywhere | $2,000-4,000 | Less premium at restrooms | YES for break room only |
| 6 | Standard manual roller shades | $2,000-4,000 | No impact if already manual | YES |
| 7 | Access control at suite entry only (keyed lock at server) | $2,500-5,000 | Reduced server room security | VERIFY security policy |
| 8 | Eliminate security cameras (use building lobby cameras) | $3,500-9,000 | No dedicated tenant surveillance | OWNER DECISION |
| 9 | Owner-furnished appliances | $1,000-2,500 | Owner procurement effort | YES |
| 10 | Reduce from 12 to 10 private offices | $15,000-25,000 | 2 fewer offices = less walls, doors, HVAC zones | PROGRAM CHANGE needed |
| 11 | Portable AC for server room (vs dedicated split) | $4,000-10,000 | Less reliable, higher operating cost | NOT RECOMMENDED |
| 12 | Standard ceiling grid (vs tegular) | $2,000-4,000 | Slightly less refined | YES |

MAXIMUM POTENTIAL VE SAVINGS: $54,000 - $108,500

With aggressive VE (midpoint ~$75K savings):
Revised mid estimate: $884K - $75K = ~$809K ($80.90/SF)

To reach $650K, scope reduction (fewer offices, eliminate restrooms if
landlord can provide core restrooms, eliminate server room) would be needed
in addition to VE.

============================================================================
RECOMMENDATIONS
============================================================================

1. COMPLETE THE ESTIMATE before bidding. The current estimate is missing
   ~$200K in scope, which will result in a budget overrun or require
   significant change orders during construction.

2. REALISTIC BUDGET: $75-85/SF for this program. Discuss with ownership
   whether the budget can be increased or if scope must be reduced.

3. VERIFY WITH IT: Server room power density, cooling load, data drop
   count, and UPS requirements before finalizing the estimate.

4. CONFIRM RESTROOM SCOPE: Confirm with landlord whether restrooms are
   tenant scope or base building. If base building provides, savings of
   ~$55,000-$80,000.

5. BID WITH ALTERNATES: Include VE items as deductive alternates to make
   informed decisions based on actual competitive pricing.

6. REVIEW LANDLORD TI ALLOWANCE: Many Class A leases provide $40-80/SF
   TI allowance. Negotiate based on actual project cost.

============================================================================
```

---

## WHAT THE PLUGIN DID

1. **Identified 20 missing scope items** by comparing the user's estimate against the CSI cost benchmarks and the general conditions checklist for standard office tenant improvement work.

2. **Benchmarked every included line item** against the cost benchmark CSV, flagging demolition ($0.80/SF vs benchmark $3-8/SF) and electrical ($8.50/SF vs benchmark $12-25/SF) as likely underscoped.

3. **Corrected a common estimating mistake** -- explained the difference between "GC overhead" (home office markup) and "General Conditions" (Division 01 field costs), which are separate items.

4. **Generated a complete CSI-organized estimate** with 30 line items, low/high ranges, and professional markup structure.

5. **Provided 12 value engineering options** with savings estimates, impact descriptions, and clear recommendations.

6. **Gave a realistic budget assessment** -- the $65/SF target is below market for this scope, and the plugin explained why with benchmark data.
