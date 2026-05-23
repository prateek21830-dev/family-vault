import { useState } from "react";
import "./App.css";
import { jsPDF } from "jspdf";
import * as XLSX from "xlsx";
import {
  AlertTriangle,
  Archive,
  BadgeIndianRupee,
  Banknote,
  BriefcaseBusiness,
  Building2,
  CalendarClock,
  Car,
  CheckCircle2,
  ChevronRight,
  ClipboardList,
  CreditCard,
  Database,
  Download,
  FileInput,
  FileJson,
  FileSpreadsheet,
  FileArchive,
  FileHeart,
  FileSearch,
  FileText,
  FolderLock,
  GraduationCap,
  HeartPulse,
  Home,
  Landmark,
  LayoutDashboard,
  LockKeyhole,
  Mail,
  PawPrint,
  PenLine,
  PiggyBank,
  Plane,
  Plus,
  ReceiptText,
  Search,
  ShieldCheck,
  Sparkles,
  Trash2,
  UserRound,
  UsersRound,
  WalletCards,
} from "lucide-react";

const STORAGE_KEY = "family-financial-recovery-vault-records-v1";

const SECTION_GROUPS = [
  {
    name: "Essential first",
    note: "Fill these before anything else so family can act quickly.",
    sections: [
      "message-family",
      "personal-info",
      "emergency-access",
      "trusted-helpers",
    ],
  },
  {
    name: "Family, income & care",
    note: "People, income, medical care and education details.",
    sections: [
      "family-members",
      "income",
      "employment-benefits",
      "children-education",
      "medical-info",
    ],
  },
  {
    name: "Money, assets & obligations",
    note: "What exists, what is owed, and what needs renewing.",
    sections: [
      "financial-assets",
      "insurance",
      "properties",
      "vehicles",
      "bank-locker",
      "liabilities",
      "money-given-taken",
    ],
  },
  {
    name: "Business, legal & documents",
    note: "Legal authority, business continuity and statutory records.",
    sections: [
      "business-details",
      "business-operations",
      "statutory-tax",
      "power-attorney",
      "will-estate",
      "post-death-plan",
      "important-documents",
    ],
  },
  {
    name: "Digital life & daily operations",
    note: "Accounts, subscriptions, utilities and practical instructions.",
    sections: [
      "digital-assets",
      "cards-wallets",
      "household-expenses",
      "subscriptions",
      "travel-plans",
      "pet-care",
      "family-values",
    ],
  },
];

