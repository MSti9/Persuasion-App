# Claude Code Prompt — Build the Persuasion Gym App

## Instructions

Build a single-file React artifact (.jsx) called **Persuasion Gym** — a three-phase persuasion training application. The complete requirements specification follows below. Read the ENTIRE spec before writing any code.

### Critical Technical Constraints

1. **Single .jsx file** — everything (components, data, styles) in one file
2. **Tailwind CSS only** — use only pre-defined Tailwind utility classes (no compiler available)
3. **NO localStorage, NO sessionStorage** — these are blocked and will crash the app
4. **Persistent storage** — use `window.storage` API:
   - `await window.storage.set(key, JSON.stringify(value))` to save
   - `await window.storage.get(key)` returns `{key, value}` — parse with `JSON.parse(result.value)`
   - `await window.storage.delete(key)` to delete
   - `await window.storage.list(prefix)` to list keys
   - Always wrap in try-catch. Non-existent keys throw errors.
   - Keys cannot contain whitespace, slashes, or quotes
5. **Anthropic API** — call via `fetch("https://api.anthropic.com/v1/messages", {...})` with NO API key, NO auth headers. The environment handles authentication. Always use model `"claude-sonnet-4-20250514"` and `max_tokens: 1000`
6. **React imports** — `import { useState, useEffect, useRef, useCallback } from "react"` and use `export default` for the main component
7. **Available libraries** — lucide-react@0.263.1 for icons, recharts for charts if needed
8. **No `<form>` tags** — use onClick/onChange handlers directly
9. **Default export required** — the main component must be exported as default

### Build Priority

Build everything if possible in a single file. If the file becomes too large to be practical, prioritize in this order:
1. Dashboard + Module navigation + Phase 1 with all 20 scenarios (this alone is a functional learning tool)
2. Phase 2 with AI coaching integration
3. Phase 3 live scenarios
4. Progress tracking with persistent storage
5. Reference Library

### Quality Bar

- The app should look clean and professional — muted slate/indigo color palette, generous spacing, sharp layout
- Every interaction should feel responsive — loading states, transitions, clear feedback
- Error handling on all API and storage calls — never crash, always show friendly fallback messages
- The scenario content is the core value — present it with care. Scenarios should be easy to read, options clearly distinguished, feedback thoughtful

---

## FULL REQUIREMENTS SPECIFICATION

---

## Overview

**Persuasion Gym** is a single-file React (.jsx) training application that teaches persuasion fundamentals through progressive, scenario-based practice. The user is a legislative advocate who is new to persuasion science and wants to internalize foundational principles from three frameworks: Cialdini's 6 Principles of Influence, Chris Voss's Negotiation Techniques, and Aristotle's Rhetorical Triad.

The app uses the built-in Anthropic API (no API key required — the environment provides authentication automatically) for AI-powered coaching in Phases 2 and 3. Phase 1 uses pre-loaded content only.

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

### Phase 2: Craft Your Approach

**Purpose:** The user writes their own persuasive response and gets AI coaching.

**Interaction flow:**
1. Display a scenario (3-5 sentences with more context)
2. Show which principles from this module are relevant (as reference badges, not answers)
3. User writes their response in a textarea (minimum 2 sentences encouraged)
4. User clicks "Get Coaching"
5. Send to Anthropic API with this system prompt:

```
You are a persuasion coach analyzing a student's response to a practice scenario. The student is learning persuasion fundamentals and is relatively new to these concepts.

The relevant principles for this module are: [LIST PRINCIPLES WITH DEFINITIONS FROM THE MODULE]

The scenario was: [SCENARIO TEXT]

The student wrote: [USER'S RESPONSE]

Analyze their response and provide:
1. PRINCIPLES DETECTED: Which persuasion principles (from the module list) did they use? Be specific about where in their response you see each principle at work.
2. EFFECTIVENESS RATING: Rate 1-5 stars with a one-sentence justification.
3. WHAT WORKED: 1-2 specific things they did well (be encouraging and concrete).
4. GROWTH OPPORTUNITY: 1 specific thing they could improve, with an explanation of WHY it would be stronger.
5. ENHANCED VERSION: Rewrite their response incorporating the improvement, keeping their voice and intent.

Keep your tone encouraging but substantive. Don't patronize. Be specific, not generic.

Respond ONLY in this exact JSON format with no other text, no markdown backticks:
{"principles_detected": [{"name": "principle name", "evidence": "quote or description from their response"}], "rating": 3, "rating_justification": "one sentence", "what_worked": ["specific thing 1", "specific thing 2"], "growth_opportunity": {"issue": "what to improve", "why": "explanation", "how": "specific suggestion"}, "enhanced_version": "the rewritten response"}
```

6. Display the coaching feedback in a structured card layout:
   - Star rating with justification
   - "Principles You Used" with evidence
   - "What Worked" section
   - "Try This" improvement section
   - "Enhanced Version" in a comparison view
7. "Try Again" button (lets them rewrite) and "Next Scenario" button

**Scoring:** Store the rating (1-5) per scenario per principle.

### Phase 3: Live Scenario

**Purpose:** Multi-turn practice where the user navigates a conversation with an AI-played character, with coaching after each exchange.

**Interaction flow:**
1. Display scenario setup: Who you're talking to, what the situation is, what your goal is (4-6 sentences)
2. The AI character speaks first (use the pre-loaded opening line)
3. User responds in textarea
4. Two API calls happen:
   - **Character response** call with system prompt:
   ```
   You are playing a character in a persuasion training exercise. Stay in character throughout.

   CHARACTER: [Name, role, personality, motivations from scenario data]
   SITUATION: [Context]
   THE STUDENT'S GOAL: [What they're trying to achieve]

   Important: Be realistic, not a pushover. React naturally to what the student says. If they use effective persuasion, show gradual movement. If they're heavy-handed or miss the mark, push back naturally. Don't break character or mention persuasion principles.

   Respond in character in 2-4 sentences. Be natural and conversational.
   ```
   - **Coach sidebar** call with system prompt:
   ```
   You are a persuasion coach providing real-time feedback during a training exercise. The student is practicing these principles: [LIST MODULE PRINCIPLES WITH DEFINITIONS]

   The scenario is: [CONTEXT]
   The conversation so far: [HISTORY]
   The student just said: [LATEST MESSAGE]

   Provide brief coaching (this appears in a sidebar, keep it concise):

   Respond ONLY in this exact JSON format with no other text, no markdown backticks:
   {"principle_used": ["principle name or None detected"], "effectiveness": "one sentence", "tip": "one concrete suggestion for their next response"}
   ```

5. Repeat for 3-4 exchanges total
6. After final exchange, show a "Debrief" summary with overall assessment (one final API call):
   ```
   You are a persuasion coach debriefing a student after a training exercise.

   The student practiced these principles: [MODULE PRINCIPLES]
   The scenario was: [SETUP]
   The full conversation: [ALL EXCHANGES]

   Provide a debrief. Respond ONLY in this exact JSON format with no other text, no markdown backticks:
   {"overall_rating": 4, "principles_used": ["list of principles they used across the conversation"], "best_moment": "describe their strongest persuasion move", "missed_opportunity": "one thing they could have done better", "key_takeaway": "one sentence the student should remember"}
   ```

---

## ALL Scenario Content

### MODULE 1: BUILDING TRUST

#### Phase 1 Scenarios

