import { instance } from "./index";

export const UsersAPI = {
  getOne(id): any {
    return instance.get(`auth/${id}`);
  },
  auth(token): any {
    return instance.get("auth/", {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
  login(props): any {
    return instance.post("auth/", props);
  },
  registration(props): any {
    return instance.post("auth/registration", props);
  },
};
