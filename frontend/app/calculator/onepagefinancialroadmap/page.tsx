// "use client";

// import React, { useMemo, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { ChevronDown, Plus, Trash2, Pencil, Save, Calculator, Info, Target, TrendingUp, ShieldCheck, CheckCircle } from "lucide-react";
// import { NavbarDemo } from "@/components/Navbar";
// import Footer4Col from "@/components/footer-column";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
// import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip";


// // --- TYPE DEFINITIONS ---
// // Updated Goal type to allow empty strings for inputs
// type Goal = { 
//   id: string; 
//   name: string; 
//   currentCost: number | string; 
//   years: number | string; 
//   inflation: number | string; 
//   canInvestNow: number | string; 
//   expectedReturn: number | string; 
// };

// // --- HELPER & UTILITY FUNCTIONS ---
// const number = (n: number) => (isFinite(n) ? n : 0);
// const currency = (n: number) => n.toLocaleString("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 });

// // --- UI COMPONENTS ---

// function Section({ title, children, defaultOpen = true, isComplete = false }: { title: string; children: React.ReactNode; defaultOpen?: boolean, isComplete?: boolean }) {
//   const [open, setOpen] = useState<boolean>(defaultOpen);
//   return (
//     <motion.div layout className="bg-white/50 backdrop-blur-sm rounded-xl shadow-md border mb-6">
//       <button onClick={() => setOpen((o) => !o)} className="w-full flex items-center justify-between px-6 py-4 text-left">
//         <div className="flex items-center gap-3">
//           <span className="text-xl font-semibold text-gray-800">{title}</span>
//           {!open && isComplete && (
//             <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2 }}>
//               <CheckCircle className="w-6 h-6 text-green-500" />
//             </motion.div>
//           )}
//         </div>
//         <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
//           <ChevronDown className="w-6 h-6 text-gray-800" />
//         </motion.span>
//       </button>
//       <AnimatePresence initial={false}>
//         {open && (
//           <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
//             <div className="px-6 pb-6 border-t border-gray-200/80 pt-4">
//               {children}
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </motion.div>
//   );
// }

// // Labeled Input with Tooltip, Asterisk, and corrected Grid layout
// type LabeledInputProps = { label: string; value: string | number; onChange: (v: string) => void; info: string; placeholder?: string };

// const LabeledInputLayout = ({ label, info, children }: {label: string; info: string; children: React.ReactNode}) => (
//     <div className="grid grid-cols-2 items-center gap-4">
//         <label htmlFor={label} className="flex items-center gap-2 text-sm text-gray-700 whitespace-nowrap">
//             {label} <span className="text-red-500">*</span>
//             <Tooltip>
//                 <TooltipTrigger asChild><button type="button" className="focus:outline-none"><Info className="w-3.5 h-3.5 text-gray-400 hover:text-gray-600"/></button></TooltipTrigger>
//                 <TooltipContent><p className="max-w-xs">{info}</p></TooltipContent>
//             </Tooltip>
//         </label>
//         {children}
//     </div>
// );

// function LabeledNumber({ label, value, onChange, info, placeholder = "e.g. 35" }: LabeledInputProps) {
//   return (
//     <LabeledInputLayout label={label} info={info}>
//         <Input id={label} type="number" value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} />
//     </LabeledInputLayout>
//   );
// }

// function LabeledAmount({ label, value, onChange, info, placeholder = "e.g. 50000" }: LabeledInputProps) {
//     return (
//         <LabeledInputLayout label={label} info={info}>
//             <Input id={label} type="number" value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}/>
//         </LabeledInputLayout>
//     );
// }

// function LabeledPercent({ label, value, onChange, info, placeholder = "e.g. 12" }: LabeledInputProps) {
//   return (
//     <LabeledInputLayout label={label} info={info}>
//         <div className="flex items-center gap-2">
//             <Input id={label} type="number" value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}/>
//             <span className="text-sm text-gray-500">%</span>
//         </div>
//     </LabeledInputLayout>
//   );
// }

// const TableHeaderWithTooltip = ({ children, info }: { children: React.ReactNode; info: string }) => (
//     <TableHead>
//         <div className="flex items-center gap-1.5">
//             {children}
//             <Tooltip>
//                 <TooltipTrigger asChild><button type="button" className="focus:outline-none"><Info className="w-3.5 h-3.5 text-gray-400 hover:text-gray-600"/></button></TooltipTrigger>
//                 <TooltipContent><p className="max-w-xs">{info}</p></TooltipContent>
//             </Tooltip>
//         </div>
//     </TableHead>
// );

// // --- MAIN PAGE COMPONENT ---
// export default function OnePageFinancialRoadmap() {
//   const [yourAge, setYourAge] = useState<string>("");
//   const [spouseAge, setSpouseAge] = useState<string>("");
//   const [retirementAge, setRetirementAge] = useState<string>("");
//   const [lifeExpectancySelf, setLifeExpectancySelf] = useState<string>("");
//   const [lifeExpectancySpouse, setLifeExpectancySpouse] = useState<string>("");
//   const [monthlyExpenses, setMonthlyExpenses] = useState<string>("");
//   const [otherMonthlyExpenses, setOtherMonthlyExpenses] = useState<string>("");
//   const [retPre, setRetPre] = useState<string>("");
//   const [retPost, setRetPost] = useState<string>("");
//   const [inflation, setInflation] = useState<string>("");
//   const [lumpsumNow, setLumpsumNow] = useState<string>("");
//   const [claimReturn, setClaimReturn] = useState<string>("");
//   const [existingLifeCover, setExistingLifeCover] = useState<string>("");
//   const [emergencyMonths, setEmergencyMonths] = useState<string>("");
//   const [goals, setGoals] = useState<Goal[]>([]);
//   const [editingId, setEditingId] = useState<string | null>(null);

