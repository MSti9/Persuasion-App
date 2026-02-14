# Persuasion Gym — Product Requirements Document

## Overview

**Persuasion Gym** is a single-file React (.jsx) training application that teaches persuasion fundamentals through progressive, scenario-based practice. The user is a legislative advocate who is new to persuasion science and wants to internalize foundational principles from three frameworks: Cialdini's 6 Principles of Influence, Chris Voss's Negotiation Techniques, and Aristotle's Rhetorical Triad.

The app uses the built-in Anthropic API (no API key required — the environment provides authentication automatically) for AI-powered coaching in Phases 2 and 3. Phase 1 uses pre-loaded content only.

**Target file:** Single `.jsx` React artifact file.

---

## Technical Stack & Constraints

- **Framework:** React with hooks (useState, useEffect, useReducer, useRef)
- **Styling:** Tailwind CSS core utility classes ONLY (no compiler available — only pre-defined Tailwind classes)
- **Icons:** lucide-react@0.263.1
- **AI Integration:** Anthropic API via `fetch("https://api.anthropic.com/v1/messages", ...)` — NO API key needed, NO authentication headers needed. Always use model `"claude-sonnet-4-20250514"` and `max_tokens: 1000`
- **Persistent Storage:** Use `window.storage` API (NOT localStorage/sessionStorage — those are blocked):
  - `await window.storage.set(key, JSON.stringify(value))` 
  - `await window.storage.get(key)` → returns `{key, value}` or throws if not found
  - `await window.storage.delete(key)`
  - `await window.storage.list(prefix)`
  - Always wrap in try-catch. Keys cannot contain whitespace, slashes, or quotes. Max 200 chars.
- **NO localStorage, NO sessionStorage** — these will cause the app to crash
- **All state management** via React useState/useReducer for session state, window.storage for persistence
- **Single file** — all CSS via Tailwind classes, all JS inline, no separate files

---

## Design System

**Visual Style:** Clean and professional with muted colors and sharp layout.

- **Color Palette:**
  - Background: `bg-slate-50` (main), `bg-white` (cards)
  - Primary accent: `bg-indigo-600` / `text-indigo-600` (buttons, highlights)
  - Secondary accent: `bg-emerald-600` (success/correct), `bg-amber-500` (warning/partial), `bg-rose-500` (incorrect/error)
  - Text: `text-slate-900` (headings), `text-slate-700` (body), `text-slate-500` (secondary)
  - Borders: `border-slate-200`
  - Module-specific accent colors (subtle, used for module headers/badges):
    - Module 1 (Building Trust): `bg-blue-50` / `text-blue-700` / `border-blue-200`
    - Module 2 (Creating Momentum): `bg-violet-50` / `text-violet-700` / `border-violet-200`
    - Module 3 (Leveraging Social Dynamics): `bg-amber-50` / `text-amber-700` / `border-amber-200`
    - Module 4 (Driving Action): `bg-rose-50` / `text-rose-700` / `border-rose-200`

- **Typography:** System font stack (Tailwind defaults). Headings bold. Body text `text-base` (16px).
- **Spacing:** Generous padding (`p-6` on cards), clear visual hierarchy
- **Cards:** `bg-white rounded-xl shadow-sm border border-slate-200 p-6`
- **Buttons:** `px-4 py-2 rounded-lg font-medium transition-colors` with hover states
- **Layout:** Max width `max-w-4xl mx-auto`, responsive but primarily designed for desktop

---

## Information Architecture

### App Structure

```
Landing/Dashboard
├── Progress Overview (stats, strengths/weaknesses)
├── Module 1: Building Trust
│   ├── Phase 1: Identify & Apply (5 scenarios)
│   ├── Phase 2: Craft Your Approach (5 scenarios) 
│   └── Phase 3: Live Scenario (1-2 multi-turn scenarios)
├── Module 2: Creating Momentum
│   ├── Phase 1 (5 scenarios)
│   ├── Phase 2 (5 scenarios)
│   └── Phase 3 (1-2 scenarios)
├── Module 3: Leveraging Social Dynamics
│   ├── Phase 1 (5 scenarios)
│   ├── Phase 2 (5 scenarios)
│   └── Phase 3 (1-2 scenarios)
├── Module 4: Driving Action
│   ├── Phase 1 (5 scenarios)
│   ├── Phase 2 (5 scenarios)
│   └── Phase 3 (1-2 scenarios)
└── Principle Reference Library
```

### Navigation

- **Top bar:** App title "Persuasion Gym" + nav tabs: Dashboard | Modules | Reference
- **Module view:** Shows all 4 modules as cards with progress indicators
- **Phase view:** Within a module, shows 3 phases with lock/unlock status (Phase 2 unlocks after completing 3+ Phase 1 scenarios; Phase 3 unlocks after completing 3+ Phase 2 scenarios)
- **Back navigation:** Always available to return to module list or dashboard

---

## Principle Library (Grouped into Themed Modules)

### Module 1: Building Trust
**Theme:** Establishing credibility and connection before you ask for anything.

| Principle | Source | Core Mechanism |
|-----------|--------|----------------|
| Liking | Cialdini | People say yes to those they like. Similarity, compliments, familiarity, and association all increase liking. |
| Tactical Empathy + Labeling | Voss | Demonstrating understanding of someone's feelings and perspective builds rapport and lowers defenses. Labeling means naming their emotions: "It seems like you're frustrated with..." |
| Ethos (Credibility) | Aristotle | Persuasion through the character/credibility of the speaker. Demonstrated competence, trustworthiness, and goodwill. |

### Module 2: Creating Momentum
**Theme:** Getting people to take small steps that align with where you want them to go.

| Principle | Source | Core Mechanism |
|-----------|--------|----------------|
| Commitment & Consistency | Cialdini | Once people commit to something (especially publicly or in writing), they feel internal pressure to behave consistently with that commitment. Small yeses lead to bigger yeses. |
| Mirroring | Voss | Repeating the last few words someone said. Signals active listening, builds rapport, and encourages them to elaborate — keeping the conversation moving forward. |
| Logos (Logic/Evidence) | Aristotle | Persuasion through logical argument, evidence, data, and reasoning. The substance of your case. |

### Module 3: Leveraging Social Dynamics
**Theme:** Using external validators and strategic questioning to shift what's seen as reasonable.

| Principle | Source | Core Mechanism |
|-----------|--------|----------------|
| Social Proof | Cialdini | People look to what others are doing to determine correct behavior, especially in uncertain situations. "40 states have already passed similar legislation." |
| Authority | Cialdini | People defer to credible experts and legitimate authority figures. Titles, expertise, and institutional backing carry weight. |
| Calibrated Questions | Voss | Open-ended "How" and "What" questions that give the other side the illusion of control while steering the conversation. "How am I supposed to do that?" forces them to solve your problem. |

### Module 4: Driving Action
**Theme:** Creating urgency, emotional resonance, and obligation that moves people from agreement to action.

| Principle | Source | Core Mechanism |
|-----------|--------|----------------|
| Scarcity | Cialdini | Things become more desirable when they're rare or diminishing. Deadlines, limited windows, and exclusive access drive action. |
| Reciprocity | Cialdini | People feel obligated to return favors, gifts, and concessions. Give first, then ask. |
| Pathos (Emotion) | Aristotle | Persuasion through emotional appeal. Stories, vivid language, and appeals to values that move people to feel, not just think. |
| Tactical Silence / Active Listening | Voss | Strategic use of silence after making a point or asking a question. Lets the other person fill the space, often revealing information or making concessions. |

---

## Phase Specifications

### Phase 1: Identify & Apply

**Purpose:** Teach the user to recognize which persuasion principle fits a given situation and understand why.

