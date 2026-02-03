<template>
    <div class="nepali-datepicker" :key="date_id" :class="props.class">
        <div class="calendar-input-div" :class="modelValue ? 'calendar-input-contain-value' : ''">
            <input
                type="text"
                class="calendar-input"
                @click="
                    ($event: any) => {
                        toggleCalendar(true);
                        if (clickSelect) {
                            $event.target.select();
                        }
                    }
                "
                v-model="formattedValue"
                :placeholder="placeholder"
                aria-haspopup="true"
                :id="'nepali-date-input-' + date_id"
                @keyup.enter="updateInputtedValue()"
                @input="handleInput"
                :class="props.inputClass"
            />
            <div class="calendar-input-icon calender-icon" @click.stop="toggleCalendar(true)">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1024 1024"
                    width="1em"
                    height="1em"
                    v-if="!(visible && modelValue)"
                >
                    <path
                        d="M940.218 107.055H730.764v-60.51H665.6v60.51H363.055v-60.51H297.89v60.51H83.78c-18.617 0-32.581 13.963-32.581 32.581v805.237c0 18.618 13.964 32.582 32.582 32.582h861.09c18.619 0 32.583-13.964 32.583-32.582V139.636c-4.655-18.618-18.619-32.581-37.237-32.581zm-642.327 65.163v60.51h65.164v-60.51h307.2v60.51h65.163v-60.51h176.873v204.8H116.364v-204.8H297.89zM116.364 912.291V442.18H912.29v470.11H116.364z"
                    ></path>
                </svg>
            </div>
            <div
                class="calendar-input-icon"
                :class="visible ? '' : 'calendar-clear-input'"
                @click.stop="resetClear()"
                v-if="modelValue"
            >
                <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        id="Vector"
                        d="M18 18L12 12M12 12L6 6M12 12L18 6M12 12L6 18"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                </svg>
            </div>
        </div>
        <teleport to="body">
            <transition name="calendar-animation">
                <div
                    v-if="visible"
                    :class="['calendar', { show: visible, 'calendar-above': positionAbove }]"
                    :id="'nepali-calendar-' + date_id"
                    :style="calendarStyle"
                    style="user-select: none"
                >
                    <div class="calendar__body">
                        <!-- month -->
                        <div class="calendar__head">
                            <div>
                                <button class="calendar__toggle_button" @click="prevYear()">
                                    <i class="calendar-icon-double-left"></i>
                                </button>
                                <button class="calendar__toggle_button" @click="prev()" v-if="!showMonth && !showYear">
                                    <i class="calendar-icon-left"></i>
                                </button>
                            </div>
                            <div class="calendar__header_label">
                                <a v-if="!monthSelect">{{ date.format("MMMM") }}</a>
                                <a
                                    class="calendar__header_selector"
                                    @click.stop="toggleMonth"
                                    v-if="!showMonth && !showYear && monthSelect"
                                >
                                    {{ date.format("MMMM") }}
                                </a>
                                <a v-if="!yearSelect">{{ date.format("YYYY") }}</a>
                                <a
                                    class="calendar__header_selector"
                                    @click.stop="toggleYear"
                                    v-if="!showYear && yearSelect"
                                >
                                    {{ date.format("YYYY") }}
                                </a>
                                <a v-if="showYear && yearSelect">
                                    {{ currentPageYears[0] }} ~
                                    {{ currentPageYears[currentPageYears.length - 1] }}
                                </a>
                            </div>
                            <div>
                                <button class="calendar__toggle_button" @click="next()" v-if="!showMonth && !showYear">
                                    <i class="calendar-icon-right"></i>
                                </button>
                                <button class="calendar__toggle_button" @click="nextYear()">
                                    <i class="calendar-icon-double-right"></i>
                                </button>
                            </div>
                        </div>
                        <!-- week days -->
                        <div class="calendar__container">
                            <div v-if="!showMonth && !showYear">
                                <!-- days of month -->
                                <div class="calendar__weeks">
                                    <div v-for="(weekday, w) in WEEK_SHORT_EN" :key="w" class="calendar__weekday">
                                        {{ weekday }}
                                    </div>
                                </div>
                                <div class="calendar__days">
                                    <template v-if="calendarDays.prevRemainingDays > 0">
                                        <div
                                            v-for="(day, d) in calendarDays.prevMonth.days"
                                            :key="d"
                                            class="calendar__day calendar__not_current_month"
                                            :title="getFullDate(calendarDays.prevMonth, day).format('YYYY-MM-DD')"
                                            :class="{
                                                calendar__disable_date: isDateDisabled(
                                                    getFullDate(calendarDays.prevMonth, day)
                                                ),
                                            }"
                                            @click="select(getFullDate(calendarDays.prevMonth, day))"
                                        >
                                            <span>{{ day }}</span>
                                        </div>
                                    </template>

                                    <div
                                        v-for="(day, d) in calendarDays.currentMonth.days"
                                        :key="d"
                                        class="calendar__day"
                                        :class="{
                                            calendar__selected: activeDay(getFullDate(calendarDays.currentMonth, day)),
                                            calendar__today: checkToday(getFullDate(calendarDays.currentMonth, day)),
                                            calendar__disable_date: isDateDisabled(
                                                getFullDate(calendarDays.currentMonth, day)
                                            ),
                                        }"
                                        :title="getFullDate(calendarDays.currentMonth, day).format('YYYY-MM-DD')"
                                        @click="select(getFullDate(calendarDays.currentMonth, day))"
                                    >
                                        <span>{{ day }}</span>
                                    </div>

                                    <template v-if="calendarDays.remainingDays > 0">
                                        <div
                                            v-for="(day, d) in calendarDays.nextMonth.days"
                                            :key="d"
                                            class="calendar__day calendar__not_current_month"
                                            :title="getFullDate(calendarDays.nextMonth, day).format('YYYY-MM-DD')"
                                            :class="{
                                                calendar__disable_date: isDateDisabled(
                                                    getFullDate(calendarDays.nextMonth, day)
                                                ),
                                            }"
                                            @click="select(getFullDate(calendarDays.nextMonth, day))"
                                        >
                                            <span>{{ day }}</span>
                                        </div>
                                    </template>
                                </div>
                            </div>
                            <div v-if="showMonth" class="calendar__months" @click.stop>
                                <div
                                    v-for="(month, index) in MONTH_EN"
                                    class="calendar_month"
                                    :class="{ calendar__selected: activeMonth(index) }"
                                    @click="selectMonth(index)"
                                >
                                    {{ month }}
                                </div>
                            </div>
                            <div v-if="showYear" class="calendar__years" @click.stop>
                                <div
                                    v-for="year in currentPageYears"
                                    class="calendar__year"
                                    :class="{ calendar__selected: activeYear(year) }"
                                    @click="selectYear(year)"
                                >
                                    {{ year }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </transition>
        </teleport>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onUnmounted, watch, onMounted, nextTick } from "vue";
