'use client';

import { useState, useEffect } from 'react';
import styles from './ThemeSwitcher.module.sass';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

type ThemeFamily = 'default' | 'dracula' | 'corporate';
type ThemeMode = 'light' | 'dark';

const themeNames = {
  default: 'Default',
  dracula: 'Dracula',
  corporate: 'Corporate',
};

// Helper function to get CSS variables for a theme
const getThemeColors = (family: ThemeFamily, mode: ThemeMode): string[] => {
  if (typeof window === 'undefined') return [];
  
  // Temporarily apply the theme to read its CSS variables
  const html = document.documentElement;
  const originalTheme = html.getAttribute('data-theme');
  html.setAttribute('data-theme', `${family}-${mode}`);
  
  const computedStyle = getComputedStyle(html);
  const colors = [
    computedStyle.getPropertyValue('--background').trim(),
    computedStyle.getPropertyValue('--primary').trim(),
    computedStyle.getPropertyValue('--secondary').trim(),
  ];
  
  // Restore original theme
  if (originalTheme) {
    html.setAttribute('data-theme', originalTheme);
  }
  
  return colors;
};

export default function ThemeSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const [themeFamily, setThemeFamily] = useState<ThemeFamily>('default');
  const [mode, setMode] = useState<ThemeMode>('light');
  const [themeColors, setThemeColors] = useState<Record<ThemeFamily, Record<ThemeMode, string[]>>>({
    default: { light: [], dark: [] },
    dracula: { light: [], dark: [] },
    corporate: { light: [], dark: [] },
  });

  useEffect(() => {
    // Load theme from localStorage
    const savedTheme = localStorage.getItem('theme') as string;
    if (savedTheme) {
      const [family, themeMode] = savedTheme.split('-') as [ThemeFamily, ThemeMode];
      setThemeFamily(family);
      setMode(themeMode);
      document.documentElement.setAttribute('data-theme', savedTheme);
    }
    
    // Load all theme colors dynamically after a small delay to ensure CSS is loaded
    setTimeout(() => {
      const loadedColors = {
        default: {
          light: getThemeColors('default', 'light'),
          dark: getThemeColors('default', 'dark'),
        },
        dracula: {
          light: getThemeColors('dracula', 'light'),
          dark: getThemeColors('dracula', 'dark'),
        },
        corporate: {
          light: getThemeColors('corporate', 'light'),
          dark: getThemeColors('corporate', 'dark'),
        },
      };
      console.log('Loaded theme colors:', loadedColors);
      setThemeColors(loadedColors);
    }, 100);
  }, []);

  const applyTheme = (family: ThemeFamily, themeMode: ThemeMode) => {
    const theme = `${family}-${themeMode}`;
    setThemeFamily(family);
    setMode(themeMode);
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  };

  const handleThemeChange = (family: ThemeFamily) => {
    applyTheme(family, mode);
  };

  const toggleMode = () => {
    const newMode: ThemeMode = mode === 'light' ? 'dark' : 'light';
    applyTheme(themeFamily, newMode);
  };

  return (
    <>
      <Button
        variant="icon"
        size="md"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle theme menu"
        className={styles.floatingButton}
      >
        <span className={styles.emoji}>🎨</span>
      </Button>

      {isOpen && (
        <>
          <div className={styles.overlay} onClick={() => setIsOpen(false)} />
          <Card variant="elevated" padding="md" className={styles.menu}>
            <div className={styles.header}>
              <h3>Theme Settings</h3>
            </div>

            <div className={styles.section}>
              <label className={styles.sectionLabel}>Mode</label>
              <button className={styles.modeToggle} onClick={toggleMode}>
                <span className={mode === 'light' ? styles.active : ''}>☀️ Light</span>
                <span className={mode === 'dark' ? styles.active : ''}>🌙 Dark</span>
                <div
                  className={styles.slider}
                  style={{ transform: mode === 'dark' ? 'translateX(100%)' : 'translateX(0)' }}
                />
              </button>
            </div>

            <div className={styles.section}>
              <label className={styles.sectionLabel}>Theme</label>
              <div className={styles.themeList}>
                {(Object.keys(themeColors) as ThemeFamily[]).map((family) => {
                  const colors = themeColors[family]?.[mode] || [];
                  if (colors.length === 0) return null;
                  
                  return (
                    <button
                      key={family}
                      className={`${styles.themeOption} ${
                        themeFamily === family ? styles.selected : ''
                      }`}
                      onClick={() => handleThemeChange(family)}
                    >
                      <div className={styles.colorPreview}>
                        {colors.map((color, index) => (
                          <div
                            key={index}
                            className={styles.colorSwatch}
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                      <span className={styles.themeName}>{themeNames[family]}</span>
                      {themeFamily === family && (
                        <span className={styles.checkmark}>✓</span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </Card>
        </>
      )}
    </>
  );
}
