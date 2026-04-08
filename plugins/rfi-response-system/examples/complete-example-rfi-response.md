# Complete Example: RFI Response System

> Demonstrates end-to-end usage -- user pastes a raw RFI from an electrician about a conduit routing conflict, and the plugin generates a full professional RFI response with spec references, cost/schedule impact assessment, and change order flag.

---

## USER INPUT

```
We got this RFI from our electrical sub. Can you help draft a response?

---
RFI #E-047
Date: March 15, 2026
From: Apex Electrical Contractors
To: Morrison & Associates (GC)
Project: Westfield Medical Office Building - Phase 2
Location: Level 2, Corridor C-4 (between grids D-E / 3-5)

Subject: Conduit Routing Conflict at Corridor Ceiling

During coordination of our conduit runs on Level 2 Corridor C-4, we have identified
a conflict between our 2" and 4" conduit runs (feeding Panel 2L-C and MDP-2) and the
24" x 12" supply duct shown on M-201. There is also a 4" sprinkler main in this area.

The structural drawings (S-201) show W12x26 beams at 10'-0" spacing running N-S, with
bottom of steel at elevation 12'-4". The architectural ceiling on A-301 is shown at
9'-6" AFF. This gives us approximately 34" of ceiling cavity.

Our conduit routing per E-201 requires approximately 8" of vertical space (2" EMT
stacked with 4" rigid plus trapeze hangers). The duct per M-201 requires approximately
16" (12" duct + insulation + hangers). The sprinkler main requires approximately 6"
(4" pipe + fittings + hangers). Total: 30" without any separation.

However, per Section 26 05 33 paragraph 3.2.A, our conduit must maintain 6" clearance
from the ductwork and 3" from the sprinkler pipe. With required clearances, we need
approximately 39" -- 5" more than available.

We request direction on how to proceed. We cannot install per the current drawings.
Attached: coordination section drawing showing the conflict.
```

---

## PLUGIN OUTPUT

### Analysis

```
CONFLICT ANALYSIS
-----------------
Location:           Level 2, Corridor C-4, Grids D-E / 3-5
Available cavity:   34" (BOT steel EL 12'-4" to CLG EL 9'-6")
Required space:     ~39" (with clearances per Section 26 05 33)
Shortfall:          5"

System breakdown:
  HVAC duct 24x12 + insulation + hangers:     16"
  Sprinkler 4" main + fittings + hangers:       6"
  Electrical 2" EMT + 4" RGS + trapeze:         8"
  Clearance: conduit-to-duct (6"):              6"
  Clearance: conduit-to-sprinkler (3"):          3"
  TOTAL:                                        39"

Contractor's dimensional analysis is correct.

Routing priority (standard MEP practice):
  1. Gravity drainage (none in this area)
  2. Large ductwork (24x12 supply duct)
  3. Sprinkler mains (4" main)
  4. Domestic/hydronic piping (none in this area)
  5. Electrical conduit (2" EMT + 4" RGS) -- most flexible

Recommended resolution: Restack systems with duct tight to steel,
sprinkler below duct offset to side, conduit below sprinkler with
reduced clearance waiver at this specific location.

CO FLAG: Potential -- mechanical hanger relocation may require
additional hardware not in contract documents.
```

### Draft RFI Response