const SECTIONS = [
  {
    id: "message-family",
    title: "Message to My Family",
    description: "A clear personal note with first calls, wishes and calm guidance.",
    icon: Mail,
    priority: true,
    fields: ["Message", "CA contact", "Lawyer contact", "Trusted person", "Doctor contact"],
  },
  {
    id: "personal-info",
    title: "Personal Information",
    description: "Identity, PAN/Aadhaar, advisors and key reference details.",
    icon: UserRound,
    priority: true,
    fields: ["Full name", "Date of birth", "PAN", "Aadhaar", "Blood group", "Notes"],
  },
  {
    id: "emergency-access",
    title: "Emergency Access & Vault Discovery",
    description: "Where the vault is kept and how family can discover it safely.",
    icon: LockKeyhole,
    priority: true,
    fields: ["Vault location", "Access method", "Backup contact", "Discovery instructions"],
  },
  {
    id: "trusted-helpers",
    title: "Trusted Helpers",
    description: "People your family can call first during a crisis.",
    icon: UsersRound,
    priority: true,
    fields: ["Helper name", "Relationship", "Phone", "How they can help", "Notes"],
  },
  {
    id: "family-members",
    title: "Family Members",
    description: "Important family details and responsibilities.",
    icon: UsersRound,
    fields: ["Name", "Relationship", "Phone", "Important notes"],
  },
  {
    id: "income",
    title: "Source of Income",
    description: "Salary, rent, pension, dividends and other inflows.",
    icon: Banknote,
    fields: ["Income source", "Monthly amount", "Contact", "Continuation notes"],
  },
  {
    id: "financial-assets",
    title: "Financial Assets",
    description: "Bank accounts, deposits, mutual funds, stocks and valuables.",
    icon: PiggyBank,
    priority: true,
    fields: ["Asset name", "Institution", "Amount", "Nominee", "Document location"],
  },
  {
    id: "insurance",
    title: "Insurance",
    description: "Policies, sum assured, nominee and renewal reminders.",
    icon: ShieldCheck,
    priority: true,
    fields: ["Policy type", "Insurance company", "Policy number", "Sum assured", "Renewal date", "Nominee"],
  },
  {
    id: "properties",
    title: "Properties",
    description: "Property ownership, papers, loans and care instructions.",
    icon: Home,
    fields: ["Property name", "Address", "Market value", "Ownership", "Document location"],
  },
  {
    id: "vehicles",
    title: "Vehicles",
    description: "Registration, insurance, loans and service contacts.",
    icon: Car,
    fields: ["Vehicle name", "Registration number", "Insurance renewal date", "Loan details", "Service contact"],
  },
  {
    id: "household-expenses",
    title: "Household Expenses & Utilities",
    description: "Recurring bills, mandates, providers and payment methods.",
    icon: ReceiptText,
    fields: ["Expense name", "Provider", "Monthly amount", "Payment method", "Due date"],
  },
  {
    id: "children-education",
    title: "Children Education Plan",
    description: "Fees, schools, future funding and contacts.",
    icon: GraduationCap,
    fields: ["Child name", "School/college", "Annual fees", "Funding source", "Contact"],
  },
  {
    id: "business-details",
    title: "Business Details",
    description: "Business identity, ownership, loans and key people.",
    icon: Building2,
    fields: ["Business name", "Legal structure", "Registration number", "Partner/director details", "Notes"],
  },
  {
    id: "business-operations",
    title: "Business Operations",
    description: "Vendors, customers, systems, staff and continuity steps.",
    icon: BriefcaseBusiness,
    fields: ["Operation area", "Key contact", "System/tool", "What family should do", "Notes"],
  },
  {
    id: "statutory-tax",
    title: "Statutory & Tax Details",
    description: "GST, ITR, due dates, consultants and records.",
    icon: ClipboardList,
    fields: ["Registration/return type", "Consultant", "Next due date", "Record location", "Notes"],
  },
  {
    id: "employment-benefits",
    title: "Employment & Benefits",
    description: "Employer, HR, PF, gratuity and settlement instructions.",
    icon: Landmark,
    fields: ["Employer name", "Employee ID", "HR contact", "Benefits", "Settlement notes"],
  },
  {
    id: "liabilities",
    title: "Liabilities",
    description: "Loans, EMIs, lender contacts and closure instructions.",
    icon: BadgeIndianRupee,
    fields: ["Loan type", "Lender", "Outstanding amount", "Monthly EMI", "Closure notes"],
  },
  {
    id: "money-given-taken",
    title: "Money Given / Taken",
    description: "Recoverable, payable, witnesses, proof and follow-up notes.",
    icon: WalletCards,
    fields: ["Party name", "Transaction type", "Amount", "Proof location", "Recovery/payment notes"],
  },
  {
    id: "digital-assets",
    title: "Digital Accounts & Assets",
    description: "Password manager references, domains, websites and recovery notes.",
    icon: Database,
    fields: ["Platform/account", "Email/user ID", "Password manager location", "Recovery instructions", "Value/notes"],
  },
  {
    id: "cards-wallets",
    title: "Cards, Wallets & Mandates",
    description: "Credit cards, wallets, auto-debits and closure steps.",
    icon: CreditCard,
    fields: ["Instrument", "Provider", "Linked account", "Mandate details", "Closure instructions"],
  },
  {
    id: "medical-info",
    title: "Medical Information",
    description: "Doctors, medicines, allergies and emergency care notes.",
    icon: HeartPulse,
    fields: ["Condition", "Doctor", "Medication", "Emergency instruction", "Reports location"],
  },
  {
    id: "important-documents",
    title: "Important Documents",
    description: "Birth, marriage, tax, business, property and medical documents.",
    icon: FileArchive,
    fields: ["Document name", "Location", "Who can access", "Use/purpose", "Notes"],
  },
  {
    id: "power-attorney",
    title: "Power of Attorney",
    description: "POA status, authority, holder and document location.",
    icon: PenLine,
    fields: ["POA type", "Holder", "Authority", "Document location", "Lawyer contact"],
  },
  {
    id: "will-estate",
    title: "Will & Estate",
    description: "Will type, location, executor and estate instructions.",
    icon: FileHeart,
    priority: true,
    fields: ["Will type", "Will location", "Executor", "Lawyer", "Estate notes"],
  },
  {
    id: "post-death-plan",
    title: "Post-Death Action Plan",
    description: "The first 48 hours, who to inform and what to avoid.",
    icon: AlertTriangle,
    fields: ["Action", "Timing", "Responsible person", "Documents needed", "Notes"],
  },
  {
    id: "travel-plans",
    title: "Travel Plans",
    description: "Bookings, cancellations, refunds and emergency contacts.",
    icon: Plane,
    fields: ["Trip name", "Travel date", "Booking location", "Cancellation notes", "Emergency contact"],
  },
  {
    id: "subscriptions",
    title: "Subscriptions",
    description: "Services, renewal dates, payment sources and closure steps.",
    icon: CalendarClock,
    fields: ["Service", "Renewal date", "Amount", "Payment method", "Closure notes"],
  },
  {
    id: "bank-locker",
    title: "Bank Locker",
    description: "Locker branch, holder, inventory and access instructions.",
    icon: FolderLock,
    fields: ["Bank/branch", "Locker number", "Holder", "Inventory", "Access instructions"],
  },
  {
    id: "pet-care",
    title: "Pet Care",
    description: "Vet, routine, food and trusted caretaker instructions.",
    icon: PawPrint,
    fields: ["Pet name", "Vet contact", "Food/routine", "Caretaker", "Medical notes"],
  },
  {
    id: "family-values",
    title: "Family Values",
    description: "Non-financial wishes, traditions and emotional guidance.",
    icon: Sparkles,
    fields: ["Value/topic", "Message", "Tradition", "Important instruction"],
  },
];

const SECTION_LOOKUP = Object.fromEntries(SECTIONS.map((section) => [section.id, section]));
const PRIORITY_SECTION_IDS = SECTIONS.filter((section) => section.priority).map((section) => section.id);
const PRIMARY_NAV = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "records", label: "All Records", icon: Archive },
  { id: "search", label: "Search", icon: Search },
  { id: "download", label: "Download Vault", icon: Download },
];

const moneyFields = [
  "amount",
  "sum assured",
  "market value",
  "monthly amount",
  "outstanding amount",
  "monthly emi",
  "annual fees",
];

const dateFields = ["date", "renewal", "due"];

function slugify(value) {
  return String(value).replace(/\s+/g, "-").replace(/[^a-zA-Z0-9-]/g, "").toLowerCase();
}

function isMoneyField(field) {
  return moneyFields.some((moneyField) => field.toLowerCase().includes(moneyField));
}

function isDateField(field) {
  return dateFields.some((dateField) => field.toLowerCase().includes(dateField));
}

function isPhoneField(field) {
  return /(^|\s)(phone|mobile)(\s|$)/i.test(field);
}

