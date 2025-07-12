import { useEffect, useState } from "react";
import { NotificationSettings, UserProfile } from "../models";

export const useAccountPage = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [notifications, setNotifications] = useState<NotificationSettings>({
    email: true,
    push: false,
    sms: true,
    marketing: false,
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    async function fetchProfile() {
      // const data = await api.get("/me");
      const data = {
        firstName: "John",
        lastName: "Kowalski",
        email: "john.kowalski@example.com",
        phone: "+48 123 456 789",
        company: "Real Estate Solutions Ltd.",
        bio: "Experienced real estate analyst…",
        joined: "2023-01-15",
      };
      setProfile(data);
    }
    fetchProfile();
  }, []);

  return {
    profile,
    notifications,
    isEditing,
    toggleEdit: () => setIsEditing((e) => !e),
    setNotifications,
  };
};
