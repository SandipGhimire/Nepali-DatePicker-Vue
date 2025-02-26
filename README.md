# Nepali Date Picker

A Vue 3 component for selecting dates in the Nepali calendar (Bikram Sambat).

## Features

- Pure Vue 3 Composition API implementation
- Nepali (BS) calendar date picker with clean UI
- Support for date conversion between AD and BS
- Year and month selection
- Today highlighting
- Keyboard accessibility

## Installation

```bash
npm install vue-nepali-datepicker
```

## Dependency
- [Vue](https://vuejs.org/)
- [Nepali Date Library](https://www.npmjs.com/package/nepali-date-library) 

## Usage

## Import Styles

Make sure to import the CSS styles in your main entry file (e.g., `main.ts` or `main.js`):

```ts
import 'vue-nepali-datepicker/main.css';
```

## Initialization Example

```vue
<template>
  <div>
    <h3>Nepali Date Picker</h3>
    <NepaliDatePicker v-model="selectedDate" placeholder="Select a date" />
    <p v-if="selectedDate">Selected date: {{ selectedDate }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { NepaliDatePicker } from 'vue-nepali-datepicker';

const selectedDate = ref('');
</script>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | `String` | `''` | v-model binding for the selected date (YYYY-MM-DD format) |
| `yearSelect` | `Boolean` | `true` | Enable/disable year selection |
| `monthSelect` | `Boolean` | `true` | Enable/disable month selection |
| `classValue` | `String` | `''` | Additional CSS class for the input element |
| `placeholder` | `String` | `''` | Placeholder text for the input element |

## Events
| Event | Description |
|------|-------------|
| `@onSelect` | Called when date is selected |

## Browser Support

The component supports all modern browsers that are compatible with Vue 3.

## License

MIT License