function isContactField(field) {
  return /contact/i.test(field);
}

function isBlank(value) {
  return !String(value || "").trim();
}

function loadRecords() {
  try {
    return JSON.parse(window.sessionStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

function saveRecords(nextRecords) {
  window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(nextRecords));
}

function downloadBlob(filename, blob) {
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
  URL.revokeObjectURL(link.href);
}

function sanitizeRecord(record) {
  if (!record || !SECTION_LOOKUP[record.sectionId] || typeof record.fields !== "object") return null;
  const section = SECTION_LOOKUP[record.sectionId];
  const cleanFields = {};
  section.fields.forEach((field) => {
    cleanFields[field] = String(record.fields[field] || "").trim();
  });
  const hasContent = Object.values(cleanFields).some((value) => value);
  if (!hasContent) return null;
  return {
    id: record.id || crypto.randomUUID(),
    sectionId: record.sectionId,
    fields: cleanFields,
    createdAt: record.createdAt || new Date().toISOString(),
  };
}

function parseBackupPayload(payload) {
  const rawRecords = Array.isArray(payload) ? payload : payload?.records;
  if (!Array.isArray(rawRecords)) return [];
  return rawRecords.map(sanitizeRecord).filter(Boolean);
}

function flattenRecords(records) {
  return records.map((record) => {
    const section = SECTION_LOOKUP[record.sectionId];
    return {
      Section: section?.title || record.sectionId,
      "Record title": getRecordTitle(record),
      "Saved on": formatDate(record.createdAt),
      ...record.fields,
    };
  });
}

function safeSheetName(name, usedNames) {
  const base = name.replace(/[\\/?*\[\]:]/g, " ").slice(0, 28).trim() || "Sheet";
  let candidate = base;
  let counter = 1;
  while (usedNames.has(candidate)) {
    candidate = `${base.slice(0, 25)} ${counter}`;
    counter += 1;
  }
  usedNames.add(candidate);
  return candidate;
}

function addPdfLine(doc, text, y, options = {}) {
  const { size = 10, style = "normal", color = [55, 55, 55], margin = 16, indent = 0 } = options;
  doc.setFont("helvetica", style);
  doc.setFontSize(size);
  doc.setTextColor(...color);
  const lines = doc.splitTextToSize(String(text || ""), 180 - indent);
  lines.forEach((line) => {
    if (y > 282) {
      doc.addPage();
      y = 18;
    }
    doc.text(line, margin + indent, y);
    y += size > 14 ? 8 : 6;
  });
  return y;
}

function buildPdf(records, mode = "full") {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const exportRecords = mode === "priority" ? records.filter((record) => SECTION_LOOKUP[record.sectionId]?.priority) : records;
  let y = 18;
  y = addPdfLine(doc, mode === "priority" ? "Family Vault — Priority Summary" : "Family Financial Recovery Vault — Full Export", y, {
    size: 18,
    style: "bold",
    color: [17, 17, 17],
  });
  y = addPdfLine(doc, `Exported: ${formatDate(new Date().toISOString())} · Records: ${exportRecords.length}`, y + 2, {
    size: 9,
    color: [85, 85, 85],
  });
  y += 6;

  if (!exportRecords.length) {
    addPdfLine(doc, "No records available for this export.", y, { size: 11 });
    return doc;
  }

  SECTIONS.forEach((section) => {
    const items = exportRecords.filter((record) => record.sectionId === section.id);
    if (!items.length) return;
    y = addPdfLine(doc, section.title, y + 3, { size: 14, style: "bold", color: [0, 85, 255] });
    items.forEach((record, index) => {
      y = addPdfLine(doc, `${index + 1}. ${getRecordTitle(record)}`, y + 2, { size: 11, style: "bold", color: [17, 17, 17] });
      Object.entries(record.fields || {}).forEach(([field, value]) => {
        if (!value) return;
        y = addPdfLine(doc, `${field}: ${value}`, y, { size: 9, indent: 4 });
      });
      y += 2;
    });
  });
  return doc;
}

function validateRequiredField(section, draft, errors) {
  const firstField = section.fields[0];
  if (isBlank(draft[firstField])) {
    errors[firstField] = `${firstField} is required.`;
  }
}

function validateFamilyMessage(section, draft, errors) {
  if (section.id === "message-family" && String(draft.Message || "").trim().length < 20) {
    errors.Message = "Please write at least 20 characters so the message is useful.";
  }
}

function validateIdentityField(field, value) {
  if (field === "PAN" && !/^[A-Z]{5}[0-9]{4}[A-Z]$/i.test(value)) {
    return "PAN must look like ABCDE1234F.";
  }
  if (field === "Aadhaar" && value.replace(/\D/g, "").length !== 12) {
    return "Aadhaar must contain exactly 12 digits.";
  }
  return "";
}

function validateTypedField(field, value) {
  if (isMoneyField(field)) {
    const parsed = Number(value.replace(/[^0-9.-]/g, ""));
    if (!Number.isFinite(parsed) || parsed < 0) return `${field} must be a valid positive number.`;
  }
  if (isDateField(field) && Number.isNaN(Date.parse(value))) {
    return `${field} must be a valid date, for example 2026-03-31.`;
  }
  if (isPhoneField(field) && !/^\+?[0-9\s-]{7,18}$/.test(value)) {
    return `${field} should be a valid phone number.`;
  }
  if (isContactField(field) && /@/.test(value) && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    return `${field} email looks invalid.`;
  }
  return "";
}

function validateSectionDraft(section, draft) {
  const errors = {};
  validateRequiredField(section, draft, errors);
  validateFamilyMessage(section, draft, errors);

  Object.entries(draft).forEach(([field, rawValue]) => {
    const value = String(rawValue || "").trim();
    if (!value) return;
    const error = validateIdentityField(field, value) || validateTypedField(field, value);
    if (error) errors[field] = error;
  });

  return errors;
}

function formatDate(value) {
  if (!value) return "—";
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

function formatINR(value) {
  const number = Number(value || 0);
  if (!number) return "₹0";
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(number);
}

function getRecordTitle(record) {
  const values = Object.values(record.fields || {}).filter(Boolean);
  return values[0] || SECTION_LOOKUP[record.sectionId]?.title || "Vault record";
}

function sectionRecords(records, sectionId) {
  return records.filter((record) => record.sectionId === sectionId);
}

function parseMoneyFromRecords(records) {
  return records.reduce((total, record) => {
    return (
      total +
      Object.entries(record.fields || {}).reduce((sum, [key, value]) => {
        if (!moneyFields.some((field) => key.toLowerCase().includes(field))) return sum;
        const parsed = Number(String(value).replace(/[^0-9.-]/g, ""));
        return Number.isFinite(parsed) ? sum + parsed : sum;
      }, 0)
    );
  }, 0);
}

function getSectionBadge(section, count) {
  if (count > 0) return `${count} saved`;
  if (section.priority) return "Priority";
  return "Start";
}

function getInputMode(field) {
  if (isMoneyField(field)) return "decimal";
  if (isPhoneField(field)) return "tel";
  return "text";
}

function isLongField(field) {
  const lowerField = field.toLowerCase();
  return lowerField.includes("note") || lowerField.includes("message") || lowerField.includes("instruction");
}

function getFieldPlaceholder(field, index) {
  if (isLongField(field)) return index === 0 ? "Write the most important detail here..." : "Add clear instructions...";
  return index === 0 ? `Enter ${field.toLowerCase()}` : "Optional";
}

function calculateStats(records) {
  const filled = new Set(records.map((record) => record.sectionId));
  const missingPriority = PRIORITY_SECTION_IDS.filter((sectionId) => !filled.has(sectionId));
  const progress = Math.round((filled.size / SECTIONS.length) * 100);
  const totalValue = parseMoneyFromRecords(records);
  return { filled, missingPriority, progress, totalValue };
}

function filterRecords(records, query) {
  const term = query.trim().toLowerCase();
  if (!term) return records;
  return records.filter((record) => {
    const sectionName = SECTION_LOOKUP[record.sectionId]?.title || "";
    const fieldText = Object.values(record.fields || {}).join(" ");
    return `${sectionName} ${fieldText}`.toLowerCase().includes(term);
  });
}

function DashboardMessage({ type = "info", title, children, testId }) {
  const icons = {
    info: FileSearch,
    success: CheckCircle2,
    warning: AlertTriangle,
  };
  const Icon = icons[type] || FileSearch;
  return (
    <div className={`dashboard-message ${type}`} data-testid={testId}>
      <Icon aria-hidden="true" />
      <div>
        <strong data-testid={`${testId}-title`}>{title}</strong>
        <p data-testid={`${testId}-description`}>{children}</p>
      </div>
    </div>
  );
}

function StatCard({ label, value, helper, testId }) {
  return (
    <article className="stat-card" data-testid={testId}>
      <span data-testid={`${testId}-label`}>{label}</span>
      <strong data-testid={`${testId}-value`}>{value}</strong>
      <small data-testid={`${testId}-helper`}>{helper}</small>
    </article>
  );
}

function SectionTabCard({ section, count, active, onOpen }) {
  const Icon = section.icon;
  const badge = getSectionBadge(section, count);
  return (
    <button
      className={`section-tab-card ${active ? "active" : ""}`}
      type="button"
      onClick={onOpen}
      data-testid={`section-tab-${section.id}`}
      aria-label={`Open ${section.title}`}
    >
      <span className="section-badge" data-testid={`section-tab-${section.id}-badge`}>
        {badge}
      </span>
      <span className="icon-shell" data-testid={`section-tab-${section.id}-icon`}>
        <Icon aria-hidden="true" />
      </span>
      <span className="section-title" data-testid={`section-tab-${section.id}-title`}>
        {section.title}
      </span>
      <span className="section-description" data-testid={`section-tab-${section.id}-description`}>
        {section.description}
      </span>
    </button>
  );
}

function EntryField({ sectionId, field, index, value, error, onChange }) {
  const inputId = `${sectionId}-${slugify(field)}`;
  const longField = isLongField(field);
  const sharedProps = {
    id: inputId,
    value,
    onChange: (event) => onChange(field, event.target.value),
    placeholder: getFieldPlaceholder(field, index),
    "aria-invalid": Boolean(error),
    className: error ? "field-error" : "",
    "data-testid": `entry-input-${inputId}`,
  };

  return (
    <label key={field} htmlFor={inputId} className={longField ? "span-2" : ""} data-testid={`entry-label-${inputId}`}>
      <span>{field}</span>
      {longField ? <textarea {...sharedProps} /> : <input {...sharedProps} inputMode={getInputMode(field)} />}
      {error && (
        <small className="validation-error" data-testid={`entry-error-${inputId}`}>
          {error}
        </small>
      )}
    </label>
  );
}

function ValidationSummary({ sectionId, errors }) {
  if (!Object.keys(errors).length) return null;
  return (
    <div className="validation-summary span-2" data-testid={`validation-summary-${sectionId}`}>
      <AlertTriangle aria-hidden="true" />
      <span>Please fix the highlighted fields before saving.</span>
    </div>
  );
}

function RecordCard({ record, onDelete }) {
  const section = SECTION_LOOKUP[record.sectionId];
  const Icon = section?.icon || FileText;
  const visibleFields = Object.entries(record.fields || {}).filter(([, value]) => value);
  return (
    <article className="record-card" data-testid={`record-card-${record.id}`}>
      <div className="record-card-header">
        <span className="record-icon" data-testid={`record-card-${record.id}-icon`}>
          <Icon aria-hidden="true" />
        </span>
        <div>
          <strong data-testid={`record-card-${record.id}-title`}>{getRecordTitle(record)}</strong>
          <small data-testid={`record-card-${record.id}-section`}>{section?.title || "Record"}</small>
        </div>
        <button
          className="ghost-danger"
          type="button"
          onClick={() => onDelete(record.id)}
          data-testid={`delete-record-${record.id}-button`}
          aria-label={`Delete ${getRecordTitle(record)}`}
        >
          <Trash2 aria-hidden="true" />
        </button>
      </div>
      <div className="record-fields" data-testid={`record-card-${record.id}-fields`}>
        {visibleFields.slice(0, 5).map(([key, value]) => (
          <div key={key} data-testid={`record-card-${record.id}-field-${key.replace(/\s+/g, "-").toLowerCase()}`}>
            <span>{key}</span>
            <p>{value}</p>
          </div>
        ))}
      </div>
      <small className="record-date" data-testid={`record-card-${record.id}-date`}>
        Saved {formatDate(record.createdAt)}
      </small>
    </article>
  );
}

function SectionRecordList({ section, items, onDelete }) {
  return (
    <div className="section-records" data-testid={`section-records-${section.id}`}>
      <div className="subheading-row">
        <h3 data-testid={`section-records-${section.id}-title`}>Saved records</h3>
        <span data-testid={`section-records-${section.id}-count`}>{items.length}</span>
      </div>
      {items.length ? (
        <div className="record-grid">
          {items.map((record) => (
            <RecordCard key={record.id} record={record} onDelete={onDelete} />
          ))}
        </div>
      ) : (
        <p className="empty-state" data-testid={`empty-records-${section.id}`}>
          No records yet. Add one above to make this section useful for your family.
        </p>
      )}
    </div>
  );
}

function useSectionDraft(section) {
  const emptyDraft = () => Object.fromEntries(section.fields.map((field) => [field, ""]));
  const [draft, setDraft] = useState(emptyDraft);
  const [validationErrors, setValidationErrors] = useState({});

  const updateField = (field, value) => {
    setDraft((current) => ({ ...current, [field]: value }));
    setValidationErrors((current) => {
      const nextErrors = { ...current };
      delete nextErrors[field];
      return nextErrors;
    });
  };

  const resetDraft = () => {
    setDraft(emptyDraft());
    setValidationErrors({});
  };

  return { draft, validationErrors, setValidationErrors, updateField, resetDraft };
}

function SectionWorkspace({ section, records, onSave, onDelete }) {
  const { draft, validationErrors, setValidationErrors, updateField, resetDraft } = useSectionDraft(section);
  const items = sectionRecords(records, section.id);
  const Icon = section.icon;

  const submit = (event) => {
    event.preventDefault();
    const nextErrors = validateSectionDraft(section, draft);
    setValidationErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    onSave(section.id, draft);
    resetDraft();
  };

  return (
    <section className="workspace" data-testid={`workspace-${section.id}`}>
      <div className="workspace-heading">
        <span className="workspace-icon" data-testid={`workspace-${section.id}-icon`}>
          <Icon aria-hidden="true" />
        </span>
        <div>
          <p data-testid={`workspace-${section.id}-eyebrow`}>Section workspace</p>
          <h2 data-testid={`workspace-${section.id}-title`}>{section.title}</h2>
          <span data-testid={`workspace-${section.id}-description`}>{section.description}</span>
        </div>
      </div>

      <DashboardMessage type="info" title="Helpful prompt" testId={`workspace-${section.id}-message`}>
        Add the details your family would need without searching through papers. Keep notes short, specific and action-oriented.
      </DashboardMessage>

      <form className="entry-form" onSubmit={submit} data-testid={`entry-form-${section.id}`}>
        {section.fields.map((field, index) => (
          <EntryField
            key={field}
            sectionId={section.id}
            field={field}
            index={index}
            value={draft[field]}
            error={validationErrors[field]}
            onChange={updateField}
          />
        ))}
        <ValidationSummary sectionId={section.id} errors={validationErrors} />
        <button className="primary-action span-2" type="submit" data-testid={`save-record-${section.id}-button`}>
          <Plus aria-hidden="true" /> Save record
        </button>
      </form>

      <SectionRecordList section={section} items={items} onDelete={onDelete} />
    </section>
  );
}

function TopBar({ activeView, onNavigate }) {
  return (
    <header className="topbar" data-testid="topbar">
      <button className="brand-mark" type="button" onClick={() => onNavigate("dashboard")} data-testid="brand-home-button">
        <ShieldCheck aria-hidden="true" />
        <span>
          <strong data-testid="app-title">Family Financial Recovery Vault</strong>
          <small data-testid="app-subtitle">Private family readiness workspace</small>
        </span>
      </button>
      <nav className="primary-nav" aria-label="Primary navigation" data-testid="primary-navigation">
        {PRIMARY_NAV.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              type="button"
              className={activeView === item.id ? "nav-pill active" : "nav-pill"}
              onClick={() => onNavigate(item.id)}
              data-testid={`nav-${item.id}-button`}
            >
              <Icon aria-hidden="true" /> {item.label}
            </button>
          );
        })}
      </nav>
    </header>
  );
}

