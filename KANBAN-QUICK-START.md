# KANBAN-QUICK-START.md

คู่มือเริ่มงานเร็วสำหรับ workflow content

ใช้เมื่อ:
- เปิด card ใหม่
- ไม่แน่ใจว่าเริ่มตรงไหน
- ต้องการเช็กว่าใครควรรับงานต่อ

---

## ถ้าจะเริ่ม card ใหม่ ให้ทำ 4 อย่างนี้

1. สร้าง card = 1 งานหลัก
2. วาง `Description Template`
3. ตั้ง `Stage = Intake`
4. ใส่ `Intake Subtasks`

---

## Description Template

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

## Stage Flow มาตรฐาน

`Intake → Strategy → Research → Synthesis → Drafting → Review → Approval → Done`

ใช้ `Blocked` เฉพาะตอนที่งานไปต่อไม่ได้จริง

---

## ใครทำอะไร

- **Kraken** = รับ brief / ตั้งงาน / ส่งต่อ / สรุปให้ Boss
- **Shark** = strategy / synthesis / review
- **Whale** = destination / marine / seasonality research
- **Manta** = value / objections / CTA / conversion research
- **SeaTurtle** = factual / technical / safety validation
- **Octopus** = draft / creative / platform adaptation

---

## Stage Preset แบบเร็ว

### Intake
```md
- [ ] Kraken: รับ brief
- [ ] Kraken: ระบุ objective / platform / audience
- [ ] Kraken: ระบุ output / deadline / priority
- [ ] Kraken: ส่งต่อ Shark
```

### Strategy
```md
- [ ] Shark: กำหนด angle / hook
- [ ] Shark: กำหนด audience fit
- [ ] Shark: ตัดสิน research needs
- [ ] Shark: สร้าง subtasks ให้ specialist
```

### Research
```md
- [ ] Whale: หา destination / marine / seasonality insight
- [ ] Manta: หา value / objections / CTA logic
- [ ] SeaTurtle: ตรวจ factual / technical / safety
- [ ] Shark: ยืนยันว่า research ครบ
```

### Synthesis
```md
- [ ] Shark: รวม insight
- [ ] Shark: คัด key message
- [ ] Shark: ทำ creative brief
- [ ] Shark: ส่งต่อ Octopus
```

### Drafting
```md
- [ ] Octopus: ทำ draft
- [ ] Octopus: ปรับตาม platform
- [ ] Octopus: ใส่ CTA
- [ ] Octopus: ส่งกลับ Shark
```

### Review
```md
- [ ] Shark: ตรวจ hook / fit / logic / tone
- [ ] Shark: อนุมัติหรือส่งแก้
```

### Approval
```md
- [ ] Kraken: สรุป final
- [ ] Kraken: ระบุ version ที่แนะนำ
- [ ] Kraken: ส่ง Boss approve
```

### Done
```md
- [ ] Kraken: แนบ final version
- [ ] Kraken: ปิดงาน
```

### Blocked
```md
- [ ] Owner: ระบุ blocker
- [ ] Owner: ระบุสิ่งที่ต้องการเพื่อปลดล็อก
- [ ] Owner: อัปเดต timeline
```

---

## Comment Preset แบบเร็ว

### Kraken → Shark
```md
ส่งต่อให้ Shark:
ช่วยกำหนด strategy, hook, audience fit และตัดสินว่าต้องใช้ specialist คนไหนบ้าง
```

### Shark → Specialists
```md
มอบหมาย research:
กรุณาทำ subtasks ของตัวเองและส่ง findings แบบกระชับกลับมาให้ Shark
```

### Shark → Octopus
```md
ส่งต่อให้ Octopus:
ใช้ brief นี้เพื่อทำ draft ที่พร้อมใช้ตาม platform พร้อม hook และ CTA ที่ชัดเจน
```

### Octopus → Shark
```md
Draft เสร็จแล้ว
ส่งกลับให้ Shark review
```

### Shark → Kraken
```md
ผ่าน review แล้ว
พร้อมให้ Kraken สรุปและส่ง Boss อนุมัติ
```

### Kraken → Boss
```md
พร้อม review
แนบ version ที่แนะนำ พร้อมเหตุผลและจุดที่ต้องการอนุมัติ
```

### Blocked
```md
Blocked:
[ปัญหา]

ต้องการเพื่อปลดล็อก:
[ข้อมูล / decision / asset / approval]
```

---

## กฎที่สำคัญที่สุด

> ทุกครั้งที่เปลี่ยน stage ต้องเปลี่ยน 3 อย่างพร้อมกัน:
> 1. Stage
> 2. Subtasks
> 3. Comment

ถ้าทำครบ 3 อย่างนี้ ทุก agent จะรู้ว่าถึงคิวตัวเองหรือยัง

---

## ถ้าไม่แน่ใจว่าจะใช้ตัวอย่างไหน

- งานขาย → ดู `KANBAN-CARD-EXAMPLES.md` ตัวอย่างที่ 1
- งาน marine/destination/story → ดูตัวอย่างที่ 2
- งานความรู้/ความปลอดภัย → ดูตัวอย่างที่ 3

---

## เอกสารที่เกี่ยวข้อง

- `KANBAN-SOP.md` = คู่มือเต็ม
- `KANBAN-CARD-EXAMPLES.md` = ตัวอย่าง card จริง
- `KANBAN-QUICK-START.md` = คู่มือเริ่มงานเร็ว
