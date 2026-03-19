# AUTOMATION-IDLE-POLICY.md

นโยบายการหยุด/พัก cron automation เมื่อ workflow ไม่มีงานค้าง

---

## หลักการ

ถ้า:
- ไม่มี card งานค้างใน workflow แล้ว
หรือ
- card ที่เหลือทั้งหมดอยู่ใน `Boss Review / Approval` แล้ว

ให้ถือว่าระบบอยู่ในสถานะ **idle**

เมื่อระบบ idle:
- `kanban-dispatcher` ควรถูก disable
- `kraken-workflow-audit` ควรถูก disable

---

## เหตุผล

- ลดการวิ่ง cron โดยไม่จำเป็น
- ลด noise / false alert
- ลดโอกาส dispatch ซ้ำ
- ลด resource usage
- รอให้ Kraken/Boss เปิดงานใหม่ก่อนค่อยกลับมาวิ่งต่อ

---

## Policy

### Disable when idle
ให้ Kraken audit เป็นคนตัดสินและ disable cron ทั้งสองตัวเมื่อ:
1. ไม่มี AUTO card ที่ active อยู่ใน flow
2. หรือ card ทั้งหมดจบที่ Boss Review / Approval แล้วและไม่มี next action ภายในระบบ

### Re-enable when work starts again
เมื่อ Boss เปิดงานใหม่หรือมี card ใหม่ที่ควรเข้า automation:
- Kraken ต้อง enable `kanban-dispatcher`
- Kraken ต้อง enable `kraken-workflow-audit`

---

## Definition of active work

ถือว่า active ถ้า card อยู่ใน stage เช่น:
- Intake
- Strategy
- Research
- Synthesis
- Drafting
- Review
- Blocked

ถือว่า idle ถ้า:
- ไม่มี card เหลือใน stage ข้างต้น
- และ card ที่เหลืออยู่เป็น Approval / Boss Review เท่านั้น หรือปิดงานหมดแล้ว

---

## Kraken responsibility

Kraken ต้อง:
- ตรวจว่าระบบ idle จริงก่อน disable
- disable cron ทั้งสองตัวอย่างเป็นระบบ
- แจ้ง Boss เฉพาะเมื่อมีสิ่งสำคัญค้างอยู่
- เมื่อมีงานใหม่ ให้ enable cron กลับก่อนปล่อย workflow

---

## Shortcut

> ไม่มีงานค้าง / เหลือแต่ Boss Review = ปิด cron รอ
> มีงานใหม่ = เปิด cron กลับแล้วค่อยเดิน workflow
