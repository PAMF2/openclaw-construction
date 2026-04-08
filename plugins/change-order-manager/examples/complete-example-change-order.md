# Complete Example: Change Order — VCT to Polished Concrete

> Demonstrates end-to-end usage -- user requests a change order for an owner-directed flooring upgrade from VCT to polished concrete in the main lobby during active construction. The plugin generates a ready-to-send change order document with itemized costs, schedule impact, and updated contract total.

---

## USER INPUT

```
Owner wants to upgrade from VCT flooring to polished concrete in the main
lobby, 3,200 SF. We're mid-construction. Please draft the change order.

Project: Riverside Commons Mixed-Use Building
GC: Pinnacle Construction Group
Owner: Riverside Development Partners LLC
Original Contract: $8,450,000
Approved COs to date: $127,500 (CO-001 through CO-006)
Current Contract Total: $8,577,500
Contract Type: GMP (AIA A133-2019)
CO markup per contract: 15% OH&P on self-performed, 10% on subcontractor work

The VCT sub (Capitol Flooring) hasn't started yet but materials are
ordered. Concrete slab is poured and cured. We're about 3 weeks out from
when flooring was scheduled to start in the lobby.
```

---

## PLUGIN OUTPUT

```
============================================================================
                        CHANGE ORDER REQUEST
============================================================================

TO:         Riverside Development Partners LLC
            Attn: [Owner's Representative]

FROM:       Pinnacle Construction Group
            Attn: [Project Manager]

DATE:       April 8, 2026

PROJECT:    Riverside Commons Mixed-Use Building
            [Project Address]

CONTRACT:   AIA A133-2019 (GMP)
            Original Contract Sum: $8,450,000.00

CO NO:      CO-007
REVISION:   0

============================================================================

1.  DESCRIPTION OF CHANGE

    Owner directs the General Contractor to delete the vinyl composition
    tile (VCT) flooring and replace with polished concrete flooring in the
    main lobby area, comprising approximately 3,200 square feet.

    Area: Main Lobby — Grid Lines A-D / 1-5 (verify against A-101)

    Scope of deleted work:
    - VCT flooring and adhesive installation (3,200 SF)
    - VCT base (as applicable to lobby perimeter)

    Scope of added work:
    - Concrete surface preparation and repair
    - Multi-step diamond grinding and polishing (800-grit minimum finish)
    - Concrete densifier and stain guard application
    - Joint filling and crack repair
    - Polished concrete base (where applicable)

============================================================================

2.  REASON FOR CHANGE

    Owner-Directed Change per AIA A133-2019, Section 7.3.

    The Owner has elected to upgrade the lobby flooring finish from VCT to
    polished concrete for aesthetic and long-term maintenance reasons. This
    change is not the result of a design error, field condition, or
    contractor action.

============================================================================

3.  ITEMIZED COST BREAKDOWN

    A.  CREDIT — DELETED VCT WORK (Capitol Flooring)

        VCT material (3,200 SF x $2.85/SF)           ($9,120.00)
        VCT adhesive and sundries                     ($1,280.00)
        VCT installation labor (3,200 SF x $1.75/SF)  ($5,600.00)
        VCT base — lobby perimeter (~320 LF x $2.10)    ($672.00)
                                                     -----------
        Subtotal — deleted VCT direct cost           ($16,672.00)

        Sub OH&P credit at 15%                        ($2,500.80)
        GC markup credit at 10% (per contract)        ($1,917.28)
                                                     -----------
        TOTAL VCT CREDIT                             ($21,090.08)

    B.  RESTOCKING / CANCELLATION CHARGE (Capitol Flooring)

        VCT materials are ordered and in transit.
        Manufacturer restocking fee (15%)               $1,368.00
        Capitol Flooring admin / handling                 $450.00
                                                     -----------
        Subtotal — restocking direct cost               $1,818.00

        GC markup at 10%                                  $181.80
                                                     -----------
        TOTAL RESTOCKING CHARGE                         $1,999.80

    C.  ADDED WORK — POLISHED CONCRETE (Lone Star Concrete Polishing)

        Concrete surface prep and patching
          (3,200 SF x $1.25/SF)                         $4,000.00
        Crack and joint repair / fill
          (allowance)                                   $1,800.00
        Diamond grinding — progressive grits
          (3,200 SF x $4.50/SF)                        $14,400.00
        Concrete densifier application
          (3,200 SF x $0.65/SF)                         $2,080.00
        Final polish to 800-grit
          (included in grinding above)                      INCL
        Stain guard / sealer
          (3,200 SF x $0.45/SF)                         $1,440.00
        Polished concrete base — lobby perimeter
          (~320 LF x $8.50/LF)                          $2,720.00
        Mobilization / demobilization                    $1,200.00
                                                     -----------
        Subtotal — polished concrete direct cost       $27,640.00

        Sub OH&P at 15%                                 $4,146.00
        GC markup at 10% (per contract)                 $3,178.60
                                                     -----------
        TOTAL POLISHED CONCRETE ADDITION               $34,964.60

    D.  GC ADDITIONAL COSTS (Self-Performed)

        Schedule coordination / re-sequencing
          (PM + Super — 8 hrs combined x $85/hr)          $680.00
        Floor protection during remaining construction
          (ram board, 3,200 SF x $0.75/SF)              $2,400.00
        Additional cleaning — polished concrete
          requires clean jobsite conditions                $800.00
                                                     -----------
        Subtotal — GC direct cost                       $3,880.00

        GC OH&P at 15% (self-performed per contract)      $582.00
                                                     -----------
        TOTAL GC ADDITIONAL COSTS                       $4,462.00

    E.  BOND PREMIUM

        Bond premium on net change
          ($20,336.32 x 0.75%)                            $152.52

============================================================================

    COST SUMMARY

    Credit — deleted VCT work                       ($21,090.08)
    Restocking / cancellation charge                   $1,999.80
    Added — polished concrete                         $34,964.60
    GC additional costs                                $4,462.00
    Bond premium                                         $152.52
                                                     -----------
    NET CHANGE ORDER AMOUNT                           $20,488.84

============================================================================

4.  SCHEDULE IMPACT

    Impact:  ADD 7 CALENDAR DAYS to contract completion

    Justification:

    a. VCT installation was scheduled for 5 working days (May 4-8, 2026)
       on the current CPM schedule as Activity ID FLR-110.

    b. Polished concrete requires the following sequence:
       - Surface prep and crack repair:        2 days
       - Diamond grinding (3 progressive passes): 4 days
       - Densifier application and cure:       1 day (24-hr cure)
       - Final polish and sealer:              2 days
       - Sealer cure before traffic:           1 day (24-hr cure)
       TOTAL: 10 working days (May 4-15, 2026)

    c. Net additional duration: 10 days - 5 days = 5 working days
       = 7 calendar days including one weekend.

    d. Floor protection must be installed before other trades can access
       the lobby. This is on the critical path — the lobby is the primary
       access route for material deliveries to the south wing.

    e. Contractor will provide a CPM schedule fragment per Section 00 72 00
       upon approval of this Change Order.

    REVISED SUBSTANTIAL COMPLETION DATE:
      Current:  August 15, 2026
      Proposed: August 22, 2026

============================================================================

5.  CONTRACT SUMMARY

    Original Contract Sum                          $8,450,000.00
    Net change by previously approved COs
      (CO-001 through CO-006)                        $127,500.00
    Current Contract Sum                           $8,577,500.00
    Net change this CO (CO-007)                       $20,488.84
                                                  ---------------
    NEW CONTRACT SUM (including CO-007)            $8,597,988.84

    Original Substantial Completion Date:  August 15, 2026
    Adjusted Substantial Completion Date:  August 22, 2026
    (7 calendar days added per this CO)

============================================================================

6.  ATTACHMENTS

    A.  Lone Star Concrete Polishing — Proposal #LSP-2026-0412
        (3,200 SF polished concrete, 800-grit finish)
    B.  Capitol Flooring — Credit Proposal and Restocking Invoice
    C.  CPM Schedule Fragment — Activity FLR-110 revision
    D.  Floor plan markup showing affected area (A-101, highlighted)

============================================================================

7.  SIGNATURES

    SUBMITTED BY CONTRACTOR:

    ________________________________    Date: _______________
    [Name], Project Manager
    Pinnacle Construction Group


    APPROVED BY OWNER:

    ________________________________    Date: _______________
    [Name], Owner's Representative
    Riverside Development Partners LLC


    APPROVED BY ARCHITECT:

    ________________________________    Date: _______________
    [Name], Architect of Record
    [Firm Name]

============================================================================

    This Change Order becomes effective upon execution by all parties.
    Work shall not proceed until written approval is received.

============================================================================
```

