'use client';

import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Dropdown from "@/components/ui/Dropdown";
import styles from "./home.module.sass";

const home = () => {
  const dropdownOptions = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
    { value: 'option4', label: 'Option 4', disabled: true },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Neomorphic UI Components</h1>
          <p className={styles.subtitle}>Soft, beautiful components with theme support</p>
        </div>
      </div>

      {/* Button Examples */}
      <section className={styles.section}>
        <h2>Buttons</h2>
        <div className={styles.grid}>
          <Button variant="soft">Soft Button</Button>
          <Button variant="soft" size="sm">Small</Button>
          <Button variant="soft" size="lg">Large</Button>
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="icon">🎨</Button>
          <Button variant="soft" loading>Soft Loading</Button>
        </div>
      </section>

      {/* Input Examples */}
      <section className={styles.section}>
        <h2>Inputs</h2>
        <div className={styles.formGrid}>
          <Input
            label="Default Input"
            placeholder="Enter text..."
            helperText="This is a helper text"
          />
          <Input
            label="Filled Input"
            variant="filled"
            placeholder="Enter text..."
          />
          <Input
            label="Email"
            type="email"
            placeholder="your@email.com"
          />
          <Input
            label="With Error"
            defaultValue="Invalid value"
            error="This field has an error"
          />
        </div>
      </section>

      {/* Dropdown Examples */}
      <section className={styles.section}>
        <h2>Dropdowns</h2>
        <div className={styles.formGrid}>
          <Dropdown
            label="Default Dropdown"
            options={dropdownOptions}
            placeholder="Select an option..."
          />
          <Dropdown
            label="Filled Dropdown"
            variant="filled"
            options={dropdownOptions}
            placeholder="Choose..."
          />
          <Dropdown
            label="With Error"
            options={dropdownOptions}
            error="Please select a valid option"
          />
          <Dropdown
            label="Full Width"
            options={dropdownOptions}
            fullWidth
            helperText="This dropdown spans the full width"
          />
        </div>
      </section>

      {/* Card Examples */}
      <section className={styles.section}>
        <h2>Cards</h2>
        <div className={styles.cardGrid}>
          <Card variant="default">
            <div className="card-title">Default Card</div>
            <div className="card-text">Beautiful neomorphic card with soft shadows</div>
          </Card>

          <Card variant="elevated">
            <div className="card-title">Elevated Card</div>
            <div className="card-text">Slightly lifted with hover effect</div>
          </Card>

          <Card variant="inset">
            <div className="card-title">Inset Card</div>
            <div className="card-text">Pressed in appearance</div>
          </Card>

          <Card variant="colored">
            <div className="card-title">Colored Card</div>
            <div className="card-text">With gradient background</div>
          </Card>
        </div>
      </section>

      {/* Widget-style Cards */}
      <section className={styles.section}>
        <h2>Widget Examples</h2>
        <div className={styles.widgetGrid}>
          <Card variant="default" padding="lg">
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>☀️</div>
              <div className="card-title">Weather</div>
              <div style={{ fontSize: '1.5rem', fontWeight: '600' }}>23°C</div>
            </div>
          </Card>

          <Card variant="colored" padding="lg">
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📅</div>
              <div className="card-title">Calendar</div>
              <div className="card-text">Today's events</div>
            </div>
          </Card>

          <Card variant="elevated" padding="lg">
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>💧</div>
              <div className="card-title">Hydration</div>
              <div style={{ fontSize: '1.25rem', fontWeight: '500' }}>6/8 glasses</div>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default home;