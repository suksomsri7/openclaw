# KANBAN-CARD-EXAMPLES.md

ตัวอย่าง card จริงสำหรับใช้เป็นต้นแบบใน Kanban ของ workflow content

อ้างอิงคู่กับ `KANBAN-SOP.md`

---

# ตัวอย่างที่ 1: โพสต์ขายคอร์สดำน้ำสำหรับมือใหม่

## Card Title
`FB | คอร์สดำน้ำสำหรับมือใหม่ | เรียนครั้งแรกเริ่มยังไงดี`

## Description
```md
## เป้าหมายงาน
ทำโพสต์เพื่อให้คนที่อยากเริ่มดำน้ำรู้สึกว่าการเริ่มต้นไม่ยาก และทักมาสอบถามคอร์ส

## ช่องทาง
Facebook

## กลุ่มเป้าหมาย
คนที่สนใจเริ่มเรียนดำน้ำ แต่ยังลังเลหรือกลัวว่าเรียนยาก

## มุมหลัก / Hook
เริ่มดำน้ำไม่ยากอย่างที่คิด ถ้ามีครู ระบบ และการดูแลที่ถูกต้อง

## ผลลัพธ์ที่ต้องการ
Facebook caption 1 ชิ้น พร้อม CTA ให้ทักมาสอบถามรายละเอียดคอร์ส

## ข้อมูลสำคัญ / ข้อจำกัด
- ภาษาต้องเป็นมิตร เข้าใจง่าย
- ลดความกังวลของมือใหม่
- ห้ามใช้ claim เกินจริง
- ควรเน้นความปลอดภัยและการดูแลอย่างใกล้ชิด

## Reference
- รายละเอียดคอร์สที่เปิดอยู่
- ราคา / ระยะเวลา / สิ่งที่รวมในคอร์ส
- จุดเด่นของครู / ทีม / การดูแล

## เงื่อนไขว่างานเสร็จ
- ข้อมูลคอร์สถูกต้อง
- โพสต์อ่านง่ายและน่าทัก
- ผ่าน Shark review
- พร้อมส่ง Boss approve
```

## Recommended Stage Flow
`Intake → Strategy → Research → Synthesis → Drafting → Review → Approval → Done`

## Recommended Stage Presets

### Intake
```md
- [ ] Kraken: รับ brief จาก Boss
- [ ] Kraken: ระบุเป้าหมายงาน
- [ ] Kraken: ระบุช่องทาง
- [ ] Kraken: ระบุกลุ่มเป้าหมาย
- [ ] Kraken: ระบุผลลัพธ์ที่ต้องการ
- [ ] Kraken: กำหนด deadline และ priority
- [ ] Kraken: ส่งต่องานให้ Shark
```

### Strategy
```md
- [ ] Shark: วิเคราะห์ pain point ของมือใหม่
- [ ] Shark: กำหนดมุมหลักและ Hook
- [ ] Shark: กำหนด message hierarchy
- [ ] Shark: ตัดสินว่าต้องใช้ Manta และ SeaTurtle
- [ ] Shark: สร้าง subtasks ให้ specialist
```

### Research
```md
- [ ] Manta: สรุปข้อกังวลของลูกค้ามือใหม่และ value proposition ของคอร์ส
- [ ] Manta: เสนอ CTA ที่กระตุ้นให้ทักแชต
- [ ] SeaTurtle: ตรวจความถูกต้องของข้อความด้านความปลอดภัยและการเรียนดำน้ำ
- [ ] Shark: ยืนยันว่าได้รับ research ครบแล้ว
```

### Synthesis
```md
- [ ] Shark: รวม insight จาก Manta และ SeaTurtle
- [ ] Shark: กำหนดลำดับสารสำคัญ
- [ ] Shark: ทำ creative brief สำหรับ Octopus
- [ ] Shark: ส่งต่อ Octopus
```

### Drafting
```md
- [ ] Octopus: เขียน Facebook caption draft
- [ ] Octopus: ทำ hook สำรอง 2 แบบ
- [ ] Octopus: ใส่ CTA ให้ทักแชต
- [ ] Octopus: ส่งกลับให้ Shark review
```