**Scenario 1.1.1 — The New Neighbor (Generic)**
```
id: "m1-p1-s1"
scenario: "You just moved into a new neighborhood and want to build a good relationship with your next-door neighbor. You've noticed they have a garden similar to one you used to maintain. You run into them while checking the mail."
options: [
  { id: "a", principle: "Liking — Similarity", text: "Hey, I noticed your tomato garden — I used to grow heirloom varieties at my old place. What varieties are you working with this year?", correct: true },
  { id: "b", principle: "Authority", text: "I'm actually a certified master gardener, so if you ever need advice on your plants, I'd be happy to help.", correct: false },
  { id: "c", principle: "Reciprocity", text: "I baked some extra cookies today — would you like some? I always make too many.", correct: false },
  { id: "d", principle: "Social Proof", text: "I heard from the other neighbors that everyone on this block is really close. I'd love to be part of that.", correct: false }
]
explanation: "Similarity is one of the strongest drivers of liking. By finding genuine common ground (gardening) and expressing curiosity rather than showing off expertise, you create a natural connection. Authority (B) feels like bragging in a first interaction. Reciprocity (C) works but feels transactional this early. Social Proof (D) is indirect — you're referencing others rather than building a direct bond."
spotlight: { principle: "Liking", text: "People are more easily persuaded by those they like. Cialdini identifies similarity as one of the most powerful liking triggers — we naturally gravitate toward people who share our interests, backgrounds, or values." }
```

**Scenario 1.1.2 — The Nervous Client (Workplace)**
```
id: "m1-p1-s2"
scenario: "A client calls you sounding stressed. Their board is pressuring them about a decision, and they're second-guessing a recommendation you already gave them. They say: 'I just don't know if this is the right move. Everyone's questioning it.'"
options: [
  { id: "a", principle: "Authority", text: "I've handled dozens of situations exactly like this. Trust me, the recommendation is sound.", correct: false },
  { id: "b", principle: "Tactical Empathy — Labeling", text: "It sounds like you're feeling a lot of pressure from the board, and that's making this harder than the decision itself.", correct: true },
  { id: "c", principle: "Liking — Compliments", text: "You've always had great instincts — I'm sure you'll make the right call.", correct: false },
  { id: "d", principle: "Logos", text: "Let me walk you through the data again. The numbers clearly support this direction.", correct: false }
]
explanation: "When someone is stressed and second-guessing, they don't need more logic or flattery — they need to feel heard first. Labeling their emotion ('it sounds like you're feeling pressure') validates their experience and lowers their defensive wall. Once they feel understood, THEN you can pivot to logic or authority. Leading with data (D) or credentials (A) when someone is emotional will bounce off."
spotlight: { principle: "Tactical Empathy + Labeling", text: "Chris Voss's labeling technique involves identifying and naming the other person's emotions. 'It seems like...' or 'It sounds like...' validates their experience without agreeing or disagreeing, which lowers defenses and creates space for productive conversation." }
```

**Scenario 1.1.3 — The Skeptical Stakeholder (Professional)**
```
id: "m1-p1-s3"
scenario: "You're meeting with a business owner who has been publicly critical of your trade association. They agreed to a meeting but opened with: 'I'll be honest, I don't think your organization actually represents people like me.'"
options: [
  { id: "a", principle: "Ethos — Goodwill", text: "I appreciate you saying that directly. I'd rather hear your real concerns than get a polite brush-off. What specifically feels off about how we represent members?", correct: true },
  { id: "b", principle: "Social Proof", text: "Actually, 85% of our members in your segment renewed this year, so most people in your position see the value.", correct: false },
  { id: "c", principle: "Tactical Empathy — Labeling", text: "It seems like you've had some experiences that made you feel left out of the conversation.", correct: false },
  { id: "d", principle: "Authority", text: "Our leadership team has over 50 years of combined industry experience, and our policy wins speak for themselves.", correct: false }
]
explanation: "When someone opens with a direct challenge to your credibility, the instinct is to defend. But Aristotle's concept of ethos includes goodwill — showing you genuinely care about their perspective. By welcoming their criticism and asking them to elaborate, you demonstrate trustworthiness and openness. Labeling (C) is solid but slightly deflects from their direct point. Social Proof (B) and Authority (D) are defensive moves that ignore their emotional reality."
spotlight: { principle: "Ethos", text: "Aristotle identified three components of credibility: competence (you know your stuff), trustworthiness (you're honest), and goodwill (you care about the audience's interests). All three must be present. In this case, demonstrating goodwill was the priority." }
```

**Scenario 1.1.4 — The Reluctant Ally (Legislative)**
```
id: "m1-p1-s4"
scenario: "A state representative privately supports your bill but won't co-sponsor because she's worried about blowback from a powerful interest group. She says: 'I just can't afford to make enemies right now, especially heading into an election year.'"
options: [
  { id: "a", principle: "Liking — Similarity", text: "I completely understand that calculus — I deal with the same kind of pressure when our board members have competing interests. It's a tough spot.", correct: false },
  { id: "b", principle: "Scarcity", text: "The window to get on this bill is closing — if you wait, you'll miss the chance to be an original sponsor.", correct: false },
  { id: "c", principle: "Tactical Empathy — Labeling", text: "It sounds like the political risk feels bigger than the policy upside right now, and you need a way to support this without painting a target on your back.", correct: true },
  { id: "d", principle: "Logos", text: "The polling shows 70% of your district supports this. The political risk is actually lower than you think.", correct: false }
]
explanation: "This is a textbook Voss moment. She's told you her real concern (political exposure), and she needs to know you understand the stakes from her perspective. Labeling her exact dilemma ('the risk feels bigger than the upside') shows you get it, and naming what she actually needs ('a way to support without a target') opens the door for solutions. Similarity (A) is warm but doesn't advance. Data (D) dismisses her felt experience. Scarcity (B) adds pressure when she needs relief."
spotlight: { principle: "Tactical Empathy + Labeling", text: "Labeling is most powerful when you name not just the emotion but the underlying dilemma. 'It sounds like X, and you need Y' shows deep understanding and implicitly offers to help solve the problem, which builds trust rapidly." }
```

**Scenario 1.1.5 — The Hostile Committee Chair (Legislative)**
```
id: "m1-p1-s5"
scenario: "You're testifying before a committee. The chair, who is skeptical of your bill, interrupts your opening statement and says: 'We've heard all this before from your industry. Why should this time be any different?'"
options: [
  { id: "a", principle: "Ethos — Demonstrated Competence", text: "Fair question, Chair. Since the last hearing, we've incorporated feedback from three of your colleagues' offices and revised the bill to address the concerns raised in the fiscal note. I'd like to walk you through what's different.", correct: true },
  { id: "b", principle: "Tactical Empathy — Labeling", text: "It sounds like previous testimony from our industry hasn't earned a lot of credibility with this committee, and I understand that skepticism.", correct: false },
  { id: "c", principle: "Liking — Compliments", text: "Chair, I have enormous respect for how thoroughly this committee examines legislation. That rigor is exactly why we wanted to come back.", correct: false },
  { id: "d", principle: "Reciprocity", text: "We've spent significant time meeting with your staff and incorporating their input. We'd appreciate the chance to show you the result.", correct: false }
]
explanation: "In a hostile public setting, you need ethos through demonstrated competence — not emotional connection (yet). The chair challenged you to prove you're different. Option A directly answers that challenge with concrete evidence of change. This builds credibility through action, not claims. Labeling (B) is good but doesn't answer the challenge. Complimenting (C) can come across as flattery under pressure. Reciprocity (D) implies obligation, which can backfire with a powerful chair."
spotlight: { principle: "Ethos", text: "When your credibility is directly challenged, the strongest response is demonstrated competence — showing concrete evidence that you've earned the right to be heard. Don't argue about whether you're credible; show it through specifics." }
```

