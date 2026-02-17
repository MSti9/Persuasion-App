import { useState, useEffect, useRef, useCallback } from "react";
import {
  BookOpen, ChevronRight, ChevronDown, ChevronLeft, Lock, Star,
  Target, MessageCircle, Send, RotateCcw, Award, AlertCircle,
  Loader2, CheckCircle, XCircle, Info, Home, Layers, Library,
  ArrowRight, Zap, Users, TrendingUp, Heart, Eye, Shield,
  HelpCircle, Volume2
} from "lucide-react";

// ═══════════════════════════════════════════════════════════════
// DATA — Modules, Principles, Scenarios, Reference
// ═══════════════════════════════════════════════════════════════

const MODULES = [
  {
    id: "module-1",
    name: "Building Trust",
    theme: "Establishing credibility and connection before you ask for anything.",
    color: { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200", badge: "bg-blue-100" },
    principles: ["Liking", "Tactical Empathy + Labeling", "Ethos"],
    principleDetails: [
      { name: "Liking", source: "Cialdini", mechanism: "People say yes to those they like. Similarity, compliments, familiarity, and association all increase liking." },
      { name: "Tactical Empathy + Labeling", source: "Voss", mechanism: "Demonstrating understanding of someone's feelings and perspective builds rapport and lowers defenses. Labeling means naming their emotions." },
      { name: "Ethos", source: "Aristotle", mechanism: "Persuasion through the character/credibility of the speaker. Demonstrated competence, trustworthiness, and goodwill." }
    ]
  },
  {
    id: "module-2",
    name: "Creating Momentum",
    theme: "Getting people to take small steps that align with where you want them to go.",
    color: { bg: "bg-violet-50", text: "text-violet-700", border: "border-violet-200", badge: "bg-violet-100" },
    principles: ["Commitment & Consistency", "Mirroring", "Logos"],
    principleDetails: [
      { name: "Commitment & Consistency", source: "Cialdini", mechanism: "Once people commit to something, they feel internal pressure to behave consistently with that commitment. Small yeses lead to bigger yeses." },
      { name: "Mirroring", source: "Voss", mechanism: "Repeating the last few words someone said. Signals active listening, builds rapport, and encourages them to elaborate." },
      { name: "Logos", source: "Aristotle", mechanism: "Persuasion through logical argument, evidence, data, and reasoning. The substance of your case." }
    ]
  },
  {
    id: "module-3",
    name: "Leveraging Social Dynamics",
    theme: "Using external validators and strategic questioning to shift what's seen as reasonable.",
    color: { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200", badge: "bg-amber-100" },
    principles: ["Social Proof", "Authority", "Calibrated Questions"],
    principleDetails: [
      { name: "Social Proof", source: "Cialdini", mechanism: "People look to what others are doing to determine correct behavior, especially in uncertain situations." },
      { name: "Authority", source: "Cialdini", mechanism: "People defer to credible experts and legitimate authority figures. Titles, expertise, and institutional backing carry weight." },
      { name: "Calibrated Questions", source: "Voss", mechanism: "Open-ended 'How' and 'What' questions that give the other side the illusion of control while steering the conversation." }
    ]
  },
  {
    id: "module-4",
    name: "Driving Action",
    theme: "Creating urgency, emotional resonance, and obligation that moves people from agreement to action.",
    color: { bg: "bg-rose-50", text: "text-rose-700", border: "border-rose-200", badge: "bg-rose-100" },
    principles: ["Scarcity", "Reciprocity", "Pathos", "Tactical Silence"],
    principleDetails: [
      { name: "Scarcity", source: "Cialdini", mechanism: "Things become more desirable when they're rare or diminishing. Deadlines, limited windows, and exclusive access drive action." },
      { name: "Reciprocity", source: "Cialdini", mechanism: "People feel obligated to return favors, gifts, and concessions. Give first, then ask." },
      { name: "Pathos", source: "Aristotle", mechanism: "Persuasion through emotional appeal. Stories, vivid language, and appeals to values that move people to feel, not just think." },
      { name: "Tactical Silence", source: "Voss", mechanism: "Strategic use of silence after making a point or asking a question. Lets the other person fill the space, often revealing information or making concessions." }
    ]
  }
];

const PHASE1_SCENARIOS = {
  "module-1": [
    {
      id: "m1-p1-s1", title: "The New Neighbor",
      scenario: "You just moved into a new neighborhood and want to build a good relationship with your next-door neighbor. You've noticed they have a garden similar to one you used to maintain. You run into them while checking the mail.",
      options: [
        { id: "a", principle: "Liking — Similarity", text: "Hey, I noticed your tomato garden — I used to grow heirloom varieties at my old place. What varieties are you working with this year?", correct: true },
        { id: "b", principle: "Authority", text: "I'm actually a certified master gardener, so if you ever need advice on your plants, I'd be happy to help.", correct: false },
        { id: "c", principle: "Reciprocity", text: "I baked some extra cookies today — would you like some? I always make too many.", correct: false },
        { id: "d", principle: "Social Proof", text: "I heard from the other neighbors that everyone on this block is really close. I'd love to be part of that.", correct: false }
      ],
      explanation: "Similarity is one of the strongest drivers of liking. By finding genuine common ground (gardening) and expressing curiosity rather than showing off expertise, you create a natural connection. Authority (B) feels like bragging in a first interaction. Reciprocity (C) works but feels transactional this early. Social Proof (D) is indirect — you're referencing others rather than building a direct bond.",
      spotlight: { principle: "Liking", text: "People are more easily persuaded by those they like. Cialdini identifies similarity as one of the most powerful liking triggers — we naturally gravitate toward people who share our interests, backgrounds, or values." }
    },
    {
      id: "m1-p1-s2", title: "The Nervous Client",
      scenario: "A client calls you sounding stressed. Their board is pressuring them about a decision, and they're second-guessing a recommendation you already gave them. They say: 'I just don't know if this is the right move. Everyone's questioning it.'",
      options: [
        { id: "a", principle: "Authority", text: "I've handled dozens of situations exactly like this. Trust me, the recommendation is sound.", correct: false },
        { id: "b", principle: "Tactical Empathy — Labeling", text: "It sounds like you're feeling a lot of pressure from the board, and that's making this harder than the decision itself.", correct: true },
        { id: "c", principle: "Liking — Compliments", text: "You've always had great instincts — I'm sure you'll make the right call.", correct: false },
        { id: "d", principle: "Logos", text: "Let me walk you through the data again. The numbers clearly support this direction.", correct: false }
      ],
      explanation: "When someone is stressed and second-guessing, they don't need more logic or flattery — they need to feel heard first. Labeling their emotion ('it sounds like you're feeling pressure') validates their experience and lowers their defensive wall. Once they feel understood, THEN you can pivot to logic or authority. Leading with data (D) or credentials (A) when someone is emotional will bounce off.",
      spotlight: { principle: "Tactical Empathy + Labeling", text: "Chris Voss's labeling technique involves identifying and naming the other person's emotions. 'It seems like...' or 'It sounds like...' validates their experience without agreeing or disagreeing, which lowers defenses and creates space for productive conversation." }
    },
    {
      id: "m1-p1-s3", title: "The Skeptical Stakeholder",
      scenario: "You're meeting with a business owner who has been publicly critical of your trade association. They agreed to a meeting but opened with: 'I'll be honest, I don't think your organization actually represents people like me.'",
      options: [
        { id: "a", principle: "Ethos — Goodwill", text: "I appreciate you saying that directly. I'd rather hear your real concerns than get a polite brush-off. What specifically feels off about how we represent members?", correct: true },
        { id: "b", principle: "Social Proof", text: "Actually, 85% of our members in your segment renewed this year, so most people in your position see the value.", correct: false },
        { id: "c", principle: "Tactical Empathy — Labeling", text: "It seems like you've had some experiences that made you feel left out of the conversation.", correct: false },
        { id: "d", principle: "Authority", text: "Our leadership team has over 50 years of combined industry experience, and our policy wins speak for themselves.", correct: false }
      ],
      explanation: "When someone opens with a direct challenge to your credibility, the instinct is to defend. But Aristotle's concept of ethos includes goodwill — showing you genuinely care about their perspective. By welcoming their criticism and asking them to elaborate, you demonstrate trustworthiness and openness. Labeling (C) is solid but slightly deflects from their direct point. Social Proof (B) and Authority (D) are defensive moves that ignore their emotional reality.",
      spotlight: { principle: "Ethos", text: "Aristotle identified three components of credibility: competence (you know your stuff), trustworthiness (you're honest), and goodwill (you care about the audience's interests). All three must be present. In this case, demonstrating goodwill was the priority." }
    },
    {
      id: "m1-p1-s4", title: "The Reluctant Ally",
      scenario: "A state representative privately supports your bill but won't co-sponsor because she's worried about blowback from a powerful interest group. She says: 'I just can't afford to make enemies right now, especially heading into an election year.'",
      options: [
        { id: "a", principle: "Liking — Similarity", text: "I completely understand that calculus — I deal with the same kind of pressure when our board members have competing interests. It's a tough spot.", correct: false },
        { id: "b", principle: "Scarcity", text: "The window to get on this bill is closing — if you wait, you'll miss the chance to be an original sponsor.", correct: false },
        { id: "c", principle: "Tactical Empathy — Labeling", text: "It sounds like the political risk feels bigger than the policy upside right now, and you need a way to support this without painting a target on your back.", correct: true },
        { id: "d", principle: "Logos", text: "The polling shows 70% of your district supports this. The political risk is actually lower than you think.", correct: false }
      ],
      explanation: "This is a textbook Voss moment. She's told you her real concern (political exposure), and she needs to know you understand the stakes from her perspective. Labeling her exact dilemma ('the risk feels bigger than the upside') shows you get it, and naming what she actually needs ('a way to support without a target') opens the door for solutions. Similarity (A) is warm but doesn't advance. Data (D) dismisses her felt experience. Scarcity (B) adds pressure when she needs relief.",
      spotlight: { principle: "Tactical Empathy + Labeling", text: "Labeling is most powerful when you name not just the emotion but the underlying dilemma. 'It sounds like X, and you need Y' shows deep understanding and implicitly offers to help solve the problem, which builds trust rapidly." }
    },
    {
      id: "m1-p1-s5", title: "The Hostile Committee Chair",
      scenario: "You're testifying before a committee. The chair, who is skeptical of your bill, interrupts your opening statement and says: 'We've heard all this before from your industry. Why should this time be any different?'",
      options: [
        { id: "a", principle: "Ethos — Demonstrated Competence", text: "Fair question, Chair. Since the last hearing, we've incorporated feedback from three of your colleagues' offices and revised the bill to address the concerns raised in the fiscal note. I'd like to walk you through what's different.", correct: true },
        { id: "b", principle: "Tactical Empathy — Labeling", text: "It sounds like previous testimony from our industry hasn't earned a lot of credibility with this committee, and I understand that skepticism.", correct: false },
        { id: "c", principle: "Liking — Compliments", text: "Chair, I have enormous respect for how thoroughly this committee examines legislation. That rigor is exactly why we wanted to come back.", correct: false },
        { id: "d", principle: "Reciprocity", text: "We've spent significant time meeting with your staff and incorporating their input. We'd appreciate the chance to show you the result.", correct: false }
      ],
      explanation: "In a hostile public setting, you need ethos through demonstrated competence — not emotional connection (yet). The chair challenged you to prove you're different. Option A directly answers that challenge with concrete evidence of change. This builds credibility through action, not claims. Labeling (B) is good but doesn't answer the challenge. Complimenting (C) can come across as flattery under pressure. Reciprocity (D) implies obligation, which can backfire with a powerful chair.",
      spotlight: { principle: "Ethos", text: "When your credibility is directly challenged, the strongest response is demonstrated competence — showing concrete evidence that you've earned the right to be heard. Don't argue about whether you're credible; show it through specifics." }
    }
  ],
  "module-2": [
    {
      id: "m2-p1-s1", title: "The Diet Bet",
      scenario: "Your friend wants to lose weight but keeps quitting workout programs. You want to help them stick with it this time. They say: 'I always start strong but lose motivation after two weeks.'",
      options: [
        { id: "a", principle: "Commitment & Consistency", text: "What if you posted your goal on social media? Tell people you're committing to 30 days. Once you put it out there, it's harder to quit.", correct: true },
        { id: "b", principle: "Social Proof", text: "My cousin used this program and lost 30 pounds. You should try what worked for her.", correct: false },
        { id: "c", principle: "Scarcity", text: "This gym has a special right now — if you sign up today, the rate locks in.", correct: false },
        { id: "d", principle: "Pathos", text: "Think about how amazing you'll feel at your sister's wedding if you stick with this.", correct: false }
      ],
      explanation: "Commitment & Consistency is the engine here. Public commitment creates internal pressure to follow through — people want to be seen as consistent with what they've declared. Cialdini's research shows written and public commitments are far stickier than private ones. Social Proof (B) is motivating but doesn't create personal accountability. Scarcity (C) drives a purchase, not sustained behavior. Emotion (D) fades — commitment mechanisms persist.",
      spotlight: { principle: "Commitment & Consistency", text: "Once people take a public stand, they feel internal and external pressure to stay consistent with it. The key factors that strengthen commitment: it should be active (not passive), public (not private), effortful (not easy), and seen as freely chosen (not coerced)." }
    },
    {
      id: "m2-p1-s2", title: "The Stalled Negotiation",
      scenario: "You're negotiating a vendor contract. The vendor just made their pitch and quoted a price 20% above your budget. They say: 'That's our standard rate for this scope of work. We believe it reflects the value we bring.' You need to keep the conversation going without accepting or rejecting.",
      options: [
        { id: "a", principle: "Mirroring", text: "The value you bring?", correct: true },
        { id: "b", principle: "Authority", text: "Our procurement team has benchmarked this against five other vendors, and this is above market rate.", correct: false },
        { id: "c", principle: "Reciprocity", text: "We've been a loyal client for three years — I'd expect some consideration for that relationship.", correct: false },
        { id: "d", principle: "Commitment & Consistency", text: "Earlier you mentioned wanting a long-term partnership. A price this high makes it hard for us to commit long-term.", correct: false }
      ],
      explanation: "Voss's mirroring technique is deceptively powerful here. By repeating 'the value you bring?' you accomplish three things: signal you're listening, avoid triggering defensiveness, and prompt them to elaborate and justify — which often leads to softening. It keeps momentum going without escalating. Commitment/Consistency (D) is strong too, but mirroring is the lower-risk opening move.",
      spotlight: { principle: "Mirroring", text: "Mirroring is the simplest negotiation tool: repeat the last 1-3 key words as a question. It feels like nothing, but it's remarkably effective at getting people to expand their thinking and reveal information you can use." }
    },
    {
      id: "m2-p1-s3", title: "The Incremental Ask",
      scenario: "You want a local business owner to testify at a legislative hearing on behalf of your bill. They've never done this before and seem nervous. They say: 'I support what you're doing, but I'm not really the public-speaking type.'",
      options: [
        { id: "a", principle: "Logos", text: "Your testimony would be incredibly impactful because the committee wants to hear from real business owners, not just lobbyists.", correct: false },
        { id: "b", principle: "Commitment & Consistency", text: "I understand. Would you be willing to start smaller — just a one-paragraph written statement we could submit to the committee? No speaking required.", correct: true },
        { id: "c", principle: "Liking", text: "Honestly, the fact that you're not a polished public speaker is exactly what makes your voice powerful. Real people resonate.", correct: false },
        { id: "d", principle: "Social Proof", text: "Five other business owners from your area are already signed up. You'd be in good company.", correct: false }
      ],
      explanation: "This is the foot-in-the-door technique — a direct application of Commitment & Consistency. By asking for a small, comfortable commitment (a written statement), you get them to act in alignment with their stated support. Once they've taken that step, they're more likely to agree to larger asks later. Cialdini shows this escalation from small to large is one of the most reliable persuasion patterns.",
      spotlight: { principle: "Commitment & Consistency", text: "The foot-in-the-door technique works because small actions change self-perception. Once someone writes a statement supporting your bill, they begin to see themselves as an active supporter — not just a passive one. That identity shift makes the next ask easier." }
    },
    {
      id: "m2-p1-s4", title: "The Wavering Sponsor",
      scenario: "Your bill's sponsor calls you and says: 'I'm hearing from the other side that this bill has problems. They sent me a memo with their concerns. I still support it, but I need to be able to answer these objections. Send me your point-by-point rebuttal.'",
      options: [
        { id: "a", principle: "Logos", text: "Absolutely — I'll have a detailed rebuttal document on your desk by tomorrow morning with data addressing each point.", correct: true },
        { id: "b", principle: "Mirroring", text: "'Problems' — what kind of problems are they raising?", correct: false },
        { id: "c", principle: "Authority", text: "Chair, we've had three constitutional law professors review this bill. It's solid.", correct: false },
        { id: "d", principle: "Commitment & Consistency", text: "You've been the champion of this issue since day one. Your constituents are counting on your leadership here.", correct: false }
      ],
      explanation: "When a sponsor asks for ammunition, give them ammunition. This is a Logos moment — they need the substance to defend the position they've already committed to. The request is specific ('point-by-point rebuttal') and time-sensitive. Mirroring (B) would be useful if you needed more info, but the sponsor has already told you exactly what they need. Sometimes the best persuasion is delivering excellent substance on time.",
      spotlight: { principle: "Logos", text: "Logos — logical argument and evidence — is the foundation that all other persuasion builds on. When someone is already on your side and needs to defend that position, give them the strongest possible arguments. Make it easy for your allies to fight for you." }
    },
    {
      id: "m2-p1-s5", title: "The Amendment Negotiation",
      scenario: "An opposition legislator offers to support your bill if you accept an amendment that narrows the scope. She says: 'I could get behind the concept if we limited it to new market entrants only. That's a reasonable compromise.' You need to explore this without committing.",
      options: [
        { id: "a", principle: "Reciprocity", text: "We've already made concessions in committee. I think it's time for the other side to give a little.", correct: false },
        { id: "b", principle: "Mirroring", text: "Limited to new market entrants only?", correct: true },
        { id: "c", principle: "Logos", text: "The economic analysis shows the bill needs full scope to achieve its intended impact.", correct: false },
        { id: "d", principle: "Scarcity", text: "We need to move on this now — the session clock is ticking and this may be our only window.", correct: false }
      ],
      explanation: "Another perfect mirroring situation. The legislator has made a specific offer, and you need more information. By mirroring 'new market entrants only?' you prompt her to elaborate on why she drew that line, what her concerns are, and how firm the boundary is. This gives you intelligence without committing. Logos (C) might be correct but closes negotiation. Reciprocity (A) is adversarial. Scarcity (D) pressures when she's extending an olive branch.",
      spotlight: { principle: "Mirroring", text: "Mirroring is especially powerful in negotiations because it gathers intelligence without revealing your position. A three-word mirror can extract more information than a five-minute argument, and it keeps the other side talking while you listen and plan." }
    }
  ],
  "module-3": [
    {
      id: "m3-p1-s1", title: "The Restaurant Choice",
      scenario: "You're trying to convince a group of friends to try a new restaurant that just opened. Nobody has been there yet and they're suggesting the usual place. You've read several glowing reviews.",
      options: [
        { id: "a", principle: "Social Proof", text: "It's already got a 4.8 on Google with over 200 reviews. The food blogger my wife follows called it the best new opening this year.", correct: true },
        { id: "b", principle: "Scarcity", text: "They're only open for dinner Thursday through Sunday right now. If we don't go soon, we might not get a reservation.", correct: false },
        { id: "c", principle: "Authority", text: "The chef used to work at a Michelin-starred restaurant in Chicago. This is serious food.", correct: false },
        { id: "d", principle: "Liking", text: "I'd really love to try it, and it'd mean a lot to me if you guys were game.", correct: false }
      ],
      explanation: "Social Proof is strongest when people are uncertain and defaulting to familiar. By citing volume (200+ reviews), a high rating (4.8), and a trusted third party (food blogger), you show many others have validated this choice. Authority (C) is solid secondary, but Social Proof addresses the core dynamic: nobody wants to be first, so show them they won't be.",
      spotlight: { principle: "Social Proof", text: "Social Proof works because uncertainty makes people look to others for guidance. The more people who have done something, the more 'correct' it seems. Key factors: similarity of the others to your audience, volume of proof, and recency." }
    },
    {
      id: "m3-p1-s2", title: "The Team Buy-In",
      scenario: "You're proposing a new process at work. Your manager is open to it but says: 'How do I know this will actually work? Our team is pretty set in their ways.' You need to get the manager to champion it.",
      options: [
        { id: "a", principle: "Calibrated Question", text: "What would you need to see in a pilot to feel confident this could work for the team?", correct: true },
        { id: "b", principle: "Social Proof", text: "Three other departments have already adopted this process and seen a 15% efficiency gain.", correct: false },
        { id: "c", principle: "Commitment & Consistency", text: "You mentioned in our last meeting that innovation was a priority for this quarter. This is exactly the kind of initiative you were talking about.", correct: false },
        { id: "d", principle: "Reciprocity", text: "I've put in extra hours developing this proposal. I'd appreciate you giving it a real shot.", correct: false }
      ],
      explanation: "Calibrated questions are Voss's secret weapon. 'What would you need to see?' gives the manager the illusion of control (they define the criteria), makes them invest mental energy in YOUR problem, and shifts them from evaluating WHETHER to adopt it to planning HOW. Social Proof (B) is good evidence but doesn't address the manager's specific concern about their team.",
      spotlight: { principle: "Calibrated Questions", text: "Calibrated questions start with 'How' or 'What' and are designed to make the other person solve your problem. They create the illusion of control while steering the conversation. The magic: once someone starts planning how to make something work, they've psychologically committed to it working." }
    },
    {
      id: "m3-p1-s3", title: "The Endorsement Ask",
      scenario: "You want the state's largest manufacturer to issue a public letter of support for your bill. Their government affairs person says: 'We agree with the intent, but we don't typically weigh in on state legislation publicly. It's not our usual practice.'",
      options: [
        { id: "a", principle: "Authority", text: "Your company's voice carries enormous weight with legislators. A letter from you would move votes.", correct: false },
        { id: "b", principle: "Social Proof", text: "The National Association of Manufacturers and two other major companies have already endorsed similar bills in other states.", correct: false },
        { id: "c", principle: "Calibrated Question", text: "What would make this situation different enough from the typical case that it would warrant your involvement?", correct: true },
        { id: "d", principle: "Commitment & Consistency", text: "Your CEO said publicly that protecting competition in this market is a core value. This bill directly advances that goal.", correct: false }
      ],
      explanation: "When someone says 'it's not our usual practice,' most people argue why they should make an exception. The calibrated question flips the script — instead of YOU arguing, you get THEM to define conditions under which they would engage. They start problem-solving on your behalf, and once they articulate conditions, you can meet them. They've moved from 'no' to 'under certain circumstances.'",
      spotlight: { principle: "Calibrated Questions", text: "The most powerful calibrated questions reframe 'no' into 'under what conditions.' Instead of fighting their objection, you ask them to define the exception. Once they've described it, they've implicitly acknowledged the exception exists." }
    },
    {
      id: "m3-p1-s4", title: "The Cross-Party Support",
      scenario: "You need Republican votes for your bill in a purple state. A Republican member says: 'I'm open to the concept, but my caucus hasn't taken a position and I don't want to get out ahead of leadership.'",
      options: [
        { id: "a", principle: "Social Proof", text: "Twelve Republican co-sponsors supported the identical bill in Texas. This isn't a partisan issue — it's a business issue.", correct: true },
        { id: "b", principle: "Authority", text: "The Governor's office has privately signaled support. This has backing at the highest level.", correct: false },
        { id: "c", principle: "Calibrated Question", text: "How do things typically work in your caucus when individual members want to support a bill before a caucus position forms?", correct: false },
        { id: "d", principle: "Tactical Empathy", text: "It sounds like you're navigating the gap between your own judgment and caucus dynamics.", correct: false }
      ],
      explanation: "Social Proof is decisive here because the member's core concern is political cover. Showing that 12 Republicans in another state supported this reframes it from politically risky to politically safe. 'This isn't a partisan issue — it's a business issue' gives them the frame they can use with their own caucus. The calibrated question (C) is useful for intelligence but doesn't provide the political cover they need now.",
      spotlight: { principle: "Social Proof", text: "For politicians, Social Proof doubles as political cover. Showing that peers in their party or similar districts have taken a position transforms the calculus from 'am I going out on a limb?' to 'am I joining a trend?'" }
    },
    {
      id: "m3-p1-s5", title: "The Expert Witness",
      scenario: "You're preparing testimony for a committee hearing. The committee chair has publicly said they want 'evidence, not anecdotes' and 'experts, not lobbyists.' You need to decide who presents your case.",
      options: [
        { id: "a", principle: "Authority", text: "Bring the economics professor from the state university who authored the independent analysis of the bill's market impact.", correct: true },
        { id: "b", principle: "Social Proof", text: "Bring five business owners from committee members' districts to testify about real-world impact.", correct: false },
        { id: "c", principle: "Pathos", text: "Bring a small-town dealer whose family has run their store for three generations and is at risk of losing their business.", correct: false },
        { id: "d", principle: "Logos", text: "Prepare a comprehensive data packet with fiscal analysis, economic modeling, and comparison to other states.", correct: false }
      ],
      explanation: "The chair explicitly told you what they value: evidence and experts. Authority — an independent academic — directly answers both criteria. The chair also told you what they DON'T want: anecdotes (rules out C) and lobbyists (you need a third-party voice). Always listen carefully to what your audience tells you about how they want to be persuaded — the chair gave you the answer key.",
      spotlight: { principle: "Authority", text: "Authority is most powerful when it comes from independent, credible third parties rather than interested parties. A university professor carries more weight than an industry lobbyist because they're perceived as having no skin in the game." }
    }
  ],
  "module-4": [
    {
      id: "m4-p1-s1", title: "The Last Seat",
      scenario: "You're a real estate agent showing a house to a couple who love it but keep saying they need to 'think about it.' You know another serious buyer is viewing the house tomorrow.",
      options: [
        { id: "a", principle: "Scarcity", text: "I should let you know — another buyer has a showing scheduled for tomorrow morning. I've seen houses in this neighborhood go fast.", correct: true },
        { id: "b", principle: "Liking", text: "I can tell this house really speaks to you. It's rare to see a couple connect with a property this way.", correct: false },
        { id: "c", principle: "Reciprocity", text: "I've shown you twelve houses over the past month. I think we've found the one — let's make this happen.", correct: false },
        { id: "d", principle: "Logos", text: "Based on the comps, this house is priced about 5% below market. The numbers make sense.", correct: false }
      ],
      explanation: "Scarcity drives action because loss aversion is stronger than the desire for gain — Kahneman's prospect theory shows people feel losses roughly twice as intensely as equivalent gains. The key: the scarcity is real (another buyer), making it ethical and effective. The couple already likes the house — they need a reason to decide NOW rather than later.",
      spotlight: { principle: "Scarcity", text: "Scarcity works through loss aversion — the psychological principle that losing something feels about twice as bad as gaining something equivalent feels good. Real scarcity (genuine deadlines, actual competition) is both more ethical and more effective than manufactured urgency." }
    },
    {
      id: "m4-p1-s2", title: "The Favor Economy",
      scenario: "You need a colleague from another department to prioritize your project, which isn't in their formal workload. You helped them with a major presentation last month. They say: 'I'm swamped right now — can this wait until next quarter?'",
      options: [
        { id: "a", principle: "Reciprocity", text: "I totally understand you're buried. Remember when I helped pull together the Q2 presentation last month? I'd really appreciate you fitting this in — it shouldn't take more than a few hours.", correct: true },
        { id: "b", principle: "Authority", text: "Leadership has flagged this as a priority initiative. I'd hate for it to come up in their review that it stalled.", correct: false },
        { id: "c", principle: "Scarcity", text: "If we don't get this done by month-end, the budget allocation expires and we lose the funding.", correct: false },
        { id: "d", principle: "Commitment & Consistency", text: "You mentioned at the last all-hands that cross-functional collaboration was something you cared about.", correct: false }
      ],
      explanation: "Reciprocity is the natural lever here because you've already invested. Cialdini's research shows the reciprocity obligation is powerful and deeply ingrained. Notice the approach: acknowledge their reality first ('you're buried'), then reference the specific favor (not vaguely), then make the ask specific and bounded ('a few hours'). This minimizes their cost while activating the obligation.",
      spotlight: { principle: "Reciprocity", text: "The reciprocity principle works because unreturned favors create genuine psychological discomfort. The most effective reciprocity: be specific about what you gave, acknowledge their constraints, and make your ask proportional and bounded." }
    },
    {
      id: "m4-p1-s3", title: "The Dealer Call to Action",
      scenario: "A dealer in your association agrees that the bill is important but hasn't actually called their legislator despite three email reminders. You call them directly. They say: 'Yeah, I've been meaning to do it. I'm just not sure what to say.'",
      options: [
        { id: "a", principle: "Pathos", text: "I get it. But think about this — if this bill doesn't pass, your business model could fundamentally change. Your employees are counting on you to stand up.", correct: false },
        { id: "b", principle: "Reciprocity", text: "The association has been fighting this battle for two years on your behalf. A 5-minute phone call is all we're asking.", correct: false },
        { id: "c", principle: "Scarcity + Logos", text: "The committee vote is Thursday. If the legislator doesn't hear from a constituent before then, we lose the vote. I can give you a simple script right now — it'll take you 3 minutes.", correct: true },
        { id: "d", principle: "Social Proof", text: "Fifteen other dealers in your region have already called. Your legislator has heard from everyone except you.", correct: false }
      ],
      explanation: "This person's barrier isn't motivation — they already agree. Their barrier is uncertainty ('not sure what to say') and procrastination. Scarcity (the deadline) plus Logos (a concrete script and a specific time commitment) directly removes both barriers. You're making it easy AND urgent simultaneously. Pathos (A) adds emotional weight they don't need. Reciprocity (B) creates guilt rather than action. Social Proof (D) might actually backfire — it could make them feel their call isn't needed since others already called.",
      spotlight: { principle: "Scarcity", text: "Scarcity is most actionable when paired with simplicity. A deadline alone creates anxiety; a deadline plus a clear, easy path to action creates movement. Always pair 'you must act now' with 'and here's exactly how.'" }
    },
    {
      id: "m4-p1-s4", title: "The Urgency Frame",
      scenario: "Your bill has passed committee and leadership is deciding whether to call it for a floor vote before the session break. The majority leader's office says: 'We like the bill but it's not a priority. We might pick it up next session.' You need to create urgency.",
      options: [
        { id: "a", principle: "Scarcity", text: "If this waits until next session, we lose three co-sponsors to term limits and start from zero. The coalition we've built won't survive the off-season.", correct: true },
        { id: "b", principle: "Pathos", text: "There are families whose livelihoods depend on this protection. Every day we wait is a day they're at risk.", correct: false },
        { id: "c", principle: "Social Proof", text: "Sixteen co-sponsors, a unanimous committee vote, and support from the Governor's office. This is a ready-made win for the caucus.", correct: false },
        { id: "d", principle: "Calibrated Question", text: "What would it take to get this on the calendar before break?", correct: false }
      ],
      explanation: "Scarcity works here because it's specific, concrete, and credible. You're showing real loss (co-sponsors to term limits, coalition attrition). Loss aversion means 'we lose what we've built' is more motivating than 'we could gain a win' (C). Social Proof (C) is a good supporting argument but doesn't create urgency by itself. The calibrated question (D) is useful but should come AFTER you've established why it can't wait.",
      spotlight: { principle: "Scarcity", text: "In legislative contexts, the most compelling scarcity arguments are about coalition attrition and political window closure — not just session deadlines. 'We lose co-sponsors to term limits' is more concrete and credible than 'the clock is ticking.'" }
    },
    {
      id: "m4-p1-s5", title: "The Closing Ask",
      scenario: "You're in the final minutes of a meeting with a legislator who has been nodding along and saying encouraging things but hasn't committed. She says: 'This all makes sense. I'll definitely take a close look at it.' You know from experience that 'take a close look' means they'll forget about it by tomorrow.",
      options: [
        { id: "a", principle: "Tactical Silence", text: "After she says she'll 'take a close look,' pause for 5-7 seconds of silence and maintain comfortable eye contact. Let the space create discomfort with a non-committal answer.", correct: true },
        { id: "b", principle: "Commitment & Consistency", text: "I appreciate that. Before I go, can I tell the sponsor that you're a 'likely yes' when this comes to the floor? She's trying to get a count.", correct: false },
        { id: "c", principle: "Reciprocity", text: "I really appreciate your time today. If there's anything my team can help your office with on any issue, please don't hesitate to ask.", correct: false },
        { id: "d", principle: "Scarcity", text: "The committee vote is next Tuesday. Could your team review it and let us know by Friday?", correct: false }
      ],
      explanation: "Tactical silence after a vague commitment forces the other person to fill the void — and when they do, they almost always either upgrade their commitment or reveal their real objection. 'I'll take a close look' is a polite dismissal, and every other response lets them off the hook. Silence says 'I heard you, and I'm waiting for something more concrete' without being confrontational. It disrupts the social script of the polite brush-off.",
      spotlight: { principle: "Tactical Silence", text: "Silence is deeply uncomfortable in professional settings — most people rush to fill it. Voss teaches that strategic silence after an ask is one of the most powerful tools available. It signals confidence, creates productive discomfort, and forces the other person to respond with substance rather than pleasantries." }
    }
  ]
};

const PHASE2_SCENARIOS = {
  "module-1": [
    { id: "m1-p2-s1", title: "The Cold Outreach Email", scenario: "You need to email someone you've never met — a regional business leader — to ask for a 30-minute meeting. You have one mutual connection (a chamber of commerce director) and you know this person recently gave a talk about workforce development, which connects to an issue your organization is working on. Write the email.", principles: ["Liking", "Ethos", "Tactical Empathy + Labeling"] },
    { id: "m1-p2-s2", title: "The Frustrated Member", scenario: "A long-time member of your trade association calls and says they're thinking about not renewing. They feel like the organization only cares about big companies and doesn't represent smaller operators. They say: 'Every time I come to a meeting, it's all about the big guys' problems. Nobody asks what we need.' Write what you would say to them on this phone call.", principles: ["Tactical Empathy + Labeling", "Liking", "Ethos"] },
    { id: "m1-p2-s3", title: "The Legislator's Chief of Staff", scenario: "You have a meeting with a legislator's chief of staff. The legislator is undecided on your bill. The chief of staff is the gatekeeper — if you don't win them over, you'll never get a meeting with the member. The chief of staff opens by saying: 'We've got a lot on our plate this session. Tell me quickly why this should be a priority.' You have about 90 seconds. Write what you would say.", principles: ["Ethos", "Liking", "Tactical Empathy + Labeling"] },
    { id: "m1-p2-s4", title: "The Post-Hearing Follow-Up", scenario: "You just testified at a committee hearing. One committee member — Rep. Torres — asked you a tough question during testimony that you answered adequately but not brilliantly. Afterward, her legislative aide approached you and said the Rep appreciated your testimony. Write a follow-up email to Rep. Torres within 24 hours of the hearing.", principles: ["Liking", "Ethos", "Tactical Empathy + Labeling"] },
    { id: "m1-p2-s5", title: "The Coalition Partner Disagreement", scenario: "Your coalition partner — another trade association — wants to add an amendment to your bill that you think weakens it. They're threatening to withdraw support if the amendment isn't included. You need to have a call with their executive director. You value the coalition but can't accept the amendment. Write your opening statement for the call (the first 60 seconds of what you'd say).", principles: ["Tactical Empathy + Labeling", "Ethos", "Liking"] }
  ],
  "module-2": [
    { id: "m2-p2-s1", title: "The Small Commitment", scenario: "You're organizing a charity fundraiser and need volunteers. You're talking to a coworker who seems interested but hasn't committed. They say: 'Sounds like a good cause. I'll try to make it if I can.' You know from experience that 'I'll try' means they probably won't show up. Write what you'd say to convert this soft interest into a concrete commitment.", principles: ["Commitment & Consistency", "Mirroring", "Logos"] },
    { id: "m2-p2-s2", title: "The Vendor Pushback", scenario: "You're a manager negotiating with a software vendor who wants a 3-year contract. You want to start with 1 year to evaluate the product. The vendor says: 'We only do multi-year agreements at this price point. If you want a single year, it would be 40% more per month.' Write your response.", principles: ["Mirroring", "Commitment & Consistency", "Logos"] },
    { id: "m2-p2-s3", title: "The Grassroots Activation Email", scenario: "You need to send an email to 200 auto dealers in your association asking them to call their state representative about your bill this week. Most of them have never made a legislative call before. The bill is in committee and needs to move in the next 10 days. Write the email that will get the highest response rate.", principles: ["Commitment & Consistency", "Logos", "Mirroring"] },
    { id: "m2-p2-s4", title: "The Sponsor Prep", scenario: "Your bill sponsor needs to present the bill in committee tomorrow. She's supportive but not deeply versed in the details. She asks you: 'Give me three talking points I can use that will resonate with this committee. Keep it simple.' The committee has 5 Democrats and 4 Republicans. Write the three talking points.", principles: ["Logos", "Commitment & Consistency", "Mirroring"] },
    { id: "m2-p2-s5", title: "The Floor Speech Prep", scenario: "Your bill has passed committee and is heading to the full chamber for a vote. The sponsor asks you to draft a 2-minute floor speech. The audience is the full House — a mix of supporters, opponents, and many who haven't focused on this issue. The speech needs to win undecideds, not just energize supporters. Write the speech.", principles: ["Logos", "Commitment & Consistency", "Mirroring"] }
  ],
  "module-3": [
    { id: "m3-p2-s1", title: "The Group Persuasion", scenario: "You're on a condo board and want to propose a significant assessment increase to fund building repairs. Most residents are resistant to any cost increases. You need to present this at the annual meeting. Write your 2-minute presentation opening.", principles: ["Social Proof", "Authority", "Calibrated Questions"] },
    { id: "m3-p2-s2", title: "The Resistant Department", scenario: "You've been tasked with getting the sales team to adopt a new CRM system. They hate change. The sales director told you privately: 'My guys see this as corporate making their lives harder.' Write the email you'd send to the sales team introducing the new system.", principles: ["Social Proof", "Authority", "Calibrated Questions"] },
    { id: "m3-p2-s3", title: "The Media Interview Prep", scenario: "A reporter from the state's largest newspaper wants to interview you about your bill. The reporter has previously written a piece quoting opposition arguments. You have 30 minutes and expect tough questions. Write your three key messages (the core statements you will steer every answer back to, regardless of what's asked).", principles: ["Authority", "Social Proof", "Calibrated Questions"] },
    { id: "m3-p2-s4", title: "The Bipartisan Pitch", scenario: "You have a 5-minute meeting with the minority leader to ask for Republican support for your bill. The minority leader cares about free markets, limited regulation, and jobs. Your bill could be framed as either pro-business protection OR as market regulation. Write your pitch.", principles: ["Authority", "Social Proof", "Calibrated Questions"] },
    { id: "m3-p2-s5", title: "The Opposition Rebuttal", scenario: "The opposition has published a one-page fact sheet claiming your bill will 'restrict consumer choice, raise prices, and protect a monopoly.' Your bill sponsor's office asks you to write a rebuttal fact sheet. Write the rebuttal.", principles: ["Authority", "Social Proof", "Calibrated Questions"] }
  ],
  "module-4": [
    { id: "m4-p2-s1", title: "The Donation Ask", scenario: "You're calling alumni to ask for donations to your university's scholarship fund. The person on the line is a successful graduate who hasn't donated before. They seem open to talking but haven't expressed interest in giving. Write your pitch (what you'd say after initial pleasantries).", principles: ["Reciprocity", "Pathos", "Scarcity"] },
    { id: "m4-p2-s2", title: "The Project Rescue", scenario: "Your team's project is behind schedule. You need to convince your boss to approve overtime budget and pull a resource from another team. Your boss is cost-conscious and has pushed back on overtime requests before. She says: 'Make your case — but know that I turned down the last three overtime requests.' Write your pitch.", principles: ["Scarcity", "Pathos", "Reciprocity", "Tactical Silence"] },
    { id: "m4-p2-s3", title: "The Grassroots Rally Invitation", scenario: "Your association is organizing a rally at the state capitol to show legislator support for your bill. You need 100 dealers to show up on a Tuesday morning — which means they're closing their businesses for half a day. Write the invitation email that maximizes attendance.", principles: ["Scarcity", "Pathos", "Reciprocity", "Social Proof"] },
    { id: "m4-p2-s4", title: "The Governor's Office Ask", scenario: "Your bill has passed both chambers. The Governor hasn't signaled whether they'll sign it. You get a 15-minute meeting with the Governor's senior policy advisor. This is your only shot. Write your opening remarks (first 2 minutes).", principles: ["Pathos", "Authority", "Scarcity", "Reciprocity"] },
    { id: "m4-p2-s5", title: "The Veto Override Campaign", scenario: "The Governor has vetoed your bill. You need a two-thirds majority in both chambers to override. You currently have simple majority support but need to convert 8 more votes. Write the text message you'd send to your champion sponsor right now (this is urgent, informal, strategic).", principles: ["Scarcity", "Tactical Silence", "Reciprocity", "Pathos"] }
  ]
};

const PHASE3_SCENARIOS = {
  "module-1": [
    {
      id: "m1-p3-s1", title: "The Undecided Legislator",
      setup: "You're meeting one-on-one with State Rep. Marcus Webb in his office. Rep. Webb is a moderate Democrat in his second term. He's on the committee that will hear your bill. He's generally sympathetic to your industry but cautious about taking positions that could draw opposition. His district has 12 dealerships that employ about 400 people total. Your goal: get him to commit to voting yes in committee.",
      character: { name: "Rep. Marcus Webb", traits: "polite, cautious, asks practical questions, worried about unintended consequences, responds well to empathy and concrete constituent impact, resistant to pressure tactics" },
      opening: "Thanks for coming in. I've read the summary your team sent over. I understand the concept, but I've got a few concerns I want to talk through before I commit to anything.",
      maxExchanges: 4
    },
    {
      id: "m1-p3-s2", title: "The Resistant Industry Contact",
      setup: "You're at an industry conference and find yourself in conversation with Dana Chen, the government affairs director for a major manufacturer. Your organization is trying to build a coalition of manufacturers to support your legislation, but Dana's company has been neutral. You have about 10 minutes of casual conversation before the next panel starts. Your goal: get Dana to agree to a follow-up call to discuss the bill.",
      character: { name: "Dana Chen", traits: "professional, guarded, non-committal, expert at deflecting asks, will warm up if she feels respected and not pressured" },
      opening: "Nice to meet you. I've heard about the bill — interesting approach. We've been watching it but haven't really taken a deep look yet.",
      maxExchanges: 4
    }
  ],
  "module-2": [
    {
      id: "m2-p3-s1", title: "The Committee Negotiation",
      setup: "You're in a private meeting with Rep. Janet Park, the vice-chair of the committee hearing your bill. She's willing to support the bill but wants to add an amendment requiring a sunset provision (the bill would expire in 5 years unless renewed). Your sponsor is open to this if necessary. Your goal: negotiate the sunset term to be as long as possible (ideally 7-10 years, minimum 5).",
      character: { name: "Rep. Janet Park", traits: "logical, detail-oriented, negotiates in good faith but firmly, respects preparation and data, doesn't respond to emotional appeals" },
      opening: "I've reviewed the bill. I think the concept is sound, but I need a sunset clause before I can vote yes. Show me the bill works in practice and I'll be there for the renewal. Five years should be enough to prove the concept.",
      maxExchanges: 4
    }
  ],
  "module-3": [
    {
      id: "m3-p3-s1", title: "The Editorial Board Meeting",
      setup: "You've been invited to meet with the editorial board of the state's largest newspaper to make the case for your bill. The editorial board is skeptical — their paper has editorially leaned against industry protections in the past. There are three board members present. Your goal: convince them to write a favorable editorial, or at minimum, a neutral one.",
      character: { name: "Margaret Huang", traits: "intellectual, asks challenging questions, values data and independent analysis, skeptical of industry lobbying, respects candor and will punish spin" },
      opening: "Thanks for coming in. We've been following this bill. I'll be direct — our instinct is that this is protectionism. Change my mind.",
      maxExchanges: 4
    }
  ],
  "module-4": [
    {
      id: "m4-p3-s1", title: "The Final Vote Push",
      setup: "It's the night before the committee vote. You're on the phone with Rep. Angela Simmons, a Democrat who voted yes in subcommittee but has gone quiet. Word is the opposition made a last-minute push with her office. Your goal: lock down her yes vote before tomorrow.",
      character: { name: "Rep. Angela Simmons", traits: "supportive in principle but nervous about opposition pressure, responds to loyalty and relationships, needs emotional reassurance more than data, will shut down if she feels ambushed" },
      opening: "Hi. Look, I know why you're calling. I'm still supportive, but I had a meeting today that raised some issues I hadn't considered. I'm not saying I'm a no, but I need to think this through.",
      maxExchanges: 4
    }
  ]
};

const REFERENCE_DATA = [
  { module: "module-1", name: "Liking", source: "Cialdini", definition: "People say yes to those they like.", mechanism: "Similarity, compliments, familiarity, cooperation, and association increase liking. We trust and comply with people we feel connected to. This operates largely through System 1 — it's automatic and emotional.", legislativeExample: "Finding common ground with a legislator (shared hometown, mutual acquaintance, similar values) before making your policy ask.", useWhen: "Building new relationships, opening meetings, first impressions.", dontUseWhen: "The situation requires hard evidence or the relationship is already established and you need to drive action." },
  { module: "module-1", name: "Tactical Empathy + Labeling", source: "Voss", definition: "Demonstrating understanding of someone's feelings and perspective, then naming their emotions aloud.", mechanism: "When people feel heard, their defenses lower. Labeling emotions ('It seems like you're frustrated with...') activates the prefrontal cortex and reduces amygdala activity — literally calming the brain. This creates psychological safety.", legislativeExample: "When a legislator expresses concern about political blowback: 'It sounds like the political risk feels bigger than the policy upside right now.'", useWhen: "Someone is emotional, resistant, or feels unheard. When you sense hidden objections.", dontUseWhen: "The person is asking for data or substance, not emotional validation." },
  { module: "module-1", name: "Ethos", source: "Aristotle", definition: "Persuasion through the character and credibility of the speaker.", mechanism: "Ethos has three components: competence (you know what you're talking about), trustworthiness (you're honest), and goodwill (you care about the audience's interests). All three must be present. Audiences evaluate credibility before evaluating arguments.", legislativeExample: "Bringing an independent economist or university researcher to testify rather than your own lobbyist.", useWhen: "Your audience is skeptical or doesn't know you well. When source credibility will determine whether your message gets a hearing.", dontUseWhen: "You've already established credibility and need to move to substance or action." },
  { module: "module-2", name: "Commitment & Consistency", source: "Cialdini", definition: "Once people commit to something, they feel internal pressure to behave consistently with that commitment.", mechanism: "The drive for consistency is a central motivator of behavior. Public commitments are stronger than private ones. Written stronger than verbal. Active stronger than passive. This exploits the foot-in-the-door effect — small yeses lead to bigger yeses.", legislativeExample: "Getting a legislator to say publicly that they support consumer protection, then connecting your bill to that stated value.", useWhen: "You need to escalate from soft support to hard commitment. When you can get a small agreement first.", dontUseWhen: "The person feels pressured or trapped — this can trigger reactance if it feels manipulative." },
  { module: "module-2", name: "Mirroring", source: "Voss", definition: "Repeating the last few words (or critical words) someone just said.", mechanism: "Mirroring signals active listening, builds rapport, and — most importantly — prompts the other person to elaborate. It's a low-risk information-gathering tool that keeps conversations going without committing you to a position.", legislativeExample: "Legislator says 'We're worried about unintended consequences.' You respond: 'Unintended consequences?' They then explain exactly what worries them.", useWhen: "You need more information. When you want to keep someone talking. When you need time to think.", dontUseWhen: "You already have the information you need and it's time to make your case or close." },
  { module: "module-2", name: "Logos", source: "Aristotle", definition: "Persuasion through logical argument, evidence, data, and reasoning.", mechanism: "Logos engages System 2 (deliberative thinking). It's most effective when the audience is motivated and able to process complex information. Strong arguments with evidence create durable attitude change.", legislativeExample: "Providing a fiscal impact analysis, economic data, or state-by-state comparison to support your bill.", useWhen: "Your audience values evidence, is in analytical mode, or you need to create durable (not just temporary) support.", dontUseWhen: "The audience is emotional, distracted, or has already made up their mind based on values/identity." },
  { module: "module-3", name: "Social Proof", source: "Cialdini", definition: "People determine correct behavior by looking at what others are doing, especially in uncertain situations.", mechanism: "Social proof is strongest when the 'others' are similar to the target and when the situation is ambiguous. Volume and recency matter.", legislativeExample: "Showing a legislator that their colleagues, peer states, or members of their caucus already support the bill.", useWhen: "The target is uncertain or risk-averse. When you can show broad or relevant support.", dontUseWhen: "The target prides themselves on independent thinking or when the 'proof' comes from dissimilar sources." },
  { module: "module-3", name: "Authority", source: "Cialdini", definition: "People defer to credible experts and legitimate authority figures.", mechanism: "Authority cues include titles, expertise, institutional affiliation, and visible symbols of authority. People follow authority as a cognitive shortcut — it's easier to trust an expert than evaluate every claim yourself.", legislativeExample: "Having a university professor or nonpartisan research institute endorse your bill's economic projections.", useWhen: "Your audience lacks expertise on the topic or values institutional credibility.", dontUseWhen: "The audience is anti-establishment or when authority claims come across as arrogant or dismissive." },
  { module: "module-3", name: "Calibrated Questions", source: "Voss", definition: "Open-ended 'How' and 'What' questions that give the other side the illusion of control while steering the conversation.", mechanism: "Calibrated questions make the other person work on your problem. 'What would it take to make this work?' gets them designing solutions. They feel in control while you direct the conversation.", legislativeExample: "When a legislator says they can't support your bill: 'What would need to change for you to be comfortable supporting this?'", useWhen: "You're facing resistance. When you need information about someone's real objections. When direct asks have failed.", dontUseWhen: "You need to be direct and specific (e.g., final closing ask). Overuse can feel evasive." },
  { module: "module-4", name: "Scarcity", source: "Cialdini", definition: "Things become more desirable when they're rare, diminishing, or at risk of being lost.", mechanism: "Loss aversion (Kahneman) means people feel losses about twice as intensely as equivalent gains. Deadlines, limited windows, and exclusive access all trigger urgency. Scarcity is most effective when it's real and specific.", legislativeExample: "If this doesn't move before session ends, we lose three co-sponsors to term limits and start from zero next year.", useWhen: "You need to drive action, not just agreement. When there's a real deadline or cost of delay.", dontUseWhen: "The scarcity is manufactured or the audience will perceive pressure as manipulative." },
  { module: "module-4", name: "Reciprocity", source: "Cialdini", definition: "People feel obligated to return favors, gifts, and concessions.", mechanism: "The reciprocity obligation is one of the most deeply ingrained social norms. It works even when the initial gift was uninvited. Give first, then ask. The gift should be meaningful, unexpected, and personalized for maximum effect.", legislativeExample: "Providing a legislator's office with useful research on an unrelated issue they're working on, then later asking for their support on your bill.", useWhen: "You've provided value and need to make an ask. When building long-term relationships.", dontUseWhen: "It would feel transactional or like a bribe. When the relationship is too new for the 'return' ask to feel natural." },
  { module: "module-4", name: "Pathos", source: "Aristotle", definition: "Persuasion through emotional appeal — stories, vivid language, and appeals to values.", mechanism: "Pathos engages System 1 and creates the motivational energy to act. Data tells people what to think; emotion tells them what to do. Stories are the primary vehicle for pathos because they create identification and transport.", legislativeExample: "Having a small-town dealer tell the committee about their family's three-generation business and what losing it would mean to their community.", useWhen: "You need to move people from understanding to action. When data alone isn't driving commitment.", dontUseWhen: "The audience has explicitly asked for evidence and will punish emotional appeals as manipulative." },
  { module: "module-4", name: "Tactical Silence", source: "Voss", definition: "Strategic use of silence after making a point or asking a question.", mechanism: "Silence creates social pressure to fill the void. When you stop talking, the other person almost always talks — and when they do, they often reveal information, upgrade commitments, or make concessions. It also signals confidence and control.", legislativeExample: "After asking a legislator for their vote, pausing and maintaining eye contact instead of immediately filling the silence with more arguments.", useWhen: "After making an ask. After labeling an emotion. When you've said enough and need the other person to respond.", dontUseWhen: "The silence will be read as hostile or disengaged (cultural context matters)." }
];

// ═══════════════════════════════════════════════════════════════
// UTILITIES — Storage, API, Helpers
// ═══════════════════════════════════════════════════════════════

const STORAGE_KEY = "persuasion-gym:progress";

const defaultProgress = () => ({
  modules: {
    "module-1": { phase1: { completed: [], scores: {} }, phase2: { completed: [], scores: {} }, phase3: { completed: [], scores: {} } },
    "module-2": { phase1: { completed: [], scores: {} }, phase2: { completed: [], scores: {} }, phase3: { completed: [], scores: {} } },
    "module-3": { phase1: { completed: [], scores: {} }, phase2: { completed: [], scores: {} }, phase3: { completed: [], scores: {} } },
    "module-4": { phase1: { completed: [], scores: {} }, phase2: { completed: [], scores: {} }, phase3: { completed: [], scores: {} } }
  },
  principleStats: {},
  lastActivity: new Date().toISOString()
});

async function loadProgress() {
  try {
    const result = await window.storage.get(STORAGE_KEY);
    return JSON.parse(result.value);
  } catch {
    return defaultProgress();
  }
}

async function saveProgress(progress) {
  try {
    progress.lastActivity = new Date().toISOString();
    await window.storage.set(STORAGE_KEY, JSON.stringify(progress));
  } catch {
    // silent fail — toast handled in component
  }
}

function parseApiJson(text) {
  let cleaned = text.trim();
  if (cleaned.startsWith("```")) {
    cleaned = cleaned.replace(/^```(?:json)?\s*/, "").replace(/\s*```$/, "");
  }
  return JSON.parse(cleaned);
}

async function callApi(systemPrompt, userMessage) {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      system: systemPrompt,
      messages: [{ role: "user", content: userMessage }]
    })
  });
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  const data = await res.json();
  return data.content[0].text;
}

