# KANBAN-SOP.md

คู่มือมาตรฐานการใช้งาน Kanban สำหรับ workflow content ของทีม Kraken

---

## วัตถุประสงค์

เอกสารนี้ใช้เป็นมาตรฐานกลางเพื่อให้:
- Kraken ไม่ต้องทำงานคนเดียว
- ทุก agent รู้ว่าถึงคิวตัวเองเมื่อไร
- card เดียวสามารถวิ่งตาม workflow ได้ชัดเจน
- Boss เปิด card แล้วเห็นสถานะ, owner, blocker, และ next step ได้ทันที

---

## หลักการหลัก

- 1 card = 1 งานหลัก
- `Description` = brief กลางของงาน
- `Stage` = สถานะปัจจุบันของงาน
- `Subtasks` = deliverables ของ stage ปัจจุบัน
- `Comments` = handoff / blocker / approval notes

---

## Workflow มาตรฐาน

ใช้ stage เหล่านี้เป็น default สำหรับงาน content:

1. `Intake`
2. `Strategy`
3. `Research`
4. `Synthesis`
5. `Drafting`
6. `Review`
7. `Approval`
8. `Done`
9. `Blocked`

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

## บทบาทของแต่ละ Agent

- **Kraken** = รับ brief, จัดลำดับงาน, ส่งต่อ, สรุปให้ Boss, คุม flow ทั้งระบบ
- **Shark** = strategy, synthesis, review, ตัดสินใจเรื่อง research needs และคุณภาพของงาน
- **Whale** = destination / marine life / seasonality / ocean storytelling research
- **Manta** = value proposition / objections / conversion / CTA logic research
- **SeaTurtle** = factual / technical / safety validation
- **Octopus** = drafting / creative execution / platform adaptation

---

## Description Template

ใช้ template นี้ในช่อง `Description` ของทุก card:

```md
## เป้าหมายงาน
[งานนี้ต้องการผลลัพธ์อะไร]

## ช่องทาง
[Facebook / TikTok / IG / Lemon8 / Website / etc.]

## กลุ่มเป้าหมาย
[ลูกค้ากลุ่มไหน]

## มุมหลัก / Hook
[ประเด็นหลักที่ต้องการสื่อ]

## ผลลัพธ์ที่ต้องการ
[caption / script / article / carousel / short video brief / etc.]

## ข้อมูลสำคัญ / ข้อจำกัด
- ...
- ...
- ...

## Reference
- ...
- ...

## เงื่อนไขว่างานเสร็จ
- ข้อมูลถูกต้อง
- Draft พร้อมใช้
- ผ่าน Shark review
- พร้อมส่ง Boss approve
```

---

## Stage Presets

### 1) Intake

#### Subtasks
```md
- [ ] Kraken: รับ brief จาก Boss
- [ ] Kraken: ระบุเป้าหมายงาน
- [ ] Kraken: ระบุช่องทาง
- [ ] Kraken: ระบุกลุ่มเป้าหมาย
- [ ] Kraken: ระบุผลลัพธ์ที่ต้องการ
- [ ] Kraken: กำหนด deadline และ priority
- [ ] Kraken: ส่งต่องานให้ Shark
```

#### Comment preset
```md
ส่งต่อให้ Shark:
ช่วยกำหนด strategy, hook, audience fit และตัดสินว่าต้องใช้ Whale / Manta / SeaTurtle หรือไม่
```

---

### 2) Strategy

#### Subtasks
```md
- [ ] Shark: วิเคราะห์ความเหมาะสมกับกลุ่มเป้าหมาย
- [ ] Shark: กำหนดมุมหลักและ Hook
- [ ] Shark: กำหนดลำดับสารสำคัญ
- [ ] Shark: ตัดสินว่าต้องใช้ research จากใครบ้าง
- [ ] Shark: สร้าง subtasks ให้ specialist ที่เกี่ยวข้อง
- [ ] Shark: ระบุผลลัพธ์สุดท้ายที่ต้องการ
```

