export class Search {

    constructor(
        public term: string,
        public fields: string[] = [
                                'name', 
                                'summary',
                                'cover',
                                'rating',
                                'popularity',
                                'url',
                                'tags',
                                'publishers',
                                'game_engines',
                                'genres',
                                'first_release_date',
                                'pegi'
                            ], 
        public section: string, // Achievements, Character, Collection, Company, etc
        public filter: number[] = [0 , 25, 50, 75], // Rating
        public order: string
    ) {}

}