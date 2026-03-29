"use client";

import { useState, useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import type { Session } from "@supabase/supabase-js";

type PostForm = {
  title: string;
  slug: string;
  content: string;
  summary: string;
  published: boolean;
};

const defaultForm: PostForm = {
  title: "",
  slug: "",
  content: "",
  summary: "",
  published: false,
};

export default function AdminPage() {
  const supabase = createClientComponentClient();
  const [session, setSession