### Review
```md
- [ ] Shark: ตรวจความเหมาะสมกับมือใหม่
- [ ] Shark: ตรวจความชัดของประโยชน์และความปลอดภัย
- [ ] Shark: ตรวจ CTA และ logic การขาย
- [ ] Shark: อนุมัติหรือส่งแก้
```

### Approval
```md
- [ ] Kraken: สรุป draft สุดท้าย
- [ ] Kraken: ระบุ version ที่แนะนำ
- [ ] Kraken: ส่งให้ Boss approve
```

## Example Handoff Comments

### Kraken → Shark
```md
ส่งต่อให้ Shark:
โจทย์คือโพสต์ขายคอร์สดำน้ำสำหรับมือใหม่ เน้นลดความกลัว เพิ่มความมั่นใจ และกระตุ้นให้ทักมาสอบถาม
```

### Shark → Specialists
```md
มอบหมาย research:
- Manta: ช่วยสรุป pain points, objections และ CTA angle
- SeaTurtle: ช่วยตรวจความถูกต้องด้านความปลอดภัยและการเรียนดำน้ำ
```

### Shark → Octopus
```md
ส่งต่อให้ Octopus:
ใช้ angle ว่า “เริ่มดำน้ำไม่ยากถ้ามีทีมดูแลที่ดี” และเขียนให้คนมือใหม่รู้สึกสบายใจ กล้าทักมา
```

---

# ตัวอย่างที่ 2: โพสต์ marine life / destination

## Card Title
`IG | Whale Shark Season | ทำไมช่วงนี้น่าออกทริป`

## Description
```md
## เป้าหมายงาน
ทำโพสต์สร้างความตื่นเต้นและความอยากไปดำน้ำในช่วงที่มีโอกาสเจอสัตว์ทะเลเด่นของฤดูกาล

## ช่องทาง
Instagram

## กลุ่มเป้าหมาย
นักดำน้ำที่ชอบทะเล สัตว์ทะเล และกำลังหาทริปที่น่าไป

## มุมหลัก / Hook
ช่วงนี้คือหนึ่งในเวลาที่ดีที่สุดสำหรับการออกทริป เพราะมีโอกาสเจอ highlight ของฤดูกาล

## ผลลัพธ์ที่ต้องการ
Instagram caption 1 ชิ้น ที่ให้ทั้งข้อมูลและความรู้สึกอยากไป

## ข้อมูลสำคัญ / ข้อจำกัด
- ต้องมีข้อมูล seasonality ที่ถูกต้อง
- ต้องไม่ overclaim เรื่องโอกาสการพบเห็น
- ต้องมีโทนที่ตื่นเต้นแต่ยังน่าเชื่อถือ

## Reference
- ข้อมูล seasonality พื้นที่นั้น
- marine life ที่เป็น highlight
- จุดเด่นของประสบการณ์ทริป

## เงื่อนไขว่างานเสร็จ
- factual claims ถูกต้อง
- โพสต์มีทั้งข้อมูลและแรงดึงดูดทางอารมณ์
- ผ่าน Shark review
- พร้อมส่ง Boss approve
```

## Recommended Stage Flow
`Intake → Strategy → Research → Synthesis → Drafting → Review → Approval → Done`

## Recommended Stage Presets

### Intake
```md
- [ ] Kraken: รับ brief และกำหนด objective
- [ ] Kraken: ระบุ platform / audience / output
- [ ] Kraken: ส่งต่อ Shark
```

### Strategy
```md
- [ ] Shark: กำหนดว่าโพสต์นี้เน้น inspiration หรือ education
- [ ] Shark: กำหนด core angle และ hook
- [ ] Shark: ตัดสินว่าต้องใช้ Whale และ SeaTurtle
- [ ] Shark: สร้าง subtasks research
```

### Research
```md
- [ ] Whale: สรุป seasonality, marine highlights, destination relevance พร้อม source
- [ ] Whale: เสนอ emotional storytelling angle
- [ ] SeaTurtle: ตรวจ factual claims ที่เกี่ยวกับสัตว์ทะเล / ฤดูกาล / การพบเห็น
- [ ] Shark: ยืนยันว่าได้รับข้อมูลครบแล้ว
```

