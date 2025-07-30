import { AlertCircle, CheckCircle, Info } from "lucide-react";

interface DemoAlertProps {
  type?: "info" | "success" | "warning";
  title: string;
  description: string;
}

export default function DemoAlert({ 
  type = "info", 
  title, 
  description 
}: DemoAlertProps) {
  const icons = {
    info: Info,
    success: CheckCircle,
    warning: AlertCircle,
  };

  const styles = {
    info: "bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-950 dark:border-blue-800 dark:text-blue-200",
    success: "bg-green-50 border-green-200 text-green-800 dark:bg-green-950 dark:border-green-800 dark:text-green-200",
    warning: "bg-yellow-50 border-yellow-200 text-yellow-800 dark:bg-yellow-950 dark:border-yellow-800 dark:text-yellow-200",
  };

  const Icon = icons[type];

  return (
    <div className={`p-4 rounded-lg border ${styles[type]} mb-4`}>
      <div className="flex items-start">
        <Icon className="w-5 h-5 mt-0.5 mr-3 flex-shrink-0" />
        <div>
          <h4 className="font-semibold text-sm mb-1">{title}</h4>
          <p className="text-sm opacity-90">{description}</p>
        </div>
      </div>
    </div>
  );
}