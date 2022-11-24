import { setItem } from "../../storage/storage";
import Http from "../../interceptor/interceptor";
import jwt_decode from "jwt-decode";
import { toast } from "react-toastify";

const MainUrl = process.env.REACT_APP_API_PATH;

const LoginUser = async (userObject) => {
  try {
    const result = await Http.post(`${MainUrl}auth/login`, userObject);

    const token = result.data.result.jwtToken;
    const user = result.data.result.studentModel;

    setItem("token", token);
    setItem("user", JSON.stringify(user));

    const decode = jwt_decode(token);
    setItem("role", decode.role);
    toast.success("!با موفقیت وارد شدید");

    return result.data;
  } catch (error) {
    toast.error("ایمیل یا رمز عبور وارد شده اشتباه می باشد!");
    return false;
  }
};

export default LoginUser;
