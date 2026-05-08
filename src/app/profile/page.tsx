import Profile from "@/components/Profile";
import { Suspense } from "react";

export default function ProfilePage() {
  return (
    <main className="min-h-screen bg-gray-50 pt-20">
      <Suspense fallback={<div className="min-h-screen flex justify-center items-center">Loading...</div>}>
        <Profile />
      </Suspense>
    </main>
  );
}
