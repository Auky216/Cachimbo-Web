"use client";
import { useUserStore } from "@/store/user.store";


export function useUser() {
  const { user, setUser } = useUserStore();

  return {
    id: user?.id,
    name: user?.name,
    lastName: user?.lastName,
    email: user?.email,
    stage: user?.stage,
    startYear: user?.startYear,
    career: user?.career,
    nickname: user?.nickname,
    isActive: user?.isActive,
    urlPhoto: user?.urlPhoto,
 
  };
}