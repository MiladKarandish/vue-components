<template>
  <div class="w-full">
    <!-- OTP Input -->
    <div class="w-fit flex justify-center items-center gap-2 mx-auto">
      <div v-for="item in otpValue" :key="item.id">
        <input
          :ref="(r) => inputsRef.push(r!)"
          class="aspect-square w-10 h-10 rounded-md border border-blue-950 bg-white text-black text-center"
          :value="item.value"
          @keydown.prevent="onOtpChange"
          @focus="(e) => (activeInput = item.id)"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Utilities
import { toEnglishDigits } from "~/utils/numbers";

const digitCount = 5;

interface IOTPValue {
  id: number;
  value: string | number;
}
const otpValue = ref<IOTPValue[]>([
  ...new Array(digitCount).fill("").map((_, i) => ({ id: i, value: "" })),
]);

const inputsRef = ref<(Element | ComponentPublicInstance)[]>([]);
const activeInput = ref<number>(0);

const focusOnInput = () => {
  const target = inputsRef.value[activeInput.value] as HTMLInputElement;
  target.focus();
};

onMounted(() => {
  focusOnInput();
});

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
</script>