**Interaction flow:**
1. Display a scenario (2-4 sentences describing a situation)
2. Show 4 response options, each labeled with the principle it uses (e.g., "[Social Proof]" tag on the option)
3. User selects the option they think is most effective for this specific context
4. Reveal result:
   - If correct: Green highlight, show explanation of WHY this principle is strongest here (2-3 sentences)
   - If incorrect: Amber highlight on their choice, green on the correct one, explain why the correct answer is better AND why their choice is weaker in this context
5. Show a "Principle Spotlight" expandable section with a 2-3 sentence explanation of the winning principle
6. "Next Scenario" button

**Scoring:** Track correct/incorrect per principle. Store in persistent storage.

**Content per module:** 5 scenarios × 4 modules = 20 Phase 1 scenarios total.

**Scenario progression within modules:**
- Scenarios 1-2: Generic/everyday (workplace, sales, social situations)
- Scenarios 3-4: Professional/semi-legislative (stakeholder meetings, coalition building)  
- Scenario 5: Directly legislative (committee hearing, legislator meeting)

### Phase 2: Craft Your Approach

**Purpose:** The user writes their own persuasive response and gets AI coaching.

**Interaction flow:**
1. Display a scenario (same format as Phase 1 but slightly more complex — 3-5 sentences with more context)
2. Show which principles from this module are relevant (as reference badges, not answers)
3. User writes their response in a textarea (minimum 2 sentences encouraged)
4. User clicks "Get Coaching"
5. Send to Anthropic API with this system prompt structure:

```
You are a persuasion coach analyzing a student's response to a practice scenario. The student is learning persuasion fundamentals and is relatively new to these concepts.

The relevant principles for this module are: [LIST PRINCIPLES WITH DEFINITIONS]

The scenario was: [SCENARIO TEXT]

The student wrote: [USER'S RESPONSE]

Analyze their response and provide:
1. PRINCIPLES DETECTED: Which persuasion principles (from the module list) did they use? Be specific about where in their response you see each principle at work.
2. EFFECTIVENESS RATING: Rate 1-5 stars with a one-sentence justification.
3. WHAT WORKED: 1-2 specific things they did well (be encouraging and concrete).
4. GROWTH OPPORTUNITY: 1 specific thing they could improve, with an explanation of WHY it would be stronger.
5. ENHANCED VERSION: Rewrite their response incorporating the improvement, keeping their voice and intent. Bold or mark the enhanced portions.

Keep your tone encouraging but substantive. Don't patronize. Be specific, not generic.

Respond in this exact JSON format:
{
  "principles_detected": [{"name": "principle name", "evidence": "quote or description from their response"}],
  "rating": 3,
  "rating_justification": "one sentence",
  "what_worked": ["specific thing 1", "specific thing 2"],
  "growth_opportunity": {"issue": "what to improve", "why": "explanation", "how": "specific suggestion"},
  "enhanced_version": "the rewritten response"
}
```

6. Display the coaching feedback in a structured card layout:
   - Star rating with justification
   - "Principles You Used" with evidence
   - "What Worked" section
   - "Try This" improvement section
   - "Enhanced Version" in a comparison view (their version vs. enhanced)
7. "Try Again" button (lets them rewrite) and "Next Scenario" button

**Scoring:** Store the rating (1-5) per scenario per principle. Calculate running averages.

**Content per module:** 5 scenarios × 4 modules = 20 Phase 2 scenarios total.

**Scenario types:** Same progression as Phase 1 (generic → legislative) but with richer context.

### Phase 3: Live Scenario

**Purpose:** Multi-turn practice where the user navigates a conversation with an AI-played character, with coaching after each exchange.

**Interaction flow:**
1. Display scenario setup: Who you're talking to, what the situation is, what your goal is (4-6 sentences)
2. The AI character speaks first (an opening statement or position)
3. User responds in textarea
4. Two API calls happen:
   - **Character response:** The AI character responds in-character, reacting realistically to what the user said
   - **Coach sidebar:** A coaching analysis appears in a side panel showing what principles the user employed, what worked, and a tip for the next exchange
5. Repeat for 3-4 exchanges total
6. After final exchange, show a "Debrief" summary:
   - Overall effectiveness rating
   - Principles used across the conversation
   - Key moments (best move, missed opportunity)
   - What to practice next

**API prompt for character:**
```
You are playing a character in a persuasion training exercise. Stay in character throughout.

CHARACTER: [Name, role, personality, motivations]
SITUATION: [Context]
THE STUDENT'S GOAL: [What they're trying to achieve]

Important: Be realistic, not a pushover. React naturally to what the student says. If they use effective persuasion, show gradual movement. If they're heavy-handed or miss the mark, push back naturally. Don't break character or mention persuasion principles.

The student just said: [USER MESSAGE]

Previous conversation: [HISTORY]

Respond in character in 2-4 sentences. Be natural and conversational.
```

**API prompt for coach sidebar:**
```
You are a persuasion coach providing real-time feedback during a training exercise. The student is practicing persuasion principles from these frameworks:
- Cialdini: [relevant principles]
- Voss: [relevant principles]  
- Aristotle: [relevant principles]

The scenario is: [CONTEXT]
The conversation so far: [HISTORY]
The student just said: [LATEST MESSAGE]

Provide brief coaching (this appears in a sidebar, keep it concise):
1. PRINCIPLE USED: Which principle(s) did they just employ? (or "None detected")
2. EFFECTIVENESS: One sentence on how well it landed.
3. TIP: One concrete suggestion for their next response.

Respond in JSON:
{
  "principle_used": ["principle name"],
  "effectiveness": "one sentence",
  "tip": "one sentence suggestion"
}
```

**Content per module:** 1-2 live scenarios × 4 modules = 4-8 Phase 3 scenarios total. These are always legislative/advocacy scenarios regardless of module.

---

## Scenario Content

Below are ALL scenarios to be pre-loaded in the app. Each scenario includes the text, the correct answer (for Phase 1), and the principle tags.

### MODULE 1: BUILDING TRUST

#### Phase 1 Scenarios

**1.1 — The New Neighbor (Generic)**
Scenario: "You just moved into a new neighborhood and want to build a good relationship with your next-door neighbor. You've noticed they have a garden similar to one you used to maintain. You run into them while checking the mail."
Options:
- A) [Liking — Similarity] "Hey, I noticed your tomato garden — I used to grow heirloom varieties at my old place. What varieties are you working with this year?"
- B) [Authority] "I'm actually a certified master gardener, so if you ever need advice on your plants, I'd be happy to help."
- C) [Reciprocity] "I baked some extra cookies today — would you like some? I always make too many."
- D) [Social Proof] "I heard from the other neighbors that everyone on this block is really close. I'd love to be part of that."
Correct: A
Explanation: "Similarity is one of the strongest drivers of liking. By finding genuine common ground (gardening) and expressing curiosity rather than showing off expertise, you create a natural connection. Authority (B) feels like bragging in a first interaction. Reciprocity (C) works but feels transactional this early. Social Proof (D) is indirect — you're referencing others rather than building a direct bond."

**1.2 — The Nervous Client (Workplace)**
Scenario: "A client calls you sounding stressed. Their board is pressuring them about a decision, and they're second-guessing a recommendation you already gave them. They say: 'I just don't know if this is the right move. Everyone's questioning it.'"
Options:
- A) [Authority] "I've handled dozens of situations exactly like this. Trust me, the recommendation is sound."
- B) [Tactical Empathy — Labeling] "It sounds like you're feeling a lot of pressure from the board, and that's making this harder than the decision itself."
- C) [Liking — Compliments] "You've always had great instincts — I'm sure you'll make the right call."
- D) [Logos] "Let me walk you through the data again. The numbers clearly support this direction."
Correct: B
Explanation: "When someone is stressed and second-guessing, they don't need more logic or flattery — they need to feel heard first. Labeling their emotion ('it sounds like you're feeling pressure') validates their experience and lowers their defensive wall. Once they feel understood, THEN you can pivot to logic or authority. Leading with data (D) or credentials (A) when someone is emotional will bounce off — Kahneman's System 1 is running the show here, not System 2."

