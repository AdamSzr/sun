"use client";

import React, { useActionState } from 'react';
import { login } from './actions';

export default function LoginForm() {
  const [state, action, pending] = useActionState(login, { success:null });

  return (
    <form action={action}>
      <input type="text" name="name" />
      <input type="text" name="password" />
      <button type="submit">login</button>
    </form>
  );
}
