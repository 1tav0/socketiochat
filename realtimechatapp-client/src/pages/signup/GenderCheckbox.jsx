
const GenderCheckbox = ({ onCheckboxChange, selectedGender }) => {
  // depending on the selectedGender the class name will be selected else no classname 
  return (
    <div className="flex">
      <div className="form-control">
        <label
          className={`label 
            gap-2
            cursor-pointer
            ${selectedGender === "male" ? "selected" : ""}
            `
          }>
          <span>
            Male
          </span>
          <input type="checkbox"
            className="checkbox border-slate-900"
            checked={selectedGender === "male"}
            onChange={()=>onCheckboxChange("male")}
          />
        </label>
      </div>
      <div className="form-control">
        <label
          className={`label 
            gap-2
            cursor-pointer
            ${selectedGender === "female" ? "selected" : ""}
            `
          }>
          <span>
            Female
          </span>
          <input type="checkbox"
            className="checkbox border-slate-900"
            checked={selectedGender === "female"}
            onChange={()=>onCheckboxChange("female")}
          />
        </label>
      </div>
    </div>
  )
}

export default GenderCheckbox


//STARTER CODE FOR THE GENDER CHECKBOX COMPONENT 

// const GenderCheckbox = () => {
//   return (
//     <div className="flex">
//       <div className="form-control">
//         <label className={`label gap-2 cursor-pointer`}>
//           <span>
//             Male
//           </span>
//           <input type="checkbox"
//             className="checkbox border-slate-900" />
//         </label>
//       </div>
//       <div className="form-control">
//         <label className={`label gap-2 cursor-pointer`}>
//           <span>
//             Female
//           </span>
//           <input type="checkbox" className="checkbox border-slate-900" />
//         </label>
//       </div>
//     </div>
//   )
// }

// export default GenderCheckbox