**1.3 — The Skeptical Stakeholder (Professional)**
Scenario: "You're meeting with a business owner who has been publicly critical of your trade association. They agreed to a meeting but opened with: 'I'll be honest, I don't think your organization actually represents people like me.'"
Options:
- A) [Ethos — Goodwill] "I appreciate you saying that directly. I'd rather hear your real concerns than get a polite brush-off. What specifically feels off about how we represent members?"
- B) [Social Proof] "Actually, 85% of our members in your segment renewed this year, so most people in your position see the value."
- C) [Tactical Empathy — Labeling] "It seems like you've had some experiences that made you feel left out of the conversation."
- D) [Authority] "Our leadership team has over 50 years of combined industry experience, and our policy wins speak for themselves."
Correct: A
Explanation: "When someone opens with a direct challenge to your credibility, the instinct is to defend. But Aristotle's concept of ethos includes goodwill — showing you genuinely care about their perspective. By welcoming their criticism and asking them to elaborate, you demonstrate trustworthiness and openness, which is the foundation of credibility. Labeling (C) is solid but slightly deflects from their direct point. Social Proof (B) and Authority (D) are defensive moves that ignore their emotional reality."

**1.4 — The Reluctant Ally (Legislative)**
Scenario: "A state representative privately supports your bill but won't co-sponsor because she's worried about blowback from a powerful interest group. In your meeting, she says: 'I just can't afford to make enemies right now, especially heading into an election year.'"
Options:
- A) [Liking — Similarity] "I completely understand that calculus — I deal with the same kind of pressure when our board members have competing interests. It's a tough spot."
- B) [Scarcity] "The window to get on this bill is closing — if you wait, you'll miss the chance to be an original sponsor."
- C) [Tactical Empathy — Labeling] "It sounds like the political risk feels bigger than the policy upside right now, and you need a way to support this without painting a target on your back."
- D) [Logos] "The polling shows 70% of your district supports this. The political risk is actually lower than you think."
Correct: C
Explanation: "This is a textbook Voss moment. She's told you her real concern (political exposure), and she needs to know you understand the stakes from her perspective — not yours. Labeling her exact dilemma ('the risk feels bigger than the upside') shows you get it, and naming what she actually needs ('a way to support without a target') opens the door for you to offer solutions. Similarity (A) is warm but doesn't advance the conversation. Data (D) dismisses her felt experience. Scarcity (B) adds pressure when she needs relief."

**1.5 — The Hostile Committee Chair (Legislative)**
Scenario: "You're testifying before a committee. The chair, who is skeptical of your bill, interrupts your opening statement and says: 'We've heard all this before from your industry. Why should this time be any different?'"
Options:
- A) [Ethos — Demonstrated Competence] "Fair question, Chair. Since the last hearing, we've incorporated feedback from three of your colleagues' offices and revised the bill to address the concerns raised in the fiscal note. I'd like to walk you through what's different."
- B) [Tactical Empathy — Labeling] "It sounds like previous testimony from our industry hasn't earned a lot of credibility with this committee, and I understand that skepticism."
- C) [Liking — Compliments] "Chair, I have enormous respect for how thoroughly this committee examines legislation. That rigor is exactly why we wanted to come back."
- D) [Reciprocity] "We've spent significant time meeting with your staff and incorporating their input. We'd appreciate the chance to show you the result."
Correct: A
Explanation: "In a hostile public setting, you need ethos through demonstrated competence — not emotional connection (yet). The chair challenged you to prove you're different. Option A directly answers that challenge with concrete evidence of change (incorporated feedback, revised the bill, addressed the fiscal note). This builds credibility through action, not claims. Labeling (B) is good but doesn't answer the challenge. Complimenting (C) can come across as flattery under pressure. Reciprocity (D) implies obligation, which can backfire with a chair who holds the power."

#### Phase 2 Scenarios

**2.1 — The Cold Outreach Email (Generic)**
Scenario: "You need to email someone you've never met — a regional business leader — to ask for a 30-minute meeting. You have one mutual connection (a chamber of commerce director) and you know this person recently gave a talk about workforce development, which connects to an issue your organization is working on. Write the email."
Relevant principles: Liking (find common ground), Ethos (establish credibility), Tactical Empathy (show you understand their world)

**2.2 — The Frustrated Member (Workplace)**
Scenario: "A long-time member of your trade association calls and says they're thinking about not renewing. They feel like the organization only cares about big companies and doesn't represent smaller operators. They say: 'Every time I come to a meeting, it's all about the big guys' problems. Nobody asks what we need.' Write what you would say to them on this phone call."
Relevant principles: Tactical Empathy + Labeling, Liking (similarity/validation), Ethos (goodwill)

**2.3 — The Legislator's Chief of Staff (Professional)**
Scenario: "You have a meeting with a legislator's chief of staff. The legislator is undecided on your bill. The chief of staff is the gatekeeper — if you don't win them over, you'll never get a meeting with the member. The chief of staff opens by saying: 'We've got a lot on our plate this session. Tell me quickly why this should be a priority.' You have about 90 seconds. Write what you would say."
Relevant principles: Ethos (credibility + competence), Liking (rapport), Tactical Empathy (acknowledge their constraints)

**2.4 — The Post-Hearing Follow-Up (Legislative)**
Scenario: "You just testified at a committee hearing. One committee member — Rep. Torres — asked you a tough question during testimony that you answered adequately but not brilliantly. Afterward, her legislative aide approached you and said the Rep appreciated your testimony. Write a follow-up email to Rep. Torres within 24 hours of the hearing."
Relevant principles: Liking (warmth, showing genuine interest), Ethos (demonstrate continued engagement), Labeling (acknowledge the value of her question)

**2.5 — The Coalition Partner Disagreement (Legislative)**
Scenario: "Your coalition partner — another trade association — wants to add an amendment to your bill that you think weakens it. They're threatening to withdraw support if the amendment isn't included. You need to have a call with their executive director. You value the coalition but can't accept the amendment. Write your opening statement for the call (the first 60 seconds of what you'd say)."
Relevant principles: Tactical Empathy (label their position), Ethos (demonstrate good faith), Liking (affirm the relationship)

#### Phase 3 Scenarios

**3.1 — The Undecided Legislator**
Setup: "You're meeting one-on-one with State Rep. Marcus Webb in his office. Rep. Webb is a moderate Democrat in his second term. He's on the committee that will hear your bill. He's generally sympathetic to your industry but cautious about taking positions that could draw opposition. His district has 12 dealerships that employ about 400 people total. Your goal: get him to commit to voting yes in committee."
Character: Rep. Webb — polite, cautious, asks practical questions, worried about unintended consequences, responds well to empathy and concrete constituent impact, resistant to pressure tactics
Opening line (Rep. Webb): "Thanks for coming in. I've read the summary your team sent over. I understand the concept, but I've got a few concerns I want to talk through before I commit to anything."

**3.2 — The Resistant Industry Contact**
Setup: "You're at an industry conference and find yourself in conversation with Dana Chen, the government affairs director for a major manufacturer. Your organization is trying to build a coalition of manufacturers to support your legislation, but Dana's company has been neutral. You have about 10 minutes of casual conversation before the next panel starts. Your goal: get Dana to agree to a follow-up call to discuss the bill."
Character: Dana — professional, guarded, non-committal, expert at deflecting asks, will warm up if she feels respected and not pressured
Opening line (Dana): "Nice to meet you. I've heard about the bill — interesting approach. We've been watching it but haven't really taken a deep look yet."

### MODULE 2: CREATING MOMENTUM

#### Phase 1 Scenarios