function HeroPanel({ stats }) {
  const statusText = stats.missingPriority.length ? `${stats.missingPriority.length} priority sections pending` : "Priority sections complete";
  return (
    <section className="hero-panel" data-testid="hero-panel">
      <div>
        <p className="eyebrow" data-testid="hero-eyebrow">Zero-server family planning tool</p>
        <h1 data-testid="hero-title">Make the hard day easier for the people you love.</h1>
        <p data-testid="hero-description">
          Organise emergency contacts, assets, documents, policies and instructions in a clearer dashboard with even action tabs and practical status messages.
        </p>
      </div>
      <div className="hero-status-card" data-testid="hero-status-card">
        <span data-testid="hero-status-label">Vault readiness</span>
        <strong data-testid="hero-status-progress">{stats.progress}%</strong>
        <div className="progress-track" data-testid="hero-progress-track">
          <div style={{ width: `${stats.progress}%` }} data-testid="hero-progress-bar" />
        </div>
        <small data-testid="hero-status-helper">{statusText}</small>
      </div>
    </section>
  );
}

function StatsGrid({ records, stats }) {
  return (
    <section className="stat-grid" data-testid="dashboard-stat-grid">
      <StatCard label="Records" value={records.length} helper="Saved for this browser session" testId="stat-records" />
      <StatCard label="Sections filled" value={`${stats.filled.size}/${SECTIONS.length}`} helper="Across your full vault" testId="stat-sections-filled" />
      <StatCard label="Priority pending" value={stats.missingPriority.length} helper="Recommended first steps" testId="stat-priority-pending" />
      <StatCard label="Tracked value" value={formatINR(stats.totalValue)} helper="From amount fields entered" testId="stat-tracked-value" />
    </section>
  );
}

