export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive("copy-click", (e) => {
    e.style.cursor = "pointer";

    e.addEventListener("click", async () => {
      if (navigator) {
        const color = "!text-[green]";
        try {
          await navigator.clipboard.writeText(e.innerText);

          // Keep the previous text
          const ctx = e.innerHTML;

          e.innerText = "با موفقیت کپی شد";
          e.classList.add(color);

          setTimeout(() => {
            e.innerHTML = ctx;
            e.classList.remove(color);
          }, 1000);
        } catch (error) {
          return;
        }
      }
    });
  });
});
