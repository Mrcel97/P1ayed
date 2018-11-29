export class Game {

    constructor(
        public id: number,
        public name: string,
        public summary: string,
        public cover: Cover,
        public rating: number,
        public popularity: number,
        public url: string,
        public tags: number[],
        public publishers: number[],
        public game_engines: number[],
        public genres: number[],
        public first_release_date: number,
        public pegi: Pegi,
    ) {}
}

export class Company {
    constructor(
        public id: number,
        public name: string,
        public description: string,
        public createdAt: number,
        public logo: Logo,
        public url: string, //igdb url
        public website: string, //official url
        public twitter: string,
    ) {}
}

export class GameEngine {
    constructor(
        public id: number,
        public name: string,
        public url: string
    ) {}
}

export class Pegi {
    constructor(
        public rating: number,
        public synopsis: string
    ) {}
}

export class Logo {
    constructor(
        public url: string
    ) {}
}

export class Cover {
    constructor(
        public url: string
    ) {}
}