function DashboardMessages({ stats }) {
  return (
    <section className="message-stack" data-testid="dashboard-message-stack">
      {stats.missingPriority.length ? (
        <DashboardMessage type="warning" title="Start with the priority sections" testId="priority-warning-message">
          Message to My Family, Personal Information, Emergency Access, Trusted Helpers, Financial Assets, Insurance and Will & Estate are the most useful first.
        </DashboardMessage>
      ) : (
        <DashboardMessage type="success" title="Your critical foundation is ready" testId="priority-success-message">
          The main emergency sections are filled. Keep going with documents, liabilities and digital accounts.
        </DashboardMessage>
      )}
      <DashboardMessage type="info" title="Private by design" testId="privacy-info-message">
        Nothing is sent to the server. Download your vault regularly and store the backup somewhere safe.
      </DashboardMessage>
    </section>
  );
}

function DashboardView({ records, activeSectionId, onOpenSection }) {
  return (
    <section className="dashboard-body" data-testid="dashboard-body">
      <div className="section-intro">
        <div>
          <p className="eyebrow" data-testid="section-grid-eyebrow">Improved front screen tabs</p>
          <h2 data-testid="section-grid-title">Choose what to organise next</h2>
        </div>
        <p data-testid="section-grid-description">
          Each tab is now even, icon-led, descriptive, and shows a clear status badge so users know where to continue.
        </p>
      </div>

      {SECTION_GROUPS.map((group) => {
        const groupSlug = slugify(group.name);
        return (
          <div className="section-group" key={group.name} data-testid={`section-group-${groupSlug}`}>
            <div className="group-heading">
              <h3 data-testid={`section-group-${groupSlug}-title`}>{group.name}</h3>
              <p data-testid={`section-group-${groupSlug}-note`}>{group.note}</p>
            </div>
            <div className="section-grid" data-testid={`section-grid-${groupSlug}`}>
              {group.sections.map((sectionId) => {
                const section = SECTION_LOOKUP[sectionId];
                return (
                  <SectionTabCard
                    key={section.id}
                    section={section}
                    count={sectionRecords(records, section.id).length}
                    active={activeSectionId === section.id}
                    onOpen={() => onOpenSection(section.id)}
                  />
                );
              })}
            </div>
          </div>
        );
      })}
    </section>
  );
}

