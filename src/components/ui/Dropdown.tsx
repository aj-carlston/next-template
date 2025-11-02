'use client';

import { forwardRef, SelectHTMLAttributes, ReactNode, useState, useRef, useEffect } from 'react';
import styles from './Dropdown.module.sass';
import Button from './Button';

export interface DropdownOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface DropdownProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'onChange'> {
  label?: string;
  error?: string;
  helperText?: string;
  variant?: 'default' | 'filled';
  fullWidth?: boolean;
  options: DropdownOption[];
  placeholder?: string;
  onChange?: (value: string) => void;
}

const Dropdown = forwardRef<HTMLDivElement, DropdownProps>(
  (
    {
      label,
      error,
      helperText,
      variant = 'default',
      fullWidth = false,
      options,
      placeholder,
      className = '',
      id,
      value: controlledValue,
      defaultValue,
      onChange,
      disabled,
      ...props
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState<string>(
      (controlledValue as string) || (defaultValue as string) || ''
    );
    const dropdownRef = useRef<HTMLDivElement>(null);
    const dropdownId = id || label?.toLowerCase().replace(/\s+/g, '-');

    const selectedOption = options.find(opt => opt.value === selectedValue);
    const displayText = selectedOption?.label || placeholder || 'Select...';

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
          setIsOpen(false);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelect = (value: string) => {
      setSelectedValue(value);
      setIsOpen(false);
      onChange?.(value);
    };

    return (
      <div
        ref={ref}
        className={`${styles.dropdownWrapper} ${
          fullWidth ? styles.fullWidth : ''
        } ${className}`}
      >
        {label && (
          <label htmlFor={dropdownId} className={styles.label}>
            {label}
          </label>
        )}
        <div ref={dropdownRef} className={styles.selectContainer}>
          <button
            type="button"
            id={dropdownId}
            className={`${styles.trigger} ${styles[variant]} ${
              error ? styles.error : ''
            } ${isOpen ? styles.open : ''}`}
            onClick={() => !disabled && setIsOpen(!isOpen)}
            disabled={disabled}
          >
            <span className={!selectedValue ? styles.placeholder : ''}>
              {displayText}
            </span>
            <div className={`${styles.arrow} ${isOpen ? styles.arrowOpen : ''}`}>
              <svg
                width="12"
                height="8"
                viewBox="0 0 12 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 1.5L6 6.5L11 1.5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </button>

          {isOpen && (
            <div className={styles.dropdown}>
              {options.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => !option.disabled && handleSelect(option.value)}
                  disabled={option.disabled}
                  className={`${styles.option} ${
                    selectedValue === option.value ? styles.selected : ''
                  }`}
                >
                  <span>{option.label}</span>
                  {selectedValue === option.value && (
                    <span className={styles.checkmark}>✓</span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
        {error && <span className={styles.errorText}>{error}</span>}
        {helperText && !error && (
          <span className={styles.helperText}>{helperText}</span>
        )}
      </div>
    );
  }
);

Dropdown.displayName = 'Dropdown';

export default Dropdown;