**1.1 — The Diet Bet (Generic)**
Scenario: "Your friend wants to lose weight but keeps quitting workout programs. You want to help them stick with it this time. They say: 'I always start strong but lose motivation after two weeks.'"
Options:
- A) [Commitment & Consistency] "What if you posted your goal on social media? Tell people you're committing to 30 days. Once you put it out there, it's harder to quit."
- B) [Social Proof] "My cousin used this program and lost 30 pounds. You should try what worked for her."
- C) [Scarcity] "This gym has a special right now — if you sign up today, the rate locks in."
- D) [Pathos] "Think about how amazing you'll feel at your sister's wedding if you stick with this."
Correct: A
Explanation: "Commitment & Consistency is the engine here. Public commitment creates internal pressure to follow through — people want to be seen as consistent with what they've declared. Cialdini's research shows written and public commitments are far stickier than private ones. Social Proof (B) is motivating but doesn't create personal accountability. Scarcity (C) drives a purchase, not sustained behavior. Emotion (D) fades — commitment mechanisms persist."

**1.2 — The Stalled Negotiation (Workplace)**
Scenario: "You're negotiating a vendor contract. The vendor just made their pitch and quoted a price 20% above your budget. They say: 'That's our standard rate for this scope of work. We believe it reflects the value we bring.' You need to keep the conversation going without accepting or rejecting."
Options:
- A) [Mirroring] "The value you bring?"
- B) [Authority] "Our procurement team has benchmarked this against five other vendors, and this is above market rate."
- C) [Reciprocity] "We've been a loyal client for three years — I'd expect some consideration for that relationship."
- D) [Commitment & Consistency] "Earlier you mentioned wanting a long-term partnership. A price this high makes it hard for us to commit long-term."
Correct: A
Explanation: "Voss's mirroring technique is deceptively powerful here. By repeating 'the value you bring?' you accomplish three things simultaneously: you signal you're listening, you avoid making a counter-argument that triggers defensiveness, and you prompt them to elaborate and justify — which often leads them to soften their position or reveal flexibility. It keeps momentum going without escalating. Commitment/Consistency (D) is strong too, but mirroring is the lower-risk opening move that preserves the relationship while gathering intelligence."

**1.3 — The Incremental Ask (Professional)**
Scenario: "You want a local business owner to testify at a legislative hearing on behalf of your bill. They've never done this before and seem nervous. They say: 'I support what you're doing, but I'm not really the public-speaking type.'"
Options:
- A) [Logos] "Your testimony would be incredibly impactful because the committee wants to hear from real business owners, not just lobbyists."
- B) [Commitment & Consistency] "I understand. Would you be willing to start smaller — just a one-paragraph written statement we could submit to the committee? No speaking required."
- C) [Liking] "Honestly, the fact that you're not a polished public speaker is exactly what makes your voice powerful. Real people resonate."
- D) [Social Proof] "Five other business owners from your area are already signed up. You'd be in good company."
Correct: B
Explanation: "This is the foot-in-the-door technique — a direct application of Commitment & Consistency. By asking for a small, comfortable commitment (a written statement), you get them to act in alignment with their stated support. Once they've taken that step, they've invested and are more likely to agree to larger asks later (maybe even oral testimony). Cialdini's research shows this escalation from small to large commitments is one of the most reliable persuasion patterns. Logos (A) and Liking (C) are motivating but don't solve their stated barrier (fear of public speaking)."

**1.4 — The Wavering Sponsor (Legislative)**
Scenario: "Your bill's sponsor calls you and says: 'I'm hearing from the other side that this bill has problems. They sent me a memo with their concerns. I still support it, but I need to be able to answer these objections. Send me your point-by-point rebuttal.'"
Options:
- A) [Logos] "Absolutely — I'll have a detailed rebuttal document on your desk by tomorrow morning with data addressing each point."
- B) [Mirroring] "'Problems' — what kind of problems are they raising?"
- C) [Authority] "Chair, we've had three constitutional law professors review this bill. It's solid."
- D) [Commitment & Consistency] "You've been the champion of this issue since day one. Your constituents are counting on your leadership here."
Correct: A
Explanation: "When a sponsor asks for ammunition, give them ammunition. This is a Logos moment — they need the substance to defend the position they've already committed to. The request is specific ('point-by-point rebuttal') and time-sensitive. Mirroring (B) would be useful if you needed more information, but the sponsor has already told you exactly what they need. Commitment/Consistency (D) feels like pressure when they're asking for help. Authority (C) doesn't address the specific objections. Sometimes the best persuasion is simply delivering excellent substance on time."

**1.5 — The Amendment Negotiation (Legislative)**
Scenario: "An opposition legislator offers to support your bill if you accept an amendment that narrows the scope. She says: 'I could get behind the concept if we limited it to new market entrants only. That's a reasonable compromise.' You need to explore this without committing."
Options:
- A) [Reciprocity] "We've already made concessions in committee. I think it's time for the other side to give a little."
- B) [Mirroring] "Limited to new market entrants only?"
- C) [Logos] "The economic analysis shows the bill needs full scope to achieve its intended impact."
- D) [Scarcity] "We need to move on this now — the session clock is ticking and this may be our only window."
Correct: B
Explanation: "This is another perfect mirroring situation. The legislator has made a specific offer, and you need more information before responding. By mirroring 'new market entrants only?' you prompt her to elaborate on why she drew that line, what her concerns are with full scope, and potentially how firm the boundary is. This gives you intelligence without committing to anything. Logos (C) might be correct on substance but closes the door on negotiation. Reciprocity (A) is adversarial. Scarcity (D) pressures when she's extending an olive branch."

#### Phase 2 Scenarios

**2.1 — The Small Commitment (Generic)**
Scenario: "You're organizing a charity fundraiser and need volunteers. You're talking to a coworker who seems interested but hasn't committed. They say: 'Sounds like a good cause. I'll try to make it if I can.' You know from experience that 'I'll try' means they probably won't show up. Write what you'd say to convert this soft interest into a concrete commitment."
Relevant principles: Commitment & Consistency (get a specific commitment), Mirroring (to explore their hesitation), Logos (make the case concrete)

**2.2 — The Vendor Pushback (Workplace)**
Scenario: "You're a manager negotiating with a software vendor who wants a 3-year contract. You want to start with 1 year to evaluate the product. The vendor says: 'We only do multi-year agreements at this price point. If you want a single year, it would be 40% more per month.' Write your response."
Relevant principles: Mirroring (get them talking), Commitment & Consistency (get small agreements that build), Logos (logical counter-proposal)

**2.3 — The Grassroots Activation Email (Professional)**
Scenario: "You need to send an email to 200 auto dealers in your association asking them to call their state representative about your bill this week. Most of them have never made a legislative call before. The bill is in committee and needs to move in the next 10 days. Write the email that will get the highest response rate."
Relevant principles: Commitment & Consistency (reference their membership commitment), Logos (clear instructions and evidence), Mirroring/Active Listening (acknowledge their busy reality)

**2.4 — The Sponsor Prep (Legislative)**
Scenario: "Your bill sponsor needs to present the bill in committee tomorrow. She's supportive but not deeply versed in the details. She asks you: 'Give me three talking points I can use that will resonate with this committee. Keep it simple.' The committee has 5 Democrats and 4 Republicans. Write the three talking points."
Relevant principles: Logos (evidence-based arguments), Commitment & Consistency (connect to committee members' stated values), Mirroring (reflect the committee's own language back to them)

