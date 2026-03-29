import { PenTool } from 'lucide-react';

export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="bg-stone-900 p-1.5 rounded-lg">
        <PenTool className="text-white" size={20} />
      </div>
      <span className="text-xl font-medium tracking-tight text-stone-900">InkWhisper AI</span>
    </div>
  );
}
