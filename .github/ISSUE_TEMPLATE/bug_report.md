**Title:** `[BUG] `

**Describe the bug**
A clear and concise description of the bug in the `nepali-date-picker-vue`. For example, wrong date conversion, unexpected output, or error thrown.

**To Reproduce**
Steps to reproduce the behavior:

```vue
<template>
  <nepali-date-picker v-model="date" />
</template>

<script setup>
import { ref } from "vue";
import NepaliDatePicker from "nepali-date-picker-vue";

const date = ref("");
</script>
```

1. Run the above code (or your code that uses the package)
2. Observe the output/error

**Expected behavior**
What you expected to happen. For example:

```
Expected output (date value): "2079-12-02"
```

**Actual behavior**
What actually happened. For example:

```
Actual output (date value): "2079-11-31" // incorrect date
```

**Environment (please complete the following information):**

- Node Version: [e.g. 24.x]
- npm/yarn Version: [e.g. 9.7.2]
- Operating System: [e.g. Ubuntu 22.04, macOS 13]
- `nepali-date-picker-vue` Version: [e.g. 1.2.0]

**Logs / Stack Trace**
Paste any error messages or logs that appear.

**Additional context**
Add any other context about the problem here, e.g., edge cases, specific input dates, or system locale.