**2.5 — The Floor Speech Prep (Legislative)**
Scenario: "Your bill has passed committee and is heading to the full chamber for a vote. The sponsor asks you to draft a 2-minute floor speech. The audience is the full House — a mix of supporters, opponents, and many who haven't focused on this issue. The speech needs to win undecideds, not just energize supporters. Write the speech."
Relevant principles: Logos (logical structure), Commitment & Consistency (appeal to legislators' public positions), all module principles in synthesis

#### Phase 3 Scenarios

**3.1 — The Committee Negotiation**
Setup: "You're in a private meeting with Rep. Janet Park, the vice-chair of the committee hearing your bill. She's willing to support the bill but wants to add an amendment requiring a sunset provision (the bill would expire in 5 years unless renewed). Your sponsor is open to this if necessary. Your goal: negotiate the sunset term to be as long as possible (ideally 7-10 years, minimum 5)."
Character: Rep. Park — logical, detail-oriented, negotiates in good faith but firmly, respects preparation and data, doesn't respond to emotional appeals
Opening line (Rep. Park): "I've reviewed the bill. I think the concept is sound, but I need a sunset clause before I can vote yes. Show me the bill works in practice and I'll be there for the renewal. Five years should be enough to prove the concept."

### MODULE 3: LEVERAGING SOCIAL DYNAMICS

#### Phase 1 Scenarios

**1.1 — The Restaurant Choice (Generic)**
Scenario: "You're trying to convince a group of friends to try a new restaurant that just opened. Nobody has been there yet and they're suggesting the usual place. You've read several glowing reviews."
Options:
- A) [Social Proof] "It's already got a 4.8 on Google with over 200 reviews. The food blogger my wife follows called it the best new opening this year."
- B) [Scarcity] "They're only open for dinner Thursday through Sunday right now. If we don't go soon, we might not get a reservation."
- C) [Authority] "The chef used to work at a Michelin-starred restaurant in Chicago. This is serious food."
- D) [Liking] "I'd really love to try it, and it'd mean a lot to me if you guys were game."
Correct: A
Explanation: "Social Proof is the strongest play when people are uncertain and defaulting to the familiar. By citing volume (200+ reviews), a high rating (4.8), and a trusted third party (food blogger), you're showing that many other people have already validated this choice. Authority (C) is a solid secondary argument, but Social Proof addresses the core dynamic: nobody wants to be first, so show them they won't be."

**1.2 — The Team Buy-In (Workplace)**
Scenario: "You're proposing a new process at work. Your manager is open to it but says: 'How do I know this will actually work? Our team is pretty set in their ways.' You need to get the manager to champion it."
Options:
- A) [Calibrated Question] "What would you need to see in a pilot to feel confident this could work for the team?"
- B) [Social Proof] "Three other departments have already adopted this process and seen a 15% efficiency gain."
- C) [Commitment & Consistency] "You mentioned in our last meeting that innovation was a priority for this quarter. This is exactly the kind of initiative you were talking about."
- D) [Reciprocity] "I've put in extra hours developing this proposal. I'd appreciate you giving it a real shot."
Correct: A
Explanation: "Calibrated questions are Voss's secret weapon. 'What would you need to see?' does several things: it gives the manager the illusion of control (they're defining the criteria), it makes them invest mental energy in solving YOUR problem (how to make this work), and it shifts them from evaluating whether to adopt it to planning how to adopt it. Social Proof (B) is good evidence but doesn't address the manager's specific concern about their team. The calibrated question gets them to design their own path to yes."

**1.3 — The Endorsement Ask (Professional)**
Scenario: "You want the state's largest manufacturer to issue a public letter of support for your bill. Their government affairs person says: 'We agree with the intent, but we don't typically weigh in on state legislation publicly. It's not our usual practice.'"
Options:
- A) [Authority] "Your company's voice carries enormous weight with legislators. A letter from you would move votes."
- B) [Social Proof] "The National Association of Manufacturers and two other major companies have already endorsed similar bills in other states."
- C) [Calibrated Question] "What would make this situation different enough from the typical case that it would warrant your involvement?"
- D) [Commitment & Consistency] "Your CEO said publicly that protecting competition in this market is a core value. This bill directly advances that goal."
Correct: C
Explanation: "When someone says 'it's not our usual practice,' most people try to argue why they should make an exception (A, B, D all do this). The calibrated question flips the script — instead of you arguing for why it's exceptional, you get them to define the conditions under which they would engage. This is critical because: (1) they start problem-solving on your behalf, (2) once they articulate conditions, you can meet them, and (3) they've moved from 'no' to 'under certain circumstances.' Much harder to retreat from that position."

**1.4 — The Cross-Party Support (Legislative)**
Scenario: "You need Republican votes for your bill in a purple state. A Republican member says: 'I'm open to the concept, but my caucus hasn't taken a position and I don't want to get out ahead of leadership.'"
Options:
- A) [Social Proof] "Twelve Republican co-sponsors supported the identical bill in Texas. This isn't a partisan issue — it's a business issue."
- B) [Authority] "The Governor's office has privately signaled support. This has backing at the highest level."
- C) [Calibrated Question] "How do things typically work in your caucus when individual members want to support a bill before a caucus position forms?"
- D) [Tactical Empathy] "It sounds like you're navigating the gap between your own judgment and caucus dynamics."
Correct: A
Explanation: "Social Proof is decisive here because the member's core concern is political cover — they don't want to be an outlier. Showing that 12 Republicans in another state supported this reframes it from a politically risky move to a politically safe one. The phrase 'this isn't a partisan issue — it's a business issue' gives them the frame they can use with their own caucus. The calibrated question (C) is useful for intelligence-gathering but doesn't provide the political cover they need right now."

**1.5 — The Expert Witness (Legislative)**
Scenario: "You're preparing testimony for a committee hearing. The committee chair has publicly said they want 'evidence, not anecdotes' and 'experts, not lobbyists.' You need to decide who presents your case."
Options:
- A) [Authority] "Bring the economics professor from the state university who authored the independent analysis of the bill's market impact."
- B) [Social Proof] "Bring five business owners from committee members' districts to testify about real-world impact."
- C) [Pathos] "Bring a small-town dealer whose family has run their store for three generations and is at risk of losing their business."
- D) [Logos] "Prepare a comprehensive data packet with fiscal analysis, economic modeling, and comparison to other states."
Correct: A
Explanation: "The chair has explicitly told you what they value: evidence and experts. Authority — in the form of an independent academic — directly answers both criteria. The chair has also told you what they DON'T want: anecdotes (which rules out C) and lobbyists (which means you need a third-party voice). Social Proof (B) is anecdotal in this context. Data (D) is good supporting material but isn't a witness. Always listen carefully to what your audience has told you about how they want to be persuaded — the chair gave you the answer key."

#### Phase 2 Scenarios

