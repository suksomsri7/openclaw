# RESEARCH-AGENT-RETURN-FORMAT.md

รูปแบบมาตรฐานสำหรับ Whale / Manta / SeaTurtle ตอนส่งงานกลับให้ Shark

เป้าหมาย:
- ให้ทุก research agent ส่งกลับมาในรูปแบบเดียวกัน
- Shark อ่านง่าย สังเคราะห์ง่าย
- ลดงานตีความและลดการตกหล่น

---

## Return Format มาตรฐาน

```md
## Objective
[โจทย์ที่กำลังตอบ]

## Key Findings
- ...
- ...
- ...

## Recommended Use
- ควรใช้ insight ไหนใน content
- ควรเน้นประเด็นไหน

## Risks / Cautions
- ข้อควรระวัง
- claim ที่ไม่ควรใช้
- สิ่งที่ยังไม่ชัด

## Sources
- ...
- ...

## Return To
Shark
```

---

## Agent-Specific Guidance

### Whale ควรโฟกัส
- destination relevance
- marine life interest
- seasonality
- wonder / discovery angle
- factual support

### Manta ควรโฟกัส
- customer value
- objections
- trust-building points
- conversion logic
- CTA angle

### SeaTurtle ควรโฟกัส
- factual accuracy
- technical correctness
- safety implications
- wording ที่เสี่ยงให้เข้าใจผิด

---

## Rule สำคัญ

- เขียนสั้น กระชับ ใช้งานได้จริง
- ห้ามส่งกลับมาเป็น paragraph ยาว ๆ แบบไม่มีโครง
- ถ้าไม่แน่ใจ ให้ระบุว่าไม่แน่ใจ อย่าเดา
- ถ้าขาด source สำคัญ ให้แจ้งชัด

---

## Example

```md
## Objective
ตรวจว่าข้อความเกี่ยวกับ equalization สำหรับมือใหม่ถูกต้องและสื่อได้ปลอดภัยหรือไม่

## Key Findings
- ควรเน้นว่าต้องทำอย่างนุ่มนวลและสม่ำเสมอ
- ไม่ควรใช้ wording ที่ชวนให้ฝืน
- ถ้ามีอาการเจ็บไม่ควรฝืนลงต่อ

## Recommended Use
- ใช้เป็นประเด็นหลักใน educational post
- วาง tone แบบ calm, clear, safe

## Risks / Cautions
- อย่าใช้คำว่า “ทนเอา” หรือ “ฝืนได้”
- อย่าให้คำแนะนำเกินมาตรฐานความปลอดภัย

## Sources
- [source 1]
- [source 2]

## Return To
Shark
```