#### Phase 2 Scenarios

**Scenario 1.2.1 — The Cold Outreach Email (Generic)**
```
id: "m1-p2-s1"
scenario: "You need to email someone you've never met — a regional business leader — to ask for a 30-minute meeting. You have one mutual connection (a chamber of commerce director) and you know this person recently gave a talk about workforce development, which connects to an issue your organization is working on. Write the email."
principles: ["Liking", "Ethos", "Tactical Empathy"]
```

**Scenario 1.2.2 — The Frustrated Member (Workplace)**
```
id: "m1-p2-s2"
scenario: "A long-time member of your trade association calls and says they're thinking about not renewing. They feel like the organization only cares about big companies and doesn't represent smaller operators. They say: 'Every time I come to a meeting, it's all about the big guys' problems. Nobody asks what we need.' Write what you would say to them on this phone call."
principles: ["Tactical Empathy + Labeling", "Liking", "Ethos"]
```

**Scenario 1.2.3 — The Legislator's Chief of Staff (Professional)**
```
id: "m1-p2-s3"
scenario: "You have a meeting with a legislator's chief of staff. The legislator is undecided on your bill. The chief of staff is the gatekeeper — if you don't win them over, you'll never get a meeting with the member. The chief of staff opens by saying: 'We've got a lot on our plate this session. Tell me quickly why this should be a priority.' You have about 90 seconds. Write what you would say."
principles: ["Ethos", "Liking", "Tactical Empathy"]
```

**Scenario 1.2.4 — The Post-Hearing Follow-Up (Legislative)**
```
id: "m1-p2-s4"
scenario: "You just testified at a committee hearing. One committee member — Rep. Torres — asked you a tough question during testimony that you answered adequately but not brilliantly. Afterward, her legislative aide approached you and said the Rep appreciated your testimony. Write a follow-up email to Rep. Torres within 24 hours of the hearing."
principles: ["Liking", "Ethos", "Labeling"]
```

**Scenario 1.2.5 — The Coalition Partner Disagreement (Legislative)**
```
id: "m1-p2-s5"
scenario: "Your coalition partner — another trade association — wants to add an amendment to your bill that you think weakens it. They're threatening to withdraw support if the amendment isn't included. You need to have a call with their executive director. You value the coalition but can't accept the amendment. Write your opening statement for the call (the first 60 seconds of what you'd say)."
principles: ["Tactical Empathy", "Ethos", "Liking"]
```

#### Phase 3 Scenarios

**Scenario 1.3.1 — The Undecided Legislator**
```
id: "m1-p3-s1"
setup: "You're meeting one-on-one with State Rep. Marcus Webb in his office. Rep. Webb is a moderate Democrat in his second term. He's on the committee that will hear your bill. He's generally sympathetic to your industry but cautious about taking positions that could draw opposition. His district has 12 dealerships that employ about 400 people total. Your goal: get him to commit to voting yes in committee."
character: { name: "Rep. Marcus Webb", traits: "polite, cautious, asks practical questions, worried about unintended consequences, responds well to empathy and concrete constituent impact, resistant to pressure tactics" }
opening: "Thanks for coming in. I've read the summary your team sent over. I understand the concept, but I've got a few concerns I want to talk through before I commit to anything."
maxExchanges: 4
```

**Scenario 1.3.2 — The Resistant Industry Contact**
```
id: "m1-p3-s2"
setup: "You're at an industry conference and find yourself in conversation with Dana Chen, the government affairs director for a major manufacturer. Your organization is trying to build a coalition of manufacturers to support your legislation, but Dana's company has been neutral. You have about 10 minutes of casual conversation before the next panel starts. Your goal: get Dana to agree to a follow-up call to discuss the bill."
character: { name: "Dana Chen", traits: "professional, guarded, non-committal, expert at deflecting asks, will warm up if she feels respected and not pressured" }
opening: "Nice to meet you. I've heard about the bill — interesting approach. We've been watching it but haven't really taken a deep look yet."
maxExchanges: 4
```

---

### MODULE 2: CREATING MOMENTUM

#### Phase 1 Scenarios

**Scenario 2.1.1 — The Diet Bet (Generic)**
```
id: "m2-p1-s1"
scenario: "Your friend wants to lose weight but keeps quitting workout programs. You want to help them stick with it this time. They say: 'I always start strong but lose motivation after two weeks.'"
options: [
  { id: "a", principle: "Commitment & Consistency", text: "What if you posted your goal on social media? Tell people you're committing to 30 days. Once you put it out there, it's harder to quit.", correct: true },
  { id: "b", principle: "Social Proof", text: "My cousin used this program and lost 30 pounds. You should try what worked for her.", correct: false },
  { id: "c", principle: "Scarcity", text: "This gym has a special right now — if you sign up today, the rate locks in.", correct: false },
  { id: "d", principle: "Pathos", text: "Think about how amazing you'll feel at your sister's wedding if you stick with this.", correct: false }
]
explanation: "Commitment & Consistency is the engine here. Public commitment creates internal pressure to follow through — people want to be seen as consistent with what they've declared. Cialdini's research shows written and public commitments are far stickier than private ones. Social Proof (B) is motivating but doesn't create personal accountability. Scarcity (C) drives a purchase, not sustained behavior. Emotion (D) fades — commitment mechanisms persist."
spotlight: { principle: "Commitment & Consistency", text: "Once people take a public stand, they feel internal and external pressure to stay consistent with it. The key factors that strengthen commitment: it should be active (not passive), public (not private), effortful (not easy), and seen as freely chosen (not coerced)." }
```

**Scenario 2.1.2 — The Stalled Negotiation (Workplace)**
```
id: "m2-p1-s2"
scenario: "You're negotiating a vendor contract. The vendor just made their pitch and quoted a price 20% above your budget. They say: 'That's our standard rate for this scope of work. We believe it reflects the value we bring.' You need to keep the conversation going without accepting or rejecting."
options: [
  { id: "a", principle: "Mirroring", text: "The value you bring?", correct: true },
  { id: "b", principle: "Authority", text: "Our procurement team has benchmarked this against five other vendors, and this is above market rate.", correct: false },
  { id: "c", principle: "Reciprocity", text: "We've been a loyal client for three years — I'd expect some consideration for that relationship.", correct: false },
  { id: "d", principle: "Commitment & Consistency", text: "Earlier you mentioned wanting a long-term partnership. A price this high makes it hard for us to commit long-term.", correct: false }
]
explanation: "Voss's mirroring technique is deceptively powerful here. By repeating 'the value you bring?' you accomplish three things: signal you're listening, avoid triggering defensiveness, and prompt them to elaborate and justify — which often leads to softening. It keeps momentum going without escalating. Commitment/Consistency (D) is strong too, but mirroring is the lower-risk opening move."
spotlight: { principle: "Mirroring", text: "Mirroring is the simplest negotiation tool: repeat the last 1-3 key words as a question. It feels like nothing, but it's remarkably effective at getting people to expand their thinking and reveal information you can use." }
```

