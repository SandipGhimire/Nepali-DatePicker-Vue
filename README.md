# Nepali Date Picker (Vue 3) 🇳🇵

[![npm version](https://img.shields.io/npm/v/nepali-datepicker-vue.svg?style=flat-square)](https://www.npmjs.com/package/nepali-datepicker-vue)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![Docs](https://img.shields.io/badge/Docs-Official-blue?style=flat-square)](https://nepalidatepicker.sandip-ghimire.com.np/)

A professional, feature-rich Nepali (Bikram Sambat) date picker component for Vue 3. Built with modern Composition API and TypeScript, providing a seamless and accessible date selection experience.

---

## 📚 Full Documentation

For advanced usage, examples, and full API reference, visit the official documentation:
👉 **[https://nepalidatepicker.sandip-ghimire.com.np/](https://nepalidatepicker.sandip-ghimire.com.np/)**

---

## ✨ Features

- **Vue 3 Optimized**: Built specifically for Vue 3 using the Composition API.
- **Smart Positioning**: Automatically detects viewport space to position the calendar above or below the input.
- **Teleport Rendering**: Renders the calendar popup at the body level to avoid clipping by parent containers.
- **Date Constraints**: Support for `minDate` and `maxDate` restrictions.
- **Interactive Formatting**: Auto-formats input as you type (`YYYY-MM-DD`).
- **Rich UI**: Highlighting for Today, Saturdays, and out-of-range dates.
- **TypeScript Support**: Full type definitions included for a better developer experience.
- **Highly Customizable**: Easily override styles with custom CSS classes.

---

## 🚀 Installation

```bash
npm install nepali-datepicker-vue
# or
pnpm add nepali-datepicker-vue
```

### Import Styles

Import the required CSS in your entry file (e.g., `main.ts` or `App.vue`):

```ts
import "nepali-datepicker-vue/main.css";
```

---

## 📖 Usage

### Basic Example

```vue
<script setup>
import { ref } from "vue";
import { NepaliDatePicker } from "nepali-datepicker-vue";

const selectedDate = ref("");
</script>

<template>
  <NepaliDatePicker v-model="selectedDate" placeholder="Select Nepali Date" />
</template>
```

### With Date Range

```vue
<template>
  <NepaliDatePicker v-model="date" minDate="2080-01-01" maxDate="2085-12-30" />
</template>
```

---

## 🛠 Props

| Prop                | Type      | Default | Description                               |
| ------------------- | --------- | ------- | ----------------------------------------- |
| `modelValue`        | `string`  | `''`    | v-model binding (BS date in `YYYY-MM-DD`) |
| `minDate`           | `string`  | `''`    | Minimum selectable date                   |
| `maxDate`           | `string`  | `''`    | Maximum selectable date                   |
| `yearSelect`        | `boolean` | `true`  | Show year dropdown                        |
| `monthSelect`       | `boolean` | `true`  | Show month dropdown                       |
| `placeholder`       | `string`  | `''`    | Input placeholder                         |
| `disabled`          | `boolean` | `false` | Disable the picker                        |
| `highlightSaturday` | `boolean` | `false` | Highlight Saturdays in red                |
| `miniEnglishDate`   | `boolean` | `false` | Show AD day number in cells               |

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT © [Sandip Ghimire](https://github.com/SandipGhimire)
