import "./styles/h1.scss";

const AppH1 = ({ text, childeren }) => {
  return (
    <>
      <h1 className="heading">
        <span>{text} </span> {childeren}
      </h1>
    </>
  );
};

export default AppH1;
