# DISPATCHER-SPEC.md

สเปกสำหรับตัวกลางที่ใช้ dispatch งานจาก Kanban ไปยัง agent ที่เกี่ยวข้อง

เป้าหมาย:
- ให้ agent รู้ว่าเมื่อไรถึงคิวตัวเอง
- ให้ Kraken ไม่ต้องคอยส่งงานเองทุกครั้ง
- ให้ card ใน Kanban ขยับตาม workflow จริง

---

## 1) บทบาทของ Dispatcher

Dispatcher คือระบบ/worker/orchestrator ที่ทำหน้าที่:
- อ่านสถานะ card จาก Kanban
- ตรวจว่า card อยู่ stage ไหน
- ตัดสินว่า next agent คือใคร
- ส่ง payload ไปยัง agent ที่เกี่ยวข้อง
- รับผลกลับจาก agent
- อัปเดต card / comment / subtasks ตามผลลัพธ์

---

## 2) Trigger Sources

Dispatcher ควรเริ่มทำงานเมื่อเกิดเหตุการณ์ต่อไปนี้:

### A. Card Created
ใช้เมื่อ Kraken เปิด card ใหม่
- default route → Kraken / Shark flow

### B. Stage Changed
ใช้เมื่อ card ถูกเปลี่ยน stage
- route ไป owner ของ stage ใหม่

### C. Handoff Comment Added
ใช้เมื่อมี comment ลักษณะ handoff เช่น
- "ส่งต่อให้ Shark"
- "มอบหมาย research"
- "ส่งต่อให้ Octopus"

### D. Subtasks Updated
ใช้เมื่อ subtasks ของ stage ใหม่ถูกสร้างครบ
- ใช้ยืนยันว่า card พร้อมถูก dispatch

---

## 3) Dispatch Rule หลัก

### Stage → Agent Mapping
- `Intake` → `Kraken`
- `Strategy` → `Shark`
- `Research` → `Whale` / `Manta` / `SeaTurtle` / `Shark`
- `Synthesis` → `Shark`
- `Drafting` → `Octopus`
- `Review` → `Shark`
- `Approval` → `Kraken`
- `Done` → no dispatch
- `Blocked` → no automatic dispatch, escalate only

---

## 4) Routing Logic ภายใน Stage

### Stage = Research
Dispatcher ต้องอ่าน subtasks หรือ handoff comment เพิ่ม เพื่อรู้ว่าควร route ไปหาใคร

#### ถ้า subtasks มีคำว่า:
- `Whale:` → route Whale
- `Manta:` → route Manta
- `SeaTurtle:` → route SeaTurtle

#### ถ้ามีหลาย specialist พร้อมกัน
- อนุญาต dispatch แบบขนาน
- แต่ผลต้องถูกส่งกลับหา `Shark` เสมอ

### Stage = Drafting
- route Octopus
- ต้องแนบ synthesis / creative brief ล่าสุด

### Stage = Review
- route Shark
- ต้องแนบ draft ล่าสุด + review context

---

## 5) Minimum Dispatch Conditions

Dispatcher ต้องไม่ส่งงานต่อ ถ้า card ยังขาดสิ่งเหล่านี้:
- ไม่มี Description
- ไม่มี Stage
- ไม่มี subtasks ที่สัมพันธ์กับ stage
- ไม่มี handoff context เพียงพอ

ถ้าขาด ให้:
- ใส่ comment แจ้งว่า card ยังไม่พร้อม dispatch
- หรือ route กลับ Kraken / Shark เพื่อแก้ brief

---

## 6) Output ที่ Dispatcher คาดหวังจาก Agent

เมื่อ agent ทำงานเสร็จ ต้องส่งผลกลับอย่างน้อย:
- `status`: done / needs_clarification / blocked
- `summary`: สรุปสิ่งที่ทำ
- `deliverable`: เนื้อหาหลัก / findings / draft / review note
- `recommendedNextStage`
- `recommendedComment`
- `returnTo`

---

## 7) หลัง Agent ส่งผลกลับ

Dispatcher ต้องทำอย่างใดอย่างหนึ่ง:

### กรณี done
- เพิ่ม comment ลง card
- อัปเดต subtasks ที่เสร็จ
- ถ้าพร้อมไปต่อ ให้เปลี่ยน stage หรือแจ้ง next owner

### กรณี needs_clarification
- เพิ่ม comment ขอข้อมูลเพิ่ม
- route กลับ lead agent หรือ Kraken

### กรณี blocked
- เปลี่ยน stage เป็น `Blocked` หรือใส่ blocker comment
- แจ้ง Kraken

---

## 8) Escalation Rules

Dispatcher ควรส่งกลับหา Kraken เมื่อ:
- งานติด blocker สำคัญ
- ไม่มีข้อมูลพอเดินต่อ
- มี conflict ระหว่าง outputs ของหลาย agent
- งานพร้อมให้ Boss approve

---

## 9) Sub-Agent Rules

Dispatcher ต้องเคารพนโยบายนี้:
- Shark, Whale, Manta, SeaTurtle, Octopus สามารถใช้ sub-agent ได้
- 1 sub-agent = 1 card
- sub-agent รายงานกลับหา lead agent เท่านั้น
- Kraken เห็นเฉพาะ lead-level status

---

## 10) Suggested Execution Modes

### Mode A — Manual Dispatch by Kraken
- Kraken อ่าน card แล้วส่งงานต่อเอง
- ใช้ได้ทันที
- เหมาะกับช่วงเริ่มต้น

### Mode B — Polling Worker
- worker เช็ก Kanban ทุก X นาที
- dispatch ตาม stage/subtasks
- ทำได้ง่ายสุดในเชิง implementation

### Mode C — Event-Driven Dispatcher
- Kanban event → dispatcher → agent → update card
- ดีที่สุดระยะยาว
- ต้อง setup เพิ่ม

---

## 11) Recommended MVP

สำหรับเวอร์ชันแรก แนะนำแบบนี้:
- ใช้ `Stage` เป็น signal หลัก
- ใช้ `Subtasks` เป็นตัวบอก specialist routing
- ใช้ `Comments` เป็น handoff context
- ใช้ polling worker ก่อน
- ให้ agent ส่งกลับใน payload format มาตรฐาน

---

## 12) Pseudo Flow

```text
1. Kraken creates/updates card
2. Dispatcher detects card is ready
3. Dispatcher reads Stage + Subtasks + latest Handoff Comment
4. Dispatcher chooses target agent
5. Dispatcher sends payload to target agent
6. Agent returns structured result
7. Dispatcher writes comment / updates card
8. If next stage is ready, dispatch again
```

---

## 13) Success Criteria

ถือว่า dispatcher ใช้งานได้ เมื่อ:
- card ใหม่ถูกส่งเข้า Shark ได้อัตโนมัติ
- research card ถูก route ไป specialist ที่ถูกต้อง
- draft ถูกส่งเข้า Octopus ได้พร้อม brief
- review ถูกส่งกลับ Shark ได้
- blocker ถูกส่งเข้า Kraken ได้

---

## 14) Shortcut

ถ้าจำสั้นที่สุด:

> Dispatcher = อ่าน Stage + Subtasks + Comment แล้วส่งงานให้ agent ที่ถูกคน พร้อมรับผลกลับมาอัปเดต card