#### Comment preset
```md
กำหนดกลยุทธ์เรียบร้อยแล้ว
มอบหมายงาน research ให้ผู้เกี่ยวข้อง กรุณาทำ subtasks และส่งผลกลับมาให้ Shark
```

---

### 3) Research

#### Whale subtasks
```md
- [ ] Whale: สรุปข้อมูล destination / marine life / seasonality
- [ ] Whale: แนบแหล่งอ้างอิงที่ใช้
- [ ] Whale: เสนอ emotional angle หรือ storytelling angle
```

#### Manta subtasks
```md
- [ ] Manta: สรุปคุณค่าที่ลูกค้าจะได้รับ
- [ ] Manta: ระบุข้อกังวลหรือข้อโต้แย้งที่ลูกค้าอาจมี
- [ ] Manta: เสนอ conversion angle และแนวทาง CTA
```

#### SeaTurtle subtasks
```md
- [ ] SeaTurtle: ตรวจสอบความถูกต้องของข้อมูล
- [ ] SeaTurtle: ตรวจสอบด้าน technical / safety
- [ ] SeaTurtle: แจ้งประเด็นที่เสี่ยงหรือไม่ชัดเจน
```

#### Combined research preset
```md
- [ ] Whale: สรุปข้อมูล destination / marine / seasonality พร้อมแหล่งอ้างอิง
- [ ] Manta: สรุป value proposition, objections และ conversion angle
- [ ] SeaTurtle: ตรวจสอบ factual, technical และ safety claims
- [ ] Shark: ยืนยันว่าได้รับ research ครบแล้ว
```

#### Comment preset
```md
มอบหมายงาน research แล้ว
กรุณาทำ subtasks ของตัวเองและส่งผลสรุปแบบกระชับกลับมาให้ Shark เพื่อสังเคราะห์ต่อ
```

---

### 4) Synthesis

#### Subtasks
```md
- [ ] Shark: ทบทวนข้อมูลจาก research ทั้งหมด
- [ ] Shark: คัดเลือก insight ที่จะใช้จริง
- [ ] Shark: กำหนดลำดับสารสำคัญ
- [ ] Shark: กำหนด tone และโครงสร้าง
- [ ] Shark: สร้าง creative brief สำหรับ Octopus
- [ ] Shark: ส่งต่องานให้ Octopus
```

#### Comment preset
```md
ส่งต่อให้ Octopus:
ใช้ synthesis ที่อนุมัติแล้วเพื่อทำ draft ที่พร้อมใช้ตาม platform พร้อม Hook ที่ชัดและ CTA ที่เหมาะสม
```

---

### 5) Drafting

#### Subtasks
```md
- [ ] Octopus: ทำ first draft
- [ ] Octopus: ปรับ draft ให้เหมาะกับ platform
- [ ] Octopus: ใส่ CTA
- [ ] Octopus: ทำ alternate hook เพิ่มหากจำเป็น
- [ ] Octopus: ส่ง draft กลับให้ Shark review
```

#### Comment preset
```md
ทำ draft เสร็จแล้ว
ส่งกลับให้ Shark เพื่อตรวจเชิงกลยุทธ์และคุณภาพ
```

---

### 6) Review

#### Subtasks
```md
- [ ] Shark: ตรวจความเหมาะสมกับกลุ่มเป้าหมาย
- [ ] Shark: ตรวจความชัดของกลยุทธ์
- [ ] Shark: ตรวจความคมของ Hook
- [ ] Shark: ตรวจ conversion logic
- [ ] Shark: ตรวจ tone / brand fit
- [ ] Shark: อนุมัติ final draft หรือส่งกลับแก้ไข
```

#### Comment preset — revision
```md
ขอแก้ไขเพิ่มเติม:
กรุณาปรับตาม review note ของ Shark แล้วส่งกลับมาอีกครั้ง
```

#### Comment preset — approved
```md
ผ่านการ review จาก Shark แล้ว
พร้อมให้ Kraken สรุปและส่ง Boss อนุมัติ
```

---

### 7) Approval

