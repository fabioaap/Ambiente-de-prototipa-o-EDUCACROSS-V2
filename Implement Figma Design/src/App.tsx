import { InteractiveDashboard } from './components/InteractiveDashboard';

export default function App() {
  return (
    <div className="w-screen h-screen overflow-auto bg-[#efefef]">
      <div className="mx-auto relative">
        <InteractiveDashboard />
      </div>
    </div>
  );
}