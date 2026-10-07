export interface EvaluationItem {
  id: string;
  code: string;
  title: string;
  lesson: string;
  assignedDay: number;
  dueDay: number;
  type: 'written' | 'performance' | 'module';
  channel: string;
  deliverable?: string;
  materials?: string[];
}

export interface MilestoneItem {
  day: number;
  title: string;
  detail: string;
  gold?: boolean;
}

export interface RosterMember {
  no: string;
  rank: string;
  last: string;
  first: string;
  gender: string;
  state: string;
  email: string;
  age: string;
  barracks: 'Liberty' | 'Patriot';
  room: string;
  mos: string;
  phone: string;
  squad: string;
  role: string;
}

export interface CadreMember {
  rank: string;
  name: string;
  role: string;
  phone?: string;
  tel?: string;
  email: string;
  mailto: string;
  location: string;
  duties: string;
}

export interface RegulationItem {
  id: string;
  code: string;
  title: string;
  category: 'Enlistment' | 'Medical' | 'Incentives' | 'Standards' | 'Operations';
  note: string;
  href?: string;
  highlights: string[];
  docNumber: string;
}

export interface JobAidItem {
  id: string;
  title: string;
  module: string;
  note: string;
  quickGuide: string[];
  actionType: string;
  url?: string;
}

export interface AnnouncementItem {
  id: string;
  dateLabel: string;
  title: string;
  motto?: string;
  details: string;
  urgent?: boolean;
}

export interface EvaluationAnnouncement {
  id: string;
  evalId: string;
  evalCode: string;
  evalTitle: string;
  type: 'written' | 'performance' | 'module';
  announceDay: number; // The training day before dueDay
  dueDay: number;
  channel: string;
  headline: string;
  directive: string;
  materials: string[];
}

export const COURSE_INFO = {
  courseCode: "NCRC 27-001",
  platoon: "Class Dashboard",
  sqi: "SQI4",
  organization: "ARNG - PEC - SMTB",
  school: "PEC",
  component: "ARNG",
  trainingBattalion: "SMTB",
  location: "Camp Joseph T. Robinson · North Little Rock, AR",
  day1Date: "2026-10-19",
  gradDate: "2026-11-20",
  totalTrainingDays: 25,
  currentSimulatedDay: 1,
  motto: "Live the Legend · Always Ready, Always There"
};