function AllRecordsView({ records, onDelete }) {
  return (
    <section className="workspace" data-testid="all-records-workspace">
      <div className="subheading-row">
        <div>
          <p className="eyebrow" data-testid="all-records-eyebrow">Complete vault view</p>
          <h2 data-testid="all-records-title">All saved records</h2>
        </div>
        <span data-testid="all-records-count">{records.length}</span>
      </div>
      {records.length ? (
        <div className="record-grid">
          {records.map((record) => (
            <RecordCard key={record.id} record={record} onDelete={onDelete} />
          ))}
        </div>
      ) : (
        <p className="empty-state" data-testid="all-records-empty-state">No records yet. Start from the dashboard tabs.</p>
      )}
    </section>
  );
}

function SearchView({ query, onQueryChange, filteredRecords, onDelete }) {
  return (
    <section className="workspace" data-testid="search-workspace">
      <div className="workspace-heading">
        <span className="workspace-icon" data-testid="search-workspace-icon"><Search aria-hidden="true" /></span>
        <div>
          <p data-testid="search-eyebrow">Global search</p>
          <h2 data-testid="search-title">Find anything quickly</h2>
          <span data-testid="search-description">Search names, phone numbers, institutions, notes and section names.</span>
        </div>
      </div>
      <label className="search-box" htmlFor="vault-search" data-testid="search-input-label">
        <Search aria-hidden="true" />
        <input
          id="vault-search"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Search across all records..."
          data-testid="search-input"
        />
      </label>
      <div className="subheading-row">
        <h3 data-testid="search-results-title">Results</h3>
        <span data-testid="search-results-count">{filteredRecords.length}</span>
      </div>
      {filteredRecords.length ? (
        <div className="record-grid">
          {filteredRecords.map((record) => (
            <RecordCard key={record.id} record={record} onDelete={onDelete} />
          ))}
        </div>
      ) : (
        <p className="empty-state" data-testid="search-empty-state">No matching records found.</p>
      )}
    </section>
  );
}

