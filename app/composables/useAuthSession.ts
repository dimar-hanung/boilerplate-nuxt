import { authClient } from "@/lib/auth-client";

export function useAuthSession() {
  const sessionRef = authClient.useSession();

  const data = computed(() => sessionRef.value?.data ?? null);
  const isPending = computed(() => sessionRef.value?.isPending ?? true);
  const error = computed(() => sessionRef.value?.error ?? null);

  return { data, isPending, error };
}
