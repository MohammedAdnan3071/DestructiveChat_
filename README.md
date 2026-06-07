# 💥 DestructiveChat

**DestructiveChat** is a private, real‑time chat application where every conversation is designed to self‑destruct. Create a secure room, share the link with one other person, and chat privately with no permanent records.

After a room is created, it has a **10‑minute lifespan**. Once it expires – or if any participant chooses to destroy it – the room and all its messages are permanently deleted from the database. There is no recovery.

This is not your typical chat app. It’s built for ephemeral, one‑to‑one conversations where privacy is the priority.

---

## ✨ Core Features

| Feature | Description |
|---------|-------------|
| **🔒 Private, one‑to‑one rooms** | Each room can have exactly two participants. No group chats, no overcrowding. |
| **⏱️ Auto self‑destruction** | Every room expires 10 minutes after creation. All data is wiped automatically. |
| **💣 Manual destruction** | Any participant can instantly delete the entire room and its message history. |
| **🎭 Anonymous identity** | No login, no sign‑up. Every visitor gets a randomly generated, persistent username stored locally. |
| **⚡ Real‑time messaging** | Messages appear instantly using WebSockets powered by Upstash Realtime. |
| **📋 Copyable room links** | One click to copy the room URL and share it with your chat partner. |
| **🕒 Live destruction timer** | See exactly how many minutes and seconds remain before the room self‑destructs. |
| **🎨 Terminal‑inspired UI** | Clean, dark, minimal interface with a developer‑friendly aesthetic. |
| **🔐 Two‑layer authentication** | Middleware + API‑level token verification ensures only authorised users can access a room. |

---

## 👥 How Two People Can Chat Together

Using DestructiveChat is simple. No accounts, no sign‑up, no email verification.

### Step by step

1. **Person A opens the website** – Go to the live URL or `http://localhost:3000` if running locally.

2. **Person A creates a room** – Click the **“CREATE SECURE ROOM”** button. A unique room ID is generated, and you are instantly taken to the chat room page.

3. **Person A copies the room link** – At the top of the chat page, you’ll see the room ID and a **“COPY”** button. Click it to copy the full URL (e.g., `https://destructive-chat.vercel.app/room/abc123`). Alternatively, you can manually copy the room ID and append it to the base URL.

4. **Person A shares the link** – Send the copied link to Person B via any messenger, email, or text.

5. **Person B opens the link** – Person B clicks the link or pastes it into their browser. They are automatically assigned a random username and granted access **only if the room is not already full** (maximum two participants). If the room is empty, Person B becomes the second participant. If it already has two people, they will see a “room full” error.

6. **Start messaging** – Both users can now type messages. They appear in real‑time on both screens. The self‑destruct timer starts counting down from 10 minutes.

> **Testing locally?** If both people are on the same computer, Person B should open the link in a **different browser** (e.g., Chrome vs Firefox) or use an **incognito/private window**. Otherwise, cookies and username will conflict, and the room may not behave correctly.

### What happens next?

- As long as both participants stay in the room, they can exchange messages freely.
- If someone leaves and tries to re‑enter, the middleware will recognize their existing token (stored in the cookie) and let them back in – as long as the room still exists and is not expired.
- Once the 10‑minute timer hits zero, **everyone is automatically redirected to the home page** and the room is gone forever.
- Either participant can click the **“DESTROY NOW”** button to instantly delete the room and all messages – the other person will be redirected immediately.

---

## 🧠 How It Works (For Developers & Curious Users)

1. **A visitor opens the app** – They are assigned a random username (stored in `localStorage`). No login required.

2. **They click “CREATE SECURE ROOM”** – The frontend calls `POST /api/room/create`, which generates a unique 21‑character room ID using `nanoid`. The room metadata is stored in Upstash Redis with a 10‑minute TTL.

3. **The creator shares the room link** – The URL contains the room ID (e.g. `https://app.com/room/abc123`). The second person opens it.

4. **Room access control** – When someone visits `/room/[roomId]`, Next.js middleware checks:
   - Does the room exist in Redis?
   - Is the room already full (two participants)?
   - If the room is empty, the visitor becomes participant #1. If exactly one person is inside, the second visitor is allowed in. Once two are present, new visitors are rejected with “room full”.

   The middleware also sets an HTTP‑only authentication cookie (`x-auth-token`) that is required for all subsequent API calls.

5. **Real‑time chat begins** – Both participants see incoming messages instantly via WebSockets (Upstash Realtime). All messages are stored in a Redis list (`messages:${roomId}`) with the same TTL as the room.

6. **The timer ticks down** – The frontend fetches the remaining TTL from `GET /api/room/ttl?roomId=...` and updates a live countdown.

7. **The room ends** – Either:
   - **Time expires** – Redis automatically deletes the room metadata, messages, and participant list. The frontend redirects to the home page with `?destroyed=true`.
   - **Someone clicks “DESTROY NOW”** – A `DELETE /api/room?roomId=...` call clears all Redis keys for that room and broadcasts a `chat.destroy` WebSocket event, forcing all connected clients to redirect.

8. **All traces are gone** – No database backups, no logs of message content, no user accounts. The conversation never existed.

---

## 🧰 Tech Stack (Full)

| Category | Technology |
|----------|------------|
| Framework | Next.js 16 (App Router, Turbopack) |
| Backend API | Elysia.js – type‑safe, fast, middleware‑ready |
| Database | Upstash Redis (serverless, low latency) |
| Real‑time | Upstash Realtime (WebSockets) |
| State Management & Fetching | TanStack Query (useQuery, useMutation) |
| Language | TypeScript – strict mode, full type safety |
| Styling | Tailwind CSS + custom scrollbar |
| Date Handling | date‑fns |
| Unique IDs | nanoid |
| HTTP Client | Native fetch (no extra dependencies) |

---

## 📦 Getting Started

### Prerequisites

- Node.js 20 or higher
- An [Upstash](https://upstash.com) account (free tier is fine)

### Installation

```bash
# Clone the repo
git clone https://github.com/MohammedAdnan3071/DestructiveChat_.git
cd DestructiveChat_

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local   # (or create manually)
