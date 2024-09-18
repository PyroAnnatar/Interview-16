import React, { useState } from "react";

function App() {
  const PLAYERS = [
    "Ali",
    "Namık",
    "Eda",
    "Ebru",
    "Suzan",
    "Samet",
    "Engin",
    "Halit",
  ];

  return <FormTeams players={PLAYERS} />;
}

const FormTeams = ({ players }) => {
  const [roster, setRoster] = useState(players);
  const [team, setTeam] = useState(true);
  const [team1, setTeam1] = useState([]);
  const [team2, setTeam2] = useState([]);
  function handleRandom() {
    const rando = [...players].sort(() => Math.random() - 0.5);
    const evenDistrib = Math.ceil(rando.length / 2);
    setTeam1(rando.slice(0, evenDistrib));
    setTeam2(rando.slice(evenDistrib));
    setRoster([]);
  }
  function handleReset() {
    setRoster(players);
    setTeam(true);
    setTeam1([]);
    setTeam2([]);
  }

  function handleAdd(player) {
    if (team) {
      setRoster((prev) => prev.filter((person) => person !== player));
      setTeam1((prev) => [...prev, player]);
    } else {
      setRoster((prev) => prev.filter((person) => person !== player));
      setTeam2((prev) => [...prev, player]);
    }
  }

  function handleRemove(player) {
    if (team1.includes(player)) {
      setTeam1((prev) => prev.filter((person) => person !== player));
      setRoster((prev) => [...prev, player]);
    } else {
      setTeam2((prev) => prev.filter((person) => person !== player));
      setRoster((prev) => [...prev, player]);
    }
  }

  return (
    <div>
      <div className="grid grid-cols-4 gap-4 mb-4 text-center">
        {roster.map((player) => (
          <p
            onClick={() => handleAdd(player)}
            className="bg-gray-200  px-1 cursor-pointer"
          >
            {player}
          </p>
        ))}
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => setTeam((prev) => !prev)}
          className={` border-[1px] border-black/50 px-1 ${
            team ? "bg-blue-300" : "bg-red-300"
          }`}
        >{`Şu anda ${
          team ? `Takım 1` : `Takım 2`
        } için seçim yapılıyor`}</button>
        <button
          className="bg-gray-100 hover:bg-gray-200 border-[1px] border-black/50 px-1"
          onClick={handleRandom}
        >
          Karıştır
        </button>
        <button
          className="bg-gray-100 hover:bg-gray-200 border-[1px] border-black/50 px-1"
          onClick={handleReset}
        >
          Sıfırla
        </button>
      </div>

      <div className="grid grid-cols-2 text-center mt-4">
        <div>
          <p className="font-semibold">Takım 1</p>
          {team1.map((player) => (
            <p
              onClick={() => handleRemove(player)}
              className="bg-blue-300 hover:bg-blue-100 cursor-pointer"
            >
              {player}
            </p>
          ))}
        </div>
        <div>
          <p className="font-semibold">Takım 2</p>

          {team2.map((player) => (
            <p
              onClick={() => handleRemove(player)}
              className="bg-red-300 hover:bg-red-100 cursor-pointer"
            >
              {player}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
