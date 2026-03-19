# SUBAGENT-POLICY.md

นโยบายการใช้ sub-agent สำหรับ workflow content

---

## ใครสามารถสร้าง sub-agent ได้

อนุญาตให้ agent เหล่านี้สร้าง sub-agent ได้:
- Shark
- SeaTurtle
- Whale
- Manta
- Octopus

**Kraken ไม่ควรใช้ sub-agent เป็นตัวทำงานย่อยหลัก**
Kraken ควรทำหน้าที่ manager / controller / summarizer เป็นหลัก

---

## กติกาหลัก

1. **1 sub-agent = 1 card**
2. sub-agent ต้องรายงานกลับหา lead agent ของตัวเองเท่านั้น
3. lead agent ต้อง review output ก่อนส่งต่อ
4. Kraken เห็นเฉพาะ lead-level status, blockers, และ approvals
5. ถ้างานยังทำได้ด้วย agent หลักตัวเดียว ไม่จำเป็นต้อง spawn sub-agent

---

## เมื่อไรควรใช้ sub-agent

ใช้เมื่อ:
- มีหลาย card พร้อมกัน
- งาน research แยกเป็นก้อนชัดเจน
- งาน draft หลายชิ้นต้องเดินขนานกัน
- ต้องการ scale โดยไม่ให้ lead agent ติดคอขวด

ไม่จำเป็นต้องใช้เมื่อ:
- งานเล็กมาก
- งานยังไม่ชัด
- ยังไม่มี brief ที่ชัดพอ
- ใช้ agent หลักทำเองเร็วกว่า

---

## ตัวอย่างการใช้

### Shark
- ใช้ sub-agent เมื่อต้องคุมหลาย card พร้อมกัน
- 1 sub-agent ดูแล 1 card strategy/review chain

### Whale / Manta / SeaTurtle
- ใช้ sub-agent เมื่อต้องทำ research หลาย card พร้อมกัน
- 1 sub-agent ต่อ 1 card หรือ 1 research packet

### Octopus
- ใช้ sub-agent เมื่อต้อง draft หลาย card พร้อมกัน
- 1 sub-agent ต่อ 1 card/draft

---

## Rule การส่งงานกลับ

sub-agent ต้องส่งกลับแบบมีโครงเสมอ:
- objective
- findings / output
- cautions / blockers
- next recommended action
- return to lead agent

---

## Shortcut

ถ้าไม่แน่ใจว่าจะใช้ sub-agent ไหม ให้ถามตัวเอง 2 ข้อ:
1. งานนี้แยกเป็นก้อนอิสระได้ไหม
2. ถ้าไม่แยก จะทำให้ lead agent ช้าไหม

ถ้าใช่ทั้ง 2 ข้อ → ใช้ sub-agent ได้