export const EVALUATION_ANNOUNCEMENTS: EvaluationAnnouncement[] = [
  {
    id: "ann-day1-convening",
    evalId: "day1-convening",
    evalCode: "DAY 01",
    evalTitle: "First Day of Class — In-Processing & Orientation",
    type: "module",
    announceDay: 1,
    dueDay: 1,
    channel: "In-person / First Formation",
    headline: "First Day of Class (19 Oct): In-Processing & Orientation",
    directive: "Welcome to NCRC 27-001. First formation in APFUs with military ID/CAC at Sergeant Young Hall, BLDG 3400. Course orientation, platoon leadership assignments, and syllabus briefing.",
    materials: ["Course Syllabus", "ISAP", "Student Guide & Packing List"]
  },
  {
    id: "ann-cm4r-1",
    evalId: "cm4r-1",
    evalCode: "CM4R Mod 1",
    evalTitle: "Communication Mastery for RRNCOs — Introduction",
    type: "module",
    announceDay: 1,
    dueDay: 2,
    channel: "Self-paced / E-Learning portal",
    headline: "24-Hour Notice: CM4R Module 1 Due Tomorrow",
    directive: "Complete Communication Mastery for RRNCOs Module 1 online before Day 2 class convening. Establishes the interpersonal bedrock for recruiter conversations.",
    materials: ["CM4R Participant Journal", "Communication Mastery Module 1"]
  },
  {
    id: "ann-cm4r-2",
    evalId: "cm4r-2",
    evalCode: "CM4R Mod 2",
    evalTitle: "CM4R Module 2 — What Drives the Decision to Join",
    type: "module",
    announceDay: 4,
    dueDay: 5,
    channel: "Self-paced / E-Learning portal",
    headline: "24-Hour Notice: CM4R Module 2 Due Tomorrow",
    directive: "Complete Module 2 (The Mind of the Customer: What Drives the Decision to Join) before Day 5. Focus on connecting ARNG tangible features directly to candidate psychological motivators.",
    materials: ["CM4R Module 2", "Value Maximizer Tool"]
  },
  {
    id: "ann-ncrcw001",
    evalId: "ncrcw001",
    evalCode: "NCRCW001",
    evalTitle: "Written Examination 1 — Enlistment Eligibility",
    type: "written",
    announceDay: 3,
    dueDay: 4,
    channel: "In class testing (Closed Book)",
    headline: "24-Hour Warning: Written Exam 1 (NCRCW001) Tomorrow",
    directive: "Closed-book testing (20 questions) tomorrow. Review AR 601-210 Table 2-1 basic eligibility, Chapter 4 waivers & moral suitability, age limits, and the APPLE-MDT matrix. Minimum 70% passing grade required.",
    materials: ["AR 601-210", "AOC PPOM 25-042", "APPLE-MDT Matrix", "Suitability Matrix"]
  },
  {
    id: "ann-ncrcw002",
    evalId: "ncrcw002",
    evalCode: "NCRCW002",
    evalTitle: "Written Examination 2 — Enlistment Options & Financial Programs",
    type: "written",
    announceDay: 7,
    dueDay: 8,
    channel: "In class testing (Day 8, Wednesday, Oct 28, 0830–1030)",
    headline: "24-Hour Warning: Written Exam 2 (NCRCW002) Tomorrow (Wed 28 Oct)",
    directive: "Written Exam 2 evaluates tomorrow (Day 8, Wednesday, 28 Oct) at 0830. Intensive coverage of Selected Reserve Incentive Program (SRIP Policy 27-01), enlistment options, bonus payment tranches, and accession criteria. Re-examination Day 9 at 0600.",
    materials: ["AR 601-210", "SRIP Policy 27-01", "AOC PPOM 25-043"]
  },
  {
    id: "ann-cm4r-3",
    evalId: "cm4r-3",
    evalCode: "CM4R Mod 3",
    evalTitle: "CM4R Module 3 — Establishing Rapport",
    type: "module",
    announceDay: 7,
    dueDay: 8,
    channel: "Self-paced / E-Learning portal",
    headline: "24-Hour Notice: CM4R Module 3 (Establishing Rapport) Due Tomorrow",
    directive: "Complete Module 3 (Authentic Communication: Establishing Rapport) online before Day 8. Focuses on interpersonal rapport, active listening, and candidate trust building.",
    materials: ["CM4R Module 3", "Authentic Communication Model"]
  },
  {
    id: "ann-cm4r-4",
    evalId: "cm4r-4",
    evalCode: "CM4R Mod 4",
    evalTitle: "CM4R Module 4 — Integrating Social Media",
    type: "module",
    announceDay: 9,
    dueDay: 10,
    channel: "Self-paced / E-Learning portal",
    headline: "24-Hour Notice: CM4R Module 4 (Integrating Social Media) Due Tomorrow",
    directive: "Complete Module 4 (Energize Your Area: Integrating Social Media) online before Day 10. Focuses on area networking, digital prospecting, and community presence.",
    materials: ["CM4R Module 4", "Presentation Skill Guide"]
  },
  {
    id: "ann-ncrcp002",
    evalId: "ncrcp002",
    evalCode: "NCRCP002",
    evalTitle: "Performance Evaluation NCRCP002 — Plan a Prospecting Activity",
    type: "performance",
    announceDay: 14,
    dueDay: 15,
    channel: "Formal Memorandum to Commander",
    headline: "24-Hour Warning: Prospecting Memorandum (NCRCP002) Due Tomorrow",
    directive: "Submit formal 5-paragraph OPORD memorandum to Commander tomorrow. Cadre evaluates target audience analysis, timeline feasibility, resource allocation, and follow-up lead tracking metrics.",
    materials: ["NG Pam 601-1", "FM 5-0", "NCRCP002 Rubric"]
  },
  {
    id: "ann-ncrcp001_a",
    evalId: "ncrcp001_a",
    evalCode: "NCRCP001_A",
    evalTitle: "Performance Evaluation NCRCP001_A — 14-Day RRNCO Work Plan",
    type: "performance",
    announceDay: 15,
    dueDay: 16,
    channel: "Performance evaluation submission",
    headline: "24-Hour Warning: 14-Day Work Plan (NCRCP001_A) Due Tomorrow",
    directive: "14-day comprehensive battle rhythm due tomorrow. Assessed on thoroughness, MDMP application, SWOT analysis, and disciplined scheduling of prospecting blocks.",
    materials: ["RZ Mission Planner", "SWOT Analysis Form", "Target Market Analysis Form", "NCRCP001 A Rubric"]
  },
  {
    id: "ann-ncrcp006",
    evalId: "ncrcp006",
    evalCode: "NCRCP006",
    evalTitle: "Performance Evaluation NCRCP006 — Process an Applicant for Enlistment",
    type: "performance",
    announceDay: 16,
    dueDay: 17,
    channel: "Blackboard — Submit SF 86 by 0800",
    headline: "24-Hour Warning: Enlistment Packet & SF 86 (NCRCP006) Due Tomorrow 0800",
    directive: "Upload verified applicant enlistment packet and completed SF 86 to Blackboard by 0800 sharp tomorrow. Audit all source documents, birth records, and education credentials.",
    materials: ["Applicant Documents", "Recruiter Zone User Guide"]
  },
  {
    id: "ann-ncrcp008",
    evalId: "ncrcp008",
    evalCode: "NCRCP008",
    evalTitle: "Performance Evaluation NCRCP008 — ARNG Opportunities Catalog",
    type: "performance",
    announceDay: 17,
    dueDay: 18,
    channel: "Moodle submission",
    headline: "24-Hour Warning: ARNG Opportunities Catalog (NCRCP008) Due Monday",
    directive: "The flagship course deliverable is due Monday morning in Moodle. Ensure complete coverage of constitutional ARNG role, state/federal dual missions, incentive matrices, and career path options. Graded against NCRCP008 rubric.",
    materials: ["AR 601-210", "Accessions Options Criteria", "SRIP Matrix", "NCRCP008 Rubric"]
  },
  {
    id: "ann-ncrcp004",
    evalId: "ncrcp004",
    evalCode: "NCRCP004",
    evalTitle: "Performance Evaluation NCRCP004 — High School Lead Presentation",
    type: "performance",
    announceDay: 19,
    dueDay: 20,
    channel: "Class B ASU / AGSU formal presentation",
    headline: "24-Hour Warning: Class B Presentation (NCRCP004) Evaluated Tomorrow",
    directive: "Formal presentation evaluations commence tomorrow. Uniform is Class B AGSU/ASU. Day 19 rehearsal complete; prepare visual aids, lead card capture plan, and authentic communication delivery.",
    materials: ["Presentation Skill Guide", "Authentic Communication Skill Guide", "Journal pp. 15–20"]
  },
  {
    id: "ann-ncrcp003",
    evalId: "ncrcp003",
    evalCode: "NCRCP003",
    evalTitle: "Performance Evaluation NCRCP003 — Prospecting Phone Call",
    type: "performance",
    announceDay: 20,
    dueDay: 21,
    channel: "Performance evaluation (Cadre observer)",
    headline: "24-Hour Warning: Prospecting Phone Call (NCRCP003) Evaluated Tomorrow",
    directive: "Live Cadre-observed telephone prospecting evaluations start tomorrow. Evaluated on CM4R authentic communication techniques, active listening, and objection handling.",
    materials: ["NCRCP003 Scenario", "Prospecting Worksheet"]
  },
  {
    id: "ann-ncrcp005",
    evalId: "ncrcp005",
    evalCode: "NCRCP005",
    evalTitle: "Performance Evaluation NCRCP005 — Face-to-Face Recruiting Interview",
    type: "performance",
    announceDay: 21,
    dueDay: 22,
    channel: "Performance evaluation",
    headline: "24-Hour Warning: Recruiting Interview (NCRCP005) Evaluated Tomorrow",
    directive: "Structured applicant interview evaluations begin tomorrow. Assessed on questioning techniques, rapport building, and uncovering candidate core motivators using your Opportunities Catalog.",
    materials: ["NCRCP005 Scenario", "ARNG Opportunities Catalog", "Notes from NCRCP003"]
  },
  {
    id: "ann-ncrcp001_b",
    evalId: "ncrcp001_b",
    evalCode: "NCRCP001_B",
    evalTitle: "Performance Evaluation NCRCP001_B — Area of Operations Brief",
    type: "performance",
    announceDay: 22,
    dueDay: 23,
    channel: "Performance evaluation brief",
    headline: "24-Hour Warning: Area of Operations Brief (NCRCP001_B) Tomorrow (Wed)",
    directive: "Formal Area of Operations briefings begin Wednesday at 0830 before the Cadre board. Deliver a clear, concise briefing on market demographics, school analysis, and tactical recruiting strategy. Retest scheduled Day 24 at 0600.",
    materials: ["Target Market Analysis Form", "RZ Mission Planner", "NCRCP001 B Rubric"]
  },
  {
    id: "ann-ncrcp009",
    evalId: "ncrcp009",
    evalCode: "NCRCP009",
    evalTitle: "Performance Evaluation NCRCP009 — Soldier Retention Counseling",
    type: "performance",
    announceDay: 22,
    dueDay: 23,
    channel: "Performance evaluation (DA Form 4856 at Guard X)",
    headline: "24-Hour Warning: Retention Counseling (NCRCP009) Tomorrow (Wed)",
    directive: "DA Form 4856 retention counseling evaluated Wednesday at Guard X (0830–1200 & 1300–1700). Demonstrate authentic counseling methodology, regulatory knowledge of extension options, and actionable career guidance. Retest Day 24 at 0600.",
    materials: ["DA Form 4856", "Authentic Communication Skill Guide", "ARNG Opportunities Catalog"]
  },
  {
    id: "ann-day24-grad",
    evalId: "day25-grad",
    evalCode: "DAY 25 GRADUATION",
    evalTitle: "Graduation Ceremony & Out-Processing",
    type: "module",
    announceDay: 24,
    dueDay: 25,
    channel: "Militia Hall Ceremony · Class A/B AGSU",
    headline: "24-Hour Notice: Class 27-001 Graduation Ceremony Tomorrow (20 Nov)",
    directive: "Graduation ceremony convenes at 0900–1030 on Day 25 (Fri 20 Nov) at Militia Hall. Class Photo (Class 26-005) at 0800, Graduation Preparation at 0830. Uniform is Class A/B AGSU. Ensure all barracks clearance sign-offs and room keys are turned in.",
    materials: ["Class A/B AGSU Inspection Sheet", "Graduation Protocol"]
  }
];

