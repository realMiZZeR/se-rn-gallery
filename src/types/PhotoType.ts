type PhotoUrlsType = {
  raw: string;
  full: string;
  regular: string;
  small: string;
  thumb: string;
  small_s3: string;
};

/**
 * Тип для извлечения данных из Unsplash API.
 */
export type PhotoType = {
  id: string;
  created_at: Date;
  color: string;
  description: string;
  alt_description: string;
  urls: PhotoUrlsType;
  likes: number;
};
