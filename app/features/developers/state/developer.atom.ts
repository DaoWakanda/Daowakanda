import { IDeveloper, ITriviaRes } from '@/interfaces/developer.interface';
import { atom } from 'recoil';

export const DeveloperProfileAtom = atom<IDeveloper | null>({
  key: 'DeveloperProfileAtom',
  default: null,
});

export const TriviasAtom = atom<ITriviaRes | null>({
  key: 'TriviasAtom',
  default: null,
});