//   const addGoal = () => {
//     const g: Goal = { id: Math.random().toString(36).slice(2), name: "", currentCost: "", years: "", inflation: "", canInvestNow: "", expectedReturn: "", };
//     setGoals((prev) => [...prev, g]);
//     setEditingId(g.id);
//   };
//   const removeGoal = (id: string) => setGoals((prev) => prev.filter((g) => g.id !== id));
//   const updateGoal = (id: string, patch: Partial<Goal>) => setGoals((prev) => prev.map((g) => (g.id === id ? { ...g, ...patch } : g)));

//   const isPersonalDetailsComplete = Number(yourAge) > 0 && Number(spouseAge) > 0 && Number(retirementAge) > 0 && Number(lifeExpectancySelf) > 0 && Number(lifeExpectancySpouse) > 0;
//   const isHouseholdComplete = Number(monthlyExpenses) > 0;
//   const isRetirementComplete = Number(retPre) > 0 && Number(retPost) > 0 && Number(inflation) > 0 && Number(lumpsumNow) >= 0;
//   const isInsuranceComplete = Number(claimReturn) > 0 && Number(existingLifeCover) >= 0 && Number(emergencyMonths) > 0;

//   const retirementYears = Math.max(0, Number(retirementAge) - Number(yourAge));
//   const postRetYears = Math.max(0, Number(lifeExpectancySelf) - Number(retirementAge));
//   const pow = (r: number, n: number) => Math.pow(1 + r, Math.max(0, n));
//   const fv = (pv: number, ratePct: number, years: number) => number(pv * pow(ratePct / 100, years));
//   const monthlyTotalExpenseToday = Number(monthlyExpenses) + Number(otherMonthlyExpenses);
//   const monthlyExpenseAtRetirement = fv(monthlyTotalExpenseToday, Number(inflation), retirementYears);
//   const yearlyExpenseAtRetirement = monthlyExpenseAtRetirement * 12;
//   const realRatePost = (1 + Number(retPost) / 100) / (1 + Number(inflation) / 100) - 1;
//   const retirementCorpusRequired = realRatePost <= 0 ? number(yearlyExpenseAtRetirement * postRetYears) : number(yearlyExpenseAtRetirement / realRatePost);
//   const emergencyFundRequired = monthlyTotalExpenseToday * Number(emergencyMonths);

//   const goalsWithCalc = useMemo(() => {
//     return goals.map((g) => {
//       const futureValue = fv(Number(g.currentCost), Number(g.inflation), Number(g.years));
//       const neededViaSIP = Math.max(0, futureValue - fv(Number(g.canInvestNow), Number(g.expectedReturn), Number(g.years)));
//       const r = Number(g.expectedReturn) / 100 / 12;
//       const n = Number(g.years) * 12;
//       const sip = r === 0 || n === 0 ? neededViaSIP / (n || 1) : neededViaSIP / ((Math.pow(1 + r, n) - 1) / r);
//       return { ...g, futureValue, sipRequired: Math.max(0, sip) } as Goal & { futureValue: number; sipRequired: number };
//     });
//   }, [goals]);

//   const totalGoalsSip = goalsWithCalc.reduce((s, g) => s + g.sipRequired, 0);

//   const [submitting, setSubmitting] = useState<boolean>(false);
//   const [showReport, setShowReport] = useState<boolean>(false);

//   const handleSubmit = async () => {
//     setSubmitting(true);
//     setShowReport(false);
//     await new Promise((res) => setTimeout(res, 1200));
//     setSubmitting(false);
//     setShowReport(true);
//     document.getElementById("report-section")?.scrollIntoView({ behavior: 'smooth' });
//   };

//   return (
//     <TooltipProvider>
//       <div className="min-h-screen bg-gray-50 text-gray-800">
//         <NavbarDemo />
//         <div className="max-w-5xl mx-auto px-4 py-8 md:py-16">
//           <motion.div initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{duration: 0.5}} className="text-center mb-12">
//             <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">Your One-Page Financial Roadmap</h1>
//             <p className="text-lg text-gray-600 max-w-2xl mx-auto">
//                 No more guesswork. Input your details to generate a clear, actionable financial plan in seconds.
//             </p>
//           </motion.div>

//           <Section title="Section 1: Personal Details" defaultOpen isComplete={isPersonalDetailsComplete}>
//             <Card className={`transition-all border-2 ${isPersonalDetailsComplete ? 'border-green-400' : 'border-transparent'}`}>
//                 <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 pt-6">
//                     <LabeledNumber label="Your age:" value={yourAge} onChange={setYourAge} info="Your current age in years."/>
//                     <LabeledNumber label="Spouse's age:" value={spouseAge} onChange={setSpouseAge} info="Your spouse's current age. If not applicable, enter your age."/>
//                     <LabeledNumber label="Retirement age:" value={retirementAge} onChange={setRetirementAge} info="The age you plan to retire." placeholder="e.g. 60"/>
//                     <LabeledNumber label="Life expectancy (self):" value={lifeExpectancySelf} onChange={setLifeExpectancySelf} info="The age you expect to live to." placeholder="e.g. 85"/>
//                     <LabeledNumber label="Life expectancy (spouse):" value={lifeExpectancySpouse} onChange={setLifeExpectancySpouse} info="The age you expect your spouse to live to." placeholder="e.g. 85"/>
//                 </CardContent>
//             </Card>
//           </Section>

