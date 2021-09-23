import Sidebar from "./Sidebar";

interface DashboardProps {
  id: String;
}

function Dashboard({ id }: DashboardProps) {
  return (
    <div className='d-flex' style={{height: '100vh'}}>
      <Sidebar id={id} />
    </div>
  );
}

export default Dashboard;
