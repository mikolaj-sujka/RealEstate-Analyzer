import { DashboardSection } from "@/components/DashboardSection/DashboardSection";
import { InvestmentSimulator } from "./components/InvestmentSimulator";

export default function InvestmentCalculatorPage() {
  return (
    <DashboardSection>
      <InvestmentSimulator />
    </DashboardSection>
  );
}
