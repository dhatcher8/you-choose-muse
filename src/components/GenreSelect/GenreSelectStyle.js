export const selectStyle = {
    control: styles => ({ ...styles, backgroundColor: '#3fc1c9', borderRadius: 10, border: 0, color: '#f5f5f5', fontStyle: 'normal'}),
    clearIndicator: styles => ({ ...styles, color: '#f5f5f5' }),
    multiValue: styles => ({ ...styles, backgroundColor: '#3fc1c9', border: 0, fontStyle: 'normal'}),
    multiValueLabel: styles => ({ ...styles, backgroundColor: '#3fc1c9', border: 0, color: '#f5f5f5' }),
    multiValueRemove: styles => ({ ...styles, color: '#ff5c87' }),
    placeholder: styles => ({ ...styles, color: '#f5f5f5', fontStyle: 'italic', paddingLeft: 10 }),
    input: styles => ({ ...styles, paddingLeft: 10 }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      return {
        ...styles,
        fontStyle: 'normal',
        borderRadius: 10,
        backgroundColor: '#3fc1c9',
        backgroundColor: isDisabled
            ? '#3fc1c9'
            : isSelected
            ? '#3fc1c9'
            : isFocused
            ? '#3fc1c9'
            : null,
        color: isDisabled
            ? '#f5f5f5'
            : isSelected
            ? '#f5f5f5'
            : isFocused
            ? '#f5f5f5'
            : null,

      };
    },
  };