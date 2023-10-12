import { UsersManager } from "../dao/managers/userManager.js";

export class UserService {
    constructor() {
        this.dao = new UsersManager();
    }
    updateRole(idUser) {
        return this.dao.updateRole(idUser);
    }
    getUser(email) {
        return this.dao.getUser(email);
    }
    update(email, object) {
        return this.dao.update(email, object);
    }
    deleteUser(email) {
        return this.dao.delete(email);
    }
    updateConnection(email) {
        return this.dao.updateConnection(email);
    }
    updateDocuments(idUser, files) {
        return this.dao.updateDocuments(idUser, files);
    }
}   