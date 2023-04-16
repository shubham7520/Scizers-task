import Contact from "./components/Contact/Contact";
import React from "react";
import Navbar from "./components/Navbar/Navbar";
import Axios from "./api";

function App() {
  const [searchTerm, setSearchTerm] = React.useState("")
  const [contacts, setContacts] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [showAlert, setShowAlert] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState(null);
  const [isError, setIsError] = React.useState(false);


  const getContacts = async () => {
    await Axios("/contact")
      .then((res) => {
        setContacts(res.data.data);
      })
      .catch((err) => {
        setIsError(true);
        setShowAlert(true);
        setAlertMessage(err.response.data.message);
      });
    setIsLoading(false);
  };

  const searchHandler = async () => {
    await Axios(`/contact?searchTerm=${searchTerm}`)
      .then((res) => {
        setContacts(res.data.data);
      })
      .catch((err) => {
        setIsError(true);
        setShowAlert(true);
        setAlertMessage(err.response.data.message);
      });
    setIsLoading(false);
  };

  React.useEffect(() => {
    getContacts();
  }, []);

  React.useEffect(() => {
    searchHandler();
  }, [searchTerm]);

  return (
    <>
      <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <Contact contacts={contacts} getContacts={getContacts}
        isLoading={isLoading} showAlert={showAlert} setShowAlert={setShowAlert} isError={isError} setIsError={setIsError} alertMessage={alertMessage} setAlertMessage={setAlertMessage} />
    </>
  );
}

export default App;