**2.1 — The Group Persuasion (Generic)**
Scenario: "You're on a condo board and want to propose a significant assessment increase to fund building repairs. Most residents are resistant to any cost increases. You need to present this at the annual meeting. Write your 2-minute presentation opening."
Relevant principles: Social Proof (what other buildings have done), Authority (engineer's report), Calibrated Questions (engage the audience)

**2.2 — The Resistant Department (Workplace)**
Scenario: "You've been tasked with getting the sales team to adopt a new CRM system. They hate change. The sales director told you privately: 'My guys see this as corporate making their lives harder.' Write the email you'd send to the sales team introducing the new system."
Relevant principles: Social Proof (early adopter results), Authority (who endorsed it), Calibrated Questions (involve them in implementation)

**2.3 — The Media Interview Prep (Professional)**
Scenario: "A reporter from the state's largest newspaper wants to interview you about your bill. The reporter has previously written a piece quoting opposition arguments. You have 30 minutes and expect tough questions. Write your three key messages (the core statements you will steer every answer back to, regardless of what's asked)."
Relevant principles: Authority (cite credible sources), Social Proof (broad support), Calibrated Questions (redirect challenging questions)

**2.4 — The Bipartisan Pitch (Legislative)**
Scenario: "You have a 5-minute meeting with the minority leader to ask for Republican support for your bill. The minority leader cares about free markets, limited regulation, and jobs. Your bill could be framed as either pro-business protection OR as market regulation. Write your pitch."
Relevant principles: Authority (align with free-market authorities), Social Proof (Republican support in other states), Calibrated Questions (understand their criteria)

**2.5 — The Opposition Rebuttal (Legislative)**
Scenario: "The opposition has published a one-page fact sheet claiming your bill will 'restrict consumer choice, raise prices, and protect a monopoly.' Your bill sponsor's office asks you to write a rebuttal fact sheet. Write the rebuttal."
Relevant principles: Authority (independent experts), Social Proof (states that have passed similar laws without negative effects), Logos (counter their specific claims with evidence)

#### Phase 3 Scenarios

**3.1 — The Editorial Board Meeting**
Setup: "You've been invited to meet with the editorial board of the state's largest newspaper to make the case for your bill. The editorial board is skeptical — their paper has editorially leaned against industry protections in the past. There are three board members present. Your goal: convince them to write a favorable editorial, or at minimum, a neutral one."
Character: Lead editorial board member, Margaret Huang — intellectual, asks challenging questions, values data and independent analysis, skeptical of industry lobbying, respects candor and will punish spin
Opening line (Margaret): "Thanks for coming in. We've been following this bill. I'll be direct — our instinct is that this is protectionism. Change my mind."

### MODULE 4: DRIVING ACTION

#### Phase 1 Scenarios

**1.1 — The Last Seat (Generic)**
Scenario: "You're a real estate agent showing a house to a couple who love it but keep saying they need to 'think about it.' You know another serious buyer is viewing the house tomorrow."
Options:
- A) [Scarcity] "I should let you know — another buyer has a showing scheduled for tomorrow morning. I've seen houses in this neighborhood go fast."
- B) [Liking] "I can tell this house really speaks to you. It's rare to see a couple connect with a property this way."
- C) [Reciprocity] "I've shown you twelve houses over the past month. I think we've found the one — let's make this happen."
- D) [Logos] "Based on the comps, this house is priced about 5% below market. The numbers make sense."
Correct: A
Explanation: "Scarcity drives action because loss aversion is stronger than the desire for gain — Kahneman's prospect theory tells us people feel losses roughly twice as intensely as equivalent gains. The key here is that the scarcity is real (another buyer tomorrow), which makes it ethical and effective. Manufactured scarcity often backfires, but genuine scarcity is one of the most powerful action triggers. The couple already likes the house — what they need is a reason to decide now rather than later."

**1.2 — The Favor Economy (Workplace)**
Scenario: "You need a colleague from another department to prioritize your project, which isn't in their formal workload. You helped them with a major presentation last month. They say: 'I'm swamped right now — can this wait until next quarter?'"
Options:
- A) [Reciprocity] "I totally understand you're buried. Remember when I helped pull together the Q2 presentation last month? I'd really appreciate you fitting this in — it shouldn't take more than a few hours."
- B) [Authority] "Leadership has flagged this as a priority initiative. I'd hate for it to come up in their review that it stalled."
- C) [Scarcity] "If we don't get this done by month-end, the budget allocation expires and we lose the funding."
- D) [Commitment & Consistency] "You mentioned at the last all-hands that cross-functional collaboration was something you cared about."
Correct: A
Explanation: "Reciprocity is the natural lever here because you've already invested. Cialdini's research shows the reciprocity obligation is powerful and deeply ingrained — people feel genuine psychological discomfort when they have an unreturned favor. Notice the approach: acknowledge their reality first ('I understand you're buried'), then reference the specific favor (not vaguely — 'the Q2 presentation'), then make the ask specific and bounded ('a few hours'). This minimizes their cost while activating the reciprocity obligation."

**1.3 — The Dealer Call to Action (Professional)**
Scenario: "A dealer in your association agrees that the bill is important but hasn't actually called their legislator despite three email reminders. You call them directly. They say: 'Yeah, I've been meaning to do it. I'm just not sure what to say.'"
Options:
- A) [Pathos] "I get it. But think about this — if this bill doesn't pass, your business model could fundamentally change. Your employees are counting on you to stand up."
- B) [Reciprocity] "The association has been fighting this battle for two years on your behalf. A 5-minute phone call is all we're asking."
- C) [Scarcity + Logos] "The committee vote is Thursday. If the legislator doesn't hear from a constituent before then, we lose the vote. I can give you a simple script right now — it'll take you 3 minutes."
- D) [Social Proof] "Fifteen other dealers in your region have already called. Your legislator has heard from everyone except you."
Correct: C
Explanation: "This person's barrier isn't motivation — they already agree. Their barrier is uncertainty ('not sure what to say') and procrastination. Scarcity (the deadline) plus Logos (a concrete script and a specific time commitment) directly removes both barriers. You're making it easy and urgent simultaneously. Pathos (A) adds emotional weight they don't need — they're already convinced. Reciprocity (B) creates guilt rather than action. Social Proof (D) might actually be counterproductive — it could make them feel like their individual call isn't needed since others already called."

**1.4 — The Urgency Frame (Legislative)**
Scenario: "Your bill has passed committee and leadership is deciding whether to call it for a floor vote before the session break. The majority leader's office says: 'We like the bill but it's not a priority. We might pick it up next session.' You need to create urgency."
Options:
- A) [Scarcity] "If this waits until next session, we lose three co-sponsors to term limits and start from zero. The coalition we've built won't survive the off-season."
- B) [Pathos] "There are families whose livelihoods depend on this protection. Every day we wait is a day they're at risk."
- C) [Social Proof] "Sixteen co-sponsors, a unanimous committee vote, and support from the Governor's office. This is a ready-made win for the caucus."
- D) [Calibrated Question] "What would it take to get this on the calendar before break?"
Correct: A
Explanation: "Scarcity works here because it's specific, concrete, and credible. You're not creating false urgency — you're showing real loss (co-sponsors to term limits, coalition attrition). Loss aversion means 'we lose what we've built' is more motivating than 'we could gain a win' (C). Social Proof (C) is a good supporting argument but doesn't create urgency by itself. The calibrated question (D) is useful but should come AFTER you've established why it can't wait. Lead with the cost of delay, then ask what's needed to move."

**1.5 — The Closing Ask (Legislative)**
Scenario: "You're in the final minutes of a meeting with a legislator who has been nodding along and saying encouraging things but hasn't committed. She says: 'This all makes sense. I'll definitely take a close look at it.' You know from experience that 'take a close look' means they'll forget about it by tomorrow."
Options:
- A) [Tactical Silence] After she says she'll "take a close look," pause for 5-7 seconds of silence and maintain comfortable eye contact. Let the space create discomfort with a non-committal answer.
- B) [Commitment & Consistency] "I appreciate that. Before I go, can I tell the sponsor that you're a 'likely yes' when this comes to the floor? She's trying to get a count."
- C) [Reciprocity] "I really appreciate your time today. If there's anything my team can help your office with on any issue, please don't hesitate to ask."
- D) [Scarcity] "The committee vote is next Tuesday. Could your team review it and let us know by Friday?"
Correct: A
Explanation: "This is a masterful Voss technique. Tactical silence after a vague commitment forces the other person to fill the void — and when they do, they almost always either upgrade their commitment or reveal their real objection. 'I'll take a close look' is a polite dismissal, and every other response lets them off the hook. Silence says 'I heard you, and I'm waiting for something more concrete' without being confrontational. It's uncomfortable, which is exactly the point — it disrupts the social script of the polite brush-off. The other options let her exit without committing."

#### Phase 2 Scenarios

**2.1 — The Donation Ask (Generic)**
Scenario: "You're calling alumni to ask for donations to your university's scholarship fund. The person on the line is a successful graduate who hasn't donated before. They seem open to talking but haven't expressed interest in giving. Write your pitch (what you'd say after initial pleasantries)."
Relevant principles: Reciprocity (what the university gave them), Pathos (emotional connection to students), Scarcity (matching gift deadline)

