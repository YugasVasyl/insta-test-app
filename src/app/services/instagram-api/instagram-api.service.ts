import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ContactResponse, FeedResponse, SearchProfileResponse } from '../../models/models';

@Injectable({
  providedIn: 'root'
})
export class InstagramApiService {
  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
  ) { }

  public getUsers(q: string, limit = 5, type = 'search', platform = 'instagram'): Observable<SearchProfileResponse> {
    const params = {
      params: new HttpParams().set('q', q).set('limit', limit).set('type', type).set('platform', platform),
    };

    return of({
      data: [{
        followers: 1231231,
        fullname: 'string1',
        is_verified: false,
        picture: 'string',
        user_id: 'string',
        username: 'string',
      }, {
        followers: 123,
        fullname: 'string2',
        is_verified: false,
        picture: 'string',
        user_id: 'string',
        username: 'string',
      },{
        followers: 3,
        fullname: 'string3',
        is_verified: false,
        picture: 'string',
        user_id: 'string',
        username: 'string',
      },{
        followers: 1231231,
        fullname: 'string4',
        is_verified: false,
        picture: 'string',
        user_id: 'string',
        username: 'string',
      }]
    });

    // return this.http.get<SearchProfileResponse>(`${this.apiUrl}/dict/users`, params);
  }

  public getUserFeed(url: string, after?: string): Observable<FeedResponse> {
    const params = {
      params: new HttpParams().set('url', url),
    };

    if (after) {
      params.params = params.params.set('after', after);
    }

    return of ({
      "items": [
      {
        "pk": 0,
        "display_url": "string",
        "image_versions2": {
          "candidates": [
            {
              "width": 0,
              "height": 0,
              "url": "string"
            }
          ]
        },
        "has_audio": true,
        "is_dash_eligible": "string",
        "video_dash_manifest": "string",
        "number_of_qualities": 0,
        "video_url": "string",
        "taken_at": 0,
        "code": "string",
        "comment_count": 0,
        "like_count": 0,
        "view_count": 0,
        "play_count": 0,
        "like_and_view_counts_disabled": true,
        "media_type": 1,
        "video_duration": 0,
        "caption": {
          "text": "string"
        },
        "title": "string",
        "user": {
          "pk": 0,
          "username": "string",
          "full_name": "string",
          "profile_pic_url": "string",
          "is_private": true,
          "is_verified": true
        },
        "coauthor_producers": [
          {
            "pk": 0,
            "is_verified": true,
            "profile_pic_url": "string",
            "username": "string"
          }
        ],
        "location": {
          "pk": 0,
          "name": "string",
          "lng": 0,
          "lat": 0,
          "address": "string",
          "city": "string"
        },
        "product_type": "feed",
        "can_viewer_reshare": true,
        "usertags": {
          "in": [
            {
              "user": {
                "pk": 0,
                "username": "string",
                "full_name": "string",
                "profile_pic_url": "string",
                "is_private": true,
                "is_verified": true
              },
              "position": [
                0
              ]
            }
          ]
        },
        "sponsor_tags": [
          {
            "sponsor": {
              "pk": 0,
              "username": "string",
              "full_name": "string",
              "profile_pic_url": "string",
              "is_private": true,
              "is_verified": true
            }
          }
        ],
        "carousel_media_count": 0,
        "carousel_media": [
          {
            "pk": 0,
            "display_url": "string",
            "image_versions2": {
              "candidates": [
                {
                  "width": 0,
                  "height": 0,
                  "url": "https://i.ibb.co/PF9V4QW/ig-sample.png"
                }
              ]
            },
            "has_audio": true,
            "is_dash_eligible": "string",
            "video_dash_manifest": "string",
            "number_of_qualities": 0,
            "video_url": "string"
          }
        ],
        "clips_metadata": {
          "music_info": {
            "music_asset_info": {
              "audio_cluster_id": "string",
              "id": "string",
              "title": "string",
              "subtitle": "string",
              "display_artist": "string"
            }
          }
        }
      }
    ],
      "more_available": Math.random() > 0.02,
      "end_cursor": "string",
      "status": "ok"
    }) as any;
    // return this.http.get<FeedResponse>(`${this.apiUrl}/raw/ig/user/feed/`, params);
  }

  public getContacts(url: string, platform = 'instagram'): Observable<ContactResponse> {
    const params = {
      params: new HttpParams().set('url', url).set('platform', platform),
    };

    return of({
      "success": true,
      "user_profile": {
        "user_id": "10529896",
        "username": "niomismart",
        "url": "https://www.instagram.com/niomismart",
        "picture": "https://imgp.sptds.icu/?https://scontent.cdninstagram.com/t51.2885-19/s320x320/60685279_761107720953493_4480687278221426688_n.jpg",
        "fullname": "Niomi Smart",
        "contacts": [
          {
            "type": "email",
            "value": "niomi.smart@gleamfutures.com",
            "formatted_value": "niomi.smart@gleamfutures.com"
          },
          {
            "type": "youtube",
            "value": "niomismart",
            "formatted_value": "https://www.youtube.com/user/niomismart"
          }
        ]
      }
    }) as any;

    // return this.http.get<ContactResponse>(`${this.apiUrl}/exports/contacts`);
  }
}
