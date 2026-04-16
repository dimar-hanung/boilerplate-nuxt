<script setup lang="ts">
import { GalleryVerticalEnd } from "lucide-vue-next"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
</script>

<template>
  <SidebarMenu>
    <SidebarMenuItem>
      <SidebarMenuButton size="lg" class="cursor-default">
        <div class="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
          <GalleryVerticalEnd class="size-4" />
        </div>
        <div class="grid flex-1 text-left text-sm leading-tight">
          <span class="truncate font-medium">Acme Inc</span>
          <span class="truncate text-xs">Enterprise</span>
        </div>
      </SidebarMenuButton>
    </SidebarMenuItem>
  </SidebarMenu>
</template>