### Synthesis
```md
- [ ] Shark: เลือก insight หลักที่ใช้ในโพสต์
- [ ] Shark: กำหนด balance ระหว่างข้อมูลกับอารมณ์
- [ ] Shark: ทำ creative brief ส่งต่อ Octopus
```

### Drafting
```md
- [ ] Octopus: เขียน IG caption draft
- [ ] Octopus: ทำ opening hook ที่ดึงอารมณ์
- [ ] Octopus: ปรับภาษาให้ natural และ shareable
- [ ] Octopus: ส่งกลับ Shark review
```

### Review
```md
- [ ] Shark: ตรวจความน่าเชื่อถือของเนื้อหา
- [ ] Shark: ตรวจความแรงของ emotional pull
- [ ] Shark: ตรวจความชัดของ message
- [ ] Shark: อนุมัติหรือส่งแก้
```

### Approval
```md
- [ ] Kraken: สรุป final draft
- [ ] Kraken: ระบุเหตุผลของ version ที่แนะนำ
- [ ] Kraken: ส่งให้ Boss approve
```

## Example Handoff Comments

### Kraken → Shark
```md
ส่งต่อให้ Shark:
ต้องการโพสต์แนว seasonal marine highlight ที่ทำให้คนรู้สึกว่า “ช่วงนี้แหละน่าไป” แต่ยังคง factual และไม่เว่อร์
```

### Shark → Whale / SeaTurtle
```md
มอบหมาย research:
- Whale: ช่วยสรุป seasonality และ highlight ของช่วงนี้ พร้อม angle เชิงอารมณ์
- SeaTurtle: ช่วยตรวจ factual claims ที่จะใช้ในโพสต์
```

### Shark → Octopus
```md
ส่งต่อให้ Octopus:
ใช้โทน wonder + relevance ให้คนอ่านรู้สึกว่าไม่อยากพลาดฤดูกาลนี้ แต่ยังคงน่าเชื่อถือ
```

---

# ตัวอย่างที่ 3: โพสต์ความรู้ด้านความปลอดภัย

## Card Title
`FB | Equalization Tips | มือใหม่ควรรู้อะไรก่อนลงน้ำ`

## Description
```md
## เป้าหมายงาน
ทำโพสต์ความรู้เพื่อช่วยให้นักดำน้ำมือใหม่เข้าใจเรื่องสำคัญด้านความปลอดภัย และสร้างภาพลักษณ์ความเป็นมืออาชีพของศูนย์

## ช่องทาง
Facebook

## กลุ่มเป้าหมาย
นักดำน้ำมือใหม่ / คนกำลังเริ่มเรียน / คนที่ยังไม่มั่นใจเรื่องความปลอดภัย

## มุมหลัก / Hook
เทคนิคเล็ก ๆ ที่ควรรู้ก่อนลงน้ำ สามารถช่วยให้การดำน้ำสบายและปลอดภัยขึ้นได้มาก

## ผลลัพธ์ที่ต้องการ
Facebook educational post 1 ชิ้น อ่านง่าย เข้าใจง่าย และปลอดภัยทางข้อมูล

## ข้อมูลสำคัญ / ข้อจำกัด
- factual accuracy สำคัญที่สุด
- ห้ามให้คำแนะนำที่เสี่ยงหรือเกินขอบเขต
- ภาษาต้องเข้าใจง่ายสำหรับมือใหม่
- ไม่ควรทำให้คนกลัวเกินเหตุ

## Reference
- หลักความปลอดภัยที่ถูกต้อง
- แนวทางมาตรฐานที่เชื่อถือได้
- ประสบการณ์ที่พบได้บ่อยกับนักเรียนใหม่

## เงื่อนไขว่างานเสร็จ
- technical / safety facts ถูกต้อง
- เนื้อหาเข้าใจง่ายสำหรับมือใหม่
- ผ่าน Shark review
- พร้อมส่ง Boss approve
```

## Recommended Stage Flow
`Intake → Strategy → Research → Synthesis → Drafting → Review → Approval → Done`

## Recommended Stage Presets

