"use client";
import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AUTH_TOKEN } from "shared/constants";

const SIGNUP_MUTATION = gql`
  mutation SignupMutation(
    $email: String!
    $password: String!
    $first_name: String!
    $last_name: String!
    $username: String!
  ) {
    signup(
      email: $email
      password: $password
      first_name: $first_name
      last_name: $last_name
      username: $username
    ) {
      token
    }
  }
`;

const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

export default function Login() {
  const [form, setForm] = useState({
    login: true,
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    username: "",
  });
  const router = useRouter();

  const [login] = useMutation(LOGIN_MUTATION, {
    variables: {
      email: form.email,
      password: form.password,
    },
    onCompleted: ({ login }) => {
      localStorage.setItem(AUTH_TOKEN, login.token);
      router.push("/");
    },
  });

  const [signup] = useMutation(SIGNUP_MUTATION, {
    variables: {
      email: form.email,
      password: form.password,
      username: form.username,
      first_name: form.first_name,
      last_name: form.last_name,
    },
    onCompleted: ({ signup }) => {
      localStorage.setItem(AUTH_TOKEN, signup.token);
      router.push("/");
    },
  });

  return (
    <div>
      <h4 className="mv3">{form.login ? "Login" : "Sign Up"}</h4>
      <div className="flex flex-column">
        {!form.login && (
          <>
            <input
              value={form.first_name}
              onChange={(e) =>
                setForm({
                  ...form,
                  first_name: e.target.value,
                })
              }
              type="text"
              placeholder="Your First Name"
            />
            <input
              value={form.last_name}
              onChange={(e) =>
                setForm({
                  ...form,
                  last_name: e.target.value,
                })
              }
              type="text"
              placeholder="Your Last Name"
            />
            <input
              value={form.username}
              onChange={(e) =>
                setForm({
                  ...form,
                  username: e.target.value,
                })
              }
              type="text"
              placeholder="Create a username"
            />
          </>
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
          onClick={() => (form.login ? login() : signup())}
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
