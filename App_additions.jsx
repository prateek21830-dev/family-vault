// ============================================================
// STEP 1 — Add these icons to your existing Lucide import line
// ============================================================
// Find your line that looks like:
//   import { ShieldCheck, ... } from "lucide-react";
// Add these to it:  Heart, Coffee, Smartphone, ExternalLink, Copy, CheckCheck
//
// Example result:
//   import { ShieldCheck, ..., Heart, Coffee, Smartphone, ExternalLink, Copy, CheckCheck } from "lucide-react";


// ============================================================
// STEP 2 — Add this CSS into your App.css (or index.css)
// ============================================================
/*
.donation-card {
  background: linear-gradient(135deg, #fdf4ff 0%, #eff6ff 100%);
  border: 1.5px solid #e9d5ff;
  border-radius: 16px;
  padding: 24px;
  grid-column: 1 / -1;          /* spans full width of backup-layout grid */
}

.donation-card-heading {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  margin-bottom: 16px;
}

.donation-card-heading svg {
  flex-shrink: 0;
  width: 28px;
  height: 28px;
  color: #a855f7;
  margin-top: 2px;
}

.donation-card-heading h3 {
  margin: 0 0 4px;
  font-size: 1.05rem;
  color: #1e1b4b;
}

.donation-card-heading p {
  margin: 0;
  font-size: 0.85rem;
  color: #6b7280;
  line-height: 1.5;
}

.donation-options {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 14px;
  margin-top: 4px;
}

.donation-option {
  background: #ffffff;
  border: 1.5px solid #e9d5ff;
  border-radius: 12px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.donation-option-header {
  display: flex;
  align-items: center;
  gap: 8px;
}

.donation-option-header svg {
  width: 18px;
  height: 18px;
  color: #7c3aed;
  flex-shrink: 0;
}

.donation-option-header span {
  font-size: 0.88rem;
  font-weight: 600;
  color: #1e1b4b;
}

.upi-id-row {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #faf5ff;
  border: 1px solid #e9d5ff;
  border-radius: 8px;
  padding: 8px 12px;
  font-family: monospace;
  font-size: 0.88rem;
  color: #6d28d9;
  font-weight: 600;
}

.upi-id-row button {
  margin-left: auto;
  background: none;
  border: none;
  cursor: pointer;
  color: #7c3aed;
  padding: 2px;
  display: flex;
  align-items: center;
  border-radius: 4px;
  transition: background 0.15s;
}

.upi-id-row button:hover {
  background: #ede9fe;
}

.donation-note {
  font-size: 0.75rem;
  color: #9ca3af;
  line-height: 1.4;
  margin: 0;
}

.donate-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 9px 14px;
  border-radius: 8px;
  font-size: 0.84rem;
  font-weight: 600;
  text-decoration: none;
  transition: opacity 0.15s, transform 0.1s;
  cursor: pointer;
  border: none;
}

.donate-link:hover {
  opacity: 0.88;
  transform: translateY(-1px);
}

.donate-link.coffee {
  background: #FFDD00;
  color: #1a1a1a;
}

.donate-link.paypal {
  background: #003087;
  color: #ffffff;
}

.donate-link.razorpay {
  background: #3395FF;
  color: #ffffff;
}

.donate-link svg {
  width: 15px;
  height: 15px;
}

.donation-thankyou {
  grid-column: 1 / -1;
  text-align: center;
  font-size: 0.78rem;
  color: #9ca3af;
  margin-top: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
}

.donation-thankyou svg {
  width: 13px;
  height: 13px;
  color: #ec4899;
}
*/


// ============================================================
// STEP 3 — Add this component anywhere ABOVE the App() function
// ============================================================

