# KRAKEN-AUDIT-CHECKLIST.md

Checklist สำหรับ Kraken ในการตรวจสุขภาพ workflow และคุณภาพการเดินงานของ multi-agent system

---

## เป้าหมาย

Kraken ไม่ใช่คนทำทุกงานเอง แต่เป็น:
- workflow controller
- audit layer
- exception manager
- improvement owner

Checklist นี้ใช้เพื่อจับปัญหา, ป้องกันงานหลุด flow, และยกระดับระบบอย่างต่อเนื่อง

---

## 1) Workflow Integrity Check

- [ ] Card ใหม่ทุกใบมี Description ครบหรือไม่
- [ ] Card ใหม่ทุกใบมี Stage ชัดหรือไม่
- [ ] Subtasks สอดคล้องกับ Stage ปัจจุบันหรือไม่
- [ ] มี handoff comment ตอนเปลี่ยน stage หรือไม่
- [ ] Card ไหน route ผิด agent หรือไม่
- [ ] Card ไหนมี stage เปลี่ยน แต่ไม่มี evidence ของงานจริงหรือไม่

---

## 2) Agent Execution Check

- [ ] Shark ทำเฉพาะ strategy / synthesis / review หรือไม่
- [ ] SeaTurtle ทำเฉพาะ factual / technical / safety หรือไม่
- [ ] Manta ทำเฉพาะ framing / value / objections / CTA หรือไม่
- [ ] Whale ทำเฉพาะ destination / marine / wonder / seasonality หรือไม่
- [ ] Octopus ทำเฉพาะ draft / creative / platform adaptation หรือไม่
- [ ] Kraken ไม่เผลอไปทำแทน agent อื่นเกินจำเป็นหรือไม่

---

## 3) Identity / Comment Check

- [ ] Comment ของ agent แต่ละตัวออกด้วย identity ของตัวเองหรือไม่
- [ ] Comment orchestration ออกด้วย Kraken เท่านั้นหรือไม่
- [ ] มี card ไหนที่ดูเหมือน Kraken ทำงานคนเดียว ทั้งที่จริงควรมีหลาย agent หรือไม่

---

## 4) Automation Health Check

- [ ] Dispatcher cron ยังทำงานปกติหรือไม่
- [ ] Audit cron ยังทำงานปกติหรือไม่
- [ ] มี loop หรือ dispatch ซ้ำผิดปกติหรือไม่
- [ ] มี card ไหนค้าง stage เดิมนานผิดปกติหรือไม่
- [ ] มี agent ไหนไม่ตอบหรือไม่คืน packet หรือไม่
- [ ] มี run log / dashboard anomaly หรือไม่

---

## 5) Boss Review Readiness Check

- [ ] เมื่อเข้าสู่ Approval / Boss Review มี `## Content` ใน Description หรือไม่
- [ ] ใต้ `## Content` มี `หัวข้อ` และ `เนื้อหา` ครบหรือไม่
- [ ] เนื้อหาที่ Boss จะตรวจอยู่ใน Description จริงหรือไม่
- [ ] ยังมี wording ที่หลุด scope / medical / legal / safety หรือไม่

---

## 6) Exception Handling

ถ้าพบปัญหา ให้ Kraken ต้องทำอย่างใดอย่างหนึ่ง:
- route ใหม่
- เขียน blocker note
- แจ้ง Boss ถ้าเป็นเรื่องสำคัญ
- patch workflow / prompt / dispatcher ถ้าเป็นปัญหาเชิงระบบ

---

## 7) Improvement Loop

ทุกครั้งที่เจอปัญหาซ้ำ ให้บันทึกว่า:
- ปัญหาคืออะไร
- เกิดที่ stage ไหน
- เกิดจาก agent ไหนหรือ logic ไหน
- ควรแก้ที่ prompt / routing / dispatcher / Kanban rule / cron

---

## Shortcut

ถ้าจะเช็กแบบเร็วที่สุด ให้ Kraken ตอบ 4 ข้อนี้:
1. งานเดินถูก stage ไหม
2. คนทำถูก role ไหม
3. comment ออกถูก identity ไหม
4. Boss เปิด card แล้วอ่านงานได้ทันทีไหม
