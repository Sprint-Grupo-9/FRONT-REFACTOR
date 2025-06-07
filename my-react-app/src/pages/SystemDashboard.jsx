import KpiSection from "../components/system/KpiSection";
import SlidebarSystem from "../components/system/SlidebarSystem";

function SystemDashboard() {
  return (
    <div className="w-full h-full overflow-hidden">
      <div className="w-full h-screen flex flex-start">
        <SlidebarSystem />
        <KpiSection />
      </div>
    </div>
  )
}

export default SystemDashboard;