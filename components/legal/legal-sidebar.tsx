"use client";

import Link from "next/link";

interface NavigationItem {
  id: string;
  label: string;
}

interface LegalSidebarProps {
  navigationItems: NavigationItem[];
  className?: string;
}

export const LegalSidebar = ({
  navigationItems,
  className = "",
}: LegalSidebarProps) => {
  return (
    <aside
      className={`w-92  font-montserrat font-semibold text-helix-blue dark:text-white hidden lg:block  ${className}`}
    >
      <nav className="sticky top-0 pt-10">
        {navigationItems.map((item) => (
          <div key={item.id} className="mb-4 text-sm">
            <Link
              href={`#${item.id}`}
              className="flex items-center  dark:text-white hover:text-accent dark:hover:text-white transition-colors duration-200"
            >
              <span className="text-helix-black  dark:text-white-blue mr-2">
                •
              </span>{" "}
              {item.label}
            </Link>
          </div>
        ))}
      </nav>
    </aside>
  );
};

// Pre-configured navigation items for different legal pages
export const privacyPolicyNavItems: NavigationItem[] = [
  { id: "general", label: "General" },
  { id: "children", label: "Children Under the Age of 18" },
  { id: "information-collect", label: "Information We Collect" },
  { id: "how-use", label: "How We Use Your Information" },
  { id: "disclosure", label: "Disclosure of Your Information" },
  { id: "third-party", label: "Third Party Information Collection" },
  { id: "protection", label: "Protection of Your Information" },
  { id: "updating", label: "Updating Your Information" },
  { id: "rights", label: "Your Rights" },
  { id: "request-processing", label: "Request Processing" },
  { id: "cookies", label: "Cookies" },
  { id: "changes", label: "Changes to This Privacy Policy" },
  { id: "blockchains", label: "Important Note About Public Blockchains" },
  { id: "contact", label: "Contact Us" },
];

export const termsOfServiceNavItems: NavigationItem[] = [
  { id: "general", label: "General" },
  { id: "use-of-website", label: "Use of the Website" },
  { id: "access-accounts", label: "Access and Accounts" },
  { id: "member-materials", label: "Member Materials" },
  { id: "representation-warranties", label: "Representation and Warranties" },
  { id: "our-service", label: "Our Service" },
  { id: "security", label: "Security" },
  { id: "intellectual-property", label: "Intellectual Property" },
  { id: "confidentiality", label: "Confidentiality" },
  { id: "restrictions", label: "Restrictions" },
  { id: "messaging", label: "Messaging" },
  { id: "monitoring-enforcement", label: "Monitoring and Enforcement" },
  { id: "compliance", label: "Compliance with Laws" },
  { id: "notifications", label: "Our Notifications to You" },
  { id: "disclosures", label: "Disclosures and Disclaimers" },
  { id: "jurisdiction", label: "Jurisdiction and Law" },
  { id: "notices", label: "Notices and Communications" },
  { id: "severability", label: "Severability" },
  { id: "assignment", label: "Assignment" },
  { id: "third-party-rights", label: "Third Party Rights" },
  { id: "third-party-website", label: "Third Party Website Disclaimer" },
  { id: "third-party-engagements", label: "Third Party Engagements" },
  { id: "waiver", label: "Waiver" },
  { id: "restricted-access", label: "Restricted Access" },
  { id: "modification-of-terms", label: "Modification of Terms" },
  { id: "language", label: "Language" },
  { id: "other-agreements", label: "Other Agreements" },
];

export const disclaimerNavItems: NavigationItem[] = [
  { id: "no-solicitation", label: "No Solicitation" },
  { id: "restricted-access", label: "Restricted Access" },
  { id: "no-reliance", label: "No Reliance" },
  { id: "risk-warning", label: "Risk Warning" },
  { id: "default-risk", label: "Default Risk" },
  { id: "no-liability", label: "No Liability" },
  { id: "no-fiduciary-duty", label: "No Fiduciary Duty" },
  { id: "third-party-content", label: "Third Party Content" },
  { id: "non-securities", label: "Non-Security" },
  {
    id: "no-ownership",
    label: "No Ownership Or Interest in Underlying Assets",
  },
  { id: "no-assurance", label: "No Assurance Of Performance" },
  { id: "conflict", label: "Conflict" },
  { id: "fees-and-expenses", label: "Fees and Expenses" },
  { id: "tax", label: "Tax" },
  { id: "no-commercial", label: "No Commercial Exploitation" },
  { id: "accuracy-of-information", label: "Accuracy of Information" },
  { id: "regulatory", label: "Regulatory and Compliance" },
  { id: "cyber-security", label: "Cyber Security Risk" },
  { id: "governing-law", label: "Governing Law And Dispute Resolution" },
  { id: "risk-disclosure", label: "Risk Disclosure Statement" },
  {
    id: "preventing-financial-crime",
    label: "Preventing Financial Crime (Introduction)",
  },
  { id: "obligations", label: "We Take Our Obligations Seriously" },
  { id: "global-marketplace", label: "We Operate In A Global Marketplace" },
  { id: "aml-ctf-measures", label: "AML/CTF And Fraud Measures" },
  { id: "what-does-this-mean", label: "What Does This Mean For You?" },
  { id: "record-keeping", label: "Record Keeping And Reporting" },
];

// Default export for backward compatibility
export default LegalSidebar;
