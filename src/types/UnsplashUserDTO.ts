export type UnsplashUserDTO = {
  id: string;
  username: string;
  name: string;
  first_name: string;
  last_name: string;
  profile_image: UserProfileImageType;
};

type UserProfileImageType = {
  small: string;
  medium: string;
  large: string;
};
