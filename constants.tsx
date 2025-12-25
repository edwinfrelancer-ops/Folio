import React from 'react';
import { Type, FileText, CheckCircle2, Headphones, Layers, Clock } from 'lucide-react';
import { Skill, SampleProject, WorkflowStep, Testimonial } from './types';

export const SKILLS: Skill[] = [
  {
    title: "Verbatim Accuracy",
    description: "Capturing every utterance, including 'ums' and 'ahs', for precise legal or medical documentation.",
    icon: <Type size={20} className="text-zinc-500" />
  },
  {
    title: "Clean Read",
    description: "Removing filler words to provide a professional, easy-to-read transcript without losing context.",
    icon: <FileText size={20} className="text-zinc-500" />
  },
  {
    title: "Time Stamping",
    description: "Periodic and speaker-change timestamps for easy navigation within the source audio.",
    icon: <Clock size={20} className="text-zinc-500" />
  },
  {
    title: "Specialized Formatting",
    description: "Adapting to specific style guides, whether it's academic, business, or journalistic standards.",
    icon: <Layers size={20} className="text-zinc-500" />
  }
];

export const SAMPLES: SampleProject[] = [
  {
    id: "01",
    title: "Medical Consultation",
    category: "Healthcare",
    snippet: "Patient presents with persistent cough and fatigue. Examination shows clear lungs but slightly elevated heart rate...",
    fullContent: "Doctor: Good morning, Mr. Smith. I see from your chart you've been having some respiratory issues. Could you walk me through the timeline of your symptoms?\n\nPatient: Yeah, doc. It started about three weeks ago. Just a dry tickle at first, you know? But now it's this deep, hacking cough. Especially at night. I can barely sleep.\n\nDoctor: I understand. Is the cough productive? Are you bringing up any phlegm or mucus?\n\nPatient: Mostly dry, but occasionally there's a bit of clear stuff. Nothing yellow or green.\n\nDoctor: Okay, that's noted. Have you experienced any fever, chills, or night sweats?\n\nPatient: No fever, but definitely some fatigue. I feel wiped out by 2 PM every day.\n\nDoctor: Alright. I'm going to listen to your lungs now. Take a deep breath in... and out. Again. Good. The lower lobes sound clear, but I'm detecting some slight wheezing in the upper bronchial region. Given your history of seasonal allergies, this could be allergic bronchitis, but I want to rule out anything bacterial.\n\nPatient: What does that mean for treatment?\n\nDoctor: We'll start with a short course of corticosteroids to reduce inflammation, and I'm prescribing an albuterol inhaler for the nights. I also want to run a CBC panel just to check your white blood cell count. If that comes back elevated, we'll look at antibiotics.",
    accuracy: "99.9%",
    turnaround: "12 Hours"
  },
  {
    id: "02",
    title: "Executive Board Meeting",
    category: "Corporate",
    snippet: "The quarterly revenue projections show a 12% increase year-over-year. Stakeholders are optimistic about the new...",
    fullContent: "Chairperson: I call this meeting to order at 09:00 hours. First item on the agenda: the Q3 revenue report. CFO, the floor is yours.\n\nCFO: Thank you. If you turn to slide four in your briefing packets, you'll see the breakdown of our domestic vs. international growth. Our domestic growth has exceeded expectations by roughly 12% year-over-year.\n\nDirector A: Does this figure include the acquisition costs from the merger last month? Or is this purely organic revenue?\n\nCFO: Good question. This is purely organic. The merger costs are amortized separately in the capital expenditures report on slide seven. We wanted to isolate the core business performance to give a clearer picture of market demand.\n\nDirector B: That's reassuring. However, I'm looking at the churn rate for the SaaS division. It's up by 1.5%. Is that a cause for concern?\n\nCFO: We anticipated a slight uptick due to the pricing restructure. We believe it's temporary. Our retention team has already deployed a new loyalty incentive program, and early data suggests the churn is stabilizing.\n\nChairperson: Let's keep a close eye on that. Moving on to the Asian expansion strategy. The regulatory hurdles in Singapore have been... significant. Chief Legal Officer, can you update us?\n\nCLO: Certainly. We've filed the necessary compliance paperwork for the data privacy audit. It's a six-week waiting period, but our local counsel is confident we meet all GDPR equivalents.",
    accuracy: "100%",
    turnaround: "24 Hours"
  },
  {
    id: "03",
    title: "Podcaster Interview",
    category: "Media",
    snippet: "Host: Today we're joined by an expert in quantum computing. Guest: It's a pleasure to be here. We're at a...",
    fullContent: "Host: Welcome back to The Tech Edge. Today, we're diving deep into the world of sub-atomic processing. We're joined by Dr. Aris Thorne, a leading researcher at the Quantum Institute. Doctor, welcome.\n\nGuest: Thanks for having me, Sarah. It's an exciting time to be in this field because the theoretical is finally becoming practical.\n\nHost: That's exactly what I wanted to ask. For years, quantum computing has felt like science fiction. What changed in the last 18 months?\n\nGuest: It's mostly about stability. Quantum bits, or qubits, are notoriously fragile. They collapse if you look at them wrong—literally. But we've developed a new error-correction protocol using topological states.\n\nHost: Can you explain that for our listeners who might not have a PhD in physics? Why are 'topological states' better?\n\nGuest: [Laughs] Sure. Imagine tying a knot in a string. No matter how much you shake the string, the knot is still there. Topological quantum computing is like storing information in that knot. It's robust against local disturbances/noise. This allows us to maintain coherence for seconds instead of milliseconds.\n\nHost: And that time difference is what allows for complex calculations?\n\nGuest: Exactly. It's the difference between a calculator that resets every time you blink, and a supercomputer that can run a simulation for a week.",
    accuracy: "99.8%",
    turnaround: "18 Hours"
  },
  {
    id: "04",
    title: "Superior Court Deposition",
    category: "Legal",
    snippet: "Counsel: Please state your full name and occupation for the record. Witness: My name is Jonathan Elias Thorne. I am a lead software architect at Velox Systems...",
    fullContent: "Counsel: Please state your full name and occupation for the record.\n\nWitness: My name is Jonathan Elias Thorne. I am a lead software architect at Velox Systems.\n\nCounsel: Mr. Thorne, strictly focusing on the evening of January 14th, 2023, were you present at the corporate headquarters located at 400 Innovation Drive?\n\nWitness: I was. I stayed late to oversee the deployment of the version 4.2 security patch.\n\nCounsel: And who else was in the building at that time, to the best of your knowledge?\n\nWitness: Security logs would have the full list, but physically, I only saw the night janitor, Mr. Henderson, and the security guard at the front desk.\n\nCounsel: At approximately 10:45 PM, did you witness anyone entering the secure server room on the third floor?\n\nWitness: I did not see anyone enter directly, no. However, my office is adjacent to the server room corridor. I heard the electronic mag-lock disengage twice between 10:30 and 11:00 PM.\n\nCounsel: Did you investigate the noise?\n\nWitness: I assumed it was the automated maintenance cycle. The cooling systems often reset at night, and the pressure change can sound like a door opening. In hindsight, I should have checked.\n\nCounsel: Let the record show the witness heard the lock disengage. Mr. Thorne, do you have administrative privileges to override the biometric scanner on that door?\n\nWitness: I do. But my access logs are immutable. If I had opened it, the system would show my ID.",
    accuracy: "100% Verbatim",
    turnaround: "24 Hours"
  },
  {
    id: "05",
    title: "Anthology Research Interview",
    category: "Academic",
    snippet: "Interviewer: How would you describe the shift in community dynamics post-industrialization? Participant: It wasn't just economic, it was the slow dissolving of the invisible threads...",
    fullContent: "Interviewer: Thank you for participating in this oral history project. Let's start with your early years in the valley. When the steel mills were active, how would you describe the community dynamic?\n\nParticipant: The valley was... alive. It breathed. You have to understand, the mill wasn't just a job. It was the clock we all lived by. The shift whistle blew, and the whole town moved. Everyone knew everyone. We didn't lock doors.\n\nInterviewer: And when the closure happened in '84, was the change immediate?\n\nParticipant: No, and that's the tragedy of it. It was a slow bleed. First, the temporary layoffs. Then the 'restructuring'. By the time the gates explicitly chained shut, the silence was louder than the machinery ever was.\n\nInterviewer: In your previous correspondence, you mentioned 'social erosion'. Can you expand on that concept in this context?\n\nParticipant: It's the dissolving of the invisible threads. The shared grocery runs, the porch conversations that happened without being scheduled. When the men lost their shifts, they lost their gathering spots. The union hall emptied out. The pride evaporated. Neighbors stopped looking each other in the eye because they were all ashamed of the same poverty.\n\nInterviewer: That's a profound observation. Did the younger generation—your generation—try to leave immediately?\n\nParticipant: We wanted to. But poverty has gravity. It holds you down.",
    accuracy: "99.9%",
    turnaround: "48 Hours"
  },
  {
    id: "06",
    title: "Technical Engineering Sync",
    category: "Technology",
    snippet: "Engineering Lead: The latency issues in the microservices architecture seem to stem from the new API gateway...",
    fullContent: "Engineering Lead: Alright, let's get into the retrospective. The latency issues in the microservices architecture—specifically the User Auth service—seem to stem from the new API gateway configuration we pushed on Tuesday.\n\nDevOps Engineer: I suspected as much. I reviewed the Datadog logs from the load balancer. We're seeing a bottleneck during peak traffic because the rate-limiting logic is executing synchronously before the request handoff.\n\nBackend Dev: That explains the timeouts. But why didn't this catch in the staging environment?\n\nDevOps Engineer: Staging doesn't replicate the concurrent connection volume of production. The rate-limiter works fine under low load. It's O(n) complexity, so it scales poorly.\n\nEngineering Lead: Okay. Remediation plan? Can we cache the user tiers in Redis to speed up the lookup?\n\nBackend Dev: We can, but we need to worry about cache invalidation. If a user upgrades their plan, the gateway needs to know immediately, not 15 minutes later.\n\nEngineering Lead: Let's revert the config for now to stabilize prod. Then, let's architect a sidecar proxy pattern for the rate limiting. That should offload the processing overhead from the main gateway thread.\n\nDevOps Engineer: Agreed. I'll spin up a Terraform script to provision the sidecars. I can have a prototype by sprint review on Friday.",
    accuracy: "100% Technical",
    turnaround: "18 Hours"
  },
  {
    id: "07",
    title: "Q4 Earnings Call",
    category: "Finance",
    snippet: "CEO: Despite global headwinds, we've managed to secure a 15% increase in operational efficiency across all sectors...",
    fullContent: "CEO: Good morning, everyone. Despite global macroeconomic headwinds, I am pleased to report that we have managed to secure a 15% increase in operational efficiency across all sectors. Our pivot to a decentralized supply chain model has insulated us from the worst of the logistics shocks affecting our competitors.\n\nAnalyst: Thank you for the presentation. Could you elaborate on how the supply chain disruptions impacted the gross margin in the European market specifically? We noticed a 40 basis point contraction there.\n\nCFO: Certainly. While our logistics costs did rise by roughly 4% due to fuel surcharges in the Eurozone, we offset the majority of this through strategic inventory management and dynamic price adjustments. The contraction you're seeing is actually attributed to a one-time writedown of legacy inventory in our German warehouse, not operational inefficiency.\n\nAnalyst: Understood. And what is the outlook for the Asian expansion in the coming fiscal year, given the currency volatility?\n\nCEO: We remain bullish on Asia. We have hedged our currency exposure for the next six months. We expect the new manufacturing plant in Vietnam to come online in Q2, which will significantly lower our COGS (Cost of Goods Sold) and improve our margin profile in the region.",
    accuracy: "99.9%",
    turnaround: "6 Hours"
  },
  {
    id: "08",
    title: "True Crime Documentary",
    category: "Entertainment",
    snippet: "Narrator: The town was quiet, the kind of quiet that hides secrets deep beneath the frost-covered soil...",
    fullContent: "Narrator: The town of Oakhaven was quiet. Not the peaceful quiet of a library, but the heavy, suffocating silence of a place holding its breath. It was the kind of quiet that hides secrets deep beneath the frost-covered soil of December.\n\nInterviewee: I never thought something like that could happen here. We didn't lock our doors. We knew everyone's name. When the police cars showed up at the Miller house... I thought maybe someone had a heart attack. You don't think 'murder' in Oakhaven.\n\nNarrator: But on that Tuesday night, the illusion of safety was shattered forever. The dispatch call came in at 11:42 PM. A neighbor reported a 'scream that didn't sound human'.\n\nDetective: I was the first on scene. The front door was ajar. Snow had blown into the hallway, melting on the hardwood. There were no footprints leaving the house. Only entering. That's when the hair on the back of my neck stood up. Whoever did this... might still be inside.\n\nNarrator: The evidence at the scene didn't add up. It was staged, meticulous, almost theatrical. A dinner table set for four, but only one person lived there. A candle still burning in the window, defying the wind.\n\nDetective: We found the journal under the floorboards three weeks later. That's when we realized this wasn't a robbery gone wrong. This was a ritual.",
    accuracy: "100% Verbatim",
    turnaround: "24 Hours"
  }
];

