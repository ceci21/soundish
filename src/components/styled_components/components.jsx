import styled from 'styled-components';

export const AppContainer = styled.div`
  font-size: 12px;
  overflow: hidden;
  background-color: black;
  min-height: 100vh;
  min-width: 100vw;
  margin: 0;
  padding: 0;
`;

export const AudioPlayerContainer = styled.div`
  color: white;
`;

export const RainbowStepsBar = styled.div.attrs({
  style: ({ hue, height }) => ({
    background: `hsl(${hue}, 100%, 50%)`,
    height: `${height}px`
  })
})`
  min-width: 100px;
  color: white;
  position: relative;
`;

export const RainbowStepsGraph = styled.div.attrs({
  style: ({ columns }) => ({
    gridTemplateColumns: (() => {
      let str = '';
      for (let i = 0; i < columns; i++) {
        if (i === columns - 1) {
          str += '1fr'
        } else {
          str += '1fr ';
        }
      }
      return str;
    })()
  })
})`
  overflow: hidden;
  min-width: 100vw;
  min-height: 500px;
  display: grid;
  background-color: black;
`;