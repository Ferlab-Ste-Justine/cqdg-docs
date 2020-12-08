import React from 'react';
import Select from '../Select';

const VersionSelect = ({ value, onChange, versions }) => {
    const options = versions.map((d) => ({ label: `Version ${d}`, value: d }));
    return (
      <form>
        <div style={{ width: '150px', marginRight: '10px' }}>
          <Select
            aria-label="version-select"
            onChange={(val) => onChange(val)}
            value={value}
            options={options}
          />
        </div>
      </form>
    );
  };

export default VersionSelect;