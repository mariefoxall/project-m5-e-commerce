import React from "react";
import styled from "styled-components";

const Contact = () => {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [subject, setSubject] = React.useState("");
  const [message, setMessage] = React.useState("");

  return (
    <Wrapper>
      <h1>Contact Us</h1>
      <FormWrapper>
        <NameWrapper>
          <NameInput>
            <InputWrapper>
              <Label>First Name: </Label>
              <Input
                name="firstName"
                type="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </InputWrapper>
          </NameInput>
          <NameInput>
            <InputWrapper>
              <Label>Last Name:</Label>
              <Input
                name="lastName"
                type="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </InputWrapper>
          </NameInput>
        </NameWrapper>
        <InputWrapper>
          <Label>Email: </Label>
          <Input
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </InputWrapper>
        <InputWrapper>
          <Label>Subject:</Label>
          <Input
            name="subject"
            type="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />
        </InputWrapper>
        <MessageWrapper>
          <Label>Message:</Label>
          <TextArea
            name="message"
            type="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          ></TextArea>
        </MessageWrapper>
      </FormWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  color: black;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const FormWrapper = styled.div`
  height: 500px;
  width: 800px;
  display: flex;
  flex-direction: column;
  padding: 30px;
`;

const NameWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;
const NameInput = styled.div`
  display: flex;
  flex-direction: column;
  width: 45%;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const Label = styled.label`
  font-size: 15px;
  margin-bottom: 10px;
`;

const Input = styled.input`
  height: 30px;
`;

const MessageWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const TextArea = styled.textarea`
  height: 250px;
`;
export default Contact;