import { NepaliDate, MONTH_EN, WEEK_SHORT_EN, NEPALI_DATE_MAP } from "nepali-date-library";

export interface NepaliDatePickerProps {
    modelValue?: string;
    yearSelect?: boolean;
    monthSelect?: boolean;
    class?: string;
    placeholder?: string;
    minDate?: string;
    maxDate?: string;
    inputClass?: string;
    clickSelect?: boolean;
}

// Props Define
const props = withDefaults(defineProps<NepaliDatePickerProps>(), {
    modelValue: "",
    yearSelect: true,
    monthSelect: true,
    class: "",
    placeholder: "",
    minDate: "",
    maxDate: "",
    inputClass: "",
    clickSelect: false,
});

// Emit modelValue update event
const emit = defineEmits<{
    (e: "update:modelValue", value: string): void;
    (e: "onSelect", value: string): void;
}>();

// Refs
const date = ref<NepaliDate>(props.modelValue ? new NepaliDate(props.modelValue) : new NepaliDate());
const visible = ref(false);
const formattedValue = ref(props.modelValue);
const yearValue = ref(props.modelValue ? new NepaliDate(props.modelValue).getYear() : new NepaliDate().getYear());
const monthValue = ref(props.modelValue ? new NepaliDate(props.modelValue).getMonth() : new NepaliDate().getMonth());
const showMonth = ref(false);
const showYear = ref(false);
const startingYear = ref(NEPALI_DATE_MAP?.[0]?.year);
const endingYear = ref(NEPALI_DATE_MAP?.[NEPALI_DATE_MAP.length - 1]?.year ?? 0);
const currentYearPage = ref(0);
const YEARS_PER_PAGE = 10;

