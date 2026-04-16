<script setup lang="ts">
import { ref } from "vue";
import type { HTMLAttributes } from "vue";
import { cn } from "@/lib/utils";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

const props = defineProps<{
  class?: HTMLAttributes["class"];
}>();

const isSignUp = ref(false);
const username = ref("");
const email = ref("");
const name = ref("");
const password = ref("");
const error = ref("");
const loading = ref(false);

async function handleSubmit() {
  error.value = "";
  loading.value = true;

  try {
    if (isSignUp.value) {
      const { error: err } = await authClient.signUp.email({
        email: email.value,
        name: name.value,
        password: password.value,
        username: username.value,
      });
      if (err) {
        error.value = err.message || "Sign up failed";
      } else {
        await navigateTo("/");
      }
    } else {
      const { error: err } = await authClient.signIn.username({
        username: username.value,
        password: password.value,
      });
      if (err) {
        error.value = err.message || "Login failed";
      } else {
        await navigateTo("/");
      }
    }
  } catch (e: any) {
    error.value = e.message || "Something went wrong";
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <div :class="cn('flex flex-col gap-6', props.class)">
    <Card>
      <CardHeader class="text-center">
        <CardTitle class="text-xl">
          {{ isSignUp ? "Create an account" : "Welcome back" }}
        </CardTitle>
        <CardDescription>
          {{ isSignUp ? "Sign up with your details" : "Login with your username" }}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form @submit.prevent="handleSubmit">
          <FieldGroup>
            <Field v-if="isSignUp">
              <FieldLabel for="name"> Name </FieldLabel>
              <Input
                id="name"
                v-model="name"
                type="text"
                placeholder="Your name"
                required
              />
            </Field>
            <Field v-if="isSignUp">
              <FieldLabel for="email"> Email </FieldLabel>
              <Input
                id="email"
                v-model="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </Field>
            <Field>
              <FieldLabel for="username"> Username </FieldLabel>
              <Input
                id="username"
                v-model="username"
                type="text"
                placeholder="your-username"
                required
              />
            </Field>
            <Field>
              <div class="flex items-center">
                <FieldLabel for="password"> Password </FieldLabel>
              </div>
              <Input
                id="password"
                v-model="password"
                type="password"
                placeholder="********"
                required
              />
            </Field>
            <Field v-if="error">
              <p class="text-sm text-destructive">{{ error }}</p>
            </Field>
            <Field>
              <Button type="submit" class="w-full" :disabled="loading">
                {{ loading ? "Loading..." : isSignUp ? "Sign Up" : "Login" }}
              </Button>
              <FieldDescription class="text-center">
                {{ isSignUp ? "Already have an account?" : "Don't have an account?" }}
                <a
                  href="#"
                  class="cursor-pointer font-medium underline"
                  @click.prevent="isSignUp = !isSignUp"
                >
                  {{ isSignUp ? "Sign in" : "Sign up" }}
                </a>
              </FieldDescription>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
    <FieldDescription class="px-6 text-center">
      By clicking continue, you agree to our
      <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
    </FieldDescription>
  </div>
</template>