**2.2 — The Project Rescue (Workplace)**
Scenario: "Your team's project is behind schedule. You need to convince your boss to approve overtime budget and pull a resource from another team. Your boss is cost-conscious and has pushed back on overtime requests before. She says: 'Make your case — but know that I turned down the last three overtime requests.' Write your pitch."
Relevant principles: Scarcity (deadline consequences), Pathos (team effort at risk), Reciprocity (what the team has already invested), Active Listening (acknowledge her cost concerns)

**2.3 — The Grassroots Rally Invitation (Professional)**
Scenario: "Your association is organizing a rally at the state capitol to show legislator support for your bill. You need 100 dealers to show up on a Tuesday morning — which means they're closing their businesses for half a day. Write the invitation email that maximizes attendance."
Relevant principles: Scarcity (one chance to be heard), Pathos (what's at stake for their businesses), Reciprocity (the association's work on their behalf), Social Proof (who's already committed)

**2.4 — The Governor's Office Ask (Legislative)**
Scenario: "Your bill has passed both chambers. The Governor hasn't signaled whether they'll sign it. You get a 15-minute meeting with the Governor's senior policy advisor. This is your only shot. Write your opening remarks (first 2 minutes)."
Relevant principles: Pathos (constituent stories), Authority (bipartisan legislative support), Scarcity (signing deadline), Reciprocity (legislative coalition delivered a clean bill)

**2.5 — The Veto Override Campaign (Legislative)**
Scenario: "The Governor has vetoed your bill. You need a two-thirds majority in both chambers to override. You currently have simple majority support but need to convert 8 more votes. Write the text message you'd send to your champion sponsor right now (this is urgent, informal, strategic)."
Relevant principles: Scarcity (override window closing), Tactical Silence/Active Listening (don't overwhelm — let the sponsor lead), Reciprocity (what they've invested), Pathos (the stakes)

#### Phase 3 Scenarios

**3.1 — The Final Vote Push**
Setup: "It's the night before the committee vote. You're on the phone with Rep. Angela Simmons, a Democrat who voted yes in subcommittee but has gone quiet. Word is the opposition made a last-minute push with her office. Your goal: lock down her yes vote before tomorrow."
Character: Rep. Simmons — supportive in principle but nervous about opposition pressure, responds to loyalty and relationships, needs emotional reassurance more than data, will shut down if she feels ambushed
Opening line (Rep. Simmons): "Hi. Look, I know why you're calling. I'm still supportive, but I had a meeting today that raised some issues I hadn't considered. I'm not saying I'm a no, but I need to think this through."

---

## Progress Tracking & Storage

### Storage Schema

Use `window.storage` with these keys (all personal/non-shared):

```
persuasion-gym:progress  →  {
  modules: {
    "module-1": {
      phase1: { completed: [scenarioIds], scores: { "scenarioId": { correct: bool, principlesTested: [...] } } },
      phase2: { completed: [scenarioIds], scores: { "scenarioId": { rating: 1-5, principlesUsed: [...] } } },
      phase3: { completed: [scenarioIds], scores: { "scenarioId": { overallRating: 1-5, principlesUsed: [...] } } }
    },
    // ... modules 2-4
  },
  principleStats: {
    "Liking": { attempts: 5, successes: 3, avgRating: 3.5 },
    "Mirroring": { attempts: 2, successes: 2, avgRating: 4.0 },
    // ... all principles
  },
  lastActivity: "2025-02-14T..."
}
```

Keep all progress in a SINGLE storage key (`persuasion-gym:progress`) to minimize API calls.

### Dashboard Metrics

- **Module Progress:** Visual progress bar per module (X of 11-12 scenarios completed)
- **Phase Unlock Status:** Phase 2 unlocks when 3+ Phase 1 scenarios completed in that module. Phase 3 unlocks when 3+ Phase 2 scenarios completed.
- **Principle Strength Map:** Show all ~13 principles with a strength indicator:
  - Green (strong): 70%+ success rate / avg rating 4+
  - Amber (developing): 40-69% / avg rating 2.5-3.9
  - Red (needs work): Below 40% / avg rating below 2.5
  - Gray (not yet attempted)
- **Overall Stats:** Total scenarios completed, average rating, strongest/weakest principle

---

## Reference Library

A separate "Reference" tab that provides quick-reference cards for all principles. Each card includes:

- **Principle name** and source (Cialdini / Voss / Aristotle)
- **One-sentence definition**
- **How it works** (2-3 sentences on the cognitive mechanism)
- **Example in legislative context** (1-2 sentences)
- **When to use it** (1 sentence)
- **When NOT to use it** (1 sentence)

This is static content, no AI needed. Group by module.

### Reference Content

**LIKING (Cialdini)**
- Definition: People say yes to those they like.
- Mechanism: Similarity, compliments, familiarity, cooperation, and physical attractiveness all increase liking. We trust and comply with people we feel connected to. This operates largely through System 1 — it's automatic and emotional.
- Legislative example: Finding common ground with a legislator (shared hometown, mutual acquaintance, similar values) before making your policy ask.
- Use when: Building new relationships, opening meetings, first impressions.
- Don't use when: The situation requires hard evidence or the relationship is already established and you need to drive action.

**TACTICAL EMPATHY + LABELING (Voss)**
- Definition: Demonstrating understanding of someone's feelings and perspective, then naming their emotions aloud.
- Mechanism: When people feel heard, their defenses lower. Labeling emotions ("It seems like you're frustrated with...") activates the prefrontal cortex and reduces amygdala activity — literally calming the brain. This creates psychological safety.
- Legislative example: When a legislator expresses concern about political blowback: "It sounds like the political risk feels bigger than the policy upside right now."
- Use when: Someone is emotional, resistant, or feels unheard. When you sense hidden objections.
- Don't use when: The person is asking for data or substance, not emotional validation.

**ETHOS — CREDIBILITY (Aristotle)**
- Definition: Persuasion through the character and credibility of the speaker.
- Mechanism: Ethos has three components: competence (you know what you're talking about), trustworthiness (you're honest), and goodwill (you care about the audience's interests). All three must be present. Audiences evaluate credibility before evaluating arguments.
- Legislative example: Bringing an independent economist or university researcher to testify rather than your own lobbyist.
- Use when: Your audience is skeptical or doesn't know you well. When source credibility will determine whether your message gets a hearing.
- Don't use when: You've already established credibility and need to move to substance or action.

**COMMITMENT & CONSISTENCY (Cialdini)**
- Definition: Once people commit to something, they feel internal pressure to behave consistently with that commitment.
- Mechanism: The drive for consistency is a central motivator of behavior. Public commitments are stronger than private ones. Written stronger than verbal. Active stronger than passive. This exploits the "foot-in-the-door" effect — small yeses lead to bigger yeses.
- Legislative example: Getting a legislator to say publicly that they support consumer protection, then connecting your bill to that stated value.
- Use when: You need to escalate from soft support to hard commitment. When you can get a small agreement first.
- Don't use when: The person feels pressured or trapped — this can trigger reactance if it feels manipulative.

**MIRRORING (Voss)**
- Definition: Repeating the last few words (or critical words) someone just said.
- Mechanism: Mirroring signals active listening, builds rapport, and — most importantly — prompts the other person to elaborate. It's a low-risk information-gathering tool that keeps conversations going without committing you to a position.
- Legislative example: Legislator says "We're worried about unintended consequences." You respond: "Unintended consequences?" They then explain exactly what worries them.
- Use when: You need more information. When you want to keep someone talking. When you need time to think.
- Don't use when: You already have the information you need and it's time to make your case or close.

**LOGOS — LOGIC & EVIDENCE (Aristotle)**
- Definition: Persuasion through logical argument, evidence, data, and reasoning.
- Mechanism: Logos engages System 2 (deliberative thinking). It's most effective when the audience is motivated and able to process complex information — Petty & Cacioppo's "central route" in the Elaboration Likelihood Model. Strong arguments with evidence create durable attitude change.
- Legislative example: Providing a fiscal impact analysis, economic data, or state-by-state comparison to support your bill.
- Use when: Your audience values evidence, is in analytical mode, or you need to create durable (not just temporary) support.
- Don't use when: The audience is emotional, distracted, or has already made up their mind based on values/identity.

**SOCIAL PROOF (Cialdini)**
- Definition: People determine correct behavior by looking at what others are doing, especially in uncertain situations.
- Mechanism: Social proof is strongest when the "others" are similar to the target and when the situation is ambiguous. "40 states have already done this" is powerful because it signals safety and normalcy.
- Legislative example: Showing a legislator that their colleagues, peer states, or members of their caucus already support the bill.
- Use when: The target is uncertain or risk-averse. When you can show broad or relevant support.
- Don't use when: The target prides themselves on independent thinking or when the "proof" comes from dissimilar sources.

**AUTHORITY (Cialdini)**
- Definition: People defer to credible experts and legitimate authority figures.
- Mechanism: Authority cues include titles, expertise, institutional affiliation, and visible symbols of authority. People follow authority as a cognitive shortcut — it's easier to trust an expert than evaluate every claim yourself.
- Legislative example: Having a university professor or nonpartisan research institute endorse your bill's economic projections.
- Use when: Your audience lacks expertise on the topic or values institutional credibility. When you need to establish that your position is backed by serious analysis.
- Don't use when: The audience is anti-establishment or when authority claims come across as arrogant or dismissive.

**CALIBRATED QUESTIONS (Voss)**
- Definition: Open-ended "How" and "What" questions that give the other side the illusion of control while steering the conversation.
- Mechanism: Calibrated questions make the other person work on your problem. "How am I supposed to do that?" forces them to think about your constraints. "What would it take to make this work?" gets them designing solutions. They feel in control while you direct the conversation.
- Legislative example: When a legislator says they can't support your bill: "What would need to change for you to be comfortable supporting this?"
- Use when: You're facing resistance. When you need information about someone's real objections. When direct asks have failed.
- Don't use when: You need to be direct and specific (e.g., final closing ask). Overuse can feel evasive.

**SCARCITY (Cialdini)**
- Definition: Things become more desirable when they're rare, diminishing, or at risk of being lost.
- Mechanism: Loss aversion (Kahneman) means people feel losses about twice as intensely as equivalent gains. Deadlines, limited windows, and exclusive access all trigger urgency. Scarcity is most effective when it's real and specific.
- Legislative example: "If this doesn't move before session ends, we lose three co-sponsors to term limits and start from zero next year."
- Use when: You need to drive action, not just agreement. When there's a real deadline or cost of delay.
- Don't use when: The scarcity is manufactured or the audience will perceive pressure as manipulative.

**RECIPROCITY (Cialdini)**
- Definition: People feel obligated to return favors, gifts, and concessions.
- Mechanism: The reciprocity obligation is one of the most deeply ingrained social norms. It works even when the initial gift was uninvited. Give first, then ask. The gift should be meaningful, unexpected, and personalized for maximum effect.
- Legislative example: Providing a legislator's office with useful research on an unrelated issue they're working on, then later asking for their support on your bill.
- Use when: You've provided value and need to make an ask. When building long-term relationships.
- Don't use when: It would feel transactional or like a bribe. When the relationship is too new for the "return" ask to feel natural.

**PATHOS — EMOTION (Aristotle)**
- Definition: Persuasion through emotional appeal — stories, vivid language, and appeals to values.
- Mechanism: Pathos engages System 1 and creates the motivational energy to act. Data tells people what to think; emotion tells them what to do. Stories are the primary vehicle for pathos because they create identification and transport.
- Legislative example: Having a small-town dealer tell the committee about their family's three-generation business and what losing it would mean to their community.
- Use when: You need to move people from understanding to action. When data alone isn't driving commitment.
- Don't use when: The audience has explicitly asked for evidence and will punish emotional appeals as manipulative.

**TACTICAL SILENCE / ACTIVE LISTENING (Voss)**
- Definition: Strategic use of silence after making a point or asking a question.
- Mechanism: Silence creates social pressure to fill the void. When you stop talking, the other person almost always talks — and when they do, they often reveal information, upgrade commitments, or make concessions. It also signals confidence and control.
- Legislative example: After asking a legislator for their vote, pausing and maintaining eye contact instead of immediately filling the silence with more arguments.
- Use when: After making an ask. After labeling an emotion. When you've said enough and need the other person to respond.
- Don't use when: The silence will be read as hostile or disengaged (cultural context matters).

---

## UI Component Specifications

### Dashboard View
- App header with "Persuasion Gym" title and navigation
- Welcome section with total progress stats
- 4 module cards in a 2×2 grid showing: module name, theme description, principle badges, progress bar, "Continue" or "Start" button
- Below modules: Principle Strength Map (horizontal bar chart or grid showing all principles with color-coded strength)

### Module View
- Module header with name, theme, and principle badges
- 3 phase cards vertically stacked:
  - Phase name and description
  - Lock/unlock indicator
  - Progress (X/5 completed)
  - "Start" or "Continue" button
  - If locked: grayed out with "Complete 3 more Phase X scenarios to unlock"

### Phase 1 View (Identify & Apply)
- Scenario counter ("Scenario 2 of 5")
- Scenario text in a highlighted card
- 4 option buttons, each with:
  - Principle tag badge (e.g., [Liking])
  - Response text
  - Click to select → highlight selected
- "Submit Answer" button
- Results panel (after submission):
  - Correct/Incorrect indicator
  - Explanation text
  - "Principle Spotlight" expandable section
  - "Next Scenario" button

### Phase 2 View (Craft Your Approach)
- Scenario counter
- Scenario text in a highlighted card
- "Relevant Principles" badges (reference, not answers)
- Textarea (min-height 120px) with placeholder "Write your response..."
- "Get Coaching" button (disabled until 20+ characters typed)
- Loading state: "Your coach is reviewing..."
- Coaching results panel:
  - Star rating (visual stars)
  - Rating justification
  - "Principles You Used" with evidence quotes
  - "What Worked" section
  - "Growth Opportunity" section
  - "Enhanced Version" in a side-by-side or stacked comparison
- "Try Again" and "Next Scenario" buttons

### Phase 3 View (Live Scenario)
- Scenario setup text at top (collapsible after first exchange)
- Chat-style interface:
  - Character messages left-aligned with character name badge
  - User messages right-aligned
  - Textarea + "Send" button at bottom
- Coaching sidebar (right side on desktop, collapsible panel on mobile):
  - After each exchange, shows: principle used, effectiveness note, tip
- Exchange counter ("Exchange 2 of 4")
- After final exchange: Debrief card with overall assessment

### Reference View
- Grouped by module (4 sections)
- Expandable/collapsible principle cards
- Each card shows all reference content as specified above

---

## Error Handling

- **API failures:** Show a friendly message: "Coaching unavailable right now. You can try again or move to the next scenario." Never crash.
- **Storage failures:** If progress can't be saved, show a subtle toast notification but don't block the user.
- **Loading states:** Always show loading indicators during API calls. Phase 2: "Your coach is reviewing your response..." Phase 3: "[Character name] is responding..."
- **Empty states:** If no progress yet, show encouraging "Start your first module" prompt.

---

## Build Priority

If the full build is too large for a single file, prioritize in this order:
1. Dashboard + Module navigation + Phase 1 (all 20 scenarios) — this alone is a functional learning tool
2. Add Phase 2 with AI coaching (all 20 scenarios)  
3. Add Phase 3 with live scenarios
4. Add progress tracking and persistence
5. Add Reference Library

The ideal delivery is everything in a single .jsx file, but if size constraints require it, Phase 3 and the Reference Library can be simplified.