function getModuleScenarioCount(moduleId) {
  const p1 = (PHASE1_SCENARIOS[moduleId] || []).length;
  const p2 = (PHASE2_SCENARIOS[moduleId] || []).length;
  const p3 = (PHASE3_SCENARIOS[moduleId] || []).length;
  return p1 + p2 + p3;
}

function getModuleCompletedCount(moduleId, progress) {
  const m = progress.modules[moduleId];
  if (!m) return 0;
  return (m.phase1.completed?.length || 0) + (m.phase2.completed?.length || 0) + (m.phase3.completed?.length || 0);
}

function isPhaseUnlocked(moduleId, phase, progress) {
  if (phase === 1) return true;
  const m = progress.modules[moduleId];
  if (!m) return false;
  if (phase === 2) return (m.phase1.completed?.length || 0) >= 3;
  if (phase === 3) return (m.phase2.completed?.length || 0) >= 3;
  return false;
}

function getPrincipleStrength(name, progress) {
  const s = progress.principleStats[name];
  if (!s || s.attempts === 0) return "gray";
  if (s.avgRating !== undefined) {
    if (s.avgRating >= 4) return "green";
    if (s.avgRating >= 2.5) return "amber";
    return "red";
  }
  const rate = s.successes / s.attempts;
  if (rate >= 0.7) return "green";
  if (rate >= 0.4) return "amber";
  return "red";
}

