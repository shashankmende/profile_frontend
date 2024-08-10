import React, { useState } from "react";
import "./index.css";
import { AiOutlineDelete } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";

const ProfessionalDetails = (props) => {
    const {setEducationFunction}=props
    const [educationLst, setEducationLst] = useState([]);
    const [formData, setFormData] = useState({
        degreeName: "",
        stream: "",
        startYear: "",
        endYear: "",
        isEdit: false,
        id: null,
    });
    const [formVisible, setFormVisible] = useState(false); // State to control form visibility

    const onClickAdd = () => {
        setFormData({
            degreeName: "",
            stream: "",
            startYear: "",
            endYear: "",
            isEdit: false,
            id: Date.now(),
        });
        setFormVisible(true); // Show the form
    };

    const onClickSaveEducation = (e) => {
        e.preventDefault(); // Prevent form submission
        if (formData.degreeName && formData.stream && formData.startYear && formData.endYear) {
            if (formData.isEdit) {
                setEducationLst(educationLst.map((edu) => (edu.id === formData.id ? formData : edu)));
            } else {
                setEducationLst([...educationLst, formData]);
            }
            setFormData({
                degreeName: "",
                stream: "",
                startYear: "",
                endYear: "",
                isEdit: false,
                id: null,
            });
            setFormVisible(false); 
            setEducationFunction()
            // toast.success("Education added successfully!")
            alert("Education saved!")
            // toast.success("Education saved!")

        } else {
            alert("Please faill in all fields."); // Simple form validation
            // toast.warning("Please fill in all fields.")
        }
    };

    const onClickDeleteEducation = (id) => {
        const newList = educationLst.filter((each) => each.id !== id);
        setEducationLst(newList);
    };

    const onClickEditEducation = (id) => {
        const education = educationLst.find((edu) => edu.id === id);
        setFormData({ ...education, isEdit: true });
        setFormVisible(true); 
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value.trim(),
        });
    };

    const onClickCancel = () => {
        setFormVisible(false); // Hide the form without saving
        setFormData({
            degreeName: "",
            stream: "",
            startYear: "",
            endYear: "",
            isEdit: false,
            id: null,
        });
    };

    const onClickSubmit = (e) => {
        e.preventDefault();
    
        // Map the educational details to a new list without IDs and isEdit flags
        const newList = educationLst.map(each => ({
            degreeName: each.degreeName,
            stream: each.stream,
            startYear: each.startYear,
            endYear: each.endYear,
        }));
    
        // Call the setEducationFunction with the updated list
        setEducationFunction(newList);
    
        // Clear the education list after submission
        setEducationLst([]);
    
        // Provide feedback to the user
        alert("Education details saved successfully!");
        // toast.success('Education details saved successfully!')
    
        // Optionally reset the form data and hide the form if needed
        setFormData({
            degreeName: "",
            stream: "",
            startYear: "",
            endYear: "",
            isEdit: false,
            id: null,
        });
        setFormVisible(false);
    };
    
    

    return (
        <>
        {/* <ToastContainer position="top-center"/> */}
            <div className="heading_button_wrapper">
                <h1 className="personal_details_h1">Educational Details</h1>
                <button type="button" onClick={onClickAdd} className="btn btn-primary">
                    + Add Education
                </button>
            </div>

            {formVisible && (
                <div className="education_form_wrapper">

                    <div className="degree_name_wrapper">
                        <label htmlFor={`degree_name_${formData.id}`}>
                            Degree Name<sup style={{ color: "red" }}>*</sup>
                        </label>
                        <input
                            id={`degree_name_${formData.id}`}
                            name="degreeName"
                            type="text"
                            placeholder="Degree Name"
                            className="company_name_input"
                            required
                            value={formData.degreeName}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="stream_container">
                        <label htmlFor={`stream_${formData.id}`}>
                            Stream<sup style={{ color: "red" }}>*</sup>
                        </label>
                        <br />
                        <input
                            id={`stream_${formData.id}`}
                            name="stream"
                            type="text"
                            placeholder="Stream"
                            className="company_name_input"
                            required
                            value={formData.stream}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label htmlFor={`start_year_${formData.id}`}>
                            Start Year<sup style={{ color: "red" }}>*</sup>
                        </label>
                        <br />
                        <input
                            id={`start_year_${formData.id}`}
                            name="startYear"
                            type="number"
                            required
                            placeholder="Start Year"
                            className="company_name_input"
                            value={formData.startYear}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label htmlFor={`end_year_${formData.id}`}>
                            End Year<sup style={{ color: "red" }}>*</sup>
                        </label>
                        <br />
                        <input
                            id={`end_year_${formData.id}`}
                            name="endYear"
                            type="number"
                            required
                            placeholder="End Year"
                            className="company_name_input"
                            value={formData.endYear}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form_actions">
                        <button
                            type="submit"
                            className="btn btn-success"
                            onClick={onClickSaveEducation}
                        >
                            {formData.isEdit ? "Update" : "Save"}
                        </button>
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={onClickCancel}
                            style={{ marginLeft: "10px" }}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}

            {educationLst.length > 0 && (
                <div style={{minHeight:"50vh",display:'flex',flexDirection:"column",justifyContent:'space-between'}}>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Degree Name</th>
                            <th>Stream</th>
                            <th>Start Year</th>
                            <th>End Year</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {educationLst.map((each) => (
                            <tr key={each.id}>
                                <td>{each.degreeName}</td>
                                <td>{each.stream}</td>
                                <td>{each.startYear}</td>
                                <td>{each.endYear}</td>
                                <td>
                                    <CiEdit
                                        size={20}
                                        style={{ marginRight: "15px", cursor: "pointer" }}
                                        onClick={() => onClickEditEducation(each.id)}
                                    />
                                    <AiOutlineDelete
                                        size={20}
                                        style={{ cursor: "pointer" }}
                                        onClick={() => onClickDeleteEducation(each.id)}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="submit_button_wrapper">
                <button type="submit" className="submit_button"  onClick={onClickSubmit}>Save</button>
                </div>
                
            </div>
            )}
            
        </>
    );
};

export default ProfessionalDetails;
