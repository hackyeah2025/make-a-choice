export default class ApiService {
    static async getCards() {
        const response = await fetch("http://localhost:3000/cards");
        return response.json();
    }
}