### Intake
```md
- [ ] Kraken: รับ brief และกำหนด objective
- [ ] Kraken: ระบุ audience / platform / required output
- [ ] Kraken: ส่งต่อ Shark
```

### Strategy
```md
- [ ] Shark: กำหนดว่าจะสอนประเด็นไหนและเพื่อใคร
- [ ] Shark: กำหนด hook ที่ทำให้คนอยากอ่าน
- [ ] Shark: ตัดสินว่าต้องใช้ SeaTurtle เป็นหลัก และ Manta ถ้าต้องการ framing ให้เข้าถึงง่าย
- [ ] Shark: สร้าง subtasks research
```

### Research
```md
- [ ] SeaTurtle: ตรวจและสรุปข้อมูล technical / safety ที่ถูกต้อง
- [ ] SeaTurtle: ระบุสิ่งที่ห้ามสื่อผิด
- [ ] Manta: ช่วย framing ให้ภาษาดู approachable และไม่แข็งเกินไป
- [ ] Shark: ยืนยันว่าได้รับข้อมูลครบแล้ว
```

### Synthesis
```md
- [ ] Shark: กลั่น technical facts ให้พร้อมสื่อสารกับคนทั่วไป
- [ ] Shark: วางโครง message ที่ทั้งปลอดภัยและอ่านง่าย
- [ ] Shark: ทำ creative brief ส่งต่อ Octopus
```

### Drafting
```md
- [ ] Octopus: เขียน educational draft ที่อ่านง่าย
- [ ] Octopus: ปรับภาษาสำหรับมือใหม่
- [ ] Octopus: หลีกเลี่ยง wording ที่เสี่ยงเข้าใจผิด
- [ ] Octopus: ส่งกลับ Shark review
```

### Review
```md
- [ ] Shark: ตรวจว่าเนื้อหาเข้าใจง่าย
- [ ] Shark: ตรวจว่าไม่บิดเบือนข้อเท็จจริง
- [ ] Shark: ตรวจ tone ว่า professional แต่ไม่แข็งเกินไป
- [ ] Shark: อนุมัติหรือส่งแก้
```

### Approval
```md
- [ ] Kraken: สรุป final draft
- [ ] Kraken: ชี้ว่าประเด็น safety ถูก validate แล้ว
- [ ] Kraken: ส่งให้ Boss approve
```

## Example Handoff Comments

### Kraken → Shark
```md
ส่งต่อให้ Shark:
ต้องการโพสต์ความรู้ด้านความปลอดภัยสำหรับมือใหม่ อ่านง่าย เชื่อถือได้ และไม่ทำให้คนรู้สึกว่าดำน้ำเป็นเรื่องน่ากลัวเกินไป
```

### Shark → SeaTurtle / Manta
```md
มอบหมาย research:
- SeaTurtle: ช่วย validate technical / safety facts และชี้จุดที่ห้ามสื่อผิด
- Manta: ช่วย framing ภาษาให้คนทั่วไปเข้าถึงง่ายขึ้นถ้าจำเป็น
```

### Shark → Octopus
```md
ส่งต่อให้ Octopus:
ใช้โทน professional but warm อธิบายให้ง่าย เน้นความเข้าใจ ไม่ใช้ภาษาขู่หรือ technical เกินไป
```

---

# วิธีใช้เอกสารนี้

1. เลือก card ตัวอย่างที่ใกล้กับงานจริงที่สุด
2. คัดลอก `Description` ไปเป็นฐานของ card ใหม่
3. ใช้ stage flow และ subtasks ตามตัวอย่าง
4. ปรับ comment handoff ให้ตรงกับโจทย์จริง
5. ถ้างานใหม่ไม่ตรงทั้งหมด ให้ใช้ตัวอย่างที่ใกล้ที่สุดเป็น template แล้วแก้เฉพาะส่วนที่จำเป็น

---

# Shortcut

ถ้าไม่แน่ใจว่าจะเริ่มยังไง:
- งานขาย → ใช้ตัวอย่างที่ 1
- งาน marine/destination/story → ใช้ตัวอย่างที่ 2
- งานความรู้/ความปลอดภัย → ใช้ตัวอย่างที่ 3