**Scenario 2.1.3 — The Incremental Ask (Professional)**
```
id: "m2-p1-s3"
scenario: "You want a local business owner to testify at a legislative hearing on behalf of your bill. They've never done this before and seem nervous. They say: 'I support what you're doing, but I'm not really the public-speaking type.'"
options: [
  { id: "a", principle: "Logos", text: "Your testimony would be incredibly impactful because the committee wants to hear from real business owners, not just lobbyists.", correct: false },
  { id: "b", principle: "Commitment & Consistency", text: "I understand. Would you be willing to start smaller — just a one-paragraph written statement we could submit to the committee? No speaking required.", correct: true },
  { id: "c", principle: "Liking", text: "Honestly, the fact that you're not a polished public speaker is exactly what makes your voice powerful. Real people resonate.", correct: false },
  { id: "d", principle: "Social Proof", text: "Five other business owners from your area are already signed up. You'd be in good company.", correct: false }
]
explanation: "This is the foot-in-the-door technique — a direct application of Commitment & Consistency. By asking for a small, comfortable commitment (a written statement), you get them to act in alignment with their stated support. Once they've taken that step, they're more likely to agree to larger asks later. Cialdini shows this escalation from small to large is one of the most reliable persuasion patterns."
spotlight: { principle: "Commitment & Consistency", text: "The foot-in-the-door technique works because small actions change self-perception. Once someone writes a statement supporting your bill, they begin to see themselves as an active supporter — not just a passive one. That identity shift makes the next ask easier." }
```

**Scenario 2.1.4 — The Wavering Sponsor (Legislative)**
```
id: "m2-p1-s4"
scenario: "Your bill's sponsor calls you and says: 'I'm hearing from the other side that this bill has problems. They sent me a memo with their concerns. I still support it, but I need to be able to answer these objections. Send me your point-by-point rebuttal.'"
options: [
  { id: "a", principle: "Logos", text: "Absolutely — I'll have a detailed rebuttal document on your desk by tomorrow morning with data addressing each point.", correct: true },
  { id: "b", principle: "Mirroring", text: "'Problems' — what kind of problems are they raising?", correct: false },
  { id: "c", principle: "Authority", text: "Chair, we've had three constitutional law professors review this bill. It's solid.", correct: false },
  { id: "d", principle: "Commitment & Consistency", text: "You've been the champion of this issue since day one. Your constituents are counting on your leadership here.", correct: false }
]
explanation: "When a sponsor asks for ammunition, give them ammunition. This is a Logos moment — they need the substance to defend the position they've already committed to. The request is specific ('point-by-point rebuttal') and time-sensitive. Mirroring (B) would be useful if you needed more info, but the sponsor has already told you exactly what they need. Sometimes the best persuasion is delivering excellent substance on time."
spotlight: { principle: "Logos", text: "Logos — logical argument and evidence — is the foundation that all other persuasion builds on. When someone is already on your side and needs to defend that position, give them the strongest possible arguments. Make it easy for your allies to fight for you." }
```

**Scenario 2.1.5 — The Amendment Negotiation (Legislative)**
```
id: "m2-p1-s5"
scenario: "An opposition legislator offers to support your bill if you accept an amendment that narrows the scope. She says: 'I could get behind the concept if we limited it to new market entrants only. That's a reasonable compromise.' You need to explore this without committing."
options: [
  { id: "a", principle: "Reciprocity", text: "We've already made concessions in committee. I think it's time for the other side to give a little.", correct: false },
  { id: "b", principle: "Mirroring", text: "Limited to new market entrants only?", correct: true },
  { id: "c", principle: "Logos", text: "The economic analysis shows the bill needs full scope to achieve its intended impact.", correct: false },
  { id: "d", principle: "Scarcity", text: "We need to move on this now — the session clock is ticking and this may be our only window.", correct: false }
]
explanation: "Another perfect mirroring situation. The legislator has made a specific offer, and you need more information. By mirroring 'new market entrants only?' you prompt her to elaborate on why she drew that line, what her concerns are, and how firm the boundary is. This gives you intelligence without committing. Logos (C) might be correct but closes negotiation. Reciprocity (A) is adversarial. Scarcity (D) pressures when she's extending an olive branch."
spotlight: { principle: "Mirroring", text: "Mirroring is especially powerful in negotiations because it gathers intelligence without revealing your position. A three-word mirror can extract more information than a five-minute argument, and it keeps the other side talking while you listen and plan." }
```

#### Phase 2 Scenarios

**Scenario 2.2.1 — The Small Commitment (Generic)**
```
id: "m2-p2-s1"
scenario: "You're organizing a charity fundraiser and need volunteers. You're talking to a coworker who seems interested but hasn't committed. They say: 'Sounds like a good cause. I'll try to make it if I can.' You know from experience that 'I'll try' means they probably won't show up. Write what you'd say to convert this soft interest into a concrete commitment."
principles: ["Commitment & Consistency", "Mirroring", "Logos"]
```

**Scenario 2.2.2 — The Vendor Pushback (Workplace)**
```
id: "m2-p2-s2"
scenario: "You're a manager negotiating with a software vendor who wants a 3-year contract. You want to start with 1 year to evaluate the product. The vendor says: 'We only do multi-year agreements at this price point. If you want a single year, it would be 40% more per month.' Write your response."
principles: ["Mirroring", "Commitment & Consistency", "Logos"]
```

**Scenario 2.2.3 — The Grassroots Activation Email (Professional)**
```
id: "m2-p2-s3"
scenario: "You need to send an email to 200 auto dealers in your association asking them to call their state representative about your bill this week. Most of them have never made a legislative call before. The bill is in committee and needs to move in the next 10 days. Write the email that will get the highest response rate."
principles: ["Commitment & Consistency", "Logos", "Mirroring"]
```

**Scenario 2.2.4 — The Sponsor Prep (Legislative)**
```
id: "m2-p2-s4"
scenario: "Your bill sponsor needs to present the bill in committee tomorrow. She's supportive but not deeply versed in the details. She asks you: 'Give me three talking points I can use that will resonate with this committee. Keep it simple.' The committee has 5 Democrats and 4 Republicans. Write the three talking points."
principles: ["Logos", "Commitment & Consistency", "Mirroring"]
```

**Scenario 2.2.5 — The Floor Speech Prep (Legislative)**
```
id: "m2-p2-s5"
scenario: "Your bill has passed committee and is heading to the full chamber for a vote. The sponsor asks you to draft a 2-minute floor speech. The audience is the full House — a mix of supporters, opponents, and many who haven't focused on this issue. The speech needs to win undecideds, not just energize supporters. Write the speech."
principles: ["Logos", "Commitment & Consistency", "Mirroring"]
```

#### Phase 3 Scenarios

**Scenario 2.3.1 — The Committee Negotiation**
```
id: "m2-p3-s1"
setup: "You're in a private meeting with Rep. Janet Park, the vice-chair of the committee hearing your bill. She's willing to support the bill but wants to add an amendment requiring a sunset provision (the bill would expire in 5 years unless renewed). Your sponsor is open to this if necessary. Your goal: negotiate the sunset term to be as long as possible (ideally 7-10 years, minimum 5)."
character: { name: "Rep. Janet Park", traits: "logical, detail-oriented, negotiates in good faith but firmly, respects preparation and data, doesn't respond to emotional appeals" }
opening: "I've reviewed the bill. I think the concept is sound, but I need a sunset clause before I can vote yes. Show me the bill works in practice and I'll be there for the renewal. Five years should be enough to prove the concept."
maxExchanges: 4
```

---

### MODULE 3: LEVERAGING SOCIAL DYNAMICS

#### Phase 1 Scenarios

