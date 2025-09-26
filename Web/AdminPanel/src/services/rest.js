import { create } from "apisauce";
    
export default class Rest {
    constructor() {
        this.api = create({
            baseURL: 'http://localhost:3000',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
    }
}