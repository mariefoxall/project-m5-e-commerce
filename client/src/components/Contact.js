import React from "react";
import styled from "styled-components";

const Contact = () => {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [subject, setSubject] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [contact, setContact] = React.useState(false);

  const allFieldsCompleted =
    firstName.length > 0 &&
    lastName.length > 0 &&
    email.length > 0 &&
    subject.length > 0 &&
    message.length > 0;

  let sendButtonStyle = {};

  if (allFieldsCompleted === false) {
    sendButtonStyle = {
      cursor: "auto",
      color: "lightgrey",
      backgroundColor: "grey",
    };
  }

  const handleContact = (firstName, lastName, email, subject, message) => {
    fetch(`/contact`, {
      method: "POST",
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        email: email,
        subject: subject,
        message: message,
      }),

      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };
  return (
    <Wrapper>
      {!contact ? (
        <>
          <h1>Contact Us</h1>
          <FormWrapper>
            <NameWrapper>
              <NameInput>
                <InputWrapper>
                  <Label>First Name* </Label>
                  <Input
                    name="firstName"
                    type="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required="required"
                  />
                </InputWrapper>
              </NameInput>
              <NameInput>
                <InputWrapper>
                  <Label>Last Name*</Label>
                  <Input
                    name="lastName"
                    type="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required="required"
                  />
                </InputWrapper>
              </NameInput>
            </NameWrapper>
            <InputWrapper>
              <Label>Email* </Label>
              <Input
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required="required"
              />
            </InputWrapper>
            <InputWrapper>
              <Label>Subject*</Label>
              <Input
                name="subject"
                type="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required="required"
              />
            </InputWrapper>
            <MessageWrapper>
              <Label>Message*</Label>
              <TextArea
                name="message"
                type="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required="required"
              ></TextArea>
            </MessageWrapper>
            <SendButton
              disabled={allFieldsCompleted ? false : true}
              style={sendButtonStyle}
              onClick={(ev) => {
                handleContact(firstName, lastName, email, subject, message);
                setContact(true);
              }}
            >
              SEND
            </SendButton>
          </FormWrapper>
        </>
      ) : (
        <ConfirmationWrapper>
          <ConfirmationText>
            <h2 style={{ marginBottom: "50px" }}>
              we've received your message
            </h2>
            <p>our team will get back to you as soon as possible.</p>
          </ConfirmationText>
        </ConfirmationWrapper>
      )}
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

const SendButton = styled.button`
  width: 200px;
  padding: 10px 0px;
  align-self: center;
  margin-top: 23px;
  margin-bottom: 20px;
  border: none;
  background: black;
  color: white;

  &:hover {
    cursor: pointer;
  }
`;

const ConfirmationWrapper = styled.div`
  color: white;
  margin: 0;
  padding: 0;
  height: calc(100vh - 140px);
  width: 100vw;
  background-size: cover;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url("https://travel.spotcoolstuff.com/wp-content/uploads/2010/08/best-outdoor-gear-m.jpg");
`;

const ConfirmationText = styled.div`
  background: rgba(0, 0, 0, 0.5);
  top: 50%;
  left: 33%;
  position: fixed;
  padding: 40px;
`;

export default Contact;
