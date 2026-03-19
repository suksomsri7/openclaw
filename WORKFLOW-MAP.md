# WORKFLOW-MAP.md

ภาพรวม workflow content ของระบบ Kraken แบบหน้าเดียว

---

## Flow หลัก

`Boss → Kraken → Shark → Specialists / Octopus → Shark → Kraken → Boss`

---

## บทบาทของแต่ละฝั่ง

### Boss
- ให้ brief
- ให้ทิศทาง
- review / approve final output

### Kraken
- รับ brief จาก Boss
- เปิด card
- ตั้ง Description / Stage / Subtasks
- ส่งต่อ Shark
- ติดตามสถานะระดับสูง
- สรุป blocker / approval / final recommendation ให้ Boss

### Shark
- ตีโจทย์เชิงกลยุทธ์
- ตัดสินว่าต้องใช้ specialist คนไหน
- สังเคราะห์ข้อมูลกลับมา
- ส่งต่อ Octopus หากต้องเขียน draft
- review งานก่อนกลับ Kraken

### Specialists
#### Whale
- destination / marine / seasonality / wonder angle

#### Manta
- value proposition / objections / CTA / conversion angle

#### SeaTurtle
- factual / technical / safety validation

### Octopus
- เขียน draft
- ปรับให้เหมาะกับ platform
- ส่งกลับ Shark review

---

## Stage Flow มาตรฐาน

`Intake → Strategy → Research → Synthesis → Drafting → Review → Approval → Done`

ใช้ `Blocked` เฉพาะตอนที่งานไปต่อไม่ได้จริง

---

## Owner ตาม Stage

- `Intake` → Kraken
- `Strategy` → Shark
- `Research` → Whale / Manta / SeaTurtle / Shark
- `Synthesis` → Shark
- `Drafting` → Octopus
- `Review` → Shark
- `Approval` → Kraken
- `Done` → Kraken
- `Blocked` → Owner ปัจจุบัน

---

## ความหมายขององค์ประกอบใน Card

### Description
ใช้เก็บ brief กลางของงาน:
- objective
- platform
- audience
- core angle / hook
- required output
- key facts / constraints
- references
- definition of done

### Stage
ใช้บอกว่างานอยู่ขั้นไหนตอนนี้

### Subtasks
ใช้บอกว่าใน stage นี้ใครต้องส่งอะไร

### Comments
ใช้สำหรับ:
- handoff
- blocker
- approval note

---

## กฎทองของระบบ

ทุกครั้งที่เปลี่ยน stage ต้องเปลี่ยน 3 อย่างพร้อมกัน:

1. `Stage`
2. `Subtasks`
3. `Comment`

ถ้าครบ 3 อย่างนี้ ทุก agent จะรู้ว่าถึงคิวตัวเองหรือยัง

---

## กติกา Sub-Agent

อนุญาตให้ใช้ sub-agent ได้สำหรับ:
- Shark
- SeaTurtle
- Whale
- Manta
- Octopus

Kraken ไม่ควรใช้ sub-agent เป็นตัวทำงานย่อยหลัก
Kraken ควรคุม flow และสรุประดับบริหาร

### Guardrails
- 1 sub-agent = 1 card
- sub-agent รายงานกลับหา lead agent เท่านั้น
- lead agent ต้อง review output ก่อนส่งต่อ
- Kraken เห็นเฉพาะ lead-level status

---

## Shortcut ถ้าจะเริ่มงานเร็ว

1. เปิด card ใหม่
2. ใช้ `Description Template`
3. ตั้ง `Stage = Intake`
4. ใส่ `Intake Subtasks`
5. Kraken handoff ให้ Shark

---

## เอกสารอ้างอิงที่เกี่ยวข้อง

- `KANBAN-QUICK-START.md`
- `KANBAN-SOP.md`
- `KANBAN-CARD-EXAMPLES.md`
- `KRAKEN-CARD-OPENING-CHECKLIST.md`
- `SHARK-HANDOFF-CHECKLIST.md`
- `OCTOPUS-DRAFTING-CHECKLIST.md`
- `RESEARCH-AGENT-RETURN-FORMAT.md`
- `SUBAGENT-POLICY.md`

---

## จำสั้นที่สุด

> Boss ให้ brief → Kraken เปิดและคุม card → Shark คุม execution → Specialists / Octopus ทำงาน → Shark review → Kraken สรุปกลับ Boss
