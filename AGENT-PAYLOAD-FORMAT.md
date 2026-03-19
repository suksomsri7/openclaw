# AGENT-PAYLOAD-FORMAT.md

รูปแบบมาตรฐานสำหรับการส่งงานเข้า agent และรับงานกลับ

เป้าหมาย:
- ให้ทุก agent รับงานในรูปแบบเดียวกัน
- ลดความกำกวม
- ทำให้ dispatcher ส่งงานและรับผลกลับได้ง่าย

---

## 1) Inbound Payload (ส่งเข้า agent)

```json
{
  "cardId": "string",
  "cardTitle": "string",
  "boardTitle": "string",
  "stage": "Intake | Strategy | Research | Synthesis | Drafting | Review | Approval | Done | Blocked",
  "targetAgent": "Kraken | Shark | Whale | Manta | SeaTurtle | Octopus",
  "objective": "string",
  "platform": "string",
  "audience": "string",
  "coreAngle": "string",
  "requiredOutput": "string",
  "description": "string",
  "relevantSubtasks": ["string"],
  "latestHandoffComment": "string",
  "references": ["string"],
  "constraints": ["string"],
  "returnTo": "Kraken | Shark | Dispatcher"
}
```

---

## 2) Minimum Fields Required

อย่างน้อยต้องมี:
- `cardId`
- `cardTitle`
- `stage`
- `targetAgent`
- `objective`
- `description`
- `returnTo`

ถ้าขาด fields เหล่านี้ agent ควรตอบกลับว่า `needs_clarification`

---

## 3) Agent-Specific Expectations

### Kraken รับ payload เพื่อ
- รับ brief
- จัด priority
- สรุป blocker / approval
- ส่งกลับ Boss-level summary

### Shark รับ payload เพื่อ
- ตั้ง strategy
- เลือก angle / hook
- ตัดสิน routing ไป specialist
- synthesis และ review

### Whale รับ payload เพื่อ
- ทำ destination / marine / seasonality / wonder research

### Manta รับ payload เพื่อ
- ทำ value / objections / CTA / conversion research

### SeaTurtle รับ payload เพื่อ
- ทำ factual / technical / safety validation

### Octopus รับ payload เพื่อ
- ทำ draft / adaptation / creative execution

---

## 4) Outbound Payload (agent ส่งกลับ)

```json
{
  "cardId": "string",
  "agent": "Kraken | Shark | Whale | Manta | SeaTurtle | Octopus",
  "status": "done | needs_clarification | blocked",
  "summary": "string",
  "deliverable": "string",
  "recommendedNextStage": "string",
  "recommendedComment": "string",
  "returnTo": "Kraken | Shark | Dispatcher",
  "blockers": ["string"],
  "notes": ["string"]
}
```

---

## 5) Meaning of Outbound Fields

### `status`
- `done` = งานส่วนนี้เสร็จแล้ว
- `needs_clarification` = ข้อมูลไม่พอ ต้องถามกลับ
- `blocked` = ไปต่อไม่ได้เพราะติด blocker

### `summary`
สรุปสั้น ๆ ว่าทำอะไรไปแล้ว

### `deliverable`
ผลลัพธ์หลักที่ส่งกลับ เช่น:
- research findings
- draft content
- review notes
- final summary

### `recommendedNextStage`
stage ที่ควรไปต่อหลังจากนี้

### `recommendedComment`
comment ที่ dispatcher หรือ lead agent สามารถเอาไปใส่ใน card ได้เลย

### `returnTo`
บอกว่า output นี้ควรส่งกลับหาใคร

---

## 6) Example Payloads

### Example: Shark receives strategy task
```json
{
  "cardId": "cmm123",
  "cardTitle": "Content | ความปลอดภัยการดำน้ำ | มือใหม่ควรรู้อะไรก่อนลงน้ำ",
  "boardTitle": "Content Master",
  "stage": "Strategy",
  "targetAgent": "Shark",
  "objective": "ทำโพสต์ความรู้เรื่องความปลอดภัยการดำน้ำสำหรับมือใหม่",
  "platform": "Facebook",
  "audience": "นักดำน้ำมือใหม่",
  "coreAngle": "ความปลอดภัยการดำน้ำไม่ใช่เรื่องน่ากลัว แต่เป็นเรื่องที่ควรรู้ให้ถูกต้องตั้งแต่ต้น",
  "requiredOutput": "Facebook educational post 1 ชิ้น",
  "description": "...",
  "relevantSubtasks": [
    "Shark: กำหนด angle / hook",
    "Shark: ตัดสิน research needs"
  ],
  "latestHandoffComment": "ส่งต่อให้ Shark...",
  "references": [],
  "constraints": [
    "factual accuracy สำคัญที่สุด",
    "ภาษาต้องง่ายสำหรับมือใหม่"
  ],
  "returnTo": "Kraken"
}
```

### Example: SeaTurtle returns validation
```json
{
  "cardId": "cmm123",
  "agent": "SeaTurtle",
  "status": "done",
  "summary": "ตรวจ factual และ safety framing ของหัวข้อความปลอดภัยการดำน้ำแล้ว",
  "deliverable": "- ควรเน้นว่ามือใหม่ต้องเรียนกับผู้สอนที่เหมาะสม\n- ห้ามใช้ wording ที่ชวนให้ฝืนความเจ็บปวด\n- ควรหลีกเลี่ยง claim เกินจริงด้านความปลอดภัย",
  "recommendedNextStage": "Synthesis",
  "recommendedComment": "SeaTurtle validation complete. Safe framing points and cautions added.",
  "returnTo": "Shark",
  "blockers": [],
  "notes": []
}
```

---

## 7) Agent Behavior Rules

เมื่อ agent ได้ payload:
- ถ้าข้อมูลครบ → ทำงานและส่ง outbound payload กลับ
- ถ้าข้อมูลไม่ครบ → ส่ง `needs_clarification`
- ถ้างานติด blocker → ส่ง `blocked`
- ห้ามเดา facts ที่ไม่มีใน brief/references ถ้าเป็นเรื่อง factual หรือ safety

---

## 8) Recommended Comment Template from Outbound Payload

Dispatcher สามารถใช้ `recommendedComment` ไปใส่ใน card ได้ตรง ๆ

ถ้าไม่มี field นี้ ให้ใช้ template:

```md
[{agent}] {summary}
Next stage: {recommendedNextStage}
Return to: {returnTo}
```

---

## 9) Shortcut

ถ้าจำสั้นที่สุด:

- Inbound = card context + stage + objective + subtasks + handoff
- Outbound = status + summary + deliverable + next stage + return target