//           <Section title="Section 2: Financial Details" defaultOpen isComplete={isHouseholdComplete && isRetirementComplete && isInsuranceComplete}>
//             <div className="space-y-6">
//               <Card className={`transition-all ${isHouseholdComplete ? 'border-t-4 border-green-500' : ''}`}>
//                 <CardHeader><CardTitle className="text-base font-semibold">Household Expenses</CardTitle></CardHeader>
//                 <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <LabeledAmount label="Monthly expenses:" value={monthlyExpenses} onChange={setMonthlyExpenses} info="Your core monthly household expenses (rent, utilities, groceries, etc.)." />
//                   <LabeledAmount label="Other monthly expenses:" value={otherMonthlyExpenses} onChange={setOtherMonthlyExpenses} info="Include other regular monthly costs like EMIs, school fees, etc." placeholder="e.g. 10000" />
//                 </CardContent>
//               </Card>

//               <Card className={`transition-all ${isRetirementComplete ? 'border-t-4 border-green-500' : ''}`}>
//                 <CardHeader><CardTitle className="text-base font-semibold">Retirement & Inflation</CardTitle></CardHeader>
//                 <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <LabeledPercent label="Return (pre-retirement):" value={retPre} onChange={setRetPre} info="Annual % return you expect on your investments until you retire." placeholder="e.g. 15"/>
//                   <LabeledPercent label="Return (post-retirement):" value={retPost} onChange={setRetPost} info="Annual % return you expect on your investments after you retire."/>
//                   <LabeledPercent label="Assumed inflation:" value={inflation} onChange={setInflation} info="The average annual inflation rate you expect over the long term (e.g., 5-6%)." placeholder="e.g. 6"/>
//                   <LabeledAmount label="Lumpsum for retirement:" value={lumpsumNow} onChange={setLumpsumNow} info="Any one-time amount you can invest for retirement right now." placeholder="e.g. 500000"/>
//                 </CardContent>
//               </Card>
              
//               <Card className={`transition-all ${isInsuranceComplete ? 'border-t-4 border-green-500' : ''}`}>
//                 <CardHeader><CardTitle className="text-base font-semibold">Insurance & Emergency Fund</CardTitle></CardHeader>
//                 <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <LabeledAmount label="Existing life cover:" value={existingLifeCover} onChange={setExistingLifeCover} info="Total sum assured from all your existing life insurance policies." placeholder="e.g. 10000000"/>
//                     <LabeledNumber label="Emergency fund (months):" value={emergencyMonths} onChange={setEmergencyMonths} info="How many months of expenses you want to keep as an emergency fund (e.g., 6 months)." placeholder="e.g. 6"/>
//                     <LabeledPercent label="Return on claim proceeds:" value={claimReturn} onChange={setClaimReturn} info="This field is for advanced life cover calculation, often assuming proceeds are invested. A standard value is 8-10%." placeholder="e.g. 8"/>
//                 </CardContent>
//               </Card>
//             </div>
//           </Section>

//           <Section title="Section 3: Financial Goals" defaultOpen>
//               <Table>
//                 <TableCaption>Add and manage your life's financial goals (optional).</TableCaption>
//                 <TableHeader>
//                   <TableRow>
//                     <TableHeaderWithTooltip info="Give your goal a name (e.g., 'Child's Education').">Goal Name</TableHeaderWithTooltip>
//                     <TableHeaderWithTooltip info="How much would this goal cost if you had to pay for it today?">Current Cost</TableHeaderWithTooltip>
//                     <TableHeaderWithTooltip info="In how many years from now do you need the money for this goal?">Years</TableHeaderWithTooltip>
//                     <TableHeaderWithTooltip info="At what % rate will the cost of this goal increase each year? (e.g., education inflation is often high).">Inflation</TableHeaderWithTooltip>
//                     <TableHeaderWithTooltip info="What annual % return do you expect from the investments for this goal?">Return</TableHeaderWithTooltip>
//                     <TableHead>Future Value</TableHead>
//                     <TableHeaderWithTooltip info="Any one-time amount you can invest for this goal right now.">Invest Now</TableHeaderWithTooltip>
//                     <TableHead>Monthly SIP</TableHead>
//                     <TableHead className="text-right">Actions</TableHead>
//                   </TableRow>
//                 </TableHeader>
//                 <TableBody>
//                   {goalsWithCalc.map((g) => {
//                     const isEditing = editingId === g.id
//                     return (
//                       <TableRow key={g.id}>
//                         <TableCell><Input placeholder="e.g. Vacation" value={g.name} onChange={(e) => updateGoal(g.id, { name: e.target.value })} /></TableCell>
//                         <TableCell><Input type="number" placeholder="e.g. 500000" value={g.currentCost} onChange={(e) => updateGoal(g.id, { currentCost: e.target.value })} /></TableCell>
//                         <TableCell><Input type="number" placeholder="e.g. 3" value={g.years} onChange={(e) => updateGoal(g.id, { years: e.target.value })} /></TableCell>
//                         <TableCell><Input type="number" placeholder="e.g. 7" value={g.inflation} onChange={(e) => updateGoal(g.id, { inflation: e.target.value })} /></TableCell>
//                         <TableCell><Input type="number" placeholder="e.g. 12" value={g.expectedReturn} onChange={(e) => updateGoal(g.id, { expectedReturn: e.target.value })} /></TableCell>
//                         <TableCell className="font-medium">{currency(g.futureValue)}</TableCell>
//                         <TableCell><Input type="number" placeholder="e.g. 100000" value={g.canInvestNow} onChange={(e) => updateGoal(g.id, { canInvestNow: e.target.value })} /></TableCell>
//                         <TableCell className="font-semibold text-purple-700">{currency(g.sipRequired)}</TableCell>
//                         <TableCell className="text-right space-x-2">
//                            <Button size="icon" variant="outline" onClick={() => isEditing ? setEditingId(null) : setEditingId(g.id)}>
//                                 {isEditing ? <CheckCircle className="w-4 h-4 text-green-600"/> : <Pencil className="w-4 h-4" />}
//                            </Button>
//                            <Button size="icon" variant="destructive" onClick={() => removeGoal(g.id)}><Trash2 className="w-4 h-4" /></Button>
//                         </TableCell>
//                       </TableRow>
//                     )
//                   })}
//                 </TableBody>
//               </Table>
//               <Button onClick={addGoal} className="mt-4"><Plus className="w-4 h-4 mr-2" /> Add Goal</Button>
//           </Section>

