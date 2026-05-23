
"homepage": "https://github.com/prateek21830-dev/family-vault",
1|import { useState } from "react";
2|import "@/App.css";
3|import { jsPDF } from "jspdf";
4|import * as XLSX from "xlsx";
5|import {
6|  AlertTriangle,
7|  Archive,
8|  BadgeIndianRupee,
9|  Banknote,
10|  BriefcaseBusiness,
11|  Building2,
12|  CalendarClock,
13|  Car,
14|  CheckCircle2,
15|  ChevronRight,
16|  ClipboardList,
17|  CreditCard,
18|  Database,
19|  Download,
20|  FileInput,
21|  FileJson,
22|  FileSpreadsheet,
23|  FileArchive,
24|  FileHeart,
25|  FileSearch,
26|  FileText,
27|  FolderLock,
28|  GraduationCap,
29|  HeartPulse,
30|  Home,
31|  Landmark,
32|  LayoutDashboard,
33|  LockKeyhole,
34|  Mail,
35|  PawPrint,
36|  PenLine,
37|  PiggyBank,
38|  Plane,
39|  Plus,
40|  ReceiptText,
41|  Search,
42|  ShieldCheck,
43|  Sparkles,
44|  Trash2,
45|  UserRound,
46|  UsersRound,
47|  WalletCards,
48|} from "lucide-react";
49|
50|const STORAGE_KEY = "family-financial-recovery-vault-records-v1";
51|
52|const SECTION_GROUPS = [
53|  {
54|    name: "Essential first",
55|    note: "Fill these before anything else so family can act quickly.",
56|    sections: [
57|      "message-family",
58|      "personal-info",
59|      "emergency-access",
60|      "trusted-helpers",
61|    ],
62|  },
63|  {
64|    name: "Family, income & care",
65|    note: "People, income, medical care and education details.",
66|    sections: [
67|      "family-members",
68|      "income",
69|      "employment-benefits",
70|      "children-education",
71|      "medical-info",
72|    ],
73|  },
74|  {
75|    name: "Money, assets & obligations",
76|    note: "What exists, what is owed, and what needs renewing.",
77|    sections: [
78|      "financial-assets",
79|      "insurance",
80|      "properties",
81|      "vehicles",
82|      "bank-locker",
83|      "liabilities",
84|      "money-given-taken",
85|    ],
86|  },
87|  {
88|    name: "Business, legal & documents",
89|    note: "Legal authority, business continuity and statutory records.",
90|    sections: [
91|      "business-details",
92|      "business-operations",
93|      "statutory-tax",
94|      "power-attorney",
95|      "will-estate",
96|      "post-death-plan",
97|      "important-documents",
98|    ],
99|  },
100|  {
101|    name: "Digital life & daily operations",
102|    note: "Accounts, subscriptions, utilities and practical instructions.",
103|    sections: [
104|      "digital-assets",
105|      "cards-wallets",
106|      "household-expenses",
107|      "subscriptions",
108|      "travel-plans",
109|      "pet-care",
110|      "family-values",
111|    ],
112|  },
113|];
114|
115|const SECTIONS = [
116|  {
117|    id: "message-family",
118|    title: "Message to My Family",
119|    description: "A clear personal note with first calls, wishes and calm guidance.",
120|    icon: Mail,
121|    priority: true,
122|    fields: ["Message", "CA contact", "Lawyer contact", "Trusted person", "Doctor contact"],
123|  },
124|  {
125|    id: "personal-info",
126|    title: "Personal Information",
127|    description: "Identity, PAN/Aadhaar, advisors and key reference details.",
128|    icon: UserRound,
129|    priority: true,
130|    fields: ["Full name", "Date of birth", "PAN", "Aadhaar", "Blood group", "Notes"],
131|  },
132|  {
133|    id: "emergency-access",
134|    title: "Emergency Access & Vault Discovery",
135|    description: "Where the vault is kept and how family can discover it safely.",
136|    icon: LockKeyhole,
137|    priority: true,
138|    fields: ["Vault location", "Access method", "Backup contact", "Discovery instructions"],
139|  },
140|  {
141|    id: "trusted-helpers",
142|    title: "Trusted Helpers",
143|    description: "People your family can call first during a crisis.",
144|    icon: UsersRound,
145|    priority: true,
146|    fields: ["Helper name", "Relationship", "Phone", "How they can help", "Notes"],
147|  },
148|  {
149|    id: "family-members",
150|    title: "Family Members",
151|    description: "Important family details and responsibilities.",
152|    icon: UsersRound,
153|    fields: ["Name", "Relationship", "Phone", "Important notes"],
154|  },
155|  {
156|    id: "income",
157|    title: "Source of Income",
158|    description: "Salary, rent, pension, dividends and other inflows.",
159|    icon: Banknote,
160|    fields: ["Income source", "Monthly amount", "Contact", "Continuation notes"],
161|  },
162|  {
163|    id: "financial-assets",
164|    title: "Financial Assets",
165|    description: "Bank accounts, deposits, mutual funds, stocks and valuables.",
166|    icon: PiggyBank,
167|    priority: true,
168|    fields: ["Asset name", "Institution", "Amount", "Nominee", "Document location"],
169|  },
170|  {
171|    id: "insurance",
172|    title: "Insurance",
173|    description: "Policies, sum assured, nominee and renewal reminders.",
174|    icon: ShieldCheck,
175|    priority: true,
176|    fields: ["Policy type", "Insurance company", "Policy number", "Sum assured", "Renewal date", "Nominee"],
177|  },
178|  {
179|    id: "properties",
180|    title: "Properties",
181|    description: "Property ownership, papers, loans and care instructions.",
182|    icon: Home,
183|    fields: ["Property name", "Address", "Market value", "Ownership", "Document location"],
184|  },
185|  {
186|    id: "vehicles",
187|    title: "Vehicles",
188|    description: "Registration, insurance, loans and service contacts.",
189|    icon: Car,
190|    fields: ["Vehicle name", "Registration number", "Insurance renewal date", "Loan details", "Service contact"],
191|  },
192|  {
193|    id: "household-expenses",
194|    title: "Household Expenses & Utilities",
195|    description: "Recurring bills, mandates, providers and payment methods.",
196|    icon: ReceiptText,
197|    fields: ["Expense name", "Provider", "Monthly amount", "Payment method", "Due date"],
198|  },
199|  {
200|    id: "children-education",
201|    title: "Children Education Plan",
202|    description: "Fees, schools, future funding and contacts.",
203|    icon: GraduationCap,
204|    fields: ["Child name", "School/college", "Annual fees", "Funding source", "Contact"],
205|  },
206|  {
207|    id: "business-details",
208|    title: "Business Details",
209|    description: "Business identity, ownership, loans and key people.",
210|    icon: Building2,
211|    fields: ["Business name", "Legal structure", "Registration number", "Partner/director details", "Notes"],
212|  },
213|  {
214|    id: "business-operations",
215|    title: "Business Operations",
216|    description: "Vendors, customers, systems, staff and continuity steps.",
217|    icon: BriefcaseBusiness,
218|    fields: ["Operation area", "Key contact", "System/tool", "What family should do", "Notes"],
219|  },
220|  {
221|    id: "statutory-tax",
222|    title: "Statutory & Tax Details",
223|    description: "GST, ITR, due dates, consultants and records.",
224|    icon: ClipboardList,
225|    fields: ["Registration/return type", "Consultant", "Next due date", "Record location", "Notes"],
226|  },
227|  {
228|    id: "employment-benefits",
229|    title: "Employment & Benefits",
230|    description: "Employer, HR, PF, gratuity and settlement instructions.",
231|    icon: Landmark,
232|    fields: ["Employer name", "Employee ID", "HR contact", "Benefits", "Settlement notes"],
233|  },
234|  {
235|    id: "liabilities",
236|    title: "Liabilities",
237|    description: "Loans, EMIs, lender contacts and closure instructions.",
238|    icon: BadgeIndianRupee,
239|    fields: ["Loan type", "Lender", "Outstanding amount", "Monthly EMI", "Closure notes"],
240|  },
241|  {
242|    id: "money-given-taken",
243|    title: "Money Given / Taken",
244|    description: "Recoverable, payable, witnesses, proof and follow-up notes.",
245|    icon: WalletCards,
246|    fields: ["Party name", "Transaction type", "Amount", "Proof location", "Recovery/payment notes"],
247|  },
248|  {
249|    id: "digital-assets",
250|    title: "Digital Accounts & Assets",
251|    description: "Password manager references, domains, websites and recovery notes.",
252|    icon: Database,
253|    fields: ["Platform/account", "Email/user ID", "Password manager location", "Recovery instructions", "Value/notes"],
254|  },
255|  {
256|    id: "cards-wallets",
257|    title: "Cards, Wallets & Mandates",
258|    description: "Credit cards, wallets, auto-debits and closure steps.",
259|    icon: CreditCard,
260|    fields: ["Instrument", "Provider", "Linked account", "Mandate details", "Closure instructions"],
261|  },
262|  {
263|    id: "medical-info",
264|    title: "Medical Information",
265|    description: "Doctors, medicines, allergies and emergency care notes.",
266|    icon: HeartPulse,
267|    fields: ["Condition", "Doctor", "Medication", "Emergency instruction", "Reports location"],
268|  },
269|  {
270|    id: "important-documents",
271|    title: "Important Documents",
272|    description: "Birth, marriage, tax, business, property and medical documents.",
273|    icon: FileArchive,
274|    fields: ["Document name", "Location", "Who can access", "Use/purpose", "Notes"],
275|  },
276|  {
277|    id: "power-attorney",
278|    title: "Power of Attorney",
279|    description: "POA status, authority, holder and document location.",
280|    icon: PenLine,
281|    fields: ["POA type", "Holder", "Authority", "Document location", "Lawyer contact"],
282|  },
283|  {
284|    id: "will-estate",
285|    title: "Will & Estate",
286|    description: "Will type, location, executor and estate instructions.",
287|    icon: FileHeart,
288|    priority: true,
289|    fields: ["Will type", "Will location", "Executor", "Lawyer", "Estate notes"],
290|  },
291|  {
292|    id: "post-death-plan",
293|    title: "Post-Death Action Plan",
294|    description: "The first 48 hours, who to inform and what to avoid.",
295|    icon: AlertTriangle,
296|    fields: ["Action", "Timing", "Responsible person", "Documents needed", "Notes"],
297|  },
298|  {
299|    id: "travel-plans",
300|    title: "Travel Plans",
301|    description: "Bookings, cancellations, refunds and emergency contacts.",
302|    icon: Plane,
303|    fields: ["Trip name", "Travel date", "Booking location", "Cancellation notes", "Emergency contact"],
304|  },
305|  {
306|    id: "subscriptions",
307|    title: "Subscriptions",
308|    description: "Services, renewal dates, payment sources and closure steps.",
309|    icon: CalendarClock,
310|    fields: ["Service", "Renewal date", "Amount", "Payment method", "Closure notes"],
311|  },
312|  {
313|    id: "bank-locker",
314|    title: "Bank Locker",
315|    description: "Locker branch, holder, inventory and access instructions.",
316|    icon: FolderLock,
317|    fields: ["Bank/branch", "Locker number", "Holder", "Inventory", "Access instructions"],
318|  },
319|  {
320|    id: "pet-care",
321|    title: "Pet Care",
322|    description: "Vet, routine, food and trusted caretaker instructions.",
323|    icon: PawPrint,
324|    fields: ["Pet name", "Vet contact", "Food/routine", "Caretaker", "Medical notes"],
325|  },
326|  {
327|    id: "family-values",
328|    title: "Family Values",
329|    description: "Non-financial wishes, traditions and emotional guidance.",
330|    icon: Sparkles,
331|    fields: ["Value/topic", "Message", "Tradition", "Important instruction"],
332|  },
333|];
334|
335|const SECTION_LOOKUP = Object.fromEntries(SECTIONS.map((section) => [section.id, section]));
336|const PRIORITY_SECTION_IDS = SECTIONS.filter((section) => section.priority).map((section) => section.id);
337|const PRIMARY_NAV = [
338|  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
339|  { id: "records", label: "All Records", icon: Archive },
340|  { id: "search", label: "Search", icon: Search },
341|  { id: "download", label: "Download Vault", icon: Download },
342|];
343|
344|const moneyFields = [
345|  "amount",
346|  "sum assured",
347|  "market value",
348|  "monthly amount",
349|  "outstanding amount",
350|  "monthly emi",
351|  "annual fees",
352|];
353|
354|const dateFields = ["date", "renewal", "due"];
355|
356|function slugify(value) {
357|  return String(value).replace(/\s+/g, "-").replace(/[^a-zA-Z0-9-]/g, "").toLowerCase();
358|}
359|
360|function isMoneyField(field) {
361|  return moneyFields.some((moneyField) => field.toLowerCase().includes(moneyField));
362|}
363|
364|function isDateField(field) {
365|  return dateFields.some((dateField) => field.toLowerCase().includes(dateField));
366|}
367|
368|function isPhoneField(field) {
369|  return /(^|\s)(phone|mobile)(\s|$)/i.test(field);
370|}
371|
372|function isContactField(field) {
373|  return /contact/i.test(field);
374|}
375|
376|function isBlank(value) {
377|  return !String(value || "").trim();
378|}
379|
380|function loadRecords() {
381|  try {
382|    return JSON.parse(window.sessionStorage.getItem(STORAGE_KEY) || "[]");
383|  } catch {
384|    return [];
385|  }
386|}
387|
388|function saveRecords(nextRecords) {
389|  window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(nextRecords));
390|}
391|
392|function downloadBlob(filename, blob) {
393|  const link = document.createElement("a");
394|  link.href = URL.createObjectURL(blob);
395|  link.download = filename;
396|  link.click();
397|  URL.revokeObjectURL(link.href);
398|}
399|
400|function sanitizeRecord(record) {
401|  if (!record || !SECTION_LOOKUP[record.sectionId] || typeof record.fields !== "object") return null;
402|  const section = SECTION_LOOKUP[record.sectionId];
403|  const cleanFields = {};
404|  section.fields.forEach((field) => {
405|    cleanFields[field] = String(record.fields[field] || "").trim();
406|  });
407|  const hasContent = Object.values(cleanFields).some((value) => value);
408|  if (!hasContent) return null;
409|  return {
410|    id: record.id || crypto.randomUUID(),
411|    sectionId: record.sectionId,
412|    fields: cleanFields,
413|    createdAt: record.createdAt || new Date().toISOString(),
414|  };
415|}
416|
417|function parseBackupPayload(payload) {
418|  const rawRecords = Array.isArray(payload) ? payload : payload?.records;
419|  if (!Array.isArray(rawRecords)) return [];
420|  return rawRecords.map(sanitizeRecord).filter(Boolean);
421|}
422|
423|function flattenRecords(records) {
424|  return records.map((record) => {
425|    const section = SECTION_LOOKUP[record.sectionId];
426|    return {
427|      Section: section?.title || record.sectionId,
428|      "Record title": getRecordTitle(record),
429|      "Saved on": formatDate(record.createdAt),
430|      ...record.fields,
431|    };
432|  });
433|}
434|
435|function safeSheetName(name, usedNames) {
436|  const base = name.replace(/[\\/?*\[\]:]/g, " ").slice(0, 28).trim() || "Sheet";
437|  let candidate = base;
438|  let counter = 1;
439|  while (usedNames.has(candidate)) {
440|    candidate = `${base.slice(0, 25)} ${counter}`;
441|    counter += 1;
442|  }
443|  usedNames.add(candidate);
444|  return candidate;
445|}
446|
447|function addPdfLine(doc, text, y, options = {}) {
448|  const { size = 10, style = "normal", color = [55, 55, 55], margin = 16, indent = 0 } = options;
449|  doc.setFont("helvetica", style);
450|  doc.setFontSize(size);
451|  doc.setTextColor(...color);
452|  const lines = doc.splitTextToSize(String(text || ""), 180 - indent);
453|  lines.forEach((line) => {
454|    if (y > 282) {
455|      doc.addPage();
456|      y = 18;
457|    }
458|    doc.text(line, margin + indent, y);
459|    y += size > 14 ? 8 : 6;
460|  });
461|  return y;
462|}
463|
464|function buildPdf(records, mode = "full") {
465|  const doc = new jsPDF({ unit: "mm", format: "a4" });
466|  const exportRecords = mode === "priority" ? records.filter((record) => SECTION_LOOKUP[record.sectionId]?.priority) : records;
467|  let y = 18;
468|  y = addPdfLine(doc, mode === "priority" ? "Family Vault — Priority Summary" : "Family Financial Recovery Vault — Full Export", y, {
469|    size: 18,
470|    style: "bold",
471|    color: [17, 17, 17],
472|  });
473|  y = addPdfLine(doc, `Exported: ${formatDate(new Date().toISOString())} · Records: ${exportRecords.length}`, y + 2, {
474|    size: 9,
475|    color: [85, 85, 85],
476|  });
477|  y += 6;
478|
479|  if (!exportRecords.length) {
480|    addPdfLine(doc, "No records available for this export.", y, { size: 11 });
481|    return doc;
482|  }
483|
484|  SECTIONS.forEach((section) => {
485|    const items = exportRecords.filter((record) => record.sectionId === section.id);
486|    if (!items.length) return;
487|    y = addPdfLine(doc, section.title, y + 3, { size: 14, style: "bold", color: [0, 85, 255] });
488|    items.forEach((record, index) => {
489|      y = addPdfLine(doc, `${index + 1}. ${getRecordTitle(record)}`, y + 2, { size: 11, style: "bold", color: [17, 17, 17] });
490|      Object.entries(record.fields || {}).forEach(([field, value]) => {
491|        if (!value) return;
492|        y = addPdfLine(doc, `${field}: ${value}`, y, { size: 9, indent: 4 });
493|      });
494|      y += 2;
495|    });
496|  });
497|  return doc;
498|}
499|
500|function validateRequiredField(section, draft, errors) {
501|  const firstField = section.fields[0];
502|  if (isBlank(draft[firstField])) {
503|    errors[firstField] = `${firstField} is required.`;
504|  }
505|}
506|
507|function validateFamilyMessage(section, draft, errors) {
508|  if (section.id === "message-family" && String(draft.Message || "").trim().length < 20) {
509|    errors.Message = "Please write at least 20 characters so the message is useful.";
510|  }
511|}
512|
513|function validateIdentityField(field, value) {
514|  if (field === "PAN" && !/^[A-Z]{5}[0-9]{4}[A-Z]$/i.test(value)) {
515|    return "PAN must look like ABCDE1234F.";
516|  }
517|  if (field === "Aadhaar" && value.replace(/\D/g, "").length !== 12) {
518|    return "Aadhaar must contain exactly 12 digits.";
519|  }
520|  return "";
521|}
522|
523|function validateTypedField(field, value) {
524|  if (isMoneyField(field)) {
525|    const parsed = Number(value.replace(/[^0-9.-]/g, ""));
526|    if (!Number.isFinite(parsed) || parsed < 0) return `${field} must be a valid positive number.`;
527|  }
528|  if (isDateField(field) && Number.isNaN(Date.parse(value))) {
529|    return `${field} must be a valid date, for example 2026-03-31.`;
530|  }
531|  if (isPhoneField(field) && !/^\+?[0-9\s-]{7,18}$/.test(value)) {
532|    return `${field} should be a valid phone number.`;
533|  }
534|  if (isContactField(field) && /@/.test(value) && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
535|    return `${field} email looks invalid.`;
536|  }
537|  return "";
538|}
539|
540|function validateSectionDraft(section, draft) {
541|  const errors = {};
542|  validateRequiredField(section, draft, errors);
543|  validateFamilyMessage(section, draft, errors);
544|
545|  Object.entries(draft).forEach(([field, rawValue]) => {
546|    const value = String(rawValue || "").trim();
547|    if (!value) return;
548|    const error = validateIdentityField(field, value) || validateTypedField(field, value);
549|    if (error) errors[field] = error;
550|  });
551|
552|  return errors;
553|}
554|
555|function formatDate(value) {
556|  if (!value) return "—";
557|  return new Intl.DateTimeFormat("en-IN", {
558|    day: "2-digit",
559|    month: "short",
560|    year: "numeric",
561|  }).format(new Date(value));
562|}
563|
564|function formatINR(value) {
565|  const number = Number(value || 0);
566|  if (!number) return "₹0";
567|  return new Intl.NumberFormat("en-IN", {
568|    style: "currency",
569|    currency: "INR",
570|    maximumFractionDigits: 0,
571|  }).format(number);
572|}
573|
574|function getRecordTitle(record) {
575|  const values = Object.values(record.fields || {}).filter(Boolean);
576|  return values[0] || SECTION_LOOKUP[record.sectionId]?.title || "Vault record";
577|}
578|
579|function sectionRecords(records, sectionId) {
580|  return records.filter((record) => record.sectionId === sectionId);
581|}
582|
583|function parseMoneyFromRecords(records) {
584|  return records.reduce((total, record) => {
585|    return (
586|      total +
587|      Object.entries(record.fields || {}).reduce((sum, [key, value]) => {
588|        if (!moneyFields.some((field) => key.toLowerCase().includes(field))) return sum;
589|        const parsed = Number(String(value).replace(/[^0-9.-]/g, ""));
590|        return Number.isFinite(parsed) ? sum + parsed : sum;
591|      }, 0)
592|    );
593|  }, 0);
594|}
595|
596|function getSectionBadge(section, count) {
597|  if (count > 0) return `${count} saved`;
598|  if (section.priority) return "Priority";
599|  return "Start";
600|}
601|
602|function getInputMode(field) {
603|  if (isMoneyField(field)) return "decimal";
604|  if (isPhoneField(field)) return "tel";
605|  return "text";
606|}
607|
608|function isLongField(field) {
609|  const lowerField = field.toLowerCase();
610|  return lowerField.includes("note") || lowerField.includes("message") || lowerField.includes("instruction");
611|}
612|
613|function getFieldPlaceholder(field, index) {
614|  if (isLongField(field)) return index === 0 ? "Write the most important detail here..." : "Add clear instructions...";
615|  return index === 0 ? `Enter ${field.toLowerCase()}` : "Optional";
616|}
617|
618|function calculateStats(records) {
619|  const filled = new Set(records.map((record) => record.sectionId));
620|  const missingPriority = PRIORITY_SECTION_IDS.filter((sectionId) => !filled.has(sectionId));
621|  const progress = Math.round((filled.size / SECTIONS.length) * 100);
622|  const totalValue = parseMoneyFromRecords(records);
623|  return { filled, missingPriority, progress, totalValue };
624|}
625|
626|function filterRecords(records, query) {
627|  const term = query.trim().toLowerCase();
628|  if (!term) return records;
629|  return records.filter((record) => {
630|    const sectionName = SECTION_LOOKUP[record.sectionId]?.title || "";
631|    const fieldText = Object.values(record.fields || {}).join(" ");
632|    return `${sectionName} ${fieldText}`.toLowerCase().includes(term);
633|  });
634|}
635|
636|function DashboardMessage({ type = "info", title, children, testId }) {
637|  const icons = {
638|    info: FileSearch,
639|    success: CheckCircle2,
640|    warning: AlertTriangle,
641|  };
642|  const Icon = icons[type] || FileSearch;
643|  return (
644|    <div className={`dashboard-message ${type}`} data-testid={testId}>
645|      <Icon aria-hidden="true" />
646|      <div>
647|        <strong data-testid={`${testId}-title`}>{title}</strong>
648|        <p data-testid={`${testId}-description`}>{children}</p>
649|      </div>
650|    </div>
651|  );
652|}
653|
654|function StatCard({ label, value, helper, testId }) {
655|  return (
656|    <article className="stat-card" data-testid={testId}>
657|      <span data-testid={`${testId}-label`}>{label}</span>
658|      <strong data-testid={`${testId}-value`}>{value}</strong>
659|      <small data-testid={`${testId}-helper`}>{helper}</small>
660|    </article>
661|  );
662|}
663|
664|function SectionTabCard({ section, count, active, onOpen }) {
665|  const Icon = section.icon;
666|  const badge = getSectionBadge(section, count);
667|  return (
668|    <button
669|      className={`section-tab-card ${active ? "active" : ""}`}
670|      type="button"
671|      onClick={onOpen}
672|      data-testid={`section-tab-${section.id}`}
673|      aria-label={`Open ${section.title}`}
674|    >
675|      <span className="section-badge" data-testid={`section-tab-${section.id}-badge`}>
676|        {badge}
677|      </span>
678|      <span className="icon-shell" data-testid={`section-tab-${section.id}-icon`}>
679|        <Icon aria-hidden="true" />
680|      </span>
681|      <span className="section-title" data-testid={`section-tab-${section.id}-title`}>
682|        {section.title}
683|      </span>
684|      <span className="section-description" data-testid={`section-tab-${section.id}-description`}>
685|        {section.description}
686|      </span>
687|    </button>
688|  );
689|}
690|
691|function EntryField({ sectionId, field, index, value, error, onChange }) {
692|  const inputId = `${sectionId}-${slugify(field)}`;
693|  const longField = isLongField(field);
694|  const sharedProps = {
695|    id: inputId,
696|    value,
697|    onChange: (event) => onChange(field, event.target.value),
698|    placeholder: getFieldPlaceholder(field, index),
699|    "aria-invalid": Boolean(error),
700|    className: error ? "field-error" : "",
701|    "data-testid": `entry-input-${inputId}`,
702|  };
703|
704|  return (
705|    <label key={field} htmlFor={inputId} className={longField ? "span-2" : ""} data-testid={`entry-label-${inputId}`}>
706|      <span>{field}</span>
707|      {longField ? <textarea {...sharedProps} /> : <input {...sharedProps} inputMode={getInputMode(field)} />}
708|      {error && (
709|        <small className="validation-error" data-testid={`entry-error-${inputId}`}>
710|          {error}
711|        </small>
712|      )}
713|    </label>
714|  );
715|}
716|
717|function ValidationSummary({ sectionId, errors }) {
718|  if (!Object.keys(errors).length) return null;
719|  return (
720|    <div className="validation-summary span-2" data-testid={`validation-summary-${sectionId}`}>
721|      <AlertTriangle aria-hidden="true" />
722|      <span>Please fix the highlighted fields before saving.</span>
723|    </div>
724|  );
725|}
726|
727|function RecordCard({ record, onDelete }) {
728|  const section = SECTION_LOOKUP[record.sectionId];
729|  const Icon = section?.icon || FileText;
730|  const visibleFields = Object.entries(record.fields || {}).filter(([, value]) => value);
731|  return (
732|    <article className="record-card" data-testid={`record-card-${record.id}`}>
733|      <div className="record-card-header">
734|        <span className="record-icon" data-testid={`record-card-${record.id}-icon`}>
735|          <Icon aria-hidden="true" />
736|        </span>
737|        <div>
738|          <strong data-testid={`record-card-${record.id}-title`}>{getRecordTitle(record)}</strong>
739|          <small data-testid={`record-card-${record.id}-section`}>{section?.title || "Record"}</small>
740|        </div>
741|        <button
742|          className="ghost-danger"
743|          type="button"
744|          onClick={() => onDelete(record.id)}
745|          data-testid={`delete-record-${record.id}-button`}
746|          aria-label={`Delete ${getRecordTitle(record)}`}
747|        >
748|          <Trash2 aria-hidden="true" />
749|        </button>
750|      </div>
751|      <div className="record-fields" data-testid={`record-card-${record.id}-fields`}>
752|        {visibleFields.slice(0, 5).map(([key, value]) => (
753|          <div key={key} data-testid={`record-card-${record.id}-field-${key.replace(/\s+/g, "-").toLowerCase()}`}>
754|            <span>{key}</span>
755|            <p>{value}</p>
756|          </div>
757|        ))}
758|      </div>
759|      <small className="record-date" data-testid={`record-card-${record.id}-date`}>
760|        Saved {formatDate(record.createdAt)}
761|      </small>
762|    </article>
763|  );
764|}
765|
766|function SectionRecordList({ section, items, onDelete }) {
767|  return (
768|    <div className="section-records" data-testid={`section-records-${section.id}`}>
769|      <div className="subheading-row">
770|        <h3 data-testid={`section-records-${section.id}-title`}>Saved records</h3>
771|        <span data-testid={`section-records-${section.id}-count`}>{items.length}</span>
772|      </div>
773|      {items.length ? (
774|        <div className="record-grid">
775|          {items.map((record) => (
776|            <RecordCard key={record.id} record={record} onDelete={onDelete} />
777|          ))}
778|        </div>
779|      ) : (
780|        <p className="empty-state" data-testid={`empty-records-${section.id}`}>
781|          No records yet. Add one above to make this section useful for your family.
782|        </p>
783|      )}
784|    </div>
785|  );
786|}
787|
788|function useSectionDraft(section) {
789|  const emptyDraft = () => Object.fromEntries(section.fields.map((field) => [field, ""]));
790|  const [draft, setDraft] = useState(emptyDraft);
791|  const [validationErrors, setValidationErrors] = useState({});
792|
793|  const updateField = (field, value) => {
794|    setDraft((current) => ({ ...current, [field]: value }));
795|    setValidationErrors((current) => {
796|      const nextErrors = { ...current };
797|      delete nextErrors[field];
798|      return nextErrors;
799|    });
800|  };
801|
802|  const resetDraft = () => {
803|    setDraft(emptyDraft());
804|    setValidationErrors({});
805|  };
806|
807|  return { draft, validationErrors, setValidationErrors, updateField, resetDraft };
808|}
809|
810|function SectionWorkspace({ section, records, onSave, onDelete }) {
811|  const { draft, validationErrors, setValidationErrors, updateField, resetDraft } = useSectionDraft(section);
812|  const items = sectionRecords(records, section.id);
813|  const Icon = section.icon;
814|
815|  const submit = (event) => {
816|    event.preventDefault();
817|    const nextErrors = validateSectionDraft(section, draft);
818|    setValidationErrors(nextErrors);
819|    if (Object.keys(nextErrors).length) return;
820|    onSave(section.id, draft);
821|    resetDraft();
822|  };
823|
824|  return (
825|    <section className="workspace" data-testid={`workspace-${section.id}`}>
826|      <div className="workspace-heading">
827|        <span className="workspace-icon" data-testid={`workspace-${section.id}-icon`}>
828|          <Icon aria-hidden="true" />
829|        </span>
830|        <div>
831|          <p data-testid={`workspace-${section.id}-eyebrow`}>Section workspace</p>
832|          <h2 data-testid={`workspace-${section.id}-title`}>{section.title}</h2>
833|          <span data-testid={`workspace-${section.id}-description`}>{section.description}</span>
834|        </div>
835|      </div>
836|
837|      <DashboardMessage type="info" title="Helpful prompt" testId={`workspace-${section.id}-message`}>
838|        Add the details your family would need without searching through papers. Keep notes short, specific and action-oriented.
839|      </DashboardMessage>
840|
841|      <form className="entry-form" onSubmit={submit} data-testid={`entry-form-${section.id}`}>
842|        {section.fields.map((field, index) => (
843|          <EntryField
844|            key={field}
845|            sectionId={section.id}
846|            field={field}
847|            index={index}
848|            value={draft[field]}
849|            error={validationErrors[field]}
850|            onChange={updateField}
851|          />
852|        ))}
853|        <ValidationSummary sectionId={section.id} errors={validationErrors} />
854|        <button className="primary-action span-2" type="submit" data-testid={`save-record-${section.id}-button`}>
855|          <Plus aria-hidden="true" /> Save record
856|        </button>
857|      </form>
858|
859|      <SectionRecordList section={section} items={items} onDelete={onDelete} />
860|    </section>
861|  );
862|}
863|
864|function TopBar({ activeView, onNavigate }) {
865|  return (
866|    <header className="topbar" data-testid="topbar">
867|      <button className="brand-mark" type="button" onClick={() => onNavigate("dashboard")} data-testid="brand-home-button">
868|        <ShieldCheck aria-hidden="true" />
869|        <span>
870|          <strong data-testid="app-title">Family Financial Recovery Vault</strong>
871|          <small data-testid="app-subtitle">Private family readiness workspace</small>
872|        </span>
873|      </button>
874|      <nav className="primary-nav" aria-label="Primary navigation" data-testid="primary-navigation">
875|        {PRIMARY_NAV.map((item) => {
876|          const Icon = item.icon;
877|          return (
878|            <button
879|              key={item.id}
880|              type="button"
881|              className={activeView === item.id ? "nav-pill active" : "nav-pill"}
882|              onClick={() => onNavigate(item.id)}
883|              data-testid={`nav-${item.id}-button`}
884|            >
885|              <Icon aria-hidden="true" /> {item.label}
886|            </button>
887|          );
888|        })}
889|      </nav>
890|    </header>
891|  );
892|}
893|
894|function HeroPanel({ stats }) {
895|  const statusText = stats.missingPriority.length ? `${stats.missingPriority.length} priority sections pending` : "Priority sections complete";
896|  return (
897|    <section className="hero-panel" data-testid="hero-panel">
898|      <div>
899|        <p className="eyebrow" data-testid="hero-eyebrow">Zero-server family planning tool</p>
900|        <h1 data-testid="hero-title">Make the hard day easier for the people you love.</h1>
901|        <p data-testid="hero-description">
902|          Organise emergency contacts, assets, documents, policies and instructions in a clearer dashboard with even action tabs and practical status messages.
903|        </p>
904|      </div>
905|      <div className="hero-status-card" data-testid="hero-status-card">
906|        <span data-testid="hero-status-label">Vault readiness</span>
907|        <strong data-testid="hero-status-progress">{stats.progress}%</strong>
908|        <div className="progress-track" data-testid="hero-progress-track">
909|          <div style={{ width: `${stats.progress}%` }} data-testid="hero-progress-bar" />
910|        </div>
911|        <small data-testid="hero-status-helper">{statusText}</small>
912|      </div>
913|    </section>
914|  );
915|}
916|
917|function StatsGrid({ records, stats }) {
918|  return (
919|    <section className="stat-grid" data-testid="dashboard-stat-grid">
920|      <StatCard label="Records" value={records.length} helper="Saved for this browser session" testId="stat-records" />
921|      <StatCard label="Sections filled" value={`${stats.filled.size}/${SECTIONS.length}`} helper="Across your full vault" testId="stat-sections-filled" />
922|      <StatCard label="Priority pending" value={stats.missingPriority.length} helper="Recommended first steps" testId="stat-priority-pending" />
923|      <StatCard label="Tracked value" value={formatINR(stats.totalValue)} helper="From amount fields entered" testId="stat-tracked-value" />
924|    </section>
925|  );
926|}
927|
928|function DashboardMessages({ stats }) {
929|  return (
930|    <section className="message-stack" data-testid="dashboard-message-stack">
931|      {stats.missingPriority.length ? (
932|        <DashboardMessage type="warning" title="Start with the priority sections" testId="priority-warning-message">
933|          Message to My Family, Personal Information, Emergency Access, Trusted Helpers, Financial Assets, Insurance and Will & Estate are the most useful first.
934|        </DashboardMessage>
935|      ) : (
936|        <DashboardMessage type="success" title="Your critical foundation is ready" testId="priority-success-message">
937|          The main emergency sections are filled. Keep going with documents, liabilities and digital accounts.
938|        </DashboardMessage>
939|      )}
940|      <DashboardMessage type="info" title="Private by design" testId="privacy-info-message">
941|        Nothing is sent to the server. Download your vault regularly and store the backup somewhere safe.
942|      </DashboardMessage>
943|    </section>
944|  );
945|}
946|
947|function DashboardView({ records, activeSectionId, onOpenSection }) {
948|  return (
949|    <section className="dashboard-body" data-testid="dashboard-body">
950|      <div className="section-intro">
951|        <div>
952|          <p className="eyebrow" data-testid="section-grid-eyebrow">Improved front screen tabs</p>
953|          <h2 data-testid="section-grid-title">Choose what to organise next</h2>
954|        </div>
955|        <p data-testid="section-grid-description">
956|          Each tab is now even, icon-led, descriptive, and shows a clear status badge so users know where to continue.
957|        </p>
958|      </div>
959|
960|      {SECTION_GROUPS.map((group) => {
961|        const groupSlug = slugify(group.name);
962|        return (
963|          <div className="section-group" key={group.name} data-testid={`section-group-${groupSlug}`}>
964|            <div className="group-heading">
965|              <h3 data-testid={`section-group-${groupSlug}-title`}>{group.name}</h3>
966|              <p data-testid={`section-group-${groupSlug}-note`}>{group.note}</p>
967|            </div>
968|            <div className="section-grid" data-testid={`section-grid-${groupSlug}`}>
969|              {group.sections.map((sectionId) => {
970|                const section = SECTION_LOOKUP[sectionId];
971|                return (
972|                  <SectionTabCard
973|                    key={section.id}
974|                    section={section}
975|                    count={sectionRecords(records, section.id).length}
976|                    active={activeSectionId === section.id}
977|                    onOpen={() => onOpenSection(section.id)}
978|                  />
979|                );
980|              })}
981|            </div>
982|          </div>
983|        );
984|      })}
985|    </section>
986|  );
987|}
988|
989|function AllRecordsView({ records, onDelete }) {
990|  return (
991|    <section className="workspace" data-testid="all-records-workspace">
992|      <div className="subheading-row">
993|        <div>
994|          <p className="eyebrow" data-testid="all-records-eyebrow">Complete vault view</p>
995|          <h2 data-testid="all-records-title">All saved records</h2>
996|        </div>
997|        <span data-testid="all-records-count">{records.length}</span>
998|      </div>
999|      {records.length ? (
1000|        <div className="record-grid">
1001|          {records.map((record) => (
1002|            <RecordCard key={record.id} record={record} onDelete={onDelete} />
1003|          ))}
1004|        </div>
1005|      ) : (
1006|        <p className="empty-state" data-testid="all-records-empty-state">No records yet. Start from the dashboard tabs.</p>
1007|      )}
1008|    </section>
1009|  );
1010|}
1011|
1012|function SearchView({ query, onQueryChange, filteredRecords, onDelete }) {
1013|  return (
1014|    <section className="workspace" data-testid="search-workspace">
1015|      <div className="workspace-heading">
1016|        <span className="workspace-icon" data-testid="search-workspace-icon"><Search aria-hidden="true" /></span>
1017|        <div>
1018|          <p data-testid="search-eyebrow">Global search</p>
1019|          <h2 data-testid="search-title">Find anything quickly</h2>
1020|          <span data-testid="search-description">Search names, phone numbers, institutions, notes and section names.</span>
1021|        </div>
1022|      </div>
1023|      <label className="search-box" htmlFor="vault-search" data-testid="search-input-label">
1024|        <Search aria-hidden="true" />
1025|        <input
1026|          id="vault-search"
1027|          value={query}
1028|          onChange={(event) => onQueryChange(event.target.value)}
1029|          placeholder="Search across all records..."
1030|          data-testid="search-input"
1031|        />
1032|      </label>
1033|      <div className="subheading-row">
1034|        <h3 data-testid="search-results-title">Results</h3>
1035|        <span data-testid="search-results-count">{filteredRecords.length}</span>
1036|      </div>
1037|      {filteredRecords.length ? (
1038|        <div className="record-grid">
1039|          {filteredRecords.map((record) => (
1040|            <RecordCard key={record.id} record={record} onDelete={onDelete} />
1041|          ))}
1042|        </div>
1043|      ) : (
1044|        <p className="empty-state" data-testid="search-empty-state">No matching records found.</p>
1045|      )}
1046|    </section>
1047|  );
1048|}
1049|
1050|function ImportBackupCard({ importDraft, importError, onFileChange, onApplyImport, onCancelImport }) {
1051|  return (
1052|    <article className="export-card" data-testid="import-backup-card">
1053|      <div className="export-card-heading">
1054|        <FileInput aria-hidden="true" />
1055|        <div>
1056|          <h3 data-testid="import-backup-title">Import from backup</h3>
1057|          <p data-testid="import-backup-description">Choose a JSON backup, then decide whether to replace or merge records.</p>
1058|        </div>
1059|      </div>
1060|      <label className="file-import-button" htmlFor="backup-import-input" data-testid="backup-import-label">
1061|        Select JSON backup
1062|        <input
1063|          id="backup-import-input"
1064|          type="file"
1065|          accept="application/json,.json"
1066|          onChange={onFileChange}
1067|          data-testid="backup-import-input"
1068|        />
1069|      </label>
1070|      {importError && (
1071|        <div className="validation-summary" data-testid="backup-import-error">
1072|          <AlertTriangle aria-hidden="true" /> <span>{importError}</span>
1073|        </div>
1074|      )}
1075|      {importDraft && (
1076|        <div className="import-preview" data-testid="backup-import-preview">
1077|          <strong data-testid="backup-import-preview-title">Ready to import {importDraft.records.length} record(s)</strong>
1078|          <p data-testid="backup-import-preview-description">File: {importDraft.fileName}</p>
1079|          <div className="download-actions compact" data-testid="backup-import-actions">
1080|            <button className="primary-action" type="button" onClick={() => onApplyImport("replace")} data-testid="backup-import-replace-button">
1081|              Replace current records
1082|            </button>
1083|            <button className="secondary-action" type="button" onClick={() => onApplyImport("merge")} data-testid="backup-import-merge-button">
1084|              Merge with current records
1085|            </button>
1086|            <button className="danger-action" type="button" onClick={onCancelImport} data-testid="backup-import-cancel-button">
1087|              Cancel
1088|            </button>
1089|          </div>
1090|        </div>
1091|      )}
1092|    </article>
1093|  );
1094|}
1095|
1096|function PdfExportCard({ onExportPdf }) {
1097|  return (
1098|    <article className="export-card" data-testid="pdf-export-card">
1099|      <div className="export-card-heading">
1100|        <FileText aria-hidden="true" />
1101|        <div>
1102|          <h3 data-testid="pdf-export-title">PDF exports</h3>
1103|          <p data-testid="pdf-export-description">Download either the full vault or a shorter emergency priority summary.</p>
1104|        </div>
1105|      </div>
1106|      <div className="download-actions compact" data-testid="pdf-export-actions">
1107|        <button className="primary-action" type="button" onClick={() => onExportPdf("full")} data-testid="download-full-pdf-button">
1108|          <FileText aria-hidden="true" /> Full PDF
1109|        </button>
1110|        <button className="secondary-action" type="button" onClick={() => onExportPdf("priority")} data-testid="download-priority-pdf-button">
1111|          <FileHeart aria-hidden="true" /> Priority summary PDF
1112|        </button>
1113|      </div>
1114|    </article>
1115|  );
1116|}
1117|
1118|function ExcelExportCard({ onExportSingleSheet, onExportBySection }) {
1119|  return (
1120|    <article className="export-card" data-testid="excel-export-card">
1121|      <div className="export-card-heading">
1122|        <FileSpreadsheet aria-hidden="true" />
1123|        <div>
1124|          <h3 data-testid="excel-export-title">Excel exports</h3>
1125|          <p data-testid="excel-export-description">Use one sheet for quick review or section-wise sheets for cleaner family handover.</p>
1126|        </div>
1127|      </div>
1128|      <div className="download-actions compact" data-testid="excel-export-actions">
1129|        <button className="primary-action" type="button" onClick={onExportSingleSheet} data-testid="download-excel-single-button">
1130|          <FileSpreadsheet aria-hidden="true" /> One-sheet Excel
1131|        </button>
1132|        <button className="secondary-action" type="button" onClick={onExportBySection} data-testid="download-excel-section-button">
1133|          <FileSpreadsheet aria-hidden="true" /> Section-wise Excel
1134|        </button>
1135|      </div>
1136|    </article>
1137|  );
1138|}
1139|
1140|function JsonToolsCard({ onDownloadJson, onClearVault }) {
1141|  return (
1142|    <article className="export-card" data-testid="json-tools-card">
1143|      <div className="export-card-heading">
1144|        <FileJson aria-hidden="true" />
1145|        <div>
1146|          <h3 data-testid="json-tools-title">JSON and browser tools</h3>
1147|          <p data-testid="json-tools-description">JSON is best for re-importing later. Print is useful for a quick physical summary.</p>
1148|        </div>
1149|      </div>
1150|      <div className="download-actions compact" data-testid="download-actions">
1151|        <button className="primary-action" type="button" onClick={onDownloadJson} data-testid="download-json-button">
1152|          <Download aria-hidden="true" /> Download JSON backup
1153|        </button>
1154|        <button className="secondary-action" type="button" onClick={() => window.print()} data-testid="print-summary-button">
1155|          <FileText aria-hidden="true" /> Print summary
1156|        </button>
1157|        <button className="danger-action" type="button" onClick={onClearVault} data-testid="clear-vault-button">
1158|          <Trash2 aria-hidden="true" /> Clear browser session
1159|        </button>
1160|      </div>
1161|    </article>
1162|  );
1163|}
1164|
1165|function DownloadView({ importDraft, importError, actions }) {
1166|  return (
1167|    <section className="workspace download-workspace" data-testid="download-workspace">
1168|      <div className="workspace-heading">
1169|        <span className="workspace-icon" data-testid="download-workspace-icon"><Download aria-hidden="true" /></span>
1170|        <div>
1171|          <p data-testid="download-eyebrow">Backup centre</p>
1172|          <h2 data-testid="download-title">Download and protect your vault</h2>
1173|          <span data-testid="download-description">Import a JSON backup, export full PDF/priority PDF, or download Excel in one-sheet and section-wise formats.</span>
1174|        </div>
1175|      </div>
1176|
1177|      <div className="backup-layout" data-testid="backup-layout">
1178|        <ImportBackupCard
1179|          importDraft={importDraft}
1180|          importError={importError}
1181|          onFileChange={actions.handleImportFile}
1182|          onApplyImport={actions.applyImport}
1183|          onCancelImport={actions.cancelImport}
1184|        />
1185|        <PdfExportCard onExportPdf={actions.exportPdf} />
1186|        <ExcelExportCard onExportSingleSheet={actions.exportExcelSingleSheet} onExportBySection={actions.exportExcelBySection} />
1187|        <JsonToolsCard onDownloadJson={actions.downloadVault} onClearVault={actions.clearVault} />
1188|      </div>
1189|      <DashboardMessage type="warning" title="Important reminder" testId="download-warning-message">
1190|        Download before sharing this device or closing the browser tab. This app does not store your records on a server or in persistent browser storage.
1191|      </DashboardMessage>
1192|    </section>
1193|  );
1194|}
1195|
1196|function App() {
1197|  const [records, setRecords] = useState(loadRecords);
1198|  const [activeView, setActiveView] = useState("dashboard");
1199|  const [activeSectionId, setActiveSectionId] = useState("message-family");
1200|  const [query, setQuery] = useState("");
1201|  const [importDraft, setImportDraft] = useState(null);
1202|  const [importError, setImportError] = useState("");
1203|
1204|  const stats = calculateStats(records);
1205|  const activeSection = SECTION_LOOKUP[activeSectionId];
1206|  const filteredRecords = filterRecords(records, query);
1207|
1208|  const commitRecords = (nextRecords) => {
1209|    setRecords(nextRecords);
1210|    saveRecords(nextRecords);
1211|  };
1212|
1213|  const openSection = (sectionId) => {
1214|    setActiveSectionId(sectionId);
1215|    setActiveView("section");
1216|  };
1217|
1218|  const addRecord = (sectionId, fields) => {
1219|    const cleanFields = Object.fromEntries(Object.entries(fields).map(([key, value]) => [key, String(value || "").trim()]));
1220|    commitRecords([{ id: crypto.randomUUID(), sectionId, fields: cleanFields, createdAt: new Date().toISOString() }, ...records]);
1221|  };
1222|
1223|  const deleteRecord = (recordId) => commitRecords(records.filter((record) => record.id !== recordId));
1224|
1225|  const downloadVault = () => {
1226|    const payload = JSON.stringify({ exportedAt: new Date().toISOString(), records }, null, 2);
1227|    downloadBlob(`Family_Financial_Recovery_Vault_${new Date().toISOString().slice(0, 10)}.json`, new Blob([payload], { type: "application/json" }));
1228|  };
1229|
1230|  const exportPdf = (mode) => {
1231|    const doc = buildPdf(records, mode);
1232|    const suffix = mode === "priority" ? "Priority_Summary" : "Full_Export";
1233|    doc.save(`Family_Vault_${suffix}_${new Date().toISOString().slice(0, 10)}.pdf`);
1234|  };
1235|
1236|  const exportExcelSingleSheet = () => {
1237|    const workbook = XLSX.utils.book_new();
1238|    const rows = flattenRecords(records);
1239|    XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(rows.length ? rows : [{ Note: "No records available" }]), "All Records");
1240|    XLSX.writeFile(workbook, `Family_Vault_All_Records_${new Date().toISOString().slice(0, 10)}.xlsx`);
1241|  };
1242|
1243|  const exportExcelBySection = () => {
1244|    const workbook = XLSX.utils.book_new();
1245|    const usedNames = new Set();
1246|    SECTIONS.forEach((section) => {
1247|      const items = sectionRecords(records, section.id);
1248|      if (!items.length) return;
1249|      const rows = items.map((record) => ({ "Record title": getRecordTitle(record), "Saved on": formatDate(record.createdAt), ...record.fields }));
1250|      XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(rows), safeSheetName(section.title, usedNames));
1251|    });
1252|    if (!workbook.SheetNames.length) XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet([{ Note: "No records available" }]), "Summary");
1253|    XLSX.writeFile(workbook, `Family_Vault_By_Section_${new Date().toISOString().slice(0, 10)}.xlsx`);
1254|  };
1255|
1256|  const handleImportFile = async (event) => {
1257|    const file = event.target.files?.[0];
1258|    setImportDraft(null);
1259|    setImportError("");
1260|    if (!file) return;
1261|    try {
1262|      const importedRecords = parseBackupPayload(JSON.parse(await file.text()));
1263|      if (!importedRecords.length) {
1264|        setImportError("No valid vault records were found in this backup file.");
1265|        return;
1266|      }
1267|      setImportDraft({ fileName: file.name, records: importedRecords });
1268|    } catch {
1269|      setImportError("This backup could not be read. Please select a valid JSON vault backup.");
1270|    } finally {
1271|      event.target.value = "";
1272|    }
1273|  };
1274|
1275|  const applyImport = (mode) => {
1276|    if (!importDraft?.records?.length) return;
1277|    const importedRecords = mode === "replace" ? importDraft.records : importDraft.records.map((record) => ({ ...record, id: crypto.randomUUID() }));
1278|    commitRecords(mode === "replace" ? importedRecords : [...importedRecords, ...records]);
1279|    setImportDraft(null);
1280|    setImportError("");
1281|  };
1282|
1283|  const clearVault = () => {
1284|    const confirmed = window.confirm("This clears records saved in this browser session. Continue?");
1285|    if (confirmed) commitRecords([]);
1286|  };
1287|
1288|  const downloadActions = {
1289|    handleImportFile,
1290|    applyImport,
1291|    cancelImport: () => setImportDraft(null),
1292|    exportPdf,
1293|    exportExcelSingleSheet,
1294|    exportExcelBySection,
1295|    downloadVault,
1296|    clearVault,
1297|  };
1298|
1299|  return (
1300|    <main className="vault-app" data-testid="family-vault-app">
1301|      <TopBar activeView={activeView} onNavigate={setActiveView} />
1302|      <HeroPanel stats={stats} />
1303|      <StatsGrid records={records} stats={stats} />
1304|      <DashboardMessages stats={stats} />
1305|      {activeView === "dashboard" && <DashboardView records={records} activeSectionId={activeSectionId} onOpenSection={openSection} />}
1306|      {activeView === "section" && activeSection && <SectionWorkspace section={activeSection} records={records} onSave={addRecord} onDelete={deleteRecord} />}
1307|      {activeView === "records" && <AllRecordsView records={records} onDelete={deleteRecord} />}
1308|      {activeView === "search" && <SearchView query={query} onQueryChange={setQuery} filteredRecords={filteredRecords} onDelete={deleteRecord} />}
1309|      {activeView === "download" && <DownloadView importDraft={importDraft} importError={importError} actions={downloadActions} />}
1310|      <footer className="vault-footer" data-testid="vault-footer">
1311|        <span data-testid="footer-privacy-copy">Private session vault · no login · no server storage</span>
1312|        <button type="button" onClick={() => setActiveView("dashboard")} data-testid="footer-dashboard-button">
1313|          Back to dashboard <ChevronRight aria-hidden="true" />
1314|        </button>
1315|      </footer>
1316|    </main>
1317|  );
1318|}
1319|
1320|export default App;
1321|
[End of file]