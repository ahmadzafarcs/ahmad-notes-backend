import jwt from 'jsonwebtoken';

export function verifyAuth(req, res, next) {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Unauthorized! Login again' });
        }
        const token = authHeader.split(' ')[1];
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: 'Error Occurs' });
            }
            req.user = decoded;
            next();
        });
    } catch (error) {
        throw new Error(error.message);
    }
}