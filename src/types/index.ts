export interface AuthResponse {
  token: string;
}

export interface Category {
  id: number;
  name: string;
  description: string;
}

export interface Course {
  id: number;
  title: string;
  description: string;
  categoryId: number;
  price: number;
  durationHours: number;
  lectures: number;
  startAt: string;
  endAt: string;
  thumbnailPath: string;
}