export const ANNOUNCEMENTS: AnnouncementItem[] = [
  {
    id: "ann-1",
    dateLabel: "Day 01 · Mon 19 Oct",
    title: "Course In-Processing & Orientation",
    details: "All students report: First formation in APFUs with military ID/CAC at Sergeant Young Hall, BLDG 3400. Platoon leadership assignments and training schedule briefed by Cadre."
  },
  {
    id: "ann-2",
    dateLabel: "Week 1 · Regulatory Focus",
    title: "Statutory Eligibility & Enlistment Law",
    motto: "Attention to detail prevents processing bottlenecks at MEPS.",
    details: "Mastery of the AR 601-210, AR 40-501, AR 670-1, AR 600-9, and AOC criteria begins immediately. Prepare for Written Examination 1 (NCRCW001) scheduled for Day 4 (Thu 22 Oct)."
  },
  {
    id: "ann-3",
    dateLabel: "Academic Notice",
    title: "ISAP, Pass Policy, & Retest Protocols",
    motto: "Train to standard, not to time.",
    details: "All written examinations and performance evaluations require 70% minimum passing score. Familiarize yourself with the ISAP in the course document repository."
  }
];

export const EVALS: EvaluationItem[] = [
  {
    id: "ncrcw001",
    code: "NCRCW001",
    title: "Written Examination 1",
    lesson: "Determine Enlistment Eligibility",
    assignedDay: 4,
    dueDay: 4,
    type: "written",
    channel: "In class testing (20 questions, closed book)",
    deliverable: "Closed-book written examination testing mastery of statutory requirements, moral waivers, age, and dependency criteria under AR 601-210. Minimum 70% passing grade. Retest scheduled for Day 5.",
    materials: ["AR 601-210", "AOC PPOM 25-042", "APPLE-MDT Matrix", "Suitability Matrix"]
  },
  {
    id: "ncrcw002",
    code: "NCRCW002",
    title: "Written Examination 2",
    lesson: "Determine Eligibility for Enlistment Options and Financial Programs",
    assignedDay: 7,
    dueDay: 8,
    type: "written",
    channel: "In class testing (Day 8, Wednesday, Oct 28, 0830–1030)",
    deliverable: "Written exam covering ARNG enlistment options, Selected Reserve Incentive Program (SRIP) policies, educational benefits, and enlistment bonuses. Administered on Day 8 (Wednesday, Oct 28, 0830–1030). Remedial Day 8 at 1530; Re-examination scheduled for Day 9 at 0600.",
    materials: ["AR 601-210", "SRIP Policy 27-01", "AOC PPOM 25-043"]
  },
  {
    id: "ncrcp002",
    code: "NCRCP002",
    title: "Plan a Prospecting Activity",
    lesson: "Develop Prospecting Activities",
    assignedDay: 12,
    dueDay: 15,
    type: "performance",
    channel: "Formal Memorandum to Commander",
    deliverable: "Plan a prospecting activity and develop a formal Memorandum for Commander using standard five-paragraph operations order format: target audience, timeline, required resources, execution plan, and follow-up tracking.",
    materials: ["NG Pam 601-1", "FM 5-0", "NCRCP002 Rubric"]
  },
  {
    id: "ncrcp001_a",
    code: "NCRCP001_A",
    title: "Establish a RRNCO Work Plan",
    lesson: "Establish a RRNCO Work Plan",
    assignedDay: 14,
    dueDay: 16,
    type: "performance",
    channel: "Performance Evaluation Submission",
    deliverable: "Develop a 14-day comprehensive battle rhythm. Assessed on attention to detail, application of MDMP, and disciplined scheduling of prospecting blocks across the 0800–1700 duty window.",
    materials: ["RZ Mission Planner", "SWOT Analysis Form", "Target Market Analysis Form", "NGR 601-1", "NG Pam 601-1", "NCRCP001 A Rubric"]
  },
  {
    id: "ncrcp006",
    code: "NCRCP006",
    title: "Process an Applicant for Enlistment",
    lesson: "Process an Applicant for Enlistment",
    assignedDay: 16,
    dueDay: 17,
    type: "performance",
    channel: "Blackboard (Submit SF 86 by 0800)",
    deliverable: "Assemble a complete enlistment packet from provided documentation and upload the completed SF 86 in Blackboard by 0800 sharp. Evaluated on accuracy, attention to detail, and regulatory compliance.",
    materials: ["Applicant Documents", "Recruiter Zone User Guide"]
  },
  {
    id: "ncrcp008",
    code: "NCRCP008",
    title: "ARNG Opportunities Catalog",
    lesson: "Determine Eligibility for Enlistment Options and Financial Programs",
    assignedDay: 7,
    dueDay: 18,
    type: "performance",
    channel: "Moodle Submission",
    deliverable: "Develop an opportunity catalog outlining enlistment options, financial incentives, MOS availability, and the history, constitutional role, and dual state/federal missions of the ARNG.",
    materials: ["AR 601-210", "Accessions Options Criteria", "SRIP Matrix", "NCRCP008 Rubric"]
  },
  {
    id: "ncrcp004",
    code: "NCRCP004",
    title: "Conduct a Lead Generation Presentation",
    lesson: "CM4R — Energize Your Area",
    assignedDay: 11,
    dueDay: 20,
    type: "performance",
    channel: "Class B ASU / AGSU Presentation",
    deliverable: "Deliver a formal school presentation to a simulated student audience in Class B uniform. Assessed on preparation, delivery presence, audience engagement, and lead card capture. Rehearsal on Day 19; Retest Day 21.",
    materials: ["Presentation Skill Guide", "Authentic Communication Skill Guide", "Journal pp. 15–20"]
  },
  {
    id: "ncrcp003",
    code: "NCRCP003",
    title: "Conduct a Prospecting Phone Call",
    lesson: "CM4R — Authentic Communication",
    assignedDay: 10,
    dueDay: 21,
    type: "performance",
    channel: "Performance Evaluation (Cadre Observer)",
    deliverable: "Conduct an effective prospecting phone call, applying authentic communication techniques and active listening from the CM4R curriculum. Retest Day 22.",
    materials: ["NCRCP003 Scenario", "Prospecting Worksheet"]
  },
  {
    id: "ncrcp005",
    code: "NCRCP005",
    title: "Conduct a Recruiting Interview",
    lesson: "CM4R — Authentic Communication",
    assignedDay: 10,
    dueDay: 22,
    type: "performance",
    channel: "Performance Evaluation",
    deliverable: "Conduct a structured recruiting interview. Assessed on questioning technique, interpersonal rapport, and ability to ascertain genuine applicant eligibility. Retest Day 23.",
    materials: ["NCRCP005 Scenario", "ARNG Opportunities Catalog", "Notes from NCRCP003"]
  },
  {
    id: "ncrcp001_b",
    code: "NCRCP001_B",
    title: "Conduct an Area of Operations Brief",
    lesson: "Evaluate a Recruiting Area",
    assignedDay: 14,
    dueDay: 23,
    type: "performance",
    channel: "Board Briefing",
    deliverable: "Deliver a clear, concise Area of Operations (AO) brief before the Cadre board. Measures understanding of key operational factors, communication skill, and structured presentation. Retest Day 24.",
    materials: ["Target Market Analysis Form", "RZ Mission Planner", "NCRCP001 B Rubric"]
  },
  {
    id: "ncrcp009",
    code: "NCRCP009",
    title: "Conduct a SM Retention Counseling",
    lesson: "Conduct a Retention Counseling",
    assignedDay: 19,
    dueDay: 23,
    type: "performance",
    channel: "Performance Evaluation (DA Form 4856)",
    deliverable: "Conduct a retention counseling session focused on Soldier retention and maintaining unit strength using DA Form 4856. Retest Day 24.",
    materials: ["DA Form 4856", "Authentic Communication Skill Guide", "ARNG Opportunities Catalog"]
  }
];

