import React from "react";
import styled from "styled-components";

const PlayListWrapper = styled.div`
  position: relative;
  color: #47292b;
  text-align: center;
  display: inline-block;
`;

const Text = styled.div`
  font-size: 24px;
  font-family: "Ruda";
  margin: 0;
  &.title {
    font-weight: 800;
  }

  &.artist {
    font-size: 20px;
  }
`;

function PlayList(props) {
  const { title, artist, onClick } = props;

  return (
    <PlayListWrapper onClick={onClick}>
      <Text className="title">{title ? title : "A title"}</Text>
      <Text className="artist">{artist ? artist : "the Artist"}</Text>
    </PlayListWrapper>
  );
}

export default PlayList;
