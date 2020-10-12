import { Character } from 'types/character';
import { RollMetadata } from 'types/roll';

export function basicRequest(
  roller: Character
): RollMetadata & { state: 'requested' } {
  return {
    at: new Date(),
    archive: false,
    state: 'requested',
    roller: {
      type: 'character',
      campaignId: roller.campaignId,
      characterId: roller.characterId,
    },
  };
}
