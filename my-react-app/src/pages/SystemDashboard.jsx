import HeaderSystem from "../components/system/HeaderSystem";
import KpiSection from "../components/system/KpiSection";
import SidebarSystem from "../components/system/SidebarSystem";

function SystemDashboard() {

  return (
    <div className="w-full h-full overflow-hidden" >
      <HeaderSystem text="Agendamentos" />
      <div className="w-full h-screen flex flex-start ">
        {/* <SidebarSystem appointments /> */}
        <KpiSection />
      </div>
    </div>
  )
}


export default SystemDashboard;