//           <div className="flex justify-center mt-8">
//             <Button onClick={handleSubmit} disabled={submitting} size="lg" className="bg-purple-700 hover:bg-purple-800 text-lg px-8 py-6 rounded-full shadow-lg">
//               {submitting ? (<><Calculator className="w-5 h-5 mr-2 animate-spin" /> Calculating...</>) : "Calculate My Roadmap"}
//             </Button>
//           </div>
//         </div>
        
//         <AnimatePresence>
//             {showReport && (
//                 <motion.div 
//                     id="report-section"
//                     initial={{ opacity: 0, y: 50 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     exit={{ opacity: 0, y: 50 }}
//                     transition={{ duration: 0.5, ease: "easeOut" }}
//                     className="bg-white py-12"
//                 >
//                     <div className="max-w-5xl mx-auto px-4">
//                         <Card className="bg-white border-none shadow-none">
//                             <CardHeader className="text-center">
//                                 <CardTitle className="text-3xl font-bold">Your Financial Roadmap</CardTitle>
//                                 <p className="text-gray-600">Here's a snapshot of your financial targets based on your inputs.</p>
//                             </CardHeader>
//                             <CardContent className="mt-6">
//                                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//                                     <div className="lg:col-span-2 space-y-4">
//                                         <div className="bg-purple-50 p-6 rounded-lg flex items-center justify-between">
//                                             <div className="flex items-center gap-4"><Target className="w-8 h-8 text-purple-600" /> <span className="font-medium text-lg">Retirement Corpus</span></div>
//                                             <span className="font-bold text-2xl text-purple-700">{currency(retirementCorpusRequired)}</span>
//                                         </div>
//                                         <div className="bg-green-50 p-6 rounded-lg flex items-center justify-between">
//                                             <div className="flex items-center gap-4"><ShieldCheck className="w-8 h-8 text-green-600" /> <span className="font-medium text-lg">Emergency Fund</span></div>
//                                             <span className="font-bold text-2xl text-green-700">{currency(emergencyFundRequired)}</span>
//                                         </div>
//                                         <div className="bg-blue-50 p-6 rounded-lg flex items-center justify-between">
//                                             <div className="flex items-center gap-4"><TrendingUp className="w-8 h-8 text-blue-600" /> <span className="font-medium text-lg">Monthly SIP for Goals</span></div>
//                                             <span className="font-bold text-2xl text-blue-700">{currency(totalGoalsSip)}</span>
//                                         </div>
//                                     </div>
//                                     <div className="lg:col-span-1 bg-purple-700 text-white rounded-xl p-8 flex flex-col justify-center text-center">
//                                         <div className="text-sm opacity-90 mb-2">TOTAL MONTHLY SIP</div>
//                                         <div className="text-4xl font-extrabold">{currency(totalGoalsSip)}</div>
//                                         <p className="text-xs opacity-80 mt-2">(This amount is for your defined goals. It does not include retirement savings.)</p>
//                                     </div>
//                                 </div>
//                                 <div className="mt-8 bg-gray-50 p-6 rounded-lg">
//                                     <h3 className="font-semibold text-lg mb-2">Next Steps & Recommendations</h3>
//                                     <ul className="list-disc pl-5 space-y-1 text-gray-700">
//                                         <li>Your total required monthly investment for your goals is <strong>{currency(totalGoalsSip)}</strong>. Ensure this fits your budget.</li>
//                                         <li>You need an emergency fund of <strong>{currency(emergencyFundRequired)}</strong>. Prioritize building this in a safe, liquid asset like a savings account or liquid fund.</li>
//                                         <li>Your retirement requires a corpus of <strong>{currency(retirementCorpusRequired)}</strong>. This calculation does not include a SIP for retirement. You should plan for this separately.</li>
//                                         <li>Review your plan annually or whenever your financial situation changes.</li>
//                                     </ul>
//                                 </div>
//                             </CardContent>
//                         </Card>
//                     </div>
//                 </motion.div>
//             )}
//         </AnimatePresence>

//         <Footer4Col />
//       </div>
//     </TooltipProvider>
//   );
// }





"use client";

import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Plus, Trash2, Pencil, Save, Calculator, Info, Target, TrendingUp, ShieldCheck, CheckCircle, HeartPulse, UserCheck, PiggyBank, Briefcase } from "lucide-react";
import { NavbarDemo } from "@/components/Navbar";
import Footer4Col from "@/components/footer-column";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip";


// --- TYPE DEFINITIONS ---
type Goal = { 
  id: string; 
  name: string; 
  currentCost: number | string; 
  years: number | string; 
  inflation: number | string; 
  canInvestNow: number | string; 
  expectedReturn: number | string; 
};

