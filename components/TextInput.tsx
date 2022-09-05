import React, { useEffect, useState } from "react";
import styled from "styled-components";
import partition from "lodash/partition";
import zip from "lodash/zip";

const ComponentDiv = styled.div `
  background-color: #f3e5d9;
`;

const SubmittedTextDiv = styled.div `
  white-space: pre-wrap;
`;

const FormDiv = styled.div`
  display: flex;
  flex-flow: column;
`;

const SubmitButton = styled.input`
  display: block;
`;

const TextArea = styled.textarea`
  width: 90%;
`;

const textLens = (text :string) => {
  return partition(text
    .match(/[A-Za-zЁёА-Яа-я_\-']+|[^A-Za-zЁёА-Яа-я_\-']+/g)
    .map((e, i) => [e, i]), ([e, i]) => i % 2 === 0)
    .map((a) => a.map(([e]) => e)
    );
};

const joinBackIntoText = (lens) => {
  return zip(...lens).map(t => t.join('')).join('')
}

const checkForRepeats = (wordsArr) => {
  const wordsHash = new Map();
  wordsArr.forEach((w) => {
    const word = w.toLowerCase();
    wordsHash.has(word) ? wordsHash.set(word, wordsHash.get(word) + 1) : wordsHash.set(word, 1);
  });
  console.log(wordsHash);
}

const TextInput = () => {
  const [inputText, setInputText] = useState("");
  const [submittedText, setSubmittedText] = useState("");
  const [repeatedWords, setRepeatedWords] = useState({});

  useEffect(() => {
    if (!!submittedText) {
      const [wordsArr, otherArr] = textLens(submittedText);
      checkForRepeats(wordsArr);
    }
  }, [submittedText]);

  const handleChange = (e) => {
    setInputText(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedText(inputText);
    setInputText("");
  }

  return (
    <ComponentDiv>
      <SubmittedTextDiv>{submittedText}</SubmittedTextDiv>
      <FormDiv>
        <form onSubmit={handleSubmit}>
          <label>
            <TextArea rows={10} value={inputText} onChange={handleChange} />
          </label>
          <SubmitButton type="submit" value="Submit" />
        </form>
      </FormDiv>
    </ComponentDiv>
  );
};

export default TextInput;