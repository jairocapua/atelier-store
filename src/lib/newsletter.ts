"use server";

export type SubscribeState = {
  status: "idle" | "success" | "error";
  message: string;
  /** Echoed back on error so the field keeps what the shopper typed. */
  email: string;
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function subscribe(
  _previous: SubscribeState,
  formData: FormData,
): Promise<SubscribeState> {
  const email = String(formData.get("email") ?? "").trim();

  if (!EMAIL.test(email)) {
    return {
      status: "error",
      message: "Enter an email address in the format name@example.com.",
      email,
    };
  }

  // Validation only: there is no subscribers table or mail provider yet, so
  // the address is not stored. Persist it here once one exists.
  return { status: "success", message: "Thanks. You're on the list.", email: "" };
}
