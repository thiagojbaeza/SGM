import jwt from "jsonwebtoken";

export class Token {
    private secret = "123456";

    public validateToken(token: string){
        try {
            jwt.verify(token, this.secret);
            return true;
        } catch (err) {
            console.log(err);
            return false;
        }
    }

    public createToken(nameUser: string){
        const payload = {nameUser};
        return jwt.sign(payload, this.secret, {expiresIn:"1h"});
    }
}