```
============================================================================
                        RFI RESPONSE
============================================================================

PROJECT:     Westfield Medical Office Building - Phase 2
RFI #:       E-047
DATE REC'D:  March 15, 2026
RESP. DATE:  March 22, 2026
FROM:        Apex Electrical Contractors
SUBJECT:     Conduit Routing Conflict at Corridor C-4, Level 2
BALL-IN-COURT: Contractor

============================================================================

The Architect/Engineer has reviewed RFI #E-047 and the attached coordination
section drawing. The conflict between electrical conduit, HVAC ductwork, and
fire sprinkler piping at Level 2 Corridor C-4 (Grids D-E / 3-5) is
confirmed.

1. CONFLICT CONFIRMED

   Available ceiling cavity: 34 inches (bottom of steel EL 12'-4" to
   architectural ceiling EL 9'-6" per A-301).

   Space required per current design with clearances:
   - HVAC duct (24"x12") + insulation + hangers:     ~16"
   - Electrical conduit (2" EMT + 4" RGS) + trapeze:  ~8"
   - Sprinkler main (4") + fittings + hangers:         ~6"
   - Clearances per Section 26 05 33, para 3.2.A:      ~9"
   - TOTAL REQUIRED:                                   ~39"
   - TOTAL AVAILABLE:                                    34"
   - SHORTFALL:                                           5"

2. RESOLUTION -- REVISED ROUTING

   The following routing assignments are directed at Corridor C-4, Level 2,
   Grids D-E / 3-5:

   a. HVAC DUCTWORK (Division 23): The 24"x12" supply duct shall be
      relocated to run tight to the bottom of steel (W12x26 at EL 12'-4").
      Support with trapeze hangers from the beam flanges. Duct insulation
      (1" per Section 23 07 00) shall be applied to the bottom and exposed
      sides only at this location. Top of duct bears directly against bottom
      flange of beam.

      Mechanical Engineer to confirm that omission of top insulation at this
      interior corridor location does not create a condensation concern. If
      condensation is a concern, a vapor barrier sheet between steel and duct
      top is acceptable.

      Bottom of insulated duct: approximately EL 11'-0".

   b. FIRE SPRINKLER (Division 21): The 4" sprinkler main shall route below
      the duct, offset 6" horizontally toward the north side of the corridor
      to allow access to the duct from below. Bottom of sprinkler fittings
      at approximately EL 10'-6".

      The sprinkler contractor shall verify that sprinkler head deflector-
      to-ceiling distance complies with NFPA 13, Section 8.6.5.1 (maximum
      12" for standard pendant spray sprinklers below smooth ceilings). If
      the head drops below the ceiling plane, provide an escutcheon per
      Section 21 13 00.

   c. ELECTRICAL (Division 26): The 2" EMT and 4" RGS shall route below the
      sprinkler main on trapeze hangers at EL 10'-3" (top of conduit) to
      EL 9'-11" (bottom of conduit). This provides 5" clearance above the
      architectural ceiling at EL 9'-6".

      The clearance requirements of Section 26 05 33, paragraph 3.2.A are
      modified at this specific location ONLY as follows:
      - Conduit-to-duct clearance reduced from 6" to 1" minimum air gap
        from insulation jacket
      - Conduit-to-sprinkler clearance of 3" is maintained

      This modification applies only to the conduit runs at Corridor C-4,
      Grids D-E / 3-5, and does not establish a project-wide precedent.

   d. ARCHITECTURAL CEILING: The ceiling height at 9'-6" AFF per A-301 can
      be maintained. The 5" clearance above ceiling grid to bottom of
      conduit is sufficient for standard 15/16" exposed tee grid
      installation per Section 09 51 00.

3. SPECIFICATION REFERENCES

   - Section 26 05 33, paragraph 3.2.A: Conduit clearance requirements
   - Section 23 07 00: HVAC insulation
   - Section 23 31 00, paragraph 3.3: Duct routing and support
   - Section 21 13 00: Fire suppression sprinkler systems
   - Section 09 51 00: Acoustical ceilings
   - Section 01 31 00: Project coordination and BIM requirements
   - NFPA 13, Section 8.6.5.1: Sprinkler deflector distance

4. DRAWINGS AFFECTED

   The Contractor shall update the BIM coordination model and resubmit the
   coordination drawing for Corridor C-4 within 10 business days reflecting
   the routing assignments above. Affected drawings:

   - E-201: Electrical conduit routing, Level 2
   - M-201: Mechanical duct routing, Level 2
   - FP-201: Fire protection layout, Level 2
   - A-301: Reflected ceiling plan (verify no revision required)

5. COST / SCHEDULE IMPACT

   *** CHANGE ORDER FLAG ***

   The overall MEP routing coordination is within the Contractor's scope
   per Section 01 31 00 and does not constitute a change to the Contract.

   However, if the mechanical contractor's relocation of duct hangers (item
   2a -- tight-to-steel attachment) requires structural attachments or
   additional hanger hardware not included in the Contract Documents, the
   mechanical contractor shall submit a Change Order Request within 14
   business days per General Conditions Article 7.

   The modification of clearance requirements at item 2c does not result in
   additional cost to the electrical contractor -- the conduit routing is
   simplified, not complicated, by the reduced clearance.

   SCHEDULE: No critical path impact anticipated provided coordination
   drawings are updated within 10 business days. If the Contractor believes
   otherwise, provide a CPM schedule fragment per Section 00 72 00.

6. SUPPLEMENTAL SKETCH

   See attached SK-047 (issued for clarification only). SK-047 shows the
   revised cross-section at Corridor C-4 with system elevations as directed
   above. This sketch does not modify the Contract Documents unless
   confirmed by a subsequent ASI.

   This response does not authorize any change in contract price or time
   unless specifically noted above.

============================================================================

RFI LOG ENTRY
  RFI:      E-047
  Status:   RESPONDED
  CO Flag:  YES (potential -- mechanical hanger hardware)
  Schedule: LOW RISK
  BIC:      Contractor -- coordination drawing update due 04/01/2026
  Spec:     26 05 33, 23 31 00, 21 13 00, 01 31 00
  Category: MEP Coordination / Trade Conflict
```

---

## WHAT THE PLUGIN DID

1. **Parsed the raw RFI** -- extracted project, RFI number, location, submitting trade, and technical details from the unstructured contractor text.

2. **Validated the dimensional analysis** -- independently confirmed the contractor's math showing 39" needed vs. 34" available.

3. **Applied MEP routing priority** -- used standard industry hierarchy (gravity > large ductwork > sprinkler > piping > conduit) from the CSI MasterFormat knowledge base to determine which systems move and which stay.

4. **Generated a layered solution** -- assigned specific elevation zones for each system and verified that the architectural ceiling height could be maintained.

5. **Referenced correct specifications** -- cited Sections 26 05 33, 23 07 00, 23 31 00, 21 13 00, and NFPA 13 from the knowledge base.

6. **Identified the change order risk** -- flagged the mechanical hanger relocation as a potential COR trigger while clarifying that the overall coordination is within the contractor's scope.

7. **Set clear next actions** -- defined who does what by when (contractor updates BIM model within 10 business days) and preserved the owner's schedule rights.

8. **Used proper contract language** -- formal construction contract tone ("shall," "the Contractor," section references) appropriate for a document that could become a claim exhibit.
