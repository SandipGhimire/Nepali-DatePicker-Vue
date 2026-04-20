**Title:** `[FEATURE REQUEST] `

**Describe the feature**
A clear and concise description of the functionality you would like to see in `nepali-date-picker-vue`.
For example: support for converting times, adding custom calendars, or handling edge-case dates.

**Motivation / Use Case**
Explain why this feature would be useful and how you plan to use it.
Example:

- “I want to set min and max date range selection for booking systems.”
- “I want to integrate the datepicker into a mobile-friendly UI with custom input styling.”

**Proposed Solution**
(Optional) Describe how you think this feature could be implemented or integrated.
Example:

```vue
<template>
  <nepali-date-picker v-model="date" :min-date="minDate" :max-date="maxDate" />
</template>

<script setup>
import { ref } from "vue";
import NepaliDatePicker from "nepali-date-picker-vue";

const date = ref("");
const minDate = ref("2079-12-01");
const maxDate = ref("2079-12-31");
</script>
```

**Alternatives Considered**
If you’ve tried workarounds or other libraries, mention them.
Example:

- Using manual validation and resetting
- Using another library but it lacks accuracy

**Additional Context**
Any other details, mockups, links, or examples that would help the maintainer understand your request.

**Environment (Optional, if relevant)**

- Node Version: [e.g. 24.x]
- `nepali-date-picker-vue` Version: [e.g. 1.2.0]
- OS: [e.g. Ubuntu 22.04, macOS 13]
