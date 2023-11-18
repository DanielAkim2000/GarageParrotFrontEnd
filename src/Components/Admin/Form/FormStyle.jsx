import styled from "styled-components";
import { Field } from "formik";

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width:100%
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  width: 300px;
`;

const Label = styled.label`
  font-weight: bold;
  @media screen and (max-width: 500px) {
    width:40%;
    margin-left:50px;
  }
`;

const Input = styled(Field)`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  @media screen and (max-width: 500px) {
    width:40%;
    margin-left:50px;
  }
`;

const FileInput = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  @media screen and (max-width: 500px) {
    width:50%;
    margin-left:50px;
  }
`;

const ErrorMessageContainer = styled.div`
  color: red;
  font-size: 14px;
  margin-top: 5px;
`;

const SubmitButton = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  margin-top: 20px;
  @media screen and (max-width: 500px) {
    width:40%;
    margin-left:50px;
  }
`;

const ImageInput = styled.img`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export {
  FormContainer,
  FormGroup,
  Label,
  Input,
  FileInput,
  ErrorMessageContainer,
  SubmitButton,
  ImageInput,
};