// --- HELPER & UTILITY FUNCTIONS ---
const number = (n: number) => (isFinite(n) ? n : 0);
const currency = (n: number) => n.toLocaleString("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 });

// --- UI COMPONENTS ---

function Section({ title, children, defaultOpen = true, isComplete = false }: { title: string; children: React.ReactNode; defaultOpen?: boolean, isComplete?: boolean }) {
  const [open, setOpen] = useState<boolean>(defaultOpen);
  return (
    <motion.div layout className="bg-white/50 backdrop-blur-sm rounded-xl shadow-md border mb-6">
      <button onClick={() => setOpen((o) => !o)} className="w-full flex items-center justify-between px-6 py-4 text-left">
        <div className="flex items-center gap-3">
          <span className="text-xl font-semibold text-gray-800">{title}</span>
          {!open && isComplete && (
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2 }}>
              <CheckCircle className="w-6 h-6 text-green-500" />
            </motion.div>
          )}
        </div>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className="w-6 h-6 text-gray-800" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
            <div className="px-6 pb-6 border-t border-gray-200/80 pt-4">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

type LabeledInputProps = { label: string; value: string | number; onChange: (v: string) => void; info: string; placeholder?: string };

const LabeledInputLayout = ({ label, info, children }: {label: string; info: string; children: React.ReactNode}) => (
    <div className="grid grid-cols-2 items-center gap-4">
        <label htmlFor={label} className="flex items-center gap-2 text-sm text-gray-700 whitespace-nowrap">
            {label} <span className="text-red-500">*</span>
            <Tooltip>
                <TooltipTrigger asChild><button type="button" className="focus:outline-none"><Info className="w-3.5 h-3.5 text-gray-400 hover:text-gray-600"/></button></TooltipTrigger>
                <TooltipContent><p className="max-w-xs">{info}</p></TooltipContent>
            </Tooltip>
        </label>
        {children}
    </div>
);

function LabeledNumber({ label, value, onChange, info, placeholder = "e.g. 35" }: LabeledInputProps) {
  return (
    <LabeledInputLayout label={label} info={info}>
        <Input id={label} type="number" value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} />
    </LabeledInputLayout>
  );
}

function LabeledAmount({ label, value, onChange, info, placeholder = "e.g. 50000" }: LabeledInputProps) {
    return (
        <LabeledInputLayout label={label} info={info}>
            <Input id={label} type="number" value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}/>
        </LabeledInputLayout>
    );
}

function LabeledPercent({ label, value, onChange, info, placeholder = "e.g. 12" }: LabeledInputProps) {
  return (
    <LabeledInputLayout label={label} info={info}>
        <div className="flex items-center gap-2">
            <Input id={label} type="number" value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}/>
            <span className="text-sm text-gray-500">%</span>
        </div>
    </LabeledInputLayout>
  );
}

const TableHeaderWithTooltip = ({ children, info }: { children: React.ReactNode; info: string }) => (
    <TableHead>
        <div className="flex items-center gap-1.5">
            {children}
            <Tooltip>
                <TooltipTrigger asChild><button type="button" className="focus:outline-none"><Info className="w-3.5 h-3.5 text-gray-400 hover:text-gray-600"/></button></TooltipTrigger>
                <TooltipContent><p className="max-w-xs">{info}</p></TooltipContent>
            </Tooltip>
        </div>
    </TableHead>
);

