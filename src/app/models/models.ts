export interface SearchProfile {
  followers: number;
  fullname: string;
  is_verified: boolean;
  picture: string;
  user_id: string;
  username: string;
}

export interface SearchProfileResponse {
  data: SearchProfile[];
}

export interface FeedItem {
  display_url: string;
  comment_count: number;
  like_count: number;
  video_url: string;
  carousel_media: {
    image_versions2: {
      candidates: {
        url: string;
      }[];
    };
  }[];
}

export interface FeedResponse {
  items: FeedItem[];
  more_available: boolean;
  end_cursor: string;
}

export enum ContactType {
  email = 'email',
  youtube = 'youtube',
}

export interface ContactResponse {
  success: boolean;
  user_profile: {
    contacts: {
      type: ContactType;
      value: string;
      formatted_value: string;
    }[];
  }
}
