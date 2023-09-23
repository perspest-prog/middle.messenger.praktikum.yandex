import BaseAPI from "./BaseAPI";

class UserAPI extends BaseAPI {
    constructor() {
        super("/user");
    }
}

export default UserAPI;
