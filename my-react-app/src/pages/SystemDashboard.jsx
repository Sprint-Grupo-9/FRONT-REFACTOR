import HeaderSystem from "../components/system/HeaderSystem";
import KpiSection from "../components/system/KpiSection";
import SidebarSystem from "../components/system/SidebarSystem";

function SystemDashboard() {

  return (
    <>
      <HeaderSystem text="Agendamentos" />
      <div className="w-full h-screen flex flex-start">
        <SidebarSystem appointments />
        <KpiSection />
      </div>
    </>
  )
}


export default SystemDashboard;