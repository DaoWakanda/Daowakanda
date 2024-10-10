import { Pagination } from './pagination.interface';

export interface ICreateDeveloperDto {
  firstName: string;
  lastName: string;
  email: string;
  image?: string;
  country: string;
  stateOfResidence: string;
  githubLink: string;
  walletAddress: string;
}

export interface IDeveloper {
  firstName: string;
  lastName: string;
  email: string;
  image: string;
  country: string;
  stateOfResidence: string;
  githubLink: string;
  walletAddress: string;
}

export interface IUpdateDeveloperDto {
  firstName: string;
  lastName: string;
  country: string;
  stateOfResidence: string;
  githubLink: string;
  walletAddress: string;
}

export type TriviaDifficulty = 'novice' | 'amateur' | 'pro';

export type TriviaStatus = 'ongoing' | 'expired';

export interface ITrivia {
  id: string;
  title: string;
  duration: number;
  difficulty: TriviaDifficulty;
  prize: number;
  maxWinners: number;
  winnersCount: number;
  description: string;
  skill: string;
  createdAt: string;
  status: TriviaStatus;
}

export type ITriviaRes = Pagination<ITrivia>;

export interface FetchTriviaDto {
  page?: number;
  numOfItemsPerPage?: number;
}

export interface SubmitTriviaAnswer {
  userId: string;
  triviaId: string;
  githubRepoLink: string;
}

export interface LeaderBoardItem {
  name: string;
  totalAlgos: number;
}
