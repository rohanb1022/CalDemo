"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import Link from 'next/link';

// Lucide Icons Import
import { 
    Info, 
    Calculator, 
    CheckSquare, 
    Trophy, 
    ChevronDown,
    Dribbble,
    Facebook,
    Github,
    Instagram,
    Mail,
    MapPin,
    Phone,
    Twitter,
    HelpCircle,
    TrendingUp,
    Sparkles
} from "lucide-react";

// Shadcn UI Imports
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";
import {
  Navbar as ResizableNavbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";


// --- TYPE DEFINITIONS ---
type View = "landing" | "numeric" | "yesno" | "results";
type NumericField = { key: string; label: string; defaultValue: number; value: number; higherBetter: boolean; info: string; };
type YesNoField = { key: string; label: string; value: boolean; info: string; };
type NumericFullscreenProps = { numericState: NumericField[]; updateNumericValue: (key: string, newValue: number) => void; computeGap: (f: NumericField) => number; computeRating: (f: NumericField) => number; handleNumericSubmit: () => void; setView: React.Dispatch<React.SetStateAction<View>>; };
type YesNoFullscreenProps = { yesNoState: YesNoField[]; toggleYesNo: (key: string, checked: boolean) => void; handleYesNoSubmit: () => void; setView: React.Dispatch<React.SetStateAction<View>>; };
type ResultsFullscreenProps = { finalScore: number; numericScoreWeighted: number; yesScoreWeighted: number; allTips: string[]; setView: React.Dispatch<React.SetStateAction<View>>; };
type LandingViewProps = { numericDone: boolean; yesNoDone: boolean; setView: React.Dispatch<React.SetStateAction<View>>; };
type CollapsibleSectionProps = { title: string; icon: React.ElementType; isComplete: boolean; statusText: string; isOpen: boolean; setIsOpen: React.Dispatch<React.SetStateAction<boolean>>; children: React.ReactNode; };

// --- DATA CONSTANTS ---
const initialNumeric: NumericField[] = [
    { key: "monthlyExpenses", label: "Monthly Expenses", defaultValue: 40000, value: 40000, higherBetter: false, info: "Benchmark example: target monthly expenses. Lower is better relative to income.", },
    { key: "monthlyIncome", label: "Monthly Income", defaultValue: 100000, value: 100000, higherBetter: true, info: "Gross monthly income. Higher is better to cover expenses and savings.", },
    { key: "familyMembers", label: "Family Members", defaultValue: 4, value: 4, higherBetter: false, info: "Number of dependents. Lower number reduces financial burden.", },
    { key: "incomeProtection", label: "Income Protection (life cover)", defaultValue: 2000000, value: 2000000, higherBetter: true, info: "Recommended life cover (example: annual income × ~20).", },
    { key: "emergencyFund", label: "Emergency Fund", defaultValue: 120000, value: 120000, higherBetter: true, info: "Emergency fund typically 3-6 months of expenses. Default uses 3 months.", },
    { key: "healthInsurance", label: "Health Insurance Sum Insured", defaultValue: 800000, value: 800000, higherBetter: true, info: "Recommended health cover relative to annual income and family size.", },
    { key: "criticalIllness", label: "Critical Illness Cover", defaultValue: 300000, value: 300000, higherBetter: true, info: "Recommended sum assured for critical illness policies (rule-of-thumb).", },
    { key: "disabilityInsurance", label: "Disability Insurance", defaultValue: 1500000, value: 1500000, higherBetter: true, info: "Income replacement cover in case of long-term disability.", },
    { key: "retirementGoals", label: "Retirement Corpus Goal", defaultValue: 12000000, value: 12000000, higherBetter: true, info: "Estimated retirement corpus required (placeholder rule).", },
    { key: "childEducation", label: "Child Education Fund", defaultValue: 2000000, value: 2000000, higherBetter: true, info: "Target corpus for child education (placeholder).", },
    { key: "debtManagement", label: "Debt Management (acceptable EMI)", defaultValue: 40000, value: 40000, higherBetter: false, info: "Acceptable EMI threshold (rule-of-thumb: ≤ 40% of income).", },
];
const initialYesNo: YesNoField[] = [
    { key: "budgetPlanning", label: "Budget Planning", value: false, info: "Do you maintain a monthly/quarterly budget?" },
    { key: "wealthBuilding", label: "Wealth Building", value: false, info: "Do you follow a structured wealth-building plan?" },
    { key: "optimizeTax", label: "Optimize Tax Saving Investments", value: false, info: "Do you leverage tax-saving investments effectively?" },
    { key: "openHUF", label: "Open HUF Account", value: false, info: "Is an HUF account opened/considered (if applicable)?" },
    { key: "homeLoanRent", label: "Home Loan & Rent", value: false, info: "Is your housing EMI/rent within acceptable limits?" },
    { key: "cibil", label: "CIBIL Score ≥ 700", value: false, info: "Is your credit score above 700?" },
    { key: "spouseCoverage", label: "Spouse Coverage", value: false, info: "Does spouse have adequate insurance/coverage?" },
    { key: "familyGoals", label: "Family Goals", value: false, info: "Are family financial goals documented and planned?" },
    { key: "estatePlanning", label: "Estate Planning", value: false, info: "Do you have a will/estate plan in place?" },
    { key: "diversification", label: "Investment Diversification", value: false, info: "Are your investments diversified across asset classes?" },
    { key: "legacyFund", label: "Legacy Fund", value: false, info: "Have you planned for legacy/wealth transfer to next generation?" },
];

// --- YOUR ORIGINAL NAVBAR COMPONENT ---
function Navbar() {
  const navItems = [
    { name: "Features", link: "#features" },
    { name: "Testimonials", link: "#testimonials" },
    { name: "Pricing", link: "#pricing" },
    { name: "Contact", link: "#contact" },
  ];
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    // Set background to creamy to match the page
    <div className="relative w-full bg-[#fdfbf7]">
      <ResizableNavbar>
        <NavBody>
          <NavbarLogo />
          <NavItems items={navItems} />
          <div className="flex items-center gap-4">
            <NavbarButton variant="secondary">Login</NavbarButton>
            <NavbarButton variant="primary">Book a call</NavbarButton>
          </div>
        </NavBody>
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle isOpen={isMobileMenuOpen} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />
          </MobileNavHeader>
          <MobileNavMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)}>
            {navItems.map((item, idx) => (
              <a key={`mobile-link-${idx}`} href={item.link} onClick={() => setIsMobileMenuOpen(false)} className="relative text-neutral-600 dark:text-neutral-300">
                <span className="block">{item.name}</span>
              </a>
            ))}
            <div className="flex w-full flex-col gap-4">
              <NavbarButton onClick={() => setIsMobileMenuOpen(false)} variant="secondary" className="w-full">Login</NavbarButton>
              <NavbarButton onClick={() => setIsMobileMenuOpen(false)} variant="primary" className="w-full">Book a call</NavbarButton>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </ResizableNavbar>
    </div>
  );
}

