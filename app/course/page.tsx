import { redirect } from "next/navigation";

// The course home now lives at "/". This keeps old /course links and bookmarks working.
export default function CoursePage() {
  redirect("/");
}