export const ELEARN_MODULES: EvaluationItem[] = [
  {
    id: "cm4r-1",
    code: "CM4R Mod 1",
    title: "Communication Mastery for RRNCOs — Introduction",
    lesson: "CM4R: Introduction",
    assignedDay: 1,
    dueDay: 2,
    type: "module",
    channel: "Moodle online platform"
  },
  {
    id: "cm4r-2",
    code: "CM4R Mod 2",
    title: "What Drives the Decision to Join",
    lesson: "CM4R: The Mind of the Customer",
    assignedDay: 4,
    dueDay: 5,
    type: "module",
    channel: "Moodle online platform"
  },
  {
    id: "cm4r-3",
    code: "CM4R Mod 3",
    title: "Establishing Rapport",
    lesson: "CM4R: Authentic Communication",
    assignedDay: 7,
    dueDay: 8,
    type: "module",
    channel: "Moodle online platform"
  },
  {
    id: "cm4r-4",
    code: "CM4R Mod 4",
    title: "Integrating Social Media",
    lesson: "CM4R: Energize Your Area",
    assignedDay: 9,
    dueDay: 10,
    type: "module",
    channel: "Moodle online platform"
  }
];

export const MILESTONES: MilestoneItem[] = [
  {
    day: 1,
    title: "In-Processing, HPDT & Reception",
    detail: "0530 In-Processing, H2Wt, and High Physical Demands Test (HPDT, 30lb lift/carry 100ft) at Student Break Area. 0830 Reception Briefing by LTC Jones in Militia Hall RM 203B. 1530 AGSU/ASU Inspection."
  },
  {
    day: 2,
    title: "Initial Army Fitness Test (AFT)",
    detail: "0600–0800 Initial Army Fitness Test at CJTR Track administered by NCO Staff. CM4R Introduction due."
  },
  {
    day: 4,
    title: "Written Examination 1 (NCRCW001)",
    detail: "NCRCW001 20-question closed-book exam on Enlistment Eligibility. Remedial training at 1500; Retest scheduled for Day 5."
  },
  {
    day: 5,
    title: "NCRCW001 Retest & Safety Brief",
    detail: "0530–0730 NCRCW001 Retest. CM4R E-Learning (What Drives the Decision to Join) due. AAR & Weekend Safety Brief at 1700."
  },
  {
    day: 7,
    title: "Financial Programs & PE",
    detail: "Determine Eligibility for Financial Programs and practical exercise. Prepare for Written Examination 2 (NCRCW002) tomorrow at 0830."
  },
  {
    day: 8,
    title: "Written Examination 2 (NCRCW002)",
    detail: "Written Exam 2 (NCRCW002) administered on Wednesday, Oct 28 (0830–1030). Remedial training at 1530; Re-examination scheduled for Day 9 at 0600. CM4R E-Learning (Building Rapport) due."
  },
  {
    day: 9,
    title: "NCRCW002 Retest",
    detail: "0600–0700 Retest for NCRCW002. CM4R Module 4 (Authentic Communication) in Room 100."
  },
  {
    day: 10,
    title: "AFT Retest & Social Media Module",
    detail: "0530–0730 Army Fitness Test retest at CJTR Track. CM4R E-Learning (Integrating Social Media) due. AAR & Weekend Safety Brief at 1700."
  },
  {
    day: 15,
    title: "NCRCP002 Prospecting Memo Due",
    detail: "NCRCP002 Plan a Prospecting Activity 5-paragraph Memorandum for Commander due."
  },
  {
    day: 16,
    title: "NCRCP001_A RRNCO Work Plan Due",
    detail: "NCRCP001_A 14-Day RRNCO Work Plan performance evaluation due. Luke's applicant packet (SF86) submitted in Blackboard."
  },
  {
    day: 17,
    title: "NCRCP006 Packet Evaluation Due",
    detail: "NCRCP006 Process an Applicant for Enlistment complete packet & SF 86 submission due in Blackboard by 0800."
  },
  {
    day: 18,
    title: "NCRCP008 Catalog Due",
    detail: "NCRCP008 ARNG Opportunities Catalog due in Moodle. Unit retention assessment and rules for extension instruction."
  },
  {
    day: 19,
    title: "Three-Event Rehearsal Window",
    detail: "Rehearsal window for NCRCP003, NCRCP004, and NCRCP005 prior to formal board and field evaluations."
  },
  {
    day: 20,
    title: "NCRCP004 Presentation Evaluations",
    detail: "NCRCP004 Conduct a Lead Generation Presentation performance evaluation in Class B uniform. (Retest Day 21)."
  },
  {
    day: 21,
    title: "NCRCP003 Phone Call Evaluations",
    detail: "NCRCP003 Conduct a Prospecting Phone Call performance evaluation. (NCRCP004 Retest; Retest Day 22)."
  },
  {
    day: 22,
    title: "NCRCP005 Interview Evaluations",
    detail: "NCRCP005 Conduct a Recruiting Interview performance evaluation. (NCRCP003 Retest; Retest Day 23)."
  },
  {
    day: 23,
    title: "NCRCP001_B AO Brief & NCRCP009 Counseling",
    detail: "NCRCP001_B Area of Operations Brief & NCRCP009 Soldier Retention Counseling evaluations. (NCRCP005 Retest; Retests Day 24)."
  },
  {
    day: 24,
    title: "Retests, EOC Survey & 1059 Counseling",
    detail: "Retests for NCRCP001 B & NCRCP009; End-Of-Course Survey; DA Form 1059 Counseling; Graduation Practice in Militia Hall."
  },
  {
    day: 25,
    title: "Class 27-001 Graduation Ceremony",
    detail: "Class and Platoon photos, Graduation Ceremony, Certificate of Completion & Basic RRNCO Badge Pinning in Class A/B AGSU.",
    gold: true
  }
];

