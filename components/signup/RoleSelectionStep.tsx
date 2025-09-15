import { PenTool, User } from "lucide-react";
import { SignupRole } from "@/hooks/useSignupForm";
import { ROLES } from "@/lib/consts";

interface RoleSelectionStepProps {
  selectedRole: SignupRole;
  onRoleChange: (role: ROLES.CREATOR | ROLES.USER) => void;
  error?: string;
}

export default function RoleSelectionStep({
  selectedRole,
  onRoleChange,
  error,
}: RoleSelectionStepProps) {
  return (
    <div className="animate-in slide-in-from-right-5 space-y-6 duration-300">
      <div className="text-center">
        <h3 className="mb-2 text-lg font-semibold">Choose Your Role</h3>
        <p className="text-muted-foreground text-sm">This helps us personalize your experience</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <RoleCard
          role={ROLES.CREATOR}
          isSelected={selectedRole === ROLES.CREATOR}
          onSelect={() => onRoleChange(ROLES.CREATOR)}
          icon={<PenTool className="text-primary mr-3 h-6 w-6" />}
          title="Creator"
          description="Share your AI/ML projects, tutorials, and insights with the community"
          details="Perfect for: Researchers, ML Engineers, Data Scientists who want to share knowledge"
        />

        <RoleCard
          role={ROLES.USER}
          isSelected={selectedRole === ROLES.USER}
          onSelect={() => onRoleChange(ROLES.USER)}
          icon={<User className="text-primary mr-3 h-6 w-6" />}
          title="User"
          description="Discover, learn from, and engage with AI/ML content and community"
          details="Perfect for: Students, Developers, Professionals learning AI/ML"
        />
      </div>

      {error && <p className="text-destructive text-center text-sm">{error}</p>}
    </div>
  );
}

interface RoleCardProps {
  role: string;
  isSelected: boolean;
  onSelect: () => void;
  icon: React.ReactNode;
  title: string;
  description: string;
  details: string;
}

function RoleCard({ isSelected, onSelect, icon, title, description, details }: RoleCardProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`rounded-lg border-2 p-6 text-left transition-all duration-200 hover:shadow-md ${
        isSelected
          ? "border-primary bg-primary/5 ring-primary/20 ring-2"
          : "border-border hover:border-primary/50"
      }`}
    >
      <div className="mb-3 flex items-center">
        {icon}
        <span className="font-semibold">{title}</span>
      </div>
      <p className="text-muted-foreground mb-3 text-sm">{description}</p>
      <div className="text-muted-foreground text-xs">{details}</div>
    </button>
  );
}