**Scenario 3.1.1 — The Restaurant Choice (Generic)**
```
id: "m3-p1-s1"
scenario: "You're trying to convince a group of friends to try a new restaurant that just opened. Nobody has been there yet and they're suggesting the usual place. You've read several glowing reviews."
options: [
  { id: "a", principle: "Social Proof", text: "It's already got a 4.8 on Google with over 200 reviews. The food blogger my wife follows called it the best new opening this year.", correct: true },
  { id: "b", principle: "Scarcity", text: "They're only open for dinner Thursday through Sunday right now. If we don't go soon, we might not get a reservation.", correct: false },
  { id: "c", principle: "Authority", text: "The chef used to work at a Michelin-starred restaurant in Chicago. This is serious food.", correct: false },
  { id: "d", principle: "Liking", text: "I'd really love to try it, and it'd mean a lot to me if you guys were game.", correct: false }
]
explanation: "Social Proof is strongest when people are uncertain and defaulting to familiar. By citing volume (200+ reviews), a high rating (4.8), and a trusted third party (food blogger), you show many others have validated this choice. Authority (C) is solid secondary, but Social Proof addresses the core dynamic: nobody wants to be first, so show them they won't be."
spotlight: { principle: "Social Proof", text: "Social Proof works because uncertainty makes people look to others for guidance. The more people who have done something, the more 'correct' it seems. Key factors: similarity of the others to your audience, volume of proof, and recency." }
```

**Scenario 3.1.2 — The Team Buy-In (Workplace)**
```
id: "m3-p1-s2"
scenario: "You're proposing a new process at work. Your manager is open to it but says: 'How do I know this will actually work? Our team is pretty set in their ways.' You need to get the manager to champion it."
options: [
  { id: "a", principle: "Calibrated Question", text: "What would you need to see in a pilot to feel confident this could work for the team?", correct: true },
  { id: "b", principle: "Social Proof", text: "Three other departments have already adopted this process and seen a 15% efficiency gain.", correct: false },
  { id: "c", principle: "Commitment & Consistency", text: "You mentioned in our last meeting that innovation was a priority for this quarter. This is exactly the kind of initiative you were talking about.", correct: false },
  { id: "d", principle: "Reciprocity", text: "I've put in extra hours developing this proposal. I'd appreciate you giving it a real shot.", correct: false }
]
explanation: "Calibrated questions are Voss's secret weapon. 'What would you need to see?' gives the manager the illusion of control (they define the criteria), makes them invest mental energy in YOUR problem, and shifts them from evaluating WHETHER to adopt it to planning HOW. Social Proof (B) is good evidence but doesn't address the manager's specific concern about their team."
spotlight: { principle: "Calibrated Questions", text: "Calibrated questions start with 'How' or 'What' and are designed to make the other person solve your problem. They create the illusion of control while steering the conversation. The magic: once someone starts planning how to make something work, they've psychologically committed to it working." }
```

**Scenario 3.1.3 — The Endorsement Ask (Professional)**
```
id: "m3-p1-s3"
scenario: "You want the state's largest manufacturer to issue a public letter of support for your bill. Their government affairs person says: 'We agree with the intent, but we don't typically weigh in on state legislation publicly. It's not our usual practice.'"
options: [
  { id: "a", principle: "Authority", text: "Your company's voice carries enormous weight with legislators. A letter from you would move votes.", correct: false },
  { id: "b", principle: "Social Proof", text: "The National Association of Manufacturers and two other major companies have already endorsed similar bills in other states.", correct: false },
  { id: "c", principle: "Calibrated Question", text: "What would make this situation different enough from the typical case that it would warrant your involvement?", correct: true },
  { id: "d", principle: "Commitment & Consistency", text: "Your CEO said publicly that protecting competition in this market is a core value. This bill directly advances that goal.", correct: false }
]
explanation: "When someone says 'it's not our usual practice,' most people argue why they should make an exception. The calibrated question flips the script — instead of YOU arguing, you get THEM to define conditions under which they would engage. They start problem-solving on your behalf, and once they articulate conditions, you can meet them. They've moved from 'no' to 'under certain circumstances.'"
spotlight: { principle: "Calibrated Questions", text: "The most powerful calibrated questions reframe 'no' into 'under what conditions.' Instead of fighting their objection, you ask them to define the exception. Once they've described it, they've implicitly acknowledged the exception exists." }
```

**Scenario 3.1.4 — The Cross-Party Support (Legislative)**
```
id: "m3-p1-s4"
scenario: "You need Republican votes for your bill in a purple state. A Republican member says: 'I'm open to the concept, but my caucus hasn't taken a position and I don't want to get out ahead of leadership.'"
options: [
  { id: "a", principle: "Social Proof", text: "Twelve Republican co-sponsors supported the identical bill in Texas. This isn't a partisan issue — it's a business issue.", correct: true },
  { id: "b", principle: "Authority", text: "The Governor's office has privately signaled support. This has backing at the highest level.", correct: false },
  { id: "c", principle: "Calibrated Question", text: "How do things typically work in your caucus when individual members want to support a bill before a caucus position forms?", correct: false },
  { id: "d", principle: "Tactical Empathy", text: "It sounds like you're navigating the gap between your own judgment and caucus dynamics.", correct: false }
]
explanation: "Social Proof is decisive here because the member's core concern is political cover. Showing that 12 Republicans in another state supported this reframes it from politically risky to politically safe. 'This isn't a partisan issue — it's a business issue' gives them the frame they can use with their own caucus. The calibrated question (C) is useful for intelligence but doesn't provide the political cover they need now."
spotlight: { principle: "Social Proof", text: "For politicians, Social Proof doubles as political cover. Showing that peers in their party or similar districts have taken a position transforms the calculus from 'am I going out on a limb?' to 'am I joining a trend?'" }
```

**Scenario 3.1.5 — The Expert Witness (Legislative)**
```
id: "m3-p1-s5"
scenario: "You're preparing testimony for a committee hearing. The committee chair has publicly said they want 'evidence, not anecdotes' and 'experts, not lobbyists.' You need to decide who presents your case."
options: [
  { id: "a", principle: "Authority", text: "Bring the economics professor from the state university who authored the independent analysis of the bill's market impact.", correct: true },
  { id: "b", principle: "Social Proof", text: "Bring five business owners from committee members' districts to testify about real-world impact.", correct: false },
  { id: "c", principle: "Pathos", text: "Bring a small-town dealer whose family has run their store for three generations and is at risk of losing their business.", correct: false },
  { id: "d", principle: "Logos", text: "Prepare a comprehensive data packet with fiscal analysis, economic modeling, and comparison to other states.", correct: false }
]
explanation: "The chair explicitly told you what they value: evidence and experts. Authority — an independent academic — directly answers both criteria. The chair also told you what they DON'T want: anecdotes (rules out C) and lobbyists (you need a third-party voice). Always listen carefully to what your audience tells you about how they want to be persuaded — the chair gave you the answer key."
spotlight: { principle: "Authority", text: "Authority is most powerful when it comes from independent, credible third parties rather than interested parties. A university professor carries more weight than an industry lobbyist because they're perceived as having no skin in the game." }
```

#### Phase 2 Scenarios

**Scenario 3.2.1 — The Group Persuasion (Generic)**
```
id: "m3-p2-s1"
scenario: "You're on a condo board and want to propose a significant assessment increase to fund building repairs. Most residents are resistant to any cost increases. You need to present this at the annual meeting. Write your 2-minute presentation opening."
principles: ["Social Proof", "Authority", "Calibrated Questions"]
```

**Scenario 3.2.2 — The Resistant Department (Workplace)**
```
id: "m3-p2-s2"
scenario: "You've been tasked with getting the sales team to adopt a new CRM system. They hate change. The sales director told you privately: 'My guys see this as corporate making their lives harder.' Write the email you'd send to the sales team introducing the new system."
principles: ["Social Proof", "Authority", "Calibrated Questions"]
```