export const CLEARED_INITIAL: { code: string; title: string; day: number }[] = [];

export const RAW_ROSTER_DATA: RosterMember[] = [
  { no: "1", rank: "SGT", last: "ALLEN", first: "ISAIAH", gender: "M", state: "FL", email: "isaiah.s.allen5.mil@army.mil", age: "28", barracks: "Liberty", room: "A215", mos: "25U20", phone: "786-999-5377", squad: "1", role: "" },
  { no: "3", rank: "SGT", last: "ANDREWS", first: "KARA", gender: "F", state: "TX", email: "kara.r.andrews.mil@army.mil", age: "33", barracks: "Patriot", room: "G116", mos: "27D02", phone: "210-842-7541", squad: "4", role: "Signal Admin" },
  { no: "4", rank: "SGT", last: "ANGRISANI-RAMOS", first: "MYRELLA", gender: "F", state: "NM", email: "myrella.h.angrisani-ramos.mil@army.mil", age: "25", barracks: "Liberty", room: "B208", mos: "88M00", phone: "831-400-7440", squad: "1", role: "" },
  { no: "5", rank: "SGT", last: "ARAUJO CORRADENGO", first: "CAMILA", gender: "F", state: "TX", email: "camila.araujocorradengo.mil@army.mil", age: "39", barracks: "Patriot", room: "G132", mos: "92A", phone: "757-206-4086", squad: "1", role: "SL" },
  { no: "6", rank: "SSG", last: "ASHBAUGH", first: "NATHANIEL", gender: "M", state: "NM", email: "nathaniel.c.ashbaugh.mil@army.mil", age: "41", barracks: "Patriot", room: "F116", mos: "42R", phone: "505-506-7838", squad: "1", role: "" },
  { no: "7", rank: "SPC", last: "AVILABANOS", first: "MELVIN", gender: "M", state: "NY", email: "melvin.e.avilabanos.mil@army.mil", age: "33", barracks: "Liberty", room: "A222", mos: "92Y", phone: "516-234-2184", squad: "1", role: "" },
  { no: "8", rank: "SGT", last: "AWBREY", first: "TROY", gender: "M", state: "OR", email: "troy.j.awbrey.mil@army.mil", age: "38", barracks: "Liberty", room: "B114", mos: "17E", phone: "541-606-3941", squad: "1", role: "" },
  { no: "9", rank: "SGT", last: "BARTOS", first: "THOMAS", gender: "M", state: "WY", email: "thomas.o.bartos3.mil@army.mil", age: "28", barracks: "Liberty", room: "A205", mos: "13M2O", phone: "703-479-5588", squad: "2", role: "" },
  { no: "10", rank: "SSG", last: "BATHGATE", first: "KEIFER", gender: "M", state: "PA", email: "keifer.j.bathgate.mil@army.mil", age: "35", barracks: "Liberty", room: "B206", mos: "15T38", phone: "570-295-6063", squad: "2", role: "SL" },
  { no: "11", rank: "SGT", last: "BAUDIN", first: "ADAM", gender: "M", state: "LA", email: "adam.c.baudin.mil@army.mil", age: "23", barracks: "Liberty", room: "B211", mos: "12N2O", phone: "337-789-3883", squad: "2", role: "" },
  { no: "12", rank: "SGT", last: "BEATRICE", first: "IAN", gender: "M", state: "NM", email: "ian.m.beatrice.mil@army.mil", age: "25", barracks: "Liberty", room: "C219", mos: "11B2O", phone: "575-551-0431", squad: "2", role: "" },
  { no: "13", rank: "SSG", last: "BENALLY", first: "BRODERICK", gender: "M", state: "NM", email: "broderick.a.benally.mil@army.mil", age: "30", barracks: "Liberty", room: "C222", mos: "11B03", phone: "505-870-3695", squad: "2", role: "" },
  { no: "14", rank: "SSG", last: "BUSH", first: "LANDON", gender: "M", state: "NC", email: "landon.c.bush.mil@army.mil", age: "30", barracks: "Liberty", room: "C102", mos: "12H3O", phone: "828-638-5802", squad: "2", role: "PSG" },
  { no: "15", rank: "SFC", last: "CALLAHAN", first: "RYAN", gender: "M", state: "FL", email: "ryan.l.callahan.mil@army.mil", age: "44", barracks: "Patriot", room: "F203", mos: "42A4O", phone: "352-442-6471", squad: "4", role: "" },
  { no: "16", rank: "SPC", last: "CEPEDA", first: "JOEKIN", gender: "M", state: "WA", email: "joekin.j.cepeda2.mil@army.mil", age: "24", barracks: "Patriot", room: "F216", mos: "68W01", phone: "253-678-9788", squad: "4", role: "" },
  { no: "17", rank: "SGT", last: "CLINGMAN", first: "JASMINE", gender: "F", state: "OH", email: "jasmine.n.clingman.mil@army.mil", age: "22", barracks: "Liberty", room: "C216", mos: "88M00", phone: "419-569-3545", squad: "3", role: "" },
  { no: "18", rank: "SPC", last: "CORTES", first: "KHALID", gender: "M", state: "AZ", email: "khalid.z.cortes.mil@army.mil", age: "33", barracks: "Liberty", room: "B217", mos: "92F1O", phone: "480-882-8873", squad: "3", role: "" },
  { no: "19", rank: "SGT", last: "CRUZCOTTO", first: "DIMAYRA", gender: "F", state: "PR", email: "dimayra.cruzcotto.mil@army.mil", age: "34", barracks: "Liberty", room: "A224", mos: "31B000", phone: "787-205-4719", squad: "3", role: "" },
  { no: "21", rank: "SPC", last: "DETERMAN", first: "TYLER", gender: "M", state: "MN", email: "tyler.r.determan.mil@army.mil", age: "21", barracks: "Patriot", room: "F211", mos: "12N", phone: "651-335-3740", squad: "3", role: "" },
  { no: "23", rank: "SGT", last: "DISTEFANO", first: "MACKENZIE", gender: "M", state: "MO", email: "mackenzie.j.distefano.mil@army.mil", age: "25", barracks: "Liberty", room: "C103", mos: "68W00", phone: "816-797-0049", squad: "3", role: "" },
  { no: "24", rank: "SSG", last: "DONAHOE", first: "DAVID", gender: "M", state: "VA", email: "david.j.donahoe2.mil@army.mil", age: "44", barracks: "Liberty", room: "A123", mos: "31B00", phone: "203-209-1905", squad: "3", role: "" },
  { no: "25", rank: "SSG", last: "DRAGAN", first: "SHELBY", gender: "F", state: "PA", email: "shelby.l.dragan.mil@army.mil", age: "28", barracks: "Liberty", room: "B204", mos: "11B03", phone: "484-650-5677", squad: "4", role: "SL" },
  { no: "26", rank: "SSG", last: "ESCOBEDO", first: "ROGER", gender: "M", state: "CA", email: "roger.a.escobedo.mil@army.mil", age: "30", barracks: "Patriot", room: "G127", mos: "74D", phone: "619-560-1856", squad: "4", role: "" }
];

