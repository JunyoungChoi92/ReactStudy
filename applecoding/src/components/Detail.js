import { useEffect, useState } from "react";

export function Detail() {
  const [block, setBlock] = useState(<div>Loading....</div>);
  const [textValue, setTextValue] = useState("");
  const onChange = (e) => {
    const v = e.target.value;

    if (typeof v !== "string") {
      alert("Don't do that");
    } else {
      setTextValue(e.target.value);
    }
  };
  useEffect(() => {
    setTimeout(() => {
      setBlock(() => {
        return <div>test code is here!</div>;
      });
    }, 2000);
  }, []);

  return (
    <div>
      {block}
      <input type="text" onChange={onChange}></input>
    </div>
  );
}