export const WORKFLOW: WorkflowStep[] = [
  {
    number: "01",
    title: "Audio Analysis",
    description: "Initial pass to identify speakers, accents, and specialized terminology."
  },
  {
    number: "02",
    title: "Drafting",
    description: "First-pass transcription using high-end pedals and noise-canceling hardware."
  },
  {
    number: "03",
    title: "Proofreading",
    description: "Double-check for grammar, spelling, and consistency against the audio source."
  },
  {
    number: "04",
    title: "Final QA",
    description: "Final alignment with client style guides and formatting preferences."
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "T-01",
    name: "Dr. Alistair Vance",
    role: "Senior Clinical Researcher",
    organization: "Global Health Institute",
    content: "Edwin's attention to clinical terminology is surgical. He doesn't just transcribe; he understands the gravity of the medical discourse he is documenting.",
    rating: 5
  },
  {
    id: "T-02",
    name: "Sarah Jenkins, Esq.",
    role: "Lead Defense Attorney",
    organization: "Sterling & Associates",
    content: "In verbatim legal depositions, there is zero room for error. Nyandika's accuracy rate is the highest I've encountered in the freelance archive market.",
    rating: 5
  },
  {
    id: "T-03",
    name: "Marcus Thorne",
    role: "Executive Producer",
    organization: "The Vanguard Podcast",
    content: "We needed a clean read that didn't strip away the guest's personality. Edwin managed to find that perfect balance between readability and authenticity.",
    rating: 5
  },
  {
    id: "T-04",
    name: "Prof. Elena Rossi",
    role: "Dept. of Anthropology",
    organization: "Heritage University",
    content: "Historical research requires a sensitive ear. Edwin's ability to capture subtle regional dialects and emotive pauses made our archive truly come alive.",
    rating: 5
  }
];