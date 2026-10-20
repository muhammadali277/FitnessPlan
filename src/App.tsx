import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Assessment from "@/components/Assessment";
import DietAudit from "@/components/DietAudit";
import MacroLab from "@/components/MacroLab";
import MealPlan from "@/components/MealPlan";
import Pantry from "@/components/Pantry";
import Training from "@/components/Training";
import Schedule from "@/components/Schedule";
import Outcomes from "@/components/Outcomes";
import Tracker from "@/components/Tracker";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";

export default function App() {
  return (
    <div className="min-h-screen bg-[#07090c] text-zinc-200 antialiased selection:bg-lime-400/30">
      <Nav />
      <main>
        <Hero />

        <div className="relative">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
          <Assessment />
        </div>

        <div className="relative bg-white/[0.012]">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <DietAudit />
        </div>

        <MacroLab />

        <div className="relative bg-white/[0.012]">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <MealPlan />
        </div>

        <Pantry />

        <div className="relative bg-white/[0.012]">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <Training />
        </div>

        <Schedule />

        <div className="relative bg-white/[0.012]">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <Outcomes />
        </div>

        <Tracker />

        <div className="relative bg-white/[0.012]">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <Faq />
        </div>
      </main>
      <Footer />
    </div>
  );
}
