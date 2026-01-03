# 🪶 Maarga – A Personal Digital Growth & Diary App

Maarga is a **calm, private, and intentional personal growth dashboard** built for developers and creators. It combines journaling, learning logs, daily tracking, and reflection into a single focused space — without noise or distraction.

This project is designed as a **long-term personal system**, not a social app.

---

## ✨ Core Philosophy

> *Your journey, your pace.*

Maarga is built around:

* Privacy-first design
* Minimal & distraction-free UI
* Daily consistency over vanity metrics
* Personal reflection > public sharing

---

## 🚀 Features

### 🏠 Dashboard

* Daily overview
* Streak tracking
* Focused sections (Reading, Dev, Chess, Sketch)

### 📓 Digital Diary

* Daily diary entries
* Mood tracking per day
* Sections:

  * Today’s Thoughts
  * Ideas / Learnings
  * Closing Thought
* Multi-day diary support
* Book / PDF-style chronological view
* Optional **password lock per date** (planned)

### 🔐 Authentication (In Progress)

* Phone number login
* Secret code verification
* OTP-based authentication flow
* Formik + Yup validation
* Error-aware UI (red borders, clean feedback)

### 🧠 Learning & Logs

* Reading tracker
* Dev learning logs
* Random learning prompts
* Practice API (planned)

---

## 🧩 Tech Stack

**Frontend**

* Next.js (App Router)
* React
* TypeScript
* Tailwind CSS
* React Icons

**Forms & Validation**

* Formik
* Yup

**State & Storage (Planned)**

* LocalStorage / IndexedDB (initial)
* Backend API (future)

---

## 🗂️ Project Structure (Simplified)

```
app/
 ├─ login/            # Authentication pages
 ├─ diary/            # Digital diary
 ├─ reading/          # Reading logs
 ├─ dev/              # Developer logs
 ├─ chess/            # Chess practice
 ├─ sketch/           # Sketch records
 ├─ layout.tsx        # App layout
 └─ page.tsx          # Dashboard

components/
 ├─ Sidebar.tsx
 ├─ Header.tsx
 ├─ Logo.tsx
 └─ common/

utils/
 └─ validation/
```

---

## 🧪 Current Status

* ✅ UI & layout foundation complete
* ✅ Diary writing experience polished
* ✅ Auth UI + validation ready
* 🚧 OTP backend integration pending
* 🚧 Diary persistence & lock feature in progress

---

## 🔒 Privacy & Security

* No public sharing
* No analytics
* Diary content is personal by default
* Planned per-day password lock

---

## 🛣️ Roadmap

* [ ] OTP verification API
* [ ] Persistent diary storage
* [ ] Locked diary entries
* [ ] Export diary as PDF
* [ ] Dark mode
* [ ] Offline-first support

---

## 🧑‍💻 Author

**Bachan Singh**
Frontend Developer (React · Next.js · UI Engineering)

> Building systems that help me think better.

---

## 📜 License

This project is for **personal use and learning**.
Feel free to fork and adapt for your own growth system.

---

🪶 *Maarga is not an app you use.*
🪶 *It’s a space you return to.*
