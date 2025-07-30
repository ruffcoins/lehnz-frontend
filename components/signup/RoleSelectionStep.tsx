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
  error 
}: RoleSelectionStepProps) {
  return (
    <div className="space-y-6 animate-in slide-in-from-right-5 duration-300">
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-2">Choose Your Role</h3>
        <p className="text-sm text-muted-foreground">
          This helps us personalize your experience
        </p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        <RoleCard
          role={ROLES.CREATOR}
          isSelected={selectedRole === ROLES.CREATOR}
          onSelect={() => onRoleChange(ROLES.CREATOR)}
          icon={<PenTool className="w-6 h-6 text-primary mr-3" />}
          title="Creator"
          description="Share your AI/ML projects, tutorials, and insights with the community"
          details="Perfect for: Researchers, ML Engineers, Data Scientists who want to share knowledge"
        />
        
        <RoleCard
          role={ROLES.USER}
          isSelected={selectedRole === ROLES.USER}
          onSelect={() => onRoleChange(ROLES.USER)}
          icon={<User className="w-6 h-6 text-primary mr-3" />}
          title="User"
          description="Discover, learn from, and engage with AI/ML content and community"
          details="Perfect for: Students, Developers, Professionals learning AI/ML"
        />
      </div>
      
      {error && (
        <p className="text-sm text-destructive text-center">{error}</p>
      )}
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

function RoleCard({ 
  isSelected, 
  onSelect, 
  icon, 
  title, 
  description, 
  details 
}: RoleCardProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`p-6 rounded-lg border-2 text-left transition-all duration-200 hover:shadow-md ${
        isSelected
          ? "border-primary bg-primary/5 ring-2 ring-primary/20"
          : "border-border hover:border-primary/50"
      }`}
    >
      <div className="flex items-center mb-3">
        {icon}
        <span className="font-semibold">{title}</span>
      </div>
      <p className="text-sm text-muted-foreground mb-3">
        {description}
      </p>
      <div className="text-xs text-muted-foreground">
        {details}
      </div>
    </button>
  );
}