export const CADRE: CadreMember[] = [
  {
    rank: "SFC",
    name: "Damon, Ethan L.",
    role: "Lead Instructor / Writer",
    phone: "(612) 270-7212",
    tel: "tel:+16122707212",
    email: "ethan.l.damon.mil@army.mil",
    mailto: "mailto:ethan.l.damon.mil@army.mil",
    location: "PEC Building 4400 · Camp Robinson · North Little Rock",
    duties: "Class Dashboard Primary Cadre · ISAP Evaluations Oversight · Practical Exercise Proctor"
  },
  {
    rank: "CTR",
    name: "Dacus, Matthew E.",
    role: "Tactical Course Instructor",
    phone: "(501) 212-4000",
    tel: "tel:+15012124000",
    email: "matthew.e.dacus.ctr@army.mil",
    mailto: "mailto:matthew.e.dacus.ctr@army.mil",
    location: "PEC Building 4400 · Camp Robinson · North Little Rock",
    duties: "Instructional Systems · Academic Mentorship · Recruiter Zone System Lead"
  }
];

export const REGULATIONS: RegulationItem[] = [
  {
    id: "reg-1",
    code: "AR 601-210",
    title: "Regular Army and Reserve Component Enlistment Program",
    category: "Enlistment",
    docNumber: "AR 601-210",
    note: "Eligibility criteria, moral and medical waivers, prior service enlistments — the regulatory bedrock you will open most.",
    highlights: ["Table 2-1: Basic Enlistment Eligibility", "Chapter 4: Waivers & Suitability Review", "Chapter 5: Prior Service Requirements"],
    href: "https://armypubs.army.mil/epubs/DR_pubs/DR_a/pdf/web/ARN18684_AR601-210_FINAL.pdf"
  },
  {
    id: "reg-2",
    code: "PPOM 25-042",
    title: "Accessions Options Criteria (AOC)",
    category: "Enlistment",
    docNumber: "PPOM 25-042",
    note: "Specifies which MOS and enlistment option codes an applicant actually qualifies for based on test scores and education tiers.",
    highlights: ["MOS line score cutoffs", "Option 9A / 9B definitions", "Education credentials Tier 1 vs Tier 2"],
    href: "#"
  },
  {
    id: "reg-3",
    code: "AR 40-501",
    title: "Standards of Medical Fitness",
    category: "Medical",
    docNumber: "AR 40-501",
    note: "Chapter 2 standards for enlistment physicals at MEPS, disqualified conditions, and medical review requirements.",
    highlights: ["Chapter 2: Enlistment Medical Standards", "Hearing & Vision thresholds", "Prescription medication disqualifiers"],
    href: "https://armypubs.army.mil/epubs/DR_pubs/DR_a/pdf/web/ARN3801_AR40-501_Web_FINAL.pdf"
  },
  {
    id: "reg-4",
    code: "DA Pam 611-21",
    title: "Military Occupational Classification and Structure",
    category: "Enlistment",
    docNumber: "DA PAM 611-21",
    note: "Table 10-79T-1 outlines the 79T Career Recruiter physical demands and Heavy Physical Demand Test standards.",
    highlights: ["79T Physical Demands Table", "MOS prerequisites", "ASVAB composite formulas"],
    href: "#"
  },
  {
    id: "reg-5",
    code: "ARNG FY27 SRIP",
    title: "Selected Reserve Incentive Program Policy 27-01",
    category: "Incentives",
    docNumber: "ARNG-HRZ #27-01",
    note: "Effective 1 Oct 2026. Prescribes standards for ARNG incentives: Non-Prior Service Enlistment Bonus (NPSEB up to $25,000), Off-Peak ($2,500), Prior Service ($20,000), EAB ($20,000), REB ($20,000), MOSCB ($10,000), SLRP ($50,000), CLRP ($80,000), and 79T AGR REB ($12,000). Suspends officer accession and retention bonuses.",
    highlights: ["NPSEB Tier 1 $25,000 & Tiers 2–4 ($12.5K–$6.25K)", "SLRP $50,000 lifetime cap ($8,333.33/yr cap)", "Off-Peak $2,500 lump sum & digital signature rules"],
    href: "#"
  },
  {
    id: "reg-6",
    code: "SRIP Matrix",
    title: "FY26 ARNG Incentive Amount & Tier Matrix",
    category: "Incentives",
    docNumber: "NGB-SRIP-M",
    note: "Immediate visual breakdown of payment tranches, anniversary requirements, and contractual obligations.",
    highlights: ["Initial vs 2nd payment intervals", "State vs Federal allocation", "Recoupment criteria"],
    href: "#"
  },
  {
    id: "reg-7",
    code: "PPOM 25-043",
    title: "Voluntary Education Policy (VolEd)",
    category: "Incentives",
    docNumber: "PPOM 25-043",
    note: "Federal Tuition Assistance (FTA), Post-9/11 GI Bill (Chapter 33), and Montgomery GI Bill Selected Reserve (Chapter 1606).",
    highlights: ["State Tuition Assistance crosswalk", "$4,000/yr FTA caps", "Kicker eligibility tiers"],
    href: "#"
  },
  {
    id: "reg-8",
    code: "AR 670-1 & DA Pam 670-1",
    title: "Wear and Appearance of Army Uniforms and Insignia",
    category: "Standards",
    docNumber: "AR 670-1",
    note: "Strict guidelines on grooming, tattoos, rings, badge placement, and Class B AGSU/ASU wear.",
    highlights: ["Neck and hand tattoo guidelines", "RRNCO Badge positioning", "Class B dress ribbon order"],
    href: "https://armypubs.army.mil/epubs/DR_pubs/DR_a/ARN30297-AR_670-1-000-WEB-1.pdf"
  },
  {
    id: "reg-9",
    code: "AR 600-9",
    title: "The Army Body Composition Program",
    category: "Standards",
    docNumber: "AR 600-9",
    note: "Screening height and weight tables, circumference tape test methodology, and flag procedures.",
    highlights: ["Table B-1: Screening weights", "Single-site tape method", "Exemptions for high ACFT scores"],
    href: "https://armypubs.army.mil/epubs/DR_pubs/DR_a/ARN37750-AR_600-9-000-WEB-1.pdf"
  },
  {
    id: "reg-10",
    code: "NGR 601-1",
    title: "Army National Guard Strength Maintenance Program",
    category: "Operations",
    docNumber: "NGR 601-1",
    note: "The Guard Gospel: operations, recruiter ethics, MEPS liaison responsibilities, and RSP operations.",
    highlights: ["Chapter 3: Recruiter Duties & Ethics", "MEPS Station processing protocol", "Mission Day calculations"],
    href: "#"
  },
  {
    id: "reg-11",
    code: "FM 7-22 / ATP 7-22.01",
    title: "Holistic Health and Fitness (H2F)",
    category: "Standards",
    docNumber: "FM 7-22",
    note: "Army Fitness Test standards, scoring tables, profiles, and conditioning drills.",
    highlights: ["ACFT 6-event standards", "Recovery nutrition guidance", "Musculoskeletal reconditioning"],
    href: "https://armypubs.army.mil/epubs/DR_pubs/DR_a/ARN44522-FM_7-22-002-WEB-7.pdf"
  }
];

