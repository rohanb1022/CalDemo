"use client";

import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Plus, Trash2, Pencil, Save, X, Calculator } from "lucide-react";
import Footer4Col from "@/components/footer-column";
import { NavbarDemo } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"


type Goal = {
  id: string;
  name: string;
  currentCost: number;
  years: number;
  inflation: number; // % per annum
  canInvestNow: number; // one-time now
  expectedReturn: number; // % p.a. based on horizon
};

function Section({ title, children, defaultOpen = true }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState<boolean>(defaultOpen);
  return (
    <motion.div layout className="bg-white rounded-xl shadow-md border mb-4">
      <button onClick={() => setOpen((o) => !o)} className="w-full flex items-center justify-between px-4 py-3 text-left">
        <span className="font-semibold text-gray-800">{title}</span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className="w-5 h-5 text-gray-800" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="px-4 pb-4 border-t">
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

const number = (n: number) => (isFinite(n) ? n : 0);
const currency = (n: number) => n.toLocaleString("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 });

export default function OnePageFinancialRoadmap() {
  // Section 1: Personal inputs
  const [yourAge, setYourAge] = useState<number>(35);
  const [spouseAge, setSpouseAge] = useState<number>(33);
  const [retirementAge, setRetirementAge] = useState<number>(60);
  const [lifeExpectancySelf, setLifeExpectancySelf] = useState<number>(85);
  const [lifeExpectancySpouse, setLifeExpectancySpouse] = useState<number>(85);

  // Section 2: Financial details
  const [monthlyExpenses, setMonthlyExpenses] = useState<number>(50000);
  const [otherMonthlyExpenses, setOtherMonthlyExpenses] = useState<number>(10000);
  // Retirement details
  const [retPre, setRetPre] = useState<number>(15); // expected return upto retirement
  const [retPost, setRetPost] = useState<number>(12); // expected return post retirement
  const [inflation, setInflation] = useState<number>(5);
  const [lumpsumNow, setLumpsumNow] = useState<number>(0);
  // Insurance and emergency
  const [claimReturn, setClaimReturn] = useState<number>(10);
  const [existingLifeCover, setExistingLifeCover] = useState<number>(3000000);
  const [emergencyMonths, setEmergencyMonths] = useState<number>(6);

  // Section 3: Goals
  const [goals, setGoals] = useState<Goal[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);

  const addGoal = () => {
    const g: Goal = {
      id: Math.random().toString(36).slice(2),
      name: "New Goal",
      currentCost: 0,
      years: 5,
      inflation: 6,
      canInvestNow: 0,
      expectedReturn: 12,
    };
    setGoals((prev) => [...prev, g]);
    setEditingId(g.id);
  };

  const removeGoal = (id: string) => setGoals((prev) => prev.filter((g) => g.id !== id));
  const updateGoal = (id: string, patch: Partial<Goal>) => setGoals((prev) => prev.map((g) => (g.id === id ? { ...g, ...patch } : g)));

  // Derived calculations
  const retirementYears = Math.max(0, retirementAge - yourAge);
  const postRetYears = Math.max(0, lifeExpectancySelf - retirementAge);

  // Future value helpers
  const pow = (r: number, n: number) => Math.pow(1 + r, Math.max(0, n));
  const fv = (pv: number, ratePct: number, years: number) => number(pv * pow(ratePct / 100, years));
  const annuityFV = (pmt: number, ratePct: number, years: number) => {
    const r = ratePct / 100;
    if (r === 0) return number(pmt * years);
    return number(pmt * ((pow(r, years) - 1) / r));
  };

  // Retirement corpus calculation
  const monthlyTotalExpenseToday = monthlyExpenses + otherMonthlyExpenses;
  const monthlyExpenseAtRetirement = fv(monthlyTotalExpenseToday, inflation, retirementYears);
  const yearlyExpenseAtRetirement = monthlyExpenseAtRetirement * 12;
  // Real rate post retirement
  const realRatePost = (1 + retPost / 100) / (1 + inflation / 100) - 1;
  const retirementCorpusRequired = realRatePost <= 0
    ? number(yearlyExpenseAtRetirement * postRetYears)
    : number(yearlyExpenseAtRetirement / realRatePost);

  // Emergency fund
  const emergencyFundRequired = monthlyTotalExpenseToday * emergencyMonths;

  // Goals FV and SIP requirement per goal
  const goalsWithCalc = useMemo(() => {
    return goals.map((g) => {
      const futureValue = fv(g.currentCost, g.inflation, g.years);
      const investNow = g.canInvestNow;
      const neededViaSIP = Math.max(0, futureValue - investNow * pow(g.expectedReturn / 100, g.years));
      // SIP PMT using future value of annuity formula: needed = pmt * [((1+r)^n - 1)/r]
      const r = g.expectedReturn / 100 / 12;
      const n = g.years * 12;
      const sip = r === 0 ? neededViaSIP / n : neededViaSIP / ((Math.pow(1 + r, n) - 1) / r);
      return { ...g, futureValue, sipRequired: Math.max(0, sip) } as Goal & { futureValue: number; sipRequired: number };
    });
  }, [goals]);

  const totalGoalsSip = goalsWithCalc.reduce((s, g) => s + g.sipRequired, 0);

  // Submit flow
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [showReport, setShowReport] = useState<boolean>(false);

  const handleSubmit = async () => {
    setSubmitting(true);
    setShowReport(false);
    await new Promise((res) => setTimeout(res, 1200));
    setSubmitting(false);
    setShowReport(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 text-black">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <NavbarDemo />

        <div className="mt-6 gap-6">
          <div className="lg:col-span-2">
            <Section title="Section 1: Personal Details" defaultOpen>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2 text-black">
                <LabeledNumber label="Your age:" value={yourAge} onChange={setYourAge} />
                <LabeledNumber label="Spouse's age:" value={spouseAge} onChange={setSpouseAge} />
                <LabeledNumber label="Retirement age (self):" value={retirementAge} onChange={setRetirementAge} />
                <LabeledNumber label="Life expectancy (self):" value={lifeExpectancySelf} onChange={setLifeExpectancySelf} />
                <LabeledNumber label="Life expectancy (spouse):" value={lifeExpectancySpouse} onChange={setLifeExpectancySpouse} />
              </div>
            </Section>

            <Section title="Section 2: Financial Details" defaultOpen>
              <div className="space-y-6 mt-4 ">
                <Card>
                  <CardHeader>
                    <CardTitle>Household Expenses</CardTitle>
                  </CardHeader>
                  <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <LabeledAmount label="Monthly expenses:" value={monthlyExpenses} onChange={setMonthlyExpenses} />
                    <LabeledAmount label="Other monthly expenses:" value={otherMonthlyExpenses} onChange={setOtherMonthlyExpenses} />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Retirement Details</CardTitle>
                  </CardHeader>
                  <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <LabeledPercent label="Return expected upto retirement:" value={retPre} onChange={setRetPre} />
                    <LabeledPercent label="Return expected post retirement:" value={retPost} onChange={setRetPost} />
                    <LabeledPercent label="Assumed inflation:" value={inflation} onChange={setInflation} />
                    <LabeledAmount label="Lumpsum can invest now:" value={lumpsumNow} onChange={setLumpsumNow} />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Insurance & Emergency</CardTitle>
                  </CardHeader>
                  <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <LabeledPercent label="Expected return on claim proceeds:" value={claimReturn} onChange={setClaimReturn} />
                    <LabeledAmount label="Existing life cover + fin assets:" value={existingLifeCover} onChange={setExistingLifeCover} />
                    <LabeledNumber label="Emergency fund months:" value={emergencyMonths} onChange={setEmergencyMonths} />
                  </CardContent>
                </Card>
              </div>
            </Section>

    <Section title="Section 3: Financial Goals" defaultOpen>
      <div className="space-y-3">
        
        <Table>
          <TableCaption>Your financial goals</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Goal Name</TableHead>
              <TableHead>Current Cost</TableHead>
              <TableHead>Years</TableHead>
              <TableHead>Inflation</TableHead>
              <TableHead>Expected Return</TableHead>
              <TableHead>Future Value</TableHead>
              <TableHead>Can Invest Now</TableHead>
              <TableHead>Reqd. SIP</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {goalsWithCalc.map((g) => {
              const isEditing = editingId === g.id
              return (
                <TableRow key={g.id}>
                  <TableCell>
                    {isEditing ? (
                      <Input value={g.name} onChange={(e) => updateGoal(g.id, { name: e.target.value })} />
                    ) : (
                      g.name
                    )}
                  </TableCell>
                  <TableCell>
                    {isEditing ? (
                      <Input type="number" value={g.currentCost} onChange={(e) => updateGoal(g.id, { currentCost: Number(e.target.value) })} />
                    ) : (
                      currency(g.currentCost)
                    )}
                  </TableCell>
                  <TableCell>
                    {isEditing ? (
                      <Input type="number" value={g.years} onChange={(e) => updateGoal(g.id, { years: Number(e.target.value) })} />
                    ) : (
                      g.years
                    )}
                  </TableCell>
                  <TableCell>
                    {isEditing ? (
                      <Input type="number" value={g.inflation} onChange={(e) => updateGoal(g.id, { inflation: Number(e.target.value) })} />
                    ) : (
                      `${g.inflation}%`
                    )}
                  </TableCell>
                  <TableCell>
                    {isEditing ? (
                      <Input type="number" value={g.expectedReturn} onChange={(e) => updateGoal(g.id, { expectedReturn: Number(e.target.value) })} />
                    ) : (
                      `${g.expectedReturn}%`
                    )}
                  </TableCell>
                  <TableCell>{currency(g.futureValue)}</TableCell>
                  <TableCell>
                    <Input type="number" value={g.canInvestNow} onChange={(e) => updateGoal(g.id, { canInvestNow: Number(e.target.value) })} />
                  </TableCell>
                  <TableCell className="font-semibold">{currency(g.sipRequired)}</TableCell>
                  <TableCell className="text-right space-x-2">
                    {isEditing ? (
                      <>
                        <Button size="sm" onClick={() => setEditingId(null)}>
                          <Save className="w-4 h-4 mr-1" /> Save
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => removeGoal(g.id)}>
                          <Trash2 className="w-4 h-4 mr-1" /> Delete
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button size="sm" variant="secondary" onClick={() => setEditingId(g.id)}>
                          <Pencil className="w-4 h-4 mr-1" /> Edit
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => removeGoal(g.id)}>
                          <Trash2 className="w-4 h-4 mr-1" /> Delete
                        </Button>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>

        <Button onClick={addGoal} className="mt-2">
          <Plus className="w-4 h-4 mr-1" /> Add Goal
        </Button>
      </div>
    </Section>


            <div className="flex items-center gap-3 mt-4">
              <Button onClick={handleSubmit} disabled={submitting} className="bg-gray-900 hover:bg-gray-800">
                {submitting ? (
                  <span className="inline-flex items-center gap-2"><Calculator className="w-4 h-4 animate-spin" /> Calculating...</span>
                ) : (
                  "Submit"
                )}
              </Button>
              <span className="text-sm text-gray-600">We will compute retirement corpus, emergency fund, and total required SIP.</span>
            </div>
          </div>

          
        </div>

        {showReport && (
          <div className="mt-8">
            <Card className="bg-white">
              <CardHeader>
                <CardTitle>Generated Report</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 space-y-3">
                    <div className="rounded-lg p-4" style={{ backgroundColor: "#f3e8ff" }}>
                      <div className="flex justify-between"><span className="font-medium">Reqd. retirement corpus</span><span className="font-bold" style={{ color: "#6d28d9" }}>{currency(retirementCorpusRequired)}</span></div>
                    </div>
                    <div className="rounded-lg p-4" style={{ backgroundColor: "#f3e8ff" }}>
                      <div className="flex justify-between"><span className="font-medium">Emergency fund to keep</span><span className="font-bold" style={{ color: "#6d28d9" }}>{currency(emergencyFundRequired)}</span></div>
                    </div>
                    <div className="rounded-lg p-4" style={{ backgroundColor: "#f3e8ff" }}>
                      <div className="flex justify-between"><span className="font-medium">Total required SIP (goals)</span><span className="font-bold" style={{ color: "#6d28d9" }}>{currency(totalGoalsSip)}</span></div>
                    </div>
                  </div>
                  <div className="lg:col-span-1">
                    <div className="rounded-xl p-6 text-white" style={{ backgroundColor: "#6d28d9" }}>
                      <div className="text-sm opacity-90 mb-1">TOTAL REQUIRED SIP AMOUNT</div>
                      <div className="text-3xl font-extrabold">{currency(totalGoalsSip)}</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        <Footer4Col />
      </div>
    </div>
  );
}

function LabeledNumber({ label, value, onChange }: { label: string; value: number; onChange: (v: number) => void }) {
  return (
    <label className="flex items-center justify-between gap-3">
      <span className="text-sm text-gray-700 whitespace-nowrap">{label}</span>
      <Input type="number" value={value} onChange={(e) => onChange(Number(e.target.value))} className="max-w-[180px]" />
    </label>
  );
}

function LabeledAmount({ label, value, onChange }: { label: string; value: number; onChange: (v: number) => void }) {
  return (
    <label className="flex items-center justify-between gap-3">
      <span className="text-sm text-gray-700 whitespace-nowrap">{label}</span>
      <Input type="number" value={value} onChange={(e) => onChange(Number(e.target.value))} className="max-w-[220px]" />
    </label>
  );
}

function LabeledPercent({ label, value, onChange }: { label: string; value: number; onChange: (v: number) => void }) {
  return (
    <label className="flex items-center justify-between gap-3">
      <span className="text-sm text-gray-700 whitespace-nowrap">{label}</span>
      <div className="flex items-center gap-1">
        <Input type="number" value={value} onChange={(e) => onChange(Number(e.target.value))} className="w-[140px]" />
        <span className="text-sm text-gray-500">%</span>
      </div>
    </label>
  );
}