**Scenario 3.2.3 — The Media Interview Prep (Professional)**
```
id: "m3-p2-s3"
scenario: "A reporter from the state's largest newspaper wants to interview you about your bill. The reporter has previously written a piece quoting opposition arguments. You have 30 minutes and expect tough questions. Write your three key messages (the core statements you will steer every answer back to, regardless of what's asked)."
principles: ["Authority", "Social Proof", "Calibrated Questions"]
```

**Scenario 3.2.4 — The Bipartisan Pitch (Legislative)**
```
id: "m3-p2-s4"
scenario: "You have a 5-minute meeting with the minority leader to ask for Republican support for your bill. The minority leader cares about free markets, limited regulation, and jobs. Your bill could be framed as either pro-business protection OR as market regulation. Write your pitch."
principles: ["Authority", "Social Proof", "Calibrated Questions"]
```

**Scenario 3.2.5 — The Opposition Rebuttal (Legislative)**
```
id: "m3-p2-s5"
scenario: "The opposition has published a one-page fact sheet claiming your bill will 'restrict consumer choice, raise prices, and protect a monopoly.' Your bill sponsor's office asks you to write a rebuttal fact sheet. Write the rebuttal."
principles: ["Authority", "Social Proof", "Logos"]
```

#### Phase 3 Scenarios

**Scenario 3.3.1 — The Editorial Board Meeting**
```
id: "m3-p3-s1"
setup: "You've been invited to meet with the editorial board of the state's largest newspaper to make the case for your bill. The editorial board is skeptical — their paper has editorially leaned against industry protections in the past. There are three board members present. Your goal: convince them to write a favorable editorial, or at minimum, a neutral one."
character: { name: "Margaret Huang", traits: "intellectual, asks challenging questions, values data and independent analysis, skeptical of industry lobbying, respects candor and will punish spin" }
opening: "Thanks for coming in. We've been following this bill. I'll be direct — our instinct is that this is protectionism. Change my mind."
maxExchanges: 4
```

---

### MODULE 4: DRIVING ACTION

#### Phase 1 Scenarios

**Scenario 4.1.1 — The Last Seat (Generic)**
```
id: "m4-p1-s1"
scenario: "You're a real estate agent showing a house to a couple who love it but keep saying they need to 'think about it.' You know another serious buyer is viewing the house tomorrow."
options: [
  { id: "a", principle: "Scarcity", text: "I should let you know — another buyer has a showing scheduled for tomorrow morning. I've seen houses in this neighborhood go fast.", correct: true },
  { id: "b", principle: "Liking", text: "I can tell this house really speaks to you. It's rare to see a couple connect with a property this way.", correct: false },
  { id: "c", principle: "Reciprocity", text: "I've shown you twelve houses over the past month. I think we've found the one — let's make this happen.", correct: false },
  { id: "d", principle: "Logos", text: "Based on the comps, this house is priced about 5% below market. The numbers make sense.", correct: false }
]
explanation: "Scarcity drives action because loss aversion is stronger than the desire for gain — Kahneman's prospect theory shows people feel losses roughly twice as intensely as equivalent gains. The key: the scarcity is real (another buyer), making it ethical and effective. The couple already likes the house — they need a reason to decide NOW rather than later."
spotlight: { principle: "Scarcity", text: "Scarcity works through loss aversion — the psychological principle that losing something feels about twice as bad as gaining something equivalent feels good. Real scarcity (genuine deadlines, actual competition) is both more ethical and more effective than manufactured urgency." }
```

**Scenario 4.1.2 — The Favor Economy (Workplace)**
```
id: "m4-p1-s2"
scenario: "You need a colleague from another department to prioritize your project, which isn't in their formal workload. You helped them with a major presentation last month. They say: 'I'm swamped right now — can this wait until next quarter?'"
options: [
  { id: "a", principle: "Reciprocity", text: "I totally understand you're buried. Remember when I helped pull together the Q2 presentation last month? I'd really appreciate you fitting this in — it shouldn't take more than a few hours.", correct: true },
  { id: "b", principle: "Authority", text: "Leadership has flagged this as a priority initiative. I'd hate for it to come up in their review that it stalled.", correct: false },
  { id: "c", principle: "Scarcity", text: "If we don't get this done by month-end, the budget allocation expires and we lose the funding.", correct: false },
  { id: "d", principle: "Commitment & Consistency", text: "You mentioned at the last all-hands that cross-functional collaboration was something you cared about.", correct: false }
]
explanation: "Reciprocity is the natural lever here because you've already invested. Cialdini's research shows the reciprocity obligation is powerful and deeply ingrained. Notice the approach: acknowledge their reality first ('you're buried'), then reference the specific favor (not vaguely), then make the ask specific and bounded ('a few hours'). This minimizes their cost while activating the obligation."
spotlight: { principle: "Reciprocity", text: "The reciprocity principle works because unreturned favors create genuine psychological discomfort. The most effective reciprocity: be specific about what you gave, acknowledge their constraints, and make your ask proportional and bounded." }
```

**Scenario 4.1.3 — The Dealer Call to Action (Professional)**
```
id: "m4-p1-s3"
scenario: "A dealer in your association agrees that the bill is important but hasn't actually called their legislator despite three email reminders. You call them directly. They say: 'Yeah, I've been meaning to do it. I'm just not sure what to say.'"
options: [
  { id: "a", principle: "Pathos", text: "I get it. But think about this — if this bill doesn't pass, your business model could fundamentally change. Your employees are counting on you to stand up.", correct: false },
  { id: "b", principle: "Reciprocity", text: "The association has been fighting this battle for two years on your behalf. A 5-minute phone call is all we're asking.", correct: false },
  { id: "c", principle: "Scarcity + Logos", text: "The committee vote is Thursday. If the legislator doesn't hear from a constituent before then, we lose the vote. I can give you a simple script right now — it'll take you 3 minutes.", correct: true },
  { id: "d", principle: "Social Proof", text: "Fifteen other dealers in your region have already called. Your legislator has heard from everyone except you.", correct: false }
]
explanation: "This person's barrier isn't motivation — they already agree. Their barrier is uncertainty ('not sure what to say') and procrastination. Scarcity (the deadline) plus Logos (a concrete script and a specific time commitment) directly removes both barriers. You're making it easy AND urgent simultaneously. Pathos (A) adds emotional weight they don't need. Reciprocity (B) creates guilt rather than action. Social Proof (D) might actually backfire — it could make them feel their call isn't needed since others already called."
spotlight: { principle: "Scarcity", text: "Scarcity is most actionable when paired with simplicity. A deadline alone creates anxiety; a deadline plus a clear, easy path to action creates movement. Always pair 'you must act now' with 'and here's exactly how.'" }
```

**Scenario 4.1.4 — The Urgency Frame (Legislative)**
```
id: "m4-p1-s4"
scenario: "Your bill has passed committee and leadership is deciding whether to call it for a floor vote before the session break. The majority leader's office says: 'We like the bill but it's not a priority. We might pick it up next session.' You need to create urgency."
options: [
  { id: "a", principle: "Scarcity", text: "If this waits until next session, we lose three co-sponsors to term limits and start from zero. The coalition we've built won't survive the off-season.", correct: true },
  { id: "b", principle: "Pathos", text: "There are families whose livelihoods depend on this protection. Every day we wait is a day they're at risk.", correct: false },
  { id: "c", principle: "Social Proof", text: "Sixteen co-sponsors, a unanimous committee vote, and support from the Governor's office. This is a ready-made win for the caucus.", correct: false },
  { id: "d", principle: "Calibrated Question", text: "What would it take to get this on the calendar before break?", correct: false }
]
explanation: "Scarcity works here because it's specific, concrete, and credible. You're showing real loss (co-sponsors to term limits, coalition attrition). Loss aversion means 'we lose what we've built' is more motivating than 'we could gain a win' (C). Social Proof (C) is a good supporting argument but doesn't create urgency by itself. The calibrated question (D) is useful but should come AFTER you've established why it can't wait."
spotlight: { principle: "Scarcity", text: "In legislative contexts, the most compelling scarcity arguments are about coalition attrition and political window closure — not just session deadlines. 'We lose co-sponsors to term limits' is more concrete and credible than 'the clock is ticking.'" }
```

