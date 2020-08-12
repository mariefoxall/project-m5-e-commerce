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