function ImportBackupCard({ importDraft, importError, onFileChange, onApplyImport, onCancelImport }) {
  return (
    <article className="export-card" data-testid="import-backup-card">
      <div className="export-card-heading">
        <FileInput aria-hidden="true" />
        <div>
          <h3 data-testid="import-backup-title">Import from backup</h3>
          <p data-testid="import-backup-description">Choose a JSON backup, then decide whether to replace or merge records.</p>
        </div>
      </div>
      <label className="file-import-button" htmlFor="backup-import-input" data-testid="backup-import-label">
        Select JSON backup
        <input
          id="backup-import-input"
          type="file"
          accept="application/json,.json"
          onChange={onFileChange}
          data-testid="backup-import-input"
        />
      </label>
      {importError && (
        <div className="validation-summary" data-testid="backup-import-error">
          <AlertTriangle aria-hidden="true" /> <span>{importError}</span>
        </div>
      )}
      {importDraft && (
        <div className="import-preview" data-testid="backup-import-preview">
          <strong data-testid="backup-import-preview-title">Ready to import {importDraft.records.length} record(s)</strong>
          <p data-testid="backup-import-preview-description">File: {importDraft.fileName}</p>
          <div className="download-actions compact" data-testid="backup-import-actions">
            <button className="primary-action" type="button" onClick={() => onApplyImport("replace")} data-testid="backup-import-replace-button">
              Replace current records
            </button>
            <button className="secondary-action" type="button" onClick={() => onApplyImport("merge")} data-testid="backup-import-merge-button">
              Merge with current records
            </button>
            <button className="danger-action" type="button" onClick={onCancelImport} data-testid="backup-import-cancel-button">
              Cancel
            </button>
          </div>
        </div>
      )}
    </article>
  );
}

function PdfExportCard({ onExportPdf }) {
  return (
    <article className="export-card" data-testid="pdf-export-card">
      <div className="export-card-heading">
        <FileText aria-hidden="true" />
        <div>
          <h3 data-testid="pdf-export-title">PDF exports</h3>
          <p data-testid="pdf-export-description">Download either the full vault or a shorter emergency priority summary.</p>
        </div>
      </div>
      <div className="download-actions compact" data-testid="pdf-export-actions">
        <button className="primary-action" type="button" onClick={() => onExportPdf("full")} data-testid="download-full-pdf-button">
          <FileText aria-hidden="true" /> Full PDF
        </button>
        <button className="secondary-action" type="button" onClick={() => onExportPdf("priority")} data-testid="download-priority-pdf-button">
          <FileHeart aria-hidden="true" /> Priority summary PDF
        </button>
      </div>
    </article>
  );
}

function ExcelExportCard({ onExportSingleSheet, onExportBySection }) {
  return (
    <article className="export-card" data-testid="excel-export-card">
      <div className="export-card-heading">
        <FileSpreadsheet aria-hidden="true" />
        <div>
          <h3 data-testid="excel-export-title">Excel exports</h3>
          <p data-testid="excel-export-description">Use one sheet for quick review or section-wise sheets for cleaner family handover.</p>
        </div>
      </div>
      <div className="download-actions compact" data-testid="excel-export-actions">
        <button className="primary-action" type="button" onClick={onExportSingleSheet} data-testid="download-excel-single-button">
          <FileSpreadsheet aria-hidden="true" /> One-sheet Excel
        </button>
        <button className="secondary-action" type="button" onClick={onExportBySection} data-testid="download-excel-section-button">
          <FileSpreadsheet aria-hidden="true" /> Section-wise Excel
        </button>
      </div>
    </article>
  );
}

function JsonToolsCard({ onDownloadJson, onClearVault }) {
  return (
    <article className="export-card" data-testid="json-tools-card">
      <div className="export-card-heading">
        <FileJson aria-hidden="true" />
        <div>
          <h3 data-testid="json-tools-title">JSON and browser tools</h3>
          <p data-testid="json-tools-description">JSON is best for re-importing later. Print is useful for a quick physical summary.</p>
        </div>
      </div>
      <div className="download-actions compact" data-testid="download-actions">
        <button className="primary-action" type="button" onClick={onDownloadJson} data-testid="download-json-button">
          <Download aria-hidden="true" /> Download JSON backup
        </button>
        <button className="secondary-action" type="button" onClick={() => window.print()} data-testid="print-summary-button">
          <FileText aria-hidden="true" /> Print summary
        </button>
        <button className="danger-action" type="button" onClick={onClearVault} data-testid="clear-vault-button">
          <Trash2 aria-hidden="true" /> Clear browser session
        </button>
      </div>
    </article>
  );
}

function DownloadView({ importDraft, importError, actions }) {
  return (
    <section className="workspace download-workspace" data-testid="download-workspace">
      <div className="workspace-heading">
        <span className="workspace-icon" data-testid="download-workspace-icon"><Download aria-hidden="true" /></span>
        <div>
          <p data-testid="download-eyebrow">Backup centre</p>
          <h2 data-testid="download-title">Download and protect your vault</h2>
          <span data-testid="download-description">Import a JSON backup, export full PDF/priority PDF, or download Excel in one-sheet and section-wise formats.</span>
        </div>
      </div>

      <div className="backup-layout" data-testid="backup-layout">
        <ImportBackupCard
          importDraft={importDraft}
          importError={importError}
          onFileChange={actions.handleImportFile}
          onApplyImport={actions.applyImport}
          onCancelImport={actions.cancelImport}
        />
        <PdfExportCard onExportPdf={actions.exportPdf} />
        <ExcelExportCard onExportSingleSheet={actions.exportExcelSingleSheet} onExportBySection={actions.exportExcelBySection} />
        <JsonToolsCard onDownloadJson={actions.downloadVault} onClearVault={actions.clearVault} />
      </div>
      <DashboardMessage type="warning" title="Important reminder" testId="download-warning-message">
        Download before sharing this device or closing the browser tab. This app does not store your records on a server or in persistent browser storage.
      </DashboardMessage>
    </section>
  );
}

