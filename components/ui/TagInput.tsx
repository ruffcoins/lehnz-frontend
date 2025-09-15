import { useEffect, useRef, useState } from "react";
import { Input } from "./input";

const TagInput = ({
  options,
  value = [],
  onChange,
  placeholder,
  error,
}: {
  options: string[];
  value: string[];
  onChange: (tags: string[]) => void;
  placeholder: string;
  error?: string;
}) => {
  const [inputValue, setInputValue] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredOptions = options.filter(
    option => !value.includes(option) && option.toLowerCase().includes(inputValue.toLowerCase())
  );

  const addTag = (tag: string) => {
    if (!value.includes(tag)) {
      onChange([...value, tag]);
    }
    setInputValue("");
    setShowSuggestions(false);
  };

  const removeTag = (tagToRemove: string) => {
    onChange(value.filter(tag => tag !== tagToRemove));
  };

  return (
    <div className="space-y-2">
      <div className="relative" ref={dropdownRef}>
        <Input
          value={inputValue}
          onChange={e => {
            setInputValue(e.target.value);
            setShowSuggestions(true);
          }}
          onFocus={() => setShowSuggestions(true)}
          onKeyDown={e => {
            if (e.key === "Escape") {
              setShowSuggestions(false);
            }
          }}
          placeholder={placeholder}
          className={error ? "border-destructive" : ""}
        />

        {showSuggestions && filteredOptions.length > 0 && (
          <div className="bg-background absolute top-full right-0 left-0 z-10 mt-1 max-h-40 overflow-y-auto rounded-md border shadow-lg">
            {filteredOptions.slice(0, 8).map(option => (
              <button
                key={option}
                type="button"
                className="hover:bg-accent w-full px-3 py-2 text-left text-sm transition-colors"
                onClick={() => addTag(option)}
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>

      {value.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {value.map(tag => (
            <span
              key={tag}
              className="bg-primary/10 text-primary inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs"
            >
              {tag}
              <button
                type="button"
                onClick={() => removeTag(tag)}
                className="hover:text-destructive"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default TagInput;
