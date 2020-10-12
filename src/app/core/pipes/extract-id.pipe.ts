import { Pipe, PipeTransform } from '@angular/core';

import { Id } from 'types/idtypes';

@Pipe({
  name: 'extractId',
})
export class ExtractIdPipe implements PipeTransform {
  transform(value: Id): Id {
    switch (value.type) {
      case 'campaign':
        return { type: 'campaign', campaignId: value.campaignId };
      case 'character':
        return {
          type: 'character',
          characterId: value.characterId,
          campaignId: value.campaignId,
        };
      case 'user':
        return {
          type: 'user',
          userId: value.userId,
        };
      case 'page': {
        return {
          type: 'page',
          pageId: value.pageId,
          collectionId: value.collectionId,
        };
      }
    }
  }
}
