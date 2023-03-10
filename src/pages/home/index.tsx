import { useState } from "react";
import { questions as mock, colors } from "../../models/mock";

interface IUserData {
  [key: string]: string;
}

export function Home() {
  const [questions, setQuestion] = useState(mock || {});
  const [userData, setUserData] = useState<IUserData[]>();
  const [userResult, setUserResult] = useState<string>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [showTheResult, setShowTheResult] = useState<boolean>(false);
  const perPage = 2;

  const handleSubmitResponse = (
    wordSelected: string,
    colorSelected: string
  ) => {
    if (userData) {
      let ObjectModel: any = { ...userData };
      ObjectModel[wordSelected] = colorSelected;

      setUserData(ObjectModel);
    } else {
      let ObjectModel: any = {};
      ObjectModel[wordSelected] = colorSelected;
      setUserData(ObjectModel);
    }
  };

  const handleMostResult = (data: IUserData[] | undefined, colorsData: any) => {
    setUserResult("");
    if (data) {
      Object.values(data).map((resposta: any) => {
        colorsData[resposta] += 1;
      });
      console.log(colorsData);
      let corRepostaMaior = "";
      let valorRespostaMaior = 0;
      Object.keys(colorsData).forEach((key) => {
        console.log(key, colorsData[key]);
        if (valorRespostaMaior <= colorsData[key]) {
          valorRespostaMaior = colorsData[key];
          corRepostaMaior = key;
          setUserResult(corRepostaMaior);
        }
      });
    }
  };

  const BackgroundStyle: any = {
    display: "flex",
    flexDirection: "column",

    width: "100%",
    height: "100vh",

    alignItem: "center",
    justifyContent: "space-evenly",
    gap: "10%",
  };

  const ContainerQuizStyle: any = {
    display: "flex",
    flexDirection: "row",
    gap: "10px",
    alignItem: "center",
    justifyContent: "space-evenly",
    width: "100%",
    heigth: "100vh",
    fontWeigth: 400,
  };

  const ContainerResultStyle: any = {
    margin: "auto",
    width: "80%",
    heigth: "100%",
    fontWeigth: 400,
  };

  const ContainerOptionsStyle: any = {
    display: "flex",
    flexDirection: "row",
    gap: "10px",
    alignItem: "center",
    justifyContent: "space-evenly",
    width: "100%",
    heigth: "100vh",
    fontWeigth: 400,
  };

  const ButtonOptionsStyle: any = {
    borderRadius: "2.5rem",
    padding: 30,
    border: "solid 1px",
    textTransform: "capitalize",
    fontFamily: " Poppins, 700, sans-serif",
    fontSize: "2em",
    width: "330px",
    height: "200px",
  };

  const ButtonQuizStyle: any = {
    borderRadius: "3.5rem",
    padding: 30,
    border: "solid 1px",
    textTransform: "capitalize",
    fontFamily: " Poppins, 700, sans-serif",
    fontSize: "2.5em",
    width: "320px",
    height: "320px",
  };

  return (
    <div style={BackgroundStyle}>
      <div style={ContainerQuizStyle}>
        {questions &&
          Object.keys(questions).map((question, index) => {
            if (index <= currentPage && index > currentPage - perPage) {
              return (
                <input
                  type="button"
                  style={ButtonQuizStyle}
                  value={question
                    .replace("1", "")
                    .replace("2", "")
                    .replace("3", "")
                    .replace("4", "")}
                  onClick={() => {
                    handleSubmitResponse(question, questions[question]);
                    setCurrentPage((prevState) => prevState + perPage);
                  }}
                />
              );
            }
          })}
      </div>
      {
        <>
          <div style={ContainerOptionsStyle}>
            {userData && (
              <input
                type="button"
                style={ButtonOptionsStyle}
                value="Reiniciar"
                onClick={() => {
                  setCurrentPage(1);
                  setUserData(undefined);
                  setUserResult("");
                  setShowTheResult(false);
                }}
              />
            )}
            {userData && (
              <input
                type="button"
                style={ButtonOptionsStyle}
                value="Terminar pesquisa"
                onClick={() => {
                  setShowTheResult(!showTheResult);
                  handleMostResult(userData, colors);
                }}
              />
            )}
          </div>
          {showTheResult && (
            <div style={ContainerResultStyle}>
              <h1>Sua cor é: {userResult?.toUpperCase()}</h1>
              <hr />
              <h1>As palavras selecionadas foram essas: </h1>
              <ul>
                {userData &&
                  Object.keys(userData).map((data) => (
                    <li>
                      <h3>
                        {data
                          .replace("1", "")
                          .replace("2", "")
                          .replace("3", "")
                          .replace("4", "").toUpperCase()}
                      </h3>
                    </li>
                  ))}
              </ul>
            </div>
          )}
        </>
      }
    </div>
  );
}
