"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Loader2 } from "lucide-react";

export function AdminLogin() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Login fail");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login fail");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container-px flex min-h-[70vh] items-center justify-center py-20">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-4xl bg-sand/50 p-8 shadow-soft"
      >
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-terracotta text-cream">
          <Lock className="h-6 w-6" />
        </div>
        <h1 className="mt-4 text-center heading-serif text-3xl">Admin login</h1>
        <p className="mt-1 text-center text-sm text-cocoa/55">
          Dashboard kholne ke liye password daalein.
        </p>

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="mt-6 w-full rounded-2xl border border-sand bg-cream px-4 py-3 outline-none focus:border-terracotta"
        />

        {error && (
          <p className="mt-3 rounded-2xl bg-terracotta/10 px-4 py-2 text-sm text-terracotta-dark">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="btn-primary mt-5 w-full disabled:opacity-60"
        >
          {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Login"}
        </button>
      </form>
    </div>
  );
}
