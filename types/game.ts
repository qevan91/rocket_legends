// types/game.ts

export interface PlayerProfile {
    id: string;
    firstName: string;
    lastName: string;
    alias: string;
    age: number;
    teamName: string;
    personalBank: number;
    forme: number;
    humeur: number;
    confiance: number;
    feeling: number;
}

export interface CalendarEvent {
    id: string;
    date: string;
    dayLabel: string;
    title: string;
    type: 'match' | 'train' | 'rest' | 'scrim';
    isToday: boolean;
    isDone: boolean;
    scoreResult?: string;
}

export interface UpcomingMatch {
    id: string;
    competitionName: string;
    stageName: string;
    format: string;
    homeTeamName: string;
    awayTeamName: string;
    matchTime: string;
}