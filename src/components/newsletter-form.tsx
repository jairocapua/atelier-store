"use client";

import { useActionState } from "react";
import { subscribe, type SubscribeState } from "@/lib/newsletter";

const initialState: SubscribeState = { status: "idle", message: "", email: "" };

export function NewsletterForm() {
  const [state, action, pending] = useActionState(subscribe, initialState);
  const invalid = state.status === "error";

  return (
    <form action={action} noValidate className="mt-8">
      <div className="flex items-end gap-4">
        <div className="field flex-1">
          <label htmlFor="newsletter-email" className="field-label">
            Email address
          </label>
          <input
            id="newsletter-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            defaultValue={state.email}
            aria-invalid={invalid}
            aria-describedby="newsletter-message"
            className="input"
          />
        </div>
        <button type="submit" className="btn btn-secondary" disabled={pending}>
          Sign up
        </button>
      </div>
      <p
        id="newsletter-message"
        aria-live="polite"
        className="field-message mt-2 min-h-4"
        data-tone={invalid ? "error" : undefined}
      >
        {state.message}
      </p>
    </form>
  );
}
