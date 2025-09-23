import jwt from "jsonwebtoken";
export class Token {
    constructor() {
        this.secret = "123456";
    }
    validateToken(token) {
        try {
            jwt.verify(token, this.secret);
            return true;
        }
        catch (err) {
            console.log(err);
            return false;
        }
    }
    createToken(nameUser) {
        const payload = { nameUser };
        return jwt.sign(payload, this.secret, { expiresIn: "1h" });
    }
}
//# sourceMappingURL=token.js.map