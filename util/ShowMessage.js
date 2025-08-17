export const ShowMessage = (Message, setMessage) => {
    setMessage(null); // این باعث میشه که state پاک بشه
    setTimeout(() => {
        setMessage(Message)
    }, 1);
}