import supertest from "supertest";
import chai from 'chai';

const expect = chai.expect;
const requester = supertest('http://localhost:8080');

describe('Prueba de session', () => {
    let cookie;
    beforeEach(function () {
        this.timeout(5000);
    })
    it('El dao debe crear un nuevo usuario', async function () {
        const newUser = {
            first_name: "Ejemplo",
            last_name: "Ejemplo",
            email: "ejemplo@ejemplo.com",
            age: 18,
            password: "123456"
        }
        const { statusCode, ok } = await requester.post('/api/sessions/register')
        .send(newUser);
        expect(statusCode).to.equal(201);
        expect(ok).to.equal(true);
    })
    it('El dao debe logear al nuevo usuario', async function () {
        const result = await requester.post('/api/sessions/login').send({ email: 'ejemplo@ejemplo.com', password: "123456" })
        const cookieResult = result.headers['set-cookie'][0];
        cookie = cookieResult
        expect(result.statusCode).to.be.equal(200);
    })
    it('El dao debe borrar el nuevo usuario', async function () {
        const { statusCode } = await requester.post('/api/sessions/deleteUser')
        .send({email: "ejemplo@ejemplo.com"})
        expect(statusCode).to.equal(200);
    })
    it('Se debe cerrar la sesión', async function () {
        const result = await requester.get('/api/sessions/logout').set('Cookie', cookie)
        expect(result.statusCode).to.be.equal(302);
    })
})