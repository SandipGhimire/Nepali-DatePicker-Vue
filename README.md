# Nepali Date Picker Vue Component

[![npm version](https://img.shields.io/npm/v/nepali-datepicker-vue.svg)](https://www.npmjs.com/package/nepali-datepicker-vue)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A comprehensive Vue 3 component for selecting dates in the Nepali calendar (Bikram Sambat / BS). This component provides an intuitive interface for date selection with full support for the Nepali calendar system.

![Nepali Date Picker Preview](https://i.ibb.co/G3p8VpDY/Screenshot-from-2025-11-25-17-03-25.png)

---

## 📋 Table of Contents

- [Features](#-features)
- [Installation](#-installation)
- [Quick Start](#-quick-start)
- [Props](#-props)
- [Events](#-events)
- [Usage Examples](#-usage-examples)
- [Styling](#-styling)
- [Date Format](#-date-format)
- [Validation](#-validation)
- [Browser Support](#-browser-support)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Features

- **Pure Vue 3 Composition API** - Built with modern Vue 3 features
- **Nepali Calendar Support** - Full Bikram Sambat (BS) calendar implementation
- **Date Range Validation** - Set minimum and maximum selectable dates
- **Year & Month Selection** - Quick navigation with dropdown selectors
- **Manual Input** - Type dates directly with auto-formatting
- **Today Highlighting** - Current date is visually highlighted
- **Clear Functionality** - Quick reset with clear button
- **Previous/Next Month Navigation** - Easy date selection across months
- **Customizable Styling** - Add custom CSS classes for personalization
- **Click-Outside Detection** - Auto-close when clicking outside
- **Disabled Date Styling** - Visual feedback for unavailable dates
- **Responsive Design** - Works seamlessly on all screen sizes

---

## 📦 Installation

Install the package using npm:

```bash
npm install nepali-datepicker-vue
```

Or using pnpm:

```bash
pnpm add nepali-datepicker-vue
```

---

## 🚀 Quick Start

### 1. Import Styles

Import the CSS styles in your main entry file (`main.ts` or `main.js`):

```typescript
import 'nepali-datepicker-vue/main.css';
```

### 2. Use the Component

```vue
<template>
  <div style="width: 200px">
    <h3>Select a Nepali Date</h3>
    <NepaliDatePicker v-model="selectedDate" placeholder="YYYY-MM-DD"/>
    <p v-if="selectedDate">Selected: {{ selectedDate }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { NepaliDatePicker } from 'nepali-datepicker-vue';

const selectedDate = ref('');
</script>
```

![Basic Usage Example](https://i.ibb.co/23sjg0pN/image.png)  ![Basic Usage Example](https://i.ibb.co/1YHpDCX4/image.png) ![Basic Usage Example](https://i.ibb.co/wZnG7kZB/image.png)

---

## 📚 Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `modelValue` | `String` | No | `''` | v-model binding for selected date in `YYYY-MM-DD` format |
| `yearSelect` | `Boolean` | No | `true` | Enable/disable year dropdown selector |
| `monthSelect` | `Boolean` | No | `true` | Enable/disable month dropdown selector |
| `class` | `String` | No | `''` | Custom CSS class for the wrapper element |
| `inputClass` | `String` | No | `''` | Custom CSS class for the input field |
| `placeholder` | `String` | No | `''` | Placeholder text displayed in the input |
| `minDate` | `String` | No | `undefined` | Minimum selectable date (`YYYY-MM-DD`) |
| `maxDate` | `String` | No | `undefined` | Maximum selectable date (`YYYY-MM-DD`) |

---

## 📡 Events

| Event | Payload Type | Description |
|-------|--------------|-------------|
| `@update:modelValue` | `String` | Emitted when date changes (v-model compatible) |
| `@onSelect` | `String` | Emitted when user selects a date |

### Event Usage Example

```vue
<template>
  <NepaliDatePicker 
    v-model="selectedDate"
    @onSelect="handleDateSelect"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { NepaliDatePicker } from 'nepali-datepicker-vue';

const selectedDate = ref('');

const handleDateSelect = (date: string) => {
  console.log('Date selected:', date);
  // Perform additional actions
};
</script>
```

---

## 💡 Usage Examples

### Basic Implementation

Simple date picker with default settings:

```vue
<template>
  <div style="width: 200px;">
    <NepaliDatePicker v-model="date" placeholder="Select date" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { NepaliDatePicker } from 'nepali-datepicker-vue';

const date = ref('');
</script>
```

![Basic Implementation](https://i.ibb.co/dsB2w2tZ/image.png)

---

### Date Range Restriction

Limit selectable dates to a specific range:

```vue
<template>
  <div>
    <h4>Select date between Baisakh 2080 and Chaitra 2081</h4>
    <NepaliDatePicker 
      v-model="restrictedDate"
      minDate="2082-08-06"
      maxDate="2082-08-14"
      placeholder="YYYY-MM-DD"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { NepaliDatePicker } from 'nepali-datepicker-vue';

const restrictedDate = ref('');
</script>
```

![Date Range Example](https://i.ibb.co/q3kf41Cw/image.png)

---

### Disable Month/Year Selectors

Create a simplified picker without dropdowns:

```vue
<template>
  <NepaliDatePicker 
    v-model="simpleDate"
    :yearSelect="false"
    :monthSelect="false"
    placeholder="Navigate with arrows only"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { NepaliDatePicker } from 'nepali-datepicker-vue';

const simpleDate = ref('');
</script>
```
---

### Custom Styling

Apply custom styles to match your design system:

```vue
<template>
  <NepaliDatePicker 
    v-model="styledDate"
    class="custom-datepicker-wrapper"
    inputClass="custom-input-field"
    placeholder="Custom styled picker"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { NepaliDatePicker } from 'nepali-datepicker-vue';

const styledDate = ref('');
</script>

<style scoped>
.custom-datepicker-wrapper {
  width: 100%;
  max-width: 400px;
}

.custom-input-field {
  border: 2px solid #4A90E2;
  border-radius: 8px;
  padding: 12px 16px;
  font-size: 16px;
  transition: all 0.3s ease;
}

.custom-input-field:focus {
  border-color: #2E5C8A;
  box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.1);
}
</style>
```

---

### Form Integration

Integrate with form validation:

```vue
<template>
  <form @submit.prevent="submitForm">
    <div class="form-group">
      <label for="birthdate">Date of Birth (BS)</label>
      <NepaliDatePicker 
        v-model="formData.birthdate"
        placeholder="YYYY-MM-DD"
        maxDate="2081-08-15"
      />
      <span v-if="errors.birthdate" class="error">
        {{ errors.birthdate }}
      </span>
    </div>
    
    <button type="submit">Submit</button>
  </form>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { NepaliDatePicker } from 'nepali-datepicker-vue';

const formData = reactive({
  birthdate: ''
});

const errors = reactive({
  birthdate: ''
});

const submitForm = () => {
  errors.birthdate = '';
  
  if (!formData.birthdate) {
    errors.birthdate = 'Please select your birth date';
    return;
  }
  
  console.log('Form submitted:', formData);
};
</script>

<style scoped>
.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
}

.error {
  color: #d32f2f;
  font-size: 14px;
  margin-top: 4px;
  display: block;
}
</style>
```
---

## 🎨 Styling

### Default Styles

The component comes with default styling that can be customized using CSS classes.

### Custom CSS Classes

You can override default styles by targeting these classes:

```css
/* Wrapper */
.nepali-datepicker { }

/* Input field */
.calendar-input { }

/* Calendar popup */
.calendar { }

/* Selected date */
.calendar__selected { }

/* Today's date */
.calendar__today { }

/* Disabled dates */
.calendar__disable_date { }

/* Hover state */
.calendar__day:hover { }
```

### Example Custom Theme

```css
/* Dark theme example */
.nepali-datepicker .calendar-input {
  background: #2c3e50;
  color: #ecf0f1;
  border: 1px solid #34495e;
}

.nepali-datepicker .calendar {
  background: #2c3e50;
  color: #ecf0f1;
  border: 1px solid #34495e;
}

.nepali-datepicker .calendar__selected {
  background-color: #3498db !important;
}

.nepali-datepicker .calendar__day:hover {
  background-color: #34495e;
}
```

![Custom Theme](https://i.ibb.co/jZ91bZrd/image.png)
> Just a messy example design!!!

---

## 📅 Date Format

The component uses the **YYYY-MM-DD** format for all date operations:

- **YYYY**: 4-digit year (e.g., 2081)
- **MM**: 2-digit month (01-12)
- **DD**: 2-digit day (01-32, depending on month)

### Example Dates

```
2081-01-15  → Baisakh 15, 2081
2080-05-01  → Shrawan 1, 2080
2081-12-30  → Chaitra 30, 2081
```

### Manual Input Formatting

When typing dates manually, the component auto-formats your input:

- Type: `20820809` → Formatted to: `2082-08-09`

---

## ✅ Validation

### Date Range Validation

The component automatically validates dates against `minDate` and `maxDate`:

```vue
<NepaliDatePicker 
  v-model="date"
  minDate="2080-01-01"
  maxDate="2081-12-30"
/>
```

**Validation Rules:**
- Dates before `minDate` are disabled and unselectable
- Dates after `maxDate` are disabled and unselectable
- Invalid manual inputs are reverted to the previous valid value
- Component validates that `minDate` < `maxDate`

### Error Handling

The component logs warnings to the console for:
- Invalid date formats in `minDate`/`maxDate`
- `minDate` greater than `maxDate`
- `minDate` equal to `maxDate`
- Invalid manual date inputs
---

## 🖱️ User Interactions

### Keyboard Support

- **Enter**: Validate and apply manually typed date

### Mouse Interactions

- **Click input/calendar icon**: Open date picker
- **Click clear icon (X)**: Clear selected date
- **Click outside**: Close picker and validate input
- **Click previous/next arrows**: Navigate months
- **Click double arrows**: Navigate years
- **Click month/year label**: Open selector (if enabled)
- **Click date**: Select date and close picker
- **Click prev/next month dates**: Select dates from adjacent months
---

## 🌐 Browser Support

The component supports all modern browsers compatible with Vue 3:

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Opera (latest)

**Minimum Requirements:**
- ES6+ support
- Vue 3.x

---

## 🔗 Dependencies

This component depends on:

- **[Vue 3](https://vuejs.org/)** - The Progressive JavaScript Framework
- **[Nepali Date Library](https://www.npmjs.com/package/nepali-date-library)** - Core Nepali calendar functionality

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Development Setup

```bash
# Clone the repository
git clone https://github.com/SandipGhimire/Nepali-Date-Library.git

# Node Version
nvm use 22

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

---

## 🙋 Support

If you encounter any issues or have questions:

- 🐛 Issues: [GitHub Issues](https://github.com/SandipGhimire/Nepali-DatePicker-Vue/issues)

---

## 📄 License

MIT License - see the below for details.

> MIT License Copyright (c) 2025 Sandip Ghimire
> 
> Permission is hereby
granted, free of charge, to any person obtaining a copy of this software and
associated documentation files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use, copy, modify, merge,
publish, distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to the
following conditions:
> 
> The above copyright notice and this permission notice
(including the next paragraph) shall be included in all copies or substantial
portions of the Software.
> 
> THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF
ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO
EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR
OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

---

## 🌟 Acknowledgments
- Built with ❤️ for the Nepali developer community

---
**Made with Vue 3 | Nepali Calendar Component | MIT Licensed**