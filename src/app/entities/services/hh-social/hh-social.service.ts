import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { HH_SOCIAL_MEDIA } from 'app/static/constants/api.contants';
import { EntityService } from '../entity.service';
import { SocialMedia } from 'app/entities/interfaces/socialMedia.interface';

@Injectable({ providedIn: 'root' })
export class HhSocialService extends EntityService<SocialMedia> {
    socialMedia$: Subject<any> = new BehaviorSubject(null);
    baseUrl = HH_SOCIAL_MEDIA.BASE;
    constructor() {
      super();
    }
}

