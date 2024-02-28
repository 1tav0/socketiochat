import { Link } from "react-router-dom";
import GenderCheckbox from "./GenderCheckbox";
import { useState } from "react";
import useSignup from "../../hooks/useSignup";

const SignUp = () => {

  const [inputs, setInputs] = useState({
    fullName: '',
    username: '',
    password: '',
    confirmPassword: '',
    gender: ''
  })

  // spread the old inputs and add the gender to it
  const handleCheckBoxChange = (gender) => {
    setInputs({...inputs, gender})
  }

  const { loading,signup } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(inputs);
  }

  return (
    <div className="min-w-96 mx-auto flex flex-col items-center justify-center">
      <div className="bg-gray-400 w-full p-6 rounded-lg shadow-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className=" text-3xl font-semibold text-center text-gray-300">
          SignUp
          <span className="text-blue-500">
            {" "}Chat 
          </span>
        </h1>

        <form
          onSubmit={handleSubmit}
        >
          <div>
            <label className="label p-2">
              <span className="text-base label-text">
                Full Name
              </span>
            </label>
            <input
              type="text"
              placeholder="Jhon Doe"
              className="w-full input input-bordered h-10"
              value={inputs.fullName}
              onChange={(e)=>setInputs({...inputs, fullName: e.target.value})}
            />
          </div>

          <div>
            <label className="label p-2">
              <span className="text-base label-text">
                Username
              </span>
            </label>
            <input
              type="text"
              placeholder="jhondoe"
              className="w-full input input-bordered h-10"
              value={inputs.username}
              onChange={((e)=>setInputs({...inputs, username: e.target.value}))}
            />
          </div>

          <div>
            <label className="label p-2">
              <span className="text-base label-text">
                Password
              </span>
            </label>
            <input
              type="password"
              placeholder="password"
              className="w-full input input-bordered h-10"
              value={inputs.password}
              onChange={(e)=>setInputs({...inputs, password: e.target.value})}
            />
          </div>

          <div>
            <label className="label p-2">
              <span className="text-base label-text">
                Confirm Password
              </span>
            </label>
            <input
              type="text"
              placeholder="Jhone Doe"
              className="w-full input input-bordered h-10"
              value={inputs.confirmPassword}
              onChange={(e)=>setInputs({...inputs, confirmPassword: e.target.value})}
            />
          </div>

          {/* GENDER CHECKBOX GOES HERE */}
          {/* add the made method as a callback */}
          <GenderCheckbox
            onCheckboxChange={handleCheckBoxChange}
            selectedGender={inputs.gender}
          />

          <Link to="/login" className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block">
            Already have an account ?
          </Link>

          <div>
            <button
              className="btn bt-block btn-sm mt-2 border border-slate-700"
              disabled={loading}
            >
              {
                loading ?
                  <span className="loading loading-spinner"></span>
                  :
                  "Sign Up"
              }
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignUp


// STARTER CODE FOR THE SIGNUP COMPONENT 
// import GenderCheckbox from "./GenderCheckbox"

// const SignUp = () => {
//   return (
//     <div className="min-w-96 mx-auto flex flex-col items-center justify-center">
//       <div className="bg-gray-400 w-full p-6 rounded-lg shadow-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
//         <h1 className=" text-3xl font-semibold text-center text-gray-300">
//           SignUp
//           <span className="text-blue-500">
//             {" "}Chat 
//           </span>
//         </h1>

//         <form>
//           <div>
//             <label className="label p-2">
//               <span className="text-base label-text">
//                 Full Name
//               </span>
//             </label>
//             <input
//               type="text"
//               placeholder="Jhon Doe"
//               className="w-full input input-bordered h-10"
//             />
//           </div>

//           <div>
//             <label className="label p-2">
//               <span className="text-base label-text">
//                 Username
//               </span>
//             </label>
//             <input
//               type="text"
//               placeholder="jhondoe"
//               className="w-full input input-bordered h-10"
//             />
//           </div>

//           <div>
//             <label className="label p-2">
//               <span className="text-base label-text">
//                 Password
//               </span>
//             </label>
//             <input
//               type="password"
//               placeholder="password"
//               className="w-full input input-bordered h-10"
//             />
//           </div>

//           <div>
//             <label className="label p-2">
//               <span className="text-base label-text">
//                 Confirm Password
//               </span>
//             </label>
//             <input
//               type="text"
//               placeholder="Jhone Doe"
//               className="w-full input input-bordered h-10"
//             />
//           </div>

//           {/* GENDER CHECKBOX GOES HERE */}
//           <GenderCheckbox />

//           <a href="#" className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block">
//             Already have an account ?
//           </a>

//           <div>
//             <button className="btn bt-block btn-sm mt-2 border border-slate-700">
//               Sign-Up
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   )
// }

// export default SignUp