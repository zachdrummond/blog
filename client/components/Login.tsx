"use client";
import { useState } from "react";

export default function Login() {
  const [form, setForm] = useState({
    login: true,
    email: "",
    password: "",
    name: ''
  });

  return (
    <div>
      <h4 className="mv3">{form.login ? "Login" : "Sign Up"}</h4>
      <div className="flex flex-column">
                {!form.login && (
          <input
            value={form.name}
            onChange={(e) =>
              setForm({
                ...form,
                name: e.target.value
              })
            }
            type="text"
            placeholder="Your name"
          />
        )}
        <input
          value={form.email}
          onChange={(e) =>
            setForm({
              ...form,
              email: e.target.value,
            })
          }
          type="text"
          placeholder="Your email address"
        />
        <input
          value={form.password}
          onChange={(e) =>
            setForm({
              ...form,
              password: e.target.value,
            })
          }
          type="password"
          placeholder="Choose a safe password"
        />
      </div>
      <div className="flex mt3">
        <button
          className="pointer mr2 button"
          onClick={() => console.log("onClick")}
        >
          {form.login ? "login" : "create account"}
        </button>
        <button
          className="pointer button"
          onClick={() =>
            setForm({
              ...form,
              login: !form.login,
            })
          }
        >
          {form.login
            ? "need to create an account?"
            : "already have an account?"}
        </button>
      </div>
    </div>
  );
}