const strengthColors = {
  green: "bg-emerald-100 text-emerald-700 border-emerald-300",
  amber: "bg-amber-100 text-amber-700 border-amber-300",
  red: "bg-rose-100 text-rose-700 border-rose-300",
  gray: "bg-slate-100 text-slate-400 border-slate-200"
};

const strengthLabels = {
  green: "Strong",
  amber: "Developing",
  red: "Needs Work",
  gray: "Not Attempted"
};

// ═══════════════════════════════════════════════════════════════
// COMPONENTS
// ═══════════════════════════════════════════════════════════════

function Toast({ message, onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 4000);
    return () => clearTimeout(t);
  }, [onClose]);
  return (
    <div className="fixed bottom-4 right-4 bg-slate-800 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 z-50">
      <AlertCircle className="w-4 h-4" />
      <span className="text-sm">{message}</span>
    </div>
  );
}

function StarRating({ rating }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map(i => (
        <Star key={i} className={`w-5 h-5 ${i <= rating ? "fill-amber-400 text-amber-400" : "text-slate-300"}`} />
      ))}
    </div>
  );
}

function NavBar({ view, setView }) {
  const tabs = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "modules", label: "Modules", icon: Layers },
    { id: "reference", label: "Reference", icon: Library }
  ];
  return (
    <div className="bg-white border-b border-slate-200 sticky top-0 z-40">
      <div className="max-w-4xl mx-auto px-4 flex items-center justify-between h-14">
        <div className="flex items-center gap-2">
          <Target className="w-6 h-6 text-indigo-600" />
          <span className="font-bold text-lg text-slate-900">Persuasion Gym</span>
        </div>
        <div className="flex gap-1">
          {tabs.map(t => (
            <button key={t.id} onClick={() => setView(t.id)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${view === t.id ? "bg-indigo-50 text-indigo-700" : "text-slate-600 hover:bg-slate-50"}`}>
              <t.icon className="w-4 h-4" />
              {t.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function Dashboard({ progress, onModuleSelect }) {
  const totalScenarios = MODULES.reduce((s, m) => s + getModuleScenarioCount(m.id), 0);
  const totalCompleted = MODULES.reduce((s, m) => s + getModuleCompletedCount(m.id, progress), 0);
  const allPrinciples = REFERENCE_DATA.map(r => r.name);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h2 className="text-xl font-bold text-slate-900 mb-1">Welcome to Persuasion Gym</h2>
        <p className="text-slate-600 mb-4">Master the science of persuasion through progressive scenario-based training.</p>
        <div className="flex gap-6">
          <div>
            <div className="text-2xl font-bold text-indigo-600">{totalCompleted}</div>
            <div className="text-sm text-slate-500">of {totalScenarios} scenarios</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-indigo-600">{MODULES.length}</div>
            <div className="text-sm text-slate-500">modules</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-indigo-600">13</div>
            <div className="text-sm text-slate-500">principles</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {MODULES.map(mod => {
          const total = getModuleScenarioCount(mod.id);
          const done = getModuleCompletedCount(mod.id, progress);
          const pct = total > 0 ? Math.round((done / total) * 100) : 0;
          return (
            <button key={mod.id} onClick={() => onModuleSelect(mod.id)}
              className={`bg-white rounded-xl shadow-sm border border-slate-200 p-6 text-left hover:shadow-md transition-shadow`}>
              <div className={`inline-block px-2 py-1 rounded-md text-xs font-medium ${mod.color.bg} ${mod.color.text} ${mod.color.border} border mb-3`}>
                {mod.name}
              </div>
              <p className="text-sm text-slate-600 mb-3">{mod.theme}</p>
              <div className="flex flex-wrap gap-1 mb-3">
                {mod.principles.map(p => (
                  <span key={p} className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">{p}</span>
                ))}
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2 mb-1">
                <div className="bg-indigo-600 h-2 rounded-full transition-all" style={{ width: `${pct}%` }} />
              </div>
              <div className="text-xs text-slate-500">{done}/{total} completed</div>
            </button>
          );
        })}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h3 className="font-bold text-slate-900 mb-4">Principle Strength Map</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {allPrinciples.map(name => {
            const strength = getPrincipleStrength(name, progress);
            return (
              <div key={name} className={`flex items-center justify-between px-3 py-2 rounded-lg border ${strengthColors[strength]}`}>
                <span className="text-sm font-medium">{name}</span>
                <span className="text-xs">{strengthLabels[strength]}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function ModuleView({ moduleId, progress, onPhaseSelect, onBack }) {
  const mod = MODULES.find(m => m.id === moduleId);
  const phases = [
    { num: 1, name: "Identify & Apply", desc: "Recognize which principle fits each scenario", icon: Eye, count: (PHASE1_SCENARIOS[moduleId] || []).length },
    { num: 2, name: "Craft Your Approach", desc: "Write your own response and get AI coaching", icon: MessageCircle, count: (PHASE2_SCENARIOS[moduleId] || []).length },
    { num: 3, name: "Live Scenario", desc: "Multi-turn conversation with an AI character", icon: Zap, count: (PHASE3_SCENARIOS[moduleId] || []).length }
  ];

  return (
    <div className="space-y-4">
      <button onClick={onBack} className="flex items-center gap-1 text-sm text-slate-600 hover:text-slate-900 transition-colors">
        <ChevronLeft className="w-4 h-4" /> Back to Modules
      </button>
      <div className={`bg-white rounded-xl shadow-sm border p-6 ${mod.color.border}`}>
        <div className={`inline-block px-2 py-1 rounded-md text-xs font-medium ${mod.color.bg} ${mod.color.text} border ${mod.color.border} mb-2`}>
          {mod.name}
        </div>
        <p className="text-slate-600 text-sm mb-3">{mod.theme}</p>
        <div className="flex flex-wrap gap-2">
          {mod.principleDetails.map(p => (
            <span key={p.name} className="text-xs px-2 py-1 rounded-full bg-slate-100 text-slate-600">{p.name} ({p.source})</span>
          ))}
        </div>
      </div>

      {phases.map(phase => {
        const unlocked = isPhaseUnlocked(moduleId, phase.num, progress);
        const phaseKey = `phase${phase.num}`;
        const completed = progress.modules[moduleId]?.[phaseKey]?.completed?.length || 0;
        const needed = phase.num === 2 ? 3 - (progress.modules[moduleId]?.phase1?.completed?.length || 0) : phase.num === 3 ? 3 - (progress.modules[moduleId]?.phase2?.completed?.length || 0) : 0;

        return (
          <div key={phase.num}
            className={`bg-white rounded-xl shadow-sm border border-slate-200 p-6 ${!unlocked ? "opacity-60" : ""}`}>
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg ${unlocked ? "bg-indigo-50 text-indigo-600" : "bg-slate-100 text-slate-400"}`}>
                  {unlocked ? <phase.icon className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">Phase {phase.num}: {phase.name}</h3>
                  <p className="text-sm text-slate-600 mt-0.5">{phase.desc}</p>
                  <div className="text-xs text-slate-500 mt-1">{completed}/{phase.count} completed</div>
                </div>
              </div>
              {unlocked ? (
                <button onClick={() => onPhaseSelect(phase.num)}
                  className="px-4 py-2 rounded-lg font-medium text-sm bg-indigo-600 text-white hover:bg-indigo-700 transition-colors">
                  {completed > 0 ? "Continue" : "Start"}
                </button>
              ) : (
                <span className="text-xs text-slate-400 mt-1">Complete {Math.max(0, needed)} more Phase {phase.num - 1} scenarios</span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function Phase1View({ moduleId, progress, onComplete, onBack }) {
  const scenarios = PHASE1_SCENARIOS[moduleId] || [];
  const completed = progress.modules[moduleId]?.phase1?.completed || [];
  const nextIdx = scenarios.findIndex(s => !completed.includes(s.id));
  const [idx, setIdx] = useState(nextIdx >= 0 ? nextIdx : 0);
  const [selected, setSelected] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [showSpotlight, setShowSpotlight] = useState(false);
  const scenario = scenarios[idx];

  if (!scenario) return <div className="text-center py-12 text-slate-500">All scenarios completed!</div>;

  const correctOption = scenario.options.find(o => o.correct);
  const isCorrect = selected === correctOption?.id;

  const handleSubmit = () => {
    if (!selected) return;
    setSubmitted(true);
    const p = { ...progress };
    const m = p.modules[moduleId];
    if (!m.phase1.completed.includes(scenario.id)) {
      m.phase1.completed.push(scenario.id);
      m.phase1.scores[scenario.id] = { correct: isCorrect, principlesTested: [correctOption.principle.split(" — ")[0].split(" ")[0]] };
    }
    const principleKey = correctOption.principle.split(" — ")[0];
    if (!p.principleStats[principleKey]) p.principleStats[principleKey] = { attempts: 0, successes: 0 };
    p.principleStats[principleKey].attempts++;
    if (isCorrect) p.principleStats[principleKey].successes++;
    saveProgress(p);
    onComplete(p);
  };

  const handleNext = () => {
    const ni = idx + 1;
    if (ni < scenarios.length) {
      setIdx(ni);
      setSelected(null);
      setSubmitted(false);
      setShowSpotlight(false);
    } else {
      onBack();
    }
  };

  return (
    <div className="space-y-4">
      <button onClick={onBack} className="flex items-center gap-1 text-sm text-slate-600 hover:text-slate-900">
        <ChevronLeft className="w-4 h-4" /> Back to Module
      </button>
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-slate-900">Phase 1: Identify & Apply</h2>
        <span className="text-sm text-slate-500">Scenario {idx + 1} of {scenarios.length}</span>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h3 className="font-semibold text-slate-900 mb-2">{scenario.title}</h3>
        <p className="text-slate-700 leading-relaxed">{scenario.scenario}</p>
      </div>

      <div className="space-y-3">
        {scenario.options.map(opt => {
          let borderClass = "border-slate-200 hover:border-indigo-300";
          let bgClass = "bg-white";
          if (submitted) {
            if (opt.correct) { borderClass = "border-emerald-400"; bgClass = "bg-emerald-50"; }
            else if (opt.id === selected) { borderClass = "border-amber-400"; bgClass = "bg-amber-50"; }
          } else if (opt.id === selected) {
            borderClass = "border-indigo-400"; bgClass = "bg-indigo-50";
          }
          return (
            <button key={opt.id} onClick={() => !submitted && setSelected(opt.id)}
              disabled={submitted}
              className={`w-full text-left rounded-xl border p-4 transition-all ${borderClass} ${bgClass}`}>
              <span className={`inline-block text-xs font-medium px-2 py-0.5 rounded-full mb-2 ${submitted && opt.correct ? "bg-emerald-100 text-emerald-700" : submitted && opt.id === selected ? "bg-amber-100 text-amber-700" : "bg-slate-100 text-slate-600"}`}>
                {opt.principle}
              </span>
              <p className="text-sm text-slate-700">{opt.text}</p>
              {submitted && opt.correct && (
                <div className="mt-2 flex items-center gap-1 text-emerald-600 text-xs font-medium">
                  <CheckCircle className="w-3.5 h-3.5" /> Best answer
                </div>
              )}
              {submitted && !opt.correct && opt.id === selected && (
                <div className="mt-2 flex items-center gap-1 text-amber-600 text-xs font-medium">
                  <XCircle className="w-3.5 h-3.5" /> Not the strongest choice
                </div>
              )}
            </button>
          );
        })}
      </div>

      {!submitted && (
        <button onClick={handleSubmit} disabled={!selected}
          className={`w-full py-3 rounded-lg font-medium transition-colors ${selected ? "bg-indigo-600 text-white hover:bg-indigo-700" : "bg-slate-200 text-slate-400 cursor-not-allowed"}`}>
          Submit Answer
        </button>
      )}

      {submitted && (
        <div className="space-y-4">
          <div className={`rounded-xl border p-5 ${isCorrect ? "bg-emerald-50 border-emerald-200" : "bg-amber-50 border-amber-200"}`}>
            <div className="flex items-center gap-2 mb-2">
              {isCorrect ? <CheckCircle className="w-5 h-5 text-emerald-600" /> : <Info className="w-5 h-5 text-amber-600" />}
              <span className={`font-semibold ${isCorrect ? "text-emerald-800" : "text-amber-800"}`}>
                {isCorrect ? "Correct!" : "Not quite — here's why"}
              </span>
            </div>
            <p className="text-sm text-slate-700 leading-relaxed">{scenario.explanation}</p>
          </div>

          <div className="bg-white rounded-xl border border-slate-200">
            <button onClick={() => setShowSpotlight(!showSpotlight)}
              className="w-full flex items-center justify-between p-4 text-left">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-indigo-600" />
                <span className="font-medium text-slate-900 text-sm">Principle Spotlight: {scenario.spotlight.principle}</span>
              </div>
              {showSpotlight ? <ChevronDown className="w-4 h-4 text-slate-400" /> : <ChevronRight className="w-4 h-4 text-slate-400" />}
            </button>
            {showSpotlight && (
              <div className="px-4 pb-4">
                <p className="text-sm text-slate-600 leading-relaxed">{scenario.spotlight.text}</p>
              </div>
            )}
          </div>

          <button onClick={handleNext}
            className="w-full py-3 rounded-lg font-medium bg-indigo-600 text-white hover:bg-indigo-700 transition-colors">
            {idx + 1 < scenarios.length ? "Next Scenario" : "Back to Module"} <ArrowRight className="w-4 h-4 inline ml-1" />
          </button>
        </div>
      )}
    </div>
  );
}

function Phase2View({ moduleId, progress, onComplete, onBack }) {
  const scenarios = PHASE2_SCENARIOS[moduleId] || [];
  const mod = MODULES.find(m => m.id === moduleId);
  const completed = progress.modules[moduleId]?.phase2?.completed || [];
  const nextIdx = scenarios.findIndex(s => !completed.includes(s.id));
  const [idx, setIdx] = useState(nextIdx >= 0 ? nextIdx : 0);
  const [response, setResponse] = useState("");
  const [coaching, setCoaching] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const scenario = scenarios[idx];

  if (!scenario) return <div className="text-center py-12 text-slate-500">All scenarios completed!</div>;

  const principleDefinitions = mod.principleDetails.map(p => `${p.name} (${p.source}): ${p.mechanism}`).join("\n");

  const handleGetCoaching = async () => {
    if (response.trim().length < 20) return;
    setLoading(true);
    setError(null);
    try {
      const systemPrompt = `You are a persuasion coach analyzing a student's response to a practice scenario. The student is learning persuasion fundamentals and is relatively new to these concepts.

The relevant principles for this module are:
${principleDefinitions}

The scenario was: ${scenario.scenario}

The student wrote: ${response}

Analyze their response and provide:
1. PRINCIPLES DETECTED: Which persuasion principles (from the module list) did they use? Be specific about where in their response you see each principle at work.
2. EFFECTIVENESS RATING: Rate 1-5 stars with a one-sentence justification.
3. WHAT WORKED: 1-2 specific things they did well (be encouraging and concrete).
4. GROWTH OPPORTUNITY: 1 specific thing they could improve, with an explanation of WHY it would be stronger.
5. ENHANCED VERSION: Rewrite their response incorporating the improvement, keeping their voice and intent.

Keep your tone encouraging but substantive. Don't patronize. Be specific, not generic.

Respond ONLY in this exact JSON format with no other text, no markdown backticks:
{"principles_detected": [{"name": "principle name", "evidence": "quote or description from their response"}], "rating": 3, "rating_justification": "one sentence", "what_worked": ["specific thing 1", "specific thing 2"], "growth_opportunity": {"issue": "what to improve", "why": "explanation", "how": "specific suggestion"}, "enhanced_version": "the rewritten response"}`;

      const result = await callApi(systemPrompt, response);
      const parsed = parseApiJson(result);
      setCoaching(parsed);

      const p = { ...progress };
      const m = p.modules[moduleId];
      if (!m.phase2.completed.includes(scenario.id)) {
        m.phase2.completed.push(scenario.id);
        m.phase2.scores[scenario.id] = { rating: parsed.rating, principlesUsed: parsed.principles_detected.map(pd => pd.name) };
      }
      parsed.principles_detected.forEach(pd => {
        if (!p.principleStats[pd.name]) p.principleStats[pd.name] = { attempts: 0, successes: 0, avgRating: 0 };
        const ps = p.principleStats[pd.name];
        const totalRating = ps.avgRating * ps.attempts + parsed.rating;
        ps.attempts++;
        ps.avgRating = totalRating / ps.attempts;
      });
      saveProgress(p);
      onComplete(p);
    } catch (e) {
      setError("Coaching unavailable right now. You can try again or move to the next scenario.");
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    const ni = idx + 1;
    if (ni < scenarios.length) {
      setIdx(ni);
      setResponse("");
      setCoaching(null);
      setError(null);
    } else {
      onBack();
    }
  };

  const handleTryAgain = () => {
    setResponse("");
    setCoaching(null);
    setError(null);
  };

  return (
    <div className="space-y-4">
      <button onClick={onBack} className="flex items-center gap-1 text-sm text-slate-600 hover:text-slate-900">
        <ChevronLeft className="w-4 h-4" /> Back to Module
      </button>
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-slate-900">Phase 2: Craft Your Approach</h2>
        <span className="text-sm text-slate-500">Scenario {idx + 1} of {scenarios.length}</span>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h3 className="font-semibold text-slate-900 mb-2">{scenario.title}</h3>
        <p className="text-slate-700 leading-relaxed">{scenario.scenario}</p>
      </div>

      <div className="flex flex-wrap gap-2">
        <span className="text-xs text-slate-500 self-center mr-1">Relevant principles:</span>
        {scenario.principles.map(p => (
          <span key={p} className={`text-xs px-2 py-1 rounded-full ${mod.color.badge} ${mod.color.text}`}>{p}</span>
        ))}
      </div>

      {!coaching && (
        <div className="space-y-3">
          <textarea
            value={response}
            onChange={e => setResponse(e.target.value)}
            placeholder="Write your response..."
            className="w-full min-h-[140px] p-4 rounded-xl border border-slate-200 text-sm text-slate-700 focus:outline-none focus:border-indigo-300 focus:ring-1 focus:ring-indigo-300 resize-y"
          />
          <button onClick={handleGetCoaching}
            disabled={response.trim().length < 20 || loading}
            className={`w-full py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 ${response.trim().length >= 20 && !loading ? "bg-indigo-600 text-white hover:bg-indigo-700" : "bg-slate-200 text-slate-400 cursor-not-allowed"}`}>
            {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Your coach is reviewing your response...</> : "Get Coaching"}
          </button>
          {error && <div className="text-sm text-rose-600 bg-rose-50 rounded-lg p-3 flex items-center gap-2"><AlertCircle className="w-4 h-4" />{error}</div>}
        </div>
      )}

      {coaching && (
        <div className="space-y-4">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 space-y-5">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <StarRating rating={coaching.rating} />
                <span className="text-sm font-medium text-slate-700">{coaching.rating}/5</span>
              </div>
              <p className="text-sm text-slate-600">{coaching.rating_justification}</p>
            </div>

            {coaching.principles_detected?.length > 0 && (
              <div>
                <h4 className="font-semibold text-sm text-slate-900 mb-2">Principles You Used</h4>
                <div className="space-y-2">
                  {coaching.principles_detected.map((pd, i) => (
                    <div key={i} className="bg-indigo-50 rounded-lg p-3">
                      <span className="text-xs font-medium text-indigo-700 block mb-1">{pd.name}</span>
                      <p className="text-sm text-slate-600">{pd.evidence}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {coaching.what_worked?.length > 0 && (
              <div>
                <h4 className="font-semibold text-sm text-slate-900 mb-2 flex items-center gap-1"><CheckCircle className="w-4 h-4 text-emerald-600" /> What Worked</h4>
                <ul className="space-y-1">
                  {coaching.what_worked.map((w, i) => <li key={i} className="text-sm text-slate-600 pl-3 border-l-2 border-emerald-300">{w}</li>)}
                </ul>
              </div>
            )}

            {coaching.growth_opportunity && (
              <div>
                <h4 className="font-semibold text-sm text-slate-900 mb-2 flex items-center gap-1"><TrendingUp className="w-4 h-4 text-amber-600" /> Try This</h4>
                <div className="bg-amber-50 rounded-lg p-3 space-y-1">
                  <p className="text-sm font-medium text-amber-800">{coaching.growth_opportunity.issue}</p>
                  <p className="text-sm text-slate-600">{coaching.growth_opportunity.why}</p>
                  <p className="text-sm text-slate-700 italic">{coaching.growth_opportunity.how}</p>
                </div>
              </div>
            )}

            {coaching.enhanced_version && (
              <div>
                <h4 className="font-semibold text-sm text-slate-900 mb-2">Enhanced Version</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="bg-slate-50 rounded-lg p-3">
                    <span className="text-xs font-medium text-slate-500 block mb-1">Your Version</span>
                    <p className="text-sm text-slate-700">{response}</p>
                  </div>
                  <div className="bg-indigo-50 rounded-lg p-3">
                    <span className="text-xs font-medium text-indigo-600 block mb-1">Enhanced</span>
                    <p className="text-sm text-slate-700">{coaching.enhanced_version}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex gap-3">
            <button onClick={handleTryAgain}
              className="flex-1 py-3 rounded-lg font-medium border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors flex items-center justify-center gap-2">
              <RotateCcw className="w-4 h-4" /> Try Again
            </button>
            <button onClick={handleNext}
              className="flex-1 py-3 rounded-lg font-medium bg-indigo-600 text-white hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2">
              {idx + 1 < scenarios.length ? "Next Scenario" : "Back to Module"} <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function Phase3View({ moduleId, progress, onComplete, onBack }) {
  const scenarios = PHASE3_SCENARIOS[moduleId] || [];
  const mod = MODULES.find(m => m.id === moduleId);
  const completed = progress.modules[moduleId]?.phase3?.completed || [];
  const nextIdx = scenarios.findIndex(s => !completed.includes(s.id));
  const [idx] = useState(nextIdx >= 0 ? nextIdx : 0);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [coachNotes, setCoachNotes] = useState([]);
  const [debrief, setDebrief] = useState(null);
  const [error, setError] = useState(null);
  const chatEndRef = useRef(null);
  const scenario = scenarios[idx];

  useEffect(() => {
    if (scenario && messages.length === 0) {
      setMessages([{ role: "character", text: scenario.opening }]);
    }
  }, [scenario]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!scenario) return <div className="text-center py-12 text-slate-500">All scenarios completed!</div>;

  const exchangeCount = messages.filter(m => m.role === "user").length;
  const isLastExchange = exchangeCount >= scenario.maxExchanges;

  const principleDefinitions = mod.principleDetails.map(p => `${p.name} (${p.source}): ${p.mechanism}`).join("\n");

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    const userMsg = input.trim();
    const newMessages = [...messages, { role: "user", text: userMsg }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);
    setError(null);

    const history = newMessages.map(m => `${m.role === "character" ? scenario.character.name : "You"}: ${m.text}`).join("\n");
    const currentExchange = exchangeCount + 1;
    const isFinal = currentExchange >= scenario.maxExchanges;

    try {
      const [charResponse, coachResponse] = await Promise.all([
        callApi(
          `You are playing a character in a persuasion training exercise. Stay in character throughout.\n\nCHARACTER: ${scenario.character.name} — ${scenario.character.traits}\nSITUATION: ${scenario.setup}\nTHE STUDENT'S GOAL: To persuade you effectively using principles from these frameworks: Cialdini, Voss, Aristotle.\n\nImportant: Be realistic, not a pushover. React naturally to what the student says. If they use effective persuasion, show gradual movement. If they're heavy-handed or miss the mark, push back naturally. Don't break character or mention persuasion principles.\n\nPrevious conversation:\n${history}\n\nRespond in character in 2-4 sentences. Be natural and conversational.`,
          userMsg
        ),
        callApi(
          `You are a persuasion coach providing real-time feedback during a training exercise. The student is practicing these principles:\n${principleDefinitions}\n\nThe scenario is: ${scenario.setup}\nThe conversation so far:\n${history}\nThe student just said: ${userMsg}\n\nProvide brief coaching (this appears in a sidebar, keep it concise):\n\nRespond ONLY in this exact JSON format with no other text, no markdown backticks:\n{"principle_used": ["principle name or None detected"], "effectiveness": "one sentence", "tip": "one concrete suggestion for their next response"}`,
          userMsg
        )
      ]);

      setMessages(prev => [...prev, { role: "character", text: charResponse }]);

      try {
        const coachParsed = parseApiJson(coachResponse);
        setCoachNotes(prev => [...prev, coachParsed]);
      } catch {
        setCoachNotes(prev => [...prev, { principle_used: ["Analysis unavailable"], effectiveness: "Could not parse feedback.", tip: "Continue the conversation naturally." }]);
      }

      if (isFinal) {
        const fullHistory = [...newMessages, { role: "character", text: charResponse }].map(m =>
          `${m.role === "character" ? scenario.character.name : "You"}: ${m.text}`
        ).join("\n");

        try {
          const debriefResponse = await callApi(
            `You are a persuasion coach debriefing a student after a training exercise.\n\nThe student practiced these principles:\n${principleDefinitions}\n\nThe scenario was: ${scenario.setup}\nThe full conversation:\n${fullHistory}\n\nProvide a debrief. Respond ONLY in this exact JSON format with no other text, no markdown backticks:\n{"overall_rating": 4, "principles_used": ["list of principles they used across the conversation"], "best_moment": "describe their strongest persuasion move", "missed_opportunity": "one thing they could have done better", "key_takeaway": "one sentence the student should remember"}`,
            "Please provide the debrief."
          );
          const debriefParsed = parseApiJson(debriefResponse);
          setDebrief(debriefParsed);

          const p = { ...progress };
          const m = p.modules[moduleId];
          if (!m.phase3.completed.includes(scenario.id)) {
            m.phase3.completed.push(scenario.id);
            m.phase3.scores[scenario.id] = { overallRating: debriefParsed.overall_rating, principlesUsed: debriefParsed.principles_used };
          }
          (debriefParsed.principles_used || []).forEach(pName => {
            if (!p.principleStats[pName]) p.principleStats[pName] = { attempts: 0, successes: 0, avgRating: 0 };
            const ps = p.principleStats[pName];
            const totalRating = ps.avgRating * ps.attempts + debriefParsed.overall_rating;
            ps.attempts++;
            ps.avgRating = totalRating / ps.attempts;
          });
          saveProgress(p);
          onComplete(p);
        } catch {
          setDebrief({ overall_rating: 0, principles_used: [], best_moment: "Debrief unavailable.", missed_opportunity: "", key_takeaway: "Keep practicing!" });
        }
      }
    } catch (e) {
      setError("Response unavailable. Please try again.");
      setMessages(prev => prev.slice(0, -1));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <button onClick={onBack} className="flex items-center gap-1 text-sm text-slate-600 hover:text-slate-900">
        <ChevronLeft className="w-4 h-4" /> Back to Module
      </button>
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-slate-900">Phase 3: Live Scenario</h2>
        <span className="text-sm text-slate-500">Exchange {Math.min(exchangeCount + 1, scenario.maxExchanges)} of {scenario.maxExchanges}</span>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
        <h3 className="font-semibold text-slate-900 mb-2">{scenario.title}</h3>
        <p className="text-sm text-slate-600 leading-relaxed">{scenario.setup}</p>
        <div className="mt-2 text-xs text-slate-500">Character: <span className="font-medium">{scenario.character.name}</span> — {scenario.character.traits}</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2 space-y-4">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 min-h-[300px] max-h-[500px] overflow-y-auto">
            <div className="space-y-3">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[85%] rounded-xl px-4 py-3 ${msg.role === "user" ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-700"}`}>
                    {msg.role === "character" && (
                      <span className="text-xs font-medium block mb-1 opacity-70">{scenario.character.name}</span>
                    )}
                    <p className="text-sm leading-relaxed">{msg.text}</p>
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-slate-100 rounded-xl px-4 py-3 flex items-center gap-2 text-slate-500 text-sm">
                    <Loader2 className="w-4 h-4 animate-spin" /> {scenario.character.name} is responding...
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>
          </div>

          {!debrief && !isLastExchange && (
            <div className="flex gap-2">
              <textarea
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
                placeholder="Write your response..."
                className="flex-1 p-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-indigo-300 focus:ring-1 focus:ring-indigo-300 resize-none"
                rows={2}
                disabled={loading}
              />
              <button onClick={handleSend} disabled={!input.trim() || loading}
                className={`px-4 rounded-xl transition-colors ${input.trim() && !loading ? "bg-indigo-600 text-white hover:bg-indigo-700" : "bg-slate-200 text-slate-400"}`}>
                <Send className="w-4 h-4" />
              </button>
            </div>
          )}
          {error && <div className="text-sm text-rose-600 bg-rose-50 rounded-lg p-3 flex items-center gap-2"><AlertCircle className="w-4 h-4" />{error}</div>}
        </div>

        <div className="space-y-3">
          <h4 className="font-semibold text-sm text-slate-900">Coach's Notes</h4>
          {coachNotes.length === 0 && (
            <div className="bg-slate-50 rounded-xl p-4 text-sm text-slate-500">Send your first response to get coaching feedback.</div>
          )}
          {coachNotes.map((note, i) => (
            <div key={i} className="bg-white rounded-xl border border-slate-200 p-3 space-y-2">
              <div className="text-xs font-medium text-slate-500">Exchange {i + 1}</div>
              <div>
                <span className="text-xs text-slate-500">Principle:</span>
                <div className="flex flex-wrap gap-1 mt-0.5">
                  {(note.principle_used || []).map((p, j) => (
                    <span key={j} className={`text-xs px-2 py-0.5 rounded-full ${mod.color.badge} ${mod.color.text}`}>{p}</span>
                  ))}
                </div>
              </div>
              <p className="text-xs text-slate-600">{note.effectiveness}</p>
              <div className="text-xs text-indigo-600 font-medium">Tip: {note.tip}</div>
            </div>
          ))}
        </div>
      </div>

      {debrief && (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 space-y-4">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-indigo-600" />
            <h3 className="font-bold text-slate-900">Debrief</h3>
          </div>
          {debrief.overall_rating > 0 && (
            <div className="flex items-center gap-3">
              <StarRating rating={debrief.overall_rating} />
              <span className="text-sm font-medium text-slate-700">{debrief.overall_rating}/5</span>
            </div>
          )}
          {debrief.principles_used?.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-slate-700 mb-1">Principles Used</h4>
              <div className="flex flex-wrap gap-1">
                {debrief.principles_used.map((p, i) => (
                  <span key={i} className={`text-xs px-2 py-1 rounded-full ${mod.color.badge} ${mod.color.text}`}>{p}</span>
                ))}
              </div>
            </div>
          )}
          {debrief.best_moment && (
            <div>
              <h4 className="text-sm font-medium text-emerald-700 mb-1">Best Moment</h4>
              <p className="text-sm text-slate-600">{debrief.best_moment}</p>
            </div>
          )}
          {debrief.missed_opportunity && (
            <div>
              <h4 className="text-sm font-medium text-amber-700 mb-1">Missed Opportunity</h4>
              <p className="text-sm text-slate-600">{debrief.missed_opportunity}</p>
            </div>
          )}
          {debrief.key_takeaway && (
            <div className="bg-indigo-50 rounded-lg p-3">
              <h4 className="text-sm font-medium text-indigo-700 mb-1">Key Takeaway</h4>
              <p className="text-sm text-indigo-900 font-medium">{debrief.key_takeaway}</p>
            </div>
          )}
          <button onClick={onBack}
            className="w-full py-3 rounded-lg font-medium bg-indigo-600 text-white hover:bg-indigo-700 transition-colors">
            Back to Module
          </button>
        </div>
      )}
    </div>
  );
}

function ReferenceView() {
  const [expanded, setExpanded] = useState({});
  const toggle = (name) => setExpanded(prev => ({ ...prev, [name]: !prev[name] }));

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h2 className="text-xl font-bold text-slate-900 mb-1">Principle Reference Library</h2>
        <p className="text-slate-600 text-sm">Quick-reference cards for all 13 persuasion principles, grouped by module.</p>
      </div>

      {MODULES.map(mod => (
        <div key={mod.id} className="space-y-3">
          <div className={`inline-block px-3 py-1 rounded-lg text-sm font-medium ${mod.color.bg} ${mod.color.text} border ${mod.color.border}`}>
            {mod.name}
          </div>
          {REFERENCE_DATA.filter(r => r.module === mod.id).map(ref => (
            <div key={ref.name} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <button onClick={() => toggle(ref.name)}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-3">
                  <BookOpen className="w-4 h-4 text-indigo-600" />
                  <div>
                    <span className="font-semibold text-slate-900 text-sm">{ref.name}</span>
                    <span className="text-xs text-slate-500 ml-2">({ref.source})</span>
                  </div>
                </div>
                {expanded[ref.name] ? <ChevronDown className="w-4 h-4 text-slate-400" /> : <ChevronRight className="w-4 h-4 text-slate-400" />}
              </button>
              {expanded[ref.name] && (
                <div className="px-4 pb-4 space-y-3 border-t border-slate-100 pt-3">
                  <div>
                    <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">Definition</span>
                    <p className="text-sm text-slate-700 mt-0.5">{ref.definition}</p>
                  </div>
                  <div>
                    <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">How It Works</span>
                    <p className="text-sm text-slate-700 mt-0.5">{ref.mechanism}</p>
                  </div>
                  <div>
                    <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">Legislative Example</span>
                    <p className="text-sm text-slate-700 mt-0.5 italic">{ref.legislativeExample}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-emerald-50 rounded-lg p-2.5">
                      <span className="text-xs font-medium text-emerald-700">Use When</span>
                      <p className="text-xs text-slate-600 mt-0.5">{ref.useWhen}</p>
                    </div>
                    <div className="bg-rose-50 rounded-lg p-2.5">
                      <span className="text-xs font-medium text-rose-700">Don't Use When</span>
                      <p className="text-xs text-slate-600 mt-0.5">{ref.dontUseWhen}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════════════════════════

export default function PersuasionGym() {
  const [view, setView] = useState("dashboard");
  const [progress, setProgress] = useState(defaultProgress());
  const [selectedModule, setSelectedModule] = useState(null);
  const [selectedPhase, setSelectedPhase] = useState(null);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    loadProgress().then(setProgress);
  }, []);

  const handleModuleSelect = (moduleId) => {
    setSelectedModule(moduleId);
    setSelectedPhase(null);
    setView("module");
  };

  const handlePhaseSelect = (phase) => {
    setSelectedPhase(phase);
    setView("phase");
  };

  const handleProgressUpdate = (newProgress) => {
    setProgress(newProgress);
  };

  const handleBackToModules = () => {
    setSelectedModule(null);
    setSelectedPhase(null);
    setView("modules");
  };

  const handleBackToModule = () => {
    setSelectedPhase(null);
    setView("module");
  };

  const currentView = selectedPhase ? "phase" : selectedModule ? "module" : view;
  const navView = selectedPhase || selectedModule ? "modules" : view;

  return (
    <div className="min-h-screen bg-slate-50">
      <NavBar view={navView} setView={(v) => {
        setSelectedModule(null);
        setSelectedPhase(null);
        setView(v);
      }} />

      <div className="max-w-4xl mx-auto px-4 py-6">
        {currentView === "dashboard" && (
          <Dashboard progress={progress} onModuleSelect={handleModuleSelect} />
        )}

        {currentView === "modules" && !selectedModule && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-slate-900">All Modules</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {MODULES.map(mod => {
                const total = getModuleScenarioCount(mod.id);
                const done = getModuleCompletedCount(mod.id, progress);
                const pct = total > 0 ? Math.round((done / total) * 100) : 0;
                return (
                  <button key={mod.id} onClick={() => handleModuleSelect(mod.id)}
                    className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 text-left hover:shadow-md transition-shadow">
                    <div className={`inline-block px-2 py-1 rounded-md text-xs font-medium ${mod.color.bg} ${mod.color.text} border ${mod.color.border} mb-3`}>
                      {mod.name}
                    </div>
                    <p className="text-sm text-slate-600 mb-3">{mod.theme}</p>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {mod.principles.map(p => (
                        <span key={p} className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">{p}</span>
                      ))}
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2 mb-1">
                      <div className="bg-indigo-600 h-2 rounded-full transition-all" style={{ width: `${pct}%` }} />
                    </div>
                    <div className="text-xs text-slate-500">{done}/{total} completed</div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {currentView === "module" && selectedModule && !selectedPhase && (
          <ModuleView moduleId={selectedModule} progress={progress} onPhaseSelect={handlePhaseSelect} onBack={handleBackToModules} />
        )}

        {currentView === "phase" && selectedModule && selectedPhase === 1 && (
          <Phase1View moduleId={selectedModule} progress={progress} onComplete={handleProgressUpdate} onBack={handleBackToModule} />
        )}

        {currentView === "phase" && selectedModule && selectedPhase === 2 && (
          <Phase2View moduleId={selectedModule} progress={progress} onComplete={handleProgressUpdate} onBack={handleBackToModule} />
        )}

        {currentView === "phase" && selectedModule && selectedPhase === 3 && (
          <Phase3View moduleId={selectedModule} progress={progress} onComplete={handleProgressUpdate} onBack={handleBackToModule} />
        )}

        {currentView === "reference" && <ReferenceView />}
      </div>

      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </div>
  );
}
