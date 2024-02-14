import { useRef, useState } from "hono/jsx/dom";

type State = "init" | "loading" | "error" | "success";

export default function ApiViewer() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [state, setState] = useState<State>("init");
  const [value, setValue] = useState("");
  return (
    <div>
      <input ref={inputRef} type="text" defaultValue="" />
      <button
        onClick={() => {
          if (inputRef.current) {
            const currentVal = inputRef.current.value;
            fetch("/api/hello?name=" + encodeURIComponent(currentVal))
              .then((res) => res.text())
              .then(
                (res) => {
                  setState("success");
                  setValue(res);
                },
                (e) => {
                  console.error(e);
                  setState("error");
                },
              );
          }
        }}
      >
        send
      </button>
      <textarea value={state === "success" ? value : state} readOnly />
    </div>
  );
}
