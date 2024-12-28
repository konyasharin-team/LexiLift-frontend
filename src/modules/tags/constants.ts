import { TagColors } from '@modules/tags';

type TagsKey = 'RED' | 'ORANGE';

export const TagsColors: Record<TagsKey, TagColors> = {
  RED: {
    fontColor: '#e33710',
    backgroundColor: '#ff9b85',
  },
  ORANGE: {
    fontColor: '#fc9700',
    backgroundColor: '#ffe8c6',
  },
} as const;

export const BASE_TAG_COLOR = TagsColors.ORANGE;