const IminDate = ref<NepaliDate>();
const allowCheckMinDate = ref(false);
const ImaxDate = ref<NepaliDate>();
const allowCheckMaxDate = ref(false);

const calendarTop = ref(0);
const calendarLeft = ref(0);
const positionAbove = ref(false);

const SPACING = 1;

onMounted(() => {
    checkMinMax();
});

//Props Value Watch
watch(
    () => props.modelValue,
    () => {
        formattedValue.value = props.modelValue;
        yearValue.value = props.modelValue ? new NepaliDate(props.modelValue).getYear() : new NepaliDate().getYear();
        monthValue.value = props.modelValue ? new NepaliDate(props.modelValue).getMonth() : new NepaliDate().getMonth();
        date.value = props.modelValue ? new NepaliDate(props.modelValue) : new NepaliDate();
    }
);

watch(
    () => props.minDate,
    () => {
        checkMinMax();
    }
);

watch(
    () => props.maxDate,
    () => {
        checkMinMax();
    }
);

// Watch for view changes to recalculate position
watch([showMonth, showYear], () => {
    if (visible.value) {
        nextTick(() => {
            calculateCalendarPosition();
        });
    }
});

const checkMinMax = () => {
    if (props.minDate) {
        try {
            IminDate.value = new NepaliDate(props.minDate);
            allowCheckMinDate.value = true;
        } catch (e) {
            IminDate.value = undefined;
            console.error("Invalid Minimum Date", e);
            allowCheckMinDate.value = false;
        }
    }
    if (props.maxDate) {
        try {
            ImaxDate.value = new NepaliDate(props.maxDate);
            allowCheckMaxDate.value = true;
        } catch (e) {
            console.error("Invalid Maximum Date", e);
            allowCheckMaxDate.value = false;
        }
    }

    if (allowCheckMaxDate.value && allowCheckMinDate.value) {
        if (IminDate.value && ImaxDate.value && IminDate.value.isAfter(ImaxDate.value)) {
            console.error("Minimum Date is Greater than Maximum Date");
            allowCheckMaxDate.value = false;
            allowCheckMinDate.value = false;
        } else if (IminDate.value && ImaxDate.value && IminDate.value.isEqual(ImaxDate.value)) {
            console.error("Minimum Date is Equal to Maximum Date");
            allowCheckMaxDate.value = false;
            allowCheckMinDate.value = false;
        }
    }
};

const calendarDays = computed(() => {
    const calDays = NepaliDate.getCalendarDays(date.value.year, date.value.month);
    return calDays;
});

// Computed style for calendar positioning
const calendarStyle = computed(() => {
    return {
        top: `${calendarTop.value}px`,
        left: `${calendarLeft.value}px`,
    };
});

// Calculate calendar position
const calculateCalendarPosition = () => {
    const inputElement = document.getElementById("nepali-date-input-" + date_id);
    const calendarElement = document.getElementById("nepali-calendar-" + date_id);

    if (!inputElement || !calendarElement) return;

    const inputRect = inputElement.getBoundingClientRect();
    const calendarRect = calendarElement.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;

    const calendarHeight = calendarRect.height || 267;
    const calendarWidth = calendarRect.width || 272;

    const spaceAbove = inputRect.top;
    const spaceBelow = viewportHeight - inputRect.bottom;

    const shouldPlaceAbove = spaceBelow < calendarHeight + SPACING && spaceAbove > spaceBelow;
    positionAbove.value = shouldPlaceAbove;

    if (shouldPlaceAbove) {
        calendarTop.value = inputRect.top + window.scrollY - calendarHeight - SPACING;

        if (calendarTop.value < window.scrollY) {
            calendarTop.value = window.scrollY + SPACING;
        }
    } else {
        calendarTop.value = inputRect.bottom + window.scrollY + SPACING;

        const maxTop = viewportHeight + window.scrollY - calendarHeight - SPACING;
        if (calendarTop.value > maxTop) {
            calendarTop.value = maxTop;
        }
    }

    let leftPosition = inputRect.left + window.scrollX;

    if (leftPosition + calendarWidth > viewportWidth + window.scrollX) {
        leftPosition = inputRect.right + window.scrollX - calendarWidth;
    }

    if (leftPosition < window.scrollX) {
        leftPosition = window.scrollX + SPACING;
    }

    if (calendarWidth > viewportWidth) {
        leftPosition = window.scrollX + SPACING;
    }

    calendarLeft.value = leftPosition;
};

