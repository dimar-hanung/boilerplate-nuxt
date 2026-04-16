<script setup lang="ts">
import type { SidebarProps } from "@/components/ui/sidebar";

import {
  BookOpen,
  GalleryVerticalEnd,
  PieChart,
  SquareTerminal,
} from "lucide-vue-next";
import NavMain from "@/components/NavMain.vue";
import NavProjects from "@/components/NavProjects.vue";
import NavUser from "@/components/NavUser.vue";
import AppLogo from "@/components/AppLogo.vue";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

const props = withDefaults(defineProps<SidebarProps>(), {
  collapsible: "icon",
});

const { data: session } = useAuthSession();

const navMain = [
  {
    title: "Playground",
    url: "#",
    icon: SquareTerminal,
    isActive: true,
    items: [
      { title: "History", url: "#" },
      { title: "Settings", url: "#" },
    ],
  },
  {
    title: "Documentation",
    url: "#",
    icon: BookOpen,
    items: [
      { title: "Introduction", url: "#" },
      { title: "Get Started", url: "#" },
    ],
  },
];

const projects = [
  { name: "Design Engineering", url: "#", icon: GalleryVerticalEnd },
  { name: "Sales & Marketing", url: "#", icon: PieChart },
];

const sidebarUser = computed(() => ({
  name: session.value?.user?.name || "",
  email: session.value?.user?.email || "",
  avatar: session.value?.user?.image || "",
  username: session.value?.user?.username || "",
}));
</script>

<template>
  <Sidebar v-bind="props">
    <SidebarHeader>
      <AppLogo />
    </SidebarHeader>
    <SidebarContent>
      <NavMain :items="navMain" />
      <NavProjects :projects="projects" />
    </SidebarContent>
    <SidebarFooter>
      <NavUser :user="sidebarUser" />
    </SidebarFooter>
    <SidebarRail />
  </Sidebar>
</template>
