import React from "react";
import { FaEdit } from "react-icons/fa";
import Sidebar from "../Sidebar/Sidebar";
import Placeholder from "../../Assets/placeholder.png";
import Input from "../Common/Input";
import Form from "../Common/Form";
import Joi from "joi";
import Spinner from "../Common/Spinner";
import {
  createSymptom,
  sendNotification,
  updateSymptom,
} from "../../APIS/apis";
import { useLocation, useNavigate } from "react-router";
import { localDomain as apiUrl } from "../utils/utils";
import HtmlEditor from "../Common/HtmlEditor";

class AddSymptom extends Form {
  state = {
    loading: true,
    file: null,
    isEditing: false,
    image: null,
    id: null,
    data: {
      symptom: "",
    },
    causes: "",
    solutions: "",
    errors: {},
  };

  async componentDidMount() {
    const { symptom } = this.props.location.state;
    console.log(symptom);
    if (symptom) {
      const data = { ...this.state.data };
      data.symptom = symptom.symptom;
      this.setState({
        data,
        id: symptom._id,
        image: symptom.image,
        causes: symptom.causes,
        solutions: symptom.solutions,
        isEditing: true,
      });
    }

    this.setState({ loading: false });
  }

  objectSchema = {
    symptom: Joi.string().empty().required(),
  };

  fileInputHandler = (e) => {
    this.setState({ file: e.target.files[0] });
  };
  causesHandler = (value) => {
    this.setState({ causes: value });
  };
  solutionHandler = (value) => {
    this.setState({ solutions: value });
  };

  inputHandler1 = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  doSubmit = async () => {
    const { symptom, weekNo } = this.state.data;
    const { causes, solutions } = this.state;
    try {
      this.setState({ loading: true });

      const formData = new FormData();
      formData.append("symptom", symptom);
      formData.append("causes", causes);
      formData.append("solutions", solutions);
      formData.append("weekNo", weekNo);
      formData.append("file", this.state.file);

      if (this.state.isEditing) {
        await updateSymptom(formData, this.state.id);
        await sendNotification("Common Symptom", symptom + " is Updated!");
      } else {
        await createSymptom(formData);
        await sendNotification("Common Symptom", symptom + " is created!");
      }
      alert(
        this.state.isEditing
          ? "Updated successfully!!"
          : "Created successfully!!"
      );

      this.props.navigate("/symptoms");
      this.setState({ loading: false });
    } catch (error) {
      this.setState({ loading: false });
      alert(error.message);
    }
  };

  render() {
    const { errors, loading, data } = this.state;
    return (
      <Sidebar>
        {loading ? (
          <Spinner />
        ) : (
          <div>
            <div className="edit__profile_container_vendor">
              <div className="edit__profile_title">
                <h3 className="primary-color">
                  {this.state.isEditing ? "Edit Common Symptom" : "Add Common Symptom"}
                </h3>
              </div>

              <div className="card p-3">
                <div className="vendor__profile_img mb-3">
                  <div className="image-upload">
                    <label htmlFor="file-input" className="label">
                      <FaEdit />
                    </label>
                    <input
                      id="file-input"
                      type="file"
                      name="file"
                      accept="image/*"
                      onChange={this.fileInputHandler}
                    />
                  </div>
                  <img
                    src={
                      this.state.file
                        ? URL.createObjectURL(this.state.file)
                        : this.state.image
                        ?  apiUrl + "images/" + this.state.image
                        : Placeholder
                    }
                    alt=""
                    className="image"
                  ></img>
                </div>
                <Input
                  name="symptom"
                  label="Symptom"
                  onChange={this.inputHandler}
                  error={errors.symptom}
                  value={data.symptom}
                  type="text"
                  placeholder="Enter symptom "
                />

                <HtmlEditor
                  descriptionHandler={this.causesHandler}
                  label="Causes"
                  longDescription={this.state.causes}
                />

                <HtmlEditor
                  descriptionHandler={this.solutionHandler}
                  label="Solutions"
                  longDescription={this.state.solutions}
                />

                <button
                  onClick={this.submitForm}
                  className="btn primary-button"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        )}
      </Sidebar>
    );
  }
}

function WithNavigate(props) {
  let navigate = useNavigate();
  const location = useLocation();
  return <AddSymptom {...props} location={location} navigate={navigate} />;
}

export default WithNavigate;
