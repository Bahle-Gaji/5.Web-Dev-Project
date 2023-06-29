"use strict";

let movies;

export default class MoviesDAO {

    static async injectDB(connection) {
        if (movies) {
            return
        }
        try {
            movies = await connection.db(process.env.MOVIEREVIEWS_NS).collection('movies')
        }
        catch (e) {
            console.error(`unable to connect in MoviesDAO: ${e}`)
        }
    }

    static async getMovies({
        filters = null,
        page = 0,
        moviesPerPage = 20
    } = {}) {

        let query;
        if (filters) {
            if ('title' in filters) {
                query = { $text: { $search: filters['title'] } }
            }
            else if ('rated' in filters) {
                query = { 'rated': { $eq: filters['rated'] } }
            }
        }

        let cursor;
        try {
            cursor = await movies           //cursor fetches documents in batches to reduce memory consumption and network bandwidth usage
                .find(query)
                .limit(moviesPerPage)
                .skip(moviesPerPage * page)         //skip applies first then limit

            const moviesList = await cursor.toArray();
            const totalNumMovies = await movies.countDocuments(query);
            return { moviesList, totalNumMovies }
        }
        catch (e) {
            console.error(`Unable to issue find command, ${e}`)
            return { moviesList: [], totalNumMovies: 0 }
        }
    }
}