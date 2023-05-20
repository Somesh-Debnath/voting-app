import { useRouter } from "next/router";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import useAuth from "../hooks/useAuth";
//import constants from '../constants'

interface Inputs {
  email: string;
  password: string;
}
function login() {
  const [login, setLogin] = useState(false);

  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signIn, signUp } = useAuth();
  const { user, loading } = useAuth();
  // console.log(user);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async ({ email, password }) => {
    // user login
    if (email !== process.env.ADMIN_EMAIL) {
      if (login) {
        await signIn(email, password);
      } else {
        await signUp(email, password);
      }
    } else {
      alert("Admin can't login as a user");
    }
  };

  const [adminLogin, setAdminLogin] = useState(false);
  const router = useRouter();

  // admin sign
  const handleClick = async () => {
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPass = process.env.PASSWORD;
    try {
      // Check if the email is allowed
      if (userEmail === adminEmail && password === adminPass) {
        await signIn(userEmail, password);
        router.push("./adminDashboard");
      } else {
        alert("You are not an admin! Please use the login or signup button!!");
      }

      // Reset form and error message
      setUserEmail("");
      setPassword("");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="flex">
      <div className="max-w-xl items-center pt-28 pl-16 pr-12 h-screen">
        <img className="object-cover" src="/userlogin.png" alt="userlogin" />
      </div>
      <div className="flex flex-col pt-16 pl-24  max-w-lg">
        <h1 className="text-4xl font-bold mb-7">Welcome !</h1>
        <p className="text-sm font-normal leading-4">
          Register as a voter on the decentralized voting platform to vote your
          prefered candidate
        </p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col mt-8">
            <input
              className="bg-white rounded-full p-3 text-gray-500 mb-3
                    border-[1.5px] border-[#93278F] 
                    w-full outline-none"
              type="email"
              placeholder="Enter your email"
              {...register("email", { required: true })}
              onChange={(event) => setUserEmail(event.target.value)}
            />

            {errors.email && (
              <p className="p-1 text-[13px] font-light text-orange-500">
                Please enter a valid email
              </p>
            )}

            <input
              className="bg-white rounded-full p-3 text-gray-500 
                    my-2 border-[1.5px] border-[#93278F] 
                    w-full outline-none"
              type="password"
              placeholder="Enter your password"
              {...register("password", { required: true })}
              onChange={(event) => setPassword(event.target.value)}
            />

            {errors.password && (
              <p className="p-1 text-[13px] font-light text-orange-500">
                Your password must contain between 4 and 60 characters{" "}
              </p>
            )}

            <p className="text-sm my-6">
              By clicking the sign up button, you agree with our Terms and
              Condtions
            </p>
            <button
              className="bg-[#93278F] rounded-full px-1 py-3 text-white font-semibold"
              onClick={() => setLogin(false)}
            >
              Sign Up
            </button>
          </div>

          <div className="flex flex-col mt-5">
            {/* admin sign in */}
            {/* <button type='button' onClick={()=>{ 
            router.push('./adminDashboard')}} */}
            <button
              onClick={() => handleClick()}
              type="button"
              className=" font-medium text-center"
            >
              Sign in as Admin
            </button>

            <span
              className=" mb-3 text-center
            "
            >
              Already have an account,
            </span>
            <button
              onClick={() => setLogin(true)}
              className="text-[#93278F] text-lg font-bold"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default login;