export const JOB_AIDS: JobAidItem[] = [
  {
    id: "tool-1",
    title: "APPLE-MDT Matrix",
    module: "Identify Eligibility Doctrine",
    note: "SMTB 805B-SQI4 Doctrine (20230612): Official regulatory crosswalk for Non-Prior Service (NPS) and Prior Service (PS) correlating Age / Citizenship, Physical, Prior Service, Law Violations, Education, Marital Status, Dependents, and Testing to AR 601-210, AOC, AR 40-501, AR 670-1 para. 3-3, and AR 600-9.",
    quickGuide: [
      "Age / Citizenship: AR 601-210 paras. 2-3 & 2-4 / AOC para. 2-4 (NPS) · AR 601-210 para. 3-3 / AOC para. 3-3 (PS)",
      "Physical: AR 601-210 para. 2-9, AR 40-501, AR 670-1 para. 3-3 / AOC para. 2-9 (NPS) · AR 601-210 para. 3-7, AR 670-1 para. 3-3, AR 600-9 / AOC para. 3-7 (PS)",
      "Prior Service: AR 601-210 para. 3-2 (NPS) · AR 601-210 paras. 3-2, 3-11, 3-20 / AOC, para. 3-2, Table 4-2 (PS)",
      "Law Violations: AR 601-210 para. 2-11, Ch. 4 Offense Tables / AOC para. 2-11, Ch. 4 (NPS) · Table 4-1 (PS)",
      "Education: AR 601-210 para. 2-7 / AOC para. 2-7 (NPS) · AR 601-210 para. 3-5 (PS)",
      "Marital Status: AR 601-210 para. 2-10 (NPS) · AR 601-210 paras. 2-10, 3-8 (PS)",
      "Dependents: AR 601-210 para. 2-10, / AOC para. 4-3(d) (NPS) · AR 601-210 paras. 2-10, 3-8 / AOC, para. 4-3(d) (PS)",
      "Testing: AR 601-210 para. 2-8 / AOC para. 2-8 (NPS) · AR 601-210 para. 3-6 / AOC para. 3-6 (PS)"
    ],
    actionType: "interactive_screener"
  },
  {
    id: "tool-2",
    title: "Value Maximizer Tool",
    module: "CM4R Module 3",
    note: "Official CM4R 2-Part Worksheet: Part 1 plots Tangible & Intangible motivators on a 7-spoke radar graph. Part 2 aligns the Top 3 motivators directly to Army National Guard features and personal transformation benefits (So What?) under ARNG-HRZ Policy #27-01.",
    quickGuide: [
      "Part 1: Plot motivators 1 (Low) to 5 (High) on the 7-axis radar graph: Training, Education, Adventure, Money, Service to Country, Service to Others, Other.",
      "Part 2: Transfer the Top 3 motivators into the 4-column alignment matrix.",
      "Column 1 (Motivator): What do they want?",
      "Column 2 (Values): Why do they want it?",
      "Column 3 (Features): What Guard features or incentives might meet this need? (Direct quick-insert from ARNG-HRZ Policy #27-01)",
      "Column 4 (Benefit / So What?): How would these features benefit the individual and meet the need?"
    ],
    actionType: "interactive_worksheet"
  },
  {
    id: "tool-3",
    title: "Psychometric Assessment Tool",
    module: "CM4R Module 2",
    note: "Evaluates behavioral communication styles: Dominance, Influence, Steadiness, and Conscientiousness.",
    quickGuide: [
      "Identify conversational pace (Fast vs Deliberate) and focus (Task vs Relationship).",
      "Adapt speech rate, objection handling, and closing cadence to candidate comfort zone."
    ],
    actionType: "external_link",
    url: "https://simulation.1st90.com/"
  },
  {
    id: "tool-4",
    title: "Computations Job Aid",
    module: "SMTB Rules & PPOM 09-026",
    note: "Official SMTB Rules for Computations & Bars to Reenlistment Matrix. Standard calculation engines for Earliest Extension Date, Age at ETS, Creditable Service (PEBD), PHA/ACFT Validity, Age 59+ Maximum Extension, and PPOM 09-026 Bar authorities.",
    quickGuide: [
      "Rule 1 & 2: Month-end ETS and leap years (Feb 29 -> Feb 28 earliest date). No 00 months or 00 days.",
      "Rule 3: Always add 1 inclusive day (+01) when calculating elapsed service periods.",
      "Rule 4: Ending date (top number) on month-end is always converted to 30.",
      "Rule 5: Borrowing: Deduct 1 year (+12 mos) and/or deduct 1 month (+30 days).",
      "Rule 6: Round up final answer so MM <= 11 and DD <= 29.",
      "Bars to Reenlistment (PPOM 09-026): Authority matrix for <10 yrs, 10-18 yrs, and 18-20 yrs Sanctuary."
    ],
    actionType: "interactive_calculator"
  },
  {
    id: "tool-5",
    title: "Mission Planner & Battle Rhythm",
    module: "Recruiting Zone Operations",
    note: "Official SMTB tool. Enforces the standard duty schedule (Monday–Friday 0800–1700) and production pacing: 25 phone call attempts/hour and 5 face-to-face attempts/hour across the weekly battle rhythm.",
    quickGuide: [
      "Standard Work Week: Monday through Friday, 0800–1700 duty hours (Saturday/Sunday non-duty recovery).",
      "Morning Block (0800–1130): Lead input, applicant packet quality control, MEPS coordination, and 1SG daily cadence.",
      "Midday Block (1130–1430): Area Canvassing & school visits (5 face-to-face attempts/hour standard).",
      "Afternoon Block (1430–1700): Telephone prospecting (25 phone call attempts/hour standard) & scheduled interviews.",
      "Hourly Production Metrics: Integrated 25 calls/hr and 5 F2F attempts/hr conversion calculators."
    ],
    actionType: "interactive_planner",
    url: "/documents/RZ_MISSION_PLANNER_AND_BATTLE_RHYTHM.pdf"
  }
];