function App() {
  const [records, setRecords] = useState(loadRecords);
  const [activeView, setActiveView] = useState("dashboard");
  const [activeSectionId, setActiveSectionId] = useState("message-family");
  const [query, setQuery] = useState("");
  const [importDraft, setImportDraft] = useState(null);
  const [importError, setImportError] = useState("");

  const stats = calculateStats(records);
  const activeSection = SECTION_LOOKUP[activeSectionId];
  const filteredRecords = filterRecords(records, query);

  const commitRecords = (nextRecords) => {
    setRecords(nextRecords);
    saveRecords(nextRecords);
  };

  const openSection = (sectionId) => {
    setActiveSectionId(sectionId);
    setActiveView("section");
  };

  const addRecord = (sectionId, fields) => {
    const cleanFields = Object.fromEntries(Object.entries(fields).map(([key, value]) => [key, String(value || "").trim()]));
    commitRecords([{ id: crypto.randomUUID(), sectionId, fields: cleanFields, createdAt: new Date().toISOString() }, ...records]);
  };

  const deleteRecord = (recordId) => commitRecords(records.filter((record) => record.id !== recordId));

  const downloadVault = () => {
    const payload = JSON.stringify({ exportedAt: new Date().toISOString(), records }, null, 2);
    downloadBlob(`Family_Financial_Recovery_Vault_${new Date().toISOString().slice(0, 10)}.json`, new Blob([payload], { type: "application/json" }));
  };

  const exportPdf = (mode) => {
    const doc = buildPdf(records, mode);
    const suffix = mode === "priority" ? "Priority_Summary" : "Full_Export";
    doc.save(`Family_Vault_${suffix}_${new Date().toISOString().slice(0, 10)}.pdf`);
  };

  const exportExcelSingleSheet = () => {
    const workbook = XLSX.utils.book_new();
    const rows = flattenRecords(records);
    XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(rows.length ? rows : [{ Note: "No records available" }]), "All Records");
    XLSX.writeFile(workbook, `Family_Vault_All_Records_${new Date().toISOString().slice(0, 10)}.xlsx`);
  };

  const exportExcelBySection = () => {
    const workbook = XLSX.utils.book_new();
    const usedNames = new Set();
    SECTIONS.forEach((section) => {
      const items = sectionRecords(records, section.id);
      if (!items.length) return;
      const rows = items.map((record) => ({ "Record title": getRecordTitle(record), "Saved on": formatDate(record.createdAt), ...record.fields }));
      XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(rows), safeSheetName(section.title, usedNames));
    });
    if (!workbook.SheetNames.length) XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet([{ Note: "No records available" }]), "Summary");
    XLSX.writeFile(workbook, `Family_Vault_By_Section_${new Date().toISOString().slice(0, 10)}.xlsx`);
  };

  const handleImportFile = async (event) => {
    const file = event.target.files?.[0];
    setImportDraft(null);
    setImportError("");
    if (!file) return;
    try {
      const importedRecords = parseBackupPayload(JSON.parse(await file.text()));
      if (!importedRecords.length) {
        setImportError("No valid vault records were found in this backup file.");
        return;
      }
      setImportDraft({ fileName: file.name, records: importedRecords });
    } catch {
      setImportError("This backup could not be read. Please select a valid JSON vault backup.");
    } finally {
      event.target.value = "";
    }
  };

  const applyImport = (mode) => {
    if (!importDraft?.records?.length) return;
    const importedRecords = mode === "replace" ? importDraft.records : importDraft.records.map((record) => ({ ...record, id: crypto.randomUUID() }));
    commitRecords(mode === "replace" ? importedRecords : [...importedRecords, ...records]);
    setImportDraft(null);
    setImportError("");
  };

  const clearVault = () => {
    const confirmed = window.confirm("This clears records saved in this browser session. Continue?");
    if (confirmed) commitRecords([]);
  };

  const downloadActions = {
    handleImportFile,
    applyImport,
    cancelImport: () => setImportDraft(null),
    exportPdf,
    exportExcelSingleSheet,
    exportExcelBySection,
    downloadVault,
    clearVault,
  };

  return (
    <main className="vault-app" data-testid="family-vault-app">
      <TopBar activeView={activeView} onNavigate={setActiveView} />
      <HeroPanel stats={stats} />
      <StatsGrid records={records} stats={stats} />
      <DashboardMessages stats={stats} />
      {activeView === "dashboard" && <DashboardView records={records} activeSectionId={activeSectionId} onOpenSection={openSection} />}
      {activeView === "section" && activeSection && <SectionWorkspace section={activeSection} records={records} onSave={addRecord} onDelete={deleteRecord} />}
      {activeView === "records" && <AllRecordsView records={records} onDelete={deleteRecord} />}
      {activeView === "search" && <SearchView query={query} onQueryChange={setQuery} filteredRecords={filteredRecords} onDelete={deleteRecord} />}
      {activeView === "download" && <DownloadView importDraft={importDraft} importError={importError} actions={downloadActions} />}
      <footer className="vault-footer" data-testid="vault-footer">
        <span data-testid="footer-privacy-copy">Private session vault · no login · no server storage</span>
        <button type="button" onClick={() => setActiveView("dashboard")} data-testid="footer-dashboard-button">
          Back to dashboard <ChevronRight aria-hidden="true" />
        </button>
      </footer>
    </main>
  );
}

export default App;