interface fullDate {
    year: number;
    month: number;
    days: number[];
}

const getFullDate = (data: fullDate, day: number): NepaliDate => {
    const date = new NepaliDate(data.year, data.month, day);
    return date;
};

//Togglers
const toggleYear = () => {
    showYear.value = !showYear.value;
    showMonth.value = false;

    if (showYear.value) {
        const currentYear = date.value.year;
        const yearIndex = NEPALI_DATE_MAP.findIndex((item) => item.year === currentYear);
        currentYearPage.value = Math.floor(yearIndex / YEARS_PER_PAGE);
    }
};

const setToValidDateIfTodayDisabled = () => {
    const today = new NepaliDate();
    if (isDateDisabled(today)) {
        if (allowCheckMinDate.value && IminDate.value) {
            date.value = new NepaliDate(IminDate.value.year, IminDate.value.month, IminDate.value.day);
        } else if (allowCheckMaxDate.value && ImaxDate.value) {
            date.value = new NepaliDate(ImaxDate.value.year, ImaxDate.value.month, ImaxDate.value.day);
        }
    }
};

const toggleCalendar = (onlyOpen?: boolean, onlyClose?: boolean) => {
    if (onlyOpen) {
        visible.value = true;
    } else if (onlyClose) {
        visible.value = false;
    } else {
        visible.value = !visible.value;
    }
    if (visible.value) {
        setToValidDateIfTodayDisabled();
        nextTick(() => {
            calculateCalendarPosition();

            window.addEventListener("scroll", calculateCalendarPosition, true);
            window.addEventListener("resize", calculateCalendarPosition);
        });
        document.addEventListener("click", handleClickOutside);
    } else {
        document.removeEventListener("click", handleClickOutside);

        window.removeEventListener("scroll", calculateCalendarPosition, true);
        window.removeEventListener("resize", calculateCalendarPosition);

        reset();
    }
};
const toggleMonth = () => {
    showMonth.value = !showMonth.value;
    showYear.value = false;
};

//Pagination Function
const next = () => {
    let _month = date.value.month + 1;
    let _year = date.value.year;
    if (_month > 11) {
        _year++;
        _month = 0;
    }
    if (startingYear.value && !(_year + 1 < startingYear.value || _year > endingYear.value)) {
        setMonthAndYear(_month, _year);
        date.value = new NepaliDate(_year, _month, 1);
    }
};
const nextYear = () => {
    if (showYear.value) {
        if (currentYearPage.value < maxYearPages.value - 1) {
            currentYearPage.value++;
        }
    } else {
        let _month = date.value.month;
        let _year = date.value.year + 1;
        if (startingYear.value && !(_year < startingYear.value || _year > endingYear.value)) {
            setMonthAndYear(_month, _year);
            date.value = new NepaliDate(_year, _month, 1);
        }
    }
};
const prev = () => {
    let _month = date.value.month - 1;
    let _year = date.value.year;
    if (_month < 0) {
        _year--;
        _month = 11;
    }
    if (startingYear.value && !(_year < startingYear.value || _year > endingYear.value)) {
        setMonthAndYear(_month, _year);
        date.value = new NepaliDate(_year, _month, 1);
    }
};
const prevYear = () => {
    if (showYear.value) {
        if (currentYearPage.value > 0) {
            currentYearPage.value--;
        }
    } else {
        let _month = date.value.month;
        let _year = date.value.year - 1;
        if (startingYear.value && !(_year < startingYear.value || _year > endingYear.value)) {
            setMonthAndYear(_month, _year);
            date.value = new NepaliDate(_year, _month, 1);
        }
    }
};

//Check Active
const activeDay = (dateToCheck: NepaliDate): boolean => {
    if (!props.modelValue) return false;
    let selectedDate = new NepaliDate(props.modelValue);
    return selectedDate.getTime() === dateToCheck.getTime();
};
const activeMonth = (month: number) => {
    const month2 = date.value.month;
    return month2 == month;
};
const activeYear = (year: number) => {
    const year2 = date.value.year;
    return year2 == year;
};