**Scenario 4.1.5 — The Closing Ask (Legislative)**
```
id: "m4-p1-s5"
scenario: "You're in the final minutes of a meeting with a legislator who has been nodding along and saying encouraging things but hasn't committed. She says: 'This all makes sense. I'll definitely take a close look at it.' You know from experience that 'take a close look' means they'll forget about it by tomorrow."
options: [
  { id: "a", principle: "Tactical Silence", text: "After she says she'll 'take a close look,' pause for 5-7 seconds of silence and maintain comfortable eye contact. Let the space create discomfort with a non-committal answer.", correct: true },
  { id: "b", principle: "Commitment & Consistency", text: "I appreciate that. Before I go, can I tell the sponsor that you're a 'likely yes' when this comes to the floor? She's trying to get a count.", correct: false },
  { id: "c", principle: "Reciprocity", text: "I really appreciate your time today. If there's anything my team can help your office with on any issue, please don't hesitate to ask.", correct: false },
  { id: "d", principle: "Scarcity", text: "The committee vote is next Tuesday. Could your team review it and let us know by Friday?", correct: false }
]
explanation: "Tactical silence after a vague commitment forces the other person to fill the void — and when they do, they almost always either upgrade their commitment or reveal their real objection. 'I'll take a close look' is a polite dismissal, and every other response lets them off the hook. Silence says 'I heard you, and I'm waiting for something more concrete' without being confrontational. It disrupts the social script of the polite brush-off."
spotlight: { principle: "Tactical Silence", text: "Silence is deeply uncomfortable in professional settings — most people rush to fill it. Voss teaches that strategic silence after an ask is one of the most powerful tools available. It signals confidence, creates productive discomfort, and forces the other person to respond with substance rather than pleasantries." }
```

#### Phase 2 Scenarios

**Scenario 4.2.1 — The Donation Ask (Generic)**
```
id: "m4-p2-s1"
scenario: "You're calling alumni to ask for donations to your university's scholarship fund. The person on the line is a successful graduate who hasn't donated before. They seem open to talking but haven't expressed interest in giving. Write your pitch (what you'd say after initial pleasantries)."
principles: ["Reciprocity", "Pathos", "Scarcity"]
```

**Scenario 4.2.2 — The Project Rescue (Workplace)**
```
id: "m4-p2-s2"
scenario: "Your team's project is behind schedule. You need to convince your boss to approve overtime budget and pull a resource from another team. Your boss is cost-conscious and has pushed back on overtime requests before. She says: 'Make your case — but know that I turned down the last three overtime requests.' Write your pitch."
principles: ["Scarcity", "Pathos", "Reciprocity", "Tactical Silence"]
```

**Scenario 4.2.3 — The Grassroots Rally Invitation (Professional)**
```
id: "m4-p2-s3"
scenario: "Your association is organizing a rally at the state capitol to show legislator support for your bill. You need 100 dealers to show up on a Tuesday morning — which means they're closing their businesses for half a day. Write the invitation email that maximizes attendance."
principles: ["Scarcity", "Pathos", "Reciprocity", "Social Proof"]
```

**Scenario 4.2.4 — The Governor's Office Ask (Legislative)**
```
id: "m4-p2-s4"
scenario: "Your bill has passed both chambers. The Governor hasn't signaled whether they'll sign it. You get a 15-minute meeting with the Governor's senior policy advisor. This is your only shot. Write your opening remarks (first 2 minutes)."
principles: ["Pathos", "Authority", "Scarcity", "Reciprocity"]
```

**Scenario 4.2.5 — The Veto Override Campaign (Legislative)**
```
id: "m4-p2-s5"
scenario: "The Governor has vetoed your bill. You need a two-thirds majority in both chambers to override. You currently have simple majority support but need to convert 8 more votes. Write the text message you'd send to your champion sponsor right now (this is urgent, informal, strategic)."
principles: ["Scarcity", "Tactical Silence", "Reciprocity", "Pathos"]
```

#### Phase 3 Scenarios

**Scenario 4.3.1 — The Final Vote Push**
```
id: "m4-p3-s1"
setup: "It's the night before the committee vote. You're on the phone with Rep. Angela Simmons, a Democrat who voted yes in subcommittee but has gone quiet. Word is the opposition made a last-minute push with her office. Your goal: lock down her yes vote before tomorrow."
character: { name: "Rep. Angela Simmons", traits: "supportive in principle but nervous about opposition pressure, responds to loyalty and relationships, needs emotional reassurance more than data, will shut down if she feels ambushed" }
opening: "Hi. Look, I know why you're calling. I'm still supportive, but I had a meeting today that raised some issues I hadn't considered. I'm not saying I'm a no, but I need to think this through."
maxExchanges: 4
```

---

## Progress Tracking & Storage

### Storage Schema

Use `window.storage` with this single key (personal/non-shared):

```
Key: "persuasion-gym:progress"
Value (JSON stringified): {
  modules: {
    "module-1": {
      phase1: { completed: ["m1-p1-s1", ...], scores: { "m1-p1-s1": { correct: true, principlesTested: ["Liking"] } } },
      phase2: { completed: ["m1-p2-s1", ...], scores: { "m1-p2-s1": { rating: 4, principlesUsed: ["Liking", "Ethos"] } } },
      phase3: { completed: ["m1-p3-s1", ...], scores: { "m1-p3-s1": { overallRating: 4, principlesUsed: ["Labeling", "Ethos"] } } }
    },
    "module-2": { ... },
    "module-3": { ... },
    "module-4": { ... }
  },
  principleStats: {
    "Liking": { attempts: 5, successes: 3, avgRating: 3.5 },
    "Tactical Empathy + Labeling": { attempts: 2, successes: 2, avgRating: 4.0 },
    "Ethos": { ... },
    "Commitment & Consistency": { ... },
    "Mirroring": { ... },
    "Logos": { ... },
    "Social Proof": { ... },
    "Authority": { ... },
    "Calibrated Questions": { ... },
    "Scarcity": { ... },
    "Reciprocity": { ... },
    "Pathos": { ... },
    "Tactical Silence": { ... }
  },
  lastActivity: "ISO datetime string"
}
```

### Dashboard Metrics

- **Module Progress:** Visual progress bar per module (X of ~12 scenarios completed)
- **Phase Unlock Status:** Phase 2 unlocks when 3+ Phase 1 scenarios completed in that module. Phase 3 unlocks when 3+ Phase 2 scenarios completed.
- **Principle Strength Map:** Show all 13 principles with a strength indicator:
  - Green (strong): 70%+ success rate or avg rating 4+
  - Amber (developing): 40-69% or avg rating 2.5-3.9
  - Red (needs work): Below 40% or avg rating below 2.5
  - Gray (not yet attempted)
- **Overall Stats:** Total scenarios completed, average rating, strongest/weakest principle