---

## WHAT THE PLUGIN DID

1. **Generated a complete, ready-to-send CO document** -- formatted to industry standards with all required sections: description, reason, itemized costs, schedule impact, contract summary, and signature blocks.

2. **Calculated the VCT credit correctly** -- backed out all VCT costs (material, labor, adhesive, base) and applied the contracted markup rates in reverse, ensuring the owner receives the full credit including OH&P.

3. **Included the restocking charge** -- identified that materials were already ordered and applied the standard 15% manufacturer restocking fee, a detail that is frequently missed and leads to disputes later.

4. **Priced the polished concrete addition** -- broke down the polished concrete scope into individual line items (surface prep, grinding, densifier, sealer, base) with per-SF and per-LF unit costs at current market rates.

5. **Applied correct markup structure per the contract** -- used 15% OH&P for GC self-performed work and 10% for subcontractor work as specified in the GMP agreement, preventing markup disputes.

6. **Identified hidden GC costs** -- added schedule coordination time, floor protection (ram board), and additional cleaning that are real costs often absorbed by the GC when not captured in the CO.

7. **Calculated schedule impact with justification** -- compared the VCT installation duration (5 days) against the polished concrete sequence (10 days), accounted for cure times, and identified the critical path impact through the lobby access route.

8. **Updated the running contract total** -- carried forward the original contract sum, all prior approved COs, and the net change to show the new contract sum of $8,597,988.84.

9. **Used proper contract language** -- referenced AIA A133-2019, Section 7.3 for owner-directed changes, included the CPM fragment requirement per Section 00 72 00, and maintained formal language appropriate for a contract document that could become a claim exhibit.
