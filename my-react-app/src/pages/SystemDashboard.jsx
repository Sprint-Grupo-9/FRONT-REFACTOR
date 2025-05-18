import HeaderSystem from "../components/system/HeaderSystem";
import KpiSection from "../components/system/KpiSection";
import SidebarSystem from "../components/system/SidebarSystem";

function SystemDashboard() {

return (
    <div className="min-h-screen bg-slate-100">
      <HeaderSystem text="Agendamentos" />
      <SidebarSystem appointments />
      <KpiSection />
    </div>
  )
}


export default SystemDashboard;