// Fixed Min/Max Date Validation Functions
const isDateDisabled = (dateToCheck: NepaliDate): boolean => {
    if (allowCheckMinDate.value && IminDate.value && dateToCheck.isBefore(IminDate.value)) {
        return true;
    }

    if (allowCheckMaxDate.value && ImaxDate.value && dateToCheck.isAfter(ImaxDate.value)) {
        return true;
    }

    return false;
};

//Check Today
const checkToday = (dateToCheck: NepaliDate): boolean => {
    const today = new NepaliDate();
    return dateToCheck.day === today.day && dateToCheck.year === today.year && dateToCheck.month === today.month;
};

//Year Picker
const currentPageYears = computed(() => {
    const years = NEPALI_DATE_MAP.map((item) => item.year);
    const startIdx = currentYearPage.value * YEARS_PER_PAGE;
    return years.slice(startIdx, startIdx + YEARS_PER_PAGE);
});
const maxYearPages = computed(() => {
    return Math.ceil(NEPALI_DATE_MAP.length / YEARS_PER_PAGE);
});

//ID Generation
const random = (length: number) => {
    let result = "";
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
};
const date_id = random(5) + random(5) + random(5);

//Select | Set Functions
const setMonthAndYear = (month: number, year: number): void => {
    monthValue.value = month;
    yearValue.value = year;
};
const selectMonth = (month: number) => {
    monthValue.value = month;
    date.value.setMonth(month);
    showMonth.value = false;
};
const selectYear = (year: number) => {
    yearValue.value = year;
    date.value.setYear(year);
    showYear.value = false;
    if (props.monthSelect) {
        showMonth.value = true;
    }
};
const select = (selectedDate: NepaliDate, dontClose: boolean = false) => {
    // Prevent selection of disabled dates
    if (isDateDisabled(selectedDate)) {
        return;
    }

    date.value = selectedDate;
    formattedValue.value = date.value.format("YYYY-MM-DD");
    emit("update:modelValue", formattedValue.value);
    emit("onSelect", formattedValue.value);
    if (!dontClose) toggleCalendar();
};

//Update Function
const updateInputtedValue = (dontClose: boolean = false) => {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(formattedValue.value)) {
        formattedValue.value = props.modelValue;
        return;
    }
    try {
        const val = new NepaliDate(formattedValue.value);
        if (isDateDisabled(val)) {
            console.warn("Entered date is outside allowed range");
            formattedValue.value = props.modelValue;
            return;
        }
        select(val, dontClose);
    } catch {
        formattedValue.value = props.modelValue;
    }
};

