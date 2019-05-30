import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons/faImage';
import styled from 'styled-components';

const ImageWrapper = styled.div`
  position: relative;
  overflow: hidden;
  padding-bottom: 75%;
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
  ${props => props.src && `background-image: url(${props.src});`}
  background-size: cover;
  background-position: center;
  color: #6c757d;
`;

export class ItemsImage extends Component {
  state = { src: null, rej: null };
  checkValidImage = src => {
    new Promise((res, rej) => {
      this.setState({ rej });
      if (src) {
        const img = new Image();
        img.onload = () => res(src);
        img.onerror = () => res(null);
        img.src = src;
      } else {
        res(null);
      }
    }).then(src => this.setState({ src }), () => {});
  };
  componentDidMount = () => {
    this.checkValidImage(this.props.src);
  };
  componentDidUpdate = prevProps => {
    if (prevProps.src !== this.props.src) this.checkValidImage(this.props.src);
  };
  componentWillUnmount = () => this.state.rej();
  render = () => (
    <ImageWrapper className={this.props.className}>
      <ImageContainer src={this.state.src}>
        {!this.state.src && <FontAwesomeIcon icon={faImage} size="4x" />}
      </ImageContainer>
    </ImageWrapper>
  );
}

export default ItemsImage;
