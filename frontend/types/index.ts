export interface User {
  id: string;
  name: string;
  email: string;
  role: "OFFICER" | "MEMBER";
  voicePart?: string;
}

export interface EventItem {
  id: string;
  title: string;
  date: string;
  location: string;
}

export interface Signup {
  id: string;
  event: EventItem;
  remarks?: string;
  createdAt: string;
}