const handleInput = (e: any) => {
    const rawInput = e.target.value.replace(/[^0-9]/g, "").slice(0, 9);
    let raw = rawInput;

    let year = "";
    let month = "";
    let day = "";

    let maxDay = 31;

    // ---- Year ----
    if (raw.length >= 4) {
        year = raw.slice(0, 4);
    } else {
        year = raw;
    }

    // ---- Month ----
    if (raw.length >= 5) {
        let m1 = raw.charAt(4);
        let m2 = raw.charAt(5) || "";

        if (m1 === "0") {
            month = m1 + m2;
        } else if (m1 === "1") {
            if (["0", "1", "2"].includes(m2)) {
                month = m1 + m2;
            } else if (m2) {
                month = "0" + m1;
                raw = raw.slice(0, 5) + m2 + raw.slice(6);
            } else {
                month = m1;
            }
        } else if ("23456789".includes(m1)) {
            month = "0" + m1;
        }

        if (month === "00") {
            month = "0" + "";
        }
    }

    if (/^\d{4}$/.test(year) && /^\d{2}$/.test(month)) {
        let maxDayDate = date.value.endOfMonth();
        maxDay = maxDayDate.day;
    }

    // ---- Day ----
    if (raw.length >= 7) {
        let d1 = raw.charAt(6);
        let d2 = raw.charAt(7) || "";
        let d3 = raw.charAt(8) || "";

        if (!d3) {
            if ("123456789".includes(d1)) {
                day = "0" + d1;
            }
        } else {
            if (d1 == 0) {
                let dayNum = parseInt(d2 + d3);
                if (dayNum >= 1 && dayNum <= maxDay) {
                    day = d2 + d3;
                } else {
                    day = d1 + d2;
                }
            } else {
                day = d1 + d2;
            }
        }

        if (day === "00" || parseInt(day) > maxDay) {
            day = "";
        }
    }

    if (/^\d{4}$/.test(year)) {
        let tempYear = parseInt(year);
        try {
            if (
                (IminDate.value && tempYear < IminDate.value.year) ||
                (ImaxDate.value && tempYear > ImaxDate.value.year)
            ) {
                throw Error("Check Fail");
            }
            date.value.setYear(tempYear);
        } catch {
            year = "";
        }
    }

    if (/^\d{2}$/.test(month)) {
        let tempMonth = parseInt(month) - 1;
        try {
            if (
                (IminDate.value && tempMonth < IminDate.value.month) ||
                (ImaxDate.value && tempMonth > ImaxDate.value.month)
            ) {
                throw Error("Check Fail");
            }
            date.value.setMonth(tempMonth);
        } catch {
            month = "";
        }
    }

    // ---- Combine formatted string ----
    let formatted = year;
    if (month) {
        formatted += "-" + month;
    }
    if (day) {
        formatted += "-" + day;
    }

    // ---- Set back to input ----
    e.target.value = formatted;

    if (formattedValue.value == formatted) return;
    formattedValue.value = formatted;
};

//Event Listeners
const handleClickOutside = (event: Event) => {
    const calendarElement = document.getElementById("nepali-calendar-" + date_id);
    const inputElement = document.getElementById("nepali-date-input-" + date_id);
    if (
        calendarElement &&
        !calendarElement.contains(event.target as Node) &&
        inputElement &&
        !inputElement.contains(event.target as Node)
    ) {
        visible.value = false;
        reset();
        document.removeEventListener("click", handleClickOutside);
        window.removeEventListener("scroll", calculateCalendarPosition, true);
        window.removeEventListener("resize", calculateCalendarPosition);
        updateInputtedValue(true);
    }
};

//Reset Functions
const reset = () => {
    showMonth.value = false;
    showYear.value = false;
    date.value = props.modelValue ? new NepaliDate(props.modelValue) : new NepaliDate();
};
const resetClear = () => {
    showMonth.value = false;
    showYear.value = false;
    date.value = new NepaliDate();
    emit("update:modelValue", "");
    emit("onSelect", "");
    toggleCalendar(false, true);
};

onUnmounted(() => {
    document.removeEventListener("click", handleClickOutside);
    window.removeEventListener("scroll", calculateCalendarPosition, true);
    window.removeEventListener("resize", calculateCalendarPosition);
});
</script>

<style scoped>
/* Date Picker CSS */
.nepali-datepicker {
    font-size: 14px;
    font-family: inherit;
}
.calendar-input-div {
    position: relative;
}

.calendar-input-div .calendar-input-icon {
    position: absolute;
    top: 50%;
    right: 8px;
    transform: translateY(-50%);
    font-size: 16px;
    line-height: 0;
    color: rgba(0, 0, 0, 0.5);
    vertical-align: middle;
    fill: currentColor;
    stroke: currentColor;
    cursor: pointer;
}

.calendar-input-div .calendar-input {
    height: 24px;
    width: 100%;
    z-index: inherit;
    border: 1px solid #9e9e9e;
}

.calendar-input:focus-visible {
    outline: none !important;
    border-color: #717171;
}

.calendar-input-contain-value:hover .calender-icon {
    display: none;
}

.calendar-input-contain-value:hover .calendar-clear-input {
    display: block;
}

.calendar-clear-input {
    display: none;
}

/* Calender CSS */
.calendar {
    font-size: 14px;
    font-family: inherit;
    z-index: 2001;
    position: absolute;
    width: 248px;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);
    background: #fff;
    visibility: hidden;
    padding: 6px 12px;
    box-sizing: border-box;
    color: #73879c;
    border: 1px solid #e8e8e8;
}

.calendar > a {
    color: #73879c;
}

.calendar.show {
    visibility: visible;
}