export const PLATOON_LEADERSHIP = [
  { role: "Platoon Guide / Sergeant (PSG)", name: "SSG Bush, Landon", room: "Liberty C102", phone: "828-638-5802" },
  { role: "1st Squad Leader", name: "SGT Araujo Corradengo, Camila", room: "Patriot G132", phone: "757-206-4086" },
  { role: "2nd Squad Leader", name: "SSG Bathgate, Keifer", room: "Liberty B206", phone: "570-295-6063" },
  { role: "3rd Squad Leader", name: "SSG Donahoe, David (Acting)", room: "Liberty A123", phone: "203-209-1905" },
  { role: "4th Squad Leader", name: "SSG Dragan, Shelby", room: "Liberty B204", phone: "484-650-5677" }
];

export const ADDITIONAL_DUTIES = [
  { role: "Signal Group Administrator", name: "SGT Andrews, Kara", squad: "4", note: "Platoon comms routing & link security" },
  { role: "Class Historian & Media", name: "SGT Andrews, Kara", squad: "4", note: "Platoon photos, graduation slideshow" },
  { role: "SharePoint / Tech Coordinator", name: "SGT Andrews, Kara", squad: "4", note: "Blackboard & Moodle file sync" },
  { role: "Barracks Liaison (Liberty)", name: "SSG Benally, Broderick", squad: "2", note: "Facility maintenance and room supplies" },
  { role: "Barracks Liaison (Patriot)", name: "SFC Callahan, Ryan", squad: "4", note: "Patriot hall communication" }
];