// --- MAIN PAGE COMPONENT ---
export default function OnePageFinancialRoadmap() {
  const [yourAge, setYourAge] = useState<string>("39");
  const [spouseAge, setSpouseAge] = useState<string>("35");
  const [retirementAge, setRetirementAge] = useState<string>("60");
  const [lifeExpectancySelf, setLifeExpectancySelf] = useState<string>("85");
  const [lifeExpectancySpouse, setLifeExpectancySpouse] = useState<string>("85");
  const [monthlyExpenses, setMonthlyExpenses] = useState<string>("50000");
  const [otherMonthlyExpenses, setOtherMonthlyExpenses] = useState<string>("10000");
  const [retPre, setRetPre] = useState<string>("15");
  const [retPost, setRetPost] = useState<string>("12");
  const [inflation, setInflation] = useState<string>("5");
  const [lumpsumNow, setLumpsumNow] = useState<string>("0");
  const [claimReturn, setClaimReturn] = useState<string>("10");
  const [existingLifeCover, setExistingLifeCover] = useState<string>("3000000");
  const [requiredHealthCover, setRequiredHealthCover] = useState<string>("1000000");
  const [currentHealthCover, setCurrentHealthCover] = useState<string>("500000");
  const [emergencyMonths, setEmergencyMonths] = useState<string>("6");
  
  const [goals, setGoals] = useState<Goal[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);

  const addGoal = () => {
    const g: Goal = { id: Math.random().toString(36).slice(2), name: "", currentCost: "", years: "", inflation: "", canInvestNow: "", expectedReturn: "", };
    setGoals((prev) => [...prev, g]);
    setEditingId(g.id);
  };
  const removeGoal = (id: string) => setGoals((prev) => prev.filter((g) => g.id !== id));
  const updateGoal = (id: string, patch: Partial<Goal>) => setGoals((prev) => prev.map((g) => (g.id === id ? { ...g, ...patch } : g)));

  const isPersonalDetailsComplete = Number(yourAge) > 0 && Number(spouseAge) > 0 && Number(retirementAge) > 0 && Number(lifeExpectancySelf) > 0 && Number(lifeExpectancySpouse) > 0;
  const isHouseholdComplete = Number(monthlyExpenses) > 0;
  const isRetirementComplete = Number(retPre) > 0 && Number(retPost) > 0 && Number(inflation) > 0 && Number(lumpsumNow) >= 0;
  const isLifeInsuranceComplete = Number(claimReturn) > 0 && Number(existingLifeCover) >= 0;
  const isHealthInsuranceComplete = Number(requiredHealthCover) > 0 && Number(currentHealthCover) >= 0;
  const isEmergencyComplete = Number(emergencyMonths) > 0;

  // --- Financial Calculations ---
  const pow = (r: number, n: number) => Math.pow(1 + r, n);
  const fv = (pv: number, ratePct: number, years: number) => number(pv * pow(ratePct / 100, years));
  const pv = (fv_val: number, ratePct: number, years: number) => number(fv_val / pow(ratePct / 100, years));

  const retirementYears = Math.max(0, Number(retirementAge) - Number(yourAge));
  const monthlyTotalExpenseToday = Number(monthlyExpenses) + Number(otherMonthlyExpenses);
  
  const goalsWithCalc = useMemo(() => {
    return goals.map((g) => {
      const futureValue = fv(Number(g.currentCost), Number(g.inflation), Number(g.years));
      const r = Number(g.expectedReturn) / 100 / 12;
      const n = Number(g.years) * 12;
      const lumpsumFvForGoal = fv(Number(g.canInvestNow), Number(g.expectedReturn), Number(g.years));
      const fvNeededFromSip = futureValue - lumpsumFvForGoal;
      const sip = r === 0 || n === 0 ? fvNeededFromSip / (n || 1) : fvNeededFromSip * (r / (pow(1 + r, n) - 1));
      return { ...g, futureValue, sipRequired: Math.max(0, sip) } as Goal & { futureValue: number; sipRequired: number };
    });
  }, [goals]);

  const totalGoalsSip = goalsWithCalc.reduce((s, g) => s + g.sipRequired, 0);
  const totalGoalsFv = goalsWithCalc.reduce((s, g) => s + g.futureValue, 0);

  // --- Corrected Report Calculations ---
  // Retirement
  const postRetYears = Math.max(0, Number(lifeExpectancySelf) - Number(retirementAge));
  const monthlyExpenseAtRetirement = fv(monthlyTotalExpenseToday, Number(inflation), retirementYears);
  const yearlyExpenseAtRetirement = monthlyExpenseAtRetirement * 12;
  const realRatePost = (1 + Number(retPost) / 100) / (1 + Number(inflation) / 100) - 1;
  const retirementCorpusRequired = realRatePost <= 0 ? number(yearlyExpenseAtRetirement * postRetYears) : number((yearlyExpenseAtRetirement / realRatePost) * (1 - pow(1 + realRatePost, -postRetYears)) * (1 + realRatePost));

  // Retirement SIP (PMT Formula)
  const rSip = Number(retPre) / 100 / 12;
  const nSip = retirementYears * 12;
  const lumpsumFvAtRetirement = fv(Number(lumpsumNow), Number(retPre), retirementYears);
  const corpusNeededViaSip = Math.max(0, retirementCorpusRequired - lumpsumFvAtRetirement);
  const retirementSIP = rSip === 0 || nSip === 0 ? corpusNeededViaSip / (nSip || 1) : corpusNeededViaSip * (rSip / (pow(1 + rSip, nSip) - 1));

  // Life Insurance (Needs Analysis using Present Value)
  const pvOfRetirementCorpus = pv(retirementCorpusRequired, Number(claimReturn), retirementYears);
  const pvOfGoals = goalsWithCalc.reduce((acc, goal) => acc + pv(goal.futureValue, Number(claimReturn), goal.years as number), 0);
  const requiredLifeCover = pvOfRetirementCorpus + pvOfGoals;
  const additionalLifeCover = requiredLifeCover - Number(existingLifeCover);

  // Other Calcs
  const additionalHealthCover = Number(requiredHealthCover) - Number(currentHealthCover);
  const emergencyFundRequired = monthlyTotalExpenseToday * Number(emergencyMonths);
  const totalRequiredSIP = retirementSIP + totalGoalsSip;

  const [submitting, setSubmitting] = useState<boolean>(false);
  const [showReport, setShowReport] = useState<boolean>(false);

  const handleSubmit = async () => {
    setSubmitting(true);
    setShowReport(false);
    await new Promise((res) => setTimeout(res, 1200));
    setSubmitting(false);
    setShowReport(true);
    document.getElementById("report-section")?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gray-50 text-gray-800">
        <NavbarDemo />
        <div className="max-w-5xl mx-auto px-4 py-8 md:py-16">
          <motion.div initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{duration: 0.5}} className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">Your One-Page Financial Roadmap</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                No more guesswork. Input your details to generate a clear, actionable financial plan in seconds.
            </p>
          </motion.div>

          <Section title="Section 1: Personal Details" defaultOpen isComplete={isPersonalDetailsComplete}>
            <Card className={`transition-all border-2 ${isPersonalDetailsComplete ? 'border-green-400' : 'border-transparent'}`}>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 pt-6">
                    <LabeledNumber label="Your age:" value={yourAge} onChange={setYourAge} info="Your current age in years."/>
                    <LabeledNumber label="Spouse's age:" value={spouseAge} onChange={setSpouseAge} info="Your spouse's current age. If not applicable, enter your age."/>
                    <LabeledNumber label="Retirement age:" value={retirementAge} onChange={setRetirementAge} info="The age you plan to retire." placeholder="e.g. 60"/>
                    <LabeledNumber label="Life expectancy (self):" value={lifeExpectancySelf} onChange={setLifeExpectancySelf} info="The age you expect to live to." placeholder="e.g. 85"/>
                    <LabeledNumber label="Life expectancy (spouse):" value={lifeExpectancySpouse} onChange={setLifeExpectancySpouse} info="The age you expect your spouse to live to." placeholder="e.g. 85"/>
                </CardContent>
            </Card>
          </Section>

          <Section title="Section 2: Financial Details" defaultOpen isComplete={isHouseholdComplete && isRetirementComplete && isLifeInsuranceComplete && isHealthInsuranceComplete && isEmergencyComplete}>
            <div className="space-y-6">
              <Card className={`transition-all ${isHouseholdComplete ? 'border-t-4 border-green-500' : ''}`}>
                <CardHeader><CardTitle className="text-base font-semibold">Household Expenses</CardTitle></CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <LabeledAmount label="Monthly expenses:" value={monthlyExpenses} onChange={setMonthlyExpenses} info="Your core monthly household expenses (rent, utilities, groceries, etc.)." />
                  <LabeledAmount label="Other monthly expenses:" value={otherMonthlyExpenses} onChange={setOtherMonthlyExpenses} info="Include other regular monthly costs like EMIs, school fees, etc." placeholder="e.g. 10000" />
                </CardContent>
              </Card>

              <Card className={`transition-all ${isRetirementComplete ? 'border-t-4 border-green-500' : ''}`}>
                <CardHeader><CardTitle className="text-base font-semibold">Retirement & Inflation</CardTitle></CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <LabeledPercent label="Return (pre-retirement):" value={retPre} onChange={setRetPre} info="Annual % return you expect on your investments until you retire." placeholder="e.g. 15"/>
                  <LabeledPercent label="Return (post-retirement):" value={retPost} onChange={setRetPost} info="Annual % return you expect on your investments after you retire."/>
                  <LabeledPercent label="Assumed inflation:" value={inflation} onChange={setInflation} info="The average annual inflation rate you expect over the long term (e.g., 5-6%)." placeholder="e.g. 6"/>
                  <LabeledAmount label="Lumpsum for retirement:" value={lumpsumNow} onChange={setLumpsumNow} info="Any one-time amount you can invest for retirement right now." placeholder="e.g. 500000"/>
                </CardContent>
              </Card>

              <Card className={`transition-all ${isLifeInsuranceComplete ? 'border-t-4 border-green-500' : ''}`}>
                <CardHeader><CardTitle className="text-base font-semibold">Life Insurance</CardTitle></CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <LabeledAmount label="Existing Life Cover + Assets:" value={existingLifeCover} onChange={setExistingLifeCover} info="Total sum assured from all your existing life insurance policies plus any existing financial assets." placeholder="e.g. 5000000"/>
                    <LabeledPercent label="Return on claim proceeds:" value={claimReturn} onChange={setClaimReturn} info="The annual % return you expect your family could earn by investing the insurance payout." placeholder="e.g. 8"/>
                </CardContent>
              </Card>

              <Card className={`transition-all ${isHealthInsuranceComplete && isEmergencyComplete ? 'border-t-4 border-green-500' : ''}`}>
                <CardHeader><CardTitle className="text-base font-semibold">Health Insurance & Emergency Fund</CardTitle></CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <LabeledAmount label="Required Health Cover:" value={requiredHealthCover} onChange={setRequiredHealthCover} info="The ideal total health cover you should have for your family." placeholder="e.g. 1000000" />
                    <LabeledAmount label="Current Health Cover:" value={currentHealthCover} onChange={setCurrentHealthCover} info="The total coverage of your existing health insurance policy." placeholder="e.g. 500000" />
                    <LabeledNumber label="Emergency fund (months):" value={emergencyMonths} onChange={setEmergencyMonths} info="How many months of expenses you want to keep as an emergency fund (e.g., 6 months)." placeholder="e.g. 6"/>
                </CardContent>
              </Card>
            </div>
          </Section>

          <Section title="Section 3: Financial Goals" defaultOpen>
              <Table>
                <TableCaption>Add and manage your life's financial goals (optional).</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHeaderWithTooltip info="Give your goal a name (e.g., 'Child's Education').">Goal Name</TableHeaderWithTooltip>
                    <TableHeaderWithTooltip info="How much would this goal cost if you had to pay for it today?">Current Cost</TableHeaderWithTooltip>
                    <TableHeaderWithTooltip info="In how many years from now do you need the money?">Years</TableHeaderWithTooltip>
                    <TableHeaderWithTooltip info="Expected annual cost increase for this goal.">Inflation</TableHeaderWithTooltip>
                    <TableHeaderWithTooltip info="Expected annual return from investments for this goal.">Return</TableHeaderWithTooltip>
                    <TableHead>Future Value</TableHead>
                    <TableHeaderWithTooltip info="Any one-time amount you can invest for this goal now.">Invest Now</TableHeaderWithTooltip>
                    <TableHead>Monthly SIP</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {goalsWithCalc.map((g) => {
                    const isEditing = editingId === g.id
                    return (
                      <TableRow key={g.id}>
                        <TableCell><Input placeholder="e.g. Vacation" value={g.name} onChange={(e) => updateGoal(g.id, { name: e.target.value })} /></TableCell>
                        <TableCell><Input type="number" placeholder="e.g. 500000" value={g.currentCost} onChange={(e) => updateGoal(g.id, { currentCost: e.target.value })} /></TableCell>
                        <TableCell><Input type="number" placeholder="e.g. 3" value={g.years} onChange={(e) => updateGoal(g.id, { years: e.target.value })} /></TableCell>
                        <TableCell><Input type="number" placeholder="e.g. 7" value={g.inflation} onChange={(e) => updateGoal(g.id, { inflation: e.target.value })} /></TableCell>
                        <TableCell><Input type="number" placeholder="e.g. 12" value={g.expectedReturn} onChange={(e) => updateGoal(g.id, { expectedReturn: e.target.value })} /></TableCell>
                        <TableCell className="font-medium">{currency(g.futureValue)}</TableCell>
                        <TableCell><Input type="number" placeholder="e.g. 100000" value={g.canInvestNow} onChange={(e) => updateGoal(g.id, { canInvestNow: e.target.value })} /></TableCell>
                        <TableCell className="font-semibold text-purple-700">{currency(g.sipRequired)}</TableCell>
                        <TableCell className="text-right space-x-2">
                           <Button size="icon" variant="outline" onClick={() => isEditing ? setEditingId(null) : setEditingId(g.id)}>
                                {isEditing ? <CheckCircle className="w-4 h-4 text-green-600"/> : <Pencil className="w-4 h-4" />}
                           </Button>
                           <Button size="icon" variant="destructive" onClick={() => removeGoal(g.id)}><Trash2 className="w-4 h-4" /></Button>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
              <Button onClick={addGoal} className="mt-4"><Plus className="w-4 h-4 mr-2" /> Add Goal</Button>
          </Section>

          <div className="flex justify-center mt-8">
            <Button onClick={handleSubmit} disabled={submitting} size="lg" className="bg-purple-700 hover:bg-purple-800 text-lg px-8 py-6 rounded-full shadow-lg">
              {submitting ? (<><Calculator className="w-5 h-5 mr-2 animate-spin" /> Calculating...</>) : "Calculate My Roadmap"}
            </Button>
          </div>
        </div>
        
        <AnimatePresence>
            {showReport && (
                <motion.div 
                    id="report-section"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 50 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="bg-white py-12"
                >
                    <div className="max-w-5xl mx-auto px-4">
                        <Card className="bg-white border-none shadow-none">
                            <CardHeader className="text-center">
                                <CardTitle className="text-3xl font-bold">Your Financial Roadmap</CardTitle>
                                <p className="text-gray-600">Here's the detailed breakdown based on your inputs.</p>
                            </CardHeader>
                            <CardContent className="mt-6 space-y-8">
                                
                                <div className="p-6 bg-gray-50 rounded-lg">
                                    <div className="flex items-center gap-3 mb-4"><UserCheck className="w-8 h-8 text-blue-600"/><h3 className="text-xl font-semibold">Life Insurance</h3></div>
                                    <div className="space-y-2 text-lg">
                                        <div className="flex justify-between items-center"><span>Required Life Cover:</span><span className="font-bold text-gray-700 text-2xl">{currency(requiredLifeCover)}</span></div>
                                        <div className="flex justify-between items-center pt-2 border-t"><span className="text-blue-600">Required Additional Cover:</span><span className="font-bold text-blue-600 text-2xl">{currency(additionalLifeCover)}</span></div>
                                    </div>
                                </div>

                                <div className="p-6 bg-gray-50 rounded-lg">
                                    <div className="flex items-center gap-3 mb-4"><HeartPulse className="w-8 h-8 text-red-600"/><h3 className="text-xl font-semibold">Health Insurance</h3></div>
                                    <div className="space-y-2 text-lg">
                                        <div className="flex justify-between items-center"><span className="text-red-600">Additional Cover Needed:</span><span className="font-bold text-red-600 text-2xl">{currency(additionalHealthCover)}</span></div>
                                    </div>
                                </div>
                                
                                <div className="p-6 bg-gray-50 rounded-lg">
                                    <div className="flex items-center gap-3 mb-4"><ShieldCheck className="w-8 h-8 text-green-600"/><h3 className="text-xl font-semibold">Emergency Fund</h3></div>
                                    <div className="space-y-2 text-lg">
                                        <div className="flex justify-between items-center"><span className="text-green-600">Total Emergency Fund:</span><span className="font-bold text-green-600 text-2xl">{currency(emergencyFundRequired)}</span></div>
                                    </div>
                                </div>

                                <div className="p-6 bg-gray-50 rounded-lg">
                                    <div className="flex items-center gap-3 mb-4"><Briefcase className="w-8 h-8 text-yellow-600"/><h3 className="text-xl font-semibold">Retirement Details</h3></div>
                                    <div className="space-y-2 text-lg">
                                        <div className="flex justify-between items-center"><span>Required Corpus:</span><span className="font-bold text-gray-700 text-2xl">{currency(retirementCorpusRequired)}</span></div>
                                        <div className="flex justify-between items-center pt-2 border-t"><span className="text-yellow-600">Required Monthly SIP:</span><span className="font-bold text-yellow-600 text-2xl">{currency(retirementSIP)}</span></div>
                                    </div>
                                </div>
                                
                                <div className="bg-purple-700 text-white rounded-xl p-8 flex flex-col items-center text-center">
                                    <div className="flex items-center gap-3"><PiggyBank className="w-8 h-8"/><h3 className="text-xl font-semibold">Total Required Monthly Investment</h3></div>
                                    <div className="text-5xl font-extrabold my-2">{currency(totalRequiredSIP)}</div>
                                    <p className="text-sm opacity-80">(Retirement SIP + Goals SIP)</p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>

        <Footer4Col />
      </div>
    </TooltipProvider>
  );
}