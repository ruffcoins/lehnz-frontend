# Signup Form Architecture

This document outlines the refactored signup form architecture for improved maintainability, reusability, and testing.

## 📁 File Structure

```
app/signup/page.tsx                 # Main signup page (orchestrator)
hooks/useSignupForm.ts              # Form logic and state management
components/
  ├── signup/
  │   ├── ProgressIndicator.tsx     # Step progress visualization
  │   ├── RoleSelectionStep.tsx     # Step 1: Role selection cards
  │   ├── BasicInfoStep.tsx         # Step 2: Basic user information
  │   ├── ProfessionalInfoStep.tsx  # Step 3: Professional details
  │   └── FinalDetailsStep.tsx      # Step 4: Optional details
  └── ui/
      ├── TagInput.tsx              # Multi-select tag input component
      └── FormField.tsx             # Reusable form field wrapper
lib/
  ├── validators.ts                 # Zod validation schemas
  ├── consts.ts                     # Constants (tech stacks, industries)
  └── signup-utils.ts               # Utility functions
types/signup.ts                     # TypeScript type definitions
```

## 🏗️ Architecture Principles

### 1. **Separation of Concerns**
- **UI Components**: Pure presentation components with minimal logic
- **Custom Hook**: All form state and business logic
- **Validators**: Schema validation separated from UI
- **Constants**: Reusable data definitions

### 2. **Component Composition**
- Each step is an independent, reusable component
- Props drilling minimized through thoughtful component design
- Common patterns extracted into reusable components

### 3. **Type Safety**
- Comprehensive TypeScript interfaces
- Zod schema validation for runtime type safety
- Union types for role-specific form data

## 🔧 Key Components

### `useSignupForm` Hook
**Purpose**: Centralized form state management and business logic

**Responsibilities**:
- Form validation and submission
- Step navigation logic
- Role-specific field management
- Tech stack array handling

**Benefits**:
- Testable in isolation
- Reusable across different UI implementations
- Clear separation of logic from presentation

### Step Components
Each step component follows a consistent pattern:

```typescript
interface StepProps {
  // Step-specific props
  onNext?: () => void;
  onPrev?: () => void;
  // Form instance or specific values
}
```

**Benefits**:
- Self-contained and focused
- Easy to test individual steps
- Reusable in different contexts
- Clear prop interfaces

### `FormField` Component
**Purpose**: Consistent form field styling and error handling

```typescript
<FormField label="Name *" error={errors.name?.message}>
  <Input {...register("name")} />
</FormField>
```

**Benefits**:
- Consistent error display
- Reduced boilerplate
- Centralized field styling

### `TagInput` Component
**Purpose**: Multi-select input with autocomplete

**Features**:
- Search filtering
- Click-outside handling
- Keyboard navigation
- Visual tag management

## 🧪 Testing Strategy

### Unit Tests
- **Hook Testing**: `useSignupForm` logic in isolation
- **Component Testing**: Individual step components
- **Validation Testing**: Zod schemas

### Integration Tests
- **Form Flow**: Multi-step navigation
- **Role Switching**: Conditional field behavior
- **Submission**: End-to-end form submission

### Example Test Structure
```typescript
// hooks/useSignupForm.test.ts
describe('useSignupForm', () => {
  it('should navigate to next step on valid input', () => {
    // Test step navigation logic
  });
});

// components/signup/RoleSelectionStep.test.tsx
describe('RoleSelectionStep', () => {
  it('should call onRoleChange when role is selected', () => {
    // Test role selection behavior
  });
});
```

## 🚀 Benefits of This Architecture

### 1. **Maintainability**
- Single responsibility components
- Clear separation of concerns
- Consistent patterns across codebase

### 2. **Reusability**
- Step components can be reused in different flows
- FormField wrapper reduces duplication
- TagInput component usable throughout app

### 3. **Testability**
- Business logic separated from UI
- Components have clear interfaces
- Mock-friendly hook structure

### 4. **Developer Experience**
- TypeScript provides excellent IDE support
- Clear file organization
- Consistent naming conventions

### 5. **Performance**
- Component-level code splitting possible
- Minimal re-renders through focused state
- Lazy loading of step components

## 📈 Future Enhancements

### Easy Additions
- **Analytics**: Add tracking to each step
- **A/B Testing**: Swap step components easily
- **Internationalization**: Extract strings to constants
- **Accessibility**: Add ARIA labels and keyboard navigation

### Possible Extensions
- **Form Persistence**: Save progress to localStorage
- **Server Validation**: Add async validation hooks
- **Multi-tenant**: Role-specific branding per step
- **Wizard Builder**: Generic wizard component for other forms

## 🔄 Migration Path

If migrating from the original monolithic component:

1. **Extract Constants**: Move hardcoded values to `consts.ts`
2. **Create Hook**: Move state logic to `useSignupForm`
3. **Break Down Components**: Extract each step incrementally
4. **Add Types**: Define interfaces for props and data
5. **Test**: Add tests for each extracted piece

This architecture provides a solid foundation for maintaining and extending the signup flow while keeping the codebase clean and testable.