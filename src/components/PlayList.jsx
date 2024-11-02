import React from "react";
import styled from "styled-components";

const PlayListWrapper = styled.div`
  min-width: 276px;
  position: relative;
  color: #47292b;
  text-align: center;
  display: inline-block;
  font-size: 24px;
  font-family: "Ruda";
`;

const Text = styled.div`
  margin: 0;
  &.title {
    font-weight: 800;
  }

  &.artist {
    font-size: 20px;
  }
`;

function PlayList(props) {
  const { title, artist } = props;

  return (
    <PlayListWrapper>
      <Text className="title">{title ? title : "A title"}</Text>
      <Text className="artist">{artist ? artist : "the Artist"}</Text>
    </PlayListWrapper>
  );
}

export default PlayList;
