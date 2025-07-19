import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

export function useRequireAuth() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const token = localStorage.getItem("token");

    if (!token) {
      if (pathname !== "/login" && pathname !== "/register") {
        router.replace("/login");
      }
    } else {
      if (pathname === "/login" || pathname === "/register") {
        router.replace("/dashboard");
      }
    }
  }, [router, pathname]);
}