#### Subtasks
```md
- [ ] Kraken: สรุป final deliverable
- [ ] Kraken: ระบุ version ที่แนะนำ
- [ ] Kraken: ระบุจุดที่ Boss ต้องตัดสินใจ
- [ ] Kraken: ส่งให้ Boss review / approve
```

#### Comment preset
```md
พร้อมให้ Boss review
แนบ version ที่แนะนำ พร้อมเหตุผลและจุดที่ต้องการอนุมัติ
```

#### Boss Review Description rule
เมื่อ card เข้าสู่ `Approval` / Boss Review ให้เติม block นี้ใน `Description` เสมอ:
```md
## Content
หัวข้อ
[หัวข้อคอนเทนต์]

เนื้อหา
[เนื้อหาที่พร้อมให้ Boss ตรวจ]
```

---

### 8) Done

#### Subtasks
```md
- [ ] Kraken: แนบ final approved version
- [ ] Kraken: ปิด card
- [ ] Kraken: บันทึก insight ที่ใช้ซ้ำได้หากมี
```

#### Comment preset
```md
งานเสร็จสมบูรณ์และได้รับอนุมัติแล้ว
แนบ final version เรียบร้อย
```

---

### 9) Blocked

#### Subtasks
```md
- [ ] Owner: ระบุ blocker ให้ชัดเจน
- [ ] Owner: ระบุสิ่งที่ต้องการเพื่อปลดล็อก
- [ ] Owner: tag คนที่เกี่ยวข้อง
- [ ] Owner: อัปเดต timeline ใหม่ถ้าจำเป็น
```

#### Comment preset
```md
Blocked:
[ปัญหาที่ทำให้งานไปต่อไม่ได้]

สิ่งที่ต้องการเพื่อปลดล็อก:
[การตัดสินใจ / ข้อมูล / ไฟล์ / approval]
```

---

## กฎการเปลี่ยน Stage

ทุกครั้งที่เปลี่ยน stage ต้องทำ 3 อย่างพร้อมกัน:

1. เปลี่ยน `Stage`
2. ปิด subtasks เก่าที่เสร็จแล้ว และเปิด subtasks ใหม่ให้ตรงกับ stage ปัจจุบัน
3. ใส่ `Comment` handoff / blocker / approval อย่างน้อย 1 อัน

นี่คือกฎหลักที่สุดของระบบนี้

---

## กฎของ Subtasks

- 1 subtask = 1 deliverable
- ต้องระบุให้ชัดว่าใครทำอะไร
- หลีกเลี่ยงคำกว้าง ๆ เช่น `research`, `review`, `write`

### ตัวอย่างที่ดี
- `Whale: Provide seasonality insights with sources`
- `Manta: Define objections and CTA angle`
- `SeaTurtle: Validate safety claims`
- `Octopus: Create Facebook caption draft`
- `Shark: Approve final draft`
- `Kraken: Summarize for Boss approval`

---

## กรณีใช้งานจริงแบบเร็ว

### เปิด card ใหม่
1. วาง Description Template
2. ตั้ง Stage = `Intake`
3. วาง Intake subtasks
4. Kraken กรอก brief แล้ว handoff ให้ Shark

### ย้าย stage
1. เปลี่ยน Stage
2. ใช้ preset subtasks ของ stage ใหม่
3. ใส่ comment handoff

---

## Operational Shortcut

ถ้าต้องจำสั้นที่สุด ให้จำแค่นี้:

> ทุกครั้งที่เปลี่ยน stage ต้องเปลี่ยน 3 อย่าง: Stage, Subtasks, Comment

---

## สถานะเริ่มต้นที่แนะนำ

ถ้าไม่แน่ใจว่า card ใหม่ควรเริ่มตรงไหน ให้เริ่มที่:
- Stage = `Intake`
- Owner = `Kraken`
- Description = ใช้ template กลาง
- Subtasks = Intake preset

---

## หมายเหตุ

เอกสารนี้เป็นมาตรฐานเริ่มต้นของ workflow content ปัจจุบัน และควรอัปเดตเมื่อทีมมีการเปลี่ยน role, stage, หรือรูปแบบ handoff ในอนาคต
