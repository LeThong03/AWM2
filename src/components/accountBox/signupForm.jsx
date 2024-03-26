import React, { useContext } from "react";
import styled from "styled-components"; // Import styled-components

import {
  BoldLink,
  BoxContainer,
  FormContainer,
  Input,
  LineText,
  MutedLink,
  SubmitButton,
} from "./common";
import { Marginer } from "../marginer";
import { AccountContext } from "./accountContext";

// Define the FormSelect styled-component
const FormSelect = styled.select`
  width: 100%;
  height: 42px;
  outline: none;
  border: 1px solid rgba(200, 200, 200, 0.3);
  border-radius: 5px;
  padding: 0px 10px;
  transition: all 200ms ease-in-out;
  margin-bottom: 5px;
  appearance: none; /* Remove default appearance */

  &:focus {
    outline: none;
    border: 1px solid rgba(241, 196, 15, 1);
  }
`;

export function SignupForm(props) {
  const { switchToSignin } = useContext(AccountContext);
  return (
    <BoxContainer>
      <FormContainer>
        <Input type="text" placeholder="Full name" required />
        <Input type="email" placeholder="Email" required />
        <Input type="password" placeholder="Password" required />
        <Input type="password" placeholder="Confirm password" required />
        <Input type="tel" placeholder="Phone" required />
        <Input type="date" id="dateofbirth"  required />
        <FormSelect id="gender" required>
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </FormSelect>
        <FormSelect id="role" required>
          <option value="">Select Role</option>
          <option value="student">Student</option>
          <option value="coordinator">Faculty Marketing Coordinator</option>
          <option value="manager">University Marketing Manager</option>
          <option value="administrator">Administrator</option>
        </FormSelect>
      </FormContainer>
      <Marginer direction="vertical" margin={10} />
      <SubmitButton type="submit">Sign up</SubmitButton>
      <Marginer direction="vertical" margin="5px" />
      <LineText>
        Already have an account?{" "}
        <BoldLink onClick={switchToSignin} href="#">
          Sign in
        </BoldLink>
      </LineText>
    </BoxContainer>
  );
}
