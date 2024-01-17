<template>
  <div class="w-full">
    <!-- OTP Input -->
    <div class="w-fit flex justify-center items-center gap-2 mx-auto">
      <div
        v-for="item in otpValue"
        :key="item.id"
        class="relative overflow-hidden"
      >
        <label
          :for="item.id.toString()"
          class="otp-label absolute inset-0 flex justify-center items-center animate-ping"
          >{{ item.value }}</label
        >
        <input
          :id="item.id.toString()"
          :ref="(r) => inputsRef.push(r!)"
          class="aspect-square w-10 h-10 rounded-md border border-blue-950 bg-white text-transparent text-center"
          :value="item.value"
          @keydown.prevent="onOtpChange"
          @focus="onInputFocus(item.id)"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Types
import type { IOTPValue } from "./otpTypes";
// Utilities
import { toEnglishDigits } from "~/utils/numbers";

// Config
const digitCount = 5;

// Refs
const otpValue = ref<IOTPValue[]>([
  ...new Array(digitCount).fill("").map((_, i) => ({ id: i, value: "" })),
]);
const inputsRef = ref<(Element | ComponentPublicInstance)[]>([]);
const activeInput = ref<number>(0);

// Methods
const focusOnInput = () => {
  const firstEmpty = otpValue.value.find((item) => item.value === "");

  if (firstEmpty && firstEmpty.id < activeInput.value)
    activeInput.value = firstEmpty.id;

  const target = inputsRef.value[activeInput.value] as HTMLInputElement;
  target.focus();
};

// Event handlers
const onOtpChange = (e: Event) => {
  const event = e as KeyboardEvent;
  const key = toEnglishDigits(event.key);

  const exp = /\d/;

  if (exp.test(key)) {
    otpValue.value[activeInput.value].value = key;

    if (activeInput.value < digitCount - 1) activeInput.value += 1;
  } else if (key === "Backspace" && activeInput.value > 0) {
    otpValue.value[activeInput.value].value = "";
    activeInput.value -= 1;
  }

  focusOnInput();
};

const onInputFocus = (id: number) => {
  activeInput.value = id;
  focusOnInput();
};

// Lifecycles
onMounted(() => {
  focusOnInput();
});
</script>

<style scoped>
.otp-label:not(:empty) {
  top: 100%;
  animation: slide-in 0.1s forwards ease-in;
}

@keyframes slide-in {
  to {
    top: 0;
  }
}
</style>