function DonationCard() {
  const [copied, setCopied] = React.useState(false);

  // ── Replace these with YOUR actual details ──────────────────
  const UPI_ID       = "yourname@upi";          // e.g. "rajesh@okicici"
  const BMC_URL      = "https://buymeacoffee.com/yourusername";
  const PAYPAL_URL   = "https://paypal.me/yourusername";
  const RAZORPAY_URL = "https://rzp.io/l/yourlink"; // create at razorpay.me
  // ────────────────────────────────────────────────────────────

  const copyUpi = async () => {
    try {
      await navigator.clipboard.writeText(UPI_ID);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // fallback — select the text visually
    }
  };

  return (
    <article className="donation-card" data-testid="donation-card">
      <div className="donation-card-heading">
        <Heart aria-hidden="true" />
        <div>
          <h3 data-testid="donation-title">This tool is free — support keeps it alive</h3>
          <p data-testid="donation-description">
            If this vault helped you protect your family's future, consider buying me a chai ☕.
            Every contribution — however small — pays for hosting, improvements, and my time.
          </p>
        </div>
      </div>

      <div className="donation-options">

        {/* ── UPI (India) ─────────────────────────────────── */}
        <div className="donation-option" data-testid="donation-upi">
          <div className="donation-option-header">
            <Smartphone aria-hidden="true" />
            <span>UPI / GPay / PhonePe</span>
          </div>
          <div className="upi-id-row" data-testid="upi-id-display">
            {UPI_ID}
            <button onClick={copyUpi} title="Copy UPI ID" data-testid="copy-upi-button"
                    aria-label="Copy UPI ID to clipboard">
              {copied ? <CheckCheck aria-hidden="true" /> : <Copy aria-hidden="true" />}
            </button>
          </div>
          {copied && (
            <p style={{ fontSize: "0.76rem", color: "#7c3aed", margin: 0, fontWeight: 600 }}
               data-testid="upi-copied-confirmation">
              ✓ Copied to clipboard
            </p>
          )}
          <p className="donation-note">
            Open any UPI app → Pay to → paste the ID above → any amount you like
          </p>
        </div>

        {/* ── International ───────────────────────────────── */}
        <div className="donation-option" data-testid="donation-international">
          <div className="donation-option-header">
            <Coffee aria-hidden="true" />
            <span>International</span>
          </div>
          <a href={BMC_URL} target="_blank" rel="noopener noreferrer"
             className="donate-link coffee" data-testid="bmc-donate-button">
            <Coffee aria-hidden="true" /> Buy me a coffee
            <ExternalLink aria-hidden="true" style={{ width: 12, height: 12, marginLeft: "auto" }} />
          </a>
          <a href={PAYPAL_URL} target="_blank" rel="noopener noreferrer"
             className="donate-link paypal" data-testid="paypal-donate-button">
            <ExternalLink aria-hidden="true" /> Donate via PayPal
          </a>
          <p className="donation-note">
            No account needed for Buy Me a Coffee — debit / credit cards accepted
          </p>
        </div>

        {/* ── Razorpay (India, cards + UPI) ───────────────── */}
        <div className="donation-option" data-testid="donation-razorpay">
          <div className="donation-option-header">
            <Heart aria-hidden="true" />
            <span>Cards or Net Banking</span>
          </div>
          <a href={RAZORPAY_URL} target="_blank" rel="noopener noreferrer"
             className="donate-link razorpay" data-testid="razorpay-donate-button">
            <ExternalLink aria-hidden="true" /> Pay via Razorpay
          </a>
          <p className="donation-note">
            Supports all Indian debit/credit cards, net banking, and UPI through a
            secure Razorpay payment page
          </p>
        </div>

      </div>

      <p className="donation-thankyou" data-testid="donation-thankyou">
        <Heart aria-hidden="true" />
        100% voluntary — your family's safety matters more than any donation.
        Thank you for using this tool.
      </p>
    </article>
  );
}


// ============================================================
// STEP 4 — Replace your existing DownloadView function with this
// ============================================================

function DownloadView({ importDraft, importError, actions }) {
  return (
    <section className="workspace download-workspace" data-testid="download-workspace">
      <div className="workspace-heading">
        <span className="workspace-icon" data-testid="download-workspace-icon">
          <Download aria-hidden="true" />
        </span>
        <div>
          <p data-testid="download-eyebrow">Backup centre</p>
          <h2 data-testid="download-title">Download and protect your vault</h2>
          <span data-testid="download-description">
            Import a JSON backup, export full PDF / priority PDF, or download Excel in
            one-sheet and section-wise formats.
          </span>
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
        <ExcelExportCard
          onExportSingleSheet={actions.exportExcelSingleSheet}
          onExportBySection={actions.exportExcelBySection}
        />
        <JsonToolsCard
          onDownloadJson={actions.downloadVault}
          onClearVault={actions.clearVault}
        />

        {/* ── Donation card — appears after all download options ── */}
        <DonationCard />
      </div>

      <DashboardMessage type="warning" title="Important reminder" testId="download-warning-message">
        Download before sharing this device or closing the browser tab. This app does not
        store your records on a server or in persistent browser storage.
      </DashboardMessage>
    </section>
  );
}