// --- YOUR ORIGINAL FOOTER COMPONENT ---
function Footer() {
    const data = {
        facebookLink: 'https://facebook.com/mvpblocks',
        instaLink: 'https://instagram.com/mvpblocks',
        twitterLink: 'https://twitter.com/mvpblocks',
        githubLink: 'https://github.com/mvpblocks',
        dribbbleLink: 'https://dribbble.com/mvpblocks',
        services: { webdev: '/web-development', webdesign: '/web-design', marketing: '/marketing', googleads: '/google-ads', },
        about: { history: '/company-history', team: '/meet-the-team', handbook: '/employee-handbook', careers: '/careers', },
        help: { faqs: '/faqs', support: '/support', livechat: '/live-chat', },
        contact: { email: 'hello@mvpblocks.com', phone: '+91 8637373116', address: 'Kolkata, West Bengal, India', },
        company: { name: 'Mvpblocks', description: 'Building beautiful and functional web experiences with modern technologies. We help startups and businesses create their digital presence.', logo: '/logo.webp', },
    };
    const socialLinks = [ { icon: Facebook, label: 'Facebook', href: data.facebookLink }, { icon: Instagram, label: 'Instagram', href: data.instaLink }, { icon: Twitter, label: 'Twitter', href: data.twitterLink }, { icon: Github, label: 'GitHub', href: data.githubLink }, { icon: Dribbble, label: 'Dribbble', href: data.dribbbleLink }, ];
    const aboutLinks = [ { text: 'Company History', href: data.about.history }, { text: 'Meet the Team', href: data.about.team }, { text: 'Employee Handbook', href: data.about.handbook }, { text: 'Careers', href: data.about.careers }, ];
    const serviceLinks = [ { text: 'Web Development', href: data.services.webdev }, { text: 'Web Design', href: data.services.webdesign }, { text: 'Marketing', href: data.services.marketing }, { text: 'Google Ads', href: data.services.googleads }, ];
    const helpfulLinks = [ { text: 'FAQs', href: data.help.faqs }, { text: 'Support', href: data.help.support }, { text: 'Live Chat', href: data.help.livechat, hasIndicator: true }, ];
    const contactInfo = [ { icon: Mail, text: data.contact.email }, { icon: Phone, text: data.contact.phone }, { icon: MapPin, text: data.contact.address, isAddress: true }, ];

    return (
        <footer className="bg-white dark:bg-gray-900 mt-16 w-full">
            <div className="mx-auto max-w-screen-xl px-4 pt-16 pb-6 sm:px-6 lg:px-8 lg:pt-24">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    <div>
                        <div className="text-primary flex justify-center gap-2 sm:justify-start">
                            <img src="https://assets.aceternity.com/logo-dark.png" alt="logo" className="h-8 w-8 rounded-full"/>
                            <span className="text-2xl font-semibold">{data.company.name}</span>
                        </div>
                        <p className="text-gray-500 dark:text-gray-400 mt-6 max-w-md text-center leading-relaxed sm:max-w-xs sm:text-left">{data.company.description}</p>
                        <ul className="mt-8 flex justify-center gap-6 sm:justify-start md:gap-8">
                            {socialLinks.map(({ icon: Icon, label, href }) => (
                                <li key={label}>
                                    <Link href={href} className="text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white transition">
                                        <span className="sr-only">{label}</span>
                                        <Icon className="size-6" />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4 lg:col-span-2">
                        <div className="text-center sm:text-left">
                            <p className="text-lg font-medium text-gray-900 dark:text-white">About Us</p>
                            <ul className="mt-8 space-y-4 text-sm">{aboutLinks.map(({ text, href }) => (<li key={text}><a className="text-gray-700 dark:text-gray-400 transition hover:text-gray-700/75 dark:hover:text-white/75" href={href}>{text}</a></li>))}</ul>
                        </div>
                        <div className="text-center sm:text-left">
                            <p className="text-lg font-medium text-gray-900 dark:text-white">Our Services</p>
                            <ul className="mt-8 space-y-4 text-sm">{serviceLinks.map(({ text, href }) => (<li key={text}><a className="text-gray-700 dark:text-gray-400 transition hover:text-gray-700/75 dark:hover:text-white/75" href={href}>{text}</a></li>))}</ul>
                        </div>
                        <div className="text-center sm:text-left">
                            <p className="text-lg font-medium text-gray-900 dark:text-white">Helpful Links</p>
                            <ul className="mt-8 space-y-4 text-sm">
                                {helpfulLinks.map(({ text, href, hasIndicator }) => (
                                    <li key={text}>
                                        <a href={href} className={hasIndicator ? 'group flex justify-center gap-1.5 sm:justify-start' : 'text-gray-700 dark:text-gray-400 transition hover:text-gray-700/75 dark:hover:text-white/75'}>
                                            <span className="text-gray-700 dark:text-gray-400 transition hover:text-gray-700/75 dark:hover:text-white/75">{text}</span>
                                            {hasIndicator && (<span className="relative flex size-2"><span className="bg-primary absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" /><span className="bg-primary relative inline-flex size-2 rounded-full" /></span>)}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="text-center sm:text-left">
                            <p className="text-lg font-medium text-gray-900 dark:text-white">Contact Us</p>
                            <ul className="mt-8 space-y-4 text-sm">
                                {contactInfo.map(({ icon: Icon, text, isAddress }) => (
                                    <li key={text}>
                                        <a className="flex items-center justify-center gap-1.5 sm:justify-start" href="#">
                                            <Icon className="text-primary size-5 shrink-0" />
                                            {isAddress ? (<address className="text-gray-700 dark:text-gray-400 flex-1 not-italic">{text}</address>) : (<span className="text-gray-700 dark:text-gray-400 flex-1">{text}</span>)}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="mt-12 border-t border-gray-100 dark:border-gray-800 pt-6">
                    <div className="text-center sm:flex sm:justify-between sm:text-left">
                        <p className="text-sm text-gray-500 dark:text-gray-400"><span className="block sm:inline">All rights reserved.</span></p>
                        <p className="mt-4 text-sm text-gray-500 dark:text-gray-400 sm:order-first sm:mt-0">&copy; 2025 {data.company.name}</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}


// --- VIEW & HELPER COMPONENTS ---

const NumericFullscreen = ({ numericState, updateNumericValue, computeGap, computeRating, handleNumericSubmit, setView }: NumericFullscreenProps) => ( <div className="min-h-screen bg-[#fdfbf7] text-black flex items-start justify-center py-12 px-4"><div className="w-full max-w-4xl"><Card className="bg-white"><CardHeader><CardTitle>Numeric Inputs</CardTitle></CardHeader><CardContent><Table><TableHeader><TableRow><TableHead>Field</TableHead><TableHead>Actual Value</TableHead><TableHead>Default Value</TableHead><TableHead>Gap</TableHead><TableHead>Rating</TableHead></TableRow></TableHeader><TableBody>{numericState.map((f) => (<TableRow key={f.key}><TableCell className="flex items-center gap-2"><span>{f.label}</span><Tooltip><TooltipTrigger asChild><button className="inline-flex items-center p-1 rounded-full hover:bg-gray-100"><Info size={16} /></button></TooltipTrigger><TooltipContent><p className="max-w-xs text-sm">{f.info}</p></TooltipContent></Tooltip></TableCell><TableCell><Input type="number" value={f.value} onChange={(e) => updateNumericValue(f.key, Number(e.target.value))} className="w-40" min={0} /></TableCell><TableCell>{f.defaultValue.toLocaleString()}</TableCell><TableCell>{computeGap(f).toLocaleString()}</TableCell><TableCell>{computeRating(f)} / 5</TableCell></TableRow>))}</TableBody></Table><div className="flex items-center justify-between mt-6"><div className="text-sm text-gray-600">* Fill all numeric fields (required).</div><div className="space-x-2"><Button variant="ghost" onClick={() => setView("landing")}>Cancel</Button><Button onClick={handleNumericSubmit}>Submit</Button></div></div></CardContent></Card></div></div>);
const YesNoFullscreen = ({ yesNoState, toggleYesNo, handleYesNoSubmit, setView }: YesNoFullscreenProps) => ( <div className="min-h-screen bg-[#fdfbf7] text-black flex items-start justify-center py-12 px-4"><div className="w-full max-w-2xl"><Card className="bg-white"><CardHeader><CardTitle>Pre-Requisites (Yes / No)</CardTitle></CardHeader><CardContent><div className="space-y-4">{yesNoState.map((y) => (<div key={y.key} className="flex items-center justify-between"><div className="flex items-center gap-2"><span>{y.label}</span><Tooltip><TooltipTrigger asChild><button className="inline-flex items-center p-1 rounded-full hover:bg-gray-100"><Info size={16} /></button></TooltipTrigger><TooltipContent><p className="max-w-xs text-sm">{y.info}</p></TooltipContent></Tooltip></div><div><Switch checked={y.value} onCheckedChange={(v) => toggleYesNo(y.key, Boolean(v))} /></div></div>))}</div><div className="flex items-center justify-between mt-6"><div className="text-sm text-gray-600">* Toggle each item Yes/No (required).</div><div className="space-x-2"><Button variant="ghost" onClick={() => setView("landing")}>Cancel</Button><Button onClick={handleYesNoSubmit}>Submit</Button></div></div></CardContent></Card></div></div>);
const ResultsFullscreen = ({ finalScore, numericScoreWeighted, yesScoreWeighted, allTips, setView }: ResultsFullscreenProps) => ( <div className="min-h-screen bg-[#fdfbf7] text-black flex items-start justify-center py-12 px-4"><div className="w-full max-w-3xl"><Card className="bg-white"><CardHeader><CardTitle>Final Score & Areas for Improvement</CardTitle></CardHeader><CardContent><div className="flex items-center justify-between"><div><h2 className="text-lg font-semibold">Final Score</h2><p className="text-4xl font-bold">{finalScore} / 100</p><p className="text-sm text-gray-600 mt-1">(Numeric: {numericScoreWeighted.toFixed(1)} / 60, Pre-reqs:{" "}{yesScoreWeighted.toFixed(1)} / 40)</p></div><div className="space-x-2"><Button variant="ghost" onClick={() => setView("landing")}>Back</Button><Button>Download Report</Button></div></div><div className="mt-6"><h3 className="font-semibold">Personalized Tips</h3>{allTips.length === 0 ? (<p className="text-sm text-green-600 mt-2">Great job — all fields meet or exceed targets.</p>) : (<ul className="list-disc pl-5 mt-2 space-y-1 text-sm">{allTips.map((t, i) => (<li key={i}>{t}</li>))}</ul>)}</div><div className="mt-4 text-xs text-gray-500"><p>Notes:</p><ul className="list-disc pl-5"><li>Numeric ratings are computed in 20% steps (each 20% closer to target → +1 rating).</li><li>Defaults are hardcoded. Adjust the initial values in code if benchmarks change.</li></ul></div></CardContent></Card></div></div>);
const CollapsibleSection = ({ title, icon: Icon, isComplete, statusText, isOpen, setIsOpen, children }: CollapsibleSectionProps) => ( <motion.div layout className="w-full max-w-3xl bg-white rounded-xl shadow-md mb-6 border-t-4" style={{borderColor: isComplete ? '#22c55e' : '#e5e7eb'}}><button onClick={() => setIsOpen(!isOpen)} className="w-full p-6 flex justify-between items-center text-left cursor-pointer focus:outline-none"><div className="flex items-center"><Icon className={`w-8 h-8 mr-4 ${isComplete ? 'text-green-500' : 'text-gray-500'}`} /><div><h2 className="text-xl font-semibold text-gray-800">{title}</h2><p className={`text-sm font-semibold ${isComplete ? 'text-green-600' : 'text-gray-500'}`}>{statusText}</p></div></div><motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}><ChevronDown className="w-6 h-6 text-gray-500" /></motion.div></button><AnimatePresence>{isOpen && (<motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1, transition: { opacity: { delay: 0.15 } } }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: 'easeInOut' }} className="overflow-hidden"><div className="px-6 pb-6 border-t border-gray-200">{children}</div></motion.div>)}</AnimatePresence></motion.div>);

function HowItWorks() {
    const steps = [
        { icon: HelpCircle, title: "Answer a Few Qs", description: "Quickly fill out your numbers and check off some yes/no items. No judgement." },
        { icon: TrendingUp, title: "Get Your Score", description: "We instantly calculate your financial health score, giving you a simple snapshot of where you stand." },
        { icon: Sparkles, title: "Level Up with Tips", description: "Receive personalized, jargon-free tips to help you improve your score and build better money habits." }
    ];
    return (
        <div id="how-it-works" className="w-full max-w-5xl mx-auto py-12 px-4 text-center">
             <motion.h2 initial={{opacity: 0, y: 20}} whileInView={{opacity: 1, y: 0}} viewport={{ once: true, amount: 0.8 }} transition={{duration: 0.5}} className="text-3xl font-bold text-gray-800 mb-8">How It Works</motion.h2>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {steps.map((step, index) => (
                    <motion.div 
                        key={step.title}
                        initial={{opacity: 0, y: 20}} 
                        whileInView={{opacity: 1, y: 0}} 
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{duration: 0.5, delay: index * 0.2}}
                        className="flex flex-col items-center p-6 bg-white rounded-xl shadow-md"
                    >
                        <step.icon className="w-12 h-12 mb-4 text-purple-500"/>
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">{step.title}</h3>
                        <p className="text-gray-600 text-sm">{step.description}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

const LandingView = ({ setView, numericDone, yesNoDone }: LandingViewProps) => {
    const [isNumericOpen, setIsNumericOpen] = useState(true);
    const [isYesNoOpen, setIsYesNoOpen] = useState(true);
    const [isResultsOpen, setIsResultsOpen] = useState(true);

    return (
        <div className="min-h-screen bg-[#fdfbf7] text-black flex flex-col items-center pt-12 pb-24 px-4">
            <div className="text-center mb-12">
                <motion.h1 initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{duration: 0.5}} className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">Your Financial Health Checkup</motion.h1>
                <motion.p initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{duration: 0.5, delay: 0.2}} className="text-lg text-gray-600 max-w-2xl mx-auto">
                    Confused about money stuff? 😵‍💫 This quick checkup gives you a simple score and personalized tips to get your finances on track. ✨
                </motion.p>
            </div>

            <CollapsibleSection title="Step 1: Numeric Inputs" icon={Calculator} isComplete={numericDone} statusText={numericDone ? '✓ Completed' : 'Required'} isOpen={isNumericOpen} setIsOpen={setIsNumericOpen}>
                <p className="text-gray-600 mb-4">Enter your key financial figures. This section is crucial for calculating the quantitative part of your score.</p>
                <Button onClick={() => setView("numeric")} className="w-full md:w-auto">{numericDone ? 'Edit Numeric Inputs' : 'Start Step 1'}</Button>
            </CollapsibleSection>

            <CollapsibleSection title="Step 2: Pre-Requisites" icon={CheckSquare} isComplete={yesNoDone} statusText={yesNoDone ? '✓ Completed' : 'Required'} isOpen={isYesNoOpen} setIsOpen={setIsYesNoOpen}>
                <p className="text-gray-600 mb-4">Answer a few simple yes or no questions about your financial habits and planning.</p>
                <Button onClick={() => setView("yesno")} className="w-full md:w-auto">{yesNoDone ? 'Edit Pre-Requisites' : 'Start Step 2'}</Button>
            </CollapsibleSection>

            <AnimatePresence>
                {numericDone && yesNoDone && (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="w-full flex justify-center">
                        <CollapsibleSection title="Results" icon={Trophy} isComplete={true} statusText="Ready to View" isOpen={isResultsOpen} setIsOpen={setIsResultsOpen}>
                            <p className="text-gray-600 mb-4">Great job! Your financial health score is calculated. View your detailed report and personalized tips.</p>
                            <Button onClick={() => setView("results")} className="w-full md:w-auto">View Full Report</Button>
                        </CollapsibleSection>
                    </motion.div>
                )}
            </AnimatePresence>
            
            <HowItWorks />
        </div>
    );
};


// --- MAIN PAGE COMPONENT ---
export default function FinancialHealthFlashcardsPage() {
  const [view, setView] = useState<View>("landing");
  const [numericState, setNumericState] = useState<NumericField[]>(initialNumeric);
  const [yesNoState, setYesNoState] = useState<YesNoField[]>(initialYesNo);
  const [numericDone, setNumericDone] = useState(false);
  const [yesNoDone, setYesNoDone] = useState(false);

  const updateNumericValue = (key: string, newValue: number) => { setNumericState((prev) => prev.map((p) => (p.key === key ? { ...p, value: newValue } : p))); };
  const toggleYesNo = (key: string, checked: boolean) => { setYesNoState((prev) => prev.map((p) => (p.key === key ? { ...p, value: checked } : p))); };
  const computeRating = (f: NumericField) => { const actual = f.value <= 0 ? 0.0001 : f.value; const def = f.defaultValue <= 0 ? 0.0001 : f.defaultValue; let percent = f.higherBetter ? actual / def : def / actual; if (!isFinite(percent) || percent <= 0) percent = 0; if (percent > 1) percent = 1; const rating = Math.max(0, Math.min(5, Math.ceil(percent * 5))); return rating; };
  const computeGap = (f: NumericField) => { return f.defaultValue - f.value; };

  const numericComplete = numericState.every((n) => typeof n.value === "number" && n.value > 0);
  const numericSum = numericState.reduce((acc, cur) => acc + computeRating(cur), 0);
  const numericMax = numericState.length * 5;
  const numericScoreWeighted = (numericSum / numericMax) * 60;
  const yesYesCount = yesNoState.reduce((acc, cur) => acc + (cur.value ? 1 : 0), 0);
  const yesCount = yesNoState.length;
  const yesScoreWeighted = (yesYesCount / yesCount) * 40;
  const finalScore = Math.round(numericScoreWeighted + yesScoreWeighted);

  const numericTips: string[] = [];
  numericState.forEach((f) => { const rating = computeRating(f); if (rating < 5) { const gap = computeGap(f); const tip = `Improve ${f.label}: current ${f.value.toLocaleString()} vs target ${f.defaultValue.toLocaleString()} (gap ${gap.toLocaleString()}). Recommendation: move towards ${f.defaultValue.toLocaleString()}.`; numericTips.push(tip); } });
  const yesNoTips: string[] = [];
  yesNoState.forEach((y) => { if (!y.value) { yesNoTips.push(`Consider improving "${y.label}" — ${y.info}`); } });
  const allTips = [...numericTips, ...yesNoTips];

  const handleNumericSubmit = () => { if (!numericComplete) { alert("Please ensure all numeric fields have values greater than 0."); return; } setNumericDone(true); setView("landing"); };
  const handleYesNoSubmit = () => { setYesNoDone(true); setView("landing"); };
  
  return (
    <TooltipProvider>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          {view === "landing" && <LandingView setView={setView} numericDone={numericDone} yesNoDone={yesNoDone} />}
          {view === "numeric" && <NumericFullscreen numericState={numericState} updateNumericValue={updateNumericValue} computeGap={computeGap} computeRating={computeRating} handleNumericSubmit={handleNumericSubmit} setView={setView} />}
          {view === "yesno" && <YesNoFullscreen yesNoState={yesNoState} toggleYesNo={toggleYesNo} handleYesNoSubmit={handleYesNoSubmit} setView={setView} />}
          {view === "results" && <ResultsFullscreen finalScore={finalScore} numericScoreWeighted={numericScoreWeighted} yesScoreWeighted={yesScoreWeighted} allTips={allTips} setView={setView} />}
        </main>
        <Footer />
      </div>
    </TooltipProvider>
  );
} 