/* Calender Header CSS */
.calendar__head {
    display: flex;
    justify-content: space-between;
    padding: 6.5px 0px;
}

.calendar__header_label {
    display: flex;
    gap: 5px;
}

.calendar__header_label .calendar__header_selector:hover {
    color: #1284e7;
    cursor: pointer;
}

/* Container CSS */
.calendar__day {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 32px;
}

.calendar__day_spacer {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 32px;
    cursor: default;
}

.calendar__weeks {
    height: 32px;
}

.calendar__day.calendar__selected,
.calendar__day.calendar__selected.calendar__today,
.calendar_month.calendar__selected,
.calendar__year.calendar__selected {
    background-color: #1284e7 !important;
    color: white !important;
}

.calendar__disable_date {
    cursor: not-allowed !important;
}

.calendar__day.calendar__disable_date,
.calendar__day.calendar__disable_date:hover {
    background-color: #f3f3f3 !important;
    color: #ccc !important;
}

.calendar__day.calendar__not_current_month.calendar__disable_date,
.calendar__day.calendar__not_current_month.calendar__disable_date:hover {
    background-color: #f3f3f3 !important;
    color: #ccc !important;
}

.calendar__day.calendar__not_current_month.calendar__disable_date:hover {
    background-color: white !important;
    color: #ccc !important;
}

.calendar__day.calendar__today {
    color: #2a90e9 !important;
}

.calendar__day.calendar__not_current_month {
    color: #ccc !important;
    background-color: white !important;
}

.calendar__day:hover,
.calendar__year:hover,
.calendar_month:hover {
    background-color: #f3f9fe;
    color: #73879c;
}

.calendar__weeks,
.calendar__days {
    display: grid;
    grid-template-columns: repeat(7, 32px);
    align-items: center;
    text-align: center;
}

.calendar__months {
    display: grid;
    grid-template-columns: repeat(3, 75px);
    align-items: center;
    text-align: center;
}

.calendar__years {
    display: grid;
    grid-template-columns: repeat(2, 110px);
    align-items: center;
    text-align: center;
}

.calendar_month,
.calendar__year {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    cursor: pointer;
}

.calendar__year {
    height: 45px;
}

.calendar_month {
    height: 56px;
}

.calendar__days {
    cursor: pointer;
}

.calendar__container {
    font-size: 12px;
}

.calendar__toggle_button {
    border: none;
    background: white;
    cursor: pointer;
    padding: 0 4px;
}

/* Animation CSS */
.calendar-animation-enter-active,
.calendar-animation-leave-active {
    overflow: hidden;
    transition:
        transform 0.3s cubic-bezier(0.23, 1, 0.32, 1),
        opacity 0.3s cubic-bezier(0.23, 1, 0.32, 1);
    transform-origin: center top;
}

.calendar-animation-enter-from,
.calendar-animation-leave-to {
    transform: scaleY(0);
    opacity: 0;
}

.calendar-animation-enter-to,
.calendar-animation-leave-from {
    transform: scaleY(1);
    opacity: 1;
}

/* Toggle Icon CSS */
.calendar-icon-left:before,
.calendar-icon-right:before,
.calendar-icon-double-left:before,
.calendar-icon-double-right:before,
.calendar-icon-double-left:after,
.calendar-icon-double-right:after {
    content: "";
    position: relative;
    top: -1px;
    display: inline-block;
    width: 10px;
    height: 10px;
    vertical-align: middle;
    border-style: solid;
    border-color: #73879c;
    border-width: 2px 0 0 2px;
    border-radius: 1px;
    box-sizing: border-box;
    transform-origin: center;
    transform: rotate(-45deg) scale(0.7);
}

.calendar-icon-left:hover::before,
.calendar-icon-right:hover::before,
.calendar-icon-double-left:hover::before,
.calendar-icon-double-right:hover::before,
.calendar-icon-double-left:hover::after,
.calendar-icon-double-right:hover::after {
    border-color: #2a90e9;
}

.calendar-icon-right:before,
.calendar-icon-double-right:before,
.calendar-icon-double-right:after {
    transform: rotate(135deg) scale(0.7);
}

.calendar-icon-double-left:after {
    left: -4px;
}

.calendar-icon-double-right:before {
    right: -4px;
}
</style>