---

## Reference Library

A separate "Reference" tab with expandable cards for all 13 principles, grouped by module. Each card shows:

**LIKING (Cialdini) — Module 1**
- Definition: People say yes to those they like.
- Mechanism: Similarity, compliments, familiarity, cooperation, and association increase liking. Operates through System 1 — automatic and emotional.
- Legislative example: Finding common ground with a legislator before making your policy ask.
- Use when: Building new relationships, opening meetings, first impressions.
- Don't use when: Situation requires hard evidence or the relationship is established and you need to drive action.

**TACTICAL EMPATHY + LABELING (Voss) — Module 1**
- Definition: Demonstrating understanding of someone's feelings and perspective, then naming their emotions aloud.
- Mechanism: When people feel heard, defenses lower. Labeling emotions activates the prefrontal cortex and reduces amygdala activity — literally calming the brain.
- Legislative example: "It sounds like the political risk feels bigger than the policy upside right now."
- Use when: Someone is emotional, resistant, or feels unheard. When you sense hidden objections.
- Don't use when: The person is asking for data or substance, not emotional validation.

**ETHOS — CREDIBILITY (Aristotle) — Module 1**
- Definition: Persuasion through the character and credibility of the speaker.
- Mechanism: Three components: competence, trustworthiness, and goodwill. Audiences evaluate credibility before evaluating arguments.
- Legislative example: Bringing an independent economist to testify rather than your own lobbyist.
- Use when: Audience is skeptical or doesn't know you. When source credibility determines whether your message gets heard.
- Don't use when: Credibility is established and you need to move to substance or action.

**COMMITMENT & CONSISTENCY (Cialdini) — Module 2**
- Definition: Once people commit, they feel internal pressure to behave consistently with that commitment.
- Mechanism: Public commitments stronger than private. Written stronger than verbal. Active stronger than passive. The foot-in-the-door effect.
- Legislative example: Getting a legislator to say publicly they support consumer protection, then connecting your bill to that value.
- Use when: Escalating from soft support to hard commitment. When you can get a small agreement first.
- Don't use when: The person feels pressured or trapped — can trigger reactance.

**MIRRORING (Voss) — Module 2**
- Definition: Repeating the last few words (or critical words) someone just said.
- Mechanism: Signals active listening, builds rapport, prompts elaboration. Low-risk information gathering without committing to a position.
- Legislative example: Legislator says "unintended consequences." You: "Unintended consequences?" They explain their specific concern.
- Use when: Need more information. Want to keep someone talking. Need time to think.
- Don't use when: You already have the info and it's time to make your case or close.

**LOGOS — LOGIC & EVIDENCE (Aristotle) — Module 2**
- Definition: Persuasion through logical argument, evidence, data, and reasoning.
- Mechanism: Engages System 2 (deliberative thinking). Most effective via the "central route" when audience is motivated to process. Creates durable attitude change.
- Legislative example: Providing fiscal impact analysis or state-by-state comparison data.
- Use when: Audience values evidence, is in analytical mode, or you need durable support.
- Don't use when: Audience is emotional, distracted, or has decided based on values/identity.

**SOCIAL PROOF (Cialdini) — Module 3**
- Definition: People determine correct behavior by looking at what others do, especially in uncertainty.
- Mechanism: Strongest when "others" are similar to the target and situation is ambiguous. Volume and recency matter.
- Legislative example: "40 states have already passed similar legislation."
- Use when: Target is uncertain or risk-averse. When you can show broad or relevant support.
- Don't use when: Target prides themselves on independent thinking or proof comes from dissimilar sources.

**AUTHORITY (Cialdini) — Module 3**
- Definition: People defer to credible experts and legitimate authority figures.
- Mechanism: Authority cues include titles, expertise, institutional affiliation. Works as a cognitive shortcut.
- Legislative example: Having a university professor endorse your bill's economic projections.
- Use when: Audience lacks expertise or values institutional credibility.
- Don't use when: Audience is anti-establishment or authority claims seem arrogant.

**CALIBRATED QUESTIONS (Voss) — Module 3**
- Definition: Open-ended "How" and "What" questions giving the other side illusion of control.
- Mechanism: Makes the other person work on your problem. "What would it take?" gets them designing solutions. They feel in control while you direct.
- Legislative example: "What would need to change for you to be comfortable supporting this?"
- Use when: Facing resistance. Need info about real objections. Direct asks have failed.
- Don't use when: Need to be direct and specific (final closing ask). Overuse feels evasive.

**SCARCITY (Cialdini) — Module 4**
- Definition: Things become more desirable when rare, diminishing, or at risk of being lost.
- Mechanism: Loss aversion — losing feels twice as bad as gaining feels good. Deadlines and competition trigger urgency.
- Legislative example: "If this doesn't move before session ends, we lose three co-sponsors to term limits."
- Use when: Need to drive action, not just agreement. When there's a real deadline.
- Don't use when: Scarcity is manufactured or audience will perceive manipulation.

**RECIPROCITY (Cialdini) — Module 4**
- Definition: People feel obligated to return favors, gifts, and concessions.
- Mechanism: One of the most deeply ingrained social norms. Works even when the initial gift was uninvited. Give first, then ask.
- Legislative example: Providing a legislator's office with useful research on an unrelated issue, then asking for support on your bill.
- Use when: You've provided value and need to make an ask. Building long-term relationships.
- Don't use when: It would feel transactional or like a bribe. Relationship too new for the ask.

**PATHOS — EMOTION (Aristotle) — Module 4**
- Definition: Persuasion through emotional appeal — stories, vivid language, appeals to values.
- Mechanism: Engages System 1 and creates motivational energy. Data tells people what to think; emotion tells them what to do. Stories create identification.
- Legislative example: A small-town dealer telling the committee what losing their family business would mean.
- Use when: Moving people from understanding to action. When data alone isn't driving commitment.
- Don't use when: Audience has asked for evidence and will punish emotional appeals.

**TACTICAL SILENCE / ACTIVE LISTENING (Voss) — Module 4**
- Definition: Strategic use of silence after making a point or asking a question.
- Mechanism: Silence creates social pressure to fill the void. Other person often reveals information, upgrades commitments, or makes concessions. Signals confidence.
- Legislative example: After asking for their vote, pausing and maintaining eye contact instead of filling silence with more arguments.
- Use when: After making an ask. After labeling an emotion. When you've said enough.
- Don't use when: Silence will be read as hostile or disengaged.

---

## Error Handling Requirements

- **API failures:** Show friendly message: "Coaching unavailable right now. You can try again or move to the next scenario." Never crash the app.
- **JSON parse failures from API:** Strip markdown backticks (```json and ```) before parsing. Use try-catch and show a fallback message if parsing fails.
- **Storage failures:** Show subtle toast notification ("Progress couldn't be saved") but don't block the user from continuing.
- **Loading states:** Always show loading indicators during API calls. Phase 2: "Your coach is reviewing your response..." Phase 3: "[Character name] is responding..."
- **Empty states:** If no progress yet, show encouraging "Start your first module" prompt on dashboard.

---

## Final Notes

- Keep the data structures (scenarios, options, explanations) as clean JSON objects at the top of the file for easy editing
- The app should feel like a professional training tool, not a quiz app — the coaching and explanations are the value, not just right/wrong scoring
- Phase 2 and 3 depend on API calls — make sure the app is fully functional even if the API is temporarily unavailable (Phase 1 should always work)
- The total file will be large — that's expected. Optimize for readability and maintainability over clever compression
- Use a default export: `export default function PersuasionGym() { ... }`
