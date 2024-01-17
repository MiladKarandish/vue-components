<template>
  <div class="h-dvh flex flex-col justify-between">
    <LayoutHeader />
    <main class="grow w-full overflow-y-auto">
      <slot />
    </main>
    <LayoutNavigation />
  </div>
</template>
